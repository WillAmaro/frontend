// "use client";

// import {
//   Box,
//   TextField,
//   Button,
//   MenuItem,
//   Typography,
//   Chip,
//   IconButton,
//   Divider,
//   InputAdornment,
//   Card,
//   CardMedia,
//   CardActions,
//   LinearProgress,
//   Paper,
// } from "@mui/material";
// import { useState, useEffect, JSX } from "react";
// import { useRouter } from "next/navigation";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// import PersonIcon from "@mui/icons-material/Person";
// import HomeIcon from "@mui/icons-material/Home";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import BuildIcon from "@mui/icons-material/Build";
// import DescriptionIcon from "@mui/icons-material/Description";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";
// import AttachFileIcon from "@mui/icons-material/AttachFile";
// import SaveIcon from "@mui/icons-material/Save";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
// import { TitleCard } from "@/src/components/base/TitleCard";
// import ListAltIcon from "@mui/icons-material/ListAlt";

// export interface AttentionFormData {
//   clientName: string;
//   clientPhone: string;
//   clientEmail: string;
//   clientDocument: string;
//   address: string;
//   district: string;
//   reference: string;
//   coordinates?: { lat: number; lng: number };
//   serviceType: string;
//   workType: string;
//   priority: "alta" | "media" | "baja";
//   technicianId: string;
//   date: string;
//   startTime: string;
//   endTime: string;
//   estimatedDuration: number;
//   serviceDescription: string;
//   currentPlan?: string;
//   newPlan?: string;
//   technology: string;
//   equipmentType?: string;
//   equipmentSerial?: string;
//   materials: Array<{
//     id: string;
//     name: string;
//     quantity: number;
//     unit: string;
//   }>;
//   observations: string;
//   issueReported?: string;
//   solutionApplied?: string;
//   photos: File[];
//   documents: File[];
//   signalStrength?: number;
//   downloadSpeed?: number;
//   uploadSpeed?: number;
//   clientSignature?: string;
// }

// const serviceTypes = [
//   "Instalación HFC",
//   "Instalación FTTH",
//   "Instalación DTH",
//   "Instalación LTE",
//   "Reparación de Servicio",
//   "Mantenimiento Preventivo",
//   "Cambio de Equipo",
//   "Migración de Tecnología",
//   "Upgrade de Plan",
//   "Retiro de Servicio",
// ];

// const workTypes = [
//   "Instalación Nueva",
//   "Reinstalación",
//   "Reubicación",
//   "Reparación",
//   "Mantenimiento",
//   "Cambio de Tecnología",
//   "Cambio de Plan",
//   "Desinstalación",
// ];

// const technologies = [
//   "HFC (Cable Coaxial)",
//   "FTTH (Fibra Óptica)",
//   "DTH (Satélite)",
//   "LTE (4G)",
//   "5G",
//   "ADSL",
// ];

// const mockTechnicians = [
//   { id: "tech-1", name: "Carlos Rodríguez", specialization: "HFC/FTTH" },
//   { id: "tech-2", name: "María González", specialization: "FTTH" },
//   { id: "tech-3", name: "Jorge Martínez", specialization: "DTH" },
//   { id: "tech-4", name: "Ana López", specialization: "LTE/5G" },
// ];

// const commonMaterials = [
//   { id: "mat-1", name: "Cable Coaxial RG6", unit: "metros" },
//   { id: "mat-2", name: "Fibra Óptica", unit: "metros" },
//   { id: "mat-3", name: "Conector F", unit: "unidades" },
//   { id: "mat-4", name: "Splitter", unit: "unidades" },
//   { id: "mat-5", name: "Modem", unit: "unidades" },
//   { id: "mat-6", name: "ONT", unit: "unidades" },
//   { id: "mat-7", name: "Router WiFi", unit: "unidades" },
//   { id: "mat-8", name: "Antena DTH", unit: "unidades" },
//   { id: "mat-9", name: "Decodificador", unit: "unidades" },
//   { id: "mat-10", name: "Cable Ethernet CAT6", unit: "metros" },
// ];

// interface Section {
//   id: string;
//   title: string;
//   icon: JSX.Element;
//   color: string;
//   fields: string[];
// }

// const sections: Section[] = [
//   {
//     id: "client",
//     title: "Datos del Cliente",
//     icon: <PersonIcon />,
//     color: "#3B82F6",
//     fields: ["clientName", "clientPhone", "clientDocument", "clientEmail"],
//   },
//   {
//     id: "address",
//     title: "Dirección",
//     icon: <HomeIcon />,
//     color: "#10B981",
//     fields: ["address", "district", "reference"],
//   },
//   {
//     id: "service",
//     title: "Tipo de Servicio",
//     icon: <BuildIcon />,
//     color: "#F59E0B",
//     fields: [
//       "serviceType",
//       "workType",
//       "priority",
//       "technology",
//       "technicianId",
//     ],
//   },
//   {
//     id: "schedule",
//     title: "Programación",
//     icon: <CalendarTodayIcon />,
//     color: "#8B5CF6",
//     fields: ["date", "startTime", "endTime", "estimatedDuration"],
//   },
//   {
//     id: "details",
//     title: "Detalles Técnicos",
//     icon: <DescriptionIcon />,
//     color: "#06B6D4",
//     fields: ["serviceDescription", "currentPlan", "newPlan", "equipmentType"],
//   },
//   {
//     id: "materials",
//     title: "Materiales",
//     icon: <BuildIcon />,
//     color: "#EC4899",
//     fields: ["materials"],
//   },
//   {
//     id: "measurements",
//     title: "Mediciones",
//     icon: <AccessTimeIcon />,
//     color: "#6366F1",
//     fields: ["signalStrength", "downloadSpeed", "uploadSpeed"],
//   },
//   {
//     id: "photos",
//     title: "Evidencias",
//     icon: <CameraAltIcon />,
//     color: "#14B8A6",
//     fields: ["photos"],
//   },
//   {
//     id: "documents",
//     title: "Documentos",
//     icon: <AttachFileIcon />,
//     color: "#F97316",
//     fields: ["documents"],
//   },
//   {
//     id: "observations",
//     title: "Observaciones",
//     icon: <DescriptionIcon />,
//     color: "#A855F7",
//     fields: ["observations"],
//   },
// ];

// export default function CreateAttentionPage() {
//   const router = useRouter();

//   const [formData, setFormData] = useState<AttentionFormData>({
//     clientName: "",
//     clientPhone: "",
//     clientEmail: "",
//     clientDocument: "",
//     address: "",
//     district: "",
//     reference: "",
//     serviceType: "",
//     workType: "",
//     priority: "media",
//     technicianId: "",
//     date: new Date().toISOString().split("T")[0],
//     startTime: "09:00",
//     endTime: "11:00",
//     estimatedDuration: 120,
//     serviceDescription: "",
//     technology: "",
//     materials: [],
//     observations: "",
//     photos: [],
//     documents: [],
//   });

//   const [photosPreviews, setPhotosPreviews] = useState<string[]>([]);
//   const [selectedMaterial, setSelectedMaterial] = useState("");
//   const [materialQuantity, setMaterialQuantity] = useState(1);
//   const [completedSections, setCompletedSections] = useState<string[]>([]);

//   // Calcular progreso
//   const calculateProgress = () => {
//     let completed = 0;
//     sections.forEach((section) => {
//       const isComplete = section.fields.every((field) => {
//         const value = formData[field as keyof AttentionFormData];
//         if (Array.isArray(value)) return value.length > 0;
//         return value !== "" && value !== undefined && value !== null;
//       });
//       if (isComplete) completed++;
//     });
//     return (completed / sections.length) * 100;
//   };

//   // Verificar si una sección está completa
//   const isSectionComplete = (sectionId: string) => {
//     const section = sections.find((s) => s.id === sectionId);
//     if (!section) return false;

//     return section.fields.every((field) => {
//       const value = formData[field as keyof AttentionFormData];
//       if (Array.isArray(value)) return value.length > 0;
//       return value !== "" && value !== undefined && value !== null;
//     });
//   };

//   useEffect(() => {
//     const completed = sections
//       .filter((section) => isSectionComplete(section.id))
//       .map((s) => s.id);
//     setCompletedSections(completed);
//   }, [formData]);

//   const handleChange = (field: keyof AttentionFormData, value: any) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...files] }));

//     files.forEach((file) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPhotosPreviews((prev) => [...prev, reader.result as string]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     setFormData((prev) => ({
//       ...prev,
//       documents: [...prev.documents, ...files],
//     }));
//   };

