// "use client";

// import { useState, useEffect, useRef, useCallback } from "react";
// import {
//   Box, Card, Typography, Divider, Alert, Fade, Collapse, Chip,
//   CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions,
//   IconButton, Stack, Paper, Tooltip, LinearProgress, TextField,
// } from "@mui/material";
// import {
//   CheckCircleOutline, WarningAmberOutlined, SearchOutlined, Close,
//   SendOutlined, AssignmentOutlined, EventOutlined, TableChartOutlined,
//   ErrorOutlined, CheckCircle, AddCircleOutline, ListAltOutlined,
//   TrendingDownOutlined, ReportProblemOutlined, LocalShippingOutlined,
//   BarChartOutlined, RefreshOutlined, ShoppingCartOutlined, CancelOutlined,
//   AutorenewOutlined, InfoOutlined, StorageOutlined,
// } from "@mui/icons-material";
// import { TitleCard } from "@/src/components/base/TitleCard";
// import ButtonBase from "@/src/components/base/ButtonBase";
// import SelectBase from "@/src/components/base/SelectBase";
// import CustomDataGrid from "@/src/components/base/CustomDataGrid";
// import { GridColDef } from "@mui/x-data-grid";
// import { toast } from "react-toastify";
// import dayjs from "dayjs";
// import { API_URL } from "@/src/lib/config";

// // ─── Tipos ────────────────────────────────────────────────────────────────────

// type SemaforoColor = "VERDE" | "AMARILLO" | "ROJO" | "GRIS";
// type Modo = "consulta" | "reestoqueo";

// interface HubInventoryItem {
//   id: number; tenantId: number; hubId: number; itemId: number;
//   itemCode: string; itemName: string; description: string;
//   productType: "MATERIAL" | "TOOL" | "EQUIPMENT" | "EPP";
//   supplySource: string; quantityAvailable: number; quantityReserved: number;
//   quantityInTransit: number; averageCost: number | null; totalValue: number | null;
//   minimumStock: number; reorderPoint: number | null; maximumStock: number | null;
//   avgAgingDays: number | null; locationCode: string | null; lastMovementDate: string | null;
//   uom?: string;
// }

// interface SelectedItemForRequest {
//   inventoryId: number; itemId: number; itemCode: string;
//   itemName: string; description: string;
//   productType: string; quantityAvailable: number; minimumStock: number;
//   requestedQuantity: number; isUrgent: boolean; semaforo: SemaforoColor;
// }

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// const getSemaforo = (item: HubInventoryItem): SemaforoColor => {
//   const qty = item.quantityAvailable;
//   if (qty <= 0) return "GRIS";
//   if (qty <= item.minimumStock) return "ROJO";
//   if (item.reorderPoint && qty <= item.reorderPoint) return "AMARILLO";
//   return "VERDE";
// };

// const semaforoConfig: Record<SemaforoColor, { color: string; bg: string; label: string; border: string; pulse?: boolean }> = {
//   ROJO:     { color: "#dc2626", bg: "#fef2f2", label: "Crítico",   border: "#fecaca", pulse: true },
//   AMARILLO: { color: "#d97706", bg: "#fffbeb", label: "Alerta",    border: "#fde68a" },
//   VERDE:    { color: "#16a34a", bg: "#f0fdf4", label: "Normal",    border: "#bbf7d0" },
//   GRIS:     { color: "#475569", bg: "#f1f5f9", label: "Sin Stock", border: "#cbd5e1", pulse: true },
// };

// const productoConfig: Record<string, { label: string; color: string; icon: string; bgLight: string }> = {
//   MATERIAL:  { label: "Material",    color: "#ea580c", icon: "📦", bgLight: "#fff7ed" },
//   TOOL:      { label: "Herramienta", color: "#1d4ed8", icon: "🔧", bgLight: "#eff6ff" },
//   EQUIPMENT: { label: "Equipo",      color: "#15803d", icon: "⚙️", bgLight: "#f0fdf4" },
//   EPP:       { label: "EPP",         color: "#7c3aed", icon: "🦺", bgLight: "#faf5ff" },
// };

// const TENANT_ID  = 1;
// const HUB_ID     = 1;
// const PROJECT_ID = 1;
// const USER_ID    = 1;
// const PAGE_SIZE  = 15;

// // ─── Componente ───────────────────────────────────────────────────────────────

// export default function InventarioHub() {
//   const topRef = useRef<HTMLDivElement>(null);

//   // ── Estado principal ──────────────────────────────────────────────────
//   const [modo, setModo]               = useState<Modo>("consulta");
//   const [filterType, setFilterType]   = useState<string>("ALL");
//   const [search, setSearch]           = useState("");
//   const [reloadTrigger, setReloadTrigger] = useState(0);
//   const [totalElements, setTotalElements] = useState(0);

//   // ── rowsRef: página visible actual sin stale closure ─────────────────
//   // igual que CatalogoPedido — permite que handleCheckOne/All lean
//   // siempre la página actual sin closures stale
//   const rowsRef = useRef<HubInventoryItem[]>([]);

//   // ── Métricas de semáforo (calculadas sobre la página visible) ────────
//   const [metricas, setMetricas] = useState({ ROJO: 0, AMARILLO: 0, VERDE: 0, GRIS: 0 });

//   // ── Selección ────────────────────────────────────────────────────────
//   const [selectedIds, setSelectedIds]     = useState<Set<number>>(new Set());
//   const [selectedItems, setSelectedItems] = useState<SelectedItemForRequest[]>([]);

//   // ── Flujo solicitud ───────────────────────────────────────────────────
//   const [generatingRequest, setGeneratingRequest] = useState(false);
//   const [requestDto, setRequestDto]               = useState<any | null>(null);
//   const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
//   const [submitting, setSubmitting]               = useState(false);
//   const [showSuccess, setShowSuccess]             = useState(false);
//   const [submittedInfo, setSubmittedInfo]         = useState<any | null>(null);

//   // ── Debounce de búsqueda ──────────────────────────────────────────────
//   const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const [debouncedSearch, setDebouncedSearch] = useState("");

//   useEffect(() => {
//     if (searchTimer.current) clearTimeout(searchTimer.current);
//     searchTimer.current = setTimeout(() => setDebouncedSearch(search), 380);
//     return () => { if (searchTimer.current) clearTimeout(searchTimer.current); };
//   }, [search]);

//   // Al cambiar filtros → reset trigger (igual que CatalogoPedido)
//   useEffect(() => {
//     setReloadTrigger(t => t + 1);
//   }, [filterType, debouncedSearch]);

//   useEffect(() => {
//     if (showSuccess) {
//       topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   }, [showSuccess]);

//   // ── fetchData: server-side igual que CatalogoPedido ───────────────────
//   // CustomDataGrid lo llama con (page, size, search) en cada cambio de página.
//   // Guarda los rows en rowsRef para handlers de selección sin stale closure.
//   const fetchData = useCallback(
//     async (p: number, _size: number, _search: string) => {
//       const params = new URLSearchParams({
//         tenantId: String(TENANT_ID),
//         hubId:    String(HUB_ID),
//         page:     String(p),
//         size:     String(PAGE_SIZE),
//         ...(filterType !== "ALL"        ? { productType: filterType }          : {}),
//         ...(debouncedSearch.trim()      ? { search: debouncedSearch.trim() }   : {}),
//       });

//       const res = await fetch(`${API_URL}/api/hub-inventory?${params}`);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const data: any = await res.json();

//       const rows: HubInventoryItem[] = data.data.content ?? [];
//       rowsRef.current = rows;

//       // Recalcula métricas con los datos de la página actual
//       setMetricas({
//         ROJO:     rows.filter(i => getSemaforo(i) === "ROJO").length,
//         AMARILLO: rows.filter(i => getSemaforo(i) === "AMARILLO").length,
//         VERDE:    rows.filter(i => getSemaforo(i) === "VERDE").length,
//         GRIS:     rows.filter(i => getSemaforo(i) === "GRIS").length,
//       });

//       setTotalElements(data.data.page?.totalElements ?? data.data.totalElements ?? rows.length);
//       return { rows, total: data.data.page?.totalElements ?? data.data.totalElements ?? rows.length };
//     },
//     [filterType, debouncedSearch]
//   );

//   // ── buildSelectedItem ─────────────────────────────────────────────────
//   const buildSelectedItem = (i: HubInventoryItem): SelectedItemForRequest => {
//     const sem     = getSemaforo(i);
//     const deficit = Math.max(i.minimumStock - i.quantityAvailable, 0);
//     return {
//       inventoryId:       i.id,
//       itemId:            i.itemId,
//       itemCode:          i.itemCode,
//       itemName:          i.itemName,
//       description:       i.description ?? i.itemName,
//       productType:       i.productType,
//       quantityAvailable: i.quantityAvailable,
//       minimumStock:      i.minimumStock,
//       requestedQuantity: deficit > 0 ? deficit : i.minimumStock,
//       isUrgent:          sem === "ROJO" || sem === "GRIS",
//       semaforo:          sem,
//     };
//   };

//   // ── Activar modo reestoqueo ───────────────────────────────────────────
//   // Pre-selecciona los críticos de la página visible (rowsRef)
//   const activarModoReestoqueo = () => {
//     const criticos = rowsRef.current.filter(i => {
//       const s = getSemaforo(i);
//       return s === "ROJO" || s === "GRIS";
//     });
//     setModo("reestoqueo");
//     setSelectedIds(new Set(criticos.map(i => i.id)));
//     setSelectedItems(criticos.map(buildSelectedItem));
//     setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
//   };

//   const cancelarReestoqueo = () => {
//     setModo("consulta");
//     setSelectedIds(new Set());
//     setSelectedItems([]);
//   };

//   // ── Handlers selección — leen rowsRef igual que CatalogoPedido ────────
//   const handleCheckOne = useCallback((id: number | string, checked: boolean) => {
//     const numId = Number(id);
//     setSelectedIds(prev => {
//       const next = new Set(prev);
//       checked ? next.add(numId) : next.delete(numId);
//       return next;
//     });
//     setSelectedItems(prev => {
//       if (!checked) return prev.filter(s => s.inventoryId !== numId);
//       const item = rowsRef.current.find(i => i.id === numId);
//       if (!item || prev.some(s => s.inventoryId === numId)) return prev;
//       return [...prev, buildSelectedItem(item)];
//     });
//   }, []);

//   const handleCheckAll = useCallback((checked: boolean, visibleIds: (number | string)[]) => {
//     const numIds = visibleIds.map(Number);
//     setSelectedIds(prev => {
//       const next = new Set(prev);
//       numIds.forEach(id => checked ? next.add(id) : next.delete(id));
//       return next;
//     });
//     setSelectedItems(prev => {
//       if (!checked) return prev.filter(s => !numIds.includes(s.inventoryId));
//       const existing = new Set(prev.map(s => s.inventoryId));
//       const nuevos = rowsRef.current
//         .filter(r => numIds.includes(r.id) && !existing.has(r.id))
//         .map(buildSelectedItem);
//       return [...prev, ...nuevos];
//     });
//   }, []);

//   // ── Edición carrito ───────────────────────────────────────────────────
//   const updateRequestedQty = (inventoryId: number, rawValue: string) => {
//     const parsed = parseInt(rawValue, 10);
//     const qty    = isNaN(parsed) ? 0 : Math.max(0, parsed);
//     setSelectedItems(prev =>
//       prev.map(i => i.inventoryId === inventoryId
//         ? { ...i, requestedQuantity: qty, _rawQty: rawValue } as any
//         : i
//       )
//     );
//   };

//   // ── Generar solicitud (abre modal de confirmación) ────────────────────
//   const handleGenerarSolicitud = async () => {
//     if (selectedItems.length === 0) { toast.warning("Selecciona al menos un producto"); return; }
//     const sinCantidad = selectedItems.filter(i => i.requestedQuantity < 1);
//     if (sinCantidad.length > 0) {
//       toast.warning(`${sinCantidad.length} producto(s) tienen cantidad 0. Ingresa al menos 1.`);
//       return;
//     }
//     setGeneratingRequest(true);
//     try {
//       const mock = {
//         id: 0,
//         requestNumber: `SAB-${dayjs().format("YYYYMM")}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, "0")}`,
//         status: "DRAFT",
//         items: selectedItems.map((item, idx) => ({
//           id: idx + 1, itemId: item.itemId, itemCode: item.itemCode,
//           itemName: item.itemName, itemDescription: item.description,
//           productType: item.productType, requestedQuantity: item.requestedQuantity,
//           deliveredQuantity: 0, pendingQuantity: 0,
//         })),
//         totalItemsCount: selectedItems.length,
//         totalEstimatedValue: 0,
//         requestedDeliveryDate: dayjs().format("YYYY-MM-DD")
//       };
//       setRequestDto(mock);
//       setConfirmDialogOpen(true);
//     } catch {
//       toast.error("Error al preparar solicitud");
//     } finally {
//       setGeneratingRequest(false);
//     }
//   };

