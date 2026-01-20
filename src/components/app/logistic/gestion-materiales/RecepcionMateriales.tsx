// // "use client";

// // import { useState } from "react";
// // import {
// //   Box,
// //   Card,
// //   Typography,
// //   TextField,
// //   Button,
// //   Divider,
// //   Alert,
// //   Fade,
// //   Grow,
// //   Checkbox,
// //   FormControlLabel,
// //   Chip,
// // } from "@mui/material";
// // import {
// //   InventoryOutlined,
// //   CloudUploadOutlined,
// //   CheckCircleOutline,
// //   BuildOutlined,
// //   CategoryOutlined,
// //   WarningAmberOutlined,
// //   HistoryOutlined,
// // } from "@mui/icons-material";
// // import { TitleCard } from "@/src/components/base/TitleCard";
// // import { SectionHeader } from "@/src/components/base/SectionHeader";
// // import { FileUploader } from "@/src/components/base/FileUploader";
// // import CustomDataGrid from "@/src/components/base/CustomDataGrid";
// // import { GridColDef } from "@mui/x-data-grid";
// // import SelectBase from "@/src/components/base/SelectBase";

// // interface RecepcionStats {
// //   herramientas: number;
// //   equipamiento: number;
// //   material: number;
// // }

// // interface RecepcionHistorial {
// //   id: number;
// //   solicitud: string;
// //   fechaRecepcion: string;
// //   codigoDocumento: string;
// //   proveedor: string;
// //   cantidadItems: number;
// //   estado: string;
// // }

// // export default function RecepcionMateriales() {
// //   const [solicitud, setSolicitud] = useState("");
// //   const [fechaRecepcion, setFechaRecepcion] = useState("");
// //   const [codigoDocumento, setCodigoDocumento] = useState("");
// //   const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(
// //     null
// //   );
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const [processComplete, setProcessComplete] = useState(false);
// //   const [recepcionStats, setRecepcionStats] = useState<RecepcionStats | null>(
// //     null
// //   );
// //   const [confirmarCarga, setConfirmarCarga] = useState(false);
// //   const [search, setSearch] = useState("");

// //   // Datos de ejemplo para el historial
// //   const [historialRows] = useState<RecepcionHistorial[]>([
// //     {
// //       id: 1,
// //       solicitud: "SOL-001",
// //       fechaRecepcion: "20/12/2024",
// //       codigoDocumento: "DOC-2024-001",
// //       proveedor: "LEMCORP",
// //       cantidadItems: 45,
// //       estado: "Confirmado",
// //     },
// //     {
// //       id: 2,
// //       solicitud: "SOL-002",
// //       fechaRecepcion: "19/12/2024",
// //       codigoDocumento: "DOC-2024-002",
// //       proveedor: "LEMCORP",
// //       cantidadItems: 28,
// //       estado: "Pendiente",
// //     },
// //     {
// //       id: 3,
// //       solicitud: "SOL-003",
// //       fechaRecepcion: "18/12/2024",
// //       codigoDocumento: "DOC-2024-003",
// //       proveedor: "LEMCORP",
// //       cantidadItems: 67,
// //       estado: "Confirmado",
// //     },
// //   ]);

// //   // Columnas para el DataGrid
// //   const columns: GridColDef[] = [
// //     {
// //       field: "solicitud",
// //       headerName: "Solicitud",
// //       width: 120,
// //       renderCell: (params) => (
// //         <Typography variant="body2" fontWeight={600} color="primary">
// //           {params.value}
// //         </Typography>
// //       ),
// //     },
// //     {
// //       field: "fechaRecepcion",
// //       headerName: "Fecha Recepción",
// //       width: 150,
// //     },
// //     {
// //       field: "codigoDocumento",
// //       headerName: "Código Documento",
// //       minWidth: 160,
// //       flex: 1,
// //     },
// //     {
// //       field: "proveedor",
// //       headerName: "Proveedor",
// //       width: 130,
// //       renderCell: (params) => (
// //         <Chip
// //           label={params.value}
// //           size="small"
// //           color="info"
// //           sx={{ fontWeight: 600 }}
// //         />
// //       ),
// //     },
// //     {
// //       field: "cantidadItems",
// //       headerName: "Cantidad Items",
// //       width: 140,
// //       align: "center",
// //       headerAlign: "center",
// //     },
// //     {
// //       field: "estado",
// //       headerName: "Estado",
// //       width: 130,
// //       renderCell: (params) => (
// //         <Chip
// //           label={params.value}
// //           size="small"
// //           color={params.value === "Confirmado" ? "success" : "warning"}
// //           sx={{ fontWeight: 600 }}
// //         />
// //       ),
// //     },
// //   ];

// //   const handleFileSelect = (file: File) => {
// //     console.log("Archivo seleccionado:", file);
// //     setArchivoSeleccionado(file);
// //   };

// //   const handleError = (error: string) => {
// //     console.log("Error:", error);
// //   };

// //   const handleSubirArchivo = () => {
// //     if (!archivoSeleccionado) {
// //       alert("Por favor selecciona un archivo primero");
// //       return;
// //     }

// //     setIsProcessing(true);
// //     setProcessComplete(false);

// //     // Simular procesamiento de 60 segundos
// //     setTimeout(() => {
// //       setIsProcessing(false);
// //       setProcessComplete(true);

// //       // Datos de ejemplo del resultado
// //       setRecepcionStats({
// //         herramientas: 15,
// //         equipamiento: 8,
// //         material: 42,
// //       });
// //     }, 5000); // 60 segundos
// //   };

// //   const handleConfirmarCarga = () => {
// //     if (!confirmarCarga) {
// //       alert("Por favor confirma que deseas realizar la carga");
// //       return;
// //     }

// //     console.log("Confirmando recepción de materiales...", {
// //       solicitud,
// //       fechaRecepcion,
// //       codigoDocumento,
// //       stats: recepcionStats,
// //     });

// //     // Aquí iría la lógica para confirmar la recepción
// //     alert("Recepción de materiales confirmada exitosamente");

// //     // Limpiar formulario
// //     setSolicitud("");
// //     setFechaRecepcion("");
// //     setCodigoDocumento("");
// //     setArchivoSeleccionado(null);
// //     setProcessComplete(false);
// //     setRecepcionStats(null);
// //     setConfirmarCarga(false);
// //   };

// //   const getTotalItems = () => {
// //     if (!recepcionStats) return 0;
// //     return (
// //       recepcionStats.herramientas +
// //       recepcionStats.equipamiento +
// //       recepcionStats.material
// //     );
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         maxWidth: 1200,
// //         mx: "auto",
// //         p: 3,
// //         display: "flex",
// //         flexDirection: "column",
// //         gap: 3,
// //       }}
// //     >
// //       {/* Título Principal */}
// //       <TitleCard
// //         icon={<InventoryOutlined sx={{ fontSize: 32 }} />}
// //         title="Recepción de Materiales"
// //         description="Gestión de entrada de materiales, equipos y herramientas provenientes de LEMCORP (operador logístico de CLARO)"
// //       />

// //       {/* Formulario de Recepción */}
// //       <Card
// //         elevation={3}
// //         sx={{
// //           borderRadius: 4,
// //           boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
// //           p: 4,
// //         }}
// //       >
// //         <SectionHeader
// //           icon={
// //             <InventoryOutlined sx={{ fontSize: 28, color: "primary.main" }} />
// //           }
// //           title="Recepción de Materiales"
// //           subtitle="Registra los datos de la entrega proveniente de LEMCORP"
// //         />

// //         {/* Datos de Recepción */}
// //         <Box
// //           sx={{
// //             display: "flex",
// //             gap: 2,
// //             mb: 3,
// //             flexWrap: "wrap",
// //           }}
// //         >
// //           <Box sx={{ flex: "1 1 200px" }}>
// //             <Typography
// //               variant="body2"
// //               color="text.secondary"
// //               fontWeight={600}
// //               mb={1}
// //             >
// //               Solicitud
// //             </Typography>
// //             <SelectBase
// //               options={[
// //                 {
// //                   label: "SOL-001",
// //                   value: "SOL-001",
// //                 },
// //                 {
// //                   label: "SOL-002",
// //                   value: "SOL-002",
// //                 },
// //               ]}
// //               label={""}
// //               value={solicitud}
// //               onChange={(e:any)=>{
// //                 
// //                 setSolicitud(e)}}
// //             />
// //             {/* <TextField
// //               fullWidth
// //               placeholder="Selecciona solicitud a abastecer"
// //               value={solicitud}
// //               onChange={(e) => setSolicitud(e.target.value)}
// //               size="small"
// //             /> */}
// //           </Box>

// //           <Box sx={{ flex: "1 1 200px" }}>
// //             <Typography
// //               variant="body2"
// //               color="text.secondary"
// //               fontWeight={600}
// //               mb={1}
// //             >
// //               Fecha de Recepción
// //             </Typography>
// //             <TextField
// //               type="date"
// //               fullWidth
// //               value={fechaRecepcion}
// //               onChange={(e) => setFechaRecepcion(e.target.value)}
// //               size="small"
// //               InputLabelProps={{ shrink: true }}
// //             />
// //           </Box>

// //           <Box sx={{ flex: "1 1 200px" }}>
// //             <Typography
// //               variant="body2"
// //               color="text.secondary"
// //               fontWeight={600}
// //               mb={1}
// //             >
// //               Código Documento
// //             </Typography>
// //             <TextField
// //               fullWidth
// //               placeholder="Guía de remision emitida"
// //               value={codigoDocumento}
// //               onChange={(e) => setCodigoDocumento(e.target.value)}
// //               size="small"
// //             />
// //           </Box>
// //         </Box>

// //         <Divider sx={{ my: 3 }} />

// //         {/* Sección de Importar Archivo Excel */}
// //         <SectionHeader
// //           icon={
// //             <CloudUploadOutlined sx={{ fontSize: 24, color: "info.main" }} />
// //           }
// //           title="Importar Archivo Excel"
// //           subtitle=""
// //         />

