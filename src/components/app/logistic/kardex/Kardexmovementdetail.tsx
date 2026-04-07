// // "use client";

// // import { useState, useCallback, useEffect } from "react";
// // import {
// //   Box, Card, Typography, Stack, Divider,
// //   TextField, IconButton, CircularProgress,
// //   InputAdornment, Chip, Skeleton,
// // } from "@mui/material";
// // import {
// //   ArrowBackOutlined, TrendingUpOutlined, TrendingDownOutlined,
// //   SwapVertOutlined, LayersOutlined, CalendarTodayOutlined,
// //   ReceiptOutlined, BusinessOutlined, PersonOutlined, StoreOutlined,
// //   RefreshOutlined, SearchOutlined, CloseOutlined, QrCodeScannerOutlined,
// //   DownloadOutlined, StorageOutlined, InfoOutlined,
// //   InventoryOutlined,
// // } from "@mui/icons-material";
// // import { DataGrid, GridColDef } from "@mui/x-data-grid";
// // import SelectBase from "@/src/components/base/SelectBase";
// // import { API_URL } from "@/src/lib/config";
// // import dayjs from "dayjs";
// // import { toast } from "react-toastify";

// // // ─── Tipos ────────────────────────────────────────────────────────────────────

// // type ProductType = "MATERIAL" | "TOOL" | "EQUIPMENT" | "EPP";

// // export interface MovementHeader {
// //   id: number;
// //   movementCode?: string;
// //   movementType: string;
// //   subtype: string;
// //   movementDate: string;
// //   receptionDate?: string;
// //   guiaRemision?: string;
// //   ordenCompra?: string;
// //   almacenOrigen?: string;
// //   almacenDestino?: string;
// //   subAlmacenOrigen?: string;
// //   subAlmacenDestino?: string;
// //   proveedor?: string;
// //   cliente?: string;
// //   notes?: string;
// //   createdBy?: number;
// //   createdAt?: string;
// //   totalItems?: number;
// //   totalValue?: number;
// //   status?: string;
// // }

// // export interface MovementDetail {
// //   id: number;
// //   headerId: number;
// //   itemCode: string;
// //   itemDescription: string;
// //   description?: string;
// //   productType: ProductType;
// //   quantity: number;
// //   unitPrice?: number;
// //   serialNumber?: string;
// //   macAddress?: string;
// //   mtaMacAddress?: string;
// //   mtaMac?: string;
// //   unitAddress?: string;
// //   supplySource?: string;
// //   locationCode?: string;
// // }

// // // ─── Config visual ────────────────────────────────────────────────────────────

// // const FLUJO_CFG: Record<string, {
// //   color: string; bg: string; border: string;
// //   gradientFrom: string; gradientTo: string;
// //   icon: React.ReactNode; label: string;
// // }> = {
// //   ENTRY:    { color: "#059669", bg: "#f0fdf4", border: "#6ee7b7", gradientFrom: "#059669", gradientTo: "#34d399", icon: <TrendingUpOutlined   sx={{ fontSize: 18 }} />, label: "Entrada"       },
// //   EXIT:     { color: "#dc2626", bg: "#fff1f2", border: "#fca5a5", gradientFrom: "#dc2626", gradientTo: "#f87171", icon: <TrendingDownOutlined sx={{ fontSize: 18 }} />, label: "Salida"        },
// //   TRANSFER: { color: "#7c3aed", bg: "#faf5ff", border: "#c4b5fd", gradientFrom: "#7c3aed", gradientTo: "#a78bfa", icon: <SwapVertOutlined     sx={{ fontSize: 18 }} />, label: "Transferencia" },
// //   ENTRADA:      { color: "#059669", bg: "#f0fdf4", border: "#6ee7b7", gradientFrom: "#059669", gradientTo: "#34d399", icon: <TrendingUpOutlined sx={{ fontSize: 18 }} />, label: "Entrada" },
// //   SALIDA:       { color: "#dc2626", bg: "#fff1f2", border: "#fca5a5", gradientFrom: "#dc2626", gradientTo: "#f87171", icon: <TrendingDownOutlined sx={{ fontSize: 18 }} />, label: "Salida" },
// //   TRANSFERENCIA:{ color: "#7c3aed", bg: "#faf5ff", border: "#c4b5fd", gradientFrom: "#7c3aed", gradientTo: "#a78bfa", icon: <SwapVertOutlined sx={{ fontSize: 18 }} />, label: "Transferencia" },
// // };

// // const PRODUCT_CFG: Record<string, { label: string; emoji: string; color: string; bg: string; border: string }> = {
// //   MATERIAL:  { label: "Material",    emoji: "📦", color: "#92400e", bg: "#fffbeb", border: "#fde68a" },
// //   TOOL:      { label: "Herramienta", emoji: "🔧", color: "#1e3a8a", bg: "#eff6ff", border: "#bfdbfe" },
// //   EQUIPMENT: { label: "Equipo",      emoji: "⚙️", color: "#14532d", bg: "#f0fdf4", border: "#bbf7d0" },
// //   EPP:       { label: "EPP",         emoji: "🦺", color: "#4c1d95", bg: "#faf5ff", border: "#ddd6fe" },
// // };

// // const PAGE_SIZE_ITEMS = 25;

// // const getFlujo = (type: string) =>
// //   FLUJO_CFG[type] ?? { color: "#475569", bg: "#f8fafc", border: "#e2e8f0", gradientFrom: "#475569", gradientTo: "#94a3b8", icon: <LayersOutlined sx={{ fontSize: 18 }} />, label: type };

// // const formatDate  = (d?: string) => d ? dayjs(d).format("DD/MM/YYYY") : "—";
// // const formatMoney = (v?: number) => v != null && v > 0 ? `S/ ${v.toFixed(2)}` : "—";

// // // ─── Skeleton item ────────────────────────────────────────────────────────────

// // function RowSkeleton() {
// //   return (
// //     <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 1.5, py: 1, borderBottom: "1px solid #f1f5f9" }}>
// //       <Skeleton variant="rounded" width={28} height={28} sx={{ flexShrink: 0 }} />
// //       <Skeleton variant="text" width={90} height={13} />
// //       <Skeleton variant="text" width={180} height={13} sx={{ flex: 1 }} />
// //       <Skeleton variant="rounded" width={50} height={22} />
// //     </Box>
// //   );
// // }

// // // ─── KPI Card ─────────────────────────────────────────────────────────────────

// // function KpiCard({ label, value, accent }: { label: string; value: React.ReactNode; accent: string }) {
// //   return (
// //     <Box sx={{
// //       flex: "1 1 120px",
// //       px: 2, py: 1.5,
// //       borderRadius: 2,
// //       bgcolor: "white",
// //       border: "1px solid #f1f5f9",
// //       boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
// //     }}>
// //       <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", display: "block", mb: 0.3 }}>
// //         {label}
// //       </Typography>
// //       <Typography fontWeight={800} sx={{ color: accent, fontSize: "1.05rem", fontFamily: "monospace", lineHeight: 1.2 }}>
// //         {value}
// //       </Typography>
// //     </Box>
// //   );
// // }

// // // ─── InfoRow ──────────────────────────────────────────────────────────────────

// // function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
// //   if (!value || value === "—") return null;
// //   return (
// //     <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2, py: 0.9, borderBottom: "1px solid #f8fafc" }}>
// //       <Box sx={{ color: "#94a3b8", mt: 0.1, flexShrink: 0 }}>{icon}</Box>
// //       <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.7rem", flex: 1, lineHeight: 1.4 }}>{label}</Typography>
// //       <Typography variant="caption" fontWeight={700} sx={{ color: "#1e293b", fontSize: "0.75rem", textAlign: "right", lineHeight: 1.4 }}>{value}</Typography>
// //     </Box>
// //   );
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // COMPONENTE PRINCIPAL
// // // ─────────────────────────────────────────────────────────────────────────────

// // interface KardexMovementDetailProps {
// //   movement: MovementHeader;
// //   onBack: () => void;
// // }

// // export default function KardexMovementDetail({ movement, onBack }: KardexMovementDetailProps) {
// //   const flujo = getFlujo(movement.movementType);

// //   const [items,          setItems]          = useState<MovementDetail[]>([]);
// //   const [loadingItems,   setLoadingItems]   = useState(false);
// //   const [itemsLoaded,    setItemsLoaded]    = useState(false);
// //   const [itemSearch,     setItemSearch]     = useState("");
// //   const [itemTypeFilter, setItemTypeFilter] = useState("ALL");
// //   const [itemPage,       setItemPage]       = useState(0);

// //   const loadItems = useCallback(async () => {
// //     setLoadingItems(true);
// //     try {
// //       const res = await fetch(
// //         `${API_URL}/api/movements-headers/kardex-movements?` +
// //         new URLSearchParams({
// //           tenantId:        "1",
// //           hubId:           "1",
// //           projectId:       "1",
// //           headerId:        String(movement.id),
// //           periodStartDate: "2025-01-01",
// //           periodEndDate:   "2026-12-31",
// //         })
// //       );
// //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
// //       const data = await res.json();
// //       const content: MovementDetail[] = Array.isArray(data) ? data : (data.data ?? []);
// //       setItems(content);
// //       setItemsLoaded(true);
// //     } catch (e: any) {
// //       toast.error(`Error al cargar ítems: ${e.message}`);
// //     } finally {
// //       setLoadingItems(false);
// //     }
// //   }, [movement.id]);

// //   // Auto-carga al montar
// //   useEffect(() => {
// //     loadItems();
// //   }, [loadItems]);

// //   const filteredItems = items.filter(item => {
// //     const matchType = itemTypeFilter === "ALL" || item.productType === itemTypeFilter;
// //     const q = itemSearch.toLowerCase();
// //     const desc = item.itemDescription || item.description || "";
// //     const matchSearch = !q
// //       || item.itemCode?.toLowerCase().includes(q)
// //       || desc.toLowerCase().includes(q)
// //       || (item.serialNumber ?? "").toLowerCase().includes(q);
// //     return matchType && matchSearch;
// //   });

// //   const totalQty   = items.reduce((s, i) => s + (i.quantity ?? 0), 0);
// //   const totalValue = items.reduce((s, i) => s + (i.quantity ?? 0) * (i.unitPrice ?? 0), 0);
// //   const equipCount = items.filter(i => i.productType === "EQUIPMENT").length;
// //   const serialized = items.filter(i => i.productType === "EQUIPMENT" && i.serialNumber).length;

// //   // ── Columnas del DataGrid de ítems ────────────────────────────────────
// //   const itemColumns: GridColDef[] = [
// //     {
// //       field: "productType", headerName: "Tipo", width: 110,
// //       renderCell: (p) => {
// //         const cfg = PRODUCT_CFG[p.value] ?? PRODUCT_CFG.MATERIAL;
// //         return (
// //           <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, px: 0.9, py: 0.25, borderRadius: 1, bgcolor: cfg.bg, border: `1px solid ${cfg.border}` }}>
// //             <Typography sx={{ fontSize: "0.75rem", lineHeight: 1 }}>{cfg.emoji}</Typography>
// //             <Typography variant="caption" fontWeight={700} sx={{ color: cfg.color, fontSize: "0.62rem" }}>{cfg.label}</Typography>
// //           </Box>
// //         );
// //       },
// //     },
// //     {
// //       field: "itemCode", headerName: "Código", width: 130,
// //       renderCell: (p) => {
// //         const cfg = PRODUCT_CFG[p.row.productType] ?? PRODUCT_CFG.MATERIAL;
// //         return (
// //           <Typography variant="caption" fontWeight={800} sx={{ color: cfg.color, fontFamily: "monospace", fontSize: "0.72rem", bgcolor: cfg.bg, px: 0.7, py: 0.15, borderRadius: 0.7, border: `1px solid ${cfg.border}` }}>
// //             {p.value}
// //           </Typography>
// //         );
// //       },
// //     },
// //     {
// //       field: "itemDescription", headerName: "Descripción", flex: 1, minWidth: 200,
// //       valueGetter: (_val: any, row: any) => row.itemDescription || row.description || "",
// //       renderCell: (p) => (
// //         <Typography variant="caption" sx={{ color: "#334155", fontSize: "0.75rem" }}>{p.value}</Typography>
// //       ),
// //     },
// //     {
// //       field: "quantity", headerName: "Cant.", width: 80, align: "center", headerAlign: "center",
// //       renderCell: (p) => (
// //         <Box sx={{ px: 1, py: 0.25, borderRadius: 0.8, bgcolor: "#f1f5f9", border: "1px solid #e2e8f0" }}>
// //           <Typography variant="caption" fontWeight={800} sx={{ color: "#1e293b", fontSize: "0.75rem" }}>{p.value}</Typography>
// //         </Box>
// //       ),
// //     },
// //     {
// //       field: "serialNumber", headerName: "N° Serie", width: 175,
// //       renderCell: (p) => p.value ? (
// //         <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.4, px: 0.8, py: 0.25, borderRadius: 0.8, bgcolor: "#f0fdf4", border: "1px solid #d1fae5" }}>
// //           <QrCodeScannerOutlined sx={{ fontSize: 10, color: "#059669" }} />
// //           <Typography variant="caption" sx={{ color: "#059669", fontFamily: "monospace", fontSize: "0.65rem", fontWeight: 700 }}>{p.value}</Typography>
// //         </Box>
// //       ) : <Typography variant="caption" sx={{ color: "#e2e8f0", fontSize: "0.7rem" }}>—</Typography>,
// //     },
// //     {
// //       field: "macAddress", headerName: "MAC", width: 145,
// //       renderCell: (p) => p.value
// //         ? <Typography variant="caption" sx={{ color: "#475569", fontFamily: "monospace", fontSize: "0.65rem" }}>{p.value}</Typography>
// //         : <Typography variant="caption" sx={{ color: "#e2e8f0" }}>—</Typography>,
// //     },
// //     {
// //       field: "mtaMacAddress", headerName: "MTA MAC", width: 145,
// //       valueGetter: (_val: any, row: any) => row.mtaMacAddress || row.mtaMac || "",
// //       renderCell: (p) => p.value
// //         ? <Typography variant="caption" sx={{ color: "#475569", fontFamily: "monospace", fontSize: "0.65rem" }}>{p.value}</Typography>
// //         : <Typography variant="caption" sx={{ color: "#e2e8f0" }}>—</Typography>,
// //     },
// //     {
// //       field: "unitAddress", headerName: "UA", width: 95,
// //       renderCell: (p) => p.value
// //         ? <Typography variant="caption" sx={{ color: "#475569", fontFamily: "monospace", fontSize: "0.65rem" }}>{p.value}</Typography>
// //         : <Typography variant="caption" sx={{ color: "#e2e8f0" }}>—</Typography>,
// //     },
// //     {
// //       field: "supplySource", headerName: "Fuente", width: 110,
// //       renderCell: (p) => (
// //         <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.68rem" }}>{p.value || "—"}</Typography>
// //       ),
// //     },
// //   ];

