// "use client";

// import { useState, useCallback, useRef, useEffect } from "react";
// import {
//   Box, Card, Typography, Chip, Stack, Paper, Divider, Alert,
//   TextField, IconButton, Fade, Collapse, CircularProgress,
//   Dialog, DialogTitle, DialogContent, DialogActions,
//   FormControlLabel, Switch, LinearProgress, InputAdornment,
//   Tooltip, Badge,
// } from "@mui/material";
// import {
//   TrendingUpOutlined, TrendingDownOutlined, CheckCircleOutline,
//   QrCodeScannerOutlined, CloseOutlined, DeleteOutline,
//   AddCircleOutline, InventoryOutlined, BuildOutlined,
//   ConstructionOutlined, ShieldOutlined, CheckCircle,
//   AutoAwesomeOutlined, SendOutlined, LayersOutlined,
//   SwapHorizOutlined, InfoOutlined, WarningAmberOutlined,
//   ArrowForwardOutlined, DoneAllOutlined, SearchOutlined,
//   CategoryOutlined, RefreshOutlined,
// } from "@mui/icons-material";
// import ButtonBase from "@/src/components/base/ButtonBase";
// import SelectBase from "@/src/components/base/SelectBase";
// import { TitleCard } from "@/src/components/base/TitleCard";
// import { toast } from "react-toastify";
// import { API_URL } from "@/src/lib/config";

// // ─── Tipos ────────────────────────────────────────────────────────────────────

// type TipoFlujo  = "ENTRADA" | "SALIDA";
// type ProductType = "MATERIAL" | "TOOL" | "EQUIPMENT" | "EPP";
// type EquipoTipo  = "MODEM" | "DECODIFICADOR" | "ROUTER" | "SWITCH" | "OTRO";

// interface SubtipoMovimiento {
//   value: string; label: string; description: string;
//   icon: string; color: string; bg: string;
// }

// // ── Modelo que viene de GET /api/catalogs/product-type ───────────────────────
// interface CatalogProduct {
//   id: number;
//   code: string;
//   name: string;
//   description: string | null;
//   category: string;
//   productType: ProductType;
//   standardPrice: number | null;
//   lastPurchasePrice: number | null;
//   isActive: boolean;
//   tenantId: number;
// }

// interface PageResponse {
//   content: CatalogProduct[];
//   totalElements: number;
//   totalPages: number;
//   number: number;
//   size: number;
// }

// // ── Item en el carrito de kardex ─────────────────────────────────────────────
// interface KardexLineItem {
//   catalogId: number;        // CatalogProduct.id → itemId en el payload
//   itemCode: string;
//   itemName: string;
//   description: string;
//   productType: ProductType;
//   category: string;
//   quantity: number;
//   unitPrice: number;
//   _rawQty?: string;
//   serials?: EquipoSerial[];
// }

// interface EquipoSerial {
//   serialNumber: string;
//   mac?: string;
//   ua?: string;
//   mtaMac?: string;
// }

// // ─── Subtipos de movimiento ───────────────────────────────────────────────────

// const SUBTIPOS_ENTRADA: SubtipoMovimiento[] = [
//   { value: "SUPPLY_REQUEST",    label: "Abastecimiento",        description: "Ingreso por solicitud de reabastecimiento aprobada",        icon: "📦", color: "#15803d", bg: "#f0fdf4" },
//   { value: "DEVOLUCION",        label: "Devolución",            description: "Material devuelto por conductor o técnico al hub",           icon: "↩️", color: "#0369a1", bg: "#f0f9ff" },
//   { value: "TRANSFERENCIA_IN",  label: "Transferencia Entrada", description: "Traspaso recibido desde otro hub o almacén central",         icon: "🔀", color: "#6d28d9", bg: "#faf5ff" },
//   { value: "AJUSTE_POSITIVO",   label: "Ajuste Positivo",       description: "Corrección de inventario por conteo físico (excedente)",     icon: "➕", color: "#b45309", bg: "#fffbeb" },
//   { value: "COMPRA_DIRECTA",    label: "Compra Directa",        description: "Ingreso por compra directa a proveedor externo sin OC",      icon: "🛒", color: "#be185d", bg: "#fdf2f8" },
//   { value: "FABRICACION",       label: "Fabricación Interna",   description: "Producto fabricado internamente, ingresa al stock del hub",  icon: "⚙️", color: "#1d4ed8", bg: "#eff6ff" },
// ];

// const SUBTIPOS_SALIDA: SubtipoMovimiento[] = [
//   { value: "ASIGNACION",        label: "Asignación Técnico",    description: "Salida por asignación a conductor o técnico para servicio", icon: "👷", color: "#dc2626", bg: "#fef2f2" },
//   { value: "CONSUMO_SERVICIO",  label: "Consumo en Servicio",   description: "Material consumido directamente en una orden de servicio",  icon: "🔧", color: "#ea580c", bg: "#fff7ed" },
//   { value: "TRANSFERENCIA_OUT", label: "Transferencia Salida",  description: "Traspaso enviado a otro hub o almacén central",             icon: "📤", color: "#7c3aed", bg: "#faf5ff" },
//   { value: "BAJA_MERMA",        label: "Baja / Merma",          description: "Producto dañado, vencido o dado de baja definitivamente",   icon: "🗑️", color: "#475569", bg: "#f8fafc" },
//   { value: "AJUSTE_NEGATIVO",   label: "Ajuste Negativo",       description: "Corrección de inventario por conteo físico (faltante)",     icon: "➖", color: "#b45309", bg: "#fffbeb" },
//   { value: "PRESTAMO",          label: "Préstamo",              description: "Salida temporal con expectativa de devolución posterior",   icon: "🤝", color: "#0891b2", bg: "#f0fdfa" },
// ];

// // ─── Config visual por tipo de producto ──────────────────────────────────────

// const PRODUCT_CFG: Record<ProductType, { label: string; icon: React.ReactNode; emoji: string; color: string; bg: string; border: string }> = {
//   MATERIAL:  { label: "Material",    icon: <InventoryOutlined    sx={{ fontSize: 15 }} />, emoji: "📦", color: "#ea580c", bg: "#fff7ed", border: "#fed7aa" },
//   TOOL:      { label: "Herramienta", icon: <BuildOutlined        sx={{ fontSize: 15 }} />, emoji: "🔧", color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
//   EQUIPMENT: { label: "Equipo",      icon: <ConstructionOutlined sx={{ fontSize: 15 }} />, emoji: "⚙️", color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0" },
//   EPP:       { label: "EPP",         icon: <ShieldOutlined       sx={{ fontSize: 15 }} />, emoji: "🦺", color: "#7c3aed", bg: "#faf5ff", border: "#ddd6fe" },
// };

// // ─── Pistoleo: campos por tipo de equipo ──────────────────────────────────────

// type CampoConfig = { field: string; label: string; placeholder: string };

// const CAMPOS_EQUIPO: Record<EquipoTipo, CampoConfig[]> = {
//   MODEM:         [{ field: "serialNumber", label: "Nro. de Serie", placeholder: "ZTEATV45501950107" }, { field: "mac",    label: "MAC Address", placeholder: "6C:B8:81:F2:B7:D7" }, { field: "ua",     label: "UA",     placeholder: "12345678" }],
//   DECODIFICADOR: [{ field: "serialNumber", label: "Nro. de Serie", placeholder: "ZTEATV45501950107" }, { field: "mac",    label: "MAC Address", placeholder: "6C:B8:81:F2:B7:D7" }],
//   ROUTER:        [{ field: "serialNumber", label: "Nro. de Serie", placeholder: "ZTEATV45501950107" }, { field: "mac",    label: "MAC Address", placeholder: "6C:B8:81:F2:B7:D7" }, { field: "mtaMac", label: "MTA MAC", placeholder: "CC00F1CA6351" }],
//   SWITCH:        [{ field: "serialNumber", label: "Nro. de Serie", placeholder: "ZTEATV45501950107" }, { field: "mac",    label: "MAC Address", placeholder: "6C:B8:81:F2:B7:D7" }],
//   OTRO:          [{ field: "serialNumber", label: "Nro. de Serie", placeholder: "ZTEATV45501950107" }],
// };

// const VALIDACIONES: Record<string, { regex: RegExp; mensaje: string }> = {
//   serialNumber: { regex: /^[A-Z0-9]{8,25}$/,                             mensaje: "Alfanumérico 8–25 chars (ej: ZTEATV45501950107)" },
//   mac:          { regex: /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/,       mensaje: "Formato: 6C:B8:81:F2:B7:D7" },
//   mtaMac:       { regex: /^[0-9A-Fa-f]{12}$/,                            mensaje: "12 hex sin separadores (ej: CC00F1CA6351)" },
//   ua:           { regex: /^.{6,12}$/,                                     mensaje: "6–12 caracteres" },
// };

// const getEquipoTipo = (desc: string): EquipoTipo => {
//   const d = desc.toUpperCase();
//   if (d.includes("MODEM") || d.includes("HFC"))           return "MODEM";
//   if (d.includes("DECODIFICADOR") || d.includes("AMINO")) return "DECODIFICADOR";
//   if (d.includes("ROUTER") || d.includes("WIFI"))         return "ROUTER";
//   if (d.includes("SWITCH"))                               return "SWITCH";
//   return "OTRO";
// };

// const PAGE_SIZE = 10;

// // ─────────────────────────────────────────────────────────────────────────────
// // COMPONENTE PRINCIPAL
// // ─────────────────────────────────────────────────────────────────────────────

// export default function KardexMovement() {
//   const topRef = useRef<HTMLDivElement>(null);

//   // ── Configuración del movimiento ──────────────────────────────────────
//   const [tipoFlujo, setTipoFlujo] = useState<TipoFlujo | null>(null);
//   const [subtipo,   setSubtipo]   = useState<SubtipoMovimiento | null>(null);
//   const [notes,     setNotes]     = useState("");
//   const [reference, setReference] = useState("");

//   // ── Catálogo ──────────────────────────────────────────────────────────
//   const [catalogType,     setCatalogType]     = useState<ProductType>("MATERIAL");
//   const [catalogSearch,   setCatalogSearch]   = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const [catalogRows,    setCatalogRows]    = useState<CatalogProduct[]>([]);
//   const [catalogTotal,   setCatalogTotal]   = useState(0);
//   const [catalogPage,    setCatalogPage]    = useState(0);
//   const [catalogPages,   setCatalogPages]   = useState(1);
//   const [loadingCatalog, setLoadingCatalog] = useState(false);

//   // ── Items del movimiento ──────────────────────────────────────────────
//   const [lineItems, setLineItems] = useState<KardexLineItem[]>([]);

//   // ── Dialog: agregar equipo con cantidad ──────────────────────────────
//   const [addEquipoOpen, setAddEquipoOpen] = useState(false);
//   const [addEquipoItem, setAddEquipoItem] = useState<CatalogProduct | null>(null);
//   const [addEquipoCant, setAddEquipoCant] = useState("1");

//   // ── Pistoleo ──────────────────────────────────────────────────────────
//   const [pistoleoOpen, setPistoleoOpen]         = useState(false);
//   const [pistoleoItem, setPistoleoItem]         = useState<KardexLineItem | null>(null);
//   const [serialActual, setSerialActual]         = useState<Partial<EquipoSerial>>({});
//   const [serialesCap,  setSerialésCapturados]   = useState<EquipoSerial[]>([]);
//   const [camposError,  setCamposError]          = useState<Record<string, string>>({});
//   const [autoGuardar,  setAutoGuardar]          = useState(true);

//   // ── Submit ────────────────────────────────────────────────────────────
//   const [submitting,  setSubmitting]  = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   // ── Debounce búsqueda catálogo ────────────────────────────────────────
//   useEffect(() => {
//     if (searchTimer.current) clearTimeout(searchTimer.current);
//     searchTimer.current = setTimeout(() => { setDebouncedSearch(catalogSearch); setCatalogPage(0); }, 380);
//     return () => { if (searchTimer.current) clearTimeout(searchTimer.current); };
//   }, [catalogSearch]);

//   // ── Fetch catálogo ────────────────────────────────────────────────────
//   const fetchCatalog = useCallback(async (page: number = 0) => {
//     setLoadingCatalog(true);
//     try {
//       const params = new URLSearchParams({
//         productType: catalogType,
//         page: String(page),
//         tenantId:"1",
//         hubId:"1",
//         size: String(PAGE_SIZE),
        
//         ...(debouncedSearch.trim() ? { search: debouncedSearch.trim() } : {}),
//       });
//       const res = await fetch(`${API_URL}/api/catalog-supply/product-type?${params}`);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const data: any = await res.json();
//       setCatalogRows(data.data.content);
//       setCatalogTotal(data.data.totalElements);
//       setCatalogPages(data.data.totalPages);
//       setCatalogPage(page);
//     } catch (e: any) {
//       toast.error(`Error al cargar catálogo: ${e.message}`);
//     } finally {
//       setLoadingCatalog(false);
//     }
//   }, [catalogType, debouncedSearch]);

//   useEffect(() => { fetchCatalog(0); }, [fetchCatalog]);

//   // ── Agregar ítem no-equipo al carrito ─────────────────────────────────
//   const addNonEquipmentItem = (product: CatalogProduct) => {
//     if (lineItems.some(li => li.catalogId === product.id)) {
//       toast.info(`${product.code} ya está en el movimiento`); return;
//     }
//     setLineItems(prev => [...prev, {
//       catalogId: product.id, itemCode: product.code, itemName: product.name,
//       description: product.description ?? product.name,
//       productType: product.productType, category: product.category,
//       quantity: 1, unitPrice: product.lastPurchasePrice ?? product.standardPrice ?? 0,
//       _rawQty: "1", serials: [],
//     }]);
//     toast.success(`${product.code} agregado`);
//   };

//   // ── Abrir dialog de cantidad para equipos ─────────────────────────────
//   const openAddEquipo = (product: CatalogProduct) => {
//     if (lineItems.some(li => li.catalogId === product.id)) {
//       toast.info(`${product.code} ya está en el movimiento`); return;
//     }
//     setAddEquipoItem(product);
//     setAddEquipoCant("1");
//     setAddEquipoOpen(true);
//   };

//   const confirmAddEquipo = () => {
//     if (!addEquipoItem) return;
//     const cant = Math.max(1, parseInt(addEquipoCant, 10) || 1);
//     setLineItems(prev => [...prev, {
//       catalogId: addEquipoItem.id, itemCode: addEquipoItem.code,
//       itemName: addEquipoItem.name, description: addEquipoItem.description ?? addEquipoItem.name,
//       productType: "EQUIPMENT", category: addEquipoItem.category,
//       quantity: cant, unitPrice: addEquipoItem.lastPurchasePrice ?? addEquipoItem.standardPrice ?? 0,
//       _rawQty: String(cant), serials: [],
//     }]);
//     setAddEquipoOpen(false);
//     setAddEquipoItem(null);
//     toast.success(`${addEquipoItem.code} — ${cant} unidad(es) listas para pistolear`);
//   };

//   // ── CRUD líneas del carrito ───────────────────────────────────────────
//   const removeItem = (catalogId: number) => setLineItems(prev => prev.filter(i => i.catalogId !== catalogId));

//   const updateQty = (catalogId: number, raw: string) => {
//     const parsed = parseInt(raw, 10);
//     setLineItems(prev => prev.map(i =>
//       i.catalogId === catalogId ? { ...i, quantity: isNaN(parsed) ? 0 : Math.max(0, parsed), _rawQty: raw } : i
//     ));
//   };

//   const updatePrice = (catalogId: number, raw: string) => {
//     const parsed = parseFloat(raw);
//     setLineItems(prev => prev.map(i =>
//       i.catalogId === catalogId ? { ...i, unitPrice: isNaN(parsed) ? 0 : parsed } : i
//     ));
//   };

//   // ── Pistoleo ──────────────────────────────────────────────────────────
//   const abrirPistoleo = (item: KardexLineItem) => {
//     setPistoleoItem(item);
//     setSerialActual({});
//     setCamposError({});
//     setSerialésCapturados(item.serials ? [...item.serials] : []);
//     setPistoleoOpen(true);
//   };

//   const validarCampo = (field: string, value: string): string => {
//     if (!value.trim()) return "";
//     const regla = VALIDACIONES[field];
//     return regla && !regla.regex.test(value.trim()) ? regla.mensaje : "";
//   };

//   const checkAutoAgregar = useCallback((
//     nuevoSerial: Partial<EquipoSerial>, tipo: EquipoTipo,
//     totalReq: number, currentList: EquipoSerial[]
//   ) => {
//     if (!autoGuardar) return;
//     const campos = CAMPOS_EQUIPO[tipo];
//     const todoCompleto = campos.every(c => !!(nuevoSerial as any)[c.field]?.trim());
//     if (!todoCompleto) return;
//     const hayErrores = campos.some(c => !!validarCampo(c.field, (nuevoSerial as any)[c.field] ?? ""));
//     if (hayErrores) return;
//     const nuevaLista = [...currentList, { ...nuevoSerial } as EquipoSerial];
//     setSerialésCapturados(nuevaLista);
//     setSerialActual({});
//     setCamposError({});
//     if (pistoleoItem && nuevaLista.length >= totalReq) guardarSerialesConLista(nuevaLista);
//   }, [autoGuardar, pistoleoItem]);