//   const handleRemovePhoto = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       photos: prev.photos.filter((_, i) => i !== index),
//     }));
//     setPhotosPreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleAddMaterial = () => {
//     if (!selectedMaterial) return;

//     const material = commonMaterials.find((m) => m.id === selectedMaterial);
//     if (!material) return;

//     const newMaterial = {
//       id: material.id,
//       name: material.name,
//       quantity: materialQuantity,
//       unit: material.unit,
//     };

//     setFormData((prev) => ({
//       ...prev,
//       materials: [...prev.materials, newMaterial],
//     }));

//     setSelectedMaterial("");
//     setMaterialQuantity(1);
//   };

//   const handleRemoveMaterial = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       materials: prev.materials.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSubmit = () => {
//     console.log("📝 Datos del formulario:", formData);
//     alert("✅ Atención creada exitosamente");
//     router.push("/logistics/attentions");
//   };

//   const progress = calculateProgress();

//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh" }}>
//       {/* Sidebar con progreso */}
//       <Box
//         sx={{
//           width: 320,
//           position: "sticky",
//           top: 0,
//           //   height: "calc(100vh - 65px)" ,
//           background: "white",
//           backdropFilter: "blur(10px)",
//           borderRight: "1px solid rgba(255, 255, 255, 0.1)",
//           p: 3,
//           overflowY: "auto",
//         }}
//       >
//         <Box sx={{ mb: 4 }}>
//           <Typography
//             variant="h6"
//             fontWeight={700}
//             color="rgba(15, 23, 42, 0.8)"
//             gutterBottom
//           >
//             Progreso del Formulario
//           </Typography>
//           <Box sx={{ mt: 2 }}>
//             <Box display="flex" justifyContent="space-between" mb={1}>
//               <Typography variant="body2" color="text.secondary">
//                 Completado
//               </Typography>
//               <Typography variant="body2" fontWeight={700} color="primary.main">
//                 {Math.round(progress)}%
//               </Typography>
//             </Box>
//             <LinearProgress
//               variant="determinate"
//               value={progress}
//               sx={{
//                 height: 8,
//                 borderRadius: 4,
//                 bgcolor: "rgba(15, 23, 42, 0.8)",
//                 "& .MuiLinearProgress-bar": {
//                   borderRadius: 4,
//                   background:
//                     "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)",
//                 },
//               }}
//             />
//           </Box>
//         </Box>

//         <Divider sx={{ mb: 3, borderColor: "rgba(255, 255, 255, 0.1)" }} />

//         {/* Lista de secciones */}
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
//           {sections.map((section, index) => {
//             const isComplete = completedSections.includes(section.id);
//             return (
//               <Box
//                 key={section.id}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 2,
//                   p: 1.5,
//                   borderRadius: 2,
//                   background: isComplete
//                     ? "rgba(16, 185, 129, 0.1)"
//                     : "rgba(255, 255, 255, 0.03)",
//                   border: `1px solid ${
//                     isComplete
//                       ? "rgba(16, 185, 129, 0.3)"
//                       : "rgba(208, 193, 193, 0.49)"
//                   }`,
//                   transition: "all 0.3s",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     width: 32,
//                     height: 32,
//                     borderRadius: "50%",
//                     background: isComplete
//                       ? "rgba(16, 185, 129, 0.2)"
//                       : "rgba(255, 255, 255, 0.05)",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: isComplete ? "#10B981" : section.color,
//                   }}
//                 >
//                   {isComplete ? (
//                     <CheckCircleIcon fontSize="small" />
//                   ) : (
//                     <RadioButtonUncheckedIcon fontSize="small" />
//                   )}
//                 </Box>
//                 <Box flex={1}>
//                   <Typography
//                     variant="body2"
//                     fontWeight={600}
//                     color={isComplete ? "#10B981" : "rgba(15, 23, 42, 0.8)"}
//                   >
//                     {index + 1}. {section.title}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     {isComplete ? "Completado" : "Pendiente"}
//                   </Typography>
//                 </Box>
//               </Box>
//             );
//           })}
//         </Box>

//         {/* Resumen */}
//         <Box
//           sx={{
//             mt: 4,
//             p: 2,
//             borderRadius: 2,
//             background: "rgba(59, 130, 246, 0.1)",
//             border: "1px solid rgba(59, 130, 246, 0.3)",
//           }}
//         >
//           <Typography
//             variant="body2"
//             fontWeight={600}
//             color="#3B82F6"
//             gutterBottom
//           >
//             📊 Resumen
//           </Typography>
//           <Box display="flex" flexDirection="column" gap={1} mt={1}>
//             <Box display="flex" justifyContent="space-between">
//               <Typography variant="caption" color="text.secondary">
//                 Secciones completadas:
//               </Typography>
//               <Typography variant="caption" fontWeight={700} color="white">
//                 {completedSections.length} / {sections.length}
//               </Typography>
//             </Box>
//             <Box display="flex" justifyContent="space-between">
//               <Typography variant="caption" color="text.secondary">
//                 Materiales agregados:
//               </Typography>
//               <Typography variant="caption" fontWeight={700} color="white">
//                 {formData.materials.length}
//               </Typography>
//             </Box>
//             <Box display="flex" justifyContent="space-between">
//               <Typography variant="caption" color="text.secondary">
//                 Fotos cargadas:
//               </Typography>
//               <Typography variant="caption" fontWeight={700} color="white">
//                 {formData.photos.length}
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       </Box>

//       {/* Contenido principal */}
//       <Box sx={{ flex: 1, p: 4, overflowY: "auto", background: "white" }}>
//         {/* Header */}
//         {/* <Box
//           sx={{
//             mb: 4,
//             background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
//             borderRadius: 3,
//             p: 3,
//             border: "1px solid rgba(59, 130, 246, 0.2)",
//           }}
//         >
//           <Box display="flex" justifyContent="space-between" alignItems="center">
//             <Box>
//               <Typography variant="h4" fontWeight={700} color="white">
//                 📝 Nueva Atención Técnica
//               </Typography>
//               <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//                 Complete todos los campos para registrar una nueva atención
//               </Typography>
//             </Box>
//             <Button
//               variant="outlined"
//               startIcon={<ArrowBackIcon />}
//               onClick={() => router.back()}
//               sx={{
//                 borderColor: "rgba(255, 255, 255, 0.2)",
//                 color: "white",
//                 "&:hover": {
//                   borderColor: "rgba(255, 255, 255, 0.4)",
//                   background: "rgba(255, 255, 255, 0.05)",
//                 },
//               }}
//             >
//               Volver
//             </Button>
//           </Box>
//         </Box> */}
//         <TitleCard
//           icon={<ListAltIcon />}
//           title="Nueva Atención Técnica"
//           description="Complete todos los campos para registrar una nueva atención"
//         />

//         {/* Formulario con bloques individuales */}
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
//           {/* SECCIÓN 1: DATOS DEL CLIENTE */}
//           <Paper
//             elevation={0}
//             sx={{
//               background: "rgba(255, 255, 255, 0.02)",
//               border: `2px solid ${
//                 isSectionComplete("client")
//                   ? "rgba(16, 185, 129, 0.3)"
//                   : "rgba(208, 193, 193, 0.49)"
//               }`,
//               borderRadius: 3,
//               p: 3,
//               transition: "all 0.3s",
//             }}
//           >
//             <Box display="flex" alignItems="center" gap={2} mb={3}>
//               <Box
//                 sx={{
//                   width: 48,
//                   height: 48,
//                   borderRadius: 2,
//                   background: "rgba(59, 130, 246, 0.15)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <PersonIcon sx={{ fontSize: 28, color: "#3B82F6" }} />
//               </Box>
//               <Box flex={1}>
//                 <Typography variant="h6" fontWeight={700} color="black">
//                   Datos del Cliente
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   Información personal del cliente
//                 </Typography>
//               </Box>
//               {isSectionComplete("client") && (
//                 <CheckCircleIcon sx={{ color: "#10B981", fontSize: 28 }} />
//               )}
//             </Box>

//             <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//               <TextField
//                 fullWidth
//                 label="Nombre Completo"
//                 value={formData.clientName}
//                 onChange={(e) => handleChange("clientName", e.target.value)}
//                 required
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//               />
//               <Box sx={{ display: "flex", gap: 2 }}>
//                 <TextField
//                   fullWidth
//                   label="Teléfono"
//                   value={formData.clientPhone}
//                   onChange={(e) => handleChange("clientPhone", e.target.value)}
//                   required
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: "12px",
//                     },
//                   }}
//                 />
//                 <TextField
//                   fullWidth
//                   label="DNI/RUC"
//                   value={formData.clientDocument}
//                   onChange={(e) =>
//                     handleChange("clientDocument", e.target.value)
//                   }
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: "12px",
//                     },
//                   }}
//                 />
//               </Box>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 type="email"
//                 value={formData.clientEmail}
//                 onChange={(e) => handleChange("clientEmail", e.target.value)}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//               />
//             </Box>
//           </Paper>

