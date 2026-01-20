import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import { SxProps, Theme } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";

type CheckBoxBaseProps = {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  color?: "primary" | "secondary" | "error" | "default";
  size?: "small" | "medium";
  sx?: SxProps<Theme>;
};

export default function CheckBoxBase({
  label,
  checked,
  defaultChecked,
  disabled = false,
  onChange,
  color = "primary",
  size = "medium",
  sx,
}: CheckBoxBaseProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  const checkbox = (
    <Checkbox
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onChange={handleChange}
      color={color}
      size={size}
      sx={sx}
    />
  );

  // Si hay label, lo envolvemos en un FormControlLabel
  return label ? (
    <FormControlLabel control={checkbox} label={label} />
  ) : (
    checkbox
  );
}