//   const handleCampoChange = (field: string, value: string, tipo: EquipoTipo, totalReq: number) => {
//     const updated = { ...serialActual, [field]: value };
//     setSerialActual(updated);
//     const regla = VALIDACIONES[field];
//     setCamposError(prev => ({ ...prev, [field]: regla && value.trim() ? validarCampo(field, value) : "" }));
//     checkAutoAgregar(updated, tipo, totalReq, serialesCap);
//   };

//   const agregarSerialManual = () => {
//     if (!pistoleoItem) return;
//     const tipo = getEquipoTipo(pistoleoItem.description);
//     const campos = CAMPOS_EQUIPO[tipo];
//     const errores: Record<string, string> = {};
//     let hayError = false;
//     campos.forEach(c => {
//       const val = (serialActual as any)[c.field] ?? "";
//       if (!val.trim()) { errores[c.field] = `${c.label} es requerido`; hayError = true; }
//       else { const e = validarCampo(c.field, val); if (e) { errores[c.field] = e; hayError = true; } }
//     });
//     if (hayError) { setCamposError(errores); return; }
//     setSerialésCapturados(prev => [...prev, { ...serialActual } as EquipoSerial]);
//     setSerialActual({});
//     setCamposError({});
//   };

//   const guardarSerialesConLista = (lista: EquipoSerial[]) => {
//     if (!pistoleoItem) return;
//     setLineItems(prev => prev.map(i =>
//       i.catalogId === pistoleoItem.catalogId
//         ? { ...i, serials: lista, quantity: lista.length, _rawQty: String(lista.length) }
//         : i
//     ));
//     setPistoleoOpen(false);
//   };

//   const guardarSeriales = () => guardarSerialesConLista(serialesCap);

//   // ── Validaciones para habilitar submit ───────────────────────────────
//   const validationErrors: string[] = [];
//   if (!tipoFlujo)             validationErrors.push("Selecciona el tipo de flujo (Entrada / Salida)");
//   if (!subtipo)               validationErrors.push("Selecciona el subtipo de movimiento");
//   if (lineItems.length === 0) validationErrors.push("Agrega al menos un ítem al movimiento");
//   lineItems.filter(i => i.quantity === 0).forEach(i => validationErrors.push(`${i.itemCode}: cantidad es 0`));
//   lineItems.filter(i => i.productType === "EQUIPMENT" && (i.serials?.length ?? 0) === 0)
//     .forEach(i => validationErrors.push(`${i.itemCode}: equipo sin seriales pistoliados`));

//   const canSubmit = validationErrors.length === 0;

//   // ── Build payload kardex-batch ────────────────────────────────────────
//   const buildPayload = () => ({
//     movements: lineItems.flatMap((item:any) =>
//       item.productType === "EQUIPMENT"
//         ? (item.serials ?? []).map((serial:any) => ({
//             tenantId: 1, hubId: 1, projectId: 1, createdBy: 1,
//             itemId: item.catalogId, productType: item.productType,
//             movementType: tipoFlujo === "ENTRADA" ? "ENTRY" : "EXIT",
//             subtype: subtipo?.value, supplySource: "CLARO",
//             quantity: 1, unitPrice: item.unitPrice,
//             sourceType: subtipo?.value,
//             serialNumber:  serial.serialNumber,
//             macAddress:    serial.mac    ?? null,
//             mtaMacAddress: serial.mtaMac ?? null,
//             unitAddress:   serial.ua     ?? null,
//             notes: notes || `${subtipo?.label} — ${item.itemCode}`,
//             reference,
//           }))
//         : [{
//             tenantId: 1, hubId: 1, projectId: 1, createdBy: 1,
//             itemId: item.catalogId, productType: item.productType,
//             movementType: tipoFlujo === "ENTRADA" ? "ENTRY" : "EXIT",
//             subtype: subtipo?.value, supplySource: "CLARO",
//             quantity: item.quantity, unitPrice: item.unitPrice,
//             sourceType: subtipo?.value,
//             notes: notes || `${subtipo?.label} — ${item.itemCode}`,
//             reference,
//           }]
//     ),
//   });

//   // ── Submit ────────────────────────────────────────────────────────────
//   const handleSubmit = async () => {
//     if (!canSubmit) return;
//     setSubmitting(true);
//     try {
//       const payload = buildPayload();
//       const res = await fetch(`${API_URL}/api/hub-inventory/kardex-batch`, {
//         method: "POST", headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.message ?? `HTTP ${res.status}`); }
//       setShowSuccess(true);
//       topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//     } catch (err: any) {
//       toast.error(`Error: ${err.message}`);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const resetAll = () => {
//     setTipoFlujo(null); setSubtipo(null); setNotes(""); setReference("");
//     setLineItems([]); setShowSuccess(false);
//   };

//   // ── Derivados ─────────────────────────────────────────────────────────
//   const isEntrada      = tipoFlujo === "ENTRADA";
//   const accentColor    = isEntrada ? "#15803d" : tipoFlujo === "SALIDA" ? "#dc2626" : "#1e293b";
//   const totalMovements = lineItems.reduce((s, i) =>
//     s + (i.productType === "EQUIPMENT" ? (i.serials?.length ?? 0) : i.quantity), 0);
//   const totalValue     = lineItems.reduce((s, i) => s + i.quantity * (i.unitPrice ?? 0), 0);
//   const subtiposActivos = tipoFlujo === "ENTRADA" ? SUBTIPOS_ENTRADA : tipoFlujo === "SALIDA" ? SUBTIPOS_SALIDA : [];

//   // ─────────────────────────────────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────────────────────────────────
//   return (
//     <Box ref={topRef} sx={{ maxWidth: 1500, mx: "auto", p: { xs: 2, md: 4 }, display: "flex", flexDirection: "column", gap: 3 }}>

//       <TitleCard
//         icon={<LayersOutlined sx={{ fontSize: 32 }} />}
//         title="Registro de Movimiento de Kardex"
//         description="Registra entradas y salidas de materiales, herramientas, equipos y EPP desde el catálogo del hub con trazabilidad completa."
//       />

//       {/* ══ PANTALLA ÉXITO ══ */}
//       <Fade in={showSuccess} timeout={700} unmountOnExit>
//         <Card elevation={0} sx={{ borderRadius: 4, background: "linear-gradient(135deg,#f0fdf4 0%,#dcfce7 60%,#f0fdf4 100%)", border: "2px solid #bbf7d0", p: { xs: 4, md: 6 }, textAlign: "center", position: "relative", overflow: "hidden" }}>
//           <Box sx={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", bgcolor: "rgba(34,197,94,0.08)" }} />
//           <Box sx={{ width: 96, height: 96, borderRadius: "50%", bgcolor: "#22c55e", mx: "auto", mb: 3, display: "flex", alignItems: "center", justifyContent: "center", animation: "pulseRing 2s ease-in-out infinite", "@keyframes pulseRing": { "0%,100%": { boxShadow: "0 0 0 16px rgba(34,197,94,0.12),0 0 0 32px rgba(34,197,94,0.06)" }, "50%": { boxShadow: "0 0 0 20px rgba(34,197,94,0.08),0 0 0 40px rgba(34,197,94,0.03)" } } }}>
//             <DoneAllOutlined sx={{ fontSize: 48, color: "white" }} />
//           </Box>
//           <Typography variant="h4" fontWeight={800} sx={{ color: "#15803d", mb: 1 }}>¡Movimiento Registrado!</Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 480, mx: "auto" }}>
//             Se registraron <strong>{totalMovements}</strong> movimientos de kardex de tipo <strong>{subtipo?.label}</strong>.
//           </Typography>
//           <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 4 }}>
//             {[
//               { label: "Tipo",        value: tipoFlujo ?? "—",      color: accentColor },
//               { label: "Subtipo",     value: subtipo?.label ?? "—", color: "#0369a1" },
//               { label: "Movimientos", value: `${totalMovements}`,   color: "#7c3aed" },
//               { label: "Ítems",       value: `${lineItems.length}`, color: "#b45309" },
//             ].map(c => (
//               <Paper key={c.label} elevation={0} sx={{ px: 3, py: 2, borderRadius: 3, border: "1px solid #bbf7d0", bgcolor: "white", minWidth: 120, textAlign: "center" }}>
//                 <Typography variant="h5" fontWeight={800} sx={{ color: c.color }}>{c.value}</Typography>
//                 <Typography variant="caption" color="text.secondary" fontWeight={600}>{c.label}</Typography>
//               </Paper>
//             ))}
//           </Box>
//           <ButtonBase label="Nuevo Movimiento" startIcon={<SwapHorizOutlined />} onClick={resetAll}
//             sx={{ px: 4, py: 1.5, fontWeight: 700, boxShadow: "0 4px 12px rgba(34,197,94,0.3)", borderRadius: 2.5 }} />
//         </Card>
//       </Fade>

//       <Fade in={!showSuccess} timeout={400} unmountOnExit>
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

//           {/* ══ PASO 1: TIPO DE FLUJO ══ */}
//           <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", overflow: "hidden" }}>
//             <Box sx={{ display: "flex", alignItems: "stretch" }}>
//               <Box sx={{ width: 6, bgcolor: tipoFlujo === "ENTRADA" ? "#15803d" : tipoFlujo === "SALIDA" ? "#dc2626" : "#cbd5e1", transition: "background 0.4s", flexShrink: 0 }} />
//               <Box sx={{ flex: 1, p: 3 }}>
//                 <Typography variant="overline" sx={{ letterSpacing: 2, color: "text.disabled", fontSize: "0.68rem" }}>PASO 1 DE 4</Typography>
//                 <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1, mb: 2.5 }}>Tipo de Movimiento</Typography>
//                 <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
//                   {([
//                     { tipo: "ENTRADA" as TipoFlujo, icon: <TrendingUpOutlined sx={{ fontSize: 30 }} />,   label: "Entrada", desc: "Ingreso de stock al hub",  color: "#15803d", bg: "#f0fdf4", activeBg: "#dcfce7", border: "#bbf7d0" },
//                     { tipo: "SALIDA"  as TipoFlujo, icon: <TrendingDownOutlined sx={{ fontSize: 30 }} />, label: "Salida",  desc: "Egreso de stock del hub", color: "#dc2626", bg: "#fef2f2", activeBg: "#fee2e2", border: "#fecaca" },
//                   ]).map(opt => {
//                     const isActive = tipoFlujo === opt.tipo;
//                     return (
//                       <Box key={opt.tipo} onClick={() => { setTipoFlujo(opt.tipo); setSubtipo(null); }}
//                         sx={{ flex: "1 1 200px", p: 2.5, borderRadius: 3, cursor: "pointer", transition: "all 0.25s",
//                           bgcolor: isActive ? opt.activeBg : opt.bg,
//                           border: `2px solid ${isActive ? opt.color : opt.border}`,
//                           boxShadow: isActive ? `0 8px 24px ${opt.color}25` : "none",
//                           transform: isActive ? "translateY(-2px)" : "none",
//                           "&:hover": { transform: "translateY(-2px)", boxShadow: `0 8px 24px ${opt.color}20` },
//                         }}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                           <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: isActive ? opt.color : `${opt.color}15`, color: isActive ? "white" : opt.color, transition: "all 0.25s" }}>
//                             {opt.icon}
//                           </Box>
//                           <Box>
//                             <Typography variant="h6" fontWeight={800} sx={{ color: isActive ? opt.color : "text.primary", lineHeight: 1 }}>{opt.label}</Typography>
//                             <Typography variant="caption" color="text.secondary">{opt.desc}</Typography>
//                           </Box>
//                           {isActive && <CheckCircle sx={{ ml: "auto", color: opt.color, fontSize: 20 }} />}
//                         </Box>
//                       </Box>
//                     );
//                   })}
//                 </Box>
//               </Box>
//             </Box>
//           </Card>

//           {/* ══ PASO 2: SUBTIPO ══ */}
//           <Collapse in={!!tipoFlujo} unmountOnExit>
//             <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", overflow: "hidden" }}>
//               <Box sx={{ display: "flex", alignItems: "stretch" }}>
//                 <Box sx={{ width: 6, bgcolor: subtipo ? accentColor : "#cbd5e1", transition: "background 0.4s", flexShrink: 0 }} />
//                 <Box sx={{ flex: 1, p: 3 }}>
//                   <Typography variant="overline" sx={{ letterSpacing: 2, color: "text.disabled", fontSize: "0.68rem" }}>PASO 2 DE 4</Typography>
//                   <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1, mb: 0.5 }}>Motivo del Movimiento</Typography>
//                   <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2.5 }}>
//                     ¿Por qué razón se genera esta {tipoFlujo === "ENTRADA" ? "entrada" : "salida"}?
//                   </Typography>
//                   <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
//                     {subtiposActivos.map(st => {
//                       const isActive = subtipo?.value === st.value;
//                       return (
//                         <Box key={st.value} onClick={() => setSubtipo(st)}
//                           sx={{ flex: "1 1 190px", p: 2, borderRadius: 2.5, cursor: "pointer", transition: "all 0.2s",
//                             bgcolor: isActive ? st.bg : "#fafbfc",
//                             border: `1.5px solid ${isActive ? st.color : "#e2e8f0"}`,
//                             boxShadow: isActive ? `0 4px 14px ${st.color}20` : "none",
//                             transform: isActive ? "translateY(-1px)" : "none",
//                             "&:hover": { border: `1.5px solid ${st.color}60`, bgcolor: st.bg, transform: "translateY(-1px)" },
//                           }}>
//                           <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2 }}>
//                             <Typography sx={{ fontSize: "1.3rem", lineHeight: 1, mt: 0.2 }}>{st.icon}</Typography>
//                             <Box>
//                               <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                                 <Typography variant="body2" fontWeight={700} sx={{ color: isActive ? st.color : "text.primary", lineHeight: 1.2 }}>{st.label}</Typography>
//                                 {isActive && <CheckCircle sx={{ fontSize: 13, color: st.color }} />}
//                               </Box>
//                               <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.3, display: "block", mt: 0.3 }}>{st.description}</Typography>
//                             </Box>
//                           </Box>
//                         </Box>
//                       );
//                     })}
//                   </Box>

//                   <Collapse in={!!subtipo}>
//                     <Box sx={{ display: "flex", gap: 2, mt: 2.5, flexWrap: "wrap" }}>
//                       <TextField size="small" label="Código de Referencia" placeholder="GR-2024-XXX / OT-001..."
//                         value={reference} onChange={e => setReference(e.target.value)}
//                         sx={{ flex: "0 0 240px", "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                       />
//                       <TextField size="small" label="Notas (opcional)" placeholder="Descripción adicional..."
//                         value={notes} onChange={e => setNotes(e.target.value)}
//                         sx={{ flex: 1, minWidth: 220, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                       />
//                     </Box>
//                   </Collapse>
//                 </Box>
//               </Box>
//             </Card>
//           </Collapse>

//           {/* ══ PASO 3: CATÁLOGO + CARRITO ══ */}
//           <Collapse in={!!subtipo} unmountOnExit>
//             <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", overflow: "hidden" }}>
//               <Box sx={{ display: "flex", alignItems: "stretch" }}>
//                 <Box sx={{ width: 6, bgcolor: lineItems.length > 0 ? accentColor : "#cbd5e1", transition: "background 0.4s", flexShrink: 0 }} />
//                 <Box sx={{ flex: 1 }}>

//                   <Box sx={{ px: 3, pt: 3, pb: 2 }}>
//                     <Typography variant="overline" sx={{ letterSpacing: 2, color: "text.disabled", fontSize: "0.68rem" }}>PASO 3 DE 4</Typography>
//                     <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1 }}>Selección de Productos</Typography>
//                     <Typography variant="caption" color="text.secondary">Busca en el catálogo del hub y agrega los productos al movimiento</Typography>
//                   </Box>

//                   <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" } }}>

//                     {/* ─── PANEL CATÁLOGO ──────────────────────────────────── */}
//                     <Box sx={{ flex: "0 0 460px", borderRight: { lg: "1px solid #e2e8f0" }, p: 3, display: "flex", flexDirection: "column", gap: 2 }}>

//                       {/* Tipo de producto */}
//                       <SelectBase
//                         label="Tipo de Producto" size="small" value={catalogType}
//                         onChange={v => { setCatalogType(v as ProductType); setCatalogPage(0); setCatalogSearch(""); }}
//                         options={[
//                           { label: "📦 Materiales",   value: "MATERIAL"  },
//                           { label: "⚙️ Equipos",       value: "EQUIPMENT" },
//                           { label: "🔧 Herramientas",  value: "TOOL"      },
//                           { label: "🦺 EPP",           value: "EPP"       },
//                         ]}
//                         fullWidth
//                       />

//                       {/* Búsqueda */}
//                       <TextField size="small" placeholder="Buscar por código o nombre..."
//                         value={catalogSearch} onChange={e => setCatalogSearch(e.target.value)}
//                         InputProps={{
//                           startAdornment: (
//                             <InputAdornment position="start">
//                               {loadingCatalog
//                                 ? <CircularProgress size={14} />
//                                 : <SearchOutlined sx={{ fontSize: 16, color: "text.disabled" }} />}
//                             </InputAdornment>
//                           ),
//                           endAdornment: catalogSearch ? (
//                             <InputAdornment position="end">
//                               <IconButton size="small" onClick={() => setCatalogSearch("")}>
//                                 <CloseOutlined sx={{ fontSize: 14 }} />
//                               </IconButton>
//                             </InputAdornment>
//                           ) : null,
//                         }}
//                         sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                       />

