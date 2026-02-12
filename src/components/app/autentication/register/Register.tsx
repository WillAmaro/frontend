// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { authService, Tenant } from "@/src/services/api/AuthService";
// import { toast } from "react-toastify";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   MenuItem,
//   CircularProgress,
//   Paper,
//   Container,
//   InputAdornment,
//   Divider,
//   Stepper,
//   Step,
//   StepLabel,
//   Card,
//   CardContent,
//   Alert,
//   AlertTitle,
// } from "@mui/material";
// import {
//   Business,
//   Badge,
//   Person,
//   CreditCard,
//   Phone,
//   Work,
//   Domain,
//   CheckCircle,
//   Info,
//   ArrowBack,
//   ArrowForward,
// } from "@mui/icons-material";

// const steps = [
//   "Información de la Empresa",
//   "Datos Personales",
//   "Información Laboral",
// ];

// export default function CompleteProfilePage() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [tenants, setTenants] = useState<Tenant[]>([]);
//   const [userId, setUserId] = useState<string>("");
//   const [userEmail, setUserEmail] = useState<string>("");
//   const [activeStep, setActiveStep] = useState(0);

//   const [profileData, setProfileData] = useState({
//     tenant_id: "",
//     employee_code: "",
//     first_name: "",
//     last_name: "",
//     document_type: "DNI" as "DNI" | "CE" | "PASSPORT" | "RUC",
//     document_number: "",
//     phone: "",
//     mobile: "",
//     position: "",
//     department: "",
//   });

//   useEffect(() => {
//     const loadData = async () => {
//       // Obtener datos temporales del localStorage
//       const tempUserId = localStorage.getItem("temp_user_id");
//       const tempEmail = localStorage.getItem("temp_user_email");

//       if (!tempUserId) {
//         toast.error("Sesión no válida. Inicia sesión nuevamente.");
//         router.push("/login");
//         return;
//       }

//       setUserId(tempUserId);
//       setUserEmail(tempEmail || "");

//       // Cargar tenants
//       try {
//         const tenantsData = await authService.getTenants();
//         setTenants(tenantsData);
//       } catch (error: any) {
//         toast.error("Error al cargar empresas: " + error.message);
//       }
//     };

//     loadData();
//   }, [router]);

//   const handleNext = () => {
//     // Validar cada paso antes de avanzar
//     if (activeStep === 0) {
//       if (!profileData.tenant_id) {
//         toast.error("Por favor selecciona una empresa");
//         return;
//       }
//       if (!profileData.employee_code) {
//         toast.error("Por favor ingresa tu código de empleado");
//         return;
//       }
//     }

//     if (activeStep === 1) {
//       if (!profileData.first_name || !profileData.last_name) {
//         toast.error("Por favor completa tu nombre completo");
//         return;
//       }
//       if (!profileData.document_number) {
//         toast.error("Por favor ingresa tu número de documento");
//         return;
//       }
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const result = await authService.completeProfile(userId, profileData);

//       if (result.success) {
//         toast.success(result.message, {
//           autoClose: 5000,
//         });

//         // Limpiar localStorage
//         localStorage.removeItem("temp_user_id");
//         localStorage.removeItem("temp_user_email");

//         // Redirigir al login
//         setTimeout(() => {
//           router.push("/login");
//         }, 2000);
//       } else {
//         toast.error(result.message);
//       }
//     } catch (error: any) {
//       toast.error(error.message || "Error al completar perfil");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getStepContent = (step: number) => {
//     switch (step) {
//       case 0:
//         return (
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//             <Alert severity="info" icon={<Info />}>
//               <AlertTitle>Información de la Empresa</AlertTitle>
//               Selecciona la empresa a la que perteneces y proporciona tu código de empleado.
//             </Alert>

