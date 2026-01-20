
// "use client";

// import { FileUploader } from "@/src/components/base/FileUploader";
// import { SectionHeader } from "@/src/components/base/SectionHeader";
// import { TitleCard } from "@/src/components/base/TitleCard";
// import {
//   DescriptionOutlined,
//   CloudUploadOutlined,
//   CheckCircleOutline,
//   BuildOutlined,
//   CategoryOutlined,
//   InventoryOutlined,
//   AccessTimeOutlined,
//   PersonOutlined,
// } from "@mui/icons-material";
// import {
//   Box,
//   Card,
//   LinearProgress,
//   Typography,
//   Chip,
//   Divider,
//   Alert,
//   Fade,
//   Grow,
// } from "@mui/material";
// import { useState } from "react";

// interface KardexStats {
//   herramientas: number;
//   equipamiento: number;
//   material: number;
// }

// interface LastUploadInfo {
//   fecha: string;
//   usuario: string;
// }

// export default function MassiveUpload() {
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadComplete, setUploadComplete] = useState(false);
//   const [kardexStats, setKardexStats] = useState<KardexStats | null>(null);
//   const [lastUpload, setLastUpload] = useState<LastUploadInfo>({
//     fecha: "15/12/2024 10:30 AM",
//     usuario: "Juan Pérez",
//   });

//   const handleFileSelect = (file: File) => {
//     console.log("Archivo seleccionado", file);
//     setIsUploading(true);
//     setUploadComplete(false);

//     // Simular el proceso de carga de 60 segundos
//     setTimeout(() => {
//       setIsUploading(false);
//       setUploadComplete(true);
//       // Datos de ejemplo - reemplazar con datos reales de la API
//       setKardexStats({
//         herramientas: 45,
//         equipamiento: 28,
//         material: 132,
//       });
//       // Actualizar la fecha de última carga
//       setLastUpload({
//         fecha: new Date().toLocaleString("es-PE", {
//           day: "2-digit",
//           month: "2-digit",
//           year: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         }),
//         usuario: "Usuario Actual", // Reemplazar con el usuario real
//       });
//     }, 10000); // 60 segundos
//   };

//   const handleError = (error: string) => {
//     console.log("Error: ", error);
//     setIsUploading(false);
//   };

//   const getTotalItems = () => {
//     if (!kardexStats) return 0;
//     return (
//       kardexStats.herramientas +
//       kardexStats.equipamiento +
//       kardexStats.material
//     );
//   };

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
//       {/* Seccion: Titulo - Cabecera */}
//       <TitleCard
//         icon={<DescriptionOutlined sx={{ fontSize: 32 }} />}
//         title="Carga de KARDEX (LEMCORP)"
//         description="Carga masiva de materiales y equipos provenientes del almacén principal"
//       />

//       {/* Panel: Última Carga */}
//       <Fade in={true} timeout={800}>
//         <Card
//           elevation={2}
//           sx={{
//             borderRadius: 3,
//             boxShadow: "rgba(149, 157, 165, 0.15) 0px 4px 16px",
//             p: 3,
//             bgcolor: "background.paper",
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
//             <AccessTimeOutlined sx={{ color: "info.main", fontSize: 28 }} />
//             <Typography variant="h6" fontWeight={600}>
//               Última carga realizada
//             </Typography>
//           </Box>
//           <Divider sx={{ mb: 2 }} />
//           <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <AccessTimeOutlined sx={{ color: "text.secondary", fontSize: 20 }} />
//               <Typography variant="body1" color="text.secondary">
//                 Fecha:
//               </Typography>
//               <Typography variant="body1" fontWeight={600}>
//                 {lastUpload.fecha}
//               </Typography>
//             </Box>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <PersonOutlined sx={{ color: "text.secondary", fontSize: 20 }} />
//               <Typography variant="body1" color="text.secondary">
//                 Usuario:
//               </Typography>
//               <Typography variant="body1" fontWeight={600}>
//                 {lastUpload.usuario}
//               </Typography>
//             </Box>
//           </Box>
//         </Card>
//       </Fade>

