// "use client";

// import { useState } from "react";
// import {
//   Box,
//   Card,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Chip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   TextField,
//   Alert,
//   Checkbox,
//   Tooltip,
//   Grid,
// } from "@mui/material";
// import {
//   UploadFileOutlined,
//   AssignmentIndOutlined,
//   DeleteOutline,
//   CheckCircleOutline,
//   PendingOutlined,
//   PersonAddOutlined,
//   DownloadOutlined,
//   RefreshOutlined,
//   FilterListOutlined,
// } from "@mui/icons-material";
// import { TitleCard } from "@/src/components/base/TitleCard";
// import * as XLSX from "xlsx";

// // Interfaces
// interface SOT {
//   id: string;
//   numeroSOT: string;
//   fecha: string;
//   razonSocial: string;
//   codigoCliente: string;
//   direccion: string;
//   distrito: string;
//   provincia: string;
//   telefono: string;
//   plataforma: string;
//   planContratado: string;
//   servicioRealizado: string;
//   cintillo?: string;
//   plano?: string;
//   validacion?: string;
//   fat?: string;
//   borneFat?: string;
//   tecnicoAsignado?: string;
//   estado: "pendiente" | "asignado" | "completado";
//   fechaAsignacion?: string;
//   fechaCompletado?: string;
// }

// interface Tecnico {
//   id: string;
//   nombre: string;
//   dni: string;
//   contratista: string;
//   sotsAsignados: number;
//   estado: "activo" | "inactivo";
// }

// export default function AdminSOTs() {
//   // Estados principales
//   const [sots, setSots] = useState<SOT[]>([]);
//   const [tecnicos, setTecnicos] = useState<Tecnico[]>([
//     {
//       id: "1",
//       nombre: "Juan Pérez García",
//       dni: "12345678",
//       contratista: "TechService SAC",
//       sotsAsignados: 0,
//       estado: "activo",
//     },
//     {
//       id: "2",
//       nombre: "María López Sánchez",
//       dni: "87654321",
//       contratista: "InstallPro EIRL",
//       sotsAsignados: 0,
//       estado: "activo",
//     },
//   ]);

//   // Estados de diálogos
//   const [openAsignar, setOpenAsignar] = useState(false);
//   const [openNuevoTecnico, setOpenNuevoTecnico] = useState(false);
//   const [selectedSOTs, setSelectedSOTs] = useState<string[]>([]);
//   const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState("");

//   // Estados de filtros
//   const [filtroEstado, setFiltroEstado] = useState<string>("todos");
//   const [filtroTecnico, setFiltroTecnico] = useState<string>("todos");

//   // Estados para nuevo técnico
//   const [nuevoTecnico, setNuevoTecnico] = useState({
//     nombre: "",
//     dni: "",
//     contratista: "",
//   });

//   // Estado de alertas
//   const [alert, setAlert] = useState<{
//     show: boolean;
//     type: "success" | "error" | "info";
//     message: string;
//   }>({ show: false, type: "info", message: "" });

//   // Función para cargar archivo Excel
//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       try {
//         const data = e.target?.result;
//         const workbook = XLSX.read(data, { type: "binary" });
//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];
//         const jsonData = XLSX.utils.sheet_to_json(worksheet);

//         // Mapear datos del Excel a formato SOT
//         const nuevosSOTs: SOT[] = jsonData.map((row: any, index: number) => ({
//           id: `SOT-${Date.now()}-${index}`,
//           numeroSOT: row["Número SOT"] || row["SOT"] || `SOT-${Date.now()}-${index}`,
//           fecha: row["Fecha"] || new Date().toISOString().split("T")[0],
//           razonSocial: row["Razón Social"] || row["Cliente"] || "",
//           codigoCliente: row["Código Cliente"] || row["Codigo"] || "",
//           direccion: row["Dirección"] || row["Direccion"] || "",
//           distrito: row["Distrito"] || "",
//           provincia: row["Provincia"] || "",
//           telefono: row["Teléfono"] || row["Telefono"] || "",
//           plataforma: row["Plataforma"] || "",
//           planContratado: row["Plan"] || row["Plan Contratado"] || "",
//           servicioRealizado: row["Servicio"] || row["Tipo Servicio"] || "",
//           cintillo: row["Cintillo"] || "",
//           plano: row["Plano"] || "",
//           validacion: row["Validación"] || row["Validacion"] || "",
//           fat: row["FAT"] || "",
//           borneFat: row["Borne FAT"] || "",
//           estado: "pendiente",
//         }));