//             {/* Empresa */}
//             <TextField
//               select
//               label="Empresa / Organización"
//               value={profileData.tenant_id}
//               onChange={(e) =>
//                 setProfileData({ ...profileData, tenant_id: e.target.value })
//               }
//               required
//               fullWidth
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Business color="primary" />
//                   </InputAdornment>
//                 ),
//               }}
//               helperText="Selecciona la empresa u organización a la que perteneces"
//             >
//               <MenuItem value="" disabled>
//                 Selecciona una empresa
//               </MenuItem>
//               {tenants.map((tenant) => (
//                 <MenuItem key={tenant.tenant_id} value={tenant.tenant_id}>
//                   <Box>
//                     <Typography variant="body1" fontWeight={600}>
//                       {tenant.tenant_name}
//                     </Typography>
//                     {tenant.tenant_ruc && (
//                       <Typography variant="caption" color="text.secondary">
//                         RUC: {tenant.tenant_ruc} | {tenant.tenant_legal_name}
//                       </Typography>
//                     )}
//                   </Box>
//                 </MenuItem>
//               ))}
//             </TextField>

//             {/* Código de Empleado */}
//             <TextField
//               label="Código de Empleado"
//               value={profileData.employee_code}
//               onChange={(e) =>
//                 setProfileData({ ...profileData, employee_code: e.target.value })
//               }
//               required
//               fullWidth
//               placeholder="EMP-001"
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Badge color="primary" />
//                   </InputAdornment>
//                 ),
//               }}
//               helperText="Código único asignado por la empresa"
//             />
//           </Box>
//         );

//       case 1:
//         return (
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//             <Alert severity="info" icon={<Info />}>
//               <AlertTitle>Datos Personales</AlertTitle>
//               Proporciona tu información personal y documento de identidad.
//             </Alert>

//             {/* Nombres y Apellidos */}
//             <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
//               <TextField
//                 label="Nombres"
//                 value={profileData.first_name}
//                 onChange={(e) =>
//                   setProfileData({ ...profileData, first_name: e.target.value })
//                 }
//                 required
//                 fullWidth
//                 placeholder="Ej: Juan Carlos"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Person color="primary" />
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               <TextField
//                 label="Apellidos"
//                 value={profileData.last_name}
//                 onChange={(e) =>
//                   setProfileData({ ...profileData, last_name: e.target.value })
//                 }
//                 required
//                 fullWidth
//                 placeholder="Ej: Pérez García"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Person color="primary" />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Box>

//             {/* Tipo de Documento */}
//             <TextField
//               select
//               label="Tipo de Documento"
//               value={profileData.document_type}
//               onChange={(e) =>
//                 setProfileData({
//                   ...profileData,
//                   document_type: e.target.value as any,
//                 })
//               }
//               required
//               fullWidth
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <CreditCard color="primary" />
//                   </InputAdornment>
//                 ),
//               }}
//             >
//               <MenuItem value="DNI">DNI - Documento Nacional de Identidad</MenuItem>
//               <MenuItem value="CE">CE - Carnet de Extranjería</MenuItem>
//               <MenuItem value="PASSPORT">Pasaporte</MenuItem>
//               <MenuItem value="RUC">RUC - Registro Único de Contribuyentes</MenuItem>
//             </TextField>

//             {/* Número de Documento */}
//             <TextField
//               label="Número de Documento"
//               value={profileData.document_number}
//               onChange={(e) =>
//                 setProfileData({
//                   ...profileData,
//                   document_number: e.target.value.replace(/\D/g, ""), // Solo números
//                 })
//               }
//               required
//               fullWidth
//               placeholder={
//                 profileData.document_type === "DNI"
//                   ? "12345678"
//                   : profileData.document_type === "RUC"
//                   ? "20123456789"
//                   : "Número de documento"
//               }
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <CreditCard color="primary" />
//                   </InputAdornment>
//                 ),
//               }}
//               helperText={
//                 profileData.document_type === "DNI"
//                   ? "8 dígitos"
//                   : profileData.document_type === "RUC"
//                   ? "11 dígitos"
//                   : "Ingresa tu número de documento"
//               }
//             />

//             {/* Teléfonos */}
//             <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
//               <TextField
//                 label="Teléfono Fijo (Opcional)"
//                 value={profileData.phone}
//                 onChange={(e) =>
//                   setProfileData({ ...profileData, phone: e.target.value })
//                 }
//                 fullWidth
//                 placeholder="(01) 234-5678"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Phone color="action" />
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               <TextField
//                 label="Celular (Opcional)"
//                 value={profileData.mobile}
//                 onChange={(e) =>
//                   setProfileData({ ...profileData, mobile: e.target.value })
//                 }
//                 fullWidth
//                 placeholder="999 888 777"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Phone color="action" />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Box>
//           </Box>
//         );