//       {/* Sección: Carga de Archivo */}
//       <Card
//         elevation={3}
//         sx={{
//           borderRadius: 4,
//           boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
//           borderColor: "divider",
//           p: 4,
//         }}
//       >
//         <SectionHeader
//           icon={
//             <CloudUploadOutlined sx={{ fontSize: 32, color: "primary.main" }} />
//           }
//           title="Archivo de entrada"
//           subtitle="Selecciona el archivo Excel (.xlsx) con la información del KARDEX"
//         />

//         <FileUploader
//           accept=".xlsx"
//           maxSize={10}
//           onFileSelect={handleFileSelect}
//           onError={handleError}
//         />

//         {/* Progress Bar con animación de stripes */}
//         {isUploading && (
//           <Fade in={isUploading} timeout={600}>
//             <Box sx={{ mt: 4 }}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   mb: 1.5,
//                 }}
//               >
//                 <Typography variant="body1" fontWeight={500} color="primary">
//                   Procesando archivo KARDEX...
//                 </Typography>
//               </Box>
//               <Box
//                 sx={{
//                   position: "relative",
//                   height: 12,
//                   borderRadius: 2,
//                   overflow: "hidden",
//                   bgcolor: "#e3f2fd",
//                   border: "1px solid #90caf9",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     background: `repeating-linear-gradient(
//                       45deg,
//                       #1976d2,
//                       #1976d2 20px,
//                       #42a5f5 20px,
//                       #42a5f5 40px
//                     )`,
//                     backgroundSize: "200% 100%",
//                     animation: "stripeAnimation 2s linear infinite",
//                     "@keyframes stripeAnimation": {
//                       "0%": {
//                         backgroundPosition: "0 0",
//                       },
//                       "100%": {
//                         backgroundPosition: "56.57px 0", // 40px * sqrt(2)
//                       },
//                     },
//                   }}
//                 />
//               </Box>
//               <Typography
//                 variant="caption"
//                 color="text.secondary"
//                 sx={{ display: "block", mt: 1, textAlign: "center" }}
//               >
//                 Analizando y guardando información del almacén...
//               </Typography>
//             </Box>
//           </Fade>
//         )}
//       </Card>

//       {/* Panel: Resultados de la Carga */}
//       {uploadComplete && kardexStats && (
//         <Grow in={uploadComplete} timeout={800}>
//           <Box>
//             {/* Alert de Éxito */}
//             <Alert
//               severity="success"
//               icon={<CheckCircleOutline fontSize="large" />}
//               sx={{
//                 mb: 3,
//                 borderRadius: 3,
//                 boxShadow: "rgba(46, 125, 50, 0.15) 0px 4px 16px",
//                 "& .MuiAlert-message": {
//                   width: "100%",
//                 },
//               }}
//             >
//               <Typography variant="h6" fontWeight={600} gutterBottom>
//                 ¡Carga completada exitosamente!
//               </Typography>
//               <Typography variant="body2">
//                 Se han procesado y guardado {getTotalItems()} ítems del KARDEX en
//                 el sistema.
//               </Typography>
//             </Alert>

//             {/* Estadísticas de Items */}
//             <Card
//               elevation={3}
//               sx={{
//                 borderRadius: 4,
//                 boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
//                 p: 4,
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
//                 <InventoryOutlined sx={{ color: "primary.main", fontSize: 32 }} />
//                 <Typography variant="h6" fontWeight={600}>
//                   Resumen de ítems encontrados
//                 </Typography>
//               </Box>
//               <Divider sx={{ mb: 3 }} />

