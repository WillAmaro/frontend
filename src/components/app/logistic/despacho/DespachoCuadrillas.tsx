// // "use client";

// // import { useState } from "react";
// // import {
// //   Box,
// //   Card,
// //   Typography,
// //   TextField,
// //   Button,
// //   Divider,
// //   IconButton,
// //   Alert,
// //   Fade,
// //   Grow,
// //   Chip,
// //   Autocomplete,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Paper,
// //   ToggleButtonGroup,
// //   ToggleButton,
// // } from "@mui/material";
// // import {
// //   LocalShippingOutlined,
// //   AddCircleOutline,
// //   DeleteOutline,
// //   SaveOutlined,
// //   CheckCircleOutline,
// //   InventoryOutlined,
// //   SearchOutlined,
// //   CloseOutlined,
// //   InfoOutlined,
// //   CalendarTodayOutlined,
// //   PersonOutlined,
// //   FilterListOutlined,
// // } from "@mui/icons-material";
// // import { TitleCard } from "@/src/components/base/TitleCard";
// // import { SectionHeader } from "@/src/components/base/SectionHeader";

// // interface ItemMaterial {
// //   id: string;
// //   codigo: string;
// //   descripcion: string;
// //   uom: string;
// //   tipo: "HFC" | "FTTH" | "HFC-FTTH" | "";
// //   cantidad: string;
// // }

// // interface ItemEquipo {
// //   id: string;
// //   serie: string;
// //   codigo: string;
// //   descripcion: string;
// //   cantidad: string;
// // }

// // interface DespachoGuardado {
// //   id: string;
// //   fecha: string;
// //   usuario: string;
// //   tecnico: string;
// //   totalMaterial: number;
// //   totalEquipo: number;
// // }

// // // Datos de ejemplo para autocomplete
// // const tecnicosDisponibles = [
// //   "Juan Pérez",
// //   "María García",
// //   "Carlos López",
// //   "Ana Martínez",
// //   "Pedro Sánchez",
// // ];

// // // Catálogo completo de materiales precargados
// // const catalogoMaterialesCompleto: ItemMaterial[] = [
// //   {
// //     id: "mat-1",
// //     codigo: "1002950",
// //     descripcion: "ATADOR DE IDENTIFICACION DE ABONADO",
// //     uom: "UND",
// //     tipo: "HFC",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-2",
// //     codigo: "1004705",
// //     descripcion: "CABLE COAXIAL BLANCO RG-6 S/MENSAJERO",
// //     uom: "MTS",
// //     tipo: "HFC",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-3",
// //     codigo: "1003101",
// //     descripcion: "CABLE COAXIAL RG-6 AUTOSOPORTADO",
// //     uom: "MTS",
// //     tipo: "HFC",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-4",
// //     codigo: "1033042",
// //     descripcion: "CABLE TELEF INTERIOR 2/22 AWG",
// //     uom: "MTS",
// //     tipo: "HFC",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-5",
// //     codigo: "1004692",
// //     descripcion: "CABLE UTP CAT5E FTP 4PR/24AWG 04070009",
// //     uom: "MTS",
// //     tipo: "HFC-FTTH",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-6",
// //     codigo: "1004838",
// //     descripcion: "CABLE HDMI CHD1-6 MALE TO MALE 2M",
// //     uom: "UND",
// //     tipo: "HFC",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-7",
// //     codigo: "1051697",
// //     descripcion: "CONTROL REMOTO AN-4803 ECOSS",
// //     uom: "UND",
// //     tipo: "HFC",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-8",
// //     codigo: "1062712",
// //     descripcion: "CONECTOR DE CONTINUIDAD RG6 EX6XL-PLUS",
// //     uom: "UND",
// //     tipo: "HFC",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-9",
// //     codigo: "1002900",
// //     descripcion: "CONECTOR PLUG RJ-45",
// //     uom: "UND",
// //     tipo: "HFC-FTTH",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-10",
// //     codigo: "1063021",
// //     descripcion: "CONECTOR RJ 11",
// //     uom: "UND",
// //     tipo: "HFC-FTTH",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-11",
// //     codigo: "1003254",
// //     descripcion: "DIVISOR INTERIOR 2 VIAS",
// //     uom: "UND",
// //     tipo: "HFC",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-12",
// //     codigo: "1003253",
// //     descripcion: "DIVISOR INTERIOR 3 VIAS",
// //     uom: "UND",
// //     tipo: "HFC",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-13",
// //     codigo: "1004529",
// //     descripcion: "ROSETA TELEFONICA CON GEL",
// //     uom: "UND",
// //     tipo: "HFC",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-14",
// //     codigo: "1004521",
// //     descripcion: "SUJETADOR DE ANCLAJE",
// //     uom: "UND",
// //     tipo: "HFC-FTTH",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-15",
// //     codigo: "1004520",
// //     descripcion: "SUJETADOR DE TRAMO-CHAPA Q",
// //     uom: "UND",
// //     tipo: "HFC-FTTH",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-16",
// //     codigo: "1063013",
// //     descripcion: "CONECTOR FMC2104-SA 14135787 HUAWEI",
// //     uom: "UND",
// //     tipo: "FTTH",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-17",
// //     codigo: "1044835",
// //     descripcion: "PATCHCORD SM SC/APC-SC/APC 3MM 3M ONT",
// //     uom: "UND",
// //     tipo: "FTTH",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-18",
// //     codigo: "1042681",
// //     descripcion: "ROSETA ATB3101 SIN PIGTAIL",
// //     uom: "UND",
// //     tipo: "FTTH",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-19",
// //     codigo: "1063891",
// //     descripcion: "CAJA DE EMPALME DROP BOX-1 QTK",
// //     uom: "UND",
// //     tipo: "FTTH",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-20",
// //     codigo: "1063890",
// //     descripcion: "CONTROL REMOTO C3401 180000518128 ZTE",
// //     uom: "UND",
// //     tipo: "FTTH",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-21",
// //     codigo: "1062883",
// //     descripcion: "CABLE FO FASTCONNECT DROP 14138979 50M",
// //     uom: "UND",
// //     tipo: "FTTH",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-22",
// //     codigo: "1062884",
// //     descripcion: "CABLE FO FASTCONNECT DROP 14138979 80M",
// //     uom: "UND",
// //     tipo: "FTTH",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-23",
// //     codigo: "1062885",
// //     descripcion: "CABLE FO FASTCONNECT DROP 14138979 100M",
// //     uom: "UND",
// //     tipo: "FTTH",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-24",
// //     codigo: "1062886",
// //     descripcion: "CABLE FO FASTCONNECT DROP 14138979 150M",
// //     uom: "UND",
// //     tipo: "FTTH",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-25",
// //     codigo: "1062887",
// //     descripcion: "CABLE FO FASTCONNECT DROP 14138979 220M",
// //     uom: "UND",
// //     tipo: "FTTH",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-26",
// //     codigo: "1063812",
// //     descripcion: "CABLE FO FASTCONNECT DROP 14138979 300M",
// //     uom: "UND",
// //     tipo: "FTTH",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-27",
// //     codigo: "1062235",
// //     descripcion: "CABLE FO ECS DROP 300M ECOSS (INDOR)",
// //     uom: "UND",
// //     tipo: "FTTH",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-28",
// //     codigo: "1053621",
// //     descripcion: "TELEFONO ECS622 ECOSS",
// //     uom: "UND",
// //     tipo: "HFC-FTTH",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-29",
// //     codigo: "501217",
// //     descripcion: "GRAPA PLASTICA PARA CABLE RG-6 BLANCA",
// //     uom: "UND",
// //     tipo: "",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-30",
// //     codigo: "501021",
// //     descripcion: "AMARRE PLASTICO 15 CMS",
// //     uom: "UND",
// //     tipo: "",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-31",
// //     codigo: "501120",
// //     descripcion: "CINTA ADHESIVA AISLANTE COLOR NEGRO",
// //     uom: "UND",
// //     tipo: "",
// //     cantidad: "0",
// //   },
// //   {
// //     id: "mat-32",
// //     codigo: "SUM-0002",
// //     descripcion: "CINTA DOBLE CONTACTO 3/4 X 5MT",
// //     uom: "UND",
// //     tipo: "",
// //     cantidad: "0",
// //   },
// // ];

// // // Catálogo completo de equipos disponibles
// // const catalogoEquipos: ItemEquipo[] = [
// //   {
// //     id: "equipo-1",
// //     serie: "3954GM464202082",
// //     codigo: "4059271",
// //     descripcion: "MODEM ARRIS TG3442A 32x8 3.1",
// //     cantidad: "1",
// //   },
// //   {
// //     id: "equipo-2",
// //     serie: "2AD4GL196701282",
// //     codigo: "4059271",
// //     descripcion: "MODEM ARRIS TG3442A 32x8 3.1",
// //     cantidad: "1",
// //   },
// //   {
// //     id: "equipo-3",
// //     serie: "3954GM464203146",
// //     codigo: "4059271",
// //     descripcion: "MODEM ARRIS TG3442A 32x8 3.1",
// //     cantidad: "1",
// //   },
// //   {
// //     id: "equipo-4",
// //     serie: "DM2203718001862",
// //     codigo: "4050441",
// //     descripcion: "MODEM SAGEMCOM F3890V3 32X8SB DOCSIS 3.1",
// //     cantidad: "1",
// //   },
// //   {
// //     id: "equipo-5",
// //     serie: "DM2110118001445",
// //     codigo: "4050441",
// //     descripcion: "MODEM SAGEMCOM F3890V3 32X8SB DOCSIS 3.1",
// //     cantidad: "1",
// //   },
// //   {
// //     id: "equipo-6",
// //     serie: "MV2234VR8847",
// //     codigo: "4007984",
// //     descripcion: "DECODIFICADOR MOTOROLA HD DCX-525",
// //     cantidad: "1",
// //   },
// //   {
// //     id: "equipo-7",
// //     serie: "M91843ERZ794",
// //     codigo: "4007984",
// //     descripcion: "DECODIFICADOR MOTOROLA HD DCX-525",
// //     cantidad: "1",
// //   },
// //   {
// //     id: "equipo-8",
// //     serie: "4857544386D1EBB4",
// //     codigo: "4076358",
// //     descripcion: "ROUTER ONT HG8145X613 50088770 HUAWEI",
// //     cantidad: "1",
// //   },
// //   {
// //     id: "equipo-9",
// //     serie: "4857544386CF35B4",
// //     codigo: "4076358",
// //     descripcion: "ROUTER ONT HG8145X613 50088770 HUAWEI",
// //     cantidad: "1",
// //   },
// //   {
// //     id: "equipo-10",
// //     serie: "4857544386DAB8B4",
// //     codigo: "4076358",
// //     descripcion: "ROUTER ONT HG8145X613 50088770 HUAWEI",
// //     cantidad: "1",
// //   },
// // ];

// // type FiltroTipo = "TODOS" | "HFC" | "FTTH" | "HFC-FTTH" | "OTROS";

// // export default function DespachoCuadrillas() {
// //   const [tecnico, setTecnico] = useState<string | null>(null);
// //   const [fechaDespacho, setFechaDespacho] = useState("");
// //   const [dni, setDni] = useState("");

// //   // Inicializar con todos los materiales precargados
// //   const [itemsMaterial, setItemsMaterial] = useState<ItemMaterial[]>(
// //     catalogoMaterialesCompleto
// //   );
// //   const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>("TODOS");
// //   const [searchMaterial, setSearchMaterial] = useState("");

// //   const [itemsEquipo, setItemsEquipo] = useState<ItemEquipo[]>([]);
// //   const [showSuccess, setShowSuccess] = useState(false);
// //   const [despachoGuardado, setDespachoGuardado] =
// //     useState<DespachoGuardado | null>(null);

// //   // Estados del modal
// //   const [openModal, setOpenModal] = useState(false);
// //   const [searchSerie, setSearchSerie] = useState("");
// //   const [equiposFiltrados, setEquiposFiltrados] = useState<ItemEquipo[]>([]);

// //   // Funciones para Material
// //   const actualizarItemMaterial = (
// //     id: string,
// //     campo: keyof ItemMaterial,
// //     valor: string
// //   ) => {
// //     setItemsMaterial(
// //       itemsMaterial.map((item) =>
// //         item.id === id ? { ...item, [campo]: valor } : item
// //       )
// //     );
// //   };

// //   const handleFiltroTipoChange = (
// //     _event: React.MouseEvent<HTMLElement>,
// //     newFiltro: FiltroTipo | null
// //   ) => {
// //     if (newFiltro !== null) {
// //       setFiltroTipo(newFiltro);
// //     }
// //   };

// //   const getMaterialesFiltrados = () => {
// //     let materialesFiltrados = itemsMaterial;

// //     // Filtrar por tipo
// //     if (filtroTipo !== "TODOS") {
// //       if (filtroTipo === "OTROS") {
// //         materialesFiltrados = materialesFiltrados.filter(
// //           (item) => item.tipo === ""
// //         );
// //       } else {
// //         materialesFiltrados = materialesFiltrados.filter((item) =>
// //           item.tipo.includes(filtroTipo)
// //         );
// //       }
// //     }

// //     // Filtrar por búsqueda
// //     if (searchMaterial.trim()) {
// //       materialesFiltrados = materialesFiltrados.filter(
// //         (item) =>
// //           item.codigo.toLowerCase().includes(searchMaterial.toLowerCase()) ||
// //           item.descripcion.toLowerCase().includes(searchMaterial.toLowerCase())
// //       );
// //     }

// //     return materialesFiltrados;
// //   };

// //   // Funciones para Equipo
// //   const abrirModalEquipo = () => {
// //     setOpenModal(true);
// //     setSearchSerie("");
// //     setEquiposFiltrados([]);
// //   };

// //   const cerrarModalEquipo = () => {
// //     setOpenModal(false);
// //     setSearchSerie("");
// //     setEquiposFiltrados([]);
// //   };

// //   const buscarEquipoPorSerie = () => {
// //     if (!searchSerie.trim()) {
// //       setEquiposFiltrados([]);
// //       return;
// //     }

// //     const resultados = catalogoEquipos.filter((equipo) =>
// //       equipo.serie.toLowerCase().includes(searchSerie.toLowerCase())
// //     );
// //     setEquiposFiltrados(resultados);
// //   };

// //   const agregarEquipoDesdeModal = (equipo: ItemEquipo) => {
// //     const yaExiste = itemsEquipo.some((item) => item.serie === equipo.serie);

// //     if (yaExiste) {
// //       alert("Este equipo ya ha sido agregado al despacho");
// //       return;
// //     }

// //     const nuevoEquipo = {
// //       ...equipo,
// //       id: `equipo-desp-${Date.now()}`,
// //     };

// //     setItemsEquipo([...itemsEquipo, nuevoEquipo]);
// //     cerrarModalEquipo();
// //   };

// //   const eliminarItemEquipo = (id: string) => {
// //     setItemsEquipo(itemsEquipo.filter((item) => item.id !== id));
// //   };

// //   const actualizarItemEquipo = (
// //     id: string,
// //     campo: keyof ItemEquipo,
// //     valor: string
// //   ) => {
// //     setItemsEquipo(
// //       itemsEquipo.map((item) =>
// //         item.id === id ? { ...item, [campo]: valor } : item
// //       )
// //     );
// //   };

// //   const handleGuardarBorrador = () => {
// //     console.log("Guardando borrador...", {
// //       tecnico,
// //       fechaDespacho,
// //       dni,
// //       itemsMaterial,
// //       itemsEquipo,
// //     });
// //     alert("Borrador guardado correctamente");
// //   };

// //   const handleGuardarDespacho = () => {
// //     // Filtrar solo los materiales con cantidad > 0
// //     const materialesConCantidad = itemsMaterial.filter(
// //       (item) => parseFloat(item.cantidad) > 0
// //     );

// //     console.log("Guardando despacho...", {
// //       tecnico,
// //       fechaDespacho,
// //       dni,
// //       itemsMaterial: materialesConCantidad,
// //       itemsEquipo,
// //     });

// //     const nuevoDespacho: DespachoGuardado = {
// //       id: `DESP-${Date.now()}`,
// //       fecha: new Date().toLocaleString("es-PE", {
// //         day: "2-digit",
// //         month: "2-digit",
// //         year: "numeric",
// //         hour: "2-digit",
// //         minute: "2-digit",
// //         hour12: true,
// //       }),
// //       usuario: "Usuario Actual",
// //       tecnico: tecnico || "N/A",
// //       totalMaterial: getTotalMaterial(),
// //       totalEquipo: itemsEquipo.length,
// //     };

// //     setDespachoGuardado(nuevoDespacho);
// //     setShowSuccess(true);

// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //   };

// //   const getTotalMaterial = () => {
// //     return itemsMaterial.reduce(
// //       (acc, item) => acc + (parseFloat(item.cantidad) || 0),
// //       0
// //     );
// //   };

// //   const getTotalMaterialesConCantidad = () => {
// //     return itemsMaterial.filter((item) => parseFloat(item.cantidad) > 0).length;
// //   };

// //   const materialesFiltrados = getMaterialesFiltrados();

// //   return (
// //     <Box
// //       sx={{
// //         maxWidth: 1400,
// //         mx: "auto",
// //         p: 3,
// //         display: "flex",
// //         flexDirection: "column",
// //         gap: 3,
// //       }}
// //     >
// //       {/* Título Principal */}
// //       <TitleCard
// //         icon={<LocalShippingOutlined sx={{ fontSize: 32 }} />}
// //         title="Despacho a Cuadrillas"
// //         description="Gestión de despacho de materiales y equipos a técnicos de campo"
// //       />

// //       {/* Panel Informativo de Despacho Guardado */}
// //       {showSuccess && despachoGuardado && (
// //         <Grow in={showSuccess} timeout={800}>
// //           <Box>
// //             {/* Alert de Éxito */}
// //             <Alert
// //               severity="success"
// //               icon={<CheckCircleOutline fontSize="large" />}
// //               sx={{
// //                 mb: 3,
// //                 borderRadius: 3,
// //                 boxShadow: "rgba(46, 125, 50, 0.15) 0px 4px 16px",
// //               }}
// //             >
// //               <Typography variant="h6" fontWeight={600} gutterBottom>
// //                 ¡Despacho guardado exitosamente!
// //               </Typography>
// //               <Typography variant="body2">
// //                 El despacho ha sido registrado correctamente en el sistema.
// //               </Typography>
// //             </Alert>

// //             {/* Tarjeta con Información del Despacho */}
// //             <Card
// //               elevation={3}
// //               sx={{
// //                 borderRadius: 4,
// //                 boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
// //                 p: 4,
// //                 bgcolor: "background.paper",
// //               }}
// //             >
// //               <Box
// //                 sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
// //               >
// //                 <InfoOutlined sx={{ color: "info.main", fontSize: 32 }} />
// //                 <Typography variant="h6" fontWeight={600}>
// //                   Información del Despacho
// //                 </Typography>
// //               </Box>

// //               <Divider sx={{ mb: 3 }} />

// //               <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
// //                 {/* Código de Despacho */}
// //                 <Box
// //                   sx={{
// //                     display: "flex",
// //                     alignItems: "center",
// //                     gap: 2,
// //                     p: 2,
// //                     bgcolor: "action.hover",
// //                     borderRadius: 2,
// //                   }}
// //                 >
// //                   <Typography
// //                     variant="body1"
// //                     color="text.secondary"
// //                     fontWeight={600}
// //                   >
// //                     Código de Despacho:
// //                   </Typography>
// //                   <Chip
// //                     label={despachoGuardado.id}
// //                     color="primary"
// //                     sx={{ fontWeight: 700, fontSize: 14 }}
// //                   />
// //                 </Box>

// //                 {/* Fecha y Usuario */}
// //                 <Box
// //                   sx={{
// //                     display: "flex",
// //                     gap: 4,
// //                     flexWrap: "wrap",
// //                     p: 2,
// //                     bgcolor: "background.default",
// //                     borderRadius: 2,
// //                   }}
// //                 >
// //                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
// //                     <CalendarTodayOutlined
// //                       sx={{ color: "text.secondary", fontSize: 20 }}
// //                     />
// //                     <Typography variant="body2" color="text.secondary">
// //                       Fecha:
// //                     </Typography>
// //                     <Typography variant="body1" fontWeight={600}>
// //                       {despachoGuardado.fecha}
// //                     </Typography>
// //                   </Box>
// //                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
// //                     <PersonOutlined
// //                       sx={{ color: "text.secondary", fontSize: 20 }}
// //                     />
// //                     <Typography variant="body2" color="text.secondary">
// //                       Registrado por:
// //                     </Typography>
// //                     <Typography variant="body1" fontWeight={600}>
// //                       {despachoGuardado.usuario}
// //                     </Typography>
// //                   </Box>
// //                 </Box>