// //         <Box
// //           sx={{
// //             border: "2px dashed",
// //             borderColor: "divider",
// //             borderRadius: 3,
// //             p: 3,
// //             bgcolor: "background.default",
// //             mb: 3,
// //           }}
// //         >
// //           <FileUploader
// //             accept=".xlsx"
// //             maxSize={10}
// //             onFileSelect={handleFileSelect}
// //             onError={handleError}
// //           />

// //           <Typography
// //             variant="caption"
// //             color="text.secondary"
// //             display="block"
// //             mt={2}
// //             textAlign="center"
// //             sx={{ fontStyle: "italic" }}
// //           >
// //             Sube archivo excel con formato establecido
// //           </Typography>

// //           {archivoSeleccionado && (
// //             <Fade in={true} timeout={600}>
// //               <Box sx={{ mt: 3, textAlign: "center" }}>
// //                 <Button
// //                   variant="contained"
// //                   size="large"
// //                   startIcon={<CloudUploadOutlined />}
// //                   onClick={handleSubirArchivo}
// //                   disabled={isProcessing}
// //                   sx={{
// //                     px: 4,
// //                     py: 1.5,
// //                     textTransform: "none",
// //                     fontWeight: 600,
// //                   }}
// //                 >
// //                   Subir Archivo
// //                 </Button>
// //               </Box>
// //             </Fade>
// //           )}
// //         </Box>

// //         {/* Progress Bar con animación de stripes */}
// //         {isProcessing && (
// //           <Fade in={isProcessing} timeout={600}>
// //             <Box sx={{ mb: 3 }}>
// //               <Box
// //                 sx={{
// //                   display: "flex",
// //                   justifyContent: "space-between",
// //                   alignItems: "center",
// //                   mb: 1.5,
// //                 }}
// //               >
// //                 <Typography variant="body1" fontWeight={500} color="primary">
// //                   Procesando archivo de recepción...
// //                 </Typography>
// //               </Box>
// //               <Box
// //                 sx={{
// //                   position: "relative",
// //                   height: 12,
// //                   borderRadius: 2,
// //                   overflow: "hidden",
// //                   bgcolor: "#e3f2fd",
// //                   border: "1px solid #90caf9",
// //                 }}
// //               >
// //                 <Box
// //                   sx={{
// //                     position: "absolute",
// //                     top: 0,
// //                     left: 0,
// //                     right: 0,
// //                     bottom: 0,
// //                     background: `repeating-linear-gradient(
// //                       45deg,
// //                       #1976d2,
// //                       #1976d2 20px,
// //                       #42a5f5 20px,
// //                       #42a5f5 40px
// //                     )`,
// //                     backgroundSize: "200% 100%",
// //                     animation: "stripeAnimation 2s linear infinite",
// //                     "@keyframes stripeAnimation": {
// //                       "0%": {
// //                         backgroundPosition: "0 0",
// //                       },
// //                       "100%": {
// //                         backgroundPosition: "56.57px 0",
// //                       },
// //                     },
// //                   }}
// //                 />
// //               </Box>
// //               <Typography
// //                 variant="caption"
// //                 color="text.secondary"
// //                 sx={{ display: "block", mt: 1, textAlign: "center" }}
// //               >
// //                 Una vez procesado mostrará mensaje de confirmación...
// //               </Typography>
// //             </Box>
// //           </Fade>
// //         )}

// //         {/* Resultados del Procesamiento */}
// //         {processComplete && recepcionStats && (
// //           <Grow in={processComplete} timeout={800}>
// //             <Box>
// //               {/* Alert de Éxito */}
// //               <Alert
// //                 severity="success"
// //                 icon={<CheckCircleOutline fontSize="large" />}
// //                 sx={{
// //                   mb: 3,
// //                   borderRadius: 2,
// //                   boxShadow: "rgba(46, 125, 50, 0.15) 0px 4px 16px",
// //                 }}
// //               >
// //                 <Typography variant="body1" fontWeight={600}>
// //                   ¡Archivo procesado exitosamente!
// //                 </Typography>
// //                 <Typography variant="body2">
// //                   Se encontraron {getTotalItems()} ítems en el documento de
// //                   recepción.
// //                 </Typography>
// //               </Alert>

// //               {/* Estadísticas de Items */}
// //               <Box sx={{ mb: 3 }}>
// //                 <Typography
// //                   variant="h6"
// //                   fontWeight={600}
// //                   mb={2}
// //                   sx={{ display: "flex", alignItems: "center", gap: 1 }}
// //                 >
// //                   <InventoryOutlined color="primary" />
// //                   Resumen de ítems recibidos
// //                 </Typography>

// //                 <Box
// //                   sx={{
// //                     display: "flex",
// //                     gap: 3,
// //                     flexWrap: "wrap",
// //                     justifyContent: "space-between",
// //                   }}
// //                 >
// //                   {/* Herramientas */}
// //                   <Fade in={processComplete} timeout={1000}>
// //                     <Box sx={{ flex: "1 1 250px", minWidth: 200 }}>
// //                       <Card
// //                         sx={{
// //                           p: 2.5,
// //                           textAlign: "center",
// //                           bgcolor: "primary.50",
// //                           border: "2px solid",
// //                           borderColor: "primary.main",
// //                           borderRadius: 2,
// //                           transition: "all 0.3s ease",
// //                           height: "100%",
// //                           "&:hover": {
// //                             transform: "translateY(-4px)",
// //                             boxShadow: "rgba(25, 118, 210, 0.3) 0px 8px 24px",
// //                           },
// //                         }}
// //                       >
// //                         <BuildOutlined
// //                           sx={{ fontSize: 40, color: "primary.main", mb: 1.5 }}
// //                         />
// //                         <Typography
// //                           variant="h4"
// //                           fontWeight={700}
// //                           color="primary.main"
// //                           gutterBottom
// //                         >
// //                           {recepcionStats.herramientas}
// //                         </Typography>
// //                         <Chip
// //                           label="Herramientas"
// //                           color="primary"
// //                           size="small"
// //                           sx={{ fontWeight: 600 }}
// //                         />
// //                       </Card>
// //                     </Box>
// //                   </Fade>

// //                   {/* Equipamiento */}
// //                   <Fade in={processComplete} timeout={1200}>
// //                     <Box sx={{ flex: "1 1 250px", minWidth: 200 }}>
// //                       <Card
// //                         sx={{
// //                           p: 2.5,
// //                           textAlign: "center",
// //                           bgcolor: "success.50",
// //                           border: "2px solid",
// //                           borderColor: "success.main",
// //                           borderRadius: 2,
// //                           transition: "all 0.3s ease",
// //                           height: "100%",
// //                           "&:hover": {
// //                             transform: "translateY(-4px)",
// //                             boxShadow: "rgba(46, 125, 50, 0.3) 0px 8px 24px",
// //                           },
// //                         }}
// //                       >
// //                         <CategoryOutlined
// //                           sx={{ fontSize: 40, color: "success.main", mb: 1.5 }}
// //                         />
// //                         <Typography
// //                           variant="h4"
// //                           fontWeight={700}
// //                           color="success.main"
// //                           gutterBottom
// //                         >
// //                           {recepcionStats.equipamiento}
// //                         </Typography>
// //                         <Chip
// //                           label="Equipamiento"
// //                           color="success"
// //                           size="small"
// //                           sx={{ fontWeight: 600 }}
// //                         />
// //                       </Card>
// //                     </Box>
// //                   </Fade>

// //                   {/* Material */}
// //                   <Fade in={processComplete} timeout={1400}>
// //                     <Box sx={{ flex: "1 1 250px", minWidth: 200 }}>
// //                       <Card
// //                         sx={{
// //                           p: 2.5,
// //                           textAlign: "center",
// //                           bgcolor: "warning.50",
// //                           border: "2px solid",
// //                           borderColor: "warning.main",
// //                           borderRadius: 2,
// //                           transition: "all 0.3s ease",
// //                           height: "100%",
// //                           "&:hover": {
// //                             transform: "translateY(-4px)",
// //                             boxShadow: "rgba(237, 108, 2, 0.3) 0px 8px 24px",
// //                           },
// //                         }}
// //                       >
// //                         <InventoryOutlined
// //                           sx={{ fontSize: 40, color: "warning.main", mb: 1.5 }}
// //                         />
// //                         <Typography
// //                           variant="h4"
// //                           fontWeight={700}
// //                           color="warning.main"
// //                           gutterBottom
// //                         >
// //                           {recepcionStats.material}
// //                         </Typography>
// //                         <Chip
// //                           label="Material"
// //                           color="warning"
// //                           size="small"
// //                           sx={{ fontWeight: 600 }}
// //                         />
// //                       </Card>
// //                     </Box>
// //                   </Fade>
// //                 </Box>
// //               </Box>

// //               <Divider sx={{ my: 3 }} />

// //               {/* Confirmación de Carga */}
// //               <Box>
// //                 <SectionHeader
// //                     iconBgColor="#ffa500"
// //                   icon={
// //                     <WarningAmberOutlined
// //                       sx={{ fontSize: 24, color: "#ffff" }}
// //                     />
// //                   }
// //                   title="Confirmación de Carga"
// //                   subtitle=""
// //                 />

// //                 <Box
// //                   sx={{
// //                     display: "flex",
// //                     flexDirection: "column",
// //                     gap: 2,
// //                     mt: 2,
// //                   }}
// //                 >
// //                   <FormControlLabel
// //                     control={
// //                       <Checkbox
// //                         checked={confirmarCarga}
// //                         onChange={(e) => setConfirmarCarga(e.target.checked)}
// //                         color="primary"
// //                       />
// //                     }
// //                     label={
// //                       <Typography variant="body2">
// //                         ¿Estás seguro de realizar la carga?
// //                       </Typography>
// //                     }
// //                   />

// //                   <Typography
// //                     variant="caption"
// //                     color="text.secondary"
// //                     sx={{ fontStyle: "italic", ml: 4 }}
// //                   >
// //                     Se registra la recepción de materiales como tipo de
// //                     movimiento: ENTRADA/ACOPIO
// //                   </Typography>