//                       {/* Contador y reload */}
//                       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                         <Typography variant="caption" color="text.secondary">
//                           {loadingCatalog ? "Cargando..." : `${catalogTotal} productos · Pág. ${catalogPage + 1} de ${Math.max(catalogPages, 1)}`}
//                         </Typography>
//                         <Tooltip title="Recargar catálogo">
//                           <IconButton size="small" onClick={() => fetchCatalog(catalogPage)} disabled={loadingCatalog}>
//                             <RefreshOutlined sx={{ fontSize: 15 }} />
//                           </IconButton>
//                         </Tooltip>
//                       </Box>

//                       {/* Lista del catálogo */}
//                       <Box sx={{ flex: 1, overflowY: "auto", maxHeight: 400, display: "flex", flexDirection: "column", gap: 0.7,
//                         "&::-webkit-scrollbar": { width: 3 }, "&::-webkit-scrollbar-thumb": { bgcolor: "#cbd5e1", borderRadius: 2 } }}>
//                         {loadingCatalog ? (
//                           <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}><CircularProgress size={36} /></Box>
//                         ) : catalogRows.length === 0 ? (
//                           <Box sx={{ py: 6, textAlign: "center" }}>
//                             <CategoryOutlined sx={{ fontSize: 36, color: "text.disabled", mb: 1 }} />
//                             <Typography variant="body2" color="text.disabled">Sin resultados</Typography>
//                           </Box>
//                         ) : catalogRows.map(item => {
//                           const cfg = PRODUCT_CFG[item.productType];
//                           const added = lineItems.some(li => li.catalogId === item.id);
//                           const isEquipo = item.productType === "EQUIPMENT";
//                           return (
//                             <Box key={item.id}
//                               sx={{ p: 1.5, borderRadius: 2, border: `1px solid ${added ? cfg.color + "50" : "#e2e8f0"}`,
//                                 bgcolor: added ? cfg.bg : "white", transition: "all 0.15s",
//                                 display: "flex", alignItems: "center", gap: 1.5,
//                                 "&:hover": { border: `1px solid ${cfg.color}60`, bgcolor: cfg.bg },
//                               }}>
//                               <Box sx={{ width: 30, height: 30, borderRadius: 1.5, bgcolor: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", color: cfg.color, border: `1px solid ${cfg.border}`, flexShrink: 0, fontSize: "1.1rem" }}>
//                                 {cfg.emoji}
//                               </Box>
//                               <Box sx={{ flex: 1, minWidth: 0 }}>
//                                 <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, flexWrap: "wrap" }}>
//                                   <Chip label={item.code} size="small" sx={{ bgcolor: cfg.color, color: "white", fontWeight: 700, fontSize: "0.62rem", height: 17 }} />
//                                   <Typography variant="caption" fontWeight={600} sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 165 }}>{item.name}</Typography>
//                                 </Box>
//                                 <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.62rem" }}>
//                                   {item.category}
//                                   {item.lastPurchasePrice ? ` · S/ ${item.lastPurchasePrice.toFixed(2)}` : ""}
//                                 </Typography>
//                                 {isEquipo && !added && (
//                                   <Chip label="Ingresa cantidad al agregar" size="small"
//                                     sx={{ mt: 0.3, height: 14, fontSize: "0.58rem", bgcolor: "#eff6ff", color: "#1d4ed8", fontWeight: 700, display: "block" }} />
//                                 )}
//                               </Box>
//                               <Tooltip title={added ? "Ya en el movimiento" : isEquipo ? "Agregar equipo (debes indicar cantidad)" : "Agregar al movimiento"}>
//                                 <span>
//                                   <IconButton size="small"
//                                     onClick={() => isEquipo ? openAddEquipo(item) : addNonEquipmentItem(item)}
//                                     disabled={added}
//                                     sx={{ width: 28, height: 28, bgcolor: added ? "#f1f5f9" : cfg.color, color: "white", flexShrink: 0,
//                                       "&:hover": { bgcolor: added ? "#f1f5f9" : cfg.color, opacity: 0.85 },
//                                       "&.Mui-disabled": { bgcolor: "#f1f5f9", color: "#94a3b8" },
//                                     }}>
//                                     {added ? <CheckCircle sx={{ fontSize: 13 }} /> : <AddCircleOutline sx={{ fontSize: 13 }} />}
//                                   </IconButton>
//                                 </span>
//                               </Tooltip>
//                             </Box>
//                           );
//                         })}
//                       </Box>

//                       {/* Paginación */}
//                       {catalogPages > 1 && (
//                         <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
//                           <ButtonBase label="← Ant." size="small" disabled={catalogPage === 0}
//                             onClick={() => fetchCatalog(catalogPage - 1)}
//                             sx={{ fontSize: "0.72rem", px: 1.5, bgcolor: "white", color: "text.secondary", border: "1px solid #e2e8f0" }} />
//                           <Typography variant="caption" sx={{ alignSelf: "center", color: "text.secondary" }}>
//                             {catalogPage + 1} / {catalogPages}
//                           </Typography>
//                           <ButtonBase label="Sig. →" size="small" disabled={catalogPage + 1 >= catalogPages}
//                             onClick={() => fetchCatalog(catalogPage + 1)}
//                             sx={{ fontSize: "0.72rem", px: 1.5, bgcolor: "white", color: "text.secondary", border: "1px solid #e2e8f0" }} />
//                         </Box>
//                       )}
//                     </Box>

//                     {/* ─── CARRITO ──────────────────────────────────────────── */}
//                     <Box sx={{ flex: 1, p: 3 }}>
//                       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
//                         <Typography variant="subtitle2" fontWeight={700}>
//                           Items del Movimiento
//                           <Badge badgeContent={lineItems.length} color="primary" sx={{ ml: 1.5 }} />
//                         </Typography>
//                         {lineItems.length > 0 && (
//                           <Chip label="Limpiar" size="small" clickable onClick={() => setLineItems([])}
//                             icon={<DeleteOutline sx={{ fontSize: "12px !important" }} />}
//                             sx={{ fontWeight: 600, fontSize: "0.7rem", bgcolor: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}
//                           />
//                         )}
//                       </Box>

//                       {lineItems.length === 0 ? (
//                         <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 8, border: "2px dashed #e2e8f0", borderRadius: 3, bgcolor: "#fafbfc" }}>
//                           <SwapHorizOutlined sx={{ fontSize: 38, color: "text.disabled", mb: 1.5 }} />
//                           <Typography variant="body2" color="text.secondary" fontWeight={600}>Sin ítems agregados</Typography>
//                           <Typography variant="caption" color="text.disabled">Selecciona productos del catálogo</Typography>
//                         </Box>
//                       ) : (
//                         <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, maxHeight: 460, overflowY: "auto",
//                           "&::-webkit-scrollbar": { width: 3 }, "&::-webkit-scrollbar-thumb": { bgcolor: "#cbd5e1", borderRadius: 2 } }}>
//                           {lineItems.map(item => {
//                             const cfg         = PRODUCT_CFG[item.productType];
//                             const isEquipo    = item.productType === "EQUIPMENT";
//                             const serialCount = item.serials?.length ?? 0;
//                             const pendientes  = item.quantity - serialCount;
//                             const hasWarning  = isEquipo && serialCount === 0;
//                             const rawQty      = item._rawQty ?? String(item.quantity);

//                             return (
//                               <Box key={item.catalogId} sx={{ p: 2, borderRadius: 2.5, border: `1.5px solid ${hasWarning ? "#fde68a" : cfg.color + "35"}`, bgcolor: hasWarning ? "#fffbeb" : cfg.bg, transition: "all 0.2s" }}>

//                                 {/* Fila 1: código + nombre + botón eliminar */}
//                                 <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, flexWrap: "wrap", mb: 1 }}>
//                                   <Chip label={item.itemCode} size="small" sx={{ bgcolor: cfg.color, color: "white", fontWeight: 700, fontSize: "0.68rem" }} />
//                                   <Typography variant="body2" fontWeight={700} sx={{ flex: 1, minWidth: 100, lineHeight: 1.3 }}>{item.itemName}</Typography>
//                                   <IconButton size="small" onClick={() => removeItem(item.catalogId)}
//                                     sx={{ color: "#ef4444", "&:hover": { bgcolor: "#fef2f2" } }}>
//                                     <DeleteOutline sx={{ fontSize: 16 }} />
//                                   </IconButton>
//                                 </Box>

//                                 {/* Fila 2: controles de cantidad, precio y pistoleo */}
//                                 <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>

//                                   {/* Cantidad editable para no-equipo */}
//                                   {!isEquipo ? (
//                                     <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
//                                       <Typography variant="caption" color="text.secondary" fontWeight={600}>Cant.</Typography>
//                                       <TextField type="number" size="small" value={rawQty}
//                                         onChange={e => updateQty(item.catalogId, e.target.value)}
//                                         onBlur={e => { const v = parseInt(e.target.value, 10); if (isNaN(v) || v < 1) updateQty(item.catalogId, "1"); }}
//                                         inputProps={{ min: 1, style: { textAlign: "center", fontWeight: 700, padding: "4px 6px", width: 52 } }}
//                                         sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5, fontSize: "0.82rem", height: 30 },
//                                           "& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button": { display: "none" },
//                                           "& input[type=number]": { MozAppearance: "textfield" } }}
//                                       />
//                                     </Box>
//                                   ) : (
//                                     /* Cantidad informativa para equipo (definida al agregar) */
//                                     <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
//                                       <Typography variant="caption" color="text.secondary" fontWeight={600}>Esperados:</Typography>
//                                       <Chip label={item.quantity} size="small"
//                                         sx={{ fontWeight: 800, height: 20, fontSize: "0.72rem", bgcolor: "#eff6ff", color: "#1d4ed8" }} />
//                                     </Box>
//                                   )}

//                                   {/* Precio unitario */}
//                                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
//                                     <Typography variant="caption" color="text.secondary" fontWeight={600}>S/</Typography>
//                                     <TextField type="number" size="small"
//                                       value={item.unitPrice === 0 ? "" : item.unitPrice}
//                                       onChange={e => updatePrice(item.catalogId, e.target.value)}
//                                       placeholder="0.00"
//                                       inputProps={{ min: 0, step: 0.01, style: { fontWeight: 700, padding: "4px 6px", width: 60 } }}
//                                       sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5, fontSize: "0.82rem", height: 30 },
//                                         "& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button": { display: "none" },
//                                         "& input[type=number]": { MozAppearance: "textfield" } }}
//                                     />
//                                   </Box>

//                                   {/* Subtotal inline para no-equipo */}
//                                   {!isEquipo && item.unitPrice > 0 && (
//                                     <Typography variant="caption" sx={{ fontFamily: "monospace", fontWeight: 700, color: cfg.color }}>
//                                       = S/ {(item.quantity * item.unitPrice).toFixed(2)}
//                                     </Typography>
//                                   )}

//                                   {/* Botón pistoleo solo para EQUIPMENT */}
//                                   {isEquipo && (
//                                     <Box onClick={() => abrirPistoleo(item)}
//                                       sx={{ display: "flex", alignItems: "center", gap: 0.8, px: 1.5, py: 0.6, borderRadius: 1.5, cursor: "pointer", transition: "all 0.2s",
//                                         bgcolor: serialCount > 0 ? "#f0fdf4" : "#fffbeb",
//                                         border: `1px solid ${serialCount > 0 ? "#bbf7d0" : "#fde68a"}`,
//                                         "&:hover": { transform: "scale(1.02)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
//                                       }}>
//                                       <QrCodeScannerOutlined sx={{ fontSize: 15, color: serialCount > 0 ? "#15803d" : "#b45309" }} />
//                                       <Typography variant="caption" fontWeight={700} sx={{ color: serialCount > 0 ? "#15803d" : "#b45309" }}>
//                                         {serialCount > 0 ? `${serialCount}/${item.quantity} pistol.` : "Pistolear"}
//                                       </Typography>
//                                     </Box>
//                                   )}

//                                   {/* Badge pendientes / completo */}
//                                   {isEquipo && serialCount > 0 && pendientes > 0 && (
//                                     <Chip label={`${pendientes} pendiente${pendientes > 1 ? "s" : ""}`} size="small"
//                                       sx={{ height: 18, fontSize: "0.62rem", bgcolor: "#fffbeb", color: "#b45309", border: "1px solid #fde68a", fontWeight: 700 }} />
//                                   )}
//                                   {isEquipo && serialCount > 0 && pendientes === 0 && (
//                                     <Chip label="Completo ✓" size="small" color="success" sx={{ height: 18, fontSize: "0.62rem", fontWeight: 700 }} />
//                                   )}
//                                 </Box>

//                                 {/* Warning equipo sin seriales */}
//                                 {hasWarning && (
//                                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mt: 1, px: 1, py: 0.6, bgcolor: "#fef9c3", borderRadius: 1 }}>
//                                     <WarningAmberOutlined sx={{ fontSize: 13, color: "#b45309" }} />
//                                     <Typography variant="caption" color="warning.dark" fontWeight={600}>
//                                       Sin seriales — pistolealos antes de confirmar
//                                     </Typography>
//                                   </Box>
//                                 )}

//                                 {/* Chips de seriales capturados */}
//                                 {isEquipo && serialCount > 0 && (
//                                   <Box sx={{ mt: 1, display: "flex", gap: 0.6, flexWrap: "wrap" }}>
//                                     {item.serials?.map((s, idx) => (
//                                       <Chip key={idx} label={s.serialNumber} size="small"
//                                         sx={{ bgcolor: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0", fontWeight: 600, fontSize: "0.63rem" }} />
//                                     ))}
//                                   </Box>
//                                 )}
//                               </Box>
//                             );
//                           })}
//                         </Box>
//                       )}

//                       {/* Mini-resumen del carrito */}
//                       {lineItems.length > 0 && (
//                         <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid #e2e8f0", display: "flex", gap: 2, flexWrap: "wrap" }}>
//                           {(["MATERIAL","TOOL","EQUIPMENT","EPP"] as ProductType[])
//                             .filter(t => lineItems.some(i => i.productType === t))
//                             .map(t => {
//                               const cfg = PRODUCT_CFG[t];
//                               const count = lineItems.filter(i => i.productType === t).length;
//                               return (
//                                 <Paper key={t} variant="outlined" sx={{ flex: "1 1 80px", p: 1.2, borderRadius: 1.5, textAlign: "center", border: `1px solid ${cfg.border}`, bgcolor: cfg.bg }}>
//                                   <Typography sx={{ fontSize: "1rem", lineHeight: 1 }}>{cfg.emoji}</Typography>
//                                   <Typography variant="h6" fontWeight={800} sx={{ color: cfg.color, lineHeight: 1.2 }}>{count}</Typography>
//                                   <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ fontSize: "0.62rem" }}>{cfg.label}</Typography>
//                                 </Paper>
//                               );
//                             })}
//                           {totalValue > 0 && (
//                             <Paper variant="outlined" sx={{ flex: "1 1 120px", p: 1.2, borderRadius: 1.5, border: "1px solid #e9d5ff", bgcolor: "#faf5ff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
//                               <Typography variant="h6" fontWeight={800} sx={{ color: "#7c3aed", fontFamily: "monospace" }}>
//                                 S/ {totalValue.toFixed(2)}
//                               </Typography>
//                               <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ fontSize: "0.62rem" }}>Valor estimado</Typography>
//                             </Paper>
//                           )}
//                         </Box>
//                       )}
//                     </Box>
//                   </Box>
//                 </Box>
//               </Box>
//             </Card>
//           </Collapse>

//           {/* ══ PASO 4: RESUMEN + CONFIRMAR ══ */}
//           <Collapse in={lineItems.length > 0} unmountOnExit>
//             <Card elevation={4} sx={{ borderRadius: 4, border: `2px solid ${accentColor}30`, overflow: "hidden", boxShadow: `0 8px 32px ${accentColor}18` }}>
//               <Box sx={{ background: `linear-gradient(135deg, ${isEntrada ? "#15803d" : "#b91c1c"} 0%, ${isEntrada ? "#16a34a" : "#dc2626"} 100%)`, p: 3, color: "white" }}>
//                 <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
//                   <Stack direction="row" spacing={2} alignItems="center">
//                     <Box sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 1, borderRadius: 2, display: "flex" }}>
//                       {isEntrada ? <TrendingUpOutlined /> : <TrendingDownOutlined />}
//                     </Box>
//                     <Box>
//                       <Typography variant="h6" fontWeight={800}>Resumen del Movimiento</Typography>
//                       <Typography variant="caption" sx={{ opacity: 0.85 }}>
//                         {tipoFlujo} · {subtipo?.label}{reference ? ` · Ref: ${reference}` : ""}
//                       </Typography>
//                     </Box>
//                   </Stack>
//                   <Chip label={`${totalMovements} movimiento${totalMovements !== 1 ? "s" : ""}`} size="small"
//                     sx={{ bgcolor: "rgba(255,255,255,0.25)", color: "white", fontWeight: 700 }} />
//                 </Box>
//               </Box>

