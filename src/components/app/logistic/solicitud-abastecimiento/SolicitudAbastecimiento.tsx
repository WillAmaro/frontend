"use client";

import { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Divider,
  Alert,
  Fade,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
  Paper,
} from "@mui/material";
import {
  AddCircleOutline,
  ListAltOutlined,
  FileDownloadOutlined,
  SearchOutlined,
  RefreshOutlined,
  SendOutlined,
  CheckCircleOutline,
  Close,
  AssignmentOutlined,
  Inventory2Outlined,
  WarningAmberOutlined,
  EventOutlined,
  TableChartOutlined,
} from "@mui/icons-material";
import { TitleCard } from "@/src/components/base/TitleCard";
import * as XLSX from "xlsx";
import ButtonBase from "@/src/components/base/ButtonBase";
import { API_URL } from "@/src/lib/config";
import DatePickerBase from "@/src/components/base/DatePickerBase";
import dayjs, { Dayjs } from "dayjs";
import SelectBase from "@/src/components/base/SelectBase";
import { toast } from "react-toastify";
import { CatalogService } from "@/src/services/api/CatalogService";
import { CatalogDTO } from "@/src/types/Catalog.types";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/Store";
import { GridColDef } from "@mui/x-data-grid";
import CustomDataGrid from "@/src/components/base/CustomDataGrid";

// ─── Configuración de Categorías ────────────────────────────────────────────
const categoriaConfig = {
  MATERIAL: { label: "Material", color: "#ed6c02", icon: "📦" },
  TOOL: { label: "Herramienta", color: "#1976d2", icon: "🔧" },
  EQUIPMENT: { label: "Equipo", color: "#2e7d32", icon: "⚙️" },
};

// ─── Definición de columnas exportables ─────────────────────────────────────
const COLUMNAS_DISPONIBLES = [
  { field: "itemCode", label: "Código", default: true },
  { field: "itemName", label: "Descripción", default: true },
  { field: "quantityUsedInPeriod", label: "Consumo Período", default: true },
  { field: "requestedQuantity", label: "Cantidad Solicitada", default: true },
  { field: "uom", label: "Unidad de Medida", default: true },
  { field: "unitPrice", label: "Precio Unitario", default: false },
  { field: "totalPrice", label: "Precio Total", default: false },
  { field: "isUrgent", label: "Urgente", default: true },
] as const;

type ColumnField = typeof COLUMNAS_DISPONIBLES[number]["field"];

const LABEL_MAP: Record<ColumnField, string> = {
  itemCode: "Código",
  itemName: "Descripción",
  quantityUsedInPeriod: "Consumo Período",
  requestedQuantity: "Cantidad Solicitada",
  uom: "Unidad de Medida",
  unitPrice: "Precio Unitario",
  totalPrice: "Precio Total",
  isUrgent: "Urgente",
};

// ────────────────────────────────────────────────────────────────────────────