// //   return (
// //     <Box sx={{ display: "flex", flexDirection: "column", gap: 0, minHeight: "100%" }}>

// //       {/* ══ HERO HEADER ══════════════════════════════════════════════════════ */}
// //       <Box sx={{
// //         position: "relative",
// //         overflow: "hidden",
// //         bgcolor: "#0f172a",
// //         borderRadius: "12px 12px 0 0",
// //         px: 3, pt: 2.5, pb: 2,
// //       }}>
// //         {/* Accent line superior */}
// //         <Box sx={{
// //           position: "absolute", top: 0, left: 0, right: 0, height: 3,
// //           background: `linear-gradient(90deg, ${flujo.gradientFrom}, ${flujo.gradientTo})`,
// //         }} />

// //         {/* Decorativo: círculo difuso */}
// //         <Box sx={{
// //           position: "absolute", top: -40, right: -40,
// //           width: 180, height: 180, borderRadius: "50%",
// //           background: `radial-gradient(circle, ${flujo.color}18 0%, transparent 70%)`,
// //           pointerEvents: "none",
// //         }} />

// //         {/* Back + título */}
// //         <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, position: "relative" }}>
// //           <IconButton
// //             onClick={onBack}
// //             size="small"
// //             sx={{ color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 1.5, mt: 0.3, flexShrink: 0, "&:hover": { color: "white", bgcolor: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.25)" } }}
// //           >
// //             <ArrowBackOutlined sx={{ fontSize: 16 }} />
// //           </IconButton>

// //           <Box sx={{ flex: 1, minWidth: 0 }}>
// //             {/* Badge de tipo */}
// //             <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.7, flexWrap: "wrap" }}>
// //               <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.6, px: 1.2, py: 0.35, borderRadius: 1, bgcolor: `${flujo.color}20`, border: `1px solid ${flujo.color}40` }}>
// //                 <Box sx={{ color: flujo.color, display: "flex" }}>{flujo.icon}</Box>
// //                 <Typography variant="caption" fontWeight={800} sx={{ color: flujo.color, fontSize: "0.68rem", letterSpacing: "0.4px" }}>
// //                   {flujo.label.toUpperCase()}
// //                 </Typography>
// //               </Box>
// //               <Box sx={{ px: 1.2, py: 0.35, borderRadius: 1, bgcolor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
// //                 <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.55)", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.3px" }}>
// //                   {movement.subtype?.replace(/_/g, " ")}
// //                 </Typography>
// //               </Box>
// //             </Box>

// //             <Typography fontWeight={800} sx={{ color: "white", fontSize: "1.2rem", lineHeight: 1.1, letterSpacing: "-0.3px" }}>
// //               {movement.movementCode ?? `MOV-${String(movement.id).padStart(5, "0")}`}
// //             </Typography>
// //             <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.35)", fontSize: "0.68rem", mt: 0.3, display: "block" }}>
// //               {formatDate(movement.movementDate)}
// //               {movement.guiaRemision ? ` · Guía ${movement.guiaRemision}` : ""}
// //               {movement.ordenCompra  ? ` · OC ${movement.ordenCompra}`    : ""}
// //             </Typography>
// //           </Box>

// //           {/* KPIs del header */}
// //           {itemsLoaded && (
// //             <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
// //               {[
// //                 { label: "Ítems",    value: items.length,  color: "#94a3b8" },
// //                 { label: "Und.",     value: totalQty,       color: "#4ade80" },
// //                 { label: "Valor",    value: totalValue > 0 ? `S/ ${totalValue.toFixed(0)}` : "—", color: "#fbbf24" },
// //               ].map(k => (
// //                 <Box key={k.label} sx={{ textAlign: "center", px: 1.5, py: 0.8, borderRadius: 1.5, bgcolor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
// //                   <Typography fontWeight={800} sx={{ color: k.color, fontSize: "0.95rem", lineHeight: 1, fontFamily: "monospace" }}>{k.value}</Typography>
// //                   <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.25)", fontSize: "0.58rem" }}>{k.label}</Typography>
// //                 </Box>
// //               ))}
// //             </Box>
// //           )}
// //         </Box>
// //       </Box>

// //       {/* ══ BODY ══════════════════════════════════════════════════════════════ */}
// //       <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, bgcolor: "#f8fafc", borderRadius: "0 0 12px 12px", border: "1px solid #e2e8f0", borderTop: "none", p: 2.5, flex: 1 }}>

// //         {/* ── Fila superior: Info doc + KPIs de items + mix de tipos ── */}
// //         <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>

// //           {/* Datos del documento */}
// //           <Card elevation={0} sx={{ flex: "1 1 300px", borderRadius: 2.5, border: "1px solid #e8ecf0", overflow: "hidden" }}>
// //             <Box sx={{ px: 2.5, py: 1.5, bgcolor: "#f1f5f9", borderBottom: "1px solid #e8ecf0", display: "flex", alignItems: "center", gap: 1 }}>
// //               <ReceiptOutlined sx={{ fontSize: 13, color: "#64748b" }} />
// //               <Typography variant="caption" fontWeight={800} sx={{ color: "#64748b", letterSpacing: "0.8px", fontSize: "0.6rem", textTransform: "uppercase" }}>
// //                 Información del documento
// //               </Typography>
// //             </Box>
// //             <Box sx={{ px: 2.5, py: 1.5 }}>
// //               <InfoRow icon={<CalendarTodayOutlined sx={{ fontSize: 13 }} />} label="Fecha movimiento" value={formatDate(movement.movementDate)} />
// //               <InfoRow icon={<CalendarTodayOutlined sx={{ fontSize: 13 }} />} label="Fecha recepción"  value={formatDate(movement.receptionDate)} />
// //               <InfoRow icon={<ReceiptOutlined       sx={{ fontSize: 13 }} />} label="Guía de remisión" value={movement.guiaRemision || "—"} />
// //               <InfoRow icon={<ReceiptOutlined       sx={{ fontSize: 13 }} />} label="Orden de compra"  value={movement.ordenCompra  || "—"} />
// //               <InfoRow icon={<BusinessOutlined      sx={{ fontSize: 13 }} />} label="Proveedor"        value={movement.proveedor    || "—"} />
// //               <InfoRow icon={<PersonOutlined        sx={{ fontSize: 13 }} />} label="Cliente"          value={movement.cliente      || "—"} />
// //               <InfoRow icon={<StoreOutlined         sx={{ fontSize: 13 }} />} label="Almacén origen"   value={[movement.almacenOrigen, movement.subAlmacenOrigen].filter(Boolean).join(" › ") || "—"} />
// //               <InfoRow icon={<StoreOutlined         sx={{ fontSize: 13 }} />} label="Almacén destino"  value={[movement.almacenDestino, movement.subAlmacenDestino].filter(Boolean).join(" › ") || "—"} />
// //               {movement.notes && (
// //                 <Box sx={{ mt: 1.2, pt: 1.2, borderTop: "1px solid #f1f5f9" }}>
// //                   <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.5px", display: "block", mb: 0.4, textTransform: "uppercase" }}>Notas</Typography>
// //                   <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.72rem", lineHeight: 1.6, fontStyle: "italic" }}>{movement.notes}</Typography>
// //                 </Box>
// //               )}
// //             </Box>
// //           </Card>

// //           {/* KPIs de ítems */}
// //           {itemsLoaded && (
// //             <>
// //               <Card elevation={0} sx={{ flex: "0 1 220px", borderRadius: 2.5, border: "1px solid #e8ecf0", overflow: "hidden" }}>
// //                 <Box sx={{ px: 2.5, py: 1.5, bgcolor: "#f1f5f9", borderBottom: "1px solid #e8ecf0", display: "flex", alignItems: "center", gap: 1 }}>
// //                   <InventoryOutlined sx={{ fontSize: 13, color: "#64748b" }} />
// //                   <Typography variant="caption" fontWeight={800} sx={{ color: "#64748b", letterSpacing: "0.8px", fontSize: "0.6rem", textTransform: "uppercase" }}>Resumen</Typography>
// //                 </Box>
// //                 <Box sx={{ p: 2 }}>
// //                   {[
// //                     { label: "Total ítems",       value: items.length,                  accent: "#1e40af" },
// //                     { label: "Cantidad total",     value: totalQty,                      accent: "#059669" },
// //                     { label: "Con serial",         value: `${serialized}/${equipCount}`, accent: "#14532d" },
// //                     { label: "Valor estimado",     value: formatMoney(totalValue),       accent: "#64748b" },
// //                   ].map(kpi => (
// //                     <Box key={kpi.label} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 0.7, borderBottom: "1px solid #f8fafc" }}>
// //                       <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.7rem" }}>{kpi.label}</Typography>
// //                       <Typography variant="caption" fontWeight={800} sx={{ color: kpi.accent, fontFamily: "monospace", fontSize: "0.78rem" }}>{kpi.value}</Typography>
// //                     </Box>
// //                   ))}
// //                 </Box>
// //               </Card>

// //               {/* Mix por tipo */}
// //               <Card elevation={0} sx={{ flex: "0 1 200px", borderRadius: 2.5, border: "1px solid #e8ecf0", overflow: "hidden" }}>
// //                 <Box sx={{ px: 2.5, py: 1.5, bgcolor: "#f1f5f9", borderBottom: "1px solid #e8ecf0", display: "flex", alignItems: "center", gap: 1 }}>
// //                   <LayersOutlined sx={{ fontSize: 13, color: "#64748b" }} />
// //                   <Typography variant="caption" fontWeight={800} sx={{ color: "#64748b", letterSpacing: "0.8px", fontSize: "0.6rem", textTransform: "uppercase" }}>Por tipo</Typography>
// //                 </Box>
// //                 <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 0.5 }}>
// //                   {(["EQUIPMENT", "MATERIAL", "TOOL", "EPP"] as ProductType[]).map(t => {
// //                     const cnt = items.filter(i => i.productType === t).length;
// //                     if (!cnt) return null;
// //                     const cfg = PRODUCT_CFG[t];
// //                     return (
// //                       <Box key={t} sx={{ display: "flex", alignItems: "center", gap: 1, py: 0.5 }}>
// //                         <Typography sx={{ fontSize: "0.85rem" }}>{cfg.emoji}</Typography>
// //                         <Typography variant="caption" sx={{ flex: 1, color: "#64748b", fontSize: "0.7rem" }}>{cfg.label}</Typography>
// //                         <Box sx={{ px: 0.9, py: 0.15, borderRadius: 0.7, bgcolor: cfg.bg, border: `1px solid ${cfg.border}` }}>
// //                           <Typography variant="caption" fontWeight={800} sx={{ color: cfg.color, fontSize: "0.68rem" }}>{cnt}</Typography>
// //                         </Box>
// //                       </Box>
// //                     );
// //                   })}
// //                 </Box>
// //               </Card>
// //             </>
// //           )}
// //         </Box>

// //         {/* ── Sección de ítems ── */}
// //         <Card elevation={0} sx={{ borderRadius: 2.5, border: "1px solid #e8ecf0", overflow: "hidden", flex: 1 }}>
// //           {/* Toolbar ítems */}
// //           <Box sx={{ px: 2.5, py: 1.8, bgcolor: "#f8fafc", borderBottom: "1px solid #e8ecf0", display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
// //             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //               <StorageOutlined sx={{ fontSize: 14, color: "#64748b" }} />
// //               <Typography variant="caption" fontWeight={800} sx={{ color: "#334155", fontSize: "0.72rem", letterSpacing: "0.5px" }}>
// //                 ÍTEMS DEL MOVIMIENTO
// //               </Typography>
// //               {itemsLoaded && (
// //                 <Box sx={{ px: 0.8, py: 0.1, borderRadius: 0.7, bgcolor: "#0f172a", minWidth: 20, textAlign: "center" }}>
// //                   <Typography variant="caption" sx={{ color: "white", fontSize: "0.6rem", fontWeight: 800 }}>{items.length}</Typography>
// //                 </Box>
// //               )}
// //             </Box>

// //             {/* Separador flexible */}
// //             <Box sx={{ flex: 1 }} />