//           {/* SECCIÓN 2: DIRECCIÓN */}
//           <Paper
//             elevation={0}
//             sx={{
//               background: "rgba(255, 255, 255, 0.02)",
//               border: `2px solid ${
//                 isSectionComplete("address")
//                   ? "rgba(16, 185, 129, 0.3)"
//                   : "rgba(208, 193, 193, 0.49)"
//               }`,
//               borderRadius: 3,
//               p: 3,
//             }}
//           >
//             <Box display="flex" alignItems="center" gap={2} mb={3}>
//               <Box
//                 sx={{
//                   width: 48,
//                   height: 48,
//                   borderRadius: 2,
//                   background: "rgba(16, 185, 129, 0.15)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <HomeIcon sx={{ fontSize: 28, color: "#10B981" }} />
//               </Box>
//               <Box flex={1}>
//                 <Typography variant="h6" fontWeight={700} color="black">
//                   Dirección del Servicio
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   Ubicación donde se realizará el servicio
//                 </Typography>
//               </Box>
//               {isSectionComplete("address") && (
//                 <CheckCircleIcon sx={{ color: "#10B981", fontSize: 28 }} />
//               )}
//             </Box>

//             <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//               <Box sx={{ display: "flex", gap: 2 }}>
//                 <TextField
//                   fullWidth
//                   label="Dirección Completa"
//                   value={formData.address}
//                   onChange={(e) => handleChange("address", e.target.value)}
//                   required
//                 //   multiline
//                   rows={2}
//                   sx={{
//                     flex: 2,
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: "12px",
//                     },
//                   }}
//                 />
//                 <TextField
//                   fullWidth
//                   label="Distrito"
//                   value={formData.district}
//                   onChange={(e) => handleChange("district", e.target.value)}
//                   required
//                   sx={{
//                     flex: 1,
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: "12px",
//                     },
//                   }}
//                 />
//               </Box>
//               <TextField
//                 fullWidth
//                 label="Referencia"
//                 value={formData.reference}
//                 onChange={(e) => handleChange("reference", e.target.value)}
//                 placeholder="Ej: Casa de 2 pisos, color verde, al lado del parque"
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//               />
//             </Box>
//           </Paper>

//           {/* SECCIÓN 3: TIPO DE SERVICIO */}
//           <Paper
//             elevation={0}
//             sx={{
//               background: "rgba(255, 255, 255, 0.02)",
//               border: `2px solid ${
//                 isSectionComplete("service")
//                   ? "rgba(16, 185, 129, 0.3)"
//                   : "rgba(208, 193, 193, 0.49)"
//               }`,
//               borderRadius: 3,
//               p: 3,
//             }}
//           >
//             <Box display="flex" alignItems="center" gap={2} mb={3}>
//               <Box
//                 sx={{
//                   width: 48,
//                   height: 48,
//                   borderRadius: 2,
//                   background: "rgba(245, 158, 11, 0.15)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <BuildIcon sx={{ fontSize: 28, color: "#F59E0B" }} />
//               </Box>
//               <Box flex={1}>
//                 <Typography variant="h6" fontWeight={700} color="black">
//                   Tipo de Servicio
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   Especificaciones del trabajo a realizar
//                 </Typography>
//               </Box>
//               {isSectionComplete("service") && (
//                 <CheckCircleIcon sx={{ color: "#10B981", fontSize: 28 }} />
//               )}
//             </Box>

//             <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//               <Box sx={{ display: "flex", gap: 2 }}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Tipo de Servicio"
//                   value={formData.serviceType}
//                   onChange={(e) => handleChange("serviceType", e.target.value)}
//                   required
//                    sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//                 >
//                   {serviceTypes.map((type) => (
//                     <MenuItem key={type} value={type}>
//                       {type}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Tipo de Trabajo"
//                   value={formData.workType}
//                   onChange={(e) => handleChange("workType", e.target.value)}
//                   required
//                    sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//                 >
//                   {workTypes.map((type) => (
//                     <MenuItem key={type} value={type}>
//                       {type}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Prioridad"
//                   value={formData.priority}
//                   onChange={(e) =>
//                     handleChange("priority", e.target.value as any)
//                   }
//                   required
//                    sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//                 >
//                   <MenuItem value="alta">🔴 Alta</MenuItem>
//                   <MenuItem value="media">🟠 Media</MenuItem>
//                   <MenuItem value="baja">🟢 Baja</MenuItem>
//                 </TextField>
//               </Box>
//               <Box sx={{ display: "flex", gap: 2 }}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Tecnología"
//                   value={formData.technology}
//                   onChange={(e) => handleChange("technology", e.target.value)}
//                   required
//                    sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//                 >
//                   {technologies.map((tech) => (
//                     <MenuItem key={tech} value={tech}>
//                       {tech}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Técnico Asignado"
//                   value={formData.technicianId}
//                   onChange={(e) => handleChange("technicianId", e.target.value)}
//                   required
//                    sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//                 >
//                   {mockTechnicians.map((tech) => (
//                     <MenuItem key={tech.id} value={tech.id}>
//                       {tech.name} - {tech.specialization}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Box>
//             </Box>
//           </Paper>

//           {/* SECCIÓN 4: PROGRAMACIÓN */}
//           <Paper
//             elevation={0}
//             sx={{
//               background: "rgba(255, 255, 255, 0.02)",
//               border: `2px solid ${
//                 isSectionComplete("schedule")
//                   ? "rgba(16, 185, 129, 0.3)"
//                   : "rgba(208, 193, 193, 0.49)"
//               }`,
//               borderRadius: 3,
//               p: 3,
//             }}
//           >
//             <Box display="flex" alignItems="center" gap={2} mb={3}>
//               <Box
//                 sx={{
//                   width: 48,
//                   height: 48,
//                   borderRadius: 2,
//                   background: "rgba(139, 92, 246, 0.15)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <CalendarTodayIcon sx={{ fontSize: 28, color: "#8B5CF6" }} />
//               </Box>
//               <Box flex={1}>
//                 <Typography variant="h6" fontWeight={700} color="black">
//                   Programación
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   Fecha y horario de la atención
//                 </Typography>
//               </Box>
//               {isSectionComplete("schedule") && (
//                 <CheckCircleIcon sx={{ color: "#10B981", fontSize: 28 }} />
//               )}
//             </Box>

//             <Box sx={{ display: "flex", gap: 2 }}>
//               <TextField
//                 fullWidth
//                 type="date"
//                 label="Fecha"
//                 value={formData.date}
//                 onChange={(e) => handleChange("date", e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//                 required
//                  sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//               />
//               <TextField
//                 fullWidth
//                 type="time"
//                 label="Hora Inicio"
//                 value={formData.startTime}
//                 onChange={(e) => handleChange("startTime", e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//                 required
//                  sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//               />
//               <TextField
//                 fullWidth
//                 type="time"
//                 label="Hora Fin"
//                 value={formData.endTime}
//                 onChange={(e) => handleChange("endTime", e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//                 required
//                  sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//               />
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Duración"
//                 value={formData.estimatedDuration}
//                 onChange={(e) =>
//                   handleChange("estimatedDuration", Number(e.target.value))
//                 }
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">min</InputAdornment>
//                   ),
//                 }}
//                  sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//               />
//             </Box>
//           </Paper>

//           {/* SECCIÓN 5: DETALLES TÉCNICOS */}
//           <Paper
//             elevation={0}
//             sx={{
//               background: "rgba(255, 255, 255, 0.02)",
//               border: `2px solid ${
//                 isSectionComplete("details")
//                   ? "rgba(16, 185, 129, 0.3)"
//                   : "rgba(208, 193, 193, 0.49)"
//               }`,
//               borderRadius: 3,
//               p: 3,
//             }}
//           >
//             <Box display="flex" alignItems="center" gap={2} mb={3}>
//               <Box
//                 sx={{
//                   width: 48,
//                   height: 48,
//                   borderRadius: 2,
//                   background: "rgba(6, 182, 212, 0.15)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <DescriptionIcon sx={{ fontSize: 28, color: "#06B6D4" }} />
//               </Box>
//               <Box flex={1}>
//                 <Typography variant="h6" fontWeight={700} color="black">
//                   Detalles Técnicos
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   Información técnica del servicio
//                 </Typography>
//               </Box>
//               {isSectionComplete("details") && (
//                 <CheckCircleIcon sx={{ color: "#10B981", fontSize: 28 }} />
//               )}
//             </Box>