export default function SolicitudAbastecimiento() {
  // ── Ref para scroll suave al inicio ──────────────────────────────────────
  const topRef = useRef<HTMLDivElement>(null);

  // ── Estados del formulario ────────────────────────────────────────────────
  const [notas, setNotas] = useState("");
  const company = useSelector((state: RootState) => state.companies.company);
  const [valueInit, setValueInit] = useState<Dayjs | null>(dayjs());
  const [valueFin, setValueFin] = useState<Dayjs | null>(dayjs());
  const [valueEntrega, setValueEntrega] = useState<Dayjs | null>(dayjs());
  const [projectOptions, setProjectOptions] = useState<any[]>([]);
  const [valueProyectoSeleccionado, setProyectoSeleccionado] = useState<string | number | null>(null);
  const [catalogos, setCatalogos] = useState<CatalogDTO>({ companies: [], projects: [] });

  // ── Estados de datos ──────────────────────────────────────────────────────
  const [requestDto, setRequestDto] = useState<SupplyRequestDto | null>(null);
  const [materialesAPI, setMaterialesAPI] = useState<SupplyRequestItem[]>([]);
  const [herramientasAPI, setHerramientasAPI] = useState<SupplyRequestItem[]>([]);
  const [equiposAPI, setEquiposAPI] = useState<SupplyRequestItem[]>([]);

  // ── Estados de UI ─────────────────────────────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessExport, setShowSuccessExport] = useState(false);
  const [showSuccessGenerate, setShowSuccessGenerate] = useState(false);
  const [showSuccessSubmit, setShowSuccessSubmit] = useState(false);
  const [submittedRequestInfo, setSubmittedRequestInfo] = useState<SupplyRequestDto | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // ── Estado para columnas seleccionadas del Excel ──────────────────────────
  const [columnasSeleccionadas, setColumnasSeleccionadas] = useState<ColumnField[]>(
    COLUMNAS_DISPONIBLES.filter(c => c.default).map(c => c.field)
  );

  // ── Scroll suave al top cuando se confirma exitosamente ───────────────────
  useEffect(() => {
    if (showSuccessSubmit) {
      // Primero intentamos scroll en el contenedor referenciado
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      // Fallback: scroll global de la ventana
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showSuccessSubmit]);

  // ── Carga de catálogos ────────────────────────────────────────────────────
  useEffect(() => {
    const loadCatalogs = async () => {
      try {
        const data = await CatalogService.getAllCatalogs();
        setCatalogos({ companies: data.companies, projects: data.projects });
      } catch (error) {
        console.error(error);
      }
    };
    loadCatalogs();
  }, []);

  useEffect(() => {
    const options = catalogos.projects
      //.filter(p => p.companyIds.includes(Number(company)))
      .filter(p => String(p.companyId) === String(company))
      .map(p => ({ label: p.name, value: p.id }));

    setProjectOptions(options);
    setProyectoSeleccionado(null);
  }, [company, catalogos]);

  // ── Columnas del DataGrid ─────────────────────────────────────────────────
  const columns: GridColDef[] = [
    {
      field: "itemCode",
      headerName: "Código",
      flex: 1,
      renderCell: (params) => <strong>{params.value}</strong>,
    },
    { field: "itemName", headerName: "Descripción", flex: 2 },
    {
      field: "quantityUsedInPeriod",
      headerName: "Consumo Período",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Chip label={params.value} size="small" color="info" variant="outlined" />
      ),
    },
    { field: "requestedQuantity", headerName: "Cantidad Solicitada", type: "number", flex: 1, editable: true },
    { field: "isUrgent", headerName: "Urgente", flex: 1, align: "center", headerAlign: "center", editable: true, type: "boolean" },
  ];

  // ── Handlers de actualización de filas ───────────────────────────────────
  // const processRowUpdateMaterial = (newRow: any) => {
  //   const updatedRow = { ...newRow, totalPrice: (newRow.requestedQuantity || 0) * (newRow.unitPrice || 0), pendingQuantity: (newRow.requestedQuantity || 0) - (newRow.deliveredQuantity || 0) };
  //   setMaterialesAPI(prev => prev.map(r => r.id === updatedRow.id ? updatedRow : r));
  //   if (requestDto) actualizarRequestDto([...materialesAPI.map(r => r.id === updatedRow.id ? updatedRow : r), ...herramientasAPI, ...equiposAPI]);
  //   return updatedRow;
  // };

  //   const processRowUpdateTool = (newRow: any) => {
  //   const updatedRow = { ...newRow, totalPrice: (newRow.requestedQuantity || 0) * (newRow.unitPrice || 0), pendingQuantity: (newRow.requestedQuantity || 0) - (newRow.deliveredQuantity || 0) };
  //   setHerramientasAPI(prev => prev.map(r => r.id === updatedRow.id ? updatedRow : r));
  //   if (requestDto) actualizarRequestDto([...materialesAPI, ...herramientasAPI.map(r => r.id === updatedRow.id ? updatedRow : r), ...equiposAPI]);
  //   return updatedRow;
  // };

  // const processRowUpdateEquipo = (newRow: any) => {
  //   const updatedRow = { ...newRow, totalPrice: (newRow.requestedQuantity || 0) * (newRow.unitPrice || 0) };
  //   setEquiposAPI(prev => prev.map(r => r.id === updatedRow.id ? updatedRow : r));
  //   return updatedRow;
  // };

  const processRowUpdateMaterial = (newRow: any) => {
    const updatedRow = {
      ...newRow,
      totalPrice: (newRow.requestedQuantity || 0) * (newRow.unitPrice || 0),
      pendingQuantity: (newRow.requestedQuantity || 0) - (newRow.deliveredQuantity || 0),
    };

    // Actualiza el estado
    setMaterialesAPI(prev => {
      const nuevosMateriales = prev.map(r => r.id === updatedRow.id ? updatedRow : r);

      // Actualiza requestDto usando los arrays actualizados
      if (requestDto) {
        actualizarRequestDto([...nuevosMateriales, ...herramientasAPI, ...equiposAPI]);
      }

      return nuevosMateriales;
    });

    return updatedRow;
  };

  const processRowUpdateTool = (newRow: any) => {
    const updatedRow = {
      ...newRow,
      totalPrice: (newRow.requestedQuantity || 0) * (newRow.unitPrice || 0),
      pendingQuantity: (newRow.requestedQuantity || 0) - (newRow.deliveredQuantity || 0),
    };

    setHerramientasAPI(prev => {
      const nuevasHerramientas = prev.map(r => r.id === updatedRow.id ? updatedRow : r);

      if (requestDto) {
        actualizarRequestDto([...materialesAPI, ...nuevasHerramientas, ...equiposAPI]);
      }

      return nuevasHerramientas;
    });

    return updatedRow;
  };

  const processRowUpdateEquipo = (newRow: any) => {
    const updatedRow = {
      ...newRow,
      totalPrice: (newRow.requestedQuantity || 0) * (newRow.unitPrice || 0),
    };

    setEquiposAPI(prev => {
      const nuevosEquipos = prev.map(r => r.id === updatedRow.id ? updatedRow : r);

      if (requestDto) {
        actualizarRequestDto([...materialesAPI, ...herramientasAPI, ...nuevosEquipos]);
      }

      return nuevosEquipos;
    });

    return updatedRow;
  };


  // ── Limpieza ──────────────────────────────────────────────────────────────
  const limpiarDatos = () => {
    setMaterialesAPI([]);
    setHerramientasAPI([]);
    setEquiposAPI([]);
    setRequestDto(null);
    setErrorMessage("");
    setShowSuccessGenerate(false);
    setShowSuccessSubmit(false);
  };

  const limpiarTodo = () => {
    setNotas("");
    setMaterialesAPI([]);
    setHerramientasAPI([]);
    setEquiposAPI([]);
    setRequestDto(null);
    setErrorMessage("");
    setShowSuccessGenerate(false);
    setShowSuccessExport(false);
    // Restaurar columnas por defecto al limpiar
    setColumnasSeleccionadas(COLUMNAS_DISPONIBLES.filter(c => c.default).map(c => c.field));
  };

  const actualizarRequestDto = (nuevosItems: SupplyRequestItem[]) => {
    if (!requestDto) return;
    setRequestDto({
      ...requestDto,
      items: nuevosItems,
      totalQuantity: nuevosItems.reduce((s, i) => s + i.requestedQuantity, 0),
      totalEstimatedValue: nuevosItems.reduce((s, i) => s + i.totalPrice, 0),
      totalItemsCount: nuevosItems.length,
    });
  };

  // ── Toggle de columna seleccionada ────────────────────────────────────────
  const toggleColumna = (field: ColumnField) => {
    setColumnasSeleccionadas(prev =>
      prev.includes(field)
        ? prev.filter(f => f !== field)
        : [...prev, field]
    );
  };

  // ── Exportación Excel DINÁMICA según columnas seleccionadas ───────────────
  const exportarSolicitudCompletaExcel = (requestData: SupplyRequestDto) => {
    const workbook = XLSX.utils.book_new();

    const prepararDatos = (items: SupplyRequestItem[]) =>
      items.map(item => {
        const row: Record<string, any> = {};
        // Mantener el orden definido en COLUMNAS_DISPONIBLES
        COLUMNAS_DISPONIBLES.forEach(col => {
          if (!columnasSeleccionadas.includes(col.field)) return;
          let value = (item as any)[col.field];
          if (col.field === "isUrgent") value = value ? "SÍ" : "NO";
          if (col.field === "uom") value = value ?? "UND";
          row[LABEL_MAP[col.field]] = value;
        });
        return row;
      });

    if (materialesAPI.length > 0)
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(prepararDatos(materialesAPI)), "Materiales");
    if (herramientasAPI.length > 0)
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(prepararDatos(herramientasAPI)), "Herramientas");
    if (equiposAPI.length > 0)
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(prepararDatos(equiposAPI)), "Equipos");

    XLSX.writeFile(workbook, `Solicitud_Abastecimiento_${requestData.requestNumber}.xlsx`);
  };

  // ── Exportaciones individuales (mantienen las mismas columnas dinámicas) ──
  const exportarCategoria = (items: SupplyRequestItem[], nombreCategoria: string) => {
    const prepararDatos = (arr: SupplyRequestItem[]) =>
      arr.map(item => {
        const row: Record<string, any> = {};
        COLUMNAS_DISPONIBLES.forEach(col => {
          if (!columnasSeleccionadas.includes(col.field)) return;
          let value = (item as any)[col.field];
          if (col.field === "isUrgent") value = value ? "SÍ" : "NO";
          if (col.field === "uom") value = value ?? "UND";
          row[LABEL_MAP[col.field]] = value;
        });
        return row;
      });

    const worksheet = XLSX.utils.json_to_sheet(prepararDatos(items));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, nombreCategoria);
    const fecha = new Date().toISOString().split("T")[0];
    XLSX.writeFile(workbook, `Solicitud_${nombreCategoria}_${requestDto?.requestNumber || fecha}.xlsx`);
    setShowSuccessExport(true);
    setTimeout(() => setShowSuccessExport(false), 3000);
  };

  const exportarMateriales = () => materialesAPI.length ? exportarCategoria(materialesAPI, "Materiales") : alert("No hay materiales");
  const exportarHerramientas = () => herramientasAPI.length ? exportarCategoria(herramientasAPI, "Herramientas") : alert("No hay herramientas");
  const exportarEquipos = () => equiposAPI.length ? exportarCategoria(equiposAPI, "Equipos") : alert("No hay equipos");

  // ── Generar solicitud ─────────────────────────────────────────────────────
  const handleGenerarSolicitud = async () => {
    // toast.info("Generando solicitud...", { position: "top-right" });
    setLoading(true);
    setErrorMessage("");
    setShowSuccessGenerate(false);
    setShowSuccessSubmit(false);

    try {
      const response = await fetch(`${API_URL}/api/hub-supply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hubId: 1,
          periodStartDate: valueInit?.format("YYYY-MM-DD"),
          periodEndDate: valueFin?.format("YYYY-MM-DD"),
          periodValueEntrega: valueEntrega?.format("YYYY-MM-DD"),
          tenantId: 1,
          projectId: 1,
          requestedBy: 1,
          notes: notas || `Solicitud generada para período ${valueInit} - ${valueFin}`,
          requestedDeliveryDate: valueEntrega?.format("YYYY-MM-DD"),
        }),
      });

      // if (!response.ok) throw new Error("Error al generar la solicitud de abastecimiento");
      if (!response.ok) {
        toast.error("No se encontraron datos...", { position: "top-right" });

        return
        // toast.error("No se encontraron datos...", { position: "top-right" });

      }
      const data: SupplyRequestDto = await response.json();
      setRequestDto(data);
      setMaterialesAPI(data.items.filter(i => i.productType === "MATERIAL"));
      setHerramientasAPI(data.items.filter(i => i.productType === "TOOL"));
      setEquiposAPI(data.items.filter(i => i.productType === "EQUIPMENT"));
      setShowSuccessGenerate(true);
    } catch (error) {
      toast.error("No se encontraron datos...", { position: "top-right" });

      // setErrorMessage(error instanceof Error ? error.message : "Error al cargar los datos del período");
    } finally {
      setLoading(false);
    }
  };

  // ── Confirmar y enviar ────────────────────────────────────────────────────
  const handleConfirmarSolicitud = () => {
    if (!requestDto) { alert("No hay datos para enviar"); return; }
    if (!requestDto.items.some(i => i.requestedQuantity > 0)) {
      setErrorMessage("Debes tener al menos un item con cantidad mayor a 0");
      return;
    }
    setConfirmDialogOpen(true);
  };

  const handleEnviarSolicitud = async () => {
    if (!requestDto) return;
    setConfirmDialogOpen(false);
    setSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/api/hub-supply/supply-requests/${requestDto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestDto),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al enviar la solicitud");
      }

      const submittedRequest: SupplyRequestDto = await response.json();
      setSubmittedRequestInfo(submittedRequest);

      // Exportar con las columnas que el usuario seleccionó
      exportarSolicitudCompletaExcel(submittedRequest);

      limpiarTodo();
      setShowSuccessSubmit(true);
      // El useEffect de showSuccessSubmit disparará el scroll automáticamente
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Error al enviar la solicitud");
    } finally {
      setSubmitting(false);
    }
  };

  const totalEstimado = requestDto?.totalEstimatedValue || 0;

  // ────────────────────────────────────────────────────────────────────────────
  //  RENDER
  // ────────────────────────────────────────────────────────────────────────────
  return (
    // 👇 ref aquí para que el scrollIntoView funcione al cambiar showSuccessSubmit
    <Box
      ref={topRef}
      sx={{ maxWidth: 1400, mx: "auto", p: 4, display: "flex", flexDirection: "column", gap: 3 }}
    >
      <TitleCard
        icon={<ListAltOutlined sx={{ fontSize: 32 }} />}
        title="Solicitud de Abastecimiento"
        description="Genera solicitudes de materiales, equipos y herramientas basadas en el consumo de períodos anteriores"
      />

      <Card elevation={0} sx={{ borderRadius: 4, background: "transparent" }}>

        {/* ══════════════════════════════════════════════════════════════════
            VISTA DE ÉXITO — se muestra solo cuando showSuccessSubmit = true
        ══════════════════════════════════════════════════════════════════ */}
        {showSuccessSubmit && submittedRequestInfo ? (
          <Card
            elevation={3}
            sx={{ mt: 2, borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", p: 4, minHeight: 600, display: "flex", flexDirection: "column" }}
          >
            <Fade in={showSuccessSubmit} timeout={800}>
              <Box sx={{ textAlign: "center", py: 6, px: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>

                {/* Ícono animado */}
                <Box sx={{ position: "relative", display: "inline-flex", mb: 2 }}>
                  <CheckCircleOutline sx={{ fontSize: 100, color: "success.main" }} />
                  <Box sx={{
                    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                    borderRadius: "50%", border: "4px solid", borderColor: "success.light",
                    animation: "ripple 1.5s infinite ease-in-out",
                    "@keyframes ripple": {
                      "0%": { transform: "scale(0.8)", opacity: 1 },
                      "100%": { transform: "scale(1.4)", opacity: 0 },
                    },
                  }} />
                </Box>

                <Typography variant="h4" fontWeight={800} color="text.primary">
                  ¡Solicitud Registrada con Éxito!
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: "auto", mb: 2 }}>
                  La solicitud ha sido registrada en el sistema con exito.
                </Typography>

                {/* Resumen */}
                <Paper variant="outlined" sx={{ p: 3, width: "100%", maxWidth: 620, borderRadius: 3, bgcolor: "#f8fafc", border: "1px dashed", borderColor: "divider" }}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={3} divider={<Divider orientation="vertical" flexItem />}>
                    <Box sx={{ flex: 1, textAlign: "center" }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: "uppercase" }}>
                        Nro. Solicitud
                      </Typography>
                      <Typography variant="h6" fontWeight={700} color="primary.main">
                        {submittedRequestInfo.requestNumber}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1, textAlign: "center" }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: "uppercase" }}>
                        Items Totales
                      </Typography>
                      <Typography variant="h6" fontWeight={700}>
                        {submittedRequestInfo.items.length} productos
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1, textAlign: "center" }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: "uppercase" }}>
                        Estado Actual
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "center", mt: 0.5 }}>
                        <Chip label={submittedRequestInfo.status} color="success" size="small" sx={{ fontWeight: 800, borderRadius: 1 }} />
                      </Box>
                    </Box>
                  </Stack>
                </Paper>

                {/* Desglose por tipo */}
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center", width: "100%", maxWidth: 620 }}>
                  {[
                    { label: "Materiales", count: submittedRequestInfo.items.filter(i => i.productType === "MATERIAL").length, color: "#ed6c02", bg: "#fff3e0" },
                    { label: "Herramientas", count: submittedRequestInfo.items.filter(i => i.productType === "TOOL").length, color: "#1976d2", bg: "#e3f2fd" },
                    { label: "Equipos", count: submittedRequestInfo.items.filter(i => i.productType === "EQUIPMENT").length, color: "#2e7d32", bg: "#e8f5e9" },
                  ].map(cat => (
                    <Box key={cat.label} sx={{ flex: 1, minWidth: 120, textAlign: "center", p: 2, bgcolor: cat.bg, borderRadius: 2, border: `1px solid ${cat.color}30` }}>
                      <Typography variant="h5" fontWeight={800} sx={{ color: cat.color }}>{cat.count}</Typography>
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>{cat.label}</Typography>
                    </Box>
                  ))}
                </Box>

                <Alert icon={<FileDownloadOutlined />} severity="info" sx={{ borderRadius: 2, maxWidth: 500 }}>
                  Se ha descargado automáticamente el reporte detallado en formato Excel con las columnas seleccionadas.
                </Alert>

                {/* Botones de acción */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 2 }}>
                  <ButtonBase
                    label="Generar Nueva Solicitud"
                    startIcon={<AddCircleOutline />}
                    onClick={() => {
                      limpiarTodo();
                      setShowSuccessSubmit(false);
                      setSubmittedRequestInfo(null);
                    }}
                    sx={{ px: 4, py: 1.5 }}
                  />
                  <ButtonBase
                    label="Ir al Listado"
                    variant="outlined"
                    startIcon={<ListAltOutlined />}
                    onClick={() => { /* navegación */ }}
                    sx={{ px: 4, py: 1.5, bgcolor: "white", color: "text.primary", border: "1px solid #cbd5e1" }}
                  />
                </Stack>
              </Box>
            </Fade>
          </Card>

        ) : (
          /* ══════════════════════════════════════════════════════════════
              FORMULARIO PRINCIPAL
          ══════════════════════════════════════════════════════════════ */
          <>
            {/* Alertas */}
            {showSuccessExport && (
              <Fade in timeout={600}>
                <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                  <Typography variant="body1" fontWeight={600}>✅ Archivo Excel generado exitosamente</Typography>
                </Alert>
              </Fade>
            )}

            {showSuccessGenerate && requestDto && (
              <Alert severity="success" sx={{ mb: 3, mt: 2, borderRadius: 2, boxShadow: "rgba(2,136,209,0.15) 0px 4px 16px" }}>
                <Typography variant="body1" fontWeight={600}>✅ Solicitud generada: {requestDto.requestNumber}</Typography>
                <Typography variant="body2">
                  Se han cargado {requestDto.totalItemsCount} items con consumo del período.
                  <br />Estado: {requestDto.status === "DRAFT" ? "BORRADOR" : requestDto.status}
                </Typography>
              </Alert>
            )}

            {errorMessage && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setErrorMessage("")}>
                {errorMessage}
              </Alert>
            )}

            {/* Panel de filtros — solo visible antes de generar */}
            {!showSuccessGenerate && !requestDto && (
              <Box sx={{ mb: 4 }}>
                <Box sx={{
                  display: "flex", flexDirection: { xs: "column", lg: "row" },
                  bgcolor: "background.paper", borderRadius: 4,
                  border: "1px solid", borderColor: "divider", overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                }}>
                  {/* Bloque izquierdo: Rango */}
                  <Box sx={{ flex: { lg: "0 0 350px" }, bgcolor: "#f8fafc", p: 3, borderRight: { lg: "1px solid" }, borderColor: "divider" }}>
                    <Stack spacing={2.5}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box sx={{ width: 4, height: 18, bgcolor: "primary.main", borderRadius: 1 }} />
                        <Typography variant="subtitle2" fontWeight={700} sx={{ letterSpacing: 0.5, textTransform: "uppercase" }}>
                          Rango de Análisis
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                        El sistema calculará el consumo promedio en el intervalo seleccionado.
                      </Typography>
                      <DatePickerBase value={valueInit} setValue={setValueInit} label="Desde" />
                      <DatePickerBase value={valueFin} setValue={setValueFin} label="Hasta" />
                    </Stack>
                  </Box>

                  {/* Bloque derecho: Destino y acción */}
                  <Box sx={{ flex: 1, p: 3, display: "flex", flexDirection: "column" }}>
                    <Stack spacing={3} sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box sx={{ width: 4, height: 18, bgcolor: "info.main", borderRadius: 1 }} />
                        <Typography variant="subtitle2" fontWeight={700} sx={{ letterSpacing: 0.5, textTransform: "uppercase" }}>
                          Destino del Requerimiento
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <DatePickerBase value={valueEntrega} setValue={setValueEntrega} label="Fecha de Entrega Deseada" />
                        </Box>
                        <Box sx={{ flex: 2 }}>
                          <SelectBase
                            label="Proyecto u Obra"
                            size="medium"
                            value={valueProyectoSeleccionado ?? ""}
                            onChange={setProyectoSeleccionado}
                            options={[{ label: "Seleccionar un proyecto...", value: 0 }, ...projectOptions]}
                            fullWidth
                          />
                        </Box>
                      </Box>

                      <Box>
                        <Typography variant="body2" color="text.secondary" fontWeight={600} mb={1}>
                          Notas adicionales
                        </Typography>
                        <TextField
                          fullWidth multiline rows={2} value={notas} size="small"
                          sx={{ background: "white" }}
                          onChange={e => setNotas(e.target.value)}
                          placeholder="Agrega notas o justificación para esta solicitud..."
                        />
                      </Box>
                    </Stack>

                    <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid", borderColor: "grey.100", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                      <Typography variant="caption" sx={{ color: "text.disabled", display: "flex", alignItems: "center", gap: 0.5 }}>
                        <CheckCircleOutline sx={{ fontSize: 14 }} /> Campos validados para el cálculo de stock
                      </Typography>
                      <ButtonBase
                        onClick={handleGenerarSolicitud}
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchOutlined />}
                        label={loading ? "Procesando..." : "Analizar Consumo y Generar Propuesta"}
                        sx={{ px: 4, py: 1.5, borderRadius: 2.5, fontWeight: 700, fontSize: "0.85rem", textTransform: "none", boxShadow: "0 8px 16px rgba(37,99,235,0.15)", transition: "all 0.2s", "&:hover": { transform: "translateY(-1px)", boxShadow: "0 12px 20px rgba(37,99,235,0.25)" } }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}

            {/* Tablas de items generados */}
            {requestDto && (
              <>
                {/* <Divider sx={{ my: 3 }} /> */}

                {/* Info de la solicitud */}
                <Box sx={{ mb: 3, mt: 4, p: 2, bgcolor: "primary.lighter", borderRadius: 2, border: "2px solid", borderColor: "primary.main" }}>
                  <Typography variant="subtitle1" fontWeight={700} mb={1}>
                    📋 Solicitud: {requestDto.requestNumber}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                    <Typography variant="body2"><strong>Estado:</strong> {requestDto.status === "DRAFT" ? "Borrador" : requestDto.status}</Typography>
                    <Typography variant="body2"><strong>Total Items:</strong> {requestDto.items?.length}</Typography>
                    <Typography variant="body2"><strong>Total Estimado:</strong> S/. {totalEstimado.toFixed(2)}</Typography>
                  </Box>
                </Box>

                {/* Materiales */}
                {materialesAPI.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography variant="body2" fontWeight={600} sx={{ color: categoriaConfig.MATERIAL.color }}>
                          {categoriaConfig.MATERIAL.icon} Materiales
                        </Typography>
                        <Chip label={`${materialesAPI.length} items`} size="small" sx={{ bgcolor: categoriaConfig.MATERIAL.color, color: "white", fontWeight: 600 }} />
                      </Box>
                      <ButtonBase variant="contained" size="small" label="Exportar materiales" startIcon={<FileDownloadOutlined />} onClick={exportarMateriales}
                        sx={{ bgcolor: categoriaConfig.MATERIAL.color, "&:hover": { bgcolor: categoriaConfig.MATERIAL.color, filter: "brightness(0.9)" } }} />
                    </Box>
                    <CustomDataGrid columns={columns} localRows={materialesAPI} serverSide={false} search={""} onSearch={() => { }} editMode="cell" processRowUpdate={processRowUpdateMaterial} sx={{ border: `2px solid ${categoriaConfig.MATERIAL.color}30` }} />
                  </Box>
                )}

                {/* Herramientas */}
                {herramientasAPI.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography variant="body2" fontWeight={600} sx={{ color: categoriaConfig.TOOL.color }}>
                          {categoriaConfig.TOOL.icon} Herramientas
                        </Typography>
                        <Chip label={`${herramientasAPI.length} items`} size="small" sx={{ bgcolor: categoriaConfig.TOOL.color, color: "white", fontWeight: 600 }} />
                      </Box>
                      <ButtonBase variant="contained" size="small" label="Exportar Herramientas" startIcon={<FileDownloadOutlined />} onClick={exportarHerramientas}
                        sx={{ bgcolor: categoriaConfig.TOOL.color, "&:hover": { bgcolor: categoriaConfig.TOOL.color, filter: "brightness(0.9)" } }} />
                    </Box>
                    <CustomDataGrid columns={columns} localRows={herramientasAPI} serverSide={false} search={""} onSearch={() => { }} editMode="cell" processRowUpdate={processRowUpdateTool} sx={{ border: `2px solid ${categoriaConfig.TOOL.color}30` }} />
                  </Box>
                )}

                {/* Equipos */}
                {equiposAPI.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography variant="body2" fontWeight={600} sx={{ color: categoriaConfig.EQUIPMENT.color }}>
                          {categoriaConfig.EQUIPMENT.icon} Equipos
                        </Typography>
                        <Chip label={`${equiposAPI.length} items`} size="small" sx={{ bgcolor: categoriaConfig.EQUIPMENT.color, color: "white", fontWeight: 600 }} />
                      </Box>
                      <ButtonBase variant="contained" size="small" label="Exportar Equipos" startIcon={<FileDownloadOutlined />} onClick={exportarEquipos}
                        sx={{ bgcolor: categoriaConfig.EQUIPMENT.color, "&:hover": { bgcolor: categoriaConfig.EQUIPMENT.color, filter: "brightness(0.9)" } }} />
                    </Box>
                    <CustomDataGrid columns={columns} localRows={equiposAPI} serverSide={false} search={""} onSearch={() => { }} editMode="cell" processRowUpdate={processRowUpdateEquipo} />
                  </Box>
                )}

                <Divider sx={{ my: 3 }} />

                {/* Botones de acción */}
                <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", flexWrap: "wrap" }}>
                  <ButtonBase label="Recargar Datos" startIcon={<RefreshOutlined />} onClick={limpiarDatos} disabled={loading} sx={{ px: 4, py: 1.2 }} />
                  <ButtonBase
                    label={submitting ? "Enviando..." : "Confirmar y Enviar Solicitud"}
                    startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SendOutlined />}
                    onClick={handleConfirmarSolicitud}
                    disabled={submitting || requestDto.status !== "DRAFT"}
                  />
                </Box>
              </>
            )}
          </>
        )}
      </Card>

      {/* ══════════════════════════════════════════════════════════════════════
          MODAL DE CONFIRMACIÓN — con selector de columnas Excel
      ══════════════════════════════════════════════════════════════════════ */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" } }}
      >
        {/* Header */}
        <DialogTitle sx={{ m: 0, p: 2, display: "flex", alignItems: "center", justifyContent: "space-between", bgcolor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ bgcolor: "primary.main", color: "white", p: 0.5, borderRadius: 1, display: "flex" }}>
              <SendOutlined fontSize="small" />
            </Box>
            <Typography variant="h6" fontWeight={700} sx={{ color: "#1e293b" }}>Confirmar Envío</Typography>
          </Stack>
          <IconButton onClick={() => setConfirmDialogOpen(false)} size="small">
            <Close fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3, mt: 2 }}>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Verifica los detalles antes de continuar. Una vez enviada, la solicitud se bloqueará para edición.
          </Typography>

          {/* Resumen */}
          <Box sx={{ p: 2.5, bgcolor: "#f1f5f9", borderRadius: 2, mb: 3, border: "1px solid #e2e8f0" }}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <AssignmentOutlined color="action" fontSize="small" />
                <Box>
                  <Typography variant="caption" display="block" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700 }}>Número de Solicitud</Typography>
                  <Typography variant="body2" fontWeight={600}>{requestDto?.requestNumber || "N/A"}</Typography>
                </Box>
              </Stack>
              <Divider />
              <Stack direction="row" spacing={2} alignItems="center">
                <Inventory2Outlined color="action" fontSize="small" />
                <Box>
                  <Typography variant="caption" display="block" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700 }}>Total de Items</Typography>
                  <Typography variant="body2" fontWeight={600}>{requestDto?.items?.length} productos registrados</Typography>
                </Box>
              </Stack>
              <Divider />
              <Stack direction="row" spacing={2} alignItems="center">
                <EventOutlined color="action" fontSize="small" />
                <Box>
                  <Typography variant="caption" display="block" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700 }}>Fecha de Requerimiento</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {dayjs(requestDto?.requestedDeliveryDate).format("DD [de] MMMM, YYYY")}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>

          {/* ── Selector de columnas Excel ──────────────────────────────── */}
          <Box sx={{ mb: 3, p: 2.5, bgcolor: "#f8fafc", borderRadius: 2, border: "1px solid #e2e8f0" }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
              <TableChartOutlined color="action" fontSize="small" />
              <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: "uppercase", letterSpacing: 0.8 }}>
                Columnas a incluir en el Excel
              </Typography>
            </Stack>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {COLUMNAS_DISPONIBLES.map(col => {
                const seleccionada = columnasSeleccionadas.includes(col.field);
                return (
                  <Chip
                    key={col.field}
                    label={col.label}
                    size="small"
                    variant={seleccionada ? "filled" : "outlined"}
                    color={seleccionada ? "primary" : "default"}
                    onClick={() => toggleColumna(col.field)}
                    sx={{
                      cursor: "pointer",
                      fontWeight: seleccionada ? 700 : 400,
                      transition: "all 0.15s",
                    }}
                  />
                );
              })}
            </Box>

            <Typography variant="caption" color="text.disabled" sx={{ mt: 1.5, display: "block" }}>
              {columnasSeleccionadas.length} de {COLUMNAS_DISPONIBLES.length} columnas seleccionadas
              {columnasSeleccionadas.length === 0 && (
                <Box component="span" sx={{ color: "error.main", ml: 1, fontWeight: 600 }}>
                  — Selecciona al menos una columna
                </Box>
              )}
            </Typography>
          </Box>
          {/* ─────────────────────────────────────────────────────────────── */}

          <Alert severity="warning" icon={<WarningAmberOutlined />} sx={{ borderRadius: 2, fontWeight: 500 }}>
            Esta acción es irreversible. La solicitud se bloqueará para edición una vez enviada.
          </Alert>
        </DialogContent>

        <DialogActions sx={{ p: 3, bgcolor: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
          <ButtonBase
            label="Regresar"
            onClick={() => setConfirmDialogOpen(false)}
            sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1", "&:hover": { bgcolor: "#f1f5f9" } }}
          />
          <ButtonBase
            label="Confirmar y Enviar"
            startIcon={<SendOutlined />}
            onClick={handleEnviarSolicitud}
            disabled={columnasSeleccionadas.length === 0}
            sx={{ px: 4, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
}