//   // ── POST real al backend ──────────────────────────────────────────────
//   const handleAprobarSolicitud = async () => {
//     if (!requestDto) return;
//     setConfirmDialogOpen(false);
//     setSubmitting(true);
//     try {
//       const body = {
//         tenantId:             TENANT_ID,
//         hubId:                HUB_ID,
//         projectId:            PROJECT_ID,
//         requestedBy:          USER_ID,
//         requestedDeliveryDate: requestDto.requestedDeliveryDate,
//         periodValueEntrega:   requestDto.requestedDeliveryDate,
//         origin:               "INVENTORY",
//         items: selectedItems.map(item => ({
//           itemId:            item.itemId,
//           itemCode:          item.itemCode,
//           itemName:          item.description,
//           itemDescription:   item.description,
//           productType:       item.productType,
//           requestedQuantity: item.requestedQuantity,
//           deliveredQuantity: 0,
//           pendingQuantity:   0,
//         })),
//       };

//       const res = await fetch(`${API_URL}/api/hub-inventory/supply-request`, {
//         method:  "POST",
//         headers: { "Content-Type": "application/json" },
//         body:    JSON.stringify(body),
//       });

//       if (!res.ok) {
//         const errData = await res.json().catch(() => null);
//         throw new Error(errData?.message ?? `Error ${res.status}`);
//       }

//       const created = await res.json();
//       setSubmittedInfo({
//         ...requestDto,
//         id:            created?.data?.id            ?? requestDto.id,
//         requestNumber: created?.data?.requestNumber ?? requestDto.requestNumber,
//         status:        created?.data?.status        ?? "APPROVED",
//       });
//       setShowSuccess(true);
//       cancelarReestoqueo();
//       setRequestDto(null);
//       setReloadTrigger(t => t + 1); // recarga el DataGrid tras crear solicitud
//       toast.success("Solicitud registrada correctamente");
//     } catch (err: any) {
//       toast.error(`Error al registrar solicitud: ${err.message ?? "Intenta de nuevo"}`);
//     } finally {
//       setSubmitting(false);
//     }
//   }; 

//   const necesitanReestoqueo = metricas.ROJO + metricas.GRIS;

