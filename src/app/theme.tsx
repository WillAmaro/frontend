// CustomThemeProvider.tsx
"use client";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";
import { useMemo, useEffect, useState, ReactNode } from "react";

declare module "@mui/material/styles" {
  interface TypeText {
    tertiary: string; //  añadimos la nueva propiedad
  }

  interface Palette {
    border: {
      main: string;
    };
    content: {
      main: string;
    };
  }

  interface PaletteOptions {
    border?: {
      main?: string;
    };
    content?: {
      main?: string;
    };
  }
}

const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          ...(prefersDarkMode
            ? {
                // 🌙 Modo Oscuro
                background: {
                  default: "#121212", // fondo global
                  paper: "#121212", // tarjetas, diálogos
                },
                text: {
                  primary: "#ffffff", // texto principal
                  secondary: "#bbbbbb", // texto secundario
                //   tertiary: "#000", //  nuevo
                },
                border: {
                  main: "#333333",
                },
                content: {
                  main: "#ffffff",
                },
              }
            : {
                // ☀️ Modo Claro
                background: {
                  default: "#ffffff",
                  paper: "lab(96.1596% -.082314 -1.13575)",
                },
                text: {
                  primary: "#111111",
                  secondary: "#555555",
                },
                border: {
                  main: "#dddddd",
                },
                content: {
                  main: "#111111",
                },
              }),
        },
        typography: {
          fontFamily: "'M PLUS Rounded 1c', sans-serif",
          button: {
            textTransform: "none",
            fontWeight: 700,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                fontWeight: "lighter",
                fontFamily: "M PLUS Rounded 1c !important",
              },
            },
          },
          MuiButtonBase: {
            styleOverrides: {
              root: {
                fontFamily: "M PLUS Rounded 1c !important",
              },
            },
          },
        },
      }),
    [prefersDarkMode]
  );

  // 🚨 evita render hasta que el componente esté montado en el cliente
  if (!mounted) return null;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;