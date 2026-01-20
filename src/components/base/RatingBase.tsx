import * as React from "react";
import { Rating, Box, Typography } from "@mui/material";

type RatingBaseProps = {
  value?: number | null; // valor inicial
  defaultValue?: number; // valor por defecto si no controlas el estado
  readOnly?: boolean; // si solo es de visualización
  disabled?: boolean; // si está deshabilitado
  precision?: number; // precisión de los pasos (ej: 0.5 estrellas)
  max?: number; // número máximo de estrellas
  label?: string; // texto opcional arriba
  onChange?: (value: number | null) => void; // callback cuando cambia
};

export default function RatingBase({
  value,
  defaultValue,
  readOnly = false,
  disabled = false,
  precision = 1,
  max = 5,
  label,
  onChange,
}: RatingBaseProps) {
  const [internalValue, setInternalValue] = React.useState<number | null>(
    value ?? defaultValue ?? null
  );

  const handleChange = (_: React.SyntheticEvent, newValue: number | null) => {
    setInternalValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {label && <Typography component="legend">{label}</Typography>}
      <Rating
        name="rating-base"
        value={internalValue}
        onChange={handleChange}
        readOnly={readOnly}
        disabled={disabled}
        precision={precision}
        max={max}
      />
    </Box>
  );
}