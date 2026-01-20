import * as React from "react";
import Fab from "@mui/material/Fab";
import { SxProps, Theme } from "@mui/material/styles";

type FabBaseProps = {
  icon?: React.ReactNode;
  label?: string; // Para variant="extended"
  color?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
  variant?: "circular" | "extended";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: () => void;
  sx?: SxProps<Theme>;
  ariaLabel?: string;
};

export default function FabBase({
  icon,
  label,
  color = "primary",
  variant = "circular",
  size = "medium",
  disabled = false,
  onClick,
  sx,
  ariaLabel,
}: FabBaseProps) {
  return (
    <Fab
      color={color}
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      sx={sx}
      aria-label={ariaLabel || label || "fab"}
    >
      {icon}
      {variant === "extended" && label && (
        <span style={{ marginLeft: icon ? 8 : 0 }}>{label}</span>
      )}
    </Fab>
  );
}