// //                   <Box
// //                     sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
// //                   >
// //                     <Button
// //                       variant="contained"
// //                       size="large"
// //                       onClick={handleConfirmarCarga}
// //                       disabled={!confirmarCarga}
// //                       sx={{
// //                         px: 4,
// //                         py: 1.5,
// //                         textTransform: "none",
// //                         fontWeight: 600,
// //                       }}
// //                     >
// //                       Confirmar
// //                     </Button>
// //                   </Box>
// //                 </Box>
// //               </Box>
// //             </Box>
// //           </Grow>
// //         )}
// //       </Card>

// //       {/* Historial de Recepciones */}
// //       <Card
// //         elevation={3}
// //         sx={{
// //           borderRadius: 4,
// //           boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
// //           p: 4,
// //         }}
// //       >
// //         <SectionHeader
// //           icon={<HistoryOutlined sx={{ fontSize: 28, color: "info.main" }} />}
// //           title="Historial de Recepciones"
// //           subtitle="Registro de todas las recepciones de materiales realizadas"
// //         />

// //         <Divider sx={{ my: 3 }} />

// //         <CustomDataGrid
// //           columns={columns}
// //           localRows={historialRows}
// //           serverSide={false}
// //           search={search}
// //           onSearch={setSearch}
// //           pageSize={10}
// //           checkboxSelection={false}
// //           onView={(row) => {
// //             console.log("Ver detalles:", row);
// //             alert(`Ver detalles de: ${row.solicitud}`);
// //           }}
// //         />
// //       </Card>
// //     </Box>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import {
//   Box,
//   Card,
//   Typography,
//   TextField,
//   Button,
//   Divider,
//   Alert,
//   Fade,
//   Grow,
//   Checkbox,
//   FormControlLabel,
//   Chip,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
// import {
//   InventoryOutlined,
//   CloudUploadOutlined,
//   CheckCircleOutline,
//   BuildOutlined,
//   CategoryOutlined,
//   WarningAmberOutlined,
//   HistoryOutlined,
//   EditOutlined,
//   CheckOutlined,
//   CloseOutlined,
//   PictureAsPdfOutlined,
//   ImageOutlined,
// } from "@mui/icons-material";
// import { TitleCard } from "@/src/components/base/TitleCard";
// import { SectionHeader } from "@/src/components/base/SectionHeader";
// import { FileUploader } from "@/src/components/base/FileUploader";
// import CustomDataGrid from "@/src/components/base/CustomDataGrid";
// import { GridColDef } from "@mui/x-data-grid";
// import SelectBase from "@/src/components/base/SelectBase";

// type CategoriaItem = "MATERIAL" | "HERRAMIENTA" | "EQUIPO";

// interface ItemSolicitud {
//   id: string;
//   categoria: CategoriaItem;
//   codigo: string;
//   descripcion: string;
//   cantidadSolicitada: number;
//   cantidadRecibida: number;
//   unidadMedida: string;
//   observacion?: string;
// }

// interface RecepcionHistorial {
//   id: number;
//   solicitud: string;
//   fechaRecepcion: string;
//   codigoDocumento: string;
//   proveedor: string;
//   cantidadItems: number;
//   estado: string;
// }

// interface SolicitudData {
//   codigo: string;
//   entidad: "CLARO" | "LEMCORP";
//   region: string;
//   items: ItemSolicitud[];
// }

// const categoriaConfig = {
//   MATERIAL: {
//     label: "Material",
//     color: "#ed6c02",
//     icon: "📦",
//   },
//   HERRAMIENTA: {
//     label: "Herramienta",
//     color: "#1976d2",
//     icon: "🔧",
//   },
//   EQUIPO: {
//     label: "Equipo",
//     color: "#2e7d32",
//     icon: "⚙️",
//   },
// };

// // Datos de ejemplo de solicitudes
// const solicitudesDisponibles: SolicitudData[] = [
//   // {
//   //   codigo: "SOL-001",
//   //   entidad: "CLARO",
//   //   region: "Lima",
//   //   items: [
//   //     {
//   //       id: "1",
//   //       categoria: "MATERIAL",
//   //       codigo: "1003101",
//   //       descripcion: "CABLE COAXIAL RG-6 AUTOSOPORTADO",
//   //       cantidadSolicitada: 100,
//   //       cantidadRecibida: 0,
//   //       unidadMedida: "Metro (M)",
//   //     },
//   //     {
//   //       id: "2",
//   //       categoria: "MATERIAL",
//   //       codigo: "4070918",
//   //       descripcion: "CABLE FASTCONNECT DROP 14138979 220M",
//   //       cantidadSolicitada: 45,
//   //       cantidadRecibida: 0,
//   //       unidadMedida: "Rollo (RLL)",
//   //     },
//   //     {
//   //       id: "3",
//   //       categoria: "HERRAMIENTA",
//   //       codigo: "H-001",
//   //       descripcion: "ALICATE DE COMPRESIÓN",
//   //       cantidadSolicitada: 5,
//   //       cantidadRecibida: 0,
//   //       unidadMedida: "Unidad (UND)",
//   //     },
//   //     {
//   //       id: "4",
//   //       categoria: "EQUIPO",
//   //       codigo: "E-001",
//   //       descripcion: "ROUTER WIFI 6 DUAL BAND",
//   //       cantidadSolicitada: 20,
//   //       cantidadRecibida: 0,
//   //       unidadMedida: "Unidad (UND)",
//   //     },
//   //   ],
//   // },
//   {
//     codigo: "SOL-002",
//     entidad: "LEMCORP",
//     region: "Arequipa",
//     items: [
//       {
//         id: "5",
//         categoria: "MATERIAL",
//         codigo: "M-005",
//         descripcion: "FIBRA ÓPTICA MONOMODO 12 HILOS",
//         cantidadSolicitada: 500,
//         cantidadRecibida: 0,
//         unidadMedida: "Metro (M)",
//       },
//       {
//         id: "6",
//         categoria: "EQUIPO",
//         codigo: "E-010",
//         descripcion: "ONT GPON DUAL BAND",
//         cantidadSolicitada: 30,
//         cantidadRecibida: 0,
//         unidadMedida: "Unidad (UND)",
//       },
//     ],
//   },
// ];

// export default function RecepcionMateriales() {
//   const [solicitudSeleccionada, setSolicitudSeleccionada] = useState("");
//   const [fechaRecepcion, setFechaRecepcion] = useState("");
//   const [codigoDocumento, setCodigoDocumento] = useState("");
//   const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(
//     null
//   );
//   const [itemsSolicitud, setItemsSolicitud] = useState<ItemSolicitud[]>([]);
//   const [itemsEditando, setItemsEditando] = useState<Set<string>>(new Set());
//   const [confirmarCarga, setConfirmarCarga] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [search, setSearch] = useState("");

//   // Datos de ejemplo para el historial
//   const [historialRows] = useState<RecepcionHistorial[]>([
//     {
//       id: 1,
//       solicitud: "SOL-001",
//       fechaRecepcion: "20/12/2024",
//       codigoDocumento: "GR-2024-001",
//       proveedor: "LEMCORP",
//       cantidadItems: 45,
//       estado: "Confirmado",
//     },
//     {
//       id: 2,
//       solicitud: "SOL-002",
//       fechaRecepcion: "19/12/2024",
//       codigoDocumento: "GR-2024-002",
//       proveedor: "LEMCORP",
//       cantidadItems: 28,
//       estado: "Pendiente",
//     },
//   ]);

//   // Columnas para el DataGrid
//   const columns: GridColDef[] = [
//     {
//       field: "solicitud",
//       headerName: "Solicitud",
//       width: 120,
//       renderCell: (params) => (
//         <Typography variant="body2" fontWeight={600} color="primary">
//           {params.value}
//         </Typography>
//       ),
//     },
//     {
//       field: "fechaRecepcion",
//       headerName: "Fecha Recepción",
//       width: 150,
//     },
//     {
//       field: "codigoDocumento",
//       headerName: "Código Documento",
//       minWidth: 160,
//       flex: 1,
//     },
//     {
//       field: "proveedor",
//       headerName: "Proveedor",
//       width: 130,
//       renderCell: (params) => (
//         <Chip
//           label={params.value}
//           size="small"
//           color="info"
//           sx={{ fontWeight: 600 }}
//         />
//       ),
//     },
//     {
//       field: "cantidadItems",
//       headerName: "Cantidad Items",
//       width: 140,
//       align: "center",
//       headerAlign: "center",
//     },
//     {
//       field: "estado",
//       headerName: "Estado",
//       width: 130,
//       renderCell: (params) => (
//         <Chip
//           label={params.value}
//           size="small"
//           color={params.value === "Confirmado" ? "success" : "warning"}
//           sx={{ fontWeight: 600 }}
//         />
//       ),
//     },
//   ];

//   // Cargar items cuando se selecciona una solicitud
//   useEffect(() => {
//     if (solicitudSeleccionada) {
//       const solicitud = solicitudesDisponibles.find(
//         (s) => s.codigo === solicitudSeleccionada
//       );
//       if (solicitud) {
//         // Resetear cantidades recibidas
//         const itemsConCantidadesReset = solicitud.items.map((item) => ({
//           ...item,
//           cantidadRecibida: item.cantidadSolicitada, // Por defecto, igual a lo solicitado
//         }));
//         setItemsSolicitud(itemsConCantidadesReset);
//       }
//     } else {
//       setItemsSolicitud([]);
//     }
//   }, [solicitudSeleccionada]);

//   const handleFileSelect = (file: File) => {
//     console.log("Archivo seleccionado:", file);
//     setArchivoSeleccionado(file);
//   };

//   const handleError = (error: string) => {
//     console.log("Error:", error);
//     alert(error);
//   };

//   const toggleEdicionItem = (itemId: string) => {
//     const nuevosEditando = new Set(itemsEditando);
//     if (nuevosEditando.has(itemId)) {
//       nuevosEditando.delete(itemId);
//     } else {
//       nuevosEditando.add(itemId);
//     }
//     setItemsEditando(nuevosEditando);
//   };

