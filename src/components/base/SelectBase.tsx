import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Option = {
  label: string;
  value: string | number;
};

type SelectBaseProps = {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  options: Option[];
  fullWidth?: boolean;
  minWidth?: number;
  disabled?: boolean;
  placeholder?: string;
  color?: string;
  borderColor?: string;
  size?: "small" | "medium";
};

export default function SelectBase({
  label,
  value,
  onChange,
  size = "small",
  options,
  fullWidth = true,
  minWidth = 120,
  disabled = false,
  placeholder,
  color = "#000",
  borderColor = "#b4b4b4",
}: SelectBaseProps) {
  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;

    // Intenta parsear a número, si no es numérico se queda como string
    const parsedValue =
      !isNaN(Number(newValue)) && newValue.trim() !== ""
        ? Number(newValue)
        : newValue;

    onChange(parsedValue);
  };

  return (
    <Box sx={{ minWidth }}>
      <FormControl
        fullWidth={fullWidth}
        disabled={disabled}
        sx={{
          "& .MuiSelect-root ": {
            borderRadius: "12px",
          },
          "& .MuiInputLabel-root": {
            fontFamily: "'M PLUS Rounded 1c', sans-serif",
            color: borderColor,
            fontSize: "small",
          },
          "& .MuiSelect-select": {
            fontFamily: "'M PLUS Rounded 1c', sans-serif",
            color: color,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: borderColor,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: color,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: color,
          },
        }}
      >
        <InputLabel>{label}</InputLabel>
        <Select
          size={size}
          value={value.toString()} // Convertimos a string para evitar error con number
          label={label}
          onChange={handleChange}
          displayEmpty={!!placeholder}
        >
          {placeholder && (
            <MenuItem value="">
              <em>{placeholder}</em>
            </MenuItem>
          )}
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value.toString()}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
