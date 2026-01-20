import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";

type BaseSliderProps = {
  value?: number; // valor inicial
  defaultValue?: number; // valor por defecto si no se pasa value
  min?: number;
  max?: number;
  step?: number;
  width?: number | string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onChange?: (value: number) => void; // callback con el nuevo valor
};

export default function BaseSlider({
  value,
  defaultValue = 30,
  min = 0,
  max = 100,
  step = 1,
  width = 200,
  leftIcon,
  rightIcon,
  onChange,
}: BaseSliderProps) {
  const [internalValue, setInternalValue] = React.useState<number>(
    value ?? defaultValue
  );

  const handleChange = (_event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setInternalValue(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <Box sx={{ width }}>
      <Stack spacing={2} direction="row" sx={{ alignItems: "center", mb: 1 }}>
        {leftIcon}
        <Slider
          aria-label="Custom Slider"
          value={internalValue}
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
        />
        {rightIcon}
      </Stack>
    </Box>
  );
}