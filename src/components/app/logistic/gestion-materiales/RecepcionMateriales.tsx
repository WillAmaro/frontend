// // // "use client";

// // // import { useState } from "react";
// // // import {
// // //   Box,
// // //   Card,
// // //   Typography,
// // //   TextField,
// // //   Button,
// // //   Divider,
// // //   Alert,
// // //   Fade,
// // //   Grow,
// // //   Checkbox,
// // //   FormControlLabel,
// // //   Chip,
// // // } from "@mui/material";
// // // import {
// // //   InventoryOutlined,
// // //   CloudUploadOutlined,
// // //   CheckCircleOutline,
// // //   BuildOutlined,
// // //   CategoryOutlined,
// // //   WarningAmberOutlined,
// // //   HistoryOutlined,
// // // } from "@mui/icons-material";
// // // import { TitleCard } from "@/src/components/base/TitleCard";
// // // import { SectionHeader } from "@/src/components/base/SectionHeader";
// // // import { FileUploader } from "@/src/components/base/FileUploader";
// // // import CustomDataGrid from "@/src/components/base/CustomDataGrid";
// // // import { GridColDef } from "@mui/x-data-grid";
// // // import SelectBase from "@/src/components/base/SelectBase";

// // // interface RecepcionStats {
// // //   herramientas: number;
// // //   equipamiento: number;
// // //   material: number;
// // // }

// // // interface RecepcionHistorial {
// // //   id: number;
// // //   solicitud: string;
// // //   fechaRecepcion: string;
// // //   codigoDocumento: string;
// // //   proveedor: string;
// // //   cantidadItems: number;
// // //   estado: string;
// // // }

// // // export default function RecepcionMateriales() {
// // //   const [solicitud, setSolicitud] = useState("");
// // //   const [fechaRecepcion, setFechaRecepcion] = useState("");
// // //   const [codigoDocumento, setCodigoDocumento] = useState("");
// // //   const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(
// // //     null
// // //   );
// // //   const [isProcessing, setIsProcessing] = useState(false);
// // //   const [processComplete, setProcessComplete] = useState(false);
// // //   const [recepcionStats, setRecepcionStats] = useState<RecepcionStats | null>(
// // //     null
// // //   );
// // //   const [confirmarCarga, setConfirmarCarga] = useState(false);
// // //   const [search, setSearch] = useState("");

// // //   // Datos de ejemplo para el historial
// // //   const [historialRows] = useState<RecepcionHistorial[]>([
// // //     {
// // //       id: 1,
// // //       solicitud: "SOL-001",
// // //       fechaRecepcion: "20/12/2024",
// // //       codigoDocumento: "DOC-2024-001",
// // //       proveedor: "LEMCORP",
// // //       cantidadItems: 45,
// // //       estado: "Confirmado",
// // //     },
// // //     {
// // //       id: 2,
// // //       solicitud: "SOL-002",
// // //       fechaRecepcion: "19/12/2024",
// // //       codigoDocumento: "DOC-2024-002",
// // //       proveedor: "LEMCORP",
// // //       cantidadItems: 28,
// // //       estado: "Pendiente",
// // //     },
// // //     {
// // //       id: 3,
// // //       solicitud: "SOL-003",
// // //       fechaRecepcion: "18/12/2024",
// // //       codigoDocumento: "DOC-2024-003",
// // //       proveedor: "LEMCORP",
// // //       cantidadItems: 67,
// // //       estado: "Confirmado",
// // //     },
// // //   ]);

// // //   // Columnas para el DataGrid
// // //   const columns: GridColDef[] = [
// // //     {
// // //       field: "solicitud",
// // //       headerName: "Solicitud",
// // //       width: 120,
// // //       renderCell: (params) => (
// // //         <Typography variant="body2" fontWeight={600} color="primary">
// // //           {params.value}
// // //         </Typography>
// // //       ),
// // //     },
// // //     {
// // //       field: "fechaRecepcion",
// // //       headerName: "Fecha Recepción",
// // //       width: 150,
// // //     },
// // //     {
// // //       field: "codigoDocumento",
// // //       headerName: "Código Documento",
// // //       minWidth: 160,
// // //       flex: 1,
// // //     },
// // //     {
// // //       field: "proveedor",
// // //       headerName: "Proveedor",
// // //       width: 130,
// // //       renderCell: (params) => (
// // //         <Chip
// // //           label={params.value}
// // //           size="small"
// // //           color="info"
// // //           sx={{ fontWeight: 600 }}
// // //         />
// // //       ),
// // //     },
// // //     {
// // //       field: "cantidadItems",
// // //       headerName: "Cantidad Items",
// // //       width: 140,
// // //       align: "center",
// // //       headerAlign: "center",
// // //     },
// // //     {
// // //       field: "estado",
// // //       headerName: "Estado",
// // //       width: 130,
// // //       renderCell: (params) => (
// // //         <Chip
// // //           label={params.value}
// // //           size="small"
// // //           color={params.value === "Confirmado" ? "success" : "warning"}
// // //           sx={{ fontWeight: 600 }}
// // //         />
// // //       ),
// // //     },
// // //   ];

// // //   const handleFileSelect = (file: File) => {
// // //     console.log("Archivo seleccionado:", file);
// // //     setArchivoSeleccionado(file);
// // //   };

// // //   const handleError = (error: string) => {
// // //     console.log("Error:", error);
// // //   };

// // //   const handleSubirArchivo = () => {
// // //     if (!archivoSeleccionado) {
// // //       alert("Por favor selecciona un archivo primero");
// // //       return;
// // //     }

// // //     setIsProcessing(true);
// // //     setProcessComplete(false);

// // //     // Simular procesamiento de 60 segundos
// // //     setTimeout(() => {
// // //       setIsProcessing(false);
// // //       setProcessComplete(true);

// // //       // Datos de ejemplo del resultado
// // //       setRecepcionStats({
// // //         herramientas: 15,
// // //         equipamiento: 8,
// // //         material: 42,
// // //       });
// // //     }, 5000); // 60 segundos
// // //   };

// // //   const handleConfirmarCarga = () => {
// // //     if (!confirmarCarga) {
// // //       alert("Por favor confirma que deseas realizar la carga");
// // //       return;
// // //     }

// // //     console.log("Confirmando recepción de materiales...", {
// // //       solicitud,
// // //       fechaRecepcion,
// // //       codigoDocumento,
// // //       stats: recepcionStats,
// // //     });

// // //     // Aquí iría la lógica para confirmar la recepción
// // //     alert("Recepción de materiales confirmada exitosamente");

// // //     // Limpiar formulario
// // //     setSolicitud("");
// // //     setFechaRecepcion("");
// // //     setCodigoDocumento("");
// // //     setArchivoSeleccionado(null);
// // //     setProcessComplete(false);
// // //     setRecepcionStats(null);
// // //     setConfirmarCarga(false);
// // //   };

// // //   const getTotalItems = () => {
// // //     if (!recepcionStats) return 0;
// // //     return (
// // //       recepcionStats.herramientas +
// // //       recepcionStats.equipamiento +
// // //       recepcionStats.material
// // //     );
// // //   };

// // //   return (
// // //     <Box
// // //       sx={{
// // //         maxWidth: 1200,
// // //         mx: "auto",
// // //         p: 3,
// // //         display: "flex",
// // //         flexDirection: "column",
// // //         gap: 3,
// // //       }}
// // //     >
// // //       {/* Título Principal */}
// // //       <TitleCard
// // //         icon={<InventoryOutlined sx={{ fontSize: 32 }} />}
// // //         title="Recepción de Materiales"
// // //         description="Gestión de entrada de materiales, equipos y herramientas provenientes de LEMCORP (operador logístico de CLARO)"
// // //       />

// // //       {/* Formulario de Recepción */}
// // //       <Card
// // //         elevation={3}
// // //         sx={{
// // //           borderRadius: 4,
// // //           boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
// // //           p: 4,
// // //         }}
// // //       >
// // //         <SectionHeader
// // //           icon={
// // //             <InventoryOutlined sx={{ fontSize: 28, color: "primary.main" }} />
// // //           }
// // //           title="Recepción de Materiales"
// // //           subtitle="Registra los datos de la entrega proveniente de LEMCORP"
// // //         />

// // //         {/* Datos de Recepción */}
// // //         <Box
// // //           sx={{
// // //             display: "flex",
// // //             gap: 2,
// // //             mb: 3,
// // //             flexWrap: "wrap",
// // //           }}
// // //         >
// // //           <Box sx={{ flex: "1 1 200px" }}>
// // //             <Typography
// // //               variant="body2"
// // //               color="text.secondary"
// // //               fontWeight={600}
// // //               mb={1}
// // //             >
// // //               Solicitud
// // //             </Typography>
// // //             <SelectBase
// // //               options={[
// // //                 {
// // //                   label: "SOL-001",
// // //                   value: "SOL-001",
// // //                 },
// // //                 {
// // //                   label: "SOL-002",
// // //                   value: "SOL-002",
// // //                 },
// // //               ]}
// // //               label={""}
// // //               value={solicitud}
// // //               onChange={(e:any)=>{
// // //                 
// // //                 setSolicitud(e)}}
// // //             />
// // //             {/* <TextField
// // //               fullWidth
// // //               placeholder="Selecciona solicitud a abastecer"
// // //               value={solicitud}
// // //               onChange={(e) => setSolicitud(e.target.value)}
// // //               size="small"
// // //             /> */}
// // //           </Box>

// // //           <Box sx={{ flex: "1 1 200px" }}>
// // //             <Typography
// // //               variant="body2"
// // //               color="text.secondary"
// // //               fontWeight={600}
// // //               mb={1}
// // //             >
// // //               Fecha de Recepción
// // //             </Typography>
// // //             <TextField
// // //               type="date"
// // //               fullWidth
// // //               value={fechaRecepcion}
// // //               onChange={(e) => setFechaRecepcion(e.target.value)}
// // //               size="small"
// // //               InputLabelProps={{ shrink: true }}
// // //             />
// // //           </Box>

// // //           <Box sx={{ flex: "1 1 200px" }}>
// // //             <Typography
// // //               variant="body2"
// // //               color="text.secondary"
// // //               fontWeight={600}
// // //               mb={1}
// // //             >
// // //               Código Documento
// // //             </Typography>
// // //             <TextField
// // //               fullWidth
// // //               placeholder="Guía de remision emitida"
// // //               value={codigoDocumento}
// // //               onChange={(e) => setCodigoDocumento(e.target.value)}
// // //               size="small"
// // //             />
// // //           </Box>
// // //         </Box>

// // //         <Divider sx={{ my: 3 }} />

// // //         {/* Sección de Importar Archivo Excel */}
// // //         <SectionHeader
// // //           icon={
// // //             <CloudUploadOutlined sx={{ fontSize: 24, color: "info.main" }} />
// // //           }
// // //           title="Importar Archivo Excel"
// // //           subtitle=""
// // //         />

// // //         <Box
// // //           sx={{
// // //             border: "2px dashed",
// // //             borderColor: "divider",
// // //             borderRadius: 3,
// // //             p: 3,
// // //             bgcolor: "background.default",
// // //             mb: 3,
// // //           }}
// // //         >
// // //           <FileUploader
// // //             accept=".xlsx"
// // //             maxSize={10}
// // //             onFileSelect={handleFileSelect}
// // //             onError={handleError}
// // //           />

// // //           <Typography
// // //             variant="caption"
// // //             color="text.secondary"
// // //             display="block"
// // //             mt={2}
// // //             textAlign="center"
// // //             sx={{ fontStyle: "italic" }}
// // //           >
// // //             Sube archivo excel con formato establecido
// // //           </Typography>

// // //           {archivoSeleccionado && (
// // //             <Fade in={true} timeout={600}>
// // //               <Box sx={{ mt: 3, textAlign: "center" }}>
// // //                 <Button
// // //                   variant="contained"
// // //                   size="large"
// // //                   startIcon={<CloudUploadOutlined />}
// // //                   onClick={handleSubirArchivo}
// // //                   disabled={isProcessing}
// // //                   sx={{
// // //                     px: 4,
// // //                     py: 1.5,
// // //                     textTransform: "none",
// // //                     fontWeight: 600,
// // //                   }}
// // //                 >
// // //                   Subir Archivo
// // //                 </Button>
// // //               </Box>
// // //             </Fade>
// // //           )}
// // //         </Box>

// // //         {/* Progress Bar con animación de stripes */}
// // //         {isProcessing && (
// // //           <Fade in={isProcessing} timeout={600}>
// // //             <Box sx={{ mb: 3 }}>
// // //               <Box
// // //                 sx={{
// // //                   display: "flex",
// // //                   justifyContent: "space-between",
// // //                   alignItems: "center",
// // //                   mb: 1.5,
// // //                 }}
// // //               >
// // //                 <Typography variant="body1" fontWeight={500} color="primary">
// // //                   Procesando archivo de recepción...
// // //                 </Typography>
// // //               </Box>
// // //               <Box
// // //                 sx={{
// // //                   position: "relative",
// // //                   height: 12,
// // //                   borderRadius: 2,
// // //                   overflow: "hidden",
// // //                   bgcolor: "#e3f2fd",
// // //                   border: "1px solid #90caf9",
// // //                 }}
// // //               >
// // //                 <Box
// // //                   sx={{
// // //                     position: "absolute",
// // //                     top: 0,
// // //                     left: 0,
// // //                     right: 0,
// // //                     bottom: 0,
// // //                     background: `repeating-linear-gradient(
// // //                       45deg,
// // //                       #1976d2,
// // //                       #1976d2 20px,
// // //                       #42a5f5 20px,
// // //                       #42a5f5 40px
// // //                     )`,
// // //                     backgroundSize: "200% 100%",
// // //                     animation: "stripeAnimation 2s linear infinite",
// // //                     "@keyframes stripeAnimation": {
// // //                       "0%": {
// // //                         backgroundPosition: "0 0",
// // //                       },
// // //                       "100%": {
// // //                         backgroundPosition: "56.57px 0",
// // //                       },
// // //                     },
// // //                   }}
// // //                 />
// // //               </Box>
// // //               <Typography
// // //                 variant="caption"
// // //                 color="text.secondary"
// // //                 sx={{ display: "block", mt: 1, textAlign: "center" }}
// // //               >
// // //                 Una vez procesado mostrará mensaje de confirmación...
// // //               </Typography>
// // //             </Box>
// // //           </Fade>
// // //         )}

// // //         {/* Resultados del Procesamiento */}
// // //         {processComplete && recepcionStats && (
// // //           <Grow in={processComplete} timeout={800}>
// // //             <Box>
// // //               {/* Alert de Éxito */}
// // //               <Alert
// // //                 severity="success"
// // //                 icon={<CheckCircleOutline fontSize="large" />}
// // //                 sx={{
// // //                   mb: 3,
// // //                   borderRadius: 2,
// // //                   boxShadow: "rgba(46, 125, 50, 0.15) 0px 4px 16px",
// // //                 }}
// // //               >
// // //                 <Typography variant="body1" fontWeight={600}>
// // //                   ¡Archivo procesado exitosamente!
// // //                 </Typography>
// // //                 <Typography variant="body2">
// // //                   Se encontraron {getTotalItems()} ítems en el documento de
// // //                   recepción.
// // //                 </Typography>
// // //               </Alert>

// // //               {/* Estadísticas de Items */}
// // //               <Box sx={{ mb: 3 }}>
// // //                 <Typography
// // //                   variant="h6"
// // //                   fontWeight={600}
// // //                   mb={2}
// // //                   sx={{ display: "flex", alignItems: "center", gap: 1 }}
// // //                 >
// // //                   <InventoryOutlined color="primary" />
// // //                   Resumen de ítems recibidos
// // //                 </Typography>

