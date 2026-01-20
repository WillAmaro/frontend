import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

interface LoaderBackdropProps {
  open: boolean; // controla si se muestra
  onClose?: () => void; // opcional: callback al cerrar
  color?: "inherit" | "primary" | "secondary"; // color del loader
  size?: number; // tamaño del loader
}

export default function LoaderBackdrop({
  open,
  onClose,
  color = "inherit",
  size = 40,
}: LoaderBackdropProps) {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={open}
      onClick={onClose}
    >
      <CircularProgress color={color} size={size} />
    </Backdrop>
  );
}