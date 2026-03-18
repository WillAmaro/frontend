"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Box, Card, Typography, Chip, Stack, Paper, Divider, Collapse,
  Alert, Fade, TextField, InputAdornment, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
  Tooltip, Badge,
} from "@mui/material";
import {
  SearchOutlined, Close, SendOutlined, AssignmentOutlined,
  EventOutlined, TableChartOutlined, CheckCircleOutline,
  WarningAmberOutlined, ReportProblemOutlined, AddCircleOutline,
  CancelOutlined, InfoOutlined, ListAltOutlined, RefreshOutlined,
  AutorenewOutlined, ShoppingCartOutlined, TrendingUpOutlined,
  CategoryOutlined,
} from "@mui/icons-material";
import { TitleCard } from "@/src/components/base/TitleCard";
import ButtonBase from "@/src/components/base/ButtonBase";
import SelectBase from "@/src/components/base/SelectBase";
import CustomDataGrid from "@/src/components/base/CustomDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { API_URL } from "@/src/lib/config";
import { Pi } from "lucide-react";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type ProductType = "EPP" | "MATERIAL" | "EQUIPMENT" | "TOOL";

interface CatalogProduct {
  id: number;
  code: string;
  name: string;
  itemId:string;
  description: string | null;
  category: string;
  productType: ProductType;
  standardPrice: number | null;
  lastPurchasePrice: number | null;
  isActive: boolean;
  tenantId: number;
}

interface SelectedItemForRequest {
  productId: number;
  code: string;
  name: string;
  id:number;
  itemId:number;
  productType: ProductType;
  category: string;
  requestedQuantity: number;
  unitPrice: number | null;
  isUrgent: boolean;
  notes: string;
}

// DTOs que espera el backend
interface InventorySupplyItemDto {
  itemId: number;
  requestedQuantity: number;
  unitPrice: number | null;
  isUrgent?: boolean;
  notes?: string;
}

interface InventorySupplyRequestDto {
  tenantId: number;
  hubId: number;
  projectId: number;
  requestedBy: number;
  requestedDeliveryDate: string; // LocalDate → "YYYY-MM-DD"
  periodValueEntrega: string;    // LocalDate → "YYYY-MM-DD"
  items: InventorySupplyItemDto[];
  origin: "CATALOG";
}

interface InventoryApproveDto {
  tenantId: number;
  hubId: number;
  approvedBy: number;
  origin: "CATALOG";
  notes?: string;
  justification?: string;
}

interface SupplyRequestItemResponse {
  id: number;
  itemCode: string;
  itemName: string;
  itemDescription: string | null;
  productType: string;
  requestedQuantity: number;
  approvedQuantity: number | null;
  unitPrice: number | null;
  totalPrice: number | null;
}

interface InventorySupplyResponseDto {
  id: number;
  requestNumber: string;
  hubId: number;
  status: string;
  statusDisplay: string;
  periodStartDate: string;
  periodEndDate: string;
  requestedDeliveryDate: string;
  notes: string | null;
  justification: string | null;
  createdAt: string;
  approvedAt: string | null;
  items: SupplyRequestItemResponse[];
}

// ─── Constantes ───────────────────────────────────────────────────────────────

const TENANT_ID  = 1;
const HUB_ID     = 1;
const PROJECT_ID = 1;
const USER_ID    = 1; // TODO: reemplazar con el usuario del token