// // //                 <Box
// // //                   sx={{
// // //                     display: "flex",
// // //                     gap: 3,
// // //                     flexWrap: "wrap",
// // //                     justifyContent: "space-between",
// // //                   }}
// // //                 >
// // //                   {/* Herramientas */}
// // //                   <Fade in={processComplete} timeout={1000}>
// // //                     <Box sx={{ flex: "1 1 250px", minWidth: 200 }}>
// // //                       <Card
// // //                         sx={{
// // //                           p: 2.5,
// // //                           textAlign: "center",
// // //                           bgcolor: "primary.50",
// // //                           border: "2px solid",
// // //                           borderColor: "primary.main",
// // //                           borderRadius: 2,
// // //                           transition: "all 0.3s ease",
// // //                           height: "100%",
// // //                           "&:hover": {
// // //                             transform: "translateY(-4px)",
// // //                             boxShadow: "rgba(25, 118, 210, 0.3) 0px 8px 24px",
// // //                           },
// // //                         }}
// // //                       >
// // //                         <BuildOutlined
// // //                           sx={{ fontSize: 40, color: "primary.main", mb: 1.5 }}
// // //                         />
// // //                         <Typography
// // //                           variant="h4"
// // //                           fontWeight={700}
// // //                           color="primary.main"
// // //                           gutterBottom
// // //                         >
// // //                           {recepcionStats.herramientas}
// // //                         </Typography>
// // //                         <Chip
// // //                           label="Herramientas"
// // //                           color="primary"
// // //                           size="small"
// // //                           sx={{ fontWeight: 600 }}
// // //                         />
// // //                       </Card>
// // //                     </Box>
// // //                   </Fade>

// // //                   {/* Equipamiento */}
// // //                   <Fade in={processComplete} timeout={1200}>
// // //                     <Box sx={{ flex: "1 1 250px", minWidth: 200 }}>
// // //                       <Card
// // //                         sx={{
// // //                           p: 2.5,
// // //                           textAlign: "center",
// // //                           bgcolor: "success.50",
// // //                           border: "2px solid",
// // //                           borderColor: "success.main",
// // //                           borderRadius: 2,
// // //                           transition: "all 0.3s ease",
// // //                           height: "100%",
// // //                           "&:hover": {
// // //                             transform: "translateY(-4px)",
// // //                             boxShadow: "rgba(46, 125, 50, 0.3) 0px 8px 24px",
// // //                           },
// // //                         }}
// // //                       >
// // //                         <CategoryOutlined
// // //                           sx={{ fontSize: 40, color: "success.main", mb: 1.5 }}
// // //                         />
// // //                         <Typography
// // //                           variant="h4"
// // //                           fontWeight={700}
// // //                           color="success.main"
// // //                           gutterBottom
// // //                         >
// // //                           {recepcionStats.equipamiento}
// // //                         </Typography>
// // //                         <Chip
// // //                           label="Equipamiento"
// // //                           color="success"
// // //                           size="small"
// // //                           sx={{ fontWeight: 600 }}
// // //                         />
// // //                       </Card>
// // //                     </Box>
// // //                   </Fade>

// // //                   {/* Material */}
// // //                   <Fade in={processComplete} timeout={1400}>
// // //                     <Box sx={{ flex: "1 1 250px", minWidth: 200 }}>
// // //                       <Card
// // //                         sx={{
// // //                           p: 2.5,
// // //                           textAlign: "center",
// // //                           bgcolor: "warning.50",
// // //                           border: "2px solid",
// // //                           borderColor: "warning.main",
// // //                           borderRadius: 2,
// // //                           transition: "all 0.3s ease",
// // //                           height: "100%",
// // //                           "&:hover": {
// // //                             transform: "translateY(-4px)",
// // //                             boxShadow: "rgba(237, 108, 2, 0.3) 0px 8px 24px",
// // //                           },
// // //                         }}
// // //                       >
// // //                         <InventoryOutlined
// // //                           sx={{ fontSize: 40, color: "warning.main", mb: 1.5 }}
// // //                         />
// // //                         <Typography
// // //                           variant="h4"
// // //                           fontWeight={700}
// // //                           color="warning.main"
// // //                           gutterBottom
// // //                         >
// // //                           {recepcionStats.material}
// // //                         </Typography>
// // //                         <Chip
// // //                           label="Material"
// // //                           color="warning"
// // //                           size="small"
// // //                           sx={{ fontWeight: 600 }}
// // //                         />
// // //                       </Card>
// // //                     </Box>
// // //                   </Fade>
// // //                 </Box>
// // //               </Box>

// // //               <Divider sx={{ my: 3 }} />

// // //               {/* Confirmación de Carga */}
// // //               <Box>
// // //                 <SectionHeader
// // //                     iconBgColor="#ffa500"
// // //                   icon={
// // //                     <WarningAmberOutlined
// // //                       sx={{ fontSize: 24, color: "#ffff" }}
// // //                     />
// // //                   }
// // //                   title="Confirmación de Carga"
// // //                   subtitle=""
// // //                 />

// // //                 <Box
// // //                   sx={{
// // //                     display: "flex",
// // //                     flexDirection: "column",
// // //                     gap: 2,
// // //                     mt: 2,
// // //                   }}
// // //                 >
// // //                   <FormControlLabel
// // //                     control={
// // //                       <Checkbox
// // //                         checked={confirmarCarga}
// // //                         onChange={(e) => setConfirmarCarga(e.target.checked)}
// // //                         color="primary"
// // //                       />
// // //                     }
// // //                     label={
// // //                       <Typography variant="body2">
// // //                         ¿Estás seguro de realizar la carga?
// // //                       </Typography>
// // //                     }
// // //                   />

// // //                   <Typography
// // //                     variant="caption"
// // //                     color="text.secondary"
// // //                     sx={{ fontStyle: "italic", ml: 4 }}
// // //                   >
// // //                     Se registra la recepción de materiales como tipo de
// // //                     movimiento: ENTRADA/ACOPIO
// // //                   </Typography>

// // //                   <Box
// // //                     sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
// // //                   >
// // //                     <Button
// // //                       variant="contained"
// // //                       size="large"
// // //                       onClick={handleConfirmarCarga}
// // //                       disabled={!confirmarCarga}
// // //                       sx={{
// // //                         px: 4,
// // //                         py: 1.5,
// // //                         textTransform: "none",
// // //                         fontWeight: 600,
// // //                       }}
// // //                     >
// // //                       Confirmar
// // //                     </Button>
// // //                   </Box>
// // //                 </Box>
// // //               </Box>
// // //             </Box>
// // //           </Grow>
// // //         )}
// // //       </Card>

// // //       {/* Historial de Recepciones */}
// // //       <Card
// // //         elevation={3}
// // //         sx={{
// // //           borderRadius: 4,
// // //           boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
// // //           p: 4,
// // //         }}
// // //       >
// // //         <SectionHeader
// // //           icon={<HistoryOutlined sx={{ fontSize: 28, color: "info.main" }} />}
// // //           title="Historial de Recepciones"
// // //           subtitle="Registro de todas las recepciones de materiales realizadas"
// // //         />

// // //         <Divider sx={{ my: 3 }} />

// // //         <CustomDataGrid
// // //           columns={columns}
// // //           localRows={historialRows}
// // //           serverSide={false}
// // //           search={search}
// // //           onSearch={setSearch}
// // //           pageSize={10}
// // //           checkboxSelection={false}
// // //           onView={(row) => {
// // //             console.log("Ver detalles:", row);
// // //             alert(`Ver detalles de: ${row.solicitud}`);
// // //           }}
// // //         />
// // //       </Card>
// // //     </Box>
// // //   );
// // // }

// // "use client";

// // import { useState, useEffect } from "react";
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
// //   IconButton,
// //   Tooltip,
// // } from "@mui/material";
// // import {
// //   InventoryOutlined,
// //   CloudUploadOutlined,
// //   CheckCircleOutline,
// //   BuildOutlined,
// //   CategoryOutlined,
// //   WarningAmberOutlined,
// //   HistoryOutlined,
// //   EditOutlined,
// //   CheckOutlined,
// //   CloseOutlined,
// //   PictureAsPdfOutlined,
// //   ImageOutlined,
// // } from "@mui/icons-material";
// // import { TitleCard } from "@/src/components/base/TitleCard";
// // import { SectionHeader } from "@/src/components/base/SectionHeader";
// // import { FileUploader } from "@/src/components/base/FileUploader";
// // import CustomDataGrid from "@/src/components/base/CustomDataGrid";
// // import { GridColDef } from "@mui/x-data-grid";
// // import SelectBase from "@/src/components/base/SelectBase";

// // type CategoriaItem = "MATERIAL" | "HERRAMIENTA" | "EQUIPO";

// // interface ItemSolicitud {
// //   id: string;
// //   categoria: CategoriaItem;
// //   codigo: string;
// //   descripcion: string;
// //   cantidadSolicitada: number;
// //   cantidadRecibida: number;
// //   unidadMedida: string;
// //   observacion?: string;
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

// // interface SolicitudData {
// //   codigo: string;
// //   entidad: "CLARO" | "LEMCORP";
// //   region: string;
// //   items: ItemSolicitud[];
// // }

// // const categoriaConfig = {
// //   MATERIAL: {
// //     label: "Material",
// //     color: "#ed6c02",
// //     icon: "📦",
// //   },
// //   HERRAMIENTA: {
// //     label: "Herramienta",
// //     color: "#1976d2",
// //     icon: "🔧",
// //   },
// //   EQUIPO: {
// //     label: "Equipo",
// //     color: "#2e7d32",
// //     icon: "⚙️",
// //   },
// // };

// // // Datos de ejemplo de solicitudes
// // const solicitudesDisponibles: SolicitudData[] = [
// //   // {
// //   //   codigo: "SOL-001",
// //   //   entidad: "CLARO",
// //   //   region: "Lima",
// //   //   items: [
// //   //     {
// //   //       id: "1",
// //   //       categoria: "MATERIAL",
// //   //       codigo: "1003101",
// //   //       descripcion: "CABLE COAXIAL RG-6 AUTOSOPORTADO",
// //   //       cantidadSolicitada: 100,
// //   //       cantidadRecibida: 0,
// //   //       unidadMedida: "Metro (M)",
// //   //     },
// //   //     {
// //   //       id: "2",
// //   //       categoria: "MATERIAL",
// //   //       codigo: "4070918",
// //   //       descripcion: "CABLE FASTCONNECT DROP 14138979 220M",
// //   //       cantidadSolicitada: 45,
// //   //       cantidadRecibida: 0,
// //   //       unidadMedida: "Rollo (RLL)",
// //   //     },
// //   //     {
// //   //       id: "3",
// //   //       categoria: "HERRAMIENTA",
// //   //       codigo: "H-001",
// //   //       descripcion: "ALICATE DE COMPRESIÓN",
// //   //       cantidadSolicitada: 5,
// //   //       cantidadRecibida: 0,
// //   //       unidadMedida: "Unidad (UND)",
// //   //     },
// //   //     {
// //   //       id: "4",
// //   //       categoria: "EQUIPO",
// //   //       codigo: "E-001",
// //   //       descripcion: "ROUTER WIFI 6 DUAL BAND",
// //   //       cantidadSolicitada: 20,
// //   //       cantidadRecibida: 0,
// //   //       unidadMedida: "Unidad (UND)",
// //   //     },
// //   //   ],
// //   // },
// //   {
// //     codigo: "SOL-002",
// //     entidad: "LEMCORP",
// //     region: "Arequipa",
// //     items: [
// //       {
// //         id: "5",
// //         categoria: "MATERIAL",
// //         codigo: "M-005",
// //         descripcion: "FIBRA ÓPTICA MONOMODO 12 HILOS",
// //         cantidadSolicitada: 500,
// //         cantidadRecibida: 0,
// //         unidadMedida: "Metro (M)",
// //       },
// //       {
// //         id: "6",
// //         categoria: "EQUIPO",
// //         codigo: "E-010",
// //         descripcion: "ONT GPON DUAL BAND",
// //         cantidadSolicitada: 30,
// //         cantidadRecibida: 0,
// //         unidadMedida: "Unidad (UND)",
// //       },
// //     ],
// //   },
// // ];

// // export default function RecepcionMateriales() {
// //   const [solicitudSeleccionada, setSolicitudSeleccionada] = useState("");
// //   const [fechaRecepcion, setFechaRecepcion] = useState("");
// //   const [codigoDocumento, setCodigoDocumento] = useState("");
// //   const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(
// //     null
// //   );
// //   const [itemsSolicitud, setItemsSolicitud] = useState<ItemSolicitud[]>([]);
// //   const [itemsEditando, setItemsEditando] = useState<Set<string>>(new Set());
// //   const [confirmarCarga, setConfirmarCarga] = useState(false);
// //   const [showSuccess, setShowSuccess] = useState(false);
// //   const [search, setSearch] = useState("");

// //   // Datos de ejemplo para el historial
// //   const [historialRows] = useState<RecepcionHistorial[]>([
// //     {
// //       id: 1,
// //       solicitud: "SOL-001",
// //       fechaRecepcion: "20/12/2024",
// //       codigoDocumento: "GR-2024-001",
// //       proveedor: "LEMCORP",
// //       cantidadItems: 45,
// //       estado: "Confirmado",
// //     },
// //     {
// //       id: 2,
// //       solicitud: "SOL-002",
// //       fechaRecepcion: "19/12/2024",
// //       codigoDocumento: "GR-2024-002",
// //       proveedor: "LEMCORP",
// //       cantidadItems: 28,
// //       estado: "Pendiente",
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

// //   // Cargar items cuando se selecciona una solicitud
// //   useEffect(() => {
// //     if (solicitudSeleccionada) {
// //       const solicitud = solicitudesDisponibles.find(
// //         (s) => s.codigo === solicitudSeleccionada
// //       );
// //       if (solicitud) {
// //         // Resetear cantidades recibidas
// //         const itemsConCantidadesReset = solicitud.items.map((item) => ({
// //           ...item,
// //           cantidadRecibida: item.cantidadSolicitada, // Por defecto, igual a lo solicitado
// //         }));
// //         setItemsSolicitud(itemsConCantidadesReset);
// //       }
// //     } else {
// //       setItemsSolicitud([]);
// //     }
// //   }, [solicitudSeleccionada]);

// //   const handleFileSelect = (file: File) => {
// //     console.log("Archivo seleccionado:", file);
// //     setArchivoSeleccionado(file);
// //   };

// //   const handleError = (error: string) => {
// //     console.log("Error:", error);
// //     alert(error);
// //   };

// //   const toggleEdicionItem = (itemId: string) => {
// //     const nuevosEditando = new Set(itemsEditando);
// //     if (nuevosEditando.has(itemId)) {
// //       nuevosEditando.delete(itemId);
// //     } else {
// //       nuevosEditando.add(itemId);
// //     }
// //     setItemsEditando(nuevosEditando);
// //   };

// //   const actualizarCantidadRecibida = (itemId: string, cantidad: number) => {
// //     setItemsSolicitud(
// //       itemsSolicitud.map((item) =>
// //         item.id === itemId ? { ...item, cantidadRecibida: cantidad } : item
// //       )
// //     );
// //   };

// //   const handleConfirmarRecepcion = () => {
// //     if (!confirmarCarga) {
// //       alert("Por favor confirma que deseas realizar la carga");
// //       return;
// //     }

// //     if (!archivoSeleccionado) {
// //       alert("Por favor adjunta la guía de remisión");
// //       return;
// //     }

// //     console.log("Confirmando recepción de materiales...", {
// //       solicitud: solicitudSeleccionada,
// //       fechaRecepcion,
// //       codigoDocumento,
// //       items: itemsSolicitud,
// //       archivoGuia: archivoSeleccionado,
// //     });

// //     setShowSuccess(true);

// //     // Limpiar formulario después de 3 segundos
// //     setTimeout(() => {
// //       setShowSuccess(false);
// //       setSolicitudSeleccionada("");
// //       setFechaRecepcion("");
// //       setCodigoDocumento("");
// //       setArchivoSeleccionado(null);
// //       setItemsSolicitud([]);
// //       setConfirmarCarga(false);
// //       setItemsEditando(new Set());
// //     }, 3000);
// //   };

// //   const getItemsPorCategoria = (categoria: CategoriaItem) => {
// //     return itemsSolicitud.filter((item) => item.categoria === categoria);
// //   };

// //   const getTotalItemsRecibidos = () => {
// //     return itemsSolicitud.reduce(
// //       (sum, item) => sum + item.cantidadRecibida,
// //       0
// //     );
// //   };

