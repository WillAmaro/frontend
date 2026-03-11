"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Box, Card, Typography, Chip, Stack, Paper, Divider, Collapse,
  Alert, Fade, TextField, InputAdornment, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
  Tooltip, LinearProgress,
} from "@mui/material";
import {
  SearchOutlined, Close, SendOutlined, AssignmentOutlined,
  EventOutlined, TableChartOutlined, CheckCircleOutline,
  WarningAmberOutlined, ReportProblemOutlined, AddCircleOutline,
  CancelOutlined, InfoOutlined, ListAltOutlined, RefreshOutlined,
  AutorenewOutlined, ShoppingCartOutlined, TrendingUpOutlined,
  CategoryOutlined, InventoryOutlined, CheckCircle,
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

type ProductType = "EPP" | "MATERIAL" | "EQUIPMENT" | "TOOL";

interface CatalogProduct {
  id: number;
  code: string;
  name: string;
  description: string | null;
  category: string;
  productType: ProductType;
  standardPrice: number | null;
  lastPurchasePrice: number | null;
  isActive: boolean;
  tenantId: number;
}

interface PageResponse {
  content: CatalogProduct[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

interface SelectedItemForRequest {
  productId: number;
  code: string;
  name: string;
  productType: ProductType;
  category: string;
  requestedQuantity: number;
  unitPrice: number | null;
  isUrgent: boolean;
  notes: string;
}

interface SupplyRequestDto {
  id: number;
  requestNumber: string;
  status: string;
  items: any[];
  totalItemsCount: number;
  totalEstimatedValue: number;
  requestedDeliveryDate: string;
}

// ─── Constantes ───────────────────────────────────────────────────────────────

const PRODUCT_TYPE_CONFIG: Record<ProductType, { label: string; icon: string; color: string; bg: string; border: string; bgLight: string }> = {
  MATERIAL:  { label: "Material",    icon: "📦", color: "#ea580c", bg: "#fff7ed", border: "#fed7aa", bgLight: "#fff7ed" },
  EQUIPMENT: { label: "Equipo",      icon: "⚙️", color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0", bgLight: "#f0fdf4" },
  TOOL:      { label: "Herramienta", icon: "🔧", color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe", bgLight: "#eff6ff" },
  EPP:       { label: "EPP",         icon: "🦺", color: "#7c3aed", bg: "#faf5ff", border: "#ddd6fe", bgLight: "#faf5ff" },
};

const PAGE_SIZE = 10;

// ─── Componente ───────────────────────────────────────────────────────────────

export default function CatalogoPedido() {
  const topRef = useRef<HTMLDivElement>(null);

  // ── Estado principal ──────────────────────────────────────────────────
  const [productType, setProductType]     = useState<ProductType>("EPP");
  const [search, setSearch]               = useState("");
  const [page, setPage]                   = useState(0);
  const [loading, setLoading]             = useState(false);
  const [modoSolicitud, setModoSolicitud] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  // rowsRef y totalRef: siempre contienen los datos más recientes del catálogo.
  // Se usan como ref (no state) para evitar closures stale en handlers.
  const rowsRef  = useRef<CatalogProduct[]>([]);
  const [totalElements, setTotalElements] = useState(0);

  // ── Selección manual (igual que InventarioHub) ────────────────────────
  const [selectedIds, setSelectedIds]     = useState<Set<number>>(new Set());
  const [selectedItems, setSelectedItems] = useState<SelectedItemForRequest[]>([]);

  // ── Flujo de solicitud ────────────────────────────────────────────────
  const [generando, setGenerando]               = useState(false);
  const [requestDto, setRequestDto]             = useState<SupplyRequestDto | null>(null);
  const [confirmOpen, setConfirmOpen]           = useState(false);
  const [submitting, setSubmitting]             = useState(false);
  const [showSuccess, setShowSuccess]           = useState(false);
  const [submittedInfo, setSubmittedInfo]       = useState<SupplyRequestDto | null>(null);
  const [deliveryDays, setDeliveryDays]         = useState<number>(7);

  // ── Búsqueda con debounce ─────────────────────────────────────────────
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedSearch, setDebouncedSearch]   = useState("");

  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => setDebouncedSearch(search), 380);
    return () => { if (searchTimer.current) clearTimeout(searchTimer.current); };
  }, [search]);

  // ── Cuando cambia tipo o búsqueda: reset página + dispara reloadTrigger ─
  // reloadTrigger le dice a CustomDataGrid que debe re-fetchear desde página 0
  useEffect(() => {
    setPage(0);
    setReloadTrigger(t => t + 1);
  }, [productType, debouncedSearch]);

  // ── fetchData: única fuente de fetch, usada por CustomDataGrid ──────────
  // Guarda los rows en rowsRef para que handleCheckOne/handleCheckAll
  // siempre accedan a la página visible más reciente sin closures stale.
  const fetchData = useCallback(
    async (p: number, _size: number, _search: string) => {
      setPage(p);
      const params = new URLSearchParams({
        productType,
        page: String(p),
        size: String(PAGE_SIZE),
        ...(debouncedSearch.trim() ? { search: debouncedSearch.trim() } : {}),
      });
      const res = await fetch(`${API_URL}/api/catalogs/product-type?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: PageResponse = await res.json();
      rowsRef.current = data.content;      // siempre fresco, sin stale closure
      setTotalElements(data.totalElements); // para mostrar el contador en UI
      return { rows: data.content, total: data.totalElements };
    },
    [productType, debouncedSearch]
  );

  const buildSelectedItem = (p: CatalogProduct): SelectedItemForRequest => ({
    productId: p.id, code: p.code, name: p.name,
    productType: p.productType, category: p.category,
    requestedQuantity: 1,
    unitPrice: p.lastPurchasePrice ?? p.standardPrice ?? null,
    isUrgent: false, notes: "",
  });

  // ── Activar modo solicitud ────────────────────────────────────────────
  const activarModo = () => {
    setModoSolicitud(true);
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const cancelarModo = () => {
    setModoSolicitud(false);
    setSelectedIds(new Set());
    setSelectedItems([]);
  };

  // ── Handlers selección manual ─────────────────────────────────────────
  // handleCheckOne y handleCheckAll leen de rowsRef.current en lugar de
  // un estado rows para evitar closures stale cuando cambia productType.
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

  const updateQty = (productId: number, qty: number) => {
    setSelectedItems(prev => prev.map(i => i.productId === productId ? { ...i, requestedQuantity: Math.max(1, qty) } : i));
  };
  const updateUnitPrice = (productId: number, price: number) => {
    setSelectedItems(prev => prev.map(i => i.productId === productId ? { ...i, unitPrice: Math.max(0, price) } : i));
  };
  const toggleUrgent = (productId: number) => {
    setSelectedItems(prev => prev.map(i => i.productId === productId ? { ...i, isUrgent: !i.isUrgent } : i));
  };
  const updateNotes = (productId: number, notes: string) => {
    setSelectedItems(prev => prev.map(i => i.productId === productId ? { ...i, notes } : i));
  };
  const removeItem = (productId: number) => {
    setSelectedIds(prev => { const n = new Set(prev); n.delete(productId); return n; });
    setSelectedItems(prev => prev.filter(i => i.productId !== productId));
  };

  const totalEstimado = selectedItems.reduce((s, i) => s + (i.unitPrice ?? 0) * i.requestedQuantity, 0);
  const hayPrecio = selectedItems.some(i => i.unitPrice !== null && i.unitPrice > 0);

  // ── Generar solicitud ─────────────────────────────────────────────────
  const handleGenerarSolicitud = async () => {
    if (selectedItems.length === 0) { toast.warning("Selecciona al menos un producto"); return; }
    setGenerando(true);
    try {
      // TODO: POST /api/hub-supply con selectedItems
      await new Promise(r => setTimeout(r, 900));
      const mock: SupplyRequestDto = {
        id: Math.floor(Math.random() * 9000) + 1000,
        requestNumber: `SAB-${dayjs().format("YYYYMM")}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, "0")}`,
        status: "DRAFT",
        items: selectedItems.map((item, idx) => ({
          id: idx + 1, itemCode: item.code, itemName: item.name,
          productType: item.productType, requestedQuantity: item.requestedQuantity,
          unitPrice: item.unitPrice ?? 0, totalPrice: (item.unitPrice ?? 0) * item.requestedQuantity,
          isUrgent: item.isUrgent, notes: item.notes, uom: "UND",
        })),
        totalItemsCount: selectedItems.length,
        totalEstimatedValue: totalEstimado,
        requestedDeliveryDate: dayjs().add(deliveryDays, "day").toISOString(),
      };
      setRequestDto(mock);
      setConfirmOpen(true);
    } catch {
      toast.error("Error al generar la solicitud");
    } finally {
      setGenerando(false);
    }
  };

  const handleAprobar = async () => {
    if (!requestDto) return;
    setConfirmOpen(false);
    setSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 1400));
      setSubmittedInfo({ ...requestDto, status: "APPROVED" });
      setShowSuccess(true);
      cancelarModo();
      setRequestDto(null);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      toast.error("Error al aprobar la solicitud");
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
      field: "productType", headerName: "Tipo", width: 130,
      renderCell: (p) => {
        const cfg = PRODUCT_TYPE_CONFIG[p.value as ProductType];
        return cfg
          ? <Chip label={`${cfg.icon} ${cfg.label}`} size="small" variant="outlined"
              sx={{ borderColor: cfg.color, color: cfg.color, fontWeight: 600, fontSize: "0.72rem" }}
            />
          : <Typography>{p.value}</Typography>;
      },
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
      field: "code", headerName: "Código", width: 155,
      renderCell: (p) => {
        const cfg = PRODUCT_TYPE_CONFIG[p.row.productType as ProductType];
        return <Chip label={p.value} size="small" sx={{ bgcolor: cfg?.color, color: "white", fontWeight: 700, fontSize: "0.7rem" }} />;
      },
    },
    { field: "name", headerName: "Nombre", flex: 2, minWidth: 200 },
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
        description="Explora el catálogo de materiales, equipos, herramientas y EPPs disponibles. Selecciona los productos y genera solicitudes de abastecimiento directamente desde aquí."
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
                "50%": { boxShadow: "0 0 0 20px rgba(34,197,94,0.08), 0 0 0 40px rgba(34,197,94,0.03)" },
              },
            }}>
              <CheckCircleOutline sx={{ fontSize: 52, color: "white" }} />
            </Box>
            <Typography variant="h4" fontWeight={800} sx={{ color: "#15803d", mb: 1 }}>¡Solicitud Registrada!</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: "auto" }}>
              La solicitud <strong>{submittedInfo?.requestNumber}</strong> fue generada desde el catálogo y está en el flujo de abastecimiento.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 4 }}>
              {[
                { label: "Nro. Solicitud",        value: submittedInfo?.requestNumber ?? "—", color: "#15803d" },
                { label: "Productos solicitados",  value: String(submittedInfo?.items?.length ?? 0),     color: "#0369a1" },
                { label: "Total Estimado",         value: submittedInfo && submittedInfo.totalEstimatedValue > 0 ? `S/ ${submittedInfo.totalEstimatedValue.toFixed(2)}` : "—", color: "#7c3aed" },
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
              <ButtonBase
                label="Nueva Solicitud"
                startIcon={<AddCircleOutline />}
                onClick={() => { setShowSuccess(false); activarModo(); }}
                sx={{ px: 4, py: 1.5, fontWeight: 700, boxShadow: "0 4px 12px rgba(34,197,94,0.3)", borderRadius: 2.5 }}
              />
              <ButtonBase
                label="Ver Catálogo"
                variant="outlined"
                startIcon={<ListAltOutlined />}
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

          {/* KPIs por tipo */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {(Object.entries(PRODUCT_TYPE_CONFIG) as [ProductType, typeof PRODUCT_TYPE_CONFIG[ProductType]][]).map(([tipo, cfg]) => (
              <Paper key={tipo} variant="outlined"
                onClick={() => { setProductType(tipo); setModoSolicitud(false); setSelectedIds(new Set()); setSelectedItems([]); }}
                sx={{
                  flex: "1 1 140px", p: 2.5, borderRadius: 3, cursor: "pointer",
                  bgcolor: productType === tipo ? cfg.bg : "white",
                  border: productType === tipo ? `2px solid ${cfg.color}` : `1.5px solid ${cfg.border}`,
                  transition: "all 0.2s",
                  "&:hover": { transform: "translateY(-2px)", boxShadow: `0 8px 24px ${cfg.color}25`, bgcolor: cfg.bg },
                }}
              >
                <Typography sx={{ fontSize: 28, lineHeight: 1, mb: 1 }}>{cfg.icon}</Typography>
                <Typography variant="body2" fontWeight={800} sx={{ color: cfg.color }}>{cfg.label}</Typography>
                {productType === tipo && <Box sx={{ width: 24, height: 3, bgcolor: cfg.color, borderRadius: 2, mt: 1 }} />}
              </Paper>
            ))}
          </Box>

          {/* Banner modo solicitud activo */}
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
                      Marca los productos que quieres solicitar. Puedes cambiar de tipo sin perder tu selección.
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  {selectedIds.size > 0 && (
                    <Chip label={`${selectedIds.size} producto${selectedIds.size > 1 ? "s" : ""} en pedido`} size="small"
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

          {/* Panel de filtros y acciones */}
          <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", overflow: "hidden" }}>
            <Box sx={{ px: 3, py: 2.5, borderBottom: "1px solid", borderColor: "divider", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2, bgcolor: "#fafbfc" }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: 4, height: 22, bgcolor: PRODUCT_TYPE_CONFIG[productType].color, borderRadius: 1, transition: "background 0.3s" }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight={800}>
                    {PRODUCT_TYPE_CONFIG[productType].icon} {PRODUCT_TYPE_CONFIG[productType].label}s — Catálogo
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {totalElements} productos totales
                    {modoSolicitud && selectedIds.size > 0 && ` • ${selectedIds.size} seleccionados`}
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
                      background: `linear-gradient(135deg, ${PRODUCT_TYPE_CONFIG[productType].color} 0%, ${PRODUCT_TYPE_CONFIG[productType].color}cc 100%)`,
                      boxShadow: `0 4px 14px ${PRODUCT_TYPE_CONFIG[productType].color}50`,
                      "&:hover": { transform: "translateY(-1px)", boxShadow: `0 8px 20px ${PRODUCT_TYPE_CONFIG[productType].color}60` },
                    }}
                  />
                ) : (
                  <ButtonBase
                    label={generando ? "Generando..." : `Generar Solicitud (${selectedIds.size})`}
                    startIcon={generando ? <CircularProgress size={18} color="inherit" /> : <AddCircleOutline />}
                    onClick={handleGenerarSolicitud}
                    disabled={generando || selectedIds.size === 0}
                    sx={{
                      px: 3, py: 1.2, fontWeight: 700, borderRadius: 2.5,
                      background: selectedIds.size === 0 ? undefined : "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                      boxShadow: selectedIds.size > 0 ? "0 4px 14px rgba(22,163,74,0.35)" : "none",
                    }}
                  />
                )}
              </Stack>
            </Box>
            {/* Filtros */}
            <Box sx={{ px: 3, py: 2, display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
              <Box sx={{ flex: "0 0 210px" }}>
                <SelectBase
                  label="Tipo de Producto" size="small" value={productType}
                  onChange={(v) => { setProductType(v as ProductType); setPage(0); }}
                  options={[
                    { label: "📦 Materiales",    value: "MATERIAL"  },
                    { label: "⚙️ Equipos",        value: "EQUIPMENT" },
                    { label: "🔧 Herramientas",   value: "TOOL"      },
                    { label: "🦺 EPP",            value: "EPP"       },
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
              {modoSolicitud && selectedIds.size > 0 && (
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

          {/* DataGrid catálogo */}
          <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5, flexWrap: "wrap", gap: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: PRODUCT_TYPE_CONFIG[productType].bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                  {PRODUCT_TYPE_CONFIG[productType].icon}
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={800}>
                    {modoSolicitud ? "Selecciona productos para tu solicitud" : `Catálogo de ${PRODUCT_TYPE_CONFIG[productType].label}s`}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {modoSolicitud
                      ? "Usa los checkboxes para agregar productos al pedido. Cambia de tipo para agregar más."
                      : "Vista de solo lectura — usa \"Hacer Pedido desde Catálogo\" para iniciar una solicitud"}
                  </Typography>
                </Box>
              </Stack>
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
              // ── Selección manual ──────────────────────────────────
              selectionEnabled={modoSolicitud}
              selectedIds={selectedIds}
              onSelectionChange={handleCheckOne}
              onSelectAll={handleCheckAll}
              sx={{
                ...(modoSolicitud && {
                  "& .MuiDataGrid-row:hover": { bgcolor: "#f5f3ff !important", cursor: "pointer" },
                }),
                ...(!modoSolicitud && {
                  "& .MuiDataGrid-row": { cursor: "default" },
                }),
              }}
            />
          </Card>

          {/* ══ CARRITO ══ */}
          <Collapse in={modoSolicitud && selectedItems.length > 0} unmountOnExit>
            <Card elevation={4} sx={{
              borderRadius: 4, border: "2px solid #ddd6fe", overflow: "hidden",
              boxShadow: "rgba(124,58,237,0.18) 0px 8px 32px",
            }}>
              {/* Header carrito */}
              <Box sx={{ background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)", p: 3, color: "white" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 1, borderRadius: 2, display: "flex" }}><TrendingUpOutlined /></Box>
                    <Box>
                      <Typography variant="h6" fontWeight={800}>Pedido desde Catálogo</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.85 }}>
                        {selectedItems.length} producto(s) — Ajusta cantidades y precios antes de enviar
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
                  {(["EPP", "MATERIAL", "EQUIPMENT", "TOOL"] as ProductType[])
                    .filter(tipo => selectedItems.some(i => i.productType === tipo))
                    .map(tipo => {
                      const cfg = PRODUCT_TYPE_CONFIG[tipo];
                      const items = selectedItems.filter(i => i.productType === tipo);
                      const subtotal = items.reduce((s, i) => s + (i.unitPrice ?? 0) * i.requestedQuantity, 0);
                      return (
                        <Paper key={tipo} variant="outlined" sx={{ flex: "1 1 130px", p: 2, borderRadius: 2, textAlign: "center", border: `1px solid ${cfg.border}`, bgcolor: cfg.bg }}>
                          <Typography sx={{ fontSize: 22, lineHeight: 1 }}>{cfg.icon}</Typography>
                          <Typography variant="h5" fontWeight={800} sx={{ color: cfg.color }}>{items.length}</Typography>
                          <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">{cfg.label}</Typography>
                          {subtotal > 0 && <Typography variant="caption" sx={{ color: cfg.color, fontWeight: 700, fontFamily: "monospace" }}>S/ {subtotal.toFixed(2)}</Typography>}
                        </Paper>
                      );
                    })}
                </Box>

                {/* Opciones adicionales */}
                <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center", flexWrap: "wrap" }}>
                  <Box sx={{ flex: "0 0 200px" }}>
                    <TextField
                      label="Días para entrega estimada"
                      type="number"
                      size="small"
                      value={deliveryDays}
                      onChange={e => setDeliveryDays(Math.max(1, parseInt(e.target.value) || 1))}
                      inputProps={{ min: 1 }}
                      InputProps={{
                        endAdornment: <InputAdornment position="end"><Typography variant="caption" color="text.secondary">días</Typography></InputAdornment>
                      }}
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

                {/* DataGrid carrito */}
                <CustomDataGrid
                  columns={columnsCarrito}
                  localRows={selectedItems.map(i => ({ ...i, id: i.productId }))}
                  serverSide={false}
                  search=""
                  onSearch={() => {}}
                  pageSize={20}
                  showToolbar={false}
                  sx={{
                    border: "1px solid #ddd6fe",
                    "& .MuiDataGrid-columnHeaders": { bgcolor: "#f5f3ff" },
                  }}
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
                      Haz clic en "Urgente" para marcar productos críticos. Los precios son opcionales.
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <ButtonBase label="Cancelar" variant="outlined" startIcon={<CancelOutlined />} onClick={cancelarModo}
                      sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1" }}
                    />
                    <ButtonBase
                      label={generando ? "Generando..." : "Generar Solicitud de Abastecimiento"}
                      startIcon={generando ? <CircularProgress size={18} color="inherit" /> : <AddCircleOutline />}
                      onClick={handleGenerarSolicitud}
                      disabled={generando}
                      sx={{
                        px: 4, py: 1.5, fontWeight: 700, fontSize: "0.85rem", borderRadius: 2.5,
                        background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
                        boxShadow: "0 8px 20px rgba(124,58,237,0.3)",
                        "&:hover": { transform: "translateY(-1px)", boxShadow: "0 12px 28px rgba(124,58,237,0.4)" },
                      }}
                    />
                  </Stack>
                </Box>
              </Box>
            </Card>
          </Collapse>

        </Box>
      </Fade>

      {/* ══ MODAL CONFIRMACIÓN ══ */}
      <Dialog open={confirmOpen} onClose={() => !submitting && setConfirmOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, overflow: "hidden" } }}>
        <DialogTitle sx={{ m: 0, p: 0 }}>
          <Box sx={{ background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)", p: 3, color: "white", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 0.8, borderRadius: 1.5, display: "flex" }}><SendOutlined fontSize="small" /></Box>
              <Box>
                <Typography variant="h6" fontWeight={800}>Confirmar Solicitud de Catálogo</Typography>
                <Typography variant="caption" sx={{ opacity: 0.85 }}>Revisa los detalles antes de aprobar</Typography>
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
                  <Typography variant="body1" fontWeight={800} color="primary.main">{requestDto?.requestNumber}</Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <TableChartOutlined color="action" fontSize="small" />
                <Box>
                  <Typography variant="caption" display="block" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700 }}>Resumen</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {requestDto?.items?.length} productos — {selectedItems.reduce((s, i) => s + i.requestedQuantity, 0)} unidades
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
            {(["EPP", "MATERIAL", "EQUIPMENT", "TOOL"] as ProductType[])
              .filter(tipo => selectedItems.some(i => i.productType === tipo))
              .map(tipo => {
                const cfg = PRODUCT_TYPE_CONFIG[tipo];
                const count = selectedItems.filter(i => i.productType === tipo).length;
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
              <Typography variant="body2" fontWeight={700} mb={0.5}>Productos marcados como urgentes:</Typography>
              {selectedItems.filter(i => i.isUrgent).map(item => (
                <Typography key={item.productId} variant="caption" display="block" color="text.secondary">
                  • {item.code} — {item.name} (cant: {item.requestedQuantity})
                </Typography>
              ))}
            </Alert>
          )}

          <Alert severity="warning" icon={<WarningAmberOutlined />} sx={{ borderRadius: 2, fontWeight: 500 }}>
            Al confirmar, la solicitud pasará a estado <strong>APPROVED</strong> y estará disponible para seguimiento.
          </Alert>
        </DialogContent>
        <DialogActions sx={{ p: 3, bgcolor: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
          <ButtonBase label="Regresar" onClick={() => setConfirmOpen(false)} disabled={submitting}
            sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1" }}
          />
          <ButtonBase
            label={submitting ? "Aprobando..." : "Confirmar y Enviar"}
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