//             <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//               <TextField
//                 fullWidth
//                 label="Descripción del Servicio"
//                 value={formData.serviceDescription}
//                 onChange={(e) =>
//                   handleChange("serviceDescription", e.target.value)
//                 }
//                 multiline
//                 rows={3}
//                 placeholder="Describe el trabajo a realizar..."
//                  sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//               />
//               <Box sx={{ display: "flex", gap: 2 }}>
//                 <TextField
//                   fullWidth
//                   label="Plan Actual"
//                   value={formData.currentPlan || ""}
//                   onChange={(e) => handleChange("currentPlan", e.target.value)}
//                   placeholder="Ej: 100 Mbps"
//                    sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//                 />
//                 <TextField
//                   fullWidth
//                   label="Nuevo Plan"
//                   value={formData.newPlan || ""}
//                   onChange={(e) => handleChange("newPlan", e.target.value)}
//                   placeholder="Ej: 200 Mbps"
//                    sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//                 />
//                 <TextField
//                   fullWidth
//                   label="Tipo de Equipo"
//                   value={formData.equipmentType || ""}
//                   onChange={(e) =>
//                     handleChange("equipmentType", e.target.value)
//                   }
//                   placeholder="Ej: Modem DOCSIS 3.1"
//                    sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//                 />
//               </Box>
//               <Box sx={{ display: "flex", gap: 2 }}>
//                 <TextField
//                   fullWidth
//                   label="Serial del Equipo"
//                   value={formData.equipmentSerial || ""}
//                   onChange={(e) =>
//                     handleChange("equipmentSerial", e.target.value)
//                   }
//                   placeholder="Número de serie"
//                    sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//                 />
//                 <TextField
//                   fullWidth
//                   label="Problema Reportado"
//                   value={formData.issueReported || ""}
//                   onChange={(e) =>
//                     handleChange("issueReported", e.target.value)
//                   }
//                   placeholder="Descripción del problema"
//                    sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//                 />
//               </Box>
//             </Box>
//           </Paper>

//           {/* SECCIÓN 6: MATERIALES */}
//           <Paper
//             elevation={0}
//             sx={{
//               background: "rgba(255, 255, 255, 0.02)",
//               border: `2px solid ${
//                 isSectionComplete("materials")
//                   ? "rgba(16, 185, 129, 0.3)"
//                   : "rgba(208, 193, 193, 0.49)"
//               }`,
//               borderRadius: 3,
//               p: 3,
//             }}
//           >
//             <Box display="flex" alignItems="center" gap={2} mb={3}>
//               <Box
//                 sx={{
//                   width: 48,
//                   height: 48,
//                   borderRadius: 2,
//                   background: "rgba(236, 72, 153, 0.15)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <BuildIcon sx={{ fontSize: 28, color: "#EC4899" }} />
//               </Box>
//               <Box flex={1}>
//                 <Typography variant="h6" fontWeight={700} color="black">
//                   Materiales Utilizados
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   Inventario de materiales necesarios
//                 </Typography>
//               </Box>
//               {isSectionComplete("materials") && (
//                 <CheckCircleIcon sx={{ color: "#10B981", fontSize: 28 }} />
//               )}
//             </Box>

//             <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//               <TextField
//                 select
//                 fullWidth
//                 size="small"
//                 label="Seleccionar Material"
//                 value={selectedMaterial}
//                 onChange={(e) => setSelectedMaterial(e.target.value)}
//                  sx={{
//                     flex: 2,

//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//               >
//                 {commonMaterials.map((mat) => (
//                   <MenuItem key={mat.id} value={mat.id}>
//                     {mat.name} ({mat.unit})
//                   </MenuItem>
//                 ))}
//               </TextField>
//               <TextField
//                 fullWidth
//                 size="small"
//                 type="number"
//                 label="Cantidad"
//                 value={materialQuantity}
//                 onChange={(e) => setMaterialQuantity(Number(e.target.value))}
//                 inputProps={{ min: 1 }}
//                  sx={{
//                     flex: 1,
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//               />
//               <Button
//                 variant="contained"
//                 onClick={handleAddMaterial}
//                 disabled={!selectedMaterial}
//                 sx={{ px: 3 }}
//               >
//                 Agregar
//               </Button>
//             </Box>

//             <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//               {formData.materials.map((material, index) => (
//                 <Chip
//                   key={index}
//                   label={`${material.name} - ${material.quantity} ${material.unit}`}
//                   onDelete={() => handleRemoveMaterial(index)}
//                   color="primary"
//                   variant="outlined"
//                 />
//               ))}
//               {formData.materials.length === 0 && (
//                 <Typography variant="body2" color="text.secondary">
//                   No se han agregado materiales
//                 </Typography>
//               )}
//             </Box>
//           </Paper>

//           {/* SECCIÓN 7: MEDICIONES TÉCNICAS */}
//           <Paper
//             elevation={0}
//             sx={{
//               background: "rgba(255, 255, 255, 0.02)",
//               border: `2px solid rgba(208, 193, 193, 0.49)`,
//               borderRadius: 3,
//               p: 3,
//             }}
//           >
//             <Box display="flex" alignItems="center" gap={2} mb={3}>
//               <Box
//                 sx={{
//                   width: 48,
//                   height: 48,
//                   borderRadius: 2,
//                   background: "rgba(99, 102, 241, 0.15)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <AccessTimeIcon sx={{ fontSize: 28, color: "#6366F1" }} />
//               </Box>
//               <Box flex={1}>
//                 <Typography variant="h6" fontWeight={700} color="black">
//                   Mediciones Técnicas
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   Opcional - Parámetros de calidad del servicio
//                 </Typography>
//               </Box>
//             </Box>

//             <Box sx={{ display: "flex", gap: 2 }}>
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Potencia de Señal"
//                 value={formData.signalStrength || ""}
//                 onChange={(e) =>
//                   handleChange("signalStrength", Number(e.target.value))
//                 }
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">dBm</InputAdornment>
//                   ),
//                 }}
//                  sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//               />
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Velocidad de Descarga"
//                 value={formData.downloadSpeed || ""}
//                 onChange={(e) =>
//                   handleChange("downloadSpeed", Number(e.target.value))
//                 }
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">Mbps</InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//               />
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Velocidad de Subida"
//                 value={formData.uploadSpeed || ""}
//                 onChange={(e) =>
//                   handleChange("uploadSpeed", Number(e.target.value))
//                 }
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">Mbps</InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//               />
//             </Box>
//           </Paper>

//           {/* SECCIÓN 8: EVIDENCIAS FOTOGRÁFICAS */}
//           <Paper
//             elevation={0}
//             sx={{
//               background: "rgba(255, 255, 255, 0.02)",
//               border: `2px solid ${
//                 isSectionComplete("photos")
//                   ? "rgba(16, 185, 129, 0.3)"
//                   : "rgba(208, 193, 193, 0.49)"
//               }`,
//               borderRadius: 3,
//               p: 3,
//             }}
//           >
//             <Box display="flex" alignItems="center" gap={2} mb={3}>
//               <Box
//                 sx={{
//                   width: 48,
//                   height: 48,
//                   borderRadius: 2,
//                   background: "rgba(20, 184, 166, 0.15)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <CameraAltIcon sx={{ fontSize: 28, color: "#14B8A6" }} />
//               </Box>
//               <Box flex={1}>
//                 <Typography variant="h6" fontWeight={700} color="black">
//                   Evidencias Fotográficas
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   Fotos del trabajo realizado
//                 </Typography>
//               </Box>
//               {isSectionComplete("photos") && (
//                 <CheckCircleIcon sx={{ color: "#10B981", fontSize: 28 }} />
//               )}
//             </Box>

//             <Button
//               variant="outlined"
//               component="label"
//               startIcon={<AddPhotoAlternateIcon />}
//               sx={{ mb: 2 }}
//             >
//               Cargar Fotos
//               <input
//                 type="file"
//                 hidden
//                 accept="image/*"
//                 multiple
//                 onChange={handlePhotoUpload}
//               />
//             </Button>