// //   const getTotalItemsSolicitados = () => {
// //     return itemsSolicitud.reduce(
// //       (sum, item) => sum + item.cantidadSolicitada,
// //       0
// //     );
// //   };

// //   const renderItemsPorCategoria = (categoria: CategoriaItem) => {
// //     const itemsCategoria = getItemsPorCategoria(categoria);
// //     const config = categoriaConfig[categoria];

// //     if (itemsCategoria.length === 0) return null;

// //     return (
// //       <Box key={categoria} sx={{ mb: 4 }}>
// //         <Box
// //           sx={{
// //             display: "flex",
// //             alignItems: "center",
// //             gap: 1,
// //             mb: 2,
// //             pb: 1,
// //             borderBottom: "2px solid",
// //             borderColor: config.color,
// //           }}
// //         >
// //           <Typography variant="h6" fontWeight={600} sx={{ color: config.color }}>
// //             {config.icon} {config.label}
// //           </Typography>
// //           <Chip
// //             label={`${itemsCategoria.length} items`}
// //             size="small"
// //             sx={{
// //               bgcolor: config.color,
// //               color: "white",
// //               fontWeight: 600,
// //             }}
// //           />
// //         </Box>

// //         <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
// //           {itemsCategoria.map((item, index) => {
// //             const estaEditando = itemsEditando.has(item.id);
// //             const cantidadCompleta =
// //               item.cantidadRecibida === item.cantidadSolicitada;
// //             const cantidadParcial =
// //               item.cantidadRecibida > 0 &&
// //               item.cantidadRecibida < item.cantidadSolicitada;

// //             return (
// //               <Grow key={item.id} in={true} timeout={300 + index * 100}>
// //                 <Card
// //                   sx={{
// //                     p: 2.5,
// //                     border: "2px solid",
// //                     borderColor: `${config.color}30`,
// //                     // borderLeft: "4px solid",
// //                     // borderLeftColor: config.color,
// //                     transition: "all 0.3s ease",
// //                     "&:hover": {
// //                       boxShadow: `0 4px 12px ${config.color}40`,
// //                       transform: "translateX(4px)",
// //                     },
// //                   }}
// //                 >
// //                   <Box
// //                     sx={{
// //                       display: "flex",
// //                       justifyContent: "space-between",
// //                       alignItems: "flex-start",
// //                       gap: 2,
// //                     }}
// //                   >
// //                     <Box sx={{ flex: 1 }}>
// //                       <Box
// //                         sx={{
// //                           display: "flex",
// //                           alignItems: "center",
// //                           gap: 1,
// //                           mb: 1,
// //                         }}
// //                       >
// //                         <Chip
// //                           label={item.codigo}
// //                           size="small"
// //                           sx={{
// //                             bgcolor: config.color,
// //                             color: "white",
// //                             fontWeight: 600,
// //                           }}
// //                         />
// //                         {cantidadCompleta && (
// //                           <Chip
// //                             label="Completo"
// //                             size="small"
// //                             color="success"
// //                             icon={<CheckCircleOutline />}
// //                           />
// //                         )}
// //                         {cantidadParcial && (
// //                           <Chip
// //                             label="Parcial"
// //                             size="small"
// //                             color="warning"
// //                             icon={<WarningAmberOutlined />}
// //                           />
// //                         )}
// //                       </Box>

// //                       <Typography
// //                         variant="body1"
// //                         fontWeight={600}
// //                         gutterBottom
// //                         sx={{ color: "text.primary" }}
// //                       >
// //                         {item.descripcion}
// //                       </Typography>

// //                       <Box
// //                         sx={{
// //                           display: "flex",
// //                           gap: 3,
// //                           mt: 2,
// //                           flexWrap: "wrap",
// //                         }}
// //                       >
// //                         <Box>
// //                           <Typography
// //                             variant="caption"
// //                             color="text.secondary"
// //                             display="block"
// //                           >
// //                             Cantidad Solicitada
// //                           </Typography>
// //                           <Typography variant="h6" fontWeight={600}>
// //                             {item.cantidadSolicitada}{" "}
// //                             <Typography
// //                               component="span"
// //                               variant="caption"
// //                               color="text.secondary"
// //                             >
// //                               {item.unidadMedida}
// //                             </Typography>
// //                           </Typography>
// //                         </Box>

// //                         <Box>
// //                           <Typography
// //                             variant="caption"
// //                             color="text.secondary"
// //                             display="block"
// //                           >
// //                             Cantidad Recibida
// //                           </Typography>
// //                           {estaEditando ? (
// //                             <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
// //                               <TextField
// //                                 type="number"
// //                                 size="small"
// //                                 value={item.cantidadRecibida}
// //                                 onChange={(e) =>
// //                                   actualizarCantidadRecibida(
// //                                     item.id,
// //                                     parseInt(e.target.value) || 0
// //                                   )
// //                                 }
// //                                 inputProps={{
// //                                   min: 0,
// //                                   max: item.cantidadSolicitada,
// //                                 }}
// //                                 sx={{ width: 100 }}
// //                               />
// //                               <IconButton
// //                                 size="small"
// //                                 color="success"
// //                                 onClick={() => toggleEdicionItem(item.id)}
// //                               >
// //                                 <CheckOutlined />
// //                               </IconButton>
// //                             </Box>
// //                           ) : (
// //                             <Typography
// //                               variant="h6"
// //                               fontWeight={600}
// //                               sx={{
// //                                 color: cantidadCompleta
// //                                   ? "success.main"
// //                                   : cantidadParcial
// //                                   ? "warning.main"
// //                                   : "error.main",
// //                               }}
// //                             >
// //                               {item.cantidadRecibida}{" "}
// //                               <Typography
// //                                 component="span"
// //                                 variant="caption"
// //                                 color="text.secondary"
// //                               >
// //                                 {item.unidadMedida}
// //                               </Typography>
// //                             </Typography>
// //                           )}
// //                         </Box>

// //                         {item.cantidadRecibida !== item.cantidadSolicitada && (
// //                           <Box>
// //                             <Typography
// //                               variant="caption"
// //                               color="text.secondary"
// //                               display="block"
// //                             >
// //                               Diferencia
// //                             </Typography>
// //                             <Typography
// //                               variant="h6"
// //                               fontWeight={600}
// //                               color="error"
// //                             >
// //                               {item.cantidadSolicitada - item.cantidadRecibida}{" "}
// //                               <Typography
// //                                 component="span"
// //                                 variant="caption"
// //                                 color="text.secondary"
// //                               >
// //                                 {item.unidadMedida}
// //                               </Typography>
// //                             </Typography>
// //                           </Box>
// //                         )}
// //                       </Box>
// //                     </Box>

// //                     <Tooltip title={estaEditando ? "Guardar" : "Editar cantidad"}>
// //                       <IconButton
// //                         color={estaEditando ? "success" : "primary"}
// //                         onClick={() => toggleEdicionItem(item.id)}
// //                         sx={{
// //                           bgcolor: estaEditando ? "success.lighter" : "primary.lighter",
// //                           "&:hover": {
// //                             bgcolor: estaEditando ? "success.light" : "primary.light",
// //                           },
// //                         }}
// //                       >
// //                         {estaEditando ? <CheckOutlined /> : <EditOutlined />}
// //                       </IconButton>
// //                     </Tooltip>
// //                   </Box>
// //                 </Card>
// //               </Grow>
// //             );
// //           })}
// //         </Box>
// //       </Box>
// //     );
// //   };

// //   const solicitud = solicitudesDisponibles.find(
// //     (s) => s.codigo === solicitudSeleccionada
// //   );

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
// //         description="Gestión de entrada de materiales, equipos y herramientas provenientes del proveedor logístico"
// //       />

// //       {/* Mensaje de Éxito Global */}
// //       {showSuccess && (
// //         <Fade in={showSuccess} timeout={600}>
// //           <Alert
// //             severity="success"
// //             icon={<CheckCircleOutline fontSize="large" />}
// //             sx={{
// //               borderRadius: 3,
// //               boxShadow: "rgba(46, 125, 50, 0.15) 0px 4px 16px",
// //             }}
// //           >
// //             <Typography variant="h6" fontWeight={600}>
// //               ¡Recepción confirmada exitosamente!
// //             </Typography>
// //             <Typography variant="body2">
// //               Los materiales han sido ingresados al sistema con movimiento tipo
// //               ENTRADA/ACOPIO.
// //             </Typography>
// //           </Alert>
// //         </Fade>
// //       )}

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
// //           title="Datos de Recepción"
// //           subtitle="Selecciona la solicitud y registra los datos de la guía de remisión"
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
// //           <Box sx={{ flex: "1 1 250px" }}>
// //             <Typography
// //               variant="body2"
// //               color="text.secondary"
// //               fontWeight={600}
// //               mb={1}
// //             >
// //               Solicitud de Abastecimiento *
// //             </Typography>
// //             <SelectBase
// //               options={solicitudesDisponibles.map((s) => ({
// //                 label: `${s.codigo} - ${s.entidad} (${s.region})`,
// //                 value: s.codigo,
// //               }))}
// //               label=""
// //               value={solicitudSeleccionada}
// //               onChange={(value: any) => {
// //                 setSolicitudSeleccionada(value);
// //               }}
// //             />
// //           </Box>

// //           <Box sx={{ flex: "1 1 200px" }}>
// //             <Typography
// //               variant="body2"
// //               color="text.secondary"
// //               fontWeight={600}
// //               mb={1}
// //             >
// //               Fecha de Recepción *
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
// //               Código Guía de Remisión *
// //             </Typography>
// //             <TextField
// //               fullWidth
// //               placeholder="GR-2024-XXX"
// //               value={codigoDocumento}
// //               onChange={(e) => setCodigoDocumento(e.target.value)}
// //               size="small"
// //             />
// //           </Box>
// //         </Box>

// //         {/* Info de Solicitud Seleccionada */}
// //         {solicitud && (
// //           <Fade in={true} timeout={600}>
// //             <Alert
// //               severity="info"
// //               sx={{
// //                 mb: 3,
// //                 borderRadius: 2,
// //               }}
// //             >
// //               <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
// //                 <Box>
// //                   <Typography variant="caption" color="text.secondary">
// //                     Entidad:
// //                   </Typography>
// //                   <Typography variant="body2" fontWeight={600}>
// //                     {solicitud.entidad}
// //                   </Typography>
// //                 </Box>
// //                 <Box>
// //                   <Typography variant="caption" color="text.secondary">
// //                     Región:
// //                   </Typography>
// //                   <Typography variant="body2" fontWeight={600}>
// //                     {solicitud.region}
// //                   </Typography>
// //                 </Box>
// //                 <Box>
// //                   <Typography variant="caption" color="text.secondary">
// //                     Total Items:
// //                   </Typography>
// //                   <Typography variant="body2" fontWeight={600}>
// //                     {solicitud.items.length}
// //                   </Typography>
// //                 </Box>
// //               </Box>
// //             </Alert>
// //           </Fade>
// //         )}

// //         <Divider sx={{ my: 3 }} />

// //         {/* Sección de Guía de Remisión */}
// //         <SectionHeader
// //           icon={
// //             <CloudUploadOutlined sx={{ fontSize: 24, color: "info.main" }} />
// //           }
// //           title="Guía de Remisión"
// //           subtitle="Adjunta el documento en formato PDF o imagen (JPG/PNG)"
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
// //             accept=".pdf,.jpg,.jpeg,.png"
// //             maxSize={10}
// //             onFileSelect={handleFileSelect}
// //             onError={handleError}
// //           />

// //           {archivoSeleccionado && (
// //             <Fade in={true} timeout={600}>
// //               <Box
// //                 sx={{
// //                   mt: 2,
// //                   p: 2,
// //                   bgcolor: "success.lighter",
// //                   borderRadius: 2,
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: 2,
// //                 }}
// //               >
// //                 {archivoSeleccionado.type === "application/pdf" ? (
// //                   <PictureAsPdfOutlined sx={{ color: "error.main", fontSize: 32 }} />
// //                 ) : (
// //                   <ImageOutlined sx={{ color: "info.main", fontSize: 32 }} />
// //                 )}
// //                 <Box sx={{ flex: 1 }}>
// //                   <Typography variant="body2" fontWeight={600}>
// //                     {archivoSeleccionado.name}
// //                   </Typography>
// //                   <Typography variant="caption" color="text.secondary">
// //                     {(archivoSeleccionado.size / 1024 / 1024).toFixed(2)} MB
// //                   </Typography>
// //                 </Box>
// //                 <IconButton
// //                   size="small"
// //                   onClick={() => setArchivoSeleccionado(null)}
// //                 >
// //                   <CloseOutlined />
// //                 </IconButton>
// //               </Box>
// //             </Fade>
// //           )}

// //           <Typography
// //             variant="caption"
// //             color="text.secondary"
// //             display="block"
// //             mt={2}
// //             textAlign="center"
// //             sx={{ fontStyle: "italic" }}
// //           >
// //             La guía de remisión debe incluir el detalle de los materiales
// //             recibidos
// //           </Typography>
// //         </Box>

// //         {/* Items de la Solicitud */}
// //         {itemsSolicitud.length > 0 && (
// //           <Grow in={true} timeout={800}>
// //             <Box>
// //               <Divider sx={{ my: 3 }} />

// //               <SectionHeader
// //                 icon={
// //                   <CategoryOutlined sx={{ fontSize: 24, color: "success.main" }} />
// //                 }
// //                 title="Items de la Solicitud"
// //                 subtitle="Verifica y ajusta las cantidades recibidas de cada item"
// //               />

// //               {/* Resumen de Cantidades */}
// //               <Box
// //                 sx={{
// //                   mb: 3,
// //                   p: 2,
// //                   bgcolor: "background.default",
// //                   borderRadius: 2,
// //                   display: "flex",
// //                   gap: 4,
// //                   flexWrap: "wrap",
// //                 }}
// //               >
// //                 <Box>
// //                   <Typography variant="caption" color="text.secondary">
// //                     Total Solicitado
// //                   </Typography>
// //                   <Typography variant="h6" fontWeight={600} color="primary">
// //                     {getTotalItemsSolicitados()} items
// //                   </Typography>
// //                 </Box>
// //                 <Box>
// //                   <Typography variant="caption" color="text.secondary">
// //                     Total a Recibir
// //                   </Typography>
// //                   <Typography variant="h6" fontWeight={600} color="success.main">
// //                     {getTotalItemsRecibidos()} items
// //                   </Typography>
// //                 </Box>
// //                 {getTotalItemsRecibidos() !== getTotalItemsSolicitados() && (
// //                   <Box>
// //                     <Typography variant="caption" color="text.secondary">
// //                       Diferencia
// //                     </Typography>
// //                     <Typography variant="h6" fontWeight={600} color="error">
// //                       {getTotalItemsSolicitados() - getTotalItemsRecibidos()} items
// //                     </Typography>
// //                   </Box>
// //                 )}
// //               </Box>

// //               {/* Items por Categoría */}
// //               <Box sx={{ mb: 3 }}>
// //                 {renderItemsPorCategoria("MATERIAL")}
// //                 {renderItemsPorCategoria("HERRAMIENTA")}
// //                 {renderItemsPorCategoria("EQUIPO")}
// //               </Box>

// //               <Divider sx={{ my: 3 }} />

// //               {/* Confirmación de Carga */}
// //               <Box>
// //                 <SectionHeader
// //                   iconBgColor="#ffa500"
// //                   icon={
// //                     <WarningAmberOutlined
// //                       sx={{ fontSize: 24, color: "#ffff" }}
// //                     />
// //                   }
// //                   title="Confirmación de Recepción"
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
// //                       <Typography variant="body2" fontWeight={500}>
// //                         Confirmo que he verificado los materiales recibidos y las
// //                         cantidades son correctas
// //                       </Typography>
// //                     }
// //                   />

// //                   <Alert severity="warning" sx={{ borderRadius: 2 }}>
// //                     <Typography variant="body2">
// //                       Se registrará la recepción de materiales como tipo de
// //                       movimiento: <strong>ENTRADA/ACOPIO</strong>
// //                     </Typography>
// //                   </Alert>