//   const actualizarCantidadRecibida = (itemId: string, cantidad: number) => {
//     setItemsSolicitud(
//       itemsSolicitud.map((item) =>
//         item.id === itemId ? { ...item, cantidadRecibida: cantidad } : item
//       )
//     );
//   };

//   const handleConfirmarRecepcion = () => {
//     if (!confirmarCarga) {
//       alert("Por favor confirma que deseas realizar la carga");
//       return;
//     }

//     if (!archivoSeleccionado) {
//       alert("Por favor adjunta la guía de remisión");
//       return;
//     }

//     console.log("Confirmando recepción de materiales...", {
//       solicitud: solicitudSeleccionada,
//       fechaRecepcion,
//       codigoDocumento,
//       items: itemsSolicitud,
//       archivoGuia: archivoSeleccionado,
//     });

//     setShowSuccess(true);

//     // Limpiar formulario después de 3 segundos
//     setTimeout(() => {
//       setShowSuccess(false);
//       setSolicitudSeleccionada("");
//       setFechaRecepcion("");
//       setCodigoDocumento("");
//       setArchivoSeleccionado(null);
//       setItemsSolicitud([]);
//       setConfirmarCarga(false);
//       setItemsEditando(new Set());
//     }, 3000);
//   };

//   const getItemsPorCategoria = (categoria: CategoriaItem) => {
//     return itemsSolicitud.filter((item) => item.categoria === categoria);
//   };

//   const getTotalItemsRecibidos = () => {
//     return itemsSolicitud.reduce(
//       (sum, item) => sum + item.cantidadRecibida,
//       0
//     );
//   };

//   const getTotalItemsSolicitados = () => {
//     return itemsSolicitud.reduce(
//       (sum, item) => sum + item.cantidadSolicitada,
//       0
//     );
//   };

//   const renderItemsPorCategoria = (categoria: CategoriaItem) => {
//     const itemsCategoria = getItemsPorCategoria(categoria);
//     const config = categoriaConfig[categoria];

//     if (itemsCategoria.length === 0) return null;

//     return (
//       <Box key={categoria} sx={{ mb: 4 }}>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//             mb: 2,
//             pb: 1,
//             borderBottom: "2px solid",
//             borderColor: config.color,
//           }}
//         >
//           <Typography variant="h6" fontWeight={600} sx={{ color: config.color }}>
//             {config.icon} {config.label}
//           </Typography>
//           <Chip
//             label={`${itemsCategoria.length} items`}
//             size="small"
//             sx={{
//               bgcolor: config.color,
//               color: "white",
//               fontWeight: 600,
//             }}
//           />
//         </Box>

//         <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//           {itemsCategoria.map((item, index) => {
//             const estaEditando = itemsEditando.has(item.id);
//             const cantidadCompleta =
//               item.cantidadRecibida === item.cantidadSolicitada;
//             const cantidadParcial =
//               item.cantidadRecibida > 0 &&
//               item.cantidadRecibida < item.cantidadSolicitada;

//             return (
//               <Grow key={item.id} in={true} timeout={300 + index * 100}>
//                 <Card
//                   sx={{
//                     p: 2.5,
//                     border: "2px solid",
//                     borderColor: `${config.color}30`,
//                     // borderLeft: "4px solid",
//                     // borderLeftColor: config.color,
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       boxShadow: `0 4px 12px ${config.color}40`,
//                       transform: "translateX(4px)",
//                     },
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "flex-start",
//                       gap: 2,
//                     }}
//                   >
//                     <Box sx={{ flex: 1 }}>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 1,
//                           mb: 1,
//                         }}
//                       >
//                         <Chip
//                           label={item.codigo}
//                           size="small"
//                           sx={{
//                             bgcolor: config.color,
//                             color: "white",
//                             fontWeight: 600,
//                           }}
//                         />
//                         {cantidadCompleta && (
//                           <Chip
//                             label="Completo"
//                             size="small"
//                             color="success"
//                             icon={<CheckCircleOutline />}
//                           />
//                         )}
//                         {cantidadParcial && (
//                           <Chip
//                             label="Parcial"
//                             size="small"
//                             color="warning"
//                             icon={<WarningAmberOutlined />}
//                           />
//                         )}
//                       </Box>

//                       <Typography
//                         variant="body1"
//                         fontWeight={600}
//                         gutterBottom
//                         sx={{ color: "text.primary" }}
//                       >
//                         {item.descripcion}
//                       </Typography>

//                       <Box
//                         sx={{
//                           display: "flex",
//                           gap: 3,
//                           mt: 2,
//                           flexWrap: "wrap",
//                         }}
//                       >
//                         <Box>
//                           <Typography
//                             variant="caption"
//                             color="text.secondary"
//                             display="block"
//                           >
//                             Cantidad Solicitada
//                           </Typography>
//                           <Typography variant="h6" fontWeight={600}>
//                             {item.cantidadSolicitada}{" "}
//                             <Typography
//                               component="span"
//                               variant="caption"
//                               color="text.secondary"
//                             >
//                               {item.unidadMedida}
//                             </Typography>
//                           </Typography>
//                         </Box>

//                         <Box>
//                           <Typography
//                             variant="caption"
//                             color="text.secondary"
//                             display="block"
//                           >
//                             Cantidad Recibida
//                           </Typography>
//                           {estaEditando ? (
//                             <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
//                               <TextField
//                                 type="number"
//                                 size="small"
//                                 value={item.cantidadRecibida}
//                                 onChange={(e) =>
//                                   actualizarCantidadRecibida(
//                                     item.id,
//                                     parseInt(e.target.value) || 0
//                                   )
//                                 }
//                                 inputProps={{
//                                   min: 0,
//                                   max: item.cantidadSolicitada,
//                                 }}
//                                 sx={{ width: 100 }}
//                               />
//                               <IconButton
//                                 size="small"
//                                 color="success"
//                                 onClick={() => toggleEdicionItem(item.id)}
//                               >
//                                 <CheckOutlined />
//                               </IconButton>
//                             </Box>
//                           ) : (
//                             <Typography
//                               variant="h6"
//                               fontWeight={600}
//                               sx={{
//                                 color: cantidadCompleta
//                                   ? "success.main"
//                                   : cantidadParcial
//                                   ? "warning.main"
//                                   : "error.main",
//                               }}
//                             >
//                               {item.cantidadRecibida}{" "}
//                               <Typography
//                                 component="span"
//                                 variant="caption"
//                                 color="text.secondary"
//                               >
//                                 {item.unidadMedida}
//                               </Typography>
//                             </Typography>
//                           )}
//                         </Box>

//                         {item.cantidadRecibida !== item.cantidadSolicitada && (
//                           <Box>
//                             <Typography
//                               variant="caption"
//                               color="text.secondary"
//                               display="block"
//                             >
//                               Diferencia
//                             </Typography>
//                             <Typography
//                               variant="h6"
//                               fontWeight={600}
//                               color="error"
//                             >
//                               {item.cantidadSolicitada - item.cantidadRecibida}{" "}
//                               <Typography
//                                 component="span"
//                                 variant="caption"
//                                 color="text.secondary"
//                               >
//                                 {item.unidadMedida}
//                               </Typography>
//                             </Typography>
//                           </Box>
//                         )}
//                       </Box>
//                     </Box>

//                     <Tooltip title={estaEditando ? "Guardar" : "Editar cantidad"}>
//                       <IconButton
//                         color={estaEditando ? "success" : "primary"}
//                         onClick={() => toggleEdicionItem(item.id)}
//                         sx={{
//                           bgcolor: estaEditando ? "success.lighter" : "primary.lighter",
//                           "&:hover": {
//                             bgcolor: estaEditando ? "success.light" : "primary.light",
//                           },
//                         }}
//                       >
//                         {estaEditando ? <CheckOutlined /> : <EditOutlined />}
//                       </IconButton>
//                     </Tooltip>
//                   </Box>
//                 </Card>
//               </Grow>
//             );
//           })}
//         </Box>
//       </Box>
//     );
//   };

//   const solicitud = solicitudesDisponibles.find(
//     (s) => s.codigo === solicitudSeleccionada
//   );

//   return (
//     <Box
//       sx={{
//         maxWidth: 1200,
//         mx: "auto",
//         p: 3,
//         display: "flex",
//         flexDirection: "column",
//         gap: 3,
//       }}
//     >
//       {/* Título Principal */}
//       <TitleCard
//         icon={<InventoryOutlined sx={{ fontSize: 32 }} />}
//         title="Recepción de Materiales"
//         description="Gestión de entrada de materiales, equipos y herramientas provenientes del proveedor logístico"
//       />

//       {/* Mensaje de Éxito Global */}
//       {showSuccess && (
//         <Fade in={showSuccess} timeout={600}>
//           <Alert
//             severity="success"
//             icon={<CheckCircleOutline fontSize="large" />}
//             sx={{
//               borderRadius: 3,
//               boxShadow: "rgba(46, 125, 50, 0.15) 0px 4px 16px",
//             }}
//           >
//             <Typography variant="h6" fontWeight={600}>
//               ¡Recepción confirmada exitosamente!
//             </Typography>
//             <Typography variant="body2">
//               Los materiales han sido ingresados al sistema con movimiento tipo
//               ENTRADA/ACOPIO.
//             </Typography>
//           </Alert>
//         </Fade>
//       )}

//       {/* Formulario de Recepción */}
//       <Card
//         elevation={3}
//         sx={{
//           borderRadius: 4,
//           boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
//           p: 4,
//         }}
//       >
//         <SectionHeader
//           icon={
//             <InventoryOutlined sx={{ fontSize: 28, color: "primary.main" }} />
//           }
//           title="Datos de Recepción"
//           subtitle="Selecciona la solicitud y registra los datos de la guía de remisión"
//         />

//         {/* Datos de Recepción */}
//         <Box
//           sx={{
//             display: "flex",
//             gap: 2,
//             mb: 3,
//             flexWrap: "wrap",
//           }}
//         >
//           <Box sx={{ flex: "1 1 250px" }}>
//             <Typography
//               variant="body2"
//               color="text.secondary"
//               fontWeight={600}
//               mb={1}
//             >
//               Solicitud de Abastecimiento *
//             </Typography>
//             <SelectBase
//               options={solicitudesDisponibles.map((s) => ({
//                 label: `${s.codigo} - ${s.entidad} (${s.region})`,
//                 value: s.codigo,
//               }))}
//               label=""
//               value={solicitudSeleccionada}
//               onChange={(value: any) => {
//                 setSolicitudSeleccionada(value);
//               }}
//             />
//           </Box>