//             <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
//               {photosPreviews.map((preview, index) => (
//                 <Card key={index} sx={{ width: 200 }}>
//                   <CardMedia
//                     component="img"
//                     height="140"
//                     image={preview}
//                     alt={`Evidencia ${index + 1}`}
//                   />
//                   <CardActions>
//                     <IconButton
//                       size="small"
//                       onClick={() => handleRemovePhoto(index)}
//                       color="error"
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </CardActions>
//                 </Card>
//               ))}
//             </Box>
//           </Paper>

//           {/* SECCIÓN 9: DOCUMENTOS ADJUNTOS */}
//           <Paper
//             elevation={0}
//             sx={{
//               background: "rgba(255, 255, 255, 0.02)",
//               border: `2px solid ${
//                 isSectionComplete("documents")
//                   ? "rgba(16, 185, 129, 0.3)"
//                   : "rgba(208, 193, 193, 0.49)"
//               }`,
//               borderRadius: 3,
//               p: 3,
//             }}
//           >
//             <Box display="flex" alignItems="center" gap={2} mb={3}>
//               <Box
//                 sx={{
//                   width: 48,
//                   height: 48,
//                   borderRadius: 2,
//                   background: "rgba(249, 115, 22, 0.15)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <AttachFileIcon sx={{ fontSize: 28, color: "#F97316" }} />
//               </Box>
//               <Box flex={1}>
//                 <Typography variant="h6" fontWeight={700} color="black">
//                   Documentos Adjuntos
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   PDFs, contratos y otros documentos
//                 </Typography>
//               </Box>
//               {isSectionComplete("documents") && (
//                 <CheckCircleIcon sx={{ color: "#10B981", fontSize: 28 }} />
//               )}
//             </Box>

//             <Button
//               variant="outlined"
//               component="label"
//               startIcon={<CloudUploadIcon />}
//               sx={{ mb: 2 }}
//             >
//               Cargar Documentos
//               <input
//                 type="file"
//                 hidden
//                 accept=".pdf,.doc,.docx"
//                 multiple
//                 onChange={handleDocumentUpload}
//               />
//             </Button>

//             <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//               {formData.documents.map((doc, index) => (
//                 <Chip
//                   key={index}
//                   label={doc.name}
//                   onDelete={() =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       documents: prev.documents.filter((_, i) => i !== index),
//                     }))
//                   }
//                   icon={<AttachFileIcon />}
//                 />
//               ))}
//             </Box>
//           </Paper>

//           {/* SECCIÓN 10: OBSERVACIONES */}
//           <Paper
//             elevation={0}
//             sx={{
//               background: "rgba(255, 255, 255, 0.02)",
//               border: `2px solid ${
//                 isSectionComplete("observations")
//                   ? "rgba(16, 185, 129, 0.3)"
//                   : "rgba(208, 193, 193, 0.49)"
//               }`,
//               borderRadius: 3,
//               p: 3,
//             }}
//           >
//             <Box display="flex" alignItems="center" gap={2} mb={3}>
//               <Box
//                 sx={{
//                   width: 48,
//                   height: 48,
//                   borderRadius: 2,
//                   background: "rgba(168, 85, 247, 0.15)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <DescriptionIcon sx={{ fontSize: 28, color: "#A855F7" }} />
//               </Box>
//               <Box flex={1}>
//                 <Typography variant="h6" fontWeight={700} color="black">
//                   Observaciones Adicionales
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   Notas y comentarios finales
//                 </Typography>
//               </Box>
//               {isSectionComplete("observations") && (
//                 <CheckCircleIcon sx={{ color: "#10B981", fontSize: 28 }} />
//               )}
//             </Box>

//             <TextField
//               fullWidth
//               label="Observaciones"
//               value={formData.observations}
//               onChange={(e) => handleChange("observations", e.target.value)}
//               multiline
//               rows={4}
//               placeholder="Cualquier información adicional relevante..."
//               sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                   },
//                 }}
//             />
//           </Paper>
//         </Box>

//         {/* Botones de Acción */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "flex-end",
//             gap: 2,
//             mt: 4,
//             pt: 3,
//             borderTop: "1px solid rgba(255, 255, 255, 0.1)",
//           }}
//         >
//           <Button
//             variant="outlined"
//             size="large"
//             onClick={() => router.back()}
//             sx={{
//               borderColor: "rgba(255, 255, 255, 0.2)",
//               color: "white",
//               "&:hover": {
//                 borderColor: "rgba(255, 255, 255, 0.4)",
//                 background: "rgba(255, 255, 255, 0.05)",
//               },
//             }}
//           >
//             Cancelar
//           </Button>
//           <Button
//             variant="contained"
//             size="large"
//             startIcon={<SaveIcon />}
//             onClick={handleSubmit}
//             disabled={progress < 100}
//             sx={{
//               px: 4,
//               background: "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)",
//               "&:hover": {
//                 background: "linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)",
//               },
//             }}
//           >
//             Guardar Atención
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

"use client";

import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Chip,
  IconButton,
  Divider,
  InputAdornment,
  Card,
  CardMedia,
  CardActions,
  LinearProgress,
  Paper,
} from "@mui/material";
import { useState, useEffect, JSX } from "react";
import { useRouter } from "next/navigation";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BuildIcon from "@mui/icons-material/Build";
import DescriptionIcon from "@mui/icons-material/Description";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { TitleCard } from "@/src/components/base/TitleCard";
import ListAltIcon from "@mui/icons-material/ListAlt";

export interface AttentionFormData {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientDocument: string;
  address: string;
  district: string;
  reference: string;
  coordinates?: { lat: number; lng: number };
  serviceType: string;
  workType: string;
  priority: "alta" | "media" | "baja";
  technicianId: string;
  date: string;
  startTime: string;
  endTime: string;
  estimatedDuration: number;
  serviceDescription: string;
  currentPlan?: string;
  newPlan?: string;
  technology: string;
  equipmentType?: string;
  equipmentSerial?: string;
  materials: Array<{
    id: string;
    name: string;
    quantity: number;
    unit: string;
  }>;
  observations: string;
  issueReported?: string;
  solutionApplied?: string;
  photos: File[];
  documents: File[];
  signalStrength?: number;
  downloadSpeed?: number;
  uploadSpeed?: number;
  clientSignature?: string;
}

const serviceTypes = [
  "Instalación HFC",
  "Instalación FTTH",
  "Instalación DTH",
  "Instalación LTE",
  "Reparación de Servicio",
  "Mantenimiento Preventivo",
  "Cambio de Equipo",
  "Migración de Tecnología",
  "Upgrade de Plan",
  "Retiro de Servicio",
];

const workTypes = [
  "Instalación Nueva",
  "Reinstalación",
  "Reubicación",
  "Reparación",
  "Mantenimiento",
  "Cambio de Tecnología",
  "Cambio de Plan",
  "Desinstalación",
];

const technologies = [
  "HFC (Cable Coaxial)",
  "FTTH (Fibra Óptica)",
  "DTH (Satélite)",
  "LTE (4G)",
  "5G",
  "ADSL",
];

const mockTechnicians = [
  { id: "tech-1", name: "Carlos Rodríguez", specialization: "HFC/FTTH" },
  { id: "tech-2", name: "María González", specialization: "FTTH" },
  { id: "tech-3", name: "Jorge Martínez", specialization: "DTH" },
  { id: "tech-4", name: "Ana López", specialization: "LTE/5G" },
];

const commonMaterials = [
  { id: "mat-1", name: "Cable Coaxial RG6", unit: "metros" },
  { id: "mat-2", name: "Fibra Óptica", unit: "metros" },
  { id: "mat-3", name: "Conector F", unit: "unidades" },
  { id: "mat-4", name: "Splitter", unit: "unidades" },
  { id: "mat-5", name: "Modem", unit: "unidades" },
  { id: "mat-6", name: "ONT", unit: "unidades" },
  { id: "mat-7", name: "Router WiFi", unit: "unidades" },
  { id: "mat-8", name: "Antena DTH", unit: "unidades" },
  { id: "mat-9", name: "Decodificador", unit: "unidades" },
  { id: "mat-10", name: "Cable Ethernet CAT6", unit: "metros" },
];

// Imágenes de evidencia mock
const mockPhotos = [
  "data:image/jpeg;base64,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",
  "data:image/jpeg;base64,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",
];

interface Section {
  id: string;
  title: string;
  icon: JSX.Element;
  color: string;
  fields: string[];
}