//         setSots([...sots, ...nuevosSOTs]);
//         showAlert("success", `${nuevosSOTs.length} SOTs cargados correctamente`);
//       } catch (error) {
//         showAlert("error", "Error al procesar el archivo Excel");
//         console.error(error);
//       }
//     };
//     reader.readAsBinaryString(file);
//     event.target.value = ""; // Reset input
//   };

//   // Función para descargar plantilla Excel
//   const descargarPlantilla = () => {
//     const plantilla = [
//       {
//         "Número SOT": "SOT-2024-0001",
//         Fecha: "2024-01-15",
//         "Razón Social": "Juan Pérez García",
//         "Código Cliente": "CLI-001",
//         Dirección: "Av. Los Olivos 123",
//         Distrito: "San Isidro",
//         Provincia: "Lima",
//         Teléfono: "987654321",
//         Plataforma: "FTTH",
//         "Plan Contratado": "Plan 100 Mbps",
//         Servicio: "Instalación",
//         Cintillo: "12345",
//         Plano: "PL-001",
//         Validación: "VAL-001",
//         FAT: "FAT-001",
//         "Borne FAT": "B-01",
//       },
//     ];

//     const worksheet = XLSX.utils.json_to_sheet(plantilla);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Plantilla SOTs");
//     XLSX.writeFile(workbook, "Plantilla_SOTs.xlsx");
//   };

//   // Función para asignar SOTs a técnico
//   const asignarSOTs = () => {
//     if (!tecnicoSeleccionado || selectedSOTs.length === 0) {
//       showAlert("error", "Debe seleccionar un técnico y al menos un SOT");
//       return;
//     }

//     const tecnico = tecnicos.find((t) => t.id === tecnicoSeleccionado);
//     if (!tecnico) return;

//     const sotsActualizados = sots.map((sot) => {
//       if (selectedSOTs.includes(sot.id)) {
//         return {
//           ...sot,
//           tecnicoAsignado: tecnico.nombre,
//           estado: "asignado" as const,
//           fechaAsignacion: new Date().toISOString(),
//         };
//       }
//       return sot;
//     });

//     setSots(sotsActualizados);

//     // Actualizar contador de técnico
//     const tecnicosActualizados = tecnicos.map((t) => {
//       if (t.id === tecnicoSeleccionado) {
//         return {
//           ...t,
//           sotsAsignados: t.sotsAsignados + selectedSOTs.length,
//         };
//       }
//       return t;
//     });
//     setTecnicos(tecnicosActualizados);

//     showAlert("success", `${selectedSOTs.length} SOTs asignados a ${tecnico.nombre}`);
//     setSelectedSOTs([]);
//     setTecnicoSeleccionado("");
//     setOpenAsignar(false);
//   };

//   // Función para agregar técnico
//   const agregarTecnico = () => {
//     if (!nuevoTecnico.nombre || !nuevoTecnico.dni) {
//       showAlert("error", "Complete los campos obligatorios");
//       return;
//     }

//     const tecnico: Tecnico = {
//       id: Date.now().toString(),
//       nombre: nuevoTecnico.nombre,
//       dni: nuevoTecnico.dni,
//       contratista: nuevoTecnico.contratista,
//       sotsAsignados: 0,
//       estado: "activo",
//     };

//     setTecnicos([...tecnicos, tecnico]);
//     showAlert("success", `Técnico ${tecnico.nombre} agregado correctamente`);
//     setNuevoTecnico({ nombre: "", dni: "", contratista: "" });
//     setOpenNuevoTecnico(false);
//   };

//   // Función para eliminar SOT
//   const eliminarSOT = (id: string) => {
//     const sot = sots.find((s) => s.id === id);
//     if (sot?.tecnicoAsignado) {
//       const tecnicosActualizados = tecnicos.map((t) => {
//         if (t.nombre === sot.tecnicoAsignado) {
//           return { ...t, sotsAsignados: Math.max(0, t.sotsAsignados - 1) };
//         }
//         return t;
//       });
//       setTecnicos(tecnicosActualizados);
//     }
//     setSots(sots.filter((s) => s.id !== id));
//     showAlert("info", "SOT eliminado");
//   };

//   // Función para seleccionar/deseleccionar SOT
//   const toggleSOTSelection = (id: string) => {
//     setSelectedSOTs((prev) =>
//       prev.includes(id) ? prev.filter((sotId) => sotId !== id) : [...prev, id]
//     );
//   };

//   // Función para mostrar alertas
//   const showAlert = (type: "success" | "error" | "info", message: string) => {
//     setAlert({ show: true, type, message });
//     setTimeout(() => setAlert({ show: false, type: "info", message: "" }), 5000);
//   };