//               <Box sx={{ p: 3 }}>
//                 {/* KPIs */}
//                 <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
//                   {[
//                     { label: "Ítems",          value: lineItems.length,                                                                       color: "#1d4ed8" },
//                     { label: "Movimientos",     value: totalMovements,                                                                         color: accentColor },
//                     { label: "Equipos pistol.", value: `${lineItems.filter(i => i.productType === "EQUIPMENT" && (i.serials?.length ?? 0) > 0).length}/${lineItems.filter(i => i.productType === "EQUIPMENT").length}`, color: "#15803d" },
//                     { label: "Valor estimado",  value: totalValue > 0 ? `S/ ${totalValue.toFixed(2)}` : "—",                                  color: "#7c3aed" },
//                   ].map(kpi => (
//                     <Paper key={kpi.label} variant="outlined" sx={{ flex: "1 1 110px", p: 2, borderRadius: 2, textAlign: "center", border: `1px solid ${kpi.color}20` }}>
//                       <Typography variant="h5" fontWeight={800} sx={{ color: kpi.color }}>{kpi.value}</Typography>
//                       <Typography variant="caption" color="text.secondary" fontWeight={600}>{kpi.label}</Typography>
//                     </Paper>
//                   ))}
//                 </Box>

//                 {/* Errores de validación */}
//                 {validationErrors.length > 0 && (
//                   <Alert severity="warning" icon={<WarningAmberOutlined />} sx={{ borderRadius: 2, mb: 2.5 }}>
//                     <Typography variant="body2" fontWeight={700} mb={0.5}>Pendientes antes de confirmar:</Typography>
//                     {validationErrors.map((e, i) => (
//                       <Typography key={i} variant="caption" display="block" color="text.secondary">• {e}</Typography>
//                     ))}
//                   </Alert>
//                 )}

//                 <Alert severity={isEntrada ? "success" : "error"} sx={{ borderRadius: 2, mb: 3 }}>
//                   Al confirmar se registrarán <strong>{totalMovements} movimientos de kardex</strong> tipo{" "}
//                   <strong>{tipoFlujo === "ENTRADA" ? "ENTRY" : "EXIT"}</strong> · subtipo{" "}
//                   <strong>{subtipo?.value}</strong>. Esta acción es <strong>irreversible</strong>.
//                 </Alert>

//                 <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, flexWrap: "wrap" }}>
//                   <ButtonBase label="Reiniciar" onClick={resetAll}
//                     sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1" }} />
//                   <ButtonBase
//                     label={submitting ? "Registrando..." : `Confirmar ${tipoFlujo} de Kardex`}
//                     startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <SendOutlined />}
//                     onClick={handleSubmit}
//                     disabled={!canSubmit || submitting}
//                     sx={{ px: 4, py: 1.4, fontWeight: 700, borderRadius: 2.5,
//                       background: canSubmit ? `linear-gradient(135deg, ${isEntrada ? "#15803d" : "#b91c1c"} 0%, ${isEntrada ? "#16a34a" : "#dc2626"} 100%)` : undefined,
//                       boxShadow: canSubmit ? `0 4px 14px ${accentColor}40` : "none",
//                     }}
//                   />
//                 </Box>
//               </Box>
//             </Card>
//           </Collapse>

//         </Box>
//       </Fade>

//       {/* ══ DIALOG: CANTIDAD DE EQUIPOS ══ */}
//       <Dialog open={addEquipoOpen} onClose={() => setAddEquipoOpen(false)} maxWidth="xs" fullWidth
//         PaperProps={{ sx: { borderRadius: 3 } }}>
//         <DialogTitle sx={{ m: 0, p: 0 }}>
//           <Box sx={{ bgcolor: "#1e293b", p: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//             <Stack direction="row" spacing={1.5} alignItems="center">
//               <Box sx={{ bgcolor: PRODUCT_CFG.EQUIPMENT.color, p: 0.8, borderRadius: 1.5, display: "flex" }}>
//                 <ConstructionOutlined sx={{ fontSize: 16, color: "white" }} />
//               </Box>
//               <Box>
//                 <Typography variant="subtitle1" fontWeight={700} color="white">Agregar Equipo</Typography>
//                 <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
//                   {addEquipoItem?.code} — {addEquipoItem?.name}
//                 </Typography>
//               </Box>
//             </Stack>
//             <IconButton size="small" onClick={() => setAddEquipoOpen(false)} sx={{ color: "rgba(255,255,255,0.5)" }}>
//               <CloseOutlined fontSize="small" />
//             </IconButton>
//           </Box>
//         </DialogTitle>
//         <DialogContent sx={{ p: 3 }}>
//           <Alert severity="info" sx={{ borderRadius: 2, mb: 2.5, fontSize: "0.8rem" }}>
//             Define la <strong>cantidad total</strong> de equipos a {isEntrada ? "ingresar" : "retirar"}. Luego pistolearás cada uno con su serie, MAC y UA desde el carrito.
//           </Alert>
//           <Typography variant="body2" fontWeight={600} mb={1.2}>
//             ¿Cuántos equipos vas a {isEntrada ? "ingresar" : "retirar"}?
//           </Typography>
//           <TextField
//             fullWidth autoFocus type="number"
//             label="Cantidad de equipos" placeholder="Ej: 10"
//             value={addEquipoCant}
//             onChange={e => setAddEquipoCant(e.target.value)}
//             onKeyDown={e => { if (e.key === "Enter") confirmAddEquipo(); }}
//             inputProps={{ min: 1, style: { fontWeight: 800, fontSize: "1.5rem", textAlign: "center", padding: "14px 0" } }}
//             sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, "& fieldset": { borderColor: PRODUCT_CFG.EQUIPMENT.color, borderWidth: 2 } },
//               "& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button": { display: "none" },
//               "& input[type=number]": { MozAppearance: "textfield" } }}
//           />
//           {parseInt(addEquipoCant) > 1 && (
//             <Box sx={{ mt: 1.5, p: 1.5, bgcolor: "#f0fdf4", borderRadius: 2, border: "1px solid #bbf7d0" }}>
//               <Typography variant="caption" color="success.main" fontWeight={600}>
//                 ✓ Se agregarán <strong>{addEquipoCant} unidades</strong> de {addEquipoItem?.name}. Deberás pistolear los {addEquipoCant} seriales.
//               </Typography>
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions sx={{ p: 2.5, bgcolor: "#f8fafc", borderTop: "1px solid #e2e8f0", gap: 1 }}>
//           <ButtonBase label="Cancelar" onClick={() => setAddEquipoOpen(false)}
//             sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1" }} />
//           <ButtonBase
//             label={`Agregar ${addEquipoCant || "1"} equipo${parseInt(addEquipoCant) > 1 ? "s" : ""} → Pistolear`}
//             startIcon={<QrCodeScannerOutlined />}
//             onClick={confirmAddEquipo}
//             sx={{ px: 3, background: `linear-gradient(135deg, ${PRODUCT_CFG.EQUIPMENT.color} 0%, #16a34a 100%)`, boxShadow: "0 4px 12px rgba(21,128,61,0.3)" }}
//           />
//         </DialogActions>
//       </Dialog>

//       {/* ══ DIALOG PISTOLEO ══ */}
//       <Dialog open={pistoleoOpen} onClose={() => setPistoleoOpen(false)} maxWidth="sm" fullWidth
//         PaperProps={{ sx: { borderRadius: 3, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" } }}>
//         <DialogTitle sx={{ m: 0, p: 0 }}>
//           <Box sx={{ bgcolor: "#1e293b", p: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//             <Stack direction="row" spacing={1.5} alignItems="center">
//               <Box sx={{ bgcolor: "#22c55e", p: 0.8, borderRadius: 1.5, display: "flex" }}>
//                 <QrCodeScannerOutlined sx={{ fontSize: 17, color: "white" }} />
//               </Box>
//               <Box>
//                 <Typography variant="subtitle1" fontWeight={700} color="white">Pistoleo de Equipo</Typography>
//                 {pistoleoItem && (
//                   <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
//                     {pistoleoItem.itemCode} · {pistoleoItem.itemName} · {serialesCap.length}/{pistoleoItem.quantity} capturados
//                   </Typography>
//                 )}
//               </Box>
//             </Stack>
//             <IconButton onClick={() => setPistoleoOpen(false)} size="small" sx={{ color: "rgba(255,255,255,0.6)" }}>
//               <CloseOutlined fontSize="small" />
//             </IconButton>
//           </Box>
//         </DialogTitle>

//         <DialogContent sx={{ p: 3 }}>
//           {pistoleoItem && (() => {
//             const tipo     = getEquipoTipo(pistoleoItem.description);
//             const campos   = CAMPOS_EQUIPO[tipo];
//             const totalReq = pistoleoItem.quantity;
//             const totalCap = serialesCap.length;
//             const todosCompletos = campos.every(c => !!(serialActual as any)[c.field]?.trim());

//             return (
//               <>
//                 {/* Barra de progreso */}
//                 <Box sx={{ mb: 3, p: 2.5, bgcolor: "#f8fafc", borderRadius: 2, border: "1px solid #e2e8f0" }}>
//                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
//                     <Typography variant="body2" fontWeight={700}>Progreso de Captura</Typography>
//                     <Chip label={`${totalCap} / ${totalReq}`} size="small"
//                       color={totalCap === totalReq ? "success" : totalCap > 0 ? "warning" : "default"}
//                       sx={{ fontWeight: 800 }} />
//                   </Box>
//                   <LinearProgress variant="determinate" value={Math.min((totalCap / totalReq) * 100, 100)}
//                     sx={{ height: 8, borderRadius: 4, bgcolor: "#e2e8f0",
//                       "& .MuiLinearProgress-bar": { bgcolor: totalCap === totalReq ? "#22c55e" : "#f59e0b", borderRadius: 4 } }} />
//                   <Stack direction="row" spacing={1} sx={{ mt: 1.5 }} flexWrap="wrap">
//                     <Chip label={`Tipo: ${tipo}`} size="small" color="info" sx={{ fontWeight: 700 }} />
//                     <Typography variant="caption" color="text.secondary" sx={{ alignSelf: "center" }}>
//                       Campos: {campos.map(c => c.label).join(" · ")}
//                     </Typography>
//                   </Stack>
//                 </Box>

//                 {/* Toggle auto-guardar */}
//                 <Box sx={{ mb: 2.5, p: 2, borderRadius: 2, bgcolor: autoGuardar ? "#f0fdf4" : "#f8fafc", border: `1px solid ${autoGuardar ? "#bbf7d0" : "#e2e8f0"}`, transition: "all 0.3s" }}>
//                   <FormControlLabel
//                     control={<Switch checked={autoGuardar} onChange={e => setAutoGuardar(e.target.checked)} color="success" size="small" />}
//                     label={
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
//                         <AutoAwesomeOutlined sx={{ fontSize: 14, color: autoGuardar ? "success.main" : "text.disabled" }} />
//                         <Typography variant="body2" fontWeight={700} sx={{ color: autoGuardar ? "#15803d" : "text.secondary" }}>
//                           Auto-agregar al completar campos
//                         </Typography>
//                       </Box>
//                     } sx={{ m: 0 }}
//                   />
//                 </Box>

//                 {/* Campos de captura */}
//                 <Stack spacing={2} sx={{ mb: 3 }}>
//                   {campos.map(campo => {
//                     const valor    = (serialActual as any)[campo.field] ?? "";
//                     const error    = camposError[campo.field] ?? "";
//                     const regla    = VALIDACIONES[campo.field];
//                     const esValido = regla ? regla.regex.test(valor.trim()) && valor.trim() !== "" : valor.trim() !== "";
//                     const tieneErr = !!error && valor.trim() !== "";
//                     return (
//                       <Box key={campo.field}>
//                         <Typography variant="body2" color="text.secondary" fontWeight={600} mb={0.5}>
//                           {campo.label} *
//                           {esValido && <CheckCircle sx={{ fontSize: 13, color: "success.main", ml: 0.5, verticalAlign: "middle" }} />}
//                         </Typography>
//                         <TextField fullWidth size="small" placeholder={campo.placeholder} value={valor}
//                           onChange={e => handleCampoChange(campo.field, e.target.value, tipo, totalReq)}
//                           disabled={totalCap >= totalReq} error={tieneErr}
//                           helperText={tieneErr ? error : esValido ? "✓ Válido" : regla ? `Ej: ${campo.placeholder}` : undefined}
//                           FormHelperTextProps={{ sx: { color: tieneErr ? "error.main" : esValido ? "success.main" : "text.disabled" } }}
//                           sx={{ "& .MuiOutlinedInput-root": {
//                             ...(esValido  && { "& fieldset": { borderColor: "success.main", borderWidth: 2 } }),
//                             ...(tieneErr  && { "& fieldset": { borderColor: "error.main",   borderWidth: 2 } }),
//                           }}}
//                           InputProps={campo.field === "serialNumber" ? {
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <QrCodeScannerOutlined sx={{ fontSize: 16, color: esValido ? "success.main" : "text.disabled" }} />
//                               </InputAdornment>
//                             ),
//                           } : undefined}
//                         />
//                       </Box>
//                     );
//                   })}
//                 </Stack>

//                 {/* Botón manual si auto-guardar está OFF */}
//                 {!autoGuardar && (
//                   <ButtonBase fullWidth
//                     label={totalCap >= totalReq ? "✓ Captura completa" : `Agregar Serial ${totalCap + 1} de ${totalReq}`}
//                     startIcon={<AddCircleOutline />}
//                     onClick={agregarSerialManual}
//                     disabled={!serialActual.serialNumber?.trim() || totalCap >= totalReq}
//                     sx={{ mb: 2.5 }}
//                   />
//                 )}

//                 {/* Indicador auto-guardar */}
//                 {autoGuardar && totalCap < totalReq && (
//                   <Box sx={{ mb: 2.5, p: 1.5, borderRadius: 2, textAlign: "center",
//                     bgcolor: todosCompletos ? "#dcfce7" : "#f8fafc",
//                     border: `1px solid ${todosCompletos ? "#86efac" : "#e2e8f0"}`, transition: "all 0.3s" }}>
//                     <Typography variant="caption" fontWeight={600} sx={{ color: todosCompletos ? "#15803d" : "text.disabled" }}>
//                       {todosCompletos
//                         ? "⚡ Guardando automáticamente..."
//                         : `Completa los campos para auto-guardar el serial ${totalCap + 1} de ${totalReq}`}
//                     </Typography>
//                   </Box>
//                 )}

//                 {/* Lista de seriales capturados */}
//                 {serialesCap.length > 0 && (
//                   <Box>
//                     <Typography variant="body2" fontWeight={700} mb={1.2} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                       <CheckCircleOutline sx={{ fontSize: 16, color: "success.main" }} />
//                       Seriales Capturados ({serialesCap.length})
//                     </Typography>
//                     <Stack spacing={0.7}>
//                       {serialesCap.map((s, idx) => (
//                         <Box key={idx} sx={{ p: 1.5, bgcolor: "#f0fdf4", borderRadius: 2, border: "1px solid #bbf7d0", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
//                           <Stack spacing={0.2}>
//                             <Typography variant="caption" fontWeight={800} sx={{ color: "#15803d" }}>#{idx + 1}</Typography>
//                             {s.serialNumber && <Typography variant="caption" color="text.secondary">SN: {s.serialNumber}</Typography>}
//                             {s.mac          && <Typography variant="caption" color="text.secondary">MAC: {s.mac}</Typography>}
//                             {s.ua           && <Typography variant="caption" color="text.secondary">UA: {s.ua}</Typography>}
//                             {s.mtaMac       && <Typography variant="caption" color="text.secondary">MTA: {s.mtaMac}</Typography>}
//                           </Stack>
//                           <IconButton size="small"
//                             onClick={() => setSerialésCapturados(prev => prev.filter((_, i) => i !== idx))}
//                             sx={{ color: "error.light", mt: -0.5 }}>
//                             <CloseOutlined sx={{ fontSize: 14 }} />
//                           </IconButton>
//                         </Box>
//                       ))}
//                     </Stack>
//                   </Box>
//                 )}
//               </>
//             );
//           })()}
//         </DialogContent>

//         <DialogActions sx={{ p: 2.5, bgcolor: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
//           <ButtonBase label="Cancelar" onClick={() => setPistoleoOpen(false)}
//             sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1" }} />
//           <ButtonBase
//             label={`Guardar ${serialesCap.length} Serial(es)`}
//             startIcon={<ArrowForwardOutlined />}
//             onClick={guardarSeriales}
//             disabled={serialesCap.length === 0}
//             sx={{ px: 3 }}
//           />
//         </DialogActions>
//       </Dialog>

//     </Box>
//   );
// }

