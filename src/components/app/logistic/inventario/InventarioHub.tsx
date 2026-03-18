"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Box, Card, Typography, Divider, Alert, Fade, Collapse, Chip,
  CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Stack, Paper, Tooltip, LinearProgress, TextField,
} from "@mui/material";
import {
  CheckCircleOutline, WarningAmberOutlined, SearchOutlined, Close,
  SendOutlined, AssignmentOutlined, EventOutlined, TableChartOutlined,
  ErrorOutlined, CheckCircle, AddCircleOutline, ListAltOutlined,
  TrendingDownOutlined, ReportProblemOutlined, LocalShippingOutlined,
  BarChartOutlined, RefreshOutlined, ShoppingCartOutlined, CancelOutlined,
  AutorenewOutlined, InfoOutlined, StorageOutlined,
} from "@mui/icons-material";
import { TitleCard } from "@/src/components/base/TitleCard";
import ButtonBase from "@/src/components/base/ButtonBase";
import SelectBase from "@/src/components/base/SelectBase";
import CustomDataGrid from "@/src/components/base/CustomDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { API_URL } from "@/src/lib/config";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type SemaforoColor = "VERDE" | "AMARILLO" | "ROJO" | "GRIS";
type Modo = "consulta" | "reestoqueo";

interface HubInventoryItem {
  id: number; tenantId: number; hubId: number; itemId: number;
  itemCode: string; itemName: string; description: string;
  productType: "MATERIAL" | "TOOL" | "EQUIPMENT" | "EPP";
  supplySource: string; quantityAvailable: number; quantityReserved: number;
  quantityInTransit: number; averageCost: number | null; totalValue: number | null;
  minimumStock: number; reorderPoint: number | null; maximumStock: number | null;
  avgAgingDays: number | null; locationCode: string | null; lastMovementDate: string | null;
  uom?: string;
}

// ── FIX #1: SelectedItemForRequest ahora incluye description ──────────────────
interface SelectedItemForRequest {
  inventoryId: number; itemId: number; itemCode: string;
  itemName: string; description: string;   // ← campo añadido
  productType: string; quantityAvailable: number; minimumStock: number;
  requestedQuantity: number; isUrgent: boolean; semaforo: SemaforoColor;
}

interface SupplyRequestDto {
  id: number; requestNumber: string; status: string; items: any[];
  totalItemsCount: number; totalEstimatedValue: number; requestedDeliveryDate: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getSemaforo = (item: HubInventoryItem): SemaforoColor => {
  const qty = item.quantityAvailable;
  if (qty <= 0) return "GRIS";
  if (qty <= item.minimumStock) return "ROJO";
  if (item.reorderPoint && qty <= item.reorderPoint) return "AMARILLO";
  return "VERDE";
};

const semaforoConfig: Record<SemaforoColor, { color: string; bg: string; label: string; border: string; pulse?: boolean }> = {
  ROJO:     { color: "#dc2626", bg: "#fef2f2", label: "Crítico",   border: "#fecaca", pulse: true },
  AMARILLO: { color: "#d97706", bg: "#fffbeb", label: "Alerta",    border: "#fde68a" },
  VERDE:    { color: "#16a34a", bg: "#f0fdf4", label: "Normal",    border: "#bbf7d0" },
  GRIS:     { color: "#475569", bg: "#f1f5f9", label: "Sin Stock", border: "#cbd5e1", pulse: true },
};

const productoConfig: Record<string, { label: string; color: string; icon: string; bgLight: string }> = {
  MATERIAL:  { label: "Material",    color: "#ea580c", icon: "📦", bgLight: "#fff7ed" },
  TOOL:      { label: "Herramienta", color: "#1d4ed8", icon: "🔧", bgLight: "#eff6ff" },
  EQUIPMENT: { label: "Equipo",      color: "#15803d", icon: "⚙️", bgLight: "#f0fdf4" },
  EPP:       { label: "EPP",         color: "#7c3aed", icon: "🦺", bgLight: "#faf5ff" },
};

// ─── Componente ───────────────────────────────────────────────────────────────

export default function InventarioHub() {
  const topRef = useRef<HTMLDivElement>(null);

  const [modo, setModo] = useState<Modo>("consulta");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [inventario, setInventario] = useState<HubInventoryItem[]>([]);
  const [itemsFiltrados, setItemsFiltrados] = useState<HubInventoryItem[]>([]);

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [selectedItems, setSelectedItems] = useState<SelectedItemForRequest[]>([]);

  const [generatingRequest, setGeneratingRequest] = useState(false);
  const [requestDto, setRequestDto] = useState<SupplyRequestDto | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedInfo, setSubmittedInfo] = useState<SupplyRequestDto | null>(null);

  useEffect(() => { cargarInventario(); }, []);