// //             {itemsLoaded && (
// //               <>
// //                 {/* Búsqueda */}
// //                 <TextField
// //                   size="small"
// //                   placeholder="Código, descripción, serial..."
// //                   value={itemSearch}
// //                   onChange={e => setItemSearch(e.target.value)}
// //                   InputProps={{
// //                     startAdornment: <InputAdornment position="start"><SearchOutlined sx={{ fontSize: 14, color: "#94a3b8" }} /></InputAdornment>,
// //                     endAdornment: itemSearch ? (
// //                       <InputAdornment position="end">
// //                         <IconButton size="small" onClick={() => setItemSearch("")}><CloseOutlined sx={{ fontSize: 11 }} /></IconButton>
// //                       </InputAdornment>
// //                     ) : null,
// //                   }}
// //                   sx={{ width: 220, "& .MuiOutlinedInput-root": { borderRadius: 1.5, fontSize: "0.8rem", bgcolor: "white" } }}
// //                 />
// //                 {/* Filtro tipo */}
// //                 <Box sx={{ width: 170 }}>
// //                   <SelectBase
// //                     size="small" label="Todos" value={itemTypeFilter}
// //                     onChange={v => setItemTypeFilter(String(v))}
// //                     options={[
// //                       { label: "Todos los tipos", value: "ALL" },
// //                       { label: "📦 Materiales",   value: "MATERIAL"  },
// //                       { label: "⚙️ Equipos",       value: "EQUIPMENT" },
// //                       { label: "🔧 Herramientas",  value: "TOOL"      },
// //                       { label: "🦺 EPP",           value: "EPP"       },
// //                     ]}
// //                     fullWidth
// //                   />
// //                 </Box>

// //                 {/* Resultado count */}
// //                 {filteredItems.length !== items.length && (
// //                   <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.68rem", whiteSpace: "nowrap" }}>
// //                     {filteredItems.length} de {items.length}
// //                   </Typography>
// //                 )}

// //                 <IconButton size="small" onClick={loadItems} disabled={loadingItems}
// //                   sx={{ border: "1px solid #e2e8f0", borderRadius: 1.2, bgcolor: "white", "&:hover": { bgcolor: "#f8fafc" } }}>
// //                   <RefreshOutlined sx={{ fontSize: 14, color: "#64748b" }} />
// //                 </IconButton>
// //               </>
// //             )}

// //             {/* Botón cargar si no está cargado */}
// //             {!itemsLoaded && (
// //               <Box onClick={loadingItems ? undefined : loadItems} sx={{
// //                 display: "flex", alignItems: "center", gap: 0.8,
// //                 px: 1.8, py: 0.7, borderRadius: 1.5, cursor: loadingItems ? "wait" : "pointer",
// //                 bgcolor: "#0f172a", "&:hover": { bgcolor: "#1e293b" }, transition: "all 0.15s",
// //               }}>
// //                 {loadingItems ? <CircularProgress size={12} sx={{ color: "white" }} /> : <DownloadOutlined sx={{ fontSize: 13, color: "white" }} />}
// //                 <Typography variant="caption" fontWeight={700} sx={{ color: "white", fontSize: "0.7rem" }}>
// //                   {loadingItems ? "Cargando..." : "Cargar ítems"}
// //                 </Typography>
// //               </Box>
// //             )}
// //           </Box>

// //           {/* Cuerpo ítems */}
// //           <Box sx={{ height: 420 }}>
// //             {/* Skeletons */}
// //             {loadingItems && (
// //               <Box>
// //                 {[1, 2, 3, 4, 5, 6].map(n => <RowSkeleton key={n} />)}
// //               </Box>
// //             )}

// //             {/* Estado vacío — no cargado */}
// //             {!itemsLoaded && !loadingItems && (
// //               <Box sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1 }}>
// //                 <DownloadOutlined sx={{ fontSize: 36, color: "#e2e8f0" }} />
// //                 <Typography variant="body2" sx={{ color: "#94a3b8", fontWeight: 600 }}>Ítems no cargados</Typography>
// //                 <Typography variant="caption" color="text.disabled">Presiona "Cargar ítems" para consultar</Typography>
// //               </Box>
// //             )}

// //             {/* DataGrid */}
// //             {itemsLoaded && !loadingItems && (
// //               <DataGrid
// //                 rows={filteredItems}
// //                 columns={itemColumns}
// //                 pageSizeOptions={[PAGE_SIZE_ITEMS]}
// //                 paginationModel={{ page: itemPage, pageSize: PAGE_SIZE_ITEMS }}
// //                 onPaginationModelChange={m => setItemPage(m.page)}
// //                 disableRowSelectionOnClick
// //                 rowHeight={46}
// //                 columnHeaderHeight={38}
// //                 sx={{
// //                   height: "100%",
// //                   border: "none",
// //                   "& .MuiDataGrid-columnHeaders": {
// //                     bgcolor: "#0f172a",
// //                     fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.5px",
// //                     minHeight: "38px !important", maxHeight: "38px !important",
// //                   },
// //                   "& .MuiDataGrid-columnHeaderTitle": { color: "rgba(255,255,255,0.82)", fontWeight: 700 },
// //                   "& .MuiDataGrid-sortIcon":            { color: "rgba(255,255,255,0.4)" },
// //                   "& .MuiDataGrid-menuIcon svg":         { color: "rgba(255,255,255,0.4)" },
// //                   "& .MuiDataGrid-columnSeparator":      { color: "rgba(255,255,255,0.07)" },
// //                   "& .MuiDataGrid-cell": { borderColor: "#f1f5f9", fontSize: "0.78rem", alignContent: "center", "&:focus": { outline: "none" }, "&:focus-within": { outline: "none" } },
// //                   "& .MuiDataGrid-row:hover": { bgcolor: "#f8fafc" },
// //                   "& .MuiDataGrid-footerContainer": { borderColor: "#f1f5f9", bgcolor: "#fafbfc" },
// //                   "& .MuiTablePagination-root": { color: "#64748b", fontSize: "0.72rem" },
// //                 }}
// //                 slots={{
// //                   noRowsOverlay: () => (
// //                     <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", py: 5 }}>
// //                       <InfoOutlined sx={{ fontSize: 28, color: "#e2e8f0", mb: 0.8 }} />
// //                       <Typography variant="caption" color="text.disabled">Sin ítems que coincidan</Typography>
// //                     </Box>
// //                   ),
// //                 }}
// //               />
// //             )}
// //           </Box>

// //           {/* Footer valor */}
// //           {itemsLoaded && totalValue > 0 && (
// //             <Box sx={{ px: 2.5, py: 1.2, borderTop: "1px solid #f1f5f9", bgcolor: "#f8fafc", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1.5 }}>
// //               <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.7rem" }}>Valor estimado total:</Typography>
// //               <Typography fontWeight={800} sx={{ color: "#1e293b", fontFamily: "monospace", fontSize: "0.88rem" }}>
// //                 S/ {totalValue.toFixed(2)}
// //               </Typography>
// //             </Box>
// //           )}
// //         </Card>
// //       </Box>
// //     </Box>
// //   );
// // }


// "use client";

// import { useState, useCallback, useEffect } from "react";
// import {
//   Box, Typography, IconButton, CircularProgress,
//   TextField, InputAdornment, Divider, Chip, Skeleton, Tooltip,
// } from "@mui/material";
// import {
//   ArrowBackRounded,
//   TrendingUpRounded, TrendingDownRounded, SyncAltRounded,
//   LayersRounded, CalendarMonthRounded,
//   ReceiptLongRounded, BusinessRounded, PersonRounded, WarehouseRounded,
//   RefreshRounded, SearchRounded, CloseRounded, QrCodeScannerRounded,
//   Inventory2Rounded, BuildRounded, ConstructionRounded, SecurityRounded,
//   RouterRounded, SignalCellularAltRounded, TagRounded,
//   LocalShippingRounded, CheckCircleRounded, HelpOutlineRounded,
//   GridViewRounded, InfoRounded, ExpandMoreRounded,
//   FiberManualRecordRounded, NotesRounded,
//   NumbersRounded, AttachMoneyRounded, SourceRounded,
//   LocationOnRounded,
// } from "@mui/icons-material";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import SelectBase from "@/src/components/base/SelectBase";
// import { API_URL } from "@/src/lib/config";
// import dayjs from "dayjs";
// import { toast } from "react-toastify";

// // ─── Tipos ────────────────────────────────────────────────────────────────────

// type ProductType = "MATERIAL" | "TOOL" | "EQUIPMENT" | "EPP";

// export interface MovementHeader {
//   id: number;
//   movementCode?: string;
//   movementType: string;
//   subtype: string;
//   movementDate: string;
//   receptionDate?: string;
//   guiaRemision?: string;
//   ordenCompra?: string;
//   almacenOrigen?: string;
//   almacenDestino?: string;
//   subAlmacenOrigen?: string;
//   subAlmacenDestino?: string;
//   proveedor?: string;
//   cliente?: string;
//   notes?: string;
//   createdBy?: number;
//   createdAt?: string;
//   totalItems?: number;
//   totalValue?: number;
//   status?: string;
// }

// export interface MovementDetail {
//   id: number;
//   headerId: number;
//   itemCode: string;
//   itemDescription: string;
//   description?: string;
//   productType: ProductType;
//   quantity: number;
//   unitPrice?: number;
//   serialNumber?: string;
//   macAddress?: string;
//   mtaMacAddress?: string;
//   mtaMac?: string;
//   unitAddress?: string;
//   supplySource?: string;
//   locationCode?: string;
// }

// // ─── Paleta ───────────────────────────────────────────────────────────────────

// const INK    = "#0A0F1A";
// const INK2   = "#131C2E";
// const INK3   = "#1C2940";
// const SILVER = "#8899AA";
// const MIST   = "#C8D4E0";
// const FROST  = "#EDF2F7";
// const WHITE  = "#FFFFFF";

// // ─── Config de flujo ──────────────────────────────────────────────────────────

// interface FlujoCfg {
//   color: string; dim: string; bg: string; border: string;
//   Icon: React.ElementType; label: string;
//   stripe: string;
// }

// const FLUJO_CFG: Record<string, FlujoCfg> = {
//   ENTRY:         { color: "#22C55E", dim: "#16A34A", bg: "#052E16", border: "#166534", Icon: TrendingUpRounded,   label: "Entrada",       stripe: "rgba(34,197,94,0.15)"  },
//   EXIT:          { color: "#F87171", dim: "#DC2626", bg: "#2D0A0A", border: "#7F1D1D", Icon: TrendingDownRounded, label: "Salida",        stripe: "rgba(248,113,113,0.15)" },
//   TRANSFER:      { color: "#A78BFA", dim: "#7C3AED", bg: "#1A0A2E", border: "#4C1D95", Icon: SyncAltRounded,     label: "Transferencia", stripe: "rgba(167,139,250,0.15)" },
//   ENTRADA:       { color: "#22C55E", dim: "#16A34A", bg: "#052E16", border: "#166534", Icon: TrendingUpRounded,   label: "Entrada",       stripe: "rgba(34,197,94,0.15)"  },
//   SALIDA:        { color: "#F87171", dim: "#DC2626", bg: "#2D0A0A", border: "#7F1D1D", Icon: TrendingDownRounded, label: "Salida",        stripe: "rgba(248,113,113,0.15)" },
//   TRANSFERENCIA: { color: "#A78BFA", dim: "#7C3AED", bg: "#1A0A2E", border: "#4C1D95", Icon: SyncAltRounded,     label: "Transferencia", stripe: "rgba(167,139,250,0.15)" },
// };

// const getFlujo = (t: string): FlujoCfg =>
//   FLUJO_CFG[t] ?? { color: MIST, dim: SILVER, bg: INK2, border: INK3, Icon: LayersRounded, label: t, stripe: "rgba(200,212,224,0.1)" };

// // ─── Config de productos ──────────────────────────────────────────────────────

// interface ProdCfg {
//   label: string; emoji: string;
//   color: string; bg: string; border: string; dot: string;
//   Icon: React.ElementType;
// }

// const PRODUCT_CFG: Record<string, ProdCfg> = {
//   MATERIAL:  { label: "Material",    emoji: "📦", color: "#FCD34D", bg: "#1C1400", border: "#78350F", dot: "#F59E0B", Icon: Inventory2Rounded   },
//   TOOL:      { label: "Herramienta", emoji: "🔧", color: "#60A5FA", bg: "#0A1628", border: "#1E3A8A", dot: "#3B82F6", Icon: BuildRounded         },
//   EQUIPMENT: { label: "Equipo",      emoji: "⚙️", color: "#4ADE80", bg: "#081C0E", border: "#14532D", dot: "#22C55E", Icon: ConstructionRounded  },
//   EPP:       { label: "EPP",         emoji: "🦺", color: "#C4B5FD", bg: "#120828", border: "#4C1D95", dot: "#8B5CF6", Icon: SecurityRounded      },
// };

// const getProd = (t: string): ProdCfg =>
//   PRODUCT_CFG[t] ?? PRODUCT_CFG.MATERIAL;

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// const fmt  = (d?: string) => d ? dayjs(d).format("DD MMM YYYY") : null;
// const fmtM = (v?: number) => (v != null && v > 0) ? `S/ ${v.toFixed(2)}` : null;
// const pad  = (id: number) => `MOV-${String(id).padStart(6, "0")}`;

// // ─── Sub-componentes ──────────────────────────────────────────────────────────