"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  Box, Card, Typography, Chip, Stack, Paper, Divider, Alert,
  TextField, IconButton, Fade, Collapse, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControlLabel, Switch, LinearProgress, InputAdornment,
  Tooltip, Badge,
} from "@mui/material";
import {
  TrendingUpOutlined, TrendingDownOutlined, CheckCircleOutline,
  QrCodeScannerOutlined, CloseOutlined, DeleteOutline,
  AddCircleOutline, InventoryOutlined, BuildOutlined,
  ConstructionOutlined, ShieldOutlined, CheckCircle,
  AutoAwesomeOutlined, SendOutlined, LayersOutlined,
  SwapHorizOutlined, InfoOutlined, WarningAmberOutlined,
  ArrowForwardOutlined, DoneAllOutlined, SearchOutlined,
  RefreshOutlined, StorageOutlined,
} from "@mui/icons-material";
import ButtonBase from "@/src/components/base/ButtonBase";
import SelectBase from "@/src/components/base/SelectBase";
import { TitleCard } from "@/src/components/base/TitleCard";
import { toast } from "react-toastify";
import { API_URL } from "@/src/lib/config";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type TipoFlujo   = "ENTRADA" | "SALIDA";
type ProductType = "MATERIAL" | "TOOL" | "EQUIPMENT" | "EPP";

interface SubtipoMovimiento {
  value: string; label: string; description: string;
  icon: string; color: string; bg: string;
}

// ── Modelo que viene de GET /api/hub-inventory ───────────────────────────────
interface HubInventoryItem {
  id: number;           // hub_inventory.id → inventoryId
  itemId: number;       // FK lógica a catalog_items
  itemCode: string;     // código del catálogo (viene del JOIN)
  description: string;  // descripción del catálogo (viene del JOIN)
  productType: ProductType;
  supplySource: string;
  quantityAvailable: number;
  quantityReserved: number;
  quantityInTransit: number;
  minimumStock: number;
  maximumStock: number | null;
  locationCode: string | null;
  averageCost: number | null;
}

// ── Item en el carrito de kardex ─────────────────────────────────────────────
interface KardexLineItem {
  inventoryId: number;   // hub_inventory.id
  itemId: number;        // catalog_items.id
  itemCode: string;
  description: string;
  productType: ProductType;
  supplySource: string;
  quantityAvailable: number;
  quantity: number;
  unitPrice: number;
  _rawQty?: string;
  serials?: EquipoSerial[];
}

interface EquipoSerial {
  serialNumber: string;
  mac?: string;
  ua?: string;
  mtaMac?: string;
}

// ─── Subtipos de movimiento ───────────────────────────────────────────────────

const SUBTIPOS_ENTRADA: SubtipoMovimiento[] = [
  { value: "SUPPLY_REQUEST",    label: "Abastecimiento",        description: "Ingreso por solicitud de reabastecimiento aprobada",       icon: "📦", color: "#15803d", bg: "#f0fdf4" },
  { value: "DEVOLUCION",        label: "Devolución",            description: "Material devuelto por conductor o técnico al hub",          icon: "↩️", color: "#0369a1", bg: "#f0f9ff" },
  { value: "TRANSFER",  label: "Transferencia Entrada", description: "Traspaso recibido desde otro hub o almacén central",        icon: "🔀", color: "#6d28d9", bg: "#faf5ff" },
  { value: "AJUSTE_POSITIVO",   label: "Ajuste Positivo",       description: "Corrección de inventario por conteo físico (excedente)",    icon: "➕", color: "#b45309", bg: "#fffbeb" },
  { value: "COMPRA_DIRECTA",    label: "Compra Directa",        description: "Ingreso por compra directa a proveedor externo sin OC",     icon: "🛒", color: "#be185d", bg: "#fdf2f8" },
  { value: "FABRICACION",       label: "Fabricación Interna",   description: "Producto fabricado internamente, ingresa al stock del hub", icon: "⚙️", color: "#1d4ed8", bg: "#eff6ff" },
];

const SUBTIPOS_SALIDA: SubtipoMovimiento[] = [
  { value: "ASIGNACION",        label: "Asignación Técnico",    description: "Salida por asignación a conductor o técnico para servicio", icon: "👷", color: "#dc2626", bg: "#fef2f2" },
  { value: "CONSUMO_SERVICIO",  label: "Consumo en Servicio",   description: "Material consumido directamente en una orden de servicio",  icon: "🔧", color: "#ea580c", bg: "#fff7ed" },
  { value: "TRANSFER", label: "Transferencia Salida",  description: "Traspaso enviado a otro hub o almacén central",             icon: "📤", color: "#7c3aed", bg: "#faf5ff" },
  { value: "BAJA_MERMA",        label: "Baja / Merma",          description: "Producto dañado, vencido o dado de baja definitivamente",   icon: "🗑️", color: "#475569", bg: "#f8fafc" },
  { value: "AJUSTE_NEGATIVO",   label: "Ajuste Negativo",       description: "Corrección de inventario por conteo físico (faltante)",     icon: "➖", color: "#b45309", bg: "#fffbeb" },
  { value: "PRESTAMO",          label: "Préstamo",              description: "Salida temporal con expectativa de devolución posterior",   icon: "🤝", color: "#0891b2", bg: "#f0fdfa" },
];

// ─── Config visual por tipo de producto ──────────────────────────────────────

