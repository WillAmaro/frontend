import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface LoaderProps {
  fullScreen?: boolean;   // para ocupar toda la pantalla o solo un contenedor
  size?: number;          // tamaño del loader
  color?: "primary" | "secondary" | "inherit"; // color del loader,
  propertyX?: number;
}


export default function Loader({
  fullScreen = false,
  size = 40,
  color = "primary",
  propertyX = 0
}: LoaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...(fullScreen && { height: "100vh", width: "100%" }), // si es pantalla completa
      }}
    >
      <CircularProgress size={size} color={color} />
    </Box>
  );
}