// //                   <Box
// //                     sx={{
// //                       display: "flex",
// //                       justifyContent: "flex-end",
// //                       gap: 2,
// //                       mt: 2,
// //                     }}
// //                   >
// //                     <Button
// //                       variant="outlined"
// //                       size="large"
// //                       onClick={() => {
// //                         setSolicitudSeleccionada("");
// //                         setItemsSolicitud([]);
// //                         setArchivoSeleccionado(null);
// //                       }}
// //                       sx={{
// //                         px: 4,
// //                         py: 1.5,
// //                         textTransform: "none",
// //                         fontWeight: 600,
// //                       }}
// //                     >
// //                       Cancelar
// //                     </Button>
// //                     <Button
// //                       variant="contained"
// //                       size="large"
// //                       startIcon={<CheckCircleOutline />}
// //                       onClick={handleConfirmarRecepcion}
// //                       disabled={!confirmarCarga || !archivoSeleccionado}
// //                       sx={{
// //                         px: 4,
// //                         py: 1.5,
// //                         textTransform: "none",
// //                         fontWeight: 600,
// //                       }}
// //                     >
// //                       Confirmar Recepción
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
//   Tabs,
//   Tab,
//   InputAdornment,
// } from "@mui/material";
// import {
//   InventoryOutlined,
//   CloudUploadOutlined,
//   CheckCircleOutline,
//   WarningAmberOutlined,
//   HistoryOutlined,
//   SearchOutlined,
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
// import { IconButton } from "@mui/material";

// type CategoriaItem = "MATERIAL" | "HERRAMIENTA" | "EQUIPO";

// interface ItemRecepcion {
//   id: string;
//   categoria: CategoriaItem;
//   codigo: string;
//   descripcion: string;
//   cantidadSolicitada: number;
//   cantidadRecibida: number;
//   unidadMedida: string;
//   tipo?: string;
//   estaEnSolicitud: boolean; // Si está en la solicitud, se puede editar
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
//   items: {
//     codigo: string;
//     descripcion: string;
//     cantidad: number;
//     unidadMedida: string;
//     categoria: CategoriaItem;
//   }[];
// }

// // Maestro completo de materiales
// const maestroMateriales = [
//   {
//     codigo: "1002950",
//     descripcion: "ATADOR DE IDENTIFICACION DE ABONADO",
//     uom: "UND",
//     tipo: "HFC",
//   },
//   {
//     codigo: "1004705",
//     descripcion: "CABLE COAXIAL BLANCO RG-6 S/MENSAJERO",
//     uom: "MTS",
//     tipo: "HFC",
//   },
//   {
//     codigo: "1003101",
//     descripcion: "CABLE COAXIAL RG-6 AUTOSOPORTADO",
//     uom: "MTS",
//     tipo: "HFC",
//   },
//   {
//     codigo: "1033042",
//     descripcion: "CABLE TELEF INTERIOR 2/22 AWG",
//     uom: "MTS",
//     tipo: "HFC",
//   },
//   {
//     codigo: "1004692",
//     descripcion: "CABLE UTP CAT5E FTP 4PR/24AWG 04070009",
//     uom: "MTS",
//     tipo: "HFC-FTTH",
//   },
//   {
//     codigo: "1004838",
//     descripcion: "CABLE HDMI CHD1-6 MALE TO MALE 2M",
//     uom: "UND",
//     tipo: "HFC",
//   },
//   {
//     codigo: "1051697",
//     descripcion: "CONTROL REMOTO AN-4803 ECOSS",
//     uom: "UND",
//     tipo: "HFC",
//   },
//   {
//     codigo: "1062712",
//     descripcion: "CONECTOR DE CONTINUIDAD RG6 EX6XL-PLUS",
//     uom: "UND",
//     tipo: "HFC",
//   },
//   {
//     codigo: "1002900",
//     descripcion: "CONECTOR PLUG RJ-45",
//     uom: "UND",
//     tipo: "HFC-FTTH",
//   },
//   {
//     codigo: "1063021",
//     descripcion: "CONECTOR RJ 11",
//     uom: "UND",
//     tipo: "HFC-FTTH",
//   },
//   {
//     codigo: "1003254",
//     descripcion: "DIVISOR INTERIOR 2 VIAS",
//     uom: "UND",
//     tipo: "HFC",
//   },
//   {
//     codigo: "1003253",
//     descripcion: "DIVISOR INTERIOR 3 VIAS",
//     uom: "UND",
//     tipo: "HFC",
//   },
// ];

// // Maestro completo de herramientas
// const maestroHerramientas = [
//   {
//     codigo: "H-001",
//     descripcion: "ALICATE DE COMPRESIÓN",
//     uom: "UND",
//   },
//   {
//     codigo: "H-002",
//     descripcion: "DESTORNILLADOR PLANO",
//     uom: "UND",
//   },
//   {
//     codigo: "H-003",
//     descripcion: "DESTORNILLADOR ESTRELLA",
//     uom: "UND",
//   },
//   {
//     codigo: "H-004",
//     descripcion: "PELACABLES RG-6",
//     uom: "UND",
//   },
//   {
//     codigo: "H-005",
//     descripcion: "CRIMPADORA RJ-45",
//     uom: "UND",
//   },
// ];

// // Catálogo de equipos (se mantiene igual)
// const catalogoEquipos = [
//   {
//     codigo: "4059271",
//     descripcion: "MODEM ARRIS TG3442A 32x8 3.1",
//     uom: "UND",
//   },
//   {
//     codigo: "4050441",
//     descripcion: "MODEM SAGEMCOM F3890V3 32X8SB DOCSIS 3.1",
//     uom: "UND",
//   },
//   {
//     codigo: "4007984",
//     descripcion: "DECODIFICADOR MOTOROLA HD DCX-525",
//     uom: "UND",
//   },
// ];

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
//   {
//     codigo: "SOL-001",
//     entidad: "CLARO",
//     region: "Lima",
//     items: [
//       {
//         codigo: "1003101",
//         descripcion: "CABLE COAXIAL RG-6 AUTOSOPORTADO",
//         cantidad: 100,
//         unidadMedida: "MTS",
//         categoria: "MATERIAL",
//       },
//       {
//         codigo: "1004692",
//         descripcion: "CABLE UTP CAT5E FTP 4PR/24AWG 04070009",
//         cantidad: 50,
//         unidadMedida: "MTS",
//         categoria: "MATERIAL",
//       },
//       {
//         codigo: "H-001",
//         descripcion: "ALICATE DE COMPRESIÓN",
//         cantidad: 5,
//         unidadMedida: "UND",
//         categoria: "HERRAMIENTA",
//       },
//       {
//         codigo: "4059271",
//         descripcion: "MODEM ARRIS TG3442A 32x8 3.1",
//         cantidad: 20,
//         unidadMedida: "UND",
//         categoria: "EQUIPO",
//       },
//     ],
//   },
// ];

// export default function RecepcionMateriales() {
//   const [solicitudSeleccionada, setSolicitudSeleccionada] = useState("");
//   const [fechaRecepcion, setFechaRecepcion] = useState("");
//   const [codigoDocumento, setCodigoDocumento] = useState("");
//   const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null);

//   // Estados para items de recepción
//   const [itemsMateriales, setItemsMateriales] = useState<ItemRecepcion[]>([]);
//   const [itemsHerramientas, setItemsHerramientas] = useState<ItemRecepcion[]>([]);
//   const [itemsEquipos, setItemsEquipos] = useState<ItemRecepcion[]>([]);

//   // Estados de UI
//   const [tabActual, setTabActual] = useState(0);
//   const [confirmarCarga, setConfirmarCarga] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [search, setSearch] = useState("");
//   const [searchMateriales, setSearchMateriales] = useState("");
//   const [searchHerramientas, setSearchHerramientas] = useState("");
//   const [searchEquipos, setSearchEquipos] = useState("");

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
//   ]);

//   // Cargar items cuando se selecciona una solicitud
//   useEffect(() => {
//     if (solicitudSeleccionada) {
//       const solicitud = solicitudesDisponibles.find(
//         (s) => s.codigo === solicitudSeleccionada
//       );

//       if (solicitud) {
//         // Procesar materiales
//         const materialesCompletos = maestroMateriales.map((maestro) => {
//           const itemSolicitud = solicitud.items.find(
//             (item) => item.codigo === maestro.codigo && item.categoria === "MATERIAL"
//           );

//           return {
//             id: `mat-${maestro.codigo}`,
//             categoria: "MATERIAL" as CategoriaItem,
//             codigo: maestro.codigo,
//             descripcion: maestro.descripcion,
//             cantidadSolicitada: itemSolicitud?.cantidad || 0,
//             cantidadRecibida: itemSolicitud?.cantidad || 0,
//             unidadMedida: maestro.uom,
//             tipo: maestro.tipo,
//             estaEnSolicitud: !!itemSolicitud,
//           };
//         });

//         // Procesar herramientas
//         const herramientasCompletas = maestroHerramientas.map((maestro) => {
//           const itemSolicitud = solicitud.items.find(
//             (item) => item.codigo === maestro.codigo && item.categoria === "HERRAMIENTA"
//           );

//           return {
//             id: `herr-${maestro.codigo}`,
//             categoria: "HERRAMIENTA" as CategoriaItem,
//             codigo: maestro.codigo,
//             descripcion: maestro.descripcion,
//             cantidadSolicitada: itemSolicitud?.cantidad || 0,
//             cantidadRecibida: itemSolicitud?.cantidad || 0,
//             unidadMedida: maestro.uom,
//             estaEnSolicitud: !!itemSolicitud,
//           };
//         });

//         // Procesar equipos (solo los de la solicitud)
//         const equiposCompletos = solicitud.items
//           .filter((item) => item.categoria === "EQUIPO")
//           .map((item) => ({
//             id: `eq-${item.codigo}`,
//             categoria: "EQUIPO" as CategoriaItem,
//             codigo: item.codigo,
//             descripcion: item.descripcion,
//             cantidadSolicitada: item.cantidad,
//             cantidadRecibida: item.cantidad,
//             unidadMedida: item.unidadMedida,
//             estaEnSolicitud: true,
//           }));

//         setItemsMateriales(materialesCompletos);
//         setItemsHerramientas(herramientasCompletas);
//         setItemsEquipos(equiposCompletos);
//       }
//     } else {
//       setItemsMateriales([]);
//       setItemsHerramientas([]);
//       setItemsEquipos([]);
//     }
//   }, [solicitudSeleccionada]);

//   // Columnas para materiales
//   const columnasMateriales: GridColDef[] = [
//     {
//       field: "codigo",
//       headerName: "Código",
//       width: 150,
//       renderCell: (params) => (
//         <Chip
//           label={params.value}
//           size="small"
//           sx={{
//             bgcolor: params.row.estaEnSolicitud
//               ? categoriaConfig.MATERIAL.color
//               : "grey.400",
//             color: "white",
//             fontWeight: 600,
//           }}
//         />
//       ),
//     },
//     {
//       field: "descripcion",
//       headerName: "Descripción",
//       flex: 1,
//       minWidth: 300,
//     },
//     {
//       field: "tipo",
//       headerName: "Tipo",
//       width: 120,
//     },
//     {
//       field: "cantidadSolicitada",
//       headerName: "Solicitado",
//       width: 120,
//       align: "center",
//       headerAlign: "center",
//     },
//     {
//       field: "cantidadRecibida",
//       headerName: "Recibido",
//       width: 120,
//       editable: true,
//       align: "center",
//       headerAlign: "center",
//       type: "number",
//       renderCell: (params) => (
//         <Typography
//           variant="body2"
//           fontWeight={600}
//           sx={{
//             color: params.row.estaEnSolicitud
//               ? params.value === params.row.cantidadSolicitada
//                 ? "success.main"
//                 : "warning.main"
//               : "grey.500",
//           }}
//         >
//           {params.value}
//         </Typography>
//       ),
//     },
//     {
//       field: "unidadMedida",
//       headerName: "UOM",
//       width: 100,
//       align: "center",
//       headerAlign: "center",
//     },
//   ];

//   // Columnas para herramientas (similar)
//   const columnasHerramientas: GridColDef[] = [
//     {
//       field: "codigo",
//       headerName: "Código",
//       width: 150,
//       renderCell: (params) => (
//         <Chip
//           label={params.value}
//           size="small"
//           sx={{
//             bgcolor: params.row.estaEnSolicitud
//               ? categoriaConfig.HERRAMIENTA.color
//               : "grey.400",
//             color: "white",
//             fontWeight: 600,
//           }}
//         />
//       ),
//     },
//     {
//       field: "descripcion",
//       headerName: "Descripción",
//       flex: 1,
//       minWidth: 300,
//     },
//     {
//       field: "cantidadSolicitada",
//       headerName: "Solicitado",
//       width: 120,
//       align: "center",
//       headerAlign: "center",
//     },
//     {
//       field: "cantidadRecibida",
//       headerName: "Recibido",
//       width: 120,
//       editable: true,
//       align: "center",
//       headerAlign: "center",
//       type: "number",
//       renderCell: (params) => (
//         <Typography
//           variant="body2"
//           fontWeight={600}
//           sx={{
//             color: params.row.estaEnSolicitud
//               ? params.value === params.row.cantidadSolicitada
//                 ? "success.main"
//                 : "warning.main"
//               : "grey.500",
//           }}
//         >
//           {params.value}
//         </Typography>
//       ),
//     },
//     {
//       field: "unidadMedida",
//       headerName: "UOM",
//       width: 100,
//       align: "center",
//       headerAlign: "center",
//     },
//   ];

//   // Columnas para equipos
//   const columnasEquipos: GridColDef[] = [
//     {
//       field: "codigo",
//       headerName: "Código",
//       width: 150,
//       renderCell: (params) => (
//         <Chip
//           label={params.value}
//           size="small"
//           sx={{
//             bgcolor: categoriaConfig.EQUIPO.color,
//             color: "white",
//             fontWeight: 600,
//           }}
//         />
//       ),
//     },
//     {
//       field: "descripcion",
//       headerName: "Descripción",
//       flex: 1,
//       minWidth: 300,
//     },
//     {
//       field: "cantidadSolicitada",
//       headerName: "Solicitado",
//       width: 120,
//       align: "center",
//       headerAlign: "center",
//     },
//     {
//       field: "cantidadRecibida",
//       headerName: "Recibido",
//       width: 120,
//       editable: true,
//       align: "center",
//       headerAlign: "center",
//       type: "number",
//       renderCell: (params) => (
//         <Typography
//           variant="body2"
//           fontWeight={600}
//           sx={{
//             color:
//               params.value === params.row.cantidadSolicitada
//                 ? "success.main"
//                 : "warning.main",
//           }}
//         >
//           {params.value}
//         </Typography>
//       ),
//     },
//     {
//       field: "unidadMedida",
//       headerName: "UOM",
//       width: 100,
//       align: "center",
//       headerAlign: "center",
//     },
//   ];

//   // Columnas para historial
//   const columnasHistorial: GridColDef[] = [
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
//         <Chip label={params.value} size="small" color="info" sx={{ fontWeight: 600 }} />
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

//   // Handlers
//   const handleFileSelect = (file: File) => {
//     setArchivoSeleccionado(file);
//   };

//   const handleError = (error: string) => {
//     alert(error);
//   };

//   const processRowUpdate = (newRow: ItemRecepcion, oldRow: ItemRecepcion) => {
//     // Solo permitir editar si está en la solicitud
//     if (!newRow.estaEnSolicitud) {
//       return oldRow;
//     }

//     // Validar que no exceda lo solicitado
//     if (newRow.cantidadRecibida > newRow.cantidadSolicitada) {
//       alert("La cantidad recibida no puede exceder la cantidad solicitada");
//       return oldRow;
//     }

//     // Actualizar según categoría
//     if (newRow.categoria === "MATERIAL") {
//       setItemsMateriales((prev) =>
//         prev.map((item) => (item.id === newRow.id ? newRow : item))
//       );
//     } else if (newRow.categoria === "HERRAMIENTA") {
//       setItemsHerramientas((prev) =>
//         prev.map((item) => (item.id === newRow.id ? newRow : item))
//       );
//     } else if (newRow.categoria === "EQUIPO") {
//       setItemsEquipos((prev) =>
//         prev.map((item) => (item.id === newRow.id ? newRow : item))
//       );
//     }

