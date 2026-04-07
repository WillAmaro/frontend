"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  Box, Card, Typography, Collapse,
  TextField, IconButton, LinearProgress,
  InputAdornment, Chip, Divider, Stack,
  Tooltip, Badge, alpha,
} from "@mui/material";
import {
  // Movimiento tipo
  CallMadeRounded,
  CallReceivedRounded,
  SyncAltRounded,
  // Filtros y acciones
  TuneRounded,
  SearchRounded,
  CloseRounded,
  RefreshRounded,
  FileDownloadRounded,
  // Columnas
  CalendarMonthRounded,
  ReceiptLongRounded,
  WarehouseRounded,
  StoreMallDirectoryRounded,
  Inventory2Rounded,
  // Estado
  CheckCircleRounded,
  PendingRounded,
  CancelRounded,
  // UI
  VisibilityRounded,
  ArrowForwardIosRounded,
  HorizontalRuleRounded,
  FiberManualRecordRounded,
} from "@mui/icons-material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import SelectBase from "@/src/components/base/SelectBase";
import CustomDataGrid from "@/src/components/base/CustomDataGrid";
import KardexMovementDetail, { MovementHeader } from "./Kardexmovementdetail";
import { API_URL } from "@/src/lib/config";
import dayjs from "dayjs";
import { toast } from "react-toastify";

// ─── Paleta enterprise ────────────────────────────────────────────────────────

const PALETTE = {
  surface:    "#FFFFFF",
  surfaceAlt: "#F7F8FA",
  border:     "#E8ECF0",
  borderHover:"#C9D1DA",
  text:       "#0D1117",
  textMuted:  "#5A6478",
  textFaint:  "#9CA8B8",
  ink:        "#0F1923",       // header oscuro
  inkSoft:    "#1C2B3A",

  entry: {
    text:   "#0A6B3B",
    bg:     "#EDFAF3",
    border: "#A3E6C5",
    dot:    "#16A34A",
  },
  exit: {
    text:   "#991B1B",
    bg:     "#FEF2F2",
    border: "#FBBFBF",
    dot:    "#DC2626",
  },
  transfer: {
    text:   "#4C1D95",
    bg:     "#F5F3FF",
    border: "#C4B5FD",
    dot:    "#7C3AED",
  },

  estado: {
    CONFIRMADO: { text: "#0A6B3B", bg: "#EDFAF3", border: "#A3E6C5", icon: CheckCircleRounded  },
    BORRADOR:   { text: "#92400E", bg: "#FFFBEB", border: "#FCD34D", icon: PendingRounded      },
    ANULADO:    { text: "#7F1D1D", bg: "#FEF2F2", border: "#FBBFBF", icon: CancelRounded       },
  } as Record<string, { text: string; bg: string; border: string; icon: any }>,
};

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface FilterState {
  search:       string;
  movementType: string;
  subtype:      string;
  dateFrom:     string;
  dateTo:       string;
}

interface FlujoCfg {
  color:  string;
  bg:     string;
  border: string;
  dot:    string;
  Icon:   React.ElementType;
  label:  string;
}

const FLUJO_CFG: Record<string, FlujoCfg> = {
  ENTRY:         { color: "#0A6B3B", bg: "#EDFAF3", border: "#A3E6C5", dot: "#16A34A", Icon: CallReceivedRounded, label: "Entrada"       },
  ENTRADA:       { color: "#0A6B3B", bg: "#EDFAF3", border: "#A3E6C5", dot: "#16A34A", Icon: CallReceivedRounded, label: "Entrada"       },
  EXIT:          { color: "#991B1B", bg: "#FEF2F2", border: "#FBBFBF", dot: "#DC2626", Icon: CallMadeRounded,     label: "Salida"        },
  SALIDA:        { color: "#991B1B", bg: "#FEF2F2", border: "#FBBFBF", dot: "#DC2626", Icon: CallMadeRounded,     label: "Salida"        },
  TRANSFER:      { color: "#4C1D95", bg: "#F5F3FF", border: "#C4B5FD", dot: "#7C3AED", Icon: SyncAltRounded,      label: "Transferencia" },
  TRANSFERENCIA: { color: "#4C1D95", bg: "#F5F3FF", border: "#C4B5FD", dot: "#7C3AED", Icon: SyncAltRounded,      label: "Transferencia" },
};