const sections: Section[] = [
  {
    id: "client",
    title: "Datos del Cliente",
    icon: <PersonIcon />,
    color: "#3B82F6",
    fields: ["clientName", "clientPhone", "clientDocument", "clientEmail"],
  },
  {
    id: "address",
    title: "Dirección",
    icon: <HomeIcon />,
    color: "#10B981",
    fields: ["address", "district", "reference"],
  },
  {
    id: "service",
    title: "Tipo de Servicio",
    icon: <BuildIcon />,
    color: "#F59E0B",
    fields: [
      "serviceType",
      "workType",
      "priority",
      "technology",
      "technicianId",
    ],
  },
  {
    id: "schedule",
    title: "Programación",
    icon: <CalendarTodayIcon />,
    color: "#8B5CF6",
    fields: ["date", "startTime", "endTime", "estimatedDuration"],
  },
  {
    id: "details",
    title: "Detalles Técnicos",
    icon: <DescriptionIcon />,
    color: "#06B6D4",
    fields: ["serviceDescription", "currentPlan", "newPlan", "equipmentType"],
  },
  {
    id: "materials",
    title: "Materiales",
    icon: <BuildIcon />,
    color: "#EC4899",
    fields: ["materials"],
  },
  {
    id: "measurements",
    title: "Mediciones",
    icon: <AccessTimeIcon />,
    color: "#6366F1",
    fields: ["signalStrength", "downloadSpeed", "uploadSpeed"],
  },
  {
    id: "photos",
    title: "Evidencias",
    icon: <CameraAltIcon />,
    color: "#14B8A6",
    fields: ["photos"],
  },
  {
    id: "documents",
    title: "Documentos",
    icon: <AttachFileIcon />,
    color: "#F97316",
    fields: ["documents"],
  },
  {
    id: "observations",
    title: "Observaciones",
    icon: <DescriptionIcon />,
    color: "#A855F7",
    fields: ["observations"],
  },
];

