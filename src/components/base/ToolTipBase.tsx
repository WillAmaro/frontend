import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { ReactElement } from "react";

type TooltipBaseProps = {
  title: string;
  children: ReactElement<unknown, any>;
  placement?:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
  arrow?: boolean;
};

export default function TooltipBase({
  title,
  children,
  placement = "top",
  arrow = false,
}: TooltipBaseProps) {
  return (
    <Tooltip title={title} placement={placement} arrow={arrow}>
      {children}
    </Tooltip>
  );
}