//           <Box sx={{ flex: "1 1 200px" }}>
//             <Typography
//               variant="body2"
//               color="text.secondary"
//               fontWeight={600}
//               mb={1}
//             >
//               Fecha de Recepción *
//             </Typography>
//             <TextField
//               type="date"
//               fullWidth
//               value={fechaRecepcion}
//               onChange={(e) => setFechaRecepcion(e.target.value)}
//               size="small"
//               InputLabelProps={{ shrink: true }}
//             />
//           </Box>

//           <Box sx={{ flex: "1 1 200px" }}>
//             <Typography
//               variant="body2"
//               color="text.secondary"
//               fontWeight={600}
//               mb={1}
//             >
//               Código Guía de Remisión *
//             </Typography>
//             <TextField
//               fullWidth
//               placeholder="GR-2024-XXX"
//               value={codigoDocumento}
//               onChange={(e) => setCodigoDocumento(e.target.value)}
//               size="small"
//             />
//           </Box>
//         </Box>

//         {/* Info de Solicitud Seleccionada */}
//         {solicitud && (
//           <Fade in={true} timeout={600}>
//             <Alert
//               severity="info"
//               sx={{
//                 mb: 3,
//                 borderRadius: 2,
//               }}
//             >
//               <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
//                 <Box>
//                   <Typography variant="caption" color="text.secondary">
//                     Entidad:
//                   </Typography>
//                   <Typography variant="body2" fontWeight={600}>
//                     {solicitud.entidad}
//                   </Typography>
//                 </Box>
//                 <Box>
//                   <Typography variant="caption" color="text.secondary">
//                     Región:
//                   </Typography>
//                   <Typography variant="body2" fontWeight={600}>
//                     {solicitud.region}
//                   </Typography>
//                 </Box>
//                 <Box>
//                   <Typography variant="caption" color="text.secondary">
//                     Total Items:
//                   </Typography>
//                   <Typography variant="body2" fontWeight={600}>
//                     {solicitud.items.length}
//                   </Typography>
//                 </Box>
//               </Box>
//             </Alert>
//           </Fade>
//         )}

//         <Divider sx={{ my: 3 }} />

//         {/* Sección de Guía de Remisión */}
//         <SectionHeader
//           icon={
//             <CloudUploadOutlined sx={{ fontSize: 24, color: "info.main" }} />
//           }
//           title="Guía de Remisión"
//           subtitle="Adjunta el documento en formato PDF o imagen (JPG/PNG)"
//         />

//         <Box
//           sx={{
//             border: "2px dashed",
//             borderColor: "divider",
//             borderRadius: 3,
//             p: 3,
//             bgcolor: "background.default",
//             mb: 3,
//           }}
//         >
//           <FileUploader
//             accept=".pdf,.jpg,.jpeg,.png"
//             maxSize={10}
//             onFileSelect={handleFileSelect}
//             onError={handleError}
//           />

//           {archivoSeleccionado && (
//             <Fade in={true} timeout={600}>
//               <Box
//                 sx={{
//                   mt: 2,
//                   p: 2,
//                   bgcolor: "success.lighter",
//                   borderRadius: 2,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 2,
//                 }}
//               >
//                 {archivoSeleccionado.type === "application/pdf" ? (
//                   <PictureAsPdfOutlined sx={{ color: "error.main", fontSize: 32 }} />
//                 ) : (
//                   <ImageOutlined sx={{ color: "info.main", fontSize: 32 }} />
//                 )}
//                 <Box sx={{ flex: 1 }}>
//                   <Typography variant="body2" fontWeight={600}>
//                     {archivoSeleccionado.name}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     {(archivoSeleccionado.size / 1024 / 1024).toFixed(2)} MB
//                   </Typography>
//                 </Box>
//                 <IconButton
//                   size="small"
//                   onClick={() => setArchivoSeleccionado(null)}
//                 >
//                   <CloseOutlined />
//                 </IconButton>
//               </Box>
//             </Fade>
//           )}

//           <Typography
//             variant="caption"
//             color="text.secondary"
//             display="block"
//             mt={2}
//             textAlign="center"
//             sx={{ fontStyle: "italic" }}
//           >
//             La guía de remisión debe incluir el detalle de los materiales
//             recibidos
//           </Typography>
//         </Box>

//         {/* Items de la Solicitud */}
//         {itemsSolicitud.length > 0 && (
//           <Grow in={true} timeout={800}>
//             <Box>
//               <Divider sx={{ my: 3 }} />

//               <SectionHeader
//                 icon={
//                   <CategoryOutlined sx={{ fontSize: 24, color: "success.main" }} />
//                 }
//                 title="Items de la Solicitud"
//                 subtitle="Verifica y ajusta las cantidades recibidas de cada item"
//               />

//               {/* Resumen de Cantidades */}
//               <Box
//                 sx={{
//                   mb: 3,
//                   p: 2,
//                   bgcolor: "background.default",
//                   borderRadius: 2,
//                   display: "flex",
//                   gap: 4,
//                   flexWrap: "wrap",
//                 }}
//               >
//                 <Box>
//                   <Typography variant="caption" color="text.secondary">
//                     Total Solicitado
//                   </Typography>
//                   <Typography variant="h6" fontWeight={600} color="primary">
//                     {getTotalItemsSolicitados()} items
//                   </Typography>
//                 </Box>
//                 <Box>
//                   <Typography variant="caption" color="text.secondary">
//                     Total a Recibir
//                   </Typography>
//                   <Typography variant="h6" fontWeight={600} color="success.main">
//                     {getTotalItemsRecibidos()} items
//                   </Typography>
//                 </Box>
//                 {getTotalItemsRecibidos() !== getTotalItemsSolicitados() && (
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Diferencia
//                     </Typography>
//                     <Typography variant="h6" fontWeight={600} color="error">
//                       {getTotalItemsSolicitados() - getTotalItemsRecibidos()} items
//                     </Typography>
//                   </Box>
//                 )}
//               </Box>

//               {/* Items por Categoría */}
//               <Box sx={{ mb: 3 }}>
//                 {renderItemsPorCategoria("MATERIAL")}
//                 {renderItemsPorCategoria("HERRAMIENTA")}
//                 {renderItemsPorCategoria("EQUIPO")}
//               </Box>

//               <Divider sx={{ my: 3 }} />

//               {/* Confirmación de Carga */}
//               <Box>
//                 <SectionHeader
//                   iconBgColor="#ffa500"
//                   icon={
//                     <WarningAmberOutlined
//                       sx={{ fontSize: 24, color: "#ffff" }}
//                     />
//                   }
//                   title="Confirmación de Recepción"
//                   subtitle=""
//                 />

//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 2,
//                     mt: 2,
//                   }}
//                 >
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={confirmarCarga}
//                         onChange={(e) => setConfirmarCarga(e.target.checked)}
//                         color="primary"
//                       />
//                     }
//                     label={
//                       <Typography variant="body2" fontWeight={500}>
//                         Confirmo que he verificado los materiales recibidos y las
//                         cantidades son correctas
//                       </Typography>
//                     }
//                   />

//                   <Alert severity="warning" sx={{ borderRadius: 2 }}>
//                     <Typography variant="body2">
//                       Se registrará la recepción de materiales como tipo de
//                       movimiento: <strong>ENTRADA/ACOPIO</strong>
//                     </Typography>
//                   </Alert>

//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "flex-end",
//                       gap: 2,
//                       mt: 2,
//                     }}
//                   >
//                     <Button
//                       variant="outlined"
//                       size="large"
//                       onClick={() => {
//                         setSolicitudSeleccionada("");
//                         setItemsSolicitud([]);
//                         setArchivoSeleccionado(null);
//                       }}
//                       sx={{
//                         px: 4,
//                         py: 1.5,
//                         textTransform: "none",
//                         fontWeight: 600,
//                       }}
//                     >
//                       Cancelar
//                     </Button>
//                     <Button
//                       variant="contained"
//                       size="large"
//                       startIcon={<CheckCircleOutline />}
//                       onClick={handleConfirmarRecepcion}
//                       disabled={!confirmarCarga || !archivoSeleccionado}
//                       sx={{
//                         px: 4,
//                         py: 1.5,
//                         textTransform: "none",
//                         fontWeight: 600,
//                       }}
//                     >
//                       Confirmar Recepción
//                     </Button>
//                   </Box>
//                 </Box>
//               </Box>
//             </Box>
//           </Grow>
//         )}
//       </Card>

//       {/* Historial de Recepciones */}
//       <Card
//         elevation={3}
//         sx={{
//           borderRadius: 4,
//           boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
//           p: 4,
//         }}
//       >
//         <SectionHeader
//           icon={<HistoryOutlined sx={{ fontSize: 28, color: "info.main" }} />}
//           title="Historial de Recepciones"
//           subtitle="Registro de todas las recepciones de materiales realizadas"
//         />

//         <Divider sx={{ my: 3 }} />

//         <CustomDataGrid
//           columns={columns}
//           localRows={historialRows}
//           serverSide={false}
//           search={search}
//           onSearch={setSearch}
//           pageSize={10}
//           checkboxSelection={false}
//           onView={(row) => {
//             console.log("Ver detalles:", row);
//             alert(`Ver detalles de: ${row.solicitud}`);
//           }}
//         />
//       </Card>
//     </Box>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  Fade,
  Grow,
  Checkbox,
  FormControlLabel,
  Chip,
  Tabs,
  Tab,
  InputAdornment,
} from "@mui/material";
import {
  InventoryOutlined,
  CloudUploadOutlined,
  CheckCircleOutline,
  WarningAmberOutlined,
  HistoryOutlined,
  SearchOutlined,
  CloseOutlined,
  PictureAsPdfOutlined,
  ImageOutlined,
} from "@mui/icons-material";
import { TitleCard } from "@/src/components/base/TitleCard";
import { SectionHeader } from "@/src/components/base/SectionHeader";
import { FileUploader } from "@/src/components/base/FileUploader";
import CustomDataGrid from "@/src/components/base/CustomDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import SelectBase from "@/src/components/base/SelectBase";
import { IconButton } from "@mui/material";