export default function CreateAttentionPage() {
  const router = useRouter();

  // Datos iniciales completos
  const [formData, setFormData] = useState<AttentionFormData>({
    clientName: "Juan Carlos Rodríguez Pérez",
    clientPhone: "+51 987654321",
    clientEmail: "juancarlos@gmail.com",
    clientDocument: "45678912",
    address: "Av. Javier Prado Este 4567, Piso 12, Oficina 1201",
    district: "Santiago de Surco",
    reference: "Edificio corporativo color azul, frente al parque Kennedy, al lado del banco BCP",
    serviceType: "Instalación FTTH",
    workType: "Instalación Nueva",
    priority: "alta",
    technicianId: "tech-2",
    date: "2024-02-15",
    startTime: "10:00",
    endTime: "12:30",
    estimatedDuration: 150,
    serviceDescription: "Instalación completa de fibra óptica FTTH con router WiFi 6. Incluye cableado desde el punto de entrada hasta la ubicación del ONT, configuración de red y pruebas de conectividad. Se requiere perforación de paredes para paso de cable.",
    currentPlan: "50 Mbps - Cable",
    newPlan: "300 Mbps - Fibra",
    technology: "FTTH (Fibra Óptica)",
    equipmentType: "ONT Huawei HG8546M + Router WiFi 6 AX1800",
    equipmentSerial: "FTTH2024-001-HW8546M-789456123",
    materials: [
      { id: "mat-2", name: "Fibra Óptica", quantity: 35, unit: "metros" },
      { id: "mat-6", name: "ONT", quantity: 1, unit: "unidades" },
      { id: "mat-7", name: "Router WiFi", quantity: 1, unit: "unidades" },
      { id: "mat-10", name: "Cable Ethernet CAT6", quantity: 15, unit: "metros" },
    ],
    observations: "Cliente requiere instalación prioritaria por trabajo remoto. Coordinar acceso al edificio con seguridad 30 minutos antes. Verificar disponibilidad de punto de fibra en el sótano del edificio. El cliente estará presente durante toda la instalación y requiere capacitación en el uso del nuevo equipo.",
    photos: [],
    documents: [],
    signalStrength: 22,
    downloadSpeed: 298,
    uploadSpeed: 145,
    issueReported: "Velocidad lenta en servicio anterior de cable coaxial",
  });

  const [photosPreviews, setPhotosPreviews] = useState<string[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [materialQuantity, setMaterialQuantity] = useState(1);
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  console.log(photosPreviews,"TESTING FOTOS")

  // Calcular progreso
  const calculateProgress = () => {
    let completed = 0;
    sections.forEach((section) => {
      const isComplete = section.fields.every((field) => {
        const value = formData[field as keyof AttentionFormData];
        if (Array.isArray(value)) return value.length > 0;
        return value !== "" && value !== undefined && value !== null;
      });
      if (isComplete) completed++;
    });
    return (completed / sections.length) * 100;
  };

  // Verificar si una sección está completa
  const isSectionComplete = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return false;

    return section.fields.every((field) => {
      const value = formData[field as keyof AttentionFormData];
      if (Array.isArray(value)) return value.length > 0;
      return value !== "" && value !== undefined && value !== null;
    });
  };

  useEffect(() => {
    const completed = sections
      .filter((section) => isSectionComplete(section.id))
      .map((s) => s.id);
    setCompletedSections(completed);
  }, [formData]);

  const handleChange = (field: keyof AttentionFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...files] }));

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotosPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({
      ...prev,
      documents: [...prev.documents, ...files],
    }));
  };

  const handleRemovePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
    setPhotosPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddMaterial = () => {
    if (!selectedMaterial) return;

    const material = commonMaterials.find((m) => m.id === selectedMaterial);
    if (!material) return;

    const newMaterial = {
      id: material.id,
      name: material.name,
      quantity: materialQuantity,
      unit: material.unit,
    };

    setFormData((prev) => ({
      ...prev,
      materials: [...prev.materials, newMaterial],
    }));

    setSelectedMaterial("");
    setMaterialQuantity(1);
  };

  const handleRemoveMaterial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    console.log("📝 Datos del formulario:", formData);
    alert("✅ Atención creada exitosamente");
    router.push("/logistics/attentions");
  };

  const progress = calculateProgress();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar con progreso */}
      <Box
        sx={{
          width: 320,
          position: "sticky",
          top: 0,
          background: "white",
          backdropFilter: "blur(10px)",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          p: 3,
          overflowY: "auto",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            color="rgba(15, 23, 42, 0.8)"
            gutterBottom
          >
            Progreso del Formulario
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2" color="text.secondary">
                Completado
              </Typography>
              <Typography variant="body2" fontWeight={700} color="primary.main">
                {Math.round(progress)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: "rgba(15, 23, 42, 0.8)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 4,
                  background:
                    "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)",
                },
              }}
            />
          </Box>
        </Box>

        <Divider sx={{ mb: 3, borderColor: "rgba(255, 255, 255, 0.1)" }} />

        {/* Lista de secciones */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {sections.map((section, index) => {
            const isComplete = completedSections.includes(section.id);
            return (
              <Box
                key={section.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1.5,
                  borderRadius: 2,
                  background: isComplete
                    ? "rgba(16, 185, 129, 0.1)"
                    : "rgba(255, 255, 255, 0.03)",
                  border: `1px solid ${
                    isComplete
                      ? "rgba(16, 185, 129, 0.3)"
                      : "rgba(208, 193, 193, 0.49)"
                  }`,
                  transition: "all 0.3s",
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: isComplete
                      ? "rgba(16, 185, 129, 0.2)"
                      : "rgba(255, 255, 255, 0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isComplete ? "#10B981" : section.color,
                  }}
                >
                  {isComplete ? (
                    <CheckCircleIcon fontSize="small" />
                  ) : (
                    <RadioButtonUncheckedIcon fontSize="small" />
                  )}
                </Box>
                <Box flex={1}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color={isComplete ? "#10B981" : "rgba(15, 23, 42, 0.8)"}
                  >
                    {index + 1}. {section.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {isComplete ? "Completado" : "Pendiente"}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Resumen */}
        <Box
          sx={{
            mt: 4,
            p: 2,
            borderRadius: 2,
            background: "rgba(59, 130, 246, 0.1)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
          }}
        >
          <Typography
            variant="body2"
            fontWeight={600}
            color="#3B82F6"
            gutterBottom
          >
            📊 Resumen
          </Typography>
          <Box display="flex" flexDirection="column" gap={1} mt={1}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="caption" color="text.secondary">
                Secciones completadas:
              </Typography>
              <Typography variant="caption" fontWeight={700} color="black">
                {completedSections.length} / {sections.length}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="caption" color="text.secondary">
                Materiales agregados:
              </Typography>
              <Typography variant="caption" fontWeight={700} color="black">
                {formData.materials.length}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="caption" color="text.secondary">
                Fotos cargadas:
              </Typography>
              <Typography variant="caption" fontWeight={700} color="black">
                {photosPreviews.length}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Contenido principal */}
      <Box sx={{ flex: 1, p: 4, overflowY: "auto", background: "white" }}>
        {/* Header */}
        <TitleCard
          icon={<ListAltIcon />}
          title="Nueva Atención Técnica"
          description="Complete todos los campos para registrar una nueva atención"
        />

        {/* Formulario con bloques individuales */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
          {/* SECCIÓN 1: DATOS DEL CLIENTE */}
          <Paper
            elevation={0}
            sx={{
              background: "rgba(255, 255, 255, 0.02)",
              border: `2px solid ${
                isSectionComplete("client")
                  ? "rgba(16, 185, 129, 0.3)"
                  : "rgba(208, 193, 193, 0.49)"
              }`,
              borderRadius: 3,
              p: 3,
              transition: "all 0.3s",
            }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  background: "rgba(59, 130, 246, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PersonIcon sx={{ fontSize: 28, color: "#3B82F6" }} />
              </Box>
              <Box flex={1}>
                <Typography variant="h6" fontWeight={700} color="black">
                  Datos del Cliente
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Información personal del cliente
                </Typography>
              </Box>
              {isSectionComplete("client") && (
                <CheckCircleIcon sx={{ color: "#10B981", fontSize: 28 }} />
              )}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Nombre Completo"
                value={formData.clientName}
                onChange={(e) => handleChange("clientName", e.target.value)}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  value={formData.clientPhone}
                  onChange={(e) => handleChange("clientPhone", e.target.value)}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="DNI/RUC"
                  value={formData.clientDocument}
                  onChange={(e) =>
                    handleChange("clientDocument", e.target.value)
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
              </Box>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.clientEmail}
                onChange={(e) => handleChange("clientEmail", e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
            </Box>
          </Paper>

          {/* SECCIÓN 2: DIRECCIÓN */}
          <Paper
            elevation={0}
            sx={{
              background: "rgba(255, 255, 255, 0.02)",
              border: `2px solid ${
                isSectionComplete("address")
                  ? "rgba(16, 185, 129, 0.3)"
                  : "rgba(208, 193, 193, 0.49)"
              }`,
              borderRadius: 3,
              p: 3,
            }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  background: "rgba(16, 185, 129, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <HomeIcon sx={{ fontSize: 28, color: "#10B981" }} />
              </Box>
              <Box flex={1}>
                <Typography variant="h6" fontWeight={700} color="black">
                  Dirección del Servicio
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Ubicación donde se realizará el servicio
                </Typography>
              </Box>
              {isSectionComplete("address") && (
                <CheckCircleIcon sx={{ color: "#10B981", fontSize: 28 }} />
              )}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  label="Dirección Completa"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  required
                  sx={{
                    flex: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Distrito"
                  value={formData.district}
                  onChange={(e) => handleChange("district", e.target.value)}
                  required
                  sx={{
                    flex: 1,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
              </Box>
              <TextField
                fullWidth
                label="Referencia"
                value={formData.reference}
                onChange={(e) => handleChange("reference", e.target.value)}
                placeholder="Ej: Casa de 2 pisos, color verde, al lado del parque"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
            </Box>
          </Paper>


          
          {/* SECCIÓN 8: EVIDENCIAS FOTOGRÁFICAS */}
          <Paper
            elevation={0}
            sx={{
              background: "rgba(255, 255, 255, 0.02)",
              border: `2px solid ${
                isSectionComplete("photos")
                  ? "rgba(16, 185, 129, 0.3)"
                  : "rgba(208, 193, 193, 0.49)"
              }`,
              borderRadius: 3,
              p: 3,
            }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  background: "rgba(20, 184, 166, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CameraAltIcon sx={{ fontSize: 28, color: "#14B8A6" }} />
              </Box>
              <Box flex={1}>
                <Typography variant="h6" fontWeight={700} color="black">
                  Evidencias Fotográficas
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Fotos del trabajo realizado
                </Typography>
              </Box>
              {isSectionComplete("photos") && (
                <CheckCircleIcon sx={{ color: "#10B981", fontSize: 28 }} />
              )}
            </Box>

            <Button
              variant="outlined"
              component="label"
              startIcon={<AddPhotoAlternateIcon />}
              sx={{ mb: 2 }}
            >
              Cargar Fotos
              <input
                type="file"
                hidden
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
              />
            </Button>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {photosPreviews.map((preview, index) => (
                <Card key={index} sx={{ width: 200 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    sx={{
                      height:"140px",
                      maxHeight:"140px",
                      objectFit:"contain"
                    }}
                    image={preview}
                    alt={`Evidencia ${index + 1}`}
                    onClick={()=>{}}
                  />
                  <CardActions>
                    <IconButton
                      size="small"
                      onClick={() => handleRemovePhoto(index)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              ))}
            </Box>
          </Paper>

          {/* SECCIÓN 3: TIPO DE SERVICIO */}
          <Paper
            elevation={0}
            sx={{
              background: "rgba(255, 255, 255, 0.02)",
              border: `2px solid ${
                isSectionComplete("service")
                  ? "rgba(16, 185, 129, 0.3)"
                  : "rgba(208, 193, 193, 0.49)"
              }`,
              borderRadius: 3,
              p: 3,
            }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  background: "rgba(245, 158, 11, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BuildIcon sx={{ fontSize: 28, color: "#F59E0B" }} />
              </Box>
              <Box flex={1}>
                <Typography variant="h6" fontWeight={700} color="black">
                  Tipo de Servicio
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Especificaciones del trabajo a realizar
                </Typography>
              </Box>
              {isSectionComplete("service") && (
                <CheckCircleIcon sx={{ color: "#10B981", fontSize: 28 }} />
              )}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  select
                  fullWidth
                  label="Tipo de Servicio"
                  value={formData.serviceType}
                  onChange={(e) => handleChange("serviceType", e.target.value)}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                >
                  {serviceTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  fullWidth
                  label="Tipo de Trabajo"
                  value={formData.workType}
                  onChange={(e) => handleChange("workType", e.target.value)}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                >
                  {workTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  fullWidth
                  label="Prioridad"
                  value={formData.priority}
                  onChange={(e) =>
                    handleChange("priority", e.target.value as any)
                  }
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                >
                  <MenuItem value="alta">🔴 Alta</MenuItem>
                  <MenuItem value="media">🟠 Media</MenuItem>
                  <MenuItem value="baja">🟢 Baja</MenuItem>
                </TextField>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  select
                  fullWidth
                  label="Tecnología"
                  value={formData.technology}
                  onChange={(e) => handleChange("technology", e.target.value)}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                >
                  {technologies.map((tech) => (
                    <MenuItem key={tech} value={tech}>
                      {tech}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  fullWidth
                  label="Técnico Asignado"
                  value={formData.technicianId}
                  onChange={(e) => handleChange("technicianId", e.target.value)}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                >
                  {mockTechnicians.map((tech) => (
                    <MenuItem key={tech.id} value={tech.id}>
                      {tech.name} - {tech.specialization}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
          </Paper>

          {/* SECCIÓN 4: PROGRAMACIÓN */}
          <Paper
            elevation={0}
            sx={{
              background: "rgba(255, 255, 255, 0.02)",
              border: `2px solid ${
                isSectionComplete("schedule")
                  ? "rgba(16, 185, 129, 0.3)"
                  : "rgba(208, 193, 193, 0.49)"
              }`,
              borderRadius: 3,
              p: 3,
            }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  background: "rgba(139, 92, 246, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CalendarTodayIcon sx={{ fontSize: 28, color: "#8B5CF6" }} />
              </Box>
              <Box flex={1}>
                <Typography variant="h6" fontWeight={700} color="black">
                  Programación
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Fecha y horario de la atención
                </Typography>
              </Box>
              {isSectionComplete("schedule") && (
                <CheckCircleIcon sx={{ color: "#10B981", fontSize: 28 }} />
              )}
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                type="date"
                label="Fecha"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
              <TextField
                fullWidth
                type="time"
                label="Hora Inicio"
                value={formData.startTime}
                onChange={(e) => handleChange("startTime", e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
              <TextField
                fullWidth
                type="time"
                label="Hora Fin"
                value={formData.endTime}
                onChange={(e) => handleChange("endTime", e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
              <TextField
                fullWidth
                type="number"
                label="Duración"
                value={formData.estimatedDuration}
                onChange={(e) =>
                  handleChange("estimatedDuration", Number(e.target.value))
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">min</InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
            </Box>
          </Paper>

          {/* SECCIÓN 5: DETALLES TÉCNICOS */}
          <Paper
            elevation={0}
            sx={{
              background: "rgba(255, 255, 255, 0.02)",
              border: `2px solid ${
                isSectionComplete("details")
                  ? "rgba(16, 185, 129, 0.3)"
                  : "rgba(208, 193, 193, 0.49)"
              }`,
              borderRadius: 3,
              p: 3,
            }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  background: "rgba(6, 182, 212, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DescriptionIcon sx={{ fontSize: 28, color: "#06B6D4" }} />
              </Box>
              <Box flex={1}>
                <Typography variant="h6" fontWeight={700} color="black">
                  Detalles Técnicos
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Información técnica del servicio
                </Typography>
              </Box>
              {isSectionComplete("details") && (
                <CheckCircleIcon sx={{ color: "#10B981", fontSize: 28 }} />
              )}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Descripción del Servicio"
                value={formData.serviceDescription}
                onChange={(e) =>
                  handleChange("serviceDescription", e.target.value)
                }
                multiline
                rows={3}
                placeholder="Describe el trabajo a realizar..."
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  label="Plan Actual"
                  value={formData.currentPlan || ""}
                  onChange={(e) => handleChange("currentPlan", e.target.value)}
                  placeholder="Ej: 100 Mbps"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Nuevo Plan"
                  value={formData.newPlan || ""}
                  onChange={(e) => handleChange("newPlan", e.target.value)}
                  placeholder="Ej: 200 Mbps"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Tipo de Equipo"
                  value={formData.equipmentType || ""}
                  onChange={(e) =>
                    handleChange("equipmentType", e.target.value)
                  }
                  placeholder="Ej: Modem DOCSIS 3.1"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  label="Serial del Equipo"
                  value={formData.equipmentSerial || ""}
                  onChange={(e) =>
                    handleChange("equipmentSerial", e.target.value)
                  }
                  placeholder="Número de serie"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Problema Reportado"
                  value={formData.issueReported || ""}
                  onChange={(e) =>
                    handleChange("issueReported", e.target.value)
                  }
                  placeholder="Descripción del problema"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
              </Box>
            </Box>
          </Paper>

          {/* SECCIÓN 6: MATERIALES */}
          <Paper
            elevation={0}
            sx={{
              background: "rgba(255, 255, 255, 0.02)",
              border: `2px solid ${
                isSectionComplete("materials")
                  ? "rgba(16, 185, 129, 0.3)"
                  : "rgba(208, 193, 193, 0.49)"
              }`,
              borderRadius: 3,
              p: 3,
            }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  background: "rgba(236, 72, 153, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BuildIcon sx={{ fontSize: 28, color: "#EC4899" }} />
              </Box>
              <Box flex={1}>
                <Typography variant="h6" fontWeight={700} color="black">
                  Materiales Utilizados
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Inventario de materiales necesarios
                </Typography>
              </Box>
              {isSectionComplete("materials") && (
                <CheckCircleIcon sx={{ color: "#10B981", fontSize: 28 }} />
              )}
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                select
                fullWidth
                size="small"
                label="Seleccionar Material"
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                sx={{
                  flex: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              >
                {commonMaterials.map((mat) => (
                  <MenuItem key={mat.id} value={mat.id}>
                    {mat.name} ({mat.unit})
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="Cantidad"
                value={materialQuantity}
                onChange={(e) => setMaterialQuantity(Number(e.target.value))}
                inputProps={{ min: 1 }}
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleAddMaterial}
                disabled={!selectedMaterial}
                sx={{ px: 3 }}
              >
                Agregar
              </Button>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {formData.materials.map((material, index) => (
                <Chip
                  key={index}
                  label={`${material.name} - ${material.quantity} ${material.unit}`}
                  onDelete={() => handleRemoveMaterial(index)}
                  color="primary"
                  variant="outlined"
                />
              ))}
              {formData.materials.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  No se han agregado materiales
                </Typography>
              )}
            </Box>
          </Paper>

          {/* SECCIÓN 7: MEDICIONES TÉCNICAS */}
          <Paper
            elevation={0}
            sx={{
              background: "rgba(255, 255, 255, 0.02)",
              border: `2px solid rgba(208, 193, 193, 0.49)`,
              borderRadius: 3,
              p: 3,
            }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  background: "rgba(99, 102, 241, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AccessTimeIcon sx={{ fontSize: 28, color: "#6366F1" }} />
              </Box>
              <Box flex={1}>
                <Typography variant="h6" fontWeight={700} color="black">
                  Mediciones Técnicas
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Opcional - Parámetros de calidad del servicio
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                type="number"
                label="Potencia de Señal"
                value={formData.signalStrength || ""}
                onChange={(e) =>
                  handleChange("signalStrength", Number(e.target.value))
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">dBm</InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
              <TextField
                fullWidth
                type="number"
                label="Velocidad de Descarga"
                value={formData.downloadSpeed || ""}
                onChange={(e) =>
                  handleChange("downloadSpeed", Number(e.target.value))
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Mbps</InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
              <TextField
                fullWidth
                type="number"
                label="Velocidad de Subida"
                value={formData.uploadSpeed || ""}
                onChange={(e) =>
                  handleChange("uploadSpeed", Number(e.target.value))
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Mbps</InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
            </Box>
          </Paper>


          {/* SECCIÓN 9: DOCUMENTOS ADJUNTOS */}
          <Paper
            elevation={0}
            sx={{
              background: "rgba(255, 255, 255, 0.02)",
              border: `2px solid ${
                isSectionComplete("documents")
                  ? "rgba(16, 185, 129, 0.3)"
                  : "rgba(208, 193, 193, 0.49)"
              }`,
              borderRadius: 3,
              p: 3,
            }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  background: "rgba(249, 115, 22, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AttachFileIcon sx={{ fontSize: 28, color: "#F97316" }} />
              </Box>
              <Box flex={1}>
                <Typography variant="h6" fontWeight={700} color="black">
                  Documentos Adjuntos
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  PDFs, contratos y otros documentos
                </Typography>
              </Box>
              {isSectionComplete("documents") && (
                <CheckCircleIcon sx={{ color: "#10B981", fontSize: 28 }} />
              )}
            </Box>

            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 2 }}
            >
              Cargar Documentos
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx"
                multiple
                onChange={handleDocumentUpload}
              />
            </Button>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {formData.documents.map((doc, index) => (
                <Chip
                  key={index}
                  label={doc.name}
                  onDelete={() =>
                    setFormData((prev) => ({
                      ...prev,
                      documents: prev.documents.filter((_, i) => i !== index),
                    }))
                  }
                  icon={<AttachFileIcon />}
                />
              ))}
            </Box>
          </Paper>

          {/* SECCIÓN 10: OBSERVACIONES */}
          <Paper
            elevation={0}
            sx={{
              background: "rgba(255, 255, 255, 0.02)",
              border: `2px solid ${
                isSectionComplete("observations")
                  ? "rgba(16, 185, 129, 0.3)"
                  : "rgba(208, 193, 193, 0.49)"
              }`,
              borderRadius: 3,
              p: 3,
            }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  background: "rgba(168, 85, 247, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DescriptionIcon sx={{ fontSize: 28, color: "#A855F7" }} />
              </Box>
              <Box flex={1}>
                <Typography variant="h6" fontWeight={700} color="black">
                  Observaciones Adicionales
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Notas y comentarios finales
                </Typography>
              </Box>
              {isSectionComplete("observations") && (
                <CheckCircleIcon sx={{ color: "#10B981", fontSize: 28 }} />
              )}
            </Box>

            <TextField
              fullWidth
              label="Observaciones"
              value={formData.observations}
              onChange={(e) => handleChange("observations", e.target.value)}
              multiline
              rows={4}
              placeholder="Cualquier información adicional relevante..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
          </Paper>
        </Box>

        {/* Botones de Acción */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 4,
            pt: 3,
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Button
            variant="outlined"
            size="large"
            onClick={() => router.back()}
            sx={{
              borderColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              "&:hover": {
                borderColor: "rgba(255, 255, 255, 0.4)",
                background: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            size="large"
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
            disabled={progress < 100}
            sx={{
              px: 4,
              background: "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)",
              "&:hover": {
                background: "linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)",
              },
            }}
          >
            Guardar Atención
          </Button>
        </Box>
      </Box>
    </Box>
  );
}