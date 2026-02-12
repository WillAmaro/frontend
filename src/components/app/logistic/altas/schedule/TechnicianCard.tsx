// components/logistics/schedule/TechnicianCard.tsx

"use client";

import { Box, Typography, Avatar, Chip } from "@mui/material";
import { Technician } from "@/src/types/schedule.types";
import PersonIcon from "@mui/icons-material/Person";

interface TechnicianCardProps {
  technician: Technician;
}

export default function TechnicianCard({ technician }: TechnicianCardProps) {
  return (
    <Box
      sx={{
        p: 2,
        mb: 1,
        borderRadius: 2,
        background: technician.isAvailable
          ? "rgba(76, 175, 80, 0.1)"
          : "rgba(158, 158, 158, 0.1)",
        border: `2px solid ${technician.color}`,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateX(4px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        },
      }}
    >
      <Box display="flex" alignItems="center" gap={1.5}>
        <Box
          sx={{
            width: 8,
            height: 40,
            borderRadius: 1,
            background: technician.color,
          }}
        />
        
        <Avatar
          sx={{
            bgcolor: technician.color,
            width: 40,
            height: 40,
          }}
        >
          {technician.avatar ? (
            <img src={technician.avatar} alt={technician.name} />
          ) : (
            <PersonIcon />
          )}
        </Avatar>

        <Box flex={1}>
          <Typography variant="body1" fontWeight={600}>
            {technician.name} {technician.lastName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {technician.specialization}
          </Typography>
        </Box>

        <Chip
          label={technician.isAvailable ? "Disponible" : "Ocupado"}
          size="small"
          color={technician.isAvailable ? "success" : "default"}
          sx={{ fontWeight: 600 }}
        />
      </Box>
    </Box>
  );
}