//   // ── Columnas DataGrid principal ───────────────────────────────────────
//   const columns: GridColDef[] = [
//     {
//       field: "semaforo", headerName: "Estado", width: 118,
//       renderCell: (p) => {
//         const sem = getSemaforo(p.row);
//         const cfg = semaforoConfig[sem];
//         return (
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Box sx={{
//               width: 10, height: 10, borderRadius: "50%", bgcolor: cfg.color,
//               ...(cfg.pulse && {
//                 animation: "semPulse 1.6s ease-in-out infinite",
//                 "@keyframes semPulse": {
//                   "0%, 100%": { boxShadow: `0 0 0 0 ${cfg.color}60` },
//                   "50%":      { boxShadow: `0 0 0 5px ${cfg.color}00` },
//                 },
//               }),
//             }} />
//             <Typography variant="caption" fontWeight={700} sx={{ color: cfg.color }}>{cfg.label}</Typography>
//           </Box>
//         );
//       },
//     },
//     {
//       field: "itemCode", headerName: "Código", width: 125,
//       renderCell: (p) => {
//         const cfg = productoConfig[p.row.productType] ?? productoConfig.MATERIAL;
//         return <Chip label={p.value} size="small" sx={{ bgcolor: cfg.color, color: "white", fontWeight: 700, fontSize: "0.7rem", letterSpacing: 0.3 }} />;
//       },
//     },
//     {
//       field: "description", headerName: "Descripción", flex: 2, minWidth: 300,
//       renderCell: (p) => (
//         <Box sx={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
//           <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.3 }}>{p.value || p.row.itemName}</Typography>
//           {p.row.locationCode && <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.68rem" }}>📍 {p.row.locationCode}</Typography>}
//         </Box>
//       ),
//     },
//     {
//       field: "productType", headerName: "Tipo", width: 130,
//       renderCell: (p) => {
//         const cfg = productoConfig[p.value] ?? productoConfig.MATERIAL;
//         return <Chip label={`${cfg.icon} ${cfg.label}`} size="small" variant="outlined" sx={{ borderColor: cfg.color, color: cfg.color, fontWeight: 600, fontSize: "0.72rem" }} />;
//       },
//     },
//     {
//       field: "quantityAvailable", headerName: "Disponible", width: 120, align: "center", headerAlign: "center",
//       renderCell: (p) => {
//         const sem = getSemaforo(p.row);
//         const cfg = semaforoConfig[sem];
//         const pct = Math.min((p.value / (p.row.maximumStock || 100)) * 100, 100);
//         return (
//           <Box sx={{ width: "100%", px: 0.5 }}>
//             <Typography variant="body2" fontWeight={800} sx={{ color: cfg.color, textAlign: "center", lineHeight: 1 }}>{p.value}</Typography>
//             <LinearProgress variant="determinate" value={pct} sx={{ height: 4, borderRadius: 2, mt: 0.5, bgcolor: `${cfg.color}20`, "& .MuiLinearProgress-bar": { bgcolor: cfg.color, borderRadius: 2 } }} />
//           </Box>
//         );
//       },
//     },
//     { field: "minimumStock",      headerName: "Mínimo",      width: 90,  align: "center", headerAlign: "center", renderCell: (p) => <Typography variant="body2" color="text.secondary" fontWeight={600}>{p.value}</Typography> },
//     { field: "maximumStock",      headerName: "Máximo",      width: 90,  align: "center", headerAlign: "center", renderCell: (p) => <Typography variant="body2" color="text.secondary" fontWeight={600}>{p.value ?? "—"}</Typography> },
//     { field: "quantityReserved",  headerName: "Reservado",   width: 90,  align: "center", headerAlign: "center", renderCell: (p) => <Typography variant="body2" color="text.secondary" fontWeight={600}>{p.value ?? "—"}</Typography> },
//     { field: "reorderPoint",      headerName: "Reorden",     width: 90,  align: "center", headerAlign: "center", renderCell: (p) => <Typography variant="body2" color="text.disabled">{p.value ?? "—"}</Typography> },
//     {
//       field: "quantityInTransit", headerName: "En Tránsito", width: 115, align: "center", headerAlign: "center",
//       renderCell: (p) => p.value > 0
//         ? <Chip label={p.value} size="small" icon={<LocalShippingOutlined sx={{ fontSize: "13px !important" }} />} sx={{ bgcolor: "#e0f2fe", color: "#0369a1", fontWeight: 700, fontSize: "0.7rem" }} />
//         : <Typography variant="body2" color="text.disabled">—</Typography>,
//     },
//     { field: "lastMovementDate", headerName: "Últ. Mov.", width: 130, renderCell: (p) => <Typography variant="caption" color="text.secondary">{p.value ? dayjs(p.value).format("DD/MM/YYYY") : "—"}</Typography> },
//   ];

//   // ── Columnas carrito ──────────────────────────────────────────────────
//   const columnsSelected: GridColDef[] = [
//     {
//       field: "semaforo", headerName: "", width: 44,
//       renderCell: (p) => {
//         const cfg = semaforoConfig[p.value as SemaforoColor];
//         return <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: cfg?.color }} />;
//       },
//     },
//     {
//       field: "itemCode", headerName: "Código", width: 115,
//       renderCell: (p) => {
//         const cfg = productoConfig[p.row.productType] ?? productoConfig.MATERIAL;
//         return <Chip label={p.value} size="small" sx={{ bgcolor: cfg.color, color: "white", fontWeight: 700, fontSize: "0.7rem" }} />;
//       },
//     },
//     {
//       field: "description", headerName: "Descripción", flex: 2, minWidth: 180,
//       renderCell: (p) => (
//         <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.3 }}>
//           {p.value || p.row.itemName}
//         </Typography>
//       ),
//     },
//     { field: "quantityAvailable", headerName: "Actual",  width: 75,  align: "center", headerAlign: "center", renderCell: (p) => <Typography variant="body2" fontWeight={700} color="error.main">{p.value}</Typography> },
//     { field: "minimumStock",      headerName: "Mínimo",  width: 80,  align: "center", headerAlign: "center", renderCell: (p) => <Typography variant="body2" color="text.secondary">{p.value}</Typography> },
//     {
//       field: "requestedQuantity", headerName: "Solicitar", width: 130, align: "center", headerAlign: "center",
//       renderCell: (p) => {
//         const rawValue = (p.row as any)._rawQty ?? String(p.value === 0 ? "" : p.value);
//         return (
//           <Box sx={{ display: "flex" }}>
//             <TextField
//               type="number" size="small" value={rawValue}
//               onChange={e => updateRequestedQty(p.row.inventoryId, e.target.value)}
//               onBlur={e => {
//                 const val = parseInt(e.target.value, 10);
//                 if (isNaN(val) || val < 1) updateRequestedQty(p.row.inventoryId, "1");
//               }}
//               inputProps={{ min: 1, style: { textAlign: "center", fontWeight: 700, padding: "6px 8px" } }}
//               sx={{
//                 width: 90,
//                 "& .MuiOutlinedInput-root": { borderRadius: 1.5, fontSize: "0.85rem" },
//                 "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": { display: "none" },
//                 "& input[type=number]": { MozAppearance: "textfield" },
//               }}
//             />
//           </Box>
//         );
//       },
//     },
//     {
//       field: "isUrgent", headerName: "Urgente", width: 85, align: "center", headerAlign: "center",
//       renderCell: (p) => p.value
//         ? <Chip label="SÍ" size="small" color="error"     sx={{ fontWeight: 700, height: 20, fontSize: "0.68rem" }} />
//         : <Chip label="NO" size="small" variant="outlined" sx={{ fontWeight: 600, height: 20, fontSize: "0.68rem" }} />,
//     },
//   ];

//   // ─── RENDER ───────────────────────────────────────────────────────────
//   return (
//     <Box ref={topRef} sx={{ maxWidth: 1400, mx: "auto", p: 4, display: "flex", flexDirection: "column", gap: 3 }}>

//       <TitleCard
//         icon={<StorageOutlined sx={{ fontSize: 32 }} />}
//         title="Inventario del Hub"
//         description="Consulta el estado del inventario en tiempo real. Identifica productos críticos y genera solicitudes de reabastecimiento cuando lo necesites."
//       />

//       {/* ══ PANTALLA ÉXITO ══ */}
//       <Fade in={showSuccess} timeout={700} unmountOnExit>
//         <Box>
//           <Card elevation={0} sx={{
//             borderRadius: 4,
//             background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 60%, #f0fdf4 100%)",
//             border: "2px solid #bbf7d0", p: { xs: 4, md: 6 }, textAlign: "center",
//             position: "relative", overflow: "hidden",
//           }}>
//             <Box sx={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", bgcolor: "rgba(34,197,94,0.08)" }} />
//             <Box sx={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", bgcolor: "rgba(34,197,94,0.06)" }} />
//             <Box sx={{
//               width: 100, height: 100, borderRadius: "50%", bgcolor: "#22c55e",
//               mx: "auto", mb: 3, display: "flex", alignItems: "center", justifyContent: "center",
//               animation: "pulseRing 2s ease-in-out infinite",
//               "@keyframes pulseRing": {
//                 "0%, 100%": { boxShadow: "0 0 0 16px rgba(34,197,94,0.12), 0 0 0 32px rgba(34,197,94,0.06)" },
//                 "50%":      { boxShadow: "0 0 0 20px rgba(34,197,94,0.08), 0 0 0 40px rgba(34,197,94,0.03)" },
//               },
//             }}>
//               <CheckCircleOutline sx={{ fontSize: 52, color: "white" }} />
//             </Box>
//             <Typography variant="h4" fontWeight={800} sx={{ color: "#15803d", mb: 1 }}>¡Solicitud Registrada con Éxito!</Typography>
//             <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 480, mx: "auto" }}>
//               La solicitud <strong>{submittedInfo?.requestNumber}</strong> fue registrada y está en el flujo de abastecimiento.
//             </Typography>
//             <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 4 }}>
//               {[
//                 { label: "Nro. Solicitud",       value: submittedInfo?.requestNumber ?? "—", color: "#15803d" },
//                 { label: "Productos solicitados", value: `${submittedInfo?.items?.length ?? 0}`, color: "#0369a1" },
//               ].map(card => (
//                 <Paper key={card.label} elevation={0} sx={{ px: 3, py: 2.5, borderRadius: 3, border: "1px solid #bbf7d0", bgcolor: "white", minWidth: 150, textAlign: "center" }}>
//                   <Typography variant="h5" fontWeight={800} sx={{ color: card.color }}>{card.value}</Typography>
//                   <Typography variant="caption" color="text.secondary" fontWeight={600}>{card.label}</Typography>
//                 </Paper>
//               ))}
//               <Paper elevation={0} sx={{ px: 3, py: 2.5, borderRadius: 3, border: "1px solid #bbf7d0", bgcolor: "white", minWidth: 150, textAlign: "center" }}>
//                 <Box sx={{ display: "flex", justifyContent: "center", mb: 0.5 }}>
//                   <Chip label={submittedInfo?.status} color="success" sx={{ fontWeight: 800, borderRadius: 1 }} />
//                 </Box>
//                 <Typography variant="caption" color="text.secondary" fontWeight={600}>Estado</Typography>
//               </Paper>
//             </Box>
//             <Alert icon={<AssignmentOutlined />} severity="info" sx={{ borderRadius: 2, maxWidth: 520, mx: "auto", mb: 4 }}>
//               La solicitud pasará al proceso de <strong>Recepción de Materiales</strong> una vez que el proveedor despache.
//             </Alert>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
//               <ButtonBase label="Volver al Inventario" startIcon={<RefreshOutlined />}
//                 onClick={() => { setShowSuccess(false); setReloadTrigger(t => t + 1); }}
//                 sx={{ px: 4, py: 1.5, fontWeight: 700, boxShadow: "0 4px 12px rgba(34,197,94,0.3)", borderRadius: 2.5 }}
//               />
//               <ButtonBase label="Ver Solicitudes" variant="outlined" startIcon={<ListAltOutlined />}
//                 onClick={() => setShowSuccess(false)}
//                 sx={{ px: 4, py: 1.5, bgcolor: "white", color: "text.primary", border: "1px solid #cbd5e1", borderRadius: 2.5 }}
//               />
//             </Stack>
//           </Card>
//         </Box>
//       </Fade>

//       {/* ══ CONTENIDO PRINCIPAL ══ */}
//       <Fade in={!showSuccess} timeout={400} unmountOnExit>
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

//           {/* KPI Cards */}
//           <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
//             {(["ROJO", "AMARILLO", "VERDE", "GRIS"] as SemaforoColor[]).map(sem => {
//               const cfg = semaforoConfig[sem];
//               const count = metricas[sem];
//               const iconMap: Record<SemaforoColor, React.ReactNode> = {
//                 ROJO:     <ReportProblemOutlined sx={{ fontSize: 20, color: cfg.color }} />,
//                 AMARILLO: <WarningAmberOutlined  sx={{ fontSize: 20, color: cfg.color }} />,
//                 VERDE:    <CheckCircle           sx={{ fontSize: 20, color: cfg.color }} />,
//                 GRIS:     <ErrorOutlined         sx={{ fontSize: 20, color: cfg.color }} />,
//               };
//               return (
//                 <Paper key={sem} variant="outlined" sx={{
//                   flex: "1 1 150px", p: 2.5, borderRadius: 3, bgcolor: cfg.bg,
//                   border: `1.5px solid ${cfg.border}`, transition: "all 0.2s",
//                   "&:hover": { transform: "translateY(-2px)", boxShadow: `0 8px 24px ${cfg.color}20` },
//                 }}>
//                   <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
//                     {iconMap[sem]}
//                     <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: cfg.color, opacity: 0.4, ...(cfg.pulse && { animation: "semPulse 1.6s ease-in-out infinite", "@keyframes semPulse": { "0%, 100%": { boxShadow: `0 0 0 0 ${cfg.color}60` }, "50%": { boxShadow: `0 0 0 5px ${cfg.color}00` } } }) }} />
//                   </Box>
//                   <Typography variant="h3" fontWeight={900} sx={{ color: cfg.color, lineHeight: 1 }}>{count}</Typography>
//                   <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: "uppercase", letterSpacing: 0.7, fontSize: "0.68rem" }}>{cfg.label}</Typography>
//                 </Paper>
//               );
//             })}
//           </Box>

//           {/* Banner reestoqueo activo */}
//           <Collapse in={modo === "reestoqueo"}>
//             <Card sx={{ borderRadius: 3, background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)", p: 0, overflow: "hidden" }}>
//               <Box sx={{ p: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
//                 <Stack direction="row" spacing={2} alignItems="center">
//                   <Box sx={{ bgcolor: "rgba(255,255,255,0.15)", p: 1, borderRadius: 2, display: "flex" }}>
//                     <ShoppingCartOutlined sx={{ color: "white", fontSize: 22 }} />
//                   </Box>
//                   <Box>
//                     <Typography variant="subtitle1" fontWeight={800} color="white">Modo Reestoqueo Activo</Typography>
//                     <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.75)" }}>
//                       Selecciona los productos que deseas reabastecer. Los críticos ya están pre-seleccionados.
//                     </Typography>
//                   </Box>
//                 </Stack>
//                 <Stack direction="row" spacing={1.5} alignItems="center">
//                   {selectedIds.size > 0 && (
//                     <Chip label={`${selectedIds.size} seleccionado${selectedIds.size > 1 ? "s" : ""}`} size="small"
//                       sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white", fontWeight: 700 }}
//                     />
//                   )}
//                   <ButtonBase label="Cancelar" startIcon={<CancelOutlined />} onClick={cancelarReestoqueo} size="small"
//                     sx={{ bgcolor: "rgba(255,255,255,0.12)", color: "white", border: "1px solid rgba(255,255,255,0.25)", "&:hover": { bgcolor: "rgba(255,255,255,0.2)" } }}
//                   />
//                 </Stack>
//               </Box>
//             </Card>
//           </Collapse>

//           {/* Panel filtros + acciones */}
//           <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", overflow: "hidden" }}>
//             <Box sx={{ px: 3, py: 2.5, borderBottom: "1px solid", borderColor: "divider", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2, bgcolor: "#fafbfc" }}>
//               <Stack direction="row" spacing={2} alignItems="center">
//                 <Box sx={{ width: 4, height: 22, bgcolor: modo === "reestoqueo" ? "#1d4ed8" : "primary.main", borderRadius: 1, transition: "background 0.3s" }} />
//                 <Box>
//                   <Typography variant="subtitle1" fontWeight={800}>
//                     {modo === "consulta" ? "Consulta de Inventario" : "Selección para Reestoqueo"}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     {modo === "consulta"
//                       ? `${totalElements} productos en total`
//                       : `${selectedIds.size} seleccionados`}
//                   </Typography>
//                 </Box>
//               </Stack>
//               <Stack direction="row" spacing={1.5} alignItems="center">
//                 {necesitanReestoqueo > 0 && modo === "consulta" && (
//                   <Box onClick={activarModoReestoqueo} sx={{ display: "flex", alignItems: "center", gap: 1, px: 2, py: 0.8, borderRadius: 2, bgcolor: "#fef2f2", border: "1px solid #fecaca", cursor: "pointer", "&:hover": { bgcolor: "#fee2e2" } }}>
//                     <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#dc2626", animation: "semPulse 1.6s ease-in-out infinite", "@keyframes semPulse": { "0%, 100%": { boxShadow: "0 0 0 0 #dc262660" }, "50%": { boxShadow: "0 0 0 5px #dc262600" } } }} />
//                     <Typography variant="caption" fontWeight={700} color="error.main">
//                       {necesitanReestoqueo} producto{necesitanReestoqueo > 1 ? "s" : ""} requieren reestoqueo
//                     </Typography>
//                   </Box>
//                 )}
//                 <Tooltip title="Actualizar inventario">
//                   <span>
//                     <ButtonBase label="" startIcon={<RefreshOutlined />}
//                       onClick={() => setReloadTrigger(t => t + 1)} variant="outlined"
//                       sx={{ minWidth: 40, px: 1.5, bgcolor: "white", color: "text.secondary", border: "1px solid #e2e8f0" }}
//                     />
//                   </span>
//                 </Tooltip>
//                 {modo === "consulta" ? (
//                   <ButtonBase label="Reestoquear Inventario" startIcon={<AutorenewOutlined />} onClick={activarModoReestoqueo}
//                     sx={{ px: 3, py: 1.2, fontWeight: 700, borderRadius: 2.5, background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)", boxShadow: "0 4px 14px rgba(37,99,235,0.35)", "&:hover": { transform: "translateY(-1px)", boxShadow: "0 8px 20px rgba(37,99,235,0.45)" } }}
//                   />
//                 ) : (
//                   <ButtonBase
//                     label={generatingRequest ? "Generando..." : "Registrar Solicitud"}
//                     startIcon={generatingRequest ? <CircularProgress size={18} color="inherit" /> : <AddCircleOutline />}
//                     onClick={handleGenerarSolicitud}
//                     disabled={generatingRequest || selectedIds.size === 0}
//                     sx={{
//                       px: 3, py: 1.2, fontWeight: 700, borderRadius: 2.5,
//                       background: selectedIds.size === 0 ? undefined : "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
//                       boxShadow: selectedIds.size > 0 ? "0 4px 14px rgba(22,163,74,0.35)" : "none",
//                     }}
//                   />
//                 )}
//               </Stack>
//             </Box>

//             {/* Filtros */}
//             <Box sx={{ px: 3, py: 2, display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
//               <Box sx={{ flex: "0 0 220px" }}>
//                 <SelectBase
//                   label="Tipo de Producto" size="small" value={filterType}
//                   onChange={(v) => setFilterType(String(v))}
//                   options={[
//                     { label: "Todos los productos", value: "ALL"       },
//                     { label: "📦 Materiales",        value: "MATERIAL"  },
//                     { label: "⚙️ Equipos",            value: "EQUIPMENT" },
//                     { label: "🔧 Herramientas",       value: "TOOL"      },
//                     { label: "🦺 EPP",               value: "EPP"       },
//                   ]}
//                   fullWidth
//                 />
//               </Box>
//               <Box sx={{ flex: 1, minWidth: 200 }}>
//                 <TextField
//                   fullWidth size="small"
//                   placeholder="Buscar por código o descripción..."
//                   value={search}
//                   onChange={e => setSearch(e.target.value)}
//                   InputProps={{ startAdornment: <SearchOutlined sx={{ mr: 1, color: "text.disabled", fontSize: 18 }} /> }}
//                   sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                 />
//               </Box>
//               <Stack direction="row" spacing={1} flexWrap="wrap">
//                 <Chip label={`🔴 ${metricas.ROJO} Críticos`}     size="small" clickable sx={{ fontWeight: 700, fontSize: "0.72rem", bgcolor: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }} />
//                 <Chip label={`🟡 ${metricas.AMARILLO} En alerta`} size="small" clickable sx={{ fontWeight: 700, fontSize: "0.72rem", bgcolor: "#fffbeb", color: "#d97706", border: "1px solid #fde68a" }} />
//                 {modo === "reestoqueo" && selectedIds.size > 0 && (
//                   <Chip label="Limpiar selección" size="small" clickable
//                     icon={<Close sx={{ fontSize: "12px !important" }} />}
//                     onClick={() => { setSelectedIds(new Set()); setSelectedItems([]); }}
//                     sx={{ fontWeight: 600, fontSize: "0.72rem", bgcolor: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}
//                   />
//                 )}
//               </Stack>
//             </Box>
//           </Card>

//           {/* DataGrid principal — server-side igual que CatalogoPedido */}
//           <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", p: 3 }}>
//             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5, flexWrap: "wrap", gap: 2 }}>
//               <Stack direction="row" spacing={2} alignItems="center">
//                 <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                   <BarChartOutlined sx={{ color: "#1976d2", fontSize: 24 }} />
//                 </Box>
//                 <Box>
//                   <Typography variant="h6" fontWeight={800}>
//                     {modo === "consulta" ? "Estado General del Inventario" : "Selecciona los productos a reabastecer"}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     {modo === "reestoqueo"
//                       ? "Marca los checkboxes de los productos que deseas incluir en la solicitud"
//                       : "Vista de solo lectura — usa \"Reestoquear Inventario\" para iniciar una solicitud"}
//                   </Typography>
//                 </Box>
//               </Stack>
//               {modo === "consulta" && metricas.ROJO > 0 && (
//                 <Alert severity="error" sx={{ borderRadius: 2, py: 0.5, px: 2, cursor: "pointer" }} onClick={activarModoReestoqueo}>
//                   <Typography variant="body2" fontWeight={700}>
//                     {metricas.ROJO} producto{metricas.ROJO > 1 ? "s" : ""} en nivel crítico — Clic para reestoquear
//                   </Typography>
//                 </Alert>
//               )}
//             </Box>

//             {/* ── SERVER-SIDE igual que CatalogoPedido ── */}
//             <CustomDataGrid
//               columns={columns}
//               serverSide={true}
//               fetchData={fetchData}
//               search={debouncedSearch}
//               onSearch={setSearch}
//               pageSize={PAGE_SIZE}
//               showToolbar={false}
//               reloadTrigger={reloadTrigger}
//               selectionEnabled={modo === "reestoqueo"}
//               selectedIds={selectedIds}
//               onSelectionChange={handleCheckOne}
//               onSelectAll={handleCheckAll}
//               getRowClassName={(params) => {
//                 const sem = getSemaforo(params.row);
//                 if (sem === "ROJO")     return "row-critico";
//                 if (sem === "GRIS")     return "row-sin-stock";
//                 if (sem === "AMARILLO") return "row-alerta";
//                 return "";
//               }}
//               sx={{
//                 "& .row-critico":   { bgcolor: "#fff5f5 !important", "&:hover": { bgcolor: "#fee2e2 !important" } },
//                 "& .row-sin-stock": { bgcolor: "#f8fafc !important", opacity: 0.75 },
//                 "& .row-alerta":    { bgcolor: "#fffdf0 !important", "&:hover": { bgcolor: "#fef9c3 !important" } },
//                 ...(modo === "consulta" && { "& .MuiDataGrid-row": { cursor: "default" } }),
//               }}
//             />
//           </Card>

//           {/* Carrito */}
//           <Collapse in={modo === "reestoqueo" && selectedItems.length > 0} unmountOnExit>
//             <Card elevation={4} sx={{ borderRadius: 4, border: "2px solid #bfdbfe", overflow: "hidden", boxShadow: "rgba(37,99,235,0.18) 0px 8px 32px" }}>
//               <Box sx={{ background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)", p: 3, color: "white" }}>
//                 <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
//                   <Stack direction="row" spacing={2} alignItems="center">
//                     <Box sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 1, borderRadius: 2, display: "flex" }}><TrendingDownOutlined /></Box>
//                     <Box>
//                       <Typography variant="h6" fontWeight={800}>Carrito de Reestoqueo</Typography>
//                       <Typography variant="caption" sx={{ opacity: 0.85 }}>
//                         {selectedItems.length} producto(s) — Ajusta las cantidades si es necesario
//                       </Typography>
//                     </Box>
//                   </Stack>
//                   <Stack direction="row" spacing={1.5} flexWrap="wrap">
//                     {selectedItems.filter(i => i.isUrgent).length > 0 && (
//                       <Chip
//                         label={`${selectedItems.filter(i => i.isUrgent).length} urgente${selectedItems.filter(i => i.isUrgent).length > 1 ? "s" : ""}`}
//                         size="small"
//                         icon={<WarningAmberOutlined sx={{ fontSize: "14px !important", color: "white !important" }} />}
//                         sx={{ bgcolor: "#ef4444", color: "white", fontWeight: 700 }}
//                       />
//                     )}
//                     <Chip
//                       label={`${selectedItems.reduce((s, i) => s + (i.requestedQuantity || 0), 0)} unidades totales`}
//                       size="small"
//                       sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white", fontWeight: 700 }}
//                     />
//                   </Stack>
//                 </Box>
//               </Box>
//               <Box sx={{ p: 3 }}>
//                 <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
//                   {(["MATERIAL", "EQUIPMENT", "TOOL", "EPP"] as const)
//                     .filter(tipo => selectedItems.some(i => i.productType === tipo))
//                     .map(tipo => {
//                       const cfg   = productoConfig[tipo];
//                       const count = selectedItems.filter(i => i.productType === tipo).length;
//                       return (
//                         <Paper key={tipo} variant="outlined" sx={{ flex: "1 1 120px", p: 2, borderRadius: 2, textAlign: "center", border: `1px solid ${cfg.color}30`, bgcolor: cfg.bgLight }}>
//                           <Typography variant="h5" fontWeight={800} sx={{ color: cfg.color }}>{count}</Typography>
//                           <Typography variant="caption" color="text.secondary" fontWeight={600}>{cfg.icon} {cfg.label}{count > 1 ? "s" : ""}</Typography>
//                         </Paper>
//                       );
//                     })}
//                 </Box>

//                 <CustomDataGrid
//                   columns={columnsSelected}
//                   localRows={selectedItems.map(i => ({ ...i, id: i.inventoryId }))}
//                   serverSide={false}
//                   search=""
//                   onSearch={() => {}}
//                   pageSize={20}
//                   showToolbar={false}
//                   sx={{ border: "1px solid #bfdbfe", "& .MuiDataGrid-columnHeaders": { bgcolor: "#eff6ff" } }}
//                 />

//                 <Divider sx={{ my: 3 }} />
//                 <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
//                   <Stack direction="row" spacing={1} alignItems="center">
//                     <InfoOutlined sx={{ fontSize: 16, color: "text.disabled" }} />
//                     <Typography variant="caption" color="text.disabled">
//                       Las cantidades cubren el déficit al stock mínimo por defecto
//                     </Typography>
//                   </Stack>
//                   <Stack direction="row" spacing={2}>
//                     <ButtonBase label="Cancelar" variant="outlined" startIcon={<CancelOutlined />} onClick={cancelarReestoqueo}
//                       sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1" }}
//                     />
//                     <ButtonBase
//                       label={generatingRequest ? "Generando..." : "Registrar Solicitud de Abastecimiento"}
//                       startIcon={generatingRequest ? <CircularProgress size={18} color="inherit" /> : <AddCircleOutline />}
//                       onClick={handleGenerarSolicitud}
//                       disabled={generatingRequest}
//                       sx={{
//                         px: 4, py: 1.5, fontWeight: 700, fontSize: "0.85rem", borderRadius: 2.5,
//                         background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
//                         boxShadow: "0 8px 20px rgba(22,163,74,0.3)",
//                         "&:hover": { transform: "translateY(-1px)", boxShadow: "0 12px 28px rgba(22,163,74,0.4)" },
//                       }}
//                     />
//                   </Stack>
//                 </Box>
//               </Box>
//             </Card>
//           </Collapse>

//         </Box>
//       </Fade>

//       {/* ══ MODAL CONFIRMACIÓN ══ */}
//       <Dialog open={confirmDialogOpen} onClose={() => !submitting && setConfirmDialogOpen(false)} maxWidth="sm" fullWidth
//         PaperProps={{ sx: { borderRadius: 3, overflow: "hidden" } }}>
//         <DialogTitle sx={{ m: 0, p: 0 }}>
//           <Box sx={{ background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)", p: 3, color: "white", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//             <Stack direction="row" spacing={1.5} alignItems="center">
//               <Box sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 0.8, borderRadius: 1.5, display: "flex" }}><SendOutlined fontSize="small" /></Box>
//               <Box>
//                 <Typography variant="h6" fontWeight={800}>Confirmar Solicitud</Typography>
//                 <Typography variant="caption" sx={{ opacity: 0.85 }}>Revisa los detalles antes de enviar</Typography>
//               </Box>
//             </Stack>
//             {!submitting && (
//               <IconButton onClick={() => setConfirmDialogOpen(false)} size="small" sx={{ color: "rgba(255,255,255,0.7)" }}>
//                 <Close fontSize="small" />
//               </IconButton>
//             )}
//           </Box>
//         </DialogTitle>
//         <DialogContent sx={{ p: 3, mt: 1 }}>
//           <Box sx={{ p: 2.5, bgcolor: "#f8fafc", borderRadius: 2, mb: 3, border: "1px solid #e2e8f0" }}>
//             <Stack spacing={2} divider={<Divider />}>
//               <Stack direction="row" spacing={2} alignItems="center">
//                 <AssignmentOutlined color="action" fontSize="small" />
//                 <Box>
//                   <Typography variant="caption" display="block" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700 }}>Número de Solicitud (preview)</Typography>
//                   <Typography variant="body1" fontWeight={800} color="primary.main">{requestDto?.requestNumber}</Typography>
//                 </Box>
//               </Stack>
//               <Stack direction="row" spacing={2} alignItems="center">
//                 <TableChartOutlined color="action" fontSize="small" />
//                 <Box>
//                   <Typography variant="caption" display="block" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700 }}>Total</Typography>
//                   <Typography variant="body2" fontWeight={600}>
//                     {requestDto?.items?.length} productos — {selectedItems.reduce((s, i) => s + (i.requestedQuantity || 0), 0)} unidades
//                   </Typography>
//                 </Box>
//               </Stack>
//               <Stack direction="row" spacing={2} alignItems="center">
//                 <EventOutlined color="action" fontSize="small" />
//                 <Box>
//                   <Typography variant="caption" display="block" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700 }}>Entrega estimada</Typography>
//                   <Typography variant="body2" fontWeight={600}>
//                     {requestDto?.requestedDeliveryDate ? dayjs(requestDto.requestedDeliveryDate).format("DD [de] MMMM, YYYY") : "—"}
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Stack>
//           </Box>

//           <Box sx={{ display: "flex", gap: 1.5, mb: 3, flexWrap: "wrap" }}>
//             {(["MATERIAL", "EQUIPMENT", "TOOL", "EPP"] as const)
//               .filter(tipo => selectedItems.some(i => i.productType === tipo))
//               .map(tipo => {
//                 const cfg      = productoConfig[tipo];
//                 const count    = selectedItems.filter(i => i.productType === tipo).length;
//                 const urgentes = selectedItems.filter(i => i.productType === tipo && i.isUrgent).length;
//                 return (
//                   <Paper key={tipo} variant="outlined" sx={{ flex: "1 1 90px", p: 1.5, borderRadius: 2, textAlign: "center", border: `1px solid ${cfg.color}30` }}>
//                     <Typography variant="h5" fontWeight={800} sx={{ color: cfg.color }}>{count}</Typography>
//                     <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">{cfg.icon} {cfg.label}{count > 1 ? "s" : ""}</Typography>
//                     {urgentes > 0 && <Chip label={`${urgentes} urg.`} size="small" color="error" sx={{ mt: 0.5, height: 18, fontSize: "0.62rem", fontWeight: 700 }} />}
//                   </Paper>
//                 );
//               })}
//           </Box>

//           {selectedItems.filter(i => i.isUrgent).length > 0 && (
//             <Alert severity="error" icon={<ReportProblemOutlined />} sx={{ borderRadius: 2, mb: 2 }}>
//               <Typography variant="body2" fontWeight={700} mb={0.5}>Productos críticos incluidos:</Typography>
//               {selectedItems.filter(i => i.isUrgent).map(item => (
//                 <Typography key={item.inventoryId} variant="caption" display="block" color="text.secondary">
//                   • {item.itemCode} — {item.description || item.itemName} (actual: {item.quantityAvailable} / solicitar: {item.requestedQuantity})
//                 </Typography>
//               ))}
//             </Alert>
//           )}

//           <Alert severity="warning" icon={<WarningAmberOutlined />} sx={{ borderRadius: 2, fontWeight: 500 }}>
//             Al confirmar, se enviará el POST a <strong>/api/hub-supply/supply-request</strong> y la solicitud quedará registrada.
//           </Alert>
//         </DialogContent>
//         <DialogActions sx={{ p: 3, bgcolor: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
//           <ButtonBase label="Regresar" onClick={() => setConfirmDialogOpen(false)} disabled={submitting}
//             sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1" }}
//           />
//           <ButtonBase
//             label={submitting ? "Enviando al servidor..." : "Confirmar y Registrar"}
//             startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <CheckCircleOutline />}
//             onClick={handleAprobarSolicitud}
//             disabled={submitting}
//             sx={{ px: 4, background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)", boxShadow: "0 4px 14px rgba(37,99,235,0.3)" }}
//           />
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }


"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Box, Card, Typography, Divider, Alert, Fade, Collapse, Chip,
  CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Stack, Paper, Tooltip, LinearProgress, TextField, Stepper,
  Step, StepLabel,
} from "@mui/material";
import {
  CheckCircleOutline, WarningAmberOutlined, SearchOutlined, Close,
  SendOutlined, AssignmentOutlined, EventOutlined, TableChartOutlined,
  ErrorOutlined, CheckCircle, AddCircleOutline, ListAltOutlined,
  TrendingDownOutlined, ReportProblemOutlined, LocalShippingOutlined,
  BarChartOutlined, RefreshOutlined, ShoppingCartOutlined, CancelOutlined,
  AutorenewOutlined, InfoOutlined, StorageOutlined, ThumbUpOutlined,
  HourglassEmptyOutlined,
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

// ── Lo que devuelve el GET /api/hub-inventory ─────────────────────────────────
interface HubInventoryItem {
  id: number;
  tenantId: number;
  hubId: number;
  itemId: number;
  itemCode: string;
  itemName: string;
  description: string;
  productType: "MATERIAL" | "TOOL" | "EQUIPMENT" | "EPP";
  supplySource: string;
  quantityAvailable: number;
  quantityReserved: number;
  quantityInTransit: number;
  averageCost: number | null;
  totalValue: number | null;
  minimumStock: number;
  reorderPoint: number | null;
  maximumStock: number | null;
  avgAgingDays: number | null;
  locationCode: string | null;
  lastMovementDate: string | null;
  uom?: string;
}

// ── Ítem que el usuario selecciona para reestoquear ───────────────────────────
interface SelectedItemForRequest {
  inventoryId: number;
  itemId: number;
  itemCode: string;
  itemName: string;
  description: string;
  productType: string;
  quantityAvailable: number;
  minimumStock: number;
  requestedQuantity: number;
  isUrgent: boolean;
  semaforo: SemaforoColor;
}

// ── Lo que devuelve el POST (DRAFT) ───────────────────────────────────────────
// Necesitamos los id de cada ítem para el PUT de aprobación
interface DraftItemDto {
  id: number;           // supply_request_item.id — necesario para el PUT
  itemId: number;
  itemCode: string;
  itemName: string;
  itemDescription: string;
  productType: string;
  requestedQuantity: number;
  approvedQuantity: number | null;
}

interface DraftResponseDto {
  id: number;
  requestNumber: string;
  status: string;
  items: DraftItemDto[];
  totalItemsCount: number;
  requestedDeliveryDate: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getSemaforo = (item: HubInventoryItem): SemaforoColor => {
  const qty = item.quantityAvailable;
  if (qty <= 0) return "GRIS";
  if (qty <= item.minimumStock) return "ROJO";
  if (item.reorderPoint && qty <= item.reorderPoint) return "AMARILLO";
  return "VERDE";
};

const semaforoConfig: Record<
  SemaforoColor,
  { color: string; bg: string; label: string; border: string; pulse?: boolean }
> = {
  ROJO:     { color: "#dc2626", bg: "#fef2f2", label: "Crítico",   border: "#fecaca", pulse: true },
  AMARILLO: { color: "#d97706", bg: "#fffbeb", label: "Alerta",    border: "#fde68a" },
  VERDE:    { color: "#16a34a", bg: "#f0fdf4", label: "Normal",    border: "#bbf7d0" },
  GRIS:     { color: "#475569", bg: "#f1f5f9", label: "Sin Stock", border: "#cbd5e1", pulse: true },
};

const productoConfig: Record<
  string,
  { label: string; color: string; icon: string; bgLight: string }
> = {
  MATERIAL:  { label: "Material",    color: "#ea580c", icon: "📦", bgLight: "#fff7ed" },
  TOOL:      { label: "Herramienta", color: "#1d4ed8", icon: "🔧", bgLight: "#eff6ff" },
  EQUIPMENT: { label: "Equipo",      color: "#15803d", icon: "⚙️", bgLight: "#f0fdf4" },
  EPP:       { label: "EPP",         color: "#7c3aed", icon: "🦺", bgLight: "#faf5ff" },
};

const TENANT_ID  = 1;
const HUB_ID     = 1;
const PROJECT_ID = 1;
const USER_ID    = 1;
const PAGE_SIZE  = 15;

// ─── Componente ───────────────────────────────────────────────────────────────

export default function InventarioHub() {
  const topRef = useRef<HTMLDivElement>(null);

  // ── Estado principal ──────────────────────────────────────────────────
  const [modo, setModo]                   = useState<Modo>("consulta");
  const [filterType, setFilterType]       = useState<string>("ALL");
  const [search, setSearch]               = useState("");
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const rowsRef = useRef<HubInventoryItem[]>([]);

  const [metricas, setMetricas] = useState({ ROJO: 0, AMARILLO: 0, VERDE: 0, GRIS: 0 });

  // ── Selección ────────────────────────────────────────────────────────
  const [selectedIds, setSelectedIds]     = useState<Set<number>>(new Set());
  const [selectedItems, setSelectedItems] = useState<SelectedItemForRequest[]>([]);

  // ── Flujo 2 pasos ─────────────────────────────────────────────────────
  //
  //  PASO 1: POST /api/hub-inventory/supply-request
  //    → Crea la solicitud en estado DRAFT
  //    → Devuelve DraftResponseDto con los items[].id reales del backend
  //
  //  PASO 2: PUT /api/hub-inventory/supply-request/{id}
  //    → Aprueba la solicitud usando los items[].id del DRAFT
  //    → Body: InventoryApproveDto con SupplyRequestItemUpdateDto[]
  //
  const [creatingDraft, setCreatingDraft]   = useState(false);
  const [approvingDraft, setApprovingDraft] = useState(false);

  // El modal tiene 2 steps: 0 = revisión pre-POST, 1 = revisión pre-PUT (aprobación)
  const [dialogOpen, setDialogOpen]     = useState(false);
  const [dialogStep, setDialogStep]     = useState<0 | 1>(0);
  const [draftResponse, setDraftResponse] = useState<DraftResponseDto | null>(null);

  // Estado éxito final (tras el PUT)
  const [showSuccess, setShowSuccess]   = useState(false);
  const [submittedInfo, setSubmittedInfo] = useState<DraftResponseDto | null>(null);

  // ── Debounce ──────────────────────────────────────────────────────────
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => setDebouncedSearch(search), 380);
    return () => { if (searchTimer.current) clearTimeout(searchTimer.current); };
  }, [search]);

  useEffect(() => {
    setReloadTrigger((t) => t + 1);
  }, [filterType, debouncedSearch]);

  useEffect(() => {
    if (showSuccess) {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showSuccess]);

  // ── fetchData server-side ─────────────────────────────────────────────
  const fetchData = useCallback(
    async (p: number, _size: number, _search: string) => {
      const params = new URLSearchParams({
        tenantId: String(TENANT_ID),
        hubId:    String(HUB_ID),
        page:     String(p),
        size:     String(PAGE_SIZE),
        ...(filterType !== "ALL"   ? { productType: filterType }         : {}),
        ...(debouncedSearch.trim() ? { search: debouncedSearch.trim() }  : {}),
      });

      const res = await fetch(`${API_URL}/api/hub-inventory?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: any = await res.json();

      const rows: HubInventoryItem[] = data.data.content ?? [];
      rowsRef.current = rows;

      setMetricas({
        ROJO:     rows.filter((i) => getSemaforo(i) === "ROJO").length,
        AMARILLO: rows.filter((i) => getSemaforo(i) === "AMARILLO").length,
        VERDE:    rows.filter((i) => getSemaforo(i) === "VERDE").length,
        GRIS:     rows.filter((i) => getSemaforo(i) === "GRIS").length,
      });

      const total =
        data.data.page?.totalElements ??
        data.data.totalElements ??
        rows.length;
      setTotalElements(total);
      return { rows, total };
    },
    [filterType, debouncedSearch]
  );

  // ── buildSelectedItem ─────────────────────────────────────────────────
  const buildSelectedItem = (i: HubInventoryItem): SelectedItemForRequest => {
    const sem     = getSemaforo(i);
    const deficit = Math.max(i.minimumStock - i.quantityAvailable, 0);
    return {
      inventoryId:       i.id,
      itemId:            i.itemId,
      itemCode:          i.itemCode,
      itemName:          i.itemName,
      description:       i.description ?? i.itemName,
      productType:       i.productType,
      quantityAvailable: i.quantityAvailable,
      minimumStock:      i.minimumStock,
      requestedQuantity: deficit > 0 ? deficit : i.minimumStock,
      isUrgent:          sem === "ROJO" || sem === "GRIS",
      semaforo:          sem,
    };
  };

  // ── Activar modo reestoqueo ───────────────────────────────────────────
  const activarModoReestoqueo = () => {
    const criticos = rowsRef.current.filter((i) => {
      const s = getSemaforo(i);
      return s === "ROJO" || s === "GRIS";
    });
    setModo("reestoqueo");
    setSelectedIds(new Set(criticos.map((i) => i.id)));
    setSelectedItems(criticos.map(buildSelectedItem));
    setTimeout(
      () => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      100
    );
  };

  const cancelarReestoqueo = () => {
    setModo("consulta");
    setSelectedIds(new Set());
    setSelectedItems([]);
    setDraftResponse(null);
    setDialogStep(0);
  };

  // ── Handlers selección ────────────────────────────────────────────────
  const handleCheckOne = useCallback((id: number | string, checked: boolean) => {
    const numId = Number(id);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      checked ? next.add(numId) : next.delete(numId);
      return next;
    });
    setSelectedItems((prev) => {
      if (!checked) return prev.filter((s) => s.inventoryId !== numId);
      const item = rowsRef.current.find((i) => i.id === numId);
      if (!item || prev.some((s) => s.inventoryId === numId)) return prev;
      return [...prev, buildSelectedItem(item)];
    });
  }, []);

  const handleCheckAll = useCallback(
    (checked: boolean, visibleIds: (number | string)[]) => {
      const numIds = visibleIds.map(Number);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        numIds.forEach((id) => (checked ? next.add(id) : next.delete(id)));
        return next;
      });
      setSelectedItems((prev) => {
        if (!checked) return prev.filter((s) => !numIds.includes(s.inventoryId));
        const existing = new Set(prev.map((s) => s.inventoryId));
        const nuevos = rowsRef.current
          .filter((r) => numIds.includes(r.id) && !existing.has(r.id))
          .map(buildSelectedItem);
        return [...prev, ...nuevos];
      });
    },
    []
  );

  // ── Edición cantidad en carrito ───────────────────────────────────────
  const updateRequestedQty = (inventoryId: number, rawValue: string) => {
    const parsed = parseInt(rawValue, 10);
    const qty    = isNaN(parsed) ? 0 : Math.max(0, parsed);
    setSelectedItems((prev) =>
      prev.map((i) =>
        i.inventoryId === inventoryId
          ? { ...i, requestedQuantity: qty, _rawQty: rawValue } as any
          : i
      )
    );
  };

  // ─────────────────────────────────────────────────────────────────────
  // PASO 1 — Abrir modal pre-revisión (sin llamar al backend aún)
  // ─────────────────────────────────────────────────────────────────────
  const handleAbrirDialogo = () => {
    if (selectedItems.length === 0) {
      toast.warning("Selecciona al menos un producto");
      return;
    }
    const sinCantidad = selectedItems.filter((i) => i.requestedQuantity < 1);
    if (sinCantidad.length > 0) {
      toast.warning(
        `${sinCantidad.length} producto(s) tienen cantidad 0. Ingresa al menos 1.`
      );
      return;
    }
    // Abre el modal en step 0 (revisión pre-POST)
    setDialogStep(0);
    setDraftResponse(null);
    setDialogOpen(true);
  };

  // ─────────────────────────────────────────────────────────────────────
  // PASO 1 — POST: crear solicitud en DRAFT
  // Body → InventorySupplyRequestDto
  // ─────────────────────────────────────────────────────────────────────
  const handleCrearDraft = async () => {
    setCreatingDraft(true);
    try {
      const body = {
        tenantId:              TENANT_ID,
        hubId:                 HUB_ID,
        projectId:             PROJECT_ID,
        requestedBy:           USER_ID,
        requestedDeliveryDate: dayjs().format("YYYY-MM-DD"),
        periodValueEntrega:    dayjs().format("YYYY-MM-DD"),
        origin:                "INVENTORY",
        // InventorySupplyItemDto[]
        items: selectedItems.map((item) => ({
          itemId:            item.itemId,
          itemCode:          item.itemCode,
          itemName:          item.description,
          itemDescription:   item.description,
          productType:       item.productType,
          requestedQuantity: item.requestedQuantity,
          deliveredQuantity: 0,
          pendingQuantity:   0,
        })),
      };

      const res = await fetch(`${API_URL}/api/hub-inventory/supply-request`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(body),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message ?? `Error ${res.status}`);
      }

      const created = await res.json();
      // El backend devuelve el DRAFT con items[].id reales
      const draft: DraftResponseDto = {
        id:                   created?.data?.id,
        requestNumber:        created?.data?.requestNumber,
        status:               created?.data?.status ?? "DRAFT",
        items:                created?.data?.items   ?? [],
        totalItemsCount:      created?.data?.totalItemsCount ?? selectedItems.length,
        requestedDeliveryDate: created?.data?.requestedDeliveryDate ?? dayjs().format("YYYY-MM-DD"),
      };

      setDraftResponse(draft);
      // Avanzar al step 1 (revisión pre-PUT/aprobación)
      setDialogStep(1);
      toast.info(`Borrador ${draft.requestNumber} creado — revisa y aprueba`);
    } catch (err: any) {
      toast.error(`Error al crear borrador: ${err.message}`);
    } finally {
      setCreatingDraft(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────
  // PASO 2 — PUT: aprobar la solicitud DRAFT
  // Body → InventoryApproveDto con SupplyRequestItemUpdateDto[]
  // ─────────────────────────────────────────────────────────────────────
  const handleAprobarDraft = async () => {
    if (!draftResponse) return;
    setApprovingDraft(true);
    try {
      // Construimos SupplyRequestItemUpdateDto[] usando los id reales del DRAFT
      const itemUpdates = draftResponse.items.map((draftItem) => {
        // Buscamos la cantidad que el usuario configuró en el carrito
        const sel = selectedItems.find(
          (s) => s.itemId === draftItem.itemId
        );
        return {
          id:                draftItem.id,          // ← id real del supply_request_item
          requestedQuantity: sel?.requestedQuantity ?? draftItem.requestedQuantity,
          approvedQuantity:  sel?.requestedQuantity ?? draftItem.requestedQuantity,
          unitPrice:         null,
          priority:          null,
          isUrgent:          sel?.isUrgent ?? false,
          specifications:    null,
        };
      });

      // InventoryApproveDto
      const body = {
        id:                   draftResponse.id,
        tenantId:             TENANT_ID,
        hubId:                HUB_ID,
        projectId :           PROJECT_ID,
        requestNumber:        draftResponse.requestNumber,
        status:               "APPROVED",
        approvedBy:           USER_ID,   // @NotNull
        updatedBy:            USER_ID,
        origin:               "INVENTORY", // @NotNull
        requestedDeliveryDate: draftResponse.requestedDeliveryDate,
        notes:                null,
        justification:        null,
        suggestedSupplierId:  null,
        items:                itemUpdates,
      };

      const res = await fetch(
        `${API_URL}/api/hub-inventory/supply-request/${draftResponse.id}`,
        {
          method:  "PUT",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message ?? `Error ${res.status}`);
      }

      const approved = await res.json();

      setSubmittedInfo({
        ...draftResponse,
        id:            approved?.data?.id            ?? draftResponse.id,
        requestNumber: approved?.data?.requestNumber ?? draftResponse.requestNumber,
        status:        approved?.data?.status        ?? "APPROVED",
      });

      setDialogOpen(false);
      setShowSuccess(true);
      cancelarReestoqueo();
      setReloadTrigger((t) => t + 1);
      toast.success("Solicitud aprobada y registrada correctamente");
    } catch (err: any) {
      toast.error(`Error al aprobar: ${err.message}`);
    } finally {
      setApprovingDraft(false);
    }
  };

  const necesitanReestoqueo = metricas.ROJO + metricas.GRIS;

  // ── Columnas DataGrid principal ───────────────────────────────────────
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
              ...(cfg.pulse && {
                animation: "semPulse 1.6s ease-in-out infinite",
                "@keyframes semPulse": {
                  "0%, 100%": { boxShadow: `0 0 0 0 ${cfg.color}60` },
                  "50%":      { boxShadow: `0 0 0 5px ${cfg.color}00` },
                },
              }),
            }} />
            <Typography variant="caption" fontWeight={700} sx={{ color: cfg.color }}>
              {cfg.label}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "itemCode", headerName: "Código", width: 125,
      renderCell: (p) => {
        const cfg = productoConfig[p.row.productType] ?? productoConfig.MATERIAL;
        return (
          <Chip label={p.value} size="small"
            sx={{ bgcolor: cfg.color, color: "white", fontWeight: 700, fontSize: "0.7rem", letterSpacing: 0.3 }}
          />
        );
      },
    },
    {
      field: "description", headerName: "Descripción", flex: 2, minWidth: 300,
      renderCell: (p) => (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
          <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.3 }}>
            {p.value || p.row.itemName}
          </Typography>
          {p.row.locationCode && (
            <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.68rem" }}>
              📍 {p.row.locationCode}
            </Typography>
          )}
        </Box>
      ),
    },
    {
      field: "productType", headerName: "Tipo", width: 130,
      renderCell: (p) => {
        const cfg = productoConfig[p.value] ?? productoConfig.MATERIAL;
        return (
          <Chip label={`${cfg.icon} ${cfg.label}`} size="small" variant="outlined"
            sx={{ borderColor: cfg.color, color: cfg.color, fontWeight: 600, fontSize: "0.72rem" }}
          />
        );
      },
    },
    {
      field: "quantityAvailable", headerName: "Disponible", width: 120,
      align: "center", headerAlign: "center",
      renderCell: (p) => {
        const sem = getSemaforo(p.row);
        const cfg = semaforoConfig[sem];
        const pct = Math.min((p.value / (p.row.maximumStock || 100)) * 100, 100);
        return (
          <Box sx={{ width: "100%", px: 0.5 }}>
            <Typography variant="body2" fontWeight={800}
              sx={{ color: cfg.color, textAlign: "center", lineHeight: 1 }}
            >
              {p.value}
            </Typography>
            <LinearProgress variant="determinate" value={pct} sx={{
              height: 4, borderRadius: 2, mt: 0.5,
              bgcolor: `${cfg.color}20`,
              "& .MuiLinearProgress-bar": { bgcolor: cfg.color, borderRadius: 2 },
            }} />
          </Box>
        );
      },
    },
    {
      field: "minimumStock", headerName: "Mínimo", width: 90,
      align: "center", headerAlign: "center",
      renderCell: (p) => (
        <Typography variant="body2" color="text.secondary" fontWeight={600}>{p.value}</Typography>
      ),
    },
    {
      field: "maximumStock", headerName: "Máximo", width: 90,
      align: "center", headerAlign: "center",
      renderCell: (p) => (
        <Typography variant="body2" color="text.secondary" fontWeight={600}>{p.value ?? "—"}</Typography>
      ),
    },
    {
      field: "quantityReserved", headerName: "Reservado", width: 90,
      align: "center", headerAlign: "center",
      renderCell: (p) => (
        <Typography variant="body2" color="text.secondary" fontWeight={600}>{p.value ?? "—"}</Typography>
      ),
    },
    {
      field: "reorderPoint", headerName: "Reorden", width: 90,
      align: "center", headerAlign: "center",
      renderCell: (p) => (
        <Typography variant="body2" color="text.disabled">{p.value ?? "—"}</Typography>
      ),
    },
    {
      field: "quantityInTransit", headerName: "En Tránsito", width: 115,
      align: "center", headerAlign: "center",
      renderCell: (p) =>
        p.value > 0 ? (
          <Chip label={p.value} size="small"
            icon={<LocalShippingOutlined sx={{ fontSize: "13px !important" }} />}
            sx={{ bgcolor: "#e0f2fe", color: "#0369a1", fontWeight: 700, fontSize: "0.7rem" }}
          />
        ) : (
          <Typography variant="body2" color="text.disabled">—</Typography>
        ),
    },
    {
      field: "lastMovementDate", headerName: "Últ. Mov.", width: 130,
      renderCell: (p) => (
        <Typography variant="caption" color="text.secondary">
          {p.value ? dayjs(p.value).format("DD/MM/YYYY") : "—"}
        </Typography>
      ),
    },
  ];

  // ── Columnas carrito ──────────────────────────────────────────────────
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
        return (
          <Chip label={p.value} size="small"
            sx={{ bgcolor: cfg.color, color: "white", fontWeight: 700, fontSize: "0.7rem" }}
          />
        );
      },
    },
    {
      field: "description", headerName: "Descripción", flex: 2, minWidth: 180,
      renderCell: (p) => (
        <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.3 }}>
          {p.value || p.row.itemName}
        </Typography>
      ),
    },
    {
      field: "quantityAvailable", headerName: "Actual", width: 75,
      align: "center", headerAlign: "center",
      renderCell: (p) => (
        <Typography variant="body2" fontWeight={700} color="error.main">{p.value}</Typography>
      ),
    },
    {
      field: "minimumStock", headerName: "Mínimo", width: 80,
      align: "center", headerAlign: "center",
      renderCell: (p) => (
        <Typography variant="body2" color="text.secondary">{p.value}</Typography>
      ),
    },
    {
      field: "requestedQuantity", headerName: "Solicitar", width: 130,
      align: "center", headerAlign: "center",
      renderCell: (p) => {
        const rawValue = (p.row as any)._rawQty ?? String(p.value === 0 ? "" : p.value);
        return (
          <Box sx={{ display: "flex" }}>
            <TextField
              type="number"
              size="small"
              value={rawValue}
              onChange={(e) => updateRequestedQty(p.row.inventoryId, e.target.value)}
              onBlur={(e) => {
                const val = parseInt(e.target.value, 10);
                if (isNaN(val) || val < 1) updateRequestedQty(p.row.inventoryId, "1");
              }}
              inputProps={{
                min: 1,
                style: { textAlign: "center", fontWeight: 700, padding: "6px 8px" },
              }}
              sx={{
                width: 90,
                "& .MuiOutlinedInput-root": { borderRadius: 1.5, fontSize: "0.85rem" },
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": { display: "none" },
                "& input[type=number]": { MozAppearance: "textfield" },
              }}
            />
          </Box>
        );
      },
    },
    {
      field: "isUrgent", headerName: "Urgente", width: 85,
      align: "center", headerAlign: "center",
      renderCell: (p) =>
        p.value ? (
          <Chip label="SÍ" size="small" color="error" sx={{ fontWeight: 700, height: 20, fontSize: "0.68rem" }} />
        ) : (
          <Chip label="NO" size="small" variant="outlined" sx={{ fontWeight: 600, height: 20, fontSize: "0.68rem" }} />
        ),
    },
  ];

  // ─── RENDER ───────────────────────────────────────────────────────────
  return (
    <Box ref={topRef} sx={{ maxWidth: 1400, mx: "auto", p: 4, display: "flex", flexDirection: "column", gap: 3 }}>

      <TitleCard
        icon={<StorageOutlined sx={{ fontSize: 32 }} />}
        title="Inventario del Hub"
        description="Consulta el estado del inventario en tiempo real. Identifica productos críticos y genera solicitudes de reabastecimiento cuando lo necesites."
      />

      {/* ══ PANTALLA ÉXITO ══════════════════════════════════════════════════ */}
      <Fade in={showSuccess} timeout={700} unmountOnExit>
        <Box>
          <Card elevation={0} sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 60%, #f0fdf4 100%)",
            border: "2px solid #bbf7d0",
            p: { xs: 4, md: 6 },
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            <Box sx={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", bgcolor: "rgba(34,197,94,0.08)" }} />
            <Box sx={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", bgcolor: "rgba(34,197,94,0.06)" }} />
            <Box sx={{
              width: 100, height: 100, borderRadius: "50%", bgcolor: "#22c55e",
              mx: "auto", mb: 3, display: "flex", alignItems: "center", justifyContent: "center",
              animation: "pulseRing 2s ease-in-out infinite",
              "@keyframes pulseRing": {
                "0%, 100%": { boxShadow: "0 0 0 16px rgba(34,197,94,0.12), 0 0 0 32px rgba(34,197,94,0.06)" },
                "50%":      { boxShadow: "0 0 0 20px rgba(34,197,94,0.08), 0 0 0 40px rgba(34,197,94,0.03)" },
              },
            }}>
              <CheckCircleOutline sx={{ fontSize: 52, color: "white" }} />
            </Box>

            <Typography variant="h4" fontWeight={800} sx={{ color: "#15803d", mb: 1 }}>
              ¡Solicitud Aprobada con Éxito!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 480, mx: "auto" }}>
              La solicitud <strong>{submittedInfo?.requestNumber}</strong> fue creada y aprobada.
              Está lista para el proceso de abastecimiento.
            </Typography>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 4 }}>
              {[
                { label: "Nro. Solicitud",       value: submittedInfo?.requestNumber ?? "—", color: "#15803d" },
                { label: "Productos solicitados", value: `${submittedInfo?.items?.length ?? 0}`, color: "#0369a1" },
              ].map((card) => (
                <Paper key={card.label} elevation={0} sx={{
                  px: 3, py: 2.5, borderRadius: 3, border: "1px solid #bbf7d0",
                  bgcolor: "white", minWidth: 150, textAlign: "center",
                }}>
                  <Typography variant="h5" fontWeight={800} sx={{ color: card.color }}>
                    {card.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    {card.label}
                  </Typography>
                </Paper>
              ))}
              <Paper elevation={0} sx={{
                px: 3, py: 2.5, borderRadius: 3, border: "1px solid #bbf7d0",
                bgcolor: "white", minWidth: 150, textAlign: "center",
              }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 0.5 }}>
                  <Chip
                    label={submittedInfo?.status ?? "APPROVED"}
                    color="success"
                    sx={{ fontWeight: 800, borderRadius: 1 }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>Estado</Typography>
              </Paper>
            </Box>

            <Alert icon={<AssignmentOutlined />} severity="info"
              sx={{ borderRadius: 2, maxWidth: 520, mx: "auto", mb: 4 }}>
              La solicitud pasará al proceso de{" "}
              <strong>Recepción de Materiales</strong> una vez que el proveedor despache.
            </Alert>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
              <ButtonBase
                label="Volver al Inventario"
                startIcon={<RefreshOutlined />}
                onClick={() => { setShowSuccess(false); setReloadTrigger((t) => t + 1); }}
                sx={{ px: 4, py: 1.5, fontWeight: 700, boxShadow: "0 4px 12px rgba(34,197,94,0.3)", borderRadius: 2.5 }}
              />
              <ButtonBase
                label="Ver Solicitudes"
                variant="outlined"
                startIcon={<ListAltOutlined />}
                onClick={() => setShowSuccess(false)}
                sx={{ px: 4, py: 1.5, bgcolor: "white", color: "text.primary", border: "1px solid #cbd5e1", borderRadius: 2.5 }}
              />
            </Stack>
          </Card>
        </Box>
      </Fade>

      {/* ══ CONTENIDO PRINCIPAL ══════════════════════════════════════════════ */}
      <Fade in={!showSuccess} timeout={400} unmountOnExit>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

          {/* KPI Cards */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {(["ROJO", "AMARILLO", "VERDE", "GRIS"] as SemaforoColor[]).map((sem) => {
              const cfg   = semaforoConfig[sem];
              const count = metricas[sem];
              const iconMap: Record<SemaforoColor, React.ReactNode> = {
                ROJO:     <ReportProblemOutlined sx={{ fontSize: 20, color: cfg.color }} />,
                AMARILLO: <WarningAmberOutlined  sx={{ fontSize: 20, color: cfg.color }} />,
                VERDE:    <CheckCircle           sx={{ fontSize: 20, color: cfg.color }} />,
                GRIS:     <ErrorOutlined         sx={{ fontSize: 20, color: cfg.color }} />,
              };
              return (
                <Paper key={sem} variant="outlined" sx={{
                  flex: "1 1 150px", p: 2.5, borderRadius: 3, bgcolor: cfg.bg,
                  border: `1.5px solid ${cfg.border}`, transition: "all 0.2s",
                  "&:hover": { transform: "translateY(-2px)", boxShadow: `0 8px 24px ${cfg.color}20` },
                }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                    {iconMap[sem]}
                    <Box sx={{
                      width: 8, height: 8, borderRadius: "50%", bgcolor: cfg.color, opacity: 0.4,
                      ...(cfg.pulse && {
                        animation: "semPulse 1.6s ease-in-out infinite",
                        "@keyframes semPulse": {
                          "0%, 100%": { boxShadow: `0 0 0 0 ${cfg.color}60` },
                          "50%":      { boxShadow: `0 0 0 5px ${cfg.color}00` },
                        },
                      }),
                    }} />
                  </Box>
                  <Typography variant="h3" fontWeight={900} sx={{ color: cfg.color, lineHeight: 1 }}>
                    {count}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight={700}
                    sx={{ textTransform: "uppercase", letterSpacing: 0.7, fontSize: "0.68rem" }}
                  >
                    {cfg.label}
                  </Typography>
                </Paper>
              );
            })}
          </Box>

          {/* Banner reestoqueo activo */}
          <Collapse in={modo === "reestoqueo"}>
            <Card sx={{
              borderRadius: 3,
              background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)",
              p: 0, overflow: "hidden",
            }}>
              <Box sx={{ p: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ bgcolor: "rgba(255,255,255,0.15)", p: 1, borderRadius: 2, display: "flex" }}>
                    <ShoppingCartOutlined sx={{ color: "white", fontSize: 22 }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={800} color="white">
                      Modo Reestoqueo Activo
                    </Typography>
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.75)" }}>
                      Selecciona los productos que deseas reabastecer. Los críticos ya están pre-seleccionados.
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  {selectedIds.size > 0 && (
                    <Chip
                      label={`${selectedIds.size} seleccionado${selectedIds.size > 1 ? "s" : ""}`}
                      size="small"
                      sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white", fontWeight: 700 }}
                    />
                  )}
                  <ButtonBase
                    label="Cancelar"
                    startIcon={<CancelOutlined />}
                    onClick={cancelarReestoqueo}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.12)", color: "white",
                      border: "1px solid rgba(255,255,255,0.25)",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                    }}
                  />
                </Stack>
              </Box>
            </Card>
          </Collapse>

          {/* Panel filtros */}
          <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", overflow: "hidden" }}>
            <Box sx={{
              px: 3, py: 2.5, borderBottom: "1px solid", borderColor: "divider",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: 2, bgcolor: "#fafbfc",
            }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{
                  width: 4, height: 22,
                  bgcolor: modo === "reestoqueo" ? "#1d4ed8" : "primary.main",
                  borderRadius: 1, transition: "background 0.3s",
                }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight={800}>
                    {modo === "consulta" ? "Consulta de Inventario" : "Selección para Reestoqueo"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {modo === "consulta"
                      ? `${totalElements} productos en total`
                      : `${selectedIds.size} seleccionados`}
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={1.5} alignItems="center">
                {necesitanReestoqueo > 0 && modo === "consulta" && (
                  <Box
                    onClick={activarModoReestoqueo}
                    sx={{
                      display: "flex", alignItems: "center", gap: 1, px: 2, py: 0.8,
                      borderRadius: 2, bgcolor: "#fef2f2", border: "1px solid #fecaca",
                      cursor: "pointer", "&:hover": { bgcolor: "#fee2e2" },
                    }}
                  >
                    <Box sx={{
                      width: 8, height: 8, borderRadius: "50%", bgcolor: "#dc2626",
                      animation: "semPulse 1.6s ease-in-out infinite",
                      "@keyframes semPulse": {
                        "0%, 100%": { boxShadow: "0 0 0 0 #dc262660" },
                        "50%":      { boxShadow: "0 0 0 5px #dc262600" },
                      },
                    }} />
                    <Typography variant="caption" fontWeight={700} color="error.main">
                      {necesitanReestoqueo} producto{necesitanReestoqueo > 1 ? "s" : ""} requieren reestoqueo
                    </Typography>
                  </Box>
                )}

                <Tooltip title="Actualizar inventario">
                  <span>
                    <ButtonBase
                      label=""
                      startIcon={<RefreshOutlined />}
                      onClick={() => setReloadTrigger((t) => t + 1)}
                      variant="outlined"
                      sx={{ minWidth: 40, px: 1.5, bgcolor: "white", color: "text.secondary", border: "1px solid #e2e8f0" }}
                    />
                  </span>
                </Tooltip>

                {modo === "consulta" ? (
                  <ButtonBase
                    label="Reestoquear Inventario"
                    startIcon={<AutorenewOutlined />}
                    onClick={activarModoReestoqueo}
                    sx={{
                      px: 3, py: 1.2, fontWeight: 700, borderRadius: 2.5,
                      background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                      boxShadow: "0 4px 14px rgba(37,99,235,0.35)",
                      "&:hover": { transform: "translateY(-1px)", boxShadow: "0 8px 20px rgba(37,99,235,0.45)" },
                    }}
                  />
                ) : (
                  <ButtonBase
                    label={`Solicitar Reestoqueo (${selectedIds.size})`}
                    startIcon={<AddCircleOutline />}
                    onClick={handleAbrirDialogo}
                    disabled={selectedIds.size === 0}
                    sx={{
                      px: 3, py: 1.2, fontWeight: 700, borderRadius: 2.5,
                      background: selectedIds.size === 0
                        ? undefined
                        : "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                      boxShadow: selectedIds.size > 0 ? "0 4px 14px rgba(22,163,74,0.35)" : "none",
                    }}
                  />
                )}
              </Stack>
            </Box>

            {/* Filtros */}
            <Box sx={{ px: 3, py: 2, display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
              <Box sx={{ flex: "0 0 220px" }}>
                <SelectBase
                  label="Tipo de Producto"
                  size="small"
                  value={filterType}
                  onChange={(v) => setFilterType(String(v))}
                  options={[
                    { label: "Todos los productos", value: "ALL"       },
                    { label: "📦 Materiales",        value: "MATERIAL"  },
                    { label: "⚙️ Equipos",            value: "EQUIPMENT" },
                    { label: "🔧 Herramientas",       value: "TOOL"      },
                    { label: "🦺 EPP",               value: "EPP"       },
                  ]}
                  fullWidth
                />
              </Box>
              <Box sx={{ flex: 1, minWidth: 200 }}>
                <TextField
                  fullWidth size="small"
                  placeholder="Buscar por código o descripción..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchOutlined sx={{ mr: 1, color: "text.disabled", fontSize: 18 }} />,
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Box>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip label={`🔴 ${metricas.ROJO} Críticos`}     size="small" clickable
                  sx={{ fontWeight: 700, fontSize: "0.72rem", bgcolor: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}
                />
                <Chip label={`🟡 ${metricas.AMARILLO} En alerta`} size="small" clickable
                  sx={{ fontWeight: 700, fontSize: "0.72rem", bgcolor: "#fffbeb", color: "#d97706", border: "1px solid #fde68a" }}
                />
                {modo === "reestoqueo" && selectedIds.size > 0 && (
                  <Chip
                    label="Limpiar selección"
                    size="small"
                    clickable
                    icon={<Close sx={{ fontSize: "12px !important" }} />}
                    onClick={() => { setSelectedIds(new Set()); setSelectedItems([]); }}
                    sx={{ fontWeight: 600, fontSize: "0.72rem", bgcolor: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}
                  />
                )}
              </Stack>
            </Box>
          </Card>

          {/* DataGrid principal */}
          <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", p: 3 }}>
            <Box sx={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              mb: 2.5, flexWrap: "wrap", gap: 2,
            }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <BarChartOutlined sx={{ color: "#1976d2", fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={800}>
                    {modo === "consulta" ? "Estado General del Inventario" : "Selecciona los productos a reabastecer"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {modo === "reestoqueo"
                      ? "Marca los checkboxes → ajusta cantidades en el carrito → Solicitar Reestoqueo"
                      : "Vista de solo lectura — usa \"Reestoquear Inventario\" para iniciar una solicitud"}
                  </Typography>
                </Box>
              </Stack>
              {modo === "consulta" && metricas.ROJO > 0 && (
                <Alert severity="error" sx={{ borderRadius: 2, py: 0.5, px: 2, cursor: "pointer" }}
                  onClick={activarModoReestoqueo}>
                  <Typography variant="body2" fontWeight={700}>
                    {metricas.ROJO} producto{metricas.ROJO > 1 ? "s" : ""} en nivel crítico — Clic para reestoquear
                  </Typography>
                </Alert>
              )}
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
          </Card>

          {/* Carrito */}
          <Collapse in={modo === "reestoqueo" && selectedItems.length > 0} unmountOnExit>
            <Card elevation={4} sx={{
              borderRadius: 4, border: "2px solid #bfdbfe", overflow: "hidden",
              boxShadow: "rgba(37,99,235,0.18) 0px 8px 32px",
            }}>
              <Box sx={{ background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)", p: 3, color: "white" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 1, borderRadius: 2, display: "flex" }}>
                      <TrendingDownOutlined />
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={800}>Carrito de Reestoqueo</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.85 }}>
                        {selectedItems.length} producto(s) — Ajusta las cantidades si es necesario
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={1.5} flexWrap="wrap">
                    {selectedItems.filter((i) => i.isUrgent).length > 0 && (
                      <Chip
                        label={`${selectedItems.filter((i) => i.isUrgent).length} urgente${selectedItems.filter((i) => i.isUrgent).length > 1 ? "s" : ""}`}
                        size="small"
                        icon={<WarningAmberOutlined sx={{ fontSize: "14px !important", color: "white !important" }} />}
                        sx={{ bgcolor: "#ef4444", color: "white", fontWeight: 700 }}
                      />
                    )}
                    <Chip
                      label={`${selectedItems.reduce((s, i) => s + (i.requestedQuantity || 0), 0)} unidades`}
                      size="small"
                      sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white", fontWeight: 700 }}
                    />
                  </Stack>
                </Box>
              </Box>

              <Box sx={{ p: 3 }}>
                <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
                  {(["MATERIAL", "EQUIPMENT", "TOOL", "EPP"] as const)
                    .filter((tipo) => selectedItems.some((i) => i.productType === tipo))
                    .map((tipo) => {
                      const cfg   = productoConfig[tipo];
                      const count = selectedItems.filter((i) => i.productType === tipo).length;
                      return (
                        <Paper key={tipo} variant="outlined" sx={{
                          flex: "1 1 120px", p: 2, borderRadius: 2, textAlign: "center",
                          border: `1px solid ${cfg.color}30`, bgcolor: cfg.bgLight,
                        }}>
                          <Typography variant="h5" fontWeight={800} sx={{ color: cfg.color }}>{count}</Typography>
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>
                            {cfg.icon} {cfg.label}{count > 1 ? "s" : ""}
                          </Typography>
                        </Paper>
                      );
                    })}
                </Box>

                <CustomDataGrid
                  columns={columnsSelected}
                  localRows={selectedItems.map((i) => ({ ...i, id: i.inventoryId }))}
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
                    <Typography variant="caption" color="text.disabled">
                      Las cantidades cubren el déficit al stock mínimo por defecto
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <ButtonBase
                      label="Cancelar"
                      variant="outlined"
                      startIcon={<CancelOutlined />}
                      onClick={cancelarReestoqueo}
                      sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1" }}
                    />
                    <ButtonBase
                      label={`Solicitar Reestoqueo (${selectedItems.length})`}
                      startIcon={<AddCircleOutline />}
                      onClick={handleAbrirDialogo}
                      sx={{
                        px: 4, py: 1.5, fontWeight: 700, fontSize: "0.85rem", borderRadius: 2.5,
                        background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                        boxShadow: "0 8px 20px rgba(22,163,74,0.3)",
                        "&:hover": { transform: "translateY(-1px)", boxShadow: "0 12px 28px rgba(22,163,74,0.4)" },
                      }}
                    />
                  </Stack>
                </Box>
              </Box>
            </Card>
          </Collapse>

        </Box>
      </Fade>

      {/* ══════════════════════════════════════════════════════════════════════
          MODAL 2 PASOS
          Step 0: Revisión pre-POST  → "Crear Borrador"
          Step 1: Revisión pre-PUT   → "Aprobar Solicitud"
      ══════════════════════════════════════════════════════════════════════ */}
      <Dialog
        open={dialogOpen}
        onClose={() => {
          // No cerrar mientras hay requests en vuelo
          if (creatingDraft || approvingDraft) return;
          // Si estamos en step 1, el DRAFT ya existe — preguntar
          if (dialogStep === 1) {
            const ok = window.confirm(
              `El borrador ${draftResponse?.requestNumber} ya fue creado. ¿Deseas cancelar la aprobación?\n\nPuedes aprobarlo luego desde la lista de solicitudes.`
            );
            if (!ok) return;
          }
          setDialogOpen(false);
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, overflow: "hidden" } }}
      >
        {/* ── Header del modal ────────────────────────────────────────────── */}
        <DialogTitle sx={{ m: 0, p: 0 }}>
          <Box sx={{
            background: dialogStep === 0
              ? "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)"
              : "linear-gradient(135deg, #15803d 0%, #16a34a 100%)",
            p: 3, color: "white",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 0.8, borderRadius: 1.5, display: "flex" }}>
                {dialogStep === 0 ? <SendOutlined fontSize="small" /> : <ThumbUpOutlined fontSize="small" />}
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={800}>
                  {dialogStep === 0 ? "Confirmar Solicitud" : "Aprobar Solicitud"}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.85 }}>
                  {dialogStep === 0
                    ? "Paso 1 de 2 — Se creará la solicitud en estado BORRADOR"
                    : `Paso 2 de 2 — Aprobar ${draftResponse?.requestNumber}`}
                </Typography>
              </Box>
            </Stack>
            {!creatingDraft && !approvingDraft && (
              <IconButton
                onClick={() => {
                  if (dialogStep === 1) {
                    const ok = window.confirm(
                      `El borrador ${draftResponse?.requestNumber} ya existe. ¿Cerrar sin aprobar?`
                    );
                    if (!ok) return;
                  }
                  setDialogOpen(false);
                }}
                size="small"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                <Close fontSize="small" />
              </IconButton>
            )}
          </Box>

          {/* Stepper visual */}
          <Box sx={{ px: 3, pt: 2, pb: 1, bgcolor: "#fafafa" }}>
            <Stepper activeStep={dialogStep} alternativeLabel>
              <Step completed={dialogStep > 0}>
                <StepLabel
                  StepIconProps={{
                    sx: {
                      "&.Mui-completed": { color: "#16a34a" },
                      "&.Mui-active":    { color: "#1d4ed8" },
                    },
                  }}
                >
                  <Typography variant="caption" fontWeight={700}>Crear Borrador</Typography>
                </StepLabel>
              </Step>
              <Step>
                <StepLabel
                  StepIconProps={{
                    sx: { "&.Mui-active": { color: "#16a34a" } },
                  }}
                >
                  <Typography variant="caption" fontWeight={700}>Aprobar</Typography>
                </StepLabel>
              </Step>
            </Stepper>
          </Box>
        </DialogTitle>

        {/* ── Contenido ────────────────────────────────────────────────────── */}
        <DialogContent sx={{ p: 3, mt: 0 }}>

          {/* STEP 0: pre-POST — resumen de lo que se va a enviar */}
          {dialogStep === 0 && (
            <Box>
              <Box sx={{ p: 2.5, bgcolor: "#f8fafc", borderRadius: 2, mb: 3, border: "1px solid #e2e8f0" }}>
                <Stack spacing={2} divider={<Divider />}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <TableChartOutlined color="action" fontSize="small" />
                    <Box>
                      <Typography variant="caption" display="block" color="text.secondary"
                        sx={{ textTransform: "uppercase", fontWeight: 700 }}>
                        Productos seleccionados
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {selectedItems.length} productos —{" "}
                        {selectedItems.reduce((s, i) => s + (i.requestedQuantity || 0), 0)} unidades totales
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <EventOutlined color="action" fontSize="small" />
                    <Box>
                      <Typography variant="caption" display="block" color="text.secondary"
                        sx={{ textTransform: "uppercase", fontWeight: 700 }}>
                        Entrega estimada
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {dayjs().add(7, "day").format("DD [de] MMMM, YYYY")}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <HourglassEmptyOutlined color="action" fontSize="small" />
                    <Box>
                      <Typography variant="caption" display="block" color="text.secondary"
                        sx={{ textTransform: "uppercase", fontWeight: 700 }}>
                        Estado inicial
                      </Typography>
                      <Chip label="DRAFT" size="small" variant="outlined"
                        sx={{ fontWeight: 700, borderColor: "#d97706", color: "#d97706" }}
                      />
                    </Box>
                  </Stack>
                </Stack>
              </Box>

              {/* Desglose por tipo */}
              <Box sx={{ display: "flex", gap: 1.5, mb: 3, flexWrap: "wrap" }}>
                {(["MATERIAL", "EQUIPMENT", "TOOL", "EPP"] as const)
                  .filter((tipo) => selectedItems.some((i) => i.productType === tipo))
                  .map((tipo) => {
                    const cfg      = productoConfig[tipo];
                    const count    = selectedItems.filter((i) => i.productType === tipo).length;
                    const urgentes = selectedItems.filter((i) => i.productType === tipo && i.isUrgent).length;
                    return (
                      <Paper key={tipo} variant="outlined" sx={{
                        flex: "1 1 90px", p: 1.5, borderRadius: 2, textAlign: "center",
                        border: `1px solid ${cfg.color}30`,
                      }}>
                        <Typography variant="h5" fontWeight={800} sx={{ color: cfg.color }}>{count}</Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">
                          {cfg.icon} {cfg.label}{count > 1 ? "s" : ""}
                        </Typography>
                        {urgentes > 0 && (
                          <Chip label={`${urgentes} urg.`} size="small" color="error"
                            sx={{ mt: 0.5, height: 18, fontSize: "0.62rem", fontWeight: 700 }}
                          />
                        )}
                      </Paper>
                    );
                  })}
              </Box>

              {selectedItems.filter((i) => i.isUrgent).length > 0 && (
                <Alert severity="error" icon={<ReportProblemOutlined />} sx={{ borderRadius: 2, mb: 2 }}>
                  <Typography variant="body2" fontWeight={700} mb={0.5}>
                    Productos críticos incluidos:
                  </Typography>
                  {selectedItems.filter((i) => i.isUrgent).map((item) => (
                    <Typography key={item.inventoryId} variant="caption" display="block" color="text.secondary">
                      • {item.itemCode} — {item.description || item.itemName} (actual: {item.quantityAvailable} / solicitar: {item.requestedQuantity})
                    </Typography>
                  ))}
                </Alert>
              )}

              <Alert severity="info" icon={<InfoOutlined />} sx={{ borderRadius: 2 }}>
                Se enviará{" "}
                <strong>POST /api/hub-inventory/supply-request</strong>.{" "}
                La solicitud quedará en estado <strong>DRAFT</strong>.
                En el siguiente paso podrás aprobarla.
              </Alert>
            </Box>
          )}

          {/* STEP 1: pre-PUT — resumen del DRAFT creado + aprobación */}
          {dialogStep === 1 && draftResponse && (
            <Box>
              {/* Banner verde: borrador creado */}
              <Box sx={{
                p: 2, mb: 3, borderRadius: 2,
                bgcolor: "#f0fdf4", border: "1px solid #bbf7d0",
                display: "flex", alignItems: "center", gap: 2,
              }}>
                <CheckCircle sx={{ color: "#16a34a", fontSize: 28 }} />
                <Box>
                  <Typography variant="body2" fontWeight={700} sx={{ color: "#15803d" }}>
                    Borrador creado exitosamente
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Número: <strong>{draftResponse.requestNumber}</strong> — ID interno: {draftResponse.id}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ p: 2.5, bgcolor: "#f8fafc", borderRadius: 2, mb: 3, border: "1px solid #e2e8f0" }}>
                <Stack spacing={2} divider={<Divider />}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <AssignmentOutlined color="action" fontSize="small" />
                    <Box>
                      <Typography variant="caption" display="block" color="text.secondary"
                        sx={{ textTransform: "uppercase", fontWeight: 700 }}>
                        Número de Solicitud
                      </Typography>
                      <Typography variant="body1" fontWeight={800} color="primary.main">
                        {draftResponse.requestNumber}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <TableChartOutlined color="action" fontSize="small" />
                    <Box>
                      <Typography variant="caption" display="block" color="text.secondary"
                        sx={{ textTransform: "uppercase", fontWeight: 700 }}>
                        Ítems en el borrador
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {draftResponse.items.length} productos —{" "}
                        {selectedItems.reduce((s, i) => s + (i.requestedQuantity || 0), 0)} unidades
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <ThumbUpOutlined color="action" fontSize="small" />
                    <Box>
                      <Typography variant="caption" display="block" color="text.secondary"
                        sx={{ textTransform: "uppercase", fontWeight: 700 }}>
                        Acción a ejecutar
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip label="DRAFT" size="small" variant="outlined"
                          sx={{ fontWeight: 700, borderColor: "#d97706", color: "#d97706" }}
                        />
                        <Typography variant="caption">→</Typography>
                        <Chip label="APPROVED" size="small" color="success"
                          sx={{ fontWeight: 700 }}
                        />
                      </Stack>
                    </Box>
                  </Stack>
                </Stack>
              </Box>

              <Alert severity="warning" icon={<WarningAmberOutlined />} sx={{ borderRadius: 2 }}>
                Al confirmar se enviará{" "}
                <strong>PUT /api/hub-inventory/supply-request/{draftResponse.id}</strong>{" "}
                y la solicitud cambiará a estado <strong>APPROVED</strong>.
              </Alert>
            </Box>
          )}
        </DialogContent>

        {/* ── Footer del modal ──────────────────────────────────────────────── */}
        <DialogActions sx={{ p: 3, bgcolor: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
          {/* Step 0 → botones: Cancelar | Crear Borrador */}
          {dialogStep === 0 && (
            <>
              <ButtonBase
                label="Cancelar"
                onClick={() => setDialogOpen(false)}
                disabled={creatingDraft}
                sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1" }}
              />
              <ButtonBase
                label={creatingDraft ? "Creando borrador..." : "Crear Borrador →"}
                startIcon={creatingDraft ? <CircularProgress size={18} color="inherit" /> : <SendOutlined />}
                onClick={handleCrearDraft}
                disabled={creatingDraft}
                sx={{
                  px: 4,
                  background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                  boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
                }}
              />
            </>
          )}

          {/* Step 1 → botones: Cerrar sin aprobar | Aprobar */}
          {dialogStep === 1 && (
            <>
              <ButtonBase
                label="Cerrar sin aprobar"
                onClick={() => {
                  const ok = window.confirm(
                    `El borrador ${draftResponse?.requestNumber} quedará pendiente. ¿Continuar?`
                  );
                  if (ok) { setDialogOpen(false); cancelarReestoqueo(); }
                }}
                disabled={approvingDraft}
                sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1" }}
              />
              <ButtonBase
                label={approvingDraft ? "Aprobando..." : "Aprobar Solicitud ✓"}
                startIcon={approvingDraft ? <CircularProgress size={18} color="inherit" /> : <ThumbUpOutlined />}
                onClick={handleAprobarDraft}
                disabled={approvingDraft}
                sx={{
                  px: 4,
                  background: "linear-gradient(135deg, #15803d 0%, #16a34a 100%)",
                  boxShadow: "0 4px 14px rgba(22,163,74,0.3)",
                }}
              />
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}