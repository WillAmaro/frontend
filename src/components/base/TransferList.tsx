import * as React from "react";
import TextField from "@mui/material/TextField";

export type TextFieldBaseProps = {
  value: string | number;
  onChange: (value: string | number) => void;
  label?: string;
  placeholder?: string;
  type?: "text" | "number" | "password" | "email";
  variant?: "outlined" | "filled" | "standard";
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  size?: "small" | "medium";
};

export default function TextFieldBase({
  value,
  onChange,
  label,
  placeholder,
  type = "text",
  variant = "outlined",
  disabled = false,
  error = false,
  helperText,
  fullWidth = true,
  multiline = false,
  rows,
  size = "medium",
}: TextFieldBaseProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = type === "number" ? Number(event.target.value) : event.target.value;
    onChange(newValue);
  };

  return (
    <TextField
      value={value}
      onChange={handleChange}
      label={label}
      placeholder={placeholder}
      type={type}
      variant={variant}
      disabled={disabled}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      multiline={multiline}
      rows={rows}
      size={size}
    />
  );
}