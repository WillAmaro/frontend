
import * as React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type TextFieldBaseProps = {
  value: string | number;
  onChange: (value: string | number) => void;
  label?: string;
  placeholder?: string;
  type?: "text" | "number" | "password" | "email" | "date" | "time";
  variant?: "outlined" | "filled" | "standard";
  disabled?: boolean;
  error?: boolean;
  color?: string;
  borderColor?: string;
  helperText?: string;
  fullWidth?: boolean;
  required?: boolean;
  size?: "small" | "medium";
  name?: string;
  autoComplete?: string;
  inputProps?: TextFieldProps["inputProps"]; // ✅ se agrega aquí
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
  color = "#ffff",
  borderColor = "#ffff",
  required = false,
  fullWidth = true,
  autoComplete = "off",
  name = "",
  size = "medium",
  inputProps, // ✅ destructuring
}: TextFieldBaseProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue =
      type === "number" ? Number(event.target.value) : event.target.value;
    onChange(newValue);
  };

  return (
    <TextField
      value={value}
      onChange={handleChange}
      label={label}
      placeholder={placeholder}
      type={type}
      size={size}
      variant={variant}
      disabled={disabled}
      required={required}
      error={error}
      name={name}
      autoComplete={autoComplete}
      helperText={helperText}
      fullWidth={fullWidth}
      inputProps={inputProps} // ✅ se pasa a MUI
      sx={{
        color: "white",
        "& .MuiInputBase-input": {
          fontFamily: "'M PLUS Rounded 1c', sans-serif",
          color: color,
        },
        "& .MuiInputLabel-root": {
          fontFamily: "'M PLUS Rounded 1c', sans-serif",
          color: "#b4b4b4",
          fontSize: "small",
          "&.Mui-focused": {
            color: "primary.main",
          },
        },
        "& .MuiFormHelperText-root": {
          fontFamily: "'M PLUS Rounded 1c', sans-serif",
          color: color,
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderWidth: "1px",
          },
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: borderColor,
        },
      }}
    />
  );
}