// //                 {/* Técnico y Totales */}
// //                 <Box
// //                   sx={{
// //                     display: "flex",
// //                     gap: 4,
// //                     flexWrap: "wrap",
// //                     p: 2,
// //                     bgcolor: "background.default",
// //                     borderRadius: 2,
// //                   }}
// //                 >
// //                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
// //                     <PersonOutlined
// //                       sx={{ color: "primary.main", fontSize: 20 }}
// //                     />
// //                     <Typography variant="body2" color="text.secondary">
// //                       Técnico:
// //                     </Typography>
// //                     <Typography variant="body1" fontWeight={600}>
// //                       {despachoGuardado.tecnico}
// //                     </Typography>
// //                   </Box>
// //                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
// //                     <InventoryOutlined
// //                       sx={{ color: "primary.main", fontSize: 20 }}
// //                     />
// //                     <Typography variant="body2" color="text.secondary">
// //                       Total Materiales:
// //                     </Typography>
// //                     <Chip
// //                       label={despachoGuardado.totalMaterial}
// //                       color="primary"
// //                       size="small"
// //                       sx={{ fontWeight: 700 }}
// //                     />
// //                   </Box>
// //                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
// //                     <LocalShippingOutlined
// //                       sx={{ color: "success.main", fontSize: 20 }}
// //                     />
// //                     <Typography variant="body2" color="text.secondary">
// //                       Total Equipos:
// //                     </Typography>
// //                     <Chip
// //                       label={despachoGuardado.totalEquipo}
// //                       color="success"
// //                       size="small"
// //                       sx={{ fontWeight: 700 }}
// //                     />
// //                   </Box>
// //                 </Box>
// //               </Box>
// //             </Card>
// //           </Box>
// //         </Grow>
// //       )}

// //       {/* Formulario Principal */}
// //       <Card
// //         elevation={3}
// //         sx={{
// //           borderRadius: 4,
// //           boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
// //           p: 4,
// //         }}
// //       >
// //         {/* Datos del Técnico */}
// //         <SectionHeader
// //           icon={
// //             <LocalShippingOutlined
// //               sx={{ fontSize: 28, color: "primary.main" }}
// //             />
// //           }
// //           title="Datos del Técnico"
// //           subtitle="Selecciona el técnico y fecha para el despacho"
// //         />

// //         <Box
// //           sx={{
// //             display: "flex",
// //             gap: 2,
// //             mb: 4,
// //             flexWrap: "wrap",
// //           }}
// //         >
// //           <Box sx={{ flex: "1 1 250px" }}>
// //             <Typography
// //               variant="body2"
// //               color="text.secondary"
// //               fontWeight={600}
// //               mb={1}
// //             >
// //               Técnico*
// //             </Typography>
// //             <Autocomplete
// //               value={tecnico}
// //               onChange={(_, newValue) => setTecnico(newValue)}
// //               options={tecnicosDisponibles}
// //               renderInput={(params) => (
// //                 <TextField
// //                   {...params}
// //                   placeholder="Selecciona técnico"
// //                   size="small"
// //                 />
// //               )}
// //               size="small"
// //             />
// //           </Box>

// //           <Box sx={{ flex: "1 1 150px" }}>
// //             <Typography
// //               variant="body2"
// //               color="text.secondary"
// //               fontWeight={600}
// //               mb={1}
// //             >
// //               DNI
// //             </Typography>
// //             <TextField
// //               fullWidth
// //               placeholder="DNI"
// //               value={dni}
// //               onChange={(e) => setDni(e.target.value)}
// //               size="small"
// //               disabled={!tecnico}
// //             />
// //           </Box>

// //           <Box sx={{ flex: "1 1 180px" }}>
// //             <Typography
// //               variant="body2"
// //               color="text.secondary"
// //               fontWeight={600}
// //               mb={1}
// //             >
// //               Fecha
// //             </Typography>
// //             <TextField
// //               type="date"
// //               fullWidth
// //               value={fechaDespacho}
// //               onChange={(e) => setFechaDespacho(e.target.value)}
// //               size="small"
// //               InputLabelProps={{ shrink: true }}
// //             />
// //           </Box>
// //         </Box>

// //         <Divider sx={{ my: 3 }} />

// //         {/* Sección: Items a Despachar - MATERIAL */}
// //         <SectionHeader
// //           icon={<InventoryOutlined sx={{ fontSize: 24, color: "info.main" }} />}
// //           title="Materiales a Despachar"
// //           subtitle="Catálogo completo de materiales - Ingresa las cantidades necesarias"
// //         />

// //         {/* Filtros y Búsqueda */}
// //         <Box sx={{ mb: 3 }}>
// //           <Box
// //             sx={{
// //               display: "flex",
// //               gap: 2,
// //               mb: 2,
// //               flexWrap: "wrap",
// //               alignItems: "center",
// //             }}
// //           >
// //             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //               <FilterListOutlined sx={{ color: "text.secondary" }} />
// //               <Typography variant="body2" fontWeight={600}>
// //                 Filtrar por tipo:
// //               </Typography>
// //             </Box>
// //             <ToggleButtonGroup
// //               value={filtroTipo}
// //               exclusive
// //               onChange={handleFiltroTipoChange}
// //               size="small"
// //             >
// //               <ToggleButton value="TODOS">Todos</ToggleButton>
// //               <ToggleButton value="HFC">HFC</ToggleButton>
// //               <ToggleButton value="FTTH">FTTH</ToggleButton>
// //               <ToggleButton value="HFC-FTTH">HFC-FTTH</ToggleButton>
// //               <ToggleButton value="OTROS">Otros</ToggleButton>
// //             </ToggleButtonGroup>
// //           </Box>

// //           <TextField
// //             fullWidth
// //             placeholder="Buscar por código o descripción..."
// //             value={searchMaterial}
// //             onChange={(e) => setSearchMaterial(e.target.value)}
// //             size="small"
// //             InputProps={{
// //               startAdornment: (
// //                 <SearchOutlined sx={{ mr: 1, color: "text.secondary" }} />
// //               ),
// //             }}
// //           />
// //         </Box>

// //         {/* Header de la tabla Material */}
// //         <Box
// //           sx={{
// //             display: "flex",
// //             gap: 1,
// //             mb: 1,
// //             p: 1.5,
// //             bgcolor: "action.hover",
// //             borderRadius: 1,
// //             fontWeight: 600,
// //           }}
// //         >
// //           <Box sx={{ flex: "0 0 100px" }}>
// //             <Typography variant="body2" fontWeight={700}>
// //               CÓDIGO
// //             </Typography>
// //           </Box>
// //           <Box sx={{ flex: "2 1 300px" }}>
// //             <Typography variant="body2" fontWeight={700}>
// //               DESCRIPCIÓN
// //             </Typography>
// //           </Box>
// //           <Box sx={{ flex: "0 0 80px" }}>
// //             <Typography variant="body2" fontWeight={700}>
// //               U.M.
// //             </Typography>
// //           </Box>
// //           <Box sx={{ flex: "0 0 100px" }}>
// //             <Typography variant="body2" fontWeight={700}>
// //               TIPO
// //             </Typography>
// //           </Box>
// //           <Box sx={{ flex: "0 0 100px" }}>
// //             <Typography variant="body2" fontWeight={700}>
// //               CANTIDAD
// //             </Typography>
// //           </Box>
// //         </Box>

// //         {/* Filas de Material */}
// //         <Box
// //           sx={{
// //             display: "flex",
// //             flexDirection: "column",
// //             gap: 1,
// //             mb: 3,
// //             maxHeight: 500,
// //             overflowY: "auto",
// //             pr: 1,
// //           }}
// //         >
// //           {materialesFiltrados.map((item, index) => (
// //             <Fade key={item.id} in={true} timeout={300 + index * 20}>
// //               <Box
// //                 sx={{
// //                   display: "flex",
// //                   gap: 1,
// //                   alignItems: "center",
// //                   p: 1.5,
// //                   bgcolor:
// //                     parseFloat(item.cantidad) > 0
// //                       ? "primary.50"
// //                       : "background.default",
// //                   borderRadius: 2,
// //                   border: "1px solid",
// //                   borderColor:
// //                     parseFloat(item.cantidad) > 0 ? "primary.main" : "divider",
// //                   transition: "all 0.2s ease",
// //                 }}
// //               >
// //                 <Box sx={{ flex: "0 0 100px" }}>
// //                   <Typography variant="body2" fontWeight={600}>
// //                     {item.codigo}
// //                   </Typography>
// //                 </Box>
// //                 <Box sx={{ flex: "2 1 300px" }}>
// //                   <Typography variant="body2">{item.descripcion}</Typography>
// //                 </Box>
// //                 <Box sx={{ flex: "0 0 80px" }}>
// //                   <Chip label={item.uom} size="small" variant="outlined" />
// //                 </Box>
// //                 <Box sx={{ flex: "0 0 100px" }}>
// //                   {item.tipo && (
// //                     <Chip
// //                       label={item.tipo}
// //                       size="small"
// //                       color={
// //                         item.tipo === "HFC"
// //                           ? "primary"
// //                           : item.tipo === "FTTH"
// //                           ? "success"
// //                           : "info"
// //                       }
// //                     />
// //                   )}
// //                 </Box>
// //                 <Box sx={{ flex: "0 0 100px" }}>
// //                   <TextField
// //                     placeholder="0"
// //                     fullWidth
// //                     size="small"
// //                     type="number"
// //                     value={item.cantidad}
// //                     onChange={(e) =>
// //                       actualizarItemMaterial(
// //                         item.id,
// //                         "cantidad",
// //                         e.target.value
// //                       )
// //                     }
// //                     inputProps={{ min: 0 }}
// //                   />
// //                 </Box>
// //               </Box>
// //             </Fade>
// //           ))}
// //         </Box>

// //         {/* Resumen Material */}
// //         <Box
// //           sx={{
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "center",
// //             mb: 3,
// //             p: 2,
// //             bgcolor: "primary.50",
// //             borderRadius: 2,
// //           }}
// //         >
// //           <Box sx={{ display: "flex", gap: 4 }}>
// //             <Box>
// //               <Typography variant="body2" color="text.secondary">
// //                 Items con cantidad
// //               </Typography>
// //               <Typography variant="h6" fontWeight={600} color="primary">
// //                 {getTotalMaterialesConCantidad()}
// //               </Typography>
// //             </Box>
// //             <Box>
// //               <Typography variant="body2" color="text.secondary">
// //                 Total unidades
// //               </Typography>
// //               <Typography variant="h6" fontWeight={600} color="primary">
// //                 {getTotalMaterial()}
// //               </Typography>
// //             </Box>
// //           </Box>
// //         </Box>

// //         <Divider sx={{ my: 3 }} />

// //         {/* Sección: EQUIPO */}
// //         <Box
// //           sx={{
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "center",
// //             mb: 2,
// //           }}
// //         >
// //           <Typography variant="subtitle1" fontWeight={600} color="success.main">
// //             EQUIPOS
// //           </Typography>
// //           {/* <Button
// //             size="small"
// //             variant="outlined"
// //             color="success"
// //             startIcon={<AddCircleOutline />}
// //             onClick={abrirModalEquipo}
// //             sx={{ textTransform: "none" }}
// //           >
// //             Agregar Equipo
// //           </Button> */}
// //         </Box>

// //         <Typography
// //           variant="caption"
// //           color="text.secondary"
// //           display="block"
// //           mb={2}
// //           sx={{ fontStyle: "italic" }}
// //         >
// //           Busca equipos por número de serie en el catálogo disponible
// //         </Typography>

// //         {/* Campo de Búsqueda */}
// //         <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
// //           <TextField
// //             fullWidth
// //             placeholder="Ingresa el número de serie del equipo"
// //             value={searchSerie}
// //             onChange={(e) => {
// //               setSearchSerie(e.target.value);

// //               if (!e.target.value.trim()) {
// //                 setEquiposFiltrados([]);
// //                 return;
// //               }
// //               const resultados = catalogoEquipos.filter((equipo) =>
// //                 equipo.serie
// //                   .toLowerCase()
// //                   .includes(e.target.value.toLowerCase())
// //               );
// //               setEquiposFiltrados(resultados);
// //             }}
// //             onKeyPress={(e) => {
// //               if (e.key === "Enter") {
// //                 buscarEquipoPorSerie();
// //               }
// //             }}
// //             size="small"
// //           />
// //           <Button
// //             variant="contained"
// //             startIcon={<SearchOutlined />}
// //             onClick={buscarEquipoPorSerie}
// //             sx={{ textTransform: "none", px: 3 }}
// //           >
// //             Buscar
// //           </Button>
// //         </Box>

// //         {/* Resultados de Búsqueda */}
// //         {equiposFiltrados.length > 0 ? (
// //           <TableContainer
// //             component={Paper}
// //             sx={{ borderRadius: 2, maxHeight: 400 ,mb:3}}
// //           >
// //             <Table stickyHeader size="small">
// //               <TableHead>
// //                 <TableRow>
// //                   <TableCell>
// //                     <Typography variant="body2" fontWeight={700}>
// //                       SERIE
// //                     </Typography>
// //                   </TableCell>
// //                   <TableCell>
// //                     <Typography variant="body2" fontWeight={700}>
// //                       CÓDIGO
// //                     </Typography>
// //                   </TableCell>
// //                   <TableCell>
// //                     <Typography variant="body2" fontWeight={700}>
// //                       DESCRIPCIÓN
// //                     </Typography>
// //                   </TableCell>
// //                   <TableCell align="center">
// //                     <Typography variant="body2" fontWeight={700}>
// //                       ACCIÓN
// //                     </Typography>
// //                   </TableCell>
// //                 </TableRow>
// //               </TableHead>
// //               <TableBody>
// //                 {equiposFiltrados.map((equipo) => (
// //                   <TableRow
// //                     key={equipo.id}
// //                     hover
// //                     sx={{
// //                       "&:hover": {
// //                         bgcolor: "action.hover",
// //                       },
// //                     }}
// //                   >
// //                     <TableCell>
// //                       <Typography variant="body2" fontWeight={600}>
// //                         {equipo.serie}
// //                       </Typography>
// //                     </TableCell>
// //                     <TableCell>
// //                       <Typography variant="body2">{equipo.codigo}</Typography>
// //                     </TableCell>
// //                     <TableCell>
// //                       <Typography variant="body2">
// //                         {equipo.descripcion}
// //                       </Typography>
// //                     </TableCell>
// //                     <TableCell align="center">
// //                       <Button
// //                         variant="contained"
// //                         size="small"
// //                         onClick={() => agregarEquipoDesdeModal(equipo)}
// //                         sx={{ textTransform: "none" }}
// //                       >
// //                         Agregar
// //                       </Button>
// //                     </TableCell>
// //                   </TableRow>
// //                 ))}
// //               </TableBody>
// //             </Table>
// //           </TableContainer>
// //         ) : searchSerie && equiposFiltrados.length === 0 ? (
// //           <Box
// //             sx={{
// //               textAlign: "center",
// //               py: 4,
// //               bgcolor: "background.default",
// //               borderRadius: 2,
// //               mb: 3,
// //             }}
// //           >
// //             <Typography variant="body2" color="text.secondary">
// //               No se encontraron equipos con la serie: "{searchSerie}"
// //             </Typography>
// //           </Box>
// //         ) : (
// //           <Box
// //             sx={{
// //               textAlign: "center",
// //               py: 4,
// //               bgcolor: "background.default",
// //               borderRadius: 2,
// //               mb: 3,
// //             }}
// //           >
// //             <Typography variant="body2" color="text.secondary">
// //               Ingresa un número de serie y haz clic en buscar
// //             </Typography>
// //           </Box>
// //         )}

// //         {/* Lista de Equipos Agregados */}
// //         {itemsEquipo.length > 0 ? (
// //           <Box
// //             sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}
// //           >
// //             {/* Header */}
// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 gap: 1,
// //                 p: 1.5,
// //                 bgcolor: "success.50",
// //                 borderRadius: 1,
// //                 fontWeight: 600,
// //               }}
// //             >
// //               <Box sx={{ flex: "1 1 150px" }}>
// //                 <Typography variant="body2" fontWeight={700}>
// //                   SERIE
// //                 </Typography>
// //               </Box>
// //               <Box sx={{ flex: "0 0 120px" }}>
// //                 <Typography variant="body2" fontWeight={700}>
// //                   CÓDIGO
// //                 </Typography>
// //               </Box>
// //               <Box sx={{ flex: "2 1 300px" }}>
// //                 <Typography variant="body2" fontWeight={700}>
// //                   DESCRIPCIÓN
// //                 </Typography>
// //               </Box>
// //               <Box sx={{ flex: "0 0 100px" }}>
// //                 <Typography variant="body2" fontWeight={700}>
// //                   CANTIDAD
// //                 </Typography>
// //               </Box>
// //               <Box sx={{ flex: "0 0 80px", textAlign: "center" }}>
// //                 <Typography variant="body2" fontWeight={700}>
// //                   ACCIÓN
// //                 </Typography>
// //               </Box>
// //             </Box>

// //             {/* Filas */}
// //             {itemsEquipo.map((item, index) => (
// //               <Grow key={item.id} in={true} timeout={300 + index * 100}>
// //                 <Box
// //                   sx={{
// //                     display: "flex",
// //                     gap: 1,
// //                     alignItems: "center",
// //                     p: 1.5,
// //                     bgcolor: "background.default",
// //                     borderRadius: 2,
// //                     border: "1px solid",
// //                     borderColor: "success.light",
// //                   }}
// //                 >
// //                   <Box sx={{ flex: "1 1 150px" }}>
// //                     <Typography variant="body2" fontWeight={600}>
// //                       {item.serie}
// //                     </Typography>
// //                   </Box>
// //                   <Box sx={{ flex: "0 0 120px" }}>
// //                     <Typography variant="body2">{item.codigo}</Typography>
// //                   </Box>
// //                   <Box sx={{ flex: "2 1 300px" }}>
// //                     <Typography variant="body2">{item.descripcion}</Typography>
// //                   </Box>
// //                   <Box sx={{ flex: "0 0 100px" }}>
// //                     <TextField
// //                       placeholder="Cant."
// //                       fullWidth
// //                       size="small"
// //                       type="number"
// //                       value={item.cantidad}
// //                       onChange={(e) =>
// //                         actualizarItemEquipo(
// //                           item.id,
// //                           "cantidad",
// //                           e.target.value
// //                         )
// //                       }
// //                       inputProps={{ min: 1 }}
// //                     />
// //                   </Box>
// //                   <Box sx={{ flex: "0 0 80px", textAlign: "center" }}>
// //                     <IconButton
// //                       color="error"
// //                       size="small"
// //                       onClick={() => eliminarItemEquipo(item.id)}
// //                     >
// //                       <DeleteOutline fontSize="small" />
// //                     </IconButton>
// //                   </Box>
// //                 </Box>
// //               </Grow>
// //             ))}
// //           </Box>
// //         ) : (
// //           <Box
// //             sx={{
// //               textAlign: "center",
// //               py: 4,
// //               bgcolor: "background.default",
// //               borderRadius: 2,
// //               mb: 3,
// //             }}
// //           >
// //             <Typography variant="body2" color="text.secondary">
// //               No hay equipos agregados. Digita los codigos que necesites y encuentra el equipo que estas buscando.
// //             </Typography>
// //           </Box>
// //         )}