//               {/* Contenedor Flexbox para las tarjetas */}
//               <Box
//                 sx={{
//                   display: "flex",
//                   gap: 3,
//                   flexWrap: "wrap",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 {/* Herramientas */}
//                 <Fade in={uploadComplete} timeout={1000}>
//                   <Box sx={{ flex: "1 1 300px", minWidth: 250 }}>
//                     <Card
//                       sx={{
//                         p: 3,
//                         textAlign: "center",
//                         bgcolor: "primary.50",
//                         border: "2px solid",
//                         borderColor: "primary.main",
//                         borderRadius: 3,
//                         transition: "all 0.3s ease",
//                         height: "100%",
//                         "&:hover": {
//                           transform: "translateY(-4px)",
//                           boxShadow: "rgba(25, 118, 210, 0.3) 0px 8px 24px",
//                         },
//                       }}
//                     >
//                       <BuildOutlined
//                         sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
//                       />
//                       <Typography
//                         variant="h3"
//                         fontWeight={700}
//                         color="primary.main"
//                         gutterBottom
//                       >
//                         {kardexStats.herramientas}
//                       </Typography>
//                       <Chip
//                         label="Herramientas"
//                         color="primary"
//                         sx={{ fontWeight: 600 }}
//                       />
//                     </Card>
//                   </Box>
//                 </Fade>

//                 {/* Equipamiento */}
//                 <Fade in={uploadComplete} timeout={1200}>
//                   <Box sx={{ flex: "1 1 300px", minWidth: 250 }}>
//                     <Card
//                       sx={{
//                         p: 3,
//                         textAlign: "center",
//                         bgcolor: "success.50",
//                         border: "2px solid",
//                         borderColor: "success.main",
//                         borderRadius: 3,
//                         transition: "all 0.3s ease",
//                         height: "100%",
//                         "&:hover": {
//                           transform: "translateY(-4px)",
//                           boxShadow: "rgba(46, 125, 50, 0.3) 0px 8px 24px",
//                         },
//                       }}
//                     >
//                       <CategoryOutlined
//                         sx={{ fontSize: 48, color: "success.main", mb: 2 }}
//                       />
//                       <Typography
//                         variant="h3"
//                         fontWeight={700}
//                         color="success.main"
//                         gutterBottom
//                       >
//                         {kardexStats.equipamiento}
//                       </Typography>
//                       <Chip
//                         label="Equipamiento"
//                         color="success"
//                         sx={{ fontWeight: 600 }}
//                       />
//                     </Card>
//                   </Box>
//                 </Fade>

//                 {/* Material */}
//                 <Fade in={uploadComplete} timeout={1400}>
//                   <Box sx={{ flex: "1 1 300px", minWidth: 250 }}>
//                     <Card
//                       sx={{
//                         p: 3,
//                         textAlign: "center",
//                         bgcolor: "warning.50",
//                         border: "2px solid",
//                         borderColor: "warning.main",
//                         borderRadius: 3,
//                         transition: "all 0.3s ease",
//                         height: "100%",
//                         "&:hover": {
//                           transform: "translateY(-4px)",
//                           boxShadow: "rgba(237, 108, 2, 0.3) 0px 8px 24px",
//                         },
//                       }}
//                     >
//                       <InventoryOutlined
//                         sx={{ fontSize: 48, color: "warning.main", mb: 2 }}
//                       />
//                       <Typography
//                         variant="h3"
//                         fontWeight={700}
//                         color="warning.main"
//                         gutterBottom
//                       >
//                         {kardexStats.material}
//                       </Typography>
//                       <Chip
//                         label="Material"
//                         color="warning"
//                         sx={{ fontWeight: 600 }}
//                       />
//                     </Card>
//                   </Box>
//                 </Fade>
//               </Box>

//               {/* Total */}
//               <Box
//                 sx={{
//                   mt: 4,
//                   p: 2,
//                   bgcolor: "action.hover",
//                   borderRadius: 2,
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography variant="h6" fontWeight={600}>
//                   Total de ítems procesados
//                 </Typography>
//                 <Chip
//                   label={getTotalItems()}
//                   color="primary"
//                   size="medium"
//                   sx={{
//                     fontSize: 18,
//                     fontWeight: 700,
//                     px: 2,
//                     py: 2.5,
//                   }}
//                 />
//               </Box>
//             </Card>
//           </Box>
//         </Grow>
//       )}
//     </Box>
//   );
// }