//       case 2:
//         return (
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//             <Alert severity="info" icon={<Info />}>
//               <AlertTitle>Información Laboral</AlertTitle>
//               Proporciona tu cargo y departamento dentro de la organización.
//             </Alert>

//             {/* Cargo */}
//             <TextField
//               label="Cargo / Puesto (Opcional)"
//               value={profileData.position}
//               onChange={(e) =>
//                 setProfileData({ ...profileData, position: e.target.value })
//               }
//               fullWidth
//               placeholder="Ej: Supervisor de Logística"
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Work color="action" />
//                   </InputAdornment>
//                 ),
//               }}
//               helperText="Tu cargo o puesto de trabajo en la empresa"
//             />

//             {/* Departamento */}
//             <TextField
//               label="Departamento / Área (Opcional)"
//               value={profileData.department}
//               onChange={(e) =>
//                 setProfileData({ ...profileData, department: e.target.value })
//               }
//               fullWidth
//               placeholder="Ej: Logística"
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Domain color="action" />
//                   </InputAdornment>
//                 ),
//               }}
//               helperText="Departamento o área a la que perteneces"
//             />

//             {/* Resumen */}
//             <Card variant="outlined" sx={{ bgcolor: "primary.50", mt: 2 }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <CheckCircle color="primary" />
//                   Resumen de tu Registro
//                 </Typography>
//                 <Divider sx={{ my: 2 }} />
//                 <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary" fontWeight={600}>
//                       EMPRESA
//                     </Typography>
//                     <Typography variant="body1">
//                       {tenants.find((t) => t.tenant_id === profileData.tenant_id)?.tenant_name || "No seleccionada"}
//                     </Typography>
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary" fontWeight={600}>
//                       CÓDIGO DE EMPLEADO
//                     </Typography>
//                     <Typography variant="body1">{profileData.employee_code || "No ingresado"}</Typography>
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary" fontWeight={600}>
//                       NOMBRE COMPLETO
//                     </Typography>
//                     <Typography variant="body1">
//                       {profileData.first_name && profileData.last_name
//                         ? `${profileData.first_name} ${profileData.last_name}`
//                         : "No ingresado"}
//                     </Typography>
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary" fontWeight={600}>
//                       DOCUMENTO
//                     </Typography>
//                     <Typography variant="body1">
//                       {profileData.document_type}: {profileData.document_number || "No ingresado"}
//                     </Typography>
//                   </Box>
//                   {profileData.position && (
//                     <Box>
//                       <Typography variant="caption" color="text.secondary" fontWeight={600}>
//                         CARGO
//                       </Typography>
//                       <Typography variant="body1">{profileData.position}</Typography>
//                     </Box>
//                   )}
//                   {profileData.department && (
//                     <Box>
//                       <Typography variant="caption" color="text.secondary" fontWeight={600}>
//                         DEPARTAMENTO
//                       </Typography>
//                       <Typography variant="body1">{profileData.department}</Typography>
//                     </Box>
//                   )}
//                 </Box>
//               </CardContent>
//             </Card>

//             <Alert severity="warning">
//               <AlertTitle>Información Importante</AlertTitle>
//               Una vez enviado el registro, tu cuenta quedará en estado <strong>PENDIENTE</strong> hasta que un
//               administrador te asigne un rol y active tu cuenta.
//             </Alert>
//           </Box>
//         );

//       default:
//         return "Paso desconocido";
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         // backgroundImage: 'url("/loginBG.jpg")',
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         p: 2,
//         py: 4,
//       }}
//     >
//       <Container maxWidth="lg">
//         <Paper
//           elevation={24}
//           sx={{
//             backdropFilter: "blur(20px)",
//             backgroundColor: "rgba(255, 255, 255, 0.98)",
//             borderRadius: 4,
//             overflow: "hidden",
//           }}
//         >
//           {/* Header */}
//           <Box
//             sx={{
//               background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//               color: "white",
//               p: { xs: 3, sm: 4 },
//               textAlign: "center",
//             }}
//           >
//             <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
//               Registro de Usuario
//             </Typography>
//             <Typography variant="body1" sx={{ opacity: 0.95 }}>
//               Registrando: <strong>{userEmail}</strong>
//             </Typography>
//           </Box>

