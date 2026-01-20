import * as React from "react";
import Divider from "@mui/material/Divider";

type DividerBaseProps = {
  orientation?: "horizontal" | "vertical";
  text?: string;
  variant?: "fullWidth" | "inset" | "middle";
  flexItem?: boolean;
};

export default function DividerBase({
  orientation = "horizontal",
  text,
  variant = "fullWidth",
  flexItem = false,
}: DividerBaseProps) {
  return (
    <Divider orientation={orientation} variant={variant} flexItem={flexItem}>
      {text}
    </Divider>
  );
}