const SUBTIPOS_OPTIONS = [
  { label: "Todos los subtipos",        value: ""                       },
  { label: "Compra Local",              value: "COMPRA_LOCAL"           },
  { label: "Consignación Recibida",     value: "CONSIGNACION_RECIBIDA"  },
  { label: "Devolución de Contratista", value: "DEVOLUCION_CONTRATISTA" },
  { label: "Transferencia (Entrada)",   value: "TRANSFERENCIA_ALMACENES_E" },
  { label: "Despacho Regular",          value: "DESPACHO_REGULAR"       },
  { label: "Devolución a Cliente",      value: "DEVOLUCION_CLIENTE"     },
  { label: "Traspaso Contratista",      value: "TRASPASO_CONTRATISTA"   },
  { label: "Transferencia (Salida)",    value: "TRANSFERENCIA_ALMACENES_S" },
  { label: "Transferencia Almacenes",   value: "TRANSFERENCIA_ALMACENES"},
];

const TENANT_ID = 1;
const HUB_ID    = 1;
const PAGE_SIZE = 15;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getFlujo = (type: string) =>
  FLUJO_CFG[type] ?? {
    color: PALETTE.textMuted, bg: PALETTE.surfaceAlt, border: PALETTE.border,
    dot: PALETTE.textFaint, Icon: Inventory2Rounded, label: type,
  };

const formatDate = (d?: string) => d ? dayjs(d).format("DD MMM YYYY") : null;

const labelSubtipo = (raw: string) =>
  raw.replace(/_/g, " ")
     .toLowerCase()
     .replace(/^\w/, c => c.toUpperCase());

// ─── TypeChip ─────────────────────────────────────────────────────────────────

function TypeChip({ type }: { type: string }) {
  const cfg = getFlujo(type);
  const Icon = cfg.Icon;
  return (
    <Box sx={{
      display: "inline-flex", alignItems: "center", gap: 0.6,
      px: 1.1, py: 0.45,
      borderRadius: "6px",
      bgcolor: cfg.bg,
      border: `1px solid ${cfg.border}`,
    }}>
      <Icon sx={{ fontSize: 12, color: cfg.dot }} />
      <Typography sx={{ fontSize: "0.67rem", fontWeight: 700, color: cfg.color, letterSpacing: "0.02em" }}>
        {cfg.label}
      </Typography>
    </Box>
  );
}

// ─── EstadoChip ───────────────────────────────────────────────────────────────

function EstadoChip({ estado }: { estado?: string }) {
  const key = (estado ?? "BORRADOR").toUpperCase();
  const cfg = PALETTE.estado[key] ?? PALETTE.estado.BORRADOR;
  const Icon = cfg.icon;
  return (
    <Box sx={{
      display: "inline-flex", alignItems: "center", gap: 0.5,
      px: 1, py: 0.4,
      borderRadius: "5px",
      bgcolor: cfg.bg,
      border: `1px solid ${cfg.border}`,
    }}>
      <Icon sx={{ fontSize: 11, color: cfg.text }} />
      <Typography sx={{ fontSize: "0.62rem", fontWeight: 700, color: cfg.text, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {key}
      </Typography>
    </Box>
  );
}

// ─── Celda fecha ──────────────────────────────────────────────────────────────

function DateCell({ value }: { value?: string }) {
  const formatted = formatDate(value);
  if (!formatted) return <HorizontalRuleRounded sx={{ fontSize: 14, color: PALETTE.textFaint }} />;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
      <CalendarMonthRounded sx={{ fontSize: 12, color: PALETTE.textFaint }} />
      <Typography sx={{ fontSize: "0.7rem", color: PALETTE.textMuted }}>{formatted}</Typography>
    </Box>
  );
}

// ─── Celda guía ───────────────────────────────────────────────────────────────

function GuiaCell({ value }: { value?: string }) {
  if (!value) return <HorizontalRuleRounded sx={{ fontSize: 14, color: PALETTE.textFaint }} />;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <ReceiptLongRounded sx={{ fontSize: 12, color: PALETTE.textFaint }} />
      <Typography sx={{ fontSize: "0.68rem", fontFamily: "'JetBrains Mono', 'Fira Code', monospace", color: PALETTE.text, letterSpacing: "0.02em" }}>
        {value}
      </Typography>
    </Box>
  );
}

