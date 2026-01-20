import * as React from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

type SwitchBaseProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
};

export default function SwitchBase({
  checked,
  onChange,
  label,
  disabled = false,
  color = "primary",
}: SwitchBaseProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          color={color}
        />
      }
      label={label}
    />
  );
}