import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { SxProps, Theme } from "@mui/material/styles";

type OptionType = {
    label : string
    value : string | number
}   

type AutoCompleteBaseProps ={
    options : OptionType[]
    label? : string 
    value? : OptionType | null
    placeholder? : string
    disabled?:boolean
    fullWidth?:boolean
    sx? : SxProps<Theme>
    onChange?: (value : OptionType | null) => void
}

export default function AutoCompleteBase({
  options,
  label = "Seleccionar",
  value,
  onChange,
  placeholder,
  disabled = false,
  fullWidth = true,
  sx,
}: AutoCompleteBaseProps) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      getOptionLabel={(option) => option.label}
      value={value || null}
      onChange={(_, newValue) => onChange?.(newValue)}
      disabled={disabled}
      fullWidth={fullWidth}
      sx={sx}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
    />
  );
}