// services/obrasService.ts

export interface GetPaginatedObrasRequest {
  Search?: string;
  PageNumber: number;
  PageSize: number;
  TipoProyecto?: string;
  IsActive?: string;
  EstadoCierreSaq?: string;
  DateRangeSearch?: {
    desde?: Date;
    hasta?: Date;
  };
  FechaAsignacionDesde?: Date;
  FechaAsignacionHasta?: Date;
  FechaVisitaSaqDesde?: Date;
  FechaVisitaSaqHasta?: Date;
}

export interface Estado {
  Status: string;
  FechaInicio?: Date;
  FechaFin?: Date;
  Comentarios?: string;
}

export interface Asignacion {
  Codigo: string;
  Nombre: string;
  TipoProyecto: string;
  FechaAsignacionCorreo?: Date;
}

export interface FechaVisita {
  FechaVisitaSac: Array<{
    Fecha?: Date;
    Comentarios?: string;
  }>;
}

export interface CierreSAQ {
  PorcentajeCompletado: number;
  EstadoCierre: string;
  FechaInicio?: Date;
  TipoPropietario: string;
  Secciones?: any[];
}

export interface Obra {
  Id: string;
  Asignacion?: Asignacion;
  IsActive: string;
  CreatedOn: Date;
  CierreSaq?: CierreSAQ;
  FechaVisita?: FechaVisita;
  // Fases dinámicas
  SolicitudesRevisiones?: { Status: Estado[] };
  TssvSar?: { Status: Estado[] };
  AprobacionCandidatoCliente?: { Status: Estado[] };
  FirmaContrato?: { Status: Estado[] };
  Permisos?: { Status: Estado[] };
}

export interface PaginatedResult<T> {
  Documents: T[];
  CountAllDocuments: number;
  PageCount: number;
  PageNumber: number;
  PageSize: number;
}

export interface NotificacionObra {
  ObraId: string;
  Codigo: string;
  Nombre: string;
  Estado: string;
  TieneCierreSaq: boolean;
  FechaInicio?: Date;
  DiasEnEstado: number;
  Estadisticas?: EstadisticasDocumentos;
}

export interface EstadisticasDocumentos {
  TipoPropietario: string;
  PorcentajeCompletado: number;
  TotalDocumentos: number;
  DocumentosCompletados: number;
  DocumentosPendientes: number;
  DocumentosRechazados: number;
  DocumentosNoAplica: number;
}

export interface ObraCierrePendiente {
  ObraId: string;
  Codigo: string;
  Nombre: string;
  PorcentajeCierre: number;
  EstadoCierre: string;
}

class ObrasService {
  private baseUrl = "/api/ProyectosMovil"; // Ajusta según tu API

  /**
   * Obtiene obras paginadas con filtros
   */
  async getPaginatedObras(
    proyectoId: string,
    request: GetPaginatedObrasRequest
  ): Promise<PaginatedResult<Obra>> {
    try {
      const params = new URLSearchParams();
      params.append("pageNumber", request.PageNumber.toString());
      params.append("pageSize", request.PageSize.toString());

      if (request.Search) params.append("search", request.Search);
      if (request.TipoProyecto) params.append("tipoProyecto", request.TipoProyecto);
      if (request.IsActive) params.append("isActive", request.IsActive);
      if (request.EstadoCierreSaq) params.append("estadoCierreSaq", request.EstadoCierreSaq);

      // Filtros de fecha
      if (request.DateRangeSearch?.desde) {
        params.append("fechaDesde", request.DateRangeSearch.desde.toISOString());
      }
      if (request.DateRangeSearch?.hasta) {
        params.append("fechaHasta", request.DateRangeSearch.hasta.toISOString());
      }
      if (request.FechaAsignacionDesde) {
        params.append("fechaAsignacionDesde", request.FechaAsignacionDesde.toISOString());
      }
      if (request.FechaAsignacionHasta) {
        params.append("fechaAsignacionHasta", request.FechaAsignacionHasta.toISOString());
      }
      if (request.FechaVisitaSaqDesde) {
        params.append("fechaVisitaSaqDesde", request.FechaVisitaSaqDesde.toISOString());
      }
      if (request.FechaVisitaSaqHasta) {
        params.append("fechaVisitaSaqHasta", request.FechaVisitaSaqHasta.toISOString());
      }

      const response = await fetch(
        `${this.baseUrl}/GetPaginatedObras/${proyectoId}?${params}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching obras:", error);
      throw error;
    }
  }

  /**
   * Obtiene obras para notificaciones (versión optimizada)
   */
  async getObrasParaNotificaciones(
    proyectoId: string,
    request: GetPaginatedObrasRequest
  ): Promise<any[]> {
    try {
      const params = new URLSearchParams();
      if (request.TipoProyecto) params.append("tipoProyecto", request.TipoProyecto);

      const response = await fetch(
        `${this.baseUrl}/GetObrasParaNotificaciones/${proyectoId}?${params}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching notificaciones:", error);
      throw error;
    }
  }

  /**
   * Exporta el cierre SAQ a Excel
   */
  getExportCierreSAQUrl(
    proyectoId: string,
    filters: {
      fechaDesde?: Date;
      fechaHasta?: Date;
      isActive?: string;
      tipoProyecto?: string;
    }
  ): string {
    const params = new URLSearchParams();
    params.append("password", "LPSExportCierreSAQ");

    if (filters.fechaDesde) {
      params.append("fechaDesde", filters.fechaDesde.toISOString());
    }
    if (filters.fechaHasta) {
      params.append("fechaHasta", filters.fechaHasta.toISOString());
    }
    if (filters.isActive) {
      params.append("isActive", filters.isActive);
    }
    if (filters.tipoProyecto) {
      params.append("tipoProyecto", filters.tipoProyecto);
    }

    return `${this.baseUrl}/ExportCierreSAQ/${proyectoId}?${params}`;
  }

  /**
   * Crea una nueva obra
   */
  async createObra(proyectoId: string, obra: Partial<Obra>): Promise<Obra> {
    try {
      const response = await fetch(`${this.baseUrl}/CreateObra/${proyectoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obra),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating obra:", error);
      throw error;
    }
  }

  /**
   * Actualiza una obra existente
   */
  async updateObra(obraId: string, obra: Partial<Obra>): Promise<Obra> {
    try {
      const response = await fetch(`${this.baseUrl}/UpdateObra/${obraId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obra),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating obra:", error);
      throw error;
    }
  }

  /**
   * Elimina una obra
   */
  async deleteObra(obraId: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/DeleteObra/${obraId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting obra:", error);
      throw error;
    }
  }

  /**
   * Obtiene una obra por ID
   */
  async getObraById(obraId: string): Promise<Obra> {
    try {
      const response = await fetch(`${this.baseUrl}/GetObra/${obraId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching obra:", error);
      throw error;
    }
  }
}

// Exportar instancia singleton
export const obrasService = new ObrasService();