// function RowSkel() {
//   return (
//     <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 2.5, py: 1.4,
//       borderBottom: `1px solid ${INK3}` }}>
//       <Skeleton variant="circular" width={30} height={30} sx={{ bgcolor: INK3, flexShrink: 0 }} />
//       <Skeleton variant="rounded" width={80}  height={11} sx={{ bgcolor: INK3 }} />
//       <Skeleton variant="rounded" width={200} height={11} sx={{ bgcolor: INK3, flex: 1 }} />
//       <Skeleton variant="rounded" width={48}  height={22} sx={{ bgcolor: INK3 }} />
//       <Skeleton variant="rounded" width={120} height={22} sx={{ bgcolor: INK3 }} />
//     </Box>
//   );
// }

// function MetaRow({
//   Icon, label, value, mono = false,
// }: { Icon: React.ElementType; label: string; value: string | null; mono?: boolean }) {
//   if (!value) return null;
//   return (
//     <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, py: 0.9,
//       borderBottom: `1px solid rgba(255,255,255,0.04)` }}>
//       <Icon sx={{ fontSize: 13, color: SILVER, mt: "2px", flexShrink: 0 }} />
//       <Typography sx={{ flex: 1, fontSize: "0.68rem", color: SILVER, lineHeight: 1.4 }}>
//         {label}
//       </Typography>
//       <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: MIST, textAlign: "right",
//         fontFamily: mono ? "monospace" : "inherit", lineHeight: 1.4 }}>
//         {value}
//       </Typography>
//     </Box>
//   );
// }

// function StatBox({ label, value, accent, sub }: {
//   label: string; value: React.ReactNode; accent: string; sub?: string;
// }) {
//   return (
//     <Box sx={{ flex: "1 1 110px", p: 2, borderRadius: "10px",
//       bgcolor: INK2, border: `1px solid ${INK3}`,
//       display: "flex", flexDirection: "column", gap: 0.4 }}>
//       <Typography sx={{ fontSize: "0.58rem", fontWeight: 700, color: SILVER,
//         letterSpacing: "0.08em", textTransform: "uppercase" }}>
//         {label}
//       </Typography>
//       <Typography sx={{ fontSize: "1.1rem", fontWeight: 800, color: accent,
//         fontFamily: "monospace", lineHeight: 1.1 }}>
//         {value}
//       </Typography>
//       {sub && (
//         <Typography sx={{ fontSize: "0.6rem", color: SILVER }}>{sub}</Typography>
//       )}
//     </Box>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // COMPONENTE PRINCIPAL
// // ─────────────────────────────────────────────────────────────────────────────

// interface Props {
//   movement: MovementHeader;
//   onBack: () => void;
// }

// export default function KardexMovementDetail({ movement, onBack }: Props) {
//   const flujo = getFlujo(movement.movementType);
//   const FlujoIcon = flujo.Icon;

//   const [items,       setItems]       = useState<MovementDetail[]>([]);
//   const [loading,     setLoading]     = useState(false);
//   const [loaded,      setLoaded]      = useState(false);
//   const [search,      setSearch]      = useState("");
//   const [typeFilter,  setTypeFilter]  = useState("ALL");
//   const [page,        setPage]        = useState(0);

//   const loadItems = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `${API_URL}/api/movements-headers/kardex-movements?` +
//         new URLSearchParams({
//           tenantId: "1", hubId: "1", projectId: "1",
//           headerId: String(movement.id),
//           periodStartDate: "2025-01-01",
//           periodEndDate:   "2026-12-31",
//         })
//       );
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const data = await res.json();
//       setItems(Array.isArray(data) ? data : (data.data ?? []));
//       setLoaded(true);
//     } catch (e: any) {
//       toast.error(`Error al cargar ítems: ${e.message}`);
//     } finally {
//       setLoading(false);
//     }
//   }, [movement.id]);

//   useEffect(() => { loadItems(); }, [loadItems]);

//   const filtered = items.filter(i => {
//     const matchType = typeFilter === "ALL" || i.productType === typeFilter;
//     const q = search.toLowerCase();
//     const desc = i.itemDescription || i.description || "";
//     return matchType && (!q
//       || i.itemCode?.toLowerCase().includes(q)
//       || desc.toLowerCase().includes(q)
//       || (i.serialNumber ?? "").toLowerCase().includes(q));
//   });

//   const totalQty   = items.reduce((s, i) => s + (i.quantity ?? 0), 0);
//   const totalValue = items.reduce((s, i) => s + (i.quantity ?? 0) * (i.unitPrice ?? 0), 0);
//   const equipCount = items.filter(i => i.productType === "EQUIPMENT").length;
//   const serialized = items.filter(i => i.productType === "EQUIPMENT" && i.serialNumber).length;

//   // ── Columnas DataGrid ─────────────────────────────────────────────────────

//   const columns: GridColDef[] = [
//     {
//       field: "productType", headerName: "TIPO", width: 122,
//       renderHeader: () => (
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//           <GridViewRounded sx={{ fontSize: 12, color: SILVER }} />
//           <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: MIST, letterSpacing: "0.07em" }}>TIPO</Typography>
//         </Box>
//       ),
//       renderCell: (p) => {
//         const cfg = getProd(p.value);
//         const Icon = cfg.Icon;
//         return (
//           <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.6,
//             px: 1, py: 0.3, borderRadius: "6px", bgcolor: cfg.bg, border: `1px solid ${cfg.border}` }}>
//             <Icon sx={{ fontSize: 11, color: cfg.color }} />
//             <Typography sx={{ fontSize: "0.62rem", fontWeight: 800, color: cfg.color }}>{cfg.label}</Typography>
//           </Box>
//         );
//       },
//     },
//     {
//       field: "itemCode", headerName: "CÓDIGO", width: 138,
//       renderHeader: () => (
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//           <TagRounded sx={{ fontSize: 12, color: SILVER }} />
//           <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: MIST, letterSpacing: "0.07em" }}>CÓDIGO</Typography>
//         </Box>
//       ),
//       renderCell: (p) => {
//         const cfg = getProd(p.row.productType);
//         return (
//           <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5,
//             px: 0.8, py: 0.25, borderRadius: "5px", bgcolor: cfg.bg, border: `1px solid ${cfg.border}` }}>
//             <FiberManualRecordRounded sx={{ fontSize: 6, color: cfg.dot }} />
//             <Typography sx={{ fontSize: "0.7rem", fontWeight: 800, color: cfg.color, fontFamily: "monospace" }}>
//               {p.value}
//             </Typography>
//           </Box>
//         );
//       },
//     },
//     {
//       field: "itemDescription", headerName: "DESCRIPCIÓN", flex: 1, minWidth: 210,
//       valueGetter: (_: any, row: any) => row.itemDescription || row.description || "",
//       renderHeader: () => (
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//           <NotesRounded sx={{ fontSize: 12, color: SILVER }} />
//           <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: MIST, letterSpacing: "0.07em" }}>DESCRIPCIÓN</Typography>
//         </Box>
//       ),
//       renderCell: (p) => (
//         <Typography sx={{ fontSize: "0.72rem", color: MIST, lineHeight: 1.3 }}>{p.value}</Typography>
//       ),
//     },
//     {
//       field: "quantity", headerName: "CANT.", width: 84, align: "center", headerAlign: "center",
//       renderHeader: () => (
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, justifyContent: "center", width: "100%" }}>
//           <NumbersRounded sx={{ fontSize: 12, color: SILVER }} />
//           <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: MIST, letterSpacing: "0.07em" }}>CANT.</Typography>
//         </Box>
//       ),
//       renderCell: (p) => (
//         <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
//           <Box sx={{ px: 1.1, py: 0.3, borderRadius: "6px",
//             bgcolor: "rgba(255,255,255,0.06)", border: `1px solid ${INK3}` }}>
//             <Typography sx={{ fontSize: "0.75rem", fontWeight: 800, color: WHITE, fontFamily: "monospace" }}>
//               {p.value}
//             </Typography>
//           </Box>
//         </Box>
//       ),
//     },
//     {
//       field: "unitPrice", headerName: "P. UNIT.", width: 96, align: "right", headerAlign: "right",
//       renderHeader: () => (
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, justifyContent: "flex-end", width: "100%" }}>
//           <AttachMoneyRounded sx={{ fontSize: 12, color: SILVER }} />
//           <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: MIST, letterSpacing: "0.07em" }}>P. UNIT.</Typography>
//         </Box>
//       ),
//       renderCell: (p) => (
//         <Typography sx={{ fontSize: "0.68rem", fontWeight: 600, color: p.value > 0 ? "#FCD34D" : INK3,
//           fontFamily: "monospace", textAlign: "right", width: "100%", pr: 0.5 }}>
//           {p.value > 0 ? `S/ ${Number(p.value).toFixed(2)}` : "—"}
//         </Typography>
//       ),
//     },
//     {
//       field: "serialNumber", headerName: "N° SERIE", width: 185,
//       renderHeader: () => (
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//           <QrCodeScannerRounded sx={{ fontSize: 12, color: SILVER }} />
//           <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: MIST, letterSpacing: "0.07em" }}>N° SERIE</Typography>
//         </Box>
//       ),
//       renderCell: (p) => p.value ? (
//         <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5,
//           px: 0.9, py: 0.3, borderRadius: "6px",
//           bgcolor: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
//           <CheckCircleRounded sx={{ fontSize: 10, color: "#22C55E" }} />
//           <Typography sx={{ fontSize: "0.65rem", color: "#4ADE80", fontFamily: "monospace", fontWeight: 700 }}>
//             {p.value}
//           </Typography>
//         </Box>
//       ) : (
//         <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.4 }}>
//           <HelpOutlineRounded sx={{ fontSize: 11, color: INK3 }} />
//           <Typography sx={{ fontSize: "0.65rem", color: INK3 }}>sin serial</Typography>
//         </Box>
//       ),
//     },
//     {
//       field: "macAddress", headerName: "MAC", width: 155,
//       renderHeader: () => (
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//           <RouterRounded sx={{ fontSize: 12, color: SILVER }} />
//           <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: MIST, letterSpacing: "0.07em" }}>MAC</Typography>
//         </Box>
//       ),
//       renderCell: (p) => p.value ? (
//         <Typography sx={{ fontSize: "0.64rem", color: "#93C5FD", fontFamily: "monospace" }}>{p.value}</Typography>
//       ) : <Typography sx={{ fontSize: "0.65rem", color: INK3 }}>—</Typography>,
//     },
//     {
//       field: "mtaMacAddress", headerName: "MTA MAC", width: 155,
//       valueGetter: (_: any, row: any) => row.mtaMacAddress || row.mtaMac || "",
//       renderHeader: () => (
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//           <SignalCellularAltRounded sx={{ fontSize: 12, color: SILVER }} />
//           <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: MIST, letterSpacing: "0.07em" }}>MTA MAC</Typography>
//         </Box>
//       ),
//       renderCell: (p) => p.value ? (
//         <Typography sx={{ fontSize: "0.64rem", color: "#93C5FD", fontFamily: "monospace" }}>{p.value}</Typography>
//       ) : <Typography sx={{ fontSize: "0.65rem", color: INK3 }}>—</Typography>,
//     },
//     {
//       field: "unitAddress", headerName: "UA", width: 95,
//       renderHeader: () => (
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//           <LocationOnRounded sx={{ fontSize: 12, color: SILVER }} />
//           <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: MIST, letterSpacing: "0.07em" }}>UA</Typography>
//         </Box>
//       ),
//       renderCell: (p) => p.value ? (
//         <Typography sx={{ fontSize: "0.65rem", color: "#D1D5DB", fontFamily: "monospace" }}>{p.value}</Typography>
//       ) : <Typography sx={{ fontSize: "0.65rem", color: INK3 }}>—</Typography>,
//     },
//     {
//       field: "supplySource", headerName: "FUENTE", width: 110,
//       renderHeader: () => (
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//           <SourceRounded sx={{ fontSize: 12, color: SILVER }} />
//           <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: MIST, letterSpacing: "0.07em" }}>FUENTE</Typography>
//         </Box>
//       ),
//       renderCell: (p) => p.value ? (
//         <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5,
//           px: 0.8, py: 0.2, borderRadius: "5px",
//           bgcolor: "rgba(255,255,255,0.05)", border: `1px solid ${INK3}` }}>
//           <LocalShippingRounded sx={{ fontSize: 10, color: SILVER }} />
//           <Typography sx={{ fontSize: "0.62rem", color: MIST, fontWeight: 600 }}>{p.value}</Typography>
//         </Box>
//       ) : <Typography sx={{ fontSize: "0.65rem", color: INK3 }}>—</Typography>,
//     },
//   ];

//   // ── Render ────────────────────────────────────────────────────────────────

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: 0, bgcolor: INK, minHeight: "100%", borderRadius: "12px", overflow: "hidden" }}>

//       {/* ══ HERO HEADER ════════════════════════════════════════════════════ */}
//       <Box sx={{
//         position: "relative", overflow: "hidden",
//         background: `linear-gradient(135deg, ${INK} 0%, ${INK2} 50%, ${flujo.bg} 100%)`,
//         px: 3, pt: 3, pb: 2.5,
//       }}>
//         {/* Accent bar top */}
//         <Box sx={{
//           position: "absolute", top: 0, left: 0, right: 0, height: 2,
//           background: `linear-gradient(90deg, ${flujo.color}00, ${flujo.color}, ${flujo.color}00)`,
//         }} />
//         {/* Glow orb */}
//         <Box sx={{
//           position: "absolute", top: -60, right: -60,
//           width: 220, height: 220, borderRadius: "50%",
//           background: `radial-gradient(circle, ${flujo.color}12 0%, transparent 70%)`,
//           pointerEvents: "none",
//         }} />
//         {/* Stripe pattern */}
//         <Box sx={{
//           position: "absolute", bottom: 0, right: 0, width: 180, height: "100%",
//           background: `repeating-linear-gradient(-45deg, transparent, transparent 8px, ${flujo.stripe} 8px, ${flujo.stripe} 9px)`,
//           opacity: 0.4, pointerEvents: "none",
//         }} />