type CategoriaItem = "MATERIAL" | "HERRAMIENTA" | "EQUIPO";

interface ItemRecepcion {
  id: string;
  categoria: CategoriaItem;
  codigo: string;
  descripcion: string;
  cantidadSolicitada: number;
  cantidadRecibida: number;
  unidadMedida: string;
  tipo?: string;
  estaEnSolicitud: boolean; // Si está en la solicitud, se puede editar
}

interface RecepcionHistorial {
  id: number;
  solicitud: string;
  fechaRecepcion: string;
  codigoDocumento: string;
  proveedor: string;
  cantidadItems: number;
  estado: string;
}

interface SolicitudData {
  codigo: string;
  entidad: "CLARO" | "LEMCORP";
  region: string;
  items: {
    codigo: string;
    descripcion: string;
    cantidad: number;
    unidadMedida: string;
    categoria: CategoriaItem;
  }[];
}

// Maestro completo de materiales
const maestroMateriales = [
  {
    codigo: "1002950",
    descripcion: "ATADOR DE IDENTIFICACION DE ABONADO",
    uom: "UND",
    tipo: "HFC",
  },
  {
    codigo: "1004705",
    descripcion: "CABLE COAXIAL BLANCO RG-6 S/MENSAJERO",
    uom: "MTS",
    tipo: "HFC",
  },
  {
    codigo: "1003101",
    descripcion: "CABLE COAXIAL RG-6 AUTOSOPORTADO",
    uom: "MTS",
    tipo: "HFC",
  },
  {
    codigo: "1033042",
    descripcion: "CABLE TELEF INTERIOR 2/22 AWG",
    uom: "MTS",
    tipo: "HFC",
  },
  {
    codigo: "1004692",
    descripcion: "CABLE UTP CAT5E FTP 4PR/24AWG 04070009",
    uom: "MTS",
    tipo: "HFC-FTTH",
  },
  {
    codigo: "1004838",
    descripcion: "CABLE HDMI CHD1-6 MALE TO MALE 2M",
    uom: "UND",
    tipo: "HFC",
  },
  {
    codigo: "1051697",
    descripcion: "CONTROL REMOTO AN-4803 ECOSS",
    uom: "UND",
    tipo: "HFC",
  },
  {
    codigo: "1062712",
    descripcion: "CONECTOR DE CONTINUIDAD RG6 EX6XL-PLUS",
    uom: "UND",
    tipo: "HFC",
  },
  {
    codigo: "1002900",
    descripcion: "CONECTOR PLUG RJ-45",
    uom: "UND",
    tipo: "HFC-FTTH",
  },
  {
    codigo: "1063021",
    descripcion: "CONECTOR RJ 11",
    uom: "UND",
    tipo: "HFC-FTTH",
  },
  {
    codigo: "1003254",
    descripcion: "DIVISOR INTERIOR 2 VIAS",
    uom: "UND",
    tipo: "HFC",
  },
  {
    codigo: "1003253",
    descripcion: "DIVISOR INTERIOR 3 VIAS",
    uom: "UND",
    tipo: "HFC",
  },
];

// Maestro completo de herramientas
const maestroHerramientas = [
  {
    codigo: "H-001",
    descripcion: "ALICATE DE COMPRESIÓN",
    uom: "UND",
  },
  {
    codigo: "H-002",
    descripcion: "DESTORNILLADOR PLANO",
    uom: "UND",
  },
  {
    codigo: "H-003",
    descripcion: "DESTORNILLADOR ESTRELLA",
    uom: "UND",
  },
  {
    codigo: "H-004",
    descripcion: "PELACABLES RG-6",
    uom: "UND",
  },
  {
    codigo: "H-005",
    descripcion: "CRIMPADORA RJ-45",
    uom: "UND",
  },
];

// Catálogo de equipos (se mantiene igual)
const catalogoEquipos = [
  {
    codigo: "4059271",
    descripcion: "MODEM ARRIS TG3442A 32x8 3.1",
    uom: "UND",
  },
  {
    codigo: "4050441",
    descripcion: "MODEM SAGEMCOM F3890V3 32X8SB DOCSIS 3.1",
    uom: "UND",
  },
  {
    codigo: "4007984",
    descripcion: "DECODIFICADOR MOTOROLA HD DCX-525",
    uom: "UND",
  },
];

const categoriaConfig = {
  MATERIAL: {
    label: "Material",
    color: "#ed6c02",
    icon: "📦",
  },
  HERRAMIENTA: {
    label: "Herramienta",
    color: "#1976d2",
    icon: "🔧",
  },
  EQUIPO: {
    label: "Equipo",
    color: "#2e7d32",
    icon: "⚙️",
  },
};

// Datos de ejemplo de solicitudes
const solicitudesDisponibles: SolicitudData[] = [
  {
    codigo: "SOL-001",
    entidad: "CLARO",
    region: "Lima",
    items: [
      {
        codigo: "1003101",
        descripcion: "CABLE COAXIAL RG-6 AUTOSOPORTADO",
        cantidad: 100,
        unidadMedida: "MTS",
        categoria: "MATERIAL",
      },
      {
        codigo: "1004692",
        descripcion: "CABLE UTP CAT5E FTP 4PR/24AWG 04070009",
        cantidad: 50,
        unidadMedida: "MTS",
        categoria: "MATERIAL",
      },
      {
        codigo: "H-001",
        descripcion: "ALICATE DE COMPRESIÓN",
        cantidad: 5,
        unidadMedida: "UND",
        categoria: "HERRAMIENTA",
      },
      {
        codigo: "4059271",
        descripcion: "MODEM ARRIS TG3442A 32x8 3.1",
        cantidad: 20,
        unidadMedida: "UND",
        categoria: "EQUIPO",
      },
    ],
  },
];

