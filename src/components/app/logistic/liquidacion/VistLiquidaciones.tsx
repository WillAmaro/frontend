"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Chip,
  Alert,
  TextField,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  PersonOutlined,
  DescriptionOutlined,
  InfoOutlined,
  AssignmentOutlined,
  CheckCircleOutlined,
  PendingActionsOutlined,
  VisibilityOutlined,
  EditOutlined,
  FilterListOutlined,
  ClearOutlined,
} from "@mui/icons-material";
import { TitleCard } from "@/src/components/base/TitleCard";
import CustomDataGrid from "@/src/components/base/CustomDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import ButtonBase from "@/src/components/base/ButtonBase";
import SelectBase from "@/src/components/base/SelectBase";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// ===== INTERFACES =====
interface SOTAsignado {
  id: number;
  sot: string;
  fecha: string;
  estado: string;
  subEstado?: string;
  franja: string;
  tTrabajo: string;
  detalleTrabajo: string;
  distrito: string;
  plano?: string;
  razonSocial: string;
  direccion: string;
  // Estado de liquidación
  liquidado: boolean;
  materialesUsados?: number;
  equiposInstalados?: number;
}

interface TecnicoInfo {
  nombre: string;
  dni: string;
  cuadrilla: string;
}

export default function MisLiquidaciones() {
  const router = useRouter();

  // ===== ESTADOS =====
  const [tecnicoActual, setTecnicoActual] = useState<TecnicoInfo>({
    nombre: "ALARCON HUAMAN NELSON",
    dni: "12345678",
    cuadrilla: "CUADRILLA 01",
  });
  const [sotsAsignados, setSOTsAsignados] = useState<SOTAsignado[]>([]);
  const [searchSOTs, setSearchSOTs] = useState<string>("");
  // const [filtroEstado, setFiltroEstado] = useState<
  //   "todos" | "pendiente" | "completado"
  // >("todos");

  const [filtroEstado, setFiltroEstado] = useState("todos");
  // const [fechaInicio, setFechaInicio] = useState("");
  // const [fechaFin, setFechaFin] = useState("");
  const [fechaInicio, setFechaInicio] = useState<Dayjs>(dayjs());
  const [fechaFin, setFechaFin] = useState<Dayjs | null>(null);

  // ===== DATOS SIMULADOS =====
  const sotsSimulados: SOTAsignado[] = [
    {
      id: 1,
      sot: "83794097",
      fecha: "2025-01-05",
      estado: "ATENDIDO",
      subEstado: "",
      franja: "AM1",
      tTrabajo: "FTTH Traslado Interno",
      detalleTrabajo: "FTTHTI01 - Traslado interno ONT",
      distrito: "LA VICTORIA",
      plano: "0LMLV008-S",
      razonSocial: "EMPRESA XYZ SAC",
      direccion: "AV. PRINCIPAL 123",
      liquidado: true,
      materialesUsados: 5,
      equiposInstalados: 1,
    },
    {
      id: 2,
      sot: "83787992",
      fecha: "2025-01-05",
      estado: "ATENDIDO",
      subEstado: "",
      franja: "AM1",
      tTrabajo: "HFC Instalación",
      detalleTrabajo: "HFC05 - 2Play Cable Internet (menor igual 2 decos)",
      distrito: "LA VICTORIA",
      plano: "000LMLV011",
      razonSocial: "PERSONA NATURAL",
      direccion: "JR. SECUNDARIO 456",
      liquidado: true,
      materialesUsados: 8,
      equiposInstalados: 2,
    },
    {
      id: 3,
      sot: "83850123",
      fecha: "2025-01-06",
      estado: "ATENDIDO",
      subEstado: "",
      franja: "AM2",
      tTrabajo: "FTTH Instalacion",
      detalleTrabajo: "FTTH01 - 1PLAY INTERNET",
      distrito: "LA VICTORIA",
      plano: "0LMLV045-F",
      razonSocial: "COMERCIO LOCAL SAC",
      direccion: "AV. COMERCIO 789",
      liquidado: false,
    },
    {
      id: 4,
      sot: "83860456",
      fecha: "2025-01-06",
      estado: "ATENDIDO",
      subEstado: "",
      franja: "PM1",
      tTrabajo: "HFC Mantenimiento",
      detalleTrabajo: "HFCMM22 - MANTENIMIENTO SIN SERVICIO GENERAL",
      distrito: "LA VICTORIA",
      plano: "000LMLV078",
      razonSocial: "CLIENTE RESIDENCIAL",
      direccion: "JR. LIMA 321",
      liquidado: false,
    },
    {
      id: 5,
      sot: "83755401",
      fecha: "2025-01-04",
      estado: "No completado",
      subEstado: "Rechazado por mala oferta",
      franja: "AM1",
      tTrabajo: "FTTH Instalacion",
      detalleTrabajo: "FTTH13 - 2PLAY INTERNET + TV FTTH",
      distrito: "LA VICTORIA",
      plano: "0LMLV012-S",
      razonSocial: "EMPRESA ABC EIRL",
      direccion: "AV. CENTRAL 555",
      liquidado: false,
    },
  ];

  // ===== CARGAR DATOS AL MONTAR =====
  useEffect(() => {
    setSOTsAsignados(sotsSimulados);
  }, []);

  // ===== FILTRAR SOTS =====
  const sotsFiltrados = useMemo(() => {
    let resultado = sotsAsignados;

    if (filtroEstado === "pendiente") {
      resultado = resultado.filter(
        (s) => !s.liquidado && s.estado === "ATENDIDO"
      );
    } else if (filtroEstado === "completado") {
      resultado = resultado.filter((s) => s.liquidado);
    }

    return resultado;
  }, [sotsAsignados, filtroEstado]);

  // ===== ESTADÍSTICAS =====
  const estadisticas = useMemo(() => {
    const total = sotsAsignados.length;
    const completados = sotsAsignados.filter((s) => s.liquidado).length;
    const pendientes = sotsAsignados.filter(
      (s) => !s.liquidado && s.estado === "ATENDIDO"
    ).length;
    const noCompletados = sotsAsignados.filter(
      (s) => s.estado === "No completado"
    ).length;

    return { total, completados, pendientes, noCompletados };
  }, [sotsAsignados]);

  // ===== COLUMNAS PARA GRID =====
  const columnasSOTs: GridColDef[] = [
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
      headerName: "Estado Servicio",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={params.value === "ATENDIDO" ? "success" : "warning"}
        />
      ),
    },
    {
      field: "liquidado",
      headerName: "Estado Liquidación",
      width: 180,
      renderCell: (params) => {
        const row = params.row as SOTAsignado;

        if (row.estado !== "ATENDIDO") {
          return (
            <Chip
              label="No aplica"
              size="small"
              variant="outlined"
              color="default"
            />
          );
        }

        return params.value ? (
          <Chip
            label="Liquidado"
            size="small"
            color="success"
            icon={<CheckCircleOutlined />}
          />
        ) : (
          <Chip
            label="Pendiente"
            size="small"
            color="error"
            icon={<PendingActionsOutlined />}
          />
        );
      },
    },
    {
      field: "franja",
      headerName: "Franja",
      width: 100,
    },
    {
      field: "tTrabajo",
      headerName: "Tipo Trabajo",
      width: 200,
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
    {
      field: "materialesUsados",
      headerName: "Materiales",
      width: 110,
      align: "center",
      renderCell: (params) => {
        if (!params.value) return "-";
        return (
          <Chip
            label={params.value}
            size="small"
            variant="outlined"
            color="info"
          />
        );
      },
    },
    {
      field: "equiposInstalados",
      headerName: "Equipos",
      width: 100,
      align: "center",
      renderCell: (params) => {
        if (!params.value) return "-";
        return (
          <Chip
            label={params.value}
            size="small"
            variant="outlined"
            color="secondary"
          />
        );
      },
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 120,
      align: "center",
      sortable: false,
      renderCell: (params) => {
        const row = params.row as SOTAsignado;

        return (
          <Box sx={{ display: "flex", gap: 0.5 }}>
            {/* Botón Ver Detalle - Solo si está liquidado */}
            {row.liquidado && (
              <IconButton
                size="small"
                color="info"
                onClick={() =>
                  router.push(`/logistica/altas/vista-liquidacion/${row.sot}`)
                }
                title="Ver Detalle"
              >
                <VisibilityOutlined fontSize="small" />
              </IconButton>
            )}

            {/* Botón Editar/Crear - Solo si está ATENDIDO */}
            {row.estado === "ATENDIDO" && (
              <IconButton
                size="small"
                color="primary"
                onClick={() => handleEditar(row)}
                title={
                  row.liquidado ? "Editar Liquidación" : "Crear Liquidación"
                }
              >
                <EditOutlined fontSize="small" />
              </IconButton>
            )}
          </Box>
        );
      },
    },
  ];

  // ===== MANEJAR EDICIÓN =====
  const handleEditar = (sot: SOTAsignado) => {
    if (sot.liquidado) {
      // Si ya está liquidado, ir al formulario en modo edición
      router.push(`/logistica/altas/liquidacion-tecnico/${sot.sot}`);
    } else {
      // Si no está liquidado, ir al formulario en modo creación
      router.push(`/logistica/altas/liquidacion-tecnico/${sot.sot}`);
    }
  };

  // ===== RENDER =====
  return (
    <Box sx={{ maxWidth: 1600, mx: "auto", p: 3 }}>
      <TitleCard
        icon={<AssignmentOutlined sx={{ fontSize: 32 }} />}
        title="MIS LIQUIDACIONES"
        description="Gestiona los servicios técnicos asignados a tu cuadrilla"
      />

      {/* Información del Técnico */}
      {/* <Card
        elevation={3}
        sx={{
          mt: 3,
          p: 4,
          borderRadius: 4,
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              bgcolor: "primary.main",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {tecnicoActual.nombre
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={700}>
              {tecnicoActual.nombre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              DNI: {tecnicoActual.dni} • {tecnicoActual.cuadrilla}
            </Typography>
          </Box>
        </Box>
      </Card> */}

      {/* Estadísticas */}
      <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
        <Card
          elevation={3}
          sx={{
            flex: "1 1 200px",
            p: 3,
            borderRadius: 4,
            bgcolor: "primary.50",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <Typography variant="h4" fontWeight={700} color="primary.main">
            {estadisticas.total}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total SOTs Asignados
          </Typography>
        </Card>

        <Card
          elevation={3}
          sx={{
            flex: "1 1 200px",
            p: 3,
            borderRadius: 4,
            bgcolor: "success.50",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <Typography variant="h4" fontWeight={700} color="success.main">
            {estadisticas.completados}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Liquidaciones Completadas
          </Typography>
        </Card>

        <Card
          elevation={3}
          sx={{
            flex: "1 1 200px",
            p: 3,
            borderRadius: 4,
            bgcolor: "error.50",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <Typography variant="h4" fontWeight={700} color="error.main">
            {estadisticas.pendientes}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Pendientes de Liquidar
          </Typography>
        </Card>

        <Card
          elevation={3}
          sx={{
            flex: "1 1 200px",
            p: 3,
            borderRadius: 4,
            bgcolor: "warning.50",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <Typography variant="h4" fontWeight={700} color="warning.main">
            {estadisticas.noCompletados}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Servicios No Completados
          </Typography>
        </Card>
      </Box>

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
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <DescriptionOutlined sx={{ color: "primary.main", fontSize: 28 }} />
            <Typography variant="h6" fontWeight={700}>
              Filtrar Servicios
            </Typography>
          </Box>

          <ButtonBase
            label="Crear registro"
            onClick={() =>
              router.push("/logistica/altas/liquidacion-tecnico/registrar")
            }
          />
        </Box>

        {/* Filtros */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "flex-end",
          }}
        >
          {/* Select de Estado */}
          <Box sx={{ flex: "1 1 200px", minWidth: 200 }}>
          
            <SelectBase
              label="Estado"
              value={filtroEstado}
              size="medium"
              onChange={(value: any) => setFiltroEstado(value)}
              options={[
                { label: `Todos (${estadisticas.total})`, value: "todos" },
                {
                  label: `Pendientes (${estadisticas.pendientes})`,
                  value: "pendiente",
                },
                {
                  label: `Completados (${estadisticas.completados})`,
                  value: "completado",
                },
              ]}
            />
          </Box>
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

          {/* Botón Aplicar Filtros */}
          {/* <Button
            variant="contained"
            startIcon={<FilterListOutlined />}
            onClick={handleAplicarFiltros}
            sx={{
              height: 40,
              px: 3,
              textTransform: "none"
            }}
          >
            Aplicar Filtros
          </Button>

          <Button
            variant="outlined"
            startIcon={<ClearOutlined />}
            onClick={handleLimpiarFiltros}
            sx={{
              height: 40,
              px: 3,
              textTransform: "none",
            }}
          >
            Limpiar
          </Button> */}
        </Box>

        {/* Indicador de filtros activos (opcional) */}
        {/* {(filtroEstado !== "todos" || fechaInicio || fechaFin) && (
          <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
            {filtroEstado !== "todos" && (
              <Chip
                label={`Estado: ${filtroEstado}`}
                onDelete={() => setFiltroEstado("todos")}
                size="small"
                color="primary"
              />
            )}
            {fechaInicio && (
              <Chip
                label={`Desde: ${fechaInicio}`}
                onDelete={() => setFechaInicio(dayjs())}
                size="small"
                color="primary"
              />
            )}
            {fechaFin && (
              <Chip
                label={`Hasta: ${fechaFin}`}
                onDelete={() => setFechaFin(null)}
                size="small"
                color="primary"
              />
            )}
          </Box>
        )} */}
      </Card>
      {/* Tabla de SOTs */}
      {sotsFiltrados.length > 0 ? (
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
            Mis Actas de Servicio
          </Typography>

          <CustomDataGrid
            columns={columnasSOTs}
            localRows={sotsFiltrados}
            serverSide={false}
            search={searchSOTs}
            onSearch={setSearchSOTs}
            pageSize={10}
            sx={{ minHeight: 500 }}
          />
        </Card>
      ) : (
        <Card
          elevation={3}
          sx={{ mt: 3, p: 6, borderRadius: 4, textAlign: "center" }}
        >
          <InfoOutlined sx={{ fontSize: 80, color: "grey.400", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No hay servicios en esta categoría
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cambia el filtro para ver otros servicios
          </Typography>
        </Card>
      )}

      {/* Alert informativo */}
      {estadisticas.pendientes > 0 && (
        <Alert severity="warning" sx={{ mt: 3 }}>
          <Typography variant="body2" fontWeight={600}>
            ⚠️ Tienes {estadisticas.pendientes} servicio(s) pendiente(s) de
            liquidar
          </Typography>
          <Typography variant="caption" display="block" mt={0.5}>
            Haz clic en el ícono de edición para completar la información de
            materiales y equipos utilizados
          </Typography>
        </Alert>
      )}
    </Box>
  );
}