// //         {/* Resumen Equipo */}
// //         {itemsEquipo.length > 0 && (
// //           <Box
// //             sx={{
// //               display: "flex",
// //               justifyContent: "flex-end",
// //               alignItems: "center",
// //               mb: 3,
// //             }}
// //           >
// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 gap: 2,
// //                 alignItems: "center",
// //                 bgcolor: "success.50",
// //                 px: 3,
// //                 py: 1,
// //                 borderRadius: 2,
// //               }}
// //             >
// //               <Typography variant="body2" fontWeight={600}>
// //                 Total Equipos:
// //               </Typography>
// //               <Chip
// //                 label={itemsEquipo.length}
// //                 color="success"
// //                 size="small"
// //                 sx={{ fontWeight: 700 }}
// //               />
// //             </Box>
// //           </Box>
// //         )}

// //         <Divider sx={{ my: 3 }} />

// //         {/* Botones de Acción Principal */}
// //         <Box
// //           sx={{
// //             display: "flex",
// //             gap: 2,
// //             justifyContent: "flex-end",
// //             flexWrap: "wrap",
// //           }}
// //         >
// //           <Button
// //             variant="outlined"
// //             startIcon={<SaveOutlined />}
// //             onClick={handleGuardarBorrador}
// //             sx={{
// //               textTransform: "none",
// //               fontWeight: 600,
// //               px: 4,
// //               py: 1.2,
// //             }}
// //           >
// //             Guardar Borrador
// //           </Button>
// //           <Button
// //             variant="contained"
// //             onClick={handleGuardarDespacho}
// //             sx={{
// //               textTransform: "none",
// //               fontWeight: 600,
// //               px: 4,
// //               py: 1.2,
// //             }}
// //           >
// //             Guardar Despacho
// //           </Button>
// //         </Box>
// //       </Card>

// //       {/* Modal de Búsqueda de Equipos */}
// //       {/* <Dialog
// //         open={openModal}
// //         onClose={cerrarModalEquipo}
// //         maxWidth="md"
// //         fullWidth
// //         PaperProps={{
// //           sx: {
// //             borderRadius: 3,
// //           },
// //         }}
// //       >
// //         <DialogTitle
// //           sx={{
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "center",
// //             pb: 2,
// //           }}
// //         >
// //           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
// //             <SearchOutlined sx={{ color: "primary.main", fontSize: 28 }} />
// //             <Typography variant="h6" fontWeight={600}>
// //               Buscar Equipo por Serie
// //             </Typography>
// //           </Box>
// //           <IconButton onClick={cerrarModalEquipo} size="small">
// //             <CloseOutlined />
// //           </IconButton>
// //         </DialogTitle>

// //         <DialogContent>
// //           <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
// //             <TextField
// //               fullWidth
// //               placeholder="Ingresa el número de serie del equipo"
// //               value={searchSerie}
// //               onChange={(e) => setSearchSerie(e.target.value)}
// //               onKeyPress={(e) => {
// //                 if (e.key === "Enter") {
// //                   buscarEquipoPorSerie();
// //                 }
// //               }}
// //               size="small"
// //             />
// //             <Button
// //               variant="contained"
// //               startIcon={<SearchOutlined />}
// //               onClick={buscarEquipoPorSerie}
// //               sx={{ textTransform: "none", px: 3 }}
// //             >
// //               Buscar
// //             </Button>
// //           </Box>

// //           {equiposFiltrados.length > 0 ? (
// //             <TableContainer
// //               component={Paper}
// //               sx={{ borderRadius: 2, maxHeight: 400 }}
// //             >
// //               <Table stickyHeader size="small">
// //                 <TableHead>
// //                   <TableRow>
// //                     <TableCell>
// //                       <Typography variant="body2" fontWeight={700}>
// //                         SERIE
// //                       </Typography>
// //                     </TableCell>
// //                     <TableCell>
// //                       <Typography variant="body2" fontWeight={700}>
// //                         CÓDIGO
// //                       </Typography>
// //                     </TableCell>
// //                     <TableCell>
// //                       <Typography variant="body2" fontWeight={700}>
// //                         DESCRIPCIÓN
// //                       </Typography>
// //                     </TableCell>
// //                     <TableCell align="center">
// //                       <Typography variant="body2" fontWeight={700}>
// //                         ACCIÓN
// //                       </Typography>
// //                     </TableCell>
// //                   </TableRow>
// //                 </TableHead>
// //                 <TableBody>
// //                   {equiposFiltrados.map((equipo) => (
// //                     <TableRow
// //                       key={equipo.id}
// //                       hover
// //                       sx={{
// //                         "&:hover": {
// //                           bgcolor: "action.hover",
// //                         },
// //                       }}
// //                     >
// //                       <TableCell>
// //                         <Typography variant="body2" fontWeight={600}>
// //                           {equipo.serie}
// //                         </Typography>
// //                       </TableCell>
// //                       <TableCell>
// //                         <Typography variant="body2">{equipo.codigo}</Typography>
// //                       </TableCell>
// //                       <TableCell>
// //                         <Typography variant="body2">
// //                           {equipo.descripcion}
// //                         </Typography>
// //                       </TableCell>
// //                       <TableCell align="center">
// //                         <Button
// //                           variant="contained"
// //                           size="small"
// //                           onClick={() => agregarEquipoDesdeModal(equipo)}
// //                           sx={{ textTransform: "none" }}
// //                         >
// //                           Agregar
// //                         </Button>
// //                       </TableCell>
// //                     </TableRow>
// //                   ))}
// //                 </TableBody>
// //               </Table>
// //             </TableContainer>
// //           ) : searchSerie && equiposFiltrados.length === 0 ? (
// //             <Box
// //               sx={{
// //                 textAlign: "center",
// //                 py: 4,
// //                 bgcolor: "background.default",
// //                 borderRadius: 2,
// //               }}
// //             >
// //               <Typography variant="body1" color="text.secondary">
// //                 No se encontraron equipos con la serie: "{searchSerie}"
// //               </Typography>
// //             </Box>
// //           ) : (
// //             <Box
// //               sx={{
// //                 textAlign: "center",
// //                 py: 4,
// //                 bgcolor: "background.default",
// //                 borderRadius: 2,
// //               }}
// //             >
// //               <Typography variant="body1" color="text.secondary">
// //                 Ingresa un número de serie y haz clic en buscar
// //               </Typography>
// //             </Box>
// //           )}
// //         </DialogContent>

// //         <DialogActions sx={{ px: 3, pb: 3 }}>
// //           <Button
// //             variant="outlined"
// //             onClick={cerrarModalEquipo}
// //             sx={{ textTransform: "none" }}
// //           >
// //             Cerrar
// //           </Button>
// //         </DialogActions>
// //       </Dialog> */}
// //     </Box>
// //   );
// // }
// "use client";

// import { useState, useRef, useEffect } from "react";
// import {
//   Box, Card, Typography, TextField, Divider, IconButton, Alert,
//   Fade, Grow, Chip, Dialog, DialogTitle, DialogContent, DialogActions,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, ToggleButtonGroup, ToggleButton, Stack, InputAdornment,
//   Avatar, Autocomplete,
// } from "@mui/material";
// import {
//   LocalShippingOutlined, DeleteOutline, SaveOutlined,
//   CheckCircleOutline, InventoryOutlined, SearchOutlined, CloseOutlined,
//   CalendarTodayOutlined, PersonOutlined, FilterListOutlined,
//   PictureAsPdfOutlined, BadgeOutlined, BusinessOutlined,
//   BuildOutlined, DevicesOutlined, DownloadOutlined,
// } from "@mui/icons-material";
// import { TitleCard } from "@/src/components/base/TitleCard";
// import { SectionHeader } from "@/src/components/base/SectionHeader";
// import ButtonBase from "@/src/components/base/ButtonBase";

// // ─── Maestro de Personal ──────────────────────────────────────────────────────
// interface Personal {
//   dni: string;
//   nombres: string;
//   estado: "SUPERVISOR" | "TECNICO";
//   contratista: string;
// }

// const MAESTRO_PERSONAL: Personal[] = [
//   { dni: "76804249", nombres: "ABAD ABAD OSCAR", estado: "SUPERVISOR", contratista: "LPS" },
//   { dni: "46473310", nombres: "ALARCON HUAMAN NELSON", estado: "TECNICO", contratista: "LPS" },
//   { dni: "71867999", nombres: "AQUITUARI VASQUEZ MARIO JEFRIN", estado: "TECNICO", contratista: "LINKPRO" },
//   { dni: "75213285", nombres: "ARIAS VERA ALONSO FRANCISCO", estado: "TECNICO", contratista: "LINKPRO" },
//   { dni: "72220889", nombres: "ARTEAGA ROJAS PAUL ENRIQUE", estado: "TECNICO", contratista: "TECH-LA" },
//   { dni: "73004859", nombres: "AYRAHUACHO QUISPE JOSE ANDRES", estado: "TECNICO", contratista: "REDTEL" },
//   { dni: "10348890", nombres: "BACA VIVANCO JULIO CESAR", estado: "TECNICO", contratista: "LPS" },
//   { dni: "74169389", nombres: "BARRANTES ALVA JULIO SALVATORE", estado: "TECNICO", contratista: "LINKPRO" },
//   { dni: "5496471",  nombres: "BELTRAN ROMERO RAMON ENRIQUE", estado: "TECNICO", contratista: "FR PARTNER" },
//   { dni: "10861147", nombres: "BLAS OLIVER HELER HUMBERTO", estado: "TECNICO", contratista: "REDTEL" },
//   { dni: "47918892", nombres: "BORGOÑO ANCIETA GIORGIO JOSE", estado: "TECNICO", contratista: "TECH-LA" },
//   { dni: "71729902", nombres: "CALUA MATOS CLAUDIO ALEXANDER", estado: "TECNICO", contratista: "REDTEL" },
//   { dni: "8180943",  nombres: "CASTRILLO NIÑO JOSEPH JESUS", estado: "TECNICO", contratista: "FR PARTNER" },
//   { dni: "44114555", nombres: "CAUCHA ANCAJIMA SEGUNDO ADRIANO", estado: "TECNICO", contratista: "FEROCTEL" },
//   { dni: "25501126", nombres: "CEBALLOS MANZANO EDGAR JESUS", estado: "TECNICO", contratista: "LUMI" },
//   { dni: "47921398", nombres: "CERDA TORRES JHEYSON JUAN JESUS", estado: "TECNICO", contratista: "LPS" },
//   { dni: "72110444", nombres: "CERON CABALLERO CHRISTIAN ALEXIS", estado: "TECNICO", contratista: "FR PARTNER" },
//   { dni: "92822039", nombres: "CHACON CHAVEZ DAVID MATHIAS", estado: "TECNICO", contratista: "REDTEL" },
//   { dni: "70102718", nombres: "CRUZ TRUJILLO LUIS YESHUA", estado: "TECNICO", contratista: "SVC INGENIEROS" },
//   { dni: "71300010", nombres: "DEL CASTILLO CASTILLO FRANK CARLIN", estado: "TECNICO", contratista: "LPS" },
//   { dni: "44989681", nombres: "FERNANDEZ SOLANO JUAN CARLOS", estado: "TECNICO", contratista: "FEROCTEL" },
//   { dni: "72016672", nombres: "FLORES HUAMAN DEEREX EDERXON", estado: "TECNICO", contratista: "LPS" },
//   { dni: "43392357", nombres: "GALLO NOVOA MIAMI HELMUT", estado: "TECNICO", contratista: "LPS" },
//   { dni: "80115213", nombres: "GARRIDO CORREA GERARDO MANUEL", estado: "TECNICO", contratista: "TECH-LA" },
//   { dni: "48079042", nombres: "GOMEZ CASTRO RIGER JAIR", estado: "TECNICO", contratista: "SLINC" },
//   { dni: "76510526", nombres: "GUTIERREZ CARDENAS JESUS ANGEL", estado: "TECNICO", contratista: "LPS" },
//   { dni: "40370192", nombres: "HUALPA CALDERON VILMA BEATRIZ", estado: "TECNICO", contratista: "FR PARTNER" },
//   { dni: "74232233", nombres: "HUAMAN RAMIREZ ANDRE ANTONIO", estado: "TECNICO", contratista: "REDTEL" },
//   { dni: "74228279", nombres: "MARCELO CIPRIANO CARLOS ALBERTO", estado: "TECNICO", contratista: "ICHIBAN" },
//   { dni: "09943922", nombres: "MARTINEZ RODRIGUEZ GERMAN RAFAEL", estado: "TECNICO", contratista: "LPS" },
//   { dni: "44826663", nombres: "MASIAS FLORES VICTOR EDUARDO", estado: "TECNICO", contratista: "TECH-LA" },
//   { dni: "75414131", nombres: "MELENDRES VEGA JAYRO KILLEER", estado: "TECNICO", contratista: "SVC INGENIERÍA" },
//   { dni: "40731146", nombres: "MORALES VARGAS WILFREDO HERNAN", estado: "TECNICO", contratista: "LPS" },
//   { dni: "42916294", nombres: "MORENO MASHNATE FLORINDA AURORA", estado: "TECNICO", contratista: "FR PARTNER" },
//   { dni: "72323391", nombres: "PEZO USNAVA CARLOS", estado: "TECNICO", contratista: "REDTEL" },
//   { dni: "44797101", nombres: "PONTE CIERTO FRANK EDUARDO", estado: "TECNICO", contratista: "REDTEL" },
//   { dni: "75032459", nombres: "QUINCHO VENTOCILLA OMAR ALEJANDRO", estado: "TECNICO", contratista: "LPS" },
//   { dni: "70151085", nombres: "QUISPE COCHACHIN WILLIAM ENRIQUE", estado: "SUPERVISOR", contratista: "LPS" },
//   { dni: "74743255", nombres: "RANILLA HUAMAN ANTONY YORDY", estado: "TECNICO", contratista: "LPS" },
//   { dni: "76294972", nombres: "REGALADO CRUZADO MOISES LUIS", estado: "TECNICO", contratista: "REDTEL" },
//   { dni: "74825094", nombres: "RIOJA CACERES ALESSANDRA ABIGAIL", estado: "TECNICO", contratista: "LPS" },
//   { dni: "76400383", nombres: "RODRIGUEZ MALCA JONATHAN CRESCENCIO", estado: "TECNICO", contratista: "LPS" },
//   { dni: "5574350",  nombres: "ROVAINA QUIJADA YBRAHIM ABELK", estado: "TECNICO", contratista: "FR PARTNER" },
//   { dni: "72668762", nombres: "SANDOVAL AYALA CRISTIAN ALBERTO", estado: "TECNICO", contratista: "REDTEL" },
//   { dni: "47799700", nombres: "SIESQUEN CAMAC JUAN JOSE", estado: "SUPERVISOR", contratista: "LPS" },
//   { dni: "46802275", nombres: "TAYPE HILARIO JUAN JOSE", estado: "TECNICO", contratista: "FR PARTNER" },
//   { dni: "76026008", nombres: "TORRES COTRINA JOSE ANTONIO", estado: "TECNICO", contratista: "FR PARTNER" },
//   { dni: "74657742", nombres: "URBINA CARHUATOCTO ERICKSON ALEXANDER", estado: "TECNICO", contratista: "LINKPRO" },
//   { dni: "72837568", nombres: "VALENZUELA FLORES JOSE EMANUEL", estado: "TECNICO", contratista: "REDTEL" },
//   { dni: "75443086", nombres: "VILLANO VELASQUEZ FREDD ABELARDO", estado: "TECNICO", contratista: "FR PARTNER" },
//   { dni: "73182678", nombres: "VIVAR HUAMAN ERICK ALFONSO", estado: "TECNICO", contratista: "LPS" },
//   { dni: "17786566", nombres: "YANCE PRADO JESUS ENRIQUE", estado: "TECNICO", contratista: "REDTEL" },
//   { dni: "72797287", nombres: "YOLA PONCE GIANFRANCO GIANPIERRE", estado: "TECNICO", contratista: "REDTEL" },
//   { dni: "40051286", nombres: "SALAZAR GARCIA DOMINGO FEDERICO", estado: "TECNICO", contratista: "TECH-LA" },
//   { dni: "05263691", nombres: "HIDALGO BANDRES YOSBELL ALEXANDER", estado: "TECNICO", contratista: "TECH-LA" },
//   { dni: "74703904", nombres: "CARRANZA SILVA LUIS FELIPE", estado: "TECNICO", contratista: "TECH-LA" },
//   { dni: "76096211", nombres: "ATOCHE MORAN ANTONY YAMPIER", estado: "TECNICO", contratista: "LINKPRO" },
//   { dni: "71490034", nombres: "COLLAO ALVARO JOSE LUIS", estado: "TECNICO", contratista: "LINKPRO" },
//   { dni: "74769308", nombres: "ROCA CALDERON FERNANDO FILBORR", estado: "TECNICO", contratista: "SVC INGENIERÍA" },
//   { dni: "48387323", nombres: "PEREZ MORALES BRYAN RONAL", estado: "TECNICO", contratista: "LINKPRO" },
//   { dni: "06263230", nombres: "AULAR MEDINA ALBERTO JOSE GREGORIO", estado: "TECNICO", contratista: "SVC INGENIERÍA" },
//   { dni: "74853269", nombres: "ALONSO TORRES GUILLERMO DAVOR", estado: "TECNICO", contratista: "LEVEL 7" },
//   { dni: "72016892", nombres: "URTEAGA FELIX DOUGLAS", estado: "TECNICO", contratista: "SVC" },
//   { dni: "73442194", nombres: "VALDEZ VARA SANANDRO LUIS", estado: "TECNICO", contratista: "FR PARTNER" },
//   { dni: "74531105", nombres: "RAMOS ARANJO WILBER PABLO", estado: "TECNICO", contratista: "SINTEC" },
//   { dni: "76221346", nombres: "JIMENEZ PEÑA HERNAN", estado: "TECNICO", contratista: "SINTEC" },
//   { dni: "71402571", nombres: "AMBROSIO MELGAREJO SAMUEL JAIRO", estado: "TECNICO", contratista: "LEVEL 7" },
//   { dni: "48055105", nombres: "MENDOZA INCA JOSE LUIS", estado: "TECNICO", contratista: "LUMI" },
//   { dni: "45240903", nombres: "MACHACA SAJAMI ISRAEL CELESTIAL", estado: "TECNICO", contratista: "SINTEC" },
//   { dni: "72406713", nombres: "FAJARDO GONZALES EDUARDO ALDAIR", estado: "TECNICO", contratista: "LINKPRO" },
//   { dni: "44127135", nombres: "FLORES GODIÑO JOSIMAR JEFFERSON EDUARDO", estado: "TECNICO", contratista: "FR SOLUCIONES" },
//   { dni: "43758928", nombres: "INZA GONZALES CESAR CHRISTIAN", estado: "TECNICO", contratista: "FR SOLUCIONES" },
//   { dni: "70578055", nombres: "RODRIGUEZ SULCA JUAN ENRIQUE", estado: "TECNICO", contratista: "FR SOLUCIONES" },
//   { dni: "10195600", nombres: "MESIAS ARGUMEDO ALBERTO DANTE", estado: "TECNICO", contratista: "TECH-LA" },
//   { dni: "42392324", nombres: "MIRANDA BORGA ANGEL LUIS", estado: "TECNICO", contratista: "TECH-LA" },
//   { dni: "73008146", nombres: "ARCE AYRAHUACHO JIMMY ALEXANDER", estado: "TECNICO", contratista: "REDTEL" },
//   { dni: "47900400", nombres: "GUTIERREZ GARRIDO MAX MICHAEL", estado: "TECNICO", contratista: "LUMI" },
//   { dni: "47992486", nombres: "YOVERA VELIZ JHUNNIOR MICHAEL", estado: "TECNICO", contratista: "SVC INGENIERÍA" },
//   { dni: "78878453", nombres: "ESPINOSA CERNA NAEYOL BELISARIO", estado: "TECNICO", contratista: "LPS" },
//   { dni: "72206971", nombres: "NORIEGA VIERA JEANPIERRE", estado: "TECNICO", contratista: "FR PARTNER" },
//   { dni: "70237219", nombres: "ZEC URIBE JOSE LUIS", estado: "TECNICO", contratista: "FR PARTNER" },
//   { dni: "44797101", nombres: "TANANTA ROJAS ALEXANDER ROGER", estado: "TECNICO", contratista: "LINKPRO" },
// ];