// ─── Celda almacén ────────────────────────────────────────────────────────────

function AlmacenCell({ value }: { value?: string }) {
  if (!value) return <HorizontalRuleRounded sx={{ fontSize: 14, color: PALETTE.textFaint }} />;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, maxWidth: "100%" }}>
      <WarehouseRounded sx={{ fontSize: 12, color: PALETTE.textFaint, flexShrink: 0 }} />
      <Typography sx={{ fontSize: "0.7rem", color: PALETTE.textMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {value}
      </Typography>
    </Box>
  );
}

// ─── Celda proveedor ─────────────────────────────────────────────────────────

function PartnerCell({ proveedor, cliente }: { proveedor?: string; cliente?: string }) {
  const val = proveedor || cliente;
  if (!val) return <HorizontalRuleRounded sx={{ fontSize: 14, color: PALETTE.textFaint }} />;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, maxWidth: "100%" }}>
      <StoreMallDirectoryRounded sx={{ fontSize: 12, color: PALETTE.textFaint, flexShrink: 0 }} />
      <Typography sx={{ fontSize: "0.7rem", color: PALETTE.textMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {val}
      </Typography>
    </Box>
  );
}

// ─── FilterPanel ──────────────────────────────────────────────────────────────

interface FilterPanelProps {
  filters: FilterState;
  onChange: (key: keyof FilterState, val: string) => void;
  onReset: () => void;
  activeCount: number;
}