//     return newRow;
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

//     console.log("Confirmando recepción...", {
//       solicitud: solicitudSeleccionada,
//       fechaRecepcion,
//       codigoDocumento,
//       materiales: itemsMateriales.filter((i) => i.estaEnSolicitud),
//       herramientas: itemsHerramientas.filter((i) => i.estaEnSolicitud),
//       equipos: itemsEquipos,
//       archivo: archivoSeleccionado,
//     });

//     setShowSuccess(true);

//     setTimeout(() => {
//       setShowSuccess(false);
//       setSolicitudSeleccionada("");
//       setFechaRecepcion("");
//       setCodigoDocumento("");
//       setArchivoSeleccionado(null);
//       setConfirmarCarga(false);
//     }, 3000);
//   };

//   const getTotales = () => {
//     const materialesSolicitados = itemsMateriales
//       .filter((i) => i.estaEnSolicitud)
//       .reduce((sum, item) => sum + item.cantidadSolicitada, 0);
//     const materialesRecibidos = itemsMateriales
//       .filter((i) => i.estaEnSolicitud)
//       .reduce((sum, item) => sum + item.cantidadRecibida, 0);

//     const herramientasSolicitadas = itemsHerramientas
//       .filter((i) => i.estaEnSolicitud)
//       .reduce((sum, item) => sum + item.cantidadSolicitada, 0);
//     const herramientasRecibidas = itemsHerramientas
//       .filter((i) => i.estaEnSolicitud)
//       .reduce((sum, item) => sum + item.cantidadRecibida, 0);

//     const equiposSolicitados = itemsEquipos.reduce(
//       (sum, item) => sum + item.cantidadSolicitada,
//       0
//     );
//     const equiposRecibidos = itemsEquipos.reduce(
//       (sum, item) => sum + item.cantidadRecibida,
//       0
//     );

//     return {
//       materialesSolicitados,
//       materialesRecibidos,
//       herramientasSolicitadas,
//       herramientasRecibidas,
//       equiposSolicitados,
//       equiposRecibidos,
//       totalSolicitado:
//         materialesSolicitados + herramientasSolicitadas + equiposSolicitados,
//       totalRecibido: materialesRecibidos + herramientasRecibidas + equiposRecibidos,
//     };
//   };

//   const totales = getTotales();
//   const solicitud = solicitudesDisponibles.find(
//     (s) => s.codigo === solicitudSeleccionada
//   );

//   // Filtrado de materiales
//   const materialesFiltrados = itemsMateriales.filter((item) =>
//     Object.values(item).join(" ").toLowerCase().includes(searchMateriales.toLowerCase())
//   );

//   const herramientasFiltradas = itemsHerramientas.filter((item) =>
//     Object.values(item).join(" ").toLowerCase().includes(searchHerramientas.toLowerCase())
//   );

//   const equiposFiltrados = itemsEquipos.filter((item) =>
//     Object.values(item).join(" ").toLowerCase().includes(searchEquipos.toLowerCase())
//   );

//   return (
//     <Box
//       sx={{
//         maxWidth: 1400,
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

//       {/* Mensaje de Éxito */}
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

//       {/* Formulario Principal */}
//       <Card
//         elevation={3}
//         sx={{
//           borderRadius: 4,
//           boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
//           p: 4,
//         }}
//       >
//         <SectionHeader
//           icon={<InventoryOutlined sx={{ fontSize: 28, color: "primary.main" }} />}
//           title="Datos de Recepción"
//           subtitle="Selecciona la solicitud y registra los datos básicos"
//         />

//         {/* Datos Básicos */}
//         <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
//           <Box sx={{ flex: "1 1 250px" }}>
//             <Typography variant="body2" color="text.secondary" fontWeight={600} mb={1}>
//               Solicitud de Abastecimiento *
//             </Typography>
//             <SelectBase
//               options={solicitudesDisponibles.map((s) => ({
//                 label: `${s.codigo} - ${s.entidad} (${s.region})`,
//                 value: s.codigo,
//               }))}
//               label=""
//               value={solicitudSeleccionada}
//               onChange={(value: any) => setSolicitudSeleccionada(value)}
//             />
//           </Box>

//           <Box sx={{ flex: "1 1 200px" }}>
//             <Typography variant="body2" color="text.secondary" fontWeight={600} mb={1}>
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
//             <Typography variant="body2" color="text.secondary" fontWeight={600} mb={1}>
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

//         {/* Info de Solicitud */}
//         {solicitud && (
//           <Fade in={true} timeout={600}>
//             <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
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

//         {/* Reportería de Materiales */}
//         {itemsMateriales.length > 0 && (
//           <Grow in={true} timeout={800}>
//             <Box>
//               <Divider sx={{ my: 3 }} />

//               <SectionHeader
//                 icon={<InventoryOutlined sx={{ fontSize: 24, color: "success.main" }} />}
//                 title="Resumen de Items"
//                 subtitle="Cantidades solicitadas vs recibidas"
//               />

//               {/* Resumen por Categoría */}
//               <Box
//                 sx={{
//                   mb: 3,
//                   display: "flex",
//                   gap: 2,
//                   flexWrap: "wrap",
//                 }}
//               >
//                 {/* Materiales */}
//                 <Card
//                   sx={{
//                     flex: "1 1 280px",
//                     p: 2.5,
//                     bgcolor: `${categoriaConfig.MATERIAL.color}10`,
//                     border: "2px solid",
//                     borderColor: categoriaConfig.MATERIAL.color,
//                   }}
//                 >
//                   <Typography
//                     variant="h6"
//                     fontWeight={600}
//                     mb={1}
//                     sx={{ color: categoriaConfig.MATERIAL.color }}
//                   >
//                     📦 Materiales
//                   </Typography>
//                   <Box sx={{ display: "flex", gap: 3 }}>
//                     <Box>
//                       <Typography variant="caption" color="text.secondary">
//                         Solicitado
//                       </Typography>
//                       <Typography variant="h5" fontWeight={700}>
//                         {totales.materialesSolicitados}
//                       </Typography>
//                     </Box>
//                     <Box>
//                       <Typography variant="caption" color="text.secondary">
//                         A Recibir
//                       </Typography>
//                       <Typography
//                         variant="h5"
//                         fontWeight={700}
//                         sx={{
//                           color:
//                             totales.materialesRecibidos === totales.materialesSolicitados
//                               ? "success.main"
//                               : "warning.main",
//                         }}
//                       >
//                         {totales.materialesRecibidos}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </Card>

//                 {/* Herramientas */}
//                 <Card
//                   sx={{
//                     flex: "1 1 280px",
//                     p: 2.5,
//                     bgcolor: `${categoriaConfig.HERRAMIENTA.color}10`,
//                     border: "2px solid",
//                     borderColor: categoriaConfig.HERRAMIENTA.color,
//                   }}
//                 >
//                   <Typography
//                     variant="h6"
//                     fontWeight={600}
//                     mb={1}
//                     sx={{ color: categoriaConfig.HERRAMIENTA.color }}
//                   >
//                     🔧 Herramientas
//                   </Typography>
//                   <Box sx={{ display: "flex", gap: 3 }}>
//                     <Box>
//                       <Typography variant="caption" color="text.secondary">
//                         Solicitado
//                       </Typography>
//                       <Typography variant="h5" fontWeight={700}>
//                         {totales.herramientasSolicitadas}
//                       </Typography>
//                     </Box>
//                     <Box>
//                       <Typography variant="caption" color="text.secondary">
//                         A Recibir
//                       </Typography>
//                       <Typography
//                         variant="h5"
//                         fontWeight={700}
//                         sx={{
//                           color:
//                             totales.herramientasRecibidas ===
//                             totales.herramientasSolicitadas
//                               ? "success.main"
//                               : "warning.main",
//                         }}
//                       >
//                         {totales.herramientasRecibidas}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </Card>

//                 {/* Equipos */}
//                 <Card
//                   sx={{
//                     flex: "1 1 280px",
//                     p: 2.5,
//                     bgcolor: `${categoriaConfig.EQUIPO.color}10`,
//                     border: "2px solid",
//                     borderColor: categoriaConfig.EQUIPO.color,
//                   }}
//                 >
//                   <Typography
//                     variant="h6"
//                     fontWeight={600}
//                     mb={1}
//                     sx={{ color: categoriaConfig.EQUIPO.color }}
//                   >
//                     ⚙️ Equipos
//                   </Typography>
//                   <Box sx={{ display: "flex", gap: 3 }}>
//                     <Box>
//                       <Typography variant="caption" color="text.secondary">
//                         Solicitado
//                       </Typography>
//                       <Typography variant="h5" fontWeight={700}>
//                         {totales.equiposSolicitados}
//                       </Typography>
//                     </Box>
//                     <Box>
//                       <Typography variant="caption" color="text.secondary">
//                         A Recibir
//                       </Typography>
//                       <Typography
//                         variant="h5"
//                         fontWeight={700}
//                         sx={{
//                           color:
//                             totales.equiposRecibidos === totales.equiposSolicitados
//                               ? "success.main"
//                               : "warning.main",
//                         }}
//                       >
//                         {totales.equiposRecibidos}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </Card>
//               </Box>

//               <Divider sx={{ my: 3 }} />

//               {/* DataGrids por Categoría con Tabs */}
//               <Box>
//                 <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
//                   <Tabs value={tabActual} onChange={(_, newValue) => setTabActual(newValue)}>
//                     <Tab
//                       label={`Materiales (${itemsMateriales.filter((i) => i.estaEnSolicitud).length})`}
//                       icon={<span>📦</span>}
//                       iconPosition="start"
//                     />
//                     <Tab
//                       label={`Herramientas (${itemsHerramientas.filter((i) => i.estaEnSolicitud).length})`}
//                       icon={<span>🔧</span>}
//                       iconPosition="start"
//                     />
//                     <Tab
//                       label={`Equipos (${itemsEquipos.length})`}
//                       icon={<span>⚙️</span>}
//                       iconPosition="start"
//                     />
//                   </Tabs>
//                 </Box>

//                 {/* Tab Materiales */}
//                 {tabActual === 0 && (
//                   <Box>
//                     <TextField
//                       fullWidth
//                       size="small"
//                       placeholder="Buscar material por código o descripción..."
//                       value={searchMateriales}
//                       onChange={(e) => setSearchMateriales(e.target.value)}
//                       sx={{ mb: 2 }}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <SearchOutlined />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                     <Box sx={{ height: "auto" }}>
//                       <CustomDataGrid
//                         columns={columnasMateriales}
//                         localRows={materialesFiltrados}
//                         checkboxSelection={true}
//                         serverSide={false}
//                         search=""
//                         onSearch={() => {}}
//                         pageSize={50}
//                         editMode="cell"
//                         processRowUpdate={processRowUpdate}
//                         showToolbar={false}
//                         sx={{
//                           "& .MuiDataGrid-row": {
//                             "&:hover": {
//                               bgcolor: "action.hover",
//                             },
//                           },
//                           "& .MuiDataGrid-cell[data-field='cantidadRecibida']": {
//                             bgcolor: "background.default",
//                           },
//                         }}
//                       />
//                     </Box>
//                   </Box>
//                 )}

//                 {/* Tab Herramientas */}
//                 {tabActual === 1 && (
//                   <Box>
//                     <TextField
//                       fullWidth
//                       size="small"
//                       placeholder="Buscar herramienta por código o descripción..."
//                       value={searchHerramientas}
//                       onChange={(e) => setSearchHerramientas(e.target.value)}
//                       sx={{ mb: 2 }}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <SearchOutlined />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                     <Box sx={{ height: 400 }}>
//                       <CustomDataGrid
//                         columns={columnasHerramientas}
//                         localRows={herramientasFiltradas}
//                         serverSide={false}
//                         search=""
//                         onSearch={() => {}}
//                         pageSize={50}
//                         editMode="cell"
//                         processRowUpdate={processRowUpdate}
//                         showToolbar={false}
//                       />
//                     </Box>
//                   </Box>
//                 )}

//                 {/* Tab Equipos */}
//                 {tabActual === 2 && (
//                   <Box>
//                     <TextField
//                       fullWidth
//                       size="small"
//                       placeholder="Buscar equipo por código o descripción..."
//                       value={searchEquipos}
//                       onChange={(e) => setSearchEquipos(e.target.value)}
//                       sx={{ mb: 2 }}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <SearchOutlined />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                     <Box sx={{ height: 400 }}>
//                       <CustomDataGrid
//                         columns={columnasEquipos}
//                         localRows={equiposFiltrados}
//                         serverSide={false}
//                         search=""
//                         onSearch={() => {}}
//                         pageSize={50}
//                         editMode="cell"
//                         processRowUpdate={processRowUpdate}
//                         showToolbar={false}
//                       />
//                     </Box>
//                   </Box>
//                 )}
//               </Box>

//               <Divider sx={{ my: 3 }} />

//               {/* Confirmación (con guía de remisión incluida) */}
//               <Box>
//                 <SectionHeader
//                   iconBgColor="#ffa500"
//                   icon={<WarningAmberOutlined sx={{ fontSize: 24, color: "#ffff" }} />}
//                   title="Confirmación de Recepción"
//                   subtitle="Adjunta la guía de remisión y confirma la recepción"
//                 />

//                 {/* Guía de Remisión */}
//                 <Box
//                   sx={{
//                     border: "2px dashed",
//                     borderColor: "divider",
//                     borderRadius: 3,
//                     p: 3,
//                     bgcolor: "background.default",
//                     mb: 3,
//                   }}
//                 >
//                   <Typography variant="body2" fontWeight={600} mb={2}>
//                     📄 Guía de Remisión (PDF o Imagen)
//                   </Typography>
//                   <FileUploader
//                     accept=".pdf,.jpg,.jpeg,.png"
//                     maxSize={10}
//                     onFileSelect={handleFileSelect}
//                     onError={handleError}
//                   />

//                   {archivoSeleccionado && (
//                     <Fade in={true} timeout={600}>
//                       <Box
//                         sx={{
//                           mt: 2,
//                           p: 2,
//                           bgcolor: "success.lighter",
//                           borderRadius: 2,
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 2,
//                         }}
//                       >
//                         {archivoSeleccionado.type === "application/pdf" ? (
//                           <PictureAsPdfOutlined
//                             sx={{ color: "error.main", fontSize: 32 }}
//                           />
//                         ) : (
//                           <ImageOutlined sx={{ color: "info.main", fontSize: 32 }} />
//                         )}
//                         <Box sx={{ flex: 1 }}>
//                           <Typography variant="body2" fontWeight={600}>
//                             {archivoSeleccionado.name}
//                           </Typography>
//                           <Typography variant="caption" color="text.secondary">
//                             {(archivoSeleccionado.size / 1024 / 1024).toFixed(2)} MB
//                           </Typography>
//                         </Box>
//                         <IconButton
//                           size="small"
//                           onClick={() => setArchivoSeleccionado(null)}
//                         >
//                           <CloseOutlined />
//                         </IconButton>
//                       </Box>
//                     </Fade>
//                   )}
//                 </Box>

//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={confirmarCarga}
//                       onChange={(e) => setConfirmarCarga(e.target.checked)}
//                       color="primary"
//                     />
//                   }
//                   label={
//                     <Typography variant="body2" fontWeight={500}>
//                       Confirmo que he verificado los materiales recibidos y las cantidades
//                       son correctas
//                     </Typography>
//                   }
//                   sx={{ mb: 2 }}
//                 />

//                 <Alert severity="warning" sx={{ borderRadius: 2, mb: 3 }}>
//                   <Typography variant="body2">
//                     Se registrará la recepción de materiales como tipo de movimiento:{" "}
//                     <strong>ENTRADA/ACOPIO</strong>
//                   </Typography>
//                 </Alert>