const PRODUCT_CFG: Record<ProductType, {
  label: string; icon: React.ReactNode; emoji: string;
  color: string; bg: string; border: string;
}> = {
  MATERIAL:  { label: "Material",    icon: <InventoryOutlined    sx={{ fontSize: 15 }} />, emoji: "📦", color: "#ea580c", bg: "#fff7ed", border: "#fed7aa" },
  TOOL:      { label: "Herramienta", icon: <BuildOutlined        sx={{ fontSize: 15 }} />, emoji: "🔧", color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
  EQUIPMENT: { label: "Equipo",      icon: <ConstructionOutlined sx={{ fontSize: 15 }} />, emoji: "⚙️", color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0" },
  EPP:       { label: "EPP",         icon: <ShieldOutlined       sx={{ fontSize: 15 }} />, emoji: "🦺", color: "#7c3aed", bg: "#faf5ff", border: "#ddd6fe" },
};

// ─── Pistoleo: campos por tipo de equipo ──────────────────────────────────────

type CampoConfig = { field: string; label: string; placeholder: string };
type EquipoTipo  = "MODEM" | "DECODIFICADOR" | "ROUTER" | "SWITCH" | "OTRO";

const CAMPOS_EQUIPO: Record<EquipoTipo, CampoConfig[]> = {
  MODEM:         [{ field: "serialNumber", label: "Nro. de Serie", placeholder: "ZTEATV45501950107" }, { field: "mac",    label: "MAC Address", placeholder: "6C:B8:81:F2:B7:D7" }, { field: "ua",     label: "UA",          placeholder: "12345678" }],
  DECODIFICADOR: [{ field: "serialNumber", label: "Nro. de Serie", placeholder: "ZTEATV45501950107" }, { field: "mac",    label: "MAC Address", placeholder: "6C:B8:81:F2:B7:D7" }],
  ROUTER:        [{ field: "serialNumber", label: "Nro. de Serie", placeholder: "ZTEATV45501950107" }, { field: "mac",    label: "MAC Address", placeholder: "6C:B8:81:F2:B7:D7" }, { field: "mtaMac", label: "MTA MAC",     placeholder: "CC00F1CA6351" }],
  SWITCH:        [{ field: "serialNumber", label: "Nro. de Serie", placeholder: "ZTEATV45501950107" }, { field: "mac",    label: "MAC Address", placeholder: "6C:B8:81:F2:B7:D7" }],
  OTRO:          [{ field: "serialNumber", label: "Nro. de Serie", placeholder: "ZTEATV45501950107" }],
};

const VALIDACIONES: Record<string, { regex: RegExp; mensaje: string }> = {
  serialNumber: { regex: /^[A-Z0-9]{8,25}$/,                       mensaje: "Alfanumérico 8–25 chars (ej: ZTEATV45501950107)" },
  mac:          { regex: /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/,  mensaje: "Formato: 6C:B8:81:F2:B7:D7" },
  mtaMac:       { regex: /^[0-9A-Fa-f]{12}$/,                      mensaje: "12 hex sin separadores (ej: CC00F1CA6351)" },
  ua:           { regex: /^.{6,12}$/,                               mensaje: "6–12 caracteres" },
};

const getEquipoTipo = (desc: string): EquipoTipo => {
  const d = desc.toUpperCase();
  if (d.includes("MODEM") || d.includes("HFC"))           return "MODEM";
  if (d.includes("DECODIFICADOR") || d.includes("AMINO")) return "DECODIFICADOR";
  if (d.includes("ROUTER") || d.includes("WIFI"))         return "ROUTER";
  if (d.includes("SWITCH"))                               return "SWITCH";
  return "OTRO";
};

// ─── Constantes ───────────────────────────────────────────────────────────────

const TENANT_ID  = 1;
const HUB_ID     = 1;
const PROJECT_ID = 1;
const USER_ID    = 1;
const PAGE_SIZE  = 15;

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

export default function KardexMovement() {
  const topRef = useRef<HTMLDivElement>(null);

  // ── Configuración del movimiento ──────────────────────────────────────
  const [tipoFlujo, setTipoFlujo] = useState<TipoFlujo | null>(null);
  const [subtipo,   setSubtipo]   = useState<SubtipoMovimiento | null>(null);
  const [notes,     setNotes]     = useState("");
  const [reference, setReference] = useState("");

  // ── Inventario ────────────────────────────────────────────────────────
  const [filterType,      setFilterType]      = useState<string>("ALL");
  const [inventorySearch, setInventorySearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [inventoryRows,    setInventoryRows]    = useState<HubInventoryItem[]>([]);
  const [inventoryTotal,   setInventoryTotal]   = useState(0);
  const [inventoryPage,    setInventoryPage]    = useState(0);
  const [inventoryPages,   setInventoryPages]   = useState(1);
  const [loadingInventory, setLoadingInventory] = useState(false);
  const [reloadTrigger,    setReloadTrigger]    = useState(0);

  // ── Items del movimiento ──────────────────────────────────────────────
  const [lineItems, setLineItems] = useState<KardexLineItem[]>([]);

  // ── Dialog: agregar equipo con cantidad ──────────────────────────────
  const [addEquipoOpen, setAddEquipoOpen] = useState(false);
  const [addEquipoItem, setAddEquipoItem] = useState<HubInventoryItem | null>(null);
  const [addEquipoCant, setAddEquipoCant] = useState("1");

  // ── Pistoleo ──────────────────────────────────────────────────────────
  const [pistoleoOpen, setPistoleoOpen]       = useState(false);
  const [pistoleoItem, setPistoleoItem]       = useState<KardexLineItem | null>(null);
  const [serialActual, setSerialActual]       = useState<Partial<EquipoSerial>>({});
  const [serialesCap,  setSerialésCapturados] = useState<EquipoSerial[]>([]);
  const [camposError,  setCamposError]        = useState<Record<string, string>>({});
  const [autoGuardar,  setAutoGuardar]        = useState(true);

  // ── Submit ────────────────────────────────────────────────────────────
  const [submitting,  setSubmitting]  = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // ── Debounce búsqueda ─────────────────────────────────────────────────
  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setDebouncedSearch(inventorySearch);
      setInventoryPage(0);
    }, 380);
    return () => { if (searchTimer.current) clearTimeout(searchTimer.current); };
  }, [inventorySearch]);

  // ── Fetch inventario — igual que InventarioHub ────────────────────────
  const fetchInventory = useCallback(async (page: number = 0) => {
    setLoadingInventory(true);
    try {
      const params = new URLSearchParams({
        tenantId: String(TENANT_ID),
        hubId:    String(HUB_ID),
        page:     String(page),
        size:     String(PAGE_SIZE),
        ...(filterType !== "ALL"         ? { productType: filterType }            : {}),
        ...(debouncedSearch.trim()       ? { search: debouncedSearch.trim() }     : {}),
      });
      const res = await fetch(`${API_URL}/api/hub-inventory?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: any = await res.json();
      const content: HubInventoryItem[] = data.data.content ?? [];
      setInventoryRows(content);
      const total = data.data.page?.totalElements ?? data.data.totalElements ?? content.length;
      const pages = data.data.page?.totalPages   ?? data.data.totalPages    ?? 1;
      setInventoryTotal(total);
      setInventoryPages(pages);
      setInventoryPage(page);
    } catch (e: any) {
      toast.error(`Error al cargar inventario: ${e.message}`);
    } finally {
      setLoadingInventory(false);
    }
  }, [filterType, debouncedSearch, reloadTrigger]);

  useEffect(() => { fetchInventory(0); }, [fetchInventory]);

  // ── Agregar ítem no-equipo al carrito ─────────────────────────────────
  const addNonEquipmentItem = (inv: HubInventoryItem) => {
    if (lineItems.some(li => li.inventoryId === inv.id)) {
      toast.info(`${inv.itemCode} ya está en el movimiento`); return;
    }
    // Para SALIDA: validar que haya stock suficiente
    if (tipoFlujo === "SALIDA" && inv.quantityAvailable <= 0) {
      toast.warning(`${inv.itemCode} no tiene stock disponible`); return;
    }
    setLineItems(prev => [...prev, {
      inventoryId:       inv.id,
      itemId:            inv.itemId,
      itemCode:          inv.itemCode,
      description:       inv.description,
      productType:       inv.productType,
      supplySource:      inv.supplySource,
      quantityAvailable: inv.quantityAvailable,
      quantity:          1,
      unitPrice:         inv.averageCost ?? 0,
      _rawQty:           "1",
      serials:           [],
    }]);
    toast.success(`${inv.itemCode} agregado`);
  };

  // ── Abrir dialog de cantidad para equipos ─────────────────────────────
  const openAddEquipo = (inv: HubInventoryItem) => {
    if (lineItems.some(li => li.inventoryId === inv.id)) {
      toast.info(`${inv.itemCode} ya está en el movimiento`); return;
    }
    if (tipoFlujo === "SALIDA" && inv.quantityAvailable <= 0) {
      toast.warning(`${inv.itemCode} no tiene stock disponible`); return;
    }
    setAddEquipoItem(inv);
    setAddEquipoCant("1");
    setAddEquipoOpen(true);
  };

  const confirmAddEquipo = () => {
    if (!addEquipoItem) return;
    const cant = Math.max(1, parseInt(addEquipoCant, 10) || 1);
    // Validar que no supere stock disponible en SALIDA
    if (tipoFlujo === "SALIDA" && cant > addEquipoItem.quantityAvailable) {
      toast.warning(`Solo hay ${addEquipoItem.quantityAvailable} unidades disponibles`);
      return;
    }
    setLineItems(prev => [...prev, {
      inventoryId:       addEquipoItem.id,
      itemId:            addEquipoItem.itemId,
      itemCode:          addEquipoItem.itemCode,
      description:       addEquipoItem.description,
      productType:       "EQUIPMENT",
      supplySource:      addEquipoItem.supplySource,
      quantityAvailable: addEquipoItem.quantityAvailable,
      quantity:          cant,
      unitPrice:         addEquipoItem.averageCost ?? 0,
      _rawQty:           String(cant),
      serials:           [],
    }]);
    setAddEquipoOpen(false);
    setAddEquipoItem(null);
    toast.success(`${addEquipoItem.itemCode} — ${cant} unidad(es) listas para pistolear`);
  };

  // ── CRUD líneas del carrito ───────────────────────────────────────────
  const removeItem = (inventoryId: number) =>
    setLineItems(prev => prev.filter(i => i.inventoryId !== inventoryId));

  const updateQty = (inventoryId: number, raw: string) => {
    const parsed = parseInt(raw, 10);
    setLineItems(prev => prev.map(i =>
      i.inventoryId === inventoryId
        ? { ...i, quantity: isNaN(parsed) ? 0 : Math.max(0, parsed), _rawQty: raw }
        : i
    ));
  };

  const updatePrice = (inventoryId: number, raw: string) => {
    const parsed = parseFloat(raw);
    setLineItems(prev => prev.map(i =>
      i.inventoryId === inventoryId
        ? { ...i, unitPrice: isNaN(parsed) ? 0 : parsed }
        : i
    ));
  };

  // ── Pistoleo ──────────────────────────────────────────────────────────
  const abrirPistoleo = (item: KardexLineItem) => {
    setPistoleoItem(item);
    setSerialActual({});
    setCamposError({});
    setSerialésCapturados(item.serials ? [...item.serials] : []);
    setPistoleoOpen(true);
  };

  const validarCampo = (field: string, value: string): string => {
    if (!value.trim()) return "";
    const regla = VALIDACIONES[field];
    return regla && !regla.regex.test(value.trim()) ? regla.mensaje : "";
  };

  const checkAutoAgregar = useCallback((
    nuevoSerial: Partial<EquipoSerial>,
    tipo: EquipoTipo,
    totalReq: number,
    currentList: EquipoSerial[]
  ) => {
    if (!autoGuardar) return;
    const campos = CAMPOS_EQUIPO[tipo];
    const todoCompleto = campos.every(c => !!(nuevoSerial as any)[c.field]?.trim());
    if (!todoCompleto) return;
    const hayErrores = campos.some(c => !!validarCampo(c.field, (nuevoSerial as any)[c.field] ?? ""));
    if (hayErrores) return;
    const nuevaLista = [...currentList, { ...nuevoSerial } as EquipoSerial];
    setSerialésCapturados(nuevaLista);
    setSerialActual({});
    setCamposError({});
    if (pistoleoItem && nuevaLista.length >= totalReq) guardarSerialesConLista(nuevaLista);
  }, [autoGuardar, pistoleoItem]);

  const handleCampoChange = (field: string, value: string, tipo: EquipoTipo, totalReq: number) => {
    const updated = { ...serialActual, [field]: value };
    setSerialActual(updated);
    const regla = VALIDACIONES[field];
    setCamposError(prev => ({ ...prev, [field]: regla && value.trim() ? validarCampo(field, value) : "" }));
    checkAutoAgregar(updated, tipo, totalReq, serialesCap);
  };

  const agregarSerialManual = () => {
    if (!pistoleoItem) return;
    const tipo   = getEquipoTipo(pistoleoItem.description);
    const campos = CAMPOS_EQUIPO[tipo];
    const errores: Record<string, string> = {};
    let hayError = false;
    campos.forEach(c => {
      const val = (serialActual as any)[c.field] ?? "";
      if (!val.trim()) { errores[c.field] = `${c.label} es requerido`; hayError = true; }
      else { const e = validarCampo(c.field, val); if (e) { errores[c.field] = e; hayError = true; } }
    });
    if (hayError) { setCamposError(errores); return; }
    setSerialésCapturados(prev => [...prev, { ...serialActual } as EquipoSerial]);
    setSerialActual({});
    setCamposError({});
  };

  const guardarSerialesConLista = (lista: EquipoSerial[]) => {
    if (!pistoleoItem) return;
    setLineItems(prev => prev.map(i =>
      i.inventoryId === pistoleoItem.inventoryId
        ? { ...i, serials: lista, quantity: lista.length, _rawQty: String(lista.length) }
        : i
    ));
    setPistoleoOpen(false);
  };

  const guardarSeriales = () => guardarSerialesConLista(serialesCap);

  // ── Validaciones para habilitar submit ───────────────────────────────
  const validationErrors: string[] = [];
  if (!tipoFlujo)             validationErrors.push("Selecciona el tipo de flujo (Entrada / Salida)");
  if (!subtipo)               validationErrors.push("Selecciona el subtipo de movimiento");
  if (lineItems.length === 0) validationErrors.push("Agrega al menos un ítem al movimiento");
  lineItems.filter(i => i.quantity === 0)
    .forEach(i => validationErrors.push(`${i.itemCode}: cantidad es 0`));
  lineItems.filter(i => i.productType === "EQUIPMENT" && (i.serials?.length ?? 0) === 0)
    .forEach(i => validationErrors.push(`${i.itemCode}: equipo sin seriales pistoliados`));
  // Para SALIDA: validar que no supere stock
  if (tipoFlujo === "SALIDA") {
    lineItems.filter(i => i.productType !== "EQUIPMENT" && i.quantity > i.quantityAvailable)
      .forEach(i => validationErrors.push(`${i.itemCode}: cantidad (${i.quantity}) supera stock disponible (${i.quantityAvailable})`));
  }

  const canSubmit = validationErrors.length === 0;

  // ── Build payload kardex-batch ────────────────────────────────────────
  // KardexMovementLineDto espera: tenantId, hubId, projectId, createdBy,
  // itemId, inventoryId, productType, movementType, supplySource,
  // quantity, unitPrice, sourceType, notes, serialNumber, macAddress, etc.
  const buildKardexPayload = () => ({
    movements: lineItems.flatMap((item:any) =>
      item.productType === "EQUIPMENT"
        ? (item.serials ?? []).map((serial:any) => ({
            tenantId:      TENANT_ID,
            hubId:         HUB_ID,
            projectId:     PROJECT_ID,
            createdBy:     USER_ID,
            itemId:        item.itemId,
            inventoryId:   item.inventoryId,   // ← viene del inventario
            productType:   item.productType,
            movementType:  tipoFlujo === "ENTRADA" ? "ENTRY" : "EXIT",
            supplySource:  item.supplySource,
            supplySourceEntityId:1,
            sourceType:    subtipo?.value,
            quantity:      1,
            unitPrice:     item.unitPrice,
            serialNumber:  serial.serialNumber,
            macAddress:    serial.mac     ?? null,
            mtaMacAddress: serial.mtaMac  ?? null,
            unitAddress:   serial.ua      ?? null,
            notes:         notes || `${subtipo?.label} — ${item.itemCode}`,
            reference,
          }))
        : [{
            tenantId:    TENANT_ID,
            hubId:       HUB_ID,
            projectId:   PROJECT_ID,
            createdBy:   USER_ID,
            itemId:      item.itemId,
            inventoryId: item.inventoryId,     // ← viene del inventario
            productType: item.productType,
            movementType: tipoFlujo === "ENTRADA" ? "ENTRY" : "EXIT",
            supplySource: item.supplySource,
            supplySourceEntityId:1,
            sourceType:   subtipo?.value,
            quantity:     item.quantity,
            unitPrice:    item.unitPrice,
            notes:        notes || `${subtipo?.label} — ${item.itemCode}`,
            reference,
          }]
    ),
  });

  // ── Build payload inventory-kardex-batch (solo ENTRADA) ───────────────
  // KardexInventoryBatchRequestDto:
  // inventoryLines: [{ inventoryId, itemId, supplyRequestItemId, productType, quantityDelivered, unitPrice }]
  // equipmentUnits: [{ inventoryId, itemId, tenantId, hubId, serialNumber, macAddress, ... }]
  const buildInventoryBatchPayload = () => ({
    createdBy: USER_ID,
    inventoryLines: lineItems.map(item => ({
      inventoryId:         item.inventoryId,
      itemId:              item.itemId,
      supplyRequestItemId: 0,           // sin supply request en kardex manual
      productType:         item.productType,
      quantityDelivered:   item.productType === "EQUIPMENT"
                             ? (item.serials?.length ?? 0)
                             : item.quantity,
      unitPrice:           item.unitPrice,
    })),
    equipmentUnits: lineItems
      .filter(i => i.productType === "EQUIPMENT")
      .flatMap(item =>
        (item.serials ?? []).map(serial => ({
          inventoryId:        item.inventoryId,
          itemId:             item.itemId,
          tenantId:           TENANT_ID,
          hubId:              HUB_ID,
          serialNumber:       serial.serialNumber,
          macAddress:         serial.mac    ?? null,
          mtaMacAddress:      serial.mtaMac ?? null,
          supplySource:       item.supplySource,
          supplySourceEntityId: 1,
          entryDate:          new Date().toISOString().split("T")[0],
          createdBy:          USER_ID,
        }))
      ),
  });

  // ── Submit ────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      // PASO 1: siempre registrar el movimiento de kardex
      const kardexPayload = buildKardexPayload();
      const kardexRes = await fetch(`${API_URL}/api/hub-inventory/kardex-batch`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(kardexPayload),
      });
      if (!kardexRes.ok) {
        const e = await kardexRes.json().catch(() => ({}));
        throw new Error(e.message ?? `kardex-batch HTTP ${kardexRes.status}`);
      }

      // PASO 2: solo ENTRADA → actualizar stock en hub_inventory
      // SALIDA usa adjustStock con signo negativo (backend maneja el signo)
      const invPayload = buildInventoryBatchPayload();
      const endpoint   = tipoFlujo === "ENTRADA"
        ? `${API_URL}/api/hub-inventory/inventory-kardex-batch`
        : `${API_URL}/api/hub-inventory/inventory-kardex-batch`; // mismo endpoint, el backend usa movementType

      const invRes = await fetch(endpoint, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          ...invPayload,
          movementType: tipoFlujo === "ENTRADA" ? "ENTRY" : "EXIT", // ← backend usa esto para sumar/restar
        }),
      });
      if (!invRes.ok) {
        const e = await invRes.json().catch(() => ({}));
        throw new Error(e.message ?? `inventory-batch HTTP ${invRes.status}`);
      }

      setShowSuccess(true);
      setReloadTrigger(t => t + 1); // refresca el inventario
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err: any) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const resetAll = () => {
    setTipoFlujo(null); setSubtipo(null); setNotes(""); setReference("");
    setLineItems([]); setShowSuccess(false);
  };

  // ── Derivados ─────────────────────────────────────────────────────────
  const isEntrada      = tipoFlujo === "ENTRADA";
  const accentColor    = isEntrada ? "#15803d" : tipoFlujo === "SALIDA" ? "#dc2626" : "#1e293b";
  const totalMovements = lineItems.reduce((s, i) =>
    s + (i.productType === "EQUIPMENT" ? (i.serials?.length ?? 0) : lineItems.length), 0);
  const totalValue     = lineItems.reduce((s, i) => s + i.quantity * (i.unitPrice ?? 0), 0);
  const subtiposActivos = tipoFlujo === "ENTRADA" ? SUBTIPOS_ENTRADA
                        : tipoFlujo === "SALIDA"  ? SUBTIPOS_SALIDA : [];

  // ─────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────
  return (
    <Box ref={topRef} sx={{ maxWidth: 1500, mx: "auto", p: { xs: 2, md: 4 }, display: "flex", flexDirection: "column", gap: 3 }}>

      <TitleCard
        icon={<LayersOutlined sx={{ fontSize: 32 }} />}
        title="Registro de Movimiento de Kardex"
        description="Registra entradas y salidas desde el inventario del hub con trazabilidad completa de seriales, MACs y cantidades."
      />

      {/* ══ PANTALLA ÉXITO ══ */}
      <Fade in={showSuccess} timeout={700} unmountOnExit>
        <Card elevation={0} sx={{
          borderRadius: 4,
          background: "linear-gradient(135deg,#f0fdf4 0%,#dcfce7 60%,#f0fdf4 100%)",
          border: "2px solid #bbf7d0", p: { xs: 4, md: 6 },
          textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          <Box sx={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", bgcolor: "rgba(34,197,94,0.08)" }} />
          <Box sx={{
            width: 96, height: 96, borderRadius: "50%", bgcolor: "#22c55e",
            mx: "auto", mb: 3, display: "flex", alignItems: "center", justifyContent: "center",
            animation: "pulseRing 2s ease-in-out infinite",
            "@keyframes pulseRing": {
              "0%,100%": { boxShadow: "0 0 0 16px rgba(34,197,94,0.12),0 0 0 32px rgba(34,197,94,0.06)" },
              "50%":     { boxShadow: "0 0 0 20px rgba(34,197,94,0.08),0 0 0 40px rgba(34,197,94,0.03)" },
            },
          }}>
            <DoneAllOutlined sx={{ fontSize: 48, color: "white" }} />
          </Box>
          <Typography variant="h4" fontWeight={800} sx={{ color: "#15803d", mb: 1 }}>¡Movimiento Registrado!</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 480, mx: "auto" }}>
            Se registraron <strong>{totalMovements}</strong> movimientos de kardex tipo <strong>{subtipo?.label}</strong>.
            {tipoFlujo === "ENTRADA" && " El inventario fue actualizado con el stock ingresado."}
            {tipoFlujo === "SALIDA"  && " El inventario fue descontado correctamente."}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 4 }}>
            {[
              { label: "Tipo",        value: tipoFlujo ?? "—",      color: accentColor },
              { label: "Subtipo",     value: subtipo?.label ?? "—", color: "#0369a1"   },
              { label: "Movimientos", value: `${totalMovements}`,   color: "#7c3aed"   },
              { label: "Ítems",       value: `${lineItems.length}`, color: "#b45309"   },
            ].map(c => (
              <Paper key={c.label} elevation={0} sx={{ px: 3, py: 2, borderRadius: 3, border: "1px solid #bbf7d0", bgcolor: "white", minWidth: 120, textAlign: "center" }}>
                <Typography variant="h5" fontWeight={800} sx={{ color: c.color }}>{c.value}</Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>{c.label}</Typography>
              </Paper>
            ))}
          </Box>
          <ButtonBase label="Nuevo Movimiento" startIcon={<SwapHorizOutlined />} onClick={resetAll}
            sx={{ px: 4, py: 1.5, fontWeight: 700, boxShadow: "0 4px 12px rgba(34,197,94,0.3)", borderRadius: 2.5 }}
          />
        </Card>
      </Fade>

      <Fade in={!showSuccess} timeout={400} unmountOnExit>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

          {/* ══ PASO 1: TIPO DE FLUJO ══ */}
          <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", overflow: "hidden" }}>
            <Box sx={{ display: "flex", alignItems: "stretch" }}>
              <Box sx={{ width: 6, bgcolor: tipoFlujo === "ENTRADA" ? "#15803d" : tipoFlujo === "SALIDA" ? "#dc2626" : "#cbd5e1", transition: "background 0.4s", flexShrink: 0 }} />
              <Box sx={{ flex: 1, p: 3 }}>
                <Typography variant="overline" sx={{ letterSpacing: 2, color: "text.disabled", fontSize: "0.68rem" }}>PASO 1 DE 4</Typography>
                <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1, mb: 2.5 }}>Tipo de Movimiento</Typography>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  {([
                    { tipo: "ENTRADA" as TipoFlujo, icon: <TrendingUpOutlined   sx={{ fontSize: 30 }} />, label: "Entrada", desc: "Ingreso de stock al hub",  color: "#15803d", bg: "#f0fdf4", activeBg: "#dcfce7", border: "#bbf7d0" },
                    { tipo: "SALIDA"  as TipoFlujo, icon: <TrendingDownOutlined sx={{ fontSize: 30 }} />, label: "Salida",  desc: "Egreso de stock del hub", color: "#dc2626", bg: "#fef2f2", activeBg: "#fee2e2", border: "#fecaca" },
                  ]).map(opt => {
                    const isActive = tipoFlujo === opt.tipo;
                    return (
                      <Box key={opt.tipo} onClick={() => { setTipoFlujo(opt.tipo); setSubtipo(null); setLineItems([]); }}
                        sx={{
                          flex: "1 1 200px", p: 2.5, borderRadius: 3, cursor: "pointer", transition: "all 0.25s",
                          bgcolor: isActive ? opt.activeBg : opt.bg,
                          border: `2px solid ${isActive ? opt.color : opt.border}`,
                          boxShadow: isActive ? `0 8px 24px ${opt.color}25` : "none",
                          transform: isActive ? "translateY(-2px)" : "none",
                          "&:hover": { transform: "translateY(-2px)", boxShadow: `0 8px 24px ${opt.color}20` },
                        }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: isActive ? opt.color : `${opt.color}15`, color: isActive ? "white" : opt.color, transition: "all 0.25s" }}>
                            {opt.icon}
                          </Box>
                          <Box>
                            <Typography variant="h6" fontWeight={800} sx={{ color: isActive ? opt.color : "text.primary", lineHeight: 1 }}>{opt.label}</Typography>
                            <Typography variant="caption" color="text.secondary">{opt.desc}</Typography>
                          </Box>
                          {isActive && <CheckCircle sx={{ ml: "auto", color: opt.color, fontSize: 20 }} />}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Card>

          {/* ══ PASO 2: SUBTIPO ══ */}
          <Collapse in={!!tipoFlujo} unmountOnExit>
            <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", overflow: "hidden" }}>
              <Box sx={{ display: "flex", alignItems: "stretch" }}>
                <Box sx={{ width: 6, bgcolor: subtipo ? accentColor : "#cbd5e1", transition: "background 0.4s", flexShrink: 0 }} />
                <Box sx={{ flex: 1, p: 3 }}>
                  <Typography variant="overline" sx={{ letterSpacing: 2, color: "text.disabled", fontSize: "0.68rem" }}>PASO 2 DE 4</Typography>
                  <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1, mb: 0.5 }}>Motivo del Movimiento</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2.5 }}>
                    ¿Por qué razón se genera esta {tipoFlujo === "ENTRADA" ? "entrada" : "salida"}?
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                    {subtiposActivos.map(st => {
                      const isActive = subtipo?.value === st.value;
                      return (
                        <Box key={st.value} onClick={() => setSubtipo(st)}
                          sx={{
                            flex: "1 1 190px", p: 2, borderRadius: 2.5, cursor: "pointer", transition: "all 0.2s",
                            bgcolor: isActive ? st.bg : "#fafbfc",
                            border: `1.5px solid ${isActive ? st.color : "#e2e8f0"}`,
                            boxShadow: isActive ? `0 4px 14px ${st.color}20` : "none",
                            transform: isActive ? "translateY(-1px)" : "none",
                            "&:hover": { border: `1.5px solid ${st.color}60`, bgcolor: st.bg, transform: "translateY(-1px)" },
                          }}>
                          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2 }}>
                            <Typography sx={{ fontSize: "1.3rem", lineHeight: 1, mt: 0.2 }}>{st.icon}</Typography>
                            <Box>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <Typography variant="body2" fontWeight={700} sx={{ color: isActive ? st.color : "text.primary", lineHeight: 1.2 }}>{st.label}</Typography>
                                {isActive && <CheckCircle sx={{ fontSize: 13, color: st.color }} />}
                              </Box>
                              <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.3, display: "block", mt: 0.3 }}>{st.description}</Typography>
                            </Box>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                  <Collapse in={!!subtipo}>
                    <Box sx={{ display: "flex", gap: 2, mt: 2.5, flexWrap: "wrap" }}>
                      <TextField size="small" label="Código de Referencia" placeholder="GR-2024-XXX / OT-001..."
                        value={reference} onChange={e => setReference(e.target.value)}
                        sx={{ flex: "0 0 240px", "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                      />
                      <TextField size="small" label="Notas (opcional)" placeholder="Descripción adicional..."
                        value={notes} onChange={e => setNotes(e.target.value)}
                        sx={{ flex: 1, minWidth: 220, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                      />
                    </Box>
                  </Collapse>
                </Box>
              </Box>
            </Card>
          </Collapse>

          {/* ══ PASO 3: INVENTARIO + CARRITO ══ */}
          <Collapse in={!!subtipo} unmountOnExit>
            <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", overflow: "hidden" }}>
              <Box sx={{ display: "flex", alignItems: "stretch" }}>
                <Box sx={{ width: 6, bgcolor: lineItems.length > 0 ? accentColor : "#cbd5e1", transition: "background 0.4s", flexShrink: 0 }} />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ px: 3, pt: 3, pb: 2 }}>
                    <Typography variant="overline" sx={{ letterSpacing: 2, color: "text.disabled", fontSize: "0.68rem" }}>PASO 3 DE 4</Typography>
                    <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1 }}>Selección desde Inventario</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Busca en el inventario del hub y agrega los productos al movimiento
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" } }}>

                    {/* ─── PANEL INVENTARIO ────────────────────────────────── */}
                    <Box sx={{ flex: "0 0 500px", borderRight: { lg: "1px solid #e2e8f0" }, p: 3, display: "flex", flexDirection: "column", gap: 2 }}>

                      {/* Filtro tipo */}
                      <SelectBase
                        label="Tipo de Producto" size="small" value={filterType}
                        onChange={v => { setFilterType(String(v)); setInventoryPage(0); }}
                        options={[
                          { label: "Todos los productos", value: "ALL"       },
                          { label: "📦 Materiales",        value: "MATERIAL"  },
                          { label: "⚙️ Equipos",            value: "EQUIPMENT" },
                          { label: "🔧 Herramientas",       value: "TOOL"      },
                          { label: "🦺 EPP",               value: "EPP"       },
                        ]}
                        fullWidth
                      />

                      {/* Búsqueda */}
                      <TextField size="small" placeholder="Buscar por código o descripción..."
                        value={inventorySearch} onChange={e => setInventorySearch(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {loadingInventory
                                ? <CircularProgress size={14} />
                                : <SearchOutlined sx={{ fontSize: 16, color: "text.disabled" }} />}
                            </InputAdornment>
                          ),
                          endAdornment: inventorySearch ? (
                            <InputAdornment position="end">
                              <IconButton size="small" onClick={() => setInventorySearch("")}>
                                <CloseOutlined sx={{ fontSize: 14 }} />
                              </IconButton>
                            </InputAdornment>
                          ) : null,
                        }}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                      />

                      {/* Contador */}
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography variant="caption" color="text.secondary">
                          {loadingInventory ? "Cargando..." : `${inventoryTotal} ítems · Pág. ${inventoryPage + 1} de ${Math.max(inventoryPages, 1)}`}
                        </Typography>
                        <Tooltip title="Recargar inventario">
                          <IconButton size="small" onClick={() => { setReloadTrigger(t => t + 1); }} disabled={loadingInventory}>
                            <RefreshOutlined sx={{ fontSize: 15 }} />
                          </IconButton>
                        </Tooltip>
                      </Box>

                      {/* Lista */}
                      <Box sx={{
                        flex: 1, overflowY: "auto", maxHeight: 420,
                        display: "flex", flexDirection: "column", gap: 0.7,paddingInline:2,
                        "&::-webkit-scrollbar": { width: 10},
                        "&::-webkit-scrollbar-thumb": { bgcolor: "#cbd5e1", borderRadius: 2 },
                      }}>
                        {loadingInventory ? (
                          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                            <CircularProgress size={36} />
                          </Box>
                        ) : inventoryRows.length === 0 ? (
                          <Box sx={{ py: 6, textAlign: "center" }}>
                            <StorageOutlined sx={{ fontSize: 36, color: "text.disabled", mb: 1 }} />
                            <Typography variant="body2" color="text.disabled">Sin resultados</Typography>
                          </Box>
                        ) : inventoryRows.map(inv => {
                          const cfg     = PRODUCT_CFG[inv.productType];
                          const added   = lineItems.some(li => li.inventoryId === inv.id);
                          const isEquip = inv.productType === "EQUIPMENT";
                          const sinStock = inv.quantityAvailable <= 0;
                          const stockColor = sinStock ? "#94a3b8"
                            : inv.quantityAvailable <= inv.minimumStock ? "#dc2626"
                            : "#15803d";

                          return (
                            <Box key={inv.id}
                              sx={{
                                p: 1.5, borderRadius: 2,
                                border: `1px solid ${added ? cfg.color + "50" : sinStock ? "#e2e8f0" : "#e2e8f0"}`,
                                bgcolor: added ? cfg.bg : sinStock ? "#f8fafc" : "white",
                                transition: "all 0.15s", display: "flex", alignItems: "center", gap: 1.5,
                                opacity: sinStock && tipoFlujo === "SALIDA" ? 0.5 : 1,
                                "&:hover": { border: `1px solid ${cfg.color}60`, bgcolor: cfg.bg },
                              }}>
                              <Box sx={{ width: 30, height: 30, borderRadius: 1.5, bgcolor: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", color: cfg.color, border: `1px solid ${cfg.border}`, flexShrink: 0, fontSize: "1.1rem" }}>
                                {cfg.emoji}
                              </Box>
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, flexWrap: "wrap" }}>
                                  <Chip label={inv.itemCode} size="small"
                                    sx={{ bgcolor: cfg.color, color: "white", fontWeight: 700, fontSize: "0.62rem", height: 17 }}
                                  />
                                  <Typography variant="caption" fontWeight={600}
                                    sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 200 }}>
                                    {inv.description}
                                  </Typography>
                                </Box>
                                {/* Stock disponible */}
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.3 }}>
                                  <Typography variant="caption" sx={{ color: stockColor, fontWeight: 700, fontSize: "0.65rem" }}>
                                    📦 {inv.quantityAvailable} disp.
                                  </Typography>
                                  {inv.locationCode && (
                                    <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.62rem" }}>
                                      📍 {inv.locationCode}
                                    </Typography>
                                  )}
                                </Box>
                              </Box>
                              <Tooltip title={
                                added                                        ? "Ya en el movimiento"
                                : sinStock && tipoFlujo === "SALIDA"         ? "Sin stock disponible"
                                : isEquip                                     ? "Agregar equipo (indicar cantidad)"
                                : "Agregar al movimiento"
                              }>
                                <span>
                                  <IconButton size="small"
                                    onClick={() => isEquip ? openAddEquipo(inv) : addNonEquipmentItem(inv)}
                                    disabled={added || (sinStock && tipoFlujo === "SALIDA")}
                                    sx={{
                                      width: 28, height: 28, bgcolor: added ? "#f1f5f9" : cfg.color, color: "white", flexShrink: 0,
                                      "&:hover": { bgcolor: added ? "#f1f5f9" : cfg.color, opacity: 0.85 },
                                      "&.Mui-disabled": { bgcolor: "#f1f5f9", color: "#94a3b8" },
                                    }}>
                                    {added ? <CheckCircle sx={{ fontSize: 13 }} /> : <AddCircleOutline sx={{ fontSize: 13 }} />}
                                  </IconButton>
                                </span>
                              </Tooltip>
                            </Box>
                          );
                        })}
                      </Box>

                      {/* Paginación */}
                      {inventoryPages > 1 && (
                        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                          <ButtonBase label="← Ant." size="small" disabled={inventoryPage === 0}
                            onClick={() => fetchInventory(inventoryPage - 1)}
                            sx={{ fontSize: "0.72rem", px: 1.5, bgcolor: "white", color: "text.secondary", border: "1px solid #e2e8f0" }}
                          />
                          <Typography variant="caption" sx={{ alignSelf: "center", color: "text.secondary" }}>
                            {inventoryPage + 1} / {inventoryPages}
                          </Typography>
                          <ButtonBase label="Sig. →" size="small" disabled={inventoryPage + 1 >= inventoryPages}
                            onClick={() => fetchInventory(inventoryPage + 1)}
                            sx={{ fontSize: "0.72rem", px: 1.5, bgcolor: "white", color: "text.secondary", border: "1px solid #e2e8f0" }}
                          />
                        </Box>
                      )}
                    </Box>

                    {/* ─── CARRITO ──────────────────────────────────────────── */}
                    <Box sx={{ flex: 1, p: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
                        <Typography variant="subtitle2" fontWeight={700}>
                          Items del Movimiento
                          <Badge badgeContent={lineItems.length} color="primary" sx={{ ml: 1.5 }} />
                        </Typography>
                        {lineItems.length > 0 && (
                          <Chip label="Limpiar" size="small" clickable onClick={() => setLineItems([])}
                            icon={<DeleteOutline sx={{ fontSize: "12px !important" }} />}
                            sx={{ fontWeight: 600, fontSize: "0.7rem", bgcolor: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}
                          />
                        )}
                      </Box>

                      {lineItems.length === 0 ? (
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 8, border: "2px dashed #e2e8f0", borderRadius: 3, bgcolor: "#fafbfc" }}>
                          <SwapHorizOutlined sx={{ fontSize: 38, color: "text.disabled", mb: 1.5 }} />
                          <Typography variant="body2" color="text.secondary" fontWeight={600}>Sin ítems agregados</Typography>
                          <Typography variant="caption" color="text.disabled">Selecciona productos del inventario</Typography>
                        </Box>
                      ) : (
                        <Box sx={{
                          display: "flex", flexDirection: "column", gap: 1.5, maxHeight: 460, overflowY: "auto",
                          "&::-webkit-scrollbar": { width: 3 },
                          "&::-webkit-scrollbar-thumb": { bgcolor: "#cbd5e1", borderRadius: 2 },
                        }}>
                          {lineItems.map(item => {
                            const cfg         = PRODUCT_CFG[item.productType];
                            const isEquipo    = item.productType === "EQUIPMENT";
                            const serialCount = item.serials?.length ?? 0;
                            const pendientes  = item.quantity - serialCount;
                            const hasWarning  = isEquipo && serialCount === 0;
                            const rawQty      = item._rawQty ?? String(item.quantity);
                            // Para salida: alerta si supera disponible
                            const superaStock = tipoFlujo === "SALIDA" && !isEquipo && item.quantity > item.quantityAvailable;

                            return (
                              <Box key={item.inventoryId} sx={{
                                p: 2, borderRadius: 2.5,
                                border: `1.5px solid ${superaStock ? "#fecaca" : hasWarning ? "#fde68a" : cfg.color + "35"}`,
                                bgcolor: superaStock ? "#fef2f2" : hasWarning ? "#fffbeb" : cfg.bg,
                                transition: "all 0.2s",
                              }}>
                                {/* Fila 1 */}
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, flexWrap: "wrap", mb: 1 }}>
                                  <Chip label={item.itemCode} size="small"
                                    sx={{ bgcolor: cfg.color, color: "white", fontWeight: 700, fontSize: "0.68rem" }}
                                  />
                                  <Typography variant="body2" fontWeight={700} sx={{ flex: 1, minWidth: 100, lineHeight: 1.3 }}>
                                    {item.description}
                                  </Typography>
                                  {/* Stock disponible como referencia */}
                                  <Chip
                                    label={`Disp: ${item.quantityAvailable}`}
                                    size="small"
                                    sx={{ height: 18, fontSize: "0.62rem", fontWeight: 700,
                                      bgcolor: item.quantityAvailable > 0 ? "#f0fdf4" : "#f1f5f9",
                                      color:   item.quantityAvailable > 0 ? "#15803d"  : "#94a3b8",
                                      border:  `1px solid ${item.quantityAvailable > 0 ? "#bbf7d0" : "#e2e8f0"}`,
                                    }}
                                  />
                                  <IconButton size="small" onClick={() => removeItem(item.inventoryId)}
                                    sx={{ color: "#ef4444", "&:hover": { bgcolor: "#fef2f2" } }}>
                                    <DeleteOutline sx={{ fontSize: 16 }} />
                                  </IconButton>
                                </Box>

                                {/* Fila 2: controles */}
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
                                  {!isEquipo ? (
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                                      <Typography variant="caption" color="text.secondary" fontWeight={600}>Cant.</Typography>
                                      <TextField type="number" size="small" value={rawQty}
                                        onChange={e => updateQty(item.inventoryId, e.target.value)}
                                        onBlur={e => { const v = parseInt(e.target.value, 10); if (isNaN(v) || v < 1) updateQty(item.inventoryId, "1"); }}
                                        inputProps={{ min: 1, style: { textAlign: "center", fontWeight: 700, padding: "4px 6px", width: 52 } }}
                                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5, fontSize: "0.82rem", height: 30,
                                          ...(superaStock && { "& fieldset": { borderColor: "#dc2626", borderWidth: 2 } }),
                                        },
                                        "& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button": { display: "none" },
                                        "& input[type=number]": { MozAppearance: "textfield" },
                                        }}
                                      />
                                    </Box>
                                  ) : (
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                                      <Typography variant="caption" color="text.secondary" fontWeight={600}>Esperados:</Typography>
                                      <Chip label={item.quantity} size="small"
                                        sx={{ fontWeight: 800, height: 20, fontSize: "0.72rem", bgcolor: "#eff6ff", color: "#1d4ed8" }}
                                      />
                                    </Box>
                                  )}

                                  {/* Precio */}
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                                    <Typography variant="caption" color="text.secondary" fontWeight={600}>S/</Typography>
                                    <TextField type="number" size="small"
                                      value={item.unitPrice === 0 ? "" : item.unitPrice}
                                      onChange={e => updatePrice(item.inventoryId, e.target.value)}
                                      placeholder="0.00"
                                      inputProps={{ min: 0, step: 0.01, style: { fontWeight: 700, padding: "4px 6px", width: 60 } }}
                                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5, fontSize: "0.82rem", height: 30 },
                                        "& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button": { display: "none" },
                                        "& input[type=number]": { MozAppearance: "textfield" },
                                      }}
                                    />
                                  </Box>

                                  {!isEquipo && item.unitPrice > 0 && (
                                    <Typography variant="caption" sx={{ fontFamily: "monospace", fontWeight: 700, color: cfg.color }}>
                                      = S/ {(item.quantity * item.unitPrice).toFixed(2)}
                                    </Typography>
                                  )}

                                  {/* Pistoleo EQUIPMENT */}
                                  {isEquipo && (
                                    <Box onClick={() => abrirPistoleo(item)}
                                      sx={{
                                        display: "flex", alignItems: "center", gap: 0.8, px: 1.5, py: 0.6,
                                        borderRadius: 1.5, cursor: "pointer", transition: "all 0.2s",
                                        bgcolor: serialCount > 0 ? "#f0fdf4" : "#fffbeb",
                                        border: `1px solid ${serialCount > 0 ? "#bbf7d0" : "#fde68a"}`,
                                        "&:hover": { transform: "scale(1.02)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
                                      }}>
                                      <QrCodeScannerOutlined sx={{ fontSize: 15, color: serialCount > 0 ? "#15803d" : "#b45309" }} />
                                      <Typography variant="caption" fontWeight={700} sx={{ color: serialCount > 0 ? "#15803d" : "#b45309" }}>
                                        {serialCount > 0 ? `${serialCount}/${item.quantity} pistol.` : "Pistolear"}
                                      </Typography>
                                    </Box>
                                  )}

                                  {isEquipo && serialCount > 0 && pendientes > 0 && (
                                    <Chip label={`${pendientes} pendiente${pendientes > 1 ? "s" : ""}`} size="small"
                                      sx={{ height: 18, fontSize: "0.62rem", bgcolor: "#fffbeb", color: "#b45309", border: "1px solid #fde68a", fontWeight: 700 }}
                                    />
                                  )}
                                  {isEquipo && serialCount > 0 && pendientes === 0 && (
                                    <Chip label="Completo ✓" size="small" color="success" sx={{ height: 18, fontSize: "0.62rem", fontWeight: 700 }} />
                                  )}
                                </Box>

                                {superaStock && (
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mt: 1, px: 1, py: 0.6, bgcolor: "#fef2f2", borderRadius: 1 }}>
                                    <WarningAmberOutlined sx={{ fontSize: 13, color: "#dc2626" }} />
                                    <Typography variant="caption" color="error.main" fontWeight={600}>
                                      Cantidad supera el stock disponible ({item.quantityAvailable})
                                    </Typography>
                                  </Box>
                                )}

                                {hasWarning && (
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mt: 1, px: 1, py: 0.6, bgcolor: "#fef9c3", borderRadius: 1 }}>
                                    <WarningAmberOutlined sx={{ fontSize: 13, color: "#b45309" }} />
                                    <Typography variant="caption" color="warning.dark" fontWeight={600}>
                                      Sin seriales — pistolealos antes de confirmar
                                    </Typography>
                                  </Box>
                                )}

                                {isEquipo && serialCount > 0 && (
                                  <Box sx={{ mt: 1, display: "flex", gap: 0.6, flexWrap: "wrap" }}>
                                    {item.serials?.map((s, idx) => (
                                      <Chip key={idx} label={s.serialNumber} size="small"
                                        sx={{ bgcolor: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0", fontWeight: 600, fontSize: "0.63rem" }}
                                      />
                                    ))}
                                  </Box>
                                )}
                              </Box>
                            );
                          })}
                        </Box>
                      )}

                      {/* Mini-resumen */}
                      {lineItems.length > 0 && (
                        <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid #e2e8f0", display: "flex", gap: 2, flexWrap: "wrap" }}>
                          {(["MATERIAL","TOOL","EQUIPMENT","EPP"] as ProductType[])
                            .filter(t => lineItems.some(i => i.productType === t))
                            .map(t => {
                              const cfg   = PRODUCT_CFG[t];
                              const count = lineItems.filter(i => i.productType === t).length;
                              return (
                                <Paper key={t} variant="outlined" sx={{ flex: "1 1 80px", p: 1.2, borderRadius: 1.5, textAlign: "center", border: `1px solid ${cfg.border}`, bgcolor: cfg.bg }}>
                                  <Typography sx={{ fontSize: "1rem", lineHeight: 1 }}>{cfg.emoji}</Typography>
                                  <Typography variant="h6" fontWeight={800} sx={{ color: cfg.color, lineHeight: 1.2 }}>{count}</Typography>
                                  <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ fontSize: "0.62rem" }}>{cfg.label}</Typography>
                                </Paper>
                              );
                            })}
                          {totalValue > 0 && (
                            <Paper variant="outlined" sx={{ flex: "1 1 120px", p: 1.2, borderRadius: 1.5, border: "1px solid #e9d5ff", bgcolor: "#faf5ff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                              <Typography variant="h6" fontWeight={800} sx={{ color: "#7c3aed", fontFamily: "monospace" }}>S/ {totalValue.toFixed(2)}</Typography>
                              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ fontSize: "0.62rem" }}>Valor estimado</Typography>
                            </Paper>
                          )}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Collapse>

          {/* ══ PASO 4: RESUMEN + CONFIRMAR ══ */}
          <Collapse in={lineItems.length > 0} unmountOnExit>
            <Card elevation={4} sx={{ borderRadius: 4, border: `2px solid ${accentColor}30`, overflow: "hidden", boxShadow: `0 8px 32px ${accentColor}18` }}>
              <Box sx={{ background: `linear-gradient(135deg, ${isEntrada ? "#15803d" : "#b91c1c"} 0%, ${isEntrada ? "#16a34a" : "#dc2626"} 100%)`, p: 3, color: "white" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 1, borderRadius: 2, display: "flex" }}>
                      {isEntrada ? <TrendingUpOutlined /> : <TrendingDownOutlined />}
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={800}>Resumen del Movimiento</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.85 }}>
                        {tipoFlujo} · {subtipo?.label}{reference ? ` · Ref: ${reference}` : ""}
                      </Typography>
                    </Box>
                  </Stack>
                  <Chip label={`${totalMovements} movimiento${totalMovements !== 1 ? "s" : ""}`} size="small"
                    sx={{ bgcolor: "rgba(255,255,255,0.25)", color: "white", fontWeight: 700 }}
                  />
                </Box>
              </Box>

              <Box sx={{ p: 3 }}>
                <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
                  {[
                    { label: "Ítems",          value: lineItems.length,                              color: "#1d4ed8"   },
                    { label: "Movimientos",     value: totalMovements,                                color: accentColor },
                    { label: "Equipos pistol.", value: `${lineItems.filter(i => i.productType === "EQUIPMENT" && (i.serials?.length ?? 0) > 0).length}/${lineItems.filter(i => i.productType === "EQUIPMENT").length}`, color: "#15803d" },
                    { label: "Valor estimado",  value: totalValue > 0 ? `S/ ${totalValue.toFixed(2)}` : "—", color: "#7c3aed" },
                  ].map(kpi => (
                    <Paper key={kpi.label} variant="outlined" sx={{ flex: "1 1 110px", p: 2, borderRadius: 2, textAlign: "center", border: `1px solid ${kpi.color}20` }}>
                      <Typography variant="h5" fontWeight={800} sx={{ color: kpi.color }}>{kpi.value}</Typography>
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>{kpi.label}</Typography>
                    </Paper>
                  ))}
                </Box>

                {validationErrors.length > 0 && (
                  <Alert severity="warning" icon={<WarningAmberOutlined />} sx={{ borderRadius: 2, mb: 2.5 }}>
                    <Typography variant="body2" fontWeight={700} mb={0.5}>Pendientes antes de confirmar:</Typography>
                    {validationErrors.map((e, i) => (
                      <Typography key={i} variant="caption" display="block" color="text.secondary">• {e}</Typography>
                    ))}
                  </Alert>
                )}

                <Alert severity={isEntrada ? "success" : "error"} sx={{ borderRadius: 2, mb: 3 }}>
                  Al confirmar se registrarán <strong>{totalMovements} movimientos</strong> tipo{" "}
                  <strong>{tipoFlujo === "ENTRADA" ? "ENTRY" : "EXIT"}</strong>.{" "}
                  {tipoFlujo === "ENTRADA"
                    ? "El stock del inventario se incrementará."
                    : "El stock del inventario se descontará."}
                  {" "}Esta acción es <strong>irreversible</strong>.
                </Alert>

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, flexWrap: "wrap" }}>
                  <ButtonBase label="Reiniciar" onClick={resetAll}
                    sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1" }}
                  />
                  <ButtonBase
                    label={submitting ? "Registrando..." : `Confirmar ${tipoFlujo} de Kardex`}
                    startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <SendOutlined />}
                    onClick={handleSubmit}
                    disabled={!canSubmit || submitting}
                    sx={{
                      px: 4, py: 1.4, fontWeight: 700, borderRadius: 2.5,
                      background: canSubmit ? `linear-gradient(135deg, ${isEntrada ? "#15803d" : "#b91c1c"} 0%, ${isEntrada ? "#16a34a" : "#dc2626"} 100%)` : undefined,
                      boxShadow: canSubmit ? `0 4px 14px ${accentColor}40` : "none",
                    }}
                  />
                </Box>
              </Box>
            </Card>
          </Collapse>

        </Box>
      </Fade>

      {/* ══ DIALOG: CANTIDAD DE EQUIPOS ══ */}
      <Dialog open={addEquipoOpen} onClose={() => setAddEquipoOpen(false)} maxWidth="xs" fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ m: 0, p: 0 }}>
          <Box sx={{ bgcolor: "#1e293b", p: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ bgcolor: PRODUCT_CFG.EQUIPMENT.color, p: 0.8, borderRadius: 1.5, display: "flex" }}>
                <ConstructionOutlined sx={{ fontSize: 16, color: "white" }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight={700} color="white">Agregar Equipo</Typography>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                  {addEquipoItem?.itemCode} — {addEquipoItem?.description}
                </Typography>
              </Box>
            </Stack>
            <IconButton size="small" onClick={() => setAddEquipoOpen(false)} sx={{ color: "rgba(255,255,255,0.5)" }}>
              <CloseOutlined fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {addEquipoItem && (
            <Alert severity="info" sx={{ borderRadius: 2, mb: 2.5, fontSize: "0.8rem" }}>
              Stock disponible: <strong>{addEquipoItem.quantityAvailable}</strong> unidades.
              {tipoFlujo === "SALIDA" && ` No puedes retirar más de ${addEquipoItem.quantityAvailable}.`}
            </Alert>
          )}
          <Typography variant="body2" fontWeight={600} mb={1.2}>
            ¿Cuántos equipos vas a {isEntrada ? "ingresar" : "retirar"}?
          </Typography>
          <TextField
            fullWidth autoFocus type="number"
            label="Cantidad de equipos" placeholder="Ej: 10"
            value={addEquipoCant}
            onChange={e => setAddEquipoCant(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") confirmAddEquipo(); }}
            inputProps={{ min: 1, max: tipoFlujo === "SALIDA" ? addEquipoItem?.quantityAvailable : undefined,
              style: { fontWeight: 800, fontSize: "1.5rem", textAlign: "center", padding: "14px 0" } }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, "& fieldset": { borderColor: PRODUCT_CFG.EQUIPMENT.color, borderWidth: 2 } },
              "& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button": { display: "none" },
              "& input[type=number]": { MozAppearance: "textfield" },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5, bgcolor: "#f8fafc", borderTop: "1px solid #e2e8f0", gap: 1 }}>
          <ButtonBase label="Cancelar" onClick={() => setAddEquipoOpen(false)}
            sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1" }}
          />
          <ButtonBase
            label={`Agregar ${addEquipoCant || "1"} equipo${parseInt(addEquipoCant) > 1 ? "s" : ""} → Pistolear`}
            startIcon={<QrCodeScannerOutlined />}
            onClick={confirmAddEquipo}
            sx={{ px: 3, background: `linear-gradient(135deg, ${PRODUCT_CFG.EQUIPMENT.color} 0%, #16a34a 100%)`, boxShadow: "0 4px 12px rgba(21,128,61,0.3)" }}
          />
        </DialogActions>
      </Dialog>

      {/* ══ DIALOG PISTOLEO ══ */}
      <Dialog open={pistoleoOpen} onClose={() => setPistoleoOpen(false)} maxWidth="sm" fullWidth
        PaperProps={{ sx: { borderRadius: 3, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" } }}>
        <DialogTitle sx={{ m: 0, p: 0 }}>
          <Box sx={{ bgcolor: "#1e293b", p: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ bgcolor: "#22c55e", p: 0.8, borderRadius: 1.5, display: "flex" }}>
                <QrCodeScannerOutlined sx={{ fontSize: 17, color: "white" }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight={700} color="white">Pistoleo de Equipo</Typography>
                {pistoleoItem && (
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                    {pistoleoItem.itemCode} · {pistoleoItem.description} · {serialesCap.length}/{pistoleoItem.quantity} capturados
                  </Typography>
                )}
              </Box>
            </Stack>
            <IconButton onClick={() => setPistoleoOpen(false)} size="small" sx={{ color: "rgba(255,255,255,0.6)" }}>
              <CloseOutlined fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          {pistoleoItem && (() => {
            const tipo       = getEquipoTipo(pistoleoItem.description);
            const campos     = CAMPOS_EQUIPO[tipo];
            const totalReq   = pistoleoItem.quantity;
            const totalCap   = serialesCap.length;
            const todoCompleto = campos.every(c => !!(serialActual as any)[c.field]?.trim());

            return (
              <>
                <Box sx={{ mb: 3, p: 2.5, bgcolor: "#f8fafc", borderRadius: 2, border: "1px solid #e2e8f0" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                    <Typography variant="body2" fontWeight={700}>Progreso de Captura</Typography>
                    <Chip label={`${totalCap} / ${totalReq}`} size="small"
                      color={totalCap === totalReq ? "success" : totalCap > 0 ? "warning" : "default"}
                      sx={{ fontWeight: 800 }}
                    />
                  </Box>
                  <LinearProgress variant="determinate" value={Math.min((totalCap / totalReq) * 100, 100)}
                    sx={{ height: 8, borderRadius: 4, bgcolor: "#e2e8f0",
                      "& .MuiLinearProgress-bar": { bgcolor: totalCap === totalReq ? "#22c55e" : "#f59e0b", borderRadius: 4 },
                    }}
                  />
                  <Stack direction="row" spacing={1} sx={{ mt: 1.5 }} flexWrap="wrap">
                    <Chip label={`Tipo: ${tipo}`} size="small" color="info" sx={{ fontWeight: 700 }} />
                    <Typography variant="caption" color="text.secondary" sx={{ alignSelf: "center" }}>
                      Campos: {campos.map(c => c.label).join(" · ")}
                    </Typography>
                  </Stack>
                </Box>

                <Box sx={{ mb: 2.5, p: 2, borderRadius: 2, bgcolor: autoGuardar ? "#f0fdf4" : "#f8fafc", border: `1px solid ${autoGuardar ? "#bbf7d0" : "#e2e8f0"}`, transition: "all 0.3s" }}>
                  <FormControlLabel
                    control={<Switch checked={autoGuardar} onChange={e => setAutoGuardar(e.target.checked)} color="success" size="small" />}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                        <AutoAwesomeOutlined sx={{ fontSize: 14, color: autoGuardar ? "success.main" : "text.disabled" }} />
                        <Typography variant="body2" fontWeight={700} sx={{ color: autoGuardar ? "#15803d" : "text.secondary" }}>
                          Auto-agregar al completar campos
                        </Typography>
                      </Box>
                    } sx={{ m: 0 }}
                  />
                </Box>

                <Stack spacing={2} sx={{ mb: 3 }}>
                  {campos.map(campo => {
                    const valor    = (serialActual as any)[campo.field] ?? "";
                    const error    = camposError[campo.field] ?? "";
                    const regla    = VALIDACIONES[campo.field];
                    const esValido = regla ? regla.regex.test(valor.trim()) && valor.trim() !== "" : valor.trim() !== "";
                    const tieneErr = !!error && valor.trim() !== "";
                    return (
                      <Box key={campo.field}>
                        <Typography variant="body2" color="text.secondary" fontWeight={600} mb={0.5}>
                          {campo.label} *
                          {esValido && <CheckCircle sx={{ fontSize: 13, color: "success.main", ml: 0.5, verticalAlign: "middle" }} />}
                        </Typography>
                        <TextField fullWidth size="small" placeholder={campo.placeholder} value={valor}
                          onChange={e => handleCampoChange(campo.field, e.target.value, tipo, totalReq)}
                          disabled={totalCap >= totalReq} error={tieneErr}
                          helperText={tieneErr ? error : esValido ? "✓ Válido" : regla ? `Ej: ${campo.placeholder}` : undefined}
                          FormHelperTextProps={{ sx: { color: tieneErr ? "error.main" : esValido ? "success.main" : "text.disabled" } }}
                          sx={{ "& .MuiOutlinedInput-root": {
                            ...(esValido  && { "& fieldset": { borderColor: "success.main", borderWidth: 2 } }),
                            ...(tieneErr  && { "& fieldset": { borderColor: "error.main",   borderWidth: 2 } }),
                          }}}
                          InputProps={campo.field === "serialNumber" ? {
                            startAdornment: (
                              <InputAdornment position="start">
                                <QrCodeScannerOutlined sx={{ fontSize: 16, color: esValido ? "success.main" : "text.disabled" }} />
                              </InputAdornment>
                            ),
                          } : undefined}
                        />
                      </Box>
                    );
                  })}
                </Stack>

                {!autoGuardar && (
                  <ButtonBase fullWidth
                    label={totalCap >= totalReq ? "✓ Captura completa" : `Agregar Serial ${totalCap + 1} de ${totalReq}`}
                    startIcon={<AddCircleOutline />}
                    onClick={agregarSerialManual}
                    disabled={!serialActual.serialNumber?.trim() || totalCap >= totalReq}
                    sx={{ mb: 2.5 }}
                  />
                )}

                {autoGuardar && totalCap < totalReq && (
                  <Box sx={{ mb: 2.5, p: 1.5, borderRadius: 2, textAlign: "center",
                    bgcolor: todoCompleto ? "#dcfce7" : "#f8fafc",
                    border: `1px solid ${todoCompleto ? "#86efac" : "#e2e8f0"}`, transition: "all 0.3s" }}>
                    <Typography variant="caption" fontWeight={600} sx={{ color: todoCompleto ? "#15803d" : "text.disabled" }}>
                      {todoCompleto
                        ? "⚡ Guardando automáticamente..."
                        : `Completa los campos para auto-guardar el serial ${totalCap + 1} de ${totalReq}`}
                    </Typography>
                  </Box>
                )}

                {serialesCap.length > 0 && (
                  <Box>
                    <Typography variant="body2" fontWeight={700} mb={1.2} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckCircleOutline sx={{ fontSize: 16, color: "success.main" }} />
                      Seriales Capturados ({serialesCap.length})
                    </Typography>
                    <Stack spacing={0.7}>
                      {serialesCap.map((s, idx) => (
                        <Box key={idx} sx={{ p: 1.5, bgcolor: "#f0fdf4", borderRadius: 2, border: "1px solid #bbf7d0", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                          <Stack spacing={0.2}>
                            <Typography variant="caption" fontWeight={800} sx={{ color: "#15803d" }}>#{idx + 1}</Typography>
                            {s.serialNumber && <Typography variant="caption" color="text.secondary">SN: {s.serialNumber}</Typography>}
                            {s.mac          && <Typography variant="caption" color="text.secondary">MAC: {s.mac}</Typography>}
                            {s.ua           && <Typography variant="caption" color="text.secondary">UA: {s.ua}</Typography>}
                            {s.mtaMac       && <Typography variant="caption" color="text.secondary">MTA: {s.mtaMac}</Typography>}
                          </Stack>
                          <IconButton size="small"
                            onClick={() => setSerialésCapturados(prev => prev.filter((_, i) => i !== idx))}
                            sx={{ color: "error.light", mt: -0.5 }}>
                            <CloseOutlined sx={{ fontSize: 14 }} />
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
          <ButtonBase label="Cancelar" onClick={() => setPistoleoOpen(false)}
            sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1" }}
          />
          <ButtonBase
            label={`Guardar ${serialesCap.length} Serial(es)`}
            startIcon={<ArrowForwardOutlined />}
            onClick={guardarSeriales}
            disabled={serialesCap.length === 0}
            sx={{ px: 3 }}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
}