// // ─── Tipos ────────────────────────────────────────────────────────────────────
// interface ItemMaterial {
//   id: string;
//   codigo: string;
//   descripcion: string;
//   uom: string;
//   tipo: "HFC" | "FTTH" | "HFC-FTTH" | "";
//   cantidad: string;
// }

// interface ItemEquipo {
//   id: string;
//   serie: string;
//   codigo: string;
//   descripcion: string;
//   cantidad: string;
// }

// interface ItemHerramienta {
//   id: string;
//   codigo: string;
//   descripcion: string;
//   uom: string;
//   cantidad: string;
// }

// type FiltroTipo = "TODOS" | "HFC" | "FTTH" | "HFC-FTTH" | "OTROS";

// // ─── Catálogos ────────────────────────────────────────────────────────────────
// const CATALOGO_MATERIALES: ItemMaterial[] = [
//   { id: "mat-1",  codigo: "1002950", descripcion: "ATADOR DE IDENTIFICACION DE ABONADO",         uom: "UND", tipo: "HFC",      cantidad: "0" },
//   { id: "mat-2",  codigo: "1004705", descripcion: "CABLE COAXIAL BLANCO RG-6 S/MENSAJERO",        uom: "MTS", tipo: "HFC",      cantidad: "0" },
//   { id: "mat-3",  codigo: "1003101", descripcion: "CABLE COAXIAL RG-6 AUTOSOPORTADO",             uom: "MTS", tipo: "HFC",      cantidad: "0" },
//   { id: "mat-4",  codigo: "1033042", descripcion: "CABLE TELEF INTERIOR 2/22 AWG",                uom: "MTS", tipo: "HFC",      cantidad: "0" },
//   { id: "mat-5",  codigo: "1004692", descripcion: "CABLE UTP CAT5E FTP 4PR/24AWG 04070009",       uom: "MTS", tipo: "HFC-FTTH", cantidad: "0" },
//   { id: "mat-6",  codigo: "1004838", descripcion: "CABLE HDMI CHD1-6 MALE TO MALE 2M",            uom: "UND", tipo: "HFC",      cantidad: "0" },
//   { id: "mat-7",  codigo: "1051697", descripcion: "CONTROL REMOTO AN-4803 ECOSS",                 uom: "UND", tipo: "HFC",      cantidad: "0" },
//   { id: "mat-8",  codigo: "1062712", descripcion: "CONECTOR DE CONTINUIDAD RG6 EX6XL-PLUS",       uom: "UND", tipo: "HFC",      cantidad: "0" },
//   { id: "mat-9",  codigo: "1002900", descripcion: "CONECTOR PLUG RJ-45",                          uom: "UND", tipo: "HFC-FTTH", cantidad: "0" },
//   { id: "mat-10", codigo: "1063021", descripcion: "CONECTOR RJ 11",                               uom: "UND", tipo: "HFC-FTTH", cantidad: "0" },
//   { id: "mat-11", codigo: "1003254", descripcion: "DIVISOR INTERIOR 2 VIAS",                      uom: "UND", tipo: "HFC",      cantidad: "0" },
//   { id: "mat-12", codigo: "1003253", descripcion: "DIVISOR INTERIOR 3 VIAS",                      uom: "UND", tipo: "HFC",      cantidad: "0" },
//   { id: "mat-13", codigo: "1004529", descripcion: "ROSETA TELEFONICA CON GEL",                    uom: "UND", tipo: "HFC",      cantidad: "0" },
//   { id: "mat-14", codigo: "1004521", descripcion: "SUJETADOR DE ANCLAJE",                         uom: "UND", tipo: "HFC-FTTH", cantidad: "0" },
//   { id: "mat-15", codigo: "1004520", descripcion: "SUJETADOR DE TRAMO-CHAPA Q",                   uom: "UND", tipo: "HFC-FTTH", cantidad: "0" },
//   { id: "mat-16", codigo: "1063013", descripcion: "CONECTOR FMC2104-SA 14135787 HUAWEI",          uom: "UND", tipo: "FTTH",     cantidad: "0" },
//   { id: "mat-17", codigo: "1044835", descripcion: "PATCHCORD SM SC/APC-SC/APC 3MM 3M ONT",        uom: "UND", tipo: "FTTH",     cantidad: "0" },
//   { id: "mat-18", codigo: "1042681", descripcion: "ROSETA ATB3101 SIN PIGTAIL",                   uom: "UND", tipo: "FTTH",     cantidad: "0" },
//   { id: "mat-19", codigo: "1063891", descripcion: "CAJA DE EMPALME DROP BOX-1 QTK",               uom: "UND", tipo: "FTTH",     cantidad: "0" },
//   { id: "mat-20", codigo: "1063890", descripcion: "CONTROL REMOTO C3401 180000518128 ZTE",        uom: "UND", tipo: "FTTH",     cantidad: "0" },
//   { id: "mat-21", codigo: "1062883", descripcion: "CABLE FO FASTCONNECT DROP 14138979 50M",       uom: "UND", tipo: "FTTH",     cantidad: "0" },
//   { id: "mat-22", codigo: "1062884", descripcion: "CABLE FO FASTCONNECT DROP 14138979 80M",       uom: "UND", tipo: "FTTH",     cantidad: "0" },
//   { id: "mat-23", codigo: "1062885", descripcion: "CABLE FO FASTCONNECT DROP 14138979 100M",      uom: "UND", tipo: "FTTH",     cantidad: "0" },
//   { id: "mat-24", codigo: "1062886", descripcion: "CABLE FO FASTCONNECT DROP 14138979 150M",      uom: "UND", tipo: "FTTH",     cantidad: "0" },
//   { id: "mat-25", codigo: "1062887", descripcion: "CABLE FO FASTCONNECT DROP 14138979 220M",      uom: "UND", tipo: "FTTH",     cantidad: "0" },
//   { id: "mat-26", codigo: "1063812", descripcion: "CABLE FO FASTCONNECT DROP 14138979 300M",      uom: "UND", tipo: "FTTH",     cantidad: "0" },
//   { id: "mat-27", codigo: "1062235", descripcion: "CABLE FO ECS DROP 300M ECOSS (INDOR)",         uom: "UND", tipo: "FTTH",     cantidad: "0" },
//   { id: "mat-28", codigo: "1053621", descripcion: "TELEFONO ECS622 ECOSS",                        uom: "UND", tipo: "HFC-FTTH", cantidad: "0" },
//   { id: "mat-29", codigo: "501217",  descripcion: "GRAPA PLASTICA PARA CABLE RG-6 BLANCA",        uom: "UND", tipo: "",         cantidad: "0" },
//   { id: "mat-30", codigo: "501021",  descripcion: "AMARRE PLASTICO 15 CMS",                       uom: "UND", tipo: "",         cantidad: "0" },
//   { id: "mat-31", codigo: "501120",  descripcion: "CINTA ADHESIVA AISLANTE COLOR NEGRO",          uom: "UND", tipo: "",         cantidad: "0" },
//   { id: "mat-32", codigo: "SUM-0002",descripcion: "CINTA DOBLE CONTACTO 3/4 X 5MT",              uom: "UND", tipo: "",         cantidad: "0" },
// ];

// const CATALOGO_HERRAMIENTAS: ItemHerramienta[] = [
//   { id: "herr-1",  codigo: "HERR-ALT-CORTE", descripcion: "ALICATE DE CORTE 7\" 84-108",                          uom: "UND", cantidad: "0" },
//   { id: "herr-2",  codigo: "HERR-0009",       descripcion: "ALICATE DE PUNTA",                                     uom: "UND", cantidad: "0" },
//   { id: "herr-3",  codigo: "HERR-0025",       descripcion: "ALICATE UNIVERSAL",                                    uom: "UND", cantidad: "0" },
//   { id: "herr-4",  codigo: "HERR-0014",       descripcion: "CRIMPING TOOL PARA RJ11,RJ12,RJ22,RJ45 6 en 1",       uom: "UND", cantidad: "0" },
//   { id: "herr-5",  codigo: "HERR-0047",       descripcion: "DESARMADOR PLANO CHICO",                               uom: "UND", cantidad: "0" },
//   { id: "herr-6",  codigo: "HERR-0051",       descripcion: "INVERSOR DE CORRIENTE 220V A 12V 100W USB",            uom: "UND", cantidad: "0" },
//   { id: "herr-7",  codigo: "HERR-0019",       descripcion: "CABLE EXTENSOR DE CORRIENTE X 20 MTS",                uom: "UND", cantidad: "0" },
//   { id: "herr-8",  codigo: "HERR-0020",       descripcion: "CARTUCHERA PORTAHERRAMIENTAS",                         uom: "UND", cantidad: "0" },
//   { id: "herr-9",  codigo: "HERR-0036",       descripcion: "MULTITESTER CON PROBADOR UTP",                        uom: "UND", cantidad: "0" },
//   { id: "herr-10", codigo: "HERR-0099",       descripcion: "BANDERIN TRIANGULO",                                   uom: "UND", cantidad: "0" },
//   { id: "herr-11", codigo: "TEST-001",         descripcion: "TESTEADOR UTP CAT 5E",                                uom: "UND", cantidad: "0" },
//   { id: "herr-12", codigo: "MULT-001",         descripcion: "MULTIMETRO DIGITAL",                                  uom: "UND", cantidad: "0" },
//   { id: "herr-13", codigo: "LINT-001",         descripcion: "LINTERNA PLASTICA 80 ML + 2 PILAS",                  uom: "UND", cantidad: "0" },
//   { id: "herr-14", codigo: "LIMP-0005",        descripcion: "KIT DE LIMPIEZA (ESPONJA, JABON LIQUIDO, TOALLA)",   uom: "UND", cantidad: "0" },
//   { id: "herr-15", codigo: "MATE-0008",        descripcion: "GRAPA CABLE COAXIAL INTERIOR 8MM",                   uom: "UND", cantidad: "0" },
//   { id: "herr-16", codigo: "MATE-0015",        descripcion: "GRAPA PARA CEMENTO N° 7 X 100 PZ",                   uom: "UND", cantidad: "0" },
// ];

// const CATALOGO_EQUIPOS: ItemEquipo[] = [
//   { id: "eq-1",  serie: "3954GM464202082",    codigo: "4059271", descripcion: "MODEM ARRIS TG3442A 32x8 3.1",                  cantidad: "1" },
//   { id: "eq-2",  serie: "2AD4GL196701282",    codigo: "4059271", descripcion: "MODEM ARRIS TG3442A 32x8 3.1",                  cantidad: "1" },
//   { id: "eq-3",  serie: "3954GM464203146",    codigo: "4059271", descripcion: "MODEM ARRIS TG3442A 32x8 3.1",                  cantidad: "1" },
//   { id: "eq-4",  serie: "DM2203718001862",    codigo: "4050441", descripcion: "MODEM SAGEMCOM F3890V3 32X8SB DOCSIS 3.1",      cantidad: "1" },
//   { id: "eq-5",  serie: "DM2110118001445",    codigo: "4050441", descripcion: "MODEM SAGEMCOM F3890V3 32X8SB DOCSIS 3.1",      cantidad: "1" },
//   { id: "eq-6",  serie: "MV2234VR8847",       codigo: "4007984", descripcion: "DECODIFICADOR MOTOROLA HD DCX-525",             cantidad: "1" },
//   { id: "eq-7",  serie: "M91843ERZ794",       codigo: "4007984", descripcion: "DECODIFICADOR MOTOROLA HD DCX-525",             cantidad: "1" },
//   { id: "eq-8",  serie: "4857544386D1EBB4",   codigo: "4076358", descripcion: "ROUTER ONT HG8145X613 50088770 HUAWEI",        cantidad: "1" },
//   { id: "eq-9",  serie: "4857544386CF35B4",   codigo: "4076358", descripcion: "ROUTER ONT HG8145X613 50088770 HUAWEI",        cantidad: "1" },
//   { id: "eq-10", serie: "4857544386DAB8B4",   codigo: "4076358", descripcion: "ROUTER ONT HG8145X613 50088770 HUAWEI",        cantidad: "1" },
// ];

// // Colores por contratista
// const CONTRATISTA_COLORS: Record<string, string> = {
//   "LPS": "#1976d2", "LINKPRO": "#7b1fa2", "TECH-LA": "#0288d1",
//   "REDTEL": "#d32f2f", "FR PARTNER": "#f57c00", "FEROCTEL": "#388e3c",
//   "LUMI": "#fbc02d", "SLINC": "#455a64", "ICHIBAN": "#c2185b",
//   "SVC INGENIEROS": "#00796b", "SVC INGENIERÍA": "#00796b", "SVC": "#00796b",
//   "LEVEL 7": "#5d4037", "SINTEC": "#1565c0", "LINKPRO ": "#7b1fa2",
//   "FR SOLUCIONES": "#e64a19",
// };

// // ─── Generador PDF client-side ────────────────────────────────────────────────
// const generarPDFCargo = (
//   tecnico: Personal,
//   fecha: string,
//   materiales: ItemMaterial[],
//   herramientas: ItemHerramienta[],
//   equipos: ItemEquipo[],
//   codigoDespacho: string
// ) => {
//   // Usamos jsPDF via CDN dinámicamente
//   const script = document.createElement("script");
//   script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
//   script.onload = () => {
//     const { jsPDF } = (window as any).jspdf;
//     const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

//     const pageW = 210;
//     const marginL = 15;
//     const marginR = 15;
//     const contentW = pageW - marginL - marginR;
//     let y = 15;

//     const addLine = (extra = 0) => { doc.setDrawColor(220, 220, 220); doc.line(marginL, y + extra, pageW - marginR, y + extra); };

//     // ── Header ──────────────────────────────────────────────────────────
//     doc.setFillColor(25, 118, 210);
//     doc.rect(0, 0, pageW, 28, "F");

//     doc.setFontSize(16);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(255, 255, 255);
//     doc.text("LPS GROUP S.A.C.", marginL, 11);

//     doc.setFontSize(10);
//     doc.setFont("helvetica", "normal");
//     doc.text("CARGO DE DESPACHO DE MATERIALES Y EQUIPOS", marginL, 18);
//     doc.text("Sistema de Gestión Logística — CLARO PERÚ", marginL, 24);

//     doc.setFontSize(9);
//     doc.setTextColor(200, 230, 255);
//     doc.text(`Código: ${codigoDespacho}`, pageW - marginR - 50, 11);
//     doc.text(`Fecha: ${fecha}`, pageW - marginR - 50, 17);

//     y = 36;

//     // ── Datos del Técnico ────────────────────────────────────────────────
//     doc.setFillColor(240, 247, 255);
//     doc.roundedRect(marginL, y, contentW, 24, 2, 2, "F");
//     doc.setDrawColor(25, 118, 210);
//     doc.roundedRect(marginL, y, contentW, 24, 2, 2, "S");

//     doc.setFontSize(9);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(25, 118, 210);
//     doc.text("DATOS DEL TÉCNICO RECEPTOR", marginL + 4, y + 6);

//     doc.setTextColor(50, 50, 50);
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(9);
//     doc.text(`Nombres:`, marginL + 4, y + 13);
//     doc.setFont("helvetica", "bold");
//     doc.text(tecnico.nombres, marginL + 28, y + 13);

//     doc.setFont("helvetica", "normal");
//     doc.text(`DNI:`, marginL + 4, y + 19);
//     doc.setFont("helvetica", "bold");
//     doc.text(tecnico.dni, marginL + 14, y + 19);

//     doc.setFont("helvetica", "normal");
//     doc.text(`Contratista:`, marginL + 40, y + 19);
//     doc.setFont("helvetica", "bold");
//     doc.text(tecnico.contratista, marginL + 64, y + 19);

//     doc.setFont("helvetica", "normal");
//     doc.text(`Rol:`, marginL + 110, y + 19);
//     doc.setFont("helvetica", "bold");
//     doc.text(tecnico.estado, marginL + 120, y + 19);

//     y += 30;

//     // ── Función tabla ────────────────────────────────────────────────────
//     const drawTable = (
//       title: string,
//       color: [number, number, number],
//       headers: string[],
//       widths: number[],
//       rows: string[][]
//     ) => {
//       if (rows.length === 0) return;

//       if (y > 240) { doc.addPage(); y = 15; }

//       // Título sección
//       doc.setFillColor(...color);
//       doc.roundedRect(marginL, y, contentW, 7, 1, 1, "F");
//       doc.setTextColor(255, 255, 255);
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(9);
//       doc.text(title, marginL + 3, y + 5);
//       y += 10;

//       // Cabecera tabla
//       doc.setFillColor(245, 245, 245);
//       doc.rect(marginL, y, contentW, 6, "F");
//       doc.setTextColor(80, 80, 80);
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(7.5);
//       let xH = marginL + 2;
//       headers.forEach((h, i) => { doc.text(h, xH, y + 4); xH += widths[i]; });
//       y += 6;
//       addLine(); y += 1;

//       // Filas
//       doc.setFont("helvetica", "normal");
//       doc.setTextColor(40, 40, 40);
//       rows.forEach((row, ri) => {
//         if (y > 270) { doc.addPage(); y = 15; }
//         if (ri % 2 === 0) {
//           doc.setFillColor(252, 252, 252);
//           doc.rect(marginL, y, contentW, 6, "F");
//         }
//         let xR = marginL + 2;
//         row.forEach((cell, ci) => {
//           const maxW = widths[ci] - 2;
//           const txt = doc.splitTextToSize(cell, maxW)[0] ?? cell;
//           doc.text(txt, xR, y + 4);
//           xR += widths[ci];
//         });
//         y += 6;
//         doc.setDrawColor(235, 235, 235);
//         doc.line(marginL, y, pageW - marginR, y);
//       });
//       y += 5;
//     };

//     // Materiales
//     const matRows = materiales
//       .filter(m => parseFloat(m.cantidad) > 0)
//       .map((m, i) => [`${i + 1}`, m.codigo, m.descripcion.substring(0, 38), m.uom, m.cantidad]);
//     drawTable("📦 MATERIALES", [237, 108, 2], ["N°", "CÓDIGO", "DESCRIPCIÓN", "U.M.", "CANT."], [8, 22, 90, 16, 14], matRows);

//     // Herramientas
//     const herrRows = herramientas
//       .filter(h => parseFloat(h.cantidad) > 0)
//       .map((h, i) => [`${i + 1}`, h.codigo, h.descripcion.substring(0, 38), h.uom, h.cantidad]);
//     drawTable("🔧 HERRAMIENTAS", [25, 118, 210], ["N°", "CÓDIGO", "DESCRIPCIÓN", "U.M.", "CANT."], [8, 22, 90, 16, 14], herrRows);

//     // Equipos
//     const eqRows = equipos.map((e, i) => [`${i + 1}`, e.serie, e.codigo, e.descripcion.substring(0, 32), e.cantidad]);
//     drawTable("⚙️ EQUIPOS", [46, 125, 50], ["N°", "N° SERIE", "CÓDIGO", "DESCRIPCIÓN", "CANT."], [8, 40, 22, 68, 12], eqRows);

//     // ── Firmas ───────────────────────────────────────────────────────────
//     if (y > 230) { doc.addPage(); y = 15; }
//     y += 8;
//     doc.setDrawColor(200, 200, 200);
//     doc.line(marginL, y, pageW - marginR, y);
//     y += 10;

//     doc.setFontSize(9);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(50, 50, 50);
//     doc.text("FIRMAS Y CONFORMIDAD", marginL, y);
//     y += 10;

//     // Caja entregado por
//     const boxW = (contentW - 10) / 2;
//     doc.setDrawColor(180, 180, 180);
//     doc.rect(marginL, y, boxW, 28, "S");
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(8);
//     doc.text("ENTREGADO POR:", marginL + 3, y + 6);
//     doc.setFont("helvetica", "bold");
//     doc.text("ALMACÉN / SUPERVISOR LPS", marginL + 3, y + 12);
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(7);
//     doc.text("Nombre: ___________________________", marginL + 3, y + 20);
//     doc.text("Firma:  ___________________________", marginL + 3, y + 26);

//     // Caja recibido por
//     const x2 = marginL + boxW + 10;
//     doc.rect(x2, y, boxW, 28, "S");
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(8);
//     doc.text("RECIBIDO POR:", x2 + 3, y + 6);
//     doc.setFont("helvetica", "bold");
//     doc.text(tecnico.nombres, x2 + 3, y + 12);
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(7);
//     doc.text(`DNI: ${tecnico.dni}  —  ${tecnico.contratista}`, x2 + 3, y + 18);
//     doc.text("Firma:  ___________________________", x2 + 3, y + 26);

