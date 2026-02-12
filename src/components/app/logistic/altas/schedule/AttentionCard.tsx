// components/logistics/schedule/AttentionCard.tsx

"use client";

import { Box, Typography, IconButton, Chip, Tooltip } from "@mui/material";
import { Attention } from "@/src/types/schedule.types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface AttentionCardProps {
  attention: Attention;
  technicianColor: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onStart?: () => void;
  onComplete?: () => void;
}

export default function AttentionCard({
  attention,
  technicianColor,
  onEdit,
  onDelete,
  onStart,
  onComplete,
}: AttentionCardProps) {
  const getStatusConfig = () => {
    switch (attention.status) {
      case "programada":
        return {
          label: "Programada",
          color: "#2196F3",
          bgColor: "rgba(33, 150, 243, 0.15)",
        };
      case "en_curso":
        return {
          label: "En Curso",
          color: "#FF9800",
          bgColor: "rgba(255, 152, 0, 0.15)",
        };
      case "completada":
        return {
          label: "Completada",
          color: "#4CAF50",
          bgColor: "rgba(76, 175, 80, 0.15)",
        };
      case "cancelada":
        return {
          label: "Cancelada",
          color: "#F44336",
          bgColor: "rgba(244, 67, 54, 0.15)",
        };
    }
  };

  const statusConfig = getStatusConfig();

  const getPriorityColor = () => {
    switch (attention.serviceOrder.priority) {
      case "alta":
        return "#F44336";
      case "media":
        return "#FF9800";
      case "baja":
        return "#4CAF50";
    }
  };

  return (
    <Box
      sx={{
        p: 1,
        borderRadius: 2,
        background: statusConfig.bgColor,
        border: `2px solid ${statusConfig.color}`,
        borderLeftWidth: 4,
        borderLeftColor: technicianColor,
        position: "relative",
        transition: "all 0.2s ease",
        display: "flex",
        flexDirection: "column",
        height: "92px",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          transform: "translateY(-2px)",
        },
        zIndex: 10,
      }}
    >
      {/* Priority indicator */}
      {/* <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          width: 8,
          height: 8,
          borderRadius: "50%",
          bgcolor: getPriorityColor(),
        }}
      /> */}

      {/* Service Order Code */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="caption"
          fontWeight={700}
          sx={{ color: statusConfig.color }}
        >
          {attention.serviceOrder.code}
        </Typography>
        <Box
          display="flex"
          gap={0.5}
          mt={1}
          sx={{
            // position: "absolute",
            // top: 8,
            // right: 60,
            width: "auto",
            height: 8,
            display: "flex",
            justifyContent: "flex-start",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {attention.status === "programada" && onStart && (
            <Tooltip title="Iniciar atención">
              <IconButton
                size="small"
                onClick={onStart}
                sx={{ color: "#FF9800" }}
              >
                <PlayArrowIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          {attention.status === "en_curso" && onComplete && (
            <Tooltip title="Completar atención">
              <IconButton
                size="small"
                onClick={onComplete}
                sx={{ color: "#4CAF50" }}
              >
                <CheckCircleIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          {/* {onEdit && (
          <Tooltip title="Editar">
            <IconButton size="small" onClick={onEdit} sx={{ color: "primary.main" }}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )} */}

          {onDelete && (
            <Tooltip title="Cancelar">
              <IconButton
                size="small"
                onClick={onDelete}
                sx={{ color: "error.main" }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      {/* Client Name */}
      {/* <Typography variant="body2" fontWeight={600} sx={{ mt: 0.5 }}>
        {attention.serviceOrder.clientName}
      </Typography> */}

      {/* Service Type */}
      <Typography variant="caption" color="text.secondary" display="block">
        {attention.serviceOrder.serviceType}
      </Typography>

      {/* Time */}
      <Box display="flex" alignItems="center" gap={0.5}>
        {/* <Typography variant="caption" fontWeight={600}>
          {attention.startTime} - {attention.endTime}
        </Typography> */}
        <Chip
          label={statusConfig.label}
          size="small"
          sx={{
            fontSize: "0.65rem",
            height: 18,
            fontWeight: 600,
            bgcolor: statusConfig.color,
            color: "white",
          }}
        />
      </Box>

      {/* Actions */}
    </Box>
  );
}
