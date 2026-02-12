

"use client";

import { Box, Typography, Chip } from "@mui/material";
import { ServiceOrder } from "@/src/types/schedule.types";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useState, useRef, useEffect } from "react";

interface ServiceOrderCardProps {
  serviceOrder: ServiceOrder;
  onDragStart?: (serviceOrder: ServiceOrder) => void;
  onDragEnd?: () => void;
}

export default function ServiceOrderCard({
  serviceOrder,
  onDragStart,
  onDragEnd,
}: ServiceOrderCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const getPriorityColor = () => {
    switch (serviceOrder.priority) {
      case "alta":
        return "#F44336";
      case "media":
        return "#FF9800";
      case "baja":
        return "#4CAF50";
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData("serviceOrderId", serviceOrder.id);
    e.dataTransfer.effectAllowed = "move";

    // Crear ghost image personalizado más visible
    if (cardRef.current) {
      const ghost = cardRef.current.cloneNode(true) as HTMLElement;
      ghost.style.position = "absolute";
      ghost.style.top = "-1000px";
      ghost.style.width = cardRef.current.offsetWidth + "px";
      ghost.style.opacity = "0.95";
      ghost.style.transform = "rotate(2deg)";
      ghost.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4)";
      ghost.style.border = `3px solid ${getPriorityColor()}`;
      ghost.style.background = "rgba(26, 26, 46, 0.98)";
      document.body.appendChild(ghost);
      e.dataTransfer.setDragImage(ghost, 0, 0);
      setTimeout(() => document.body.removeChild(ghost), 0);
    }

    if (onDragStart) {
      onDragStart(serviceOrder);
    }
  };

  const handleDragEndLocal = () => {
    setIsDragging(false);
    if (onDragEnd) {
      onDragEnd();
    }
  };

  return (
    <Box
      ref={cardRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEndLocal}
      sx={{
        p: 1.5,
        mb: 1,
        borderRadius: 2,
        background: isDragging
          ? "rgba(33, 150, 243, 0.3)"
          : "rgba(255, 255, 255, 0.05)",
        border: `2px solid ${getPriorityColor()}`,
        borderLeftWidth: 4,
        cursor: isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0.4 : 1,
        transform: isDragging ? "scale(0.95)" : "scale(1)",
        transition: "all 0.2s ease",
        "&:hover": {
          background: "rgba(255, 255, 255, 0.08)",
          scale: 0.98,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        },
      }}
    >
      {/* Header */}
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <AssignmentIcon fontSize="small" sx={{ color: getPriorityColor() }} />
        <Typography variant="body2" fontWeight={700} color="white">
          {serviceOrder.code}
        </Typography>
        <Chip
          label={serviceOrder.priority.toUpperCase()}
          size="small"
          sx={{
            fontSize: "0.65rem",
            height: 18,
            fontWeight: 600,
            bgcolor: getPriorityColor(),
            color: "white",
          }}
        />
      </Box>

      {/* Client */}
      <Typography
        variant="body2"
        fontWeight={600}
        sx={{ mb: 0.5 }}
        color="white"
      >
        Cliente : {serviceOrder.clientName}
      </Typography>

      {/* Service Type */}
      <Typography variant="caption" color="white" display="block">
        {serviceOrder.serviceType}
      </Typography>

      {/* Address */}
      <Typography
        variant="caption"
        color="white"
        display="block"
        sx={{ mt: 0.5 }}
      >
        📍 {serviceOrder.address}
      </Typography>

      {/* Duration */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt={1}
        pt={1}
        sx={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        <Typography variant="caption" color="white">
          ⏱️ {serviceOrder.estimatedDuration} min
        </Typography>
        <Typography variant="caption" color="white">
          🔧 {serviceOrder.materials.length} materiales
        </Typography>
      </Box>
    </Box>
  );
}