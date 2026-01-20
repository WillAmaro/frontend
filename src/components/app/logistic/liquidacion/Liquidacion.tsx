"use client";

import { useState, useMemo } from "react";
import {
  Box,
  Card,
  Typography,
  Chip,
  Alert,
  TextField,
  Button,
} from "@mui/material";
import {
  PersonOutlined,
  DescriptionOutlined,
  InfoOutlined,
} from "@mui/icons-material";
import { TitleCard } from "@/src/components/base/TitleCard";
import CustomDataGrid from "@/src/components/base/CustomDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";

import Autocomplete from "@/src/components/base/Autocomplete";

// ===== INTERFACES =====
interface LiquidacionRegistrada {
  id: number;
  sot: string;
  tecnico: string;
  fecha: Dayjs;
  estado: string;
  plataforma: string;
  servicioRealizado: string;
  materialesUsados: number;
  equiposInstalados: number;
  distrito: string;
  plano?: string;
}

export default function LiquidacionPorTecnico() {
  const router = useRouter();

  // ===== ESTADOS =====
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState<any>(0);
  const [fechaInicio, setFechaInicio] = useState<Dayjs>(dayjs());
  const [fechaFin, setFechaFin] = useState<Dayjs | null>(null);
  const [liquidaciones, setLiquidaciones] = useState<LiquidacionRegistrada[]>(
    []
  );
  const [searchLiquidaciones, setSearchLiquidaciones] = useState<string>("");

  // ===== DATOS SIMULADOS =====
  // En producción, estos vendrían del backend
  const liquidacionesSimuladas: LiquidacionRegistrada[] = [
    {
      id: 1,
      sot: "83794097",
      tecnico: "ALARCON HUAMAN NELSON",
      fecha: dayjs("2025-01-05"),
      estado: "Completado",
      plataforma: "FTTH",
      servicioRealizado: "Post venta",
      materialesUsados: 5,
      equiposInstalados: 1,
      distrito: "LA VICTORIA",
      plano: "0LMLV008-S",
    },
    {
      id: 2,
      sot: "83787992",
      tecnico: "ALARCON HUAMAN NELSON",
      fecha: dayjs("2025-01-05"),
      estado: "Completado",
      plataforma: "HFC",
      servicioRealizado: "Instalación",
      materialesUsados: 8,
      equiposInstalados: 2,
      distrito: "LA VICTORIA",
      plano: "000LMLV011",
    },
    {
      id: 3,
      sot: "83707764",
      tecnico: "CEBALLOS MANZANO EDGAR JESUS",
      fecha: dayjs("2025-01-06"),
      estado: "Completado",
      plataforma: "FTTH",
      servicioRealizado: "Instalación",
      materialesUsados: 6,
      equiposInstalados: 1,
      distrito: "LINCE",
      plano: "0LMLC023-S",
    },
  ];

  // ===== TÉCNICOS ÚNICOS =====
  const tecnicos = useMemo(() => {
    const tecnicosUnicos = Array.from(
      new Set(liquidacionesSimuladas.map((d) => d.tecnico))
    );
    return tecnicosUnicos.sort();
  }, []);

  // ===== FILTRAR LIQUIDACIONES =====
  const cargarLiquidaciones = () => {
    let resultados = liquidacionesSimuladas;

    // Filtrar por técnico
    if (tecnicoSeleccionado) {
      resultados = resultados.filter((l) => l.id === tecnicoSeleccionado.value);
    }

    // Filtrar por rango de fechas
    if (fechaInicio) {
      resultados = resultados.filter((l) => l.fecha >= fechaInicio);
    }
    if (fechaFin) {
      resultados = resultados.filter((l) => l.fecha <= fechaFin);
    }

    setLiquidaciones(resultados);
  };

  // ===== COLUMNAS PARA LIQUIDACIONES =====
  const columnasLiquidaciones: GridColDef[] = [
    {
      field: "sot",
      headerName: "SOT",
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={600}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "fecha",
      headerName: "Fecha",
      width: 120,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color="success"
          icon={<InfoOutlined />}
        />
      ),
    },
    {
      field: "plataforma",
      headerName: "Plataforma",
      width: 100,
      renderCell: (params) => (
        <Chip label={params.value} size="small" color="primary" />
      ),
    },
    {
      field: "servicioRealizado",
      headerName: "Servicio",
      width: 180,
    },
    {
      field: "materialesUsados",
      headerName: "Materiales",
      width: 110,
      align: "center",
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          variant="outlined"
          color="info"
        />
      ),
    },
    {
      field: "equiposInstalados",
      headerName: "Equipos",
      width: 100,
      align: "center",
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          variant="outlined"
          color="secondary"
        />
      ),
    },
    {
      field: "distrito",
      headerName: "Distrito",
      width: 150,
    },
    {
      field: "plano",
      headerName: "Plano",
      width: 120,
    },
  ];

  // ===== MANEJAR EDICIÓN =====
  const handleEditar = (liquidacion: LiquidacionRegistrada) => {
    // Redirigir al formulario de edición con el SOT
    router.push(
      `/logistica/altas/liquidacion/vista-liquidacion/${liquidacion.sot}`
    );
  };

  // ===== RENDER =====
  return (
    <Box sx={{ maxWidth: 1600, mx: "auto", p: 3 }}>
      <TitleCard
        icon={<DescriptionOutlined sx={{ fontSize: 32 }} />}
        title="ACTAS DE SERVICIO REGISTRADAS"
        description="Visualiza y edita las actas de servicios completados"
      />

      {/* Filtros */}
      <Card
        elevation={3}
        sx={{
          mt: 3,
          p: 4,
          borderRadius: 4,
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <PersonOutlined sx={{ color: "primary.main", fontSize: 28 }} />
          <Typography variant="h6" fontWeight={700}>
            Filtros de Búsqueda
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
          <Autocomplete
            options={tecnicos.map((item, index) => {
              return { value: index + 1, label: item };
            })}
            value={tecnicoSeleccionado}
            onChange={setTecnicoSeleccionado}
            placeholder="Todos los técnicos"
            label="Técnico"
            sx={{ flex: "1 1 300px" }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DatePicker
              label="Fecha Inicio"
              value={fechaInicio}
              onChange={(newValue: any) => setFechaInicio(newValue)}
              sx={{ flex: "1 1 200px" }}
            />

            <DatePicker
              label="Fecha Fin"
              value={fechaFin}
              onChange={(newValue) => setFechaFin(newValue)}
              minDate={fechaInicio}
              sx={{ flex: "1 1 200px" }}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            onClick={cargarLiquidaciones}
            sx={{ textTransform: "none", px: 4 }}
          >
            Buscar
          </Button>
        </Box>

        {liquidaciones.length > 0 && (
          <Alert severity="info">
            Se encontraron <strong>{liquidaciones.length}</strong> actas de
            servicio
          </Alert>
        )}
      </Card>

      {/* Tabla de Liquidaciones */}
      {liquidaciones.length > 0 ? (
        <Card
          elevation={3}
          sx={{
            mt: 3,
            p: 4,
            borderRadius: 4,
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <Typography variant="h6" fontWeight={700} mb={3}>
            Actas de Servicio Registradas
          </Typography>

          <CustomDataGrid
            columns={columnasLiquidaciones}
            localRows={liquidaciones}
            serverSide={false}
            search={searchLiquidaciones}
            onSearch={setSearchLiquidaciones}
            onEdit={handleEditar}
            pageSize={10}
            sx={{ minHeight: 500 }}
          />
        </Card>
      ) : (
        <Card
          elevation={3}
          sx={{
            mt: 3,
            p: 6,
            borderRadius: 4,
            textAlign: "center",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <InfoOutlined sx={{ fontSize: 80, color: "grey.400", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No hay liquidaciones registradas
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Selecciona un técnico y rango de fechas para buscar liquidaciones
          </Typography>
        </Card>
      )}
    </Box>
  );
}