  useEffect(() => {
    let r = inventario;
    if (filterType !== "ALL") r = r.filter(i => i.productType === filterType);
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(i => `${i.itemCode} ${i.itemName} ${i.description ?? ""}`.toLowerCase().includes(q));
    }
    setItemsFiltrados(r);
  }, [inventario, filterType, search]);

  useEffect(() => {
    if (showSuccess) {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showSuccess]);

const cargarInventario = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/hub-inventory?page=0&size=100&tenantId=1&hubId=1`
      );
      const format = await res.json();

      setInventario(format.data.content ?? []);
    } catch {
      toast.error("Error al cargar inventario");
    } finally {
      setLoading(false);
    }
  };

  // ── FIX #1: buildSelectedItem ahora mapea description ─────────────────────
  const buildSelectedItem = (i: HubInventoryItem): SelectedItemForRequest => {
    const sem = getSemaforo(i);
    const deficit = Math.max(i.minimumStock - i.quantityAvailable, 0);
    return {
      inventoryId: i.id,
      itemId: i.itemId,
      itemCode: i.itemCode,
      itemName: i.itemName,
      description: i.description ?? i.itemName,   // ← descripción real del API
      productType: i.productType,
      quantityAvailable: i.quantityAvailable,
      minimumStock: i.minimumStock,
      requestedQuantity: deficit > 0 ? deficit : i.minimumStock,
      isUrgent: sem === "ROJO" || sem === "GRIS",
      semaforo: sem,
    };
  };

  // ── Activar modo reestoqueo ───────────────────────────────────────────────
  const activarModoReestoqueo = () => {
    const criticos = inventario.filter(i => {
      const s = getSemaforo(i);
      return s === "ROJO" || s === "GRIS";
    });
    setModo("reestoqueo");
    setSelectedIds(new Set(criticos.map(i => i.id)));
    setSelectedItems(criticos.map(buildSelectedItem));
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const cancelarReestoqueo = () => {
    setModo("consulta");
    setSelectedIds(new Set());
    setSelectedItems([]);
  };

  // ── Handlers de selección manual ─────────────────────────────────────────
  const handleCheckOne = useCallback((id: number | string, checked: boolean) => {
    const numId = Number(id);
    setSelectedIds(prev => {
      const next = new Set(prev);
      checked ? next.add(numId) : next.delete(numId);
      return next;
    });
    setSelectedItems(prev => {
      if (!checked) return prev.filter(s => s.inventoryId !== numId);
      const item = inventario.find(i => i.id === numId);
      if (!item) return prev;
      return [...prev, buildSelectedItem(item)];
    });
  }, [inventario]);

  const handleCheckAll = useCallback((checked: boolean, visibleIds: (number | string)[]) => {
    const numIds = visibleIds.map(Number);
    setSelectedIds(prev => {
      const next = new Set(prev);
      numIds.forEach(id => checked ? next.add(id) : next.delete(id));
      return next;
    });
    setSelectedItems(prev => {
      if (!checked) return prev.filter(s => !numIds.includes(s.inventoryId));
      const existing = new Set(prev.map(s => s.inventoryId));
      const nuevos = inventario
        .filter(i => numIds.includes(i.id) && !existing.has(i.id))
        .map(buildSelectedItem);
      return [...prev, ...nuevos];
    });
  }, [inventario]);

  // ── FIX #2: TextField cantidad — permite borrar completamente ─────────────
  // Guardamos el valor como string mientras el usuario edita.
  // Solo convertimos a number al confirmar/guardar.
  const updateRequestedQty = (inventoryId: number, rawValue: string) => {
    // Permitir string vacío mientras el usuario borra
    const parsed = parseInt(rawValue, 10);
    const qty = isNaN(parsed) ? 0 : Math.max(0, parsed);
    setSelectedItems(prev =>
      prev.map(i =>
        i.inventoryId === inventoryId
          ? { ...i, requestedQuantity: qty, _rawQty: rawValue } as any
          : i
      )
    );
  };

  // ── FIX #3: POST real al endpoint de supply-request ──────────────────────
  const handleGenerarSolicitud = async () => {
    if (selectedItems.length === 0) { toast.warning("Selecciona al menos un producto"); return; }

    // Validar que todos tengan cantidad >= 1
    const sinCantidad = selectedItems.filter(i => i.requestedQuantity < 1);
    if (sinCantidad.length > 0) {
      toast.warning(`${sinCantidad.length} producto(s) tienen cantidad 0. Ingresa al menos 1.`);
      return;
    }

    setGeneratingRequest(true);
    try {
      // Preview local para el modal de confirmación (sin llamar al API aún)
      const mock: SupplyRequestDto = {
        id: 0,
        requestNumber: `SAB-${dayjs().format("YYYYMM")}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, "0")}`,
        status: "DRAFT",
        items: selectedItems.map((item, idx) => ({
          id: idx + 1,
          itemId: item.itemId,
          itemCode: item.itemCode,
          itemName: item.itemName,
          itemDescription: item.description,
          productType: item.productType,
          requestedQuantity: item.requestedQuantity,
          deliveredQuantity: 0,
          pendingQuantity: 0,
        })),
        totalItemsCount: selectedItems.length,
        totalEstimatedValue: 0,
        requestedDeliveryDate: dayjs().add(7, "day").format("YYYY-MM-DD"),
      };
      setRequestDto(mock);
      setConfirmDialogOpen(true);
    } catch {
      toast.error("Error al preparar solicitud");
    } finally {
      setGeneratingRequest(false);
    }
  };

  const handleAprobarSolicitud = async () => {
    if (!requestDto) return;
    setConfirmDialogOpen(false);
    setSubmitting(true);
    try {
      // ── POST real al backend ────────────────────────────────────────────
      const body = {
        tenantId: 1,
        hubId: 1,
        projectId: 1,
        requestedBy: 1,
        requestedDeliveryDate: requestDto.requestedDeliveryDate,
        periodValueEntrega: requestDto.requestedDeliveryDate,
        origin: "INVENTORY",
        items: selectedItems.map(item => ({
          itemId: item.itemId,
          itemCode: item.itemCode,
          itemName: item.description,
          itemDescription: item.description,
          productType: item.productType,
          requestedQuantity: item.requestedQuantity,
          deliveredQuantity: 0,
          pendingQuantity: 0,
        })),
      };

      const res = await fetch(`${API_URL}/api/hub-inventory/supply-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message ?? `Error ${res.status}`);
      }

      const createdRequest = await res.json();

      setSubmittedInfo({
        ...requestDto,
        id: createdRequest.id ?? requestDto.id,
        requestNumber: createdRequest.requestNumber ?? requestDto.requestNumber,
        status: createdRequest.status ?? "APPROVED",
      });
      setShowSuccess(true);
      setModo("consulta");
      setSelectedIds(new Set());
      setSelectedItems([]);
      setRequestDto(null);
      toast.success("Solicitud registrada correctamente");
    } catch (err: any) {
      toast.error(`Error al registrar solicitud: ${err.message ?? "Intenta de nuevo"}`);
    } finally {
      setSubmitting(false);
    }
  };

  const metricas = {
    ROJO:     inventario.filter(i => getSemaforo(i) === "ROJO").length,
    AMARILLO: inventario.filter(i => getSemaforo(i) === "AMARILLO").length,
    VERDE:    inventario.filter(i => getSemaforo(i) === "VERDE").length,
    GRIS:     inventario.filter(i => getSemaforo(i) === "GRIS").length,
  };
  const necesitanReestoqueo = metricas.ROJO + metricas.GRIS;

  // ── Columnas DataGrid principal ───────────────────────────────────────────
  const columns: GridColDef[] = [
    {
      field: "semaforo", headerName: "Estado", width: 118,
      renderCell: (p) => {
        const sem = getSemaforo(p.row);
        const cfg = semaforoConfig[sem];
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{
              width: 10, height: 10, borderRadius: "50%", bgcolor: cfg.color,
              ...(cfg.pulse && { animation: "semPulse 1.6s ease-in-out infinite", "@keyframes semPulse": { "0%, 100%": { boxShadow: `0 0 0 0 ${cfg.color}60` }, "50%": { boxShadow: `0 0 0 5px ${cfg.color}00` } } }),
            }} />
            <Typography variant="caption" fontWeight={700} sx={{ color: cfg.color }}>{cfg.label}</Typography>
          </Box>
        );
      },
    },
    {
      field: "itemCode", headerName: "Código", width: 125,
      renderCell: (p) => {
        const cfg = productoConfig[p.row.productType] ?? productoConfig.MATERIAL;
        return <Chip label={p.value} size="small" sx={{ bgcolor: cfg.color, color: "white", fontWeight: 700, fontSize: "0.7rem", letterSpacing: 0.3 }} />;
      },
    },
    {
      // ── Grid principal usa "description" que viene del API ─────────────
      field: "description", headerName: "Descripción", flex: 2, minWidth: 200,
      renderCell: (p) => (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
          <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.3 }}>{p.value || p.row.itemName}</Typography>
          {p.row.locationCode && <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.68rem" }}>📍 {p.row.locationCode}</Typography>}
        </Box>
      ),
    },
    {
      field: "productType", headerName: "Tipo", width: 130,
      renderCell: (p) => {
        const cfg = productoConfig[p.value] ?? productoConfig.MATERIAL;
        return <Chip label={`${cfg.icon} ${cfg.label}`} size="small" variant="outlined" sx={{ borderColor: cfg.color, color: cfg.color, fontWeight: 600, fontSize: "0.72rem" }} />;
      },
    },
    {
      field: "quantityAvailable", headerName: "Disponible", width: 120, align: "center", headerAlign: "center",
      renderCell: (p) => {
        const sem = getSemaforo(p.row);
        const cfg = semaforoConfig[sem];
        const pct = Math.min((p.value / (p.row.maximumStock || 100)) * 100, 100);
        return (
          <Box sx={{ width: "100%", px: 0.5 }}>
            <Typography variant="body2" fontWeight={800} sx={{ color: cfg.color, textAlign: "center", lineHeight: 1 }}>{p.value}</Typography>
            <LinearProgress variant="determinate" value={pct} sx={{ height: 4, borderRadius: 2, mt: 0.5, bgcolor: `${cfg.color}20`, "& .MuiLinearProgress-bar": { bgcolor: cfg.color, borderRadius: 2 } }} />
          </Box>
        );
      },
    },
    { field: "minimumStock",      headerName: "Mínimo",      width: 90,  align: "center", headerAlign: "center", renderCell: (p) => <Typography variant="body2" color="text.secondary" fontWeight={600}>{p.value}</Typography> },
    { field: "reorderPoint",      headerName: "Reorden",     width: 90,  align: "center", headerAlign: "center", renderCell: (p) => <Typography variant="body2" color="text.disabled">{p.value ?? "—"}</Typography> },
    {
      field: "quantityInTransit", headerName: "En Tránsito", width: 115, align: "center", headerAlign: "center",
      renderCell: (p) => p.value > 0
        ? <Chip label={p.value} size="small" icon={<LocalShippingOutlined sx={{ fontSize: "13px !important" }} />} sx={{ bgcolor: "#e0f2fe", color: "#0369a1", fontWeight: 700, fontSize: "0.7rem" }} />
        : <Typography variant="body2" color="text.disabled">—</Typography>,
    },
    { field: "averageCost",      headerName: "Costo Prom.", width: 110, align: "right", headerAlign: "right", renderCell: (p) => <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "monospace" }}>{p.value ? `S/ ${Number(p.value).toFixed(2)}` : "—"}</Typography> },
    { field: "lastMovementDate", headerName: "Últ. Mov.",   width: 130, renderCell: (p) => <Typography variant="caption" color="text.secondary">{p.value ? dayjs(p.value).format("DD/MM/YYYY") : "—"}</Typography> },
  ];

  // ── Columnas carrito ──────────────────────────────────────────────────────
  // FIX #1: Carrito ahora usa "description" del SelectedItemForRequest
  const columnsSelected: GridColDef[] = [
    {
      field: "semaforo", headerName: "", width: 44,
      renderCell: (p) => {
        const cfg = semaforoConfig[p.value as SemaforoColor];
        return <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: cfg?.color }} />;
      },
    },
    {
      field: "itemCode", headerName: "Código", width: 115,
      renderCell: (p) => {
        const cfg = productoConfig[p.row.productType] ?? productoConfig.MATERIAL;
        return <Chip label={p.value} size="small" sx={{ bgcolor: cfg.color, color: "white", fontWeight: 700, fontSize: "0.7rem" }} />;
      },
    },
    {
      // ── FIX #1: usar "description" (campo real mapeado en buildSelectedItem)
      field: "description", headerName: "Descripción", flex: 2, minWidth: 180,
      renderCell: (p) => (
        <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.3 }}>
          {p.value || p.row.itemName}
        </Typography>
      ),
    },
    { field: "quantityAvailable", headerName: "Actual",  width: 75, align: "center", headerAlign: "center", renderCell: (p) => <Typography variant="body2" fontWeight={700} color="error.main">{p.value}</Typography> },
    { field: "minimumStock",      headerName: "Mínimo",  width: 80, align: "center", headerAlign: "center", renderCell: (p) => <Typography variant="body2" color="text.secondary">{p.value}</Typography> },
    {
      field: "requestedQuantity", headerName: "Solicitar", width: 130, align: "center", headerAlign: "center",
      renderCell: (p) => {
        // ── FIX #2: manejo controlado que permite borrar completamente ───
        const rawValue = (p.row as any)._rawQty ?? String(p.value === 0 ? "" : p.value);
        return (
        <Box sx={{display:"flex"}}>
            <TextField
            type="number"
            size="small"
            value={rawValue}
            onChange={e => updateRequestedQty(p.row.inventoryId, e.target.value)}
            onBlur={e => {
              // Al salir del campo: si quedó vacío o 0, forzar mínimo 1
              const val = parseInt(e.target.value, 10);
              if (isNaN(val) || val < 1) {
                updateRequestedQty(p.row.inventoryId, "1");
              }
            }}
            inputProps={{
              min: 1,
              style: { textAlign: "center", fontWeight: 700, padding: "6px 8px" },
            }}
            sx={{
              width: 90,
              "& .MuiOutlinedInput-root": { borderRadius: 1.5, fontSize: "0.85rem" },
              // Ocultar flechas nativas del input[type=number]
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": { display: "none" },
              "& input[type=number]": { MozAppearance: "textfield" },
            }}
          />
        </Box>
        );
      },
    },
    {
      field: "isUrgent", headerName: "Urgente", width: 85, align: "center", headerAlign: "center",
      renderCell: (p) => p.value
        ? <Chip label="SÍ" size="small" color="error"     sx={{ fontWeight: 700, height: 20, fontSize: "0.68rem" }} />
        : <Chip label="NO" size="small" variant="outlined" sx={{ fontWeight: 600, height: 20, fontSize: "0.68rem" }} />,
    },
  ];

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <Box ref={topRef} sx={{ maxWidth: 1400, mx: "auto", p: 4, display: "flex", flexDirection: "column", gap: 3 }}>

      <TitleCard icon={<StorageOutlined sx={{ fontSize: 32 }} />} title="Inventario del Hub" description="Consulta el estado del inventario en tiempo real. Identifica productos críticos y genera solicitudes de reabastecimiento cuando lo necesites." />

      {/* ══ PANTALLA ÉXITO ══ */}
      <Fade in={showSuccess} timeout={700} unmountOnExit>
        <Box>
          <Card elevation={0} sx={{ borderRadius: 4, background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 60%, #f0fdf4 100%)", border: "2px solid #bbf7d0", p: { xs: 4, md: 6 }, textAlign: "center", position: "relative", overflow: "hidden" }}>
            <Box sx={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", bgcolor: "rgba(34,197,94,0.08)" }} />
            <Box sx={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", bgcolor: "rgba(34,197,94,0.06)" }} />
            <Box sx={{ width: 100, height: 100, borderRadius: "50%", bgcolor: "#22c55e", mx: "auto", mb: 3, display: "flex", alignItems: "center", justifyContent: "center", animation: "pulseRing 2s ease-in-out infinite", "@keyframes pulseRing": { "0%, 100%": { boxShadow: "0 0 0 16px rgba(34,197,94,0.12), 0 0 0 32px rgba(34,197,94,0.06)" }, "50%": { boxShadow: "0 0 0 20px rgba(34,197,94,0.08), 0 0 0 40px rgba(34,197,94,0.03)" } } }}>
              <CheckCircleOutline sx={{ fontSize: 52, color: "white" }} />
            </Box>
            <Typography variant="h4" fontWeight={800} sx={{ color: "#15803d", mb: 1 }}>¡Solicitud Registrada con Éxito!</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 480, mx: "auto" }}>
              La solicitud <strong>{submittedInfo?.requestNumber}</strong> fue registrada y está en el flujo de abastecimiento.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 4 }}>
              {[
                { label: "Nro. Solicitud",        value: submittedInfo?.requestNumber ?? "—", color: "#15803d" },
                { label: "Productos solicitados",  value: `${submittedInfo?.items?.length ?? 0}`, color: "#0369a1" },
              ].map(card => (
                <Paper key={card.label} elevation={0} sx={{ px: 3, py: 2.5, borderRadius: 3, border: "1px solid #bbf7d0", bgcolor: "white", minWidth: 150, textAlign: "center" }}>
                  <Typography variant="h5" fontWeight={800} sx={{ color: card.color }}>{card.value}</Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>{card.label}</Typography>
                </Paper>
              ))}
              <Paper elevation={0} sx={{ px: 3, py: 2.5, borderRadius: 3, border: "1px solid #bbf7d0", bgcolor: "white", minWidth: 150, textAlign: "center" }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 0.5 }}><Chip label={submittedInfo?.status} color="success" sx={{ fontWeight: 800, borderRadius: 1 }} /></Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>Estado</Typography>
              </Paper>
            </Box>
            <Alert icon={<AssignmentOutlined />} severity="info" sx={{ borderRadius: 2, maxWidth: 520, mx: "auto", mb: 4 }}>
              La solicitud pasará al proceso de <strong>Recepción de Materiales</strong> una vez que el proveedor despache.
            </Alert>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
              <ButtonBase label="Volver al Inventario" startIcon={<RefreshOutlined />} onClick={() => { setShowSuccess(false); cargarInventario(); }} sx={{ px: 4, py: 1.5, fontWeight: 700, boxShadow: "0 4px 12px rgba(34,197,94,0.3)", borderRadius: 2.5 }} />
              <ButtonBase label="Ver Solicitudes" variant="outlined" startIcon={<ListAltOutlined />} onClick={() => setShowSuccess(false)} sx={{ px: 4, py: 1.5, bgcolor: "white", color: "text.primary", border: "1px solid #cbd5e1", borderRadius: 2.5 }} />
            </Stack>
          </Card>
        </Box>
      </Fade>

      {/* ══ CONTENIDO PRINCIPAL ══ */}
      <Fade in={!showSuccess} timeout={400} unmountOnExit>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

          {/* KPI Cards */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {(["ROJO", "AMARILLO", "VERDE", "GRIS"] as SemaforoColor[]).map(sem => {
              const cfg = semaforoConfig[sem];
              const count = metricas[sem];
              const iconMap: Record<SemaforoColor, React.ReactNode> = {
                ROJO: <ReportProblemOutlined sx={{ fontSize: 20, color: cfg.color }} />,
                AMARILLO: <WarningAmberOutlined sx={{ fontSize: 20, color: cfg.color }} />,
                VERDE: <CheckCircle sx={{ fontSize: 20, color: cfg.color }} />,
                GRIS: <ErrorOutlined sx={{ fontSize: 20, color: cfg.color }} />,
              };
              return (
                <Paper key={sem} variant="outlined" sx={{ flex: "1 1 150px", p: 2.5, borderRadius: 3, bgcolor: cfg.bg, border: `1.5px solid ${cfg.border}`, transition: "all 0.2s", "&:hover": { transform: "translateY(-2px)", boxShadow: `0 8px 24px ${cfg.color}20` } }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                    {iconMap[sem]}
                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: cfg.color, opacity: 0.4, ...(cfg.pulse && { animation: "semPulse 1.6s ease-in-out infinite", "@keyframes semPulse": { "0%, 100%": { boxShadow: `0 0 0 0 ${cfg.color}60` }, "50%": { boxShadow: `0 0 0 5px ${cfg.color}00` } } }) }} />
                  </Box>
                  <Typography variant="h3" fontWeight={900} sx={{ color: cfg.color, lineHeight: 1 }}>{loading ? "—" : count}</Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: "uppercase", letterSpacing: 0.7, fontSize: "0.68rem" }}>{cfg.label}</Typography>
                </Paper>
              );
            })}
          </Box>

          {/* Banner reestoqueo activo */}
          <Collapse in={modo === "reestoqueo"}>
            <Card sx={{ borderRadius: 3, background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)", p: 0, overflow: "hidden" }}>
              <Box sx={{ p: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ bgcolor: "rgba(255,255,255,0.15)", p: 1, borderRadius: 2, display: "flex" }}><ShoppingCartOutlined sx={{ color: "white", fontSize: 22 }} /></Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={800} color="white">Modo Reestoqueo Activo</Typography>
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.75)" }}>Selecciona los productos que deseas reabastecer. Los críticos ya están pre-seleccionados.</Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  {selectedIds.size > 0 && (
                    <Chip label={`${selectedIds.size} seleccionado${selectedIds.size > 1 ? "s" : ""}`} size="small" sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white", fontWeight: 700 }} />
                  )}
                  <ButtonBase label="Cancelar" startIcon={<CancelOutlined />} onClick={cancelarReestoqueo} size="small" sx={{ bgcolor: "rgba(255,255,255,0.12)", color: "white", border: "1px solid rgba(255,255,255,0.25)", "&:hover": { bgcolor: "rgba(255,255,255,0.2)" } }} />
                </Stack>
              </Box>
            </Card>
          </Collapse>

          {/* Panel filtros + acciones */}
          <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", overflow: "hidden" }}>
            <Box sx={{ px: 3, py: 2.5, borderBottom: "1px solid", borderColor: "divider", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2, bgcolor: "#fafbfc" }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: 4, height: 22, bgcolor: modo === "reestoqueo" ? "#1d4ed8" : "primary.main", borderRadius: 1, transition: "background 0.3s" }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight={800}>{modo === "consulta" ? "Consulta de Inventario" : "Selección para Reestoqueo"}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {modo === "consulta" ? `${itemsFiltrados.length} productos cargados` : `${selectedIds.size} de ${itemsFiltrados.length} productos seleccionados`}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                {necesitanReestoqueo > 0 && modo === "consulta" && (
                  <Box onClick={activarModoReestoqueo} sx={{ display: "flex", alignItems: "center", gap: 1, px: 2, py: 0.8, borderRadius: 2, bgcolor: "#fef2f2", border: "1px solid #fecaca", cursor: "pointer", "&:hover": { bgcolor: "#fee2e2" } }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#dc2626", animation: "semPulse 1.6s ease-in-out infinite", "@keyframes semPulse": { "0%, 100%": { boxShadow: "0 0 0 0 #dc262660" }, "50%": { boxShadow: "0 0 0 5px #dc262600" } } }} />
                    <Typography variant="caption" fontWeight={700} color="error.main">{necesitanReestoqueo} producto{necesitanReestoqueo > 1 ? "s" : ""} requieren reestoqueo</Typography>
                  </Box>
                )}
                <Tooltip title="Actualizar inventario">
                  <span>
                    <ButtonBase label="" startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <RefreshOutlined />} onClick={cargarInventario} disabled={loading} variant="outlined" sx={{ minWidth: 40, px: 1.5, bgcolor: "white", color: "text.secondary", border: "1px solid #e2e8f0" }} />
                  </span>
                </Tooltip>
                {modo === "consulta" ? (
                  <ButtonBase label="Reestoquear Inventario" startIcon={<AutorenewOutlined />} onClick={activarModoReestoqueo} sx={{ px: 3, py: 1.2, fontWeight: 700, borderRadius: 2.5, background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)", boxShadow: "0 4px 14px rgba(37,99,235,0.35)", "&:hover": { transform: "translateY(-1px)", boxShadow: "0 8px 20px rgba(37,99,235,0.45)" } }} />
                ) : (
                  <ButtonBase label={generatingRequest ? "Generando..." : "Registrar Solicitud"} startIcon={generatingRequest ? <CircularProgress size={18} color="inherit" /> : <AddCircleOutline />} onClick={handleGenerarSolicitud} disabled={generatingRequest || selectedIds.size === 0} sx={{ px: 3, py: 1.2, fontWeight: 700, borderRadius: 2.5, background: selectedIds.size === 0 ? undefined : "linear-gradient(135deg, #16a34a 0%, #15803d 100%)", boxShadow: selectedIds.size > 0 ? "0 4px 14px rgba(22,163,74,0.35)" : "none" }} />
                )}
              </Stack>
            </Box>
            <Box sx={{ px: 3, py: 2, display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
              <Box sx={{ flex: "0 0 220px" }}>
                <SelectBase label="Tipo de Producto" size="small" value={filterType} onChange={(v) => setFilterType(String(v))} options={[ { label: "Todos los productos", value: "ALL" }, { label: "📦 Materiales", value: "MATERIAL" }, { label: "⚙️ Equipos", value: "EQUIPMENT" }, { label: "🔧 Herramientas", value: "TOOL" }, { label: "🦺 EPP", value: "EPP" } ]} fullWidth />
              </Box>
              <Box sx={{ flex: 1, minWidth: 200 }}>
                <TextField fullWidth size="small" placeholder="Buscar por código o descripción..." value={search} onChange={e => setSearch(e.target.value)} InputProps={{ startAdornment: <SearchOutlined sx={{ mr: 1, color: "text.disabled", fontSize: 18 }} /> }} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
              </Box>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip label={`🔴 ${metricas.ROJO} Críticos`}    size="small" clickable sx={{ fontWeight: 700, fontSize: "0.72rem", bgcolor: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }} />
                <Chip label={`🟡 ${metricas.AMARILLO} En alerta`} size="small" clickable sx={{ fontWeight: 700, fontSize: "0.72rem", bgcolor: "#fffbeb", color: "#d97706", border: "1px solid #fde68a" }} />
                {modo === "reestoqueo" && selectedIds.size > 0 && (
                  <Chip label="Limpiar selección" size="small" clickable icon={<Close sx={{ fontSize: "12px !important" }} />} onClick={() => { setSelectedIds(new Set()); setSelectedItems([]); }} sx={{ fontWeight: 600, fontSize: "0.72rem", bgcolor: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }} />
                )}
              </Stack>
            </Box>
          </Card>

          {/* DataGrid principal */}
          <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5, flexWrap: "wrap", gap: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <BarChartOutlined sx={{ color: "#1976d2", fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={800}>{modo === "consulta" ? "Estado General del Inventario" : "Selecciona los productos a reabastecer"}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {modo === "reestoqueo" ? "Marca los checkboxes de los productos que deseas incluir en la solicitud" : "Vista de solo lectura — usa \"Reestoquear Inventario\" para iniciar una solicitud"}
                  </Typography>
                </Box>
              </Stack>
              {modo === "consulta" && metricas.ROJO > 0 && (
                <Alert severity="error" sx={{ borderRadius: 2, py: 0.5, px: 2, cursor: "pointer" }} onClick={activarModoReestoqueo}>
                  <Typography variant="body2" fontWeight={700}>{metricas.ROJO} producto{metricas.ROJO > 1 ? "s" : ""} en nivel crítico — Clic para reestoquear</Typography>
                </Alert>
              )}
            </Box>

            {loading ? (
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 10, gap: 2 }}>
                <CircularProgress size={48} />
                <Typography variant="body2" color="text.secondary">Cargando inventario...</Typography>
              </Box>
            ) : (
              <CustomDataGrid
                columns={columns}
                localRows={itemsFiltrados}
                serverSide={false}
                search=""
                onSearch={() => {}}
                pageSize={15}
                showToolbar={false}
                selectionEnabled={modo === "reestoqueo"}
                selectedIds={selectedIds}
                onSelectionChange={handleCheckOne}
                onSelectAll={handleCheckAll}
                getRowClassName={(params) => {
                  const sem = getSemaforo(params.row);
                  if (sem === "ROJO")     return "row-critico";
                  if (sem === "GRIS")     return "row-sin-stock";
                  if (sem === "AMARILLO") return "row-alerta";
                  return "";
                }}
                sx={{
                  "& .row-critico":   { bgcolor: "#fff5f5 !important", "&:hover": { bgcolor: "#fee2e2 !important" } },
                  "& .row-sin-stock": { bgcolor: "#f8fafc !important", opacity: 0.75 },
                  "& .row-alerta":    { bgcolor: "#fffdf0 !important", "&:hover": { bgcolor: "#fef9c3 !important" } },
                  ...(modo === "consulta" && { "& .MuiDataGrid-row": { cursor: "default" } }),
                }}
              />
            )}
          </Card>

          {/* Carrito */}
          <Collapse in={modo === "reestoqueo" && selectedItems.length > 0} unmountOnExit>
            <Card elevation={4} sx={{ borderRadius: 4, border: "2px solid #bfdbfe", overflow: "hidden", boxShadow: "rgba(37,99,235,0.18) 0px 8px 32px" }}>
              <Box sx={{ background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)", p: 3, color: "white" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 1, borderRadius: 2, display: "flex" }}><TrendingDownOutlined /></Box>
                    <Box>
                      <Typography variant="h6" fontWeight={800}>Carrito de Reestoqueo</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.85 }}>{selectedItems.length} producto(s) — Ajusta las cantidades si es necesario</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={1.5} flexWrap="wrap">
                    {selectedItems.filter(i => i.isUrgent).length > 0 && (
                      <Chip label={`${selectedItems.filter(i => i.isUrgent).length} urgente${selectedItems.filter(i => i.isUrgent).length > 1 ? "s" : ""}`} size="small" icon={<WarningAmberOutlined sx={{ fontSize: "14px !important", color: "white !important" }} />} sx={{ bgcolor: "#ef4444", color: "white", fontWeight: 700 }} />
                    )}
                    <Chip label={`${selectedItems.reduce((s, i) => s + (i.requestedQuantity || 0), 0)} unidades totales`} size="small" sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white", fontWeight: 700 }} />
                  </Stack>
                </Box>
              </Box>
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
                  {(["MATERIAL", "EQUIPMENT", "TOOL", "EPP"] as const).filter(tipo => selectedItems.some(i => i.productType === tipo)).map(tipo => {
                    const cfg = productoConfig[tipo];
                    const count = selectedItems.filter(i => i.productType === tipo).length;
                    return (
                      <Paper key={tipo} variant="outlined" sx={{ flex: "1 1 120px", p: 2, borderRadius: 2, textAlign: "center", border: `1px solid ${cfg.color}30`, bgcolor: cfg.bgLight }}>
                        <Typography variant="h5" fontWeight={800} sx={{ color: cfg.color }}>{count}</Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>{cfg.icon} {cfg.label}{count > 1 ? "s" : ""}</Typography>
                      </Paper>
                    );
                  })}
                </Box>
                {/* FIX #1: Pasar id correcto para que DataGrid no se confunda */}
                <CustomDataGrid
                  columns={columnsSelected}
                  localRows={selectedItems.map(i => ({ ...i, id: i.inventoryId }))}
                  serverSide={false}
                  search=""
                  onSearch={() => {}}
                  pageSize={20}
                  showToolbar={false}
                  sx={{ border: "1px solid #bfdbfe", "& .MuiDataGrid-columnHeaders": { bgcolor: "#eff6ff" } }}
                />
                <Divider sx={{ my: 3 }} />
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <InfoOutlined sx={{ fontSize: 16, color: "text.disabled" }} />
                    <Typography variant="caption" color="text.disabled">Las cantidades cubren el déficit al stock mínimo por defecto</Typography>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <ButtonBase label="Cancelar" variant="outlined" startIcon={<CancelOutlined />} onClick={cancelarReestoqueo} sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1" }} />
                    <ButtonBase
                      label={generatingRequest ? "Generando..." : "Registrar Solicitud de Abastecimiento"}
                      startIcon={generatingRequest ? <CircularProgress size={18} color="inherit" /> : <AddCircleOutline />}
                      onClick={handleGenerarSolicitud}
                      disabled={generatingRequest}
                      sx={{ px: 4, py: 1.5, fontWeight: 700, fontSize: "0.85rem", borderRadius: 2.5, background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)", boxShadow: "0 8px 20px rgba(22,163,74,0.3)", "&:hover": { transform: "translateY(-1px)", boxShadow: "0 12px 28px rgba(22,163,74,0.4)" } }}
                    />
                  </Stack>
                </Box>
              </Box>
            </Card>
          </Collapse>

        </Box>
      </Fade>

      {/* ══ MODAL CONFIRMACIÓN ══ */}
      <Dialog open={confirmDialogOpen} onClose={() => !submitting && setConfirmDialogOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, overflow: "hidden" } }}>
        <DialogTitle sx={{ m: 0, p: 0 }}>
          <Box sx={{ background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)", p: 3, color: "white", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 0.8, borderRadius: 1.5, display: "flex" }}><SendOutlined fontSize="small" /></Box>
              <Box>
                <Typography variant="h6" fontWeight={800}>Confirmar Solicitud</Typography>
                <Typography variant="caption" sx={{ opacity: 0.85 }}>Revisa los detalles antes de enviar al backend</Typography>
              </Box>
            </Stack>
            {!submitting && <IconButton onClick={() => setConfirmDialogOpen(false)} size="small" sx={{ color: "rgba(255,255,255,0.7)" }}><Close fontSize="small" /></IconButton>}
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 3, mt: 1 }}>
          <Box sx={{ p: 2.5, bgcolor: "#f8fafc", borderRadius: 2, mb: 3, border: "1px solid #e2e8f0" }}>
            <Stack spacing={2} divider={<Divider />}>
              <Stack direction="row" spacing={2} alignItems="center">
                <AssignmentOutlined color="action" fontSize="small" />
                <Box>
                  <Typography variant="caption" display="block" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700 }}>Número de Solicitud (preview)</Typography>
                  <Typography variant="body1" fontWeight={800} color="primary.main">{requestDto?.requestNumber}</Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <TableChartOutlined color="action" fontSize="small" />
                <Box>
                  <Typography variant="caption" display="block" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700 }}>Total</Typography>
                  <Typography variant="body2" fontWeight={600}>{requestDto?.items?.length} productos — {selectedItems.reduce((s, i) => s + (i.requestedQuantity || 0), 0)} unidades</Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <EventOutlined color="action" fontSize="small" />
                <Box>
                  <Typography variant="caption" display="block" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700 }}>Entrega estimada</Typography>
                  <Typography variant="body2" fontWeight={600}>{requestDto?.requestedDeliveryDate ? dayjs(requestDto.requestedDeliveryDate).format("DD [de] MMMM, YYYY") : "—"}</Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>
          <Box sx={{ display: "flex", gap: 1.5, mb: 3, flexWrap: "wrap" }}>
            {(["MATERIAL", "EQUIPMENT", "TOOL", "EPP"] as const).filter(tipo => selectedItems.some(i => i.productType === tipo)).map(tipo => {
              const cfg = productoConfig[tipo];
              const count = selectedItems.filter(i => i.productType === tipo).length;
              const urgentes = selectedItems.filter(i => i.productType === tipo && i.isUrgent).length;
              return (
                <Paper key={tipo} variant="outlined" sx={{ flex: "1 1 90px", p: 1.5, borderRadius: 2, textAlign: "center", border: `1px solid ${cfg.color}30` }}>
                  <Typography variant="h5" fontWeight={800} sx={{ color: cfg.color }}>{count}</Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">{cfg.icon} {cfg.label}{count > 1 ? "s" : ""}</Typography>
                  {urgentes > 0 && <Chip label={`${urgentes} urg.`} size="small" color="error" sx={{ mt: 0.5, height: 18, fontSize: "0.62rem", fontWeight: 700 }} />}
                </Paper>
              );
            })}
          </Box>
          {selectedItems.filter(i => i.isUrgent).length > 0 && (
            <Alert severity="error" icon={<ReportProblemOutlined />} sx={{ borderRadius: 2, mb: 2 }}>
              <Typography variant="body2" fontWeight={700} mb={0.5}>Productos críticos incluidos:</Typography>
              {selectedItems.filter(i => i.isUrgent).map(item => (
                <Typography key={item.inventoryId} variant="caption" display="block" color="text.secondary">
                  • {item.itemCode} — {item.description || item.itemName} (actual: {item.quantityAvailable} / solicitar: {item.requestedQuantity})
                </Typography>
              ))}
            </Alert>
          )}
          <Alert severity="warning" icon={<WarningAmberOutlined />} sx={{ borderRadius: 2, fontWeight: 500 }}>
            Al confirmar, se enviará el POST a <strong>/api/hub-inventory/supply-request</strong> y la solicitud quedará registrada.
          </Alert>
        </DialogContent>
        <DialogActions sx={{ p: 3, bgcolor: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
          <ButtonBase label="Regresar" onClick={() => setConfirmDialogOpen(false)} disabled={submitting} sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1" }} />
          <ButtonBase
            label={submitting ? "Enviando al servidor..." : "Confirmar y Registrar"}
            startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <CheckCircleOutline />}
            onClick={handleAprobarSolicitud}
            disabled={submitting}
            sx={{ px: 4, background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)", boxShadow: "0 4px 14px rgba(37,99,235,0.3)" }}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
}