function FilterPanel({ filters, onChange, onReset, activeCount }: FilterPanelProps) {
  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      fontSize: "0.82rem",
      bgcolor: PALETTE.surface,
      "& fieldset": { borderColor: PALETTE.border },
      "&:hover fieldset": { borderColor: PALETTE.borderHover },
      "&.Mui-focused fieldset": { borderColor: "#4F8EF7", borderWidth: 1.5 },
    },
  };

  return (
    <Box sx={{
      borderRadius: "12px",
      border: `1px solid ${PALETTE.border}`,
      bgcolor: PALETTE.surfaceAlt,
      overflow: "hidden",
    }}>
      {/* Header barra filtros */}
      <Box sx={{
        px: 2.5, py: 1.5,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: `1px solid ${PALETTE.border}`,
        bgcolor: PALETTE.surface,
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
          <TuneRounded sx={{ fontSize: 15, color: PALETTE.textMuted }} />
          <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: PALETTE.text }}>
            Filtros
          </Typography>
          {activeCount > 0 && (
            <Box sx={{
              minWidth: 20, height: 20, px: 0.8,
              borderRadius: "10px",
              bgcolor: PALETTE.ink,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: "white" }}>
                {activeCount}
              </Typography>
            </Box>
          )}
        </Box>
        {activeCount > 0 && (
          <Box
            onClick={onReset}
            sx={{
              display: "flex", alignItems: "center", gap: 0.6,
              cursor: "pointer", px: 1.2, py: 0.5,
              borderRadius: "6px",
              border: `1px solid ${PALETTE.border}`,
              bgcolor: PALETTE.surface,
              transition: "all 0.15s",
              "&:hover": { bgcolor: "#FEF2F2", borderColor: "#FBBFBF" },
            }}
          >
            <CloseRounded sx={{ fontSize: 12, color: PALETTE.textFaint }} />
            <Typography sx={{ fontSize: "0.68rem", color: PALETTE.textMuted }}>
              Limpiar filtros
            </Typography>
          </Box>
        )}
      </Box>

      {/* Inputs */}
      <Box sx={{ px: 2.5, py: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
        {/* Búsqueda libre */}
        <Box sx={{ flex: "2 1 240px" }}>
          <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: PALETTE.textFaint, textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.7 }}>
            Búsqueda
          </Typography>
          <TextField
            size="small" fullWidth
            placeholder="Guía de remisión, proveedor, código..."
            value={filters.search}
            onChange={e => onChange("search", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded sx={{ fontSize: 15, color: PALETTE.textFaint }} />
                </InputAdornment>
              ),
              endAdornment: filters.search ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => onChange("search", "")} sx={{ p: 0.3 }}>
                    <CloseRounded sx={{ fontSize: 13 }} />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
            sx={inputSx}
          />
        </Box>

        {/* Tipo movimiento */}
        <Box sx={{ flex: "1 1 160px" }}>
          <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: PALETTE.textFaint, textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.7 }}>
            Tipo
          </Typography>
          <SelectBase
            size="small" label="Todos" value={filters.movementType}
            onChange={v => onChange("movementType", String(v))}
            options={[
              { label: "Todos",            value: ""         },
              { label: "Entrada",          value: "ENTRY"    },
              { label: "Salida",           value: "EXIT"     },
              { label: "Transferencia",    value: "TRANSFER" },
            ]}
            fullWidth
          />
        </Box>

        {/* Subtipo */}
        <Box sx={{ flex: "2 1 210px" }}>
          <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: PALETTE.textFaint, textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.7 }}>
            Subtipo
          </Typography>
          <SelectBase
            size="small" label="Todos" value={filters.subtype}
            onChange={v => onChange("subtype", String(v))}
            options={SUBTIPOS_OPTIONS}
            fullWidth
          />
        </Box>

        {/* Desde */}
        <Box sx={{ flex: "1 1 150px" }}>
          <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: PALETTE.textFaint, textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.7 }}>
            Desde
          </Typography>
          <TextField
            type="date" size="small" fullWidth
            value={filters.dateFrom}
            onChange={e => onChange("dateFrom", e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={inputSx}
          />
        </Box>

        {/* Hasta */}
        <Box sx={{ flex: "1 1 150px" }}>
          <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: PALETTE.textFaint, textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.7 }}>
            Hasta
          </Typography>
          <TextField
            type="date" size="small" fullWidth
            value={filters.dateTo}
            onChange={e => onChange("dateTo", e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={inputSx}
          />
        </Box>
      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL — KardexHistory
// ─────────────────────────────────────────────────────────────────────────────

export default function KardexHistory() {
  const [filters, setFilters] = useState<FilterState>({
    search: "", movementType: "", subtype: "", dateFrom: "", dateTo: "",
  });

  const [view,        setView]        = useState<"list" | "detail">("list");
  const [selectedRow, setSelectedRow] = useState<MovementHeader | null>(null);

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [gridSearch,    setGridSearch]    = useState("");
  const [loading,       setLoading]       = useState(false);
  const [totalRows,     setTotalRows]     = useState(0);

  // Debounce
  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => setDebouncedSearch(filters.search), 380);
    return () => { if (searchTimer.current) clearTimeout(searchTimer.current); };
  }, [filters.search]);

  useEffect(() => { setGridSearch(debouncedSearch); }, [debouncedSearch]);

  // ── Fetch server-side ─────────────────────────────────────────────────
  const fetchData = useCallback(
    async (page: number, _pageSize: number, _search: string) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          tenantId: String(TENANT_ID),
          hubId:    String(HUB_ID),
          page:     String(page),
          size:     String(PAGE_SIZE),
          ...(debouncedSearch      ? { search:       debouncedSearch      } : {}),
          ...(filters.movementType ? { movementType: filters.movementType } : {}),
          ...(filters.subtype      ? { subtype:      filters.subtype      } : {}),
          ...(filters.dateFrom     ? { dateFrom:     filters.dateFrom     } : {}),
          ...(filters.dateTo       ? { dateTo:       filters.dateTo       } : {}),
        });
        const res = await fetch(`${API_URL}/api/movements-headers?${params}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const rows: MovementHeader[] = data.movements ?? data.data?.content ?? data.data ?? [];
        const total = data.data?.page?.totalElements ?? data.data?.totalElements ?? rows.length;
        setTotalRows(total);
        return { rows, total };
      } catch (e: any) {
        toast.error(`Error al cargar movimientos: ${e.message}`);
        return { rows: [], total: 0 };
      } finally {
        setLoading(false);
      }
    },
    [debouncedSearch, filters.movementType, filters.subtype, filters.dateFrom, filters.dateTo, reloadTrigger]
  );

  const handleFilterChange = (key: keyof FilterState, val: string) => {
    setFilters(prev => ({ ...prev, [key]: val }));
    setReloadTrigger(t => t + 1);
  };

  const resetFilters = () => {
    setFilters({ search: "", movementType: "", subtype: "", dateFrom: "", dateTo: "" });
    setReloadTrigger(t => t + 1);
  };

  const openDetail = (row: MovementHeader) => { setSelectedRow(row); setView("detail"); };

  const activeFilterCount = [
    filters.search, filters.movementType, filters.subtype, filters.dateFrom, filters.dateTo,
  ].filter(Boolean).length;

  // ── Columnas ──────────────────────────────────────────────────────────
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 72,
      renderCell: (p: GridRenderCellParams) => (
        <Typography sx={{ fontSize: "0.68rem", fontFamily: "'JetBrains Mono', monospace", color: PALETTE.textFaint, fontWeight: 600 }}>
          #{String(p.value).padStart(4, "0")}
        </Typography>
      ),
    },
    {
      field: "movementCode",
      headerName: "Código",
      width: 148,
      renderCell: (p: GridRenderCellParams) => (
        <Typography sx={{ fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: PALETTE.text, letterSpacing: "0.01em" }}>
          {p.value ?? `MOV-${String(p.row.id).padStart(5, "0")}`}
        </Typography>
      ),
    },
    {
      field: "movementType",
      headerName: "Tipo",
      width: 126,
      renderCell: (p: GridRenderCellParams) => <TypeChip type={p.value} />,
    },
    {
      field: "subtype",
      headerName: "Subtipo",
      flex: 1,
      minWidth: 180,
      renderCell: (p: GridRenderCellParams) => (
        <Typography sx={{ fontSize: "0.72rem", color: PALETTE.textMuted }}>
          {labelSubtipo(String(p.value ?? ""))}
        </Typography>
      ),
    },
  
    {
      field: "movementDate",
      headerName: "Fecha",
      width: 128,
      renderCell: (p: GridRenderCellParams) => <DateCell value={p.value} />,
    },
    {
      field: "guiaRemision",
      headerName: "Guía de remisión",
      width: 148,
      renderCell: (p: GridRenderCellParams) => <GuiaCell value={p.value} />,
    },
    {
      field: "almacenOrigen",
      headerName: "Origen",
      width: 120,
      renderCell: (p: GridRenderCellParams) => <AlmacenCell value={p.value} />,
    },
    {
      field: "almacenDestino",
      headerName: "Destino",
      width: 120,
      renderCell: (p: GridRenderCellParams) => <AlmacenCell value={p.value} />,
    },
    {
      field: "proveedor",
      headerName: "Proveedor / Cliente",
      width: 160,
      renderCell: (p: GridRenderCellParams) => (
        <PartnerCell proveedor={p.row.proveedor} cliente={p.row.cliente} />
      ),
    },
    {
      field: "_actions",
      headerName: "",
      width: 52,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      align: "center",
      renderCell: (p: GridRenderCellParams) => (
        <Tooltip title="Ver detalle" placement="left">
          <IconButton
            size="small"
            onClick={e => { e.stopPropagation(); openDetail(p.row); }}
            sx={{
              width: 28, height: 28,
              borderRadius: "7px",
              bgcolor: PALETTE.surfaceAlt,
              border: `1px solid ${PALETTE.border}`,
              color: PALETTE.textMuted,
              transition: "all 0.15s",
              "&:hover": {
                bgcolor: PALETTE.ink,
                borderColor: PALETTE.ink,
                color: "white",
              },
            }}
          >
            <ArrowForwardIosRounded sx={{ fontSize: 11 }} />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  // ── Vista detalle ─────────────────────────────────────────────────────
  if (view === "detail" && selectedRow) {
    return (
      <KardexMovementDetail
        movement={selectedRow}
        onBack={() => setView("list")}
      />
    );
  }

  // ── Vista listado ─────────────────────────────────────────────────────
  return (
    <Box sx={{ maxWidth: 1600, mx: "auto", display: "flex", flexDirection: "column", gap: 2 }}>

      {/* Filtros */}
      <FilterPanel
        filters={filters}
        onChange={handleFilterChange}
        onReset={resetFilters}
        activeCount={activeFilterCount}
      />

      {/* Tabla */}
      <Box sx={{
        borderRadius: "12px",
        border: `1px solid ${PALETTE.border}`,
        overflow: "hidden",
        bgcolor: PALETTE.surface,
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}>

        {/* Toolbar de la tabla */}
        <Box sx={{
          px: 2.5, py: 1.6,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: `1px solid ${PALETTE.border}`,
          bgcolor: PALETTE.surface,
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Inventory2Rounded sx={{ fontSize: 16, color: PALETTE.textMuted }} />
            <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: PALETTE.text }}>
              Movimientos del local
            </Typography>
            {totalRows > 0 && (
              <Box sx={{
                px: 1, py: 0.2,
                borderRadius: "6px",
                bgcolor: PALETTE.surfaceAlt,
                border: `1px solid ${PALETTE.border}`,
              }}>
                <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: PALETTE.textMuted }}>
                  {totalRows.toLocaleString("es-PE")} registros
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Refrescar">
              <IconButton
                size="small"
                onClick={() => setReloadTrigger(t => t + 1)}
                sx={{
                  width: 32, height: 32,
                  borderRadius: "8px",
                  border: `1px solid ${PALETTE.border}`,
                  bgcolor: PALETTE.surface,
                  color: PALETTE.textMuted,
                  "&:hover": { bgcolor: PALETTE.surfaceAlt },
                }}
              >
                <RefreshRounded sx={{ fontSize: 15 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Progress bar */}
        {loading && (
          <LinearProgress sx={{
            height: 2,
            bgcolor: alpha("#4F8EF7", 0.1),
            "& .MuiLinearProgress-bar": { bgcolor: "#4F8EF7" },
          }} />
        )}

        {/* Grid */}
        <CustomDataGrid
          columns={columns}
          serverSide
          fetchData={fetchData}
          search={gridSearch}
          onSearch={setGridSearch}
          pageSize={PAGE_SIZE}
          reloadTrigger={reloadTrigger}
          showToolbar={false}
          onView={openDetail}
          getRowClassName={() => "mov-row"}
          sx={{
            border: "none",
            borderRadius: 0,

            // Header
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: PALETTE.ink,
              minHeight: "40px !important",
              maxHeight: "40px !important",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "black",
            },
            "& .MuiDataGrid-columnHeader": {
              "&:focus": { outline: "none" },
              "&:focus-within": { outline: "none" },
            },
            "& .MuiDataGrid-sortIcon": { color: "rgba(255,255,255,0.35)", fontSize: 15 },
            "& .MuiDataGrid-menuIcon svg": { color: "rgba(255,255,255,0.35)" },
            "& .MuiDataGrid-columnSeparator": { color: "rgba(255,255,255,0.06)" },

            // Filas
            "& .mov-row": {
              cursor: "pointer",
              transition: "background 0.12s",
              "&:hover": { bgcolor: "#F4F7FB" },
            },
            "& .MuiDataGrid-cell": {
              alignContent: "center",
              borderColor: PALETTE.border,
              fontSize: "0.78rem",
              "&:focus": { outline: "none" },
              "&:focus-within": { outline: "none" },
            },
            "& .MuiDataGrid-row": {
              "&:last-child .MuiDataGrid-cell": { borderBottom: "none" },
            },

            // Footer
            "& .MuiDataGrid-footerContainer": {
              borderColor: PALETTE.border,
              bgcolor: PALETTE.surfaceAlt,
              minHeight: "44px",
            },
            "& .MuiTablePagination-root": { color: PALETTE.textMuted, fontSize: "0.72rem" },
            "& .MuiTablePagination-actions .MuiIconButton-root": { color: PALETTE.textMuted },
          }}
        />
      </Box>
    </Box>
  );
}