//   // Filtrar SOTs
//   const sotsFiltrados = sots.filter((sot) => {
//     const cumpleFiltroEstado =
//       filtroEstado === "todos" || sot.estado === filtroEstado;
//     const cumpleFiltroTecnico =
//       filtroTecnico === "todos" ||
//       (filtroTecnico === "sin-asignar" && !sot.tecnicoAsignado) ||
//       sot.tecnicoAsignado === filtroTecnico;
//     return cumpleFiltroEstado && cumpleFiltroTecnico;
//   });

//   // Estadísticas
//   const stats = {
//     total: sots.length,
//     pendientes: sots.filter((s) => s.estado === "pendiente").length,
//     asignados: sots.filter((s) => s.estado === "asignado").length,
//     completados: sots.filter((s) => s.estado === "completado").length,
//   };

//   return (
//     <Box sx={{ maxWidth: 1600, mx: "auto", p: 3 }}>
//       {/* Título */}
//       <TitleCard
//         icon={<AssignmentIndOutlined sx={{ fontSize: 32 }} />}
//         title="ADMINISTRACIÓN DE SOTs"
//         description="Gestión y asignación de órdenes de servicio técnico"
//       />

//       {/* Alert */}
//       {alert.show && (
//         <Alert
//           severity={alert.type}
//           onClose={() => setAlert({ ...alert, show: false })}
//           sx={{ mb: 3 }}
//         >
//           {alert.message}
//         </Alert>
//       )}

//       {/* Estadísticas */}
//       <Grid container spacing={2} sx={{ mb: 3 }}>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ p: 2, bgcolor: "primary.50" }}>
//             <Typography variant="h4" fontWeight={700} color="primary.main">
//               {stats.total}
//             </Typography>
//             <Typography variant="body2" color="text.secondary"> 
//               Total SOTs
//             </Typography>
//           </Card>
//         </Grid>
//         <Box item xs={12} sm={6} md={3}>
//           <Card sx={{ p: 2, bgcolor: "warning.50" }}>
//             <Typography variant="h4" fontWeight={700} color="warning.main">
//               {stats.pendientes}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Pendientes
//             </Typography>
//           </Card>
//         </Box>
//         <Box item xs={12} sm={6} md={3}>
//           <Card sx={{ p: 2, bgcolor: "info.50" }}>
//             <Typography variant="h4" fontWeight={700} color="info.main">
//               {stats.asignados}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Asignados
//             </Typography>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ p: 2, bgcolor: "success.50" }}>
//             <Typography variant="h4" fontWeight={700} color="success.main">
//               {stats.completados}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Completados
//             </Typography>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Acciones Principales */}
//       <Card elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
//         <Box
//           sx={{
//             display: "flex",
//             gap: 2,
//             flexWrap: "wrap",
//             justifyContent: "space-between",
//           }}
//         >
//           <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
//             <Button
//               variant="contained"
//               component="label"
//               startIcon={<UploadFileOutlined />}
//               sx={{ textTransform: "none", fontWeight: 600 }}
//             >
//               Cargar Excel
//               <input
//                 type="file"
//                 hidden
//                 accept=".xlsx,.xls"
//                 onChange={handleFileUpload}
//               />
//             </Button>
//             <Button
//               variant="outlined"
//               startIcon={<DownloadOutlined />}
//               onClick={descargarPlantilla}
//               sx={{ textTransform: "none", fontWeight: 600 }}
//             >
//               Descargar Plantilla
//             </Button>
//             <Button
//               variant="contained"
//               color="success"
//               startIcon={<PersonAddOutlined />}
//               onClick={() => setOpenNuevoTecnico(true)}
//               sx={{ textTransform: "none", fontWeight: 600 }}
//             >
//               Nuevo Técnico
//             </Button>
//           </Box>
//           <Button
//             variant="contained"
//             color="secondary"
//             startIcon={<AssignmentIndOutlined />}
//             onClick={() => setOpenAsignar(true)}
//             disabled={selectedSOTs.length === 0}
//             sx={{ textTransform: "none", fontWeight: 600 }}
//           >
//             Asignar SOTs ({selectedSOTs.length})
//           </Button>
//         </Box>
//       </Card>

