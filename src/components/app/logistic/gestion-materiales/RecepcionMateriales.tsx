"use client";

import { useState, useEffect, useRef } from "react";
import {
  Box, Card, Typography, TextField, Divider, Alert, Fade, Chip,
  CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Stack, Paper, InputAdornment, Tabs, Tab,
  FormControlLabel, Switch,
} from "@mui/material";
import {
  InventoryOutlined, CheckCircleOutline, WarningAmberOutlined,
  SearchOutlined, CloseOutlined, PictureAsPdfOutlined, ImageOutlined,
  ArrowBackOutlined, QrCodeScannerOutlined, FilterListOutlined,
  AssignmentOutlined, CheckCircle, AutoAwesomeOutlined,
} from "@mui/icons-material";
import { TitleCard } from "@/src/components/base/TitleCard";
import { SectionHeader } from "@/src/components/base/SectionHeader";
import { FileUploader } from "@/src/components/base/FileUploader";
import CustomDataGrid from "@/src/components/base/CustomDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import SelectBase from "@/src/components/base/SelectBase";
import DatePickerBase from "@/src/components/base/DatePickerBase";
import ButtonBase from "@/src/components/base/ButtonBase";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/Store";
import { CatalogService } from "@/src/services/api/CatalogService";
import { CatalogDTO } from "@/src/types/Catalog.types";
import { API_URL } from "@/src/lib/config";
import dayjs, { Dayjs } from "dayjs";

// ─── Tipos ─────────────────────────────────────────────────────────────────

interface SupplyRequestSummary {
  id: number;
  status: string;
  notes: string;
  materialQuantity: number;
  toolQuantity: number;
  equipmentQuantity: number;
}

interface SupplyRequestItem {
  itemCode: string;
  itemDescription: string;
  productType: "MATERIAL" | "EQUIPMENT" | "TOOL";
  quantityUsedInPeriod: number;
  requestedQuantity: number;
  deliveredQuantity: number;
  pendingQuantity: number;
  unitPrice: number | null;
  totalPrice: number | null;
  receivedQuantity?: number;
  serials?: EquipoSerial[];
}

interface EquipoSerial {
  serialNumber: string;
  mac?: string;
  ua?: string;
  mtaMac?: string;
}

type EquipoTipo = "MODEM" | "DECODIFICADOR" | "ROUTER" | "SWITCH" | "OTRO";

const getEquipoTipo = (_codigo: string, descripcion: string): EquipoTipo => {
  const desc = descripcion.toUpperCase();
  if (desc.includes("MODEM")) return "MODEM";
  if (desc.includes("DECODIFICADOR")) return "DECODIFICADOR";
  if (desc.includes("ROUTER") || desc.includes("WIFI")) return "ROUTER";
  if (desc.includes("SWITCH")) return "SWITCH";
  return "OTRO";
};

const camposEquipo: Record<EquipoTipo, { field: string; label: string; placeholder: string }[]> = {
  MODEM: [
    { field: "serialNumber", label: "Número de Serie", placeholder: "Escanear o ingresar S/N..." },
    { field: "mac",          label: "MAC Address",     placeholder: "XX:XX:XX:XX:XX:XX" },
    { field: "ua",           label: "UA",              placeholder: "Ingresar UA..." },
  ],
  DECODIFICADOR: [
    { field: "serialNumber", label: "Número de Serie", placeholder: "Escanear o ingresar S/N..." },
    { field: "mac",          label: "MAC Address",     placeholder: "XX:XX:XX:XX:XX:XX" },
  ],
  ROUTER: [
    { field: "serialNumber", label: "Número de Serie", placeholder: "Escanear o ingresar S/N..." },
    { field: "mac",          label: "MAC Address",     placeholder: "XX:XX:XX:XX:XX:XX" },
    { field: "mtaMac",       label: "MTA MAC",         placeholder: "XX:XX:XX:XX:XX:XX" },
  ],
  SWITCH: [
    { field: "serialNumber", label: "Número de Serie", placeholder: "Escanear o ingresar S/N..." },
    { field: "mac",          label: "MAC Address",     placeholder: "XX:XX:XX:XX:XX:XX" },
  ],
  OTRO: [
    { field: "serialNumber", label: "Número de Serie", placeholder: "Escanear o ingresar S/N..." },
  ],
};

const categoriaConfig = {
  MATERIAL:  { label: "Materiales",   color: "#ed6c02", bg: "#fff3e0" },
  TOOL:      { label: "Herramientas", color: "#1976d2", bg: "#e3f2fd" },
  EQUIPMENT: { label: "Equipos",      color: "#2e7d32", bg: "#e8f5e9" },
};

// ─── Componente ─────────────────────────────────────────────────────────────