const PRODUCT_TYPE_CONFIG: Record<ProductType, {
  label: string; icon: string; color: string;
  bg: string; border: string;
}> = {
  MATERIAL:  { label: "Material",    icon: "📦", color: "#ea580c", bg: "#fff7ed", border: "#fed7aa" },
  EQUIPMENT: { label: "Equipo",      icon: "⚙️", color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0" },
  TOOL:      { label: "Herramienta", icon: "🔧", color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
  EPP:       { label: "EPP",         icon: "🦺", color: "#7c3aed", bg: "#faf5ff", border: "#ddd6fe" },
};

const PAGE_SIZE = 10;
const ALL_TYPES: ProductType[] = ["EPP", "MATERIAL", "EQUIPMENT", "TOOL"];

// ─── Componente ───────────────────────────────────────────────────────────────

export default function CatalogoPedido() {
  const topRef = useRef<HTMLDivElement>(null);

  // ── Tab de tipo activo (para el DataGrid) ─────────────────────────────
  const [activeTab, setActiveTab]         = useState<ProductType>("EPP");
  const [search, setSearch]               = useState("");
  const [page, setPage]                   = useState(0);
  const [loading, setLoading]             = useState(false);
  const [modoSolicitud, setModoSolicitud] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // rowsRef: guarda la página visible actual sin stale closure
  const rowsRef = useRef<CatalogProduct[]>([]);

  // ── Selección acumulada de TODOS los tipos ────────────────────────────
  // selectedIds: Set de IDs para marcar checkboxes en el DataGrid activo
  // selectedItems: carrito acumulado cross-type
  const [selectedIds, setSelectedIds]     = useState<Set<number>>(new Set());
  const [selectedItems, setSelectedItems] = useState<SelectedItemForRequest[]>([]);

  // ── Flujo de solicitud ────────────────────────────────────────────────
  const [generando, setGenerando]               = useState(false);
  const [createdRequest, setCreatedRequest]     = useState<InventorySupplyResponseDto | null>(null);
  const [confirmOpen, setConfirmOpen]           = useState(false);
  const [submitting, setSubmitting]             = useState(false);
  const [showSuccess, setShowSuccess]           = useState(false);
  const [submittedInfo, setSubmittedInfo]       = useState<InventorySupplyResponseDto | null>(null);
  const [deliveryDays, setDeliveryDays]         = useState<number>(7);

  // ── Búsqueda con debounce ─────────────────────────────────────────────
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => setDebouncedSearch(search), 380);
    return () => { if (searchTimer.current) clearTimeout(searchTimer.current); };
  }, [search]);

  // Al cambiar tab o búsqueda → reset page + reload
  useEffect(() => {
    setPage(0);
    setReloadTrigger(t => t + 1);
  }, [activeTab, debouncedSearch]);

  // ── fetchData: filtra por el tab activo ──────────────────────────────
  const fetchData = useCallback(
    async (p: number, _size: number, _search: string) => {
      setPage(p);
      const params = new URLSearchParams({
        productType: activeTab,
        page: String(p),
        size: String(PAGE_SIZE),
        ...(debouncedSearch.trim() ? { search: debouncedSearch.trim() } : {}),
      });
      const res = await fetch(`${API_URL}/api/catalog-supply/product-type?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: any = await res.json();
      rowsRef.current = data.data.content;
      setTotalElements(data.data.totalElements);
      return { rows: data.data.content, total: data.data.totalElements };
    },
    [activeTab, debouncedSearch]
  );

  const buildSelectedItem = (p: CatalogProduct): SelectedItemForRequest => ({
    id:p.id,
    productId: p.id, code: p.code, name: p.name,
    itemId : p.id,
    productType: p.productType, category: p.category,
    requestedQuantity: 1,
    unitPrice: p.lastPurchasePrice ?? p.standardPrice ?? null,
    isUrgent: false, notes: "",
  });

  // ── Activar / cancelar modo solicitud ────────────────────────────────
  const activarModo = () => {
    setModoSolicitud(true);
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };
  const cancelarModo = () => {
    setModoSolicitud(false);
    setSelectedIds(new Set());
    setSelectedItems([]);
    setCreatedRequest(null);
  };

  // ── Handlers selección ────────────────────────────────────────────────
  // selectedIds refleja solo los IDs del tab activo para el DataGrid,
  // pero selectedItems acumula todos los tipos.

  const handleCheckOne = useCallback((id: number | string, checked: boolean) => {
    const numId = Number(id);
    setSelectedIds(prev => {
      const next = new Set(prev);
      checked ? next.add(numId) : next.delete(numId);
      return next;
    });
    setSelectedItems(prev => {
      if (!checked) return prev.filter(s => s.productId !== numId);
      const item = rowsRef.current.find(r => r.id === numId);
      if (!item || prev.some(s => s.productId === numId)) return prev;
      return [...prev, buildSelectedItem(item)];
    });
  }, []);

  const handleCheckAll = useCallback((checked: boolean, visibleIds: (number | string)[]) => {
    const numIds = visibleIds.map(Number);
    setSelectedIds(prev => {
      const next = new Set(prev);
      numIds.forEach(id => checked ? next.add(id) : next.delete(id));
      return next;
    });
    setSelectedItems(prev => {
      if (!checked) return prev.filter(s => !numIds.includes(s.productId));
      const existing = new Set(prev.map(s => s.productId));
      const nuevos = rowsRef.current
        .filter(r => numIds.includes(r.id) && !existing.has(r.id))
        .map(buildSelectedItem);
      return [...prev, ...nuevos];
    });
  }, []);

  // Al cambiar de tab, sincroniza selectedIds con los del carrito que ya
  // estén en ese tab (para que los checkboxes aparezcan marcados)
  useEffect(() => {
    const idsDeEsteTab = new Set(
      selectedItems
        .filter(i => i.productType === activeTab)
        .map(i => i.productId)
    );
    setSelectedIds(idsDeEsteTab);
  }, [activeTab, selectedItems]);

  const updateQty = (productId: number, qty: number) =>
    setSelectedItems(prev => prev.map(i => i.productId === productId ? { ...i, requestedQuantity: Math.max(1, qty) } : i));

  const updateUnitPrice = (productId: number, price: number) =>
    setSelectedItems(prev => prev.map(i => i.productId === productId ? { ...i, unitPrice: Math.max(0, price) } : i));

  const toggleUrgent = (productId: number) =>
    setSelectedItems(prev => prev.map(i => i.productId === productId ? { ...i, isUrgent: !i.isUrgent } : i));

  const removeItem = (productId: number) => {
    setSelectedIds(prev => { const n = new Set(prev); n.delete(productId); return n; });
    setSelectedItems(prev => prev.filter(i => i.productId !== productId));
  };

  const totalEstimado = selectedItems.reduce((s, i) => s + (i.unitPrice ?? 0) * i.requestedQuantity, 0);
  const hayPrecio     = selectedItems.some(i => i.unitPrice !== null && i.unitPrice > 0);

  // ── PASO 1: POST → crea en DRAFT ─────────────────────────────────────
  const handleGenerarSolicitud = async () => {
    if (selectedItems.length === 0) { toast.warning("Selecciona al menos un producto"); return; }
    setGenerando(true);
    try {
      const deliveryDate  = dayjs().add(deliveryDays, "day").format("YYYY-MM-DD");
      const periodDate    = dayjs().format("YYYY-MM-DD");

      const body: InventorySupplyRequestDto = {
        tenantId:             TENANT_ID,
        hubId:                HUB_ID,
        projectId:            PROJECT_ID,
        requestedBy:          USER_ID,
        requestedDeliveryDate: deliveryDate,
        periodValueEntrega:   periodDate,
        origin:               "CATALOG",
        items: selectedItems.map(i => ({
          id: i.id,
          itemId:            i.productId,
          itemCode: i.code,
          deliveredQuantity:0,
          pendingQuantity:0,
          productType : i.productType,
          itemDescription : i.name,
          itemName : i.name,
          requestedQuantity: i.requestedQuantity,
          unitPrice:         i.unitPrice,
          isUrgent:          i.isUrgent,
          notes:             i.notes || undefined,
        })),
      };

      const res = await fetch(`${API_URL}/api/catalog-supply/supply-request`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message ?? `HTTP ${res.status}`);
      }

      const data = await res.json();
      const dto: InventorySupplyResponseDto = data.data;
      setCreatedRequest(dto);
      setConfirmOpen(true);
      toast.info(`Solicitud ${dto.requestNumber} creada en DRAFT`);
    } catch (e: any) {
      toast.error(`Error al generar solicitud: ${e.message}`);
    } finally {
      setGenerando(false);
    }
  };

  // ── PASO 2: PUT → aprueba la solicitud ───────────────────────────────
  const handleAprobar = async () => {
    if (!createdRequest) return;
    setConfirmOpen(false);
    setSubmitting(true);
    try {
      const body: any = {
        tenantId:     TENANT_ID,
        hubId:        HUB_ID,
        approvedBy:   USER_ID,
        origin:       "CATALOG",
          items: selectedItems.map(i => ({
          id: i.id,
          itemId:            i.productId,
          itemCode: i.code,
          deliveredQuantity:0,
          pendingQuantity:0,
          productType : i.productType,
          itemDescription : i.name,
          itemName : i.name,
          requestedQuantity: i.requestedQuantity,
          unitPrice:         i.unitPrice,
          isUrgent:          i.isUrgent,
          notes:             i.notes || undefined,
        })),
        notes:        `Aprobado desde catálogo — ${selectedItems.length} productos`,
        justification: "Solicitud generada desde catálogo de productos",
      };

      const res = await fetch(`${API_URL}/api/catalog-supply/supply-request/${createdRequest.id}`, {
        method:  "PUT",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message ?? `HTTP ${res.status}`);
      }

      const data = await res.json();
      const approved: InventorySupplyResponseDto = data.data;
      setSubmittedInfo(approved);
      setShowSuccess(true);
      cancelarModo();
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      toast.success(`Solicitud ${approved.requestNumber} aprobada exitosamente`);
    } catch (e: any) {
      toast.error(`Error al aprobar solicitud: ${e.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // ─── COLUMNAS DataGrid catálogo ────────────────────────────────────────
  const columns: GridColDef[] = [
    {
      field: "code", headerName: "Código", width: 160,
      renderCell: (p) => {
        const cfg = PRODUCT_TYPE_CONFIG[p.row.productType as ProductType];
        return (
          <Chip label={p.value} size="small"
            sx={{ bgcolor: cfg?.color, color: "white", fontWeight: 700, fontSize: "0.7rem", letterSpacing: 0.3, maxWidth: 150 }}
          />
        );
      },
    },
    {
      field: "name", headerName: "Nombre / Descripción", flex: 2, minWidth: 220,
      renderCell: (p) => (
        <Box>
          <Typography variant="body2" fontWeight={700} sx={{ lineHeight: 1.3 }}>{p.value}</Typography>
          {p.row.description && (
            <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.68rem" }}>{p.row.description}</Typography>
          )}
        </Box>
      ),
    },
    {
      field: "category", headerName: "Categoría", width: 140,
      renderCell: (p) => (
        <Chip label={p.value} size="small" variant="outlined"
          sx={{ fontSize: "0.72rem", fontWeight: 600, borderColor: "#94a3b8", color: "#475569" }}
        />
      ),
    },
    {
      field: "standardPrice", headerName: "Precio Estándar", width: 140, align: "right", headerAlign: "right",
      renderCell: (p) => (
        <Typography variant="body2" sx={{ fontFamily: "monospace", color: p.value ? "text.primary" : "text.disabled" }}>
          {p.value ? `S/ ${Number(p.value).toFixed(2)}` : "—"}
        </Typography>
      ),
    },
    {
      field: "lastPurchasePrice", headerName: "Últ. Compra", width: 130, align: "right", headerAlign: "right",
      renderCell: (p) => (
        <Typography variant="body2" sx={{ fontFamily: "monospace", color: p.value ? "#15803d" : "text.disabled", fontWeight: p.value ? 700 : 400 }}>
          {p.value ? `S/ ${Number(p.value).toFixed(2)}` : "—"}
        </Typography>
      ),
    },
    {
      field: "isActive", headerName: "Estado", width: 95, align: "center", headerAlign: "center",
      renderCell: (p) => p.value
        ? <Chip label="Activo"   size="small" sx={{ bgcolor: "#dcfce7", color: "#15803d", fontWeight: 700, fontSize: "0.68rem", height: 20 }} />
        : <Chip label="Inactivo" size="small" sx={{ bgcolor: "#f1f5f9", color: "#64748b", fontWeight: 600, fontSize: "0.68rem", height: 20 }} />,
    },
  ];

  // ─── COLUMNAS carrito ──────────────────────────────────────────────────
  const columnsCarrito: GridColDef[] = [
    {
      field: "productType", headerName: "Tipo", width: 110,
      renderCell: (p) => {
        const cfg = PRODUCT_TYPE_CONFIG[p.value as ProductType];
        return cfg
          ? <Chip label={`${cfg.icon} ${cfg.label}`} size="small" variant="outlined"
              sx={{ borderColor: cfg.color, color: cfg.color, fontWeight: 600, fontSize: "0.7rem" }}
            />
          : <Typography>{p.value}</Typography>;
      },
    },
    {
      field: "code", headerName: "Código", width: 145,
      renderCell: (p) => {
        const cfg = PRODUCT_TYPE_CONFIG[p.row.productType as ProductType];
        return <Chip label={p.value} size="small" sx={{ bgcolor: cfg?.color, color: "white", fontWeight: 700, fontSize: "0.7rem" }} />;
      },
    },
    { field: "name", headerName: "Nombre", flex: 2, minWidth: 180 },
    {
      field: "requestedQuantity", headerName: "Cantidad", width: 110, align: "center", headerAlign: "center",
      renderCell: (p) => (
        <TextField type="number" size="small" value={p.value}
          onChange={e => updateQty(p.row.productId, parseInt(e.target.value) || 1)}
          inputProps={{ min: 1, style: { textAlign: "center", fontWeight: 700, padding: "5px 8px" } }}
          sx={{ width: 78, "& .MuiOutlinedInput-root": { borderRadius: 1.5, fontSize: "0.85rem" } }}
        />
      ),
    },
    {
      field: "unitPrice", headerName: "Precio Unit.", width: 130, align: "right", headerAlign: "right",
      renderCell: (p) => (
        <TextField type="number" size="small" value={p.value ?? ""}
          placeholder="0.00"
          onChange={e => updateUnitPrice(p.row.productId, parseFloat(e.target.value) || 0)}
          InputProps={{ startAdornment: <InputAdornment position="start"><Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.7rem" }}>S/</Typography></InputAdornment> }}
          inputProps={{ min: 0, step: 0.01, style: { textAlign: "right", fontWeight: 700, padding: "5px 6px", width: 65 } }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5, fontSize: "0.8rem" }, "& .MuiInputAdornment-root": { mr: 0 } }}
        />
      ),
    },
    {
      field: "totalLine", headerName: "Subtotal", width: 110, align: "right", headerAlign: "right",
      renderCell: (p) => {
        const total = (p.row.unitPrice ?? 0) * p.row.requestedQuantity;
        return (
          <Typography variant="body2" fontWeight={800} sx={{ fontFamily: "monospace", color: total > 0 ? "#15803d" : "text.disabled" }}>
            {total > 0 ? `S/ ${total.toFixed(2)}` : "—"}
          </Typography>
        );
      },
    },
    {
      field: "isUrgent", headerName: "Urgente", width: 90, align: "center", headerAlign: "center",
      renderCell: (p) => (
        <Box onClick={() => toggleUrgent(p.row.productId)} sx={{ cursor: "pointer" }}>
          {p.value
            ? <Chip label="SÍ" size="small" color="error"     sx={{ fontWeight: 700, height: 20, fontSize: "0.68rem", cursor: "pointer" }} />
            : <Chip label="NO" size="small" variant="outlined" sx={{ fontWeight: 600, height: 20, fontSize: "0.68rem", cursor: "pointer", color: "text.disabled" }} />
          }
        </Box>
      ),
    },
    {
      field: "acciones", headerName: "", width: 48, align: "center",
      renderCell: (p) => (
        <Tooltip title="Quitar del pedido">
          <IconButton size="small" onClick={() => removeItem(p.row.productId)} sx={{ color: "#dc2626", "&:hover": { bgcolor: "#fef2f2" } }}>
            <Close fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  // ─── RENDER ────────────────────────────────────────────────────────────
  return (
    <Box ref={topRef} sx={{ maxWidth: 1400, mx: "auto", p: 4, display: "flex", flexDirection: "column", gap: 3 }}>

      <TitleCard
        icon={<CategoryOutlined sx={{ fontSize: 32 }} />}
        title="Catálogo de Productos"
        description="Explora el catálogo de materiales, equipos, herramientas y EPPs. Puedes seleccionar productos de varios tipos y generar una solicitud de abastecimiento en un solo envío."
      />

      {/* ══ PANTALLA ÉXITO ══ */}
      <Fade in={showSuccess} timeout={700} unmountOnExit>
        <Box>
          <Card elevation={0} sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 60%, #f0fdf4 100%)",
            border: "2px solid #bbf7d0", p: { xs: 4, md: 6 }, textAlign: "center",
            position: "relative", overflow: "hidden",
          }}>
            <Box sx={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", bgcolor: "rgba(34,197,94,0.08)" }} />
            <Box sx={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", bgcolor: "rgba(34,197,94,0.06)" }} />
            <Box sx={{
              width: 100, height: 100, borderRadius: "50%", bgcolor: "#22c55e",
              mx: "auto", mb: 3, display: "flex", alignItems: "center", justifyContent: "center",
              animation: "pulseRing 2s ease-in-out infinite",
              "@keyframes pulseRing": {
                "0%, 100%": { boxShadow: "0 0 0 16px rgba(34,197,94,0.12), 0 0 0 32px rgba(34,197,94,0.06)" },
                "50%":       { boxShadow: "0 0 0 20px rgba(34,197,94,0.08), 0 0 0 40px rgba(34,197,94,0.03)" },
              },
            }}>
              <CheckCircleOutline sx={{ fontSize: 52, color: "white" }} />
            </Box>
            <Typography variant="h4" fontWeight={800} sx={{ color: "#15803d", mb: 1 }}>¡Solicitud Aprobada!</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: "auto" }}>
              La solicitud <strong>{submittedInfo?.requestNumber}</strong> fue aprobada y está lista para el flujo de abastecimiento.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 4 }}>
              {[
                { label: "Nro. Solicitud",       value: submittedInfo?.requestNumber ?? "—",               color: "#15803d" },
                { label: "Productos solicitados", value: String(submittedInfo?.items?.length ?? 0),          color: "#0369a1" },
                { label: "Estado",                value: submittedInfo?.statusDisplay ?? submittedInfo?.status ?? "—", color: "#7c3aed" },
              ].map(card => (
                <Paper key={card.label} elevation={0} sx={{ px: 3, py: 2.5, borderRadius: 3, border: "1px solid #bbf7d0", bgcolor: "white", minWidth: 150, textAlign: "center" }}>
                  <Typography variant="h5" fontWeight={800} sx={{ color: card.color }}>{card.value}</Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>{card.label}</Typography>
                </Paper>
              ))}
            </Box>
            <Alert icon={<AssignmentOutlined />} severity="info" sx={{ borderRadius: 2, maxWidth: 520, mx: "auto", mb: 4 }}>
              La solicitud pasará al proceso de <strong>Recepción de Materiales</strong> una vez que el proveedor despache los ítems.
            </Alert>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
              <ButtonBase label="Nueva Solicitud" startIcon={<AddCircleOutline />}
                onClick={() => { setShowSuccess(false); activarModo(); }}
                sx={{ px: 4, py: 1.5, fontWeight: 700, boxShadow: "0 4px 12px rgba(34,197,94,0.3)", borderRadius: 2.5 }}
              />
              <ButtonBase label="Ver Catálogo" variant="outlined" startIcon={<ListAltOutlined />}
                onClick={() => setShowSuccess(false)}
                sx={{ px: 4, py: 1.5, bgcolor: "white", color: "text.primary", border: "1px solid #cbd5e1", borderRadius: 2.5 }}
              />
            </Stack>
          </Card>
        </Box>
      </Fade>

      {/* ══ CONTENIDO PRINCIPAL ══ */}
      <Fade in={!showSuccess} timeout={400} unmountOnExit>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

          {/* ── TABS de tipo de producto ─────────────────────────────── */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {ALL_TYPES.map(tipo => {
              const cfg     = PRODUCT_TYPE_CONFIG[tipo];
              const count   = selectedItems.filter(i => i.productType === tipo).length;
              const isActive = activeTab === tipo;
              return (
                <Paper key={tipo} variant="outlined"
                  onClick={() => { setActiveTab(tipo); setSearch(""); }}
                  sx={{
                    flex: "1 1 140px", p: 2.5, borderRadius: 3, cursor: "pointer", position: "relative",
                    bgcolor: isActive ? cfg.bg : "white",
                    border: isActive ? `2px solid ${cfg.color}` : `1.5px solid ${cfg.border}`,
                    transition: "all 0.2s",
                    "&:hover": { transform: "translateY(-2px)", boxShadow: `0 8px 24px ${cfg.color}25`, bgcolor: cfg.bg },
                  }}
                >
                  {/* Badge con cantidad en carrito */}
                  {count > 0 && (
                    <Box sx={{
                      position: "absolute", top: 8, right: 8,
                      bgcolor: cfg.color, color: "white",
                      borderRadius: "50%", width: 22, height: 22,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.65rem", fontWeight: 800,
                    }}>
                      {count}
                    </Box>
                  )}
                  <Typography sx={{ fontSize: 28, lineHeight: 1, mb: 1 }}>{cfg.icon}</Typography>
                  <Typography variant="body2" fontWeight={800} sx={{ color: cfg.color }}>{cfg.label}</Typography>
                  {isActive && <Box sx={{ width: 24, height: 3, bgcolor: cfg.color, borderRadius: 2, mt: 1 }} />}
                </Paper>
              );
            })}
          </Box>

          {/* ── Banner modo solicitud ────────────────────────────────── */}
          <Collapse in={modoSolicitud}>
            <Card sx={{ borderRadius: 3, background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)", p: 0, overflow: "hidden" }}>
              <Box sx={{ p: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ bgcolor: "rgba(255,255,255,0.15)", p: 1, borderRadius: 2, display: "flex" }}>
                    <ShoppingCartOutlined sx={{ color: "white", fontSize: 22 }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={800} color="white">Modo Pedido Activo</Typography>
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.75)" }}>
                      Marca productos de cualquier tipo — todos se incluirán en una sola solicitud.
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  {selectedItems.length > 0 && (
                    <Chip
                      label={`${selectedItems.length} producto${selectedItems.length > 1 ? "s" : ""} en pedido`}
                      size="small"
                      sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white", fontWeight: 700 }}
                    />
                  )}
                  <ButtonBase label="Cancelar" startIcon={<CancelOutlined />} onClick={cancelarModo} size="small"
                    sx={{ bgcolor: "rgba(255,255,255,0.12)", color: "white", border: "1px solid rgba(255,255,255,0.25)", "&:hover": { bgcolor: "rgba(255,255,255,0.2)" } }}
                  />
                </Stack>
              </Box>
            </Card>
          </Collapse>

          {/* ── Panel filtros y acciones ─────────────────────────────── */}
          <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", overflow: "hidden" }}>
            <Box sx={{ px: 3, py: 2.5, borderBottom: "1px solid", borderColor: "divider", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2, bgcolor: "#fafbfc" }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: 4, height: 22, bgcolor: PRODUCT_TYPE_CONFIG[activeTab].color, borderRadius: 1, transition: "background 0.3s" }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight={800}>
                    {PRODUCT_TYPE_CONFIG[activeTab].icon} {PRODUCT_TYPE_CONFIG[activeTab].label}s — Catálogo
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {totalElements} productos
                    {modoSolicitud && selectedItems.length > 0 && ` • ${selectedItems.length} en carrito (${ALL_TYPES.filter(t => selectedItems.some(i => i.productType === t)).length} tipos)`}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Tooltip title="Recargar catálogo">
                  <span>
                    <ButtonBase label="" startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <RefreshOutlined />}
                      onClick={() => setReloadTrigger(t => t + 1)} disabled={loading} variant="outlined"
                      sx={{ minWidth: 40, px: 1.5, bgcolor: "white", color: "text.secondary", border: "1px solid #e2e8f0" }}
                    />
                  </span>
                </Tooltip>
                {!modoSolicitud ? (
                  <ButtonBase label="Hacer Pedido desde Catálogo" startIcon={<AutorenewOutlined />} onClick={activarModo}
                    sx={{
                      px: 3, py: 1.2, fontWeight: 700, borderRadius: 2.5,
                      background: `linear-gradient(135deg, ${PRODUCT_TYPE_CONFIG[activeTab].color} 0%, ${PRODUCT_TYPE_CONFIG[activeTab].color}cc 100%)`,
                      boxShadow: `0 4px 14px ${PRODUCT_TYPE_CONFIG[activeTab].color}50`,
                    }}
                  />
                ) : (
                  <ButtonBase
                    label={generando ? "Generando..." : `Generar Solicitud (${selectedItems.length})`}
                    startIcon={generando ? <CircularProgress size={18} color="inherit" /> : <AddCircleOutline />}
                    onClick={handleGenerarSolicitud}
                    disabled={generando || selectedItems.length === 0}
                    sx={{
                      px: 3, py: 1.2, fontWeight: 700, borderRadius: 2.5,
                      background: selectedItems.length === 0 ? undefined : "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                      boxShadow: selectedItems.length > 0 ? "0 4px 14px rgba(22,163,74,0.35)" : "none",
                    }}
                  />
                )}
              </Stack>
            </Box>
            {/* Filtros */}
            <Box sx={{ px: 3, py: 2, display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
              <Box sx={{ flex: "0 0 210px" }}>
                <SelectBase
                  label="Tipo de Producto" size="small" value={activeTab}
                  onChange={(v) => setActiveTab(v as ProductType)}
                  options={[
                    { label: "📦 Materiales",  value: "MATERIAL"  },
                    { label: "⚙️ Equipos",      value: "EQUIPMENT" },
                    { label: "🔧 Herramientas", value: "TOOL"      },
                    { label: "🦺 EPP",          value: "EPP"       },
                  ]}
                  fullWidth
                />
              </Box>
              <Box sx={{ flex: 1, minWidth: 200 }}>
                <TextField
                  fullWidth size="small"
                  placeholder="Buscar por código o nombre..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlined sx={{ color: "text.disabled", fontSize: 18 }} />
                      </InputAdornment>
                    ),
                    endAdornment: search ? (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setSearch("")}><Close sx={{ fontSize: 16 }} /></IconButton>
                      </InputAdornment>
                    ) : null,
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Box>
              {modoSolicitud && selectedItems.length > 0 && (
                <Chip
                  label="Limpiar selección"
                  size="small" clickable
                  icon={<Close sx={{ fontSize: "12px !important" }} />}
                  onClick={() => { setSelectedIds(new Set()); setSelectedItems([]); }}
                  sx={{ fontWeight: 600, fontSize: "0.72rem", bgcolor: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}
                />
              )}
            </Box>
          </Card>

          {/* ── DataGrid catálogo ────────────────────────────────────── */}
          <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2.5, gap: 2 }}>
              <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: PRODUCT_TYPE_CONFIG[activeTab].bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                {PRODUCT_TYPE_CONFIG[activeTab].icon}
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={800}>
                  {modoSolicitud ? `Selecciona ${PRODUCT_TYPE_CONFIG[activeTab].label}s para tu solicitud` : `Catálogo de ${PRODUCT_TYPE_CONFIG[activeTab].label}s`}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {modoSolicitud
                    ? "Usa los checkboxes. Cambia de pestaña para agregar otros tipos al mismo pedido."
                    : "Vista de solo lectura — usa \"Hacer Pedido desde Catálogo\" para iniciar una solicitud"}
                </Typography>
              </Box>
            </Box>

            <CustomDataGrid
              columns={columns}
              serverSide={true}
              fetchData={fetchData}
              search={debouncedSearch}
              onSearch={setSearch}
              pageSize={PAGE_SIZE}
              showToolbar={false}
              reloadTrigger={reloadTrigger}
              selectionEnabled={modoSolicitud}
              selectedIds={selectedIds}
              onSelectionChange={handleCheckOne}
              onSelectAll={handleCheckAll}
              sx={{
                ...(modoSolicitud && { "& .MuiDataGrid-row:hover": { bgcolor: "#f5f3ff !important", cursor: "pointer" } }),
                ...(!modoSolicitud && { "& .MuiDataGrid-row": { cursor: "default" } }),
              }}
            />
          </Card>

          {/* ══ CARRITO MULTI-TIPO ══ */}
          <Collapse in={modoSolicitud && selectedItems.length > 0} unmountOnExit>
            <Card elevation={4} sx={{ borderRadius: 4, border: "2px solid #ddd6fe", overflow: "hidden", boxShadow: "rgba(124,58,237,0.18) 0px 8px 32px" }}>
              {/* Header carrito */}
              <Box sx={{ background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)", p: 3, color: "white" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 1, borderRadius: 2, display: "flex" }}><TrendingUpOutlined /></Box>
                    <Box>
                      <Typography variant="h6" fontWeight={800}>Pedido desde Catálogo</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.85 }}>
                        {selectedItems.length} producto(s) de {ALL_TYPES.filter(t => selectedItems.some(i => i.productType === t)).length} tipo(s) — ajusta cantidades antes de enviar
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={1.5} flexWrap="wrap" alignItems="center">
                    {selectedItems.filter(i => i.isUrgent).length > 0 && (
                      <Chip
                        label={`${selectedItems.filter(i => i.isUrgent).length} urgente${selectedItems.filter(i => i.isUrgent).length > 1 ? "s" : ""}`}
                        size="small"
                        icon={<WarningAmberOutlined sx={{ fontSize: "14px !important", color: "white !important" }} />}
                        sx={{ bgcolor: "#ef4444", color: "white", fontWeight: 700 }}
                      />
                    )}
                    {hayPrecio && (
                      <Chip
                        label={`Total: S/ ${totalEstimado.toFixed(2)}`}
                        size="small"
                        sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white", fontWeight: 700, fontFamily: "monospace" }}
                      />
                    )}
                  </Stack>
                </Box>
              </Box>

              <Box sx={{ p: 3 }}>
                {/* Resumen por tipo */}
                <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
                  {ALL_TYPES
                    .filter(tipo => selectedItems.some(i => i.productType === tipo))
                    .map(tipo => {
                      const cfg      = PRODUCT_TYPE_CONFIG[tipo];
                      const items    = selectedItems.filter(i => i.productType === tipo);
                      const subtotal = items.reduce((s, i) => s + (i.unitPrice ?? 0) * i.requestedQuantity, 0);
                      return (
                        <Paper key={tipo} variant="outlined"
                          onClick={() => setActiveTab(tipo)}
                          sx={{ flex: "1 1 130px", p: 2, borderRadius: 2, textAlign: "center", border: `1px solid ${cfg.border}`, bgcolor: cfg.bg, cursor: "pointer", "&:hover": { transform: "translateY(-1px)" }, transition: "0.15s" }}>
                          <Typography sx={{ fontSize: 22, lineHeight: 1 }}>{cfg.icon}</Typography>
                          <Typography variant="h5" fontWeight={800} sx={{ color: cfg.color }}>{items.length}</Typography>
                          <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">{cfg.label}</Typography>
                          {subtotal > 0 && <Typography variant="caption" sx={{ color: cfg.color, fontWeight: 700, fontFamily: "monospace" }}>S/ {subtotal.toFixed(2)}</Typography>}
                        </Paper>
                      );
                    })}
                </Box>

                {/* Fecha de entrega */}
                <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center", flexWrap: "wrap" }}>
                  <Box sx={{ flex: "0 0 210px" }}>
                    <TextField
                      label="Días para entrega estimada" type="number" size="small"
                      value={deliveryDays}
                      onChange={e => setDeliveryDays(Math.max(1, parseInt(e.target.value) || 1))}
                      inputProps={{ min: 1 }}
                      InputProps={{ endAdornment: <InputAdornment position="end"><Typography variant="caption" color="text.secondary">días</Typography></InputAdornment> }}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                      fullWidth
                    />
                  </Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <InfoOutlined sx={{ fontSize: 15, color: "text.disabled" }} />
                    <Typography variant="caption" color="text.disabled">
                      Entrega estimada: <strong>{dayjs().add(deliveryDays, "day").format("DD/MM/YYYY")}</strong>
                    </Typography>
                  </Stack>
                </Box>

                {/* DataGrid carrito — muestra TODOS los tipos mezclados */}
                <CustomDataGrid
                  columns={columnsCarrito}
                  localRows={selectedItems.map(i => ({ ...i, id: i.productId }))}
                  serverSide={false}
                  search=""
                  onSearch={() => {}}
                  pageSize={50}
                  showToolbar={false}
                  sx={{ border: "1px solid #ddd6fe", "& .MuiDataGrid-columnHeaders": { bgcolor: "#f5f3ff" } }}
                />

                {/* Totales */}
                {hayPrecio && (
                  <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f3ff", borderRadius: 2, border: "1px solid #ddd6fe", display: "flex", justifyContent: "flex-end" }}>
                    <Stack spacing={0.5} alignItems="flex-end">
                      <Stack direction="row" spacing={2}>
                        <Typography variant="body2" color="text.secondary">Productos:</Typography>
                        <Typography variant="body2" fontWeight={700}>{selectedItems.length}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Typography variant="body2" color="text.secondary">Unidades totales:</Typography>
                        <Typography variant="body2" fontWeight={700}>{selectedItems.reduce((s, i) => s + i.requestedQuantity, 0)}</Typography>
                      </Stack>
                      <Divider sx={{ width: "100%", my: 0.5 }} />
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="body1" fontWeight={700} color="text.secondary">Total Estimado:</Typography>
                        <Typography variant="h6" fontWeight={900} sx={{ color: "#7c3aed", fontFamily: "monospace" }}>
                          S/ {totalEstimado.toFixed(2)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                )}

                <Divider sx={{ my: 3 }} />
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <InfoOutlined sx={{ fontSize: 16, color: "text.disabled" }} />
                    <Typography variant="caption" color="text.disabled">
                      Se enviará una sola solicitud con todos los productos seleccionados.
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <ButtonBase label="Cancelar" variant="outlined" startIcon={<CancelOutlined />} onClick={cancelarModo}
                      sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1" }}
                    />
                    <ButtonBase
                      label={generando ? "Creando solicitud..." : "Generar Solicitud de Abastecimiento"}
                      startIcon={generando ? <CircularProgress size={18} color="inherit" /> : <AddCircleOutline />}
                      onClick={handleGenerarSolicitud}
                      disabled={generando}
                      sx={{
                        px: 4, py: 1.5, fontWeight: 700, fontSize: "0.85rem", borderRadius: 2.5,
                        background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
                        boxShadow: "0 8px 20px rgba(124,58,237,0.3)",
                      }}
                    />
                  </Stack>
                </Box>
              </Box>
            </Card>
          </Collapse>

        </Box>
      </Fade>

      {/* ══ MODAL CONFIRMACIÓN — muestra lo que devolvió el backend ══ */}
      <Dialog open={confirmOpen} onClose={() => !submitting && setConfirmOpen(false)} maxWidth="sm" fullWidth
        PaperProps={{ sx: { borderRadius: 3, overflow: "hidden" } }}>
        <DialogTitle sx={{ m: 0, p: 0 }}>
          <Box sx={{ background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)", p: 3, color: "white", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 0.8, borderRadius: 1.5, display: "flex" }}><SendOutlined fontSize="small" /></Box>
              <Box>
                <Typography variant="h6" fontWeight={800}>Confirmar y Aprobar Solicitud</Typography>
                <Typography variant="caption" sx={{ opacity: 0.85 }}>La solicitud ya fue creada en DRAFT — confírmala para aprobar</Typography>
              </Box>
            </Stack>
            {!submitting && (
              <IconButton onClick={() => setConfirmOpen(false)} size="small" sx={{ color: "rgba(255,255,255,0.7)" }}>
                <Close fontSize="small" />
              </IconButton>
            )}
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 3, mt: 1 }}>
          <Box sx={{ p: 2.5, bgcolor: "#f8fafc", borderRadius: 2, mb: 3, border: "1px solid #e2e8f0" }}>
            <Stack spacing={2} divider={<Divider />}>
              <Stack direction="row" spacing={2} alignItems="center">
                <AssignmentOutlined color="action" fontSize="small" />
                <Box>
                  <Typography variant="caption" display="block" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700 }}>Número de Solicitud</Typography>
                  <Typography variant="body1" fontWeight={800} color="primary.main">{createdRequest?.requestNumber}</Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <TableChartOutlined color="action" fontSize="small" />
                <Box>
                  <Typography variant="caption" display="block" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700 }}>Resumen</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {createdRequest?.items?.length ?? selectedItems.length} productos —{" "}
                    {selectedItems.reduce((s, i) => s + i.requestedQuantity, 0)} unidades
                    {hayPrecio && ` — S/ ${totalEstimado.toFixed(2)} estimado`}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <EventOutlined color="action" fontSize="small" />
                <Box>
                  <Typography variant="caption" display="block" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700 }}>Entrega estimada</Typography>
                  <Typography variant="body2" fontWeight={600}>{dayjs().add(deliveryDays, "day").format("DD [de] MMMM, YYYY")}</Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>

          {/* Desglose por tipo */}
          <Box sx={{ display: "flex", gap: 1.5, mb: 3, flexWrap: "wrap" }}>
            {ALL_TYPES
              .filter(tipo => selectedItems.some(i => i.productType === tipo))
              .map(tipo => {
                const cfg      = PRODUCT_TYPE_CONFIG[tipo];
                const count    = selectedItems.filter(i => i.productType === tipo).length;
                const urgentes = selectedItems.filter(i => i.productType === tipo && i.isUrgent).length;
                return (
                  <Paper key={tipo} variant="outlined" sx={{ flex: "1 1 90px", p: 1.5, borderRadius: 2, textAlign: "center", border: `1px solid ${cfg.border}`, bgcolor: cfg.bg }}>
                    <Typography sx={{ fontSize: 20 }}>{cfg.icon}</Typography>
                    <Typography variant="h5" fontWeight={800} sx={{ color: cfg.color }}>{count}</Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">{cfg.label}</Typography>
                    {urgentes > 0 && <Chip label={`${urgentes} urg.`} size="small" color="error" sx={{ mt: 0.5, height: 18, fontSize: "0.62rem", fontWeight: 700 }} />}
                  </Paper>
                );
              })}
          </Box>

          {selectedItems.filter(i => i.isUrgent).length > 0 && (
            <Alert severity="error" icon={<ReportProblemOutlined />} sx={{ borderRadius: 2, mb: 2 }}>
              <Typography variant="body2" fontWeight={700} mb={0.5}>Productos urgentes:</Typography>
              {selectedItems.filter(i => i.isUrgent).map(item => (
                <Typography key={item.productId} variant="caption" display="block" color="text.secondary">
                  • {item.code} — {item.name} (cant: {item.requestedQuantity})
                </Typography>
              ))}
            </Alert>
          )}

          <Alert severity="warning" icon={<WarningAmberOutlined />} sx={{ borderRadius: 2, fontWeight: 500 }}>
            Al confirmar, la solicitud <strong>{createdRequest?.requestNumber}</strong> pasará a estado <strong>APPROVED</strong>.
          </Alert>
        </DialogContent>
        <DialogActions sx={{ p: 3, bgcolor: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
          <ButtonBase label="Cancelar" onClick={() => setConfirmOpen(false)} disabled={submitting}
            sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1" }}
          />
          <ButtonBase
            label={submitting ? "Aprobando..." : "Confirmar y Aprobar"}
            startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <CheckCircleOutline />}
            onClick={handleAprobar}
            disabled={submitting}
            sx={{
              px: 4,
              background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
              boxShadow: "0 4px 14px rgba(124,58,237,0.3)",
            }}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
}