"use client";

import { FileUploader } from "@/src/components/base/FileUploader";
import { SectionHeader } from "@/src/components/base/SectionHeader";
import { TitleCard } from "@/src/components/base/TitleCard";
import {
  DescriptionOutlined,
  CloudUploadOutlined,
  CheckCircleOutline,
  BuildOutlined,
  CategoryOutlined,
  InventoryOutlined,
  AccessTimeOutlined,
  PersonOutlined,
  FolderOutlined,
} from "@mui/icons-material";
import {
  Box,
  Card,
  Typography,
  Chip,
  Divider,
  Alert,
  Fade,
  Grow,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useState } from "react";

interface KardexStats {
  herramientas: number;
  equipamiento: number;
  material: number;
}

interface LastUploadInfo {
  fecha: string;
  usuario: string;
}

type DocumentType = "KARDEX_LEMCORP" | "MACRO_ALTAS";

interface LastUploads {
  KARDEX_LEMCORP: LastUploadInfo | null;
  MACRO_ALTAS: LastUploadInfo | null;
}

export default function MassiveUpload() {
  const [selectedType, setSelectedType] = useState<DocumentType>("KARDEX_LEMCORP");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [kardexStats, setKardexStats] = useState<KardexStats | null>(null);
  const [uploaderKey, setUploaderKey] = useState(0); // Key para resetear FileUploader
  const [lastUploads, setLastUploads] = useState<LastUploads>({
    KARDEX_LEMCORP: {
      fecha: "15/12/2024 10:30 AM",
      usuario: "Juan Pérez",
    },
    MACRO_ALTAS: {
      fecha: "14/12/2024 03:15 PM",
      usuario: "María García",
    },
  });

  const documentTypeConfig = {
    KARDEX_LEMCORP: {
      label: "KARDEX LEMCORP",
      description: "Carga masiva del KARDEX general del almacén principal",
      color: "primary" as const,
      chipColor: "#1976d2",
      categories: ["herramientas", "equipamiento", "material"] as const,
    },
    MACRO_ALTAS: {
      label: "MACRO ALTAS",
      description: "Carga de equipos con códigos adicionales y configuración especial",
      color: "secondary" as const,
      chipColor: "#9c27b0",
      categories: ["equipamiento"] as const, // Solo equipos
    },
  };

  const handleTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newType: DocumentType | null
  ) => {
    if (newType !== null) {
      setSelectedType(newType);
      setUploadComplete(false);
      setKardexStats(null);
      setUploaderKey(prev => prev + 1); // Resetear el FileUploader
    }
  };

  const handleFileSelect = (file: File) => {
    console.log("Archivo seleccionado:", file, "Tipo:", selectedType);
    setIsUploading(true);
    setUploadComplete(false);

    // Simular el proceso de carga
    setTimeout(() => {
      setIsUploading(false);
      setUploadComplete(true);

      // Datos de ejemplo según el tipo de documento
      if (selectedType === "MACRO_ALTAS") {
        // Solo equipamiento para MACRO ALTAS
        setKardexStats({
          herramientas: 0,
          equipamiento: 85, // Solo equipos
          material: 0,
        });
      } else {
        // Todos los tipos para KARDEX LEMCORP
        setKardexStats({
          herramientas: 45,
          equipamiento: 28,
          material: 132,
        });
      }

      // Actualizar la fecha de última carga para el tipo seleccionado
      const newDate = new Date().toLocaleString("es-PE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setLastUploads((prev) => ({
        ...prev,
        [selectedType]: {
          fecha: newDate,
          usuario: "Usuario Actual", // Reemplazar con el usuario real
        },
      }));
    }, 10000);
  };

  const handleError = (error: string) => {
    console.log("Error:", error);
    setIsUploading(false);
  };

  const getTotalItems = () => {
    if (!kardexStats) return 0;
    return (
      kardexStats.herramientas +
      kardexStats.equipamiento +
      kardexStats.material
    );
  };

  const currentLastUpload = lastUploads[selectedType];
  const currentConfig = documentTypeConfig[selectedType];

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Seccion: Titulo - Cabecera */}
      <TitleCard
        icon={<DescriptionOutlined sx={{ fontSize: 32 }} />}
        title="Carga Masiva de Inventario"
        description="Gestión de cargas KARDEX LEMCORP y MACRO ALTAS del almacén principal"
      />

      {/* Selector de Tipo de Documento */}
      <Fade in={true} timeout={600}>
        <Card
          elevation={2}
          sx={{
            borderRadius: 3,
            boxShadow: "rgba(149, 157, 165, 0.15) 0px 4px 16px",
            p: 3,
            bgcolor: "background.paper",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <FolderOutlined sx={{ color: "primary.main", fontSize: 28 }} />
            <Typography variant="h6" fontWeight={600}>
              Tipo de documento a cargar
            </Typography>
          </Box>

          <ToggleButtonGroup
            value={selectedType}
            exclusive
            onChange={handleTypeChange}
            aria-label="Tipo de documento"
            fullWidth
            sx={{
              gap: 2,
              "& .MuiToggleButton-root": {
                borderRadius: 2,
                border: "2px solid",
                textTransform: "none",
                py: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              },
            }}
          >
            <ToggleButton
              value="KARDEX_LEMCORP"
              sx={{
                borderColor: "primary.main",
                "&.Mui-selected": {
                  bgcolor: "primary.50",
                  borderColor: "primary.main",
                  fontWeight: 700,
                  "&:hover": {
                    bgcolor: "primary.100",
                  },
                },
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="h6" fontWeight={600}>
                  📦 KARDEX LEMCORP
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  KARDEX general del almacén
                </Typography>
              </Box>
            </ToggleButton>

            <ToggleButton
              value="MACRO_ALTAS"
              sx={{
                borderColor: "secondary.main",
                "&.Mui-selected": {
                  bgcolor: "secondary.50",
                  borderColor: "secondary.main",
                  fontWeight: 700,
                  "&:hover": {
                    bgcolor: "secondary.100",
                  },
                },
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="h6" fontWeight={600}>
                  🔧 MACRO ALTAS
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Solo equipos con códigos adicionales
                </Typography>
              </Box>
            </ToggleButton>
          </ToggleButtonGroup>
        </Card>
      </Fade>

      {/* Panel: Última Carga del Tipo Seleccionado */}
      <Fade in={true} timeout={800} key={selectedType}>
        <Card
          elevation={2}
          sx={{
            borderRadius: 3,
            boxShadow: "rgba(149, 157, 165, 0.15) 0px 4px 16px",
            p: 3,
            bgcolor: "background.paper",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <AccessTimeOutlined
              sx={{ color: currentConfig.chipColor, fontSize: 28 }}
            />
            <Typography variant="h6" fontWeight={600}>
              Última carga de {currentConfig.label}
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {currentLastUpload ? (
            <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AccessTimeOutlined
                  sx={{ color: "text.secondary", fontSize: 20 }}
                />
                <Typography variant="body1" color="text.secondary">
                  Fecha:
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {currentLastUpload.fecha}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PersonOutlined sx={{ color: "text.secondary", fontSize: 20 }} />
                <Typography variant="body1" color="text.secondary">
                  Usuario:
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {currentLastUpload.usuario}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              <Typography variant="body2">
                No se han registrado cargas previas de este tipo de documento
              </Typography>
            </Alert>
          )}
        </Card>
      </Fade>

      {/* Sección: Carga de Archivo */}
      <Card
        elevation={3}
        sx={{
          borderRadius: 4,
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          borderColor: "divider",
          p: 4,
        }}
      >
        <SectionHeader
          icon={
            <CloudUploadOutlined
              sx={{ fontSize: 32, color: currentConfig.chipColor }}
            />
          }
          title="Archivo de entrada"
          subtitle={`Selecciona el archivo Excel (.xlsx) con la información de ${currentConfig.label}`}
        />

        <Box
          sx={{
            mb: 3,
            p: 2,
            bgcolor: `${currentConfig.chipColor}10`,
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            📋 {currentConfig.description}
          </Typography>
        </Box>

        {/* FileUploader con key única para resetear */}
        <FileUploader
          key={uploaderKey}
          accept=".xlsx"
          maxSize={10}
          onFileSelect={handleFileSelect}
          onError={handleError}
        />

        {/* Progress Bar con animación de stripes */}
        {isUploading && (
          <Fade in={isUploading} timeout={600}>
            <Box sx={{ mt: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1.5,
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight={500}
                  sx={{ color: currentConfig.chipColor }}
                >
                  Procesando archivo {currentConfig.label}...
                </Typography>
              </Box>
              <Box
                sx={{
                  position: "relative",
                  height: 12,
                  borderRadius: 2,
                  overflow: "hidden",
                  bgcolor: `${currentConfig.chipColor}20`,
                  border: `1px solid ${currentConfig.chipColor}60`,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `repeating-linear-gradient(
                      45deg,
                      ${currentConfig.chipColor},
                      ${currentConfig.chipColor} 20px,
                      ${currentConfig.chipColor}CC 20px,
                      ${currentConfig.chipColor}CC 40px
                    )`,
                    backgroundSize: "200% 100%",
                    animation: "stripeAnimation 2s linear infinite",
                    "@keyframes stripeAnimation": {
                      "0%": {
                        backgroundPosition: "0 0",
                      },
                      "100%": {
                        backgroundPosition: "56.57px 0",
                      },
                    },
                  }}
                />
              </Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 1, textAlign: "center" }}
              >
                {selectedType === "MACRO_ALTAS"
                  ? "Analizando equipos y procesando códigos adicionales..."
                  : "Analizando y guardando información del almacén..."}
              </Typography>
            </Box>
          </Fade>
        )}
      </Card>

      {/* Panel: Resultados de la Carga */}
      {uploadComplete && kardexStats && (
        <Grow in={uploadComplete} timeout={800}>
          <Box>
            {/* Alert de Éxito */}
            <Alert
              severity="success"
              icon={<CheckCircleOutline fontSize="large" />}
              sx={{
                mb: 3,
                borderRadius: 3,
                boxShadow: "rgba(46, 125, 50, 0.15) 0px 4px 16px",
                "& .MuiAlert-message": {
                  width: "100%",
                },
              }}
            >
              <Typography variant="h6" fontWeight={600} gutterBottom>
                ¡Carga de {currentConfig.label} completada exitosamente!
              </Typography>
              <Typography variant="body2">
                Se han procesado y guardado {getTotalItems()} ítems en el sistema.
                {selectedType === "MACRO_ALTAS" &&
                  " Los códigos adicionales de equipos han sido registrados correctamente."}
              </Typography>
            </Alert>

            {/* Estadísticas de Items */}
            <Card
              elevation={3}
              sx={{
                borderRadius: 4,
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                p: 4,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                <InventoryOutlined
                  sx={{ color: currentConfig.chipColor, fontSize: 32 }}
                />
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Resumen de ítems encontrados
                  </Typography>
                  <Chip
                    label={currentConfig.label}
                    size="small"
                    sx={{
                      bgcolor: currentConfig.chipColor,
                      color: "white",
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </Box>
              <Divider sx={{ mb: 3 }} />

              {/* Contenedor Flexbox para las tarjetas */}
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  flexWrap: "wrap",
                  justifyContent: selectedType === "MACRO_ALTAS" ? "center" : "space-between",
                }}
              >
                {/* Herramientas - Solo para KARDEX_LEMCORP */}
                {selectedType === "KARDEX_LEMCORP" && kardexStats.herramientas > 0 && (
                  <Fade in={uploadComplete} timeout={1000}>
                    <Box sx={{ flex: "1 1 300px", minWidth: 250 }}>
                      <Card
                        sx={{
                          p: 3,
                          textAlign: "center",
                          bgcolor: "primary.50",
                          border: "2px solid",
                          borderColor: "primary.main",
                          borderRadius: 3,
                          transition: "all 0.3s ease",
                          height: "100%",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "rgba(25, 118, 210, 0.3) 0px 8px 24px",
                          },
                        }}
                      >
                        <BuildOutlined
                          sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
                        />
                        <Typography
                          variant="h3"
                          fontWeight={700}
                          color="primary.main"
                          gutterBottom
                        >
                          {kardexStats.herramientas}
                        </Typography>
                        <Chip
                          label="Herramientas"
                          color="primary"
                          sx={{ fontWeight: 600 }}
                        />
                      </Card>
                    </Box>
                  </Fade>
                )}

                {/* Equipamiento - Para ambos tipos */}
                {kardexStats.equipamiento > 0 && (
                  <Fade in={uploadComplete} timeout={1200}>
                    <Box sx={{ flex: "1 1 300px", minWidth: 250 }}>
                      <Card
                        sx={{
                          p: 3,
                          textAlign: "center",
                          bgcolor: "success.50",
                          border: "2px solid",
                          borderColor: "success.main",
                          borderRadius: 3,
                          transition: "all 0.3s ease",
                          height: "100%",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "rgba(46, 125, 50, 0.3) 0px 8px 24px",
                          },
                        }}
                      >
                        <CategoryOutlined
                          sx={{ fontSize: 48, color: "success.main", mb: 2 }}
                        />
                        <Typography
                          variant="h3"
                          fontWeight={700}
                          color="success.main"
                          gutterBottom
                        >
                          {kardexStats.equipamiento}
                        </Typography>
                        <Chip
                          label="Equipamiento"
                          color="success"
                          sx={{ fontWeight: 600 }}
                        />
                      </Card>
                    </Box>
                  </Fade>
                )}

                {/* Material - Solo para KARDEX_LEMCORP */}
                {selectedType === "KARDEX_LEMCORP" && kardexStats.material > 0 && (
                  <Fade in={uploadComplete} timeout={1400}>
                    <Box sx={{ flex: "1 1 300px", minWidth: 250 }}>
                      <Card
                        sx={{
                          p: 3,
                          textAlign: "center",
                          bgcolor: "warning.50",
                          border: "2px solid",
                          borderColor: "warning.main",
                          borderRadius: 3,
                          transition: "all 0.3s ease",
                          height: "100%",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "rgba(237, 108, 2, 0.3) 0px 8px 24px",
                          },
                        }}
                      >
                        <InventoryOutlined
                          sx={{ fontSize: 48, color: "warning.main", mb: 2 }}
                        />
                        <Typography
                          variant="h3"
                          fontWeight={700}
                          color="warning.main"
                          gutterBottom
                        >
                          {kardexStats.material}
                        </Typography>
                        <Chip
                          label="Material"
                          color="warning"
                          sx={{ fontWeight: 600 }}
                        />
                      </Card>
                    </Box>
                  </Fade>
                )}
              </Box>

              {/* Total */}
              <Box
                sx={{
                  mt: 4,
                  p: 2,
                  bgcolor: "action.hover",
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  Total de ítems procesados
                </Typography>
                <Chip
                  label={getTotalItems()}
                  sx={{
                    bgcolor: currentConfig.chipColor,
                    color: "white",
                    fontSize: 18,
                    fontWeight: 700,
                    px: 2,
                    py: 2.5,
                  }}
                />
              </Box>
            </Card>
          </Box>
        </Grow>
      )}
    </Box>
  );
}