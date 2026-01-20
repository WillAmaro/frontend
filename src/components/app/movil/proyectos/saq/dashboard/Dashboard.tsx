'use client'

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
  CircularProgress,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  CalendarMonth,
  BarChart,
  FilterAlt,
  Download,
  AddCircle,
  ClearAll,
  CheckCircle,
  Close,
  ArrowForwardIos,
  Pending,
  Mail,
  EventAvailable,
  Label,
} from "@mui/icons-material";

// Importar componentes base


// Importar hook personalizado
import SelectBase from "@/src/components/base/SelectBase";
import ButtonBase from "@/src/components/base/ButtonBase";
import CustomDataGrid from "@/src/components/base/CustomDataGrid";
import { useObras } from "./hooks/useObras";
import { Obra } from "@/src/services/api/ObrasService";

interface Props {
  ProyectoId: string;
  TipoProyecto: string;
}

const RollOutTable: React.FC<Props> = ({ ProyectoId, TipoProyecto }) => {
  // Hook personalizado para gestión de obras
  const {
    obras,
    loading,
    error,
    generalProgress,
    obrasTerminadas,
    obrasPendientesCierre,
    notificacionesObras,
    obrasCierrePendiente,
    filters,
    updateFilters,
    resetFilters,
    loadData,
    exportSAQ,
    changePage,
  } = useObras({
    proyectoId: ProyectoId,
    tipoProyecto: TipoProyecto,
  });

  // Estados locales para UI
  const [tipoFechaSeleccionada, setTipoFechaSeleccionada] = useState("");
  const [fechaDesdeActiva, setFechaDesdeActiva] = useState<string>("");
  const [fechaHastaActiva, setFechaHastaActiva] = useState<string>("");
  const [isActive, setIsActive] = useState("");
  const [estadoCierreSaq, setEstadoCierreSaq] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // Modales
  const [showModalCierresPendientes, setShowModalCierresPendientes] =
    useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Handlers
  const handleTipoFechaChange = (value: string | number) => {
    setTipoFechaSeleccionada(value as string);
    setFechaDesdeActiva("");
    setFechaHastaActiva("");
  };

  const handleAplicarFiltros = () => {
    const newFilters: any = {
      IsActive: isActive || undefined,
      EstadoCierreSaq: estadoCierreSaq || undefined,
      Search: searchText || undefined,
    };

    // Aplicar fechas según el tipo seleccionado
    if (tipoFechaSeleccionada && (fechaDesdeActiva || fechaHastaActiva)) {
      const desde = fechaDesdeActiva ? new Date(fechaDesdeActiva) : undefined;
      const hasta = fechaHastaActiva
        ? new Date(new Date(fechaHastaActiva).setHours(23, 59, 59, 999))
        : undefined;

      switch (tipoFechaSeleccionada) {
        case "REGISTRO":
          newFilters.DateRangeSearch = { desde, hasta };
          break;
        case "ASIGNACION":
          newFilters.FechaAsignacionDesde = desde;
          newFilters.FechaAsignacionHasta = hasta;
          break;
        case "VISITA":
          newFilters.FechaVisitaSaqDesde = desde;
          newFilters.FechaVisitaSaqHasta = hasta;
          break;
      }
    }

    updateFilters(newFilters);
    setSnackbarMessage("Filtros aplicados correctamente");
    setSnackbarOpen(true);
  };

  const handleLimpiarFiltros = () => {
    setTipoFechaSeleccionada("");
    setFechaDesdeActiva("");
    setFechaHastaActiva("");
    setIsActive("");
    setEstadoCierreSaq("");
    setSearchText("");
    resetFilters();
    setSnackbarMessage("Filtros limpiados");
    setSnackbarOpen(true);
  };

  const handleExportSAQ = () => {
    setIsGeneratingReport(true);
    exportSAQ();
    setTimeout(() => {
      setIsGeneratingReport(false);
      setSnackbarMessage("Exportación iniciada");
      setSnackbarOpen(true);
    }, 3000);
  };

  // Utilidades
  const getProgressColor = (porcentaje: number): string => {
    if (porcentaje >= 80) return "#10b981";
    if (porcentaje >= 10) return "#3b82f6";
    if (porcentaje >= 1) return "#f59e0b";
    return "#ef4444";
  };

  const getCierreStatusClass = (porcentaje: number) => {
    if (porcentaje === 100) return "success";
    if (porcentaje >= 10) return "info";
    if (porcentaje >= 5) return "warning";
    return "error";
  };

  const getCierreStatusText = (porcentaje: number): string => {
    if (porcentaje === 100) return "Completado";
    if (porcentaje >= 80) return "Avanzado";
    if (porcentaje >= 10) return "En Progreso";
    if (porcentaje >= 1) return "Iniciado";
    return "Pendiente";
  };

  const getEstadoCierreSaqLabel = (value: string): string => {
    const labels: Record<string, string> = {
      NO_INICIADO: "No Iniciado",
      INICIADO: "Iniciado",
      SIN_INICIAR: "Sin Iniciar",
      EN_PROCESO: "En Proceso",
      CON_OBSERVACIONES: "Con observaciones",
      COMPLETADO: "Completado",
    };
    return labels[value] || value;
  };

  const obtenerLabelFecha = (tipo: "desde" | "hasta"): string => {
    const labels = {
      REGISTRO: tipo === "desde" ? "Registro Desde" : "Registro Hasta",
      ASIGNACION: tipo === "desde" ? "Asignación Desde" : "Asignación Hasta",
      VISITA: tipo === "desde" ? "Visita Desde" : "Visita Hasta",
    };
    return (
      labels[tipoFechaSeleccionada as keyof typeof labels] ||
      (tipo === "desde" ? "Desde" : "Hasta")
    );
  };

  const tieneFiltrosActivos = (): boolean => {
    return !!(tipoFechaSeleccionada || isActive || estadoCierreSaq || searchText);
  };

  // Definir columnas del DataGrid
  const columns = [
    {
      field: "codigo",
      headerName: "Código",
      width: 150,
      renderCell: (params: any) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: "primary.main",
            }}
          />
          <Typography variant="body2" fontWeight="medium">
            {params.row.Asignacion?.Codigo}
          </Typography>
        </Box>
      ),
    },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 250,
      flex: 1,
      renderCell: (params: any) => (
        <Typography variant="body2" noWrap>
          {params.row.Asignacion?.Nombre}
        </Typography>
      ),
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 150,
      renderCell: (params: any) => (
        <Chip
          label={params.row.IsActive}
          color={params.row.IsActive === "ACTIVO" ? "success" : "secondary"}
          size="small"
          icon={<Label fontSize="small" />}
        />
      ),
    },
    {
      field: "cierreSaq",
      headerName: "Cierre SAQ",
      width: 250,
      renderCell: (params: any) => {
        if (!params.row.CierreSaq) {
          return <Chip label="No Iniciado" color="default" size="small" />;
        }

        const porcentaje = params.row.CierreSaq.PorcentajeCompletado;

        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ position: "relative", width: 40, height: 40 }}>
              <CircularProgress
                variant="determinate"
                value={porcentaje}
                size={40}
                thickness={4}
                sx={{ color: getProgressColor(porcentaje) }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="caption" fontWeight="bold">
                  {porcentaje}%
                </Typography>
              </Box>
            </Box>
            <Chip
              label={getCierreStatusText(porcentaje)}
              color={getCierreStatusClass(porcentaje) as any}
              size="small"
            />
          </Box>
        );
      },
    },
    {
      field: "fechaAsignacion",
      headerName: "Asignación",
      width: 150,
      renderCell: (params: any) => {
        const fecha = params.row.Asignacion?.FechaAsignacionCorreo;
        return fecha ? (
          <Chip
            label={new Date(fecha).toLocaleDateString("es-ES")}
            size="small"
            icon={<Mail fontSize="small" />}
            color="info"
          />
        ) : (
          <Chip label="NO REGISTRADA" size="small" color="default" />
        );
      },
    },
    {
      field: "fechaVisita",
      headerName: "Fecha Visita",
      width: 150,
      renderCell: (params: any) => {
        const fecha = params.row.FechaVisita?.FechaVisitaSac?.[0]?.Fecha;
        return fecha ? (
          <Chip
            label={new Date(fecha).toLocaleDateString("es-ES")}
            size="small"
            icon={<EventAvailable fontSize="small" />}
            color="info"
          />
        ) : (
          <Chip label="NO REGISTRADA" size="small" color="default" />
        );
      },
    },
    {
      field: "tipoProyecto",
      headerName: "Tipo",
      width: 150,
      renderCell: (params: any) => (
        <Chip
          label={params.row.Asignacion?.TipoProyecto}
          color="secondary"
          size="small"
        />
      ),
    },
    {
      field: "fechaRegistro",
      headerName: "Fecha de Registro",
      width: 150,
      renderCell: (params: any) => (
        <Chip
          label={new Date(params.row.CreatedOn).toLocaleDateString("es-ES")}
          size="small"
          icon={<CalendarMonth fontSize="small" />}
        />
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex",height: "100%", p: 3 ,width:"100%" ,justifyContent:"space-between"}}>
      {/* Panel izquierdo - Métricas */}
      <Box
        sx={{
          width: "33%",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Card de Progreso General */}
        <Card elevation={3}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <BarChart color="primary" />
              <Typography variant="subtitle2" fontWeight="bold">
                PROGRESO GENERAL
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 2,
              }}
            >
              {/* Círculo de progreso */}
              <Box sx={{ position: "relative", width: 128, height: 128 }}>
                <CircularProgress
                  variant="determinate"
                  value={generalProgress}
                  size={128}
                  thickness={6}
                  sx={{ color: "#667eea" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h4" fontWeight="bold">
                    {generalProgress}%
                  </Typography>
                </Box>
              </Box>

              {/* Estadísticas en Flexbox */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  mt: 2,
                  width: "100%",
                }}
              >
                <Paper
                  sx={{
                    flex: "1 1 calc(50% - 8px)",
                    minWidth: "140px",
                    p: 2,
                    textAlign: "center",
                    bgcolor: "grey.100",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    TOTAL OBRAS
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {obras.CountAllDocuments}
                  </Typography>
                </Paper>

                <Paper
                  sx={{
                    flex: "1 1 calc(50% - 8px)",
                    minWidth: "140px",
                    p: 2,
                    textAlign: "center",
                    bgcolor: "grey.100",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    ENVIADAS A OBRA
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color="primary">
                    {notificacionesObras.length}
                  </Typography>
                </Paper>

                <Paper
                  sx={{
                    flex: "1 1 calc(50% - 8px)",
                    minWidth: "140px",
                    p: 2,
                    textAlign: "center",
                    bgcolor: "grey.100",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    OBRAS CONCLUIDAS
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color="primary">
                    {obrasTerminadas}
                  </Typography>
                </Paper>

                <Paper
                  sx={{
                    flex: "1 1 calc(50% - 8px)",
                    minWidth: "140px",
                    p: 2,
                    textAlign: "center",
                    bgcolor: "error.light",
                    cursor: "pointer",
                    "&:hover": { bgcolor: "error.main" },
                  }}
                  onClick={() => setShowModalCierresPendientes(true)}
                >
                  <Typography variant="caption" color="error.dark">
                    OBRAS PENDIENTES
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color="error.dark">
                    {obrasPendientesCierre}
                  </Typography>
                </Paper>
              </Box>

              {/* Filtros aplicados */}
              <Paper
                sx={{
                  mt: 2,
                  p: 2,
                  width: "100%",
                  bgcolor: "primary.light",
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <FilterAlt fontSize="small" />
                  <Typography variant="caption" fontWeight="bold">
                    FILTROS APLICADOS
                  </Typography>
                </Box>
                <Typography variant="caption">
                  {fechaDesdeActiva && fechaHastaActiva
                    ? `${new Date(
                        fechaDesdeActiva
                      ).toLocaleDateString()} - ${new Date(
                        fechaHastaActiva
                      ).toLocaleDateString()}`
                    : "Sin filtros de fecha"}
                </Typography>
              </Paper>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Panel principal */}
      <Box sx={{  display: "flex", flexDirection: "column", gap: 2,width:"65%" }}>
        {/* Mensaje de error */}
        {error && (
          <Alert severity="error" onClose={() => {}}>
            {error}
          </Alert>
        )}

        {/* Header con filtros */}
        <Card elevation={3}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  FILTROS Y ACCIONES
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Configure los filtros y gestione las obras del proyecto
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <ButtonBase
                  label={isGeneratingReport ? "Generando..." : "Exportar SAQ"}
                  loading={isGeneratingReport}
                  onClick={handleExportSAQ}
                  startIcon={<Download />}
                  color="success"
                />
                <ButtonBase
                  label="Nueva Obra"
                  onClick={() => {
                    /* Implementar modal de nueva obra */
                  }}
                  startIcon={<AddCircle />}
                />
              </Box>
            </Box>

            {/* Filtros en Flexbox */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box sx={{ flex: "1 1 200px", minWidth: "200px" }}>
                <SelectBase
                  label="Filtrar por Fecha"
                  value={tipoFechaSeleccionada}
                  onChange={handleTipoFechaChange}
                  options={[
                    { label: "Sin filtro de fecha", value: "" },
                    { label: "Fecha de Registro", value: "REGISTRO" },
                    { label: "Fecha de Asignación", value: "ASIGNACION" },
                    { label: "Fecha de Visita SAQ", value: "VISITA" },
                  ]}
                  fullWidth
                />
              </Box>

              {tipoFechaSeleccionada && (
                <>
                  <Box sx={{ flex: "1 1 200px", minWidth: "200px" }}>
                    <TextField
                      fullWidth
                      type="date"
                      label={obtenerLabelFecha("desde")}
                      value={fechaDesdeActiva}
                      onChange={(e) => setFechaDesdeActiva(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>

                  <Box sx={{ flex: "1 1 200px", minWidth: "200px" }}>
                    <TextField
                      fullWidth
                      type="date"
                      label={obtenerLabelFecha("hasta")}
                      value={fechaHastaActiva}
                      onChange={(e) => setFechaHastaActiva(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>
                </>
              )}

              <Box sx={{ flex: "1 1 200px", minWidth: "200px" }}>
                <SelectBase
                  label="Estado"
                  value={isActive}
                  onChange={(value:any) => setIsActive(value as string)}
                  options={[
                    { label: "Todos los estados", value: "" },
                    { label: "ACTIVO", value: "ACTIVO" },
                    { label: "ENVIADO A OBRA", value: "ENVIADO A OBRA" },
                  ]}
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: "1 1 200px", minWidth: "200px" }}>
                <SelectBase
                  label="Cierre SAQ"
                  value={estadoCierreSaq}
                  onChange={(value:any) => setEstadoCierreSaq(value as string)}
                  options={[
                    { label: "Todos", value: "" },
                    { label: "No Iniciado", value: "NO_INICIADO" },
                    { label: "Iniciado", value: "INICIADO" },
                    { label: "Sin Iniciar", value: "SIN_INICIAR" },
                    { label: "En Proceso", value: "EN_PROCESO" },
                    {
                      label: "Con observaciones",
                      value: "CON_OBSERVACIONES",
                    },
                    { label: "Completado", value: "COMPLETADO" },
                  ]}
                  fullWidth
                />
              </Box>
            </Box>

            {/* Botones de acción */}
            <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
              <ButtonBase
                label="Aplicar Filtros"
                onClick={handleAplicarFiltros}
                startIcon={<FilterAlt />}
              />
              <ButtonBase
                label="Limpiar Todo"
                onClick={handleLimpiarFiltros}
                startIcon={<ClearAll />}
                color="secondary"
                variant="outlined"
              />
            </Box>

            {/* Chips de filtros activos */}
            {tieneFiltrosActivos() && (
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
                {tipoFechaSeleccionada && (
                  <Chip
                    label={`Tipo: ${tipoFechaSeleccionada}`}
                    onDelete={() => setTipoFechaSeleccionada("")}
                    color="primary"
                  />
                )}
                {isActive && (
                  <Chip
                    label={`Estado: ${isActive}`}
                    onDelete={() => setIsActive("")}
                    color="success"
                  />
                )}
                {estadoCierreSaq && (
                  <Chip
                    label={`Cierre: ${getEstadoCierreSaqLabel(estadoCierreSaq)}`}
                    onDelete={() => setEstadoCierreSaq("")}
                    color="info"
                  />
                )}
                {searchText && (
                  <Chip
                    label={`Búsqueda: "${searchText}"`}
                    onDelete={() => setSearchText("")}
                    color="secondary"
                  />
                )}
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Tabla de datos */}
        <Card elevation={3} sx={{ flex: 1 }}>
          <CustomDataGrid
            columns={columns}
            fetchData={async (page:any, pageSize:any, search:any) => {
              return {
                rows: obras.Documents,
                total: obras.CountAllDocuments,
              };
            }}
            pageSize={10}
            search={searchText}
            onSearch={setSearchText}
            serverSide={true}
            reloadTrigger={obras.PageNumber}
            onView={(row: Obra) => {
              window.location.href = `/proyectos-construccion-torres/seguimiento-saq/asignacion/${row.Id}`;
            }}
            onEdit={(row: Obra) => {
              window.location.href = `/proyectos-construccion-torres/seguimiento-saq/asignacion/${row.Id}`;
            }}
          />
        </Card>
      </Box>

      {/* Modal de Cierres Pendientes */}
      <Dialog
        open={showModalCierresPendientes}
        onClose={() => setShowModalCierresPendientes(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: "error.main", color: "white" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Pending />
              <Box>
                <Typography variant="h6">Cierres SAQ Pendientes</Typography>
                <Typography variant="caption">
                  {obrasCierrePendiente.length} obra(s) con cierre incompleto
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={() => setShowModalCierresPendientes(false)}
              sx={{ color: "white" }}
            >
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {obrasCierrePendiente.length > 0 ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {obrasCierrePendiente.map((obra:any) => (
                <Paper
                  key={obra.ObraId}
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: "action.hover",
                      boxShadow: 2,
                    },
                  }}
                  onClick={() => {
                    window.location.href = `/proyectos-construccion-torres/seguimiento-saq/cierre-saq/${obra.ObraId}`;
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ position: "relative", width: 56, height: 56 }}>
                      <CircularProgress
                        variant="determinate"
                        value={obra.PorcentajeCierre}
                        size={56}
                        thickness={4}
                        sx={{
                          color: getProgressColor(obra.PorcentajeCierre),
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="caption" fontWeight="bold">
                          {obra.PorcentajeCierre}%
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Chip
                          label={obra.Codigo}
                          size="small"
                          variant="outlined"
                        />
                        <Chip
                          label={getCierreStatusText(obra.PorcentajeCierre)}
                          size="small"
                          color={
                            getCierreStatusClass(obra.PorcentajeCierre) as any
                          }
                        />
                      </Box>
                      <Typography variant="body2" fontWeight="medium">
                        {obra.Nombre}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={obra.PorcentajeCierre}
                        sx={{ mt: 1, height: 8, borderRadius: 1 }}
                      />
                    </Box>

                    <ArrowForwardIos fontSize="small" color="action" />
                  </Box>
                </Paper>
              ))}
            </Box>
          ) : (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <CheckCircle
                sx={{ fontSize: 64, color: "success.main", mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                ¡Todos los cierres completados!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No hay cierres SAQ pendientes en este momento.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <ButtonBase
            label="Cerrar"
            onClick={() => setShowModalCierresPendientes(false)}
            endIcon={<Close />}
            color="error"
          />
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default RollOutTable;