//         {/* Back + info */}
//         <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, position: "relative" }}>
//           <Tooltip title="Volver al listado">
//             <IconButton onClick={onBack} size="small" sx={{
//               mt: 0.4, flexShrink: 0,
//               color: SILVER, border: `1px solid ${INK3}`, borderRadius: "8px",
//               backdropFilter: "blur(6px)",
//               "&:hover": { color: WHITE, bgcolor: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.2)" },
//             }}>
//               <ArrowBackRounded sx={{ fontSize: 15 }} />
//             </IconButton>
//           </Tooltip>

//           <Box sx={{ flex: 1, minWidth: 0 }}>
//             {/* Badges */}
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, flexWrap: "wrap" }}>
//               <Box sx={{
//                 display: "inline-flex", alignItems: "center", gap: 0.7,
//                 px: 1.4, py: 0.45, borderRadius: "8px",
//                 bgcolor: `${flujo.color}15`, border: `1px solid ${flujo.color}35`,
//               }}>
//                 <FlujoIcon sx={{ fontSize: 14, color: flujo.color }} />
//                 <Typography sx={{ fontSize: "0.65rem", fontWeight: 800, color: flujo.color, letterSpacing: "0.06em" }}>
//                   {flujo.label.toUpperCase()}
//                 </Typography>
//               </Box>
//               <Box sx={{
//                 px: 1.2, py: 0.45, borderRadius: "8px",
//                 bgcolor: "rgba(255,255,255,0.04)", border: `1px solid ${INK3}`,
//               }}>
//                 <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color: SILVER, letterSpacing: "0.04em" }}>
//                   {movement.subtype?.replace(/_/g, " ")}
//                 </Typography>
//               </Box>
//             </Box>

//             {/* Código */}
//             <Typography sx={{
//               fontWeight: 900, color: WHITE, fontSize: "1.35rem", lineHeight: 1,
//               letterSpacing: "-0.02em", fontFamily: "monospace",
//             }}>
//               {movement.movementCode ?? pad(movement.id)}
//             </Typography>

//             {/* Meta line */}
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 0.8, flexWrap: "wrap" }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                 <CalendarMonthRounded sx={{ fontSize: 11, color: SILVER }} />
//                 <Typography sx={{ fontSize: "0.68rem", color: SILVER }}>
//                   {fmt(movement.movementDate) ?? "—"}
//                 </Typography>
//               </Box>
//               {movement.guiaRemision && (
//                 <>
//                   <Box sx={{ width: 3, height: 3, borderRadius: "50%", bgcolor: INK3 }} />
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <ReceiptLongRounded sx={{ fontSize: 11, color: SILVER }} />
//                     <Typography sx={{ fontSize: "0.68rem", color: SILVER, fontFamily: "monospace" }}>
//                       {movement.guiaRemision}
//                     </Typography>
//                   </Box>
//                 </>
//               )}
//               {movement.ordenCompra && (
//                 <>
//                   <Box sx={{ width: 3, height: 3, borderRadius: "50%", bgcolor: INK3 }} />
//                   <Typography sx={{ fontSize: "0.68rem", color: SILVER, fontFamily: "monospace" }}>
//                     OC {movement.ordenCompra}
//                   </Typography>
//                 </>
//               )}
//             </Box>
//           </Box>

//           {/* KPIs mini (solo cuando cargado) */}
//           {loaded && (
//             <Box sx={{ display: "flex", gap: 0.8, flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }}>
//               {[
//                 { l: "Ítems",    v: items.length,  c: MIST   },
//                 { l: "Unidades", v: totalQty,       c: "#4ADE80" },
//                 { l: "Valor",    v: totalValue > 0 ? `S/${totalValue.toFixed(0)}` : "—", c: "#FCD34D" },
//               ].map(k => (
//                 <Box key={k.l} sx={{
//                   textAlign: "center", px: 1.6, py: 1,
//                   borderRadius: "8px",
//                   bgcolor: "rgba(255,255,255,0.04)",
//                   border: `1px solid ${INK3}`,
//                   backdropFilter: "blur(6px)",
//                 }}>
//                   <Typography sx={{ fontWeight: 800, color: k.c, fontSize: "1rem", lineHeight: 1, fontFamily: "monospace" }}>
//                     {k.v}
//                   </Typography>
//                   <Typography sx={{ fontSize: "0.55rem", color: SILVER, mt: 0.3, letterSpacing: "0.05em" }}>
//                     {k.l.toUpperCase()}
//                   </Typography>
//                 </Box>
//               ))}
//             </Box>
//           )}
//         </Box>
//       </Box>

//       {/* ══ BODY ════════════════════════════════════════════════════════════ */}
//       <Box sx={{ flex: 1, p: 2.5, display: "flex", flexDirection: "column", gap: 2.5, bgcolor: INK }}>

//         {/* ── Fila de info: Documento + Stats ── */}
//         <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>

//           {/* Datos del documento */}
//           <Box sx={{
//             flex: "1 1 290px",
//             borderRadius: "10px",
//             bgcolor: INK2,
//             border: `1px solid ${INK3}`,
//             overflow: "hidden",
//           }}>
//             <Box sx={{ px: 2.5, py: 1.4, borderBottom: `1px solid ${INK3}`,
//               display: "flex", alignItems: "center", gap: 1 }}>
//               <ReceiptLongRounded sx={{ fontSize: 13, color: SILVER }} />
//               <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: SILVER,
//                 letterSpacing: "0.09em", textTransform: "uppercase" }}>
//                 Información del documento
//               </Typography>
//             </Box>
//             <Box sx={{ px: 2.5, py: 1.5 }}>
//               <MetaRow Icon={CalendarMonthRounded} label="Fecha movimiento"  value={fmt(movement.movementDate)} />
//               <MetaRow Icon={CalendarMonthRounded} label="Fecha recepción"   value={fmt(movement.receptionDate)} />
//               <MetaRow Icon={ReceiptLongRounded}   label="Guía de remisión"  value={movement.guiaRemision ?? null} mono />
//               <MetaRow Icon={ReceiptLongRounded}   label="Orden de compra"   value={movement.ordenCompra  ?? null} mono />
//               <MetaRow Icon={BusinessRounded}      label="Proveedor"         value={movement.proveedor    ?? null} />
//               <MetaRow Icon={PersonRounded}        label="Cliente"           value={movement.cliente      ?? null} />
//               <MetaRow Icon={WarehouseRounded}     label="Almacén origen"
//                 value={[movement.almacenOrigen, movement.subAlmacenOrigen].filter(Boolean).join(" › ") || null} />
//               <MetaRow Icon={WarehouseRounded}     label="Almacén destino"
//                 value={[movement.almacenDestino, movement.subAlmacenDestino].filter(Boolean).join(" › ") || null} />
//               {movement.notes && (
//                 <Box sx={{ mt: 1.5, pt: 1.5, borderTop: `1px solid ${INK3}` }}>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.8 }}>
//                     <NotesRounded sx={{ fontSize: 12, color: SILVER }} />
//                     <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color: SILVER,
//                       letterSpacing: "0.07em", textTransform: "uppercase" }}>Notas</Typography>
//                   </Box>
//                   <Typography sx={{ fontSize: "0.7rem", color: SILVER, lineHeight: 1.6,
//                     fontStyle: "italic", pl: 0.5, borderLeft: `2px solid ${INK3}` }}>
//                     {movement.notes}
//                   </Typography>
//                 </Box>
//               )}
//             </Box>
//           </Box>

//           {/* Stats (visible al cargar) */}
//           {loaded && (
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, flex: "0 1 auto" }}>
//               <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
//                 <StatBox label="Total ítems"   value={items.length}  accent={MIST}     />
//                 <StatBox label="Unidades"      value={totalQty}       accent="#4ADE80"  />
//                 <StatBox label="Con serial"    value={`${serialized}/${equipCount}`} accent="#A78BFA" />
//                 <StatBox label="Valor total"   value={fmtM(totalValue) ?? "—"} accent="#FCD34D" />
//               </Box>
//               {/* Mix por tipo */}
//               <Box sx={{
//                 borderRadius: "10px", bgcolor: INK2, border: `1px solid ${INK3}`,
//                 overflow: "hidden",
//               }}>
//                 <Box sx={{ px: 2, py: 1.2, borderBottom: `1px solid ${INK3}`,
//                   display: "flex", alignItems: "center", gap: 1 }}>
//                   <LayersRounded sx={{ fontSize: 12, color: SILVER }} />
//                   <Typography sx={{ fontSize: "0.58rem", fontWeight: 800, color: SILVER,
//                     letterSpacing: "0.09em", textTransform: "uppercase" }}>
//                     Composición por tipo
//                   </Typography>
//                 </Box>
//                 <Box sx={{ px: 2, py: 1.2, display: "flex", gap: 0.8, flexWrap: "wrap" }}>
//                   {(["EQUIPMENT","MATERIAL","TOOL","EPP"] as ProductType[]).map(t => {
//                     const cnt = items.filter(i => i.productType === t).length;
//                     if (!cnt) return null;
//                     const cfg = getProd(t);
//                     const Icon = cfg.Icon;
//                     return (
//                       <Box key={t} sx={{
//                         display: "flex", alignItems: "center", gap: 0.7,
//                         px: 1.2, py: 0.6, borderRadius: "8px",
//                         bgcolor: cfg.bg, border: `1px solid ${cfg.border}`,
//                       }}>
//                         <Icon sx={{ fontSize: 12, color: cfg.color }} />
//                         <Typography sx={{ fontSize: "0.65rem", color: cfg.color, fontWeight: 700 }}>
//                           {cfg.label}
//                         </Typography>
//                         <Box sx={{ width: 1, height: 14, bgcolor: cfg.border, mx: 0.2 }} />
//                         <Typography sx={{ fontSize: "0.72rem", color: cfg.color, fontWeight: 900, fontFamily: "monospace" }}>
//                           {cnt}
//                         </Typography>
//                       </Box>
//                     );
//                   })}
//                 </Box>
//               </Box>
//             </Box>
//           )}
//         </Box>

//         {/* ── Tabla de ítems ── */}
//         <Box sx={{
//           borderRadius: "10px", bgcolor: INK2,
//           border: `1px solid ${INK3}`,
//           overflow: "hidden", flex: 1,
//         }}>
//           {/* Toolbar */}
//           <Box sx={{
//             px: 2.5, py: 1.6, borderBottom: `1px solid ${INK3}`,
//             display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap",
//             bgcolor: INK,
//           }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <GridViewRounded sx={{ fontSize: 13, color: SILVER }} />
//               <Typography sx={{ fontSize: "0.62rem", fontWeight: 800, color: MIST,
//                 letterSpacing: "0.08em", textTransform: "uppercase" }}>
//                 Ítems del movimiento
//               </Typography>
//               {loaded && (
//                 <Box sx={{ px: 0.8, py: 0.1, borderRadius: "5px",
//                   bgcolor: flujo.color + "20", border: `1px solid ${flujo.color}40` }}>
//                   <Typography sx={{ fontSize: "0.58rem", fontWeight: 800, color: flujo.color }}>
//                     {items.length}
//                   </Typography>
//                 </Box>
//               )}
//             </Box>

//             <Box sx={{ flex: 1 }} />

//             {loaded && (
//               <>
//                 <TextField size="small" placeholder="Código · descripción · serial..."
//                   value={search} onChange={e => setSearch(e.target.value)}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <SearchRounded sx={{ fontSize: 14, color: SILVER }} />
//                       </InputAdornment>
//                     ),
//                     endAdornment: search ? (
//                       <InputAdornment position="end">
//                         <IconButton size="small" onClick={() => setSearch("")} sx={{ color: SILVER }}>
//                           <CloseRounded sx={{ fontSize: 11 }} />
//                         </IconButton>
//                       </InputAdornment>
//                     ) : null,
//                   }}
//                   sx={{
//                     width: 240,
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: "8px", fontSize: "0.78rem",
//                       bgcolor: INK2, color: MIST,
//                       "& fieldset": { borderColor: INK3 },
//                       "&:hover fieldset": { borderColor: SILVER + "60" },
//                       "&.Mui-focused fieldset": { borderColor: SILVER },
//                     },
//                     "& input::placeholder": { color: SILVER, opacity: 1 },
//                   }}
//                 />
//                 <Box sx={{ width: 180 }}>
//                   <SelectBase size="small" label="Todos" value={typeFilter}
//                     onChange={v => setTypeFilter(String(v))}
//                     options={[
//                       { label: "Todos los tipos", value: "ALL"       },
//                       { label: "📦 Materiales",   value: "MATERIAL"  },
//                       { label: "⚙️ Equipos",       value: "EQUIPMENT" },
//                       { label: "🔧 Herramientas",  value: "TOOL"      },
//                       { label: "🦺 EPP",           value: "EPP"       },
//                     ]}
//                     fullWidth
//                   />
//                 </Box>
//                 {filtered.length !== items.length && (
//                   <Typography sx={{ fontSize: "0.65rem", color: SILVER, whiteSpace: "nowrap" }}>
//                     {filtered.length} / {items.length}
//                   </Typography>
//                 )}
//                 <Tooltip title="Recargar ítems">
//                   <IconButton size="small" onClick={loadItems} disabled={loading} sx={{
//                     color: SILVER, border: `1px solid ${INK3}`, borderRadius: "7px",
//                     "&:hover": { color: WHITE, borderColor: SILVER + "60" },
//                   }}>
//                     <RefreshRounded sx={{ fontSize: 14 }} />
//                   </IconButton>
//                 </Tooltip>
//               </>
//             )}
//           </Box>

