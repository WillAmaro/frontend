"use client";

import { useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import {
  LayersOutlined,
  AddCircleOutline,
  HistoryOutlined,
} from "@mui/icons-material";
import { TitleCard } from "@/src/components/base/TitleCard";
import KardexMovement from "./kardexMovement";   // ← tu componente actual
import KardexHistory  from "./kardexHistory";     // ← el nuevo componente

// ─── Tab item ─────────────────────────────────────────────────────────────────

interface TabItemProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  active: boolean;
  onClick: () => void;
}

function TabItem({ icon, label, description, active, onClick }: TabItemProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        flex: 1,
        display: "flex", alignItems: "center", gap: 1.5,
        px: 2.5, py: 2,
        cursor: "pointer",
        borderBottom: `2.5px solid ${active ? "#0f172a" : "transparent"}`,
        bgcolor: active ? "white" : "transparent",
        transition: "all 0.18s ease",
        "&:hover": {
          bgcolor: active ? "white" : "#f1f5f9",
        },
      }}
    >
      <Box sx={{
        width: 34, height: 34, borderRadius: 2,
        bgcolor: active ? "#0f172a" : "#f1f5f9",
        color: active ? "white" : "#94a3b8",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.18s ease",
        flexShrink: 0,
      }}>
        {icon}
      </Box>
      <Box>
        <Typography
          variant="body2"
          fontWeight={active ? 800 : 600}
          sx={{ color: active ? "#0f172a" : "#64748b", lineHeight: 1, fontSize: "0.84rem" }}
        >
          {label}
        </Typography>
        <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.65rem" }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

export default function KardexPage() {
  const [activeTab, setActiveTab] = useState<"register" | "history">("register");

  return (
    <Box sx={{ maxWidth: 1600, mx: "auto", p: { xs: 2, md: 3 }, display: "flex", flexDirection: "column", gap: 2.5 }}>

      {/* ── Título ── */}
      {/* <TitleCard
        icon={<LayersOutlined sx={{ fontSize: 32 }} />}
        title="Kardex — Gestión de Movimientos"
        description="Registra y consulta entradas, salidas y transferencias del inventario del hub con trazabilidad completa."
      /> */}

      {/* ── Tab switcher ── */}
      <Card elevation={0} sx={{
        borderRadius: 2.5,
        border: "1px solid #e2e8f0",
        overflow: "hidden",
        bgcolor: "#f8fafc",
      }}>
        <Box sx={{ display: "flex", borderBottom: "1px solid #e2e8f0" }}>
          <TabItem
            icon={<AddCircleOutline sx={{ fontSize: 17 }} />}
            label="Registrar Movimiento"
            description="Ingreso, egreso o transferencia"
            active={activeTab === "register"}
            onClick={() => setActiveTab("register")}
          />
          {/* Divisor vertical */}
          <Box sx={{ width: "1px", bgcolor: "#e2e8f0", alignSelf: "stretch", my: 0.5 }} />
          <TabItem
            icon={<HistoryOutlined sx={{ fontSize: 17 }} />}
            label="Historial de Movimientos"
            description="Consulta y detalle de registros"
            active={activeTab === "history"}
            onClick={() => setActiveTab("history")}
          />
        </Box>
      </Card>

      {/* ── Contenido del tab activo ── */}
      <Box>
        {activeTab === "register" && <KardexMovement />}
        {activeTab === "history"  && <KardexHistory />}
      </Box>
    </Box>
  );
}