export default function RecepcionMateriales() {
  const topRef = useRef<HTMLDivElement>(null);
  const company = useSelector((state: RootState) => state.companies.company);

  const [catalogos, setCatalogos]       = useState<CatalogDTO>({ companies: [], projects: [] });
  const [projectOptions, setProjectOptions] = useState<{ label: string; value: any }[]>([]);
  const [receptionDate, setReceptionDate]   = useState<Dayjs | null>(dayjs());
  const [selectedProject, setSelectedProject] = useState<string | number | null>(null);

  const [vista, setVista] = useState<"list" | "detail">("list");

  const [solicitudes, setSolicitudes]       = useState<SupplyRequestSummary[]>([]);
  const [solicitudDetalle, setSolicitudDetalle] = useState<any | null>(null);
  const [loadingList, setLoadingList]       = useState(false);
  const [loadingDetail, setLoadingDetail]   = useState(false);
  const [errorMsg, setErrorMsg]             = useState("");

  // ✅ Estado de éxito para mostrar pantalla animada
  const [showSuccess, setShowSuccess]       = useState(false);
  const [successData, setSuccessData]       = useState<{ id: number; totalItems: number } | null>(null);

  const [tabActual, setTabActual]           = useState(0);
  const [itemsRecepcion, setItemsRecepcion] = useState<SupplyRequestItem[]>([]);
  const [archivoGuia, setArchivoGuia]       = useState<File | null>(null);
  const [codigoGuia, setCodigoGuia]         = useState("");

  // Modal escaneo
  const [modalEquipoOpen, setModalEquipoOpen]       = useState(false);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<SupplyRequestItem | null>(null);
const [serialActual, setSerialActual]   = useState<Partial<EquipoSerial>>({});
  const [camposError, setCamposError]     = useState<Record<string, string>>({}); // ✅ nuevo

  const [serialesCapturados, setSerialésCapturados] = useState<EquipoSerial[]>([]);
  const [autoGuardar, setAutoGuardar]               = useState(true); // ✅ Checkbox auto-guardar

  const [searchMat,     setSearchMat]     = useState("");
  const [searchTool,    setSearchTool]    = useState("");
  const [searchEq,      setSearchEq]      = useState("");
  const [searchListado, setSearchListado] = useState("");

  // Reglas de validación por campo
const validacionesCampo: Record<string, { regex: RegExp; mensaje: string }> = {
  serialNumber: {
    regex: /^[A-Z0-9]{14,20}$/,
    mensaje: "Serie inválida (ej: ZTEATV45501950107 — alfanumérico, 14-20 chars)",
  },
  mac: {
    regex: /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/,
    mensaje: "MAC inválida (ej: 6C:B8:81:F2:B7:D7 — formato XX:XX:XX:XX:XX:XX)",
  },
  mtaMac: {
    regex: /^[0-9A-Fa-f]{12}$/,
    mensaje: "MTA MAC inválida (ej: CC00F1CA6351 — 12 caracteres hex sin separadores)",
  },
  ua: {
    regex: /^.{8}$/,
    mensaje: "UA inválido (debe tener exactamente 8 caracteres)",
  },
};

  // ── Catálogos ─────────────────────────────────────────────────────────────
  useEffect(() => {
    CatalogService.getAllCatalogs()
      .then(data => setCatalogos({ companies: data.companies, projects: data.projects }))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const opts = catalogos.projects
      .filter(p => String(p.companyId) === String(company))
      .map(p => ({ label: p.name, value: p.id }));
    setProjectOptions(opts);
    setSelectedProject(null);
  }, [company, catalogos]);

  // ── Scroll top cuando se muestra éxito ────────────────────────────────────
  useEffect(() => {
    if (showSuccess) {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showSuccess]);

  // ── Buscar Solicitudes ────────────────────────────────────────────────────
  const handleBuscarSolicitudes = async () => {
    if (!selectedProject) { setErrorMsg("Selecciona un proyecto"); return; }
    setLoadingList(true);
    setErrorMsg("");
    try {
      const fecha = receptionDate?.format("YYYY-MM-DD") ?? dayjs().format("YYYY-MM-DD");
      const res = await fetch(
        `${API_URL}/api/hub-supply/supply-requests?companyId=${company}&projectId=${selectedProject}&receptionDate=${fecha}`
      );
      if (!res.ok) throw new Error("Error al obtener solicitudes");
      setSolicitudes(await res.json());
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setLoadingList(false);
    }
  };

  // ── Ver Detalle ───────────────────────────────────────────────────────────
  const handleVerDetalle = async (solicitudId: number) => {
    setLoadingDetail(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${API_URL}/api/hub-supply/companies/${company}/supply-requests/${solicitudId}`);
      if (!res.ok) throw new Error("Error al obtener detalle");
      const raw = await res.json();
      const detalle = Array.isArray(raw) ? raw[0] : raw;
      setSolicitudDetalle(detalle);
      const items: SupplyRequestItem[] = (detalle.items ?? []).map((item: any) => ({
        ...item,
        receivedQuantity: item.pendingQuantity ?? item.requestedQuantity,
        serials: [],
      }));
      setItemsRecepcion(items);
      setVista("detail");
      setTabActual(0);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Error al cargar detalle");
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleVolverLista = () => {
    setVista("list");
    setSolicitudDetalle(null);
    setItemsRecepcion([]);
    setArchivoGuia(null);
    setCodigoGuia("");
    setTabActual(0);
    setShowSuccess(false);
  };

  // ── Row update ────────────────────────────────────────────────────────────
  const processRowUpdate = (newRow: any) => {
    setItemsRecepcion(prev =>
      prev.map(item => item.itemCode === newRow.itemCode ? { ...item, receivedQuantity: newRow.receivedQuantity } : item)
    );
    return newRow;
  };

  // ── Modal Escaneo ─────────────────────────────────────────────────────────
  // const abrirModalEquipo = (item: SupplyRequestItem) => {
  //   setEquipoSeleccionado(item);
  //   setSerialActual({});
  //   const existentes = itemsRecepcion.find(i => i.itemCode === item.itemCode)?.serials ?? [];
  //   setSerialésCapturados([...existentes]);
  //   setModalEquipoOpen(true);
  // };
  const abrirModalEquipo = (item: SupplyRequestItem) => {
  setEquipoSeleccionado(item);
  setSerialActual({});
  setCamposError({}); // ✅ limpiar errores al abrir
  const existentes = itemsRecepcion.find(i => i.itemCode === item.itemCode)?.serials ?? [];
  setSerialésCapturados([...existentes]);
  setModalEquipoOpen(true);
};

  // ✅ Auto-guardar: verifica si todos los campos del serial están completos
  // const checkAutoAgregar = (nuevoSerial: Partial<EquipoSerial>, tipo: EquipoTipo, totalReq: number, currentList: EquipoSerial[]) => {
  //   if (!autoGuardar) return;
  //   const campos = camposEquipo[tipo];
  //   const todoCompleto = campos.every(c => !!(nuevoSerial as any)[c.field]?.trim());
  //   if (!todoCompleto) return;

  //   const nuevo: EquipoSerial = { ...nuevoSerial } as EquipoSerial;
  //   const nuevaLista = [...currentList, nuevo];
  //   setSerialésCapturados(nuevaLista);
  //   setSerialActual({});

  //   // Si alcanzamos el total requerido, guardar y cerrar automáticamente
  //   if (nuevaLista.length >= totalReq && equipoSeleccionado) {
  //     guardarSerialesConLista(nuevaLista);
  //   }
  // };

  // const handleCampoChange = (field: string, value: string, tipo: EquipoTipo, totalReq: number) => {
  //   const updated = { ...serialActual, [field]: value };
  //   setSerialActual(updated);
  //   checkAutoAgregar(updated, tipo, totalReq, serialesCapturados);
  // };
  const validarCampo = (field: string, value: string): string => {
  if (!value.trim()) return "";
  const regla = validacionesCampo[field];
  if (!regla) return "";
  return regla.regex.test(value.trim()) ? "" : regla.mensaje;
};

const checkAutoAgregar = (
  nuevoSerial: Partial<EquipoSerial>,
  tipo: EquipoTipo,
  totalReq: number,
  currentList: EquipoSerial[]
) => {
  if (!autoGuardar) return;
  const campos = camposEquipo[tipo];

  // Verificar que todos los campos tengan valor
  const todoCompleto = campos.every(c => !!(nuevoSerial as any)[c.field]?.trim());
  if (!todoCompleto) return;

  // Verificar que ningún campo tenga error de validación
  const hayErrores = campos.some(c => {
    const val = (nuevoSerial as any)[c.field] ?? "";
    return !!validarCampo(c.field, val);
  });
  if (hayErrores) return;

  const nuevo: EquipoSerial = { ...nuevoSerial } as EquipoSerial;
  const nuevaLista = [...currentList, nuevo];
  setSerialésCapturados(nuevaLista);
  setSerialActual({});
  setCamposError({});

  if (nuevaLista.length >= totalReq && equipoSeleccionado) {
    guardarSerialesConLista(nuevaLista);
  }
};

const handleCampoChange = (field: string, value: string, tipo: EquipoTipo, totalReq: number) => {
  const updated = { ...serialActual, [field]: value };
  setSerialActual(updated);

  // Validar campo en tiempo real solo si ya tiene suficientes chars
  const regla = validacionesCampo[field];
  if (regla && value.trim()) {
    const error = validarCampo(field, value);
    setCamposError(prev => ({ ...prev, [field]: error }));
  } else {
    setCamposError(prev => ({ ...prev, [field]: "" }));
  }

  checkAutoAgregar(updated, tipo, totalReq, serialesCapturados);
};

  // const agregarSerial = () => {
  //   if (!serialActual.serialNumber?.trim()) return;
  //   setSerialésCapturados(prev => [...prev, { ...serialActual } as EquipoSerial]);
  //   setSerialActual({});
  // };
const agregarSerial = () => {
  if (!equipoSeleccionado) return;
  const tipo = getEquipoTipo(equipoSeleccionado.itemCode, equipoSeleccionado.itemDescription);
  const campos = camposEquipo[tipo];

  // Validar todos los campos
  const nuevosErrores: Record<string, string> = {};
  let hayError = false;
  campos.forEach(c => {
    const val = (serialActual as any)[c.field] ?? "";
    const err = validarCampo(c.field, val);
    if (err) { nuevosErrores[c.field] = err; hayError = true; }
    if (!val.trim()) { nuevosErrores[c.field] = `${c.label} es requerido`; hayError = true; }
  });

  if (hayError) { setCamposError(nuevosErrores); return; }

  setSerialésCapturados(prev => [...prev, { ...serialActual } as EquipoSerial]);
  setSerialActual({});
  setCamposError({});
};

  const eliminarSerial = (idx: number) => {
    setSerialésCapturados(prev => prev.filter((_, i) => i !== idx));
  };

  const guardarSerialesConLista = (lista: EquipoSerial[]) => {
    if (!equipoSeleccionado) return;
    setItemsRecepcion(prev =>
      prev.map(item =>
        item.itemCode === equipoSeleccionado.itemCode
          ? { ...item, serials: lista, receivedQuantity: lista.length }
          : item
      )
    );
    setModalEquipoOpen(false);
  };

  const guardarSeriales = () => {
    guardarSerialesConLista(serialesCapturados);
  };

  // ── Confirmar Recepción ────────────────────────────────────────────────────
  const handleConfirmarRecepcion = async () => {
    if (!archivoGuia) { setErrorMsg("Adjunta la guía de remisión"); return; }
    if (!codigoGuia)  { setErrorMsg("Ingresa el código de guía"); return; }
    setErrorMsg("");
    try {
      console.log("Confirmando...", { solicitudDetalle, itemsRecepcion, codigoGuia, archivoGuia });
      // TODO: POST al endpoint de confirmación
      setSuccessData({ id: solicitudDetalle.id, totalItems: itemsRecepcion.length });
      setShowSuccess(true);
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Error al confirmar recepción");
    }
  };

  // ── Derivados ─────────────────────────────────────────────────────────────
  const materialesItems   = itemsRecepcion.filter(i => i.productType === "MATERIAL");
  const herramientasItems = itemsRecepcion.filter(i => i.productType === "TOOL");
  const equiposItems      = itemsRecepcion.filter(i => i.productType === "EQUIPMENT");

  const filtrar = (arr: SupplyRequestItem[], q: string) =>
    arr.filter(i => `${i.itemCode} ${i.itemDescription}`.toLowerCase().includes(q.toLowerCase()));

  const equiposCompletos = equiposItems.every(eq => (eq.serials?.length ?? 0) >= eq.requestedQuantity);

  // ── Columnas Listado ──────────────────────────────────────────────────────
  const columnasSolicitudes: GridColDef[] = [
    {
      field: "id", headerName: "ID", width: 80,
      renderCell: p => <Chip label={`#${p.value}`} size="small" color="primary" sx={{ fontWeight: 700 }} />,
    },
    {
      field: "status", headerName: "Estado", width: 130,
      renderCell: p => (
        <Chip label={p.value} size="small"
          color={p.value === "APPROVED" ? "success" : p.value === "DRAFT" ? "warning" : "default"}
          sx={{ fontWeight: 700 }} />
      ),
    },
    {
      field: "materialQuantity", headerName: "Materiales", width: 110, align: "center", headerAlign: "center",
      renderCell: p => <Chip label={p.value} size="small" sx={{ bgcolor: "#fff3e0", color: "#ed6c02", fontWeight: 700 }} />,
    },
    {
      field: "toolQuantity", headerName: "Herramientas", width: 120, align: "center", headerAlign: "center",
      renderCell: p => <Chip label={p.value} size="small" sx={{ bgcolor: "#e3f2fd", color: "#1976d2", fontWeight: 700 }} />,
    },
    {
      field: "equipmentQuantity", headerName: "Equipos", width: 100, align: "center", headerAlign: "center",
      renderCell: p => <Chip label={p.value} size="small" sx={{ bgcolor: "#e8f5e9", color: "#2e7d32", fontWeight: 700 }} />,
    },
    {
      field: "notes", headerName: "Período / Notas", flex: 1,
      renderCell: p => (
        <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "normal", lineHeight: 1.4 }}>
          {p.value}
        </Typography>
      ),
    },
  ];

  const buildColumnas = (color: string): GridColDef[] => [
    {
      field: "itemCode", headerName: "Código", width: 150,
      renderCell: p => <Chip label={p.value} size="small" sx={{ bgcolor: color, color: "white", fontWeight: 700 }} />,
    },
    { field: "itemDescription", headerName: "Descripción", flex: 1, minWidth: 240 },
    { field: "requestedQuantity", headerName: "Solicitado", width: 110, align: "center", headerAlign: "center" },
    {
      field: "receivedQuantity", headerName: "A Recibir", width: 120,
      editable: true, type: "number", align: "center", headerAlign: "center",
      renderCell: p => (
        <Typography variant="body2" fontWeight={700}
          sx={{ color: p.value === p.row.requestedQuantity ? "success.main" : "warning.main" }}>
          {p.value}
        </Typography>
      ),
    },
    {
      field: "pendingQuantity", headerName: "Pendiente", width: 110, align: "center", headerAlign: "center",
      renderCell: p => (
        <Typography variant="body2" fontWeight={600} color={p.value > 0 ? "error.main" : "success.main"}>
          {p.value}
        </Typography>
      ),
    },
  ];

  const columnasEquipos: GridColDef[] = [
    {
      field: "itemCode", headerName: "Código", width: 150,
      renderCell: p => <Chip label={p.value} size="small" sx={{ bgcolor: "#2e7d32", color: "white", fontWeight: 700 }} />,
    },
    { field: "itemDescription", headerName: "Descripción", flex: 1, minWidth: 240 },
    { field: "requestedQuantity", headerName: "Solicitado", width: 100, align: "center", headerAlign: "center" },
    {
      field: "serials", headerName: "Capturados", width: 130, align: "center", headerAlign: "center",
      renderCell: p => {
        const cap = itemsRecepcion.find(i => i.itemCode === p.row.itemCode)?.serials?.length ?? 0;
        return (
          <Chip label={`${cap} / ${p.row.requestedQuantity}`} size="small"
            color={cap === p.row.requestedQuantity ? "success" : cap > 0 ? "warning" : "default"}
            sx={{ fontWeight: 700 }} />
        );
      },
    },
    {
      field: "acciones", headerName: "Pistolear", width: 130, sortable: false,
      renderCell: p => (
        <ButtonBase size="small" label="Escanear"
          startIcon={<QrCodeScannerOutlined />}
          onClick={() => abrirModalEquipo(p.row)}
          sx={{ fontSize: "0.72rem", px: 1.5 }}
        />
      ),
    },
  ];

  // ─── RENDER ──────────────────────────────────────────────────────────────
  return (
    <Box ref={topRef} sx={{ maxWidth: 1400, mx: "auto", p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
      <TitleCard
        icon={<InventoryOutlined sx={{ fontSize: 32 }} />}
        title="Recepción de Materiales"
        description="Gestión de entrada de materiales, equipos y herramientas provenientes del proveedor logístico"
      />

      {errorMsg && (
        <Alert severity="error" onClose={() => setErrorMsg("")} sx={{ borderRadius: 2 }}>
          {errorMsg}
        </Alert>
      )}

      {/* ══════════════ PANTALLA ÉXITO ════════════════════════════════════ */}
      <Fade in={showSuccess} timeout={700} unmountOnExit>
        <Box>
          <Card elevation={0} sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)",
            border: "2px solid #bbf7d0",
            p: { xs: 4, md: 6 },
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Decoración fondo */}
            <Box sx={{
              position: "absolute", top: -60, right: -60,
              width: 200, height: 200, borderRadius: "50%",
              bgcolor: "rgba(34,197,94,0.08)",
            }} />
            <Box sx={{
              position: "absolute", bottom: -40, left: -40,
              width: 160, height: 160, borderRadius: "50%",
              bgcolor: "rgba(34,197,94,0.06)",
            }} />

            {/* Ícono animado */}
            <Box sx={{
              width: 90, height: 90, borderRadius: "50%",
              bgcolor: "#22c55e", mx: "auto", mb: 3,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 0 16px rgba(34,197,94,0.12), 0 0 0 32px rgba(34,197,94,0.06)",
              animation: "pulseRing 2s ease-in-out infinite",
              "@keyframes pulseRing": {
                "0%, 100%": { boxShadow: "0 0 0 16px rgba(34,197,94,0.12), 0 0 0 32px rgba(34,197,94,0.06)" },
                "50%":       { boxShadow: "0 0 0 20px rgba(34,197,94,0.08), 0 0 0 40px rgba(34,197,94,0.03)" },
              },
            }}>
              <CheckCircleOutline sx={{ fontSize: 48, color: "white" }} />
            </Box>

            <Typography variant="h4" fontWeight={800} sx={{ color: "#15803d", mb: 1 }}>
              ¡Recepción Confirmada!
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400 }}>
              La solicitud #{successData?.id} ha sido ingresada al sistema correctamente
            </Typography>

            {/* Cards de resumen */}
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 4 }}>
              <Paper elevation={0} sx={{ px: 3, py: 2, borderRadius: 3, border: "1px solid #bbf7d0", bgcolor: "white", minWidth: 130 }}>
                <Typography variant="h4" fontWeight={800} sx={{ color: "#15803d" }}>
                  {successData?.totalItems}
                </Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Items registrados
                </Typography>
              </Paper>
              <Paper elevation={0} sx={{ px: 3, py: 2, borderRadius: 3, border: "1px solid #bbf7d0", bgcolor: "white", minWidth: 130 }}>
                <Typography variant="h4" fontWeight={800} sx={{ color: "#0369a1" }}>
                  ENTRADA
                </Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Tipo de movimiento
                </Typography>
              </Paper>
              <Paper elevation={0} sx={{ px: 3, py: 2, borderRadius: 3, border: "1px solid #bbf7d0", bgcolor: "white", minWidth: 130 }}>
                <Typography variant="h4" fontWeight={800} sx={{ color: "#7c3aed" }}>
                  ACOPIO
                </Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Destino
                </Typography>
              </Paper>
            </Box>

            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              <ButtonBase
                label="Nueva Recepción"
                startIcon={<InventoryOutlined />}
                onClick={handleVolverLista}
                sx={{ px: 4, py: 1.5, fontWeight: 700, boxShadow: "0 4px 12px rgba(34,197,94,0.3)", borderRadius: 2.5 }}
              />
            </Stack>
          </Card>
        </Box>
      </Fade>

      {/* ══════════════ VISTA LISTADO ══════════════════════════════════════ */}
      <Fade in={vista === "list" && !showSuccess} timeout={500} unmountOnExit>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

          {/* Panel Filtros Enterprise */}
          <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", overflow: "hidden" }}>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" } }}>
              <Box sx={{ flex: "0 0 300px", bgcolor: "#f8fafc", p: 3.5, borderRight: { lg: "1px solid #e2e8f0" } }}>
                <Stack spacing={2.5}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box sx={{ width: 4, height: 18, bgcolor: "primary.main", borderRadius: 1 }} />
                    <Typography variant="subtitle2" fontWeight={700} sx={{ letterSpacing: 0.5, textTransform: "uppercase", color: "#374151" }}>
                      Fecha de Recepción
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    Filtra solicitudes aprobadas disponibles para recibir en la fecha seleccionada.
                  </Typography>
                  <DatePickerBase value={receptionDate} setValue={setReceptionDate} label="Fecha de Recepción" />
                </Stack>
              </Box>

              <Box sx={{ flex: 1, p: 3.5, display: "flex", flexDirection: "column" }}>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box sx={{ width: 4, height: 18, bgcolor: "info.main", borderRadius: 1 }} />
                    <Typography variant="subtitle2" fontWeight={700} sx={{ letterSpacing: 0.5, textTransform: "uppercase", color: "#374151" }}>
                      Proyecto / Destino
                    </Typography>
                  </Box>
                  <SelectBase
                    size="medium"
                    label="Selecciona el proyecto"
                    value={selectedProject ?? ""}
                    onChange={setSelectedProject}
                    options={[{ label: "Seleccionar proyecto...", value: 0 }, ...projectOptions]}
                    fullWidth
                  />
                </Stack>

                <Box sx={{ mt: "auto", pt: 3, borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                  <Typography variant="caption" sx={{ color: "text.disabled", display: "flex", alignItems: "center", gap: 0.5 }}>
                    <FilterListOutlined sx={{ fontSize: 14 }} /> Solo solicitudes con estado APPROVED
                  </Typography>
                  <ButtonBase
                    onClick={handleBuscarSolicitudes}
                    disabled={loadingList}
                    startIcon={loadingList ? <CircularProgress size={18} color="inherit" /> : <SearchOutlined />}
                    label={loadingList ? "Buscando..." : "Buscar Solicitudes"}
                    sx={{ px: 4, py: 1.5, fontWeight: 700, borderRadius: 2.5, boxShadow: "0 8px 16px rgba(37,99,235,0.15)", transition: "all 0.2s", "&:hover": { transform: "translateY(-1px)" } }}
                  />
                </Box>
              </Box>
            </Box>
          </Card>

          {solicitudes.length > 0 && (
            <Fade in timeout={400}>
              <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", p: 3 }}>
                <SectionHeader
                  icon={<AssignmentOutlined sx={{ fontSize: 26, color: "primary.main" }} />}
                  title={`Solicitudes Disponibles (${solicitudes.length})`}
                  subtitle="Haz clic en el ícono Ver para iniciar la recepción"
                />
                <Divider sx={{ my: 2 }} />
                <CustomDataGrid
                  columns={columnasSolicitudes}
                  localRows={solicitudes.map(s => ({ ...s, id: s.id }))}
                  serverSide={false} search={searchListado} onSearch={setSearchListado}
                  pageSize={10} onView={(row) => handleVerDetalle(row.id)}
                />
              </Card>
            </Fade>
          )}

          {!loadingList && solicitudes.length === 0 && (
            <Card elevation={0} sx={{ borderRadius: 4, border: "2px dashed #e2e8f0", p: 8, textAlign: "center" }}>
              <InventoryOutlined sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
              <Typography variant="h6" color="text.secondary" fontWeight={600} mb={1}>Sin solicitudes cargadas</Typography>
              <Typography variant="body2" color="text.disabled">
                Selecciona fecha y proyecto, luego haz clic en "Buscar Solicitudes".
              </Typography>
            </Card>
          )}
        </Box>
      </Fade>

      {/* ══════════════ VISTA DETALLE ══════════════════════════════════════ */}
      <Fade in={vista === "detail" && !showSuccess} timeout={600} unmountOnExit>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {loadingDetail ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 12 }}>
              <CircularProgress size={52} />
            </Box>
          ) : solicitudDetalle ? (
            <>
              {/* Header */}
              <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <IconButton onClick={handleVolverLista} sx={{ bgcolor: "#f1f5f9", "&:hover": { bgcolor: "#e2e8f0" } }}>
                      <ArrowBackOutlined />
                    </IconButton>
                    <Box>
                      <Typography variant="h6" fontWeight={800}>
                        Recepción — Solicitud #{solicitudDetalle.id}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Verifica cantidades. Los equipos deben pistoliarse individualmente.
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={1.5}>
                    <Chip label={solicitudDetalle.status} color="success" sx={{ fontWeight: 800 }} />
                    <Chip label={`${solicitudDetalle.items?.length ?? 0} items`} variant="outlined" sx={{ fontWeight: 700 }} />
                  </Stack>
                </Box>

                <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
                  {(["MATERIAL", "TOOL", "EQUIPMENT"] as const).map(tipo => {
                    const items = itemsRecepcion.filter(i => i.productType === tipo);
                    const cfg = categoriaConfig[tipo];
                    return (
                      <Paper key={tipo} variant="outlined"
                        sx={{ flex: "1 1 160px", p: 2.5, borderRadius: 2, bgcolor: cfg.bg, border: `1px solid ${cfg.color}30` }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={700}
                          sx={{ textTransform: "uppercase", letterSpacing: 0.6 }}>
                          {cfg.label}
                        </Typography>
                        <Typography variant="h4" fontWeight={800} sx={{ color: cfg.color, lineHeight: 1.2, mt: 0.5 }}>
                          {items.length}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">items a recibir</Typography>
                      </Paper>
                    );
                  })}
                </Box>
              </Card>

              {/* Tabs */}
              <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", p: 3 }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
                  <Tabs value={tabActual} onChange={(_, v) => setTabActual(v)}>
                    <Tab label={`📦 Materiales (${materialesItems.length})`} sx={{ fontWeight: 700, textTransform: "none" }} />
                    <Tab label={`🔧 Herramientas (${herramientasItems.length})`} sx={{ fontWeight: 700, textTransform: "none" }} />
                    <Tab label={`⚙️ Equipos (${equiposItems.length})`} sx={{ fontWeight: 700, textTransform: "none" }} />
                  </Tabs>
                </Box>

                {tabActual === 0 && (
                  <Box>
                    <TextField fullWidth size="small" placeholder="Buscar material..."
                      value={searchMat} onChange={e => setSearchMat(e.target.value)} sx={{ mb: 2 }}
                      InputProps={{ startAdornment: <InputAdornment position="start"><SearchOutlined /></InputAdornment> }}
                    />
                    <CustomDataGrid columns={buildColumnas(categoriaConfig.MATERIAL.color)}
                      localRows={filtrar(materialesItems, searchMat).map(i => ({ ...i, id: i.itemCode }))}
                      serverSide={false} search="" onSearch={() => {}} editMode="cell"
                      processRowUpdate={processRowUpdate} pageSize={30}
                      sx={{ border: `2px solid ${categoriaConfig.MATERIAL.color}20` }}
                    />
                  </Box>
                )}

                {tabActual === 1 && (
                  <Box>
                    <TextField fullWidth size="small" placeholder="Buscar herramienta..."
                      value={searchTool} onChange={e => setSearchTool(e.target.value)} sx={{ mb: 2 }}
                      InputProps={{ startAdornment: <InputAdornment position="start"><SearchOutlined /></InputAdornment> }}
                    />
                    <CustomDataGrid columns={buildColumnas(categoriaConfig.TOOL.color)}
                      localRows={filtrar(herramientasItems, searchTool).map(i => ({ ...i, id: i.itemCode }))}
                      serverSide={false} search="" onSearch={() => {}} editMode="cell"
                      processRowUpdate={processRowUpdate} pageSize={30}
                      sx={{ border: `2px solid ${categoriaConfig.TOOL.color}20` }}
                    />
                  </Box>
                )}

                {tabActual === 2 && (
                  <Box>
                    <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
                      <Typography variant="body2" fontWeight={600}>
                        Cada equipo debe identificarse individualmente.
                        Usa <strong>"Escanear"</strong> para pistolar serie, MAC, UA según tipo de equipo.
                      </Typography>
                    </Alert>
                    <TextField fullWidth size="small" placeholder="Buscar equipo..."
                      value={searchEq} onChange={e => setSearchEq(e.target.value)} sx={{ mb: 2 }}
                      InputProps={{ startAdornment: <InputAdornment position="start"><SearchOutlined /></InputAdornment> }}
                    />
                    <CustomDataGrid columns={columnasEquipos}
                      localRows={filtrar(equiposItems, searchEq).map(i => ({ ...i, id: i.itemCode }))}
                      serverSide={false} search="" onSearch={() => {}} pageSize={30}
                      sx={{ border: `2px solid ${categoriaConfig.EQUIPMENT.color}20` }}
                    />
                  </Box>
                )}
              </Card>

              {/* Confirmación */}
              <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", p: 3 }}>
                <SectionHeader
                  iconBgColor="#f59e0b"
                  icon={<WarningAmberOutlined sx={{ fontSize: 22, color: "#fff" }} />}
                  title="Confirmar Recepción"
                  subtitle="Adjunta la guía de remisión y confirma el ingreso al almacén"
                />

                <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap", mt: 2 }}>
                  <Box sx={{ flex: "1 1 260px" }}>
                    <Typography variant="body2" color="text.secondary" fontWeight={600} mb={1}>
                      Código Guía de Remisión *
                    </Typography>
                    <TextField fullWidth size="small" placeholder="GR-2024-XXX"
                      value={codigoGuia} onChange={e => setCodigoGuia(e.target.value)}
                    />
                  </Box>
                </Box>

                <Box sx={{ border: "2px dashed #e2e8f0", borderRadius: 3, p: 3, bgcolor: "#f8fafc", mb: 3 }}>
                  <Typography variant="body2" fontWeight={600} mb={2}>
                    📄 Adjuntar Guía de Remisión (PDF o Imagen)
                  </Typography>
                  <FileUploader accept=".pdf,.jpg,.jpeg,.png" maxSize={10}
                    onFileSelect={setArchivoGuia} onError={alert} />
                  {archivoGuia && (
                    <Fade in timeout={400}>
                      <Box sx={{ mt: 2, p: 2, bgcolor: "#f0fdf4", borderRadius: 2, border: "1px solid #bbf7d0", display: "flex", alignItems: "center", gap: 2 }}>
                        {archivoGuia.type === "application/pdf"
                          ? <PictureAsPdfOutlined sx={{ color: "error.main", fontSize: 32 }} />
                          : <ImageOutlined sx={{ color: "info.main", fontSize: 32 }} />}
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" fontWeight={600}>{archivoGuia.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {(archivoGuia.size / 1024 / 1024).toFixed(2)} MB
                          </Typography>
                        </Box>
                        <IconButton size="small" onClick={() => setArchivoGuia(null)}>
                          <CloseOutlined />
                        </IconButton>
                      </Box>
                    </Fade>
                  )}
                </Box>

                <Alert severity="warning" sx={{ borderRadius: 2, mb: 3 }}>
                  Se registrará como movimiento tipo <strong>ENTRADA / ACOPIO</strong>. Esta acción es irreversible.
                </Alert>

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                  <ButtonBase label="Volver al Listado" startIcon={<ArrowBackOutlined />}
                    onClick={handleVolverLista}
                    sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1", "&:hover": { bgcolor: "#f1f5f9" } }}
                  />
                  <ButtonBase label="Confirmar Recepción" startIcon={<CheckCircleOutline />}
                    onClick={handleConfirmarRecepcion}
                    disabled={!archivoGuia || !codigoGuia}
                    sx={{ px: 4, boxShadow: "0 4px 12px rgba(46,125,50,0.25)" }}
                  />
                </Box>
              </Card>
            </>
          ) : null}
        </Box>
      </Fade>

      {/* ══════════════ MODAL: ESCANEO EQUIPOS ════════════════════════════ */}
      <Dialog open={modalEquipoOpen} onClose={() => setModalEquipoOpen(false)} maxWidth="sm" fullWidth
        PaperProps={{ sx: { borderRadius: 3, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" } }}
      >
        <DialogTitle sx={{ m: 0, p: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between", bgcolor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ bgcolor: "success.main", color: "white", p: 0.8, borderRadius: 1.5, display: "flex" }}>
              <QrCodeScannerOutlined fontSize="small" />
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight={700} sx={{ color: "#1e293b" }}>
                Pistolear Equipo
              </Typography>
              {equipoSeleccionado && (
                <Typography variant="caption" color="text.secondary">
                  {equipoSeleccionado.itemCode} — {equipoSeleccionado.itemDescription}
                </Typography>
              )}
            </Box>
          </Stack>
          <IconButton onClick={() => setModalEquipoOpen(false)} size="small">
            <CloseOutlined fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3, mt: 1 }}>
          {equipoSeleccionado && (() => {
            const tipo = getEquipoTipo(equipoSeleccionado.itemCode, equipoSeleccionado.itemDescription);
            const campos = camposEquipo[tipo];
            const totalReq = equipoSeleccionado.requestedQuantity;
            const totalCap = serialesCapturados.length;
            const todosCompletos = campos.every(c => !!(serialActual as any)[c.field]?.trim());

            return (
              <>
                {/* Barra progreso */}
                <Box sx={{ mb: 3, p: 2.5, bgcolor: "#f8fafc", borderRadius: 2, border: "1px solid #e2e8f0" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                    <Typography variant="body2" fontWeight={700}>Progreso de Captura</Typography>
                    <Chip label={`${totalCap} / ${totalReq}`} size="small"
                      color={totalCap === totalReq ? "success" : totalCap > 0 ? "warning" : "default"}
                      sx={{ fontWeight: 800 }} />
                  </Box>
                  <Box sx={{ height: 8, borderRadius: 4, bgcolor: "#e2e8f0", overflow: "hidden" }}>
                    <Box sx={{
                      height: "100%", borderRadius: 4,
                      width: `${Math.min((totalCap / totalReq) * 100, 100)}%`,
                      bgcolor: totalCap === totalReq ? "success.main" : "warning.main",
                      transition: "width 0.4s ease",
                    }} />
                  </Box>
                </Box>

                {/* ✅ Toggle Auto-guardar */}
                <Box sx={{ mb: 2.5, p: 2, borderRadius: 2, bgcolor: autoGuardar ? "#f0fdf4" : "#f8fafc", border: `1px solid ${autoGuardar ? "#bbf7d0" : "#e2e8f0"}`, transition: "all 0.3s" }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={autoGuardar}
                        onChange={e => setAutoGuardar(e.target.checked)}
                        color="success"
                        size="small"
                      />
                    }
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                        <AutoAwesomeOutlined sx={{ fontSize: 16, color: autoGuardar ? "success.main" : "text.disabled" }} />
                        <Typography variant="body2" fontWeight={700} sx={{ color: autoGuardar ? "#15803d" : "text.secondary" }}>
                          Agregar automáticamente al completar campos
                        </Typography>
                      </Box>
                    }
                    sx={{ m: 0 }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5, ml: 4 }}>
                    {autoGuardar
                      ? "Al llenar todos los campos se agregará y limpiará el formulario automáticamente"
                      : "Debes presionar el botón manualmente para agregar cada serial"}
                  </Typography>
                </Box>

                {/* Tipo badge */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
                  <Chip label={`Tipo: ${tipo}`} size="small" color="info" sx={{ fontWeight: 700 }} />
                  <Typography variant="caption" color="text.secondary">
                    Campos: {campos.map(c => c.label).join(" · ")}
                  </Typography>
                </Box>

                {/* Form capture */}
                {/* <Stack spacing={2} sx={{ mb: 3 }}>
                  {campos.map(campo => (
                    <Box key={campo.field}>
                      <Typography variant="body2" color="text.secondary" fontWeight={600} mb={0.5}>
                        {campo.label} *
                      </Typography>
                      <TextField
                        fullWidth size="small"
                        placeholder={campo.placeholder}
                        value={(serialActual as any)[campo.field] ?? ""}
                        onChange={e => handleCampoChange(campo.field, e.target.value, tipo, totalReq)}
                        disabled={totalCap >= totalReq}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            bgcolor: totalCap >= totalReq ? "#f8fafc" : "white",
                            transition: "all 0.2s",
                            ...(todosCompletos && autoGuardar && totalCap < totalReq && {
                              "& fieldset": { borderColor: "success.main", borderWidth: 2 },
                            }),
                          },
                        }}
                        InputProps={campo.field === "serialNumber" ? {
                          startAdornment: <InputAdornment position="start">
                            <QrCodeScannerOutlined sx={{ fontSize: 18, color: "text.disabled" }} />
                          </InputAdornment>
                        } : undefined}
                      />
                    </Box>
                  ))}
                </Stack> */}
                <Stack spacing={2} sx={{ mb: 3 }}>
  {campos.map(campo => {
    const valor = (serialActual as any)[campo.field] ?? "";
    const error = camposError[campo.field] ?? "";
    const regla = validacionesCampo[campo.field];
    // Estado visual: vacío | escribiendo | válido | error
    const esValido = regla ? regla.regex.test(valor.trim()) && valor.trim() !== "" : valor.trim() !== "";
    const tieneError = !!error && valor.trim() !== "";

    return (
      <Box key={campo.field}>
        <Typography variant="body2" color="text.secondary" fontWeight={600} mb={0.5}>
          {campo.label} *
          {esValido && (
            <CheckCircle sx={{ fontSize: 14, color: "success.main", ml: 0.5, verticalAlign: "middle" }} />
          )}
        </Typography>
        <TextField
          fullWidth size="small"
          placeholder={campo.placeholder}
          value={valor}
          onChange={e => handleCampoChange(campo.field, e.target.value, tipo, totalReq)}
          disabled={totalCap >= totalReq}
          error={tieneError}
          helperText={
            tieneError ? error
            : esValido ? "✓ Válido"
            : regla ? `Ej: ${campo.placeholder}` : undefined
          }
          FormHelperTextProps={{
            sx: { color: tieneError ? "error.main" : esValido ? "success.main" : "text.disabled" }
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: totalCap >= totalReq ? "#f8fafc" : "white",
              transition: "all 0.2s",
              ...(esValido && {
                "& fieldset": { borderColor: "success.main", borderWidth: 2 },
              }),
              ...(tieneError && {
                "& fieldset": { borderColor: "error.main", borderWidth: 2 },
              }),
            },
          }}
          InputProps={campo.field === "serialNumber" ? {
            startAdornment: <InputAdornment position="start">
              <QrCodeScannerOutlined sx={{ fontSize: 18, color: esValido ? "success.main" : "text.disabled" }} />
            </InputAdornment>
          } : undefined}
        />
      </Box>
    );
  })}
</Stack>

                {/* Botón manual (solo si auto-guardar está OFF) */}
                {!autoGuardar && (
                  <ButtonBase fullWidth
                    label={totalCap >= totalReq ? "✓ Cantidad completa" : `Agregar Serial ${totalCap + 1} de ${totalReq}`}
                    startIcon={<CheckCircle />}
                    onClick={agregarSerial}
                    disabled={!serialActual.serialNumber?.trim() || totalCap >= totalReq}
                    sx={{ mb: 3 }}
                  />
                )}

                {/* Indicador auto-guardar activo */}
                {autoGuardar && totalCap < totalReq && (
                  <Box sx={{ mb: 3, p: 1.5, borderRadius: 2, bgcolor: todosCompletos ? "#dcfce7" : "#f8fafc", border: `1px solid ${todosCompletos ? "#86efac" : "#e2e8f0"}`, textAlign: "center", transition: "all 0.3s" }}>
                    <Typography variant="caption" fontWeight={600} sx={{ color: todosCompletos ? "#15803d" : "text.disabled" }}>
                      {todosCompletos
                        ? "⚡ Guardando automáticamente..."
                        : `Completa todos los campos para auto-guardar el serial ${totalCap + 1}`}
                    </Typography>
                  </Box>
                )}

                {/* Lista seriales capturados */}
                {serialesCapturados.length > 0 && (
                  <Box>
                    <Typography variant="body2" fontWeight={700} mb={1.5}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckCircleOutline sx={{ fontSize: 18, color: "success.main" }} />
                      Seriales Capturados ({serialesCapturados.length})
                    </Typography>
                    <Stack spacing={1}>
                      {serialesCapturados.map((s, idx) => (
                        <Box key={idx} sx={{ p: 1.5, bgcolor: "#f0fdf4", borderRadius: 2, border: "1px solid #bbf7d0", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                          <Stack spacing={0.3}>
                            <Typography variant="caption" fontWeight={800} sx={{ color: "#15803d" }}>
                              #{idx + 1} 
                            </Typography>
                                                        {s.serialNumber    && <Typography variant="caption" color="text.secondary">SERIAL NUMBER: {s.serialNumber}</Typography>}

                            {s.mac    && <Typography variant="caption" color="text.secondary">MAC: {s.mac}</Typography>}
                            {s.ua     && <Typography variant="caption" color="text.secondary">UA: {s.ua}</Typography>}
                            {s.mtaMac && <Typography variant="caption" color="text.secondary">MTA MAC: {s.mtaMac}</Typography>}
                          </Stack>
                          <IconButton size="small" onClick={() => eliminarSerial(idx)} sx={{ color: "error.light", mt: -0.5 }}>
                            <CloseOutlined fontSize="small" />
                          </IconButton>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                )}
              </>
            );
          })()}
        </DialogContent>

        <DialogActions sx={{ p: 2.5, bgcolor: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
          <ButtonBase label="Cancelar" onClick={() => setModalEquipoOpen(false)}
            sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1", "&:hover": { bgcolor: "#f1f5f9" } }}
          />
          <ButtonBase label={`Guardar ${serialesCapturados.length} Serial(es)`}
            startIcon={<CheckCircleOutline />} onClick={guardarSeriales}
            disabled={serialesCapturados.length === 0}
            sx={{ px: 4, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
}