//     y += 34;

//     // ── Footer ───────────────────────────────────────────────────────────
//     const totalPages = doc.getNumberOfPages();
//     for (let p = 1; p <= totalPages; p++) {
//       doc.setPage(p);
//       doc.setFontSize(7);
//       doc.setTextColor(150, 150, 150);
//       doc.setFont("helvetica", "normal");
//       doc.text(`LPS GROUP S.A.C. — Documento generado por LPS ERP — ${new Date().toLocaleString("es-PE")}`, marginL, 292);
//       doc.text(`Página ${p} de ${totalPages}`, pageW - marginR - 18, 292);
//     }

//     doc.save(`Cargo_Despacho_${codigoDespacho}_${tecnico.dni}.pdf`);
//   };

//   if (!document.querySelector(`script[src="${script.src}"]`)) {
//     document.head.appendChild(script);
//   } else {
//     script.onload?.(new Event("load"));
//   }
// };

// // ─── Componente Principal ─────────────────────────────────────────────────────
// export default function DespachoCuadrillas() {
//   const topRef = useRef<HTMLDivElement>(null);

//   // Técnico seleccionado
//   const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState<Personal | null>(null);
//   const [busquedaTecnico, setBusquedaTecnico] = useState("");
//   const [fechaDespacho, setFechaDespacho] = useState(
//     new Date().toISOString().split("T")[0]
//   );

//   // Items
//   const [itemsMaterial, setItemsMaterial]       = useState<ItemMaterial[]>(CATALOGO_MATERIALES);
//   const [itemsHerramienta, setItemsHerramienta] = useState<ItemHerramienta[]>(CATALOGO_HERRAMIENTAS);
//   const [itemsEquipo, setItemsEquipo]           = useState<ItemEquipo[]>([]);

//   // Filtros
//   const [filtroTipo, setFiltroTipo]       = useState<FiltroTipo>("TODOS");
//   const [searchMaterial, setSearchMaterial] = useState("");
//   const [searchHerramienta, setSearchHerramienta] = useState("");
//   const [searchSerie, setSearchSerie]     = useState("");
//   const [equiposFiltrados, setEquiposFiltrados] = useState<ItemEquipo[]>([]);

//   // Tab activo (0=mat, 1=herr, 2=equip)
//   const [tabActivo, setTabActivo] = useState(0);

//   // Estado éxito
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [codigoDespacho, setCodigoDespacho] = useState("");

//   useEffect(() => {
//     if (showSuccess) {
//       topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   }, [showSuccess]);

//   // ── Filtros materiales ──────────────────────────────────────────────────────
//   const getMaterialesFiltrados = () => {
//     let list = itemsMaterial;
//     if (filtroTipo !== "TODOS") {
//       list = filtroTipo === "OTROS" ? list.filter(i => i.tipo === "") : list.filter(i => i.tipo.includes(filtroTipo));
//     }
//     if (searchMaterial.trim()) {
//       list = list.filter(i =>
//         i.codigo.toLowerCase().includes(searchMaterial.toLowerCase()) ||
//         i.descripcion.toLowerCase().includes(searchMaterial.toLowerCase())
//       );
//     }
//     return list;
//   };

//   const getHerramientasFiltradas = () => {
//     if (!searchHerramienta.trim()) return itemsHerramienta;
//     return itemsHerramienta.filter(i =>
//       i.codigo.toLowerCase().includes(searchHerramienta.toLowerCase()) ||
//       i.descripcion.toLowerCase().includes(searchHerramienta.toLowerCase())
//     );
//   };

//   // ── Handlers ───────────────────────────────────────────────────────────────
//   const actualizarMaterial = (id: string, cantidad: string) =>
//     setItemsMaterial(prev => prev.map(i => i.id === id ? { ...i, cantidad } : i));

//   const actualizarHerramienta = (id: string, cantidad: string) =>
//     setItemsHerramienta(prev => prev.map(i => i.id === id ? { ...i, cantidad } : i));

//   const buscarEquipo = (val: string) => {
//     setSearchSerie(val);
//     if (!val.trim()) { setEquiposFiltrados([]); return; }
//     setEquiposFiltrados(
//       CATALOGO_EQUIPOS.filter(e => e.serie.toLowerCase().includes(val.toLowerCase()))
//     );
//   };

//   const agregarEquipo = (equipo: ItemEquipo) => {
//     if (itemsEquipo.some(e => e.serie === equipo.serie)) {
//       alert("Este equipo ya fue agregado"); return;
//     }
//     setItemsEquipo(prev => [...prev, { ...equipo, id: `eq-desp-${Date.now()}` }]);
//     setSearchSerie("");
//     setEquiposFiltrados([]);
//   };

//   const eliminarEquipo = (id: string) =>
//     setItemsEquipo(prev => prev.filter(e => e.id !== id));

//   const getTotalMat = () => itemsMaterial.filter(i => parseFloat(i.cantidad) > 0).length;
//   const getTotalHerr = () => itemsHerramienta.filter(i => parseFloat(i.cantidad) > 0).length;

//   const handleGuardar = () => {
//     if (!tecnicoSeleccionado) { alert("Selecciona un técnico"); return; }
//     const codigo = `DESP-${Date.now()}`;
//     setCodigoDespacho(codigo);
//     setShowSuccess(true);
//   };

//   const handleNuevoDespacho = () => {
//     setShowSuccess(false);
//     setTecnicoSeleccionado(null);
//     setBusquedaTecnico("");
//     setItemsMaterial(CATALOGO_MATERIALES);
//     setItemsHerramienta(CATALOGO_HERRAMIENTAS);
//     setItemsEquipo([]);
//     setSearchSerie("");
//     setEquiposFiltrados([]);
//     setTabActivo(0);
//   };

//   const handleDescargarPDF = () => {
//     if (!tecnicoSeleccionado) return;
//     generarPDFCargo(
//       tecnicoSeleccionado,
//       fechaDespacho,
//       itemsMaterial,
//       itemsHerramienta,
//       itemsEquipo,
//       codigoDespacho
//     );
//   };

//   // ── Técnicos filtrados para Autocomplete ───────────────────────────────────
//   const opcionesTecnico = MAESTRO_PERSONAL.filter(p =>
//     p.nombres.toLowerCase().includes(busquedaTecnico.toLowerCase()) ||
//     p.dni.includes(busquedaTecnico) ||
//     p.contratista.toLowerCase().includes(busquedaTecnico.toLowerCase())
//   );

//   const matFiltrados  = getMaterialesFiltrados();
//   const herrFiltradas = getHerramientasFiltradas();

//   // ── Render ─────────────────────────────────────────────────────────────────
//   return (
//     <Box ref={topRef} sx={{ maxWidth: 1400, mx: "auto", p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
//       <TitleCard
//         icon={<LocalShippingOutlined sx={{ fontSize: 32 }} />}
//         title="Despacho a Cuadrillas"
//         description="Gestión de despacho de materiales, herramientas y equipos a técnicos de campo"
//       />

//       {/* ══ PANTALLA ÉXITO ══════════════════════════════════════════════════ */}
//       <Fade in={showSuccess} timeout={700} unmountOnExit>
//         <Box>
//           <Card elevation={0} sx={{
//             borderRadius: 4,
//             background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)",
//             border: "2px solid #bbf7d0",
//             p: { xs: 4, md: 6 },
//             textAlign: "center",
//             position: "relative",
//             overflow: "hidden",
//           }}>
//             <Box sx={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", bgcolor: "rgba(34,197,94,0.08)" }} />
//             <Box sx={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", bgcolor: "rgba(34,197,94,0.06)" }} />

//             <Box sx={{
//               width: 90, height: 90, borderRadius: "50%", bgcolor: "#22c55e",
//               mx: "auto", mb: 3, display: "flex", alignItems: "center", justifyContent: "center",
//               boxShadow: "0 0 0 16px rgba(34,197,94,0.12), 0 0 0 32px rgba(34,197,94,0.06)",
//               animation: "pulseRing 2s ease-in-out infinite",
//               "@keyframes pulseRing": {
//                 "0%, 100%": { boxShadow: "0 0 0 16px rgba(34,197,94,0.12), 0 0 0 32px rgba(34,197,94,0.06)" },
//                 "50%": { boxShadow: "0 0 0 20px rgba(34,197,94,0.08), 0 0 0 40px rgba(34,197,94,0.03)" },
//               },
//             }}>
//               <CheckCircleOutline sx={{ fontSize: 48, color: "white" }} />
//             </Box>

//             <Typography variant="h4" fontWeight={800} sx={{ color: "#15803d", mb: 1 }}>
//               ¡Despacho Registrado!
//             </Typography>
//             <Typography variant="h6" color="text.secondary" sx={{ mb: 1, fontWeight: 400 }}>
//               {tecnicoSeleccionado?.nombres}
//             </Typography>
//             <Typography variant="body2" color="text.disabled" sx={{ mb: 4 }}>
//               {tecnicoSeleccionado?.contratista} — DNI: {tecnicoSeleccionado?.dni}
//             </Typography>

//             {/* Cards resumen */}
//             <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 4 }}>
//               <Paper elevation={0} sx={{ px: 3, py: 2, borderRadius: 3, border: "1px solid #bbf7d0", bgcolor: "white", minWidth: 120 }}>
//                 <Typography variant="h4" fontWeight={800} sx={{ color: "#ed6c02" }}>{getTotalMat()}</Typography>
//                 <Typography variant="caption" color="text.secondary" fontWeight={600}>Materiales</Typography>
//               </Paper>
//               <Paper elevation={0} sx={{ px: 3, py: 2, borderRadius: 3, border: "1px solid #bbf7d0", bgcolor: "white", minWidth: 120 }}>
//                 <Typography variant="h4" fontWeight={800} sx={{ color: "#1976d2" }}>{getTotalHerr()}</Typography>
//                 <Typography variant="caption" color="text.secondary" fontWeight={600}>Herramientas</Typography>
//               </Paper>
//               <Paper elevation={0} sx={{ px: 3, py: 2, borderRadius: 3, border: "1px solid #bbf7d0", bgcolor: "white", minWidth: 120 }}>
//                 <Typography variant="h4" fontWeight={800} sx={{ color: "#2e7d32" }}>{itemsEquipo.length}</Typography>
//                 <Typography variant="caption" color="text.secondary" fontWeight={600}>Equipos</Typography>
//               </Paper>
//               <Paper elevation={0} sx={{ px: 3, py: 2, borderRadius: 3, border: "1px solid #bbf7d0", bgcolor: "white", minWidth: 140 }}>
//                 <Typography variant="body1" fontWeight={800} sx={{ color: "#0369a1", fontSize: "0.85rem" }}>{codigoDespacho}</Typography>
//                 <Typography variant="caption" color="text.secondary" fontWeight={600}>Código</Typography>
//               </Paper>
//             </Box>

//             <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
//               <ButtonBase
//                 label="Descargar PDF / Cargo"
//                 startIcon={<PictureAsPdfOutlined />}
//                 onClick={handleDescargarPDF}
//                 sx={{ px: 4, py: 1.5, bgcolor: "#dc2626", "&:hover": { bgcolor: "#b91c1c" }, boxShadow: "0 4px 12px rgba(220,38,38,0.3)", borderRadius: 2.5 }}
//               />
//               <ButtonBase
//                 label="Nuevo Despacho"
//                 startIcon={<LocalShippingOutlined />}
//                 onClick={handleNuevoDespacho}
//                 sx={{ px: 4, py: 1.5, fontWeight: 700, boxShadow: "0 4px 12px rgba(34,197,94,0.3)", borderRadius: 2.5 }}
//               />
//             </Stack>
//           </Card>
//         </Box>
//       </Fade>

//       {/* ══ FORMULARIO ══════════════════════════════════════════════════════ */}
//       <Fade in={!showSuccess} timeout={500} unmountOnExit>
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

//           {/* ── Selector de Técnico Enterprise ─────────────────────────────── */}
//           <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", overflow: "hidden" }}>
//             <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>

//               {/* Panel izquierdo — buscador */}
//               <Box sx={{ flex: "0 0 380px", bgcolor: "#f8fafc", p: 3.5, borderRight: { md: "1px solid #e2e8f0" } }}>
//                 <Stack spacing={2}>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//                     <Box sx={{ width: 4, height: 18, bgcolor: "primary.main", borderRadius: 1 }} />
//                     <Typography variant="subtitle2" fontWeight={700} sx={{ letterSpacing: 0.5, textTransform: "uppercase" }}>
//                       Técnico Receptor
//                     </Typography>
//                   </Box>
//                   <Autocomplete
//                     options={opcionesTecnico}
//                     getOptionLabel={p => `${p.nombres} — ${p.dni}`}
//                     value={tecnicoSeleccionado}
//                     onChange={(_, val) => setTecnicoSeleccionado(val)}
//                     inputValue={busquedaTecnico}
//                     onInputChange={(_, val) => setBusquedaTecnico(val)}
//                     renderInput={params => (
//                       <TextField {...params} size="small" placeholder="Buscar por nombre, DNI o contratista..."
//                         InputProps={{ ...params.InputProps, startAdornment: <><SearchOutlined sx={{ fontSize: 18, color: "text.disabled", mr: 0.5 }} />{params.InputProps.startAdornment}</> }}
//                       />
//                     )}
//                     renderOption={(props, option) => (
//                       <Box component="li" {...props} sx={{ py: 1.5 }} key={`${option}`}>
//                         <Stack direction="row" spacing={1.5} alignItems="center">
//                           <Avatar sx={{ width: 32, height: 32, fontSize: 12, fontWeight: 700, bgcolor: CONTRATISTA_COLORS[option.contratista] ?? "#607d8b" }}>
//                             {option.nombres.charAt(0)}
//                           </Avatar>
//                           <Box>
//                             <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.2 }}>{option.nombres}</Typography>
//                             <Stack direction="row" spacing={0.5} alignItems="center" mt={0.3}>
//                               <Chip label={option.contratista} size="small"
//                                 sx={{ height: 16, fontSize: "0.65rem", fontWeight: 700, bgcolor: CONTRATISTA_COLORS[option.contratista] ?? "#607d8b", color: "white" }} />
//                               <Typography variant="caption" color="text.disabled">{option.dni}</Typography>
//                               <Chip label={option.estado} size="small"
//                                 color={option.estado === "SUPERVISOR" ? "warning" : "default"}
//                                 sx={{ height: 16, fontSize: "0.65rem", fontWeight: 700 }} />
//                             </Stack>
//                           </Box>
//                         </Stack>
//                       </Box>
//                     )}
//                     noOptionsText="No se encontraron técnicos"
//                     fullWidth
//                   />
//                   <Box sx={{ flex: "1 1 180px" }}>
//                     <Typography variant="body2" color="text.secondary" fontWeight={600} mb={1}>Fecha de Despacho</Typography>
//                     <TextField type="date" fullWidth size="small" value={fechaDespacho}
//                       onChange={e => setFechaDespacho(e.target.value)} InputLabelProps={{ shrink: true }}
//                     />
//                   </Box>
//                 </Stack>
//               </Box>

//               {/* Panel derecho — info del técnico seleccionado */}
//               <Box sx={{ flex: 1, p: 3.5, display: "flex", alignItems: "center" }}>
//                 {tecnicoSeleccionado ? (
//                   <Fade in timeout={400}>
//                     <Box sx={{ width: "100%" }}>
//                       <Stack direction="row" spacing={2.5} alignItems="center" mb={3}>
//                         <Avatar sx={{ width: 64, height: 64, fontSize: 24, fontWeight: 800, bgcolor: CONTRATISTA_COLORS[tecnicoSeleccionado.contratista] ?? "#607d8b", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
//                           {tecnicoSeleccionado.nombres.charAt(0)}
//                         </Avatar>
//                         <Box>
//                           <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1.2 }}>
//                             {tecnicoSeleccionado.nombres}
//                           </Typography>
//                           <Stack direction="row" spacing={1} mt={0.5}>
//                             <Chip label={tecnicoSeleccionado.estado} size="small"
//                               color={tecnicoSeleccionado.estado === "SUPERVISOR" ? "warning" : "primary"}
//                               sx={{ fontWeight: 700 }} />
//                             <Chip label={tecnicoSeleccionado.contratista} size="small"
//                               sx={{ bgcolor: CONTRATISTA_COLORS[tecnicoSeleccionado.contratista] ?? "#607d8b", color: "white", fontWeight: 700 }} />
//                           </Stack>
//                         </Box>
//                       </Stack>

//                       <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                           <BadgeOutlined sx={{ fontSize: 18, color: "text.secondary" }} />
//                           <Typography variant="body2" color="text.secondary">DNI:</Typography>
//                           <Typography variant="body2" fontWeight={700}>{tecnicoSeleccionado.dni}</Typography>
//                         </Box>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                           <BusinessOutlined sx={{ fontSize: 18, color: "text.secondary" }} />
//                           <Typography variant="body2" color="text.secondary">Contratista:</Typography>
//                           <Typography variant="body2" fontWeight={700}>{tecnicoSeleccionado.contratista}</Typography>
//                         </Box>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                           <CalendarTodayOutlined sx={{ fontSize: 18, color: "text.secondary" }} />
//                           <Typography variant="body2" color="text.secondary">Fecha:</Typography>
//                           <Typography variant="body2" fontWeight={700}>
//                             {new Date(fechaDespacho + "T12:00:00").toLocaleDateString("es-PE", { day: "2-digit", month: "long", year: "numeric" })}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     </Box>
//                   </Fade>
//                 ) : (
//                   <Box sx={{ width: "100%", textAlign: "center", py: 4 }}>
//                     <PersonOutlined sx={{ fontSize: 56, color: "text.disabled", mb: 1.5 }} />
//                     <Typography variant="body1" color="text.secondary" fontWeight={600}>
//                       Selecciona un técnico para continuar
//                     </Typography>
//                     <Typography variant="caption" color="text.disabled">
//                       Busca por nombre completo, DNI o empresa contratista
//                     </Typography>
//                   </Box>
//                 )}
//               </Box>
//             </Box>
//           </Card>

//           {/* ── Tabs: Materiales / Herramientas / Equipos ─────────────────── */}
//           <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", p: 3 }}>

//             {/* Tab buttons custom */}
//             <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
//               {[
//                 { label: `📦 Materiales`, count: getTotalMat(), color: "#ed6c02", bg: "#fff3e0", idx: 0 },
//                 { label: `🔧 Herramientas`, count: getTotalHerr(), color: "#1976d2", bg: "#e3f2fd", idx: 1 },
//                 { label: `⚙️ Equipos`, count: itemsEquipo.length, color: "#2e7d32", bg: "#e8f5e9", idx: 2 },
//               ].map(tab => (
//                 <Box key={tab.idx} onClick={() => setTabActivo(tab.idx)}
//                   sx={{ px: 2.5, py: 1.2, borderRadius: 2, cursor: "pointer", display: "flex", alignItems: "center", gap: 1, transition: "all 0.2s",
//                     bgcolor: tabActivo === tab.idx ? tab.bg : "#f8fafc",
//                     border: `2px solid ${tabActivo === tab.idx ? tab.color : "#e2e8f0"}`,
//                     "&:hover": { bgcolor: tab.bg },
//                   }}>
//                   <Typography variant="body2" fontWeight={700} sx={{ color: tabActivo === tab.idx ? tab.color : "text.secondary" }}>
//                     {tab.label}
//                   </Typography>
//                   <Chip label={tab.count} size="small"
//                     sx={{ height: 20, fontWeight: 800, fontSize: "0.7rem", bgcolor: tabActivo === tab.idx ? tab.color : "#e2e8f0", color: tabActivo === tab.idx ? "white" : "text.secondary" }} />
//                 </Box>
//               ))}
//             </Box>