//           {/* Contenido */}
//           <Box sx={{ height: 430 }}>
//             {loading && (
//               <Box>{[1,2,3,4,5,6,7].map(n => <RowSkel key={n} />)}</Box>
//             )}

//             {!loaded && !loading && (
//               <Box sx={{ height: "100%", display: "flex", flexDirection: "column",
//                 alignItems: "center", justifyContent: "center", gap: 1.5 }}>
//                 <GridViewRounded sx={{ fontSize: 40, color: INK3 }} />
//                 <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: SILVER }}>
//                   Ítems no cargados
//                 </Typography>
//               </Box>
//             )}

//             {loaded && !loading && (
//               <DataGrid
//                 rows={filtered}
//                 columns={columns}
//                 pageSizeOptions={[25]}
//                 paginationModel={{ page, pageSize: 25 }}
//                 onPaginationModelChange={m => setPage(m.page)}
//                 disableRowSelectionOnClick
//                 rowHeight={44}
//                 columnHeaderHeight={36}
//                 sx={{
//                   height: "100%",
//                   border: "none",
//                   bgcolor: INK2,
//                   color: MIST,

//                   // ─ Headers: negro absoluto ─
//                   "& .MuiDataGrid-columnHeaders": {
//                     bgcolor: `${INK} !important`,
//                     borderBottom: `1px solid ${INK3}`,
//                     minHeight: "36px !important",
//                     maxHeight: "36px !important",
//                   },
//                   "& .MuiDataGrid-columnHeader": {
//                     bgcolor: `${INK} !important`,
//                     "&:focus, &:focus-within": { outline: "none" },
//                   },
//                   "& .MuiDataGrid-columnHeaderTitle": {
//                     color: MIST, fontWeight: 800, fontSize: "0.6rem", letterSpacing: "0.07em",
//                   },
//                   "& .MuiDataGrid-sortIcon":    { color: SILVER },
//                   "& .MuiDataGrid-menuIcon svg": { color: SILVER },
//                   "& .MuiDataGrid-columnSeparator": { color: INK3 },
//                   "& .MuiDataGrid-iconSeparator": { color: INK3 },

//                   // ─ Celdas ─
//                   "& .MuiDataGrid-cell": {
//                     borderColor: `${INK3} !important`,
//                     fontSize: "0.75rem",
//                     color: MIST,
//                     alignContent: "center",
//                     "&:focus, &:focus-within": { outline: "none" },
//                   },
//                   "& .MuiDataGrid-row": {
//                     bgcolor: INK2,
//                     "&:hover": { bgcolor: INK3 },
//                     "&.Mui-selected": { bgcolor: INK3 + " !important" },
//                   },
//                   "& .MuiDataGrid-row:nth-of-type(even)": {
//                     bgcolor: `${INK}99`,
//                     "&:hover": { bgcolor: INK3 },
//                   },

//                   // ─ Footer ─
//                   "& .MuiDataGrid-footerContainer": {
//                     borderColor: INK3, bgcolor: INK,
//                     minHeight: "40px",
//                   },
//                   "& .MuiTablePagination-root":    { color: SILVER, fontSize: "0.7rem" },
//                   "& .MuiTablePagination-actions svg": { color: SILVER },
//                   "& .MuiSelect-icon": { color: SILVER },
//                   "& .MuiTablePagination-select": { color: SILVER },

//                   // ─ Scrollbar ─
//                   "& ::-webkit-scrollbar":       { width: 5, height: 5 },
//                   "& ::-webkit-scrollbar-track": { bgcolor: INK },
//                   "& ::-webkit-scrollbar-thumb": { bgcolor: INK3, borderRadius: 4 },
//                 }}
//                 slots={{
//                   noRowsOverlay: () => (
//                     <Box sx={{ display: "flex", flexDirection: "column",
//                       alignItems: "center", justifyContent: "center",
//                       height: "100%", gap: 1 }}>
//                       <SearchRounded sx={{ fontSize: 28, color: INK3 }} />
//                       <Typography sx={{ fontSize: "0.72rem", color: SILVER }}>
//                         Sin ítems que coincidan
//                       </Typography>
//                     </Box>
//                   ),
//                 }}
//               />
//             )}
//           </Box>

//           {/* Footer total */}
//           {loaded && totalValue > 0 && (
//             <Box sx={{
//               px: 2.5, py: 1.2, borderTop: `1px solid ${INK3}`,
//               bgcolor: INK,
//               display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1.5,
//             }}>
//               <AttachMoneyRounded sx={{ fontSize: 13, color: SILVER }} />
//               <Typography sx={{ fontSize: "0.68rem", color: SILVER }}>Valor total estimado:</Typography>
//               <Typography sx={{ fontWeight: 800, color: "#FCD34D", fontFamily: "monospace", fontSize: "0.9rem" }}>
//                 S/ {totalValue.toFixed(2)}
//               </Typography>
//             </Box>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// }

"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Box, Typography, IconButton, CircularProgress,
  TextField, InputAdornment, Divider, Chip, Skeleton, Tooltip,
} from "@mui/material";
import {
  ArrowBackRounded,
  TrendingUpRounded, TrendingDownRounded, SyncAltRounded,
  LayersRounded, CalendarMonthRounded,
  ReceiptLongRounded, BusinessRounded, PersonRounded, WarehouseRounded,
  RefreshRounded, SearchRounded, CloseRounded, QrCodeScannerRounded,
  Inventory2Rounded, BuildRounded, ConstructionRounded, SecurityRounded,
  RouterRounded, SignalCellularAltRounded, TagRounded,
  LocalShippingRounded, CheckCircleRounded, HelpOutlineRounded,
  GridViewRounded, InfoRounded, ExpandMoreRounded,
  FiberManualRecordRounded, NotesRounded,
  NumbersRounded, AttachMoneyRounded, SourceRounded,
  LocationOnRounded,
} from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SelectBase from "@/src/components/base/SelectBase";
import { API_URL } from "@/src/lib/config";
import dayjs from "dayjs";
import { toast } from "react-toastify";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type ProductType = "MATERIAL" | "TOOL" | "EQUIPMENT" | "EPP";

export interface MovementHeader {
  id: number;
  movementCode?: string;
  movementType: string;
  subtype: string;
  movementDate: string;
  receptionDate?: string;
  guiaRemision?: string;
  ordenCompra?: string;
  almacenOrigen?: string;
  almacenDestino?: string;
  subAlmacenOrigen?: string;
  subAlmacenDestino?: string;
  proveedor?: string;
  cliente?: string;
  notes?: string;
  createdBy?: number;
  createdAt?: string;
  totalItems?: number;
  totalValue?: number;
  status?: string;
}

export interface MovementDetail {
  id: number;
  headerId: number;
  itemCode: string;
  itemDescription: string;
  description?: string;
  productType: ProductType;
  quantity: number;
  unitPrice?: number;
  serialNumber?: string;
  macAddress?: string;
  mtaMacAddress?: string;
  mtaMac?: string;
  unitAddress?: string;
  supplySource?: string;
  locationCode?: string;
}

// ─── Paleta LIGHT ENTERPRISE ─────────────────────────────────────────────────

const INK    = "#FFFFFF";   // fondo principal → blanco
const INK2   = "#F7F9FC";   // fondo secundario → gris hielo
const INK3   = "#E8EDF4";   // bordes / separadores
const SILVER = "#6B7A99";   // texto secundario / labels
const MIST   = "#1A2340";   // texto primario
const FROST  = "#F0F4FA";   // hover rows
const WHITE  = "#0A0F1A";   // texto fuerte (inversión)

// ─── Config de flujo ──────────────────────────────────────────────────────────

interface FlujoCfg {
  color: string; dim: string; bg: string; border: string;
  Icon: React.ElementType; label: string;
  stripe: string;
}

const FLUJO_CFG: Record<string, FlujoCfg> = {
  ENTRY:         { color: "#166534", dim: "#15803D", bg: "#F0FDF4", border: "#86EFAC", Icon: TrendingUpRounded,   label: "Entrada",       stripe: "rgba(22,101,52,0.04)"   },
  EXIT:          { color: "#991B1B", dim: "#DC2626", bg: "#FEF2F2", border: "#FCA5A5", Icon: TrendingDownRounded, label: "Salida",        stripe: "rgba(153,27,27,0.04)"   },
  TRANSFER:      { color: "#4C1D95", dim: "#7C3AED", bg: "#F5F3FF", border: "#C4B5FD", Icon: SyncAltRounded,     label: "Transferencia", stripe: "rgba(76,29,149,0.04)"   },
  ENTRADA:       { color: "#166534", dim: "#15803D", bg: "#F0FDF4", border: "#86EFAC", Icon: TrendingUpRounded,   label: "Entrada",       stripe: "rgba(22,101,52,0.04)"   },
  SALIDA:        { color: "#991B1B", dim: "#DC2626", bg: "#FEF2F2", border: "#FCA5A5", Icon: TrendingDownRounded, label: "Salida",        stripe: "rgba(153,27,27,0.04)"   },
  TRANSFERENCIA: { color: "#4C1D95", dim: "#7C3AED", bg: "#F5F3FF", border: "#C4B5FD", Icon: SyncAltRounded,     label: "Transferencia", stripe: "rgba(76,29,149,0.04)"   },
};

const getFlujo = (t: string): FlujoCfg =>
  FLUJO_CFG[t] ?? { color: SILVER, dim: SILVER, bg: INK3, border: INK3, Icon: LayersRounded, label: t, stripe: "rgba(107,122,153,0.04)" };

// ─── Config de productos ──────────────────────────────────────────────────────

interface ProdCfg {
  label: string; emoji: string;
  color: string; bg: string; border: string; dot: string;
  Icon: React.ElementType;
}

const PRODUCT_CFG: Record<string, ProdCfg> = {
  MATERIAL:  { label: "Material",    emoji: "📦", color: "#92400E", bg: "#FFFBEB", border: "#FDE68A", dot: "#D97706", Icon: Inventory2Rounded   },
  TOOL:      { label: "Herramienta", emoji: "🔧", color: "#1E3A8A", bg: "#EFF6FF", border: "#BFDBFE", dot: "#3B82F6", Icon: BuildRounded         },
  EQUIPMENT: { label: "Equipo",      emoji: "⚙️", color: "#14532D", bg: "#F0FDF4", border: "#BBF7D0", dot: "#16A34A", Icon: ConstructionRounded  },
  EPP:       { label: "EPP",         emoji: "🦺", color: "#4C1D95", bg: "#F5F3FF", border: "#DDD6FE", dot: "#7C3AED", Icon: SecurityRounded      },
};

const getProd = (t: string): ProdCfg =>
  PRODUCT_CFG[t] ?? PRODUCT_CFG.MATERIAL;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt  = (d?: string) => d ? dayjs(d).format("DD MMM YYYY") : null;
const fmtM = (v?: number) => (v != null && v > 0) ? `S/ ${v.toFixed(2)}` : null;
const pad  = (id: number) => `MOV-${String(id).padStart(6, "0")}`;

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function RowSkel() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 2.5, py: 1.4,
      borderBottom: `1px solid ${INK3}` }}>
      <Skeleton variant="circular" width={30} height={30} sx={{ bgcolor: INK3, flexShrink: 0 }} />
      <Skeleton variant="rounded" width={80}  height={11} sx={{ bgcolor: INK3 }} />
      <Skeleton variant="rounded" width={200} height={11} sx={{ bgcolor: INK3, flex: 1 }} />
      <Skeleton variant="rounded" width={48}  height={22} sx={{ bgcolor: INK3 }} />
      <Skeleton variant="rounded" width={120} height={22} sx={{ bgcolor: INK3 }} />
    </Box>
  );
}

function MetaRow({
  Icon, label, value, mono = false,
}: { Icon: React.ElementType; label: string; value: string | null; mono?: boolean }) {
  if (!value) return null;
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, py: 0.9,
      borderBottom: `1px solid ${INK3}` }}>
      <Icon sx={{ fontSize: 13, color: SILVER, mt: "2px", flexShrink: 0 }} />
      <Typography sx={{ flex: 1, fontSize: "0.68rem", color: SILVER, lineHeight: 1.4 }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: MIST, textAlign: "right",
        fontFamily: mono ? "monospace" : "inherit", lineHeight: 1.4 }}>
        {value}
      </Typography>
    </Box>
  );
}

function StatBox({ label, value, accent, sub }: {
  label: string; value: React.ReactNode; accent: string; sub?: string;
}) {
  return (
    <Box sx={{ flex: "1 1 110px", p: 2, borderRadius: "10px",
      bgcolor: INK, border: `1px solid ${INK3}`,
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      display: "flex", flexDirection: "column", gap: 0.4 }}>
      <Typography sx={{ fontSize: "0.58rem", fontWeight: 700, color: SILVER,
        letterSpacing: "0.08em", textTransform: "uppercase" }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: "1.1rem", fontWeight: 800, color: accent,
        fontFamily: "monospace", lineHeight: 1.1 }}>
        {value}
      </Typography>
      {sub && (
        <Typography sx={{ fontSize: "0.6rem", color: SILVER }}>{sub}</Typography>
      )}
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  movement: MovementHeader;
  onBack: () => void;
}

