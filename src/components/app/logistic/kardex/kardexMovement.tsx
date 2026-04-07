// // // "use client";

// // // import { useState, useCallback, useRef, useEffect } from "react";
// // // import {
// // //   Box, Card, Typography, Chip, Stack, Paper, Alert,
// // //   TextField, IconButton, Fade, Collapse, CircularProgress,
// // //   Dialog, DialogTitle, DialogContent, DialogActions,
// // //   FormControlLabel, Switch, LinearProgress, InputAdornment,
// // //   Tooltip, Badge, Divider,
// // // } from "@mui/material";
// // // import {
// // //   TrendingUpOutlined, TrendingDownOutlined, CheckCircleOutline,
// // //   QrCodeScannerOutlined, CloseOutlined, DeleteOutline,
// // //   AddCircleOutline, InventoryOutlined, BuildOutlined,
// // //   ConstructionOutlined, ShieldOutlined, CheckCircle,
// // //   AutoAwesomeOutlined, SendOutlined, LayersOutlined,
// // //   SwapHorizOutlined, WarningAmberOutlined, InfoOutlined,
// // //   ArrowForwardOutlined, DoneAllOutlined, SearchOutlined,
// // //   RefreshOutlined, StorageOutlined, StoreOutlined,
// // //   PersonOutlined, CalendarTodayOutlined,
// // //   ReceiptOutlined, BusinessOutlined, SwapVertOutlined,
// // //   FiberManualRecordOutlined, CheckCircleRounded,
// // //   RadioButtonUncheckedOutlined, ArrowRightAltOutlined,
// // //   AccountTreeOutlined, HistoryOutlined,
// // // } from "@mui/icons-material";
// // // import ButtonBase from "@/src/components/base/ButtonBase";
// // // import SelectBase from "@/src/components/base/SelectBase";
// // // import { TitleCard } from "@/src/components/base/TitleCard";
// // // import { toast } from "react-toastify";
// // // import { API_URL } from "@/src/lib/config";
// // // import dayjs from "dayjs";

// // // // ─── Paleta neutral enterprise ─────────────────────────────────────────────
// // // // Accent único: azul pizarra #1e40af / indigo
// // // // Estado ENTRADA: esmeralda suave  #059669
// // // // Estado SALIDA:  rojo slate        #b91c1c
// // // // Estado TRANSFER: violeta slate   #5b21b6
// // // // Todo lo demás: zinc/slate neutros

// // // // ─── Tipos ─────────────────────────────────────────────────────────────────

// // // type TipoFlujo   = "ENTRADA" | "SALIDA" | "TRANSFERENCIA";
// // // type ProductType = "MATERIAL" | "TOOL" | "EQUIPMENT" | "EPP";
// // // type EquipoTipo  = "MODEM" | "DECODIFICADOR" | "ROUTER" | "SWITCH" | "OTRO";

// // // interface ContextField {
// // //   key: string;
// // //   label: string;
// // //   placeholder: string;
// // //   required: boolean;
// // //   type: "text" | "date" | "select";
// // //   options?: { label: string; value: string }[];
// // //   icon: React.ReactNode;
// // //   helperText?: string;
// // // }

// // // interface SubtipoMovimiento {
// // //   value: string;
// // //   label: string;
// // //   description: string;
// // //   icon: React.ReactNode;
// // //   flujo: TipoFlujo;
// // //   movementType: "ENTRY" | "EXIT" | "TRANSFER";
// // //   contextFields: ContextField[];
// // // }

// // // interface HubInventoryItem {
// // //   id: number;
// // //   itemId: number;
// // //   itemCode: string;
// // //   description: string;
// // //   productType: ProductType;
// // //   supplySource: string;
// // //   quantityAvailable: number;
// // //   minimumStock: number;
// // //   maximumStock: number | null;
// // //   locationCode: string | null;
// // //   averageCost: number | null;
// // // }

// // // interface KardexLineItem {
// // //   inventoryId: number;
// // //   itemId: number;
// // //   itemCode: string;
// // //   description: string;
// // //   productType: ProductType;
// // //   supplySource: string;
// // //   quantityAvailable: number;
// // //   quantity: number;
// // //   unitPrice: number;
// // //   _rawQty?: string;
// // //   serials?: EquipoSerial[];
// // // }

// // // interface EquipoSerial {
// // //   serialNumber: string;
// // //   mac?: string;
// // //   ua?: string;
// // //   mtaMac?: string;
// // // }

// // // // ─── Helpers campo ──────────────────────────────────────────────────────────

// // // const makeField = (
// // //   key: string, label: string, placeholder: string,
// // //   icon: React.ReactNode, required = true,
// // //   type: "text" | "date" | "select" = "text",
// // //   options?: { label: string; value: string }[],
// // //   helperText?: string
// // // ): ContextField => ({ key, label, placeholder, icon, required, type, options, helperText });

// // // const F_GUIA_INGRESO   = makeField("guiaIngreso",    "Guía de Remisión Ingreso",  "GR-2025-001", <ReceiptOutlined sx={{ fontSize: 14 }} />);
// // // const F_GUIA_DESPACHO  = makeField("guiaDespacho",   "Guía de Remisión Despacho", "GR-2025-001", <ReceiptOutlined sx={{ fontSize: 14 }} />);
// // // const F_GUIA           = makeField("guia",           "Guía de Remisión",          "GR-2025-001", <ReceiptOutlined sx={{ fontSize: 14 }} />);
// // // const F_FECHA_REC      = makeField("fechaRecepcion", "Fecha de Recepción",        "",            <CalendarTodayOutlined sx={{ fontSize: 14 }} />, true, "date");
// // // const F_FECHA_MOV      = makeField("fechaMovimiento","Fecha de Movimiento",       "",            <CalendarTodayOutlined sx={{ fontSize: 14 }} />, true, "date");
// // // const F_ORDEN_COMPRA   = makeField("ordenCompra",    "Orden de Compra",           "OC-2025-001", <ReceiptOutlined sx={{ fontSize: 14 }} />);
// // // const F_PROVEEDOR      = makeField("proveedor",      "Proveedor",                 "LEMCORP S.A.",<BusinessOutlined sx={{ fontSize: 14 }} />, true, "text", undefined, "Nombre o código del proveedor");
// // // const F_CLIENTE        = makeField("cliente",        "Cliente",                   "CLARO PERÚ",  <PersonOutlined sx={{ fontSize: 14 }} />);
// // // const F_CLIENTE_DEST   = makeField("clienteDestino", "Cliente Destino",           "CLARO PERÚ",  <PersonOutlined sx={{ fontSize: 14 }} />);
// // // const F_ALM_ORIGEN     = makeField("almacenOrigen",  "Almacén Origen",            "HUB-CALLAO-01",<StoreOutlined sx={{ fontSize: 14 }} />);
// // // const F_SUB_ALM_ORIGEN = makeField("subAlmOrigen",   "Sub Almacén Origen",        "ZONA-A",      <StorageOutlined sx={{ fontSize: 14 }} />, false);
// // // const F_ALM_DESTINO    = makeField("almacenDestino", "Almacén Destino",           "HUB-SJL-02",  <StoreOutlined sx={{ fontSize: 14 }} />);
// // // const F_SUB_ALM_DEST   = makeField("subAlmDestino",  "Sub Almacén Destino",       "ZONA-B",      <StorageOutlined sx={{ fontSize: 14 }} />, false);

// // // // ─── Subtipos ───────────────────────────────────────────────────────────────

// // // const SUBTIPOS: SubtipoMovimiento[] = [
// // //   {
// // //     value: "COMPRA_LOCAL", label: "Compra Local", flujo: "ENTRADA", movementType: "ENTRY",
// // //     description: "Ingreso por compra directa a proveedor local",
// // //     icon: <InventoryOutlined sx={{ fontSize: 18 }} />,
// // //     contextFields: [F_GUIA_INGRESO, F_FECHA_REC, F_ORDEN_COMPRA, F_PROVEEDOR, F_ALM_DESTINO, F_SUB_ALM_DEST],
// // //   },
// // //   {
// // //     value: "CONSIGNACION_RECIBIDA", label: "Consignación Recibida", flujo: "ENTRADA", movementType: "ENTRY",
// // //     description: "Ingreso por consignación enviada por cliente",
// // //     icon: <BusinessOutlined sx={{ fontSize: 18 }} />,
// // //     contextFields: [F_GUIA_INGRESO, F_FECHA_REC, F_ORDEN_COMPRA, F_CLIENTE, F_ALM_DESTINO, F_SUB_ALM_DEST],
// // //   },
// // //   {
// // //     value: "DEVOLUCION_CONTRATISTA", label: "Devolución de Contratista", flujo: "ENTRADA", movementType: "ENTRY",
// // //     description: "Material devuelto por contratista o técnico al hub",
// // //     icon: <ArrowForwardOutlined sx={{ fontSize: 18, transform: "rotate(180deg)" }} />,
// // //     contextFields: [F_GUIA, F_ALM_ORIGEN, F_SUB_ALM_ORIGEN, F_ALM_DESTINO, F_SUB_ALM_DEST],
// // //   },
// // //   {
// // //     value: "TRANSFERENCIA_ALMACENES_E", label: "Transferencia entre Almacenes", flujo: "ENTRADA", movementType: "ENTRY",
// // //     description: "Ingreso por traspaso desde otro hub",
// // //     icon: <SwapVertOutlined sx={{ fontSize: 18 }} />,
// // //     contextFields: [F_GUIA, F_FECHA_MOV, F_ALM_ORIGEN, F_SUB_ALM_ORIGEN, F_ALM_DESTINO, F_SUB_ALM_DEST],
// // //   },
// // //   {
// // //     value: "DESPACHO_REGULAR", label: "Despacho Regular", flujo: "SALIDA", movementType: "EXIT",
// // //     description: "Salida por despacho a técnico o cuadrilla para servicio",
// // //     icon: <ArrowForwardOutlined sx={{ fontSize: 18 }} />,
// // //     contextFields: [F_GUIA_DESPACHO, F_FECHA_MOV, F_ALM_ORIGEN, F_SUB_ALM_ORIGEN, F_ALM_DESTINO, F_SUB_ALM_DEST],
// // //   },
// // //   {
// // //     value: "DEVOLUCION_CLIENTE", label: "Devolución a Cliente", flujo: "SALIDA", movementType: "EXIT",
// // //     description: "Devolución de material al cliente propietario",
// // //     icon: <PersonOutlined sx={{ fontSize: 18 }} />,
// // //     contextFields: [F_GUIA, F_FECHA_MOV, F_ALM_ORIGEN, F_SUB_ALM_ORIGEN, F_CLIENTE_DEST],
// // //   },
// // //   {
// // //     value: "TRASPASO_CONTRATISTA", label: "Traspaso Contratista", flujo: "SALIDA", movementType: "EXIT",
// // //     description: "Traspaso de material a cliente o contratista del cliente",
// // //     icon: <SwapHorizOutlined sx={{ fontSize: 18 }} />,
// // //     contextFields: [F_GUIA, F_FECHA_MOV, F_ALM_ORIGEN, F_SUB_ALM_ORIGEN, F_CLIENTE_DEST],
// // //   },
// // //   {
// // //     value: "TRANSFERENCIA_ALMACENES_S", label: "Transferencia entre Almacenes", flujo: "SALIDA", movementType: "EXIT",
// // //     description: "Salida por traspaso a otro hub",
// // //     icon: <SwapVertOutlined sx={{ fontSize: 18 }} />,
// // //     contextFields: [F_GUIA, F_FECHA_MOV, F_ALM_ORIGEN, F_SUB_ALM_ORIGEN, F_ALM_DESTINO, F_SUB_ALM_DEST],
// // //   },
// // //   {
// // //     value: "TRANSFERENCIA_ALMACENES", label: "Transferencia entre Almacenes", flujo: "TRANSFERENCIA", movementType: "TRANSFER",
// // //     description: "Traspaso simultáneo entre hubs o almacenes",
// // //     icon: <AccountTreeOutlined sx={{ fontSize: 18 }} />,
// // //     contextFields: [F_GUIA, F_FECHA_MOV, F_ALM_ORIGEN, F_SUB_ALM_ORIGEN, F_ALM_DESTINO, F_SUB_ALM_DEST],
// // //   },
// // // ];

// // // // ─── Config visual ──────────────────────────────────────────────────────────

// // // // Paleta NEUTRAL: cada tipo tiene un accent contenido, no saturado
// // // const PRODUCT_CFG: Record<ProductType, {
// // //   label: string; icon: React.ReactNode; emoji: string;
// // //   color: string; bg: string; border: string;
// // // }> = {
// // //   MATERIAL:  { label: "Material",    icon: <InventoryOutlined    sx={{ fontSize: 14 }} />, emoji: "📦", color: "#78350f", bg: "#fef3c7", border: "#fde68a" },
// // //   TOOL:      { label: "Herramienta", icon: <BuildOutlined        sx={{ fontSize: 14 }} />, emoji: "🔧", color: "#1e3a8a", bg: "#eff6ff", border: "#bfdbfe" },
// // //   EQUIPMENT: { label: "Equipo",      icon: <ConstructionOutlined sx={{ fontSize: 14 }} />, emoji: "⚙️", color: "#14532d", bg: "#f0fdf4", border: "#bbf7d0" },
// // //   EPP:       { label: "EPP",         icon: <ShieldOutlined       sx={{ fontSize: 14 }} />, emoji: "🦺", color: "#4c1d95", bg: "#faf5ff", border: "#ddd6fe" },
// // // };

// // // const FLUJO_CFG: Record<TipoFlujo, {
// // //   color: string; dimColor: string; bg: string; border: string;
// // //   icon: React.ReactNode; label: string; desc: string;
// // // }> = {
// // //   ENTRADA:       { color: "#059669", dimColor: "#d1fae5", bg: "#f0fdf4", border: "#6ee7b7", icon: <TrendingUpOutlined sx={{ fontSize: 22 }} />,    label: "Entrada",        desc: "Ingreso de stock al hub"       },
// // //   SALIDA:        { color: "#b91c1c", dimColor: "#fee2e2", bg: "#fff5f5", border: "#fca5a5", icon: <TrendingDownOutlined sx={{ fontSize: 22 }} />,   label: "Salida",         desc: "Egreso de stock del hub"      },
// // //   TRANSFERENCIA: { color: "#5b21b6", dimColor: "#ede9fe", bg: "#faf5ff", border: "#c4b5fd", icon: <SwapVertOutlined sx={{ fontSize: 22 }} />,       label: "Transferencia",  desc: "Movimiento entre almacenes"   },
// // // };

// // // // ─── Pistoleo ───────────────────────────────────────────────────────────────

// // // type CampoConfig = { field: string; label: string; placeholder: string };

// // // const CAMPOS_EQUIPO: Record<EquipoTipo, CampoConfig[]> = {
// // //   MODEM:         [{ field: "serialNumber", label: "Nro. Serie", placeholder: "ZTEATV45501950107" }, { field: "mac", label: "MAC Address", placeholder: "6C:B8:81:F2:B7:D7" }, { field: "ua", label: "UA", placeholder: "12345678" }],
// // //   DECODIFICADOR: [{ field: "serialNumber", label: "Nro. Serie", placeholder: "ZTEATV45501950107" }, { field: "mac", label: "MAC Address", placeholder: "6C:B8:81:F2:B7:D7" }],
// // //   ROUTER:        [{ field: "serialNumber", label: "Nro. Serie", placeholder: "ZTEATV45501950107" }, { field: "mac", label: "MAC Address", placeholder: "6C:B8:81:F2:B7:D7" }, { field: "mtaMac", label: "MTA MAC", placeholder: "CC00F1CA6351" }],
// // //   SWITCH:        [{ field: "serialNumber", label: "Nro. Serie", placeholder: "ZTEATV45501950107" }, { field: "mac", label: "MAC Address", placeholder: "6C:B8:81:F2:B7:D7" }],
// // //   OTRO:          [{ field: "serialNumber", label: "Nro. Serie", placeholder: "ZTEATV45501950107" }],
// // // };

// // // const VALIDACIONES: Record<string, { regex: RegExp; mensaje: string }> = {
// // //   serialNumber: { regex: /^[A-Z0-9]{8,25}$/,                      mensaje: "Alfanumérico 8–25 caracteres" },
// // //   mac:          { regex: /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/, mensaje: "Formato: 6C:B8:81:F2:B7:D7"   },
// // //   mtaMac:       { regex: /^[0-9A-Fa-f]{12}$/,                     mensaje: "12 hex sin separadores"       },
// // //   ua:           { regex: /^.{6,12}$/,                              mensaje: "6–12 caracteres"               },
// // // };

// // // const getEquipoTipo = (desc: string): EquipoTipo => {
// // //   const d = desc.toUpperCase();
// // //   if (d.includes("MODEM") || d.includes("HFC"))           return "MODEM";
// // //   if (d.includes("DECODIFICADOR") || d.includes("AMINO")) return "DECODIFICADOR";
// // //   if (d.includes("ROUTER") || d.includes("WIFI"))         return "ROUTER";
// // //   if (d.includes("SWITCH"))                               return "SWITCH";
// // //   return "OTRO";
// // // };

// // // const TENANT_ID  = 1;
// // // const HUB_ID     = 1;
// // // const PROJECT_ID = 1;
// // // const USER_ID    = 1;
// // // const PAGE_SIZE  = 15;

// // // // ─── Paso indicator ─────────────────────────────────────────────────────────

// // // interface StepDotProps {
// // //   number: number;
// // //   label: string;
// // //   active: boolean;
// // //   done: boolean;
// // // }

// // // function StepDot({ number, label, active, done }: StepDotProps) {
// // //   return (
// // //     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // //       <Box sx={{
// // //         width: 28, height: 28, borderRadius: "50%",
// // //         display: "flex", alignItems: "center", justifyContent: "center",
// // //         transition: "all 0.3s ease",
// // //         bgcolor: done ? "#059669" : active ? "#1e40af" : "#e2e8f0",
// // //         border: `2px solid ${done ? "#059669" : active ? "#1e40af" : "#cbd5e1"}`,
// // //         boxShadow: active ? "0 0 0 3px rgba(30,64,175,0.12)" : "none",
// // //       }}>
// // //         {done
// // //           ? <CheckCircle sx={{ fontSize: 14, color: "white" }} />
// // //           : <Typography variant="caption" fontWeight={800} sx={{ color: active ? "white" : "#94a3b8", fontSize: "0.65rem" }}>{number}</Typography>
// // //         }
// // //       </Box>
// // //       <Typography variant="caption" fontWeight={active || done ? 700 : 500}
// // //         sx={{ color: active ? "#1e40af" : done ? "#059669" : "#94a3b8", fontSize: "0.72rem", display: { xs: "none", sm: "block" } }}>
// // //         {label}
// // //       </Typography>
// // //     </Box>
// // //   );
// // // }

// // // // ─── Panel informativo lateral ───────────────────────────────────────────────

// // // interface SummaryPanelProps {
// // //   tipoFlujo: TipoFlujo | null;
// // //   subtipo: SubtipoMovimiento | null;
// // //   ctxValues: Record<string, string>;
// // //   lineItems: KardexLineItem[];
// // //   totalMovements: number;
// // //   totalValue: number;
// // //   validationErrors: string[];
// // //   notes: string;
// // // }

// // // function SummaryPanel({ tipoFlujo, subtipo, ctxValues, lineItems, totalMovements, totalValue, validationErrors, notes }: SummaryPanelProps) {
// // //   const flujo = tipoFlujo ? FLUJO_CFG[tipoFlujo] : null;

// // //   return (
// // //     <Box sx={{
// // //       width: { lg: 280 }, flexShrink: 0,
// // //       display: { xs: "none", lg: "flex" },
// // //       flexDirection: "column", gap: 0,
// // //       position: "sticky", top: 24, alignSelf: "flex-start",
// // //     }}>
// // //       <Card elevation={0} sx={{
// // //         borderRadius: 3,
// // //         border: "1px solid #e2e8f0",
// // //         overflow: "hidden",
// // //         bgcolor: "white",
// // //       }}>
// // //         {/* Header panel */}
// // //         <Box sx={{
// // //           px: 2.5, py: 2,
// // //           bgcolor: "#0f172a",
// // //           display: "flex", alignItems: "center", gap: 1.5,
// // //         }}>
// // //           <HistoryOutlined sx={{ fontSize: 18, color: "rgba(255,255,255,0.5)" }} />
// // //           <Typography variant="subtitle2" fontWeight={700} sx={{ color: "white", fontSize: "0.8rem" }}>
// // //             Resumen del Movimiento
// // //           </Typography>
// // //         </Box>

// // //         <Box sx={{ p: 2.5, display: "flex", flexDirection: "column", gap: 2.5 }}>

// // //           {/* Tipo flujo */}
// // //           <Box>
// // //             <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 700, letterSpacing: 1, fontSize: "0.6rem", display: "block", mb: 1 }}>
// // //               TIPO DE MOVIMIENTO
// // //             </Typography>
// // //             {flujo ? (
// // //               <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1.5, borderRadius: 2, bgcolor: flujo.bg, border: `1px solid ${flujo.border}` }}>
// // //                 <Box sx={{ color: flujo.color }}>{flujo.icon}</Box>
// // //                 <Box>
// // //                   <Typography variant="body2" fontWeight={700} sx={{ color: flujo.color, lineHeight: 1 }}>{flujo.label}</Typography>
// // //                   <Typography variant="caption" sx={{ color: flujo.color, opacity: 0.7, fontSize: "0.65rem" }}>{flujo.desc}</Typography>
// // //                 </Box>
// // //               </Box>
// // //             ) : (
// // //               <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "#f8fafc", border: "1px dashed #e2e8f0" }}>
// // //                 <Typography variant="caption" sx={{ color: "#94a3b8" }}>Sin seleccionar</Typography>
// // //               </Box>
// // //             )}
// // //           </Box>

// // //           {/* Subtipo */}
// // //           <Box>
// // //             <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 700, letterSpacing: 1, fontSize: "0.6rem", display: "block", mb: 1 }}>
// // //               SUBTIPO
// // //             </Typography>
// // //             {subtipo ? (
// // //               <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1.5, borderRadius: 2, bgcolor: "#f8fafc", border: "1px solid #e2e8f0" }}>
// // //                 <Box sx={{ color: "#475569" }}>{subtipo.icon}</Box>
// // //                 <Typography variant="body2" fontWeight={600} sx={{ color: "#1e293b", fontSize: "0.78rem", lineHeight: 1.3 }}>{subtipo.label}</Typography>
// // //               </Box>
// // //             ) : (
// // //               <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "#f8fafc", border: "1px dashed #e2e8f0" }}>
// // //                 <Typography variant="caption" sx={{ color: "#94a3b8" }}>Sin seleccionar</Typography>
// // //               </Box>
// // //             )}
// // //           </Box>

// // //           {/* Campos contexto completados */}
// // //           {Object.keys(ctxValues).filter(k => ctxValues[k]?.trim()).length > 0 && (
// // //             <Box>
// // //               <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 700, letterSpacing: 1, fontSize: "0.6rem", display: "block", mb: 1 }}>
// // //                 DATOS DEL DOCUMENTO
// // //               </Typography>
// // //               <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
// // //                 {(subtipo?.contextFields ?? []).filter(f => ctxValues[f.key]?.trim()).map(f => (
// // //                   <Box key={f.key} sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
// // //                     <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.68rem", flexShrink: 0 }}>{f.label}:</Typography>
// // //                     <Typography variant="caption" fontWeight={700} sx={{ color: "#1e293b", fontSize: "0.68rem", textAlign: "right", wordBreak: "break-word" }}>
// // //                       {ctxValues[f.key]}
// // //                     </Typography>
// // //                   </Box>
// // //                 ))}
// // //               </Box>
// // //             </Box>
// // //           )}

// // //           <Divider sx={{ borderColor: "#f1f5f9" }} />

// // //           {/* KPIs ítems */}
// // //           <Box>
// // //             <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 700, letterSpacing: 1, fontSize: "0.6rem", display: "block", mb: 1.5 }}>
// // //               ÍTEMS DEL MOVIMIENTO
// // //             </Typography>
// // //             <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
// // //               {[
// // //                 { label: "Total ítems",       value: lineItems.length,   active: lineItems.length > 0 },
// // //                 { label: "Movimientos",       value: totalMovements,     active: totalMovements > 0   },
// // //                 { label: "Equipos c/serial",  value: `${lineItems.filter(i => i.productType === "EQUIPMENT" && (i.serials?.length ?? 0) > 0).length} / ${lineItems.filter(i => i.productType === "EQUIPMENT").length}`, active: lineItems.some(i => i.productType === "EQUIPMENT") },
// // //               ].map(kpi => (
// // //                 <Box key={kpi.label} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // //                   <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.7rem" }}>{kpi.label}</Typography>
// // //                   <Typography variant="caption" fontWeight={700} sx={{ color: kpi.active ? "#1e293b" : "#cbd5e1", fontSize: "0.78rem" }}>
// // //                     {kpi.value}
// // //                   </Typography>
// // //                 </Box>
// // //               ))}
// // //               {totalValue > 0 && (
// // //                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 0.5, pt: 1, borderTop: "1px solid #f1f5f9" }}>
// // //                   <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.7rem" }}>Valor estimado</Typography>
// // //                   <Typography variant="caption" fontWeight={800} sx={{ color: "#1e293b", fontFamily: "monospace", fontSize: "0.82rem" }}>
// // //                     S/ {totalValue.toFixed(2)}
// // //                   </Typography>
// // //                 </Box>
// // //               )}
// // //             </Box>
// // //           </Box>

// // //           {/* Líneas del carrito resumidas */}
// // //           {lineItems.length > 0 && (
// // //             <>
// // //               <Divider sx={{ borderColor: "#f1f5f9" }} />
// // //               <Box>
// // //                 <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 700, letterSpacing: 1, fontSize: "0.6rem", display: "block", mb: 1 }}>
// // //                   PRODUCTOS
// // //                 </Typography>
// // //                 <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6, maxHeight: 160, overflowY: "auto",
// // //                   "&::-webkit-scrollbar": { width: 3 }, "&::-webkit-scrollbar-thumb": { bgcolor: "#e2e8f0", borderRadius: 2 } }}>
// // //                   {lineItems.map(item => {
// // //                     const cfg         = PRODUCT_CFG[item.productType];
// // //                     const isEquipo    = item.productType === "EQUIPMENT";
// // //                     const serialCount = item.serials?.length ?? 0;
// // //                     const ok          = isEquipo ? serialCount === item.quantity : item.quantity > 0;
// // //                     return (
// // //                       <Box key={item.inventoryId} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // //                         {ok
// // //                           ? <CheckCircleRounded sx={{ fontSize: 13, color: "#059669", flexShrink: 0 }} />
// // //                           : <RadioButtonUncheckedOutlined sx={{ fontSize: 13, color: "#f59e0b", flexShrink: 0 }} />
// // //                         }
// // //                         <Typography variant="caption" sx={{ flex: 1, color: "#475569", fontSize: "0.68rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
// // //                           {item.itemCode}
// // //                         </Typography>
// // //                         <Typography variant="caption" fontWeight={700} sx={{ color: cfg.color, fontSize: "0.68rem", flexShrink: 0 }}>
// // //                           {isEquipo ? serialCount : item.quantity}
// // //                         </Typography>
// // //                       </Box>
// // //                     );
// // //                   })}
// // //                 </Box>
// // //               </Box>
// // //             </>
// // //           )}

// // //           {/* Validaciones */}
// // //           {validationErrors.length > 0 && lineItems.length > 0 && (
// // //             <>
// // //               <Divider sx={{ borderColor: "#f1f5f9" }} />
// // //               <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "#fffbeb", border: "1px solid #fde68a" }}>
// // //                 <Typography variant="caption" fontWeight={700} sx={{ color: "#92400e", fontSize: "0.68rem", display: "block", mb: 0.8 }}>
// // //                   {validationErrors.length} pendiente{validationErrors.length > 1 ? "s" : ""}
// // //                 </Typography>
// // //                 {validationErrors.slice(0, 3).map((e, i) => (
// // //                   <Typography key={i} variant="caption" sx={{ color: "#78350f", fontSize: "0.65rem", display: "block", lineHeight: 1.5 }}>
// // //                     • {e}
// // //                   </Typography>
// // //                 ))}
// // //                 {validationErrors.length > 3 && (
// // //                   <Typography variant="caption" sx={{ color: "#78350f", fontSize: "0.65rem" }}>
// // //                     +{validationErrors.length - 3} más...
// // //                   </Typography>
// // //                 )}
// // //               </Box>
// // //             </>
// // //           )}

// // //           {notes.trim() && (
// // //             <>
// // //               <Divider sx={{ borderColor: "#f1f5f9" }} />
// // //               <Box>
// // //                 <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 700, letterSpacing: 1, fontSize: "0.6rem", display: "block", mb: 0.8 }}>
// // //                   NOTAS
// // //                 </Typography>
// // //                 <Typography variant="caption" sx={{ color: "#475569", fontSize: "0.7rem", fontStyle: "italic", lineHeight: 1.5 }}>
// // //                   "{notes}"
// // //                 </Typography>
// // //               </Box>
// // //             </>
// // //           )}
// // //         </Box>
// // //       </Card>
// // //     </Box>
// // //   );
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // COMPONENTE PRINCIPAL
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // export default function KardexMovement() {
// // //   const topRef = useRef<HTMLDivElement>(null);

// // //   const [tipoFlujo, setTipoFlujo] = useState<TipoFlujo | null>(null);
// // //   const [subtipo,   setSubtipo]   = useState<SubtipoMovimiento | null>(null);
// // //   const [ctxValues, setCtxValues] = useState<Record<string, string>>({});
// // //   const [notes,     setNotes]     = useState("");

// // //   const [filterType,       setFilterType]       = useState<string>("ALL");
// // //   const [inventorySearch,  setInventorySearch]  = useState("");
// // //   const [debouncedSearch,  setDebouncedSearch]  = useState("");
// // //   const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
// // //   const [inventoryRows,    setInventoryRows]    = useState<HubInventoryItem[]>([]);
// // //   const [inventoryTotal,   setInventoryTotal]   = useState(0);
// // //   const [inventoryPage,    setInventoryPage]    = useState(0);
// // //   const [inventoryPages,   setInventoryPages]   = useState(1);
// // //   const [loadingInventory, setLoadingInventory] = useState(false);
// // //   const [reloadTrigger,    setReloadTrigger]    = useState(0);

// // //   const [lineItems, setLineItems] = useState<KardexLineItem[]>([]);

// // //   const [addEquipoOpen, setAddEquipoOpen] = useState(false);
// // //   const [addEquipoItem, setAddEquipoItem] = useState<HubInventoryItem | null>(null);
// // //   const [addEquipoCant, setAddEquipoCant] = useState("1");

// // //   const [pistoleoOpen, setPistoleoOpen]       = useState(false);
// // //   const [pistoleoItem, setPistoleoItem]       = useState<KardexLineItem | null>(null);
// // //   const [serialActual, setSerialActual]       = useState<Partial<EquipoSerial>>({});
// // //   const [serialesCap,  setSerialésCapturados] = useState<EquipoSerial[]>([]);
// // //   const [camposError,  setCamposError]        = useState<Record<string, string>>({});
// // //   const [autoGuardar,  setAutoGuardar]        = useState(true);

// // //   const [submitting,  setSubmitting]  = useState(false);
// // //   const [showSuccess, setShowSuccess] = useState(false);

// // //   // ── Debounce ──────────────────────────────────────────────────────────
// // //   useEffect(() => {
// // //     if (searchTimer.current) clearTimeout(searchTimer.current);
// // //     searchTimer.current = setTimeout(() => { setDebouncedSearch(inventorySearch); setInventoryPage(0); }, 380);
// // //     return () => { if (searchTimer.current) clearTimeout(searchTimer.current); };
// // //   }, [inventorySearch]);

// // //   useEffect(() => { setCtxValues({}); }, [subtipo]);

// // //   // ── Fetch ─────────────────────────────────────────────────────────────
// // //   const fetchInventory = useCallback(async (page = 0) => {
// // //     setLoadingInventory(true);
// // //     try {
// // //       const params = new URLSearchParams({
// // //         tenantId: String(TENANT_ID), hubId: String(HUB_ID),
// // //         page: String(page), size: String(PAGE_SIZE),
// // //         ...(filterType !== "ALL"   ? { productType: filterType }        : {}),
// // //         ...(debouncedSearch.trim() ? { search: debouncedSearch.trim() } : {}),
// // //       });
// // //       const res = await fetch(`${API_URL}/api/hub-inventory?${params}`);
// // //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
// // //       const data: any = await res.json();
// // //       const content: HubInventoryItem[] = data.data.content ?? [];
// // //       setInventoryRows(content);
// // //       setInventoryTotal(data.data.page?.totalElements ?? data.data.totalElements ?? content.length);
// // //       setInventoryPages(data.data.page?.totalPages   ?? data.data.totalPages    ?? 1);
// // //       setInventoryPage(page);
// // //     } catch (e: any) { toast.error(`Error inventario: ${e.message}`); }
// // //     finally { setLoadingInventory(false); }
// // //   }, [filterType, debouncedSearch, reloadTrigger]);

// // //   useEffect(() => { fetchInventory(0); }, [fetchInventory]);

// // //   const setCtx = (key: string, val: string) => setCtxValues(prev => ({ ...prev, [key]: val }));

// // //   const ctxMissing = (subtipo?.contextFields ?? [])
// // //     .filter(f => f.required && !ctxValues[f.key]?.trim())
// // //     .map(f => f.label);

// // //   // ── Items ─────────────────────────────────────────────────────────────
// // //   const addNonEquipmentItem = (inv: HubInventoryItem) => {
// // //     if (lineItems.some(li => li.inventoryId === inv.id)) { toast.info(`${inv.itemCode} ya agregado`); return; }
// // //     if (tipoFlujo !== "ENTRADA" && inv.quantityAvailable <= 0) { toast.warning(`${inv.itemCode} sin stock`); return; }
// // //     setLineItems(prev => [...prev, {
// // //       inventoryId: inv.id, itemId: inv.itemId, itemCode: inv.itemCode,
// // //       description: inv.description, productType: inv.productType,
// // //       supplySource: inv.supplySource, quantityAvailable: inv.quantityAvailable,
// // //       quantity: 1, unitPrice: inv.averageCost ?? 0, _rawQty: "1", serials: [],
// // //     }]);
// // //     toast.success(`${inv.itemCode} agregado`);
// // //   };

// // //   const openAddEquipo = (inv: HubInventoryItem) => {
// // //     if (lineItems.some(li => li.inventoryId === inv.id)) { toast.info(`${inv.itemCode} ya agregado`); return; }
// // //     setAddEquipoItem(inv); setAddEquipoCant("1"); setAddEquipoOpen(true);
// // //   };

// // //   const confirmAddEquipo = () => {
// // //     if (!addEquipoItem) return;
// // //     const cant = Math.max(1, parseInt(addEquipoCant, 10) || 1);
// // //     setLineItems(prev => [...prev, {
// // //       inventoryId: addEquipoItem.id, itemId: addEquipoItem.itemId,
// // //       itemCode: addEquipoItem.itemCode, description: addEquipoItem.description,
// // //       productType: "EQUIPMENT", supplySource: addEquipoItem.supplySource,
// // //       quantityAvailable: addEquipoItem.quantityAvailable,
// // //       quantity: cant, unitPrice: addEquipoItem.averageCost ?? 0,
// // //       _rawQty: String(cant), serials: [],
// // //     }]);
// // //     setAddEquipoOpen(false); setAddEquipoItem(null);
// // //     toast.success(`${addEquipoItem.itemCode} — ${cant} ud. listas`);
// // //   };

// // //   const removeItem  = (id: number) => setLineItems(prev => prev.filter(i => i.inventoryId !== id));
// // //   const updateQty   = (id: number, raw: string) => {
// // //     const v = parseInt(raw, 10);
// // //     setLineItems(prev => prev.map(i => i.inventoryId === id ? { ...i, quantity: isNaN(v) ? 0 : Math.max(0, v), _rawQty: raw } : i));
// // //   };
// // //   const updatePrice = (id: number, raw: string) => {
// // //     const v = parseFloat(raw);
// // //     setLineItems(prev => prev.map(i => i.inventoryId === id ? { ...i, unitPrice: isNaN(v) ? 0 : v } : i));
// // //   };

// // //   // ── Pistoleo ──────────────────────────────────────────────────────────
// // //   const abrirPistoleo = (item: KardexLineItem) => {
// // //     setPistoleoItem(item); setSerialActual({}); setCamposError({});
// // //     setSerialésCapturados(item.serials ? [...item.serials] : []);
// // //     setPistoleoOpen(true);
// // //   };

// // //   const validarCampo = (field: string, value: string) => {
// // //     if (!value.trim()) return "";
// // //     const r = VALIDACIONES[field];
// // //     return r && !r.regex.test(value.trim()) ? r.mensaje : "";
// // //   };

// // //   const checkAutoAgregar = useCallback((
// // //     ns: Partial<EquipoSerial>, tipo: EquipoTipo, totalReq: number, list: EquipoSerial[]
// // //   ) => {
// // //     if (!autoGuardar) return;
// // //     const campos = CAMPOS_EQUIPO[tipo];
// // //     if (!campos.every(c => !!(ns as any)[c.field]?.trim())) return;
// // //     if (campos.some(c => !!validarCampo(c.field, (ns as any)[c.field] ?? ""))) return;
// // //     const nueva = [...list, { ...ns } as EquipoSerial];
// // //     setSerialésCapturados(nueva); setSerialActual({}); setCamposError({});
// // //     if (pistoleoItem && nueva.length >= totalReq) guardarSerialesConLista(nueva);
// // //   }, [autoGuardar, pistoleoItem]);

// // //   const handleCampoChange = (field: string, value: string, tipo: EquipoTipo, totalReq: number) => {
// // //     const u = { ...serialActual, [field]: value };
// // //     setSerialActual(u);
// // //     const r = VALIDACIONES[field];
// // //     setCamposError(prev => ({ ...prev, [field]: r && value.trim() ? validarCampo(field, value) : "" }));
// // //     checkAutoAgregar(u, tipo, totalReq, serialesCap);
// // //   };

// // //   const agregarSerialManual = () => {
// // //     if (!pistoleoItem) return;
// // //     const tipo = getEquipoTipo(pistoleoItem.description);
// // //     const campos = CAMPOS_EQUIPO[tipo];
// // //     const errs: Record<string, string> = {};
// // //     let err = false;
// // //     campos.forEach(c => {
// // //       const v = (serialActual as any)[c.field] ?? "";
// // //       if (!v.trim()) { errs[c.field] = `${c.label} requerido`; err = true; }
// // //       else { const e = validarCampo(c.field, v); if (e) { errs[c.field] = e; err = true; } }
// // //     });
// // //     if (err) { setCamposError(errs); return; }
// // //     setSerialésCapturados(prev => [...prev, { ...serialActual } as EquipoSerial]);
// // //     setSerialActual({}); setCamposError({});
// // //   };

// // //   const guardarSerialesConLista = (lista: EquipoSerial[]) => {
// // //     if (!pistoleoItem) return;
// // //     setLineItems(prev => prev.map(i =>
// // //       i.inventoryId === pistoleoItem.inventoryId
// // //         ? { ...i, serials: lista, quantity: lista.length, _rawQty: String(lista.length) }
// // //         : i
// // //     ));
// // //     setPistoleoOpen(false);
// // //   };
// // //   const guardarSeriales = () => guardarSerialesConLista(serialesCap);

// // //   // ── Validaciones ──────────────────────────────────────────────────────
// // //   const validationErrors: string[] = [
// // //     ...ctxMissing.map(f => `Requerido: ${f}`),
// // //     ...(lineItems.length === 0 ? ["Agrega al menos un ítem"] : []),
// // //     ...lineItems.filter(i => i.quantity === 0).map(i => `${i.itemCode}: cantidad 0`),
// // //     ...lineItems.filter(i => i.productType === "EQUIPMENT" && (i.serials?.length ?? 0) === 0)
// // //       .map(i => `${i.itemCode}: sin seriales`),
// // //     ...(tipoFlujo !== "ENTRADA"
// // //       ? lineItems.filter(i => i.productType !== "EQUIPMENT" && i.quantity > i.quantityAvailable)
// // //           .map(i => `${i.itemCode}: supera stock (${i.quantityAvailable})`)
// // //       : []),
// // //   ];
// // //   const canSubmit = !subtipo || validationErrors.length === 0;

// // //   // ── Payload ───────────────────────────────────────────────────────────
// // //   // const buildPayload = () => ({
// // //   //   movements: lineItems.flatMap((item: any) =>
// // //   //     item.productType === "EQUIPMENT"
// // //   //       ? (item.serials ?? []).map((s: any) => ({
// // //   //           tenantId: TENANT_ID, hubId: HUB_ID, projectId: PROJECT_ID, createdBy: USER_ID,
// // //   //           itemId: item.itemId, inventoryId: item.inventoryId, productType: item.productType,
// // //   //           movementType: subtipo?.movementType ?? "ENTRY", subtype: subtipo?.value,
// // //   //           supplySource: item.supplySource, supplySourceEntityId: 1,
// // //   //           quantity: 1, unitPrice: item.unitPrice,
// // //   //           serialNumber: s.serialNumber, macAddress: s.mac ?? null,
// // //   //           mtaMacAddress: s.mtaMac ?? null, unitAddress: s.ua ?? null,
// // //   //           notes: notes || `${subtipo?.label} — ${item.itemCode}`,
// // //   //           ...ctxValues,
// // //   //         }))
// // //   //       : [{
// // //   //           tenantId: TENANT_ID, hubId: HUB_ID, projectId: PROJECT_ID, createdBy: USER_ID,
// // //   //           itemId: item.itemId, inventoryId: item.inventoryId, productType: item.productType,
// // //   //           movementType: subtipo?.movementType ?? "ENTRY", subtype: subtipo?.value,
// // //   //           supplySource: item.supplySource, supplySourceEntityId: 1,
// // //   //           quantity: item.quantity, unitPrice: item.unitPrice,
// // //   //           notes: notes || `${subtipo?.label} — ${item.itemCode}`,
// // //   //           ...ctxValues,
// // //   //         }]
// // //   //   ),
// // //   // });

// // //   const buildPayload = () => ({
// // //   movements: lineItems.flatMap((item) => {
// // //     // Resuelve la guía según el subtipo activo
// // //     const guiaRemision =
// // //       ctxValues.guiaIngreso  ??
// // //       ctxValues.guiaDespacho ??
// // //       ctxValues.guia         ??
// // //       null;

// // //     // Resuelve la fecha según el subtipo activo
// // //     const movementDate =
// // //       ctxValues.fechaRecepcion  ??
// // //       ctxValues.fechaMovimiento ??
// // //       null;

// // //     // Campos comunes a cualquier línea
// // //     const baseFields = {
// // //       tenantId:            TENANT_ID,
// // //       hubId:               HUB_ID,
// // //       projectId:           PROJECT_ID,
// // //       createdBy:           USER_ID,
// // //       itemId:              item.itemId,
// // //       inventoryId:         item.inventoryId,
// // //       productType:         item.productType,
// // //       movementType:        subtipo?.movementType ?? "ENTRY",
// // //       subtype:             subtipo?.value,
// // //       supplySource:        item.supplySource,
// // //       supplySourceEntityId: 1,
// // //       movementDate,
// // //       unitPrice:           item.unitPrice,
// // //       // Documento
// // //       guiaRemision,
// // //       ordenCompra:         ctxValues.ordenCompra         ?? null,
// // //       // Almacenes
// // //       almacenOrigen:       ctxValues.almacenOrigen       ?? null,
// // //       subAlmacenOrigen:    ctxValues.subAlmOrigen        ?? null,
// // //       almacenDestino:      ctxValues.almacenDestino      ?? null,
// // //       subAlmacenDestino:   ctxValues.subAlmDestino       ?? null,
// // //       // Entidades
// // //       proveedor:           ctxValues.proveedor           ?? null,
// // //       cliente:             ctxValues.cliente ?? ctxValues.clienteDestino ?? null,
// // //       // Notas
// // //       notes: notes || `${subtipo?.label} — ${item.itemCode}`,
// // //     };

// // //     // EQUIPMENT → una línea por serial pistoliado
// // //     if (item.productType === "EQUIPMENT") {
// // //       return (item.serials ?? []).map((s) => ({
// // //         ...baseFields,
// // //         quantity:       1,
// // //         serialNumber:   s.serialNumber,
// // //         macAddress:     s.mac    ?? null,
// // //         mtaMacAddress:  s.mtaMac ?? null,
// // //         unitAddress:    s.ua     ?? null,
// // //       }));
// // //     }

// // //     // MATERIAL / TOOL / EPP → una línea con cantidad total
// // //     return [{
// // //       ...baseFields,
// // //       quantity: item.quantity,
// // //     }];
// // //   }),
// // //   }); 

// // // const buildKardexMovementsHeaders = () => {
// // //   return {
    
// // //   tenantId: TENANT_ID,
// // //   hubId: HUB_ID,
// // //   projectId: PROJECT_ID,
// // //   createdBy: 1,
// // //   movementType: tipoFlujo,
// // //   subtype: subtipo?.value,
// // //   guiaRemision: "",
// // //   ordenCompra: "",
// // //   documentType: "DNI",
// // //   documentNumber: "48446398",

// // //   // CORRECCIÓN: Usar .format() para obtener un String, no el objeto completo
// // //   movementDate: dayjs().format("YYYY-MM-DD"), 
// // //   receptionDate: dayjs().format("YYYY-MM-DD"),

// // //   almacenOrigen: "NORTE",
// // //   subAlmacenOrigen: "STOCK",
// // //   almacenDestino: "CENTRO",
// // //   subAlmacenDestino: "STOCK",
// // //   proveedor: "CLARO",
// // //   cliente: "CLARO",
// // //   notes: ""
// // //   }

// // // };

// // //     const handleSubmit = async () => {
// // //       if (!canSubmit || !subtipo) return;
// // //       setSubmitting(true);
// // //       try {
// // // const payload = {
// // //   tenantId: TENANT_ID,
// // //   hubId: HUB_ID,
// // //   projectId: PROJECT_ID,
// // //   createdBy: 1,
// // //   movementType: "ENTRY",
// // //   subtype: subtipo.value,
// // //   guiaRemision: "",
// // //   ordenCompra: "",
// // //   documentType: "DNI",
// // //   documentNumber: "48446398",

// // //   // CORRECCIÓN: Usar .format() para obtener un String, no el objeto completo
// // //   movementDate: dayjs().format("YYYY-MM-DD"), 
// // //   receptionDate: dayjs().format("YYYY-MM-DD"),

// // //   almacenOrigen: "NORTE",
// // //   subAlmacenOrigen: "STOCK",
// // //   almacenDestino: "CENTRO",
// // //   subAlmacenDestino: "STOCK",
// // //   proveedor: "CLARO",
// // //   cliente: "CLARO",
// // //   notes: ""
// // //   } 


// // //   debugger
// // //         const res = await fetch(`${API_URL}/api/movements-headers`, {
// // //           method: "POST", 
// // //           headers: { "Content-Type": "application/json" },
// // //           body: JSON.stringify(payload),
// // //         });

// // //         // const res = await fetch(`${API_URL}/api/hub-inventory/kardex-batch`, {
// // //         //   method: "POST", headers: { "Content-Type": "application/json" },
// // //         //   body: JSON.stringify(buildPayload()),
// // //         // });
// // //         if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.message ?? `HTTP ${res.status}`); }
// // //         setShowSuccess(true);
// // //         setReloadTrigger(t => t + 1);
// // //         topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
// // //       } catch (err: any) { toast.error(`Error: ${err.message}`); }
// // //       finally { setSubmitting(false); }
// // //     };

// // //   const resetAll = () => {
// // //     setTipoFlujo(null); setSubtipo(null); setCtxValues({}); setNotes("");
// // //     setLineItems([]); setShowSuccess(false);
// // //   };

// // //   // ── Derivados ─────────────────────────────────────────────────────────
// // //   const accentColor    = tipoFlujo ? FLUJO_CFG[tipoFlujo].color : "#1e293b";
// // //   const isEntrada      = tipoFlujo === "ENTRADA";
// // //   const totalMovements = lineItems.reduce((s, i) => s + (i.productType === "EQUIPMENT" ? (i.serials?.length ?? 0) : i.quantity), 0);
// // //   const totalValue     = lineItems.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
// // //   const subtiposActivos = SUBTIPOS.filter(st =>
// // //     tipoFlujo === "TRANSFERENCIA" ? st.flujo === "TRANSFERENCIA" : st.flujo === tipoFlujo
// // //   );

// // //   // ── Steps progress ────────────────────────────────────────────────────
// // //   const step1Done = !!tipoFlujo;
// // //   const step2Done = !!subtipo;
// // //   const step3Done = subtipo !== null && ctxMissing.length === 0;
// // //   const step4Done = lineItems.length > 0;

// // //   // ─────────────────────────────────────────────────────────────────────
// // //   // RENDER
// // //   // ─────────────────────────────────────────────────────────────────────
// // //   return (
// // //     <Box ref={topRef} sx={{ maxWidth: 1600, mx: "auto", py: { xs: 2, md: 3 }, display: "flex", flexDirection: "column", gap: 2.5 }}>

// // //       {/* <TitleCard
// // //         icon={<LayersOutlined sx={{ fontSize: 32 }} />}
// // //         title="Registro de Movimientos del Local"
// // //         description="Registra entradas, salidas y transferencias del inventario del hub con trazabilidad completa."
// // //       /> */}

// // //       {/* ══ SUCCESS ═══════════════════════════════════════════════════════ */}
// // //       <Fade in={showSuccess} timeout={600} unmountOnExit>
// // //         <Card elevation={0} sx={{
// // //           borderRadius: 3, border: "1px solid #d1fae5",
// // //           bgcolor: "#f0fdf4", p: { xs: 4, md: 6 },
// // //           textAlign: "center", position: "relative", overflow: "hidden",
// // //         }}>
// // //           <Box sx={{
// // //             position: "absolute", top: -40, right: -40, width: 160, height: 160,
// // //             borderRadius: "50%", bgcolor: "rgba(5,150,105,0.06)",
// // //           }} />
// // //           <Box sx={{
// // //             width: 80, height: 80, borderRadius: "50%", bgcolor: "#059669",
// // //             mx: "auto", mb: 3, display: "flex", alignItems: "center", justifyContent: "center",
// // //             boxShadow: "0 0 0 12px rgba(5,150,105,0.12), 0 0 0 24px rgba(5,150,105,0.06)",
// // //           }}>
// // //             <DoneAllOutlined sx={{ fontSize: 40, color: "white" }} />
// // //           </Box>
// // //           <Typography variant="h5" fontWeight={800} sx={{ color: "#065f46", mb: 0.5 }}>
// // //             Movimiento Registrado Exitosamente
// // //           </Typography>
// // //           <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 440, mx: "auto" }}>
// // //             Se registraron <strong>{totalMovements}</strong> movimientos tipo{" "}
// // //             <strong>{subtipo?.label}</strong> de forma correcta.
// // //           </Typography>
// // //           <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center", flexWrap: "wrap", mb: 4 }}>
// // //             {[
// // //               { label: "Tipo",        value: tipoFlujo ?? "—",      color: accentColor },
// // //               { label: "Subtipo",     value: subtipo?.label ?? "—", color: "#475569"   },
// // //               { label: "Movimientos", value: `${totalMovements}`,   color: "#059669"   },
// // //               { label: "Ítems",       value: `${lineItems.length}`, color: "#1e40af"   },
// // //             ].map(c => (
// // //               <Paper key={c.label} elevation={0} sx={{
// // //                 px: 2.5, py: 1.8, borderRadius: 2.5, border: "1px solid #d1fae5",
// // //                 bgcolor: "white", minWidth: 100, textAlign: "center",
// // //               }}>
// // //                 <Typography variant="h6" fontWeight={800} sx={{ color: c.color, lineHeight: 1 }}>{c.value}</Typography>
// // //                 <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ fontSize: "0.68rem" }}>{c.label}</Typography>
// // //               </Paper>
// // //             ))}
// // //           </Box>
// // //           <ButtonBase label="Nuevo Movimiento" startIcon={<SwapHorizOutlined />} onClick={resetAll}
// // //             sx={{ px: 3.5, py: 1.2, fontWeight: 700, borderRadius: 2 }}
// // //           />
// // //         </Card>
// // //       </Fade>

// // //       <Fade in={!showSuccess} timeout={400} unmountOnExit>
// // //         <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>

// // //           {/* ── Columna principal ─────────────────────────────────────── */}
// // //           <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>

// // //             {/* Step progress bar */}
// // //             <Card elevation={0} sx={{ borderRadius: 2.5, border: "1px solid #e2e8f0", p: "14px 20px" }}>
// // //               <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 }, justifyContent: "space-between" }}>
// // //                 <StepDot number={1} label="Tipo de Flujo"    active={!step1Done}   done={step1Done} />
// // //                 <Box sx={{ flex: 1, height: 1, bgcolor: step1Done ? "#059669" : "#e2e8f0", transition: "background 0.4s", mx: 0.5 }} />
// // //                 <StepDot number={2} label="Subtipo"          active={step1Done && !step2Done} done={step2Done} />
// // //                 <Box sx={{ flex: 1, height: 1, bgcolor: step2Done ? "#059669" : "#e2e8f0", transition: "background 0.4s", mx: 0.5 }} />
// // //                 <StepDot number={3} label="Datos Doc."       active={step2Done && !step3Done} done={step3Done} />
// // //                 <Box sx={{ flex: 1, height: 1, bgcolor: step3Done ? "#059669" : "#e2e8f0", transition: "background 0.4s", mx: 0.5 }} />
// // //                 <StepDot number={4} label="Productos"        active={step3Done && !step4Done} done={step4Done} />
// // //                 <Box sx={{ flex: 1, height: 1, bgcolor: step4Done ? "#059669" : "#e2e8f0", transition: "background 0.4s", mx: 0.5 }} />
// // //                 <StepDot number={5} label="Confirmar"        active={step4Done && canSubmit} done={false} />
// // //               </Box>
// // //             </Card>

// // //             {/* ══ PASO 1: TIPO DE FLUJO ══════════════════════════════════ */}
// // //             <Card elevation={0} sx={{
// // //               borderRadius: 3, border: "1px solid #e2e8f0",
// // //               overflow: "hidden", transition: "box-shadow 0.2s",
// // //               "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.06)" },
// // //             }}>
// // //               {/* Indicador lateral de estado */}
// // //               <Box sx={{ display: "flex" }}>
// // //                 {/* <Box sx={{
// // //                   width: 4, flexShrink: 0,
// // //                   bgcolor: step1Done ? "#059669" : "#e2e8f0",
// // //                   transition: "background 0.4s",
// // //                 }} /> */}
// // //                 <Box sx={{ flex: 1, p: 3 }}>
// // //                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
// // //                     <Box sx={{ width: 32, height: 32, borderRadius: 2, bgcolor: step1Done ? "#f0fdf4" : "#f8fafc", border: `1px solid ${step1Done ? "#d1fae5" : "#e2e8f0"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
// // //                       {step1Done
// // //                         ? <CheckCircle sx={{ fontSize: 16, color: "#059669" }} />
// // //                         : <Typography variant="caption" fontWeight={800} sx={{ color: "#94a3b8", fontSize: "0.7rem" }}>01</Typography>
// // //                       }
// // //                     </Box>
// // //                     <Box>
// // //                       <Typography variant="subtitle2" fontWeight={800} sx={{ color: "#0f172a", lineHeight: 1 }}>Tipo de Movimiento</Typography>
// // //                       <Typography variant="caption" color="text.disabled">Ingreso, egreso o transferencia de stock</Typography>
// // //                     </Box>
// // //                   </Box>

// // //                   <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
// // //                     {(["ENTRADA", "SALIDA"] as TipoFlujo[]).map(tipo => {
// // //                       const cfg      = FLUJO_CFG[tipo];
// // //                       const isActive = tipoFlujo === tipo;
// // //                       return (
// // //                         <Box key={tipo} onClick={() => { setTipoFlujo(tipo); setSubtipo(null); setLineItems([]); }}
// // //                           sx={{
// // //                             flex: "1 1 160px", p: 2, borderRadius: 2.5, cursor: "pointer",
// // //                             transition: "all 0.2s ease",
// // //                              bgcolor: isActive ? "#f8fafc" : "#fafbfc",
// // //                               border: `1.5px solid ${isActive ? "#334155" : "#e2e8f0"}`,
// // //                               boxShadow: isActive ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
// // //                               transform: isActive ? "translateY(-1px)" : "none",
// // //                               "&:hover": { border: "1.5px solid #94a3b8", transform: "translateY(-1px)"},
// // //                             // bgcolor: isActive ? cfg.bg : "#f8fafc",
// // //                             // border: `1.5px solid ${isActive ? cfg.color : "#e2e8f0"}`,
// // //                             // boxShadow: isActive ? `0 4px 16px ${cfg.color}20` : "none",
// // //                           //   transform: isActive ? "translateY(-1px)" : "none",
// // //                           //   "&:hover": { transform: "translateY(-1px)", border: `1.5px solid ${cfg.color}80`, bgcolor: cfg.bg 
// // //                           // },
// // //                           }}>
// // //                           <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
// // //                             <Box sx={{
// // //                               width: 36, height: 36, borderRadius: 2,
// // //                               // bgcolor: isActive ? cfg.color : `${cfg.color}12`,
// // //                               display: "flex", alignItems: "center", justifyContent: "center",
// // //                               // color: isActive ? "white" : cfg.color,
// // //                                bgcolor: isActive ? "#0f172a" : "#f1f5f9",
// // //                                 color: isActive ? "white" : "#64748b",
// // //                               transition: "all 0.2s",
// // //                             }}>
// // //                               {cfg.icon}
// // //                             </Box>
// // //                             <Box sx={{ flex: 1 }}>
// // //                               <Typography variant="body2" fontWeight={800} sx={{ color: isActive ? "#0f172a" : "#334155", lineHeight: 0.5 }}>
// // //                                 {cfg.label}
// // //                               </Typography>
// // //                               <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.65rem" }}>{cfg.desc}</Typography>
// // //                             </Box>
// // //                             {isActive && (
// // //                               <CheckCircleRounded sx={{ fontSize: 18, color: cfg.color, ml: "auto" }} />
// // //                             )}
// // //                           </Box>
// // //                         </Box>
// // //                       );
// // //                     })}
// // //                   </Box>
// // //                 </Box>
// // //               </Box>
// // //             </Card>

// // //             {/* ══ PASO 2: SUBTIPO ════════════════════════════════════════ */}
// // //             <Collapse in={!!tipoFlujo} timeout={350} unmountOnExit>
// // //               <Card elevation={0} sx={{
// // //                 borderRadius: 3, border: "1px solid #e2e8f0", overflow: "hidden",
// // //                 transition: "box-shadow 0.2s", "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.06)" },
// // //               }}>
// // //                 <Box sx={{ display: "flex" }}>
// // //                   {/* <Box sx={{ width: 4, flexShrink: 0, bgcolor: step2Done ? "#059669" : "#e2e8f0", transition: "background 0.4s" }} /> */}
// // //                   <Box sx={{ flex: 1, p: 3 }}>
// // //                     <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
// // //                       <Box sx={{ width: 32, height: 32, borderRadius: 2, bgcolor: step2Done ? "#f0fdf4" : "#f8fafc", border: `1px solid ${step2Done ? "#d1fae5" : "#e2e8f0"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
// // //                         {step2Done ? <CheckCircle sx={{ fontSize: 16, color: "#059669" }} /> : <Typography variant="caption" fontWeight={800} sx={{ color: "#94a3b8", fontSize: "0.7rem" }}>02</Typography>}
// // //                       </Box>
// // //                       <Box>
// // //                         <Typography variant="subtitle2" fontWeight={800} sx={{ color: "#0f172a", lineHeight: 1 }}>Subtipo de Movimiento</Typography>
// // //                         <Typography variant="caption" color="text.disabled">
// // //                           Motivo específico de {tipoFlujo === "ENTRADA" ? "la entrada" : tipoFlujo === "SALIDA" ? "la salida" : "la transferencia"}
// // //                         </Typography>
// // //                       </Box>
// // //                     </Box>

// // //                     <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
// // //                       {subtiposActivos.map(st => {
// // //                         const isActive = subtipo?.value === st.value;
// // //                         return (
// // //                           <Box key={st.value} onClick={() => setSubtipo(st)}
// // //                             sx={{
// // //                               flex: "1 1 180px", p: 1.8, borderRadius: 2, cursor: "pointer",
// // //                               transition: "all 0.18s ease",
// // //                               bgcolor: isActive ? "#f8fafc" : "#fafbfc",
// // //                               border: `1.5px solid ${isActive ? "#334155" : "#e2e8f0"}`,
// // //                               boxShadow: isActive ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
// // //                               transform: isActive ? "translateY(-1px)" : "none",
// // //                               "&:hover": { border: "1.5px solid #94a3b8", transform: "translateY(-1px)" },
// // //                             }}>
// // //                             <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2 }}>
// // //                               <Box sx={{
// // //                                 width: 30, height: 30, borderRadius: 1.5, flexShrink: 0,
// // //                                 bgcolor: isActive ? "#0f172a" : "#f1f5f9",
// // //                                 color: isActive ? "white" : "#64748b",
// // //                                 display: "flex", alignItems: "center", justifyContent: "center",
// // //                                 transition: "all 0.2s",
// // //                               }}>
// // //                                 {st.icon}
// // //                               </Box>
// // //                               <Box>
// // //                                 <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
// // //                                   <Typography variant="body2" fontWeight={700} sx={{ color: isActive ? "#0f172a" : "#334155", lineHeight: 1.2, fontSize: "0.8rem" }}>
// // //                                     {st.label}
// // //                                   </Typography>
// // //                                   {isActive && <CheckCircleRounded sx={{ fontSize: 13, color: "#059669" }} />}
// // //                                 </Box>
// // //                                 <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.3, display: "block", mt: 0.3, fontSize: "0.65rem" }}>
// // //                                   {st.description}
// // //                                 </Typography>
// // //                               </Box>
// // //                             </Box>
// // //                           </Box>
// // //                         );
// // //                       })}
// // //                     </Box>
// // //                   </Box>
// // //                 </Box>
// // //               </Card>
// // //             </Collapse>

// // //             {/* ══ PASO 3: DATOS DEL DOCUMENTO ════════════════════════════ */}
// // //             <Collapse in={!!subtipo} timeout={350} unmountOnExit>
// // //               <Card elevation={0} sx={{
// // //                 borderRadius: 3, border: "1px solid #e2e8f0", overflow: "hidden",
// // //                 transition: "box-shadow 0.2s", "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.06)" },
// // //               }}>
// // //                 <Box sx={{ display: "flex" }}>
// // //                   {/* <Box sx={{ width: 4, flexShrink: 0, bgcolor: step3Done ? "#059669" : ctxMissing.length < (subtipo?.contextFields.filter(f=>f.required).length ?? 0) ? "#f59e0b" : "#e2e8f0", transition: "background 0.4s" }} /> */}
// // //                   <Box sx={{ flex: 1, p: 3 }}>
// // //                     <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
// // //                       <Box sx={{ width: 32, height: 32, borderRadius: 2, bgcolor: step3Done ? "#f0fdf4" : "#f8fafc", border: `1px solid ${step3Done ? "#d1fae5" : "#e2e8f0"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
// // //                         {step3Done ? <CheckCircle sx={{ fontSize: 16, color: "#059669" }} /> : <Typography variant="caption" fontWeight={800} sx={{ color: "#94a3b8", fontSize: "0.7rem" }}>03</Typography>}
// // //                       </Box>
// // //                       <Box sx={{ flex: 1 }}>
// // //                         <Typography variant="subtitle2" fontWeight={800} sx={{ color: "#0f172a", lineHeight: 1 }}>Información del Documento</Typography>
// // //                         <Typography variant="caption" color="text.disabled">Completa los datos requeridos para {subtipo?.label}</Typography>
// // //                       </Box>
// // //                       <Chip
// // //                         label={step3Done ? "Completo" : `${ctxMissing.length} pendiente${ctxMissing.length !== 1 ? "s" : ""}`}
// // //                         size="small"
// // //                         sx={{
// // //                           fontWeight: 700, fontSize: "0.68rem",
// // //                           bgcolor: step3Done ? "#f0fdf4" : "#fffbeb",
// // //                           color:   step3Done ? "#059669" : "#92400e",
// // //                           border: `1px solid ${step3Done ? "#d1fae5" : "#fde68a"}`,
// // //                         }}
// // //                       />
// // //                     </Box>

// // //                     <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
// // //                       {(subtipo?.contextFields ?? []).map(field => {
// // //                         const val     = ctxValues[field.key] ?? "";
// // //                         const isEmpty = field.required && !val.trim();
// // //                         const isDone  = val.trim().length > 0;

// // //                         return (
// // //                           <Box key={field.key} sx={{ flex: "1 1 200px" }}>
// // //                             <Typography variant="caption" fontWeight={700}
// // //                               sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.8, color: isEmpty ? "#92400e" : "#475569" }}>
// // //                               {field.icon}
// // //                               {field.label}
// // //                               {field.required && !isDone && (
// // //                                 <Typography component="span" sx={{ color: "#dc2626", fontSize: "0.75rem" }}>*</Typography>
// // //                               )}
// // //                               {isDone && <CheckCircleRounded sx={{ fontSize: 12, color: "#059669" }} />}
// // //                             </Typography>

// // //                             {field.type === "date" ? (
// // //                               <TextField type="date" size="small" fullWidth value={val}
// // //                                 onChange={e => setCtx(field.key, e.target.value)}
// // //                                 InputLabelProps={{ shrink: true }}
// // //                                 sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5, fontSize: "0.85rem",
// // //                                   ...(isEmpty && { "& fieldset": { borderColor: "#fde68a", borderWidth: 1.5 } }),
// // //                                   ...(isDone  && { "& fieldset": { borderColor: "#6ee7b7", borderWidth: 1.5 } }),
// // //                                 }}}
// // //                               />
// // //                             ) : field.type === "select" && field.options ? (
// // //                               <SelectBase size="small" label={field.placeholder} value={val}
// // //                                 onChange={v => setCtx(field.key, String(v))}
// // //                                 options={field.options} fullWidth
// // //                               />
// // //                             ) : (
// // //                               <TextField size="small" fullWidth placeholder={field.placeholder} value={val}
// // //                                 onChange={e => setCtx(field.key, e.target.value)}
// // //                                 helperText={field.helperText}
// // //                                 FormHelperTextProps={{ sx: { fontSize: "0.65rem", color: "#94a3b8", mt: 0.3 } }}
// // //                                 sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5, fontSize: "0.85rem",
// // //                                   ...(isEmpty && { "& fieldset": { borderColor: "#fde68a", borderWidth: 1.5 } }),
// // //                                   ...(isDone  && { "& fieldset": { borderColor: "#6ee7b7", borderWidth: 1.5 } }),
// // //                                 }}}
// // //                               />
// // //                             )}
// // //                           </Box>
// // //                         );
// // //                       })}

// // //                       <Box sx={{ flex: "2 1 280px" }}>
// // //                         <Typography variant="caption" fontWeight={700} color="text.secondary"
// // //                           sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.8 }}>
// // //                           <ReceiptOutlined sx={{ fontSize: 14 }} />
// // //                           Notas adicionales
// // //                         </Typography>
// // //                         <TextField size="small" fullWidth placeholder="Observaciones del movimiento..."
// // //                           value={notes} onChange={e => setNotes(e.target.value)}
// // //                           sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5, fontSize: "0.85rem" } }}
// // //                         />
// // //                       </Box>
// // //                     </Box>
// // //                   </Box>
// // //                 </Box>
// // //               </Card>
// // //             </Collapse>

// // //             {/* ══ PASO 4: INVENTARIO + CARRITO ════════════════════════════ */}
// // //             <Collapse in={!!subtipo} timeout={350} unmountOnExit>
// // //               <Card elevation={0} sx={{
// // //                 borderRadius: 3, border: "1px solid #e2e8f0", overflow: "hidden",
// // //                 transition: "box-shadow 0.2s", "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.06)" },
// // //               }}>
// // //                 <Box sx={{ display: "flex" }}>
// // //                   {/* <Box sx={{ width: 4, flexShrink: 0, bgcolor: step4Done ? "#059669" : "#e2e8f0", transition: "background 0.4s" }} /> */}
// // //                   <Box sx={{ flex: 1 }}>
// // //                     <Box sx={{ px: 3, pt: 3, pb: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
// // //                       <Box sx={{ width: 32, height: 32, borderRadius: 2, bgcolor: step4Done ? "#f0fdf4" : "#f8fafc", border: `1px solid ${step4Done ? "#d1fae5" : "#e2e8f0"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
// // //                         {step4Done ? <CheckCircle sx={{ fontSize: 16, color: "#059669" }} /> : <Typography variant="caption" fontWeight={800} sx={{ color: "#94a3b8", fontSize: "0.7rem" }}>04</Typography>}
// // //                       </Box>
// // //                       <Box>
// // //                         <Typography variant="subtitle2" fontWeight={800} sx={{ color: "#0f172a", lineHeight: 1 }}>Selección de Productos</Typography>
// // //                         <Typography variant="caption" color="text.disabled">Busca y agrega ítems del inventario del hub</Typography>
// // //                       </Box>
// // //                     </Box>

// // //                     <Divider sx={{ borderColor: "#f1f5f9" }} />

// // //                     <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" } }}>
// // //                       {/* ─── Panel Inventario ─────────────────────────────── */}
// // //                       <Box sx={{
// // //                         flex: "0 0 430px", borderRight: { lg: "1px solid #f1f5f9" },
// // //                         p: 2.5, display: "flex", flexDirection: "column", gap: 1.5,
// // //                       }}>
// // //                         <Typography variant="caption" fontWeight={700} sx={{ color: "#64748b", letterSpacing: 1, fontSize: "0.65rem" }}>
// // //                           INVENTARIO DEL HUB
// // //                         </Typography>

// // //                         <SelectBase label="Tipo de Producto" size="small" value={filterType}
// // //                           onChange={v => { setFilterType(String(v)); setInventoryPage(0); }}
// // //                           options={[
// // //                             { label: "Todos los productos", value: "ALL"       },
// // //                             { label: "📦 Materiales",        value: "MATERIAL"  },
// // //                             { label: "⚙️ Equipos",            value: "EQUIPMENT" },
// // //                             { label: "🔧 Herramientas",       value: "TOOL"      },
// // //                             { label: "🦺 EPP",                value: "EPP"       },
// // //                           ]}
// // //                           fullWidth
// // //                         />

// // //                         <TextField size="small" placeholder="Buscar código o descripción..."
// // //                           value={inventorySearch} onChange={e => setInventorySearch(e.target.value)}
// // //                           InputProps={{
// // //                             startAdornment: (
// // //                               <InputAdornment position="start">
// // //                                 {loadingInventory ? <CircularProgress size={13} /> : <SearchOutlined sx={{ fontSize: 15, color: "#94a3b8" }} />}
// // //                               </InputAdornment>
// // //                             ),
// // //                             endAdornment: inventorySearch ? (
// // //                               <InputAdornment position="end">
// // //                                 <IconButton size="small" onClick={() => setInventorySearch("")}>
// // //                                   <CloseOutlined sx={{ fontSize: 13 }} />
// // //                                 </IconButton>
// // //                               </InputAdornment>
// // //                             ) : null,
// // //                           }}
// // //                           sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5, fontSize: "0.84rem" } }}
// // //                         />

// // //                         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // //                           <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.67rem" }}>
// // //                             {loadingInventory ? "Cargando..." : `${inventoryTotal} ítems · ${inventoryPage + 1}/${Math.max(inventoryPages, 1)}`}
// // //                           </Typography>
// // //                           <Tooltip title="Recargar inventario">
// // //                             <IconButton size="small" onClick={() => setReloadTrigger(t => t + 1)} disabled={loadingInventory}>
// // //                               <RefreshOutlined sx={{ fontSize: 14, color: "#94a3b8" }} />
// // //                             </IconButton>
// // //                           </Tooltip>
// // //                         </Box>

// // //                         <Box sx={{
// // //                           flex: 1, overflowY: "auto", maxHeight: 380,
// // //                           display: "flex", flexDirection: "column", gap: 0.5,
// // //                           "&::-webkit-scrollbar": { width: 5},
// // //                           "&::-webkit-scrollbar-thumb": { bgcolor: "#e2e8f0", borderRadius: 2 },
// // //                         }}>
// // //                           {loadingInventory ? (
// // //                             <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}><CircularProgress size={28} /></Box>
// // //                           ) : inventoryRows.length === 0 ? (
// // //                             <Box sx={{ py: 6, textAlign: "center" }}>
// // //                               <StorageOutlined sx={{ fontSize: 32, color: "#e2e8f0", mb: 1 }} />
// // //                               <Typography variant="caption" color="text.disabled">Sin resultados</Typography>
// // //                             </Box>
// // //                           ) : inventoryRows.map(inv => {
// // //                             const cfg      = PRODUCT_CFG[inv.productType];
// // //                             const added    = lineItems.some(li => li.inventoryId === inv.id);
// // //                             const isEquip  = inv.productType === "EQUIPMENT";
// // //                             const sinStock = inv.quantityAvailable <= 0;
// // //                             const needsStock = tipoFlujo !== "ENTRADA";
// // //                             const stockLow = inv.quantityAvailable > 0 && inv.quantityAvailable <= inv.minimumStock;

// // //                             return (
// // //                               <Box key={inv.id} sx={{
// // //                                 marginInline:1,
// // //                                 px: 1.5, py: 1.2, borderRadius: 1.5,
// // //                                 border: `1px solid ${added ? cfg.color + "40" : "#f1f5f9"}`,
// // //                                 bgcolor: added ? cfg.bg : "white",
// // //                                 opacity: sinStock && needsStock ? 0.45 : 1,
// // //                                 transition: "all 0.14s",
// // //                                 display: "flex", alignItems: "center", gap: 1.2,
// // //                                 "&:hover": { bgcolor: added ? cfg.bg : "#f8fafc", border: `1px solid ${cfg.color}40` },
// // //                               }}>
// // //                                 <Box sx={{
// // //                                   width: 28, height: 28, borderRadius: 1.2, flexShrink: 0,
// // //                                   bgcolor: cfg.bg, border: `1px solid ${cfg.border}`,
// // //                                   display: "flex", alignItems: "center", justifyContent: "center",
// // //                                   fontSize: "0.9rem",
// // //                                 }}>
// // //                                   {cfg.emoji}
// // //                                 </Box>
// // //                                 <Box sx={{ flex: 1, minWidth: 0 }}>
// // //                                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, flexWrap: "wrap" }}>
// // //                                     <Typography variant="caption" fontWeight={800} sx={{ color: cfg.color, fontSize: "0.68rem", bgcolor: cfg.bg, px: 0.8, py: 0.2, borderRadius: 0.8, border: `1px solid ${cfg.border}` }}>
// // //                                       {inv.itemCode}
// // //                                     </Typography>
// // //                                     <Typography variant="caption" fontWeight={500} sx={{ color: "#475569", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 160, fontSize: "0.72rem" }}>
// // //                                       {inv.description}
// // //                                     </Typography>
// // //                                   </Box>
// // //                                   <Box sx={{ display: "flex", gap: 1, mt: 0.3, alignItems: "center" }}>
// // //                                     <Typography variant="caption" sx={{
// // //                                       fontWeight: 700, fontSize: "0.63rem",
// // //                                       color: sinStock ? "#94a3b8" : stockLow ? "#b45309" : "#059669",
// // //                                     }}>
// // //                                       {inv.quantityAvailable} disponible{inv.quantityAvailable !== 1 ? "s" : ""}
// // //                                     </Typography>
// // //                                     {stockLow && <FiberManualRecordOutlined sx={{ fontSize: 6, color: "#f59e0b" }} />}
// // //                                     {inv.locationCode && (
// // //                                       <Typography variant="caption" sx={{ color: "#cbd5e1", fontSize: "0.6rem" }}>
// // //                                         {inv.locationCode}
// // //                                       </Typography>
// // //                                     )}
// // //                                   </Box>
// // //                                 </Box>
// // //                                 <Tooltip title={added ? "Ya en el movimiento" : sinStock && needsStock ? "Sin stock" : isEquip ? "Definir cantidad" : "Agregar"}>
// // //                                   <span>
// // //                                     <IconButton size="small"
// // //                                       onClick={() => isEquip ? openAddEquipo(inv) : addNonEquipmentItem(inv)}
// // //                                       disabled={added || (sinStock && needsStock)}
// // //                                       sx={{
// // //                                         width: 26, height: 26, flexShrink: 0,
// // //                                         bgcolor: added ? "#f0fdf4" : "#0f172a",
// // //                                         color: added ? "#059669" : "white",
// // //                                         borderRadius: 1.2,
// // //                                         "&:hover": { bgcolor: added ? "#f0fdf4" : "#1e293b" },
// // //                                         "&.Mui-disabled": { bgcolor: "#f1f5f9", color: "#cbd5e1" },
// // //                                         transition: "all 0.15s",
// // //                                       }}>
// // //                                       {added
// // //                                         ? <CheckCircleRounded sx={{ fontSize: 13 }} />
// // //                                         : <AddCircleOutline sx={{ fontSize: 13 }} />
// // //                                       }
// // //                                     </IconButton>
// // //                                   </span>
// // //                                 </Tooltip>
// // //                               </Box>
// // //                             );
// // //                           })}
// // //                         </Box>

// // //                         {inventoryPages > 1 && (
// // //                           <Box sx={{ display: "flex", gap: 1, justifyContent: "center", pt: 0.5 }}>
// // //                             <ButtonBase label="←" size="small" disabled={inventoryPage === 0}
// // //                               onClick={() => fetchInventory(inventoryPage - 1)}
// // //                               sx={{ minWidth: 32, px: 1, bgcolor: "white", color: "#64748b", border: "1px solid #e2e8f0", fontSize: "0.75rem" }}
// // //                             />
// // //                             <Typography variant="caption" sx={{ alignSelf: "center", color: "#94a3b8" }}>
// // //                               {inventoryPage + 1} / {inventoryPages}
// // //                             </Typography>
// // //                             <ButtonBase label="→" size="small" disabled={inventoryPage + 1 >= inventoryPages}
// // //                               onClick={() => fetchInventory(inventoryPage + 1)}
// // //                               sx={{ minWidth: 32, px: 1, bgcolor: "white", color: "#64748b", border: "1px solid #e2e8f0", fontSize: "0.75rem" }}
// // //                             />
// // //                           </Box>
// // //                         )}
// // //                       </Box>

// // //                       {/* ─── Carrito ──────────────────────────────────────── */}
// // //                       <Box sx={{ flex: 1, p: 2.5 }}>
// // //                         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
// // //                           <Typography variant="caption" fontWeight={700} sx={{ color: "#64748b", letterSpacing: 1, fontSize: "0.65rem" }}>
// // //                             ÍTEMS SELECCIONADOS
// // //                             {lineItems.length > 0 && (
// // //                               <Box component="span" sx={{ ml: 1, px: 0.8, py: 0.2, borderRadius: 0.8, bgcolor: "#0f172a", color: "white", fontSize: "0.6rem", fontWeight: 800 }}>
// // //                                 {lineItems.length}
// // //                               </Box>
// // //                             )}
// // //                           </Typography>
// // //                           {lineItems.length > 0 && (
// // //                             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer", px: 1, py: 0.4, borderRadius: 1, "&:hover": { bgcolor: "#fef2f2" } }}
// // //                               onClick={() => setLineItems([])}>
// // //                               <DeleteOutline sx={{ fontSize: 13, color: "#94a3b8" }} />
// // //                               <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.68rem" }}>Limpiar</Typography>
// // //                             </Box>
// // //                           )}
// // //                         </Box>

// // //                         {lineItems.length === 0 ? (
// // //                           <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 7, border: "1.5px dashed #e2e8f0", borderRadius: 2.5, bgcolor: "#fafbfc" }}>
// // //                             <SwapHorizOutlined sx={{ fontSize: 32, color: "#e2e8f0", mb: 1 }} />
// // //                             <Typography variant="body2" sx={{ color: "#94a3b8", fontWeight: 600, fontSize: "0.82rem" }}>Sin ítems seleccionados</Typography>
// // //                             <Typography variant="caption" color="text.disabled">Agrega productos desde el inventario</Typography>
// // //                           </Box>
// // //                         ) : (
// // //                           <Box sx={{ display: "flex", flexDirection: "column", gap: 1, maxHeight: 430, overflowY: "auto",
// // //                             "&::-webkit-scrollbar": { width: 3 }, "&::-webkit-scrollbar-thumb": { bgcolor: "#e2e8f0", borderRadius: 2 } }}>
// // //                             {lineItems.map(item => {
// // //                               const cfg         = PRODUCT_CFG[item.productType];
// // //                               const isEquipo    = item.productType === "EQUIPMENT";
// // //                               const serialCount = item.serials?.length ?? 0;
// // //                               const pendientes  = item.quantity - serialCount;
// // //                               const hasWarning  = isEquipo && serialCount === 0;
// // //                               const superaStock = tipoFlujo !== "ENTRADA" && !isEquipo && item.quantity > item.quantityAvailable;
// // //                               const allSerials  = isEquipo && serialCount === item.quantity && item.quantity > 0;

// // //                               return (
// // //                                 <Fade in key={item.inventoryId} timeout={250}>
// // //                                   <Box sx={{
// // //                                     p: 1.8, borderRadius: 2,
// // //                                     border: `1.5px solid ${superaStock ? "#fecaca" : hasWarning ? "#fde68a" : allSerials ? "#d1fae5" : "#f1f5f9"}`,
// // //                                     bgcolor: superaStock ? "#fff5f5" : hasWarning ? "#fefce8" : allSerials ? "#f0fdf4" : "#fafbfc",
// // //                                     transition: "all 0.2s",
// // //                                   }}>
// // //                                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
// // //                                       <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: superaStock ? "#dc2626" : hasWarning ? "#f59e0b" : allSerials ? "#059669" : cfg.color, flexShrink: 0 }} />
// // //                                       <Typography variant="caption" fontWeight={800} sx={{ color: cfg.color, fontSize: "0.68rem", bgcolor: cfg.bg, px: 0.8, py: 0.15, borderRadius: 0.8, border: `1px solid ${cfg.border}` }}>
// // //                                         {item.itemCode}
// // //                                       </Typography>
// // //                                       <Typography variant="caption" fontWeight={600} sx={{ flex: 1, color: "#334155", fontSize: "0.73rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
// // //                                         {item.description}
// // //                                       </Typography>
// // //                                       <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.62rem", flexShrink: 0 }}>
// // //                                         disp: {item.quantityAvailable}
// // //                                       </Typography>
// // //                                       <IconButton size="small" onClick={() => removeItem(item.inventoryId)}
// // //                                         sx={{ color: "#cbd5e1", "&:hover": { color: "#ef4444", bgcolor: "#fef2f2" }, width: 22, height: 22 }}>
// // //                                         <CloseOutlined sx={{ fontSize: 13 }} />
// // //                                       </IconButton>
// // //                                     </Box>

// // //                                     <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap", pl: 1.8 }}>
// // //                                       {!isEquipo ? (
// // //                                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
// // //                                           <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.68rem" }}>Cant.</Typography>
// // //                                           <TextField type="number" size="small"
// // //                                             value={item._rawQty ?? String(item.quantity)}
// // //                                             onChange={e => updateQty(item.inventoryId, e.target.value)}
// // //                                             onBlur={e => { const v = parseInt(e.target.value, 10); if (isNaN(v) || v < 1) updateQty(item.inventoryId, "1"); }}
// // //                                             inputProps={{ min: 1, style: { textAlign: "center", fontWeight: 700, padding: "3px 5px", width: 44, fontSize: "0.82rem" } }}
// // //                                             sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.2, height: 28,
// // //                                               ...(superaStock && { "& fieldset": { borderColor: "#dc2626", borderWidth: 2 } }),
// // //                                             },
// // //                                             "& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button": { display: "none" },
// // //                                             "& input[type=number]": { MozAppearance: "textfield" },
// // //                                             }}
// // //                                           />
// // //                                         </Box>
// // //                                       ) : (
// // //                                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
// // //                                           <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.68rem" }}>Esperados:</Typography>
// // //                                           <Typography variant="caption" fontWeight={800} sx={{ color: "#1e40af", bgcolor: "#eff6ff", px: 1, py: 0.2, borderRadius: 0.8, fontSize: "0.72rem" }}>
// // //                                             {item.quantity}
// // //                                           </Typography>
// // //                                         </Box>
// // //                                       )}

// // //                                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
// // //                                         <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.68rem" }}>S/</Typography>
// // //                                         <TextField type="number" size="small"
// // //                                           value={item.unitPrice === 0 ? "" : item.unitPrice}
// // //                                           onChange={e => updatePrice(item.inventoryId, e.target.value)}
// // //                                           placeholder="0.00"
// // //                                           inputProps={{ min: 0, step: 0.01, style: { fontWeight: 700, padding: "3px 5px", width: 58, fontSize: "0.82rem" } }}
// // //                                           sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.2, height: 28 },
// // //                                             "& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button": { display: "none" },
// // //                                             "& input[type=number]": { MozAppearance: "textfield" },
// // //                                           }}
// // //                                         />
// // //                                       </Box>

// // //                                       {isEquipo && (
// // //                                         <Box onClick={() => abrirPistoleo(item)}
// // //                                           sx={{
// // //                                             display: "flex", alignItems: "center", gap: 0.7, px: 1.2, py: 0.5,
// // //                                             borderRadius: 1.2, cursor: "pointer", transition: "all 0.15s",
// // //                                             bgcolor: allSerials ? "#f0fdf4" : serialCount > 0 ? "#fffbeb" : "#f8fafc",
// // //                                             border: `1px solid ${allSerials ? "#d1fae5" : serialCount > 0 ? "#fde68a" : "#e2e8f0"}`,
// // //                                             "&:hover": { bgcolor: "#f0fdf4", border: "1px solid #d1fae5" },
// // //                                           }}>
// // //                                           <QrCodeScannerOutlined sx={{ fontSize: 14, color: allSerials ? "#059669" : serialCount > 0 ? "#92400e" : "#94a3b8" }} />
// // //                                           <Typography variant="caption" fontWeight={700} sx={{ color: allSerials ? "#059669" : serialCount > 0 ? "#92400e" : "#64748b", fontSize: "0.7rem" }}>
// // //                                             {allSerials ? `${serialCount} seriales ✓` : serialCount > 0 ? `${serialCount}/${item.quantity} pistol.` : "Pistolear"}
// // //                                           </Typography>
// // //                                         </Box>
// // //                                       )}

// // //                                       {isEquipo && !allSerials && serialCount > 0 && pendientes > 0 && (
// // //                                         <Typography variant="caption" sx={{ color: "#92400e", fontSize: "0.65rem" }}>
// // //                                           {pendientes} pendiente{pendientes > 1 ? "s" : ""}
// // //                                         </Typography>
// // //                                       )}

// // //                                       {!isEquipo && item.unitPrice > 0 && (
// // //                                         <Typography variant="caption" sx={{ color: "#64748b", fontFamily: "monospace", fontSize: "0.7rem", ml: "auto" }}>
// // //                                           = S/ {(item.quantity * item.unitPrice).toFixed(2)}
// // //                                         </Typography>
// // //                                       )}
// // //                                     </Box>

// // //                                     {superaStock && (
// // //                                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mt: 1, px: 1.2, py: 0.6, bgcolor: "#fef2f2", borderRadius: 1, border: "1px solid #fecaca" }}>
// // //                                         <WarningAmberOutlined sx={{ fontSize: 12, color: "#dc2626" }} />
// // //                                         <Typography variant="caption" sx={{ color: "#dc2626", fontWeight: 600, fontSize: "0.65rem" }}>
// // //                                           Supera stock disponible ({item.quantityAvailable} ud.)
// // //                                         </Typography>
// // //                                       </Box>
// // //                                     )}
// // //                                     {hasWarning && (
// // //                                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mt: 1, px: 1.2, py: 0.6, bgcolor: "#fefce8", borderRadius: 1, border: "1px solid #fde68a" }}>
// // //                                         <WarningAmberOutlined sx={{ fontSize: 12, color: "#b45309" }} />
// // //                                         <Typography variant="caption" sx={{ color: "#b45309", fontWeight: 600, fontSize: "0.65rem" }}>
// // //                                           Registra seriales antes de confirmar
// // //                                         </Typography>
// // //                                       </Box>
// // //                                     )}
// // //                                     {isEquipo && serialCount > 0 && (
// // //                                       <Box sx={{ mt: 1, pl: 1.8, display: "flex", gap: 0.5, flexWrap: "wrap" }}>
// // //                                         {item.serials?.map((s, idx) => (
// // //                                           <Typography key={idx} variant="caption" sx={{ color: "#059669", fontFamily: "monospace", bgcolor: "#f0fdf4", px: 0.8, py: 0.2, borderRadius: 0.8, border: "1px solid #d1fae5", fontSize: "0.62rem", fontWeight: 600 }}>
// // //                                             {s.serialNumber}
// // //                                           </Typography>
// // //                                         ))}
// // //                                       </Box>
// // //                                     )}
// // //                                   </Box>
// // //                                 </Fade>
// // //                               );
// // //                             })}
// // //                           </Box>
// // //                         )}

// // //                         {lineItems.length > 0 && (
// // //                           <Box sx={{ mt: 2, pt: 1.5, borderTop: "1px solid #f1f5f9", display: "flex", gap: 1.5, flexWrap: "wrap" }}>
// // //                             {(["MATERIAL","TOOL","EQUIPMENT","EPP"] as ProductType[]).filter(t => lineItems.some(i => i.productType === t)).map(t => {
// // //                               const cfg = PRODUCT_CFG[t];
// // //                               return (
// // //                                 <Box key={t} sx={{ display: "flex", alignItems: "center", gap: 0.6, px: 1.2, py: 0.6, borderRadius: 1.2, bgcolor: cfg.bg, border: `1px solid ${cfg.border}` }}>
// // //                                   <Typography sx={{ fontSize: "0.85rem", lineHeight: 1 }}>{cfg.emoji}</Typography>
// // //                                   <Typography variant="caption" fontWeight={800} sx={{ color: cfg.color, fontSize: "0.72rem" }}>
// // //                                     {lineItems.filter(i => i.productType === t).length}
// // //                                   </Typography>
// // //                                   <Typography variant="caption" sx={{ color: cfg.color, fontSize: "0.65rem", opacity: 0.8 }}>{cfg.label}</Typography>
// // //                                 </Box>
// // //                               );
// // //                             })}
// // //                             {totalValue > 0 && (
// // //                               <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, px: 1.2, py: 0.6, borderRadius: 1.2, bgcolor: "#f8fafc", border: "1px solid #e2e8f0", ml: "auto" }}>
// // //                                 <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.65rem" }}>Total estimado:</Typography>
// // //                                 <Typography variant="caption" fontWeight={800} sx={{ color: "#1e293b", fontFamily: "monospace", fontSize: "0.78rem" }}>
// // //                                   S/ {totalValue.toFixed(2)}
// // //                                 </Typography>
// // //                               </Box>
// // //                             )}
// // //                           </Box>
// // //                         )}
// // //                       </Box>
// // //                     </Box>
// // //                   </Box>
// // //                 </Box>
// // //               </Card>
// // //             </Collapse>

// // //             {/* ══ PASO 5: CONFIRMAR ═══════════════════════════════════════ */}
// // //             <Collapse in={lineItems.length > 0} timeout={350} unmountOnExit>
// // //               <Card elevation={0} sx={{
// // //                 borderRadius: 3, overflow: "hidden",
// // //                 border: `1.5px solid ${canSubmit ? accentColor + "40" : "#e2e8f0"}`,
// // //                 transition: "all 0.3s",
// // //                 boxShadow: canSubmit ? `0 4px 24px ${accentColor}14` : "none",
// // //               }}>
// // //                 {/* Header degradado sobrio */}
// // //                 <Box sx={{
// // //                   px: 3, py: 2.5,
// // //                   bgcolor: "#0f172a",
// // //                   display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2,
// // //                 }}>
// // //                   <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
// // //                     <Box sx={{
// // //                       width: 36, height: 36, borderRadius: 2,
// // //                       bgcolor: accentColor + "30", border: `1px solid ${accentColor}50`,
// // //                       display: "flex", alignItems: "center", justifyContent: "center", color: accentColor,
// // //                     }}>
// // //                       {tipoFlujo === "ENTRADA" ? <TrendingUpOutlined sx={{ fontSize: 20 }} /> : tipoFlujo === "SALIDA" ? <TrendingDownOutlined sx={{ fontSize: 20 }} /> : <SwapVertOutlined sx={{ fontSize: 20 }} />}
// // //                     </Box>
// // //                     <Box>
// // //                       <Typography variant="subtitle2" fontWeight={800} sx={{ color: "white", lineHeight: 1 }}>
// // //                         Confirmar Movimiento
// // //                       </Typography>
// // //                       <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.68rem" }}>
// // //                         {tipoFlujo} · {subtipo?.label}
// // //                         {ctxValues.guiaIngreso  && ` · ${ctxValues.guiaIngreso}`}
// // //                         {ctxValues.guiaDespacho && ` · ${ctxValues.guiaDespacho}`}
// // //                         {ctxValues.guia         && ` · ${ctxValues.guia}`}
// // //                       </Typography>
// // //                     </Box>
// // //                   </Box>
// // //                   <Box sx={{ px: 1.5, py: 0.6, borderRadius: 1.2, bgcolor: accentColor + "20", border: `1px solid ${accentColor}40` }}>
// // //                     <Typography variant="caption" fontWeight={800} sx={{ color: accentColor, fontSize: "0.72rem" }}>
// // //                       {totalMovements} movimiento{totalMovements !== 1 ? "s" : ""}
// // //                     </Typography>
// // //                   </Box>
// // //                 </Box>

// // //                 <Box sx={{ p: 3 }}>
// // //                   {/* KPIs compactos */}
// // //                   <Box sx={{ display: "flex", gap: 1.5, mb: 3, flexWrap: "wrap" }}>
// // //                     {[
// // //                       { label: "Ítems",         value: lineItems.length,                              suffix: "",  accent: "#1e40af" },
// // //                       { label: "Movimientos",   value: totalMovements,                                suffix: "",  accent: accentColor },
// // //                       { label: "Equipos pistol.",value: `${lineItems.filter(i => i.productType === "EQUIPMENT" && (i.serials?.length ?? 0) > 0).length}/${lineItems.filter(i => i.productType === "EQUIPMENT").length}`, suffix: "", accent: "#059669" },
// // //                       { label: "Valor est.",    value: totalValue > 0 ? `S/ ${totalValue.toFixed(2)}` : "—", suffix: "", accent: "#475569" },
// // //                     ].map(kpi => (
// // //                       <Box key={kpi.label} sx={{ flex: "1 1 90px", p: 1.8, borderRadius: 2, border: "1px solid #f1f5f9", bgcolor: "#fafbfc", textAlign: "center" }}>
// // //                         <Typography variant="subtitle2" fontWeight={800} sx={{ color: kpi.accent, lineHeight: 1, fontSize: "1rem" }}>{kpi.value}</Typography>
// // //                         <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.65rem" }}>{kpi.label}</Typography>
// // //                       </Box>
// // //                     ))}
// // //                   </Box>

// // //                   {validationErrors.length > 0 && (
// // //                     <Alert severity="warning" icon={<WarningAmberOutlined sx={{ fontSize: 18 }} />}
// // //                       sx={{ borderRadius: 2, mb: 2.5, bgcolor: "#fffbeb", border: "1px solid #fde68a", "& .MuiAlert-message": { width: "100%" } }}>
// // //                       <Typography variant="caption" fontWeight={700} sx={{ color: "#92400e", display: "block", mb: 0.5 }}>
// // //                         Pendientes antes de confirmar:
// // //                       </Typography>
// // //                       {validationErrors.map((e, i) => (
// // //                         <Typography key={i} variant="caption" sx={{ color: "#78350f", display: "block", fontSize: "0.7rem", lineHeight: 1.6 }}>
// // //                           • {e}
// // //                         </Typography>
// // //                       ))}
// // //                     </Alert>
// // //                   )}

// // //                   <Alert severity={isEntrada ? "success" : tipoFlujo === "TRANSFERENCIA" ? "info" : "error"}
// // //                     sx={{ borderRadius: 2, mb: 3, fontSize: "0.8rem" }}>
// // //                     Se registrarán <strong>{totalMovements} movimientos</strong> tipo{" "}
// // //                     <strong>{subtipo?.movementType}</strong>.{" "}
// // //                     {isEntrada ? "El stock se incrementará." : tipoFlujo === "TRANSFERENCIA" ? "Se moverá el stock entre almacenes." : "El stock se descontará."}
// // //                     {" "}Esta acción es <strong>irreversible</strong>.
// // //                   </Alert>

// // //                   <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
// // //                     <ButtonBase label="Reiniciar todo" onClick={resetAll}
// // //                       sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #e2e8f0", fontSize: "0.8rem" }}
// // //                     />
// // //                     <ButtonBase
// // //                       label={submitting ? "Registrando..." : `Confirmar ${tipoFlujo}`}
// // //                       startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : <SendOutlined sx={{ fontSize: 17 }} />}
// // //                       onClick={handleSubmit}
// // //                       disabled={!canSubmit || submitting}
// // //                       sx={{
// // //                         px: 3.5, py: 1.2, fontWeight: 700, borderRadius: 2, fontSize: "0.85rem",
// // //                         bgcolor: canSubmit ? accentColor : undefined,
// // //                         "&:hover": { bgcolor: canSubmit ? accentColor : undefined, opacity: 0.9 },
// // //                         boxShadow: canSubmit ? `0 4px 14px ${accentColor}35` : "none",
// // //                         transition: "all 0.2s",
// // //                       }}
// // //                     />
// // //                   </Box>
// // //                 </Box>
// // //               </Card>
// // //             </Collapse>

// // //           </Box>

// // //           {/* ── Panel informativo lateral ─────────────────────────────── */}
// // //           <SummaryPanel
// // //             tipoFlujo={tipoFlujo}
// // //             subtipo={subtipo}
// // //             ctxValues={ctxValues}
// // //             lineItems={lineItems}
// // //             totalMovements={totalMovements}
// // //             totalValue={totalValue}
// // //             validationErrors={validationErrors}
// // //             notes={notes}
// // //           />
// // //         </Box>
// // //       </Fade>

// // //       {/* ══ DIALOG: CANTIDAD DE EQUIPOS ══════════════════════════════════ */}
// // //       <Dialog open={addEquipoOpen} onClose={() => setAddEquipoOpen(false)} maxWidth="xs" fullWidth
// // //         PaperProps={{ sx: { borderRadius: 3 } }}>
// // //         <DialogTitle sx={{ m: 0, p: 0 }}>
// // //           <Box sx={{ bgcolor: "#0f172a", px: 3, py: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// // //             <Stack direction="row" spacing={1.5} alignItems="center">
// // //               <Box sx={{ bgcolor: "#1e293b", p: 0.8, borderRadius: 1.5, display: "flex", border: "1px solid #334155" }}>
// // //                 <ConstructionOutlined sx={{ fontSize: 16, color: "#94a3b8" }} />
// // //               </Box>
// // //               <Box>
// // //                 <Typography variant="subtitle2" fontWeight={700} color="white">Agregar Equipo</Typography>
// // //                 <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.68rem" }}>
// // //                   {addEquipoItem?.itemCode} — {addEquipoItem?.description}
// // //                 </Typography>
// // //               </Box>
// // //             </Stack>
// // //             <IconButton size="small" onClick={() => setAddEquipoOpen(false)} sx={{ color: "rgba(255,255,255,0.3)" }}>
// // //               <CloseOutlined fontSize="small" />
// // //             </IconButton>
// // //           </Box>
// // //         </DialogTitle>
// // //         <DialogContent sx={{ p: 3 }}>
// // //           {addEquipoItem && (
// // //             <Alert severity="info" sx={{ borderRadius: 2, mb: 2.5, fontSize: "0.78rem" }}>
// // //               Stock disponible: <strong>{addEquipoItem.quantityAvailable}</strong> unidades
// // //             </Alert>
// // //           )}
// // //           <Typography variant="body2" fontWeight={600} sx={{ mb: 1.5, color: "#334155", fontSize: "0.85rem" }}>
// // //             ¿Cuántos equipos ingresar?
// // //           </Typography>
// // //           <TextField fullWidth autoFocus type="number" label="Cantidad de equipos" placeholder="Ej: 5"
// // //             value={addEquipoCant} onChange={e => setAddEquipoCant(e.target.value)}
// // //             onKeyDown={e => { if (e.key === "Enter") confirmAddEquipo(); }}
// // //             inputProps={{ min: 1, style: { fontWeight: 800, fontSize: "1.4rem", textAlign: "center", padding: "12px 0" } }}
// // //             sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, "& fieldset": { borderColor: "#334155", borderWidth: 2 } },
// // //               "& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button": { display: "none" },
// // //               "& input[type=number]": { MozAppearance: "textfield" },
// // //             }}
// // //           />
// // //         </DialogContent>
// // //         <DialogActions sx={{ p: 2.5, bgcolor: "#f8fafc", borderTop: "1px solid #f1f5f9", gap: 1 }}>
// // //           <ButtonBase label="Cancelar" onClick={() => setAddEquipoOpen(false)}
// // //             sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #e2e8f0", fontSize: "0.8rem" }} />
// // //           <ButtonBase label={`Agregar ${addEquipoCant || "1"} equipo${parseInt(addEquipoCant) > 1 ? "s" : ""}`}
// // //             startIcon={<QrCodeScannerOutlined sx={{ fontSize: 16 }} />}
// // //             onClick={confirmAddEquipo}
// // //             sx={{ px: 2.5, bgcolor: "#0f172a", color: "white", fontSize: "0.82rem",
// // //               "&:hover": { bgcolor: "#1e293b" } }}
// // //           />
// // //         </DialogActions>
// // //       </Dialog>

// // //       {/* ══ DIALOG PISTOLEO ══════════════════════════════════════════════ */}
// // //       <Dialog open={pistoleoOpen} onClose={() => setPistoleoOpen(false)} maxWidth="sm" fullWidth
// // //         PaperProps={{ sx: { borderRadius: 3 } }}>
// // //         <DialogTitle sx={{ m: 0, p: 0 }}>
// // //           <Box sx={{ bgcolor: "#0f172a", px: 3, py: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// // //             <Stack direction="row" spacing={1.5} alignItems="center">
// // //               <Box sx={{ bgcolor: "#059669", p: 0.8, borderRadius: 1.5, display: "flex" }}>
// // //                 <QrCodeScannerOutlined sx={{ fontSize: 17, color: "white" }} />
// // //               </Box>
// // //               <Box>
// // //                 <Typography variant="subtitle2" fontWeight={700} color="white">Registro de Seriales</Typography>
// // //                 {pistoleoItem && (
// // //                   <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.67rem" }}>
// // //                     {pistoleoItem.itemCode} · {serialesCap.length}/{pistoleoItem.quantity} capturados
// // //                   </Typography>
// // //                 )}
// // //               </Box>
// // //             </Stack>
// // //             <IconButton onClick={() => setPistoleoOpen(false)} size="small" sx={{ color: "rgba(255,255,255,0.3)" }}>
// // //               <CloseOutlined fontSize="small" />
// // //             </IconButton>
// // //           </Box>
// // //         </DialogTitle>

// // //         <DialogContent sx={{ p: 3 }}>
// // //           {pistoleoItem && (() => {
// // //             const tipo     = getEquipoTipo(pistoleoItem.description);
// // //             const campos   = CAMPOS_EQUIPO[tipo];
// // //             const totalReq = pistoleoItem.quantity;
// // //             const totalCap = serialesCap.length;
// // //             const todoComp = campos.every(c => !!(serialActual as any)[c.field]?.trim());
// // //             const pct      = Math.min((totalCap / totalReq) * 100, 100);

// // //             return (
// // //               <>
// // //                 {/* Progreso */}
// // //                 <Box sx={{ mb: 3, p: 2.5, bgcolor: "#f8fafc", borderRadius: 2, border: "1px solid #f1f5f9" }}>
// // //                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
// // //                     <Typography variant="body2" fontWeight={700} sx={{ color: "#334155", fontSize: "0.82rem" }}>Progreso de Captura</Typography>
// // //                     <Box sx={{ px: 1.2, py: 0.4, borderRadius: 1, bgcolor: totalCap === totalReq ? "#f0fdf4" : totalCap > 0 ? "#fffbeb" : "#f1f5f9", border: `1px solid ${totalCap === totalReq ? "#d1fae5" : totalCap > 0 ? "#fde68a" : "#e2e8f0"}` }}>
// // //                       <Typography variant="caption" fontWeight={800} sx={{ color: totalCap === totalReq ? "#059669" : totalCap > 0 ? "#b45309" : "#94a3b8", fontSize: "0.72rem" }}>
// // //                         {totalCap} / {totalReq}
// // //                       </Typography>
// // //                     </Box>
// // //                   </Box>
// // //                   <LinearProgress variant="determinate" value={pct}
// // //                     sx={{ height: 6, borderRadius: 3, bgcolor: "#e2e8f0",
// // //                       "& .MuiLinearProgress-bar": { bgcolor: totalCap === totalReq ? "#059669" : "#f59e0b", borderRadius: 3 } }}
// // //                   />
// // //                   <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.65rem", display: "block", mt: 1 }}>
// // //                     Tipo detectado: <strong>{tipo}</strong> · Campos: {campos.map(c => c.label).join(", ")}
// // //                   </Typography>
// // //                 </Box>

// // //                 {/* Auto guardar toggle */}
// // //                 <Box sx={{ mb: 2.5, p: 1.8, borderRadius: 2, bgcolor: autoGuardar ? "#f0fdf4" : "#f8fafc", border: `1px solid ${autoGuardar ? "#d1fae5" : "#f1f5f9"}`, transition: "all 0.25s" }}>
// // //                   <FormControlLabel
// // //                     control={<Switch checked={autoGuardar} onChange={e => setAutoGuardar(e.target.checked)} color="success" size="small" />}
// // //                     label={
// // //                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
// // //                         <AutoAwesomeOutlined sx={{ fontSize: 13, color: autoGuardar ? "#059669" : "#94a3b8" }} />
// // //                         <Typography variant="body2" fontWeight={700} sx={{ color: autoGuardar ? "#065f46" : "#94a3b8", fontSize: "0.8rem" }}>
// // //                           Guardar automáticamente al completar
// // //                         </Typography>
// // //                       </Box>
// // //                     }
// // //                     sx={{ m: 0 }}
// // //                   />
// // //                 </Box>

// // //                 {/* Campos */}
// // //                 <Stack spacing={1.8} sx={{ mb: 3 }}>
// // //                   {campos.map(campo => {
// // //                     const valor    = (serialActual as any)[campo.field] ?? "";
// // //                     const error    = camposError[campo.field] ?? "";
// // //                     const regla    = VALIDACIONES[campo.field];
// // //                     const esValido = regla ? regla.regex.test(valor.trim()) && valor.trim() !== "" : valor.trim() !== "";
// // //                     const tieneErr = !!error && valor.trim() !== "";

// // //                     return (
// // //                       <Box key={campo.field}>
// // //                         <Typography variant="caption" fontWeight={700} sx={{ color: "#475569", display: "flex", alignItems: "center", gap: 0.5, mb: 0.7, fontSize: "0.75rem" }}>
// // //                           {campo.label} *
// // //                           {esValido && <CheckCircleRounded sx={{ fontSize: 12, color: "#059669" }} />}
// // //                         </Typography>
// // //                         <TextField fullWidth size="small" placeholder={campo.placeholder} value={valor}
// // //                           onChange={e => handleCampoChange(campo.field, e.target.value, tipo, totalReq)}
// // //                           disabled={totalCap >= totalReq} error={tieneErr}
// // //                           helperText={tieneErr ? error : esValido ? "✓ Válido" : regla ? `Ej: ${campo.placeholder}` : undefined}
// // //                           FormHelperTextProps={{ sx: { color: tieneErr ? "error.main" : esValido ? "#059669" : "#94a3b8", fontSize: "0.65rem" } }}
// // //                           sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5, fontSize: "0.85rem",
// // //                             ...(esValido && { "& fieldset": { borderColor: "#6ee7b7", borderWidth: 1.5 } }),
// // //                             ...(tieneErr && { "& fieldset": { borderColor: "#fca5a5", borderWidth: 1.5 } }),
// // //                           }}}
// // //                           InputProps={campo.field === "serialNumber" ? {
// // //                             startAdornment: <InputAdornment position="start">
// // //                               <QrCodeScannerOutlined sx={{ fontSize: 15, color: esValido ? "#059669" : "#94a3b8" }} />
// // //                             </InputAdornment>,
// // //                           } : undefined}
// // //                         />
// // //                       </Box>
// // //                     );
// // //                   })}
// // //                 </Stack>

// // //                 {!autoGuardar && (
// // //                   <ButtonBase fullWidth
// // //                     label={totalCap >= totalReq ? "✓ Captura completa" : `Agregar Serial ${totalCap + 1} de ${totalReq}`}
// // //                     startIcon={<AddCircleOutline />}
// // //                     onClick={agregarSerialManual}
// // //                     disabled={!serialActual.serialNumber?.trim() || totalCap >= totalReq}
// // //                     sx={{ mb: 2.5, bgcolor: "#0f172a", color: "white", "&:hover": { bgcolor: "#1e293b" } }}
// // //                   />
// // //                 )}

// // //                 {autoGuardar && totalCap < totalReq && (
// // //                   <Box sx={{ mb: 2.5, p: 1.5, borderRadius: 2, textAlign: "center",
// // //                     bgcolor: todoComp ? "#f0fdf4" : "#f8fafc",
// // //                     border: `1px solid ${todoComp ? "#d1fae5" : "#f1f5f9"}`,
// // //                     transition: "all 0.25s",
// // //                   }}>
// // //                     <Typography variant="caption" fontWeight={600} sx={{ color: todoComp ? "#059669" : "#94a3b8", fontSize: "0.72rem" }}>
// // //                       {todoComp ? "⚡ Guardando automáticamente..." : `Completa los campos para guardar serial ${totalCap + 1} de ${totalReq}`}
// // //                     </Typography>
// // //                   </Box>
// // //                 )}

// // //                 {/* Seriales capturados */}
// // //                 {serialesCap.length > 0 && (
// // //                   <Box>
// // //                     <Typography variant="body2" fontWeight={700} sx={{ mb: 1.2, display: "flex", alignItems: "center", gap: 1, color: "#334155", fontSize: "0.82rem" }}>
// // //                       <CheckCircleOutline sx={{ fontSize: 15, color: "#059669" }} />
// // //                       Registrados ({serialesCap.length})
// // //                     </Typography>
// // //                     <Stack spacing={0.6}>
// // //                       {serialesCap.map((s, idx) => (
// // //                         <Box key={idx} sx={{ px: 2, py: 1.2, bgcolor: "#f8fafc", borderRadius: 1.5, border: "1px solid #f1f5f9", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
// // //                           <Stack spacing={0.3}>
// // //                             <Typography variant="caption" fontWeight={800} sx={{ color: "#059669", fontSize: "0.65rem" }}>#{idx + 1}</Typography>
// // //                             {s.serialNumber && <Typography variant="caption" sx={{ color: "#475569", fontFamily: "monospace", fontSize: "0.72rem" }}>SN: {s.serialNumber}</Typography>}
// // //                             {s.mac          && <Typography variant="caption" sx={{ color: "#64748b", fontFamily: "monospace", fontSize: "0.68rem" }}>MAC: {s.mac}</Typography>}
// // //                             {s.ua           && <Typography variant="caption" sx={{ color: "#64748b", fontFamily: "monospace", fontSize: "0.68rem" }}>UA: {s.ua}</Typography>}
// // //                             {s.mtaMac       && <Typography variant="caption" sx={{ color: "#64748b", fontFamily: "monospace", fontSize: "0.68rem" }}>MTA: {s.mtaMac}</Typography>}
// // //                           </Stack>
// // //                           <IconButton size="small"
// // //                             onClick={() => setSerialésCapturados(prev => prev.filter((_, i) => i !== idx))}
// // //                             sx={{ color: "#cbd5e1", "&:hover": { color: "#dc2626", bgcolor: "#fef2f2" }, mt: -0.5 }}>
// // //                             <CloseOutlined sx={{ fontSize: 13 }} />
// // //                           </IconButton>
// // //                         </Box>
// // //                       ))}
// // //                     </Stack>
// // //                   </Box>
// // //                 )}
// // //               </>
// // //             );
// // //           })()}
// // //         </DialogContent>

// // //         <DialogActions sx={{ p: 2.5, bgcolor: "#f8fafc", borderTop: "1px solid #f1f5f9" }}>
// // //           <ButtonBase label="Cancelar" onClick={() => setPistoleoOpen(false)}
// // //             sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #e2e8f0", fontSize: "0.8rem" }} />
// // //           <ButtonBase
// // //             label={`Guardar ${serialesCap.length} serial${serialesCap.length !== 1 ? "es" : ""}`}
// // //             startIcon={<ArrowForwardOutlined sx={{ fontSize: 16 }} />}
// // //             onClick={guardarSeriales}
// // //             disabled={serialesCap.length === 0}
// // //             sx={{ px: 2.5, bgcolor: "#0f172a", color: "white", fontSize: "0.82rem",
// // //               "&:hover": { bgcolor: "#1e293b" }, "&.Mui-disabled": { bgcolor: "#f1f5f9" } }}
// // //           />
// // //         </DialogActions>
// // //       </Dialog>
// // //     </Box>
// // //   );
// // // }


// // "use client";

// // import { useState, useCallback, useRef, useEffect } from "react";
// // import {
// //   Box, Card, Typography, Chip, Stack, Paper, Alert,
// //   TextField, IconButton, Fade, Collapse, CircularProgress,
// //   Dialog, DialogTitle, DialogContent, DialogActions,
// //   FormControlLabel, Switch, LinearProgress, InputAdornment,
// //   Tooltip, Badge, Divider,
// // } from "@mui/material";
// // import {
// //   TrendingUpOutlined, TrendingDownOutlined, CheckCircleOutline,
// //   QrCodeScannerOutlined, CloseOutlined, DeleteOutline,
// //   AddCircleOutline, InventoryOutlined, BuildOutlined,
// //   ConstructionOutlined, ShieldOutlined, CheckCircle,
// //   AutoAwesomeOutlined, SendOutlined, LayersOutlined,
// //   SwapHorizOutlined, WarningAmberOutlined, InfoOutlined,
// //   ArrowForwardOutlined, DoneAllOutlined, SearchOutlined,
// //   RefreshOutlined, StorageOutlined, StoreOutlined,
// //   PersonOutlined, CalendarTodayOutlined,
// //   ReceiptOutlined, BusinessOutlined, SwapVertOutlined,
// //   FiberManualRecordOutlined, CheckCircleRounded,
// //   RadioButtonUncheckedOutlined, ArrowRightAltOutlined,
// //   AccountTreeOutlined, HistoryOutlined, HubOutlined,
// // } from "@mui/icons-material";
// // import ButtonBase from "@/src/components/base/ButtonBase";
// // import SelectBase from "@/src/components/base/SelectBase";
// // import { TitleCard } from "@/src/components/base/TitleCard";
// // import { toast } from "react-toastify";
// // import { API_URL } from "@/src/lib/config";
// // import dayjs from "dayjs";

// // // ─── Tipos ─────────────────────────────────────────────────────────────────

// // type TipoFlujo   = "ENTRADA" | "SALIDA" | "TRANSFERENCIA";
// // type ProductType = "MATERIAL" | "TOOL" | "EQUIPMENT" | "EPP";
// // type EquipoTipo  = "MODEM" | "DECODIFICADOR" | "ROUTER" | "SWITCH" | "OTRO";

// // // ─── Tipos para datos de catálogo ──────────────────────────────────────────

// // interface SubHub {
// //   id: number;
// //   name: string;
// //   status: string;
// // }

// // interface HubWithSubHubs {
// //   id: number;
// //   name: string;
// //   subHubs: SubHub[];
// // }

// // interface ClienteCatalog {
// //   id: number;
// //   razonSocial: string;
// // }

// // interface SupplySourceCatalog {
// //   id: number;
// //   name: string;
// //   code?: string;
// // }

// // // ─── Tipos de formulario ───────────────────────────────────────────────────

// // interface ContextField {
// //   key: string;
// //   label: string;
// //   placeholder: string;
// //   required: boolean;
// //   type: "text" | "date" | "select" | "select-dynamic";
// //   options?: { label: string; value: string }[];
// //   dynamicKey?: "hubs" | "subhubs" | "clientes" | "supplySources";
// //   icon: React.ReactNode;
// //   helperText?: string;
// // }

// // interface SubtipoMovimiento {
// //   value: string;
// //   label: string;
// //   description: string;
// //   icon: React.ReactNode;
// //   flujo: TipoFlujo;
// //   movementType: "ENTRY" | "EXIT" | "TRANSFER";
// //   contextFields: ContextField[];
// // }

// // interface HubInventoryItem {
// //   id: number;
// //   itemId: number;
// //   itemCode: string;
// //   description: string;
// //   productType: ProductType;
// //   supplySource: string;
// //   quantityAvailable: number;
// //   minimumStock: number;
// //   maximumStock: number | null;
// //   locationCode: string | null;
// //   averageCost: number | null;
// // }

// // interface KardexLineItem {
// //   inventoryId: number;
// //   itemId: number;
// //   itemCode: string;
// //   description: string;
// //   productType: ProductType;
// //   supplySource: string;
// //   quantityAvailable: number;
// //   quantity: number;
// //   unitPrice: number;
// //   _rawQty?: string;
// //   serials?: EquipoSerial[];
// // }

// // interface EquipoSerial {
// //   serialNumber: string;
// //   mac?: string;
// //   ua?: string;
// //   mtaMac?: string;
// // }

// // // ─── Helpers campo ──────────────────────────────────────────────────────────

// // const makeField = (
// //   key: string, label: string, placeholder: string,
// //   icon: React.ReactNode, required = true,
// //   type: "text" | "date" | "select" | "select-dynamic" = "text",
// //   options?: { label: string; value: string }[],
// //   helperText?: string,
// //   dynamicKey?: "hubs" | "subhubs" | "clientes" | "supplySources"
// // ): ContextField => ({ key, label, placeholder, icon, required, type, options, helperText, dynamicKey });

// // // Campos estáticos
// // const F_GUIA_INGRESO   = makeField("guiaIngreso",    "Guía de Remisión Ingreso",  "GR-2025-001", <ReceiptOutlined sx={{ fontSize: 14 }} />);
// // const F_GUIA_DESPACHO  = makeField("guiaDespacho",   "Guía de Remisión Despacho", "GR-2025-001", <ReceiptOutlined sx={{ fontSize: 14 }} />);
// // const F_GUIA           = makeField("guia",           "Guía de Remisión",          "GR-2025-001", <ReceiptOutlined sx={{ fontSize: 14 }} />);
// // const F_FECHA_REC      = makeField("fechaRecepcion", "Fecha de Recepción",        "",            <CalendarTodayOutlined sx={{ fontSize: 14 }} />, true, "date");
// // const F_FECHA_MOV      = makeField("fechaMovimiento","Fecha de Movimiento",       "",            <CalendarTodayOutlined sx={{ fontSize: 14 }} />, true, "date");
// // const F_ORDEN_COMPRA   = makeField("ordenCompra",    "Orden de Compra",           "OC-2025-001", <ReceiptOutlined sx={{ fontSize: 14 }} />);

// // // Campos dinámicos — se resuelven en runtime con los datos de catálogo
// // const F_PROVEEDOR      = makeField("proveedorId",    "Proveedor",                 "",  <BusinessOutlined sx={{ fontSize: 14 }} />, true,  "select-dynamic", undefined, "Fuente de suministro", "supplySources");
// // const F_CLIENTE        = makeField("clienteId",      "Cliente",                   "",    <PersonOutlined   sx={{ fontSize: 14 }} />, true,  "select-dynamic", undefined, undefined,              "clientes");
// // const F_CLIENTE_DEST   = makeField("clienteDestinoId","Cliente Destino",          "",    <PersonOutlined   sx={{ fontSize: 14 }} />, true,  "select-dynamic", undefined, undefined,              "clientes");
// // const F_ALM_ORIGEN     = makeField("almacenOrigenId","Almacén Origen",            "",        <StoreOutlined    sx={{ fontSize: 14 }} />, true,  "select-dynamic", undefined, undefined,              "hubs");
// // const F_SUB_ALM_ORIGEN = makeField("subAlmOrigenId", "Sub Almacén Origen",        "",<StorageOutlined  sx={{ fontSize: 14 }} />, false, "select-dynamic", undefined, undefined,              "subhubs");
// // const F_ALM_DESTINO    = makeField("almacenDestinoId","Almacén Destino",          "",        <StoreOutlined    sx={{ fontSize: 14 }} />, true,  "select-dynamic", undefined, undefined,              "hubs");
// // const F_SUB_ALM_DEST   = makeField("subAlmDestinoId","Sub Almacén Destino",       "",<StorageOutlined  sx={{ fontSize: 14 }} />, false, "select-dynamic", undefined, undefined,              "subhubs");

// // // ─── Subtipos ───────────────────────────────────────────────────────────────

// // const SUBTIPOS: SubtipoMovimiento[] = [
// //   {
// //     value: "COMPRA_LOCAL", label: "Compra Local", flujo: "ENTRADA", movementType: "ENTRY",
// //     description: "Ingreso por compra directa a proveedor local",
// //     icon: <InventoryOutlined sx={{ fontSize: 18 }} />,
// //     contextFields: [F_GUIA_INGRESO, F_FECHA_REC, F_ORDEN_COMPRA, F_PROVEEDOR, F_ALM_DESTINO, F_SUB_ALM_DEST],
// //   },
// //   {
// //     value: "CONSIGNACION_RECIBIDA", label: "Consignación Recibida", flujo: "ENTRADA", movementType: "ENTRY",
// //     description: "Ingreso por consignación enviada por cliente",
// //     icon: <BusinessOutlined sx={{ fontSize: 18 }} />,
// //     contextFields: [F_GUIA_INGRESO, F_FECHA_REC, F_ORDEN_COMPRA, F_CLIENTE, F_ALM_DESTINO, F_SUB_ALM_DEST],
// //   },
// //   {
// //     value: "DEVOLUCION_CONTRATISTA", label: "Devolución de Contratista", flujo: "ENTRADA", movementType: "ENTRY",
// //     description: "Material devuelto por contratista o técnico al hub",
// //     icon: <ArrowForwardOutlined sx={{ fontSize: 18, transform: "rotate(180deg)" }} />,
// //     contextFields: [F_GUIA, F_ALM_ORIGEN, F_SUB_ALM_ORIGEN, F_ALM_DESTINO, F_SUB_ALM_DEST],
// //   },
// //   {
// //     value: "TRANSFERENCIA_ALMACENES_E", label: "Transferencia entre Almacenes", flujo: "ENTRADA", movementType: "ENTRY",
// //     description: "Ingreso por traspaso desde otro hub",
// //     icon: <SwapVertOutlined sx={{ fontSize: 18 }} />,
// //     contextFields: [F_GUIA, F_FECHA_MOV, F_ALM_ORIGEN, F_SUB_ALM_ORIGEN, F_ALM_DESTINO, F_SUB_ALM_DEST],
// //   },
// //   {
// //     value: "DESPACHO_REGULAR", label: "Despacho Regular", flujo: "SALIDA", movementType: "EXIT",
// //     description: "Salida por despacho a técnico o cuadrilla para servicio",
// //     icon: <ArrowForwardOutlined sx={{ fontSize: 18 }} />,
// //     contextFields: [F_GUIA_DESPACHO, F_FECHA_MOV, F_ALM_ORIGEN, F_SUB_ALM_ORIGEN, F_ALM_DESTINO, F_SUB_ALM_DEST],
// //   },
// //   {
// //     value: "DEVOLUCION_CLIENTE", label: "Devolución a Cliente", flujo: "SALIDA", movementType: "EXIT",
// //     description: "Devolución de material al cliente propietario",
// //     icon: <PersonOutlined sx={{ fontSize: 18 }} />,
// //     contextFields: [F_GUIA, F_FECHA_MOV, F_ALM_ORIGEN, F_SUB_ALM_ORIGEN, F_CLIENTE_DEST],
// //   },
// //   {
// //     value: "TRASPASO_CONTRATISTA", label: "Traspaso Contratista", flujo: "SALIDA", movementType: "EXIT",
// //     description: "Traspaso de material a cliente o contratista del cliente",
// //     icon: <SwapHorizOutlined sx={{ fontSize: 18 }} />,
// //     contextFields: [F_GUIA, F_FECHA_MOV, F_ALM_ORIGEN, F_SUB_ALM_ORIGEN, F_CLIENTE_DEST],
// //   },
// //   {
// //     value: "TRANSFERENCIA_ALMACENES_S", label: "Transferencia entre Almacenes", flujo: "SALIDA", movementType: "EXIT",
// //     description: "Salida por traspaso a otro hub",
// //     icon: <SwapVertOutlined sx={{ fontSize: 18 }} />,
// //     contextFields: [F_GUIA, F_FECHA_MOV, F_ALM_ORIGEN, F_SUB_ALM_ORIGEN, F_ALM_DESTINO, F_SUB_ALM_DEST],
// //   },
// //   {
// //     value: "TRANSFERENCIA_ALMACENES", label: "Transferencia entre Almacenes", flujo: "TRANSFERENCIA", movementType: "TRANSFER",
// //     description: "Traspaso simultáneo entre hubs o almacenes",
// //     icon: <AccountTreeOutlined sx={{ fontSize: 18 }} />,
// //     contextFields: [F_GUIA, F_FECHA_MOV, F_ALM_ORIGEN, F_SUB_ALM_ORIGEN, F_ALM_DESTINO, F_SUB_ALM_DEST],
// //   },
// // ];

// // // ─── Config visual ──────────────────────────────────────────────────────────

// // const PRODUCT_CFG: Record<ProductType, {
// //   label: string; icon: React.ReactNode; emoji: string;
// //   color: string; bg: string; border: string;
// // }> = {
// //   MATERIAL:  { label: "Material",    icon: <InventoryOutlined    sx={{ fontSize: 14 }} />, emoji: "📦", color: "#78350f", bg: "#fef3c7", border: "#fde68a" },
// //   TOOL:      { label: "Herramienta", icon: <BuildOutlined        sx={{ fontSize: 14 }} />, emoji: "🔧", color: "#1e3a8a", bg: "#eff6ff", border: "#bfdbfe" },
// //   EQUIPMENT: { label: "Equipo",      icon: <ConstructionOutlined sx={{ fontSize: 14 }} />, emoji: "⚙️", color: "#14532d", bg: "#f0fdf4", border: "#bbf7d0" },
// //   EPP:       { label: "EPP",         icon: <ShieldOutlined       sx={{ fontSize: 14 }} />, emoji: "🦺", color: "#4c1d95", bg: "#faf5ff", border: "#ddd6fe" },
// // };

// // const FLUJO_CFG: Record<TipoFlujo, {
// //   color: string; dimColor: string; bg: string; border: string;
// //   icon: React.ReactNode; label: string; desc: string;
// // }> = {
// //   ENTRADA:       { color: "#059669", dimColor: "#d1fae5", bg: "#f0fdf4", border: "#6ee7b7", icon: <TrendingUpOutlined sx={{ fontSize: 22 }} />,    label: "Entrada",        desc: "Ingreso de stock al hub"       },
// //   SALIDA:        { color: "#b91c1c", dimColor: "#fee2e2", bg: "#fff5f5", border: "#fca5a5", icon: <TrendingDownOutlined sx={{ fontSize: 22 }} />,   label: "Salida",         desc: "Egreso de stock del hub"      },
// //   TRANSFERENCIA: { color: "#5b21b6", dimColor: "#ede9fe", bg: "#faf5ff", border: "#c4b5fd", icon: <SwapVertOutlined sx={{ fontSize: 22 }} />,       label: "Transferencia",  desc: "Movimiento entre almacenes"   },
// // };

// // // ─── Pistoleo config ─────────────────────────────────────────────────────────

// // type CampoConfig = { field: string; label: string; placeholder: string };

// // const CAMPOS_EQUIPO: Record<EquipoTipo, CampoConfig[]> = {
// //   MODEM:         [{ field: "serialNumber", label: "Nro. Serie", placeholder: "ZTEATV45501950107" }, { field: "mac", label: "MAC Address", placeholder: "6C:B8:81:F2:B7:D7" }, { field: "ua", label: "UA", placeholder: "12345678" }],
// //   DECODIFICADOR: [{ field: "serialNumber", label: "Nro. Serie", placeholder: "ZTEATV45501950107" }, { field: "mac", label: "MAC Address", placeholder: "6C:B8:81:F2:B7:D7" }],
// //   ROUTER:        [{ field: "serialNumber", label: "Nro. Serie", placeholder: "ZTEATV45501950107" }, { field: "mac", label: "MAC Address", placeholder: "6C:B8:81:F2:B7:D7" }, { field: "mtaMac", label: "MTA MAC", placeholder: "CC00F1CA6351" }],
// //   SWITCH:        [{ field: "serialNumber", label: "Nro. Serie", placeholder: "ZTEATV45501950107" }, { field: "mac", label: "MAC Address", placeholder: "6C:B8:81:F2:B7:D7" }],
// //   OTRO:          [{ field: "serialNumber", label: "Nro. Serie", placeholder: "ZTEATV45501950107" }],
// // };

// // const VALIDACIONES: Record<string, { regex: RegExp; mensaje: string }> = {
// //   serialNumber: { regex: /^[A-Z0-9]{8,25}$/,                      mensaje: "Alfanumérico 8–25 caracteres" },
// //   mac:          { regex: /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/, mensaje: "Formato: 6C:B8:81:F2:B7:D7"   },
// //   mtaMac:       { regex: /^[0-9A-Fa-f]{12}$/,                     mensaje: "12 hex sin separadores"       },
// //   ua:           { regex: /^.{6,12}$/,                              mensaje: "6–12 caracteres"               },
// // };

// // const getEquipoTipo = (desc: string): EquipoTipo => {
// //   const d = desc.toUpperCase();
// //   if (d.includes("MODEM") || d.includes("HFC"))           return "MODEM";
// //   if (d.includes("DECODIFICADOR") || d.includes("AMINO")) return "DECODIFICADOR";
// //   if (d.includes("ROUTER") || d.includes("WIFI"))         return "ROUTER";
// //   if (d.includes("SWITCH"))                               return "SWITCH";
// //   return "OTRO";
// // };

// // const TENANT_ID  = 1;
// // const PROJECT_ID = 1;
// // const USER_ID    = 1;
// // const PAGE_SIZE  = 15;

// // // ─── Step indicator ──────────────────────────────────────────────────────────

// // interface StepDotProps {
// //   number: number; label: string; active: boolean; done: boolean;
// // }
// // function StepDot({ number, label, active, done }: StepDotProps) {
// //   return (
// //     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //       <Box sx={{
// //         width: 28, height: 28, borderRadius: "50%",
// //         display: "flex", alignItems: "center", justifyContent: "center",
// //         transition: "all 0.3s ease",
// //         bgcolor: done ? "#059669" : active ? "#1e40af" : "#e2e8f0",
// //         border: `2px solid ${done ? "#059669" : active ? "#1e40af" : "#cbd5e1"}`,
// //         boxShadow: active ? "0 0 0 3px rgba(30,64,175,0.12)" : "none",
// //       }}>
// //         {done
// //           ? <CheckCircle sx={{ fontSize: 14, color: "white" }} />
// //           : <Typography variant="caption" fontWeight={800} sx={{ color: active ? "white" : "#94a3b8", fontSize: "0.65rem" }}>{number}</Typography>
// //         }
// //       </Box>
// //       <Typography variant="caption" fontWeight={active || done ? 700 : 500}
// //         sx={{ color: active ? "#1e40af" : done ? "#059669" : "#94a3b8", fontSize: "0.72rem", display: { xs: "none", sm: "block" } }}>
// //         {label}
// //       </Typography>
// //     </Box>
// //   );
// // }

// // // ─── Summary panel ───────────────────────────────────────────────────────────

// // interface SummaryPanelProps {
// //   tipoFlujo: TipoFlujo | null; subtipo: SubtipoMovimiento | null;
// //   ctxValues: Record<string, string>; lineItems: KardexLineItem[];
// //   totalMovements: number; totalValue: number;
// //   validationErrors: string[]; notes: string;
// //   hubs: HubWithSubHubs[]; clientes: ClienteCatalog[];
// //   supplySources: SupplySourceCatalog[];
// // }

// // function SummaryPanel({
// //   tipoFlujo, subtipo, ctxValues, lineItems,
// //   totalMovements, totalValue, validationErrors, notes,
// //   hubs, clientes, supplySources,
// // }: SummaryPanelProps) {
// //   const flujo = tipoFlujo ? FLUJO_CFG[tipoFlujo] : null;

// //   /** Resuelve label legible a partir del id guardado en ctxValues */
// //   const resolveLabel = (field: ContextField, rawVal: string): string => {
// //     if (!rawVal?.trim()) return "";
// //     if (field.dynamicKey === "hubs") {
// //       return hubs.find(h => String(h.id) === rawVal)?.name ?? rawVal;
// //     }
// //     if (field.dynamicKey === "subhubs") {
// //       const allSubs = hubs.flatMap(h => h.subHubs);
// //       return allSubs.find(s => String(s.id) === rawVal)?.name ?? rawVal;
// //     }
// //     if (field.dynamicKey === "clientes") {
// //       return clientes.find(c => String(c.id) === rawVal)?.razonSocial ?? rawVal;
// //     }
// //     if (field.dynamicKey === "supplySources") {
// //       return supplySources.find(s => String(s.id) === rawVal)?.name ?? rawVal;
// //     }
// //     return rawVal;
// //   };

// //   return (
// //     <Box sx={{
// //       width: { lg: 280 }, flexShrink: 0,
// //       display: { xs: "none", lg: "flex" },
// //       flexDirection: "column", gap: 0,
// //       position: "sticky", top: 24, alignSelf: "flex-start",
// //     }}>
// //       <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", overflow: "hidden", bgcolor: "white" }}>
// //         <Box sx={{ px: 2.5, py: 2, bgcolor: "#0f172a", display: "flex", alignItems: "center", gap: 1.5 }}>
// //           <HistoryOutlined sx={{ fontSize: 18, color: "rgba(255,255,255,0.5)" }} />
// //           <Typography variant="subtitle2" fontWeight={700} sx={{ color: "white", fontSize: "0.8rem" }}>
// //             Resumen del Movimiento
// //           </Typography>
// //         </Box>

// //         <Box sx={{ p: 2.5, display: "flex", flexDirection: "column", gap: 2.5 }}>
// //           <Box>
// //             <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 700, letterSpacing: 1, fontSize: "0.6rem", display: "block", mb: 1 }}>
// //               TIPO DE MOVIMIENTO
// //             </Typography>
// //             {flujo ? (
// //               <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1.5, borderRadius: 2, bgcolor: flujo.bg, border: `1px solid ${flujo.border}` }}>
// //                 <Box sx={{ color: flujo.color }}>{flujo.icon}</Box>
// //                 <Box>
// //                   <Typography variant="body2" fontWeight={700} sx={{ color: flujo.color, lineHeight: 1 }}>{flujo.label}</Typography>
// //                   <Typography variant="caption" sx={{ color: flujo.color, opacity: 0.7, fontSize: "0.65rem" }}>{flujo.desc}</Typography>
// //                 </Box>
// //               </Box>
// //             ) : (
// //               <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "#f8fafc", border: "1px dashed #e2e8f0" }}>
// //                 <Typography variant="caption" sx={{ color: "#94a3b8" }}>Sin seleccionar</Typography>
// //               </Box>
// //             )}
// //           </Box>

// //           <Box>
// //             <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 700, letterSpacing: 1, fontSize: "0.6rem", display: "block", mb: 1 }}>
// //               SUBTIPO
// //             </Typography>
// //             {subtipo ? (
// //               <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1.5, borderRadius: 2, bgcolor: "#f8fafc", border: "1px solid #e2e8f0" }}>
// //                 <Box sx={{ color: "#475569" }}>{subtipo.icon}</Box>
// //                 <Typography variant="body2" fontWeight={600} sx={{ color: "#1e293b", fontSize: "0.78rem", lineHeight: 1.3 }}>{subtipo.label}</Typography>
// //               </Box>
// //             ) : (
// //               <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "#f8fafc", border: "1px dashed #e2e8f0" }}>
// //                 <Typography variant="caption" sx={{ color: "#94a3b8" }}>Sin seleccionar</Typography>
// //               </Box>
// //             )}
// //           </Box>

// //           {Object.keys(ctxValues).filter(k => ctxValues[k]?.trim()).length > 0 && (
// //             <Box>
// //               <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 700, letterSpacing: 1, fontSize: "0.6rem", display: "block", mb: 1 }}>
// //                 DATOS DEL DOCUMENTO
// //               </Typography>
// //               <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
// //                 {(subtipo?.contextFields ?? []).filter(f => ctxValues[f.key]?.trim()).map(f => (
// //                   <Box key={f.key} sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
// //                     <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.68rem", flexShrink: 0 }}>{f.label}:</Typography>
// //                     <Typography variant="caption" fontWeight={700} sx={{ color: "#1e293b", fontSize: "0.68rem", textAlign: "right", wordBreak: "break-word" }}>
// //                       {resolveLabel(f, ctxValues[f.key])}
// //                     </Typography>
// //                   </Box>
// //                 ))}
// //               </Box>
// //             </Box>
// //           )}

// //           <Divider sx={{ borderColor: "#f1f5f9" }} />

// //           <Box>
// //             <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 700, letterSpacing: 1, fontSize: "0.6rem", display: "block", mb: 1.5 }}>
// //               ÍTEMS DEL MOVIMIENTO
// //             </Typography>
// //             <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
// //               {[
// //                 { label: "Total ítems",       value: lineItems.length,   active: lineItems.length > 0 },
// //                 { label: "Movimientos",       value: totalMovements,     active: totalMovements > 0   },
// //                 { label: "Equipos c/serial",  value: `${lineItems.filter(i => i.productType === "EQUIPMENT" && (i.serials?.length ?? 0) > 0).length} / ${lineItems.filter(i => i.productType === "EQUIPMENT").length}`, active: lineItems.some(i => i.productType === "EQUIPMENT") },
// //               ].map(kpi => (
// //                 <Box key={kpi.label} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// //                   <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.7rem" }}>{kpi.label}</Typography>
// //                   <Typography variant="caption" fontWeight={700} sx={{ color: kpi.active ? "#1e293b" : "#cbd5e1", fontSize: "0.78rem" }}>
// //                     {kpi.value}
// //                   </Typography>
// //                 </Box>
// //               ))}
// //               {totalValue > 0 && (
// //                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 0.5, pt: 1, borderTop: "1px solid #f1f5f9" }}>
// //                   <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.7rem" }}>Valor estimado</Typography>
// //                   <Typography variant="caption" fontWeight={800} sx={{ color: "#1e293b", fontFamily: "monospace", fontSize: "0.82rem" }}>
// //                     S/ {totalValue.toFixed(2)}
// //                   </Typography>
// //                 </Box>
// //               )}
// //             </Box>
// //           </Box>

// //           {lineItems.length > 0 && (
// //             <>
// //               <Divider sx={{ borderColor: "#f1f5f9" }} />
// //               <Box>
// //                 <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 700, letterSpacing: 1, fontSize: "0.6rem", display: "block", mb: 1 }}>
// //                   PRODUCTOS
// //                 </Typography>
// //                 <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6, maxHeight: 160, overflowY: "auto",
// //                   "&::-webkit-scrollbar": { width: 3 }, "&::-webkit-scrollbar-thumb": { bgcolor: "#e2e8f0", borderRadius: 2 } }}>
// //                   {lineItems.map(item => {
// //                     const cfg = PRODUCT_CFG[item.productType];
// //                     const isEquipo = item.productType === "EQUIPMENT";
// //                     const serialCount = item.serials?.length ?? 0;
// //                     const ok = isEquipo ? serialCount === item.quantity : item.quantity > 0;
// //                     return (
// //                       <Box key={item.inventoryId} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //                         {ok
// //                           ? <CheckCircleRounded sx={{ fontSize: 13, color: "#059669", flexShrink: 0 }} />
// //                           : <RadioButtonUncheckedOutlined sx={{ fontSize: 13, color: "#f59e0b", flexShrink: 0 }} />
// //                         }
// //                         <Typography variant="caption" sx={{ flex: 1, color: "#475569", fontSize: "0.68rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
// //                           {item.itemCode}
// //                         </Typography>
// //                         <Typography variant="caption" fontWeight={700} sx={{ color: cfg.color, fontSize: "0.68rem", flexShrink: 0 }}>
// //                           {isEquipo ? serialCount : item.quantity}
// //                         </Typography>
// //                       </Box>
// //                     );
// //                   })}
// //                 </Box>
// //               </Box>
// //             </>
// //           )}

// //           {validationErrors.length > 0 && lineItems.length > 0 && (
// //             <>
// //               <Divider sx={{ borderColor: "#f1f5f9" }} />
// //               <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "#fffbeb", border: "1px solid #fde68a" }}>
// //                 <Typography variant="caption" fontWeight={700} sx={{ color: "#92400e", fontSize: "0.68rem", display: "block", mb: 0.8 }}>
// //                   {validationErrors.length} pendiente{validationErrors.length > 1 ? "s" : ""}
// //                 </Typography>
// //                 {validationErrors.slice(0, 3).map((e, i) => (
// //                   <Typography key={i} variant="caption" sx={{ color: "#78350f", fontSize: "0.65rem", display: "block", lineHeight: 1.5 }}>• {e}</Typography>
// //                 ))}
// //                 {validationErrors.length > 3 && (
// //                   <Typography variant="caption" sx={{ color: "#78350f", fontSize: "0.65rem" }}>+{validationErrors.length - 3} más...</Typography>
// //                 )}
// //               </Box>
// //             </>
// //           )}

// //           {notes.trim() && (
// //             <>
// //               <Divider sx={{ borderColor: "#f1f5f9" }} />
// //               <Box>
// //                 <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 700, letterSpacing: 1, fontSize: "0.6rem", display: "block", mb: 0.8 }}>NOTAS</Typography>
// //                 <Typography variant="caption" sx={{ color: "#475569", fontSize: "0.7rem", fontStyle: "italic", lineHeight: 1.5 }}>"{notes}"</Typography>
// //               </Box>
// //             </>
// //           )}
// //         </Box>
// //       </Card>
// //     </Box>
// //   );
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // COMPONENTE PRINCIPAL
// // // ─────────────────────────────────────────────────────────────────────────────

// // export default function KardexMovement() {
// //   const topRef = useRef<HTMLDivElement>(null);

// //   // ── Estado de catálogos ───────────────────────────────────────────────
// //   const [hubs,           setHubs]           = useState<HubWithSubHubs[]>([]);
// //   const [clientes,       setClientes]       = useState<ClienteCatalog[]>([]);
// //   const [supplySources,  setSupplySources]  = useState<SupplySourceCatalog[]>([]);
// //   const [loadingCatalogs, setLoadingCatalogs] = useState(true);

// //   // ── Selector de Hub / Sub Hub (cabecera + query params) ───────────────
// //   const [selectedHubId,    setSelectedHubId]    = useState<number>(0);
// //   const [selectedSubHubId, setSelectedSubHubId] = useState<number>(0);

// //   // Sub hubs del hub seleccionado
// //   const subHubsActivos = hubs.find(h => h.id === selectedHubId)?.subHubs ?? [];

// //   // ── Estado de formulario ──────────────────────────────────────────────
// //   const [tipoFlujo, setTipoFlujo] = useState<TipoFlujo | null>(null);
// //   const [subtipo,   setSubtipo]   = useState<SubtipoMovimiento | null>(null);
// //   const [ctxValues, setCtxValues] = useState<Record<string, string>>({});
// //   const [notes,     setNotes]     = useState("");

// //   // ── Estado de inventario ──────────────────────────────────────────────
// //   const [filterType,       setFilterType]       = useState<string>("ALL");
// //   const [inventorySearch,  setInventorySearch]  = useState("");
// //   const [debouncedSearch,  setDebouncedSearch]  = useState("");
// //   const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
// //   const [inventoryRows,    setInventoryRows]    = useState<HubInventoryItem[]>([]);
// //   const [inventoryTotal,   setInventoryTotal]   = useState(0);
// //   const [inventoryPage,    setInventoryPage]    = useState(0);
// //   const [inventoryPages,   setInventoryPages]   = useState(1);
// //   const [loadingInventory, setLoadingInventory] = useState(false);
// //   const [reloadTrigger,    setReloadTrigger]    = useState(0);

// //   const [lineItems, setLineItems] = useState<KardexLineItem[]>([]);

// //   // ── Pistoleo ──────────────────────────────────────────────────────────
// //   const [addEquipoOpen, setAddEquipoOpen] = useState(false);
// //   const [addEquipoItem, setAddEquipoItem] = useState<HubInventoryItem | null>(null);
// //   const [addEquipoCant, setAddEquipoCant] = useState("1");

// //   const [pistoleoOpen, setPistoleoOpen]         = useState(false);
// //   const [pistoleoItem, setPistoleoItem]         = useState<KardexLineItem | null>(null);
// //   const [serialActual, setSerialActual]         = useState<Partial<EquipoSerial>>({});
// //   const [serialesCap,  setSerialésCapturados]   = useState<EquipoSerial[]>([]);
// //   const [camposError,  setCamposError]          = useState<Record<string, string>>({});
// //   const [autoGuardar,  setAutoGuardar]          = useState(true);

// //   const [submitting,  setSubmitting]  = useState(false);
// //   const [showSuccess, setShowSuccess] = useState(false);

// //   // ─────────────────────────────────────────────────────────────────────
// //   // CARGA DE CATÁLOGOS AL MONTAR
// //   // ─────────────────────────────────────────────────────────────────────

// //   useEffect(() => {
// //     const fetchCatalogs = async () => {
// //       setLoadingCatalogs(true);
// //       try {
// //         const [hubsRes, clientesRes, supplyRes] = await Promise.all([
// //           fetch(`${API_URL}/api/catalogs/hubs-with-subhubs`),
// //           fetch(`${API_URL}/api/catalogs/clients`),
// //           fetch(`${API_URL}/api/catalogs/supply-sources?page=0&size=100`),
// //         ]);

// //         if (hubsRes.ok) {
// //           const d = await hubsRes.json();
// //           const hubData: HubWithSubHubs[] = d.data ?? [];
// //           setHubs(hubData);
// //           // Seleccionar el primer hub por defecto
// //           if (hubData.length > 0) {
// //             setSelectedHubId(hubData[0].id);
// //             const firstSubs = hubData[0].subHubs ?? [];
// //             if (firstSubs.length > 0) setSelectedSubHubId(firstSubs[0].id);
// //           }
// //         }

// //         if (clientesRes.ok) {
// //           const d = await clientesRes.json();
// //           setClientes(d.data ?? []);
// //         }

// //         if (supplyRes.ok) {
// //           const d = await supplyRes.json();
// //           // Soporta paginado ({ data: { content: [...] } }) o lista plana ({ data: [...] })
// //           const content = d.data?.content ?? d.data ?? [];
// //           setSupplySources(content);
// //         }
// //       } catch (e: any) {
// //         toast.error(`Error al cargar catálogos: ${e.message}`);
// //       } finally {
// //         setLoadingCatalogs(false);
// //       }
// //     };
// //     fetchCatalogs();
// //   }, []);

// //   // Cuando cambia el hub seleccionado, resetear sub hub
// //   useEffect(() => {
// //     const subs = hubs.find(h => h.id === selectedHubId)?.subHubs ?? [];
// //     setSelectedSubHubId(subs.length > 0 ? subs[0].id : 0);
// //   }, [selectedHubId, hubs]);

// //   // ─────────────────────────────────────────────────────────────────────
// //   // OPTIONS PARA LOS SELECTS DINÁMICOS
// //   // ─────────────────────────────────────────────────────────────────────

// //   const hubOptions = hubs.map(h => ({ label: h.name, value: String(h.id) }));
// //   const subHubOptions = subHubsActivos.map(s => ({ label: s.name, value: String(s.id) }));
// //   const clienteOptions = clientes.map(c => ({ label: c.razonSocial, value: String(c.id) }));
// //   const supplySourceOptions = supplySources.map(s => ({ label: s.name, value: String(s.id) }));

// //   /** Dado un dynamicKey, retorna las opciones correspondientes */
// //   const getDynamicOptions = (key: ContextField["dynamicKey"]): { label: string; value: string }[] => {
// //     switch (key) {
// //       case "hubs":          return hubOptions;
// //       case "subhubs":       return subHubOptions;
// //       case "clientes":      return clienteOptions;
// //       case "supplySources": return supplySourceOptions;
// //       default:              return [];
// //     }
// //   };

// //   // ─────────────────────────────────────────────────────────────────────
// //   // DEBOUNCE BÚSQUEDA
// //   // ─────────────────────────────────────────────────────────────────────

// //   useEffect(() => {
// //     if (searchTimer.current) clearTimeout(searchTimer.current);
// //     searchTimer.current = setTimeout(() => { setDebouncedSearch(inventorySearch); setInventoryPage(0); }, 380);
// //     return () => { if (searchTimer.current) clearTimeout(searchTimer.current); };
// //   }, [inventorySearch]);

// //   useEffect(() => { setCtxValues({}); }, [subtipo]);

// //   // ─────────────────────────────────────────────────────────────────────
// //   // FETCH INVENTARIO — usa selectedHubId y selectedSubHubId reactivamente
// //   // ─────────────────────────────────────────────────────────────────────

// //   const fetchInventory = useCallback(async (page = 0) => {
// //     // No fetch si aún no hay hub seleccionado
// //     if (!selectedHubId) return;

// //     setLoadingInventory(true);
// //     try {
// //       const params = new URLSearchParams({
// //         tenantId:  String(TENANT_ID),
// //         hubId:     String(selectedHubId),
// //         projectId: String(PROJECT_ID),
// //         page:      String(page),
// //         size:      String(PAGE_SIZE),
// //         ...(selectedSubHubId ? { subHubId: String(selectedSubHubId) } : {}),
// //         ...(filterType !== "ALL"    ? { productType: filterType }         : {}),
// //         ...(debouncedSearch.trim()  ? { search: debouncedSearch.trim() }  : {}),
// //       });

// //       const res = await fetch(`${API_URL}/api/hub-inventory?${params}`);
// //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
// //       const data: any = await res.json();
// //       const content: HubInventoryItem[] = data.data.content ?? [];
// //       setInventoryRows(content);
// //       setInventoryTotal(data.data.page?.totalElements ?? data.data.totalElements ?? content.length);
// //       setInventoryPages(data.data.page?.totalPages    ?? data.data.totalPages    ?? 1);
// //       setInventoryPage(page);
// //     } catch (e: any) {
// //       toast.error(`Error inventario: ${e.message}`);
// //     } finally {
// //       setLoadingInventory(false);
// //     }
// //   }, [selectedHubId, selectedSubHubId, filterType, debouncedSearch, reloadTrigger]);

// //   useEffect(() => { fetchInventory(0); }, [fetchInventory]);

// //   const setCtx = (key: string, val: string) => setCtxValues(prev => ({ ...prev, [key]: val }));

// //   const ctxMissing = (subtipo?.contextFields ?? [])
// //     .filter(f => f.required && !ctxValues[f.key]?.trim())
// //     .map(f => f.label);

// //   // ─────────────────────────────────────────────────────────────────────
// //   // ITEMS / CARRITO
// //   // ─────────────────────────────────────────────────────────────────────

// //   const addNonEquipmentItem = (inv: HubInventoryItem) => {
// //     if (lineItems.some(li => li.inventoryId === inv.id)) { toast.info(`${inv.itemCode} ya agregado`); return; }
// //     if (tipoFlujo !== "ENTRADA" && inv.quantityAvailable <= 0) { toast.warning(`${inv.itemCode} sin stock`); return; }
// //     setLineItems(prev => [...prev, {
// //       inventoryId: inv.id, itemId: inv.itemId, itemCode: inv.itemCode,
// //       description: inv.description, productType: inv.productType,
// //       supplySource: inv.supplySource, quantityAvailable: inv.quantityAvailable,
// //       quantity: 1, unitPrice: inv.averageCost ?? 0, _rawQty: "1", serials: [],
// //     }]);
// //     toast.success(`${inv.itemCode} agregado`);
// //   };

// //   const openAddEquipo = (inv: HubInventoryItem) => {
// //     if (lineItems.some(li => li.inventoryId === inv.id)) { toast.info(`${inv.itemCode} ya agregado`); return; }
// //     setAddEquipoItem(inv); setAddEquipoCant("1"); setAddEquipoOpen(true);
// //   };

// //   const confirmAddEquipo = () => {
// //     if (!addEquipoItem) return;
// //     const cant = Math.max(1, parseInt(addEquipoCant, 10) || 1);
// //     setLineItems(prev => [...prev, {
// //       inventoryId: addEquipoItem.id, itemId: addEquipoItem.itemId,
// //       itemCode: addEquipoItem.itemCode, description: addEquipoItem.description,
// //       productType: "EQUIPMENT", supplySource: addEquipoItem.supplySource,
// //       quantityAvailable: addEquipoItem.quantityAvailable,
// //       quantity: cant, unitPrice: addEquipoItem.averageCost ?? 0,
// //       _rawQty: String(cant), serials: [],
// //     }]);
// //     setAddEquipoOpen(false); setAddEquipoItem(null);
// //     toast.success(`${addEquipoItem.itemCode} — ${cant} ud. listas`);
// //   };

// //   const removeItem  = (id: number) => setLineItems(prev => prev.filter(i => i.inventoryId !== id));
// //   const updateQty   = (id: number, raw: string) => {
// //     const v = parseInt(raw, 10);
// //     setLineItems(prev => prev.map(i => i.inventoryId === id ? { ...i, quantity: isNaN(v) ? 0 : Math.max(0, v), _rawQty: raw } : i));
// //   };
// //   const updatePrice = (id: number, raw: string) => {
// //     const v = parseFloat(raw);
// //     setLineItems(prev => prev.map(i => i.inventoryId === id ? { ...i, unitPrice: isNaN(v) ? 0 : v } : i));
// //   };

// //   // ─────────────────────────────────────────────────────────────────────
// //   // PISTOLEO
// //   // ─────────────────────────────────────────────────────────────────────

// //   const abrirPistoleo = (item: KardexLineItem) => {
// //     setPistoleoItem(item); setSerialActual({}); setCamposError({});
// //     setSerialésCapturados(item.serials ? [...item.serials] : []);
// //     setPistoleoOpen(true);
// //   };

// //   const validarCampo = (field: string, value: string) => {
// //     if (!value.trim()) return "";
// //     const r = VALIDACIONES[field];
// //     return r && !r.regex.test(value.trim()) ? r.mensaje : "";
// //   };

// //   const checkAutoAgregar = useCallback((
// //     ns: Partial<EquipoSerial>, tipo: EquipoTipo, totalReq: number, list: EquipoSerial[]
// //   ) => {
// //     if (!autoGuardar) return;
// //     const campos = CAMPOS_EQUIPO[tipo];
// //     if (!campos.every(c => !!(ns as any)[c.field]?.trim())) return;
// //     if (campos.some(c => !!validarCampo(c.field, (ns as any)[c.field] ?? ""))) return;
// //     const nueva = [...list, { ...ns } as EquipoSerial];
// //     setSerialésCapturados(nueva); setSerialActual({}); setCamposError({});
// //     if (pistoleoItem && nueva.length >= totalReq) guardarSerialesConLista(nueva);
// //   }, [autoGuardar, pistoleoItem]);

// //   const handleCampoChange = (field: string, value: string, tipo: EquipoTipo, totalReq: number) => {
// //     const u = { ...serialActual, [field]: value };
// //     setSerialActual(u);
// //     const r = VALIDACIONES[field];
// //     setCamposError(prev => ({ ...prev, [field]: r && value.trim() ? validarCampo(field, value) : "" }));
// //     checkAutoAgregar(u, tipo, totalReq, serialesCap);
// //   };

// //   const agregarSerialManual = () => {
// //     if (!pistoleoItem) return;
// //     const tipo = getEquipoTipo(pistoleoItem.description);
// //     const campos = CAMPOS_EQUIPO[tipo];
// //     const errs: Record<string, string> = {};
// //     let err = false;
// //     campos.forEach(c => {
// //       const v = (serialActual as any)[c.field] ?? "";
// //       if (!v.trim()) { errs[c.field] = `${c.label} requerido`; err = true; }
// //       else { const e = validarCampo(c.field, v); if (e) { errs[c.field] = e; err = true; } }
// //     });
// //     if (err) { setCamposError(errs); return; }
// //     setSerialésCapturados(prev => [...prev, { ...serialActual } as EquipoSerial]);
// //     setSerialActual({}); setCamposError({});
// //   };

// //   const guardarSerialesConLista = (lista: EquipoSerial[]) => {
// //     if (!pistoleoItem) return;
// //     setLineItems(prev => prev.map(i =>
// //       i.inventoryId === pistoleoItem.inventoryId
// //         ? { ...i, serials: lista, quantity: lista.length, _rawQty: String(lista.length) }
// //         : i
// //     ));
// //     setPistoleoOpen(false);
// //   };
// //   const guardarSeriales = () => guardarSerialesConLista(serialesCap);

// //   // ─────────────────────────────────────────────────────────────────────
// //   // VALIDACIONES Y PAYLOAD
// //   // ─────────────────────────────────────────────────────────────────────

// //   const validationErrors: string[] = [
// //     ...ctxMissing.map(f => `Requerido: ${f}`),
// //     ...(lineItems.length === 0 ? ["Agrega al menos un ítem"] : []),
// //     ...lineItems.filter(i => i.quantity === 0).map(i => `${i.itemCode}: cantidad 0`),
// //     ...lineItems.filter(i => i.productType === "EQUIPMENT" && (i.serials?.length ?? 0) === 0)
// //       .map(i => `${i.itemCode}: sin seriales`),
// //     ...(tipoFlujo !== "ENTRADA"
// //       ? lineItems.filter(i => i.productType !== "EQUIPMENT" && i.quantity > i.quantityAvailable)
// //           .map(i => `${i.itemCode}: supera stock (${i.quantityAvailable})`)
// //       : []),
// //   ];
// //   const canSubmit = !subtipo || validationErrors.length === 0;

// //   const buildPayload = () => {
// //     const guiaRemision =
// //       ctxValues.guiaIngreso  ??
// //       ctxValues.guiaDespacho ??
// //       ctxValues.guia         ?? null;

// //     const movementDate =
// //       ctxValues.fechaRecepcion  ??
// //       ctxValues.fechaMovimiento ?? null;

// //     const baseHeader = {
// //       tenantId:         TENANT_ID,
// //       hubId:            selectedHubId,
// //       subHubId:         selectedSubHubId || null,
// //       projectId:        PROJECT_ID,
// //       createdBy:        USER_ID,
// //       movementType:     subtipo?.movementType ?? "ENTRY",
// //       subtype:          subtipo?.value,
// //       guiaRemision,
// //       ordenCompra:      ctxValues.ordenCompra      ?? null,
// //       movementDate:     movementDate ?? dayjs().format("YYYY-MM-DD"),
// //       receptionDate:    dayjs().format("YYYY-MM-DD"),
// //       // IDs resueltos desde selects dinámicos
// //       almacenOrigenId:   ctxValues.almacenOrigenId   ? Number(ctxValues.almacenOrigenId)   : null,
// //       subAlmacenOrigenId: ctxValues.subAlmOrigenId   ? Number(ctxValues.subAlmOrigenId)    : null,
// //       almacenDestinoId:  ctxValues.almacenDestinoId  ? Number(ctxValues.almacenDestinoId)  : null,
// //       subAlmacenDestinoId: ctxValues.subAlmDestinoId ? Number(ctxValues.subAlmDestinoId)   : null,
// //       proveedorId:       ctxValues.proveedorId        ? Number(ctxValues.proveedorId)        : null,
// //       clienteId:         ctxValues.clienteId ?? ctxValues.clienteDestinoId
// //                            ? Number(ctxValues.clienteId ?? ctxValues.clienteDestinoId)
// //                            : null,
// //       documentType:     "DNI",
// //       documentNumber:   "48446398",
// //       notes:            notes || `${subtipo?.label}`,
// //     };

// //     return baseHeader;
// //   };

// //   const handleSubmit = async () => {
// //     if (!canSubmit || !subtipo) return;
// //     setSubmitting(true);
// //     try {
// //       const payload = buildPayload();
// //       const res = await fetch(`${API_URL}/api/movements-headers`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });
// //       if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.message ?? `HTTP ${res.status}`); }
// //       setShowSuccess(true);
// //       setReloadTrigger(t => t + 1);
// //       topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
// //     } catch (err: any) {
// //       toast.error(`Error: ${err.message}`);
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   const resetAll = () => {
// //     setTipoFlujo(null); setSubtipo(null); setCtxValues({}); setNotes("");
// //     setLineItems([]); setShowSuccess(false);
// //   };

// //   // ─────────────────────────────────────────────────────────────────────
// //   // DERIVADOS
// //   // ─────────────────────────────────────────────────────────────────────

// //   const accentColor    = tipoFlujo ? FLUJO_CFG[tipoFlujo].color : "#1e293b";
// //   const isEntrada      = tipoFlujo === "ENTRADA";
// //   const totalMovements = lineItems.reduce((s, i) => s + (i.productType === "EQUIPMENT" ? (i.serials?.length ?? 0) : i.quantity), 0);
// //   const totalValue     = lineItems.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
// //   const subtiposActivos = SUBTIPOS.filter(st =>
// //     tipoFlujo === "TRANSFERENCIA" ? st.flujo === "TRANSFERENCIA" : st.flujo === tipoFlujo
// //   );

// //   const step1Done = !!tipoFlujo;
// //   const step2Done = !!subtipo;
// //   const step3Done = subtipo !== null && ctxMissing.length === 0;
// //   const step4Done = lineItems.length > 0;

// //   // ─────────────────────────────────────────────────────────────────────
// //   // RENDER
// //   // ─────────────────────────────────────────────────────────────────────

// //   return (
// //     <Box ref={topRef} sx={{ width:"100%",mx: "auto", py: { xs: 2, md: 3 }, display: "flex", flexDirection: "column", gap: 2.5 }}>

// //       {/* ══ SELECTOR DE HUB / SUB HUB ════════════════════════════════════ */}
// //       <Card elevation={0} sx={{
// //         borderRadius: 3, border: "1px solid #e2e8f0",
// //         background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
// //         overflow: "hidden",
// //       }}>
// //         <Box sx={{ px: 3, py: 2.5, display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap", justifyContent:"space-between" }}>
// //           <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}>
// //             <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
// //               <HubOutlined sx={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }} />
// //             </Box>
// //             <Box>
// //               <Typography variant="subtitle2" fontWeight={800} sx={{ color: "white", lineHeight: 1, fontSize: "0.85rem" }}>
// //                 Contexto del Almacén
// //               </Typography>
// //               <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem" }}>
// //                 Hub y Sub Hub activos para el inventario
// //               </Typography>
// //             </Box>
// //           </Box>

// //           {loadingCatalogs ? (
// //             <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
// //               <CircularProgress size={16} sx={{ color: "rgba(255,255,255,0.5)" }} />
// //               <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>Cargando catálogos...</Typography>
// //             </Box>
// //           ) : (
// //             <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
// //               {/* Select Hub */}
// //               <Box sx={{ minWidth: 220, flex: "1 1 220px", maxWidth:220 }}>
// //                 <SelectBase
// //                   label="Hub"
// //                   value={selectedHubId ? String(selectedHubId) : ""}
// //                   onChange={v => setSelectedHubId(Number(v))}
// //                   options={hubOptions}
// //                   fullWidth
// //                   color="black"
// //                   borderColor="rgba(255,255,255,0.2)"
// //                 />
// //               </Box>

// //               {/* Select Sub Hub */}
// //               <Box sx={{ minWidth: 220, flex: "1 1 220px", maxWidth:220 }}>
// //                 <SelectBase
// //                   label="Sub Hub / Sub Almacén"
// //                   value={selectedSubHubId ? String(selectedSubHubId) : ""}
// //                   onChange={v => setSelectedSubHubId(Number(v))}
// //                   options={subHubOptions}
// //                   fullWidth
// //                   disabled={subHubOptions.length === 0}
// //                   placeholder={subHubOptions.length === 0 ? "Sin sub hubs" : undefined}
// //                   color="black"
// //                   borderColor="rgba(255,255,255,0.2)"
// //                 />
// //               </Box>

// //               {/* Badge informativo */}
// //               {selectedHubId > 0 && (
// //                 <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 1.5, py: 0.8, borderRadius: 1.5, bgcolor: "rgba(5,150,105,0.15)", border: "1px solid rgba(5,150,105,0.3)", flexShrink: 0 }}>
// //                   <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#4ade80" }} />
// //                   <Typography variant="caption" fontWeight={700} sx={{ color: "#4ade80", fontSize: "0.68rem" }}>
// //                     {hubs.find(h => h.id === selectedHubId)?.name ?? "—"}
// //                     {selectedSubHubId ? ` › ${subHubsActivos.find(s => s.id === selectedSubHubId)?.name}` : ""}
// //                   </Typography>
// //                 </Box>
// //               )}
// //             </Box>
// //           )}
// //         </Box>
// //       </Card>

// //       {/* ══ SUCCESS ═══════════════════════════════════════════════════════ */}
// //       <Fade in={showSuccess} timeout={600} unmountOnExit>
// //         <Card elevation={0} sx={{
// //           borderRadius: 3, border: "1px solid #d1fae5",
// //           bgcolor: "#f0fdf4", p: { xs: 4, md: 6 },
// //           textAlign: "center", position: "relative", overflow: "hidden",
// //         }}>
// //           <Box sx={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", bgcolor: "rgba(5,150,105,0.06)" }} />
// //           <Box sx={{ width: 80, height: 80, borderRadius: "50%", bgcolor: "#059669", mx: "auto", mb: 3, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 12px rgba(5,150,105,0.12), 0 0 0 24px rgba(5,150,105,0.06)" }}>
// //             <DoneAllOutlined sx={{ fontSize: 40, color: "white" }} />
// //           </Box>
// //           <Typography variant="h5" fontWeight={800} sx={{ color: "#065f46", mb: 0.5 }}>Movimiento Registrado Exitosamente</Typography>
// //           <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 440, mx: "auto" }}>
// //             Se registraron <strong>{totalMovements}</strong> movimientos tipo <strong>{subtipo?.label}</strong>.
// //           </Typography>
// //           <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center", flexWrap: "wrap", mb: 4 }}>
// //             {[
// //               { label: "Tipo",        value: tipoFlujo ?? "—",      color: accentColor },
// //               { label: "Subtipo",     value: subtipo?.label ?? "—", color: "#475569"   },
// //               { label: "Movimientos", value: `${totalMovements}`,   color: "#059669"   },
// //               { label: "Ítems",       value: `${lineItems.length}`, color: "#1e40af"   },
// //             ].map(c => (
// //               <Paper key={c.label} elevation={0} sx={{ px: 2.5, py: 1.8, borderRadius: 2.5, border: "1px solid #d1fae5", bgcolor: "white", minWidth: 100, textAlign: "center" }}>
// //                 <Typography variant="h6" fontWeight={800} sx={{ color: c.color, lineHeight: 1 }}>{c.value}</Typography>
// //                 <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ fontSize: "0.68rem" }}>{c.label}</Typography>
// //               </Paper>
// //             ))}
// //           </Box>
// //           <ButtonBase label="Nuevo Movimiento" startIcon={<SwapHorizOutlined />} onClick={resetAll} sx={{ px: 3.5, py: 1.2, fontWeight: 700, borderRadius: 2 }} />
// //         </Card>
// //       </Fade>

// //       <Fade in={!showSuccess} timeout={400} unmountOnExit>
// //         <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" , width:"100%"}}>

// //           {/* ── Columna principal ─────────────────────────────────────── */}
// //           <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>

// //             {/* Step progress */}
// //             <Card elevation={0} sx={{ borderRadius: 2.5, border: "1px solid #e2e8f0", p: "14px 20px" }}>
// //               <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 }, justifyContent: "space-between" }}>
// //                 <StepDot number={1} label="Tipo de Flujo"  active={!step1Done}                  done={step1Done} />
// //                 <Box sx={{ flex: 1, height: 1, bgcolor: step1Done ? "#059669" : "#e2e8f0", transition: "background 0.4s", mx: 0.5 }} />
// //                 <StepDot number={2} label="Subtipo"        active={step1Done && !step2Done}      done={step2Done} />
// //                 <Box sx={{ flex: 1, height: 1, bgcolor: step2Done ? "#059669" : "#e2e8f0", transition: "background 0.4s", mx: 0.5 }} />
// //                 <StepDot number={3} label="Datos Doc."     active={step2Done && !step3Done}      done={step3Done} />
// //                 <Box sx={{ flex: 1, height: 1, bgcolor: step3Done ? "#059669" : "#e2e8f0", transition: "background 0.4s", mx: 0.5 }} />
// //                 <StepDot number={4} label="Productos"      active={step3Done && !step4Done}      done={step4Done} />
// //                 <Box sx={{ flex: 1, height: 1, bgcolor: step4Done ? "#059669" : "#e2e8f0", transition: "background 0.4s", mx: 0.5 }} />
// //                 <StepDot number={5} label="Confirmar"      active={step4Done && canSubmit}       done={false} />
// //               </Box>
// //             </Card>

// //             {/* ══ PASO 1: TIPO DE FLUJO ══════════════════════════════════ */}
// //             <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", overflow: "hidden", transition: "box-shadow 0.2s", "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.06)" } }}>
// //               <Box sx={{ flex: 1, p: 3 }}>
// //                 <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
// //                   <Box sx={{ width: 32, height: 32, borderRadius: 2, bgcolor: step1Done ? "#f0fdf4" : "#f8fafc", border: `1px solid ${step1Done ? "#d1fae5" : "#e2e8f0"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
// //                     {step1Done ? <CheckCircle sx={{ fontSize: 16, color: "#059669" }} /> : <Typography variant="caption" fontWeight={800} sx={{ color: "#94a3b8", fontSize: "0.7rem" }}>01</Typography>}
// //                   </Box>
// //                   <Box>
// //                     <Typography variant="subtitle2" fontWeight={800} sx={{ color: "#0f172a", lineHeight: 1 }}>Tipo de Movimiento</Typography>
// //                     <Typography variant="caption" color="text.disabled">Ingreso, egreso o transferencia de stock</Typography>
// //                   </Box>
// //                 </Box>
// //                 <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
// //                   {(["ENTRADA", "SALIDA"] as TipoFlujo[]).map(tipo => {
// //                     const cfg = FLUJO_CFG[tipo];
// //                     const isActive = tipoFlujo === tipo;
// //                     return (
// //                       <Box key={tipo} onClick={() => { setTipoFlujo(tipo); setSubtipo(null); setLineItems([]); }}
// //                         sx={{
// //                           flex: "1 1 160px", p: 2, borderRadius: 2.5, cursor: "pointer", transition: "all 0.2s ease",
// //                           bgcolor: isActive ? "#f8fafc" : "#fafbfc",
// //                           border: `1.5px solid ${isActive ? "#334155" : "#e2e8f0"}`,
// //                           boxShadow: isActive ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
// //                           transform: isActive ? "translateY(-1px)" : "none",
// //                           "&:hover": { border: "1.5px solid #94a3b8", transform: "translateY(-1px)" },
// //                         }}>
// //                         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
// //                           <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: isActive ? "#0f172a" : "#f1f5f9", color: isActive ? "white" : "#64748b", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
// //                             {cfg.icon}
// //                           </Box>
// //                           <Box sx={{ flex: 1 }}>
// //                             <Typography variant="body2" fontWeight={800} sx={{ color: isActive ? "#0f172a" : "#334155", lineHeight: 0.5 }}>{cfg.label}</Typography>
// //                             <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.65rem" }}>{cfg.desc}</Typography>
// //                           </Box>
// //                           {isActive && <CheckCircleRounded sx={{ fontSize: 18, color: cfg.color, ml: "auto" }} />}
// //                         </Box>
// //                       </Box>
// //                     );
// //                   })}
// //                 </Box>
// //               </Box>
// //             </Card>

// //             {/* ══ PASO 2: SUBTIPO ════════════════════════════════════════ */}
// //             <Collapse in={!!tipoFlujo} timeout={350} unmountOnExit>
// //               <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", overflow: "hidden" }}>
// //                 <Box sx={{ flex: 1, p: 3 }}>
// //                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
// //                     <Box sx={{ width: 32, height: 32, borderRadius: 2, bgcolor: step2Done ? "#f0fdf4" : "#f8fafc", border: `1px solid ${step2Done ? "#d1fae5" : "#e2e8f0"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
// //                       {step2Done ? <CheckCircle sx={{ fontSize: 16, color: "#059669" }} /> : <Typography variant="caption" fontWeight={800} sx={{ color: "#94a3b8", fontSize: "0.7rem" }}>02</Typography>}
// //                     </Box>
// //                     <Box>
// //                       <Typography variant="subtitle2" fontWeight={800} sx={{ color: "#0f172a", lineHeight: 1 }}>Subtipo de Movimiento</Typography>
// //                       <Typography variant="caption" color="text.disabled">
// //                         Motivo específico de {tipoFlujo === "ENTRADA" ? "la entrada" : tipoFlujo === "SALIDA" ? "la salida" : "la transferencia"}
// //                       </Typography>
// //                     </Box>
// //                   </Box>
// //                   <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
// //                     {subtiposActivos.map(st => {
// //                       const isActive = subtipo?.value === st.value;
// //                       return (
// //                         <Box key={st.value} onClick={() => setSubtipo(st)}
// //                           sx={{
// //                             flex: "1 1 180px", p: 1.8, borderRadius: 2, cursor: "pointer", transition: "all 0.18s ease",
// //                             bgcolor: isActive ? "#f8fafc" : "#fafbfc",
// //                             border: `1.5px solid ${isActive ? "#334155" : "#e2e8f0"}`,
// //                             boxShadow: isActive ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
// //                             transform: isActive ? "translateY(-1px)" : "none",
// //                             "&:hover": { border: "1.5px solid #94a3b8", transform: "translateY(-1px)" },
// //                           }}>
// //                           <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2 }}>
// //                             <Box sx={{ width: 30, height: 30, borderRadius: 1.5, flexShrink: 0, bgcolor: isActive ? "#0f172a" : "#f1f5f9", color: isActive ? "white" : "#64748b", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
// //                               {st.icon}
// //                             </Box>
// //                             <Box>
// //                               <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
// //                                 <Typography variant="body2" fontWeight={700} sx={{ color: isActive ? "#0f172a" : "#334155", lineHeight: 1.2, fontSize: "0.8rem" }}>{st.label}</Typography>
// //                                 {isActive && <CheckCircleRounded sx={{ fontSize: 13, color: "#059669" }} />}
// //                               </Box>
// //                               <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.3, display: "block", mt: 0.3, fontSize: "0.65rem" }}>{st.description}</Typography>
// //                             </Box>
// //                           </Box>
// //                         </Box>
// //                       );
// //                     })}
// //                   </Box>
// //                 </Box>
// //               </Card>
// //             </Collapse>

// //             {/* ══ PASO 3: DATOS DEL DOCUMENTO ════════════════════════════ */}
// //             <Collapse in={!!subtipo} timeout={350} unmountOnExit>
// //               <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", overflow: "hidden" }}>
// //                 <Box sx={{ flex: 1, p: 3 }}>
// //                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
// //                     <Box sx={{ width: 32, height: 32, borderRadius: 2, bgcolor: step3Done ? "#f0fdf4" : "#f8fafc", border: `1px solid ${step3Done ? "#d1fae5" : "#e2e8f0"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
// //                       {step3Done ? <CheckCircle sx={{ fontSize: 16, color: "#059669" }} /> : <Typography variant="caption" fontWeight={800} sx={{ color: "#94a3b8", fontSize: "0.7rem" }}>03</Typography>}
// //                     </Box>
// //                     <Box sx={{ flex: 1 }}>
// //                       <Typography variant="subtitle2" fontWeight={800} sx={{ color: "#0f172a", lineHeight: 1 }}>Información del Documento</Typography>
// //                       <Typography variant="caption" color="text.disabled">Completa los datos requeridos para {subtipo?.label}</Typography>
// //                     </Box>
// //                     <Chip
// //                       label={step3Done ? "Completo" : `${ctxMissing.length} pendiente${ctxMissing.length !== 1 ? "s" : ""}`}
// //                       size="small"
// //                       sx={{
// //                         fontWeight: 700, fontSize: "0.68rem",
// //                         bgcolor: step3Done ? "#f0fdf4" : "#fffbeb",
// //                         color:   step3Done ? "#059669" : "#92400e",
// //                         border:  `1px solid ${step3Done ? "#d1fae5" : "#fde68a"}`,
// //                       }}
// //                     />
// //                   </Box>

// //                   <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
// //                     {(subtipo?.contextFields ?? []).map(field => {
// //                       const val     = ctxValues[field.key] ?? "";
// //                       const isEmpty = field.required && !val.trim();
// //                       const isDone  = val.trim().length > 0;
// //                       const dynOpts = field.type === "select-dynamic"
// //                         ? getDynamicOptions(field.dynamicKey)
// //                         : [];

// //                       return (
// //                         <Box key={field.key} sx={{ flex: "1 1 200px" }}>
// //                           <Typography variant="caption" fontWeight={700}
// //                             sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.8, color: isEmpty ? "#92400e" : "#475569" }}>
// //                             {field.icon}
// //                             {field.label}
// //                             {field.required && !isDone && (
// //                               <Typography component="span" sx={{ color: "#dc2626", fontSize: "0.75rem" }}>*</Typography>
// //                             )}
// //                             {isDone && <CheckCircleRounded sx={{ fontSize: 12, color: "#059669" }} />}
// //                           </Typography>

// //                           {field.type === "date" ? (
// //                             <TextField type="date" size="small" fullWidth value={val}
// //                               onChange={e => setCtx(field.key, e.target.value)}
// //                               InputLabelProps={{ shrink: true }}
// //                               sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5, fontSize: "0.85rem",
// //                                 ...(isEmpty && { "& fieldset": { borderColor: "#fde68a", borderWidth: 1.5 } }),
// //                                 ...(isDone  && { "& fieldset": { borderColor: "#6ee7b7", borderWidth: 1.5 } }),
// //                               }}}
// //                             />
// //                           ) : field.type === "select-dynamic" ? (
// //                             // ── SELECT DINÁMICO desde API ────────────────
// //                             dynOpts.length === 0 ? (
// //                               <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1, borderRadius: 1.5, border: "1px dashed #e2e8f0", bgcolor: "#f8fafc" }}>
// //                                 <CircularProgress size={12} />
// //                                 <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.72rem" }}>Cargando opciones...</Typography>
// //                               </Box>
// //                             ) : (
// //                               <SelectBase
// //                                 size="small"
// //                                 label={field.placeholder}
// //                                 value={val || ""}
// //                                 onChange={v => setCtx(field.key, String(v))}
// //                                 options={dynOpts}
// //                                 fullWidth
// //                                 placeholder={`-- ${field.label} --`}
// //                               />
// //                             )
// //                           ) : field.type === "select" && field.options ? (
// //                             <SelectBase size="small" label={field.placeholder} value={val}
// //                               onChange={v => setCtx(field.key, String(v))}
// //                               options={field.options} fullWidth
// //                             />
// //                           ) : (
// //                             <TextField size="small" fullWidth placeholder={field.placeholder} value={val}
// //                               onChange={e => setCtx(field.key, e.target.value)}
// //                               helperText={field.helperText}
// //                               FormHelperTextProps={{ sx: { fontSize: "0.65rem", color: "#94a3b8", mt: 0.3 } }}
// //                               sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5, fontSize: "0.85rem",
// //                                 ...(isEmpty && { "& fieldset": { borderColor: "#fde68a", borderWidth: 1.5 } }),
// //                                 ...(isDone  && { "& fieldset": { borderColor: "#6ee7b7", borderWidth: 1.5 } }),
// //                               }}}
// //                             />
// //                           )}
// //                         </Box>
// //                       );
// //                     })}

// //                     <Box sx={{ flex: "2 1 280px" }}>
// //                       <Typography variant="caption" fontWeight={700} color="text.secondary"
// //                         sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.8 }}>
// //                         <ReceiptOutlined sx={{ fontSize: 14 }} />
// //                         Notas adicionales
// //                       </Typography>
// //                       <TextField size="small" fullWidth placeholder="Observaciones del movimiento..."
// //                         value={notes} onChange={e => setNotes(e.target.value)}
// //                         sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5, fontSize: "0.85rem" } }}
// //                       />
// //                     </Box>
// //                   </Box>
// //                 </Box>
// //               </Card>
// //             </Collapse>

// //             {/* ══ PASO 4: INVENTARIO + CARRITO ════════════════════════════ */}
// //             <Collapse in={!!subtipo} timeout={350} unmountOnExit>
// //               <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", overflow: "hidden" }}>
// //                 <Box sx={{ flex: 1 }}>
// //                   <Box sx={{ px: 3, pt: 3, pb: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
// //                     <Box sx={{ width: 32, height: 32, borderRadius: 2, bgcolor: step4Done ? "#f0fdf4" : "#f8fafc", border: `1px solid ${step4Done ? "#d1fae5" : "#e2e8f0"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
// //                       {step4Done ? <CheckCircle sx={{ fontSize: 16, color: "#059669" }} /> : <Typography variant="caption" fontWeight={800} sx={{ color: "#94a3b8", fontSize: "0.7rem" }}>04</Typography>}
// //                     </Box>
// //                     <Box>
// //                       <Typography variant="subtitle2" fontWeight={800} sx={{ color: "#0f172a", lineHeight: 1 }}>Selección de Productos</Typography>
// //                       <Typography variant="caption" color="text.disabled">Busca y agrega ítems del inventario del hub</Typography>
// //                     </Box>
// //                   </Box>

// //                   <Divider sx={{ borderColor: "#f1f5f9" }} />

// //                   <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" } }}>
// //                     {/* ─── Panel Inventario ─────────────────────────────── */}
// //                     <Box sx={{ flex: "0 0 430px", borderRight: { lg: "1px solid #f1f5f9" }, p: 2.5, display: "flex", flexDirection: "column", gap: 1.5 }}>
// //                       <Typography variant="caption" fontWeight={700} sx={{ color: "#64748b", letterSpacing: 1, fontSize: "0.65rem" }}>
// //                         INVENTARIO — {hubs.find(h => h.id === selectedHubId)?.name ?? "Hub"}
// //                         {selectedSubHubId ? ` › ${subHubsActivos.find(s => s.id === selectedSubHubId)?.name}` : ""}
// //                       </Typography>

// //                       <SelectBase label="Tipo de Producto" size="small" value={filterType}
// //                         onChange={v => { setFilterType(String(v)); setInventoryPage(0); }}
// //                         options={[
// //                           { label: "Todos los productos", value: "ALL"       },
// //                           { label: "📦 Materiales",        value: "MATERIAL"  },
// //                           { label: "⚙️ Equipos",            value: "EQUIPMENT" },
// //                           { label: "🔧 Herramientas",       value: "TOOL"      },
// //                           { label: "🦺 EPP",                value: "EPP"       },
// //                         ]}
// //                         fullWidth
// //                       />

// //                       <TextField size="small" placeholder="Buscar código o descripción..."
// //                         value={inventorySearch} onChange={e => setInventorySearch(e.target.value)}
// //                         InputProps={{
// //                           startAdornment: (
// //                             <InputAdornment position="start">
// //                               {loadingInventory ? <CircularProgress size={13} /> : <SearchOutlined sx={{ fontSize: 15, color: "#94a3b8" }} />}
// //                             </InputAdornment>
// //                           ),
// //                           endAdornment: inventorySearch ? (
// //                             <InputAdornment position="end">
// //                               <IconButton size="small" onClick={() => setInventorySearch("")}>
// //                                 <CloseOutlined sx={{ fontSize: 13 }} />
// //                               </IconButton>
// //                             </InputAdornment>
// //                           ) : null,
// //                         }}
// //                         sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5, fontSize: "0.84rem" } }}
// //                       />

// //                       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// //                         <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.67rem" }}>
// //                           {loadingInventory ? "Cargando..." : `${inventoryTotal} ítems · ${inventoryPage + 1}/${Math.max(inventoryPages, 1)}`}
// //                         </Typography>
// //                         <Tooltip title="Recargar inventario">
// //                           <IconButton size="small" onClick={() => setReloadTrigger(t => t + 1)} disabled={loadingInventory}>
// //                             <RefreshOutlined sx={{ fontSize: 14, color: "#94a3b8" }} />
// //                           </IconButton>
// //                         </Tooltip>
// //                       </Box>

// //                       <Box sx={{ flex: 1, overflowY: "auto", maxHeight: 380, display: "flex", flexDirection: "column", gap: 0.5,
// //                         "&::-webkit-scrollbar": { width: 5 }, "&::-webkit-scrollbar-thumb": { bgcolor: "#e2e8f0", borderRadius: 2 } }}>
// //                         {loadingInventory ? (
// //                           <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}><CircularProgress size={28} /></Box>
// //                         ) : inventoryRows.length === 0 ? (
// //                           <Box sx={{ py: 6, textAlign: "center" }}>
// //                             <StorageOutlined sx={{ fontSize: 32, color: "#e2e8f0", mb: 1 }} />
// //                             <Typography variant="caption" color="text.disabled">Sin resultados</Typography>
// //                           </Box>
// //                         ) : inventoryRows.map(inv => {
// //                           const cfg = PRODUCT_CFG[inv.productType];
// //                           const added = lineItems.some(li => li.inventoryId === inv.id);
// //                           const isEquip = inv.productType === "EQUIPMENT";
// //                           const sinStock = inv.quantityAvailable <= 0;
// //                           const needsStock = tipoFlujo !== "ENTRADA";
// //                           const stockLow = inv.quantityAvailable > 0 && inv.quantityAvailable <= inv.minimumStock;

// //                           return (
// //                             <Box key={inv.id} sx={{
// //                               marginInline: 1, px: 1.5, py: 1.2, borderRadius: 1.5,
// //                               border: `1px solid ${added ? cfg.color + "40" : "#f1f5f9"}`,
// //                               bgcolor: added ? cfg.bg : "white",
// //                               opacity: sinStock && needsStock ? 0.45 : 1,
// //                               transition: "all 0.14s",
// //                               display: "flex", alignItems: "center", gap: 1.2,
// //                               "&:hover": { bgcolor: added ? cfg.bg : "#f8fafc", border: `1px solid ${cfg.color}40` },
// //                             }}>
// //                               <Box sx={{ width: 28, height: 28, borderRadius: 1.2, flexShrink: 0, bgcolor: cfg.bg, border: `1px solid ${cfg.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>
// //                                 {cfg.emoji}
// //                               </Box>
// //                               <Box sx={{ flex: 1, minWidth: 0 }}>
// //                                 <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, flexWrap: "wrap" }}>
// //                                   <Typography variant="caption" fontWeight={800} sx={{ color: cfg.color, fontSize: "0.68rem", bgcolor: cfg.bg, px: 0.8, py: 0.2, borderRadius: 0.8, border: `1px solid ${cfg.border}` }}>
// //                                     {inv.itemCode}
// //                                   </Typography>
// //                                   <Typography variant="caption" fontWeight={500} sx={{ color: "#475569", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 160, fontSize: "0.72rem" }}>
// //                                     {inv.description}
// //                                   </Typography>
// //                                 </Box>
// //                                 <Box sx={{ display: "flex", gap: 1, mt: 0.3, alignItems: "center" }}>
// //                                   <Typography variant="caption" sx={{ fontWeight: 700, fontSize: "0.63rem", color: sinStock ? "#94a3b8" : stockLow ? "#b45309" : "#059669" }}>
// //                                     {inv.quantityAvailable} disponible{inv.quantityAvailable !== 1 ? "s" : ""}
// //                                   </Typography>
// //                                   {stockLow && <FiberManualRecordOutlined sx={{ fontSize: 6, color: "#f59e0b" }} />}
// //                                   {inv.locationCode && (
// //                                     <Typography variant="caption" sx={{ color: "#cbd5e1", fontSize: "0.6rem" }}>{inv.locationCode}</Typography>
// //                                   )}
// //                                 </Box>
// //                               </Box>
// //                               <Tooltip title={added ? "Ya en el movimiento" : sinStock && needsStock ? "Sin stock" : isEquip ? "Definir cantidad" : "Agregar"}>
// //                                 <span>
// //                                   <IconButton size="small"
// //                                     onClick={() => isEquip ? openAddEquipo(inv) : addNonEquipmentItem(inv)}
// //                                     disabled={added || (sinStock && needsStock)}
// //                                     sx={{
// //                                       width: 26, height: 26, flexShrink: 0,
// //                                       bgcolor: added ? "#f0fdf4" : "#0f172a", color: added ? "#059669" : "white",
// //                                       borderRadius: 1.2,
// //                                       "&:hover": { bgcolor: added ? "#f0fdf4" : "#1e293b" },
// //                                       "&.Mui-disabled": { bgcolor: "#f1f5f9", color: "#cbd5e1" },
// //                                     }}>
// //                                     {added ? <CheckCircleRounded sx={{ fontSize: 13 }} /> : <AddCircleOutline sx={{ fontSize: 13 }} />}
// //                                   </IconButton>
// //                                 </span>
// //                               </Tooltip>
// //                             </Box>
// //                           );
// //                         })}
// //                       </Box>

// //                       {inventoryPages > 1 && (
// //                         <Box sx={{ display: "flex", gap: 1, justifyContent: "center", pt: 0.5 }}>
// //                           <ButtonBase label="←" size="small" disabled={inventoryPage === 0}
// //                             onClick={() => fetchInventory(inventoryPage - 1)}
// //                             sx={{ minWidth: 32, px: 1, bgcolor: "white", color: "#64748b", border: "1px solid #e2e8f0", fontSize: "0.75rem" }} />
// //                           <Typography variant="caption" sx={{ alignSelf: "center", color: "#94a3b8" }}>{inventoryPage + 1} / {inventoryPages}</Typography>
// //                           <ButtonBase label="→" size="small" disabled={inventoryPage + 1 >= inventoryPages}
// //                             onClick={() => fetchInventory(inventoryPage + 1)}
// //                             sx={{ minWidth: 32, px: 1, bgcolor: "white", color: "#64748b", border: "1px solid #e2e8f0", fontSize: "0.75rem" }} />
// //                         </Box>
// //                       )}
// //                     </Box>

// //                     {/* ─── Carrito ──────────────────────────────────────── */}
// //                     <Box sx={{ flex: 1, p: 2.5 }}>
// //                       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
// //                         <Typography variant="caption" fontWeight={700} sx={{ color: "#64748b", letterSpacing: 1, fontSize: "0.65rem" }}>
// //                           ÍTEMS SELECCIONADOS
// //                           {lineItems.length > 0 && (
// //                             <Box component="span" sx={{ ml: 1, px: 0.8, py: 0.2, borderRadius: 0.8, bgcolor: "#0f172a", color: "white", fontSize: "0.6rem", fontWeight: 800 }}>
// //                               {lineItems.length}
// //                             </Box>
// //                           )}
// //                         </Typography>
// //                         {lineItems.length > 0 && (
// //                           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer", px: 1, py: 0.4, borderRadius: 1, "&:hover": { bgcolor: "#fef2f2" } }}
// //                             onClick={() => setLineItems([])}>
// //                             <DeleteOutline sx={{ fontSize: 13, color: "#94a3b8" }} />
// //                             <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.68rem" }}>Limpiar</Typography>
// //                           </Box>
// //                         )}
// //                       </Box>

// //                       {lineItems.length === 0 ? (
// //                         <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 7, border: "1.5px dashed #e2e8f0", borderRadius: 2.5, bgcolor: "#fafbfc" }}>
// //                           <SwapHorizOutlined sx={{ fontSize: 32, color: "#e2e8f0", mb: 1 }} />
// //                           <Typography variant="body2" sx={{ color: "#94a3b8", fontWeight: 600, fontSize: "0.82rem" }}>Sin ítems seleccionados</Typography>
// //                           <Typography variant="caption" color="text.disabled">Agrega productos desde el inventario</Typography>
// //                         </Box>
// //                       ) : (
// //                         <Box sx={{ display: "flex", flexDirection: "column", gap: 1, maxHeight: 430, overflowY: "auto",
// //                           "&::-webkit-scrollbar": { width: 3 }, "&::-webkit-scrollbar-thumb": { bgcolor: "#e2e8f0", borderRadius: 2 } }}>
// //                           {lineItems.map(item => {
// //                             const cfg = PRODUCT_CFG[item.productType];
// //                             const isEquipo = item.productType === "EQUIPMENT";
// //                             const serialCount = item.serials?.length ?? 0;
// //                             const pendientes = item.quantity - serialCount;
// //                             const hasWarning = isEquipo && serialCount === 0;
// //                             const superaStock = tipoFlujo !== "ENTRADA" && !isEquipo && item.quantity > item.quantityAvailable;
// //                             const allSerials = isEquipo && serialCount === item.quantity && item.quantity > 0;

// //                             return (
// //                               <Fade in key={item.inventoryId} timeout={250}>
// //                                 <Box sx={{
// //                                   p: 1.8, borderRadius: 2,
// //                                   border: `1.5px solid ${superaStock ? "#fecaca" : hasWarning ? "#fde68a" : allSerials ? "#d1fae5" : "#f1f5f9"}`,
// //                                   bgcolor: superaStock ? "#fff5f5" : hasWarning ? "#fefce8" : allSerials ? "#f0fdf4" : "#fafbfc",
// //                                   transition: "all 0.2s",
// //                                 }}>
// //                                   <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
// //                                     <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: superaStock ? "#dc2626" : hasWarning ? "#f59e0b" : allSerials ? "#059669" : cfg.color, flexShrink: 0 }} />
// //                                     <Typography variant="caption" fontWeight={800} sx={{ color: cfg.color, fontSize: "0.68rem", bgcolor: cfg.bg, px: 0.8, py: 0.15, borderRadius: 0.8, border: `1px solid ${cfg.border}` }}>
// //                                       {item.itemCode}
// //                                     </Typography>
// //                                     <Typography variant="caption" fontWeight={600} sx={{ flex: 1, color: "#334155", fontSize: "0.73rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
// //                                       {item.description}
// //                                     </Typography>
// //                                     <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.62rem", flexShrink: 0 }}>
// //                                       disp: {item.quantityAvailable}
// //                                     </Typography>
// //                                     <IconButton size="small" onClick={() => removeItem(item.inventoryId)}
// //                                       sx={{ color: "#cbd5e1", "&:hover": { color: "#ef4444", bgcolor: "#fef2f2" }, width: 22, height: 22 }}>
// //                                       <CloseOutlined sx={{ fontSize: 13 }} />
// //                                     </IconButton>
// //                                   </Box>

// //                                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap", pl: 1.8 }}>
// //                                     {!isEquipo ? (
// //                                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
// //                                         <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.68rem" }}>Cant.</Typography>
// //                                         <TextField type="number" size="small"
// //                                           value={item._rawQty ?? String(item.quantity)}
// //                                           onChange={e => updateQty(item.inventoryId, e.target.value)}
// //                                           onBlur={e => { const v = parseInt(e.target.value, 10); if (isNaN(v) || v < 1) updateQty(item.inventoryId, "1"); }}
// //                                           inputProps={{ min: 1, style: { textAlign: "center", fontWeight: 700, padding: "3px 5px", width: 44, fontSize: "0.82rem" } }}
// //                                           sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.2, height: 28, ...(superaStock && { "& fieldset": { borderColor: "#dc2626", borderWidth: 2 } }) },
// //                                             "& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button": { display: "none" },
// //                                             "& input[type=number]": { MozAppearance: "textfield" },
// //                                           }}
// //                                         />
// //                                       </Box>
// //                                     ) : (
// //                                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
// //                                         <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.68rem" }}>Esperados:</Typography>
// //                                         <Typography variant="caption" fontWeight={800} sx={{ color: "#1e40af", bgcolor: "#eff6ff", px: 1, py: 0.2, borderRadius: 0.8, fontSize: "0.72rem" }}>
// //                                           {item.quantity}
// //                                         </Typography>
// //                                       </Box>
// //                                     )}

// //                                     <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
// //                                       <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.68rem" }}>S/</Typography>
// //                                       <TextField type="number" size="small"
// //                                         value={item.unitPrice === 0 ? "" : item.unitPrice}
// //                                         onChange={e => updatePrice(item.inventoryId, e.target.value)}
// //                                         placeholder="0.00"
// //                                         inputProps={{ min: 0, step: 0.01, style: { fontWeight: 700, padding: "3px 5px", width: 58, fontSize: "0.82rem" } }}
// //                                         sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.2, height: 28 },
// //                                           "& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button": { display: "none" },
// //                                           "& input[type=number]": { MozAppearance: "textfield" },
// //                                         }}
// //                                       />
// //                                     </Box>

// //                                     {isEquipo && (
// //                                       <Box onClick={() => abrirPistoleo(item)}
// //                                         sx={{
// //                                           display: "flex", alignItems: "center", gap: 0.7, px: 1.2, py: 0.5, borderRadius: 1.2, cursor: "pointer", transition: "all 0.15s",
// //                                           bgcolor: allSerials ? "#f0fdf4" : serialCount > 0 ? "#fffbeb" : "#f8fafc",
// //                                           border: `1px solid ${allSerials ? "#d1fae5" : serialCount > 0 ? "#fde68a" : "#e2e8f0"}`,
// //                                           "&:hover": { bgcolor: "#f0fdf4", border: "1px solid #d1fae5" },
// //                                         }}>
// //                                         <QrCodeScannerOutlined sx={{ fontSize: 14, color: allSerials ? "#059669" : serialCount > 0 ? "#92400e" : "#94a3b8" }} />
// //                                         <Typography variant="caption" fontWeight={700} sx={{ color: allSerials ? "#059669" : serialCount > 0 ? "#92400e" : "#64748b", fontSize: "0.7rem" }}>
// //                                           {allSerials ? `${serialCount} seriales ✓` : serialCount > 0 ? `${serialCount}/${item.quantity} pistol.` : "Pistolear"}
// //                                         </Typography>
// //                                       </Box>
// //                                     )}

// //                                     {isEquipo && !allSerials && serialCount > 0 && pendientes > 0 && (
// //                                       <Typography variant="caption" sx={{ color: "#92400e", fontSize: "0.65rem" }}>
// //                                         {pendientes} pendiente{pendientes > 1 ? "s" : ""}
// //                                       </Typography>
// //                                     )}

// //                                     {!isEquipo && item.unitPrice > 0 && (
// //                                       <Typography variant="caption" sx={{ color: "#64748b", fontFamily: "monospace", fontSize: "0.7rem", ml: "auto" }}>
// //                                         = S/ {(item.quantity * item.unitPrice).toFixed(2)}
// //                                       </Typography>
// //                                     )}
// //                                   </Box>

// //                                   {superaStock && (
// //                                     <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mt: 1, px: 1.2, py: 0.6, bgcolor: "#fef2f2", borderRadius: 1, border: "1px solid #fecaca" }}>
// //                                       <WarningAmberOutlined sx={{ fontSize: 12, color: "#dc2626" }} />
// //                                       <Typography variant="caption" sx={{ color: "#dc2626", fontWeight: 600, fontSize: "0.65rem" }}>Supera stock disponible ({item.quantityAvailable} ud.)</Typography>
// //                                     </Box>
// //                                   )}
// //                                   {hasWarning && (
// //                                     <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mt: 1, px: 1.2, py: 0.6, bgcolor: "#fefce8", borderRadius: 1, border: "1px solid #fde68a" }}>
// //                                       <WarningAmberOutlined sx={{ fontSize: 12, color: "#b45309" }} />
// //                                       <Typography variant="caption" sx={{ color: "#b45309", fontWeight: 600, fontSize: "0.65rem" }}>Registra seriales antes de confirmar</Typography>
// //                                     </Box>
// //                                   )}
// //                                   {isEquipo && serialCount > 0 && (
// //                                     <Box sx={{ mt: 1, pl: 1.8, display: "flex", gap: 0.5, flexWrap: "wrap" }}>
// //                                       {item.serials?.map((s, idx) => (
// //                                         <Typography key={idx} variant="caption" sx={{ color: "#059669", fontFamily: "monospace", bgcolor: "#f0fdf4", px: 0.8, py: 0.2, borderRadius: 0.8, border: "1px solid #d1fae5", fontSize: "0.62rem", fontWeight: 600 }}>
// //                                           {s.serialNumber}
// //                                         </Typography>
// //                                       ))}
// //                                     </Box>
// //                                   )}
// //                                 </Box>
// //                               </Fade>
// //                             );
// //                           })}
// //                         </Box>
// //                       )}

// //                       {lineItems.length > 0 && (
// //                         <Box sx={{ mt: 2, pt: 1.5, borderTop: "1px solid #f1f5f9", display: "flex", gap: 1.5, flexWrap: "wrap" }}>
// //                           {(["MATERIAL","TOOL","EQUIPMENT","EPP"] as ProductType[]).filter(t => lineItems.some(i => i.productType === t)).map(t => {
// //                             const cfg = PRODUCT_CFG[t];
// //                             return (
// //                               <Box key={t} sx={{ display: "flex", alignItems: "center", gap: 0.6, px: 1.2, py: 0.6, borderRadius: 1.2, bgcolor: cfg.bg, border: `1px solid ${cfg.border}` }}>
// //                                 <Typography sx={{ fontSize: "0.85rem", lineHeight: 1 }}>{cfg.emoji}</Typography>
// //                                 <Typography variant="caption" fontWeight={800} sx={{ color: cfg.color, fontSize: "0.72rem" }}>{lineItems.filter(i => i.productType === t).length}</Typography>
// //                                 <Typography variant="caption" sx={{ color: cfg.color, fontSize: "0.65rem", opacity: 0.8 }}>{cfg.label}</Typography>
// //                               </Box>
// //                             );
// //                           })}
// //                           {totalValue > 0 && (
// //                             <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, px: 1.2, py: 0.6, borderRadius: 1.2, bgcolor: "#f8fafc", border: "1px solid #e2e8f0", ml: "auto" }}>
// //                               <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.65rem" }}>Total estimado:</Typography>
// //                               <Typography variant="caption" fontWeight={800} sx={{ color: "#1e293b", fontFamily: "monospace", fontSize: "0.78rem" }}>S/ {totalValue.toFixed(2)}</Typography>
// //                             </Box>
// //                           )}
// //                         </Box>
// //                       )}
// //                     </Box>
// //                   </Box>
// //                 </Box>
// //               </Card>
// //             </Collapse>

// //             {/* ══ PASO 5: CONFIRMAR ═══════════════════════════════════════ */}
// //             <Collapse in={lineItems.length > 0} timeout={350} unmountOnExit>
// //               <Card elevation={0} sx={{
// //                 borderRadius: 3, overflow: "hidden",
// //                 border: `1.5px solid ${canSubmit ? accentColor + "40" : "#e2e8f0"}`,
// //                 transition: "all 0.3s",
// //                 boxShadow: canSubmit ? `0 4px 24px ${accentColor}14` : "none",
// //               }}>
// //                 <Box sx={{ px: 3, py: 2.5, bgcolor: "#0f172a", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
// //                   <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
// //                     <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: accentColor + "30", border: `1px solid ${accentColor}50`, display: "flex", alignItems: "center", justifyContent: "center", color: accentColor }}>
// //                       {tipoFlujo === "ENTRADA" ? <TrendingUpOutlined sx={{ fontSize: 20 }} /> : tipoFlujo === "SALIDA" ? <TrendingDownOutlined sx={{ fontSize: 20 }} /> : <SwapVertOutlined sx={{ fontSize: 20 }} />}
// //                     </Box>
// //                     <Box>
// //                       <Typography variant="subtitle2" fontWeight={800} sx={{ color: "white", lineHeight: 1 }}>Confirmar Movimiento</Typography>
// //                       <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.68rem" }}>
// //                         {tipoFlujo} · {subtipo?.label}
// //                         {ctxValues.guiaIngreso  && ` · ${ctxValues.guiaIngreso}`}
// //                         {ctxValues.guiaDespacho && ` · ${ctxValues.guiaDespacho}`}
// //                         {ctxValues.guia         && ` · ${ctxValues.guia}`}
// //                       </Typography>
// //                     </Box>
// //                   </Box>
// //                   <Box sx={{ px: 1.5, py: 0.6, borderRadius: 1.2, bgcolor: accentColor + "20", border: `1px solid ${accentColor}40` }}>
// //                     <Typography variant="caption" fontWeight={800} sx={{ color: accentColor, fontSize: "0.72rem" }}>
// //                       {totalMovements} movimiento{totalMovements !== 1 ? "s" : ""}
// //                     </Typography>
// //                   </Box>
// //                 </Box>

// //                 <Box sx={{ p: 3 }}>
// //                   <Box sx={{ display: "flex", gap: 1.5, mb: 3, flexWrap: "wrap" }}>
// //                     {[
// //                       { label: "Ítems",          value: lineItems.length, accent: "#1e40af" },
// //                       { label: "Movimientos",    value: totalMovements,   accent: accentColor },
// //                       { label: "Equipos pistol.", value: `${lineItems.filter(i => i.productType === "EQUIPMENT" && (i.serials?.length ?? 0) > 0).length}/${lineItems.filter(i => i.productType === "EQUIPMENT").length}`, accent: "#059669" },
// //                       { label: "Valor est.",     value: totalValue > 0 ? `S/ ${totalValue.toFixed(2)}` : "—", accent: "#475569" },
// //                     ].map(kpi => (
// //                       <Box key={kpi.label} sx={{ flex: "1 1 90px", p: 1.8, borderRadius: 2, border: "1px solid #f1f5f9", bgcolor: "#fafbfc", textAlign: "center" }}>
// //                         <Typography variant="subtitle2" fontWeight={800} sx={{ color: kpi.accent, lineHeight: 1, fontSize: "1rem" }}>{kpi.value}</Typography>
// //                         <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.65rem" }}>{kpi.label}</Typography>
// //                       </Box>
// //                     ))}
// //                   </Box>

// //                   {validationErrors.length > 0 && (
// //                     <Alert severity="warning" icon={<WarningAmberOutlined sx={{ fontSize: 18 }} />}
// //                       sx={{ borderRadius: 2, mb: 2.5, bgcolor: "#fffbeb", border: "1px solid #fde68a", "& .MuiAlert-message": { width: "100%" } }}>
// //                       <Typography variant="caption" fontWeight={700} sx={{ color: "#92400e", display: "block", mb: 0.5 }}>Pendientes antes de confirmar:</Typography>
// //                       {validationErrors.map((e, i) => (
// //                         <Typography key={i} variant="caption" sx={{ color: "#78350f", display: "block", fontSize: "0.7rem", lineHeight: 1.6 }}>• {e}</Typography>
// //                       ))}
// //                     </Alert>
// //                   )}

// //                   <Alert severity={isEntrada ? "success" : tipoFlujo === "TRANSFERENCIA" ? "info" : "error"}
// //                     sx={{ borderRadius: 2, mb: 3, fontSize: "0.8rem" }}>
// //                     Se registrarán <strong>{totalMovements} movimientos</strong> tipo <strong>{subtipo?.movementType}</strong>.{" "}
// //                     {isEntrada ? "El stock se incrementará." : tipoFlujo === "TRANSFERENCIA" ? "Se moverá el stock entre almacenes." : "El stock se descontará."}
// //                     {" "}Esta acción es <strong>irreversible</strong>.
// //                   </Alert>

// //                   <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
// //                     <ButtonBase label="Reiniciar todo" onClick={resetAll}
// //                       sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #e2e8f0", fontSize: "0.8rem" }} />
// //                     <ButtonBase
// //                       label={submitting ? "Registrando..." : `Confirmar ${tipoFlujo}`}
// //                       startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : <SendOutlined sx={{ fontSize: 17 }} />}
// //                       onClick={handleSubmit}
// //                       disabled={!canSubmit || submitting}
// //                       sx={{
// //                         px: 3.5, py: 1.2, fontWeight: 700, borderRadius: 2, fontSize: "0.85rem",
// //                         bgcolor: canSubmit ? accentColor : undefined,
// //                         "&:hover": { bgcolor: canSubmit ? accentColor : undefined, opacity: 0.9 },
// //                         boxShadow: canSubmit ? `0 4px 14px ${accentColor}35` : "none",
// //                         transition: "all 0.2s",
// //                       }}
// //                     />
// //                   </Box>
// //                 </Box>
// //               </Card>
// //             </Collapse>
// //           </Box>

// //           {/* ── Panel informativo lateral ─────────────────────────────── */}
// //           <SummaryPanel
// //             tipoFlujo={tipoFlujo} subtipo={subtipo} ctxValues={ctxValues}
// //             lineItems={lineItems} totalMovements={totalMovements} totalValue={totalValue}
// //             validationErrors={validationErrors} notes={notes}
// //             hubs={hubs} clientes={clientes} supplySources={supplySources}
// //           />
// //         </Box>
// //       </Fade>

// //       {/* ══ DIALOG: CANTIDAD DE EQUIPOS ══════════════════════════════════ */}
// //       <Dialog open={addEquipoOpen} onClose={() => setAddEquipoOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
// //         <DialogTitle sx={{ m: 0, p: 0 }}>
// //           <Box sx={{ bgcolor: "#0f172a", px: 3, py: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// //             <Stack direction="row" spacing={1.5} alignItems="center">
// //               <Box sx={{ bgcolor: "#1e293b", p: 0.8, borderRadius: 1.5, display: "flex", border: "1px solid #334155" }}>
// //                 <ConstructionOutlined sx={{ fontSize: 16, color: "#94a3b8" }} />
// //               </Box>
// //               <Box>
// //                 <Typography variant="subtitle2" fontWeight={700} color="white">Agregar Equipo</Typography>
// //                 <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.68rem" }}>
// //                   {addEquipoItem?.itemCode} — {addEquipoItem?.description}
// //                 </Typography>
// //               </Box>
// //             </Stack>
// //             <IconButton size="small" onClick={() => setAddEquipoOpen(false)} sx={{ color: "rgba(255,255,255,0.3)" }}>
// //               <CloseOutlined fontSize="small" />
// //             </IconButton>
// //           </Box>
// //         </DialogTitle>
// //         <DialogContent sx={{ p: 3 }}>
// //           {addEquipoItem && (
// //             <Alert severity="info" sx={{ borderRadius: 2, mb: 2.5, fontSize: "0.78rem" }}>
// //               Stock disponible: <strong>{addEquipoItem.quantityAvailable}</strong> unidades
// //             </Alert>
// //           )}
// //           <Typography variant="body2" fontWeight={600} sx={{ mb: 1.5, color: "#334155", fontSize: "0.85rem" }}>¿Cuántos equipos ingresar?</Typography>
// //           <TextField fullWidth autoFocus type="number" label="Cantidad de equipos" placeholder="Ej: 5"
// //             value={addEquipoCant} onChange={e => setAddEquipoCant(e.target.value)}
// //             onKeyDown={e => { if (e.key === "Enter") confirmAddEquipo(); }}
// //             inputProps={{ min: 1, style: { fontWeight: 800, fontSize: "1.4rem", textAlign: "center", padding: "12px 0" } }}
// //             sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, "& fieldset": { borderColor: "#334155", borderWidth: 2 } },
// //               "& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button": { display: "none" },
// //               "& input[type=number]": { MozAppearance: "textfield" },
// //             }}
// //           />
// //         </DialogContent>
// //         <DialogActions sx={{ p: 2.5, bgcolor: "#f8fafc", borderTop: "1px solid #f1f5f9", gap: 1 }}>
// //           <ButtonBase label="Cancelar" onClick={() => setAddEquipoOpen(false)}
// //             sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #e2e8f0", fontSize: "0.8rem" }} />
// //           <ButtonBase label={`Agregar ${addEquipoCant || "1"} equipo${parseInt(addEquipoCant) > 1 ? "s" : ""}`}
// //             startIcon={<QrCodeScannerOutlined sx={{ fontSize: 16 }} />} onClick={confirmAddEquipo}
// //             sx={{ px: 2.5, bgcolor: "#0f172a", color: "white", fontSize: "0.82rem", "&:hover": { bgcolor: "#1e293b" } }}
// //           />
// //         </DialogActions>
// //       </Dialog>

// //       {/* ══ DIALOG PISTOLEO ══════════════════════════════════════════════ */}
// //       <Dialog open={pistoleoOpen} onClose={() => setPistoleoOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
// //         <DialogTitle sx={{ m: 0, p: 0 }}>
// //           <Box sx={{ bgcolor: "#0f172a", px: 3, py: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// //             <Stack direction="row" spacing={1.5} alignItems="center">
// //               <Box sx={{ bgcolor: "#059669", p: 0.8, borderRadius: 1.5, display: "flex" }}>
// //                 <QrCodeScannerOutlined sx={{ fontSize: 17, color: "white" }} />
// //               </Box>
// //               <Box>
// //                 <Typography variant="subtitle2" fontWeight={700} color="white">Registro de Seriales</Typography>
// //                 {pistoleoItem && (
// //                   <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.67rem" }}>
// //                     {pistoleoItem.itemCode} · {serialesCap.length}/{pistoleoItem.quantity} capturados
// //                   </Typography>
// //                 )}
// //               </Box>
// //             </Stack>
// //             <IconButton onClick={() => setPistoleoOpen(false)} size="small" sx={{ color: "rgba(255,255,255,0.3)" }}>
// //               <CloseOutlined fontSize="small" />
// //             </IconButton>
// //           </Box>
// //         </DialogTitle>

// //         <DialogContent sx={{ p: 3 }}>
// //           {pistoleoItem && (() => {
// //             const tipo = getEquipoTipo(pistoleoItem.description);
// //             const campos = CAMPOS_EQUIPO[tipo];
// //             const totalReq = pistoleoItem.quantity;
// //             const totalCap = serialesCap.length;
// //             const todoComp = campos.every(c => !!(serialActual as any)[c.field]?.trim());
// //             const pct = Math.min((totalCap / totalReq) * 100, 100);

// //             return (
// //               <>
// //                 <Box sx={{ mb: 3, p: 2.5, bgcolor: "#f8fafc", borderRadius: 2, border: "1px solid #f1f5f9" }}>
// //                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
// //                     <Typography variant="body2" fontWeight={700} sx={{ color: "#334155", fontSize: "0.82rem" }}>Progreso de Captura</Typography>
// //                     <Box sx={{ px: 1.2, py: 0.4, borderRadius: 1, bgcolor: totalCap === totalReq ? "#f0fdf4" : totalCap > 0 ? "#fffbeb" : "#f1f5f9", border: `1px solid ${totalCap === totalReq ? "#d1fae5" : totalCap > 0 ? "#fde68a" : "#e2e8f0"}` }}>
// //                       <Typography variant="caption" fontWeight={800} sx={{ color: totalCap === totalReq ? "#059669" : totalCap > 0 ? "#b45309" : "#94a3b8", fontSize: "0.72rem" }}>
// //                         {totalCap} / {totalReq}
// //                       </Typography>
// //                     </Box>
// //                   </Box>
// //                   <LinearProgress variant="determinate" value={pct}
// //                     sx={{ height: 6, borderRadius: 3, bgcolor: "#e2e8f0",
// //                       "& .MuiLinearProgress-bar": { bgcolor: totalCap === totalReq ? "#059669" : "#f59e0b", borderRadius: 3 } }}
// //                   />
// //                   <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.65rem", display: "block", mt: 1 }}>
// //                     Tipo detectado: <strong>{tipo}</strong> · Campos: {campos.map(c => c.label).join(", ")}
// //                   </Typography>
// //                 </Box>

// //                 <Box sx={{ mb: 2.5, p: 1.8, borderRadius: 2, bgcolor: autoGuardar ? "#f0fdf4" : "#f8fafc", border: `1px solid ${autoGuardar ? "#d1fae5" : "#f1f5f9"}`, transition: "all 0.25s" }}>
// //                   <FormControlLabel
// //                     control={<Switch checked={autoGuardar} onChange={e => setAutoGuardar(e.target.checked)} color="success" size="small" />}
// //                     label={
// //                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
// //                         <AutoAwesomeOutlined sx={{ fontSize: 13, color: autoGuardar ? "#059669" : "#94a3b8" }} />
// //                         <Typography variant="body2" fontWeight={700} sx={{ color: autoGuardar ? "#065f46" : "#94a3b8", fontSize: "0.8rem" }}>
// //                           Guardar automáticamente al completar
// //                         </Typography>
// //                       </Box>
// //                     }
// //                     sx={{ m: 0 }}
// //                   />
// //                 </Box>

// //                 <Stack spacing={1.8} sx={{ mb: 3 }}>
// //                   {campos.map(campo => {
// //                     const valor = (serialActual as any)[campo.field] ?? "";
// //                     const error = camposError[campo.field] ?? "";
// //                     const regla = VALIDACIONES[campo.field];
// //                     const esValido = regla ? regla.regex.test(valor.trim()) && valor.trim() !== "" : valor.trim() !== "";
// //                     const tieneErr = !!error && valor.trim() !== "";

// //                     return (
// //                       <Box key={campo.field}>
// //                         <Typography variant="caption" fontWeight={700} sx={{ color: "#475569", display: "flex", alignItems: "center", gap: 0.5, mb: 0.7, fontSize: "0.75rem" }}>
// //                           {campo.label} *
// //                           {esValido && <CheckCircleRounded sx={{ fontSize: 12, color: "#059669" }} />}
// //                         </Typography>
// //                         <TextField fullWidth size="small" placeholder={campo.placeholder} value={valor}
// //                           onChange={e => handleCampoChange(campo.field, e.target.value, tipo, totalReq)}
// //                           disabled={totalCap >= totalReq} error={tieneErr}
// //                           helperText={tieneErr ? error : esValido ? "✓ Válido" : regla ? `Ej: ${campo.placeholder}` : undefined}
// //                           FormHelperTextProps={{ sx: { color: tieneErr ? "error.main" : esValido ? "#059669" : "#94a3b8", fontSize: "0.65rem" } }}
// //                           sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5, fontSize: "0.85rem",
// //                             ...(esValido && { "& fieldset": { borderColor: "#6ee7b7", borderWidth: 1.5 } }),
// //                             ...(tieneErr && { "& fieldset": { borderColor: "#fca5a5", borderWidth: 1.5 } }),
// //                           }}}
// //                           InputProps={campo.field === "serialNumber" ? {
// //                             startAdornment: <InputAdornment position="start">
// //                               <QrCodeScannerOutlined sx={{ fontSize: 15, color: esValido ? "#059669" : "#94a3b8" }} />
// //                             </InputAdornment>,
// //                           } : undefined}
// //                         />
// //                       </Box>
// //                     );
// //                   })}
// //                 </Stack>

// //                 {!autoGuardar && (
// //                   <ButtonBase fullWidth
// //                     label={totalCap >= totalReq ? "✓ Captura completa" : `Agregar Serial ${totalCap + 1} de ${totalReq}`}
// //                     startIcon={<AddCircleOutline />}
// //                     onClick={agregarSerialManual}
// //                     disabled={!serialActual.serialNumber?.trim() || totalCap >= totalReq}
// //                     sx={{ mb: 2.5, bgcolor: "#0f172a", color: "white", "&:hover": { bgcolor: "#1e293b" } }}
// //                   />
// //                 )}

// //                 {autoGuardar && totalCap < totalReq && (
// //                   <Box sx={{ mb: 2.5, p: 1.5, borderRadius: 2, textAlign: "center", bgcolor: todoComp ? "#f0fdf4" : "#f8fafc", border: `1px solid ${todoComp ? "#d1fae5" : "#f1f5f9"}`, transition: "all 0.25s" }}>
// //                     <Typography variant="caption" fontWeight={600} sx={{ color: todoComp ? "#059669" : "#94a3b8", fontSize: "0.72rem" }}>
// //                       {todoComp ? "⚡ Guardando automáticamente..." : `Completa los campos para guardar serial ${totalCap + 1} de ${totalReq}`}
// //                     </Typography>
// //                   </Box>
// //                 )}

// //                 {serialesCap.length > 0 && (
// //                   <Box>
// //                     <Typography variant="body2" fontWeight={700} sx={{ mb: 1.2, display: "flex", alignItems: "center", gap: 1, color: "#334155", fontSize: "0.82rem" }}>
// //                       <CheckCircleOutline sx={{ fontSize: 15, color: "#059669" }} />
// //                       Registrados ({serialesCap.length})
// //                     </Typography>
// //                     <Stack spacing={0.6}>
// //                       {serialesCap.map((s, idx) => (
// //                         <Box key={idx} sx={{ px: 2, py: 1.2, bgcolor: "#f8fafc", borderRadius: 1.5, border: "1px solid #f1f5f9", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
// //                           <Stack spacing={0.3}>
// //                             <Typography variant="caption" fontWeight={800} sx={{ color: "#059669", fontSize: "0.65rem" }}>#{idx + 1}</Typography>
// //                             {s.serialNumber && <Typography variant="caption" sx={{ color: "#475569", fontFamily: "monospace", fontSize: "0.72rem" }}>SN: {s.serialNumber}</Typography>}
// //                             {s.mac          && <Typography variant="caption" sx={{ color: "#64748b", fontFamily: "monospace", fontSize: "0.68rem" }}>MAC: {s.mac}</Typography>}
// //                             {s.ua           && <Typography variant="caption" sx={{ color: "#64748b", fontFamily: "monospace", fontSize: "0.68rem" }}>UA: {s.ua}</Typography>}
// //                             {s.mtaMac       && <Typography variant="caption" sx={{ color: "#64748b", fontFamily: "monospace", fontSize: "0.68rem" }}>MTA: {s.mtaMac}</Typography>}
// //                           </Stack>
// //                           <IconButton size="small"
// //                             onClick={() => setSerialésCapturados(prev => prev.filter((_, i) => i !== idx))}
// //                             sx={{ color: "#cbd5e1", "&:hover": { color: "#dc2626", bgcolor: "#fef2f2" }, mt: -0.5 }}>
// //                             <CloseOutlined sx={{ fontSize: 13 }} />
// //                           </IconButton>
// //                         </Box>
// //                       ))}
// //                     </Stack>
// //                   </Box>
// //                 )}
// //               </>
// //             );
// //           })()}
// //         </DialogContent>

// //         <DialogActions sx={{ p: 2.5, bgcolor: "#f8fafc", borderTop: "1px solid #f1f5f9" }}>
// //           <ButtonBase label="Cancelar" onClick={() => setPistoleoOpen(false)}
// //             sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #e2e8f0", fontSize: "0.8rem" }} />
// //           <ButtonBase
// //             label={`Guardar ${serialesCap.length} serial${serialesCap.length !== 1 ? "es" : ""}`}
// //             startIcon={<ArrowForwardOutlined sx={{ fontSize: 16 }} />}
// //             onClick={guardarSeriales}
// //             disabled={serialesCap.length === 0}
// //             sx={{ px: 2.5, bgcolor: "#0f172a", color: "white", fontSize: "0.82rem",
// //               "&:hover": { bgcolor: "#1e293b" }, "&.Mui-disabled": { bgcolor: "#f1f5f9" } }}
// //           />
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // }

// "use client";

// import { useState, useCallback, useRef, useEffect } from "react";
// import {
//   Box, Card, Typography, Chip, Stack, Paper, Alert,
//   TextField, IconButton, Fade, Collapse, CircularProgress,
//   Dialog, DialogTitle, DialogContent, DialogActions,
//   FormControlLabel, Switch, LinearProgress, InputAdornment,
//   Tooltip, Divider, Stepper, Step, StepLabel,
// } from "@mui/material";
// import {
//   // Movimiento
//   CallReceivedRounded, CallMadeRounded, SyncAltRounded,
//   // Steps
//   CheckCircleRounded, RadioButtonUncheckedOutlined,
//   // Acciones formulario
//   QrCodeScannerOutlined, CloseOutlined, DeleteOutlineRounded,
//   AddCircleOutlineRounded, RefreshRounded, SearchRounded,
//   AutoAwesomeRounded, SendRounded, DoneAllRounded,
//   SwapHorizRounded, WarningAmberRounded, ArrowForwardRounded,
//   // Campos
//   ReceiptLongRounded, CalendarMonthRounded, BusinessRounded,
//   PersonRounded, WarehouseRounded, StorageRounded,
//   // Tipos producto
//   Inventory2Rounded, BuildRounded, ConstructionRounded, SecurityRounded,
//   // Misc
//   HistoryRounded, HubRounded, InfoRounded,
//   // Estado pipeline
//   PendingRounded, TaskAltRounded, ErrorOutlineRounded,
// } from "@mui/icons-material";
// import ButtonBase from "@/src/components/base/ButtonBase";
// import SelectBase from "@/src/components/base/SelectBase";
// import { toast } from "react-toastify";
// import { API_URL } from "@/src/lib/config";
// import dayjs from "dayjs";

// // ─────────────────────────────────────────────────────────────────────────────
// // TIPOS
// // ─────────────────────────────────────────────────────────────────────────────

// type TipoFlujo   = "ENTRADA" | "SALIDA" | "TRANSFERENCIA";
// type ProductType = "MATERIAL" | "TOOL" | "EQUIPMENT" | "EPP";
// type EquipoTipo  = "MODEM" | "DECODIFICADOR" | "ROUTER" | "SWITCH" | "OTRO";

// // Mapeo flujo UI → MovementType del backend
// const FLUJO_TO_MOVEMENT_TYPE: Record<TipoFlujo, "ENTRY" | "EXIT" | "TRANSFER"> = {
//   ENTRADA:       "ENTRY",
//   SALIDA:        "EXIT",
//   TRANSFERENCIA: "TRANSFER",
// };

// interface SubHub        { id: number; name: string; status: string }
// interface HubWithSubHubs{ id: number; name: string; subHubs: SubHub[] }
// interface ClienteCatalog{ id: number; razonSocial: string }
// interface SupplySourceCatalog { id: number; name: string; code?: string }

// interface ContextField {
//   key: string; label: string; placeholder: string;
//   required: boolean; type: "text" | "date" | "select" | "select-dynamic";
//   options?: { label: string; value: string }[];
//   dynamicKey?: "hubs" | "subhubs" | "clientes" | "supplySources";
//   icon: React.ReactNode;
//   helperText?: string;
// }

// interface SubtipoMovimiento {
//   value: string; label: string; description: string;
//   icon: React.ReactNode; flujo: TipoFlujo;
//   movementType: "ENTRY" | "EXIT" | "TRANSFER";
//   contextFields: ContextField[];
// }

// interface HubInventoryItem {
//   id: number; itemId: number; itemCode: string; description: string;
//   productType: ProductType; supplySource: string;
//   quantityAvailable: number; minimumStock: number;
//   maximumStock: number | null; locationCode: string | null;
//   averageCost: number | null;
// }

// interface KardexLineItem {
//   inventoryId: number; itemId: number; itemCode: string;
//   description: string; productType: ProductType;
//   supplySource: string; quantityAvailable: number;
//   quantity: number; unitPrice: number; _rawQty?: string;
//   serials?: EquipoSerial[];
// }

// interface EquipoSerial {
//   serialNumber: string; mac?: string; ua?: string; mtaMac?: string;
// }

// // Estado del pipeline de submit
// interface PipelineStep {
//   id: "header" | "kardex" | "inventory";
//   label: string;
//   status: "pending" | "loading" | "done" | "error";
//   detail?: string;
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // PALETA
// // ─────────────────────────────────────────────────────────────────────────────

// const P = {
//   ink:       "#0F1923",
//   inkSoft:   "#1C2B3A",
//   surface:   "#FFFFFF",
//   alt:       "#F7F8FA",
//   border:    "#E8ECF0",
//   muted:     "#5A6478",
//   faint:     "#9CA8B8",
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // CONFIG VISUAL
// // ─────────────────────────────────────────────────────────────────────────────

// interface FlujoCfg {
//   color: string; bg: string; border: string; dot: string;
//   Icon: React.ElementType; label: string; desc: string;
// }
// const FLUJO_CFG: Record<TipoFlujo, FlujoCfg> = {
//   ENTRADA:       { color: "#0A6B3B", bg: "#EDFAF3", border: "#A3E6C5", dot: "#16A34A", Icon: CallReceivedRounded, label: "Entrada",       desc: "Ingreso de stock al hub"       },
//   SALIDA:        { color: "#991B1B", bg: "#FEF2F2", border: "#FBBFBF", dot: "#DC2626", Icon: CallMadeRounded,     label: "Salida",        desc: "Egreso de stock del hub"       },
//   TRANSFERENCIA: { color: "#4C1D95", bg: "#F5F3FF", border: "#C4B5FD", dot: "#7C3AED", Icon: SyncAltRounded,      label: "Transferencia", desc: "Movimiento entre almacenes"   },
// };

// const PRODUCT_CFG: Record<ProductType, {
//   label: string; Icon: React.ElementType; emoji: string;
//   color: string; bg: string; border: string;
// }> = {
//   MATERIAL:  { label: "Material",    Icon: Inventory2Rounded,    emoji: "📦", color: "#78350F", bg: "#FEF3C7", border: "#FDE68A" },
//   TOOL:      { label: "Herramienta", Icon: BuildRounded,         emoji: "🔧", color: "#1E3A8A", bg: "#EFF6FF", border: "#BFDBFE" },
//   EQUIPMENT: { label: "Equipo",      Icon: ConstructionRounded,  emoji: "⚙️", color: "#14532D", bg: "#F0FDF4", border: "#BBF7D0" },
//   EPP:       { label: "EPP",         Icon: SecurityRounded,      emoji: "🦺", color: "#4C1D95", bg: "#FAF5FF", border: "#DDD6FE" },
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // CAMPOS DE FORMULARIO
// // ─────────────────────────────────────────────────────────────────────────────

// const mkF = (
//   key: string, label: string, placeholder: string, icon: React.ReactNode,
//   required = true, type: ContextField["type"] = "text",
//   options?: { label: string; value: string }[],
//   helperText?: string,
//   dynamicKey?: ContextField["dynamicKey"]
// ): ContextField => ({ key, label, placeholder, icon, required, type, options, helperText, dynamicKey });

// const F_GUIA_IN  = mkF("guiaIngreso",     "Guía de remisión ingreso",  "GR-2025-001", <ReceiptLongRounded  sx={{ fontSize: 14 }} />);
// const F_GUIA_OUT = mkF("guiaDespacho",    "Guía de remisión despacho", "GR-2025-001", <ReceiptLongRounded  sx={{ fontSize: 14 }} />);
// const F_GUIA     = mkF("guia",            "Guía de remisión",          "GR-2025-001", <ReceiptLongRounded  sx={{ fontSize: 14 }} />);
// const F_FECHA_R  = mkF("fechaRecepcion",  "Fecha de recepción",        "",            <CalendarMonthRounded sx={{ fontSize: 14 }} />, true, "date");
// const F_FECHA_M  = mkF("fechaMovimiento", "Fecha de movimiento",       "",            <CalendarMonthRounded sx={{ fontSize: 14 }} />, true, "date");
// const F_OC       = mkF("ordenCompra",     "Orden de compra",           "OC-2025-001", <ReceiptLongRounded  sx={{ fontSize: 14 }} />);
// const F_PROV     = mkF("proveedorId",     "Proveedor",                 "",            <BusinessRounded     sx={{ fontSize: 14 }} />, true,  "select-dynamic", undefined, "Fuente de suministro", "supplySources");
// const F_CLI      = mkF("clienteId",       "Cliente",                   "",            <PersonRounded       sx={{ fontSize: 14 }} />, true,  "select-dynamic", undefined, undefined,              "clientes");
// const F_CLI_DST  = mkF("clienteDestinoId","Cliente destino",           "",            <PersonRounded       sx={{ fontSize: 14 }} />, true,  "select-dynamic", undefined, undefined,              "clientes");
// const F_ALM_O    = mkF("almacenOrigenId", "Almacén origen",            "",            <WarehouseRounded    sx={{ fontSize: 14 }} />, true,  "select-dynamic", undefined, undefined,              "hubs");
// const F_SUB_O    = mkF("subAlmOrigenId",  "Sub almacén origen",        "",            <StorageRounded      sx={{ fontSize: 14 }} />, false, "select-dynamic", undefined, undefined,              "subhubs");
// const F_ALM_D    = mkF("almacenDestinoId","Almacén destino",           "",            <WarehouseRounded    sx={{ fontSize: 14 }} />, true,  "select-dynamic", undefined, undefined,              "hubs");
// const F_SUB_D    = mkF("subAlmDestinoId", "Sub almacén destino",       "",            <StorageRounded      sx={{ fontSize: 14 }} />, false, "select-dynamic", undefined, undefined,              "subhubs");

// const SUBTIPOS: SubtipoMovimiento[] = [
//   { value: "COMPRA_LOCAL",           label: "Compra local",                flujo: "ENTRADA",       movementType: "ENTRY",    description: "Ingreso por compra directa a proveedor local",       icon: <Inventory2Rounded   sx={{ fontSize: 18 }} />, contextFields: [F_GUIA_IN, F_FECHA_R, F_OC, F_PROV, F_ALM_D, F_SUB_D] },
//   { value: "CONSIGNACION_RECIBIDA",  label: "Consignación recibida",       flujo: "ENTRADA",       movementType: "ENTRY",    description: "Ingreso por consignación enviada por cliente",        icon: <BusinessRounded     sx={{ fontSize: 18 }} />, contextFields: [F_GUIA_IN, F_FECHA_R, F_OC, F_CLI, F_ALM_D, F_SUB_D] },
//   { value: "DEVOLUCION_CONTRATISTA", label: "Devolución de contratista",   flujo: "ENTRADA",       movementType: "ENTRY",    description: "Material devuelto por contratista al hub",            icon: <ArrowForwardRounded sx={{ fontSize: 18, transform: "rotate(180deg)" }} />, contextFields: [F_GUIA, F_ALM_O, F_SUB_O, F_ALM_D, F_SUB_D] },
//   { value: "TRANSFERENCIA_ALMACENES_E", label: "Transferencia (entrada)",  flujo: "ENTRADA",       movementType: "ENTRY",    description: "Ingreso por traspaso desde otro hub",                icon: <SyncAltRounded      sx={{ fontSize: 18 }} />, contextFields: [F_GUIA, F_FECHA_M, F_ALM_O, F_SUB_O, F_ALM_D, F_SUB_D] },
//   { value: "DESPACHO_REGULAR",       label: "Despacho regular",            flujo: "SALIDA",        movementType: "EXIT",     description: "Salida por despacho a técnico o cuadrilla",           icon: <ArrowForwardRounded sx={{ fontSize: 18 }} />, contextFields: [F_GUIA_OUT, F_FECHA_M, F_ALM_O, F_SUB_O, F_ALM_D, F_SUB_D] },
//   { value: "DEVOLUCION_CLIENTE",     label: "Devolución a cliente",        flujo: "SALIDA",        movementType: "EXIT",     description: "Devolución de material al cliente propietario",       icon: <PersonRounded       sx={{ fontSize: 18 }} />, contextFields: [F_GUIA, F_FECHA_M, F_ALM_O, F_SUB_O, F_CLI_DST] },
//   { value: "TRASPASO_CONTRATISTA",   label: "Traspaso contratista",        flujo: "SALIDA",        movementType: "EXIT",     description: "Traspaso de material a contratista del cliente",      icon: <SwapHorizRounded    sx={{ fontSize: 18 }} />, contextFields: [F_GUIA, F_FECHA_M, F_ALM_O, F_SUB_O, F_CLI_DST] },
//   { value: "TRANSFERENCIA_ALMACENES_S", label: "Transferencia (salida)",   flujo: "SALIDA",        movementType: "EXIT",     description: "Salida por traspaso a otro hub",                      icon: <SyncAltRounded      sx={{ fontSize: 18 }} />, contextFields: [F_GUIA, F_FECHA_M, F_ALM_O, F_SUB_O, F_ALM_D, F_SUB_D] },
//   { value: "TRANSFERENCIA_ALMACENES",label: "Transferencia entre almacenes", flujo: "TRANSFERENCIA", movementType: "TRANSFER", description: "Traspaso simultáneo entre hubs",                   icon: <SyncAltRounded      sx={{ fontSize: 18 }} />, contextFields: [F_GUIA, F_FECHA_M, F_ALM_O, F_SUB_O, F_ALM_D, F_SUB_D] },
// ];

// // ─────────────────────────────────────────────────────────────────────────────
// // PISTOLEO
// // ─────────────────────────────────────────────────────────────────────────────

// type CampoConfig = { field: string; label: string; placeholder: string };
// const CAMPOS_EQUIPO: Record<EquipoTipo, CampoConfig[]> = {
//   MODEM:         [{ field: "serialNumber", label: "Nro. serie",   placeholder: "ZTEATV45501950107" }, { field: "mac", label: "MAC address",  placeholder: "6C:B8:81:F2:B7:D7" }, { field: "ua", label: "UA", placeholder: "12345678" }],
//   DECODIFICADOR: [{ field: "serialNumber", label: "Nro. serie",   placeholder: "ZTEATV45501950107" }, { field: "mac", label: "MAC address",  placeholder: "6C:B8:81:F2:B7:D7" }],
//   ROUTER:        [{ field: "serialNumber", label: "Nro. serie",   placeholder: "ZTEATV45501950107" }, { field: "mac", label: "MAC address",  placeholder: "6C:B8:81:F2:B7:D7" }, { field: "mtaMac", label: "MTA MAC", placeholder: "CC00F1CA6351" }],
//   SWITCH:        [{ field: "serialNumber", label: "Nro. serie",   placeholder: "ZTEATV45501950107" }, { field: "mac", label: "MAC address",  placeholder: "6C:B8:81:F2:B7:D7" }],
//   OTRO:          [{ field: "serialNumber", label: "Nro. serie",   placeholder: "ZTEATV45501950107" }],
// };

// const VALIDACIONES: Record<string, { regex: RegExp; mensaje: string }> = {
//   serialNumber: { regex: /^[A-Z0-9]{8,25}$/,                      mensaje: "Alfanumérico 8–25 chars"     },
//   mac:          { regex: /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/, mensaje: "Ej: 6C:B8:81:F2:B7:D7"      },
//   mtaMac:       { regex: /^[0-9A-Fa-f]{12}$/,                     mensaje: "12 hex sin separadores"      },
//   ua:           { regex: /^.{6,12}$/,                              mensaje: "6–12 caracteres"              },
// };

// const getEquipoTipo = (desc: string): EquipoTipo => {
//   const d = desc.toUpperCase();
//   if (d.includes("MODEM") || d.includes("HFC"))           return "MODEM";
//   if (d.includes("DECODIFICADOR") || d.includes("AMINO")) return "DECODIFICADOR";
//   if (d.includes("ROUTER") || d.includes("WIFI"))         return "ROUTER";
//   if (d.includes("SWITCH"))                               return "SWITCH";
//   return "OTRO";
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // CONSTANTES
// // ─────────────────────────────────────────────────────────────────────────────

// const TENANT_ID  = 1;
// const PROJECT_ID = 1;
// const USER_ID    = 1;
// const PAGE_SIZE  = 15;

// // ─────────────────────────────────────────────────────────────────────────────
// // COMPONENTES AUXILIARES
// // ─────────────────────────────────────────────────────────────────────────────

// function StepBadge({ n, label, active, done }: { n: number; label: string; active: boolean; done: boolean }) {
//   return (
//     <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
//       <Box sx={{
//         width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
//         display: "flex", alignItems: "center", justifyContent: "center",
//         transition: "all 0.25s",
//         bgcolor: done ? "#16A34A" : active ? P.ink : P.border,
//         border: `2px solid ${done ? "#16A34A" : active ? P.ink : "#C9D1DA"}`,
//         boxShadow: active ? `0 0 0 3px rgba(15,25,35,0.1)` : "none",
//       }}>
//         {done
//           ? <CheckCircleRounded sx={{ fontSize: 13, color: "white" }} />
//           : <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: active ? "white" : P.faint }}>{n}</Typography>
//         }
//       </Box>
//       <Typography sx={{ fontSize: "0.7rem", fontWeight: active || done ? 700 : 400, color: done ? "#16A34A" : active ? P.ink : P.faint, display: { xs: "none", sm: "block" } }}>
//         {label}
//       </Typography>
//     </Box>
//   );
// }

// function SectionHeader({ n, label, sub, done }: { n: string; label: string; sub: string; done: boolean }) {
//   return (
//     <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
//       <Box sx={{
//         width: 32, height: 32, borderRadius: "8px", flexShrink: 0,
//         bgcolor: done ? "#EDFAF3" : P.alt,
//         border: `1px solid ${done ? "#A3E6C5" : P.border}`,
//         display: "flex", alignItems: "center", justifyContent: "center",
//       }}>
//         {done
//           ? <CheckCircleRounded sx={{ fontSize: 16, color: "#16A34A" }} />
//           : <Typography sx={{ fontSize: "0.68rem", fontWeight: 800, color: P.faint }}>{n}</Typography>
//         }
//       </Box>
//       <Box>
//         <Typography sx={{ fontSize: "0.85rem", fontWeight: 800, color: P.ink, lineHeight: 1 }}>{label}</Typography>
//         <Typography sx={{ fontSize: "0.68rem", color: P.faint, mt: 0.3 }}>{sub}</Typography>
//       </Box>
//     </Box>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // PIPELINE DIALOG — muestra el progreso del submit en 3 pasos
// // ─────────────────────────────────────────────────────────────────────────────

// function PipelineDialog({ open, steps }: { open: boolean; steps: PipelineStep[] }) {
//   const iconMap: Record<PipelineStep["status"], React.ReactNode> = {
//     pending: <PendingRounded    sx={{ fontSize: 20, color: P.faint }} />,
//     loading: <CircularProgress  size={20} thickness={4} sx={{ color: P.ink }} />,
//     done:    <TaskAltRounded    sx={{ fontSize: 20, color: "#16A34A" }} />,
//     error:   <ErrorOutlineRounded sx={{ fontSize: 20, color: "#DC2626" }} />,
//   };

//   return (
//     <Dialog open={open} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: "14px", overflow: "hidden" } }}>
//       <Box sx={{ bgcolor: P.ink, px: 3, py: 2.5 }}>
//         <Typography sx={{ fontSize: "0.9rem", fontWeight: 800, color: "white", lineHeight: 1 }}>Registrando movimiento</Typography>
//         <Typography sx={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", mt: 0.4 }}>Por favor espera mientras se completan los pasos</Typography>
//       </Box>
//       <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 1.5 }}>
//         {steps.map((step, i) => (
//           <Box key={step.id} sx={{
//             display: "flex", alignItems: "center", gap: 2,
//             p: 1.8, borderRadius: "10px",
//             bgcolor: step.status === "loading" ? P.alt : step.status === "done" ? "#EDFAF3" : step.status === "error" ? "#FEF2F2" : P.surface,
//             border: `1px solid ${step.status === "loading" ? P.border : step.status === "done" ? "#A3E6C5" : step.status === "error" ? "#FBBFBF" : P.border}`,
//             transition: "all 0.3s",
//           }}>
//             <Box sx={{ flexShrink: 0 }}>{iconMap[step.status]}</Box>
//             <Box sx={{ flex: 1, minWidth: 0 }}>
//               <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: step.status === "error" ? "#991B1B" : P.ink }}>
//                 {step.label}
//               </Typography>
//               {step.detail && (
//                 <Typography sx={{ fontSize: "0.65rem", color: step.status === "error" ? "#DC2626" : P.faint, mt: 0.3, wordBreak: "break-word" }}>
//                   {step.detail}
//                 </Typography>
//               )}
//             </Box>
//             <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color: P.faint, flexShrink: 0 }}>
//               {String(i + 1).padStart(2, "0")}
//             </Typography>
//           </Box>
//         ))}
//       </Box>
//     </Dialog>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // COMPONENTE PRINCIPAL
// // ─────────────────────────────────────────────────────────────────────────────

// export default function KardexMovement() {
//   const topRef = useRef<HTMLDivElement>(null);

//   // ── Catálogos ─────────────────────────────────────────────────────────
//   const [hubs,          setHubs]          = useState<HubWithSubHubs[]>([]);
//   const [clientes,      setClientes]      = useState<ClienteCatalog[]>([]);
//   const [supplySources, setSupplySources] = useState<SupplySourceCatalog[]>([]);
//   const [loadingCats,   setLoadingCats]   = useState(true);

//   // ── Hub / SubHub activos ──────────────────────────────────────────────
//   const [selectedHubId,    setSelectedHubId]    = useState<number>(0);
//   const [selectedSubHubId, setSelectedSubHubId] = useState<number>(0);
//   const subHubsActivos = hubs.find(h => h.id === selectedHubId)?.subHubs ?? [];

//   // ── Formulario ────────────────────────────────────────────────────────
//   const [tipoFlujo, setTipoFlujo] = useState<TipoFlujo | null>(null);
//   const [subtipo,   setSubtipo]   = useState<SubtipoMovimiento | null>(null);
//   const [ctxValues, setCtxValues] = useState<Record<string, string>>({});
//   const [notes,     setNotes]     = useState("");

//   // ── Inventario ────────────────────────────────────────────────────────
//   const [filterType,      setFilterType]      = useState("ALL");
//   const [invSearch,       setInvSearch]       = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const [invRows,    setInvRows]    = useState<HubInventoryItem[]>([]);
//   const [invTotal,   setInvTotal]   = useState(0);
//   const [invPage,    setInvPage]    = useState(0);
//   const [invPages,   setInvPages]   = useState(1);
//   const [loadingInv, setLoadingInv] = useState(false);
//   const [reloadTrig, setReloadTrig] = useState(0);

//   const [lineItems, setLineItems] = useState<KardexLineItem[]>([]);

//   // ── Pistoleo ──────────────────────────────────────────────────────────
//   const [addEquipoOpen, setAddEquipoOpen] = useState(false);
//   const [addEquipoItem, setAddEquipoItem] = useState<HubInventoryItem | null>(null);
//   const [addEquipoCant, setAddEquipoCant] = useState("1");

//   const [pistoleoOpen,  setPistoleoOpen]        = useState(false);
//   const [pistoleoItem,  setPistoleoItem]         = useState<KardexLineItem | null>(null);
//   const [serialActual,  setSerialActual]         = useState<Partial<EquipoSerial>>({});
//   const [serialesCap,   setSeriales]             = useState<EquipoSerial[]>([]);
//   const [camposError,   setCamposError]          = useState<Record<string, string>>({});
//   const [autoGuardar,   setAutoGuardar]          = useState(true);

//   // ── Submit / pipeline ─────────────────────────────────────────────────
//   const [pipelineOpen,  setPipelineOpen]  = useState(false);
//   const [pipelineSteps, setPipelineSteps] = useState<PipelineStep[]>([]);
//   const [showSuccess,   setShowSuccess]   = useState(false);
//   const [successData,   setSuccessData]   = useState<{ headerId: number; movCount: number; label: string } | null>(null);

//   // ─────────────────────────────────────────────────────────────────────
//   // CARGA DE CATÁLOGOS
//   // ─────────────────────────────────────────────────────────────────────

//   useEffect(() => {
//     (async () => {
//       setLoadingCats(true);
//       try {
//         const [hubsRes, cliRes, supRes] = await Promise.all([
//           fetch(`${API_URL}/api/catalogs/hubs-with-subhubs`),
//           fetch(`${API_URL}/api/catalogs/clients`),
//           fetch(`${API_URL}/api/catalogs/supply-sources?page=0&size=100`),
//         ]);
//         if (hubsRes.ok) {
//           const d = await hubsRes.json();
//           const data: HubWithSubHubs[] = d.data ?? [];
//           setHubs(data);
//           if (data.length > 0) {
//             setSelectedHubId(data[0].id);
//             if (data[0].subHubs?.length > 0) setSelectedSubHubId(data[0].subHubs[0].id);
//           }
//         }
//         if (cliRes.ok) { const d = await cliRes.json(); setClientes(d.data ?? []); }
//         if (supRes.ok) { const d = await supRes.json(); setSupplySources(d.data?.content ?? d.data ?? []); }
//       } catch (e: any) {
//         toast.error(`Error al cargar catálogos: ${e.message}`);
//       } finally {
//         setLoadingCats(false);
//       }
//     })();
//   }, []);

//   useEffect(() => {
//     const subs = hubs.find(h => h.id === selectedHubId)?.subHubs ?? [];
//     setSelectedSubHubId(subs.length > 0 ? subs[0].id : 0);
//   }, [selectedHubId, hubs]);

//   // ── Opciones dinámicas ────────────────────────────────────────────────
//   const getDynOpts = (key: ContextField["dynamicKey"]) => {
//     if (key === "hubs")          return hubs.map(h => ({ label: h.name,          value: String(h.id) }));
//     if (key === "subhubs")       return subHubsActivos.map(s => ({ label: s.name, value: String(s.id) }));
//     if (key === "clientes")      return clientes.map(c => ({ label: c.razonSocial, value: String(c.id) }));
//     if (key === "supplySources") return supplySources.map(s => ({ label: s.name,  value: String(s.id) }));
//     return [];
//   };

//   // ── Debounce búsqueda inventario ──────────────────────────────────────
//   useEffect(() => {
//     if (searchTimer.current) clearTimeout(searchTimer.current);
//     searchTimer.current = setTimeout(() => { setDebouncedSearch(invSearch); setInvPage(0); }, 380);
//     return () => { if (searchTimer.current) clearTimeout(searchTimer.current); };
//   }, [invSearch]);

//   useEffect(() => { setCtxValues({}); }, [subtipo]);

//   // ── Fetch inventario ──────────────────────────────────────────────────
//   const fetchInventory = useCallback(async (page = 0) => {
//     if (!selectedHubId) return;
//     setLoadingInv(true);
//     try {
//       const params = new URLSearchParams({
//         tenantId: String(TENANT_ID), hubId: String(selectedHubId),
//         projectId: String(PROJECT_ID), page: String(page), size: String(PAGE_SIZE),
//         ...(selectedSubHubId ? { subHubId: String(selectedSubHubId) } : {}),
//         ...(filterType !== "ALL"   ? { productType: filterType }        : {}),
//         ...(debouncedSearch.trim() ? { search: debouncedSearch.trim() } : {}),
//       });
//       const res = await fetch(`${API_URL}/api/hub-inventory?${params}`);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const data = await res.json();
//       const content: HubInventoryItem[] = data.data.content ?? [];
//       setInvRows(content);
//       setInvTotal(data.data.page?.totalElements ?? content.length);
//       setInvPages(data.data.page?.totalPages    ?? 1);
//       setInvPage(page);
//     } catch (e: any) { toast.error(`Error inventario: ${e.message}`); }
//     finally { setLoadingInv(false); }
//   }, [selectedHubId, selectedSubHubId, filterType, debouncedSearch, reloadTrig]);

//   useEffect(() => { fetchInventory(0); }, [fetchInventory]);

//   const setCtx = (k: string, v: string) => setCtxValues(p => ({ ...p, [k]: v }));

//   const ctxMissing = (subtipo?.contextFields ?? [])
//     .filter(f => f.required && !ctxValues[f.key]?.trim()).map(f => f.label);

//   // ── Items / carrito ───────────────────────────────────────────────────
//   const addMaterial = (inv: HubInventoryItem) => {
//     if (lineItems.some(l => l.inventoryId === inv.id)) { toast.info("Ya agregado"); return; }
//     if (tipoFlujo !== "ENTRADA" && inv.quantityAvailable <= 0) { toast.warning("Sin stock"); return; }
//     setLineItems(p => [...p, { inventoryId: inv.id, itemId: inv.itemId, itemCode: inv.itemCode, description: inv.description, productType: inv.productType, supplySource: inv.supplySource, quantityAvailable: inv.quantityAvailable, quantity: 1, unitPrice: inv.averageCost ?? 0, _rawQty: "1", serials: [] }]);
//     toast.success(`${inv.itemCode} agregado`);
//   };

//   const openEquipo = (inv: HubInventoryItem) => {
//     if (lineItems.some(l => l.inventoryId === inv.id)) { toast.info("Ya agregado"); return; }
//     setAddEquipoItem(inv); setAddEquipoCant("1"); setAddEquipoOpen(true);
//   };

//   const confirmEquipo = () => {
//     if (!addEquipoItem) return;
//     const cant = Math.max(1, parseInt(addEquipoCant, 10) || 1);
//     setLineItems(p => [...p, { inventoryId: addEquipoItem.id, itemId: addEquipoItem.itemId, itemCode: addEquipoItem.itemCode, description: addEquipoItem.description, productType: "EQUIPMENT", supplySource: addEquipoItem.supplySource, quantityAvailable: addEquipoItem.quantityAvailable, quantity: cant, unitPrice: addEquipoItem.averageCost ?? 0, _rawQty: String(cant), serials: [] }]);
//     setAddEquipoOpen(false);
//     toast.success(`${addEquipoItem.itemCode} — ${cant} ud. listas`);
//   };

//   const removeItem  = (id: number) => setLineItems(p => p.filter(i => i.inventoryId !== id));
//   const updateQty   = (id: number, raw: string) => { const v = parseInt(raw, 10); setLineItems(p => p.map(i => i.inventoryId === id ? { ...i, quantity: isNaN(v) ? 0 : Math.max(0, v), _rawQty: raw } : i)); };
//   const updatePrice = (id: number, raw: string) => { const v = parseFloat(raw);   setLineItems(p => p.map(i => i.inventoryId === id ? { ...i, unitPrice: isNaN(v) ? 0 : v } : i)); };

//   // ── Pistoleo ──────────────────────────────────────────────────────────
//   const openPistoleo = (item: KardexLineItem) => {
//     setPistoleoItem(item); setSerialActual({}); setCamposError({});
//     setSeriales(item.serials ? [...item.serials] : []);
//     setPistoleoOpen(true);
//   };

//   const validarCampo = (field: string, value: string) => {
//     if (!value.trim()) return "";
//     const r = VALIDACIONES[field];
//     return r && !r.regex.test(value.trim()) ? r.mensaje : "";
//   };

//   const checkAutoSave = useCallback((ns: Partial<EquipoSerial>, tipo: EquipoTipo, totalReq: number, list: EquipoSerial[]) => {
//     if (!autoGuardar) return;
//     const campos = CAMPOS_EQUIPO[tipo];
//     if (!campos.every(c => !!(ns as any)[c.field]?.trim())) return;
//     if (campos.some(c => !!validarCampo(c.field, (ns as any)[c.field] ?? ""))) return;
//     const nueva = [...list, { ...ns } as EquipoSerial];
//     setSeriales(nueva); setSerialActual({}); setCamposError({});
//     if (pistoleoItem && nueva.length >= totalReq) saveSeriales(nueva);
//   }, [autoGuardar, pistoleoItem]);

//   const handleCampoChange = (field: string, value: string, tipo: EquipoTipo, totalReq: number) => {
//     const u = { ...serialActual, [field]: value };
//     setSerialActual(u);
//     setCamposError(p => ({ ...p, [field]: VALIDACIONES[field] && value.trim() ? validarCampo(field, value) : "" }));
//     checkAutoSave(u, tipo, totalReq, serialesCap);
//   };

//   const addSerialManual = () => {
//     if (!pistoleoItem) return;
//     const tipo = getEquipoTipo(pistoleoItem.description);
//     const campos = CAMPOS_EQUIPO[tipo];
//     const errs: Record<string, string> = {};
//     let err = false;
//     campos.forEach(c => {
//       const v = (serialActual as any)[c.field] ?? "";
//       if (!v.trim()) { errs[c.field] = `${c.label} requerido`; err = true; }
//       else { const e = validarCampo(c.field, v); if (e) { errs[c.field] = e; err = true; } }
//     });
//     if (err) { setCamposError(errs); return; }
//     setSeriales(p => [...p, { ...serialActual } as EquipoSerial]);
//     setSerialActual({}); setCamposError({});
//   };

//   const saveSeriales = (lista: EquipoSerial[]) => {
//     if (!pistoleoItem) return;
//     setLineItems(p => p.map(i => i.inventoryId === pistoleoItem.inventoryId ? { ...i, serials: lista, quantity: lista.length, _rawQty: String(lista.length) } : i));
//     setPistoleoOpen(false);
//   };

//   // ── Validaciones ──────────────────────────────────────────────────────
//   const validationErrors: string[] = [
//     ...ctxMissing.map(f => `Requerido: ${f}`),
//     ...(lineItems.length === 0 ? ["Agrega al menos un ítem"] : []),
//     ...lineItems.filter(i => i.quantity === 0).map(i => `${i.itemCode}: cantidad 0`),
//     ...lineItems.filter(i => i.productType === "EQUIPMENT" && (i.serials?.length ?? 0) === 0).map(i => `${i.itemCode}: sin seriales`),
//     ...(tipoFlujo !== "ENTRADA" ? lineItems.filter(i => i.productType !== "EQUIPMENT" && i.quantity > i.quantityAvailable).map(i => `${i.itemCode}: supera stock (${i.quantityAvailable})`) : []),
//   ];
//   const canSubmit = !!subtipo && validationErrors.length === 0;

//   // ─────────────────────────────────────────────────────────────────────
//   // BUILDERS DE PAYLOAD
//   // ─────────────────────────────────────────────────────────────────────

//   /** POST /api/movements-headers */
//   const buildHeaderPayload = () => {
//     const guiaRemision = ctxValues.guiaIngreso ?? ctxValues.guiaDespacho ?? ctxValues.guia ?? null;
//     const movementDate = ctxValues.fechaRecepcion ?? ctxValues.fechaMovimiento ?? dayjs().format("YYYY-MM-DD");
//     return {
//       tenantId:    TENANT_ID,
//       hubId:       selectedHubId,
//       projectId:   PROJECT_ID,
//       createdBy:   USER_ID,
//       movementType: FLUJO_TO_MOVEMENT_TYPE[tipoFlujo!],
//       subtype:     subtipo!.value,
//       guiaRemision,
//       ordenCompra:         ctxValues.ordenCompra         ?? null,
//       movementDate,
//       receptionDate:       movementDate,
//       // Almacenes: el backend espera strings con el nombre (según KardexMovementHeaderRequestDto)
//       almacenOrigen:       hubs.find(h => String(h.id) === ctxValues.almacenOrigenId)?.name  ?? ctxValues.almacenOrigenId  ?? null,
//       subAlmacenOrigen:    subHubsActivos.find(s => String(s.id) === ctxValues.subAlmOrigenId)?.name ?? ctxValues.subAlmOrigenId  ?? null,
//       almacenDestino:      hubs.find(h => String(h.id) === ctxValues.almacenDestinoId)?.name ?? ctxValues.almacenDestinoId ?? null,
//       subAlmacenDestino:   subHubsActivos.find(s => String(s.id) === ctxValues.subAlmDestinoId)?.name ?? ctxValues.subAlmDestinoId ?? null,
//       // Entidades
//       proveedor:           supplySources.find(s => String(s.id) === ctxValues.proveedorId)?.name ?? ctxValues.proveedorId ?? null,
//       cliente:             clientes.find(c => String(c.id) === (ctxValues.clienteId ?? ctxValues.clienteDestinoId))?.razonSocial ?? null,
//       documentType:        null,
//       documentNumber:      null,
//       notes:               notes || subtipo!.label,
//     };
//   };

//   /**
//    * POST /api/hub-inventory/kardex-batch
//    * Requiere el headerId ya creado.
//    * movementType: ENTRY | EXIT | TRANSFER
//    */
//   const buildKardexPayload = (headerId: number) => ({
//     headerId,
//     movements: lineItems.flatMap(item => {
//       const base = {
//         tenantId:    TENANT_ID,
//         hubId:       selectedHubId,
//         projectId:   PROJECT_ID,
//         createdBy:   USER_ID,
//         itemId:      item.itemId,
//         inventoryId: item.inventoryId,
//         productType: item.productType,
//         movementType: FLUJO_TO_MOVEMENT_TYPE[tipoFlujo!],   // ← ENTRY | EXIT | TRANSFER
//         supplySource: item.supplySource,
//         supplySourceEntityId: 1,
//         unitPrice:   item.unitPrice,
//         sourceType:  "LOCAL_MOVEMENT",
//         sourceId:    headerId,
//         notes:       notes || subtipo!.label,
//       };
//       if (item.productType === "EQUIPMENT") {
//         return (item.serials ?? []).map(s => ({
//           ...base,
//           quantity:      1,
//           serialNumber:  s.serialNumber,
//           macAddress:    s.mac    ?? null,
//           mtaMacAddress: s.mtaMac ?? null,
//           unitAddress:   s.ua     ?? null,
//         }));
//       }
//       return [{ ...base, quantity: item.quantity }];
//     }),
//   });

//   /**
//    * POST /api/hub-inventory/inventory-batch
//    * Actualiza hub_inventory y registra equipment_units para equipos.
//    */
//   const buildInventoryPayload = (headerId: number) => ({
//     supplyRequestId: headerId,   // reutilizado como referencia al header
//     deliveredBy:     USER_ID,
//     inventoryLines: lineItems.map(item => ({
//       inventoryId:        item.inventoryId,
//       itemId:             item.itemId,
//       supplyRequestItemId: headerId,
//       productType:        item.productType,
//       quantityDelivered:  item.productType === "EQUIPMENT" ? (item.serials?.length ?? 0) : item.quantity,
//       unitPrice:          item.unitPrice,
//     })),
//     equipmentUnits: lineItems
//       .filter(i => i.productType === "EQUIPMENT")
//       .flatMap(item =>
//         (item.serials ?? []).map(s => ({
//           inventoryId:       item.inventoryId,
//           itemId:            item.itemId,
//           tenantId:          TENANT_ID,
//           hubId:             selectedHubId,
//           serialNumber:      s.serialNumber,
//           macAddress:        s.mac    ?? null,
//           mtaMacAddress:     s.mtaMac ?? null,
//           supplySource:      item.supplySource,
//           supplySourceEntityId: 1,
//           entryDate:         dayjs().format("YYYY-MM-DD"),
//           createdBy:         USER_ID,
//         }))
//       ),
//   });

//   // ─────────────────────────────────────────────────────────────────────
//   // SUBMIT — flujo en 3 pasos con pipeline visual
//   // ─────────────────────────────────────────────────────────────────────

//   const handleSubmit = async () => {
//     if (!canSubmit || !subtipo) return;

//     const steps: PipelineStep[] = [
//       { id: "header",    label: "Registrar cabecera del movimiento", status: "pending" },
//       { id: "kardex",    label: "Registrar entradas en kardex",       status: "pending" },
//       { id: "inventory", label: "Actualizar inventario del hub",      status: "pending" },
//     ];
//     setPipelineSteps([...steps]);
//     setPipelineOpen(true);

//     const updateStep = (id: PipelineStep["id"], patch: Partial<PipelineStep>) => {
//       setPipelineSteps(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s));
//     };

//     // ── PASO 1: Header ────────────────────────────────────────────────
//     updateStep("header", { status: "loading" });
//     let headerId: number;
//     try {
//       const res = await fetch(`${API_URL}/api/movements-headers`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(buildHeaderPayload()),
//       });
//       if (!res.ok) {
//         const e = await res.json().catch(() => ({}));
//         throw new Error(e.message ?? `HTTP ${res.status}`);
//       }
//       // La respuesta puede ser KardexMovementHeaderResponseDto directamente
//       // o envuelto en ApiResponse<KardexMovementHeaderResponseDto>
//       const data = await res.json();
//       headerId = data.id ?? data.data?.id;
//       if (!headerId) throw new Error("El backend no devolvió id del header");
//       updateStep("header", { status: "done", detail: `Header #${headerId} creado` });
//     } catch (e: any) {
//       updateStep("header", { status: "error", detail: e.message });
//       toast.error(`Error al crear header: ${e.message}`);
//       return;
//     }

//     // ── PASO 2: Kardex ────────────────────────────────────────────────
//     updateStep("kardex", { status: "loading" });
//     const totalMov = lineItems.reduce((s, i) => s + (i.productType === "EQUIPMENT" ? (i.serials?.length ?? 0) : i.quantity), 0);
//     try {
//       const res = await fetch(`${API_URL}/api/hub-inventory/kardex-batch`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(buildKardexPayload(headerId)),
//       });
//       if (!res.ok) {
//         const e = await res.json().catch(() => ({}));
//         throw new Error(e.message ?? `HTTP ${res.status}`);
//       }
//       updateStep("kardex", { status: "done", detail: `${totalMov} líneas de kardex registradas` });
//     } catch (e: any) {
//       updateStep("kardex", { status: "error", detail: e.message });
//       toast.error(`Error en kardex-batch: ${e.message}`);
//       return;
//     }

//     // ── PASO 3: Inventario ────────────────────────────────────────────
//     updateStep("inventory", { status: "loading" });
//     try {
//       const res = await fetch(`${API_URL}/api/hub-inventory/inventory-batch`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(buildInventoryPayload(headerId)),
//       });
//       if (!res.ok) {
//         const e = await res.json().catch(() => ({}));
//         throw new Error(e.message ?? `HTTP ${res.status}`);
//       }
//       updateStep("inventory", { status: "done", detail: `${lineItems.length} ítems actualizados en hub_inventory` });
//     } catch (e: any) {
//       updateStep("inventory", { status: "error", detail: e.message });
//       toast.error(`Error en inventory-batch: ${e.message}`);
//       return;
//     }

//     // ── Éxito total ───────────────────────────────────────────────────
//     await new Promise(r => setTimeout(r, 800));   // pequeña pausa para que se vea el done
//     setPipelineOpen(false);
//     setSuccessData({ headerId, movCount: totalMov, label: subtipo.label });
//     setShowSuccess(true);
//     setReloadTrig(t => t + 1);
//     topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   const resetAll = () => {
//     setTipoFlujo(null); setSubtipo(null); setCtxValues({}); setNotes("");
//     setLineItems([]); setShowSuccess(false); setSuccessData(null);
//   };

//   // ── Derivados ─────────────────────────────────────────────────────────
//   const flujoActivo     = tipoFlujo ? FLUJO_CFG[tipoFlujo] : null;
//   const totalMovs       = lineItems.reduce((s, i) => s + (i.productType === "EQUIPMENT" ? (i.serials?.length ?? 0) : i.quantity), 0);
//   const totalValue      = lineItems.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
//   const subtiposActivos = SUBTIPOS.filter(st => tipoFlujo === "TRANSFERENCIA" ? st.flujo === "TRANSFERENCIA" : st.flujo === tipoFlujo);
//   const step1Done = !!tipoFlujo;
//   const step2Done = !!subtipo;
//   const step3Done = !!subtipo && ctxMissing.length === 0;
//   const step4Done = lineItems.length > 0;

//   const inputSx = {
//     "& .MuiOutlinedInput-root": {
//       borderRadius: "8px", fontSize: "0.83rem", bgcolor: P.surface,
//       "& fieldset": { borderColor: P.border },
//       "&:hover fieldset": { borderColor: "#C9D1DA" },
//       "&.Mui-focused fieldset": { borderColor: P.ink, borderWidth: 1.5 },
//     },
//   };

//   // ─────────────────────────────────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────────────────────────────────

//   return (
//     <Box ref={topRef} sx={{ width: "100%", mx: "auto", py: { xs: 2, md: 3 }, display: "flex", flexDirection: "column", gap: 2.5 }}>

//       {/* ══ PIPELINE DIALOG ══════════════════════════════════════════════ */}
//       <PipelineDialog open={pipelineOpen} steps={pipelineSteps} />

//       {/* ══ SELECTOR HUB ═════════════════════════════════════════════════ */}
//       <Box sx={{
//         borderRadius: "12px", overflow: "hidden",
//         background: `linear-gradient(135deg, ${P.ink} 0%, ${P.inkSoft} 100%)`,
//         border: `1px solid rgba(255,255,255,0.06)`,
//       }}>
//         <Box sx={{ px: 3, py: 2.2, display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap", justifyContent: "space-between" }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}>
//             <Box sx={{ width: 34, height: 34, borderRadius: "8px", bgcolor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
//               <HubRounded sx={{ fontSize: 17, color: "rgba(255,255,255,0.65)" }} />
//             </Box>
//             <Box>
//               <Typography sx={{ fontSize: "0.82rem", fontWeight: 800, color: "white", lineHeight: 1 }}>Contexto del almacén</Typography>
//               <Typography sx={{ fontSize: "0.63rem", color: "rgba(255,255,255,0.38)", mt: 0.3 }}>Hub y sub-hub activos</Typography>
//             </Box>
//           </Box>

//           {loadingCats ? (
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <CircularProgress size={14} sx={{ color: "rgba(255,255,255,0.4)" }} />
//               <Typography sx={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.35)" }}>Cargando catálogos...</Typography>
//             </Box>
//           ) : (
//             <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
//               <Box sx={{ minWidth: 210, maxWidth: 240, flex: "1 1 210px" }}>
//                 <SelectBase label="Hub" value={selectedHubId ? String(selectedHubId) : ""}
//                   onChange={v => setSelectedHubId(Number(v))}
//                   options={hubs.map(h => ({ label: h.name, value: String(h.id) }))} fullWidth />
//               </Box>
//               <Box sx={{ minWidth: 210, maxWidth: 240, flex: "1 1 210px" }}>
//                 <SelectBase label="Sub almacén" value={selectedSubHubId ? String(selectedSubHubId) : ""}
//                   onChange={v => setSelectedSubHubId(Number(v))}
//                   options={subHubsActivos.map(s => ({ label: s.name, value: String(s.id) }))}
//                   fullWidth disabled={subHubsActivos.length === 0} />
//               </Box>
//               {selectedHubId > 0 && (
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, px: 1.4, py: 0.6, borderRadius: "8px", bgcolor: "rgba(22,163,74,0.12)", border: "1px solid rgba(22,163,74,0.25)", flexShrink: 0 }}>
//                   <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#4ADE80" }} />
//                   <Typography sx={{ fontSize: "0.66rem", fontWeight: 700, color: "#4ADE80" }}>
//                     {hubs.find(h => h.id === selectedHubId)?.name}
//                     {selectedSubHubId ? ` › ${subHubsActivos.find(s => s.id === selectedSubHubId)?.name}` : ""}
//                   </Typography>
//                 </Box>
//               )}
//             </Box>
//           )}
//         </Box>
//       </Box>

//       {/* ══ SUCCESS ══════════════════════════════════════════════════════ */}
//       <Fade in={showSuccess} timeout={500} unmountOnExit>
//         <Box sx={{ borderRadius: "14px", border: "1px solid #A3E6C5", bgcolor: "#EDFAF3", p: { xs: 4, md: 6 }, textAlign: "center", position: "relative", overflow: "hidden" }}>
//           <Box sx={{ position: "absolute", top: -50, right: -50, width: 180, height: 180, borderRadius: "50%", bgcolor: "rgba(22,163,74,0.05)" }} />
//           <Box sx={{ width: 72, height: 72, borderRadius: "50%", bgcolor: "#16A34A", mx: "auto", mb: 3, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 10px rgba(22,163,74,0.1), 0 0 0 20px rgba(22,163,74,0.05)" }}>
//             <DoneAllRounded sx={{ fontSize: 36, color: "white" }} />
//           </Box>
//           <Typography sx={{ fontSize: "1.3rem", fontWeight: 800, color: "#0A4C2B", mb: 0.5 }}>Movimiento registrado exitosamente</Typography>
//           <Typography sx={{ fontSize: "0.85rem", color: P.muted, mb: 4, maxWidth: 420, mx: "auto" }}>
//             Se procesaron <strong>{successData?.movCount}</strong> movimientos de tipo <strong>{successData?.label}</strong>.{" "}
//             Cabecera <strong>#{successData?.headerId}</strong>.
//           </Typography>
//           <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center", flexWrap: "wrap", mb: 4 }}>
//             {[
//               { label: "Header ID",   value: `#${successData?.headerId}`,  color: P.ink },
//               { label: "Tipo",        value: tipoFlujo ?? "—",             color: flujoActivo?.color ?? P.muted },
//               { label: "Movimientos", value: String(successData?.movCount),color: "#16A34A" },
//               { label: "Ítems",       value: String(lineItems.length),     color: "#1E40AF" },
//             ].map(c => (
//               <Box key={c.label} sx={{ px: 2.5, py: 1.6, borderRadius: "10px", border: "1px solid #A3E6C5", bgcolor: "white", minWidth: 96, textAlign: "center" }}>
//                 <Typography sx={{ fontSize: "1rem", fontWeight: 800, color: c.color, lineHeight: 1 }}>{c.value}</Typography>
//                 <Typography sx={{ fontSize: "0.62rem", color: P.faint, mt: 0.4, fontWeight: 600 }}>{c.label}</Typography>
//               </Box>
//             ))}
//           </Box>
//           <ButtonBase label="Nuevo movimiento" startIcon={<SwapHorizRounded />} onClick={resetAll}
//             sx={{ px: 3, py: 1, fontWeight: 700, borderRadius: "8px" }} />
//         </Box>
//       </Fade>

//       <Fade in={!showSuccess} timeout={350} unmountOnExit>
//         <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start", width: "100%" }}>
//           <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>

//             {/* ── STEPPER ── */}
//             <Box sx={{ borderRadius: "12px", border: `1px solid ${P.border}`, p: "14px 20px", bgcolor: P.surface }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1.5 }, justifyContent: "space-between" }}>
//                 {[
//                   { n: 1, label: "Tipo de flujo",  done: step1Done, active: !step1Done },
//                   { n: 2, label: "Subtipo",         done: step2Done, active: step1Done && !step2Done },
//                   { n: 3, label: "Datos doc.",      done: step3Done, active: step2Done && !step3Done },
//                   { n: 4, label: "Productos",       done: step4Done, active: step3Done && !step4Done },
//                   { n: 5, label: "Confirmar",       done: false,     active: step4Done && canSubmit },
//                 ].map((s, i, arr) => (
//                   <div key={`${i}-${s.label}`}>
//                     <StepBadge key={s.n} n={s.n} label={s.label} done={s.done} active={s.active} />
//                     {i < arr.length - 1 && (
//                       <Box key={`line-${i}`} sx={{ flex: 1, height: "1px", bgcolor: s.done ? "#16A34A" : P.border, transition: "background 0.4s", mx: 0.5 }} />
//                     )}
//                   </div>
//                 ))}
//               </Box>
//             </Box>

//             {/* ══ PASO 1 — TIPO ════════════════════════════════════════ */}
//             <Box sx={{ borderRadius: "12px", border: `1px solid ${P.border}`, bgcolor: P.surface, p: 3 }}>
//               <SectionHeader n="01" label="Tipo de movimiento" sub="Ingreso, egreso o transferencia de stock" done={step1Done} />
//               <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
//                 {(["ENTRADA", "SALIDA"] as TipoFlujo[]).map(tipo => {
//                   const cfg = FLUJO_CFG[tipo];
//                   const IconComp = cfg.Icon;
//                   const active = tipoFlujo === tipo;
//                   return (
//                     <Box key={tipo} onClick={() => { setTipoFlujo(tipo); setSubtipo(null); setLineItems([]); }}
//                       sx={{
//                         flex: "1 1 160px", p: 2, borderRadius: "10px", cursor: "pointer", transition: "all 0.18s",
//                         bgcolor: active ? P.alt : "#FAFBFC",
//                         border: `1.5px solid ${active ? P.ink : P.border}`,
//                         boxShadow: active ? "0 2px 12px rgba(0,0,0,0.07)" : "none",
//                         transform: active ? "translateY(-1px)" : "none",
//                         "&:hover": { border: `1.5px solid #C9D1DA`, transform: "translateY(-1px)" },
//                       }}>
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//                         <Box sx={{ width: 36, height: 36, borderRadius: "8px", bgcolor: active ? P.ink : P.alt, color: active ? "white" : P.muted, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.18s" }}>
//                           <IconComp sx={{ fontSize: 18 }} />
//                         </Box>
//                         <Box sx={{ flex: 1 }}>
//                           <Typography sx={{ fontSize: "0.83rem", fontWeight: 800, color: active ? P.ink : "#334155", lineHeight: 1 }}>{cfg.label}</Typography>
//                           <Typography sx={{ fontSize: "0.63rem", color: P.faint, mt: 0.3 }}>{cfg.desc}</Typography>
//                         </Box>
//                         {active && <CheckCircleRounded sx={{ fontSize: 16, color: cfg.dot }} />}
//                       </Box>
//                     </Box>
//                   );
//                 })}
//               </Box>
//             </Box>

//             {/* ══ PASO 2 — SUBTIPO ═════════════════════════════════════ */}
//             <Collapse in={!!tipoFlujo} timeout={300} unmountOnExit>
//               <Box sx={{ borderRadius: "12px", border: `1px solid ${P.border}`, bgcolor: P.surface, p: 3 }}>
//                 <SectionHeader n="02" label="Subtipo de movimiento" sub={`Motivo de la ${tipoFlujo?.toLowerCase() ?? ""}`} done={step2Done} />
//                 <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//                   {subtiposActivos.map(st => {
//                     const active = subtipo?.value === st.value;
//                     return (
//                       <Box key={st.value} onClick={() => setSubtipo(st)}
//                         sx={{
//                           flex: "1 1 175px", p: 1.8, borderRadius: "10px", cursor: "pointer", transition: "all 0.18s",
//                           bgcolor: active ? P.alt : "#FAFBFC",
//                           border: `1.5px solid ${active ? P.ink : P.border}`,
//                           boxShadow: active ? "0 2px 10px rgba(0,0,0,0.06)" : "none",
//                           transform: active ? "translateY(-1px)" : "none",
//                           "&:hover": { border: `1.5px solid #C9D1DA`, transform: "translateY(-1px)" },
//                         }}>
//                         <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2 }}>
//                           <Box sx={{ width: 30, height: 30, borderRadius: "7px", flexShrink: 0, bgcolor: active ? P.ink : P.alt, color: active ? "white" : P.muted, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.18s" }}>
//                             {st.icon}
//                           </Box>
//                           <Box>
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                               <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: active ? P.ink : "#334155", lineHeight: 1.2 }}>{st.label}</Typography>
//                               {active && <CheckCircleRounded sx={{ fontSize: 12, color: "#16A34A" }} />}
//                             </Box>
//                             <Typography sx={{ fontSize: "0.63rem", color: P.faint, mt: 0.3, lineHeight: 1.4 }}>{st.description}</Typography>
//                           </Box>
//                         </Box>
//                       </Box>
//                     );
//                   })}
//                 </Box>
//               </Box>
//             </Collapse>

//             {/* ══ PASO 3 — DATOS DOC ═══════════════════════════════════ */}
//             <Collapse in={!!subtipo} timeout={300} unmountOnExit>
//               <Box sx={{ borderRadius: "12px", border: `1px solid ${P.border}`, bgcolor: P.surface, p: 3 }}>
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 2.5 }}>
//                   <Box sx={{ flex: 1 }}>
//                     <SectionHeader n="03" label="Información del documento" sub={`Datos requeridos para ${subtipo?.label ?? ""}`} done={step3Done} />
//                   </Box>
//                   <Chip size="small" label={step3Done ? "Completo" : `${ctxMissing.length} pendiente${ctxMissing.length !== 1 ? "s" : ""}`}
//                     sx={{ fontWeight: 700, fontSize: "0.65rem", bgcolor: step3Done ? "#EDFAF3" : "#FFFBEB", color: step3Done ? "#0A6B3B" : "#92400E", border: `1px solid ${step3Done ? "#A3E6C5" : "#FCD34D"}` }} />
//                 </Box>

//                 <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
//                   {(subtipo?.contextFields ?? []).map(field => {
//                     const val     = ctxValues[field.key] ?? "";
//                     const isEmpty = field.required && !val.trim();
//                     const isDone  = val.trim().length > 0;
//                     const dynOpts = field.type === "select-dynamic" ? getDynOpts(field.dynamicKey) : [];

//                     return (
//                       <Box key={field.key} sx={{ flex: "1 1 196px" }}>
//                         <Typography sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.7, fontSize: "0.68rem", fontWeight: 700, color: isEmpty ? "#92400E" : P.muted }}>
//                           {field.icon}{field.label}
//                           {field.required && !isDone && <Typography component="span" sx={{ color: "#DC2626", fontSize: "0.75rem" }}>*</Typography>}
//                           {isDone && <CheckCircleRounded sx={{ fontSize: 11, color: "#16A34A" }} />}
//                         </Typography>
//                         {field.type === "date" ? (
//                           <TextField type="date" size="small" fullWidth value={val} onChange={e => setCtx(field.key, e.target.value)} InputLabelProps={{ shrink: true }}
//                             sx={{ ...inputSx, "& .MuiOutlinedInput-root": { ...inputSx["& .MuiOutlinedInput-root"], ...(isEmpty && { "& fieldset": { borderColor: "#FCD34D", borderWidth: 1.5 } }), ...(isDone && { "& fieldset": { borderColor: "#A3E6C5", borderWidth: 1.5 } }) } }} />
//                         ) : field.type === "select-dynamic" ? (
//                           dynOpts.length === 0 ? (
//                             <Box sx={{ p: 1, borderRadius: "8px", border: `1px dashed ${P.border}`, display: "flex", alignItems: "center", gap: 1 }}>
//                               <CircularProgress size={12} />
//                               <Typography sx={{ fontSize: "0.7rem", color: P.faint }}>Cargando...</Typography>
//                             </Box>
//                           ) : (
//                             <SelectBase size="small" label={field.label} value={val || ""}
//                               onChange={v => setCtx(field.key, String(v))}
//                               options={dynOpts} fullWidth />
//                           )
//                         ) : (
//                           <TextField size="small" fullWidth placeholder={field.placeholder} value={val}
//                             onChange={e => setCtx(field.key, e.target.value)}
//                             helperText={field.helperText}
//                             FormHelperTextProps={{ sx: { fontSize: "0.63rem", color: P.faint } }}
//                             sx={{ ...inputSx, "& .MuiOutlinedInput-root": { ...inputSx["& .MuiOutlinedInput-root"], ...(isEmpty && { "& fieldset": { borderColor: "#FCD34D", borderWidth: 1.5 } }), ...(isDone && { "& fieldset": { borderColor: "#A3E6C5", borderWidth: 1.5 } }) } }} />
//                         )}
//                       </Box>
//                     );
//                   })}

//                   <Box sx={{ flex: "2 1 280px" }}>
//                     <Typography sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.7, fontSize: "0.68rem", fontWeight: 700, color: P.muted }}>
//                       <ReceiptLongRounded sx={{ fontSize: 14 }} />Notas adicionales
//                     </Typography>
//                     <TextField size="small" fullWidth placeholder="Observaciones del movimiento..." value={notes}
//                       onChange={e => setNotes(e.target.value)} sx={inputSx} />
//                   </Box>
//                 </Box>
//               </Box>
//             </Collapse>

//             {/* ══ PASO 4 — INVENTARIO + CARRITO ════════════════════════ */}
//             <Collapse in={!!subtipo} timeout={300} unmountOnExit>
//               <Box sx={{ borderRadius: "12px", border: `1px solid ${P.border}`, bgcolor: P.surface, overflow: "hidden" }}>
//                 <Box sx={{ px: 3, pt: 3, pb: 2 }}>
//                   <SectionHeader n="04" label="Selección de productos" sub="Busca y agrega ítems del inventario" done={step4Done} />
//                 </Box>
//                 <Divider sx={{ borderColor: P.border }} />

//                 <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" } }}>
//                   {/* Inventario */}
//                   <Box sx={{ flex: "0 0 420px", borderRight: { lg: `1px solid ${P.border}` }, p: 2.5, display: "flex", flexDirection: "column", gap: 1.5 }}>
//                     <Typography sx={{ fontSize: "0.63rem", fontWeight: 700, color: P.faint, letterSpacing: "0.08em", textTransform: "uppercase" }}>
//                       Inventario — {hubs.find(h => h.id === selectedHubId)?.name ?? "Hub"}
//                       {selectedSubHubId ? ` › ${subHubsActivos.find(s => s.id === selectedSubHubId)?.name}` : ""}
//                     </Typography>

//                     <SelectBase label="Tipo de producto" size="small" value={filterType}
//                       onChange={v => { setFilterType(String(v)); setInvPage(0); }}
//                       options={[
//                         { label: "Todos", value: "ALL" }, { label: "📦 Materiales", value: "MATERIAL" },
//                         { label: "⚙️ Equipos", value: "EQUIPMENT" }, { label: "🔧 Herramientas", value: "TOOL" }, { label: "🦺 EPP", value: "EPP" },
//                       ]} fullWidth />

//                     <TextField size="small" placeholder="Buscar código o descripción..."
//                       value={invSearch} onChange={e => setInvSearch(e.target.value)}
//                       InputProps={{
//                         startAdornment: <InputAdornment position="start">{loadingInv ? <CircularProgress size={12} /> : <SearchRounded sx={{ fontSize: 14, color: P.faint }} />}</InputAdornment>,
//                         endAdornment: invSearch ? <InputAdornment position="end"><IconButton size="small" onClick={() => setInvSearch("")}><CloseOutlined sx={{ fontSize: 12 }} /></IconButton></InputAdornment> : null,
//                       }}
//                       sx={inputSx} />

//                     <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                       <Typography sx={{ fontSize: "0.65rem", color: P.faint }}>
//                         {loadingInv ? "Cargando..." : `${invTotal} ítems · pág ${invPage + 1}/${Math.max(invPages, 1)}`}
//                       </Typography>
//                       <IconButton size="small" onClick={() => setReloadTrig(t => t + 1)} disabled={loadingInv}
//                         sx={{ width: 26, height: 26, border: `1px solid ${P.border}`, borderRadius: "6px" }}>
//                         <RefreshRounded sx={{ fontSize: 13, color: P.faint }} />
//                       </IconButton>
//                     </Box>

//                     <Box sx={{ flex: 1, overflowY: "auto", maxHeight: 380, display: "flex", flexDirection: "column", gap: 0.5,
//                       "&::-webkit-scrollbar": { width: 4 }, "&::-webkit-scrollbar-thumb": { bgcolor: P.border, borderRadius: 2 } }}>
//                       {loadingInv ? (
//                         <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}><CircularProgress size={26} /></Box>
//                       ) : invRows.length === 0 ? (
//                         <Box sx={{ py: 6, textAlign: "center" }}>
//                           <Inventory2Rounded sx={{ fontSize: 30, color: P.border, mb: 1 }} />
//                           <Typography sx={{ fontSize: "0.72rem", color: P.faint }}>Sin resultados</Typography>
//                         </Box>
//                       ) : invRows.map(inv => {
//                         const cfg = PRODUCT_CFG[inv.productType];
//                         const added = lineItems.some(l => l.inventoryId === inv.id);
//                         const isEquip = inv.productType === "EQUIPMENT";
//                         const sinStock = inv.quantityAvailable <= 0;
//                         const needStock = tipoFlujo !== "ENTRADA";
//                         const stockLow = inv.quantityAvailable > 0 && inv.quantityAvailable <= inv.minimumStock;

//                         return (
//                           <Box key={inv.id} sx={{
//                             mx: 0.5, px: 1.5, py: 1.2, borderRadius: "8px",
//                             border: `1px solid ${added ? cfg.border : P.border}`,
//                             bgcolor: added ? cfg.bg : P.surface,
//                             opacity: sinStock && needStock ? 0.4 : 1,
//                             transition: "all 0.12s",
//                             display: "flex", alignItems: "center", gap: 1.2,
//                             "&:hover": { bgcolor: added ? cfg.bg : P.alt, borderColor: cfg.border },
//                           }}>
//                             <Box sx={{ width: 28, height: 28, borderRadius: "6px", flexShrink: 0, bgcolor: cfg.bg, border: `1px solid ${cfg.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
//                               {cfg.emoji}
//                             </Box>
//                             <Box sx={{ flex: 1, minWidth: 0 }}>
//                               <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//                                 <Typography sx={{ fontSize: "0.65rem", fontWeight: 800, color: cfg.color, bgcolor: cfg.bg, px: 0.8, py: 0.2, borderRadius: "4px", border: `1px solid ${cfg.border}` }}>
//                                   {inv.itemCode}
//                                 </Typography>
//                                 <Typography sx={{ fontSize: "0.7rem", color: P.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 150 }}>
//                                   {inv.description}
//                                 </Typography>
//                               </Box>
//                               <Typography sx={{ fontSize: "0.62rem", fontWeight: 700, color: sinStock ? P.faint : stockLow ? "#B45309" : "#16A34A", mt: 0.3 }}>
//                                 {inv.quantityAvailable} disponible{inv.quantityAvailable !== 1 ? "s" : ""}
//                               </Typography>
//                             </Box>
//                             <Tooltip title={added ? "Ya agregado" : sinStock && needStock ? "Sin stock" : isEquip ? "Definir cantidad" : "Agregar"}>
//                               <span>
//                                 <IconButton size="small"
//                                   onClick={() => isEquip ? openEquipo(inv) : addMaterial(inv)}
//                                   disabled={added || (sinStock && needStock)}
//                                   sx={{
//                                     width: 26, height: 26, flexShrink: 0, borderRadius: "6px",
//                                     bgcolor: added ? "#EDFAF3" : P.ink, color: added ? "#16A34A" : "white",
//                                     "&:hover": { bgcolor: added ? "#EDFAF3" : P.inkSoft },
//                                     "&.Mui-disabled": { bgcolor: P.alt, color: P.faint },
//                                   }}>
//                                   {added ? <CheckCircleRounded sx={{ fontSize: 13 }} /> : <AddCircleOutlineRounded sx={{ fontSize: 13 }} />}
//                                 </IconButton>
//                               </span>
//                             </Tooltip>
//                           </Box>
//                         );
//                       })}
//                     </Box>

//                     {invPages > 1 && (
//                       <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
//                         <ButtonBase label="←" size="small" disabled={invPage === 0} onClick={() => fetchInventory(invPage - 1)}
//                           sx={{ minWidth: 32, px: 1, bgcolor: P.surface, color: P.muted, border: `1px solid ${P.border}` }} />
//                         <Typography sx={{ alignSelf: "center", fontSize: "0.7rem", color: P.faint }}>{invPage + 1} / {invPages}</Typography>
//                         <ButtonBase label="→" size="small" disabled={invPage + 1 >= invPages} onClick={() => fetchInventory(invPage + 1)}
//                           sx={{ minWidth: 32, px: 1, bgcolor: P.surface, color: P.muted, border: `1px solid ${P.border}` }} />
//                       </Box>
//                     )}
//                   </Box>

//                   {/* Carrito */}
//                   <Box sx={{ flex: 1, p: 2.5 }}>
//                     <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
//                       <Typography sx={{ fontSize: "0.63rem", fontWeight: 700, color: P.faint, letterSpacing: "0.08em", textTransform: "uppercase" }}>
//                         Ítems seleccionados
//                         {lineItems.length > 0 && (
//                           <Box component="span" sx={{ ml: 1, px: 0.8, py: 0.15, borderRadius: "4px", bgcolor: P.ink, color: "white", fontSize: "0.58rem", fontWeight: 800 }}>
//                             {lineItems.length}
//                           </Box>
//                         )}
//                       </Typography>
//                       {lineItems.length > 0 && (
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer", px: 1, py: 0.4, borderRadius: "6px", "&:hover": { bgcolor: "#FEF2F2" } }}
//                           onClick={() => setLineItems([])}>
//                           <DeleteOutlineRounded sx={{ fontSize: 13, color: P.faint }} />
//                           <Typography sx={{ fontSize: "0.66rem", color: P.faint }}>Limpiar</Typography>
//                         </Box>
//                       )}
//                     </Box>

//                     {lineItems.length === 0 ? (
//                       <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 7, border: `1.5px dashed ${P.border}`, borderRadius: "10px", bgcolor: P.alt }}>
//                         <SwapHorizRounded sx={{ fontSize: 30, color: P.border, mb: 1 }} />
//                         <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: P.faint }}>Sin ítems seleccionados</Typography>
//                         <Typography sx={{ fontSize: "0.68rem", color: P.faint, mt: 0.3 }}>Agrega productos desde el inventario</Typography>
//                       </Box>
//                     ) : (
//                       <Box sx={{ display: "flex", flexDirection: "column", gap: 1, maxHeight: 430, overflowY: "auto",
//                         "&::-webkit-scrollbar": { width: 3 }, "&::-webkit-scrollbar-thumb": { bgcolor: P.border, borderRadius: 2 } }}>
//                         {lineItems.map(item => {
//                           const cfg = PRODUCT_CFG[item.productType];
//                           const isEquipo = item.productType === "EQUIPMENT";
//                           const serialCount = item.serials?.length ?? 0;
//                           const hasWarn = isEquipo && serialCount === 0;
//                           const superaStock = tipoFlujo !== "ENTRADA" && !isEquipo && item.quantity > item.quantityAvailable;
//                           const allOk = isEquipo ? serialCount === item.quantity && item.quantity > 0 : item.quantity > 0;

//                           return (
//                             <Fade in key={item.inventoryId} timeout={200}>
//                               <Box sx={{
//                                 p: 1.8, borderRadius: "10px", transition: "all 0.18s",
//                                 border: `1.5px solid ${superaStock ? "#FBBFBF" : hasWarn ? "#FCD34D" : allOk ? "#A3E6C5" : P.border}`,
//                                 bgcolor: superaStock ? "#FEF2F2" : hasWarn ? "#FFFBEB" : allOk ? "#EDFAF3" : P.alt,
//                               }}>
//                                 <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
//                                   <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: superaStock ? "#DC2626" : hasWarn ? "#F59E0B" : allOk ? "#16A34A" : cfg.color, flexShrink: 0 }} />
//                                   <Typography sx={{ fontSize: "0.65rem", fontWeight: 800, color: cfg.color, bgcolor: cfg.bg, px: 0.8, py: 0.15, borderRadius: "4px", border: `1px solid ${cfg.border}` }}>
//                                     {item.itemCode}
//                                   </Typography>
//                                   <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, flex: 1, color: "#334155", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                                     {item.description}
//                                   </Typography>
//                                   <Typography sx={{ fontSize: "0.6rem", color: P.faint, flexShrink: 0 }}>disp: {item.quantityAvailable}</Typography>
//                                   <IconButton size="small" onClick={() => removeItem(item.inventoryId)}
//                                     sx={{ width: 20, height: 20, color: P.faint, "&:hover": { color: "#EF4444", bgcolor: "#FEF2F2" } }}>
//                                     <CloseOutlined sx={{ fontSize: 12 }} />
//                                   </IconButton>
//                                 </Box>

//                                 <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap", pl: 1.8 }}>
//                                   {!isEquipo ? (
//                                     <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//                                       <Typography sx={{ fontSize: "0.66rem", color: P.faint }}>Cant.</Typography>
//                                       <TextField type="number" size="small"
//                                         value={item._rawQty ?? String(item.quantity)}
//                                         onChange={e => updateQty(item.inventoryId, e.target.value)}
//                                         onBlur={e => { const v = parseInt(e.target.value, 10); if (isNaN(v) || v < 1) updateQty(item.inventoryId, "1"); }}
//                                         inputProps={{ min: 1, style: { textAlign: "center", fontWeight: 700, padding: "3px 4px", width: 40, fontSize: "0.8rem" } }}
//                                         sx={{
//                                           "& .MuiOutlinedInput-root": { borderRadius: "6px", height: 26, ...(superaStock && { "& fieldset": { borderColor: "#DC2626", borderWidth: 2 } }) },
//                                           "& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button": { display: "none" },
//                                           "& input[type=number]": { MozAppearance: "textfield" },
//                                         }} />
//                                     </Box>
//                                   ) : (
//                                     <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//                                       <Typography sx={{ fontSize: "0.66rem", color: P.faint }}>Esperados:</Typography>
//                                       <Typography sx={{ fontSize: "0.7rem", fontWeight: 800, color: "#1E40AF", bgcolor: "#EFF6FF", px: 0.8, py: 0.15, borderRadius: "4px" }}>{item.quantity}</Typography>
//                                     </Box>
//                                   )}

//                                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                                     <Typography sx={{ fontSize: "0.66rem", color: P.faint }}>S/</Typography>
//                                     <TextField type="number" size="small"
//                                       value={item.unitPrice === 0 ? "" : item.unitPrice}
//                                       onChange={e => updatePrice(item.inventoryId, e.target.value)}
//                                       placeholder="0.00"
//                                       inputProps={{ min: 0, step: 0.01, style: { fontWeight: 700, padding: "3px 4px", width: 54, fontSize: "0.8rem" } }}
//                                       sx={{
//                                         "& .MuiOutlinedInput-root": { borderRadius: "6px", height: 26 },
//                                         "& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button": { display: "none" },
//                                         "& input[type=number]": { MozAppearance: "textfield" },
//                                       }} />
//                                   </Box>

//                                   {isEquipo && (
//                                     <Box onClick={() => openPistoleo(item)}
//                                       sx={{
//                                         display: "flex", alignItems: "center", gap: 0.6, px: 1.1, py: 0.4, borderRadius: "6px", cursor: "pointer", transition: "all 0.12s",
//                                         bgcolor: allOk ? "#EDFAF3" : serialCount > 0 ? "#FFFBEB" : P.alt,
//                                         border: `1px solid ${allOk ? "#A3E6C5" : serialCount > 0 ? "#FCD34D" : P.border}`,
//                                         "&:hover": { bgcolor: "#EDFAF3", borderColor: "#A3E6C5" },
//                                       }}>
//                                       <QrCodeScannerOutlined sx={{ fontSize: 13, color: allOk ? "#16A34A" : serialCount > 0 ? "#92400E" : P.faint }} />
//                                       <Typography sx={{ fontSize: "0.68rem", fontWeight: 700, color: allOk ? "#16A34A" : serialCount > 0 ? "#92400E" : P.muted }}>
//                                         {allOk ? `${serialCount} seriales ✓` : serialCount > 0 ? `${serialCount}/${item.quantity} pistol.` : "Pistolear"}
//                                       </Typography>
//                                     </Box>
//                                   )}
//                                 </Box>

//                                 {superaStock && (
//                                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.7, mt: 1, px: 1.2, py: 0.5, bgcolor: "#FEF2F2", borderRadius: "6px", border: "1px solid #FBBFBF" }}>
//                                     <WarningAmberRounded sx={{ fontSize: 12, color: "#DC2626" }} />
//                                     <Typography sx={{ fontSize: "0.63rem", color: "#DC2626", fontWeight: 600 }}>Supera stock ({item.quantityAvailable} disponibles)</Typography>
//                                   </Box>
//                                 )}
//                                 {hasWarn && (
//                                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.7, mt: 1, px: 1.2, py: 0.5, bgcolor: "#FFFBEB", borderRadius: "6px", border: "1px solid #FCD34D" }}>
//                                     <WarningAmberRounded sx={{ fontSize: 12, color: "#B45309" }} />
//                                     <Typography sx={{ fontSize: "0.63rem", color: "#B45309", fontWeight: 600 }}>Registra seriales antes de confirmar</Typography>
//                                   </Box>
//                                 )}
//                                 {isEquipo && serialCount > 0 && (
//                                   <Box sx={{ mt: 1, pl: 1.8, display: "flex", gap: 0.5, flexWrap: "wrap" }}>
//                                     {item.serials?.map((s, idx) => (
//                                       <Typography key={idx} sx={{ fontSize: "0.6rem", fontWeight: 700, color: "#16A34A", fontFamily: "monospace", bgcolor: "#EDFAF3", px: 0.8, py: 0.15, borderRadius: "4px", border: "1px solid #A3E6C5" }}>
//                                         {s.serialNumber}
//                                       </Typography>
//                                     ))}
//                                   </Box>
//                                 )}
//                               </Box>
//                             </Fade>
//                           );
//                         })}
//                       </Box>
//                     )}

//                     {lineItems.length > 0 && (
//                       <Box sx={{ mt: 2, pt: 1.5, borderTop: `1px solid ${P.border}`, display: "flex", gap: 1.5, flexWrap: "wrap", alignItems: "center" }}>
//                         {(["MATERIAL","TOOL","EQUIPMENT","EPP"] as ProductType[]).filter(t => lineItems.some(i => i.productType === t)).map(t => {
//                           const cfg = PRODUCT_CFG[t];
//                           return (
//                             <Box key={t} sx={{ display: "flex", alignItems: "center", gap: 0.6, px: 1.1, py: 0.5, borderRadius: "6px", bgcolor: cfg.bg, border: `1px solid ${cfg.border}` }}>
//                               <Typography sx={{ fontSize: "0.82rem", lineHeight: 1 }}>{cfg.emoji}</Typography>
//                               <Typography sx={{ fontSize: "0.7rem", fontWeight: 800, color: cfg.color }}>{lineItems.filter(i => i.productType === t).length}</Typography>
//                               <Typography sx={{ fontSize: "0.63rem", color: cfg.color, opacity: 0.75 }}>{cfg.label}</Typography>
//                             </Box>
//                           );
//                         })}
//                         {totalValue > 0 && (
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, px: 1.1, py: 0.5, borderRadius: "6px", bgcolor: P.alt, border: `1px solid ${P.border}`, ml: "auto" }}>
//                             <Typography sx={{ fontSize: "0.63rem", color: P.faint }}>Total est.:</Typography>
//                             <Typography sx={{ fontSize: "0.76rem", fontWeight: 800, color: P.ink, fontFamily: "monospace" }}>S/ {totalValue.toFixed(2)}</Typography>
//                           </Box>
//                         )}
//                       </Box>
//                     )}
//                   </Box>
//                 </Box>
//               </Box>
//             </Collapse>

//             {/* ══ PASO 5 — CONFIRMAR ═══════════════════════════════════ */}
//             <Collapse in={lineItems.length > 0} timeout={300} unmountOnExit>
//               <Box sx={{
//                 borderRadius: "12px", overflow: "hidden",
//                 border: `1.5px solid ${canSubmit ? (flujoActivo?.border ?? P.border) : P.border}`,
//                 transition: "all 0.3s",
//               }}>
//                 <Box sx={{ px: 3, py: 2.2, bgcolor: P.ink, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                     {flujoActivo && (
//                       <Box sx={{ width: 36, height: 36, borderRadius: "8px", bgcolor: `${flujoActivo.color}22`, border: `1px solid ${flujoActivo.dot}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
//                         <flujoActivo.Icon sx={{ fontSize: 18, color: flujoActivo.dot }} />
//                       </Box>
//                     )}
//                     <Box>
//                       <Typography sx={{ fontSize: "0.87rem", fontWeight: 800, color: "white", lineHeight: 1 }}>Confirmar movimiento</Typography>
//                       <Typography sx={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.38)", mt: 0.3 }}>
//                         {tipoFlujo} · {subtipo?.label}
//                         {ctxValues.guiaIngreso  && ` · ${ctxValues.guiaIngreso}`}
//                         {ctxValues.guiaDespacho && ` · ${ctxValues.guiaDespacho}`}
//                         {ctxValues.guia         && ` · ${ctxValues.guia}`}
//                       </Typography>
//                     </Box>
//                   </Box>
//                   {flujoActivo && (
//                     <Box sx={{ px: 1.4, py: 0.6, borderRadius: "7px", bgcolor: `${flujoActivo.color}18`, border: `1px solid ${flujoActivo.dot}35` }}>
//                       <Typography sx={{ fontSize: "0.7rem", fontWeight: 800, color: flujoActivo.dot }}>{totalMovs} mov.</Typography>
//                     </Box>
//                   )}
//                 </Box>

//                 <Box sx={{ p: 3, bgcolor: P.surface }}>
//                   {/* KPIs */}
//                   <Box sx={{ display: "flex", gap: 1.5, mb: 3, flexWrap: "wrap" }}>
//                     {[
//                       { label: "Ítems",          value: lineItems.length,    color: "#1E40AF" },
//                       { label: "Movimientos",    value: totalMovs,            color: flujoActivo?.dot ?? P.ink },
//                       { label: "Equipos pistol.",value: `${lineItems.filter(i => i.productType === "EQUIPMENT" && (i.serials?.length ?? 0) > 0).length}/${lineItems.filter(i => i.productType === "EQUIPMENT").length}`, color: "#16A34A" },
//                       { label: "Valor est.",     value: totalValue > 0 ? `S/ ${totalValue.toFixed(2)}` : "—", color: P.muted },
//                     ].map(kpi => (
//                       <Box key={kpi.label} sx={{ flex: "1 1 88px", p: 1.8, borderRadius: "10px", border: `1px solid ${P.border}`, bgcolor: P.alt, textAlign: "center" }}>
//                         <Typography sx={{ fontSize: "1rem", fontWeight: 800, color: kpi.color, lineHeight: 1 }}>{kpi.value}</Typography>
//                         <Typography sx={{ fontSize: "0.62rem", color: P.faint, mt: 0.4 }}>{kpi.label}</Typography>
//                       </Box>
//                     ))}
//                   </Box>

//                   {validationErrors.length > 0 && (
//                     <Box sx={{ p: 2, borderRadius: "8px", bgcolor: "#FFFBEB", border: "1px solid #FCD34D", mb: 2.5 }}>
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1 }}>
//                         <WarningAmberRounded sx={{ fontSize: 15, color: "#92400E" }} />
//                         <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "#92400E" }}>Pendientes antes de confirmar</Typography>
//                       </Box>
//                       {validationErrors.map((e, i) => (
//                         <Typography key={i} sx={{ fontSize: "0.68rem", color: "#78350F", lineHeight: 1.7 }}>• {e}</Typography>
//                       ))}
//                     </Box>
//                   )}

//                   <Alert severity={tipoFlujo === "ENTRADA" ? "success" : tipoFlujo === "TRANSFERENCIA" ? "info" : "error"}
//                     sx={{ borderRadius: "8px", mb: 3, fontSize: "0.78rem" }}>
//                     Se registrarán <strong>{totalMovs} movimientos</strong> tipo{" "}
//                     <strong>{FLUJO_TO_MOVEMENT_TYPE[tipoFlujo!]}</strong>.{" "}
//                     {tipoFlujo === "ENTRADA" ? "El stock se incrementará." : tipoFlujo === "TRANSFERENCIA" ? "Se moverá entre almacenes." : "El stock se descontará."}
//                     {" "}Esta acción es <strong>irreversible</strong>.
//                   </Alert>

//                   <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
//                     <ButtonBase label="Reiniciar" onClick={resetAll}
//                       sx={{ bgcolor: P.surface, color: P.muted, border: `1px solid ${P.border}`, fontSize: "0.78rem" }} />
//                     <ButtonBase
//                       label={`Confirmar ${tipoFlujo?.toLowerCase() ?? ""}`}
//                       startIcon={<SendRounded sx={{ fontSize: 15 }} />}
//                       onClick={handleSubmit}
//                       disabled={!canSubmit}
//                       sx={{
//                         px: 3, py: 1, fontWeight: 700, borderRadius: "8px", fontSize: "0.83rem",
//                         bgcolor: canSubmit ? (flujoActivo?.dot ?? P.ink) : undefined,
//                         "&:hover": { opacity: 0.88 },
//                         transition: "all 0.18s",
//                       }}
//                     />
//                   </Box>
//                 </Box>
//               </Box>
//             </Collapse>

//           </Box>

//           {/* ── Panel resumen lateral ─────────────────────────────────── */}
//           <Box sx={{ width: 272, flexShrink: 0, display: { xs: "none", lg: "flex" }, flexDirection: "column", position: "sticky", top: 24, alignSelf: "flex-start" }}>
//             <Box sx={{ borderRadius: "12px", border: `1px solid ${P.border}`, bgcolor: P.surface, overflow: "hidden" }}>
//               <Box sx={{ px: 2.5, py: 2, bgcolor: P.ink, display: "flex", alignItems: "center", gap: 1.2 }}>
//                 <HistoryRounded sx={{ fontSize: 16, color: "rgba(255,255,255,0.4)" }} />
//                 <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: "white" }}>Resumen del movimiento</Typography>
//               </Box>
//               <Box sx={{ p: 2.5, display: "flex", flexDirection: "column", gap: 2 }}>
//                 {/* Tipo flujo */}
//                 <Box>
//                   <Typography sx={{ fontSize: "0.58rem", fontWeight: 700, color: P.faint, letterSpacing: "0.08em", textTransform: "uppercase", mb: 0.8 }}>Tipo de movimiento</Typography>
//                   {flujoActivo ? (
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, p: 1.4, borderRadius: "8px", bgcolor: flujoActivo.bg, border: `1px solid ${flujoActivo.border}` }}>
//                       <flujoActivo.Icon sx={{ fontSize: 18, color: flujoActivo.dot }} />
//                       <Box>
//                         <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: flujoActivo.color, lineHeight: 1 }}>{flujoActivo.label}</Typography>
//                         <Typography sx={{ fontSize: "0.62rem", color: flujoActivo.color, opacity: 0.65, mt: 0.2 }}>{flujoActivo.desc}</Typography>
//                       </Box>
//                     </Box>
//                   ) : (
//                     <Box sx={{ p: 1.4, borderRadius: "8px", bgcolor: P.alt, border: `1px dashed ${P.border}` }}>
//                       <Typography sx={{ fontSize: "0.7rem", color: P.faint }}>Sin seleccionar</Typography>
//                     </Box>
//                   )}
//                 </Box>

//                 {subtipo && (
//                   <Box>
//                     <Typography sx={{ fontSize: "0.58rem", fontWeight: 700, color: P.faint, letterSpacing: "0.08em", textTransform: "uppercase", mb: 0.8 }}>Subtipo</Typography>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1.4, borderRadius: "8px", bgcolor: P.alt, border: `1px solid ${P.border}` }}>
//                       <Box sx={{ color: P.muted }}>{subtipo.icon}</Box>
//                       <Typography sx={{ fontSize: "0.76rem", fontWeight: 600, color: P.ink }}>{subtipo.label}</Typography>
//                     </Box>
//                   </Box>
//                 )}

//                 <Divider sx={{ borderColor: P.border }} />

//                 {/* KPIs ítems */}
//                 <Box>
//                   <Typography sx={{ fontSize: "0.58rem", fontWeight: 700, color: P.faint, letterSpacing: "0.08em", textTransform: "uppercase", mb: 1 }}>Ítems del movimiento</Typography>
//                   {[
//                     { label: "Total ítems",      value: lineItems.length,  active: lineItems.length > 0 },
//                     { label: "Movimientos",      value: totalMovs,          active: totalMovs > 0 },
//                     { label: "Equipos c/serial", value: `${lineItems.filter(i => i.productType === "EQUIPMENT" && (i.serials?.length ?? 0) > 0).length}/${lineItems.filter(i => i.productType === "EQUIPMENT").length}`, active: lineItems.some(i => i.productType === "EQUIPMENT") },
//                   ].map(k => (
//                     <Box key={k.label} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 0.7, borderBottom: `1px solid ${P.border}` }}>
//                       <Typography sx={{ fontSize: "0.68rem", color: P.faint }}>{k.label}</Typography>
//                       <Typography sx={{ fontSize: "0.76rem", fontWeight: 700, color: k.active ? P.ink : P.faint }}>{k.value}</Typography>
//                     </Box>
//                   ))}
//                   {totalValue > 0 && (
//                     <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 0.8, mt: 0.5 }}>
//                       <Typography sx={{ fontSize: "0.68rem", color: P.faint }}>Valor estimado</Typography>
//                       <Typography sx={{ fontSize: "0.8rem", fontWeight: 800, color: P.ink, fontFamily: "monospace" }}>S/ {totalValue.toFixed(2)}</Typography>
//                     </Box>
//                   )}
//                 </Box>

//                 {/* Lista de productos */}
//                 {lineItems.length > 0 && (
//                   <>
//                     <Divider sx={{ borderColor: P.border }} />
//                     <Box>
//                       <Typography sx={{ fontSize: "0.58rem", fontWeight: 700, color: P.faint, letterSpacing: "0.08em", textTransform: "uppercase", mb: 0.8 }}>Productos</Typography>
//                       <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, maxHeight: 140, overflowY: "auto",
//                         "&::-webkit-scrollbar": { width: 3 }, "&::-webkit-scrollbar-thumb": { bgcolor: P.border, borderRadius: 2 } }}>
//                         {lineItems.map(item => {
//                           const isEquipo = item.productType === "EQUIPMENT";
//                           const sc = item.serials?.length ?? 0;
//                           const ok = isEquipo ? sc === item.quantity : item.quantity > 0;
//                           return (
//                             <Box key={item.inventoryId} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                               {ok ? <CheckCircleRounded sx={{ fontSize: 12, color: "#16A34A", flexShrink: 0 }} /> : <RadioButtonUncheckedOutlined sx={{ fontSize: 12, color: "#F59E0B", flexShrink: 0 }} />}
//                               <Typography sx={{ fontSize: "0.66rem", color: P.muted, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.itemCode}</Typography>
//                               <Typography sx={{ fontSize: "0.66rem", fontWeight: 700, color: PRODUCT_CFG[item.productType].color }}>{isEquipo ? sc : item.quantity}</Typography>
//                             </Box>
//                           );
//                         })}
//                       </Box>
//                     </Box>
//                   </>
//                 )}
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       </Fade>

//       {/* ══ DIALOG — CANTIDAD EQUIPOS ════════════════════════════════════ */}
//       <Dialog open={addEquipoOpen} onClose={() => setAddEquipoOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: "14px" } }}>
//         <Box sx={{ bgcolor: P.ink, px: 3, py: 2.2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//             <Box sx={{ bgcolor: P.inkSoft, p: 0.8, borderRadius: "7px", border: "1px solid rgba(255,255,255,0.08)" }}>
//               <ConstructionRounded sx={{ fontSize: 16, color: "rgba(255,255,255,0.65)" }} />
//             </Box>
//             <Box>
//               <Typography sx={{ fontSize: "0.83rem", fontWeight: 700, color: "white" }}>Agregar equipo</Typography>
//               <Typography sx={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.38)" }}>{addEquipoItem?.itemCode} — {addEquipoItem?.description}</Typography>
//             </Box>
//           </Box>
//           <IconButton size="small" onClick={() => setAddEquipoOpen(false)} sx={{ color: "rgba(255,255,255,0.3)" }}>
//             <CloseOutlined fontSize="small" />
//           </IconButton>
//         </Box>
//         <Box sx={{ p: 3 }}>
//           {addEquipoItem && (
//             <Alert severity="info" sx={{ borderRadius: "8px", mb: 2.5, fontSize: "0.76rem" }}>
//               Stock disponible: <strong>{addEquipoItem.quantityAvailable}</strong> unidades
//             </Alert>
//           )}
//           <Typography sx={{ fontSize: "0.83rem", fontWeight: 600, color: "#334155", mb: 1.5 }}>¿Cuántos equipos ingresar?</Typography>
//           <TextField fullWidth autoFocus type="number" label="Cantidad de equipos"
//             value={addEquipoCant} onChange={e => setAddEquipoCant(e.target.value)}
//             onKeyDown={e => { if (e.key === "Enter") confirmEquipo(); }}
//             inputProps={{ min: 1, style: { fontWeight: 800, fontSize: "1.4rem", textAlign: "center", padding: "12px 0" } }}
//             sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", "& fieldset": { borderColor: P.ink, borderWidth: 2 } },
//               "& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button": { display: "none" },
//               "& input[type=number]": { MozAppearance: "textfield" },
//             }} />
//         </Box>
//         <Box sx={{ px: 3, pb: 3, display: "flex", gap: 1, justifyContent: "flex-end" }}>
//           <ButtonBase label="Cancelar" onClick={() => setAddEquipoOpen(false)}
//             sx={{ bgcolor: P.surface, color: P.muted, border: `1px solid ${P.border}`, fontSize: "0.78rem" }} />
//           <ButtonBase label={`Agregar ${addEquipoCant || "1"} equipo${parseInt(addEquipoCant) > 1 ? "s" : ""}`}
//             startIcon={<QrCodeScannerOutlined sx={{ fontSize: 15 }} />} onClick={confirmEquipo}
//             sx={{ px: 2.5, bgcolor: P.ink, color: "white", fontSize: "0.8rem", "&:hover": { bgcolor: P.inkSoft } }} />
//         </Box>
//       </Dialog>

//       {/* ══ DIALOG — PISTOLEO ════════════════════════════════════════════ */}
//       <Dialog open={pistoleoOpen} onClose={() => setPistoleoOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: "14px" } }}>
//         <Box sx={{ bgcolor: P.ink, px: 3, py: 2.2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//             <Box sx={{ bgcolor: "#16A34A", p: 0.8, borderRadius: "7px" }}>
//               <QrCodeScannerOutlined sx={{ fontSize: 16, color: "white" }} />
//             </Box>
//             <Box>
//               <Typography sx={{ fontSize: "0.83rem", fontWeight: 700, color: "white" }}>Registro de seriales</Typography>
//               {pistoleoItem && (
//                 <Typography sx={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.38)" }}>
//                   {pistoleoItem.itemCode} · {serialesCap.length}/{pistoleoItem.quantity} capturados
//                 </Typography>
//               )}
//             </Box>
//           </Box>
//           <IconButton onClick={() => setPistoleoOpen(false)} size="small" sx={{ color: "rgba(255,255,255,0.3)" }}>
//             <CloseOutlined fontSize="small" />
//           </IconButton>
//         </Box>

//         <Box sx={{ p: 3 }}>
//           {pistoleoItem && (() => {
//             const tipo = getEquipoTipo(pistoleoItem.description);
//             const campos = CAMPOS_EQUIPO[tipo];
//             const totalReq = pistoleoItem.quantity;
//             const totalCap = serialesCap.length;
//             const pct = Math.min((totalCap / totalReq) * 100, 100);
//             const todoComp = campos.every(c => !!(serialActual as any)[c.field]?.trim());

//             return (
//               <>
//                 {/* Progreso */}
//                 <Box sx={{ mb: 2.5, p: 2, borderRadius: "10px", bgcolor: P.alt, border: `1px solid ${P.border}` }}>
//                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.2 }}>
//                     <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155" }}>Progreso de captura</Typography>
//                     <Box sx={{ px: 1.1, py: 0.3, borderRadius: "6px", bgcolor: totalCap === totalReq ? "#EDFAF3" : totalCap > 0 ? "#FFFBEB" : P.surface, border: `1px solid ${totalCap === totalReq ? "#A3E6C5" : totalCap > 0 ? "#FCD34D" : P.border}` }}>
//                       <Typography sx={{ fontSize: "0.7rem", fontWeight: 800, color: totalCap === totalReq ? "#0A6B3B" : totalCap > 0 ? "#92400E" : P.faint }}>{totalCap} / {totalReq}</Typography>
//                     </Box>
//                   </Box>
//                   <LinearProgress variant="determinate" value={pct}
//                     sx={{ height: 5, borderRadius: 3, bgcolor: P.border, "& .MuiLinearProgress-bar": { bgcolor: totalCap === totalReq ? "#16A34A" : "#F59E0B", borderRadius: 3 } }} />
//                   <Typography sx={{ fontSize: "0.62rem", color: P.faint, mt: 0.8 }}>Tipo: <strong>{tipo}</strong> · Campos: {campos.map(c => c.label).join(", ")}</Typography>
//                 </Box>

//                 {/* Auto guardar */}
//                 <Box sx={{ mb: 2.5, p: 1.6, borderRadius: "8px", bgcolor: autoGuardar ? "#EDFAF3" : P.alt, border: `1px solid ${autoGuardar ? "#A3E6C5" : P.border}`, transition: "all 0.2s" }}>
//                   <FormControlLabel
//                     control={<Switch checked={autoGuardar} onChange={e => setAutoGuardar(e.target.checked)} color="success" size="small" />}
//                     label={
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
//                         <AutoAwesomeRounded sx={{ fontSize: 13, color: autoGuardar ? "#16A34A" : P.faint }} />
//                         <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: autoGuardar ? "#0A4C2B" : P.faint }}>Guardar automáticamente al completar</Typography>
//                       </Box>
//                     }
//                     sx={{ m: 0 }}
//                   />
//                 </Box>

//                 {/* Campos */}
//                 <Stack spacing={1.8} sx={{ mb: 3 }}>
//                   {campos.map(campo => {
//                     const valor = (serialActual as any)[campo.field] ?? "";
//                     const error = camposError[campo.field] ?? "";
//                     const regla = VALIDACIONES[campo.field];
//                     const esValido = regla ? regla.regex.test(valor.trim()) && valor.trim() !== "" : valor.trim() !== "";
//                     const tieneErr = !!error && valor.trim() !== "";

//                     return (
//                       <Box key={campo.field}>
//                         <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: P.muted, display: "flex", alignItems: "center", gap: 0.5, mb: 0.7 }}>
//                           {campo.label} *
//                           {esValido && <CheckCircleRounded sx={{ fontSize: 11, color: "#16A34A" }} />}
//                         </Typography>
//                         <TextField fullWidth size="small" placeholder={campo.placeholder} value={valor}
//                           onChange={e => handleCampoChange(campo.field, e.target.value, tipo, totalReq)}
//                           disabled={totalCap >= totalReq} error={tieneErr}
//                           helperText={tieneErr ? error : esValido ? "✓ Válido" : regla ? `Ej: ${campo.placeholder}` : undefined}
//                           FormHelperTextProps={{ sx: { color: tieneErr ? "error.main" : esValido ? "#16A34A" : P.faint, fontSize: "0.63rem" } }}
//                           InputProps={campo.field === "serialNumber" ? {
//                             startAdornment: <InputAdornment position="start"><QrCodeScannerOutlined sx={{ fontSize: 14, color: esValido ? "#16A34A" : P.faint }} /></InputAdornment>,
//                           } : undefined}
//                           sx={{
//                             "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: "0.83rem",
//                               ...(esValido && { "& fieldset": { borderColor: "#A3E6C5", borderWidth: 1.5 } }),
//                               ...(tieneErr && { "& fieldset": { borderColor: "#FBBFBF", borderWidth: 1.5 } }),
//                             }
//                           }} />
//                       </Box>
//                     );
//                   })}
//                 </Stack>

//                 {!autoGuardar && (
//                   <ButtonBase fullWidth
//                     label={totalCap >= totalReq ? "✓ Captura completa" : `Agregar serial ${totalCap + 1} de ${totalReq}`}
//                     startIcon={<AddCircleOutlineRounded />}
//                     onClick={addSerialManual}
//                     disabled={!serialActual.serialNumber?.trim() || totalCap >= totalReq}
//                     sx={{ mb: 2.5, bgcolor: P.ink, color: "white", "&:hover": { bgcolor: P.inkSoft } }}
//                   />
//                 )}

//                 {autoGuardar && totalCap < totalReq && (
//                   <Box sx={{ mb: 2.5, p: 1.4, borderRadius: "8px", textAlign: "center", bgcolor: todoComp ? "#EDFAF3" : P.alt, border: `1px solid ${todoComp ? "#A3E6C5" : P.border}`, transition: "all 0.2s" }}>
//                     <Typography sx={{ fontSize: "0.7rem", fontWeight: 600, color: todoComp ? "#16A34A" : P.faint }}>
//                       {todoComp ? "⚡ Guardando automáticamente..." : `Completa los campos para guardar serial ${totalCap + 1} de ${totalReq}`}
//                     </Typography>
//                   </Box>
//                 )}

//                 {serialesCap.length > 0 && (
//                   <Box>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.2 }}>
//                       <CheckCircleRounded sx={{ fontSize: 14, color: "#16A34A" }} />
//                       <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155" }}>Registrados ({serialesCap.length})</Typography>
//                     </Box>
//                     <Stack spacing={0.5}>
//                       {serialesCap.map((s, idx) => (
//                         <Box key={idx} sx={{ px: 2, py: 1, bgcolor: P.alt, borderRadius: "8px", border: `1px solid ${P.border}`, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
//                           <Stack spacing={0.2}>
//                             <Typography sx={{ fontSize: "0.63rem", fontWeight: 800, color: "#16A34A" }}>#{idx + 1}</Typography>
//                             {s.serialNumber && <Typography sx={{ fontSize: "0.7rem", color: P.muted, fontFamily: "monospace" }}>SN: {s.serialNumber}</Typography>}
//                             {s.mac    && <Typography sx={{ fontSize: "0.66rem", color: P.faint, fontFamily: "monospace" }}>MAC: {s.mac}</Typography>}
//                             {s.ua     && <Typography sx={{ fontSize: "0.66rem", color: P.faint, fontFamily: "monospace" }}>UA: {s.ua}</Typography>}
//                             {s.mtaMac && <Typography sx={{ fontSize: "0.66rem", color: P.faint, fontFamily: "monospace" }}>MTA: {s.mtaMac}</Typography>}
//                           </Stack>
//                           <IconButton size="small" onClick={() => setSeriales(prev => prev.filter((_, i) => i !== idx))}
//                             sx={{ color: P.faint, "&:hover": { color: "#DC2626", bgcolor: "#FEF2F2" }, mt: -0.5 }}>
//                             <CloseOutlined sx={{ fontSize: 12 }} />
//                           </IconButton>
//                         </Box>
//                       ))}
//                     </Stack>
//                   </Box>
//                 )}
//               </>
//             );
//           })()}
//         </Box>

//         <Box sx={{ px: 3, pb: 3, pt: 0, display: "flex", gap: 1, justifyContent: "flex-end" }}>
//           <ButtonBase label="Cancelar" onClick={() => setPistoleoOpen(false)}
//             sx={{ bgcolor: P.surface, color: P.muted, border: `1px solid ${P.border}`, fontSize: "0.78rem" }} />
//           <ButtonBase
//             label={`Guardar ${serialesCap.length} serial${serialesCap.length !== 1 ? "es" : ""}`}
//             startIcon={<ArrowForwardRounded sx={{ fontSize: 15 }} />}
//             onClick={() => saveSeriales(serialesCap)}
//             disabled={serialesCap.length === 0}
//             sx={{ px: 2.5, bgcolor: P.ink, color: "white", fontSize: "0.8rem", "&:hover": { bgcolor: P.inkSoft }, "&.Mui-disabled": { bgcolor: P.alt } }}
//           />
//         </Box>
//       </Dialog>
//     </Box>
//   );
// }
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  Box, Card, Typography, Chip, Stack, Paper, Alert,
  TextField, IconButton, Fade, Collapse, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControlLabel, Switch, LinearProgress, InputAdornment,
  Tooltip, Divider, Stepper, Step, StepLabel,
} from "@mui/material";
import {
  // Movimiento
  CallReceivedRounded, CallMadeRounded, SyncAltRounded,
  // Steps
  CheckCircleRounded, RadioButtonUncheckedOutlined,
  // Acciones formulario
  QrCodeScannerOutlined, CloseOutlined, DeleteOutlineRounded,
  AddCircleOutlineRounded, RefreshRounded, SearchRounded,
  AutoAwesomeRounded, SendRounded, DoneAllRounded,
  SwapHorizRounded, WarningAmberRounded, ArrowForwardRounded,
  // Campos
  ReceiptLongRounded, CalendarMonthRounded, BusinessRounded,
  PersonRounded, WarehouseRounded, StorageRounded,
  // Tipos producto
  Inventory2Rounded, BuildRounded, ConstructionRounded, SecurityRounded,
  // Misc
  HistoryRounded, HubRounded, InfoRounded,
  // Estado pipeline
  PendingRounded, TaskAltRounded, ErrorOutlineRounded,
} from "@mui/icons-material";
import ButtonBase from "@/src/components/base/ButtonBase";
import SelectBase from "@/src/components/base/SelectBase";
import { toast } from "react-toastify";
import { API_URL } from "@/src/lib/config";
import dayjs from "dayjs";

// ─────────────────────────────────────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────────────────────────────────────

type TipoFlujo   = "ENTRADA" | "SALIDA" | "TRANSFERENCIA";
type ProductType = "MATERIAL" | "TOOL" | "EQUIPMENT" | "EPP";
type EquipoTipo  = "MODEM" | "DECODIFICADOR" | "ROUTER" | "SWITCH" | "OTRO";

// Mapeo flujo UI → MovementType del backend
const FLUJO_TO_MOVEMENT_TYPE: Record<TipoFlujo, "ENTRY" | "EXIT" | "TRANSFER"> = {
  ENTRADA:       "ENTRY",
  SALIDA:        "EXIT",
  TRANSFERENCIA: "TRANSFER",
};

interface SubHub        { id: number; name: string; status: string }
interface HubWithSubHubs{ id: number; name: string; subHubs: SubHub[] }
interface ClienteCatalog{ id: number; razonSocial: string }
interface SupplySourceCatalog { id: number; name: string; code?: string }

interface ContextField {
  key: string; label: string; placeholder: string;
  required: boolean; type: "text" | "date" | "select" | "select-dynamic";
  options?: { label: string; value: string }[];
  dynamicKey?: "hubs" | "subhubs" | "clientes" | "supplySources";
  icon: React.ReactNode;
  helperText?: string;
}

interface SubtipoMovimiento {
  value: string; label: string; description: string;
  icon: React.ReactNode; flujo: TipoFlujo;
  movementType: "ENTRY" | "EXIT" | "TRANSFER";
  contextFields: ContextField[];
}

interface HubInventoryItem {
  id: number; itemId: number; itemCode: string; description: string;
  productType: ProductType; supplySource: string;
  quantityAvailable: number; minimumStock: number;
  maximumStock: number | null; locationCode: string | null;
  averageCost: number | null;
}

interface KardexLineItem {
  inventoryId: number; itemId: number; itemCode: string;
  description: string; productType: ProductType;
  supplySource: string; quantityAvailable: number;
  quantity: number; unitPrice: number; _rawQty?: string;
  serials?: EquipoSerial[];
}

interface EquipoSerial {
  serialNumber: string; mac?: string; ua?: string; mtaMac?: string;
}

// Estado del pipeline de submit
interface PipelineStep {
  id: "header" | "kardex" | "inventory";
  label: string;
  status: "pending" | "loading" | "done" | "error";
  detail?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// PALETA
// ─────────────────────────────────────────────────────────────────────────────

const P = {
  ink:       "#0F1923",
  inkSoft:   "#1C2B3A",
  surface:   "#FFFFFF",
  alt:       "#F7F8FA",
  border:    "#E8ECF0",
  muted:     "#5A6478",
  faint:     "#9CA8B8",
};

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG VISUAL
// ─────────────────────────────────────────────────────────────────────────────

interface FlujoCfg {
  color: string; bg: string; border: string; dot: string;
  Icon: React.ElementType; label: string; desc: string;
}
const FLUJO_CFG: Record<TipoFlujo, FlujoCfg> = {
  ENTRADA:       { color: "#0A6B3B", bg: "#EDFAF3", border: "#A3E6C5", dot: "#16A34A", Icon: CallReceivedRounded, label: "Entrada",       desc: "Ingreso de stock al hub"       },
  SALIDA:        { color: "#991B1B", bg: "#FEF2F2", border: "#FBBFBF", dot: "#DC2626", Icon: CallMadeRounded,     label: "Salida",        desc: "Egreso de stock del hub"       },
  TRANSFERENCIA: { color: "#4C1D95", bg: "#F5F3FF", border: "#C4B5FD", dot: "#7C3AED", Icon: SyncAltRounded,      label: "Transferencia", desc: "Movimiento entre almacenes"   },
};

const PRODUCT_CFG: Record<ProductType, {
  label: string; Icon: React.ElementType; emoji: string;
  color: string; bg: string; border: string;
}> = {
  MATERIAL:  { label: "Material",    Icon: Inventory2Rounded,    emoji: "📦", color: "#78350F", bg: "#FEF3C7", border: "#FDE68A" },
  TOOL:      { label: "Herramienta", Icon: BuildRounded,         emoji: "🔧", color: "#1E3A8A", bg: "#EFF6FF", border: "#BFDBFE" },
  EQUIPMENT: { label: "Equipo",      Icon: ConstructionRounded,  emoji: "⚙️", color: "#14532D", bg: "#F0FDF4", border: "#BBF7D0" },
  EPP:       { label: "EPP",         Icon: SecurityRounded,      emoji: "🦺", color: "#4C1D95", bg: "#FAF5FF", border: "#DDD6FE" },
};

// ─────────────────────────────────────────────────────────────────────────────
// CAMPOS DE FORMULARIO
// ─────────────────────────────────────────────────────────────────────────────

const mkF = (
  key: string, label: string, placeholder: string, icon: React.ReactNode,
  required = true, type: ContextField["type"] = "text",
  options?: { label: string; value: string }[],
  helperText?: string,
  dynamicKey?: ContextField["dynamicKey"]
): ContextField => ({ key, label, placeholder, icon, required, type, options, helperText, dynamicKey });

const F_GUIA_IN  = mkF("guiaIngreso",     "Guía de remisión ingreso",  "GR-2025-001", <ReceiptLongRounded  sx={{ fontSize: 14 }} />);
const F_GUIA_OUT = mkF("guiaDespacho",    "Guía de remisión despacho", "GR-2025-001", <ReceiptLongRounded  sx={{ fontSize: 14 }} />);
const F_GUIA     = mkF("guia",            "Guía de remisión",          "GR-2025-001", <ReceiptLongRounded  sx={{ fontSize: 14 }} />);
const F_FECHA_R  = mkF("fechaRecepcion",  "Fecha de recepción",        "",            <CalendarMonthRounded sx={{ fontSize: 14 }} />, true, "date");
const F_FECHA_M  = mkF("fechaMovimiento", "Fecha de movimiento",       "",            <CalendarMonthRounded sx={{ fontSize: 14 }} />, true, "date");
const F_OC       = mkF("ordenCompra",     "Orden de compra",           "OC-2025-001", <ReceiptLongRounded  sx={{ fontSize: 14 }} />);
const F_PROV     = mkF("proveedorId",     "Proveedor",                 "",            <BusinessRounded     sx={{ fontSize: 14 }} />, true,  "select-dynamic", undefined, "Fuente de suministro", "supplySources");
const F_CLI      = mkF("clienteId",       "Cliente",                   "",            <PersonRounded       sx={{ fontSize: 14 }} />, true,  "select-dynamic", undefined, undefined,              "clientes");
const F_CLI_DST  = mkF("clienteDestinoId","Cliente destino",           "",            <PersonRounded       sx={{ fontSize: 14 }} />, true,  "select-dynamic", undefined, undefined,              "clientes");
const F_ALM_O    = mkF("almacenOrigenId", "Almacén origen",            "",            <WarehouseRounded    sx={{ fontSize: 14 }} />, true,  "select-dynamic", undefined, undefined,              "hubs");
const F_SUB_O    = mkF("subAlmOrigenId",  "Sub almacén origen",        "",            <StorageRounded      sx={{ fontSize: 14 }} />, false, "select-dynamic", undefined, undefined,              "subhubs");
const F_ALM_D    = mkF("almacenDestinoId","Almacén destino",           "",            <WarehouseRounded    sx={{ fontSize: 14 }} />, true,  "select-dynamic", undefined, undefined,              "hubs");
const F_SUB_D    = mkF("subAlmDestinoId", "Sub almacén destino",       "",            <StorageRounded      sx={{ fontSize: 14 }} />, false, "select-dynamic", undefined, undefined,              "subhubs");

const SUBTIPOS: SubtipoMovimiento[] = [
  { value: "COMPRA_LOCAL",           label: "Compra local",                flujo: "ENTRADA",       movementType: "ENTRY",    description: "Ingreso por compra directa a proveedor local",       icon: <Inventory2Rounded   sx={{ fontSize: 18 }} />, contextFields: [F_GUIA_IN, F_FECHA_R, F_OC, F_PROV, F_ALM_D, F_SUB_D] },
  { value: "CONSIGNACION_RECIBIDA",  label: "Consignación recibida",       flujo: "ENTRADA",       movementType: "ENTRY",    description: "Ingreso por consignación enviada por cliente",        icon: <BusinessRounded     sx={{ fontSize: 18 }} />, contextFields: [F_GUIA_IN, F_FECHA_R, F_OC, F_CLI, F_ALM_D, F_SUB_D] },
  { value: "DEVOLUCION_CONTRATISTA", label: "Devolución de contratista",   flujo: "ENTRADA",       movementType: "ENTRY",    description: "Material devuelto por contratista al hub",            icon: <ArrowForwardRounded sx={{ fontSize: 18, transform: "rotate(180deg)" }} />, contextFields: [F_GUIA, F_ALM_O, F_SUB_O, F_ALM_D, F_SUB_D] },
  { value: "TRANSFERENCIA_ALMACENES_E", label: "Transferencia (entrada)",  flujo: "ENTRADA",       movementType: "ENTRY",    description: "Ingreso por traspaso desde otro hub",                icon: <SyncAltRounded      sx={{ fontSize: 18 }} />, contextFields: [F_GUIA, F_FECHA_M, F_ALM_O, F_SUB_O, F_ALM_D, F_SUB_D] },
  { value: "DESPACHO_REGULAR",       label: "Despacho regular",            flujo: "SALIDA",        movementType: "EXIT",     description: "Salida por despacho a técnico o cuadrilla",           icon: <ArrowForwardRounded sx={{ fontSize: 18 }} />, contextFields: [F_GUIA_OUT, F_FECHA_M, F_ALM_O, F_SUB_O, F_ALM_D, F_SUB_D] },
  { value: "DEVOLUCION_CLIENTE",     label: "Devolución a cliente",        flujo: "SALIDA",        movementType: "EXIT",     description: "Devolución de material al cliente propietario",       icon: <PersonRounded       sx={{ fontSize: 18 }} />, contextFields: [F_GUIA, F_FECHA_M, F_ALM_O, F_SUB_O, F_CLI_DST] },
  { value: "TRASPASO_CONTRATISTA",   label: "Traspaso contratista",        flujo: "SALIDA",        movementType: "EXIT",     description: "Traspaso de material a contratista del cliente",      icon: <SwapHorizRounded    sx={{ fontSize: 18 }} />, contextFields: [F_GUIA, F_FECHA_M, F_ALM_O, F_SUB_O, F_CLI_DST] },
  { value: "TRANSFERENCIA_ALMACENES_S", label: "Transferencia (salida)",   flujo: "SALIDA",        movementType: "EXIT",     description: "Salida por traspaso a otro hub",                      icon: <SyncAltRounded      sx={{ fontSize: 18 }} />, contextFields: [F_GUIA, F_FECHA_M, F_ALM_O, F_SUB_O, F_ALM_D, F_SUB_D] },
  { value: "TRANSFERENCIA_ALMACENES",label: "Transferencia entre almacenes", flujo: "TRANSFERENCIA", movementType: "TRANSFER", description: "Traspaso simultáneo entre hubs",                   icon: <SyncAltRounded      sx={{ fontSize: 18 }} />, contextFields: [F_GUIA, F_FECHA_M, F_ALM_O, F_SUB_O, F_ALM_D, F_SUB_D] },
];

// ─────────────────────────────────────────────────────────────────────────────
// PISTOLEO
// ─────────────────────────────────────────────────────────────────────────────

type CampoConfig = { field: string; label: string; placeholder: string };
const CAMPOS_EQUIPO: Record<EquipoTipo, CampoConfig[]> = {
  MODEM:         [{ field: "serialNumber", label: "Nro. serie",   placeholder: "ZTEATV45501950107" }, { field: "mac", label: "MAC address",  placeholder: "6C:B8:81:F2:B7:D7" }, { field: "ua", label: "UA", placeholder: "12345678" }],
  DECODIFICADOR: [{ field: "serialNumber", label: "Nro. serie",   placeholder: "ZTEATV45501950107" }, { field: "mac", label: "MAC address",  placeholder: "6C:B8:81:F2:B7:D7" }],
  ROUTER:        [{ field: "serialNumber", label: "Nro. serie",   placeholder: "ZTEATV45501950107" }, { field: "mac", label: "MAC address",  placeholder: "6C:B8:81:F2:B7:D7" }, { field: "mtaMac", label: "MTA MAC", placeholder: "CC00F1CA6351" }],
  SWITCH:        [{ field: "serialNumber", label: "Nro. serie",   placeholder: "ZTEATV45501950107" }, { field: "mac", label: "MAC address",  placeholder: "6C:B8:81:F2:B7:D7" }],
  OTRO:          [{ field: "serialNumber", label: "Nro. serie",   placeholder: "ZTEATV45501950107" }],
};

const VALIDACIONES: Record<string, { regex: RegExp; mensaje: string }> = {
  serialNumber: { regex: /^[A-Z0-9]{8,25}$/,                      mensaje: "Alfanumérico 8–25 chars"     },
  mac:          { regex: /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/, mensaje: "Ej: 6C:B8:81:F2:B7:D7"      },
  mtaMac:       { regex: /^[0-9A-Fa-f]{12}$/,                     mensaje: "12 hex sin separadores"      },
  ua:           { regex: /^.{6,12}$/,                              mensaje: "6–12 caracteres"              },
};

const getEquipoTipo = (desc: string): EquipoTipo => {
  const d = desc.toUpperCase();
  if (d.includes("MODEM") || d.includes("HFC"))           return "MODEM";
  if (d.includes("DECODIFICADOR") || d.includes("AMINO")) return "DECODIFICADOR";
  if (d.includes("ROUTER") || d.includes("WIFI"))         return "ROUTER";
  if (d.includes("SWITCH"))                               return "SWITCH";
  return "OTRO";
};

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTES
// ─────────────────────────────────────────────────────────────────────────────

const TENANT_ID  = 1;
const PROJECT_ID = 1;
const USER_ID    = 1;
const PAGE_SIZE  = 15;

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTES AUXILIARES
// ─────────────────────────────────────────────────────────────────────────────

function StepBadge({ n, label, active, done }: { n: number; label: string; active: boolean; done: boolean }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
      <Box sx={{
        width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.25s",
        bgcolor: done ? "#16A34A" : active ? P.ink : P.border,
        border: `2px solid ${done ? "#16A34A" : active ? P.ink : "#C9D1DA"}`,
        boxShadow: active ? `0 0 0 3px rgba(15,25,35,0.1)` : "none",
      }}>
        {done
          ? <CheckCircleRounded sx={{ fontSize: 13, color: "white" }} />
          : <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: active ? "white" : P.faint }}>{n}</Typography>
        }
      </Box>
      <Typography sx={{ fontSize: "0.7rem", fontWeight: active || done ? 700 : 400, color: done ? "#16A34A" : active ? P.ink : P.faint, display: { xs: "none", sm: "block" } }}>
        {label}
      </Typography>
    </Box>
  );
}

function SectionHeader({ n, label, sub, done }: { n: string; label: string; sub: string; done: boolean }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
      <Box sx={{
        width: 32, height: 32, borderRadius: "8px", flexShrink: 0,
        bgcolor: done ? "#EDFAF3" : P.alt,
        border: `1px solid ${done ? "#A3E6C5" : P.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {done
          ? <CheckCircleRounded sx={{ fontSize: 16, color: "#16A34A" }} />
          : <Typography sx={{ fontSize: "0.68rem", fontWeight: 800, color: P.faint }}>{n}</Typography>
        }
      </Box>
      <Box>
        <Typography sx={{ fontSize: "0.85rem", fontWeight: 800, color: P.ink, lineHeight: 1 }}>{label}</Typography>
        <Typography sx={{ fontSize: "0.68rem", color: P.faint, mt: 0.3 }}>{sub}</Typography>
      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PIPELINE DIALOG — muestra el progreso del submit en 3 pasos
// ─────────────────────────────────────────────────────────────────────────────

function PipelineDialog({ open, steps }: { open: boolean; steps: PipelineStep[] }) {
  const iconMap: Record<PipelineStep["status"], React.ReactNode> = {
    pending: <PendingRounded    sx={{ fontSize: 20, color: P.faint }} />,
    loading: <CircularProgress  size={20} thickness={4} sx={{ color: P.ink }} />,
    done:    <TaskAltRounded    sx={{ fontSize: 20, color: "#16A34A" }} />,
    error:   <ErrorOutlineRounded sx={{ fontSize: 20, color: "#DC2626" }} />,
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: "14px", overflow: "hidden" } }}>
      <Box sx={{ bgcolor: P.ink, px: 3, py: 2.5 }}>
        <Typography sx={{ fontSize: "0.9rem", fontWeight: 800, color: "white", lineHeight: 1 }}>Registrando movimiento</Typography>
        <Typography sx={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", mt: 0.4 }}>Por favor espera mientras se completan los pasos</Typography>
      </Box>
      <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 1.5 }}>
        {steps.map((step, i) => (
          <Box key={step.id} sx={{
            display: "flex", alignItems: "center", gap: 2,
            p: 1.8, borderRadius: "10px",
            bgcolor: step.status === "loading" ? P.alt : step.status === "done" ? "#EDFAF3" : step.status === "error" ? "#FEF2F2" : P.surface,
            border: `1px solid ${step.status === "loading" ? P.border : step.status === "done" ? "#A3E6C5" : step.status === "error" ? "#FBBFBF" : P.border}`,
            transition: "all 0.3s",
          }}>
            <Box sx={{ flexShrink: 0 }}>{iconMap[step.status]}</Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: step.status === "error" ? "#991B1B" : P.ink }}>
                {step.label}
              </Typography>
              {step.detail && (
                <Typography sx={{ fontSize: "0.65rem", color: step.status === "error" ? "#DC2626" : P.faint, mt: 0.3, wordBreak: "break-word" }}>
                  {step.detail}
                </Typography>
              )}
            </Box>
            <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color: P.faint, flexShrink: 0 }}>
              {String(i + 1).padStart(2, "0")}
            </Typography>
          </Box>
        ))}
      </Box>
    </Dialog>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

export default function KardexMovement() {
  const topRef = useRef<HTMLDivElement>(null);

  // ── Catálogos ─────────────────────────────────────────────────────────
  const [hubs,          setHubs]          = useState<HubWithSubHubs[]>([]);
  const [clientes,      setClientes]      = useState<ClienteCatalog[]>([]);
  const [supplySources, setSupplySources] = useState<SupplySourceCatalog[]>([]);
  const [loadingCats,   setLoadingCats]   = useState(true);

  // ── Hub / SubHub activos ──────────────────────────────────────────────
  const [selectedHubId,    setSelectedHubId]    = useState<number>(0);
  const [selectedSubHubId, setSelectedSubHubId] = useState<number>(0);
  const subHubsActivos = hubs.find(h => h.id === selectedHubId)?.subHubs ?? [];

  // ── Formulario ────────────────────────────────────────────────────────
  const [tipoFlujo, setTipoFlujo] = useState<TipoFlujo | null>(null);
  const [subtipo,   setSubtipo]   = useState<SubtipoMovimiento | null>(null);
  const [ctxValues, setCtxValues] = useState<Record<string, string>>({});
  const [notes,     setNotes]     = useState("");

  // ── Inventario ────────────────────────────────────────────────────────
  const [filterType,      setFilterType]      = useState("ALL");
  const [invSearch,       setInvSearch]       = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [invRows,    setInvRows]    = useState<HubInventoryItem[]>([]);
  const [invTotal,   setInvTotal]   = useState(0);
  const [invPage,    setInvPage]    = useState(0);
  const [invPages,   setInvPages]   = useState(1);
  const [loadingInv, setLoadingInv] = useState(false);
  const [reloadTrig, setReloadTrig] = useState(0);

  const [lineItems, setLineItems] = useState<KardexLineItem[]>([]);

  // ── Pistoleo ──────────────────────────────────────────────────────────
  const [addEquipoOpen, setAddEquipoOpen] = useState(false);
  const [addEquipoItem, setAddEquipoItem] = useState<HubInventoryItem | null>(null);
  const [addEquipoCant, setAddEquipoCant] = useState("1");

  const [pistoleoOpen,  setPistoleoOpen]        = useState(false);
  const [pistoleoItem,  setPistoleoItem]         = useState<KardexLineItem | null>(null);
  const [serialActual,  setSerialActual]         = useState<Partial<EquipoSerial>>({});
  const [serialesCap,   setSeriales]             = useState<EquipoSerial[]>([]);
  const [camposError,   setCamposError]          = useState<Record<string, string>>({});
  const [autoGuardar,   setAutoGuardar]          = useState(true);

  // ── Submit / pipeline ─────────────────────────────────────────────────
  const [pipelineOpen,  setPipelineOpen]  = useState(false);
  const [pipelineSteps, setPipelineSteps] = useState<PipelineStep[]>([]);
  const [showSuccess,   setShowSuccess]   = useState(false);
  const [successData,   setSuccessData]   = useState<{ headerId: number; movCount: number; label: string } | null>(null);

  // ─────────────────────────────────────────────────────────────────────
  // CARGA DE CATÁLOGOS
  // ─────────────────────────────────────────────────────────────────────

  useEffect(() => {
    (async () => {
      setLoadingCats(true);
      try {
        const [hubsRes, cliRes, supRes] = await Promise.all([
          fetch(`${API_URL}/api/catalogs/hubs-with-subhubs`),
          fetch(`${API_URL}/api/catalogs/clients`),
          fetch(`${API_URL}/api/catalogs/supply-sources?page=0&size=100`),
        ]);
        if (hubsRes.ok) {
          const d = await hubsRes.json();
          const data: HubWithSubHubs[] = d.data ?? [];
          setHubs(data);
          if (data.length > 0) {
            setSelectedHubId(data[0].id);
            if (data[0].subHubs?.length > 0) setSelectedSubHubId(data[0].subHubs[0].id);
          }
        }
        if (cliRes.ok) { const d = await cliRes.json(); setClientes(d.data ?? []); }
        if (supRes.ok) { const d = await supRes.json(); setSupplySources(d.data?.content ?? d.data ?? []); }
      } catch (e: any) {
        toast.error(`Error al cargar catálogos: ${e.message}`);
      } finally {
        setLoadingCats(false);
      }
    })();
  }, []);

  useEffect(() => {
    const subs = hubs.find(h => h.id === selectedHubId)?.subHubs ?? [];
    setSelectedSubHubId(subs.length > 0 ? subs[0].id : 0);
  }, [selectedHubId, hubs]);

  // ── Opciones dinámicas ────────────────────────────────────────────────
  const getDynOpts = (key: ContextField["dynamicKey"]) => {
    if (key === "hubs")          return hubs.map(h => ({ label: h.name,          value: String(h.id) }));
    if (key === "subhubs")       return subHubsActivos.map(s => ({ label: s.name, value: String(s.id) }));
    if (key === "clientes")      return clientes.map(c => ({ label: c.razonSocial, value: String(c.id) }));
    if (key === "supplySources") return supplySources.map(s => ({ label: s.name,  value: String(s.id) }));
    return [];
  };

  // ── Debounce búsqueda inventario ──────────────────────────────────────
  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => { setDebouncedSearch(invSearch); setInvPage(0); }, 380);
    return () => { if (searchTimer.current) clearTimeout(searchTimer.current); };
  }, [invSearch]);

  useEffect(() => { setCtxValues({}); }, [subtipo]);

  // ── Fetch inventario ──────────────────────────────────────────────────
  const fetchInventory = useCallback(async (page = 0) => {
    if (!selectedHubId) return;
    setLoadingInv(true);
    try {
      const params = new URLSearchParams({
        tenantId: String(TENANT_ID), hubId: String(selectedHubId),
        projectId: String(PROJECT_ID), page: String(page), size: String(PAGE_SIZE),
        ...(selectedSubHubId ? { subHubId: String(selectedSubHubId) } : {}),
        ...(filterType !== "ALL"   ? { productType: filterType }        : {}),
        ...(debouncedSearch.trim() ? { search: debouncedSearch.trim() } : {}),
      });
      const res = await fetch(`${API_URL}/api/hub-inventory?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const content: HubInventoryItem[] = data.data.content ?? [];
      setInvRows(content);
      setInvTotal(data.data.page?.totalElements ?? content.length);
      setInvPages(data.data.page?.totalPages    ?? 1);
      setInvPage(page);
    } catch (e: any) { toast.error(`Error inventario: ${e.message}`); }
    finally { setLoadingInv(false); }
  }, [selectedHubId, selectedSubHubId, filterType, debouncedSearch, reloadTrig]);

  useEffect(() => { fetchInventory(0); }, [fetchInventory]);

  const setCtx = (k: string, v: string) => setCtxValues(p => ({ ...p, [k]: v }));

  const ctxMissing = (subtipo?.contextFields ?? [])
    .filter(f => f.required && !ctxValues[f.key]?.trim()).map(f => f.label);

  // ── Items / carrito ───────────────────────────────────────────────────
  const addMaterial = (inv: HubInventoryItem) => {
    if (lineItems.some(l => l.inventoryId === inv.id)) { toast.info("Ya agregado"); return; }
    if (tipoFlujo !== "ENTRADA" && inv.quantityAvailable <= 0) { toast.warning("Sin stock"); return; }
    setLineItems(p => [...p, { inventoryId: inv.id, itemId: inv.itemId, itemCode: inv.itemCode, description: inv.description, productType: inv.productType, supplySource: inv.supplySource, quantityAvailable: inv.quantityAvailable, quantity: 1, unitPrice: inv.averageCost ?? 0, _rawQty: "1", serials: [] }]);
    toast.success(`${inv.itemCode} agregado`);
  };

  const openEquipo = (inv: HubInventoryItem) => {
    if (lineItems.some(l => l.inventoryId === inv.id)) { toast.info("Ya agregado"); return; }
    setAddEquipoItem(inv); setAddEquipoCant("1"); setAddEquipoOpen(true);
  };

  const confirmEquipo = () => {
    if (!addEquipoItem) return;
    const cant = Math.max(1, parseInt(addEquipoCant, 10) || 1);
    setLineItems(p => [...p, { inventoryId: addEquipoItem.id, itemId: addEquipoItem.itemId, itemCode: addEquipoItem.itemCode, description: addEquipoItem.description, productType: "EQUIPMENT", supplySource: addEquipoItem.supplySource, quantityAvailable: addEquipoItem.quantityAvailable, quantity: cant, unitPrice: addEquipoItem.averageCost ?? 0, _rawQty: String(cant), serials: [] }]);
    setAddEquipoOpen(false);
    toast.success(`${addEquipoItem.itemCode} — ${cant} ud. listas`);
  };

  const removeItem  = (id: number) => setLineItems(p => p.filter(i => i.inventoryId !== id));
  const updateQty   = (id: number, raw: string) => { const v = parseInt(raw, 10); setLineItems(p => p.map(i => i.inventoryId === id ? { ...i, quantity: isNaN(v) ? 0 : Math.max(0, v), _rawQty: raw } : i)); };
  const updatePrice = (id: number, raw: string) => { const v = parseFloat(raw);   setLineItems(p => p.map(i => i.inventoryId === id ? { ...i, unitPrice: isNaN(v) ? 0 : v } : i)); };

  // ── Pistoleo ──────────────────────────────────────────────────────────
  const openPistoleo = (item: KardexLineItem) => {
    setPistoleoItem(item); setSerialActual({}); setCamposError({});
    setSeriales(item.serials ? [...item.serials] : []);
    setPistoleoOpen(true);
  };

  const validarCampo = (field: string, value: string) => {
    if (!value.trim()) return "";
    const r = VALIDACIONES[field];
    return r && !r.regex.test(value.trim()) ? r.mensaje : "";
  };

  const checkAutoSave = useCallback((ns: Partial<EquipoSerial>, tipo: EquipoTipo, totalReq: number, list: EquipoSerial[]) => {
    if (!autoGuardar) return;
    const campos = CAMPOS_EQUIPO[tipo];
    if (!campos.every(c => !!(ns as any)[c.field]?.trim())) return;
    if (campos.some(c => !!validarCampo(c.field, (ns as any)[c.field] ?? ""))) return;
    const nueva = [...list, { ...ns } as EquipoSerial];
    setSeriales(nueva); setSerialActual({}); setCamposError({});
    if (pistoleoItem && nueva.length >= totalReq) saveSeriales(nueva);
  }, [autoGuardar, pistoleoItem]);

  const handleCampoChange = (field: string, value: string, tipo: EquipoTipo, totalReq: number) => {
    const u = { ...serialActual, [field]: value };
    setSerialActual(u);
    setCamposError(p => ({ ...p, [field]: VALIDACIONES[field] && value.trim() ? validarCampo(field, value) : "" }));
    checkAutoSave(u, tipo, totalReq, serialesCap);
  };

  const addSerialManual = () => {
    if (!pistoleoItem) return;
    const tipo = getEquipoTipo(pistoleoItem.description);
    const campos = CAMPOS_EQUIPO[tipo];
    const errs: Record<string, string> = {};
    let err = false;
    campos.forEach(c => {
      const v = (serialActual as any)[c.field] ?? "";
      if (!v.trim()) { errs[c.field] = `${c.label} requerido`; err = true; }
      else { const e = validarCampo(c.field, v); if (e) { errs[c.field] = e; err = true; } }
    });
    if (err) { setCamposError(errs); return; }
    setSeriales(p => [...p, { ...serialActual } as EquipoSerial]);
    setSerialActual({}); setCamposError({});
  };

  const saveSeriales = (lista: EquipoSerial[]) => {
    if (!pistoleoItem) return;
    setLineItems(p => p.map(i => i.inventoryId === pistoleoItem.inventoryId ? { ...i, serials: lista, quantity: lista.length, _rawQty: String(lista.length) } : i));
    setPistoleoOpen(false);
  };

  // ── Validaciones ──────────────────────────────────────────────────────
  const validationErrors: string[] = [
    ...ctxMissing.map(f => `Requerido: ${f}`),
    ...(lineItems.length === 0 ? ["Agrega al menos un ítem"] : []),
    ...lineItems.filter(i => i.quantity === 0).map(i => `${i.itemCode}: cantidad 0`),
    ...lineItems.filter(i => i.productType === "EQUIPMENT" && (i.serials?.length ?? 0) === 0).map(i => `${i.itemCode}: sin seriales`),
    ...(tipoFlujo !== "ENTRADA" ? lineItems.filter(i => i.productType !== "EQUIPMENT" && i.quantity > i.quantityAvailable).map(i => `${i.itemCode}: supera stock (${i.quantityAvailable})`) : []),
  ];
  const canSubmit = !!subtipo && validationErrors.length === 0;

  // ─────────────────────────────────────────────────────────────────────
  // BUILDERS DE PAYLOAD
  // ─────────────────────────────────────────────────────────────────────

  /** POST /api/movements-headers */
  const buildHeaderPayload = () => {
    const guiaRemision = ctxValues.guiaIngreso ?? ctxValues.guiaDespacho ?? ctxValues.guia ?? null;
    const movementDate = ctxValues.fechaRecepcion ?? ctxValues.fechaMovimiento ?? dayjs().format("YYYY-MM-DD");
    return {
      tenantId:    TENANT_ID,
      hubId:       selectedHubId,
      projectId:   PROJECT_ID,
      createdBy:   USER_ID,
      movementType: FLUJO_TO_MOVEMENT_TYPE[tipoFlujo!],
      subtype:     subtipo!.value,
      guiaRemision,
      ordenCompra:         ctxValues.ordenCompra         ?? null,
      movementDate,
      receptionDate:       movementDate,
      // Almacenes: el backend espera strings con el nombre (según KardexMovementHeaderRequestDto)
      almacenOrigen:       hubs.find(h => String(h.id) === ctxValues.almacenOrigenId)?.name  ?? ctxValues.almacenOrigenId  ?? null,
      subAlmacenOrigen:    subHubsActivos.find(s => String(s.id) === ctxValues.subAlmOrigenId)?.name ?? ctxValues.subAlmOrigenId  ?? null,
      almacenDestino:      hubs.find(h => String(h.id) === ctxValues.almacenDestinoId)?.name ?? ctxValues.almacenDestinoId ?? null,
      subAlmacenDestino:   subHubsActivos.find(s => String(s.id) === ctxValues.subAlmDestinoId)?.name ?? ctxValues.subAlmDestinoId ?? null,
      // Entidades
      proveedor:           supplySources.find(s => String(s.id) === ctxValues.proveedorId)?.name ?? ctxValues.proveedorId ?? null,
      cliente:             clientes.find(c => String(c.id) === (ctxValues.clienteId ?? ctxValues.clienteDestinoId))?.razonSocial ?? null,
      documentType:        null,
      documentNumber:      null,
      notes:               notes || subtipo!.label,
    };
  };

  /**
   * POST /api/hub-inventory/kardex-batch
   * Requiere el headerId ya creado.
   * movementType: ENTRY | EXIT | TRANSFER
   */
  const buildKardexPayload = (headerId: number) => ({
    headerId,
    movements: lineItems.flatMap(item => {
      const base = {
        tenantId:    TENANT_ID,
        hubId:       selectedHubId,
        projectId:   PROJECT_ID,
        createdBy:   USER_ID,
        itemId:      item.itemId,
        inventoryId: item.inventoryId,
        productType: item.productType,
        movementType: FLUJO_TO_MOVEMENT_TYPE[tipoFlujo!],
        supplySource: item.supplySource,
        supplySourceEntityId: 1,
        unitPrice:   item.unitPrice,
        sourceType:  "LOCAL_MOVEMENT",
        sourceId:    headerId,
        notes:       notes || subtipo!.label,
      };
      if (item.productType === "EQUIPMENT") {
        return (item.serials ?? []).map(s => ({
          ...base,
          quantity:      1,
          serialNumber:  s.serialNumber,
          macAddress:    s.mac    ?? null,
          mtaMacAddress: s.mtaMac ?? null,
          unitAddress:   s.ua     ?? null,
        }));
      }
      return [{ ...base, quantity: item.quantity }];
    }),
  });

  /**
   * POST /api/hub-inventory/inventory-kardex-batch
   * Actualiza hub_inventory (quantity_available) y registra equipment_units.
   * Usa KardexInventoryBatchRequestDto — NO tiene supplyRequestId.
   * Solo se llama si hay equipos pistoliados (equipment_units) o materiales
   * que necesiten actualizar stock por fuera del kardex-batch.
   *
   * InventoryLineDto.supplyRequestItemId es @NotNull en el DTO pero este
   * endpoint no lo usa para buscar en supply_request_items — se envía 0.
   */
  const buildInventoryKardexPayload = () => ({
    createdBy:   USER_ID,
    movementType: FLUJO_TO_MOVEMENT_TYPE[tipoFlujo!],
    inventoryLines: lineItems.map(item => ({
      inventoryId:         item.inventoryId,
      itemId:              item.itemId,
      supplyRequestItemId: 0,   // no aplica — este endpoint no busca supply_request_items
      productType:         item.productType,
      quantityDelivered:   item.productType === "EQUIPMENT"
                             ? (item.serials?.length ?? 0)
                             : item.quantity,
      unitPrice:           item.unitPrice,
    })),
    // Solo enviar equipmentUnits si hay equipos pistoliados
    equipmentUnits: lineItems
      .filter(i => i.productType === "EQUIPMENT" && (i.serials?.length ?? 0) > 0)
      .flatMap(item =>
        (item.serials ?? []).map(s => ({
          inventoryId:         item.inventoryId,
          itemId:              item.itemId,
          tenantId:            TENANT_ID,
          hubId:               selectedHubId,
          serialNumber:        s.serialNumber,
          macAddress:          s.mac    ?? null,
          mtaMacAddress:       s.mtaMac ?? null,
          ethMacAddress:       null,
          supplySource:        item.supplySource,
          supplySourceEntityId: 1,
          entryDate:           dayjs().format("YYYY-MM-DD"),
          createdBy:           USER_ID,
        }))
      ),
  });

  // ─────────────────────────────────────────────────────────────────────
  // SUBMIT — flujo en 3 pasos con pipeline visual
  // ─────────────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    if (!canSubmit || !subtipo) return;

    const steps: PipelineStep[] = [
      { id: "header",    label: "Registrar cabecera del movimiento",       status: "pending" },
      { id: "kardex",    label: "Registrar kardex y actualizar stock",      status: "pending" },
      { id: "inventory", label: "Actualizar inventario del hub",            status: "pending" },
    ];
    setPipelineSteps([...steps]);
    setPipelineOpen(true);

    const updateStep = (id: PipelineStep["id"], patch: Partial<PipelineStep>) => {
      setPipelineSteps(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s));
    };

    // ── PASO 1: Header ────────────────────────────────────────────────
    updateStep("header", { status: "loading" });
    let headerId: number;
    try {
      const res = await fetch(`${API_URL}/api/movements-headers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildHeaderPayload()),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.message ?? `HTTP ${res.status}`);
      }
      const data = await res.json();
      headerId = data.id ?? data.data?.id;
      if (!headerId) throw new Error("El backend no devolvió id del header");
      updateStep("header", { status: "done", detail: `Header #${headerId} creado` });
    } catch (e: any) {
      updateStep("header", { status: "error", detail: e.message });
      toast.error(`Error al crear header: ${e.message}`);
      return;
    }

    // ── PASO 2: Kardex ────────────────────────────────────────────────
    updateStep("kardex", { status: "loading" });
    const totalMov = lineItems.reduce((s, i) => s + (i.productType === "EQUIPMENT" ? (i.serials?.length ?? 0) : i.quantity), 0);
    try {
      const res = await fetch(`${API_URL}/api/hub-inventory/kardex-batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildKardexPayload(headerId)),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.message ?? `HTTP ${res.status}`);
      }
      updateStep("kardex", { status: "done", detail: `${totalMov} líneas registradas · stock actualizado` });
    } catch (e: any) {
      updateStep("kardex", { status: "error", detail: e.message });
      toast.error(`Error en kardex-batch: ${e.message}`);
      return;
    }

    // ── PASO 3: inventory-kardex-batch (SIEMPRE) ─────────────────────
    // Actualiza hub_inventory.quantity_available para todos los ítems.
    // equipmentUnits se llena con los seriales pistoliados; si no hay
    // equipos en el movimiento se envía array vacío — el endpoint lo acepta.
    updateStep("inventory", { status: "loading" });
    const totalSeriales = lineItems
      .filter(i => i.productType === "EQUIPMENT")
      .reduce((s, i) => s + (i.serials?.length ?? 0), 0);
    try {
      const res = await fetch(`${API_URL}/api/hub-inventory/inventory-kardex-batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildInventoryKardexPayload()),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.message ?? `HTTP ${res.status}`);
      }
      const detail = totalSeriales > 0
        ? `${lineItems.length} ítems · ${totalSeriales} serial${totalSeriales !== 1 ? "es" : ""} registrado${totalSeriales !== 1 ? "s" : ""}`
        : `${lineItems.length} ítems actualizados`;
      updateStep("inventory", { status: "done", detail });
    } catch (e: any) {
      updateStep("inventory", { status: "error", detail: e.message });
      toast.error(`Error al actualizar inventario: ${e.message}`);
      return;
    }

    // ── Éxito total ───────────────────────────────────────────────────
    await new Promise(r => setTimeout(r, 800));
    setPipelineOpen(false);
    setSuccessData({ headerId, movCount: totalMov, label: subtipo.label });
    setShowSuccess(true);
    setReloadTrig(t => t + 1);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const resetAll = () => {
    setTipoFlujo(null); setSubtipo(null); setCtxValues({}); setNotes("");
    setLineItems([]); setShowSuccess(false); setSuccessData(null);
  };

  // ── Derivados ─────────────────────────────────────────────────────────
  const flujoActivo     = tipoFlujo ? FLUJO_CFG[tipoFlujo] : null;
  const totalMovs       = lineItems.reduce((s, i) => s + (i.productType === "EQUIPMENT" ? (i.serials?.length ?? 0) : i.quantity), 0);
  const totalValue      = lineItems.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const subtiposActivos = SUBTIPOS.filter(st => tipoFlujo === "TRANSFERENCIA" ? st.flujo === "TRANSFERENCIA" : st.flujo === tipoFlujo);
  const step1Done = !!tipoFlujo;
  const step2Done = !!subtipo;
  const step3Done = !!subtipo && ctxMissing.length === 0;
  const step4Done = lineItems.length > 0;

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px", fontSize: "0.83rem", bgcolor: P.surface,
      "& fieldset": { borderColor: P.border },
      "&:hover fieldset": { borderColor: "#C9D1DA" },
      "&.Mui-focused fieldset": { borderColor: P.ink, borderWidth: 1.5 },
    },
  };

  // ─────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────

  return (
    <Box ref={topRef} sx={{ width: "100%", mx: "auto", py: { xs: 2, md: 3 }, display: "flex", flexDirection: "column", gap: 2.5 }}>

      {/* ══ PIPELINE DIALOG ══════════════════════════════════════════════ */}
      <PipelineDialog open={pipelineOpen} steps={pipelineSteps} />

      {/* ══ SELECTOR HUB ═════════════════════════════════════════════════ */}
      <Box sx={{
        borderRadius: "12px", overflow: "hidden",
        background: `linear-gradient(135deg, ${P.ink} 0%, ${P.inkSoft} 100%)`,
        border: `1px solid rgba(255,255,255,0.06)`,
      }}>
        <Box sx={{ px: 3, py: 2.2, display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}>
            <Box sx={{ width: 34, height: 34, borderRadius: "8px", bgcolor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <HubRounded sx={{ fontSize: 17, color: "rgba(255,255,255,0.65)" }} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: "0.82rem", fontWeight: 800, color: "white", lineHeight: 1 }}>Contexto del almacén</Typography>
              <Typography sx={{ fontSize: "0.63rem", color: "rgba(255,255,255,0.38)", mt: 0.3 }}>Hub y sub-hub activos</Typography>
            </Box>
          </Box>

          {loadingCats ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CircularProgress size={14} sx={{ color: "rgba(255,255,255,0.4)" }} />
              <Typography sx={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.35)" }}>Cargando catálogos...</Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
              <Box sx={{ minWidth: 210, maxWidth: 240, flex: "1 1 210px" }}>
                <SelectBase label="Hub" value={selectedHubId ? String(selectedHubId) : ""}
                  onChange={v => setSelectedHubId(Number(v))}
                  options={hubs.map(h => ({ label: h.name, value: String(h.id) }))} fullWidth />
              </Box>
              <Box sx={{ minWidth: 210, maxWidth: 240, flex: "1 1 210px" }}>
                <SelectBase label="Sub almacén" value={selectedSubHubId ? String(selectedSubHubId) : ""}
                  onChange={v => setSelectedSubHubId(Number(v))}
                  options={subHubsActivos.map(s => ({ label: s.name, value: String(s.id) }))}
                  fullWidth disabled={subHubsActivos.length === 0} />
              </Box>
              {selectedHubId > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, px: 1.4, py: 0.6, borderRadius: "8px", bgcolor: "rgba(22,163,74,0.12)", border: "1px solid rgba(22,163,74,0.25)", flexShrink: 0 }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#4ADE80" }} />
                  <Typography sx={{ fontSize: "0.66rem", fontWeight: 700, color: "#4ADE80" }}>
                    {hubs.find(h => h.id === selectedHubId)?.name}
                    {selectedSubHubId ? ` › ${subHubsActivos.find(s => s.id === selectedSubHubId)?.name}` : ""}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>

      {/* ══ SUCCESS ══════════════════════════════════════════════════════ */}
      <Fade in={showSuccess} timeout={500} unmountOnExit>
        <Box sx={{ borderRadius: "14px", border: "1px solid #A3E6C5", bgcolor: "#EDFAF3", p: { xs: 4, md: 6 }, textAlign: "center", position: "relative", overflow: "hidden" }}>
          <Box sx={{ position: "absolute", top: -50, right: -50, width: 180, height: 180, borderRadius: "50%", bgcolor: "rgba(22,163,74,0.05)" }} />
          <Box sx={{ width: 72, height: 72, borderRadius: "50%", bgcolor: "#16A34A", mx: "auto", mb: 3, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 10px rgba(22,163,74,0.1), 0 0 0 20px rgba(22,163,74,0.05)" }}>
            <DoneAllRounded sx={{ fontSize: 36, color: "white" }} />
          </Box>
          <Typography sx={{ fontSize: "1.3rem", fontWeight: 800, color: "#0A4C2B", mb: 0.5 }}>Movimiento registrado exitosamente</Typography>
          <Typography sx={{ fontSize: "0.85rem", color: P.muted, mb: 4, maxWidth: 420, mx: "auto" }}>
            Se procesaron <strong>{successData?.movCount}</strong> movimientos de tipo <strong>{successData?.label}</strong>.{" "}
            Cabecera <strong>#{successData?.headerId}</strong>.
          </Typography>
          <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center", flexWrap: "wrap", mb: 4 }}>
            {[
              { label: "Header ID",   value: `#${successData?.headerId}`,  color: P.ink },
              { label: "Tipo",        value: tipoFlujo ?? "—",             color: flujoActivo?.color ?? P.muted },
              { label: "Movimientos", value: String(successData?.movCount),color: "#16A34A" },
              { label: "Ítems",       value: String(lineItems.length),     color: "#1E40AF" },
            ].map(c => (
              <Box key={c.label} sx={{ px: 2.5, py: 1.6, borderRadius: "10px", border: "1px solid #A3E6C5", bgcolor: "white", minWidth: 96, textAlign: "center" }}>
                <Typography sx={{ fontSize: "1rem", fontWeight: 800, color: c.color, lineHeight: 1 }}>{c.value}</Typography>
                <Typography sx={{ fontSize: "0.62rem", color: P.faint, mt: 0.4, fontWeight: 600 }}>{c.label}</Typography>
              </Box>
            ))}
          </Box>
          <ButtonBase label="Nuevo movimiento" startIcon={<SwapHorizRounded />} onClick={resetAll}
            sx={{ px: 3, py: 1, fontWeight: 700, borderRadius: "8px" }} />
        </Box>
      </Fade>

      <Fade in={!showSuccess} timeout={350} unmountOnExit>
        <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start", width: "100%" }}>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>

            {/* ── STEPPER ── */}
            <Box sx={{ borderRadius: "12px", border: `1px solid ${P.border}`, p: "14px 20px", bgcolor: P.surface }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1.5 }, justifyContent: "space-between" }}>
                {[
                  { n: 1, label: "Tipo de flujo",  done: step1Done, active: !step1Done },
                  { n: 2, label: "Subtipo",         done: step2Done, active: step1Done && !step2Done },
                  { n: 3, label: "Datos doc.",      done: step3Done, active: step2Done && !step3Done },
                  { n: 4, label: "Productos",       done: step4Done, active: step3Done && !step4Done },
                  { n: 5, label: "Confirmar",       done: false,     active: step4Done && canSubmit },
                ].map((s, i, arr) => (
                  <div key={`${i}-${s.label ?? ""}`}>
                    <StepBadge key={s.n} n={s.n} label={s.label} done={s.done} active={s.active} />
                    {i < arr.length - 1 && (
                      <Box key={`line-${i}`} sx={{ flex: 1, height: "1px", bgcolor: s.done ? "#16A34A" : P.border, transition: "background 0.4s", mx: 0.5 }} />
                    )}
                  </div>
                ))}
              </Box>
            </Box>

            {/* ══ PASO 1 — TIPO ════════════════════════════════════════ */}
            <Box sx={{ borderRadius: "12px", border: `1px solid ${P.border}`, bgcolor: P.surface, p: 3 }}>
              <SectionHeader n="01" label="Tipo de movimiento" sub="Ingreso, egreso o transferencia de stock" done={step1Done} />
              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                {(["ENTRADA", "SALIDA"] as TipoFlujo[]).map(tipo => {
                  const cfg = FLUJO_CFG[tipo];
                  const IconComp = cfg.Icon;
                  const active = tipoFlujo === tipo;
                  return (
                    <Box key={tipo} onClick={() => { setTipoFlujo(tipo); setSubtipo(null); setLineItems([]); }}
                      sx={{
                        flex: "1 1 160px", p: 2, borderRadius: "10px", cursor: "pointer", transition: "all 0.18s",
                        bgcolor: active ? P.alt : "#FAFBFC",
                        border: `1.5px solid ${active ? P.ink : P.border}`,
                        boxShadow: active ? "0 2px 12px rgba(0,0,0,0.07)" : "none",
                        transform: active ? "translateY(-1px)" : "none",
                        "&:hover": { border: `1.5px solid #C9D1DA`, transform: "translateY(-1px)" },
                      }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box sx={{ width: 36, height: 36, borderRadius: "8px", bgcolor: active ? P.ink : P.alt, color: active ? "white" : P.muted, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.18s" }}>
                          <IconComp sx={{ fontSize: 18 }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontSize: "0.83rem", fontWeight: 800, color: active ? P.ink : "#334155", lineHeight: 1 }}>{cfg.label}</Typography>
                          <Typography sx={{ fontSize: "0.63rem", color: P.faint, mt: 0.3 }}>{cfg.desc}</Typography>
                        </Box>
                        {active && <CheckCircleRounded sx={{ fontSize: 16, color: cfg.dot }} />}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>

            {/* ══ PASO 2 — SUBTIPO ═════════════════════════════════════ */}
            <Collapse in={!!tipoFlujo} timeout={300} unmountOnExit>
              <Box sx={{ borderRadius: "12px", border: `1px solid ${P.border}`, bgcolor: P.surface, p: 3 }}>
                <SectionHeader n="02" label="Subtipo de movimiento" sub={`Motivo de la ${tipoFlujo?.toLowerCase() ?? ""}`} done={step2Done} />
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {subtiposActivos.map(st => {
                    const active = subtipo?.value === st.value;
                    return (
                      <Box key={st.value} onClick={() => setSubtipo(st)}
                        sx={{
                          flex: "1 1 175px", p: 1.8, borderRadius: "10px", cursor: "pointer", transition: "all 0.18s",
                          bgcolor: active ? P.alt : "#FAFBFC",
                          border: `1.5px solid ${active ? P.ink : P.border}`,
                          boxShadow: active ? "0 2px 10px rgba(0,0,0,0.06)" : "none",
                          transform: active ? "translateY(-1px)" : "none",
                          "&:hover": { border: `1.5px solid #C9D1DA`, transform: "translateY(-1px)" },
                        }}>
                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2 }}>
                          <Box sx={{ width: 30, height: 30, borderRadius: "7px", flexShrink: 0, bgcolor: active ? P.ink : P.alt, color: active ? "white" : P.muted, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.18s" }}>
                            {st.icon}
                          </Box>
                          <Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: active ? P.ink : "#334155", lineHeight: 1.2 }}>{st.label}</Typography>
                              {active && <CheckCircleRounded sx={{ fontSize: 12, color: "#16A34A" }} />}
                            </Box>
                            <Typography sx={{ fontSize: "0.63rem", color: P.faint, mt: 0.3, lineHeight: 1.4 }}>{st.description}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Collapse>

            {/* ══ PASO 3 — DATOS DOC ═══════════════════════════════════ */}
            <Collapse in={!!subtipo} timeout={300} unmountOnExit>
              <Box sx={{ borderRadius: "12px", border: `1px solid ${P.border}`, bgcolor: P.surface, p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2.5 }}>
                  <Box sx={{ flex: 1 }}>
                    <SectionHeader n="03" label="Información del documento" sub={`Datos requeridos para ${subtipo?.label ?? ""}`} done={step3Done} />
                  </Box>
                  <Chip size="small" label={step3Done ? "Completo" : `${ctxMissing.length} pendiente${ctxMissing.length !== 1 ? "s" : ""}`}
                    sx={{ fontWeight: 700, fontSize: "0.65rem", bgcolor: step3Done ? "#EDFAF3" : "#FFFBEB", color: step3Done ? "#0A6B3B" : "#92400E", border: `1px solid ${step3Done ? "#A3E6C5" : "#FCD34D"}` }} />
                </Box>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  {(subtipo?.contextFields ?? []).map(field => {
                    const val     = ctxValues[field.key] ?? "";
                    const isEmpty = field.required && !val.trim();
                    const isDone  = val.trim().length > 0;
                    const dynOpts = field.type === "select-dynamic" ? getDynOpts(field.dynamicKey) : [];

                    return (
                      <Box key={field.key} sx={{ flex: "1 1 196px" }}>
                        <Typography sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.7, fontSize: "0.68rem", fontWeight: 700, color: isEmpty ? "#92400E" : P.muted }}>
                          {field.icon}{field.label}
                          {field.required && !isDone && <Typography component="span" sx={{ color: "#DC2626", fontSize: "0.75rem" }}>*</Typography>}
                          {isDone && <CheckCircleRounded sx={{ fontSize: 11, color: "#16A34A" }} />}
                        </Typography>
                        {field.type === "date" ? (
                          <TextField type="date" size="small" fullWidth value={val} onChange={e => setCtx(field.key, e.target.value)} InputLabelProps={{ shrink: true }}
                            sx={{ ...inputSx, "& .MuiOutlinedInput-root": { ...inputSx["& .MuiOutlinedInput-root"], ...(isEmpty && { "& fieldset": { borderColor: "#FCD34D", borderWidth: 1.5 } }), ...(isDone && { "& fieldset": { borderColor: "#A3E6C5", borderWidth: 1.5 } }) } }} />
                        ) : field.type === "select-dynamic" ? (
                          dynOpts.length === 0 ? (
                            <Box sx={{ p: 1, borderRadius: "8px", border: `1px dashed ${P.border}`, display: "flex", alignItems: "center", gap: 1 }}>
                              <CircularProgress size={12} />
                              <Typography sx={{ fontSize: "0.7rem", color: P.faint }}>Cargando...</Typography>
                            </Box>
                          ) : (
                            <SelectBase size="small" label={field.label} value={val || ""}
                              onChange={v => setCtx(field.key, String(v))}
                              options={dynOpts} fullWidth />
                          )
                        ) : (
                          <TextField size="small" fullWidth placeholder={field.placeholder} value={val}
                            onChange={e => setCtx(field.key, e.target.value)}
                            helperText={field.helperText}
                            FormHelperTextProps={{ sx: { fontSize: "0.63rem", color: P.faint } }}
                            sx={{ ...inputSx, "& .MuiOutlinedInput-root": { ...inputSx["& .MuiOutlinedInput-root"], ...(isEmpty && { "& fieldset": { borderColor: "#FCD34D", borderWidth: 1.5 } }), ...(isDone && { "& fieldset": { borderColor: "#A3E6C5", borderWidth: 1.5 } }) } }} />
                        )}
                      </Box>
                    );
                  })}

                  <Box sx={{ flex: "2 1 280px" }}>
                    <Typography sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.7, fontSize: "0.68rem", fontWeight: 700, color: P.muted }}>
                      <ReceiptLongRounded sx={{ fontSize: 14 }} />Notas adicionales
                    </Typography>
                    <TextField size="small" fullWidth placeholder="Observaciones del movimiento..." value={notes}
                      onChange={e => setNotes(e.target.value)} sx={inputSx} />
                  </Box>
                </Box>
              </Box>
            </Collapse>

            {/* ══ PASO 4 — INVENTARIO + CARRITO ════════════════════════ */}
            <Collapse in={!!subtipo} timeout={300} unmountOnExit>
              <Box sx={{ borderRadius: "12px", border: `1px solid ${P.border}`, bgcolor: P.surface, overflow: "hidden" }}>
                <Box sx={{ px: 3, pt: 3, pb: 2 }}>
                  <SectionHeader n="04" label="Selección de productos" sub="Busca y agrega ítems del inventario" done={step4Done} />
                </Box>
                <Divider sx={{ borderColor: P.border }} />

                <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" } }}>
                  {/* Inventario */}
                  <Box sx={{ flex: "0 0 420px", borderRight: { lg: `1px solid ${P.border}` }, p: 2.5, display: "flex", flexDirection: "column", gap: 1.5 }}>
                    <Typography sx={{ fontSize: "0.63rem", fontWeight: 700, color: P.faint, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      Inventario — {hubs.find(h => h.id === selectedHubId)?.name ?? "Hub"}
                      {selectedSubHubId ? ` › ${subHubsActivos.find(s => s.id === selectedSubHubId)?.name}` : ""}
                    </Typography>

                    <SelectBase label="Tipo de producto" size="small" value={filterType}
                      onChange={v => { setFilterType(String(v)); setInvPage(0); }}
                      options={[
                        { label: "Todos", value: "ALL" }, { label: "📦 Materiales", value: "MATERIAL" },
                        { label: "⚙️ Equipos", value: "EQUIPMENT" }, { label: "🔧 Herramientas", value: "TOOL" }, { label: "🦺 EPP", value: "EPP" },
                      ]} fullWidth />

                    <TextField size="small" placeholder="Buscar código o descripción..."
                      value={invSearch} onChange={e => setInvSearch(e.target.value)}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">{loadingInv ? <CircularProgress size={12} /> : <SearchRounded sx={{ fontSize: 14, color: P.faint }} />}</InputAdornment>,
                        endAdornment: invSearch ? <InputAdornment position="end"><IconButton size="small" onClick={() => setInvSearch("")}><CloseOutlined sx={{ fontSize: 12 }} /></IconButton></InputAdornment> : null,
                      }}
                      sx={inputSx} />

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography sx={{ fontSize: "0.65rem", color: P.faint }}>
                        {loadingInv ? "Cargando..." : `${invTotal} ítems · pág ${invPage + 1}/${Math.max(invPages, 1)}`}
                      </Typography>
                      <IconButton size="small" onClick={() => setReloadTrig(t => t + 1)} disabled={loadingInv}
                        sx={{ width: 26, height: 26, border: `1px solid ${P.border}`, borderRadius: "6px" }}>
                        <RefreshRounded sx={{ fontSize: 13, color: P.faint }} />
                      </IconButton>
                    </Box>

                    <Box sx={{ flex: 1, overflowY: "auto", maxHeight: 380, display: "flex", flexDirection: "column", gap: 0.5,
                      "&::-webkit-scrollbar": { width: 4 }, "&::-webkit-scrollbar-thumb": { bgcolor: P.border, borderRadius: 2 } }}>
                      {loadingInv ? (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}><CircularProgress size={26} /></Box>
                      ) : invRows.length === 0 ? (
                        <Box sx={{ py: 6, textAlign: "center" }}>
                          <Inventory2Rounded sx={{ fontSize: 30, color: P.border, mb: 1 }} />
                          <Typography sx={{ fontSize: "0.72rem", color: P.faint }}>Sin resultados</Typography>
                        </Box>
                      ) : invRows.map(inv => {
                        const cfg = PRODUCT_CFG[inv.productType];
                        const added = lineItems.some(l => l.inventoryId === inv.id);
                        const isEquip = inv.productType === "EQUIPMENT";
                        const sinStock = inv.quantityAvailable <= 0;
                        const needStock = tipoFlujo !== "ENTRADA";
                        const stockLow = inv.quantityAvailable > 0 && inv.quantityAvailable <= inv.minimumStock;

                        return (
                          <Box key={inv.id} sx={{
                            mx: 0.5, px: 1.5, py: 1.2, borderRadius: "8px",
                            border: `1px solid ${added ? cfg.border : P.border}`,
                            bgcolor: added ? cfg.bg : P.surface,
                            opacity: sinStock && needStock ? 0.4 : 1,
                            transition: "all 0.12s",
                            display: "flex", alignItems: "center", gap: 1.2,
                            "&:hover": { bgcolor: added ? cfg.bg : P.alt, borderColor: cfg.border },
                          }}>
                            <Box sx={{ width: 28, height: 28, borderRadius: "6px", flexShrink: 0, bgcolor: cfg.bg, border: `1px solid ${cfg.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                              {cfg.emoji}
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                                <Typography sx={{ fontSize: "0.65rem", fontWeight: 800, color: cfg.color, bgcolor: cfg.bg, px: 0.8, py: 0.2, borderRadius: "4px", border: `1px solid ${cfg.border}` }}>
                                  {inv.itemCode}
                                </Typography>
                                <Typography sx={{ fontSize: "0.7rem", color: P.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 150 }}>
                                  {inv.description}
                                </Typography>
                              </Box>
                              <Typography sx={{ fontSize: "0.62rem", fontWeight: 700, color: sinStock ? P.faint : stockLow ? "#B45309" : "#16A34A", mt: 0.3 }}>
                                {inv.quantityAvailable} disponible{inv.quantityAvailable !== 1 ? "s" : ""}
                              </Typography>
                            </Box>
                            <Tooltip title={added ? "Ya agregado" : sinStock && needStock ? "Sin stock" : isEquip ? "Definir cantidad" : "Agregar"}>
                              <span>
                                <IconButton size="small"
                                  onClick={() => isEquip ? openEquipo(inv) : addMaterial(inv)}
                                  disabled={added || (sinStock && needStock)}
                                  sx={{
                                    width: 26, height: 26, flexShrink: 0, borderRadius: "6px",
                                    bgcolor: added ? "#EDFAF3" : P.ink, color: added ? "#16A34A" : "white",
                                    "&:hover": { bgcolor: added ? "#EDFAF3" : P.inkSoft },
                                    "&.Mui-disabled": { bgcolor: P.alt, color: P.faint },
                                  }}>
                                  {added ? <CheckCircleRounded sx={{ fontSize: 13 }} /> : <AddCircleOutlineRounded sx={{ fontSize: 13 }} />}
                                </IconButton>
                              </span>
                            </Tooltip>
                          </Box>
                        );
                      })}
                    </Box>

                    {invPages > 1 && (
                      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                        <ButtonBase label="←" size="small" disabled={invPage === 0} onClick={() => fetchInventory(invPage - 1)}
                          sx={{ minWidth: 32, px: 1, bgcolor: P.surface, color: P.muted, border: `1px solid ${P.border}` }} />
                        <Typography sx={{ alignSelf: "center", fontSize: "0.7rem", color: P.faint }}>{invPage + 1} / {invPages}</Typography>
                        <ButtonBase label="→" size="small" disabled={invPage + 1 >= invPages} onClick={() => fetchInventory(invPage + 1)}
                          sx={{ minWidth: 32, px: 1, bgcolor: P.surface, color: P.muted, border: `1px solid ${P.border}` }} />
                      </Box>
                    )}
                  </Box>

                  {/* Carrito */}
                  <Box sx={{ flex: 1, p: 2.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
                      <Typography sx={{ fontSize: "0.63rem", fontWeight: 700, color: P.faint, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        Ítems seleccionados
                        {lineItems.length > 0 && (
                          <Box component="span" sx={{ ml: 1, px: 0.8, py: 0.15, borderRadius: "4px", bgcolor: P.ink, color: "white", fontSize: "0.58rem", fontWeight: 800 }}>
                            {lineItems.length}
                          </Box>
                        )}
                      </Typography>
                      {lineItems.length > 0 && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer", px: 1, py: 0.4, borderRadius: "6px", "&:hover": { bgcolor: "#FEF2F2" } }}
                          onClick={() => setLineItems([])}>
                          <DeleteOutlineRounded sx={{ fontSize: 13, color: P.faint }} />
                          <Typography sx={{ fontSize: "0.66rem", color: P.faint }}>Limpiar</Typography>
                        </Box>
                      )}
                    </Box>

                    {lineItems.length === 0 ? (
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 7, border: `1.5px dashed ${P.border}`, borderRadius: "10px", bgcolor: P.alt }}>
                        <SwapHorizRounded sx={{ fontSize: 30, color: P.border, mb: 1 }} />
                        <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: P.faint }}>Sin ítems seleccionados</Typography>
                        <Typography sx={{ fontSize: "0.68rem", color: P.faint, mt: 0.3 }}>Agrega productos desde el inventario</Typography>
                      </Box>
                    ) : (
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, maxHeight: 430, overflowY: "auto",
                        "&::-webkit-scrollbar": { width: 3 }, "&::-webkit-scrollbar-thumb": { bgcolor: P.border, borderRadius: 2 } }}>
                        {lineItems.map(item => {
                          const cfg = PRODUCT_CFG[item.productType];
                          const isEquipo = item.productType === "EQUIPMENT";
                          const serialCount = item.serials?.length ?? 0;
                          const hasWarn = isEquipo && serialCount === 0;
                          const superaStock = tipoFlujo !== "ENTRADA" && !isEquipo && item.quantity > item.quantityAvailable;
                          const allOk = isEquipo ? serialCount === item.quantity && item.quantity > 0 : item.quantity > 0;

                          return (
                            <Fade in key={item.inventoryId} timeout={200}>
                              <Box sx={{
                                p: 1.8, borderRadius: "10px", transition: "all 0.18s",
                                border: `1.5px solid ${superaStock ? "#FBBFBF" : hasWarn ? "#FCD34D" : allOk ? "#A3E6C5" : P.border}`,
                                bgcolor: superaStock ? "#FEF2F2" : hasWarn ? "#FFFBEB" : allOk ? "#EDFAF3" : P.alt,
                              }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: superaStock ? "#DC2626" : hasWarn ? "#F59E0B" : allOk ? "#16A34A" : cfg.color, flexShrink: 0 }} />
                                  <Typography sx={{ fontSize: "0.65rem", fontWeight: 800, color: cfg.color, bgcolor: cfg.bg, px: 0.8, py: 0.15, borderRadius: "4px", border: `1px solid ${cfg.border}` }}>
                                    {item.itemCode}
                                  </Typography>
                                  <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, flex: 1, color: "#334155", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {item.description}
                                  </Typography>
                                  <Typography sx={{ fontSize: "0.6rem", color: P.faint, flexShrink: 0 }}>disp: {item.quantityAvailable}</Typography>
                                  <IconButton size="small" onClick={() => removeItem(item.inventoryId)}
                                    sx={{ width: 20, height: 20, color: P.faint, "&:hover": { color: "#EF4444", bgcolor: "#FEF2F2" } }}>
                                    <CloseOutlined sx={{ fontSize: 12 }} />
                                  </IconButton>
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap", pl: 1.8 }}>
                                  {!isEquipo ? (
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                                      <Typography sx={{ fontSize: "0.66rem", color: P.faint }}>Cant.</Typography>
                                      <TextField type="number" size="small"
                                        value={item._rawQty ?? String(item.quantity)}
                                        onChange={e => updateQty(item.inventoryId, e.target.value)}
                                        onBlur={e => { const v = parseInt(e.target.value, 10); if (isNaN(v) || v < 1) updateQty(item.inventoryId, "1"); }}
                                        inputProps={{ min: 1, style: { textAlign: "center", fontWeight: 700, padding: "3px 4px", width: 40, fontSize: "0.8rem" } }}
                                        sx={{
                                          "& .MuiOutlinedInput-root": { borderRadius: "6px", height: 26, ...(superaStock && { "& fieldset": { borderColor: "#DC2626", borderWidth: 2 } }) },
                                          "& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button": { display: "none" },
                                          "& input[type=number]": { MozAppearance: "textfield" },
                                        }} />
                                    </Box>
                                  ) : (
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                                      <Typography sx={{ fontSize: "0.66rem", color: P.faint }}>Esperados:</Typography>
                                      <Typography sx={{ fontSize: "0.7rem", fontWeight: 800, color: "#1E40AF", bgcolor: "#EFF6FF", px: 0.8, py: 0.15, borderRadius: "4px" }}>{item.quantity}</Typography>
                                    </Box>
                                  )}

                                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                    <Typography sx={{ fontSize: "0.66rem", color: P.faint }}>S/</Typography>
                                    <TextField type="number" size="small"
                                      value={item.unitPrice === 0 ? "" : item.unitPrice}
                                      onChange={e => updatePrice(item.inventoryId, e.target.value)}
                                      placeholder="0.00"
                                      inputProps={{ min: 0, step: 0.01, style: { fontWeight: 700, padding: "3px 4px", width: 54, fontSize: "0.8rem" } }}
                                      sx={{
                                        "& .MuiOutlinedInput-root": { borderRadius: "6px", height: 26 },
                                        "& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button": { display: "none" },
                                        "& input[type=number]": { MozAppearance: "textfield" },
                                      }} />
                                  </Box>

                                  {isEquipo && (
                                    <Box onClick={() => openPistoleo(item)}
                                      sx={{
                                        display: "flex", alignItems: "center", gap: 0.6, px: 1.1, py: 0.4, borderRadius: "6px", cursor: "pointer", transition: "all 0.12s",
                                        bgcolor: allOk ? "#EDFAF3" : serialCount > 0 ? "#FFFBEB" : P.alt,
                                        border: `1px solid ${allOk ? "#A3E6C5" : serialCount > 0 ? "#FCD34D" : P.border}`,
                                        "&:hover": { bgcolor: "#EDFAF3", borderColor: "#A3E6C5" },
                                      }}>
                                      <QrCodeScannerOutlined sx={{ fontSize: 13, color: allOk ? "#16A34A" : serialCount > 0 ? "#92400E" : P.faint }} />
                                      <Typography sx={{ fontSize: "0.68rem", fontWeight: 700, color: allOk ? "#16A34A" : serialCount > 0 ? "#92400E" : P.muted }}>
                                        {allOk ? `${serialCount} seriales ✓` : serialCount > 0 ? `${serialCount}/${item.quantity} pistol.` : "Pistolear"}
                                      </Typography>
                                    </Box>
                                  )}
                                </Box>

                                {superaStock && (
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.7, mt: 1, px: 1.2, py: 0.5, bgcolor: "#FEF2F2", borderRadius: "6px", border: "1px solid #FBBFBF" }}>
                                    <WarningAmberRounded sx={{ fontSize: 12, color: "#DC2626" }} />
                                    <Typography sx={{ fontSize: "0.63rem", color: "#DC2626", fontWeight: 600 }}>Supera stock ({item.quantityAvailable} disponibles)</Typography>
                                  </Box>
                                )}
                                {hasWarn && (
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.7, mt: 1, px: 1.2, py: 0.5, bgcolor: "#FFFBEB", borderRadius: "6px", border: "1px solid #FCD34D" }}>
                                    <WarningAmberRounded sx={{ fontSize: 12, color: "#B45309" }} />
                                    <Typography sx={{ fontSize: "0.63rem", color: "#B45309", fontWeight: 600 }}>Registra seriales antes de confirmar</Typography>
                                  </Box>
                                )}
                                {isEquipo && serialCount > 0 && (
                                  <Box sx={{ mt: 1, pl: 1.8, display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                                    {item.serials?.map((s, idx) => (
                                      <Typography key={idx} sx={{ fontSize: "0.6rem", fontWeight: 700, color: "#16A34A", fontFamily: "monospace", bgcolor: "#EDFAF3", px: 0.8, py: 0.15, borderRadius: "4px", border: "1px solid #A3E6C5" }}>
                                        {s.serialNumber}
                                      </Typography>
                                    ))}
                                  </Box>
                                )}
                              </Box>
                            </Fade>
                          );
                        })}
                      </Box>
                    )}

                    {lineItems.length > 0 && (
                      <Box sx={{ mt: 2, pt: 1.5, borderTop: `1px solid ${P.border}`, display: "flex", gap: 1.5, flexWrap: "wrap", alignItems: "center" }}>
                        {(["MATERIAL","TOOL","EQUIPMENT","EPP"] as ProductType[]).filter(t => lineItems.some(i => i.productType === t)).map(t => {
                          const cfg = PRODUCT_CFG[t];
                          return (
                            <Box key={t} sx={{ display: "flex", alignItems: "center", gap: 0.6, px: 1.1, py: 0.5, borderRadius: "6px", bgcolor: cfg.bg, border: `1px solid ${cfg.border}` }}>
                              <Typography sx={{ fontSize: "0.82rem", lineHeight: 1 }}>{cfg.emoji}</Typography>
                              <Typography sx={{ fontSize: "0.7rem", fontWeight: 800, color: cfg.color }}>{lineItems.filter(i => i.productType === t).length}</Typography>
                              <Typography sx={{ fontSize: "0.63rem", color: cfg.color, opacity: 0.75 }}>{cfg.label}</Typography>
                            </Box>
                          );
                        })}
                        {totalValue > 0 && (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, px: 1.1, py: 0.5, borderRadius: "6px", bgcolor: P.alt, border: `1px solid ${P.border}`, ml: "auto" }}>
                            <Typography sx={{ fontSize: "0.63rem", color: P.faint }}>Total est.:</Typography>
                            <Typography sx={{ fontSize: "0.76rem", fontWeight: 800, color: P.ink, fontFamily: "monospace" }}>S/ {totalValue.toFixed(2)}</Typography>
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Collapse>

            {/* ══ PASO 5 — CONFIRMAR ═══════════════════════════════════ */}
            <Collapse in={lineItems.length > 0} timeout={300} unmountOnExit>
              <Box sx={{
                borderRadius: "12px", overflow: "hidden",
                border: `1.5px solid ${canSubmit ? (flujoActivo?.border ?? P.border) : P.border}`,
                transition: "all 0.3s",
              }}>
                <Box sx={{ px: 3, py: 2.2, bgcolor: P.ink, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {flujoActivo && (
                      <Box sx={{ width: 36, height: 36, borderRadius: "8px", bgcolor: `${flujoActivo.color}22`, border: `1px solid ${flujoActivo.dot}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <flujoActivo.Icon sx={{ fontSize: 18, color: flujoActivo.dot }} />
                      </Box>
                    )}
                    <Box>
                      <Typography sx={{ fontSize: "0.87rem", fontWeight: 800, color: "white", lineHeight: 1 }}>Confirmar movimiento</Typography>
                      <Typography sx={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.38)", mt: 0.3 }}>
                        {tipoFlujo} · {subtipo?.label}
                        {ctxValues.guiaIngreso  && ` · ${ctxValues.guiaIngreso}`}
                        {ctxValues.guiaDespacho && ` · ${ctxValues.guiaDespacho}`}
                        {ctxValues.guia         && ` · ${ctxValues.guia}`}
                      </Typography>
                    </Box>
                  </Box>
                  {flujoActivo && (
                    <Box sx={{ px: 1.4, py: 0.6, borderRadius: "7px", bgcolor: `${flujoActivo.color}18`, border: `1px solid ${flujoActivo.dot}35` }}>
                      <Typography sx={{ fontSize: "0.7rem", fontWeight: 800, color: flujoActivo.dot }}>{totalMovs} mov.</Typography>
                    </Box>
                  )}
                </Box>

                <Box sx={{ p: 3, bgcolor: P.surface }}>
                  {/* KPIs */}
                  <Box sx={{ display: "flex", gap: 1.5, mb: 3, flexWrap: "wrap" }}>
                    {[
                      { label: "Ítems",          value: lineItems.length,    color: "#1E40AF" },
                      { label: "Movimientos",    value: totalMovs,            color: flujoActivo?.dot ?? P.ink },
                      { label: "Equipos pistol.",value: `${lineItems.filter(i => i.productType === "EQUIPMENT" && (i.serials?.length ?? 0) > 0).length}/${lineItems.filter(i => i.productType === "EQUIPMENT").length}`, color: "#16A34A" },
                      { label: "Valor est.",     value: totalValue > 0 ? `S/ ${totalValue.toFixed(2)}` : "—", color: P.muted },
                    ].map(kpi => (
                      <Box key={kpi.label} sx={{ flex: "1 1 88px", p: 1.8, borderRadius: "10px", border: `1px solid ${P.border}`, bgcolor: P.alt, textAlign: "center" }}>
                        <Typography sx={{ fontSize: "1rem", fontWeight: 800, color: kpi.color, lineHeight: 1 }}>{kpi.value}</Typography>
                        <Typography sx={{ fontSize: "0.62rem", color: P.faint, mt: 0.4 }}>{kpi.label}</Typography>
                      </Box>
                    ))}
                  </Box>

                  {validationErrors.length > 0 && (
                    <Box sx={{ p: 2, borderRadius: "8px", bgcolor: "#FFFBEB", border: "1px solid #FCD34D", mb: 2.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1 }}>
                        <WarningAmberRounded sx={{ fontSize: 15, color: "#92400E" }} />
                        <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "#92400E" }}>Pendientes antes de confirmar</Typography>
                      </Box>
                      {validationErrors.map((e, i) => (
                        <Typography key={i} sx={{ fontSize: "0.68rem", color: "#78350F", lineHeight: 1.7 }}>• {e}</Typography>
                      ))}
                    </Box>
                  )}

                  <Alert severity={tipoFlujo === "ENTRADA" ? "success" : tipoFlujo === "TRANSFERENCIA" ? "info" : "error"}
                    sx={{ borderRadius: "8px", mb: 3, fontSize: "0.78rem" }}>
                    Se registrarán <strong>{totalMovs} movimientos</strong> tipo{" "}
                    <strong>{FLUJO_TO_MOVEMENT_TYPE[tipoFlujo!]}</strong>.{" "}
                    {tipoFlujo === "ENTRADA" ? "El stock se incrementará." : tipoFlujo === "TRANSFERENCIA" ? "Se moverá entre almacenes." : "El stock se descontará."}
                    {" "}Esta acción es <strong>irreversible</strong>.
                  </Alert>

                  <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
                    <ButtonBase label="Reiniciar" onClick={resetAll}
                      sx={{ bgcolor: P.surface, color: P.muted, border: `1px solid ${P.border}`, fontSize: "0.78rem" }} />
                    <ButtonBase
                      label={`Confirmar ${tipoFlujo?.toLowerCase() ?? ""}`}
                      startIcon={<SendRounded sx={{ fontSize: 15 }} />}
                      onClick={handleSubmit}
                      disabled={!canSubmit}
                      sx={{
                        px: 3, py: 1, fontWeight: 700, borderRadius: "8px", fontSize: "0.83rem",
                        bgcolor: canSubmit ? (flujoActivo?.dot ?? P.ink) : undefined,
                        "&:hover": { opacity: 0.88 },
                        transition: "all 0.18s",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Collapse>

          </Box>

          {/* ── Panel resumen lateral ─────────────────────────────────── */}
          <Box sx={{ width: 272, flexShrink: 0, display: { xs: "none", lg: "flex" }, flexDirection: "column", position: "sticky", top: 24, alignSelf: "flex-start" }}>
            <Box sx={{ borderRadius: "12px", border: `1px solid ${P.border}`, bgcolor: P.surface, overflow: "hidden" }}>
              <Box sx={{ px: 2.5, py: 2, bgcolor: P.ink, display: "flex", alignItems: "center", gap: 1.2 }}>
                <HistoryRounded sx={{ fontSize: 16, color: "rgba(255,255,255,0.4)" }} />
                <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: "white" }}>Resumen del movimiento</Typography>
              </Box>
              <Box sx={{ p: 2.5, display: "flex", flexDirection: "column", gap: 2 }}>
                {/* Tipo flujo */}
                <Box>
                  <Typography sx={{ fontSize: "0.58rem", fontWeight: 700, color: P.faint, letterSpacing: "0.08em", textTransform: "uppercase", mb: 0.8 }}>Tipo de movimiento</Typography>
                  {flujoActivo ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, p: 1.4, borderRadius: "8px", bgcolor: flujoActivo.bg, border: `1px solid ${flujoActivo.border}` }}>
                      <flujoActivo.Icon sx={{ fontSize: 18, color: flujoActivo.dot }} />
                      <Box>
                        <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: flujoActivo.color, lineHeight: 1 }}>{flujoActivo.label}</Typography>
                        <Typography sx={{ fontSize: "0.62rem", color: flujoActivo.color, opacity: 0.65, mt: 0.2 }}>{flujoActivo.desc}</Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ p: 1.4, borderRadius: "8px", bgcolor: P.alt, border: `1px dashed ${P.border}` }}>
                      <Typography sx={{ fontSize: "0.7rem", color: P.faint }}>Sin seleccionar</Typography>
                    </Box>
                  )}
                </Box>

                {subtipo && (
                  <Box>
                    <Typography sx={{ fontSize: "0.58rem", fontWeight: 700, color: P.faint, letterSpacing: "0.08em", textTransform: "uppercase", mb: 0.8 }}>Subtipo</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1.4, borderRadius: "8px", bgcolor: P.alt, border: `1px solid ${P.border}` }}>
                      <Box sx={{ color: P.muted }}>{subtipo.icon}</Box>
                      <Typography sx={{ fontSize: "0.76rem", fontWeight: 600, color: P.ink }}>{subtipo.label}</Typography>
                    </Box>
                  </Box>
                )}

                <Divider sx={{ borderColor: P.border }} />

                {/* KPIs ítems */}
                <Box>
                  <Typography sx={{ fontSize: "0.58rem", fontWeight: 700, color: P.faint, letterSpacing: "0.08em", textTransform: "uppercase", mb: 1 }}>Ítems del movimiento</Typography>
                  {[
                    { label: "Total ítems",      value: lineItems.length,  active: lineItems.length > 0 },
                    { label: "Movimientos",      value: totalMovs,          active: totalMovs > 0 },
                    { label: "Equipos c/serial", value: `${lineItems.filter(i => i.productType === "EQUIPMENT" && (i.serials?.length ?? 0) > 0).length}/${lineItems.filter(i => i.productType === "EQUIPMENT").length}`, active: lineItems.some(i => i.productType === "EQUIPMENT") },
                  ].map(k => (
                    <Box key={k.label} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 0.7, borderBottom: `1px solid ${P.border}` }}>
                      <Typography sx={{ fontSize: "0.68rem", color: P.faint }}>{k.label}</Typography>
                      <Typography sx={{ fontSize: "0.76rem", fontWeight: 700, color: k.active ? P.ink : P.faint }}>{k.value}</Typography>
                    </Box>
                  ))}
                  {totalValue > 0 && (
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 0.8, mt: 0.5 }}>
                      <Typography sx={{ fontSize: "0.68rem", color: P.faint }}>Valor estimado</Typography>
                      <Typography sx={{ fontSize: "0.8rem", fontWeight: 800, color: P.ink, fontFamily: "monospace" }}>S/ {totalValue.toFixed(2)}</Typography>
                    </Box>
                  )}
                </Box>

                {/* Lista de productos */}
                {lineItems.length > 0 && (
                  <>
                    <Divider sx={{ borderColor: P.border }} />
                    <Box>
                      <Typography sx={{ fontSize: "0.58rem", fontWeight: 700, color: P.faint, letterSpacing: "0.08em", textTransform: "uppercase", mb: 0.8 }}>Productos</Typography>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, maxHeight: 140, overflowY: "auto",
                        "&::-webkit-scrollbar": { width: 3 }, "&::-webkit-scrollbar-thumb": { bgcolor: P.border, borderRadius: 2 } }}>
                        {lineItems.map(item => {
                          const isEquipo = item.productType === "EQUIPMENT";
                          const sc = item.serials?.length ?? 0;
                          const ok = isEquipo ? sc === item.quantity : item.quantity > 0;
                          return (
                            <Box key={item.inventoryId} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              {ok ? <CheckCircleRounded sx={{ fontSize: 12, color: "#16A34A", flexShrink: 0 }} /> : <RadioButtonUncheckedOutlined sx={{ fontSize: 12, color: "#F59E0B", flexShrink: 0 }} />}
                              <Typography sx={{ fontSize: "0.66rem", color: P.muted, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.itemCode}</Typography>
                              <Typography sx={{ fontSize: "0.66rem", fontWeight: 700, color: PRODUCT_CFG[item.productType].color }}>{isEquipo ? sc : item.quantity}</Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Fade>

      {/* ══ DIALOG — CANTIDAD EQUIPOS ════════════════════════════════════ */}
      <Dialog open={addEquipoOpen} onClose={() => setAddEquipoOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: "14px" } }}>
        <Box sx={{ bgcolor: P.ink, px: 3, py: 2.2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{ bgcolor: P.inkSoft, p: 0.8, borderRadius: "7px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <ConstructionRounded sx={{ fontSize: 16, color: "rgba(255,255,255,0.65)" }} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: "0.83rem", fontWeight: 700, color: "white" }}>Agregar equipo</Typography>
              <Typography sx={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.38)" }}>{addEquipoItem?.itemCode} — {addEquipoItem?.description}</Typography>
            </Box>
          </Box>
          <IconButton size="small" onClick={() => setAddEquipoOpen(false)} sx={{ color: "rgba(255,255,255,0.3)" }}>
            <CloseOutlined fontSize="small" />
          </IconButton>
        </Box>
        <Box sx={{ p: 3 }}>
          {addEquipoItem && (
            <Alert severity="info" sx={{ borderRadius: "8px", mb: 2.5, fontSize: "0.76rem" }}>
              Stock disponible: <strong>{addEquipoItem.quantityAvailable}</strong> unidades
            </Alert>
          )}
          <Typography sx={{ fontSize: "0.83rem", fontWeight: 600, color: "#334155", mb: 1.5 }}>¿Cuántos equipos ingresar?</Typography>
          <TextField fullWidth autoFocus type="number" label="Cantidad de equipos"
            value={addEquipoCant} onChange={e => setAddEquipoCant(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") confirmEquipo(); }}
            inputProps={{ min: 1, style: { fontWeight: 800, fontSize: "1.4rem", textAlign: "center", padding: "12px 0" } }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", "& fieldset": { borderColor: P.ink, borderWidth: 2 } },
              "& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button": { display: "none" },
              "& input[type=number]": { MozAppearance: "textfield" },
            }} />
        </Box>
        <Box sx={{ px: 3, pb: 3, display: "flex", gap: 1, justifyContent: "flex-end" }}>
          <ButtonBase label="Cancelar" onClick={() => setAddEquipoOpen(false)}
            sx={{ bgcolor: P.surface, color: P.muted, border: `1px solid ${P.border}`, fontSize: "0.78rem" }} />
          <ButtonBase label={`Agregar ${addEquipoCant || "1"} equipo${parseInt(addEquipoCant) > 1 ? "s" : ""}`}
            startIcon={<QrCodeScannerOutlined sx={{ fontSize: 15 }} />} onClick={confirmEquipo}
            sx={{ px: 2.5, bgcolor: P.ink, color: "white", fontSize: "0.8rem", "&:hover": { bgcolor: P.inkSoft } }} />
        </Box>
      </Dialog>

      {/* ══ DIALOG — PISTOLEO ════════════════════════════════════════════ */}
      <Dialog open={pistoleoOpen} onClose={() => setPistoleoOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: "14px" } }}>
        <Box sx={{ bgcolor: P.ink, px: 3, py: 2.2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{ bgcolor: "#16A34A", p: 0.8, borderRadius: "7px" }}>
              <QrCodeScannerOutlined sx={{ fontSize: 16, color: "white" }} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: "0.83rem", fontWeight: 700, color: "white" }}>Registro de seriales</Typography>
              {pistoleoItem && (
                <Typography sx={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.38)" }}>
                  {pistoleoItem.itemCode} · {serialesCap.length}/{pistoleoItem.quantity} capturados
                </Typography>
              )}
            </Box>
          </Box>
          <IconButton onClick={() => setPistoleoOpen(false)} size="small" sx={{ color: "rgba(255,255,255,0.3)" }}>
            <CloseOutlined fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ p: 3 }}>
          {pistoleoItem && (() => {
            const tipo = getEquipoTipo(pistoleoItem.description);
            const campos = CAMPOS_EQUIPO[tipo];
            const totalReq = pistoleoItem.quantity;
            const totalCap = serialesCap.length;
            const pct = Math.min((totalCap / totalReq) * 100, 100);
            const todoComp = campos.every(c => !!(serialActual as any)[c.field]?.trim());

            return (
              <>
                {/* Progreso */}
                <Box sx={{ mb: 2.5, p: 2, borderRadius: "10px", bgcolor: P.alt, border: `1px solid ${P.border}` }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.2 }}>
                    <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155" }}>Progreso de captura</Typography>
                    <Box sx={{ px: 1.1, py: 0.3, borderRadius: "6px", bgcolor: totalCap === totalReq ? "#EDFAF3" : totalCap > 0 ? "#FFFBEB" : P.surface, border: `1px solid ${totalCap === totalReq ? "#A3E6C5" : totalCap > 0 ? "#FCD34D" : P.border}` }}>
                      <Typography sx={{ fontSize: "0.7rem", fontWeight: 800, color: totalCap === totalReq ? "#0A6B3B" : totalCap > 0 ? "#92400E" : P.faint }}>{totalCap} / {totalReq}</Typography>
                    </Box>
                  </Box>
                  <LinearProgress variant="determinate" value={pct}
                    sx={{ height: 5, borderRadius: 3, bgcolor: P.border, "& .MuiLinearProgress-bar": { bgcolor: totalCap === totalReq ? "#16A34A" : "#F59E0B", borderRadius: 3 } }} />
                  <Typography sx={{ fontSize: "0.62rem", color: P.faint, mt: 0.8 }}>Tipo: <strong>{tipo}</strong> · Campos: {campos.map(c => c.label).join(", ")}</Typography>
                </Box>

                {/* Auto guardar */}
                <Box sx={{ mb: 2.5, p: 1.6, borderRadius: "8px", bgcolor: autoGuardar ? "#EDFAF3" : P.alt, border: `1px solid ${autoGuardar ? "#A3E6C5" : P.border}`, transition: "all 0.2s" }}>
                  <FormControlLabel
                    control={<Switch checked={autoGuardar} onChange={e => setAutoGuardar(e.target.checked)} color="success" size="small" />}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                        <AutoAwesomeRounded sx={{ fontSize: 13, color: autoGuardar ? "#16A34A" : P.faint }} />
                        <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: autoGuardar ? "#0A4C2B" : P.faint }}>Guardar automáticamente al completar</Typography>
                      </Box>
                    }
                    sx={{ m: 0 }}
                  />
                </Box>

                {/* Campos */}
                <Stack spacing={1.8} sx={{ mb: 3 }}>
                  {campos.map(campo => {
                    const valor = (serialActual as any)[campo.field] ?? "";
                    const error = camposError[campo.field] ?? "";
                    const regla = VALIDACIONES[campo.field];
                    const esValido = regla ? regla.regex.test(valor.trim()) && valor.trim() !== "" : valor.trim() !== "";
                    const tieneErr = !!error && valor.trim() !== "";

                    return (
                      <Box key={campo.field}>
                        <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: P.muted, display: "flex", alignItems: "center", gap: 0.5, mb: 0.7 }}>
                          {campo.label} *
                          {esValido && <CheckCircleRounded sx={{ fontSize: 11, color: "#16A34A" }} />}
                        </Typography>
                        <TextField fullWidth size="small" placeholder={campo.placeholder} value={valor}
                          onChange={e => handleCampoChange(campo.field, e.target.value, tipo, totalReq)}
                          disabled={totalCap >= totalReq} error={tieneErr}
                          helperText={tieneErr ? error : esValido ? "✓ Válido" : regla ? `Ej: ${campo.placeholder}` : undefined}
                          FormHelperTextProps={{ sx: { color: tieneErr ? "error.main" : esValido ? "#16A34A" : P.faint, fontSize: "0.63rem" } }}
                          InputProps={campo.field === "serialNumber" ? {
                            startAdornment: <InputAdornment position="start"><QrCodeScannerOutlined sx={{ fontSize: 14, color: esValido ? "#16A34A" : P.faint }} /></InputAdornment>,
                          } : undefined}
                          sx={{
                            "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: "0.83rem",
                              ...(esValido && { "& fieldset": { borderColor: "#A3E6C5", borderWidth: 1.5 } }),
                              ...(tieneErr && { "& fieldset": { borderColor: "#FBBFBF", borderWidth: 1.5 } }),
                            }
                          }} />
                      </Box>
                    );
                  })}
                </Stack>

                {!autoGuardar && (
                  <ButtonBase fullWidth
                    label={totalCap >= totalReq ? "✓ Captura completa" : `Agregar serial ${totalCap + 1} de ${totalReq}`}
                    startIcon={<AddCircleOutlineRounded />}
                    onClick={addSerialManual}
                    disabled={!serialActual.serialNumber?.trim() || totalCap >= totalReq}
                    sx={{ mb: 2.5, bgcolor: P.ink, color: "white", "&:hover": { bgcolor: P.inkSoft } }}
                  />
                )}

                {autoGuardar && totalCap < totalReq && (
                  <Box sx={{ mb: 2.5, p: 1.4, borderRadius: "8px", textAlign: "center", bgcolor: todoComp ? "#EDFAF3" : P.alt, border: `1px solid ${todoComp ? "#A3E6C5" : P.border}`, transition: "all 0.2s" }}>
                    <Typography sx={{ fontSize: "0.7rem", fontWeight: 600, color: todoComp ? "#16A34A" : P.faint }}>
                      {todoComp ? "⚡ Guardando automáticamente..." : `Completa los campos para guardar serial ${totalCap + 1} de ${totalReq}`}
                    </Typography>
                  </Box>
                )}

                {serialesCap.length > 0 && (
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.2 }}>
                      <CheckCircleRounded sx={{ fontSize: 14, color: "#16A34A" }} />
                      <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155" }}>Registrados ({serialesCap.length})</Typography>
                    </Box>
                    <Stack spacing={0.5}>
                      {serialesCap.map((s, idx) => (
                        <Box key={idx} sx={{ px: 2, py: 1, bgcolor: P.alt, borderRadius: "8px", border: `1px solid ${P.border}`, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                          <Stack spacing={0.2}>
                            <Typography sx={{ fontSize: "0.63rem", fontWeight: 800, color: "#16A34A" }}>#{idx + 1}</Typography>
                            {s.serialNumber && <Typography sx={{ fontSize: "0.7rem", color: P.muted, fontFamily: "monospace" }}>SN: {s.serialNumber}</Typography>}
                            {s.mac    && <Typography sx={{ fontSize: "0.66rem", color: P.faint, fontFamily: "monospace" }}>MAC: {s.mac}</Typography>}
                            {s.ua     && <Typography sx={{ fontSize: "0.66rem", color: P.faint, fontFamily: "monospace" }}>UA: {s.ua}</Typography>}
                            {s.mtaMac && <Typography sx={{ fontSize: "0.66rem", color: P.faint, fontFamily: "monospace" }}>MTA: {s.mtaMac}</Typography>}
                          </Stack>
                          <IconButton size="small" onClick={() => setSeriales(prev => prev.filter((_, i) => i !== idx))}
                            sx={{ color: P.faint, "&:hover": { color: "#DC2626", bgcolor: "#FEF2F2" }, mt: -0.5 }}>
                            <CloseOutlined sx={{ fontSize: 12 }} />
                          </IconButton>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                )}
              </>
            );
          })()}
        </Box>

        <Box sx={{ px: 3, pb: 3, pt: 0, display: "flex", gap: 1, justifyContent: "flex-end" }}>
          <ButtonBase label="Cancelar" onClick={() => setPistoleoOpen(false)}
            sx={{ bgcolor: P.surface, color: P.muted, border: `1px solid ${P.border}`, fontSize: "0.78rem" }} />
          <ButtonBase
            label={`Guardar ${serialesCap.length} serial${serialesCap.length !== 1 ? "es" : ""}`}
            startIcon={<ArrowForwardRounded sx={{ fontSize: 15 }} />}
            onClick={() => saveSeriales(serialesCap)}
            disabled={serialesCap.length === 0}
            sx={{ px: 2.5, bgcolor: P.ink, color: "white", fontSize: "0.8rem", "&:hover": { bgcolor: P.inkSoft }, "&.Mui-disabled": { bgcolor: P.alt } }}
          />
        </Box>
      </Dialog>
    </Box>
  );
}