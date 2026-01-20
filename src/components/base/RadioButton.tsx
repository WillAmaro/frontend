import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

type Option = {
  label: string;
  value: string;
};

type RadioButtonsGroupProps = {
  label: string; // Título del grupo
  options: Option[]; // Opciones dinámicas
  name: string; // Nombre del grupo
  value: string; // Valor seleccionado
  onChange: (value: string) => void; // Función callback al cambiar
  row?: boolean; // Mostrar horizontal
  disabled?: boolean; // Deshabilitar todo el grupo
};

export default function RadioButtonsGroup({
  label,
  options,
  name,
  value,
  onChange,
  row = false,
  disabled = false,
}: RadioButtonsGroupProps) {
  return (
    <FormControl component="fieldset" disabled={disabled}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        row={row}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            control={<Radio />}
            label={opt.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}