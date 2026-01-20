import * as React from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type SnackbarBaseProps = {
  open: boolean;
  message: string;
  autoHideDuration?: number;
  onClose: (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void;
  action?: React.ReactNode;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
};

export default function SnackbarBase({
  open,
  message,
  autoHideDuration = 6000,
  onClose,
  action,
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
}: SnackbarBaseProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      message={message}
      action={
        action ?? (
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={(e) => onClose(e)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )
      }
      anchorOrigin={anchorOrigin}
    />
  );
}