//       {/* Técnicos Activos */}
//       <Card elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
//         <Typography variant="h6" fontWeight={700} gutterBottom>
//           Técnicos Activos
//         </Typography>
//         <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
//           {tecnicos
//             .filter((t) => t.estado === "activo")
//             .map((tecnico) => (
//               <Card
//                 key={tecnico.id}
//                 sx={{
//                   p: 2,
//                   minWidth: 200,
//                   bgcolor: "grey.50",
//                   border: "1px solid",
//                   borderColor: "grey.300",
//                 }}
//               >
//                 <Typography variant="subtitle2" fontWeight={700}>
//                   {tecnico.nombre}
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary" display="block">
//                   DNI: {tecnico.dni}
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary" display="block">
//                   {tecnico.contratista}
//                 </Typography>
//                 <Chip
//                   label={`${tecnico.sotsAsignados} SOTs`}
//                   size="small"
//                   color="primary"
//                   sx={{ mt: 1 }}
//                 />
//               </Card>
//             ))}
//         </Box>
//       </Card>

//       {/* Filtros */}
//       <Card elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
//           <FilterListOutlined color="primary" />
//           <Typography variant="h6" fontWeight={700}>
//             Filtros
//           </Typography>
//         </Box>
//         <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
//           <FormControl size="small" sx={{ minWidth: 150 }}>
//             <InputLabel>Estado</InputLabel>
//             <Select
//               value={filtroEstado}
//               label="Estado"
//               onChange={(e) => setFiltroEstado(e.target.value)}
//             >
//               <MenuItem value="todos">Todos</MenuItem>
//               <MenuItem value="pendiente">Pendientes</MenuItem>
//               <MenuItem value="asignado">Asignados</MenuItem>
//               <MenuItem value="completado">Completados</MenuItem>
//             </Select>
//           </FormControl>
//           <FormControl size="small" sx={{ minWidth: 200 }}>
//             <InputLabel>Técnico</InputLabel>
//             <Select
//               value={filtroTecnico}
//               label="Técnico"
//               onChange={(e) => setFiltroTecnico(e.target.value)}
//             >
//               <MenuItem value="todos">Todos</MenuItem>
//               <MenuItem value="sin-asignar">Sin Asignar</MenuItem>
//               {tecnicos.map((tecnico) => (
//                 <MenuItem key={tecnico.id} value={tecnico.nombre}>
//                   {tecnico.nombre}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <Button
//             variant="outlined"
//             startIcon={<RefreshOutlined />}
//             onClick={() => {
//               setFiltroEstado("todos");
//               setFiltroTecnico("todos");
//             }}
//             sx={{ textTransform: "none" }}
//           >
//             Limpiar
//           </Button>
//         </Box>
//       </Card>

