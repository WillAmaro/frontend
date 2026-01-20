
import * as React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { SxProps, Theme } from "@mui/material/styles";

type ButtonBaseProps = {
  variant?: "contained" | "text" | "outlined";
  size?: "small" | "medium" | "large";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  label: string;
  loading?: boolean;
  sx?: SxProps<Theme>;
};

export default function ButtonBase({
  variant = "contained",
  size = "medium",
  color = "primary",
  type = "button",
  onClick,
  disabled = false,
  fullWidth = false,
  startIcon,
  endIcon,
  label,
  loading = false,
  sx = {},
}: ButtonBaseProps) {
  return (
    <Button
      variant={variant}
      size={size}
      color={color} // si es custom, no usar MUI color
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        borderRadius: "10px",
        height: "50px",
        textTransform: "none",
        fontFamily: "'M PLUS Rounded 1c', sans-serif",
        // ✅ estilos custom cuando está disabled
        "&.Mui-disabled": {
          backgroundColor: "#e0e0e0",
          color: "#9e9e9e",
          opacity: 0.7,
        },
        // ✅ si pasas un color custom string (ej: "#FF5733")
        ...(typeof color === "string" && {
          backgroundColor: color,
          color: "#fff",
          "&:hover": {
            backgroundColor: `${color}cc`, // más oscuro al hover
          },
        }),
        ...sx,
      }}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : label}
    </Button>
  );
}
