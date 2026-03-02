"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/src/store/slices/UserSlice";
import { AppDispatch } from "@/src/store/Store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authService } from "@/src/services/api/AuthService";
import { setRoutes, DrawerRoute } from "@/src/store/slices/DrawerSlices";
import { supabase } from "@/src/lib/supabase";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  CircularProgress,
  Paper,
  Divider,
  Fade,
  Grow,
} from "@mui/material";
import {
  EmailOutlined,
  LockOutlined,
  LoginOutlined,
  BusinessOutlined,
  ShieldOutlined,
} from "@mui/icons-material";
import { CatalogService } from "@/src/services/api/CatalogService";
import { setCompanies } from "@/src/store/slices/CompanySlices";

export default function EnterpriseLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isReady, setIsReady] = useState(false); // Para disparar el Fade
  const router = useRouter();

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  // Disparar animación de entrada
  useEffect(() => {
    setIsReady(true);
  }, []);

  const handleChange = (field: "email" | "password", value: string) => {
    setUserLogin((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: userLogin.email,
        password: userLogin.password,
      });

      if (authError) throw new Error(authError.message);
      const sessionData = await authService.checkUserSession(authData.user.id);

      if (!sessionData.exists || sessionData.needs_profile_completion) {
        localStorage.setItem("temp_user_id", authData.user.id);
        router.push("/completar-registro");
        return;
      }

      const userData = sessionData.user!;
      const drawerRoutes: DrawerRoute[] = userData.role.permissions?.map((perm, index) => ({
        id: index + 1,
        label: perm.route_name,
        path: perm.route,
        icon: perm.route_icon || "folder",
      })) || [];

      dispatch(
        setUser({
          id: parseInt(userData.user_id),
          user_id: userData.user_id,
          name: userData.full_name,
          email: userData.email,
          email_verified_at: authData.user.email_confirmed_at || null,
          created_at: authData.user.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString(),
          tenant_id: userData.tenant_id,
          role_id: userData.role.role_id,
          defaultPath: drawerRoutes[0]?.path || "/dashboard",
          role: {
            id: parseInt(userData.role.role_id),
            tenant_id: parseInt(userData.tenant_id),
            name: userData.role.role_name,
            description: userData.role.role_description || "",
            created_at: new Date().toISOString(),
            updated_at: null,
          },
          person: null,
          token: authData.session.access_token,
          refreshToken: authData.session.refresh_token,
        })
      );

      dispatch(setRoutes(drawerRoutes));
      const data = await CatalogService.getAllCatalogs();
      dispatch(setCompanies(data.companies));

      toast.success(`Bienvenido, ${userData.full_name}`);
      router.push(drawerRoutes[0]?.path || "/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Error de autenticación");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Fondo Oscuro Enterprise (Radial para dar profundidad)
        background: "radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)",
        position: "relative",
        px: 2,
        overflow: "hidden",
      }}
    >
      {/* Elementos decorativos sutiles de fondo */}
      <Box 
        sx={{ 
          position: 'absolute', 
          width: '40vw', 
          height: '40vw', 
          background: 'rgba(37, 99, 235, 0.03)', 
          borderRadius: '50%', 
          top: -100, 
          right: -100,
          filter: 'blur(80px)' 
        }} 
      />

      <Fade in={isReady} timeout={1000}>
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: 420,
            borderRadius: 3,
            overflow: "hidden",
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Header */}
          <Box sx={{ p: 4, textAlign: "center", bgcolor: "#fcfcfd" }}>
            <Grow in={isReady} timeout={1500}>
              <Box 
                sx={{ 
                  display: 'inline-flex', 
                  p: 1.2, 
                  borderRadius: '12px', 
                  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', 
                  color: 'white', 
                  mb: 2,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }}
              >
                <BusinessOutlined sx={{ fontSize: 32 }} />
              </Box>
            </Grow>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a", letterSpacing: '-0.5px' }}>
              LPS Latam
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", mt: 0.5, fontWeight: 400 }}>
              Portal de Operaciones Logísticas
            </Typography>
          </Box>

          <Divider sx={{ opacity: 0.6 }} />

          {/* Form */}
          <Box component="form" onSubmit={handleLogin} sx={{ p: 4, pt: 3 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ fontWeight: 600, color: "#94a3b8", textTransform: 'uppercase', letterSpacing: '1px', mb: 1, display: 'block' }}>
                Acceso corporativo
              </Typography>
              
              <TextField
                fullWidth
                margin="dense"
                placeholder="usuario@lpsgrupo.com"
                value={userLogin.email}
                onChange={(e) => handleChange("email", e.target.value)}
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined sx={{ color: "#94a3b8", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius:"12px",
                    bgcolor: "#f8fafc",
                    "&:hover fieldset": { borderColor: "#cbd5e1" },
                  }
                }}
              />

              <TextField
                fullWidth
                margin="dense"
                type="password"
                placeholder="Contraseña"
                value={userLogin.password}
                onChange={(e) => handleChange("password", e.target.value)}
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ color: "#94a3b8", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius:"12px",
                    bgcolor: "#f8fafc",
                    "&:hover fieldset": { borderColor: "#cbd5e1" },
                  }
                }}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              disableElevation
              sx={{
                py: 1.5,
                mt: 1,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "0.95rem",
                fontWeight: 600,
                bgcolor: "#2563eb",
                "&:hover": { bgcolor: "#1d4ed8" },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Iniciar Sesión <LoginOutlined sx={{ fontSize: 18 }} />
                </Box>
              )}
            </Button>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography
                component="a"
                href="/forgotpassword"
                sx={{
                  fontSize: "0.8rem",
                  color: "#64748b",
                  textDecoration: "none",
                  fontWeight: 500,
                  "&:hover": { color: "#2563eb" },
                }}
              >
                ¿Olvidó sus credenciales?
              </Typography>
            </Box>
          </Box>

          <Box sx={{ p: 2, textAlign: 'center', bgcolor: '#f8fafc', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
             <ShieldOutlined sx={{ fontSize: 14, color: '#94a3b8' }} />
             <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                Sistema Protegido • LPS Grupo {new Date().getFullYear()}
             </Typography>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
}