//           {/* Stepper */}
//           <Box sx={{ px: { xs: 2, sm: 4 }, pt: 4 }}>
//             <Stepper activeStep={activeStep} alternativeLabel>
//               {steps.map((label) => (
//                 <Step key={label}>
//                   <StepLabel>{label}</StepLabel>
//                 </Step>
//               ))}
//             </Stepper>
//           </Box>

//           {/* Formulario */}
//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{
//               p: { xs: 3, sm: 4, md: 5 },
//             }}
//           >
//             {getStepContent(activeStep)}

//             {/* Botones de navegación */}
//             <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4, pt: 3, borderTop: "1px solid #e0e0e0" }}>
//               <Button
//                 disabled={activeStep === 0 || isLoading}
//                 onClick={handleBack}
//                 startIcon={<ArrowBack />}
//                 variant="outlined"
//                 size="large"
//               >
//                 Anterior
//               </Button>

//               {activeStep === steps.length - 1 ? (
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   size="large"
//                   disabled={isLoading}
//                   endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <CheckCircle />}
//                   sx={{
//                     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                     "&:hover": {
//                       background: "linear-gradient(135deg, #5568d3 0%, #6a4190 100%)",
//                     },
//                     minWidth: 200,
//                   }}
//                 >
//                   {isLoading ? "Enviando..." : "Completar Registro"}
//                 </Button>
//               ) : (
//                 <Button
//                   variant="contained"
//                   size="large"
//                   onClick={handleNext}
//                   endIcon={<ArrowForward />}
//                   sx={{
//                     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                     "&:hover": {
//                       background: "linear-gradient(135deg, #5568d3 0%, #6a4190 100%)",
//                     },
//                   }}
//                 >
//                   Siguiente
//                 </Button>
//               )}
//             </Box>
//           </Box>
//         </Paper>

//         {/* Footer */}
//         <Typography
//           variant="caption"
//           sx={{ display: "block", textAlign: "center", mt: 2, color: "white", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
//         >
//           © 2025 LPS GRUPO LATAM. Todos los derechos reservados.
//         </Typography>
//       </Container>
//     </Box>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService, Tenant } from "@/src/services/api/AuthService";
import { toast } from "react-toastify";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  CircularProgress,
  Paper,
  Container,
  InputAdornment,
  Divider,
  Card,
  CardContent,
  Alert,
  AlertTitle,
  Chip,
  Select,
  InputLabel,
} from "@mui/material";
import {
  Business,
  Badge,
  Person,
  CreditCard,
  Phone,
  Work,
  Domain,
  CheckCircle,
  Info,
  PersonAdd,
  Logout,
} from "@mui/icons-material";
import SelectBase from "@/src/components/base/SelectBase";

