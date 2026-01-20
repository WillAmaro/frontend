"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../store/slices/UserSlice";
import { AppDispatch } from "@/src/store/Store";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { Module, userService } from "@/src/services/api/UserService";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import {
  Email,
  Lock,
  ArrowForward,
  CheckCircle,
  Public,
  Security,
} from "@mui/icons-material";
import { DrawerRoute, setRoutes } from "@/src/store/slices/DrawerSlices";

// OPCIÓN 1: Client-side con localStorage
import { login } from "@/src/services/api/LoginService";
import { supabase } from "@/src/lib/supabase";

// OPCIÓN 2: Server Action con cookies (descomenta para usar)
// import { loginServerAction } from "@/src/app/actions/auth";

type LoginProps = {
  onSwitch?: () => void;
};

export default function ModernLoginEnhanced({ onSwitch }: LoginProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnUrl = searchParams.get("returnUrl") || "/";

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("🚀 Iniciando login con Supabase...");

      // ===== AUTENTICACIÓN CON SUPABASE =====
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: userLogin.email,
          password: userLogin.password,
        });

      if (authError) {
        throw new Error(authError.message);
      }

      if (!authData.session) {
        throw new Error("No se pudo establecer la sesión");
      }

      console.log("✅ Autenticación exitosa con Supabase");
      console.log("📦 Datos de autenticación:", {
        user: authData.user,
        session: authData.session,
        accessToken: authData.session.access_token,
        refreshToken: authData.session.refresh_token,
      });

      const email = authData.user.email || "";

      dispatch(
        setUser({
          id: 0,
          name: email
      .split("@")[0]
      .split(".")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
          email: authData.user.email || "",
          email_verified_at: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          tenant_id: 0,
          role_id: 0,
          defaultPath: "/",

          role: null,
          person: null,

          token: authData.session.access_token,
          refreshToken: authData.session.refresh_token,
        })
      );

      //testeando
      router.push(returnUrl);

      // ===== OBTENER DATOS ADICIONALES DEL USUARIO =====
      // Opción 1: Obtener datos del perfil desde una tabla personalizada
      const { data: profileData, error: profileError } = await supabase
        .from("users") // o el nombre de tu tabla de usuarios
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (profileError) {
        console.warn(
          "⚠️ No se pudo obtener el perfil del usuario:",
          profileError
        );
      }

      console.log("👤 Datos del perfil:", profileData);

      // ===== OBTENER MÓDULOS POR ROL =====
      // Aquí puedes mantener tu lógica existente o migrarla a Supabase
      let drawerRoutes: DrawerRoute[] = [];

      if (profileData?.role_id) {
        const drawerResponse = await userService.getModulesByRole(
          profileData.role_id,
          authData.session.access_token
        );

        const mapDrawerRoutes = (modules: Module[]): DrawerRoute[] => {
          return modules.map((m, index) => ({
            id: index + 1,
            label: m.label,
            path: m.path,
            icon: m.icon,
            children:
              m.children && m.children.length > 0
                ? mapDrawerRoutes(m.children)
                : undefined,
          }));
        };

        drawerRoutes = mapDrawerRoutes(drawerResponse.data);
      }

      // ===== GUARDAR EN REDUX =====
      // dispatch(
      //   setUser({
      //     id: authData.user.id,
      //     email: authData.user.email!,
      //     name: profileData?.name || authData.user.user_metadata?.name || "Usuario",
      //     role_id: profileData?.role_id,
      //     token: authData.session.access_token,
      //     refreshToken: authData.session.refresh_token,
      //     ...profileData, // Incluir todos los datos del perfil
      //   })
      // );

      dispatch(setRoutes(drawerRoutes));

      toast.success(`Bienvenido ${email.split("@")[0]
      .split(".")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || "Usuario"}`, {
        position: "bottom-right",
      });

      // ===== REDIRIGIR =====
      // router.push(profileData?.default_path || returnUrl);
    } catch (error: any) {
      console.error("❌ Error en login:", error);

      // Mensajes de error más específicos
      let errorMessage = "Ocurrió un error al iniciar sesión";

      if (error.message.includes("Invalid login credentials")) {
        errorMessage =
          "Credenciales inválidas. Verifica tu correo y contraseña.";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage =
          "Por favor, confirma tu correo electrónico antes de iniciar sesión.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage, {
        position: "bottom-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    field: "email" | "password",
    value: string | number
  ) => {
    setUserLogin((prev) => ({
      ...prev,
      [field]: String(value),
    }));
  };

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundImage: 'url("/loginBG.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: {
            xs: "linear-gradient(to bottom, rgba(37, 99, 235, 0.4), transparent)",
            lg: "linear-gradient(to right, rgba(37, 99, 235, 0.4), transparent, rgba(15, 23, 42, 0.5))",
          },
        }}
      />

      {/* Grid Layout */}
      <Box
        sx={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
        }}
      >
        {/* COLUMNA IZQUIERDA */}
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            px: 6,
            color: "white",
          }}
        >
          <Box sx={{ maxWidth: "600px" }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { lg: "3.5rem", xl: "5rem" },
                fontWeight: "bold",
                mb: 6,
                lineHeight: 1.2,
              }}
            >
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(to right, #ffffff, #a5f3fc, #ffffff)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))",
                }}
              >
                Innovation
              </Box>
              <br />
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(to right, #ffffff, #a5f3fc, #ffffff)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))",
                }}
              >
                Obsessed
              </Box>
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                {
                  icon: <CheckCircle />,
                  title: "+13 años de experiencia",
                  subtitle: "En despliegue de redes",
                },
                {
                  icon: <Public />,
                  title: "Presencia internacional",
                  subtitle: "3 continentes",
                },
                {
                  icon: <Security />,
                  title: "Plataforma segura",
                  subtitle: "Conexión cifrada 24/7",
                },
              ].map((feature, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    backdropFilter: "blur(8px)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    p: 2,
                    borderRadius: 3,
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3))",
                      backdropFilter: "blur(8px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(103, 232, 249, 0.4)",
                      color: "#67e8f9",
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255, 255, 255, 0.7)",
                        fontSize: "0.75rem",
                      }}
                    >
                      {feature.subtitle}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* COLUMNA DERECHA - FORM */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 2, lg: 6 },
          }}
        >
          <Box sx={{ width: "100%", maxWidth: "448px" }}>
            {/* Título móvil */}
            <Box
              sx={{
                display: { xs: "block", lg: "none" },
                textAlign: "center",
                mb: 4,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontSize: "2.25rem",
                  fontWeight: "bold",
                  color: "white",
                  mb: 1,
                  filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))",
                }}
              >
                Innovation Obsessed
              </Typography>
              <Box
                sx={{
                  height: "4px",
                  width: "128px",
                  mx: "auto",
                  background:
                    "linear-gradient(to right, transparent, #67e8f9, transparent)",
                  borderRadius: "9999px",
                }}
              />
            </Box>

            {/* Card */}
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  inset: "-4px",
                  background:
                    "linear-gradient(to right, #06b6d4, #3b82f6, #06b6d4)",
                  borderRadius: 4,
                  filter: "blur(24px)",
                  opacity: 0.2,
                }}
              />

              <Box
                sx={{
                  position: "relative",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(32px)",
                  borderRadius: 4,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  p: { xs: 4, sm: 5 },
                }}
              >
                {/* Logo */}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                  <Box sx={{ position: "relative" }}>
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: 4,
                        filter: "blur(24px)",
                      }}
                    />
                    <Box
                      component="img"
                      src="/logoMulticolor.png"
                      alt="Logo"
                      sx={{
                        position: "relative",
                        height: { xs: 64, sm: 80 },
                        width: "auto",
                        objectFit: "contain",
                        filter: "drop-shadow(0 20px 25px rgba(0, 0, 0, 0.5))",
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: "1.5rem", sm: "1.875rem" },
                      fontWeight: "bold",
                      color: "white",
                      filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))",
                    }}
                  >
                    Bienvenido
                  </Typography>
                </Box>

                {/* Form */}
                <Box
                  component="form"
                  onSubmit={handleLogin}
                  sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "rgba(255, 255, 255, 0.9)",
                        mb: 1,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Correo Electrónico
                    </Typography>
                    <TextField
                      fullWidth
                      type="email"
                      value={userLogin.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="usuario@lpsgrupo.com"
                      required
                      disabled={isLoading}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: "#67e8f9" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          borderRadius: 3,
                          color: "white",
                          "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.3)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#67e8f9",
                            borderWidth: 2,
                          },
                        },
                        "& .MuiOutlinedInput-input::placeholder": {
                          color: "rgba(255, 255, 255, 0.5)",
                          opacity: 1,
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "rgba(255, 255, 255, 0.9)",
                        mb: 1,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Contraseña
                    </Typography>
                    <TextField
                      fullWidth
                      type="password"
                      value={userLogin.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      placeholder="••••••••"
                      required
                      disabled={isLoading}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock sx={{ color: "#67e8f9" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          borderRadius: 3,
                          color: "white",
                          "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.3)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#67e8f9",
                            borderWidth: 2,
                          },
                        },
                        "& .MuiOutlinedInput-input::placeholder": {
                          color: "rgba(255, 255, 255, 0.5)",
                          opacity: 1,
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Typography
                      component="a"
                      href="/forgotpassword"
                      sx={{
                        fontSize: "0.875rem",
                        color: "#67e8f9",
                        fontWeight: 500,
                        textDecoration: "none",
                        pointerEvents: isLoading ? "none" : "auto",
                        opacity: isLoading ? 0.5 : 1,
                        "&:hover": {
                          color: "#a5f3fc",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      ¿Olvidaste tu contraseña?
                    </Typography>
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    disabled={isLoading}
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: 3,
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to right, #06b6d4, #3b82f6, #06b6d4)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                        py: 2,
                      }}
                    >
                      {isLoading ? (
                        <>
                          <CircularProgress size={20} sx={{ color: "white" }} />
                          <Typography
                            sx={{
                              color: "white",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Iniciando...
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Typography
                            sx={{
                              color: "white",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Iniciar Sesión
                          </Typography>
                          <ArrowForward sx={{ color: "white" }} />
                        </>
                      )}
                    </Box>
                  </Button>
                </Box>
              </Box>
            </Box>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                © 2025 LPS GRUPO LATAM. Todos los derechos reservados.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