export default function KardexMovementDetail({ movement, onBack }: Props) {
  const flujo = getFlujo(movement.movementType);
  const FlujoIcon = flujo.Icon;

  const [items,       setItems]       = useState<MovementDetail[]>([]);
  const [loading,     setLoading]     = useState(false);
  const [loaded,      setLoaded]      = useState(false);
  const [search,      setSearch]      = useState("");
  const [typeFilter,  setTypeFilter]  = useState("ALL");
  const [page,        setPage]        = useState(0);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/movements-headers/kardex-movements?` +
        new URLSearchParams({
          tenantId: "1", hubId: "1", projectId: "1",
          headerId: String(movement.id),
          periodStartDate: "2025-01-01",
          periodEndDate:   "2026-12-31",
        })
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : (data.data ?? []));
      setLoaded(true);
    } catch (e: any) {
      toast.error(`Error al cargar ítems: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }, [movement.id]);

  useEffect(() => { loadItems(); }, [loadItems]);

  const filtered = items.filter(i => {
    const matchType = typeFilter === "ALL" || i.productType === typeFilter;
    const q = search.toLowerCase();
    const desc = i.itemDescription || i.description || "";
    return matchType && (!q
      || i.itemCode?.toLowerCase().includes(q)
      || desc.toLowerCase().includes(q)
      || (i.serialNumber ?? "").toLowerCase().includes(q));
  });

  const totalQty   = items.reduce((s, i) => s + (i.quantity ?? 0), 0);
  const totalValue = items.reduce((s, i) => s + (i.quantity ?? 0) * (i.unitPrice ?? 0), 0);
  const equipCount = items.filter(i => i.productType === "EQUIPMENT").length;
  const serialized = items.filter(i => i.productType === "EQUIPMENT" && i.serialNumber).length;

  // ── Columnas DataGrid ─────────────────────────────────────────────────────

  const columns: GridColDef[] = [
    {
      field: "productType", headerName: "TIPO", width: 122,
      renderHeader: () => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
          <GridViewRounded sx={{ fontSize: 12, color: SILVER }} />
          <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: MIST, letterSpacing: "0.07em" }}>TIPO</Typography>
        </Box>
      ),
      renderCell: (p) => {
        const cfg = getProd(p.value);
        const Icon = cfg.Icon;
        return (
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.6,
            px: 1, py: 0.3, borderRadius: "6px", bgcolor: cfg.bg, border: `1px solid ${cfg.border}` }}>
            <Icon sx={{ fontSize: 11, color: cfg.color }} />
            <Typography sx={{ fontSize: "0.62rem", fontWeight: 800, color: cfg.color }}>{cfg.label}</Typography>
          </Box>
        );
      },
    },
    {
      field: "itemCode", headerName: "CÓDIGO", width: 138,
      renderHeader: () => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
          <TagRounded sx={{ fontSize: 12, color: SILVER }} />
          <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: MIST, letterSpacing: "0.07em" }}>CÓDIGO</Typography>
        </Box>
      ),
      renderCell: (p) => {
        const cfg = getProd(p.row.productType);
        return (
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5,
            px: 0.8, py: 0.25, borderRadius: "5px", bgcolor: cfg.bg, border: `1px solid ${cfg.border}` }}>
            <FiberManualRecordRounded sx={{ fontSize: 6, color: cfg.dot }} />
            <Typography sx={{ fontSize: "0.7rem", fontWeight: 800, color: cfg.color, fontFamily: "monospace" }}>
              {p.value}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "itemDescription", headerName: "DESCRIPCIÓN", flex: 1, minWidth: 210,
      valueGetter: (_: any, row: any) => row.itemDescription || row.description || "",
      renderHeader: () => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
          <NotesRounded sx={{ fontSize: 12, color: SILVER }} />
          <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: MIST, letterSpacing: "0.07em" }}>DESCRIPCIÓN</Typography>
        </Box>
      ),
      renderCell: (p) => (
        <Typography sx={{ fontSize: "0.72rem", color: MIST, lineHeight: 1.3 }}>{p.value}</Typography>
      ),
    },
    {
      field: "quantity", headerName: "CANT.", width: 84, align: "center", headerAlign: "center",
      renderHeader: () => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, justifyContent: "center", width: "100%" }}>
          <NumbersRounded sx={{ fontSize: 12, color: SILVER }} />
          <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: MIST, letterSpacing: "0.07em" }}>CANT.</Typography>
        </Box>
      ),
      renderCell: (p) => (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Box sx={{ px: 1.1, py: 0.3, borderRadius: "6px",
            bgcolor: "rgba(255,255,255,0.06)", border: `1px solid ${INK3}` }}>
            <Typography sx={{ fontSize: "0.75rem", fontWeight: 800, color: WHITE, fontFamily: "monospace" }}>
              {p.value}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "unitPrice", headerName: "P. UNIT.", width: 96, align: "right", headerAlign: "right",
      renderHeader: () => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, justifyContent: "flex-end", width: "100%" }}>
          <AttachMoneyRounded sx={{ fontSize: 12, color: SILVER }} />
          <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: MIST, letterSpacing: "0.07em" }}>P. UNIT.</Typography>
        </Box>
      ),
      renderCell: (p) => (
        <Typography sx={{ fontSize: "0.68rem", fontWeight: 600, color: p.value > 0 ? "#FCD34D" : INK3,
          fontFamily: "monospace", textAlign: "right", width: "100%", pr: 0.5 }}>
          {p.value > 0 ? `S/ ${Number(p.value).toFixed(2)}` : "—"}
        </Typography>
      ),
    },
    {
      field: "serialNumber", headerName: "N° SERIE", width: 185,
      renderHeader: () => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
          <QrCodeScannerRounded sx={{ fontSize: 12, color: SILVER }} />
          <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: MIST, letterSpacing: "0.07em" }}>N° SERIE</Typography>
        </Box>
      ),
      renderCell: (p) => p.value ? (
        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5,
          px: 0.9, py: 0.3, borderRadius: "6px",
          bgcolor: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
          <CheckCircleRounded sx={{ fontSize: 10, color: "#22C55E" }} />
          <Typography sx={{ fontSize: "0.65rem", color: "#4ADE80", fontFamily: "monospace", fontWeight: 700 }}>
            {p.value}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.4 }}>
          <HelpOutlineRounded sx={{ fontSize: 11, color: INK3 }} />
          <Typography sx={{ fontSize: "0.65rem", color: INK3 }}>sin serial</Typography>
        </Box>
      ),
    },
    {
      field: "macAddress", headerName: "MAC", width: 155,
      renderHeader: () => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
          <RouterRounded sx={{ fontSize: 12, color: SILVER }} />
          <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: MIST, letterSpacing: "0.07em" }}>MAC</Typography>
        </Box>
      ),
      renderCell: (p) => p.value ? (
        <Typography sx={{ fontSize: "0.64rem", color: "#93C5FD", fontFamily: "monospace" }}>{p.value}</Typography>
      ) : <Typography sx={{ fontSize: "0.65rem", color: INK3 }}>—</Typography>,
    },
    {
      field: "mtaMacAddress", headerName: "MTA MAC", width: 155,
      valueGetter: (_: any, row: any) => row.mtaMacAddress || row.mtaMac || "",
      renderHeader: () => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
          <SignalCellularAltRounded sx={{ fontSize: 12, color: SILVER }} />
          <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: MIST, letterSpacing: "0.07em" }}>MTA MAC</Typography>
        </Box>
      ),
      renderCell: (p) => p.value ? (
        <Typography sx={{ fontSize: "0.64rem", color: "#93C5FD", fontFamily: "monospace" }}>{p.value}</Typography>
      ) : <Typography sx={{ fontSize: "0.65rem", color: INK3 }}>—</Typography>,
    },
    {
      field: "unitAddress", headerName: "UA", width: 95,
      renderHeader: () => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
          <LocationOnRounded sx={{ fontSize: 12, color: SILVER }} />
          <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: MIST, letterSpacing: "0.07em" }}>UA</Typography>
        </Box>
      ),
      renderCell: (p) => p.value ? (
        <Typography sx={{ fontSize: "0.65rem", color: "#D1D5DB", fontFamily: "monospace" }}>{p.value}</Typography>
      ) : <Typography sx={{ fontSize: "0.65rem", color: INK3 }}>—</Typography>,
    },
    {
      field: "supplySource", headerName: "FUENTE", width: 110,
      renderHeader: () => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
          <SourceRounded sx={{ fontSize: 12, color: SILVER }} />
          <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: MIST, letterSpacing: "0.07em" }}>FUENTE</Typography>
        </Box>
      ),
      renderCell: (p) => p.value ? (
        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5,
          px: 0.8, py: 0.2, borderRadius: "5px",
          bgcolor: "rgba(255,255,255,0.05)", border: `1px solid ${INK3}` }}>
          <LocalShippingRounded sx={{ fontSize: 10, color: SILVER }} />
          <Typography sx={{ fontSize: "0.62rem", color: MIST, fontWeight: 600 }}>{p.value}</Typography>
        </Box>
      ) : <Typography sx={{ fontSize: "0.65rem", color: INK3 }}>—</Typography>,
    },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0, bgcolor: INK2, minHeight: "100%", borderRadius: "12px", overflow: "hidden", border: `1px solid ${INK3}` }}>

      {/* ══ HERO HEADER ════════════════════════════════════════════════════ */}
      <Box sx={{
        position: "relative", overflow: "hidden",
        background: `linear-gradient(135deg, ${INK} 0%, ${INK2} 60%, ${flujo.bg} 100%)`,
        borderBottom: `1px solid ${INK3}`,
        px: 3, pt: 3, pb: 2.5,
      }}>
        {/* Accent bar top */}
        <Box sx={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          // background: `linear-gradient(90deg, ${flujo.color}00, ${flujo.color}CC, ${flujo.color}00)`,
        }} />
        {/* Glow orb */}
        <Box sx={{
          position: "absolute", top: -60, right: -60,
          width: 220, height: 220, borderRadius: "50%",
          background: `radial-gradient(circle, ${flujo.color}10 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        {/* Stripe pattern */}
        <Box sx={{
          position: "absolute", bottom: 0, right: 0, width: 180, height: "100%",
          background: `repeating-linear-gradient(-45deg, transparent, transparent 8px, ${flujo.stripe} 8px, ${flujo.stripe} 9px)`,
          opacity: 0.7, pointerEvents: "none",
        }} />

        {/* Back + info */}
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, position: "relative" }}>
          <Tooltip title="Volver al listado">
            <IconButton onClick={onBack} size="small" sx={{
              mt: 0.4, flexShrink: 0,
              color: SILVER, border: `1px solid ${INK3}`, borderRadius: "8px",
              bgcolor: INK,
              "&:hover": { color: MIST, bgcolor: INK2, borderColor: SILVER + "60" },
            }}>
              <ArrowBackRounded sx={{ fontSize: 15 }} />
            </IconButton>
          </Tooltip>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Badges */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, flexWrap: "wrap" }}>
              <Box sx={{
                display: "inline-flex", alignItems: "center", gap: 0.7,
                px: 1.4, py: 0.45, borderRadius: "8px",
                bgcolor: flujo.bg, border: `1px solid ${flujo.border}`,
              }}>
                <FlujoIcon sx={{ fontSize: 14, color: flujo.color }} />
                <Typography sx={{ fontSize: "0.65rem", fontWeight: 800, color: flujo.color, letterSpacing: "0.06em" }}>
                  {flujo.label.toUpperCase()}
                </Typography>
              </Box>
              <Box sx={{
                px: 1.2, py: 0.45, borderRadius: "8px",
                bgcolor: INK2, border: `1px solid ${INK3}`,
              }}>
                <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color: SILVER, letterSpacing: "0.04em" }}>
                  {movement.subtype?.replace(/_/g, " ")}
                </Typography>
              </Box>
            </Box>

            {/* Código */}
            <Typography sx={{
              fontWeight: 900, color: MIST, fontSize: "1.35rem", lineHeight: 1,
              letterSpacing: "-0.02em", fontFamily: "monospace",
            }}>
              {movement.movementCode ?? pad(movement.id)}
            </Typography>

            {/* Meta line */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 0.8, flexWrap: "wrap" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <CalendarMonthRounded sx={{ fontSize: 11, color: SILVER }} />
                <Typography sx={{ fontSize: "0.68rem", color: SILVER }}>
                  {fmt(movement.movementDate) ?? "—"}
                </Typography>
              </Box>
              {movement.guiaRemision && (
                <>
                  <Box sx={{ width: 3, height: 3, borderRadius: "50%", bgcolor: INK3 }} />
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <ReceiptLongRounded sx={{ fontSize: 11, color: SILVER }} />
                    <Typography sx={{ fontSize: "0.68rem", color: SILVER, fontFamily: "monospace" }}>
                      {movement.guiaRemision}
                    </Typography>
                  </Box>
                </>
              )}
              {movement.ordenCompra && (
                <>
                  <Box sx={{ width: 3, height: 3, borderRadius: "50%", bgcolor: INK3 }} />
                  <Typography sx={{ fontSize: "0.68rem", color: SILVER, fontFamily: "monospace" }}>
                    OC {movement.ordenCompra}
                  </Typography>
                </>
              )}
            </Box>
          </Box>

          {/* KPIs mini (solo cuando cargado) */}
          {loaded && (
            <Box sx={{ display: "flex", gap: 0.8, flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }}>
              {[
                { l: "Ítems",    v: items.length,  c: MIST      },
                { l: "Unidades", v: totalQty,       c: "#166534" },
                { l: "Valor",    v: totalValue > 0 ? `S/${totalValue.toFixed(0)}` : "—", c: "#92400E" },
              ].map(k => (
                <Box key={k.l} sx={{
                  textAlign: "center", px: 1.6, py: 1,
                  borderRadius: "8px",
                  bgcolor: INK,
                  border: `1px solid ${INK3}`,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}>
                  <Typography sx={{ fontWeight: 800, color: k.c, fontSize: "1rem", lineHeight: 1, fontFamily: "monospace" }}>
                    {k.v}
                  </Typography>
                  <Typography sx={{ fontSize: "0.55rem", color: SILVER, mt: 0.3, letterSpacing: "0.05em" }}>
                    {k.l.toUpperCase()}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {/* ══ BODY ════════════════════════════════════════════════════════════ */}
      <Box sx={{ flex: 1, p: 2.5, display: "flex", flexDirection: "column", gap: 2.5, bgcolor: INK2 }}>

        {/* ── Fila de info: Documento + Stats ── */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>

          {/* Datos del documento */}
          <Box sx={{
            flex: "1 1 290px",
            borderRadius: "10px",
            bgcolor: INK,
            border: `1px solid ${INK3}`,
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}>
            <Box sx={{ px: 2.5, py: 1.4, borderBottom: `1px solid ${INK3}`,
              bgcolor: INK2,
              display: "flex", alignItems: "center", gap: 1 }}>
              <ReceiptLongRounded sx={{ fontSize: 13, color: SILVER }} />
              <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: SILVER,
                letterSpacing: "0.09em", textTransform: "uppercase" }}>
                Información del documento
              </Typography>
            </Box>
            <Box sx={{ px: 2.5, py: 1.5 }}>
              <MetaRow Icon={CalendarMonthRounded} label="Fecha movimiento"  value={fmt(movement.movementDate)} />
              <MetaRow Icon={CalendarMonthRounded} label="Fecha recepción"   value={fmt(movement.receptionDate)} />
              <MetaRow Icon={ReceiptLongRounded}   label="Guía de remisión"  value={movement.guiaRemision ?? null} mono />
              <MetaRow Icon={ReceiptLongRounded}   label="Orden de compra"   value={movement.ordenCompra  ?? null} mono />
              <MetaRow Icon={BusinessRounded}      label="Proveedor"         value={movement.proveedor    ?? null} />
              <MetaRow Icon={PersonRounded}        label="Cliente"           value={movement.cliente      ?? null} />
              <MetaRow Icon={WarehouseRounded}     label="Almacén origen"
                value={[movement.almacenOrigen, movement.subAlmacenOrigen].filter(Boolean).join(" › ") || null} />
              <MetaRow Icon={WarehouseRounded}     label="Almacén destino"
                value={[movement.almacenDestino, movement.subAlmacenDestino].filter(Boolean).join(" › ") || null} />
              {movement.notes && (
                <Box sx={{ mt: 1.5, pt: 1.5, borderTop: `1px solid ${INK3}` }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.8 }}>
                    <NotesRounded sx={{ fontSize: 12, color: SILVER }} />
                    <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color: SILVER,
                      letterSpacing: "0.07em", textTransform: "uppercase" }}>Notas</Typography>
                  </Box>
                  <Typography sx={{ fontSize: "0.7rem", color: SILVER, lineHeight: 1.6,
                    fontStyle: "italic", pl: 0.5, borderLeft: `2px solid ${INK3}` }}>
                    {movement.notes}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          {/* Stats (visible al cargar) */}
          {loaded && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, flex: "0 1 auto" }}>
              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                <StatBox label="Total ítems"   value={items.length}  accent={MIST}     />
                <StatBox label="Unidades"      value={totalQty}       accent="#166534"  />
                <StatBox label="Con serial"    value={`${serialized}/${equipCount}`} accent="#4C1D95" />
                <StatBox label="Valor total"   value={fmtM(totalValue) ?? "—"} accent="#92400E" />
              </Box>
              {/* Mix por tipo */}
              <Box sx={{
                borderRadius: "10px", bgcolor: INK, border: `1px solid ${INK3}`,
                overflow: "hidden",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              }}>
                <Box sx={{ px: 2, py: 1.2, borderBottom: `1px solid ${INK3}`,
                  bgcolor: INK2,
                  display: "flex", alignItems: "center", gap: 1 }}>
                  <LayersRounded sx={{ fontSize: 12, color: SILVER }} />
                  <Typography sx={{ fontSize: "0.58rem", fontWeight: 800, color: SILVER,
                    letterSpacing: "0.09em", textTransform: "uppercase" }}>
                    Composición por tipo
                  </Typography>
                </Box>
                <Box sx={{ px: 2, py: 1.2, display: "flex", gap: 0.8, flexWrap: "wrap" }}>
                  {(["EQUIPMENT","MATERIAL","TOOL","EPP"] as ProductType[]).map(t => {
                    const cnt = items.filter(i => i.productType === t).length;
                    if (!cnt) return null;
                    const cfg = getProd(t);
                    const Icon = cfg.Icon;
                    return (
                      <Box key={t} sx={{
                        display: "flex", alignItems: "center", gap: 0.7,
                        px: 1.2, py: 0.6, borderRadius: "8px",
                        bgcolor: cfg.bg, border: `1px solid ${cfg.border}`,
                      }}>
                        <Icon sx={{ fontSize: 12, color: cfg.color }} />
                        <Typography sx={{ fontSize: "0.65rem", color: cfg.color, fontWeight: 700 }}>
                          {cfg.label}
                        </Typography>
                        <Box sx={{ width: 1, height: 14, bgcolor: cfg.border, mx: 0.2 }} />
                        <Typography sx={{ fontSize: "0.72rem", color: cfg.color, fontWeight: 900, fontFamily: "monospace" }}>
                          {cnt}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          )}
        </Box>

        {/* ── Tabla de ítems ── */}
        <Box sx={{
          borderRadius: "10px", bgcolor: INK,
          border: `1px solid ${INK3}`,
          overflow: "hidden", flex: 1,
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}>
          {/* Toolbar */}
          <Box sx={{
            px: 2.5, py: 1.6, borderBottom: `1px solid ${INK3}`,
            display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap",
            bgcolor: INK2,
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <GridViewRounded sx={{ fontSize: 13, color: SILVER }} />
              <Typography sx={{ fontSize: "0.62rem", fontWeight: 800, color: MIST,
                letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Ítems del movimiento
              </Typography>
              {loaded && (
                <Box sx={{ px: 0.8, py: 0.1, borderRadius: "5px",
                  bgcolor: flujo.color + "20", border: `1px solid ${flujo.color}40` }}>
                  <Typography sx={{ fontSize: "0.58rem", fontWeight: 800, color: flujo.color }}>
                    {items.length}
                  </Typography>
                </Box>
              )}
            </Box>

            <Box sx={{ flex: 1 }} />

            {loaded && (
              <>
                <TextField size="small" placeholder="Código · descripción · serial..."
                  value={search} onChange={e => setSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRounded sx={{ fontSize: 14, color: SILVER }} />
                      </InputAdornment>
                    ),
                    endAdornment: search ? (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setSearch("")} sx={{ color: SILVER }}>
                          <CloseRounded sx={{ fontSize: 11 }} />
                        </IconButton>
                      </InputAdornment>
                    ) : null,
                  }}
                  sx={{
                    width: 240,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px", fontSize: "0.78rem",
                      bgcolor: INK, color: MIST,
                      "& fieldset": { borderColor: INK3 },
                      "&:hover fieldset": { borderColor: SILVER + "80" },
                      "&.Mui-focused fieldset": { borderColor: SILVER },
                    },
                    "& input::placeholder": { color: SILVER, opacity: 1 },
                  }}
                />
                <Box sx={{ width: 180 }}>
                  <SelectBase size="small" label="Todos" value={typeFilter}
                    onChange={v => setTypeFilter(String(v))}
                    options={[
                      { label: "Todos los tipos", value: "ALL"       },
                      { label: "📦 Materiales",   value: "MATERIAL"  },
                      { label: "⚙️ Equipos",       value: "EQUIPMENT" },
                      { label: "🔧 Herramientas",  value: "TOOL"      },
                      { label: "🦺 EPP",           value: "EPP"       },
                    ]}
                    fullWidth
                  />
                </Box>
                {filtered.length !== items.length && (
                  <Typography sx={{ fontSize: "0.65rem", color: SILVER, whiteSpace: "nowrap" }}>
                    {filtered.length} / {items.length}
                  </Typography>
                )}
                <Tooltip title="Recargar ítems">
                  <IconButton size="small" onClick={loadItems} disabled={loading} sx={{
                    color: SILVER, border: `1px solid ${INK3}`, borderRadius: "7px",
                    bgcolor: INK,
                    "&:hover": { color: MIST, borderColor: SILVER + "80", bgcolor: INK2 },
                  }}>
                    <RefreshRounded sx={{ fontSize: 14 }} />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>

          {/* Contenido */}
          <Box sx={{ height: 430 }}>
            {loading && (
              <Box>{[1,2,3,4,5,6,7].map(n => <RowSkel key={n} />)}</Box>
            )}

            {!loaded && !loading && (
              <Box sx={{ height: "100%", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 1.5 }}>
                <GridViewRounded sx={{ fontSize: 40, color: INK3 }} />
                <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: SILVER }}>
                  Ítems no cargados
                </Typography>
              </Box>
            )}

            {loaded && !loading && (
              <DataGrid
                rows={filtered}
                columns={columns}
                pageSizeOptions={[25]}
                paginationModel={{ page, pageSize: 25 }}
                onPaginationModelChange={m => setPage(m.page)}
                disableRowSelectionOnClick
                rowHeight={44}
                columnHeaderHeight={36}
                sx={{
                  height: "100%",
                  border: "none",
                  bgcolor: INK,
                  color: MIST,

                  // ─ Headers: negro absoluto con texto blanco ─
                  "& .MuiDataGrid-columnHeaders": {
                    bgcolor: `white !important`,
                    // borderBottom: `1px solid #1C2940`,
                    minHeight: "36px !important",
                    maxHeight: "36px !important",
                  },
                  "& .MuiDataGrid-columnHeader": {
                    bgcolor: `white !important`,
                    "&:focus, &:focus-within": { outline: "none" },
                  },
                  "& .MuiDataGrid-columnHeaderTitle": {
                    color: "#C8D4E0", fontWeight: 800, fontSize: "0.6rem", letterSpacing: "0.07em",
                  },
                  "& .MuiDataGrid-sortIcon":    { color: "#8899AA" },
                  "& .MuiDataGrid-menuIcon svg": { color: "#8899AA" },
                  "& .MuiDataGrid-columnSeparator": { color: "#1C2940" },
                  "& .MuiDataGrid-iconSeparator": { color: "#1C2940" },

                  // ─ Celdas ─
                  "& .MuiDataGrid-cell": {
                    // borderColor: `${INK3} !important`,
                    fontSize: "0.75rem",
                    color: MIST,
                    alignContent: "center",
                    "&:focus, &:focus-within": { outline: "none" },
                  },
                  "& .MuiDataGrid-row": {
                    bgcolor: INK,
                    "&:hover": { bgcolor: INK2 },
                    "&.Mui-selected": { bgcolor: INK2 + " !important" },
                  },
                  "& .MuiDataGrid-row:nth-of-type(even)": {
                    bgcolor: INK2,
                    "&:hover": { bgcolor: INK3 },
                  },

                  // ─ Footer ─
                  "& .MuiDataGrid-footerContainer": {
                    borderColor: INK3, bgcolor: INK2,
                    minHeight: "40px",
                  },
                  "& .MuiTablePagination-root":    { color: SILVER, fontSize: "0.7rem" },
                  "& .MuiTablePagination-actions svg": { color: SILVER },
                  "& .MuiSelect-icon": { color: SILVER },
                  "& .MuiTablePagination-select": { color: SILVER },

                  // ─ Scrollbar ─
                  "& ::-webkit-scrollbar":       { width: 5, height: 5 },
                  "& ::-webkit-scrollbar-track": { bgcolor: INK2 },
                  "& ::-webkit-scrollbar-thumb": { bgcolor: INK3, borderRadius: 4 },
                }}
                slots={{
                  noRowsOverlay: () => (
                    <Box sx={{ display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                      height: "100%", gap: 1 }}>
                      <SearchRounded sx={{ fontSize: 28, color: INK3 }} />
                      <Typography sx={{ fontSize: "0.72rem", color: SILVER }}>
                        Sin ítems que coincidan
                      </Typography>
                    </Box>
                  ),
                }}
              />
            )}
          </Box>

          {/* Footer total */}
          {loaded && totalValue > 0 && (
            <Box sx={{
              px: 2.5, py: 1.2, borderTop: `1px solid ${INK3}`,
              bgcolor: INK2,
              display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1.5,
            }}>
              <AttachMoneyRounded sx={{ fontSize: 13, color: SILVER }} />
              <Typography sx={{ fontSize: "0.68rem", color: SILVER }}>Valor total estimado:</Typography>
              <Typography sx={{ fontWeight: 800, color: "#92400E", fontFamily: "monospace", fontSize: "0.9rem" }}>
                S/ {totalValue.toFixed(2)}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}