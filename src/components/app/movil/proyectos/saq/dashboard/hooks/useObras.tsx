// hooks/useObras.ts

import { useState, useEffect, useCallback } from "react";
import {
  obrasService,
  GetPaginatedObrasRequest,
  PaginatedResult,
  Obra,
  NotificacionObra,
  ObraCierrePendiente,
} from "@/src/services/api/ObrasService";

interface UseObrasProps {
  proyectoId: string;
  tipoProyecto: string;
  initialPageSize?: number;
}

interface UseObrasReturn {
  // Estado
  obras: PaginatedResult<Obra>;
  loading: boolean;
  error: string | null;

  // Métricas
  generalProgress: number;
  obrasTerminadas: number;
  obrasPendientesCierre: number;
  notificacionesObras: NotificacionObra[];
  obrasCierrePendiente: ObraCierrePendiente[];

  // Filtros
  filters: GetPaginatedObrasRequest;
  updateFilters: (newFilters: Partial<GetPaginatedObrasRequest>) => void;
  resetFilters: () => void;

  // Acciones
  loadData: () => Promise<void>;
  exportSAQ: () => void;
  changePage: (page: number) => void;
}

export const useObras = ({
  proyectoId,
  tipoProyecto,
  initialPageSize = 10,
}: UseObrasProps): UseObrasReturn => {
  // Estado principal
  const [obras, setObras] = useState<PaginatedResult<Obra>>({
    Documents: [],
    CountAllDocuments: 0,
    PageCount: 0,
    PageNumber: 1,
    PageSize: initialPageSize,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Métricas
  const [generalProgress, setGeneralProgress] = useState(0);
  const [obrasTerminadas, setObrasTerminadas] = useState(0);
  const [obrasPendientesCierre, setObrasPendientesCierre] = useState(0);
  const [notificacionesObras, setNotificacionesObras] = useState<NotificacionObra[]>([]);
  const [obrasCierrePendiente, setObrasCierrePendiente] = useState<ObraCierrePendiente[]>([]);

  // Filtros
  const [filters, setFilters] = useState<GetPaginatedObrasRequest>({
    Search: "",
    PageNumber: 1,
    PageSize: initialPageSize,
    TipoProyecto: tipoProyecto,
  });

  // Calcular métricas
  const calcularMetricas = useCallback((data: PaginatedResult<Obra>) => {
    if (!data.Documents || data.Documents.length === 0) {
      setGeneralProgress(0);
      setObrasTerminadas(0);
      setObrasPendientesCierre(0);
      return;
    }

    // Calcular progreso general
    let totalFases = 0;
    let fasesCompletadas = 0;

    data.Documents.forEach((obra) => {
      // Contar fases con estado
      const fases = [
        obra.SolicitudesRevisiones,
        obra.TssvSar,
        obra.AprobacionCandidatoCliente,
        obra.FirmaContrato,
        obra.Permisos,
      ];

      fases.forEach((fase) => {
        if (fase?.Status && fase.Status.length > 0) {
          totalFases++;
          const ultimoEstado = fase.Status[fase.Status.length - 1];
          if (ultimoEstado.Status === "Completado") {
            fasesCompletadas++;
          }
        }
      });
    });

    const progress = totalFases > 0 ? Math.round((fasesCompletadas * 100) / totalFases) : 0;
    setGeneralProgress(progress);

    // Calcular obras terminadas
    const terminadas = data.Documents.filter(
      (o) => o.CierreSaq?.PorcentajeCompletado === 100
    ).length;
    setObrasTerminadas(terminadas);

    // Calcular obras pendientes de cierre
    const pendientesList: ObraCierrePendiente[] = [];
    data.Documents.forEach((obra) => {
      if (!obra.CierreSaq || obra.CierreSaq.PorcentajeCompletado < 100) {
        pendientesList.push({
          ObraId: obra.Id,
          Codigo: obra.Asignacion?.Codigo || "N/A",
          Nombre: obra.Asignacion?.Nombre || "Sin nombre",
          PorcentajeCierre: obra.CierreSaq?.PorcentajeCompletado || 0,
          EstadoCierre: obra.CierreSaq?.EstadoCierre || "SIN_INICIAR",
        });
      }
    });

    setObrasCierrePendiente(pendientesList);
    setObrasPendientesCierre(pendientesList.length);

    // Generar notificaciones para obras enviadas
    const notificaciones: NotificacionObra[] = data.Documents
      .filter((o) => o.IsActive === "ENVIADO A OBRA")
      .map((obra) => {
        const fechaRef = obra.CierreSaq?.FechaInicio || obra.CreatedOn;
        const diasEnEstado = fechaRef
          ? Math.floor((Date.now() - new Date(fechaRef).getTime()) / (1000 * 60 * 60 * 24))
          : 0;

        return {
          ObraId: obra.Id,
          Codigo: obra.Asignacion?.Codigo || "N/A",
          Nombre: obra.Asignacion?.Nombre || "Sin nombre",
          Estado: obra.IsActive,
          TieneCierreSaq: !!obra.CierreSaq,
          FechaInicio: fechaRef ? new Date(fechaRef) : undefined,
          DiasEnEstado: diasEnEstado,
          Estadisticas: obra.CierreSaq
            ? {
                TipoPropietario: obra.CierreSaq.TipoPropietario,
                PorcentajeCompletado: obra.CierreSaq.PorcentajeCompletado,
                TotalDocumentos: 0,
                DocumentosCompletados: 0,
                DocumentosPendientes: 0,
                DocumentosRechazados: 0,
                DocumentosNoAplica: 0,
              }
            : undefined,
        };
      });

    setNotificacionesObras(notificaciones);
  }, []);

  // Cargar datos
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await obrasService.getPaginatedObras(proyectoId, filters);
      setObras(data);
      calcularMetricas(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al cargar obras";
      setError(errorMessage);
      console.error("Error loading obras:", err);
    } finally {
      setLoading(false);
    }
  }, [proyectoId, filters, calcularMetricas]);

  // Actualizar filtros
  const updateFilters = useCallback((newFilters: Partial<GetPaginatedObrasRequest>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      PageNumber: 1, // Reset a primera página al filtrar
    }));
  }, []);

  // Resetear filtros
  const resetFilters = useCallback(() => {
    setFilters({
      Search: "",
      PageNumber: 1,
      PageSize: initialPageSize,
      TipoProyecto: tipoProyecto,
    });
  }, [initialPageSize, tipoProyecto]);

  // Exportar SAQ
  const exportSAQ = useCallback(() => {
    const url = obrasService.getExportCierreSAQUrl(proyectoId, {
      fechaDesde: filters.DateRangeSearch?.desde,
      fechaHasta: filters.DateRangeSearch?.hasta,
      isActive: filters.IsActive,
      tipoProyecto: filters.TipoProyecto,
    });

    window.open(url, "_blank");
  }, [proyectoId, filters]);

  // Cambiar página
  const changePage = useCallback((page: number) => {
    setFilters((prev) => ({
      ...prev,
      PageNumber: page + 1, // MUI usa índice base 0
    }));
  }, []);

  // Efecto para cargar datos cuando cambien los filtros
  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    // Estado
    obras,
    loading,
    error,

    // Métricas
    generalProgress,
    obrasTerminadas,
    obrasPendientesCierre,
    notificacionesObras,
    obrasCierrePendiente,

    // Filtros
    filters,
    updateFilters,
    resetFilters,

    // Acciones
    loadData,
    exportSAQ,
    changePage,
  };
};