//                 <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
//                   <Button
//                     variant="outlined"
//                     size="large"
//                     onClick={() => {
//                       setSolicitudSeleccionada("");
//                       setArchivoSeleccionado(null);
//                     }}
//                     sx={{ px: 4, py: 1.5, textTransform: "none", fontWeight: 600 }}
//                   >
//                     Cancelar
//                   </Button>
//                   <Button
//                     variant="contained"
//                     size="large"
//                     startIcon={<CheckCircleOutline />}
//                     onClick={handleConfirmarRecepcion}
//                     disabled={!confirmarCarga || !archivoSeleccionado}
//                     sx={{ px: 4, py: 1.5, textTransform: "none", fontWeight: 600 }}
//                   >
//                     Confirmar Recepción
//                   </Button>
//                 </Box>
//               </Box>
//             </Box>
//           </Grow>
//         )}
//       </Card>

//       {/* Historial */}
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
//           subtitle="Registro de todas las recepciones realizadas"
//         />

//         <Divider sx={{ my: 3 }} />

//         <CustomDataGrid
//           columns={columnasHistorial}
//           localRows={historialRows}
//           serverSide={false}
//           search={search}
//           onSearch={setSearch}
//           pageSize={10}
//           onView={(row) => {
//             alert(`Ver detalles de: ${row.solicitud}`);
//           }}
//         />
//       </Card>
//     </Box>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import {
  Box, Card, Typography, TextField, Divider, Alert, Fade, Chip,
  CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Stack, Paper, InputAdornment, Tabs, Tab,
  FormControlLabel, Switch,
} from "@mui/material";
import {
  InventoryOutlined, CheckCircleOutline, WarningAmberOutlined,
  SearchOutlined, CloseOutlined, PictureAsPdfOutlined, ImageOutlined,
  ArrowBackOutlined, QrCodeScannerOutlined, FilterListOutlined,
  AssignmentOutlined, CheckCircle, AutoAwesomeOutlined,
} from "@mui/icons-material";
import { TitleCard } from "@/src/components/base/TitleCard";
import { SectionHeader } from "@/src/components/base/SectionHeader";
import { FileUploader } from "@/src/components/base/FileUploader";
import CustomDataGrid from "@/src/components/base/CustomDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import SelectBase from "@/src/components/base/SelectBase";
import DatePickerBase from "@/src/components/base/DatePickerBase";
import ButtonBase from "@/src/components/base/ButtonBase";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/Store";
import { CatalogService } from "@/src/services/api/CatalogService";
import { CatalogDTO } from "@/src/types/Catalog.types";
import { API_URL } from "@/src/lib/config";
import dayjs, { Dayjs } from "dayjs";

// ─── Tipos ─────────────────────────────────────────────────────────────────

interface SupplyRequestSummary {
  id: number;
  status: string;
  notes: string;
  materialQuantity: number;
  toolQuantity: number;
  equipmentQuantity: number;
}

interface SupplyRequestItem {
  itemCode: string;
  itemDescription: string;
  productType: "MATERIAL" | "EQUIPMENT" | "TOOL";
  quantityUsedInPeriod: number;
  requestedQuantity: number;
  deliveredQuantity: number;
  pendingQuantity: number;
  unitPrice: number | null;
  totalPrice: number | null;
  receivedQuantity?: number;
  serials?: EquipoSerial[];
}

interface EquipoSerial {
  serialNumber: string;
  mac?: string;
  ua?: string;
  mtaMac?: string;
}

type EquipoTipo = "MODEM" | "DECODIFICADOR" | "ROUTER" | "SWITCH" | "OTRO";

const getEquipoTipo = (_codigo: string, descripcion: string): EquipoTipo => {
  const desc = descripcion.toUpperCase();
  if (desc.includes("MODEM")) return "MODEM";
  if (desc.includes("DECODIFICADOR")) return "DECODIFICADOR";
  if (desc.includes("ROUTER") || desc.includes("WIFI")) return "ROUTER";
  if (desc.includes("SWITCH")) return "SWITCH";
  return "OTRO";
};

const camposEquipo: Record<EquipoTipo, { field: string; label: string; placeholder: string }[]> = {
  MODEM: [
    { field: "serialNumber", label: "Número de Serie", placeholder: "Escanear o ingresar S/N..." },
    { field: "mac",          label: "MAC Address",     placeholder: "XX:XX:XX:XX:XX:XX" },
    { field: "ua",           label: "UA",              placeholder: "Ingresar UA..." },
  ],
  DECODIFICADOR: [
    { field: "serialNumber", label: "Número de Serie", placeholder: "Escanear o ingresar S/N..." },
    { field: "mac",          label: "MAC Address",     placeholder: "XX:XX:XX:XX:XX:XX" },
  ],
  ROUTER: [
    { field: "serialNumber", label: "Número de Serie", placeholder: "Escanear o ingresar S/N..." },
    { field: "mac",          label: "MAC Address",     placeholder: "XX:XX:XX:XX:XX:XX" },
    { field: "mtaMac",       label: "MTA MAC",         placeholder: "XX:XX:XX:XX:XX:XX" },
  ],
  SWITCH: [
    { field: "serialNumber", label: "Número de Serie", placeholder: "Escanear o ingresar S/N..." },
    { field: "mac",          label: "MAC Address",     placeholder: "XX:XX:XX:XX:XX:XX" },
  ],
  OTRO: [
    { field: "serialNumber", label: "Número de Serie", placeholder: "Escanear o ingresar S/N..." },
  ],
};

const categoriaConfig = {
  MATERIAL:  { label: "Materiales",   color: "#ed6c02", bg: "#fff3e0" },
  TOOL:      { label: "Herramientas", color: "#1976d2", bg: "#e3f2fd" },
  EQUIPMENT: { label: "Equipos",      color: "#2e7d32", bg: "#e8f5e9" },
};

// ─── Componente ─────────────────────────────────────────────────────────────

