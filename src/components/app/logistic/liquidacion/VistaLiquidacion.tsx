"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Card,
  Typography,
  Chip,
  Alert,
  Button,
  Divider,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  ArrowBackOutlined,
  CheckCircleOutlined,
  PersonOutlined,
  LocationOnOutlined,
  CalendarTodayOutlined,
  BuildOutlined,
  InventoryOutlined,
  DescriptionOutlined,
  WarningAmberOutlined,
  PrintOutlined,
  InfoOutlined,
} from "@mui/icons-material";
import { TitleCard } from "@/src/components/base/TitleCard";

// ===== INTERFACES =====
interface DatosServicio {
  sot: string;
  tecnico: string;
  cuadrilla: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  estado: string;
  distrito: string;
  provincia: string;
  plano: string;
  franja: string;
  tTrabajo: string;
  detalleTrabajo: string;
  razonSocial: string;
  codigoCliente: string;
  direccion: string;
  telefono: string;
}

interface DatosLiquidacion {
  plataforma: string;
  servicioRealizado: string;
  observaciones: string;
  fechaLiquidacion: string;
  estadoLiquidacion: "completado" | "pendiente";
}

interface Material {
  codigo: string;
  descripcion: string;
  uom: string;
  tipo: string;
  cantidad: number;
}

interface Equipo {
  sku: string;
  descripcion: string;
  marca: string;
  modelo: string;
  serie: string;
  mac: string;
  tipo: "instalado" | "retirado";
}