export default function RecepcionMateriales() {
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState("");
  const [fechaRecepcion, setFechaRecepcion] = useState("");
  const [codigoDocumento, setCodigoDocumento] = useState("");
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null);

  // Estados para items de recepción
  const [itemsMateriales, setItemsMateriales] = useState<ItemRecepcion[]>([]);
  const [itemsHerramientas, setItemsHerramientas] = useState<ItemRecepcion[]>([]);
  const [itemsEquipos, setItemsEquipos] = useState<ItemRecepcion[]>([]);

  // Estados de UI
  const [tabActual, setTabActual] = useState(0);
  const [confirmarCarga, setConfirmarCarga] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [search, setSearch] = useState("");
  const [searchMateriales, setSearchMateriales] = useState("");
  const [searchHerramientas, setSearchHerramientas] = useState("");
  const [searchEquipos, setSearchEquipos] = useState("");

  // Datos de ejemplo para el historial
  const [historialRows] = useState<RecepcionHistorial[]>([
    {
      id: 1,
      solicitud: "SOL-001",
      fechaRecepcion: "20/12/2024",
      codigoDocumento: "GR-2024-001",
      proveedor: "LEMCORP",
      cantidadItems: 45,
      estado: "Confirmado",
    },
  ]);

  // Cargar items cuando se selecciona una solicitud
  useEffect(() => {
    if (solicitudSeleccionada) {
      const solicitud = solicitudesDisponibles.find(
        (s) => s.codigo === solicitudSeleccionada
      );

      if (solicitud) {
        // Procesar materiales
        const materialesCompletos = maestroMateriales.map((maestro) => {
          const itemSolicitud = solicitud.items.find(
            (item) => item.codigo === maestro.codigo && item.categoria === "MATERIAL"
          );

          return {
            id: `mat-${maestro.codigo}`,
            categoria: "MATERIAL" as CategoriaItem,
            codigo: maestro.codigo,
            descripcion: maestro.descripcion,
            cantidadSolicitada: itemSolicitud?.cantidad || 0,
            cantidadRecibida: itemSolicitud?.cantidad || 0,
            unidadMedida: maestro.uom,
            tipo: maestro.tipo,
            estaEnSolicitud: !!itemSolicitud,
          };
        });

        // Procesar herramientas
        const herramientasCompletas = maestroHerramientas.map((maestro) => {
          const itemSolicitud = solicitud.items.find(
            (item) => item.codigo === maestro.codigo && item.categoria === "HERRAMIENTA"
          );

          return {
            id: `herr-${maestro.codigo}`,
            categoria: "HERRAMIENTA" as CategoriaItem,
            codigo: maestro.codigo,
            descripcion: maestro.descripcion,
            cantidadSolicitada: itemSolicitud?.cantidad || 0,
            cantidadRecibida: itemSolicitud?.cantidad || 0,
            unidadMedida: maestro.uom,
            estaEnSolicitud: !!itemSolicitud,
          };
        });

        // Procesar equipos (solo los de la solicitud)
        const equiposCompletos = solicitud.items
          .filter((item) => item.categoria === "EQUIPO")
          .map((item) => ({
            id: `eq-${item.codigo}`,
            categoria: "EQUIPO" as CategoriaItem,
            codigo: item.codigo,
            descripcion: item.descripcion,
            cantidadSolicitada: item.cantidad,
            cantidadRecibida: item.cantidad,
            unidadMedida: item.unidadMedida,
            estaEnSolicitud: true,
          }));

        setItemsMateriales(materialesCompletos);
        setItemsHerramientas(herramientasCompletas);
        setItemsEquipos(equiposCompletos);
      }
    } else {
      setItemsMateriales([]);
      setItemsHerramientas([]);
      setItemsEquipos([]);
    }
  }, [solicitudSeleccionada]);

  // Columnas para materiales
  const columnasMateriales: GridColDef[] = [
    {
      field: "codigo",
      headerName: "Código",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            bgcolor: params.row.estaEnSolicitud
              ? categoriaConfig.MATERIAL.color
              : "grey.400",
            color: "white",
            fontWeight: 600,
          }}
        />
      ),
    },
    {
      field: "descripcion",
      headerName: "Descripción",
      flex: 1,
      minWidth: 300,
    },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 120,
    },
    {
      field: "cantidadSolicitada",
      headerName: "Solicitado",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "cantidadRecibida",
      headerName: "Recibido",
      width: 120,
      editable: true,
      align: "center",
      headerAlign: "center",
      type: "number",
      renderCell: (params) => (
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{
            color: params.row.estaEnSolicitud
              ? params.value === params.row.cantidadSolicitada
                ? "success.main"
                : "warning.main"
              : "grey.500",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "unidadMedida",
      headerName: "UOM",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
  ];

  // Columnas para herramientas (similar)
  const columnasHerramientas: GridColDef[] = [
    {
      field: "codigo",
      headerName: "Código",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            bgcolor: params.row.estaEnSolicitud
              ? categoriaConfig.HERRAMIENTA.color
              : "grey.400",
            color: "white",
            fontWeight: 600,
          }}
        />
      ),
    },
    {
      field: "descripcion",
      headerName: "Descripción",
      flex: 1,
      minWidth: 300,
    },
    {
      field: "cantidadSolicitada",
      headerName: "Solicitado",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "cantidadRecibida",
      headerName: "Recibido",
      width: 120,
      editable: true,
      align: "center",
      headerAlign: "center",
      type: "number",
      renderCell: (params) => (
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{
            color: params.row.estaEnSolicitud
              ? params.value === params.row.cantidadSolicitada
                ? "success.main"
                : "warning.main"
              : "grey.500",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "unidadMedida",
      headerName: "UOM",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
  ];

  // Columnas para equipos
  const columnasEquipos: GridColDef[] = [
    {
      field: "codigo",
      headerName: "Código",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            bgcolor: categoriaConfig.EQUIPO.color,
            color: "white",
            fontWeight: 600,
          }}
        />
      ),
    },
    {
      field: "descripcion",
      headerName: "Descripción",
      flex: 1,
      minWidth: 300,
    },
    {
      field: "cantidadSolicitada",
      headerName: "Solicitado",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "cantidadRecibida",
      headerName: "Recibido",
      width: 120,
      editable: true,
      align: "center",
      headerAlign: "center",
      type: "number",
      renderCell: (params) => (
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{
            color:
              params.value === params.row.cantidadSolicitada
                ? "success.main"
                : "warning.main",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "unidadMedida",
      headerName: "UOM",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
  ];

  // Columnas para historial
  const columnasHistorial: GridColDef[] = [
    {
      field: "solicitud",
      headerName: "Solicitud",
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={600} color="primary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "fechaRecepcion",
      headerName: "Fecha Recepción",
      width: 150,
    },
    {
      field: "codigoDocumento",
      headerName: "Código Documento",
      minWidth: 160,
      flex: 1,
    },
    {
      field: "proveedor",
      headerName: "Proveedor",
      width: 130,
      renderCell: (params) => (
        <Chip label={params.value} size="small" color="info" sx={{ fontWeight: 600 }} />
      ),
    },
    {
      field: "cantidadItems",
      headerName: "Cantidad Items",
      width: 140,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={params.value === "Confirmado" ? "success" : "warning"}
          sx={{ fontWeight: 600 }}
        />
      ),
    },
  ];

  // Handlers
  const handleFileSelect = (file: File) => {
    setArchivoSeleccionado(file);
  };

  const handleError = (error: string) => {
    alert(error);
  };

  const processRowUpdate = (newRow: ItemRecepcion, oldRow: ItemRecepcion) => {
    // Solo permitir editar si está en la solicitud
    if (!newRow.estaEnSolicitud) {
      return oldRow;
    }

    // Validar que no exceda lo solicitado
    if (newRow.cantidadRecibida > newRow.cantidadSolicitada) {
      alert("La cantidad recibida no puede exceder la cantidad solicitada");
      return oldRow;
    }

    // Actualizar según categoría
    if (newRow.categoria === "MATERIAL") {
      setItemsMateriales((prev) =>
        prev.map((item) => (item.id === newRow.id ? newRow : item))
      );
    } else if (newRow.categoria === "HERRAMIENTA") {
      setItemsHerramientas((prev) =>
        prev.map((item) => (item.id === newRow.id ? newRow : item))
      );
    } else if (newRow.categoria === "EQUIPO") {
      setItemsEquipos((prev) =>
        prev.map((item) => (item.id === newRow.id ? newRow : item))
      );
    }

    return newRow;
  };

  const handleConfirmarRecepcion = () => {
    if (!confirmarCarga) {
      alert("Por favor confirma que deseas realizar la carga");
      return;
    }

    if (!archivoSeleccionado) {
      alert("Por favor adjunta la guía de remisión");
      return;
    }

    console.log("Confirmando recepción...", {
      solicitud: solicitudSeleccionada,
      fechaRecepcion,
      codigoDocumento,
      materiales: itemsMateriales.filter((i) => i.estaEnSolicitud),
      herramientas: itemsHerramientas.filter((i) => i.estaEnSolicitud),
      equipos: itemsEquipos,
      archivo: archivoSeleccionado,
    });

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setSolicitudSeleccionada("");
      setFechaRecepcion("");
      setCodigoDocumento("");
      setArchivoSeleccionado(null);
      setConfirmarCarga(false);
    }, 3000);
  };

  const getTotales = () => {
    const materialesSolicitados = itemsMateriales
      .filter((i) => i.estaEnSolicitud)
      .reduce((sum, item) => sum + item.cantidadSolicitada, 0);
    const materialesRecibidos = itemsMateriales
      .filter((i) => i.estaEnSolicitud)
      .reduce((sum, item) => sum + item.cantidadRecibida, 0);

    const herramientasSolicitadas = itemsHerramientas
      .filter((i) => i.estaEnSolicitud)
      .reduce((sum, item) => sum + item.cantidadSolicitada, 0);
    const herramientasRecibidas = itemsHerramientas
      .filter((i) => i.estaEnSolicitud)
      .reduce((sum, item) => sum + item.cantidadRecibida, 0);

    const equiposSolicitados = itemsEquipos.reduce(
      (sum, item) => sum + item.cantidadSolicitada,
      0
    );
    const equiposRecibidos = itemsEquipos.reduce(
      (sum, item) => sum + item.cantidadRecibida,
      0
    );

    return {
      materialesSolicitados,
      materialesRecibidos,
      herramientasSolicitadas,
      herramientasRecibidas,
      equiposSolicitados,
      equiposRecibidos,
      totalSolicitado:
        materialesSolicitados + herramientasSolicitadas + equiposSolicitados,
      totalRecibido: materialesRecibidos + herramientasRecibidas + equiposRecibidos,
    };
  };

  const totales = getTotales();
  const solicitud = solicitudesDisponibles.find(
    (s) => s.codigo === solicitudSeleccionada
  );

  // Filtrado de materiales
  const materialesFiltrados = itemsMateriales.filter((item) =>
    Object.values(item).join(" ").toLowerCase().includes(searchMateriales.toLowerCase())
  );

  const herramientasFiltradas = itemsHerramientas.filter((item) =>
    Object.values(item).join(" ").toLowerCase().includes(searchHerramientas.toLowerCase())
  );

  const equiposFiltrados = itemsEquipos.filter((item) =>
    Object.values(item).join(" ").toLowerCase().includes(searchEquipos.toLowerCase())
  );

  return (
    <Box
      sx={{
        maxWidth: 1400,
        mx: "auto",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Título Principal */}
      <TitleCard
        icon={<InventoryOutlined sx={{ fontSize: 32 }} />}
        title="Recepción de Materiales"
        description="Gestión de entrada de materiales, equipos y herramientas provenientes del proveedor logístico"
      />

      {/* Mensaje de Éxito */}
      {showSuccess && (
        <Fade in={showSuccess} timeout={600}>
          <Alert
            severity="success"
            icon={<CheckCircleOutline fontSize="large" />}
            sx={{
              borderRadius: 3,
              boxShadow: "rgba(46, 125, 50, 0.15) 0px 4px 16px",
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              ¡Recepción confirmada exitosamente!
            </Typography>
            <Typography variant="body2">
              Los materiales han sido ingresados al sistema con movimiento tipo
              ENTRADA/ACOPIO.
            </Typography>
          </Alert>
        </Fade>
      )}

      {/* Formulario Principal */}
      <Card
        elevation={3}
        sx={{
          borderRadius: 4,
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          p: 4,
        }}
      >
        <SectionHeader
          icon={<InventoryOutlined sx={{ fontSize: 28, color: "primary.main" }} />}
          title="Datos de Recepción"
          subtitle="Selecciona la solicitud y registra los datos básicos"
        />

        {/* Datos Básicos */}
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
          <Box sx={{ flex: "1 1 250px" }}>
            <Typography variant="body2" color="text.secondary" fontWeight={600} mb={1}>
              Solicitud de Abastecimiento *
            </Typography>
            <SelectBase
              options={solicitudesDisponibles.map((s) => ({
                label: `${s.codigo} - ${s.entidad} (${s.region})`,
                value: s.codigo,
              }))}
              label=""
              value={solicitudSeleccionada}
              onChange={(value: any) => setSolicitudSeleccionada(value)}
            />
          </Box>

          <Box sx={{ flex: "1 1 200px" }}>
            <Typography variant="body2" color="text.secondary" fontWeight={600} mb={1}>
              Fecha de Recepción *
            </Typography>
            <TextField
              type="date"
              fullWidth
              value={fechaRecepcion}
              onChange={(e) => setFechaRecepcion(e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          <Box sx={{ flex: "1 1 200px" }}>
            <Typography variant="body2" color="text.secondary" fontWeight={600} mb={1}>
              Código Guía de Remisión *
            </Typography>
            <TextField
              fullWidth
              placeholder="GR-2024-XXX"
              value={codigoDocumento}
              onChange={(e) => setCodigoDocumento(e.target.value)}
              size="small"
            />
          </Box>
        </Box>

        {/* Info de Solicitud */}
        {solicitud && (
          <Fade in={true} timeout={600}>
            <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
              <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Entidad:
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {solicitud.entidad}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Región:
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {solicitud.region}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Total Items:
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {solicitud.items.length}
                  </Typography>
                </Box>
              </Box>
            </Alert>
          </Fade>
        )}

        {/* Reportería de Materiales */}
        {itemsMateriales.length > 0 && (
          <Grow in={true} timeout={800}>
            <Box>
              <Divider sx={{ my: 3 }} />

              <SectionHeader
                icon={<InventoryOutlined sx={{ fontSize: 24, color: "success.main" }} />}
                title="Resumen de Items"
                subtitle="Cantidades solicitadas vs recibidas"
              />

              {/* Resumen por Categoría */}
              <Box
                sx={{
                  mb: 3,
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                {/* Materiales */}
                <Card
                  sx={{
                    flex: "1 1 280px",
                    p: 2.5,
                    bgcolor: `${categoriaConfig.MATERIAL.color}10`,
                    border: "2px solid",
                    borderColor: categoriaConfig.MATERIAL.color,
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    mb={1}
                    sx={{ color: categoriaConfig.MATERIAL.color }}
                  >
                    📦 Materiales
                  </Typography>
                  <Box sx={{ display: "flex", gap: 3 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Solicitado
                      </Typography>
                      <Typography variant="h5" fontWeight={700}>
                        {totales.materialesSolicitados}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        A Recibir
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight={700}
                        sx={{
                          color:
                            totales.materialesRecibidos === totales.materialesSolicitados
                              ? "success.main"
                              : "warning.main",
                        }}
                      >
                        {totales.materialesRecibidos}
                      </Typography>
                    </Box>
                  </Box>
                </Card>

                {/* Herramientas */}
                <Card
                  sx={{
                    flex: "1 1 280px",
                    p: 2.5,
                    bgcolor: `${categoriaConfig.HERRAMIENTA.color}10`,
                    border: "2px solid",
                    borderColor: categoriaConfig.HERRAMIENTA.color,
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    mb={1}
                    sx={{ color: categoriaConfig.HERRAMIENTA.color }}
                  >
                    🔧 Herramientas
                  </Typography>
                  <Box sx={{ display: "flex", gap: 3 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Solicitado
                      </Typography>
                      <Typography variant="h5" fontWeight={700}>
                        {totales.herramientasSolicitadas}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        A Recibir
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight={700}
                        sx={{
                          color:
                            totales.herramientasRecibidas ===
                            totales.herramientasSolicitadas
                              ? "success.main"
                              : "warning.main",
                        }}
                      >
                        {totales.herramientasRecibidas}
                      </Typography>
                    </Box>
                  </Box>
                </Card>

                {/* Equipos */}
                <Card
                  sx={{
                    flex: "1 1 280px",
                    p: 2.5,
                    bgcolor: `${categoriaConfig.EQUIPO.color}10`,
                    border: "2px solid",
                    borderColor: categoriaConfig.EQUIPO.color,
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    mb={1}
                    sx={{ color: categoriaConfig.EQUIPO.color }}
                  >
                    ⚙️ Equipos
                  </Typography>
                  <Box sx={{ display: "flex", gap: 3 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Solicitado
                      </Typography>
                      <Typography variant="h5" fontWeight={700}>
                        {totales.equiposSolicitados}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        A Recibir
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight={700}
                        sx={{
                          color:
                            totales.equiposRecibidos === totales.equiposSolicitados
                              ? "success.main"
                              : "warning.main",
                        }}
                      >
                        {totales.equiposRecibidos}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* DataGrids por Categoría con Tabs */}
              <Box>
                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
                  <Tabs value={tabActual} onChange={(_, newValue) => setTabActual(newValue)}>
                    <Tab
                      label={`Materiales (${itemsMateriales.filter((i) => i.estaEnSolicitud).length})`}
                      icon={<span>📦</span>}
                      iconPosition="start"
                    />
                    <Tab
                      label={`Herramientas (${itemsHerramientas.filter((i) => i.estaEnSolicitud).length})`}
                      icon={<span>🔧</span>}
                      iconPosition="start"
                    />
                    <Tab
                      label={`Equipos (${itemsEquipos.length})`}
                      icon={<span>⚙️</span>}
                      iconPosition="start"
                    />
                  </Tabs>
                </Box>

                {/* Tab Materiales */}
                {tabActual === 0 && (
                  <Box>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Buscar material por código o descripción..."
                      value={searchMateriales}
                      onChange={(e) => setSearchMateriales(e.target.value)}
                      sx={{ mb: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchOutlined />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Box sx={{ height: "auto" }}>
                      <CustomDataGrid
                        columns={columnasMateriales}
                        localRows={materialesFiltrados}
                        serverSide={false}
                        search=""
                        onSearch={() => {}}
                        pageSize={50}
                        editMode="cell"
                        processRowUpdate={processRowUpdate}
                        showToolbar={false}
                        sx={{
                          "& .MuiDataGrid-row": {
                            "&:hover": {
                              bgcolor: "action.hover",
                            },
                          },
                          "& .MuiDataGrid-cell[data-field='cantidadRecibida']": {
                            bgcolor: "background.default",
                          },
                        }}
                      />
                    </Box>
                  </Box>
                )}

                {/* Tab Herramientas */}
                {tabActual === 1 && (
                  <Box>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Buscar herramienta por código o descripción..."
                      value={searchHerramientas}
                      onChange={(e) => setSearchHerramientas(e.target.value)}
                      sx={{ mb: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchOutlined />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Box sx={{ height: 400 }}>
                      <CustomDataGrid
                        columns={columnasHerramientas}
                        localRows={herramientasFiltradas}
                        serverSide={false}
                        search=""
                        onSearch={() => {}}
                        pageSize={50}
                        editMode="cell"
                        processRowUpdate={processRowUpdate}
                        showToolbar={false}
                      />
                    </Box>
                  </Box>
                )}

                {/* Tab Equipos */}
                {tabActual === 2 && (
                  <Box>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Buscar equipo por código o descripción..."
                      value={searchEquipos}
                      onChange={(e) => setSearchEquipos(e.target.value)}
                      sx={{ mb: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchOutlined />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Box sx={{ height: 400 }}>
                      <CustomDataGrid
                        columns={columnasEquipos}
                        localRows={equiposFiltrados}
                        serverSide={false}
                        search=""
                        onSearch={() => {}}
                        pageSize={50}
                        editMode="cell"
                        processRowUpdate={processRowUpdate}
                        showToolbar={false}
                      />
                    </Box>
                  </Box>
                )}
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Confirmación (con guía de remisión incluida) */}
              <Box>
                <SectionHeader
                  iconBgColor="#ffa500"
                  icon={<WarningAmberOutlined sx={{ fontSize: 24, color: "#ffff" }} />}
                  title="Confirmación de Recepción"
                  subtitle="Adjunta la guía de remisión y confirma la recepción"
                />

                {/* Guía de Remisión */}
                <Box
                  sx={{
                    border: "2px dashed",
                    borderColor: "divider",
                    borderRadius: 3,
                    p: 3,
                    bgcolor: "background.default",
                    mb: 3,
                  }}
                >
                  <Typography variant="body2" fontWeight={600} mb={2}>
                    📄 Guía de Remisión (PDF o Imagen)
                  </Typography>
                  <FileUploader
                    accept=".pdf,.jpg,.jpeg,.png"
                    maxSize={10}
                    onFileSelect={handleFileSelect}
                    onError={handleError}
                  />

                  {archivoSeleccionado && (
                    <Fade in={true} timeout={600}>
                      <Box
                        sx={{
                          mt: 2,
                          p: 2,
                          bgcolor: "success.lighter",
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        {archivoSeleccionado.type === "application/pdf" ? (
                          <PictureAsPdfOutlined
                            sx={{ color: "error.main", fontSize: 32 }}
                          />
                        ) : (
                          <ImageOutlined sx={{ color: "info.main", fontSize: 32 }} />
                        )}
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" fontWeight={600}>
                            {archivoSeleccionado.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {(archivoSeleccionado.size / 1024 / 1024).toFixed(2)} MB
                          </Typography>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={() => setArchivoSeleccionado(null)}
                        >
                          <CloseOutlined />
                        </IconButton>
                      </Box>
                    </Fade>
                  )}
                </Box>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={confirmarCarga}
                      onChange={(e) => setConfirmarCarga(e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2" fontWeight={500}>
                      Confirmo que he verificado los materiales recibidos y las cantidades
                      son correctas
                    </Typography>
                  }
                  sx={{ mb: 2 }}
                />

                <Alert severity="warning" sx={{ borderRadius: 2, mb: 3 }}>
                  <Typography variant="body2">
                    Se registrará la recepción de materiales como tipo de movimiento:{" "}
                    <strong>ENTRADA/ACOPIO</strong>
                  </Typography>
                </Alert>

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => {
                      setSolicitudSeleccionada("");
                      setArchivoSeleccionado(null);
                    }}
                    sx={{ px: 4, py: 1.5, textTransform: "none", fontWeight: 600 }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<CheckCircleOutline />}
                    onClick={handleConfirmarRecepcion}
                    disabled={!confirmarCarga || !archivoSeleccionado}
                    sx={{ px: 4, py: 1.5, textTransform: "none", fontWeight: 600 }}
                  >
                    Confirmar Recepción
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grow>
        )}
      </Card>

      {/* Historial */}
      <Card
        elevation={3}
        sx={{
          borderRadius: 4,
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          p: 4,
        }}
      >
        <SectionHeader
          icon={<HistoryOutlined sx={{ fontSize: 28, color: "info.main" }} />}
          title="Historial de Recepciones"
          subtitle="Registro de todas las recepciones realizadas"
        />

        <Divider sx={{ my: 3 }} />

        <CustomDataGrid
          columns={columnasHistorial}
          localRows={historialRows}
          serverSide={false}
          search={search}
          onSearch={setSearch}
          pageSize={10}
          onView={(row) => {
            alert(`Ver detalles de: ${row.solicitud}`);
          }}
        />
      </Card>
    </Box>
  );
}