//             {/* ── Tab Materiales ─────────────────────────────────────────────── */}
//             {tabActivo === 0 && (
//               <Box>
//                 <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap", alignItems: "center" }}>
//                   <ToggleButtonGroup value={filtroTipo} exclusive size="small"
//                     onChange={(_, v) => { if (v) setFiltroTipo(v); }}>
//                     {(["TODOS", "HFC", "FTTH", "HFC-FTTH", "OTROS"] as FiltroTipo[]).map(f => (
//                       <ToggleButton key={f} value={f} sx={{ textTransform: "none", fontWeight: 600, fontSize: "0.75rem" }}>{f}</ToggleButton>
//                     ))}
//                   </ToggleButtonGroup>
//                   <TextField size="small" placeholder="Buscar material..."
//                     value={searchMaterial} onChange={e => setSearchMaterial(e.target.value)}
//                     sx={{ flex: 1, minWidth: 200 }}
//                     InputProps={{ startAdornment: <InputAdornment position="start"><SearchOutlined sx={{ fontSize: 18 }} /></InputAdornment> }}
//                   />
//                 </Box>

//                 {/* Header tabla */}
//                 <Box sx={{ display: "flex", gap: 1, p: 1.5, bgcolor: "#f1f5f9", borderRadius: 1, mb: 1 }}>
//                   <Box sx={{ flex: "0 0 110px" }}><Typography variant="caption" fontWeight={700}>CÓDIGO</Typography></Box>
//                   <Box sx={{ flex: "2 1 300px" }}><Typography variant="caption" fontWeight={700}>DESCRIPCIÓN</Typography></Box>
//                   <Box sx={{ flex: "0 0 70px" }}><Typography variant="caption" fontWeight={700}>U.M.</Typography></Box>
//                   <Box sx={{ flex: "0 0 80px" }}><Typography variant="caption" fontWeight={700}>TIPO</Typography></Box>
//                   <Box sx={{ flex: "0 0 110px" }}><Typography variant="caption" fontWeight={700}>CANTIDAD</Typography></Box>
//                 </Box>

//                 <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8, maxHeight: 480, overflowY: "auto", pr: 0.5 }}>
//                   {matFiltrados.map(item => (
//                     <Box key={item.id} sx={{
//                       display: "flex", gap: 1, alignItems: "center", p: 1.5,
//                       bgcolor: parseFloat(item.cantidad) > 0 ? "#fff3e0" : "#fafafa",
//                       borderRadius: 1.5, border: "1px solid",
//                       borderColor: parseFloat(item.cantidad) > 0 ? "#ed6c02" : "#f0f0f0",
//                       transition: "all 0.15s",
//                     }}>
//                       <Box sx={{ flex: "0 0 110px" }}>
//                         <Typography variant="caption" fontWeight={600}>{item.codigo}</Typography>
//                       </Box>
//                       <Box sx={{ flex: "2 1 300px" }}>
//                         <Typography variant="caption">{item.descripcion}</Typography>
//                       </Box>
//                       <Box sx={{ flex: "0 0 70px" }}>
//                         <Chip label={item.uom} size="small" variant="outlined" sx={{ height: 20, fontSize: "0.65rem" }} />
//                       </Box>
//                       <Box sx={{ flex: "0 0 80px" }}>
//                         {item.tipo && (
//                           <Chip label={item.tipo} size="small"
//                             color={item.tipo === "HFC" ? "primary" : item.tipo === "FTTH" ? "success" : "info"}
//                             sx={{ height: 20, fontSize: "0.65rem", fontWeight: 700 }} />
//                         )}
//                       </Box>
//                       <Box sx={{ flex: "0 0 110px" }}>
//                         <TextField placeholder="0" fullWidth size="small" type="number"
//                           value={item.cantidad} onChange={e => actualizarMaterial(item.id, e.target.value)}
//                           inputProps={{ min: 0, style: { textAlign: "center" } }}
//                           sx={{ "& input": { py: 0.5 } }}
//                         />
//                       </Box>
//                     </Box>
//                   ))}
//                 </Box>

//                 {/* Resumen */}
//                 <Box sx={{ mt: 2, p: 2, bgcolor: "#fff3e0", borderRadius: 2, border: "1px solid #ed6c0240", display: "flex", gap: 4 }}>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">Items con cantidad</Typography>
//                     <Typography variant="h6" fontWeight={700} sx={{ color: "#ed6c02" }}>{getTotalMat()}</Typography>
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">Total unidades</Typography>
//                     <Typography variant="h6" fontWeight={700} sx={{ color: "#ed6c02" }}>
//                       {itemsMaterial.reduce((s, i) => s + (parseFloat(i.cantidad) || 0), 0)}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Box>
//             )}

//             {/* ── Tab Herramientas ──────────────────────────────────────────── */}
//             {tabActivo === 1 && (
//               <Box>
//                 <TextField size="small" fullWidth placeholder="Buscar herramienta..."
//                   value={searchHerramienta} onChange={e => setSearchHerramienta(e.target.value)}
//                   sx={{ mb: 2 }}
//                   InputProps={{ startAdornment: <InputAdornment position="start"><SearchOutlined sx={{ fontSize: 18 }} /></InputAdornment> }}
//                 />

//                 <Box sx={{ display: "flex", gap: 1, p: 1.5, bgcolor: "#f1f5f9", borderRadius: 1, mb: 1 }}>
//                   <Box sx={{ flex: "0 0 140px" }}><Typography variant="caption" fontWeight={700}>CÓDIGO</Typography></Box>
//                   <Box sx={{ flex: "2 1 300px" }}><Typography variant="caption" fontWeight={700}>DESCRIPCIÓN</Typography></Box>
//                   <Box sx={{ flex: "0 0 70px" }}><Typography variant="caption" fontWeight={700}>U.M.</Typography></Box>
//                   <Box sx={{ flex: "0 0 110px" }}><Typography variant="caption" fontWeight={700}>CANTIDAD</Typography></Box>
//                 </Box>

//                 <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8, maxHeight: 480, overflowY: "auto", pr: 0.5 }}>
//                   {herrFiltradas.map(item => (
//                     <Box key={item.id} sx={{
//                       display: "flex", gap: 1, alignItems: "center", p: 1.5,
//                       bgcolor: parseFloat(item.cantidad) > 0 ? "#e3f2fd" : "#fafafa",
//                       borderRadius: 1.5, border: "1px solid",
//                       borderColor: parseFloat(item.cantidad) > 0 ? "#1976d2" : "#f0f0f0",
//                       transition: "all 0.15s",
//                     }}>
//                       <Box sx={{ flex: "0 0 140px" }}>
//                         <Typography variant="caption" fontWeight={600}>{item.codigo}</Typography>
//                       </Box>
//                       <Box sx={{ flex: "2 1 300px" }}>
//                         <Typography variant="caption">{item.descripcion}</Typography>
//                       </Box>
//                       <Box sx={{ flex: "0 0 70px" }}>
//                         <Chip label={item.uom} size="small" variant="outlined" sx={{ height: 20, fontSize: "0.65rem" }} />
//                       </Box>
//                       <Box sx={{ flex: "0 0 110px" }}>
//                         <TextField placeholder="0" fullWidth size="small" type="number"
//                           value={item.cantidad} onChange={e => actualizarHerramienta(item.id, e.target.value)}
//                           inputProps={{ min: 0, style: { textAlign: "center" } }}
//                           sx={{ "& input": { py: 0.5 } }}
//                         />
//                       </Box>
//                     </Box>
//                   ))}
//                 </Box>

//                 <Box sx={{ mt: 2, p: 2, bgcolor: "#e3f2fd", borderRadius: 2, border: "1px solid #1976d240", display: "flex", gap: 4 }}>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">Items con cantidad</Typography>
//                     <Typography variant="h6" fontWeight={700} sx={{ color: "#1976d2" }}>{getTotalHerr()}</Typography>
//                   </Box>
//                 </Box>
//               </Box>
//             )}

//             {/* ── Tab Equipos ───────────────────────────────────────────────── */}
//             {tabActivo === 2 && (
//               <Box>
//                 <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
//                   <Typography variant="body2" fontWeight={600}>
//                     Busca equipos por número de serie. Cada equipo se agrega individualmente al despacho.
//                   </Typography>
//                 </Alert>

//                 <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
//                   <TextField fullWidth size="small" placeholder="Ingresar número de serie del equipo..."
//                     value={searchSerie} onChange={e => buscarEquipo(e.target.value)}
//                     InputProps={{ startAdornment: <InputAdornment position="start"><SearchOutlined sx={{ fontSize: 18 }} /></InputAdornment> }}
//                   />
//                 </Box>

//                 {/* Resultados búsqueda */}
//                 {equiposFiltrados.length > 0 && (
//                   <TableContainer component={Paper} sx={{ borderRadius: 2, mb: 3, border: "1px solid #e2e8f0" }}>
//                     <Table size="small">
//                       <TableHead>
//                         <TableRow sx={{ bgcolor: "#f8fafc" }}>
//                           {["SERIE", "CÓDIGO", "DESCRIPCIÓN", ""].map(h => (
//                             <TableCell key={h}><Typography variant="caption" fontWeight={700}>{h}</Typography></TableCell>
//                           ))}
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {equiposFiltrados.map(eq => (
//                           <TableRow key={eq.id} hover>
//                             <TableCell><Typography variant="caption" fontWeight={600}>{eq.serie}</Typography></TableCell>
//                             <TableCell><Typography variant="caption">{eq.codigo}</Typography></TableCell>
//                             <TableCell><Typography variant="caption">{eq.descripcion}</Typography></TableCell>
//                             <TableCell>
//                               <ButtonBase size="small" label="Agregar"
//                                 onClick={() => agregarEquipo(eq)}
//                                 sx={{ fontSize: "0.7rem", px: 1.5, py: 0.5 }}
//                               />
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 )}

//                 {/* Equipos agregados */}
//                 {itemsEquipo.length > 0 ? (
//                   <Box>
//                     <Typography variant="body2" fontWeight={700} mb={1.5} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                       <DevicesOutlined sx={{ fontSize: 18, color: "#2e7d32" }} />
//                       Equipos Agregados ({itemsEquipo.length})
//                     </Typography>
//                     <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
//                       {itemsEquipo.map((item, idx) => (
//                         <Grow key={item.id} in timeout={200 + idx * 60}>
//                           <Box sx={{ display: "flex", gap: 1, alignItems: "center", p: 1.5, bgcolor: "#f0fdf4", borderRadius: 2, border: "1px solid #86efac" }}>
//                             <Chip label={idx + 1} size="small" color="success" sx={{ fontWeight: 800, minWidth: 28 }} />
//                             <Box sx={{ flex: "1 1 160px" }}>
//                               <Typography variant="caption" fontWeight={700}>{item.serie}</Typography>
//                             </Box>
//                             <Box sx={{ flex: "0 0 100px" }}>
//                               <Typography variant="caption" color="text.secondary">{item.codigo}</Typography>
//                             </Box>
//                             <Box sx={{ flex: "2 1 200px" }}>
//                               <Typography variant="caption">{item.descripcion}</Typography>
//                             </Box>
//                             <IconButton size="small" color="error" onClick={() => eliminarEquipo(item.id)}>
//                               <DeleteOutline fontSize="small" />
//                             </IconButton>
//                           </Box>
//                         </Grow>
//                       ))}
//                     </Box>
//                   </Box>
//                 ) : (
//                   <Box sx={{ textAlign: "center", py: 5, bgcolor: "#f8fafc", borderRadius: 2, border: "2px dashed #e2e8f0" }}>
//                     <DevicesOutlined sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
//                     <Typography variant="body2" color="text.secondary">
//                       Busca equipos por serie para agregarlos al despacho
//                     </Typography>
//                   </Box>
//                 )}
//               </Box>
//             )}
//           </Card>

//           {/* ── Botones Acción ─────────────────────────────────────────────── */}
//           <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", flexWrap: "wrap" }}>
//             <ButtonBase
//               label="Guardar Borrador"
//               startIcon={<SaveOutlined />}
//               onClick={() => alert("Borrador guardado")}
//               sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1", "&:hover": { bgcolor: "#f1f5f9" }, px: 4 }}
//             />
//             <ButtonBase
//               label="Registrar Despacho"
//               startIcon={<CheckCircleOutline />}
//               onClick={handleGuardar}
//               disabled={!tecnicoSeleccionado}
//               sx={{ px: 4, boxShadow: "0 4px 12px rgba(37,99,235,0.25)" }}
//             />
//           </Box>
//         </Box>
//       </Fade>
//     </Box>
//   );
// }


"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Box, Card, Typography, TextField, Divider, IconButton, Alert, Fade,
  Grow, Chip, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, ToggleButtonGroup, ToggleButton, Stack, InputAdornment,
  Avatar, Autocomplete, CircularProgress, LinearProgress, Collapse, Badge,
  Tooltip, Tab, Tabs,
} from "@mui/material";
import {
  LocalShippingOutlined, DeleteOutline, SaveOutlined, CheckCircleOutline,
  SearchOutlined, CalendarTodayOutlined, PersonOutlined, PictureAsPdfOutlined,
  BadgeOutlined, BusinessOutlined, DevicesOutlined, InventoryOutlined,
  BuildOutlined, WarningAmberOutlined, RefreshOutlined, AddCircleOutline,
  QrCodeScannerOutlined, ErrorOutlined, CheckCircle, StorageOutlined,
  HighlightOffOutlined, InfoOutlined,
} from "@mui/icons-material";
import { TitleCard } from "@/src/components/base/TitleCard";
import ButtonBase from "@/src/components/base/ButtonBase";
import { API_URL } from "@/src/lib/config";
import { toast } from "react-toastify";
import dayjs from "dayjs";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface Worker {
  id:number;
  workerGroupId:number;
  name: string;
  dni: string;
  role: string;
  contractorId: number | null;
  hubId: number | null;
  status: string;
  type: string;
}

interface HubInventoryItem {
  id: number;
  itemId: number;
  itemCode: string;
  itemName: string;
  description: string;
  productType: "MATERIAL" | "TOOL" | "EQUIPMENT" | "EPP";
  supplySource: string;
  quantityAvailable: number;
  minimumStock: number;
  maximumStock: number | null;
  uom?: string;
}

// Item that the user adds to the dispatch cart
interface DispatchCartItem {
  cartId: string; // local uuid for React keys
  inventoryId: number;
  itemId: number;
  itemCode: string;
  itemName: string;
  productType: "MATERIAL" | "TOOL" | "EQUIPMENT" | "EPP";
  supplySource: string;
  quantityAvailable: number;
  quantity: number;
  notes: string;
  // Equipment-only fields (pistolado)
  serialNumber?: string;
  macAddress?: string;
  mtaMacAddress?: string;
  unitAddress?: string;
}

type ProductTab = "MATERIAL" | "TOOL" | "EQUIPMENT" | "EPP";

// ─── CONFIG ───────────────────────────────────────────────────────────────────

const TENANT_ID = 1;
const HUB_ID = 1;
const PROJECT_ID = 1;
const CREATED_BY = 1;

const PRODUCT_CONFIG: Record<
  ProductTab,
  { label: string; icon: string; color: string; bg: string; border: string }