export default function VistaLiquidacion() {
  const router = useRouter();
  const params = useParams();
  const sot = params.id as string;
  

  // ===== ESTADOS =====
  const [loading, setLoading] = useState(true);
  const [datosServicio, setDatosServicio] = useState<DatosServicio | null>(null);
  const [datosLiquidacion, setDatosLiquidacion] = useState<DatosLiquidacion | null>(null);
  const [materiales, setMateriales] = useState<Material[]>([]);
  const [equipos, setEquipos] = useState<Equipo[]>([]);

  // ===== CARGAR DATOS =====
  useEffect(() => {
    if (sot) {
      cargarDatosLiquidacion();
    }
  }, [sot]);

  const cargarDatosLiquidacion = async () => {
    setLoading(true);
    
    // Simulación de carga desde backend
    setTimeout(() => {
      // Datos del servicio
      setDatosServicio({
        sot: sot,
        tecnico: "ALARCON HUAMAN NELSON",
        cuadrilla: "CUADRILLA 01",
        fecha: "2025-01-05",
        horaInicio: "08:30",
        horaFin: "10:45",
        estado: "ATENDIDO",
        distrito: "LA VICTORIA",
        provincia: "LIMA",
        plano: "0LMLV008-S",
        franja: "AM1",
        tTrabajo: "FTTH Traslado Interno",
        detalleTrabajo: "FTTHTI01 - Traslado interno ONT",
        razonSocial: "EMPRESA XYZ SAC",
        codigoCliente: "CLI001",
        direccion: "AV. PRINCIPAL 123",
        telefono: "987654321",
      });

      // Datos de la liquidación
      setDatosLiquidacion({
        plataforma: "FTTH",
        servicioRealizado: "Post venta",
        observaciones: "Servicio realizado sin inconvenientes. Cliente satisfecho con la instalación.",
        fechaLiquidacion: "2025-01-05 11:30",
        estadoLiquidacion: "completado",
      });

      // Materiales utilizados
      setMateriales([
        {
          codigo: "1002950",
          descripcion: "ATADOR DE IDENTIFICACION DE ABONADO",
          uom: "UND",
          tipo: "HFC",
          cantidad: 5,
        },
        {
          codigo: "1004692",
          descripcion: "CABLE UTP CAT5E FTP 4PR/24AWG 04070009",
          uom: "MTS",
          tipo: "HFC-FTTH",
          cantidad: 15,
        },
        {
          codigo: "1063013",
          descripcion: "CONECTOR FMC2104-SA 14135787 HUAWEI",
          uom: "UND",
          tipo: "FTTH",
          cantidad: 2,
        },
        {
          codigo: "1044835",
          descripcion: "PATCHCORD SM SC/APC-SC/APC 3MM 3M ONT",
          uom: "UND",
          tipo: "FTTH",
          cantidad: 1,
        },
        {
          codigo: "1004521",
          descripcion: "SUJETADOR DE ANCLAJE",
          uom: "UND",
          tipo: "HFC-FTTH",
          cantidad: 8,
        },
      ]);

      // Equipos instalados/retirados
      setEquipos([
        {
          sku: "ONT-HW-001",
          descripcion: "ONT HUAWEI HG8546M",
          marca: "HUAWEI",
          modelo: "HG8546M",
          serie: "2024HW123456",
          mac: "00:25:9E:12:34:56",
          tipo: "instalado",
        },
        {
          sku: "ONT-ZTE-002",
          descripcion: "ONT ZTE F660 V5",
          marca: "ZTE",
          modelo: "F660 V5",
          serie: "2023ZTE789012",
          mac: "08:00:27:AB:CD:EF",
          tipo: "retirado",
        },
      ]);

      setLoading(false);
    }, 1000);
  };

  // ===== FUNCIÓN IMPRIMIR =====
  const handleImprimir = () => {
    window.print();
  };

  if (loading) {
    return (
      <Box sx={{ maxWidth: 1600, mx: "auto", p: 3 }}>
        <Alert severity="info">Cargando información...</Alert>
      </Box>
    );
  }

  if (!datosServicio || !datosLiquidacion) {
    return (
      <Box sx={{ maxWidth: 1600, mx: "auto", p: 3 }}>
        <Alert severity="error">No se encontraron datos de la liquidación</Alert>
      </Box>
    );
  }

  // ===== RENDER =====
  return (
    <Box sx={{ maxWidth: 1600, mx: "auto", p: 3 }}>
      {/* Botones de navegación */}
      {/* <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button
          startIcon={<ArrowBackOutlined />}
          onClick={() => router.back()}
          sx={{ textTransform: "none" }}
        >
          Volver
        </Button>
        <Button
          variant="outlined"
          startIcon={<PrintOutlined />}
          onClick={handleImprimir}
          sx={{ textTransform: "none", ml: "auto" }}
        >
          Imprimir
        </Button>
      </Box> */}

      <TitleCard
        icon={<DescriptionOutlined sx={{ fontSize: 32 }} />}
        title={`LIQUIDACIÓN DE SERVICIO - SOT: ${sot}`}
        description="Vista detallada de la atención del servicio técnico"
      />

      {/* Estado de la Liquidación */}
      <Card elevation={3} sx={{ mt: 3, p: 3, borderRadius: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {datosLiquidacion.estadoLiquidacion === "completado" ? (
            <>
              <CheckCircleOutlined sx={{ fontSize: 40, color: "success.main" }} />
              <Box>
                <Typography variant="h6" fontWeight={700} color="success.main">
                  Liquidación Completada
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Registrada el {datosLiquidacion.fechaLiquidacion}
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <WarningAmberOutlined sx={{ fontSize: 40, color: "warning.main" }} />
              <Box>
                <Typography variant="h6" fontWeight={700} color="warning.main">
                  Liquidación Pendiente
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Esperando registro de materiales y equipos
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Card>

      {/* Información del Servicio */}
      <Card elevation={3} sx={{ mt: 3, p: 4, borderRadius: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <InfoOutlined sx={{ color: "primary.main", fontSize: 28 }} />
          <Typography variant="h6" fontWeight={700}>
            Información del Servicio
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {/* Columna 1: Datos del Cliente */}
          <Box sx={{ flex: "1 1 400px" }}>
            <Typography variant="subtitle2" fontWeight={700} mb={2} color="primary">
              DATOS DEL CLIENTE
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Razón Social
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {datosServicio.razonSocial}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Código Cliente
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {datosServicio.codigoCliente}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Dirección
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {datosServicio.direccion}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Distrito
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {datosServicio.distrito}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Provincia
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {datosServicio.provincia}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Teléfono
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {datosServicio.telefono}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Columna 2: Datos del Servicio */}
          <Box sx={{ flex: "1 1 400px" }}>
            <Typography variant="subtitle2" fontWeight={700} mb={2} color="primary">
              DATOS DEL SERVICIO
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Tipo de Trabajo
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {datosServicio.tTrabajo}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Detalle del Trabajo
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {datosServicio.detalleTrabajo}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Fecha
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {datosServicio.fecha}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Franja
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {datosServicio.franja}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Hora Inicio
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {datosServicio.horaInicio}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Hora Fin
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {datosServicio.horaFin}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Plano
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {datosServicio.plano}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Estado
                </Typography>
                <Chip
                  label={datosServicio.estado}
                  size="small"
                  color="success"
                  sx={{ mt: 0.5 }}
                />
              </Box>
            </Box>
          </Box>

          {/* Columna 3: Datos del Técnico */}
          <Box sx={{ flex: "1 1 250px" }}>
            <Typography variant="subtitle2" fontWeight={700} mb={2} color="primary">
              TÉCNICO ASIGNADO
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    bgcolor: "primary.main",
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  {datosServicio.tecnico
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {datosServicio.tecnico}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {datosServicio.cuadrilla}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>

      {/* Datos de la Liquidación */}
      <Card elevation={3} sx={{ mt: 3, p: 4, borderRadius: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <BuildOutlined sx={{ color: "primary.main", fontSize: 28 }} />
          <Typography variant="h6" fontWeight={700}>
            Detalles de la Liquidación
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Box sx={{ flex: "1 1 300px", p: 3, bgcolor: "grey.50", borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Plataforma
            </Typography>
            <Typography variant="h6" fontWeight={700} mt={0.5}>
              {datosLiquidacion.plataforma}
            </Typography>
          </Box>
          <Box sx={{ flex: "1 1 300px", p: 3, bgcolor: "grey.50", borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Servicio Realizado
            </Typography>
            <Typography variant="h6" fontWeight={700} mt={0.5}>
              {datosLiquidacion.servicioRealizado}
            </Typography>
          </Box>
        </Box>

        {datosLiquidacion.observaciones && (
          <>
            <Divider sx={{ my: 3 }} />
            <Box>
              <Typography variant="subtitle2" fontWeight={700} mb={1}>
                Observaciones
              </Typography>
              <Alert severity="info" sx={{ borderRadius: 2 }}>
                <Typography variant="body2">
                  {datosLiquidacion.observaciones}
                </Typography>
              </Alert>
            </Box>
          </>
        )}
      </Card>

      {/* Materiales Utilizados */}
      <Card elevation={3} sx={{ mt: 3, p: 4, borderRadius: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <InventoryOutlined sx={{ color: "primary.main", fontSize: 28 }} />
          <Typography variant="h6" fontWeight={700}>
            Materiales Utilizados
          </Typography>
          <Chip
            label={`${materiales.length} items`}
            size="small"
            color="primary"
            sx={{ ml: 1 }}
          />
        </Box>

        {materiales.length > 0 ? (
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: "primary.main" }}>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    CÓDIGO
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    DESCRIPCIÓN
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }} align="center">
                    U.M.
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }} align="center">
                    TIPO
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }} align="center">
                    CANTIDAD
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materiales.map((material, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {material.codigo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{material.descripcion}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={material.uom} size="small" />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={material.tipo || "GENERAL"}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" fontWeight={700}>
                        {material.cantidad}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Alert severity="warning">
            No se registraron materiales para este servicio
          </Alert>
        )}
      </Card>

      {/* Equipos Instalados/Retirados */}
      <Card elevation={3} sx={{ mt: 3, p: 4, borderRadius: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <BuildOutlined sx={{ color: "primary.main", fontSize: 28 }} />
          <Typography variant="h6" fontWeight={700}>
            Equipos Instalados / Retirados
          </Typography>
          <Chip
            label={`${equipos.length} equipos`}
            size="small"
            color="secondary"
            sx={{ ml: 1 }}
          />
        </Box>

        {equipos.length > 0 ? (
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: "secondary.main" }}>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    TIPO
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    SKU
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    DESCRIPCIÓN
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    MARCA
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    MODELO
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    N° SERIE
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    MAC
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {equipos.map((equipo, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Chip
                        label={equipo.tipo === "instalado" ? "INSTALADO" : "RETIRADO"}
                        size="small"
                        color={equipo.tipo === "instalado" ? "success" : "error"}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {equipo.sku}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{equipo.descripcion}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{equipo.marca}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{equipo.modelo}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">
                        {equipo.serie}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">
                        {equipo.mac}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Alert severity="warning">
            No se registraron equipos para este servicio
          </Alert>
        )}
      </Card>

      {/* Resumen Final */}
      <Card elevation={3} sx={{ mt: 3, p: 4, borderRadius: 4, bgcolor: "primary.50" }}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Resumen de la Liquidación
        </Typography>
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Box sx={{ flex: "1 1 200px" }}>
            <Typography variant="caption" color="text.secondary">
              Total Materiales
            </Typography>
            <Typography variant="h5" fontWeight={700} color="primary">
              {materiales.reduce((acc, m) => acc + m.cantidad, 0)} unidades
            </Typography>
          </Box>
          <Box sx={{ flex: "1 1 200px" }}>
            <Typography variant="caption" color="text.secondary">
              Total Equipos
            </Typography>
            <Typography variant="h5" fontWeight={700} color="secondary">
              {equipos.length} equipos
            </Typography>
          </Box>
          <Box sx={{ flex: "1 1 200px" }}>
            <Typography variant="caption" color="text.secondary">
              Fecha de Registro
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              {datosLiquidacion.fechaLiquidacion}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}