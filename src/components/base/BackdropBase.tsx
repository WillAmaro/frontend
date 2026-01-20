

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { SxProps, Theme } from "@mui/material/styles";

type AvatarBaseProps = {
  alt?: string;
  src?: string;
  children?: React.ReactNode; // Para iniciales o ícono
  size?: number; // Personalizar tamaño
  bgColor?: string; // Color de fondo si no hay imagen
  textColor?: string; // Color del texto
  sx?: SxProps<Theme>; // Estilos personalizados externos
};

export default function AvatarBase({
  alt,
  src,
  children,
  size = 40,
  bgColor,
  textColor,
  sx,
}: AvatarBaseProps) {
  return (
    <Avatar
      alt={alt}
      src={src}
      sx={[
        {
          width: size,
          height: size,
          bgcolor: bgColor,
          color: textColor,
        },
        ...(Array.isArray(sx) ? sx : [sx]), // Merge de estilos
      ]}
    >
      {/* Si no hay imagen, muestra lo que venga en children (ej: iniciales o ícono) */}
      {!src && children}
    </Avatar>
  );
}