export default function CompleteProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTenants, setLoadingTenants] = useState(true);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  const [profileData, setProfileData] = useState({
    tenant_id: "",
    employee_code: "",
    first_name: "",
    last_name: "",
    document_type: "DNI" as "DNI" | "CE" | "PASSPORT" | "RUC",
    document_number: "",
    phone: "",
    mobile: "",
    position: "",
    department: "",
  });

  useEffect(() => {
    const loadData = async () => {
      setLoadingTenants(true);
      // Obtener datos temporales del localStorage
      const tempUserId = localStorage.getItem("temp_user_id");
      const tempEmail = localStorage.getItem("temp_user_email");

      if (!tempUserId) {
        toast.error("Sesión no válida. Inicia sesión nuevamente.");
        router.push("/login");
        return;
      }

      setUserId(tempUserId);
      setUserEmail(tempEmail || "");

      // Cargar tenants
      try {
        const tenantsData = await authService.getTenants();
        setLoadingTenants(false);
        debugger;
        setTenants(tenantsData);
      } catch (error: any) {
        toast.error("Error al cargar empresas: " + error.message);
      }
    };

    loadData();
  }, [router]);

  // useEffect(() => {
  //   const loadData = async () => {
  //     // Obtener datos temporales del localStorage
  //     const tempUserId = localStorage.getItem("temp_user_id");
  //     const tempEmail = localStorage.getItem("temp_user_email");

  //     if (!tempUserId) {
  //       toast.error("Sesión no válida. Inicia sesión nuevamente.");
  //       router.push("/login");
  //       return;
  //     }

  //     setUserId(tempUserId);
  //     setUserEmail(tempEmail || "");

  //     // Cargar tenants
  //     try {
  //       setLoadingTenants(true);
  //       const tenantsData = await authService.getTenants();
  //       setTenants(tenantsData);
  //     } catch (error: any) {
  //       toast.error("Error al cargar empresas: " + error.message);
  //     } finally {
  //       setLoadingTenants(false);
  //     }
  //   };

  //   loadData();
  // }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authService.completeProfile(userId, profileData);

      if (result.success) {
        toast.success(result.message, {
          autoClose: 5000,
        });

        // Limpiar localStorage
        localStorage.removeItem("temp_user_id");
        localStorage.removeItem("temp_user_email");

        // Redirigir al login
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Error al completar perfil");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    localStorage.removeItem("temp_user_id");
    localStorage.removeItem("temp_user_email");
    router.push("/login");
  };

  const selectedTenant = tenants.find(
    (t) => t.tenant_id === profileData.tenant_id,
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 3,
          }}
        >
          {/* PANEL IZQUIERDO - Información y Resumen */}
          <Box
            sx={{
              flex: { lg: "0 0 380px" },
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {/* Header Card */}
            <Card
              elevation={0}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                borderRadius: "1rem",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      bgcolor: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PersonAdd sx={{ fontSize: 32 }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                      Registro de Usuario
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Completa tu perfil para acceder
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 2 }} />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Cuenta de correo:
                  </Typography>
                  <Chip
                    label={userEmail}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      color: "white",
                      fontWeight: 600,
                      maxWidth: "100%",
                    }}
                  />
                </Box>
              </CardContent>
            </Card>

            {/* Información Card */}
            <Card elevation={0} sx={{ borderRadius: "1rem" }}>
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <Info color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Información Importante
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Al completar este formulario:
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <CheckCircle
                      sx={{ fontSize: 20, color: "success.main", mt: 0.2 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Tu cuenta será creada en estado <strong>PENDIENTE</strong>
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <CheckCircle
                      sx={{ fontSize: 20, color: "success.main", mt: 0.2 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Un administrador revisará y asignará tu rol
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <CheckCircle
                      sx={{ fontSize: 20, color: "success.main", mt: 0.2 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Recibirás notificación cuando tu cuenta sea activada
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <CheckCircle
                      sx={{ fontSize: 20, color: "success.main", mt: 0.2 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Podrás acceder al sistema una vez aprobado
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Resumen Card */}
            {(profileData.first_name ||
              profileData.last_name ||
              selectedTenant) && (
              <Card
                elevation={0}
                sx={{
                  bgcolor: "success.50",
                  border: "1px solid",
                  borderColor: "success.200",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 2, color: "success.800" }}
                  >
                    Resumen del Registro
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {selectedTenant && (
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary", fontWeight: 600 }}
                        >
                          EMPRESA
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: "success.900" }}
                        >
                          {selectedTenant.tenant_name}
                        </Typography>
                        {selectedTenant.tenant_ruc && (
                          <Typography variant="caption" color="text.secondary">
                            RUC: {selectedTenant.tenant_ruc}
                          </Typography>
                        )}
                      </Box>
                    )}
                    {profileData.employee_code && (
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary", fontWeight: 600 }}
                        >
                          CÓDIGO
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: "success.900" }}
                        >
                          {profileData.employee_code}
                        </Typography>
                      </Box>
                    )}
                    {(profileData.first_name || profileData.last_name) && (
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary", fontWeight: 600 }}
                        >
                          NOMBRE COMPLETO
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: "success.900" }}
                        >
                          {`${profileData.first_name} ${profileData.last_name}`.trim() ||
                            "..."}
                        </Typography>
                      </Box>
                    )}
                    {profileData.document_number && (
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary", fontWeight: 600 }}
                        >
                          DOCUMENTO
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: "success.900" }}
                        >
                          {profileData.document_type}:{" "}
                          {profileData.document_number}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>

          {/* PANEL DERECHO - Formulario */}
          <Box sx={{ flex: 1 }}>
            <Card elevation={0}>
              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Box component="form" onSubmit={handleSubmit}>
                  {/* Sección: Información de la Empresa */}
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 3,
                        pb: 1.5,
                        borderBottom: "2px solid",
                        borderColor: "primary.main",
                        display: "inline-block",
                      }}
                    >
                      1. Información de la Empresa
                    </Typography>

                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                    >
                      {/* <TextField
                        select
                        label="Empresa / Organización"
                        value={profileData.tenant_id.toString()}
                        onClick={(e:any) => {
                          debugger
                          setProfileData({ ...profileData, tenant_id: e.target.value?.toString() })}}
                        required
                        fullWidth
                        // disabled={loadingTenants}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Business color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        helperText="Selecciona la empresa u organización a la que perteneces"
                      >
                        {loadingTenants ? (
                          <MenuItem value="" disabled>
                            Cargando empresas...
                          </MenuItem>
                        ) : (
                          <>
                            <MenuItem value="" disabled>
                              Selecciona una empresa
                            </MenuItem>
                            {tenants.map((tenant) => (
                              <MenuItem key={tenant.tenant_id} value={tenant.tenant_id}>
                                <Box>
                                  <Typography variant="body1" fontWeight={600}>
                                    {tenant.tenant_name}
                                  </Typography>
                                  {tenant.tenant_ruc && (
                                    <Typography variant="caption" color="text.secondary">
                                      RUC: {tenant.tenant_ruc} | {tenant.tenant_legal_name}
                                    </Typography>
                                  )}
                                </Box>
                              </MenuItem>
                            ))}
                          </>
                        )}
                      </TextField> */}
                      <InputLabel id="tenant-select-label">
                        Empresa / Organización
                      </InputLabel>
                      <SelectBase
                        key="tenant-select-label"
                        size="medium"
                        // id="tenant-select"
                        value={profileData.tenant_id.toString()}
                        label=""
                        onChange={(e: any) => {
                          debugger;
                          setProfileData({
                            ...profileData,
                            tenant_id: e,
                          });
                        }}
                        disabled={loadingTenants}
                        options={tenants.map((item: any) => ({
                          value: item.tenant_id,
                          label: item.tenant_name,
                        }))} // startAdornment={
                        //   <InputAdornment position="start">
                        //     <Business color="primary" />
                        //   </InputAdornment>
                        // }
                      />
                    

                      <TextField
                        label="Código de Empleado"
                        value={profileData.employee_code}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            employee_code: e.target.value,
                          })
                        }
                        required
                        fullWidth
                        placeholder="Ej: EMP-001, A12345"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Badge color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root":{
                            borderRadius:"12px"
                          }
                        }}
                        helperText="Código único asignado por tu empresa"
                      />
                    </Box>
                  </Box>

                  <Divider sx={{ my: 4 }} />

                  {/* Sección: Datos Personales */}
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 3,
                        pb: 1.5,
                        borderBottom: "2px solid",
                        borderColor: "primary.main",
                        display: "inline-block",
                      }}
                    >
                      2. Datos Personales
                    </Typography>

                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          flexDirection: { xs: "column", sm: "row" },
                        }}
                      >
                        <TextField
                          label="Nombres"
                          value={profileData.first_name}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              first_name: e.target.value,
                            })
                          }
                          required
                          fullWidth
                           sx={{
                          "& .MuiOutlinedInput-root":{
                            borderRadius:"12px"
                          }
                        }}
                          placeholder="Ej: Juan Carlos"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />

                        <TextField
                          label="Apellidos"
                          value={profileData.last_name}
                           sx={{
                          "& .MuiOutlinedInput-root":{
                            borderRadius:"12px"
                          }
                        }}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              last_name: e.target.value,
                            })
                          }
                          required
                          fullWidth
                          placeholder="Ej: Pérez García"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          flexDirection: { xs: "column", sm: "row" },
                        }}
                      >
                        <TextField
                          select
                          label="Tipo de Documento"
                          value={profileData.document_type}
                           sx={{
                          "& .MuiOutlinedInput-root":{
                            borderRadius:"12px"
                          }
                        }}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              document_type: e.target.value as any,
                              document_number: "", // Resetear número al cambiar tipo
                            })
                          }
                          required
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CreditCard color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        >
                          <MenuItem value="DNI">DNI</MenuItem>
                          <MenuItem value="CE">Carnet de Extranjería</MenuItem>
                          <MenuItem value="PASSPORT">Pasaporte</MenuItem>
                          <MenuItem value="RUC">RUC</MenuItem>
                        </TextField>

                        <TextField
                          label="Número de Documento"
                          value={profileData.document_number}
                           sx={{
                          "& .MuiOutlinedInput-root":{
                            borderRadius:"12px"
                          }
                        }}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              document_number: e.target.value.replace(
                                /\D/g,
                                "",
                              ),
                            })
                          }
                          required
                          fullWidth
                          placeholder={
                            profileData.document_type === "DNI"
                              ? "12345678 (8 dígitos)"
                              : profileData.document_type === "RUC"
                                ? "20123456789 (11 dígitos)"
                                : "Número de documento"
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CreditCard color="primary" />
                              </InputAdornment>
                            ),
                          }}
                          helperText={
                            profileData.document_type === "DNI"
                              ? "8 dígitos"
                              : profileData.document_type === "RUC"
                                ? "11 dígitos"
                                : "Ingresa tu número de documento"
                          }
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          flexDirection: { xs: "column", sm: "row" },
                        }}
                      >
                        <TextField
                          label="Teléfono Fijo (Opcional)"
                          value={profileData.phone}
                           sx={{
                          "& .MuiOutlinedInput-root":{
                            borderRadius:"12px"
                          }
                        }}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              phone: e.target.value,
                            })
                          }
                          fullWidth
                          placeholder="(01) 234-5678"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Phone color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />

                        <TextField
                          label="Celular (Opcional)"
                          value={profileData.mobile}
                           sx={{
                          "& .MuiOutlinedInput-root":{
                            borderRadius:"12px"
                          }
                        }}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              mobile: e.target.value,
                            })
                          }
                          fullWidth
                          placeholder="999 888 777"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Phone color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 4 }} />

                  {/* Sección: Información Laboral */}
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 3,
                        pb: 1.5,
                        borderBottom: "2px solid",
                        borderColor: "primary.main",
                        display: "inline-block",
                      }}
                    >
                      3. Información Laboral (Opcional)
                    </Typography>

                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                    >
                      <TextField
                        label="Cargo / Puesto"
                        value={profileData.position}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            position: e.target.value,
                          })
                        }
                         sx={{
                          "& .MuiOutlinedInput-root":{
                            borderRadius:"12px"
                          }
                        }}
                        fullWidth
                        placeholder="Ej: Supervisor de Logística, Analista de Sistemas"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Work color="action" />
                            </InputAdornment>
                          ),
                        }}
                        helperText="Tu cargo o puesto de trabajo en la empresa"
                      />

                      <TextField
                        label="Departamento / Área"
                        value={profileData.department}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            department: e.target.value,
                          })
                        }
                         sx={{
                          "& .MuiOutlinedInput-root":{
                            borderRadius:"12px"
                          }
                        }}
                        fullWidth
                        placeholder="Ej: Logística, Sistemas, Recursos Humanos"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Domain color="action" />
                            </InputAdornment>
                          ),
                        }}
                        helperText="Departamento o área a la que perteneces"
                      />
                    </Box>
                  </Box>

                  {/* Botones de acción */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      pt: 3,
                      borderTop: "1px solid",
                      borderColor: "divider",
                      flexDirection: { xs: "column", sm: "row" },
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={handleCancel}
                      disabled={isLoading}
                      startIcon={<Logout />}
                      sx={{ minWidth: { sm: 160 } }}
                    >
                      Cancelar
                    </Button>

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isLoading}
                      endIcon={
                        isLoading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <CheckCircle />
                        )
                      }
                      sx={{
                        minWidth: { sm: 200 },
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        "&:hover": {
                          background:
                            "linear-gradient(135deg, #5568d3 0%, #6a4190 100%)",
                        },
                      }}
                    >
                      {isLoading ? "Enviando..." : "Completar Registro"}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Footer */}
        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "center",
            mt: 3,
            color: "text.secondary",
          }}
        >
          © 2025 LPS GRUPO LATAM. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
}