> = {
  MATERIAL:  { label: "Materiales",    icon: "📦", color: "#ea580c", bg: "#fff7ed", border: "#fed7aa" },
  TOOL:      { label: "Herramientas",  icon: "🔧", color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
  EQUIPMENT: { label: "Equipos",       icon: "⚙️", color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0" },
  EPP:       { label: "EPP",           icon: "🦺", color: "#7c3aed", bg: "#faf5ff", border: "#ddd6fe" },
};

const ROLE_LABEL: Record<string, string> = {
  TECNICO: "Técnico",
  JEFE_CUADRILLA: "Jefe de Cuadrilla",
  SUPERVISOR: "Supervisor",
};

const ROLE_COLOR: Record<string, "primary" | "warning" | "success" | "default"> = {
  TECNICO: "primary",
  JEFE_CUADRILLA: "warning",
  SUPERVISOR: "success",
};

// Semaphore helpers (same as InventarioHub)
type SemaforoColor = "VERDE" | "AMARILLO" | "ROJO" | "GRIS";
const getSemaforo = (item: HubInventoryItem): SemaforoColor => {
  const qty = item.quantityAvailable;
  if (qty <= 0) return "GRIS";
  if (qty <= item.minimumStock) return "ROJO";
  return "VERDE";
};
const SEM_COLOR: Record<SemaforoColor, string> = {
  VERDE: "#16a34a", AMARILLO: "#d97706", ROJO: "#dc2626", GRIS: "#94a3b8",
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const cartId = () => `cart-${Date.now()}-${Math.random().toString(36).slice(2)}`;

// Dynamically load jsPDF for cargo PDF
const loadJsPDF = (): Promise<any> =>
  new Promise((resolve) => {
    const src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    if ((window as any).jspdf) { resolve((window as any).jspdf); return; }
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve((window as any).jspdf);
    document.head.appendChild(s);
  });

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function DespachoCuadrillas() {
  const topRef = useRef<HTMLDivElement>(null);

  // ── Workers ──────────────────────────────────────────────────────────────
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loadingWorkers, setLoadingWorkers] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [workerInput, setWorkerInput] = useState("");
  console.log(selectedWorker,"testing")

  // ── Inventory ─────────────────────────────────────────────────────────────
  const [inventory, setInventory] = useState<HubInventoryItem[]>([]);
  const [loadingInventory, setLoadingInventory] = useState(false);
  const [inventoryPage, setInventoryPage] = useState(0);
  const [inventoryTotal, setInventoryTotal] = useState(0);
  const [activeTab, setActiveTab] = useState<ProductTab>("MATERIAL");
  const [inventorySearch, setInventorySearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // ── Cart ──────────────────────────────────────────────────────────────────
  const [cart, setCart] = useState<DispatchCartItem[]>([]);

  // ── Form ──────────────────────────────────────────────────────────────────
  const [scheduledDate, setScheduledDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [observations, setObservations] = useState("");
  const [priority, setPriority] = useState<"HIGH" | "MEDIUM" | "LOW">("MEDIUM");

  // ── Submit ────────────────────────────────────────────────────────────────
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dispatchCode, setDispatchCode] = useState("");

  // ── Pistolado (equipment serial scan) ────────────────────────────────────
  const [serialInput, setSerialInput] = useState("");
  const serialRef = useRef<HTMLInputElement>(null);

  // ─── Load Workers ──────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchWorkers = async () => {
      setLoadingWorkers(true);
      try {
        const res = await fetch(`${API_URL}/api/workers`);
        const json = await res.json();
        const data: Worker[] = Array.isArray(json)
          ? json
          : Array.isArray(json.data)
          ? json.data
          : [];
        setWorkers(data.filter((w) => w.status === "ACTIVE"));
      } catch {
        toast.error("Error al cargar personal");
      } finally {
        setLoadingWorkers(false);
      }
    };
    fetchWorkers();
  }, []);

  // ─── Debounce search ───────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(inventorySearch);
      setInventoryPage(0);
    }, 350);
    return () => clearTimeout(t);
  }, [inventorySearch]);

  // ─── Load Inventory ────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchInventory = async () => {
      setLoadingInventory(true);
      try {
        const params = new URLSearchParams({
          tenantId: String(TENANT_ID),
          hubId: String(HUB_ID),
          page: String(inventoryPage),
          size: "20",
          productType: activeTab,
          ...(debouncedSearch.trim() ? { search: debouncedSearch.trim() } : {}),
        });
        const res = await fetch(`${API_URL}/api/hub-inventory?${params}`);
        const json = await res.json();
        const content: HubInventoryItem[] = json.data?.content ?? [];
        setInventory(content);
        setInventoryTotal(
          json.data?.page?.totalElements ??
          json.data?.totalElements ??
          content.length
        );
      } catch {
        toast.error("Error al cargar inventario");
      } finally {
        setLoadingInventory(false);
      }
    };
    fetchInventory();
  }, [activeTab, debouncedSearch, inventoryPage]);

  // ─── Cart helpers ─────────────────────────────────────────────────────────

  const addToCart = (item: HubInventoryItem) => {
    const exists = cart.find((c) => c.inventoryId === item.id);
    if (exists) {
      toast.info(`${item.itemCode} ya está en el despacho`);
      return;
    }
    setCart((prev) => [
      ...prev,
      {
        cartId: cartId(),
        inventoryId: item.id,
        itemId: item.itemId,
        itemCode: item.itemCode,
        itemName: item.description || item.itemName,
        productType: item.productType,
        supplySource: item.supplySource ?? "CLARO",
        quantityAvailable: item.quantityAvailable,
        quantity: 1,
        notes: "",
        ...(item.productType === "EQUIPMENT"
          ? { serialNumber: "", macAddress: "", mtaMacAddress: "", unitAddress: "" }
          : {}),
      },
    ]);
    toast.success(`${item.itemCode} agregado al despacho`);
  };

  const removeFromCart = (cartId: string) =>
    setCart((prev) => prev.filter((c) => c.cartId !== cartId));

  const updateCartItem = (
    cartId: string,
    field: keyof DispatchCartItem,
    value: string | number
  ) =>
    setCart((prev) =>
      prev.map((c) => (c.cartId === cartId ? { ...c, [field]: value } : c))
    );

  // ── Handle pistolado (serial scan for equipment) ─────────────────────────
  const handleSerialScan = () => {
    const serial = serialInput.trim();
    if (!serial) return;

    // Find equipment cart item without serial filled
    const equipmentItem = cart.find(
      (c) => c.productType === "EQUIPMENT" && !c.serialNumber
    );
    if (!equipmentItem) {
      toast.warning("Agrega un equipo al carrito antes de pistolear");
      return;
    }
    updateCartItem(equipmentItem.cartId, "serialNumber", serial);
    setSerialInput("");
    toast.success(`Serie ${serial} asignada a ${equipmentItem.itemCode}`);
  };

  // ─── Submit dispatch ───────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!selectedWorker) { toast.warning("Selecciona un trabajador"); return; }
    if (cart.length === 0) { toast.warning("Agrega al menos un ítem al despacho"); return; }

    // Validate equipment serials
    const equipmentWithoutSerial = cart.filter(
      (c) => c.productType === "EQUIPMENT" && !c.serialNumber
    );
    if (equipmentWithoutSerial.length > 0) {
      toast.warning(
        `${equipmentWithoutSerial.length} equipo(s) sin número de serie. Pistolealos antes de continuar.`
      );
      return;
    }

    setSubmitting(true);
    try {
      const body = {
        workGroupId: selectedWorker.workerGroupId,
        workerId: selectedWorker.id, // The backend uses dni lookup — adjust if you have workerId
        projectId: PROJECT_ID,
        registerDate: new Date().toISOString(),
        scheduledDate: `${scheduledDate}T08:00:00`,
        observations,
        priority,
        createdBy: CREATED_BY,
        // Attach worker info so backend can resolve
        workerDni: selectedWorker.dni,
        workerName: selectedWorker.name,
        items: cart.map((item) => ({
          itemId: item.itemId,
          inventoryId: item.inventoryId,
          quantity: item.quantity,
          notes: item.notes,
          productType: item.productType,
          supplySource: "CLARO",
          supplySourceEntityId: 1,
          ...(item.productType === "EQUIPMENT"
            ? {
                serialNumber: item.serialNumber ?? null,
                macAddress: item.macAddress ?? null,
                mtaMacAddress: item.mtaMacAddress ?? null,
                unitAddress: item.unitAddress ?? null,
              }
            : {}),
        })),
      };

      const res = await fetch(`${API_URL}/api/dispatches`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message ?? `HTTP ${res.status}`);
      }

      const created = await res.json();
      const code =
        created?.data?.dispatchNumber ??
        created?.data?.id ??
        `DESP-${Date.now()}`;
      setDispatchCode(String(code));
      setShowSuccess(true);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      toast.success("Despacho registrado correctamente");
    } catch (err: any) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setShowSuccess(false);
    setSelectedWorker(null);
    setWorkerInput("");
    setCart([]);
    setObservations("");
    setPriority("MEDIUM");
    setActiveTab("MATERIAL");
    setInventorySearch("");
  };

  // ─── PDF Download ──────────────────────────────────────────────────────────
  const handlePDF = async () => {
    if (!selectedWorker) return;
    const { jsPDF } = await loadJsPDF();
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const W = 210, M = 15, CW = W - M * 2;
    let y = 15;

    // Header
    doc.setFillColor(25, 118, 210);
    doc.rect(0, 0, W, 28, "F");
    doc.setFontSize(16); doc.setFont("helvetica", "bold"); doc.setTextColor(255, 255, 255);
    doc.text("LPS GROUP S.A.C.", M, 11);
    doc.setFontSize(10); doc.setFont("helvetica", "normal");
    doc.text("CARGO DE DESPACHO — SISTEMA LPS ERP", M, 18);
    doc.setFontSize(9); doc.setTextColor(200, 230, 255);
    doc.text(`Código: ${dispatchCode}`, W - M - 55, 11);
    doc.text(`Fecha: ${dayjs().format("DD/MM/YYYY HH:mm")}`, W - M - 55, 17);
    y = 36;

    // Worker info
    doc.setFillColor(240, 247, 255);
    doc.roundedRect(M, y, CW, 22, 2, 2, "F");
    doc.setDrawColor(25, 118, 210);
    doc.roundedRect(M, y, CW, 22, 2, 2, "S");
    doc.setFontSize(9); doc.setFont("helvetica", "bold"); doc.setTextColor(25, 118, 210);
    doc.text("TÉCNICO RECEPTOR", M + 4, y + 6);
    doc.setTextColor(50, 50, 50); doc.setFont("helvetica", "normal");
    doc.text(`Nombre: `, M + 4, y + 13); doc.setFont("helvetica", "bold");
    doc.text(selectedWorker.name, M + 24, y + 13);
    doc.setFont("helvetica", "normal");
    doc.text(`DNI: ${selectedWorker.dni}`, M + 4, y + 19);
    doc.text(`Rol: ${ROLE_LABEL[selectedWorker.role] ?? selectedWorker.role}`, M + 50, y + 19);
    doc.text(`Fecha despacho: ${scheduledDate}`, M + 110, y + 19);
    y += 28;

    // Items table
    const drawTable = (title: string, color: [number, number, number], rows: string[][]) => {
      if (!rows.length) return;
      if (y > 240) { doc.addPage(); y = 15; }
      doc.setFillColor(...color);
      doc.roundedRect(M, y, CW, 7, 1, 1, "F");
      doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(9);
      doc.text(title, M + 3, y + 5);
      y += 10;
      const hdrs = ["N°", "CÓDIGO", "DESCRIPCIÓN", "CANT.", "NOTAS"];
      const ws = [8, 22, 85, 14, 40];
      doc.setFillColor(245, 245, 245); doc.rect(M, y, CW, 6, "F");
      doc.setTextColor(80, 80, 80); doc.setFontSize(7.5);
      let xH = M + 2;
      hdrs.forEach((h, i) => { doc.text(h, xH, y + 4); xH += ws[i]; });
      y += 6;
      doc.setFont("helvetica", "normal"); doc.setTextColor(40, 40, 40);
      rows.forEach((row, ri) => {
        if (y > 270) { doc.addPage(); y = 15; }
        if (ri % 2 === 0) { doc.setFillColor(252, 252, 252); doc.rect(M, y, CW, 6, "F"); }
        let xR = M + 2;
        row.forEach((cell, ci) => {
          const t = doc.splitTextToSize(cell, ws[ci] - 2)[0] ?? cell;
          doc.text(t, xR, y + 4); xR += ws[ci];
        });
        y += 6; doc.setDrawColor(235, 235, 235); doc.line(M, y, W - M, y);
      });
      y += 5;
    };

    (["MATERIAL", "TOOL", "EQUIPMENT", "EPP"] as ProductTab[]).forEach((type) => {
      const items = cart.filter((c) => c.productType === type);
      if (!items.length) return;
      const cfg = PRODUCT_CONFIG[type];
      const colorArr = cfg.color
        .replace("#", "")
        .match(/.{2}/g)!
        .map((h) => parseInt(h, 16)) as [number, number, number];
      drawTable(
        `${cfg.icon} ${cfg.label.toUpperCase()}`,
        colorArr,
        items.map((item, i) => [
          String(i + 1),
          item.itemCode,
          item.itemName.substring(0, 40),
          String(item.quantity),
          item.notes || (item.serialNumber ? `Serie: ${item.serialNumber}` : "—"),
        ])
      );
    });

    // Signatures
    if (y > 230) { doc.addPage(); y = 15; }
    y += 8;
    doc.setDrawColor(200, 200, 200); doc.line(M, y, W - M, y); y += 10;
    doc.setFontSize(9); doc.setFont("helvetica", "bold"); doc.setTextColor(50, 50, 50);
    doc.text("FIRMAS Y CONFORMIDAD", M, y); y += 10;
    const bw = (CW - 10) / 2;
    doc.setDrawColor(180, 180, 180);
    doc.rect(M, y, bw, 28, "S");
    doc.setFont("helvetica", "normal"); doc.setFontSize(8);
    doc.text("ENTREGADO POR:", M + 3, y + 6);
    doc.setFont("helvetica", "bold"); doc.text("ALMACÉN LPS GROUP", M + 3, y + 12);
    doc.setFont("helvetica", "normal"); doc.setFontSize(7);
    doc.text("Firma: ___________________________", M + 3, y + 26);
    doc.rect(M + bw + 10, y, bw, 28, "S");
    doc.setFont("helvetica", "normal"); doc.setFontSize(8);
    doc.text("RECIBIDO POR:", M + bw + 13, y + 6);
    doc.setFont("helvetica", "bold"); doc.text(selectedWorker.name, M + bw + 13, y + 12);
    doc.setFont("helvetica", "normal"); doc.setFontSize(7);
    doc.text(`DNI: ${selectedWorker.dni}`, M + bw + 13, y + 18);
    doc.text("Firma: ___________________________", M + bw + 13, y + 26);

    const pages = doc.getNumberOfPages();
    for (let p = 1; p <= pages; p++) {
      doc.setPage(p);
      doc.setFontSize(7); doc.setTextColor(150, 150, 150);
      doc.text(`LPS GROUP S.A.C. — LPS ERP — ${dayjs().format("DD/MM/YYYY HH:mm")}`, M, 292);
      doc.text(`Pág. ${p} / ${pages}`, W - M - 16, 292);
    }
    doc.save(`Despacho_${dispatchCode}_${selectedWorker.dni}.pdf`);
  };

  // ─── Derived ───────────────────────────────────────────────────────────────
  const cartByType = (type: ProductTab) => cart.filter((c) => c.productType === type);
  const totalCartItems = cart.length;
  const totalUnits = cart.reduce((s, c) => s + c.quantity, 0);

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <Box
      ref={topRef}
      sx={{ maxWidth: 1400, mx: "auto", p: 3, display: "flex", flexDirection: "column", gap: 3 }}
    >
      <TitleCard
        icon={<LocalShippingOutlined sx={{ fontSize: 32 }} />}
        title="Despacho a Cuadrillas"
        description="Registra despacho de materiales, herramientas, equipos y EPP a técnicos de campo con trazabilidad completa"
      />

      {/* ══ SUCCESS SCREEN ═══════════════════════════════════════════════════ */}
      <Fade in={showSuccess} timeout={700} unmountOnExit>
        <Box>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)",
              border: "2px solid #bbf7d0",
              p: { xs: 4, md: 6 },
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box sx={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", bgcolor: "rgba(34,197,94,0.08)" }} />
            <Box sx={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", bgcolor: "rgba(34,197,94,0.06)" }} />
            <Box sx={{
              width: 90, height: 90, borderRadius: "50%", bgcolor: "#22c55e",
              mx: "auto", mb: 3, display: "flex", alignItems: "center", justifyContent: "center",
              animation: "pulseRing 2s ease-in-out infinite",
              "@keyframes pulseRing": {
                "0%, 100%": { boxShadow: "0 0 0 16px rgba(34,197,94,0.12), 0 0 0 32px rgba(34,197,94,0.06)" },
                "50%": { boxShadow: "0 0 0 20px rgba(34,197,94,0.08), 0 0 0 40px rgba(34,197,94,0.03)" },
              },
            }}>
              <CheckCircleOutline sx={{ fontSize: 48, color: "white" }} />
            </Box>
            <Typography variant="h4" fontWeight={800} sx={{ color: "#15803d", mb: 1 }}>
              ¡Despacho Registrado!
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 0.5, fontWeight: 400 }}>
              {selectedWorker?.name}
            </Typography>
            <Typography variant="body2" color="text.disabled" sx={{ mb: 4 }}>
              DNI: {selectedWorker?.dni} — {ROLE_LABEL[selectedWorker?.role ?? ""] ?? selectedWorker?.role}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 4 }}>
              <Paper elevation={0} sx={{ px: 3, py: 2, borderRadius: 3, border: "1px solid #bbf7d0", bgcolor: "white", minWidth: 120 }}>
                <Typography variant="h4" fontWeight={800} sx={{ color: "#0369a1" }}>{dispatchCode}</Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>Código</Typography>
              </Paper>
              <Paper elevation={0} sx={{ px: 3, py: 2, borderRadius: 3, border: "1px solid #bbf7d0", bgcolor: "white", minWidth: 100 }}>
                <Typography variant="h4" fontWeight={800} sx={{ color: "#ea580c" }}>{totalCartItems}</Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>Ítems</Typography>
              </Paper>
              <Paper elevation={0} sx={{ px: 3, py: 2, borderRadius: 3, border: "1px solid #bbf7d0", bgcolor: "white", minWidth: 100 }}>
                <Typography variant="h4" fontWeight={800} sx={{ color: "#15803d" }}>{totalUnits}</Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>Unidades</Typography>
              </Paper>
            </Box>
            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              <ButtonBase
                label="Descargar Cargo PDF"
                startIcon={<PictureAsPdfOutlined />}
                onClick={handlePDF}
                sx={{ px: 4, py: 1.5, bgcolor: "#dc2626", "&:hover": { bgcolor: "#b91c1c" }, boxShadow: "0 4px 12px rgba(220,38,38,0.3)", borderRadius: 2.5 }}
              />
              <ButtonBase
                label="Nuevo Despacho"
                startIcon={<LocalShippingOutlined />}
                onClick={handleReset}
                sx={{ px: 4, py: 1.5, fontWeight: 700, boxShadow: "0 4px 12px rgba(34,197,94,0.3)", borderRadius: 2.5 }}
              />
            </Stack>
          </Card>
        </Box>
      </Fade>

      {/* ══ FORM ════════════════════════════════════════════════════════════ */}
      <Fade in={!showSuccess} timeout={500} unmountOnExit>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

          {/* ── Worker Selector ─────────────────────────────────────────────── */}
          <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", overflow: "hidden" }}>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
              {/* Left panel */}
              <Box sx={{ flex: "0 0 400px", bgcolor: "#f8fafc", p: 3.5, borderRight: { md: "1px solid #e2e8f0" } }}>
                <Stack spacing={2.5}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box sx={{ width: 4, height: 18, bgcolor: "primary.main", borderRadius: 1 }} />
                    <Typography variant="subtitle2" fontWeight={700} sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}>
                      Técnico Receptor
                    </Typography>
                    {loadingWorkers && <CircularProgress size={14} />}
                  </Box>

                  <Autocomplete
                    options={workers}
                    getOptionLabel={(w) => `${w.name} — ${w.dni}`}
                    value={selectedWorker}
                    onChange={(_, val) => setSelectedWorker(val)}
                    inputValue={workerInput}
                    onInputChange={(_, val) => setWorkerInput(val)}
                    loading={loadingWorkers}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder="Buscar por nombre o DNI..."
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <>
                              <SearchOutlined sx={{ fontSize: 18, color: "text.disabled", mr: 0.5 }} />
                              {params.InputProps.startAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                    renderOption={(props, option) => (
                      <Box component="li" {...props} sx={{ py: 1.5 }} key={option.dni}>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Avatar sx={{ width: 34, height: 34, fontSize: 13, fontWeight: 800, bgcolor: option.role === "JEFE_CUADRILLA" ? "#d97706" : "#1976d2" }}>
                            {option.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight={700} sx={{ lineHeight: 1.2 }}>{option.name}</Typography>
                            <Stack direction="row" spacing={0.5} alignItems="center" mt={0.3}>
                              <Typography variant="caption" color="text.disabled">{option.dni}</Typography>
                              <Chip
                                label={ROLE_LABEL[option.role] ?? option.role}
                                size="small"
                                color={ROLE_COLOR[option.role] ?? "default"}
                                sx={{ height: 16, fontSize: "0.65rem", fontWeight: 700 }}
                              />
                            </Stack>
                          </Box>
                        </Stack>
                      </Box>
                    )}
                    noOptionsText="No se encontraron trabajadores"
                    fullWidth
                  />

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" mb={0.5}>
                        Fecha Programada
                      </Typography>
                      <TextField
                        type="date"
                        fullWidth
                        size="small"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
                    <Box sx={{ flex: "0 0 130px" }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" mb={0.5}>
                        Prioridad
                      </Typography>
                      <ToggleButtonGroup
                        value={priority}
                        exclusive
                        size="small"
                        onChange={(_, v) => { if (v) setPriority(v); }}
                        fullWidth
                      >
                        {(["HIGH", "MEDIUM", "LOW"] as const).map((p) => (
                          <ToggleButton
                            key={p}
                            value={p}
                            sx={{
                              textTransform: "none",
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              ...(priority === p && p === "HIGH" && { bgcolor: "#fee2e2 !important", color: "#dc2626 !important", borderColor: "#dc2626 !important" }),
                              ...(priority === p && p === "MEDIUM" && { bgcolor: "#fef9c3 !important", color: "#ca8a04 !important", borderColor: "#ca8a04 !important" }),
                              ...(priority === p && p === "LOW" && { bgcolor: "#f0fdf4 !important", color: "#16a34a !important", borderColor: "#16a34a !important" }),
                            }}
                          >
                            {p === "HIGH" ? "🔴" : p === "MEDIUM" ? "🟡" : "🟢"}
                          </ToggleButton>
                        ))}
                      </ToggleButtonGroup>
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" mb={0.5}>
                      Observaciones
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      multiline
                      rows={2}
                      placeholder="Instrucciones o notas del despacho..."
                      value={observations}
                      onChange={(e) => setObservations(e.target.value)}
                    />
                  </Box>
                </Stack>
              </Box>

              {/* Right panel — worker card */}
              <Box sx={{ flex: 1, p: 3.5, display: "flex", alignItems: "center" }}>
                {selectedWorker ? (
                  <Fade in timeout={400}>
                    <Box sx={{ width: "100%" }}>
                      <Stack direction="row" spacing={2.5} alignItems="center" mb={3}>
                        <Avatar
                          sx={{
                            width: 68, height: 68, fontSize: 26, fontWeight: 800,
                            bgcolor: selectedWorker.role === "JEFE_CUADRILLA" ? "#d97706" : "#1976d2",
                            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                          }}
                        >
                          {selectedWorker.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1.2 }}>
                            {selectedWorker.name}
                          </Typography>
                          <Stack direction="row" spacing={1} mt={0.5}>
                            <Chip
                              label={ROLE_LABEL[selectedWorker.role] ?? selectedWorker.role}
                              size="small"
                              color={ROLE_COLOR[selectedWorker.role] ?? "default"}
                              sx={{ fontWeight: 700 }}
                            />
                            <Chip
                              label={selectedWorker.type}
                              size="small"
                              variant="outlined"
                              sx={{ fontWeight: 600 }}
                            />
                          </Stack>
                        </Box>
                      </Stack>

                      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <BadgeOutlined sx={{ fontSize: 18, color: "text.secondary" }} />
                          <Typography variant="body2" color="text.secondary">DNI:</Typography>
                          <Typography variant="body2" fontWeight={700}>{selectedWorker.dni}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <CalendarTodayOutlined sx={{ fontSize: 18, color: "text.secondary" }} />
                          <Typography variant="body2" color="text.secondary">Fecha:</Typography>
                          <Typography variant="body2" fontWeight={700}>
                            {dayjs(scheduledDate).format("DD [de] MMMM, YYYY")}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Cart summary badges */}
                      {cart.length > 0 && (
                        <Box sx={{ display: "flex", gap: 1, mt: 2.5, flexWrap: "wrap" }}>
                          {(["MATERIAL", "TOOL", "EQUIPMENT", "EPP"] as ProductTab[]).map((type) => {
                            const count = cartByType(type).length;
                            if (!count) return null;
                            const cfg = PRODUCT_CONFIG[type];
                            return (
                              <Chip
                                key={type}
                                label={`${cfg.icon} ${count} ${cfg.label}`}
                                size="small"
                                sx={{ fontWeight: 700, bgcolor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
                              />
                            );
                          })}
                          <Chip
                            label={`${totalUnits} unidades totales`}
                            size="small"
                            color="primary"
                            sx={{ fontWeight: 700 }}
                          />
                        </Box>
                      )}
                    </Box>
                  </Fade>
                ) : (
                  <Box sx={{ width: "100%", textAlign: "center", py: 4 }}>
                    <PersonOutlined sx={{ fontSize: 56, color: "text.disabled", mb: 1.5 }} />
                    <Typography variant="body1" color="text.secondary" fontWeight={600}>
                      Selecciona un técnico para continuar
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                      Busca por nombre completo o DNI
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Card>

          {/* ── Inventory Selector ───────────────────────────────────────────── */}
          <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", overflow: "hidden" }}>
            {/* Card header */}
            <Box sx={{ px: 3, py: 2, bgcolor: "#fafbfc", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: 4, height: 22, bgcolor: "#ea580c", borderRadius: 1 }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight={800}>Catálogo de Inventario</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Selecciona ítems del inventario real del hub para agregar al despacho
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  size="small"
                  placeholder="Buscar ítem..."
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  sx={{ width: 220 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlined sx={{ fontSize: 18, color: "text.disabled" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Tooltip title="Recargar inventario">
                  <span>
                    <IconButton
                      size="small"
                      onClick={() => setInventoryPage(0)}
                      sx={{ border: "1px solid #e2e8f0", bgcolor: "white" }}
                    >
                      <RefreshOutlined fontSize="small" />
                    </IconButton>
                  </span>
                </Tooltip>
              </Stack>
            </Box>

            {/* Product type tabs */}
            <Box sx={{ borderBottom: "1px solid #f1f5f9", px: 3, bgcolor: "#fafbfc" }}>
              <Tabs
                value={activeTab}
                onChange={(_, v) => { setActiveTab(v); setInventoryPage(0); setInventorySearch(""); }}
                TabIndicatorProps={{ sx: { height: 3, borderRadius: "3px 3px 0 0" } }}
              >
                {(["MATERIAL", "TOOL", "EQUIPMENT", "EPP"] as ProductTab[]).map((type) => {
                  const cfg = PRODUCT_CONFIG[type];
                  const inCart = cartByType(type).length;
                  return (
                    <Tab
                      key={type}
                      value={type}
                      label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                          <Typography variant="caption" fontWeight={700}>
                            {cfg.icon} {cfg.label}
                          </Typography>
                          {inCart > 0 && (
                            <Chip
                              label={inCart}
                              size="small"
                              sx={{
                                height: 18, fontSize: "0.65rem", fontWeight: 800,
                                bgcolor: cfg.color, color: "white",
                              }}
                            />
                          )}
                        </Box>
                      }
                      sx={{ textTransform: "none", minHeight: 44 }}
                    />
                  );
                })}
              </Tabs>
            </Box>

            {/* Inventory items */}
            <Box sx={{ p: 2 }}>
              {loadingInventory ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                  <CircularProgress size={36} />
                </Box>
              ) : inventory.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 6 }}>
                  <StorageOutlined sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    No hay ítems disponibles para este tipo
                  </Typography>
                </Box>
              ) : (
                <>
                  {/* Table header */}
                  <Box sx={{ display: "flex", gap: 1, px: 1.5, py: 1, bgcolor: "#f1f5f9", borderRadius: 1, mb: 1 }}>
                    <Box sx={{ flex: "0 0 28px" }} />
                    <Box sx={{ flex: "0 0 110px" }}>
                      <Typography variant="caption" fontWeight={700} color="text.secondary">CÓDIGO</Typography>
                    </Box>
                    <Box sx={{ flex: "2 1 0" }}>
                      <Typography variant="caption" fontWeight={700} color="text.secondary">DESCRIPCIÓN</Typography>
                    </Box>
                    <Box sx={{ flex: "0 0 100px", textAlign: "center" }}>
                      <Typography variant="caption" fontWeight={700} color="text.secondary">DISPONIBLE</Typography>
                    </Box>
                    <Box sx={{ flex: "0 0 80px", textAlign: "center" }}>
                      <Typography variant="caption" fontWeight={700} color="text.secondary">ESTADO</Typography>
                    </Box>
                    <Box sx={{ flex: "0 0 90px", textAlign: "center" }}>
                      <Typography variant="caption" fontWeight={700} color="text.secondary">ACCIÓN</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6, maxHeight: 380, overflowY: "auto", pr: 0.5 }}>
                    {inventory.map((item) => {
                      const sem = getSemaforo(item);
                      const inCart = cart.some((c) => c.inventoryId === item.id);
                      const cfg = PRODUCT_CONFIG[item.productType];
                      const pct = Math.min(
                        ((item.quantityAvailable) / (item.maximumStock || Math.max(item.quantityAvailable, 1))) * 100,
                        100
                      );

                      return (
                        <Box
                          key={item.id}
                          sx={{
                            display: "flex", gap: 1, alignItems: "center", px: 1.5, py: 1.2,
                            bgcolor: inCart ? cfg.bg : "#fafafa",
                            borderRadius: 1.5,
                            border: "1px solid",
                            borderColor: inCart ? cfg.border : "#f0f0f0",
                            transition: "all 0.15s",
                            opacity: item.quantityAvailable === 0 ? 0.5 : 1,
                          }}
                        >
                          {/* Semaphore dot */}
                          <Box sx={{ flex: "0 0 28px", display: "flex", justifyContent: "center" }}>
                            <Box
                              sx={{
                                width: 9, height: 9, borderRadius: "50%",
                                bgcolor: SEM_COLOR[sem],
                                ...(sem === "ROJO" && {
                                  animation: "semPulse 1.6s ease-in-out infinite",
                                  "@keyframes semPulse": {
                                    "0%, 100%": { boxShadow: `0 0 0 0 ${SEM_COLOR[sem]}60` },
                                    "50%": { boxShadow: `0 0 0 4px ${SEM_COLOR[sem]}00` },
                                  },
                                }),
                              }}
                            />
                          </Box>

                          {/* Code */}
                          <Box sx={{ flex: "0 0 110px" }}>
                            <Chip
                              label={item.itemCode}
                              size="small"
                              sx={{ bgcolor: cfg.color, color: "white", fontWeight: 700, fontSize: "0.68rem", maxWidth: 105 }}
                            />
                          </Box>

                          {/* Description */}
                          <Box sx={{ flex: "2 1 0" }}>
                            <Typography variant="caption" fontWeight={600} sx={{ lineHeight: 1.3 }}>
                              {item.description || item.itemName}
                            </Typography>
                          </Box>

                          {/* Available qty + mini bar */}
                          <Box sx={{ flex: "0 0 100px", textAlign: "center" }}>
                            <Typography
                              variant="caption"
                              fontWeight={800}
                              sx={{ color: SEM_COLOR[sem], lineHeight: 1 }}
                            >
                              {item.quantityAvailable}
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={pct}
                              sx={{
                                height: 3, borderRadius: 2, mt: 0.3,
                                bgcolor: `${SEM_COLOR[sem]}20`,
                                "& .MuiLinearProgress-bar": { bgcolor: SEM_COLOR[sem], borderRadius: 2 },
                              }}
                            />
                          </Box>

                          {/* Status */}
                          <Box sx={{ flex: "0 0 80px", textAlign: "center" }}>
                            <Chip
                              label={sem === "GRIS" ? "Sin stock" : sem === "ROJO" ? "Crítico" : "OK"}
                              size="small"
                              sx={{
                                height: 18, fontSize: "0.62rem", fontWeight: 700,
                                bgcolor: `${SEM_COLOR[sem]}18`, color: SEM_COLOR[sem],
                              }}
                            />
                          </Box>

                          {/* Action */}
                          <Box sx={{ flex: "0 0 90px", textAlign: "center" }}>
                            {inCart ? (
                              <Chip
                                label="Agregado"
                                size="small"
                                icon={<CheckCircle sx={{ fontSize: "13px !important" }} />}
                                sx={{ height: 24, fontSize: "0.68rem", fontWeight: 700, bgcolor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
                              />
                            ) : (
                              <ButtonBase
                                size="small"
                                label="+ Agregar"
                                onClick={() => addToCart(item)}
                                disabled={item.quantityAvailable === 0}
                                sx={{
                                  fontSize: "0.7rem", px: 1.5, py: 0.4,
                                  bgcolor: cfg.color,
                                  "&:hover": { filter: "brightness(0.9)" },
                                  "&:disabled": { opacity: 0.4 },
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>

                  {/* Pagination */}
                  {inventoryTotal > 20 && (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2, mt: 2 }}>
                      <ButtonBase
                        size="small"
                        label="← Anterior"
                        disabled={inventoryPage === 0}
                        onClick={() => setInventoryPage((p) => p - 1)}
                        sx={{ bgcolor: "white", color: "text.secondary", border: "1px solid #e2e8f0", fontSize: "0.75rem" }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Pág. {inventoryPage + 1} / {Math.ceil(inventoryTotal / 20)} ({inventoryTotal} total)
                      </Typography>
                      <ButtonBase
                        size="small"
                        label="Siguiente →"
                        disabled={(inventoryPage + 1) * 20 >= inventoryTotal}
                        onClick={() => setInventoryPage((p) => p + 1)}
                        sx={{ bgcolor: "white", color: "text.secondary", border: "1px solid #e2e8f0", fontSize: "0.75rem" }}
                      />
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Card>

          {/* ── Dispatch Cart ────────────────────────────────────────────────── */}
          <Collapse in={cart.length > 0} unmountOnExit>
            <Card
              elevation={4}
              sx={{
                borderRadius: 4,
                border: "2px solid #bfdbfe",
                overflow: "hidden",
                boxShadow: "rgba(37,99,235,0.15) 0px 8px 32px",
              }}
            >
              {/* Cart header */}
              <Box sx={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)", p: 2.5, color: "white" }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 1, borderRadius: 2, display: "flex" }}>
                      <LocalShippingOutlined />
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={800}>Carrito de Despacho</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        {totalCartItems} ítem(s) — {totalUnits} unidades totales
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {(["MATERIAL", "TOOL", "EQUIPMENT", "EPP"] as ProductTab[]).map((type) => {
                      const count = cartByType(type).length;
                      if (!count) return null;
                      const cfg = PRODUCT_CONFIG[type];
                      return (
                        <Chip
                          key={type}
                          label={`${cfg.icon} ${count}`}
                          size="small"
                          sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white", fontWeight: 700 }}
                        />
                      );
                    })}
                  </Stack>
                </Stack>
              </Box>

              <Box sx={{ p: 3 }}>
                {/* Equipment pistolado panel */}
                {cart.some((c) => c.productType === "EQUIPMENT") && (
                  <Alert
                    severity="info"
                    icon={<QrCodeScannerOutlined />}
                    sx={{ mb: 2.5, borderRadius: 2, border: "1px solid #bfdbfe" }}
                  >
                    <Typography variant="body2" fontWeight={700} mb={0.5}>
                      Pistolado de equipos activo
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", mt: 1, flexWrap: "wrap" }}>
                      <TextField
                        size="small"
                        placeholder="Escanea o ingresa N° de serie..."
                        value={serialInput}
                        onChange={(e) => setSerialInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleSerialScan(); }}
                        inputRef={serialRef}
                        sx={{ width: 280 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <QrCodeScannerOutlined sx={{ fontSize: 18, color: "text.disabled" }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <ButtonBase
                        size="small"
                        label="Asignar Serie"
                        onClick={handleSerialScan}
                        sx={{ px: 2, bgcolor: "#1976d2" }}
                      />
                      <Typography variant="caption" color="text.disabled">
                        Presiona Enter o clic en "Asignar Serie" para registrar
                      </Typography>
                    </Box>
                  </Alert>
                )}

                {/* Cart items by type */}
                {(["MATERIAL", "TOOL", "EQUIPMENT", "EPP"] as ProductTab[]).map((type) => {
                  const items = cartByType(type);
                  if (!items.length) return null;
                  const cfg = PRODUCT_CONFIG[type];

                  return (
                    <Box key={type} sx={{ mb: 3 }}>
                      {/* Section label */}
                      <Box sx={{
                        display: "flex", alignItems: "center", gap: 1.5,
                        px: 2, py: 1, bgcolor: cfg.bg, borderRadius: 2,
                        border: `1px solid ${cfg.border}`, mb: 1.5,
                      }}>
                        <Typography variant="body2" fontWeight={800} sx={{ color: cfg.color }}>
                          {cfg.icon} {cfg.label}
                        </Typography>
                        <Chip label={items.length} size="small" sx={{ height: 18, fontSize: "0.65rem", fontWeight: 800, bgcolor: cfg.color, color: "white" }} />
                      </Box>

                      {/* Items */}
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {items.map((item, idx) => (
                          <Grow key={item.cartId} in timeout={150 + idx * 60}>
                            <Box sx={{
                              p: 2, bgcolor: "white", borderRadius: 2,
                              border: `1px solid ${cfg.border}`,
                              boxShadow: `0 1px 4px ${cfg.color}10`,
                            }}>
                              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start", flexWrap: "wrap" }}>
                                {/* Index + code */}
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: "0 0 auto" }}>
                                  <Chip
                                    label={idx + 1}
                                    size="small"
                                    sx={{ height: 22, fontWeight: 800, bgcolor: cfg.color, color: "white", minWidth: 28 }}
                                  />
                                  <Box>
                                    <Typography variant="caption" fontWeight={700} sx={{ color: cfg.color }}>
                                      {item.itemCode}
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.3, maxWidth: 260 }}>
                                      {item.itemName}
                                    </Typography>
                                  </Box>
                                </Box>

                                {/* Quantity */}
                                <Box sx={{ flex: "0 0 110px" }}>
                                  <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" mb={0.5}>
                                    Cantidad *
                                  </Typography>
                                  <TextField
                                    type="number"
                                    size="small"
                                    fullWidth
                                    value={item.quantity}
                                    onChange={(e) => {
                                      const v = Math.max(1, Math.min(item.quantityAvailable, parseInt(e.target.value) || 1));
                                      updateCartItem(item.cartId, "quantity", v);
                                    }}
                                    inputProps={{ min: 1, max: item.quantityAvailable, style: { textAlign: "center", fontWeight: 700 } }}
                                    helperText={`Máx: ${item.quantityAvailable}`}
                                  />
                                </Box>

                                {/* Notes */}
                                <Box sx={{ flex: "1 1 180px" }}>
                                  <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" mb={0.5}>
                                    Notas
                                  </Typography>
                                  <TextField
                                    size="small"
                                    fullWidth
                                    placeholder="Observaciones del ítem..."
                                    value={item.notes}
                                    onChange={(e) => updateCartItem(item.cartId, "notes", e.target.value)}
                                  />
                                </Box>

                                {/* Equipment extra fields */}
                                {item.productType === "EQUIPMENT" && (
                                  <Box sx={{ flex: "2 1 300px" }}>
                                    <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" mb={0.5}>
                                      Datos de Equipo
                                    </Typography>
                                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                                      <TextField
                                        size="small"
                                        placeholder="N° Serie *"
                                        value={item.serialNumber ?? ""}
                                        onChange={(e) => updateCartItem(item.cartId, "serialNumber", e.target.value)}
                                        sx={{ flex: "1 1 140px" }}
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start">
                                              {item.serialNumber
                                                ? <CheckCircle sx={{ fontSize: 14, color: "#16a34a" }} />
                                                : <QrCodeScannerOutlined sx={{ fontSize: 14, color: "text.disabled" }} />
                                              }
                                            </InputAdornment>
                                          ),
                                        }}
                                      />
                                      <TextField
                                        size="small"
                                        placeholder="MAC Address"
                                        value={item.macAddress ?? ""}
                                        onChange={(e) => updateCartItem(item.cartId, "macAddress", e.target.value)}
                                        sx={{ flex: "1 1 140px" }}
                                      />
                                      <TextField
                                        size="small"
                                        placeholder="MTA MAC"
                                        value={item.mtaMacAddress ?? ""}
                                        onChange={(e) => updateCartItem(item.cartId, "mtaMacAddress", e.target.value)}
                                        sx={{ flex: "1 1 130px" }}
                                      />
                                      <TextField
                                        size="small"
                                        placeholder="Unit Address"
                                        value={item.unitAddress ?? ""}
                                        onChange={(e) => updateCartItem(item.cartId, "unitAddress", e.target.value)}
                                        sx={{ flex: "1 1 130px" }}
                                      />
                                    </Box>
                                  </Box>
                                )}

                                {/* Delete */}
                                <Box sx={{ ml: "auto" }}>
                                  <Tooltip title="Quitar del despacho">
                                    <IconButton
                                      size="small"
                                      color="error"
                                      onClick={() => removeFromCart(item.cartId)}
                                    >
                                      <HighlightOffOutlined />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </Box>

                              {/* Equipment serial warning */}
                              {item.productType === "EQUIPMENT" && !item.serialNumber && (
                                <Alert severity="warning" sx={{ mt: 1.5, py: 0.5, borderRadius: 1.5 }}>
                                  <Typography variant="caption" fontWeight={600}>
                                    Pistolado pendiente — ingresa el número de serie antes de registrar
                                  </Typography>
                                </Alert>
                              )}
                            </Box>
                          </Grow>
                        ))}
                      </Box>
                    </Box>
                  );
                })}

                <Divider sx={{ my: 2 }} />

                {/* Summary row */}
                <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
                  {(["MATERIAL", "TOOL", "EQUIPMENT", "EPP"] as ProductTab[]).filter((t) => cartByType(t).length > 0).map((type) => {
                    const cfg = PRODUCT_CONFIG[type];
                    const items = cartByType(type);
                    return (
                      <Paper
                        key={type}
                        variant="outlined"
                        sx={{ flex: "1 1 100px", p: 1.5, borderRadius: 2, textAlign: "center", bgcolor: cfg.bg, border: `1px solid ${cfg.border}` }}
                      >
                        <Typography variant="h5" fontWeight={800} sx={{ color: cfg.color }}>{items.length}</Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>
                          {cfg.icon} {cfg.label}
                        </Typography>
                      </Paper>
                    );
                  })}
                  <Paper
                    variant="outlined"
                    sx={{ flex: "1 1 100px", p: 1.5, borderRadius: 2, textAlign: "center", bgcolor: "#f0f9ff", border: "1px solid #bae6fd" }}
                  >
                    <Typography variant="h5" fontWeight={800} sx={{ color: "#0369a1" }}>{totalUnits}</Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      Unidades
                    </Typography>
                  </Paper>
                </Box>

                {/* Action buttons */}
                <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", flexWrap: "wrap" }}>
                  <ButtonBase
                    label="Guardar Borrador"
                    startIcon={<SaveOutlined />}
                    onClick={() => toast.info("Funcionalidad de borrador próximamente")}
                    sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1", "&:hover": { bgcolor: "#f1f5f9" }, px: 3 }}
                  />
                  <ButtonBase
                    label={submitting ? "Registrando..." : "Registrar Despacho"}
                    startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <CheckCircleOutline />}
                    onClick={handleSubmit}
                    disabled={submitting || !selectedWorker}
                    sx={{
                      px: 4, py: 1.3, fontWeight: 700,
                      background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                      boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
                      "&:hover": { transform: "translateY(-1px)", boxShadow: "0 8px 20px rgba(37,99,235,0.4)" },
                    }}
                  />
                </Box>
              </Box>
            </Card>
          </Collapse>

          {/* Empty cart CTA */}
          {cart.length === 0 && (
            <Card
              elevation={0}
              sx={{ borderRadius: 3, border: "2px dashed #e2e8f0", p: 4, textAlign: "center" }}
            >
              <LocalShippingOutlined sx={{ fontSize: 56, color: "text.disabled", mb: 1 }} />
              <Typography variant="body1" color="text.secondary" fontWeight={600}>
                El carrito de despacho está vacío
              </Typography>
              <Typography variant="caption" color="text.disabled">
                Selecciona ítems del catálogo de inventario para agregarlos
              </Typography>
            </Card>
          )}
        </Box>
      </Fade>
    </Box>
  );
}