//       {/* Tabla de SOTs */}
//       <Card elevation={3} sx={{ borderRadius: 3 }}>
//         <Box sx={{ bgcolor: "primary.main", p: 3 }}>
//           <Typography variant="h6" fontWeight={700} color="white">
//             Lista de SOTs ({sotsFiltrados.length})
//           </Typography>
//         </Box>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ bgcolor: "grey.100" }}>
//                 <TableCell padding="checkbox">
//                   <Checkbox
//                     indeterminate={
//                       selectedSOTs.length > 0 &&
//                       selectedSOTs.length < sotsFiltrados.length
//                     }
//                     checked={
//                       sotsFiltrados.length > 0 &&
//                       selectedSOTs.length === sotsFiltrados.length
//                     }
//                     onChange={(e) => {
//                       if (e.target.checked) {
//                         setSelectedSOTs(sotsFiltrados.map((s) => s.id));
//                       } else {
//                         setSelectedSOTs([]);
//                       }
//                     }}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <Typography variant="caption" fontWeight={700}>
//                     N° SOT
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   <Typography variant="caption" fontWeight={700}>
//                     Cliente
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   <Typography variant="caption" fontWeight={700}>
//                     Dirección
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   <Typography variant="caption" fontWeight={700}>
//                     Servicio
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   <Typography variant="caption" fontWeight={700}>
//                     Técnico Asignado
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   <Typography variant="caption" fontWeight={700}>
//                     Estado
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="center">
//                   <Typography variant="caption" fontWeight={700}>
//                     Acciones
//                   </Typography>
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {sotsFiltrados.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
//                     <Typography color="text.secondary">
//                       No hay SOTs registrados. Cargue un archivo Excel para comenzar.
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 sotsFiltrados.map((sot) => (
//                   <TableRow key={sot.id} hover>
//                     <TableCell padding="checkbox">
//                       <Checkbox
//                         checked={selectedSOTs.includes(sot.id)}
//                         onChange={() => toggleSOTSelection(sot.id)}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2" fontWeight={600}>
//                         {sot.numeroSOT}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         {sot.fecha}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2">{sot.razonSocial}</Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         {sot.codigoCliente}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2" sx={{ maxWidth: 250 }}>
//                         {sot.direccion}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         {sot.distrito}, {sot.provincia}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="caption" display="block">
//                         {sot.servicioRealizado}
//                       </Typography>
//                       <Chip
//                         label={sot.plataforma}
//                         size="small"
//                         sx={{ mt: 0.5 }}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       {sot.tecnicoAsignado ? (
//                         <Chip
//                           label={sot.tecnicoAsignado}
//                           size="small"
//                           color="info"
//                         />
//                       ) : (
//                         <Typography variant="caption" color="text.secondary">
//                           Sin asignar
//                         </Typography>
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       <Chip
//                         icon={
//                           sot.estado === "completado" ? (
//                             <CheckCircleOutline />
//                           ) : sot.estado === "asignado" ? (
//                             <AssignmentIndOutlined />
//                           ) : (
//                             <PendingOutlined />
//                           )
//                         }
//                         label={
//                           sot.estado === "pendiente"
//                             ? "Pendiente"
//                             : sot.estado === "asignado"
//                             ? "Asignado"
//                             : "Completado"
//                         }
//                         size="small"
//                         color={
//                           sot.estado === "completado"
//                             ? "success"
//                             : sot.estado === "asignado"
//                             ? "info"
//                             : "warning"
//                         }
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <Tooltip title="Eliminar">
//                         <IconButton
//                           size="small"
//                           color="error"
//                           onClick={() => eliminarSOT(sot.id)}
//                         >
//                           <DeleteOutline fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Card>

//       {/* Dialog: Asignar SOTs */}
//       <Dialog
//         open={openAsignar}
//         onClose={() => setOpenAsignar(false)}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <AssignmentIndOutlined color="primary" />
//             <Typography variant="h6" fontWeight={700}>
//               Asignar SOTs a Técnico
//             </Typography>
//           </Box>
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ mt: 2 }}>
//             <Alert severity="info" sx={{ mb: 3 }}>
//               Asignarás {selectedSOTs.length} SOT(s) al técnico seleccionado
//             </Alert>
//             <FormControl fullWidth>
//               <InputLabel>Seleccionar Técnico</InputLabel>
//               <Select
//                 value={tecnicoSeleccionado}
//                 label="Seleccionar Técnico"
//                 onChange={(e) => setTecnicoSeleccionado(e.target.value)}
//               >
//                 {tecnicos
//                   .filter((t) => t.estado === "activo")
//                   .map((tecnico) => (
//                     <MenuItem key={tecnico.id} value={tecnico.id}>
//                       {tecnico.nombre} - {tecnico.contratista} ({tecnico.sotsAsignados}{" "}
//                       SOTs)
//                     </MenuItem>
//                   ))}
//               </Select>
//             </FormControl>
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: 3 }}>
//           <Button onClick={() => setOpenAsignar(false)} sx={{ textTransform: "none" }}>
//             Cancelar
//           </Button>
//           <Button
//             variant="contained"
//             onClick={asignarSOTs}
//             sx={{ textTransform: "none", fontWeight: 600 }}
//           >
//             Asignar
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Dialog: Nuevo Técnico */}
//       <Dialog
//         open={openNuevoTecnico}
//         onClose={() => setOpenNuevoTecnico(false)}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <PersonAddOutlined color="primary" />
//             <Typography variant="h6" fontWeight={700}>
//               Agregar Nuevo Técnico
//             </Typography>
//           </Box>
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
//             <TextField
//               label="Nombre Completo"
//               fullWidth
//               required
//               value={nuevoTecnico.nombre}
//               onChange={(e) =>
//                 setNuevoTecnico({ ...nuevoTecnico, nombre: e.target.value })
//               }
//             />
//             <TextField
//               label="DNI"
//               fullWidth
//               required
//               value={nuevoTecnico.dni}
//               onChange={(e) =>
//                 setNuevoTecnico({ ...nuevoTecnico, dni: e.target.value })
//               }
//             />
//             <TextField
//               label="Contratista"
//               fullWidth
//               value={nuevoTecnico.contratista}
//               onChange={(e) =>
//                 setNuevoTecnico({ ...nuevoTecnico, contratista: e.target.value })
//               }
//             />
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: 3 }}>
//           <Button
//             onClick={() => setOpenNuevoTecnico(false)}
//             sx={{ textTransform: "none" }}
//           >
//             Cancelar
//           </Button>
//           <Button
//             variant="contained"
//             onClick={agregarTecnico}
//             sx={{ textTransform: "none", fontWeight: 600 }}
//           >
//             Agregar
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }