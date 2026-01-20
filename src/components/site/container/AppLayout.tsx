
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import {
  useTheme,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Badge,
  useMediaQuery,
} from "@mui/material";
import AvatarBase from "../../base/AvatarBase";
import ButtonBase from "../../base/ButtonBase";
import { useRouter } from "next/navigation";
import { AppDispatch, persistor, RootState } from "@/src/store/Store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/src/store/slices/UserSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { DrawerMenu } from "../components/Drawer";
import SettingsIcon from "@mui/icons-material/Settings";

interface Props {
  window?: () => Window;
  children?: any;
  mode: any;
  setMode: any;
}

const drawerWidth = 280;
const topBarHeight = 64;

export default function DrawerAppBar(props: Props) {
  const { children } = props;
  const theme = useTheme();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Usar useMediaQuery para detectar el tamaño de pantalla
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  // Estado del drawer que depende del tamaño de pantalla
  const [drawerOpen, setDrawerOpen] = React.useState(isMdUp);

  // Efecto para manejar el cambio de tamaño de pantalla
  React.useEffect(() => {
    if (isMdUp) {
      // En pantallas md y superiores, el drawer está abierto por defecto
      setDrawerOpen(true);
    } else {
      // En pantallas menores a md, el drawer está cerrado por defecto
      setDrawerOpen(false);
    }
  }, [isMdUp]);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    dispatch(logout());
    await persistor.flush();
    persistor.purge();
    router.push("/login");
    handleProfileMenuClose();
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />

      {/*  Sidebar izquierdo */}
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          left: 0,
          width: `${drawerWidth}px`,
          height: "100vh",
          boxShadow: "0 0 20px rgba(0,0,0,0.08)",
          borderRight: "1px solid rgba(0,0,0,0.06)",
          backgroundColor: "#ffffff",
          color: "#1a1a1a",
          backgroundImage: "none",
          zIndex: theme.zIndex.drawer,
          transform: drawerOpen
            ? "translateX(0)"
            : `translateX(-${drawerWidth}px)`,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {/* Logo Section */}
        <Box
          sx={{
            p: 3,
            borderBottom: "2px solid rgba(0,0,0,0.06)",
            // background: "linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)",
            color: "black",
          }}
        >
          <div className="flex items-center gap-3">
            <div className=" bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm p-2">
              <img
                src="/logoMulticolor.png"
                alt="Logo"
                style={{ width: "60px", height: "60px", objectFit: "contain" }}
              />
            </div>
            <div>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, fontSize: "1.1rem" }}
              >
                LPS - Grupo
              </Typography>
              <Typography
                variant="caption"
                sx={{ opacity: 0.8, fontSize: "0.75rem" }}
              >
                Sistema de Gestion
              </Typography>
            </div>
          </div>
        </Box>

        {/* Navigation Menu */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: "hidden auto",
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <DrawerMenu />
        </Box>

        {/* User Section at Bottom */}
        <Box
          sx={{
            p: 3,
            borderTop: "1px solid rgba(0,0,0,0.06)",
            // background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  border: "2px solid #e2e8f0",
                  // background:
                  //   "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
                src="/avatar.png"
              >
                {user.name?.charAt(0)}
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#374151" }}
              >
                {user.name || "Usuario"}
              </Typography>
              <Typography variant="caption" sx={{ color: "#6b7280" }}>
                En línea
              </Typography>
            </div>
            <IconButton
              size="small"
              onClick={handleLogout}
              sx={{
                color: "#6b7280",
                "&:hover": {
                  backgroundColor: "#fee2e2",
                  color: "#dc2626",
                },
              }}
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </div>
        </Box>
      </AppBar>

      {/*  AppBar superior moderno */}
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          left: {
            xs: 0, // En móviles, siempre desde 0
            md: drawerOpen ? drawerWidth : 0 // En desktop, considera el drawer
          },
          width: {
            xs: "100%", // En móviles, ancho completo
            md: drawerOpen ? `calc(100% - ${drawerWidth}px)` : "100%" // En desktop, considera el drawer
          },
          height: topBarHeight,
          backgroundColor: "#ffffff",
          color: "#1a1a1a",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          backgroundImage: "none",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          zIndex: theme.zIndex.appBar,
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Toolbar
          sx={{
            minHeight: topBarHeight,
            px: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left Side */}
          <div className="flex items-center gap-4">
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                color: "#6b7280",
                "&:hover": { backgroundColor: "#f3f4f6" },
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Search Bar - Solo visible en md y superior */}
            {/* <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon sx={{ color: "#9ca3af", fontSize: 20 }} />
              </div>
              <input
                type="text"
                placeholder="Buscar..."
                className="block w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div> */}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Search Icon para móviles */}
            <IconButton
              sx={{
                display: { xs: "flex", md: "none" },
                color: "#6b7280",
                "&:hover": { backgroundColor: "#f3f4f6" },
              }}
            >
              <SearchIcon />
            </IconButton>

            {/* Notifications */}
            <IconButton
              sx={{
                color: "#6b7280",
                "&:hover": { backgroundColor: "#f3f4f6" },
              }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Profile Menu */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={handleProfileMenuOpen}
            >
              {/* Información del usuario - Solo visible en sm y superior */}
              <div className="hidden sm:block text-right">
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#374151" }}
                >
                  {user.name || "Usuario"}
                </Typography>
                <Typography variant="caption" sx={{ color: "#6b7280" }}>
                  Administrador
                </Typography>
              </div>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  border: "2px solid #e2e8f0",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
                src="/avatar.png"
              >
                {user.name?.charAt(0)}
              </Avatar>
            </div>

            {/* Profile Menu Dropdown */}
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleProfileMenuClose}
              onClick={handleProfileMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.08))",
                  mt: 1.5,
                  minWidth: 200,
                  border: "1px solid rgba(0,0,0,0.06)",
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                    border: "1px solid rgba(0,0,0,0.06)",
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleProfileMenuClose}>
                <Avatar
                  sx={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                />
                Mi Perfil
              </MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>
                <Avatar sx={{ background: "#f3f4f6", color: "#6b7280" }}>
                  <SettingsIcon fontSize="small" />
                </Avatar>
                Configuración
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ color: "#dc2626" }}>
                <Avatar sx={{ background: "#fee2e2", color: "#dc2626" }}>
                  <LogoutIcon fontSize="small" />
                </Avatar>
                Cerrar Sesión
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/*  Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            xs: "100%", // En móviles, ancho completo
            md: drawerOpen ? `calc(100% - ${drawerWidth}px)` : "100%" // En desktop, considera el drawer
          },
          marginLeft: {
            xs: 0, // En móviles, sin margen
            md: drawerOpen ? `${drawerWidth}px` : 0 // En desktop, considera el drawer
          },
          marginTop: `${topBarHeight}px`,
          minHeight: `calc(100vh - ${topBarHeight}px)`,
          backgroundColor: "#f8fafc",
          transition: "all 0.3s ease-in-out",
          padding: "0px !important"
        }}
      >
        {children}
      </Box>

      {/* Overlay para móviles cuando el drawer está abierto */}
      {drawerOpen && !isMdUp && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: theme.zIndex.drawer - 1,
          }}
          onClick={() => setDrawerOpen(false)}
        />
      )}
    </div>
  );
}