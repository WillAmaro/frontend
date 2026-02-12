// components/logistics/schedule/TimeSlot.tsx

"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import { Attention, Technician } from "@/src/types/schedule.types";
import AttentionCard from "./AttentionCard";

interface TimeSlotProps {
  technicianId: string;
  technician: Technician;
  
  timeSlot: string;
  attentions: Attention[];
  onDrop?: (technicianId: string, timeSlot: string) => void;
  onEditAttention?: (attention: Attention) => void;
  onDeleteAttention?: (attention: Attention) => void;
  onStartAttention?: (attention: Attention) => void;
  onCompleteAttention?: (attention: Attention) => void;
}

export default function TimeSlot({
  technicianId,
  technician,
  timeSlot,
  attentions,
  onDrop,
  onEditAttention,
  onDeleteAttention,
  onStartAttention,
  onCompleteAttention,
}: TimeSlotProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const serviceOrderId = e.dataTransfer.getData("serviceOrderId");
    if (serviceOrderId && onDrop) {
      onDrop(technicianId, timeSlot);
    }
  };

  const hasAttention = attentions.length > 0;

  return (
    <Box
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        minHeight: 100,
        p: 1,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: 1,
        background: isDragOver
          ? "rgba(33, 150, 243, 0.2)"
          : hasAttention
          ? "rgba(255, 255, 255, 0.03)"
          : "rgba(255, 255, 255, 0.01)",
        transition: "all 0.2s ease",
        cursor: onDrop ? "pointer" : "default",
        "&:hover": {
          background: isDragOver
            ? "rgba(33, 150, 243, 0.25)"
            : "rgba(255, 255, 255, 0.05)",
        },
      }}
    >
      {attentions.map((attention) => (
        <AttentionCard
          key={attention.id}
          attention={attention}
          technicianColor={technician.color}
          onEdit={() => onEditAttention?.(attention)}
          onDelete={() => onDeleteAttention?.(attention)}
          onStart={() => onStartAttention?.(attention)}
          onComplete={() => onCompleteAttention?.(attention)}
        />
      ))}

      {!hasAttention && isDragOver && (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "primary.main",
            fontWeight: 600,
          }}
        >
          Soltar aquí
        </Box>
      )}
    </Box>
  );
}