export default function RecepcionMateriales() {
  const topRef = useRef<HTMLDivElement>(null);
  const company = useSelector((state: RootState) => state.companies.company);

  const [catalogos, setCatalogos]       = useState<CatalogDTO>({ companies: [], projects: [] });
  const [projectOptions, setProjectOptions] = useState<{ label: string; value: any }[]>([]);
  const [receptionDate, setReceptionDate]   = useState<Dayjs | null>(dayjs());
  const [selectedProject, setSelectedProject] = useState<string | number | null>(null);

  const [vista, setVista] = useState<"list" | "detail">("list");

  const [solicitudes, setSolicitudes]       = useState<SupplyRequestSummary[]>([]);
  const [solicitudDetalle, setSolicitudDetalle] = useState<any | null>(null);
  const [loadingList, setLoadingList]       = useState(false);
  const [loadingDetail, setLoadingDetail]   = useState(false);
  const [errorMsg, setErrorMsg]             = useState("");

  // ✅ Estado de éxito para mostrar pantalla animada
  const [showSuccess, setShowSuccess]       = useState(false);
  const [successData, setSuccessData]       = useState<{ id: number; totalItems: number } | null>(null);

  const [tabActual, setTabActual]           = useState(0);
  const [itemsRecepcion, setItemsRecepcion] = useState<SupplyRequestItem[]>([]);
  const [archivoGuia, setArchivoGuia]       = useState<File | null>(null);
  const [codigoGuia, setCodigoGuia]         = useState("");

  // Modal escaneo
  const [modalEquipoOpen, setModalEquipoOpen]       = useState(false);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<SupplyRequestItem | null>(null);
const [serialActual, setSerialActual]   = useState<Partial<EquipoSerial>>({});
  const [camposError, setCamposError]     = useState<Record<string, string>>({}); // ✅ nuevo

  const [serialesCapturados, setSerialésCapturados] = useState<EquipoSerial[]>([]);
  const [autoGuardar, setAutoGuardar]               = useState(true); // ✅ Checkbox auto-guardar

  const [searchMat,     setSearchMat]     = useState("");
  const [searchTool,    setSearchTool]    = useState("");
  const [searchEq,      setSearchEq]      = useState("");
  const [searchListado, setSearchListado] = useState("");

  // Reglas de validación por campo
const validacionesCampo: Record<string, { regex: RegExp; mensaje: string }> = {
  serialNumber: {
    regex: /^[A-Z0-9]{14,20}$/,
    mensaje: "Serie inválida (ej: ZTEATV45501950107 — alfanumérico, 14-20 chars)",
  },
  mac: {
    regex: /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/,
    mensaje: "MAC inválida (ej: 6C:B8:81:F2:B7:D7 — formato XX:XX:XX:XX:XX:XX)",
  },
  mtaMac: {
    regex: /^[0-9A-Fa-f]{12}$/,
    mensaje: "MTA MAC inválida (ej: CC00F1CA6351 — 12 caracteres hex sin separadores)",
  },
  ua: {
    regex: /^.{8}$/,
    mensaje: "UA inválido (debe tener exactamente 8 caracteres)",
  },
};

  // ── Catálogos ─────────────────────────────────────────────────────────────
  useEffect(() => {
    CatalogService.getAllCatalogs()
      .then(data => setCatalogos({ companies: data.companies, projects: data.projects }))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const opts = catalogos.projects
      .filter(p => String(p.companyId) === String(company))
      .map(p => ({ label: p.name, value: p.id }));
    setProjectOptions(opts);
    setSelectedProject(null);
  }, [company, catalogos]);

  // ── Scroll top cuando se muestra éxito ────────────────────────────────────
  useEffect(() => {
    if (showSuccess) {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showSuccess]);

  // ── Buscar Solicitudes ────────────────────────────────────────────────────
  const handleBuscarSolicitudes = async () => {
    if (!selectedProject) { setErrorMsg("Selecciona un proyecto"); return; }
    setLoadingList(true);
    setErrorMsg("");
    try {
      const fecha = receptionDate?.format("YYYY-MM-DD") ?? dayjs().format("YYYY-MM-DD");
      const res = await fetch(
        `${API_URL}/api/hub-supply/supply-requests?companyId=${company}&projectId=${selectedProject}&receptionDate=${fecha}`
      );
      if (!res.ok) throw new Error("Error al obtener solicitudes");
      setSolicitudes(await res.json());
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setLoadingList(false);
    }
  };

  // ── Ver Detalle ───────────────────────────────────────────────────────────
  const handleVerDetalle = async (solicitudId: number) => {
    setLoadingDetail(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${API_URL}/api/hub-supply/companies/${company}/supply-requests/${solicitudId}`);
      if (!res.ok) throw new Error("Error al obtener detalle");
      const raw = await res.json();
      const detalle = Array.isArray(raw) ? raw[0] : raw;
      setSolicitudDetalle(detalle);
      const items: SupplyRequestItem[] = (detalle.items ?? []).map((item: any) => ({
        ...item,
        receivedQuantity: item.pendingQuantity ?? item.requestedQuantity,
        serials: [],
      }));
      setItemsRecepcion(items);
      setVista("detail");
      setTabActual(0);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Error al cargar detalle");
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleVolverLista = () => {
    setVista("list");
    setSolicitudDetalle(null);
    setItemsRecepcion([]);
    setArchivoGuia(null);
    setCodigoGuia("");
    setTabActual(0);
    setShowSuccess(false);
  };

  // ── Row update ────────────────────────────────────────────────────────────
  const processRowUpdate = (newRow: any) => {
    setItemsRecepcion(prev =>
      prev.map(item => item.itemCode === newRow.itemCode ? { ...item, receivedQuantity: newRow.receivedQuantity } : item)
    );
    return newRow;
  };

  // ── Modal Escaneo ─────────────────────────────────────────────────────────
  // const abrirModalEquipo = (item: SupplyRequestItem) => {
  //   setEquipoSeleccionado(item);
  //   setSerialActual({});
  //   const existentes = itemsRecepcion.find(i => i.itemCode === item.itemCode)?.serials ?? [];
  //   setSerialésCapturados([...existentes]);
  //   setModalEquipoOpen(true);
  // };
  const abrirModalEquipo = (item: SupplyRequestItem) => {
  setEquipoSeleccionado(item);
  setSerialActual({});
  setCamposError({}); // ✅ limpiar errores al abrir
  const existentes = itemsRecepcion.find(i => i.itemCode === item.itemCode)?.serials ?? [];
  setSerialésCapturados([...existentes]);
  setModalEquipoOpen(true);
};

  // ✅ Auto-guardar: verifica si todos los campos del serial están completos
  // const checkAutoAgregar = (nuevoSerial: Partial<EquipoSerial>, tipo: EquipoTipo, totalReq: number, currentList: EquipoSerial[]) => {
  //   if (!autoGuardar) return;
  //   const campos = camposEquipo[tipo];
  //   const todoCompleto = campos.every(c => !!(nuevoSerial as any)[c.field]?.trim());
  //   if (!todoCompleto) return;

  //   const nuevo: EquipoSerial = { ...nuevoSerial } as EquipoSerial;
  //   const nuevaLista = [...currentList, nuevo];
  //   setSerialésCapturados(nuevaLista);
  //   setSerialActual({});

  //   // Si alcanzamos el total requerido, guardar y cerrar automáticamente
  //   if (nuevaLista.length >= totalReq && equipoSeleccionado) {
  //     guardarSerialesConLista(nuevaLista);
  //   }
  // };

  // const handleCampoChange = (field: string, value: string, tipo: EquipoTipo, totalReq: number) => {
  //   const updated = { ...serialActual, [field]: value };
  //   setSerialActual(updated);
  //   checkAutoAgregar(updated, tipo, totalReq, serialesCapturados);
  // };
  const validarCampo = (field: string, value: string): string => {
  if (!value.trim()) return "";
  const regla = validacionesCampo[field];
  if (!regla) return "";
  return regla.regex.test(value.trim()) ? "" : regla.mensaje;
};

const checkAutoAgregar = (
  nuevoSerial: Partial<EquipoSerial>,
  tipo: EquipoTipo,
  totalReq: number,
  currentList: EquipoSerial[]
) => {
  if (!autoGuardar) return;
  const campos = camposEquipo[tipo];

  // Verificar que todos los campos tengan valor
  const todoCompleto = campos.every(c => !!(nuevoSerial as any)[c.field]?.trim());
  if (!todoCompleto) return;

  // Verificar que ningún campo tenga error de validación
  const hayErrores = campos.some(c => {
    const val = (nuevoSerial as any)[c.field] ?? "";
    return !!validarCampo(c.field, val);
  });
  if (hayErrores) return;

  const nuevo: EquipoSerial = { ...nuevoSerial } as EquipoSerial;
  const nuevaLista = [...currentList, nuevo];
  setSerialésCapturados(nuevaLista);
  setSerialActual({});
  setCamposError({});

  if (nuevaLista.length >= totalReq && equipoSeleccionado) {
    guardarSerialesConLista(nuevaLista);
  }
};

const handleCampoChange = (field: string, value: string, tipo: EquipoTipo, totalReq: number) => {
  const updated = { ...serialActual, [field]: value };
  setSerialActual(updated);

  // Validar campo en tiempo real solo si ya tiene suficientes chars
  const regla = validacionesCampo[field];
  if (regla && value.trim()) {
    const error = validarCampo(field, value);
    setCamposError(prev => ({ ...prev, [field]: error }));
  } else {
    setCamposError(prev => ({ ...prev, [field]: "" }));
  }

  checkAutoAgregar(updated, tipo, totalReq, serialesCapturados);
};

  // const agregarSerial = () => {
  //   if (!serialActual.serialNumber?.trim()) return;
  //   setSerialésCapturados(prev => [...prev, { ...serialActual } as EquipoSerial]);
  //   setSerialActual({});
  // };
const agregarSerial = () => {
  if (!equipoSeleccionado) return;
  const tipo = getEquipoTipo(equipoSeleccionado.itemCode, equipoSeleccionado.itemDescription);
  const campos = camposEquipo[tipo];

  // Validar todos los campos
  const nuevosErrores: Record<string, string> = {};
  let hayError = false;
  campos.forEach(c => {
    const val = (serialActual as any)[c.field] ?? "";
    const err = validarCampo(c.field, val);
    if (err) { nuevosErrores[c.field] = err; hayError = true; }
    if (!val.trim()) { nuevosErrores[c.field] = `${c.label} es requerido`; hayError = true; }
  });

  if (hayError) { setCamposError(nuevosErrores); return; }

  setSerialésCapturados(prev => [...prev, { ...serialActual } as EquipoSerial]);
  setSerialActual({});
  setCamposError({});
};

  const eliminarSerial = (idx: number) => {
    setSerialésCapturados(prev => prev.filter((_, i) => i !== idx));
  };

  const guardarSerialesConLista = (lista: EquipoSerial[]) => {
    if (!equipoSeleccionado) return;
    setItemsRecepcion(prev =>
      prev.map(item =>
        item.itemCode === equipoSeleccionado.itemCode
          ? { ...item, serials: lista, receivedQuantity: lista.length }
          : item
      )
    );
    setModalEquipoOpen(false);
  };

  const guardarSeriales = () => {
    guardarSerialesConLista(serialesCapturados);
  };

  // ── Confirmar Recepción ────────────────────────────────────────────────────
  const handleConfirmarRecepcion = async () => {
    if (!archivoGuia) { setErrorMsg("Adjunta la guía de remisión"); return; }
    if (!codigoGuia)  { setErrorMsg("Ingresa el código de guía"); return; }
    setErrorMsg("");
    try {
      console.log("Confirmando...", { solicitudDetalle, itemsRecepcion, codigoGuia, archivoGuia });
      // TODO: POST al endpoint de confirmación
      setSuccessData({ id: solicitudDetalle.id, totalItems: itemsRecepcion.length });
      setShowSuccess(true);
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Error al confirmar recepción");
    }
  };

  // ── Derivados ─────────────────────────────────────────────────────────────
  const materialesItems   = itemsRecepcion.filter(i => i.productType === "MATERIAL");
  const herramientasItems = itemsRecepcion.filter(i => i.productType === "TOOL");
  const equiposItems      = itemsRecepcion.filter(i => i.productType === "EQUIPMENT");

  const filtrar = (arr: SupplyRequestItem[], q: string) =>
    arr.filter(i => `${i.itemCode} ${i.itemDescription}`.toLowerCase().includes(q.toLowerCase()));

  const equiposCompletos = equiposItems.every(eq => (eq.serials?.length ?? 0) >= eq.requestedQuantity);

  // ── Columnas Listado ──────────────────────────────────────────────────────
  const columnasSolicitudes: GridColDef[] = [
    {
      field: "id", headerName: "ID", width: 80,
      renderCell: p => <Chip label={`#${p.value}`} size="small" color="primary" sx={{ fontWeight: 700 }} />,
    },
    {
      field: "status", headerName: "Estado", width: 130,
      renderCell: p => (
        <Chip label={p.value} size="small"
          color={p.value === "APPROVED" ? "success" : p.value === "DRAFT" ? "warning" : "default"}
          sx={{ fontWeight: 700 }} />
      ),
    },
    {
      field: "materialQuantity", headerName: "Materiales", width: 110, align: "center", headerAlign: "center",
      renderCell: p => <Chip label={p.value} size="small" sx={{ bgcolor: "#fff3e0", color: "#ed6c02", fontWeight: 700 }} />,
    },
    {
      field: "toolQuantity", headerName: "Herramientas", width: 120, align: "center", headerAlign: "center",
      renderCell: p => <Chip label={p.value} size="small" sx={{ bgcolor: "#e3f2fd", color: "#1976d2", fontWeight: 700 }} />,
    },
    {
      field: "equipmentQuantity", headerName: "Equipos", width: 100, align: "center", headerAlign: "center",
      renderCell: p => <Chip label={p.value} size="small" sx={{ bgcolor: "#e8f5e9", color: "#2e7d32", fontWeight: 700 }} />,
    },
    {
      field: "notes", headerName: "Período / Notas", flex: 1,
      renderCell: p => (
        <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "normal", lineHeight: 1.4 }}>
          {p.value}
        </Typography>
      ),
    },
  ];

  const buildColumnas = (color: string): GridColDef[] => [
    {
      field: "itemCode", headerName: "Código", width: 150,
      renderCell: p => <Chip label={p.value} size="small" sx={{ bgcolor: color, color: "white", fontWeight: 700 }} />,
    },
    { field: "itemDescription", headerName: "Descripción", flex: 1, minWidth: 240 },
    { field: "requestedQuantity", headerName: "Solicitado", width: 110, align: "center", headerAlign: "center" },
    {
      field: "receivedQuantity", headerName: "A Recibir", width: 120,
      editable: true, type: "number", align: "center", headerAlign: "center",
      renderCell: p => (
        <Typography variant="body2" fontWeight={700}
          sx={{ color: p.value === p.row.requestedQuantity ? "success.main" : "warning.main" }}>
          {p.value}
        </Typography>
      ),
    },
    {
      field: "pendingQuantity", headerName: "Pendiente", width: 110, align: "center", headerAlign: "center",
      renderCell: p => (
        <Typography variant="body2" fontWeight={600} color={p.value > 0 ? "error.main" : "success.main"}>
          {p.value}
        </Typography>
      ),
    },
  ];

  const columnasEquipos: GridColDef[] = [
    {
      field: "itemCode", headerName: "Código", width: 150,
      renderCell: p => <Chip label={p.value} size="small" sx={{ bgcolor: "#2e7d32", color: "white", fontWeight: 700 }} />,
    },
    { field: "itemDescription", headerName: "Descripción", flex: 1, minWidth: 240 },
    { field: "requestedQuantity", headerName: "Solicitado", width: 100, align: "center", headerAlign: "center" },
    {
      field: "serials", headerName: "Capturados", width: 130, align: "center", headerAlign: "center",
      renderCell: p => {
        const cap = itemsRecepcion.find(i => i.itemCode === p.row.itemCode)?.serials?.length ?? 0;
        return (
          <Chip label={`${cap} / ${p.row.requestedQuantity}`} size="small"
            color={cap === p.row.requestedQuantity ? "success" : cap > 0 ? "warning" : "default"}
            sx={{ fontWeight: 700 }} />
        );
      },
    },
    {
      field: "acciones", headerName: "Pistolear", width: 130, sortable: false,
      renderCell: p => (
        <ButtonBase size="small" label="Escanear"
          startIcon={<QrCodeScannerOutlined />}
          onClick={() => abrirModalEquipo(p.row)}
          sx={{ fontSize: "0.72rem", px: 1.5 }}
        />
      ),
    },
  ];

  // ─── RENDER ──────────────────────────────────────────────────────────────
  return (
    <Box ref={topRef} sx={{ maxWidth: 1400, mx: "auto", p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
      <TitleCard
        icon={<InventoryOutlined sx={{ fontSize: 32 }} />}
        title="Recepción de Materiales"
        description="Gestión de entrada de materiales, equipos y herramientas provenientes del proveedor logístico"
      />

      {errorMsg && (
        <Alert severity="error" onClose={() => setErrorMsg("")} sx={{ borderRadius: 2 }}>
          {errorMsg}
        </Alert>
      )}

      {/* ══════════════ PANTALLA ÉXITO ════════════════════════════════════ */}
      <Fade in={showSuccess} timeout={700} unmountOnExit>
        <Box>
          <Card elevation={0} sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)",
            border: "2px solid #bbf7d0",
            p: { xs: 4, md: 6 },
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Decoración fondo */}
            <Box sx={{
              position: "absolute", top: -60, right: -60,
              width: 200, height: 200, borderRadius: "50%",
              bgcolor: "rgba(34,197,94,0.08)",
            }} />
            <Box sx={{
              position: "absolute", bottom: -40, left: -40,
              width: 160, height: 160, borderRadius: "50%",
              bgcolor: "rgba(34,197,94,0.06)",
            }} />

            {/* Ícono animado */}
            <Box sx={{
              width: 90, height: 90, borderRadius: "50%",
              bgcolor: "#22c55e", mx: "auto", mb: 3,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 0 16px rgba(34,197,94,0.12), 0 0 0 32px rgba(34,197,94,0.06)",
              animation: "pulseRing 2s ease-in-out infinite",
              "@keyframes pulseRing": {
                "0%, 100%": { boxShadow: "0 0 0 16px rgba(34,197,94,0.12), 0 0 0 32px rgba(34,197,94,0.06)" },
                "50%":       { boxShadow: "0 0 0 20px rgba(34,197,94,0.08), 0 0 0 40px rgba(34,197,94,0.03)" },
              },
            }}>
              <CheckCircleOutline sx={{ fontSize: 48, color: "white" }} />
            </Box>

            <Typography variant="h4" fontWeight={800} sx={{ color: "#15803d", mb: 1 }}>
              ¡Recepción Confirmada!
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400 }}>
              La solicitud #{successData?.id} ha sido ingresada al sistema correctamente
            </Typography>

            {/* Cards de resumen */}
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 4 }}>
              <Paper elevation={0} sx={{ px: 3, py: 2, borderRadius: 3, border: "1px solid #bbf7d0", bgcolor: "white", minWidth: 130 }}>
                <Typography variant="h4" fontWeight={800} sx={{ color: "#15803d" }}>
                  {successData?.totalItems}
                </Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Items registrados
                </Typography>
              </Paper>
              <Paper elevation={0} sx={{ px: 3, py: 2, borderRadius: 3, border: "1px solid #bbf7d0", bgcolor: "white", minWidth: 130 }}>
                <Typography variant="h4" fontWeight={800} sx={{ color: "#0369a1" }}>
                  ENTRADA
                </Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Tipo de movimiento
                </Typography>
              </Paper>
              <Paper elevation={0} sx={{ px: 3, py: 2, borderRadius: 3, border: "1px solid #bbf7d0", bgcolor: "white", minWidth: 130 }}>
                <Typography variant="h4" fontWeight={800} sx={{ color: "#7c3aed" }}>
                  ACOPIO
                </Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Destino
                </Typography>
              </Paper>
            </Box>

            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              <ButtonBase
                label="Nueva Recepción"
                startIcon={<InventoryOutlined />}
                onClick={handleVolverLista}
                sx={{ px: 4, py: 1.5, fontWeight: 700, boxShadow: "0 4px 12px rgba(34,197,94,0.3)", borderRadius: 2.5 }}
              />
            </Stack>
          </Card>
        </Box>
      </Fade>

      {/* ══════════════ VISTA LISTADO ══════════════════════════════════════ */}
      <Fade in={vista === "list" && !showSuccess} timeout={500} unmountOnExit>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

          {/* Panel Filtros Enterprise */}
          <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", overflow: "hidden" }}>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" } }}>
              <Box sx={{ flex: "0 0 300px", bgcolor: "#f8fafc", p: 3.5, borderRight: { lg: "1px solid #e2e8f0" } }}>
                <Stack spacing={2.5}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box sx={{ width: 4, height: 18, bgcolor: "primary.main", borderRadius: 1 }} />
                    <Typography variant="subtitle2" fontWeight={700} sx={{ letterSpacing: 0.5, textTransform: "uppercase", color: "#374151" }}>
                      Fecha de Recepción
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    Filtra solicitudes aprobadas disponibles para recibir en la fecha seleccionada.
                  </Typography>
                  <DatePickerBase value={receptionDate} setValue={setReceptionDate} label="Fecha de Recepción" />
                </Stack>
              </Box>

              <Box sx={{ flex: 1, p: 3.5, display: "flex", flexDirection: "column" }}>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box sx={{ width: 4, height: 18, bgcolor: "info.main", borderRadius: 1 }} />
                    <Typography variant="subtitle2" fontWeight={700} sx={{ letterSpacing: 0.5, textTransform: "uppercase", color: "#374151" }}>
                      Proyecto / Destino
                    </Typography>
                  </Box>
                  <SelectBase
                    size="medium"
                    label="Selecciona el proyecto"
                    value={selectedProject ?? ""}
                    onChange={setSelectedProject}
                    options={[{ label: "Seleccionar proyecto...", value: 0 }, ...projectOptions]}
                    fullWidth
                  />
                </Stack>

                <Box sx={{ mt: "auto", pt: 3, borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                  <Typography variant="caption" sx={{ color: "text.disabled", display: "flex", alignItems: "center", gap: 0.5 }}>
                    <FilterListOutlined sx={{ fontSize: 14 }} /> Solo solicitudes con estado APPROVED
                  </Typography>
                  <ButtonBase
                    onClick={handleBuscarSolicitudes}
                    disabled={loadingList}
                    startIcon={loadingList ? <CircularProgress size={18} color="inherit" /> : <SearchOutlined />}
                    label={loadingList ? "Buscando..." : "Buscar Solicitudes"}
                    sx={{ px: 4, py: 1.5, fontWeight: 700, borderRadius: 2.5, boxShadow: "0 8px 16px rgba(37,99,235,0.15)", transition: "all 0.2s", "&:hover": { transform: "translateY(-1px)" } }}
                  />
                </Box>
              </Box>
            </Box>
          </Card>

          {solicitudes.length > 0 && (
            <Fade in timeout={400}>
              <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", p: 3 }}>
                <SectionHeader
                  icon={<AssignmentOutlined sx={{ fontSize: 26, color: "primary.main" }} />}
                  title={`Solicitudes Disponibles (${solicitudes.length})`}
                  subtitle="Haz clic en el ícono Ver para iniciar la recepción"
                />
                <Divider sx={{ my: 2 }} />
                <CustomDataGrid
                  columns={columnasSolicitudes}
                  localRows={solicitudes.map(s => ({ ...s, id: s.id }))}
                  serverSide={false} search={searchListado} onSearch={setSearchListado}
                  pageSize={10} onView={(row) => handleVerDetalle(row.id)}
                />
              </Card>
            </Fade>
          )}

          {!loadingList && solicitudes.length === 0 && (
            <Card elevation={0} sx={{ borderRadius: 4, border: "2px dashed #e2e8f0", p: 8, textAlign: "center" }}>
              <InventoryOutlined sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
              <Typography variant="h6" color="text.secondary" fontWeight={600} mb={1}>Sin solicitudes cargadas</Typography>
              <Typography variant="body2" color="text.disabled">
                Selecciona fecha y proyecto, luego haz clic en "Buscar Solicitudes".
              </Typography>
            </Card>
          )}
        </Box>
      </Fade>

      {/* ══════════════ VISTA DETALLE ══════════════════════════════════════ */}
      <Fade in={vista === "detail" && !showSuccess} timeout={600} unmountOnExit>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {loadingDetail ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 12 }}>
              <CircularProgress size={52} />
            </Box>
          ) : solicitudDetalle ? (
            <>
              {/* Header */}
              <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <IconButton onClick={handleVolverLista} sx={{ bgcolor: "#f1f5f9", "&:hover": { bgcolor: "#e2e8f0" } }}>
                      <ArrowBackOutlined />
                    </IconButton>
                    <Box>
                      <Typography variant="h6" fontWeight={800}>
                        Recepción — Solicitud #{solicitudDetalle.id}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Verifica cantidades. Los equipos deben pistoliarse individualmente.
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={1.5}>
                    <Chip label={solicitudDetalle.status} color="success" sx={{ fontWeight: 800 }} />
                    <Chip label={`${solicitudDetalle.items?.length ?? 0} items`} variant="outlined" sx={{ fontWeight: 700 }} />
                  </Stack>
                </Box>

                <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
                  {(["MATERIAL", "TOOL", "EQUIPMENT"] as const).map(tipo => {
                    const items = itemsRecepcion.filter(i => i.productType === tipo);
                    const cfg = categoriaConfig[tipo];
                    return (
                      <Paper key={tipo} variant="outlined"
                        sx={{ flex: "1 1 160px", p: 2.5, borderRadius: 2, bgcolor: cfg.bg, border: `1px solid ${cfg.color}30` }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={700}
                          sx={{ textTransform: "uppercase", letterSpacing: 0.6 }}>
                          {cfg.label}
                        </Typography>
                        <Typography variant="h4" fontWeight={800} sx={{ color: cfg.color, lineHeight: 1.2, mt: 0.5 }}>
                          {items.length}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">items a recibir</Typography>
                      </Paper>
                    );
                  })}
                </Box>
              </Card>

              {/* Tabs */}
              <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", p: 3 }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
                  <Tabs value={tabActual} onChange={(_, v) => setTabActual(v)}>
                    <Tab label={`📦 Materiales (${materialesItems.length})`} sx={{ fontWeight: 700, textTransform: "none" }} />
                    <Tab label={`🔧 Herramientas (${herramientasItems.length})`} sx={{ fontWeight: 700, textTransform: "none" }} />
                    <Tab label={`⚙️ Equipos (${equiposItems.length})`} sx={{ fontWeight: 700, textTransform: "none" }} />
                  </Tabs>
                </Box>

                {tabActual === 0 && (
                  <Box>
                    <TextField fullWidth size="small" placeholder="Buscar material..."
                      value={searchMat} onChange={e => setSearchMat(e.target.value)} sx={{ mb: 2 }}
                      InputProps={{ startAdornment: <InputAdornment position="start"><SearchOutlined /></InputAdornment> }}
                    />
                    <CustomDataGrid columns={buildColumnas(categoriaConfig.MATERIAL.color)}
                      localRows={filtrar(materialesItems, searchMat).map(i => ({ ...i, id: i.itemCode }))}
                      serverSide={false} search="" onSearch={() => {}} editMode="cell"
                      processRowUpdate={processRowUpdate} pageSize={30}
                      sx={{ border: `2px solid ${categoriaConfig.MATERIAL.color}20` }}
                    />
                  </Box>
                )}

                {tabActual === 1 && (
                  <Box>
                    <TextField fullWidth size="small" placeholder="Buscar herramienta..."
                      value={searchTool} onChange={e => setSearchTool(e.target.value)} sx={{ mb: 2 }}
                      InputProps={{ startAdornment: <InputAdornment position="start"><SearchOutlined /></InputAdornment> }}
                    />
                    <CustomDataGrid columns={buildColumnas(categoriaConfig.TOOL.color)}
                      localRows={filtrar(herramientasItems, searchTool).map(i => ({ ...i, id: i.itemCode }))}
                      serverSide={false} search="" onSearch={() => {}} editMode="cell"
                      processRowUpdate={processRowUpdate} pageSize={30}
                      sx={{ border: `2px solid ${categoriaConfig.TOOL.color}20` }}
                    />
                  </Box>
                )}

                {tabActual === 2 && (
                  <Box>
                    <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
                      <Typography variant="body2" fontWeight={600}>
                        Cada equipo debe identificarse individualmente.
                        Usa <strong>"Escanear"</strong> para pistolar serie, MAC, UA según tipo de equipo.
                      </Typography>
                    </Alert>
                    <TextField fullWidth size="small" placeholder="Buscar equipo..."
                      value={searchEq} onChange={e => setSearchEq(e.target.value)} sx={{ mb: 2 }}
                      InputProps={{ startAdornment: <InputAdornment position="start"><SearchOutlined /></InputAdornment> }}
                    />
                    <CustomDataGrid columns={columnasEquipos}
                      localRows={filtrar(equiposItems, searchEq).map(i => ({ ...i, id: i.itemCode }))}
                      serverSide={false} search="" onSearch={() => {}} pageSize={30}
                      sx={{ border: `2px solid ${categoriaConfig.EQUIPMENT.color}20` }}
                    />
                  </Box>
                )}
              </Card>

              {/* Confirmación */}
              <Card elevation={3} sx={{ borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", p: 3 }}>
                <SectionHeader
                  iconBgColor="#f59e0b"
                  icon={<WarningAmberOutlined sx={{ fontSize: 22, color: "#fff" }} />}
                  title="Confirmar Recepción"
                  subtitle="Adjunta la guía de remisión y confirma el ingreso al almacén"
                />

                <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap", mt: 2 }}>
                  <Box sx={{ flex: "1 1 260px" }}>
                    <Typography variant="body2" color="text.secondary" fontWeight={600} mb={1}>
                      Código Guía de Remisión *
                    </Typography>
                    <TextField fullWidth size="small" placeholder="GR-2024-XXX"
                      value={codigoGuia} onChange={e => setCodigoGuia(e.target.value)}
                    />
                  </Box>
                </Box>

                <Box sx={{ border: "2px dashed #e2e8f0", borderRadius: 3, p: 3, bgcolor: "#f8fafc", mb: 3 }}>
                  <Typography variant="body2" fontWeight={600} mb={2}>
                    📄 Adjuntar Guía de Remisión (PDF o Imagen)
                  </Typography>
                  <FileUploader accept=".pdf,.jpg,.jpeg,.png" maxSize={10}
                    onFileSelect={setArchivoGuia} onError={alert} />
                  {archivoGuia && (
                    <Fade in timeout={400}>
                      <Box sx={{ mt: 2, p: 2, bgcolor: "#f0fdf4", borderRadius: 2, border: "1px solid #bbf7d0", display: "flex", alignItems: "center", gap: 2 }}>
                        {archivoGuia.type === "application/pdf"
                          ? <PictureAsPdfOutlined sx={{ color: "error.main", fontSize: 32 }} />
                          : <ImageOutlined sx={{ color: "info.main", fontSize: 32 }} />}
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" fontWeight={600}>{archivoGuia.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {(archivoGuia.size / 1024 / 1024).toFixed(2)} MB
                          </Typography>
                        </Box>
                        <IconButton size="small" onClick={() => setArchivoGuia(null)}>
                          <CloseOutlined />
                        </IconButton>
                      </Box>
                    </Fade>
                  )}
                </Box>

                <Alert severity="warning" sx={{ borderRadius: 2, mb: 3 }}>
                  Se registrará como movimiento tipo <strong>ENTRADA / ACOPIO</strong>. Esta acción es irreversible.
                </Alert>

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                  <ButtonBase label="Volver al Listado" startIcon={<ArrowBackOutlined />}
                    onClick={handleVolverLista}
                    sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1", "&:hover": { bgcolor: "#f1f5f9" } }}
                  />
                  <ButtonBase label="Confirmar Recepción" startIcon={<CheckCircleOutline />}
                    onClick={handleConfirmarRecepcion}
                    disabled={!archivoGuia || !codigoGuia}
                    sx={{ px: 4, boxShadow: "0 4px 12px rgba(46,125,50,0.25)" }}
                  />
                </Box>
              </Card>
            </>
          ) : null}
        </Box>
      </Fade>

      {/* ══════════════ MODAL: ESCANEO EQUIPOS ════════════════════════════ */}
      <Dialog open={modalEquipoOpen} onClose={() => setModalEquipoOpen(false)} maxWidth="sm" fullWidth
        PaperProps={{ sx: { borderRadius: 3, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" } }}
      >
        <DialogTitle sx={{ m: 0, p: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between", bgcolor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ bgcolor: "success.main", color: "white", p: 0.8, borderRadius: 1.5, display: "flex" }}>
              <QrCodeScannerOutlined fontSize="small" />
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight={700} sx={{ color: "#1e293b" }}>
                Pistolear Equipo
              </Typography>
              {equipoSeleccionado && (
                <Typography variant="caption" color="text.secondary">
                  {equipoSeleccionado.itemCode} — {equipoSeleccionado.itemDescription}
                </Typography>
              )}
            </Box>
          </Stack>
          <IconButton onClick={() => setModalEquipoOpen(false)} size="small">
            <CloseOutlined fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3, mt: 1 }}>
          {equipoSeleccionado && (() => {
            const tipo = getEquipoTipo(equipoSeleccionado.itemCode, equipoSeleccionado.itemDescription);
            const campos = camposEquipo[tipo];
            const totalReq = equipoSeleccionado.requestedQuantity;
            const totalCap = serialesCapturados.length;
            const todosCompletos = campos.every(c => !!(serialActual as any)[c.field]?.trim());

            return (
              <>
                {/* Barra progreso */}
                <Box sx={{ mb: 3, p: 2.5, bgcolor: "#f8fafc", borderRadius: 2, border: "1px solid #e2e8f0" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                    <Typography variant="body2" fontWeight={700}>Progreso de Captura</Typography>
                    <Chip label={`${totalCap} / ${totalReq}`} size="small"
                      color={totalCap === totalReq ? "success" : totalCap > 0 ? "warning" : "default"}
                      sx={{ fontWeight: 800 }} />
                  </Box>
                  <Box sx={{ height: 8, borderRadius: 4, bgcolor: "#e2e8f0", overflow: "hidden" }}>
                    <Box sx={{
                      height: "100%", borderRadius: 4,
                      width: `${Math.min((totalCap / totalReq) * 100, 100)}%`,
                      bgcolor: totalCap === totalReq ? "success.main" : "warning.main",
                      transition: "width 0.4s ease",
                    }} />
                  </Box>
                </Box>

                {/* ✅ Toggle Auto-guardar */}
                <Box sx={{ mb: 2.5, p: 2, borderRadius: 2, bgcolor: autoGuardar ? "#f0fdf4" : "#f8fafc", border: `1px solid ${autoGuardar ? "#bbf7d0" : "#e2e8f0"}`, transition: "all 0.3s" }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={autoGuardar}
                        onChange={e => setAutoGuardar(e.target.checked)}
                        color="success"
                        size="small"
                      />
                    }
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                        <AutoAwesomeOutlined sx={{ fontSize: 16, color: autoGuardar ? "success.main" : "text.disabled" }} />
                        <Typography variant="body2" fontWeight={700} sx={{ color: autoGuardar ? "#15803d" : "text.secondary" }}>
                          Agregar automáticamente al completar campos
                        </Typography>
                      </Box>
                    }
                    sx={{ m: 0 }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5, ml: 4 }}>
                    {autoGuardar
                      ? "Al llenar todos los campos se agregará y limpiará el formulario automáticamente"
                      : "Debes presionar el botón manualmente para agregar cada serial"}
                  </Typography>
                </Box>

                {/* Tipo badge */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
                  <Chip label={`Tipo: ${tipo}`} size="small" color="info" sx={{ fontWeight: 700 }} />
                  <Typography variant="caption" color="text.secondary">
                    Campos: {campos.map(c => c.label).join(" · ")}
                  </Typography>
                </Box>

                {/* Form capture */}
                {/* <Stack spacing={2} sx={{ mb: 3 }}>
                  {campos.map(campo => (
                    <Box key={campo.field}>
                      <Typography variant="body2" color="text.secondary" fontWeight={600} mb={0.5}>
                        {campo.label} *
                      </Typography>
                      <TextField
                        fullWidth size="small"
                        placeholder={campo.placeholder}
                        value={(serialActual as any)[campo.field] ?? ""}
                        onChange={e => handleCampoChange(campo.field, e.target.value, tipo, totalReq)}
                        disabled={totalCap >= totalReq}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            bgcolor: totalCap >= totalReq ? "#f8fafc" : "white",
                            transition: "all 0.2s",
                            ...(todosCompletos && autoGuardar && totalCap < totalReq && {
                              "& fieldset": { borderColor: "success.main", borderWidth: 2 },
                            }),
                          },
                        }}
                        InputProps={campo.field === "serialNumber" ? {
                          startAdornment: <InputAdornment position="start">
                            <QrCodeScannerOutlined sx={{ fontSize: 18, color: "text.disabled" }} />
                          </InputAdornment>
                        } : undefined}
                      />
                    </Box>
                  ))}
                </Stack> */}
                <Stack spacing={2} sx={{ mb: 3 }}>
  {campos.map(campo => {
    const valor = (serialActual as any)[campo.field] ?? "";
    const error = camposError[campo.field] ?? "";
    const regla = validacionesCampo[campo.field];
    // Estado visual: vacío | escribiendo | válido | error
    const esValido = regla ? regla.regex.test(valor.trim()) && valor.trim() !== "" : valor.trim() !== "";
    const tieneError = !!error && valor.trim() !== "";

    return (
      <Box key={campo.field}>
        <Typography variant="body2" color="text.secondary" fontWeight={600} mb={0.5}>
          {campo.label} *
          {esValido && (
            <CheckCircle sx={{ fontSize: 14, color: "success.main", ml: 0.5, verticalAlign: "middle" }} />
          )}
        </Typography>
        <TextField
          fullWidth size="small"
          placeholder={campo.placeholder}
          value={valor}
          onChange={e => handleCampoChange(campo.field, e.target.value, tipo, totalReq)}
          disabled={totalCap >= totalReq}
          error={tieneError}
          helperText={
            tieneError ? error
            : esValido ? "✓ Válido"
            : regla ? `Ej: ${campo.placeholder}` : undefined
          }
          FormHelperTextProps={{
            sx: { color: tieneError ? "error.main" : esValido ? "success.main" : "text.disabled" }
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: totalCap >= totalReq ? "#f8fafc" : "white",
              transition: "all 0.2s",
              ...(esValido && {
                "& fieldset": { borderColor: "success.main", borderWidth: 2 },
              }),
              ...(tieneError && {
                "& fieldset": { borderColor: "error.main", borderWidth: 2 },
              }),
            },
          }}
          InputProps={campo.field === "serialNumber" ? {
            startAdornment: <InputAdornment position="start">
              <QrCodeScannerOutlined sx={{ fontSize: 18, color: esValido ? "success.main" : "text.disabled" }} />
            </InputAdornment>
          } : undefined}
        />
      </Box>
    );
  })}
</Stack>

                {/* Botón manual (solo si auto-guardar está OFF) */}
                {!autoGuardar && (
                  <ButtonBase fullWidth
                    label={totalCap >= totalReq ? "✓ Cantidad completa" : `Agregar Serial ${totalCap + 1} de ${totalReq}`}
                    startIcon={<CheckCircle />}
                    onClick={agregarSerial}
                    disabled={!serialActual.serialNumber?.trim() || totalCap >= totalReq}
                    sx={{ mb: 3 }}
                  />
                )}

                {/* Indicador auto-guardar activo */}
                {autoGuardar && totalCap < totalReq && (
                  <Box sx={{ mb: 3, p: 1.5, borderRadius: 2, bgcolor: todosCompletos ? "#dcfce7" : "#f8fafc", border: `1px solid ${todosCompletos ? "#86efac" : "#e2e8f0"}`, textAlign: "center", transition: "all 0.3s" }}>
                    <Typography variant="caption" fontWeight={600} sx={{ color: todosCompletos ? "#15803d" : "text.disabled" }}>
                      {todosCompletos
                        ? "⚡ Guardando automáticamente..."
                        : `Completa todos los campos para auto-guardar el serial ${totalCap + 1}`}
                    </Typography>
                  </Box>
                )}

                {/* Lista seriales capturados */}
                {serialesCapturados.length > 0 && (
                  <Box>
                    <Typography variant="body2" fontWeight={700} mb={1.5}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckCircleOutline sx={{ fontSize: 18, color: "success.main" }} />
                      Seriales Capturados ({serialesCapturados.length})
                    </Typography>
                    <Stack spacing={1}>
                      {serialesCapturados.map((s, idx) => (
                        <Box key={idx} sx={{ p: 1.5, bgcolor: "#f0fdf4", borderRadius: 2, border: "1px solid #bbf7d0", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                          <Stack spacing={0.3}>
                            <Typography variant="caption" fontWeight={800} sx={{ color: "#15803d" }}>
                              #{idx + 1} 
                            </Typography>
                                                        {s.serialNumber    && <Typography variant="caption" color="text.secondary">SERIAL NUMBER: {s.serialNumber}</Typography>}

                            {s.mac    && <Typography variant="caption" color="text.secondary">MAC: {s.mac}</Typography>}
                            {s.ua     && <Typography variant="caption" color="text.secondary">UA: {s.ua}</Typography>}
                            {s.mtaMac && <Typography variant="caption" color="text.secondary">MTA MAC: {s.mtaMac}</Typography>}
                          </Stack>
                          <IconButton size="small" onClick={() => eliminarSerial(idx)} sx={{ color: "error.light", mt: -0.5 }}>
                            <CloseOutlined fontSize="small" />
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
          <ButtonBase label="Cancelar" onClick={() => setModalEquipoOpen(false)}
            sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1", "&:hover": { bgcolor: "#f1f5f9" } }}
          />
          <ButtonBase label={`Guardar ${serialesCapturados.length} Serial(es)`}
            startIcon={<CheckCircleOutline />} onClick={guardarSeriales}
            disabled={serialesCapturados.length === 0}
            sx={{ px: 4, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
}