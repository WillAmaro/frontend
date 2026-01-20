"use client";

import { useState } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  Autocomplete,
  Alert,
  Fade,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  InputAdornment,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grow,
} from "@mui/material";
import {
  AddCircleOutline,
  DeleteOutline,
  SaveOutlined,
  ListAltOutlined,
  BusinessOutlined,
  FileDownloadOutlined,
  SearchOutlined,
  FilterListOutlined,
} from "@mui/icons-material";
import { TitleCard } from "@/src/components/base/TitleCard";
import { SectionHeader } from "@/src/components/base/SectionHeader";
import * as XLSX from "xlsx";
import ButtonBase from "@/src/components/base/ButtonBase";

type EntidadDestino = "CLARO" | "LEMCORP";

interface ItemMaterial {
  id: string;
  codigo: string;
  descripcion: string;
  uom: string;
  tipo: string;
  seleccionado: boolean;
  cantidad: string;
}

interface ItemHerramienta {
  id: string;
  codigo: string;
  descripcion: string;
  uom: string;
  seleccionado: boolean;
  cantidad: string;
}

interface ItemEquipo {
  id: string;
  serie: string;
  codigo: string;
  descripcion: string;
  cantidad: string;
}

// Datos de ejemplo
const regionesDisponibles = ["Lima", "Arequipa", "Cusco", "Trujillo", "Piura"];

// Catálogo completo de materiales
const catalogoMaterialesInicial: ItemMaterial[] = [
  {
    id: "mat-1",
    codigo: "1002950",
    descripcion: "ATADOR DE IDENTIFICACION DE ABONADO",
    uom: "UND",
    tipo: "HFC",
    seleccionado: false,
    cantidad: "0",
  },
  {
    id: "mat-2",
    codigo: "1004705",
    descripcion: "CABLE COAXIAL BLANCO RG-6 S/MENSAJERO",
    uom: "MTS",
    tipo: "HFC",
    seleccionado: false,
    cantidad: "0",
  },
  {
    id: "mat-3",
    codigo: "1003101",
    descripcion: "CABLE COAXIAL RG-6 AUTOSOPORTADO",
    uom: "MTS",
    tipo: "HFC",
    seleccionado: false,
    cantidad: "0",
  },
  {
    id: "mat-4",
    codigo: "1033042",
    descripcion: "CABLE TELEF INTERIOR 2/22 AWG",
    uom: "MTS",
    tipo: "HFC",
    seleccionado: false,
    cantidad: "0",
  },
  {
    id: "mat-5",
    codigo: "1004692",
    descripcion: "CABLE UTP CAT5E FTP 4PR/24AWG 04070009",
    uom: "MTS",
    tipo: "HFC-FTTH",
    seleccionado: false,
    cantidad: "0",
  },
  {
    id: "mat-6",
    codigo: "1004838",
    descripcion: "CABLE HDMI CHD1-6 MALE TO MALE 2M",
    uom: "UND",
    tipo: "HFC",
    seleccionado: false,
    cantidad: "0",
  },
  {
    id: "mat-7",
    codigo: "1051697",
    descripcion: "CONTROL REMOTO AN-4803 ECOSS",
    uom: "UND",
    tipo: "HFC",
    seleccionado: false,
    cantidad: "0",
  },
  {
    id: "mat-8",
    codigo: "1062712",
    descripcion: "CONECTOR DE CONTINUIDAD RG6 EX6XL-PLUS",
    uom: "UND",
    tipo: "HFC",
    seleccionado: false,
    cantidad: "0",
  },
  {
    id: "mat-9",
    codigo: "1002900",
    descripcion: "CONECTOR PLUG RJ-45",
    uom: "UND",
    tipo: "HFC-FTTH",
    seleccionado: false,
    cantidad: "0",
  },
  {
    id: "mat-10",
    codigo: "1063021",
    descripcion: "CONECTOR RJ 11",
    uom: "UND",
    tipo: "HFC-FTTH",
    seleccionado: false,
    cantidad: "0",
  },
  {
    id: "mat-11",
    codigo: "1003254",
    descripcion: "DIVISOR INTERIOR 2 VIAS",
    uom: "UND",
    tipo: "HFC",
    seleccionado: false,
    cantidad: "0",
  },
  {
    id: "mat-12",
    codigo: "1003253",
    descripcion: "DIVISOR INTERIOR 3 VIAS",
    uom: "UND",
    tipo: "HFC",
    seleccionado: false,
    cantidad: "0",
  },
];

// Catálogo de herramientas
const catalogoHerramientasInicial: ItemHerramienta[] = [
  {
    id: "herr-1",
    codigo: "H-001",
    descripcion: "ALICATE DE COMPRESIÓN",
    uom: "UND",
    seleccionado: false,
    cantidad: "0",
  },
  {
    id: "herr-2",
    codigo: "H-002",
    descripcion: "DESTORNILLADOR PLANO",
    uom: "UND",
    seleccionado: false,
    cantidad: "0",
  },
  {
    id: "herr-3",
    codigo: "H-003",
    descripcion: "DESTORNILLADOR ESTRELLA",
    uom: "UND",
    seleccionado: false,
    cantidad: "0",
  },
  {
    id: "herr-4",
    codigo: "H-004",
    descripcion: "PELACABLES RG-6",
    uom: "UND",
    seleccionado: false,
    cantidad: "0",
  },
  {
    id: "herr-5",
    codigo: "H-005",
    descripcion: "CRIMPADORA RJ-45",
    uom: "UND",
    seleccionado: false,
    cantidad: "0",
  },
];

// Catálogo de equipos con series
const catalogoEquipos: ItemEquipo[] = [
  {
    id: "equipo-1",
    serie: "3954GM464202082",
    codigo: "4059271",
    descripcion: "MODEM ARRIS TG3442A 32x8 3.1",
    cantidad: "1",
  },
  {
    id: "equipo-2",
    serie: "2AD4GL196701282",
    codigo: "4059271",
    descripcion: "MODEM ARRIS TG3442A 32x8 3.1",
    cantidad: "1",
  },
  {
    id: "equipo-3",
    serie: "3954GM464203146",
    codigo: "4059271",
    descripcion: "MODEM ARRIS TG3442A 32x8 3.1",
    cantidad: "1",
  },
  {
    id: "equipo-4",
    serie: "DM2203718001862",
    codigo: "4050441",
    descripcion: "MODEM SAGEMCOM F3890V3 32X8SB DOCSIS 3.1",
    cantidad: "1",
  },
  {
    id: "equipo-5",
    serie: "DM2110118001445",
    codigo: "4050441",
    descripcion: "MODEM SAGEMCOM F3890V3 32X8SB DOCSIS 3.1",
    cantidad: "1",
  },
  {
    id: "equipo-6",
    serie: "MV2234VR8847",
    codigo: "4007984",
    descripcion: "DECODIFICADOR MOTOROLA HD DCX-525",
    cantidad: "1",
  },
  {
    id: "equipo-7",
    serie: "M91843ERZ794",
    codigo: "4007984",
    descripcion: "DECODIFICADOR MOTOROLA HD DCX-525",
    cantidad: "1",
  },
  {
    id: "equipo-8",
    serie: "4857544386D1EBB4",
    codigo: "4076358",
    descripcion: "ROUTER ONT HG8145X613 50088770 HUAWEI",
    cantidad: "1",
  },
  {
    id: "equipo-9",
    serie: "4857544386CF35B4",
    codigo: "4076358",
    descripcion: "ROUTER ONT HG8145X613 50088770 HUAWEI",
    cantidad: "1",
  },
  {
    id: "equipo-10",
    serie: "4857544386DAB8B4",
    codigo: "4076358",
    descripcion: "ROUTER ONT HG8145X613 50088770 HUAWEI",
    cantidad: "1",
  },
];

const categoriaConfig = {
  MATERIAL: {
    label: "Material",
    color: "#ed6c02",
    icon: "📦",
  },
  HERRAMIENTA: {
    label: "Herramienta",
    color: "#1976d2",
    icon: "🔧",
  },
  EQUIPO: {
    label: "Equipo",
    color: "#2e7d32",
    icon: "⚙️",
  },
};

const entidadConfig = {
  CLARO: {
    label: "CLARO",
    color: "#d32f2f",
    bgColor: "#ffebee",
  },
  LEMCORP: {
    label: "LEMCORP",
    color: "#1976d2",
    bgColor: "#e3f2fd",
  },
};

export default function SolicitudAbastecimiento() {
  const [entidadDestino, setEntidadDestino] = useState<EntidadDestino>("CLARO");
  const [fechaSolicitud, setFechaSolicitud] = useState("");
  const [fechaSolicitudFin, setFechaSolicitudFin] = useState("");
  const [region, setRegion] = useState<string | null>(null);

  // Estados para materiales, herramientas y equipos
  const [materiales, setMateriales] = useState<ItemMaterial[]>(
    catalogoMaterialesInicial
  );
  const [herramientas, setHerramientas] = useState<ItemHerramienta[]>(
    catalogoHerramientasInicial
  );
  const [equipos, setEquipos] = useState<ItemEquipo[]>([]);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFilterInfo, setShowFilterInfo] = useState(false);

  // Estado para el buscador de equipos
  const [searchEquipo, setSearchEquipo] = useState("");
  const [equipoEncontrado, setEquipoEncontrado] = useState<ItemEquipo | null>(
    null
  );

  const handleEntidadChange = (
    _event: React.MouseEvent<HTMLElement>,
    newEntidad: EntidadDestino | null
  ) => {
    if (newEntidad !== null) {
      setMateriales(catalogoMaterialesInicial)
      setHerramientas(catalogoHerramientasInicial)
      setEntidadDestino(newEntidad);
    }
  };

  // Handler para aplicar filtros y obtener consumos del período
  const handleAplicarFiltros = () => {
    // TODO: Aquí iría la llamada al API para obtener consumos del período
    // Simulación de datos de consumo
    const materialesConsumidos = [
      { codigo: "1003101", cantidad: "150" },
      { codigo: "1004692", cantidad: "200" },
      { codigo: "1062712", cantidad: "50" },
    ];

    const herramientasConsumidas = [
      { codigo: "H-001", cantidad: "3" },
      { codigo: "H-004", cantidad: "5" },
    ];

    const equiposConsumidos: ItemEquipo[] = [
      {
        id: "eq-consumed-1",
        serie: "3954GM464202082",
        codigo: "4059271",
        descripcion: "MODEM ARRIS TG3442A 32x8 3.1",
        cantidad: "5",
      },
    ];

    // Actualizar materiales con cantidades consumidas
    setMateriales((prev) =>
      prev.map((mat) => {
        const consumido = materialesConsumidos.find(
          (c) => c.codigo === mat.codigo
        );
        if (consumido) {
          return {
            ...mat,
            seleccionado: true,
            cantidad: consumido.cantidad,
          };
        }
        return mat;
      })
    );

    // Actualizar herramientas con cantidades consumidas
    setHerramientas((prev) =>
      prev.map((herr) => {
        const consumido = herramientasConsumidas.find(
          (c) => c.codigo === herr.codigo
        );
        if (consumido) {
          return {
            ...herr,
            seleccionado: true,
            cantidad: consumido.cantidad,
          };
        }
        return herr;
      })
    );

    // Agregar equipos consumidos
    setEquipos((prev) => [...prev, ...equiposConsumidos]);

    setShowFilterInfo(true);
    setTimeout(() => setShowFilterInfo(false), 5000);
  };

  // Toggle checkbox material
  const toggleMaterialSeleccionado = (id: string) => {
    setMateriales((prev) =>
      prev.map((mat) =>
        mat.id === id ? { ...mat, seleccionado: !mat.seleccionado } : mat
      )
    );
  };

  // Actualizar cantidad material
  const actualizarCantidadMaterial = (id: string, cantidad: string) => {
    setMateriales((prev) =>
      prev.map((mat) => (mat.id === id ? { ...mat, cantidad } : mat))
    );
  };

  // Toggle checkbox herramienta
  const toggleHerramientaSeleccionada = (id: string) => {
    setHerramientas((prev) =>
      prev.map((herr) =>
        herr.id === id ? { ...herr, seleccionado: !herr.seleccionado } : herr
      )
    );
  };

  // Actualizar cantidad herramienta
  const actualizarCantidadHerramienta = (id: string, cantidad: string) => {
    setHerramientas((prev) =>
      prev.map((herr) => (herr.id === id ? { ...herr, cantidad } : herr))
    );
  };

  // Buscar equipo
  const buscarEquipo = () => {
    const equipoEncontrado = catalogoEquipos.find(
      (e) =>
        e.serie.toLowerCase().includes(searchEquipo.toLowerCase()) ||
        e.codigo.toLowerCase().includes(searchEquipo.toLowerCase())
    );
    setEquipoEncontrado(equipoEncontrado || null);
  };

  // Agregar equipo
  const agregarEquipo = () => {
    if (equipoEncontrado) {
      const nuevoEquipo: ItemEquipo = {
        id: `equip-${Date.now()}`,
        serie: equipoEncontrado.serie,
        codigo: equipoEncontrado.codigo,
        descripcion: equipoEncontrado.descripcion,
        cantidad: "",
      };
      setEquipos([...equipos, nuevoEquipo]);
      setSearchEquipo("");
      setEquipoEncontrado(null);
    }
  };

  // Actualizar cantidad equipo
  const actualizarCantidadEquipo = (id: string, cantidad: string) => {
    setEquipos((prev) =>
      prev.map((eq) => (eq.id === id ? { ...eq, cantidad } : eq))
    );
  };

  // Eliminar equipo
  const eliminarEquipo = (id: string) => {
    setEquipos(equipos.filter((eq) => eq.id !== id));
  };

  const handleGuardarBorrador = () => {
    console.log("Guardando borrador...", {
      entidadDestino,
      fechaSolicitud,
      fechaSolicitudFin,
      region,
      materiales: materiales.filter((m) => m.seleccionado),
      herramientas: herramientas.filter((h) => h.seleccionado),
      equipos,
    });
    alert("Borrador guardado correctamente");
  };

  // Exportar Excel por categoría individual
  const exportarMateriales = () => {
    const materialesSeleccionados = materiales.filter((m) => m.seleccionado);
    if (materialesSeleccionados.length === 0) {
      alert("No hay materiales seleccionados para exportar");
      return;
    }
    exportarCategoria(
      materialesSeleccionados.map((m) => ({
        Código: m.codigo,
        Descripción: m.descripcion,
        Cantidad: m.cantidad,
        "Unidad de Medida": m.uom,
        Tipo: m.tipo,
      })),
      "Materiales"
    );
  };

  const exportarHerramientas = () => {
    const herramientasSeleccionadas = herramientas.filter(
      (h) => h.seleccionado
    );
    if (herramientasSeleccionadas.length === 0) {
      alert("No hay herramientas seleccionadas para exportar");
      return;
    }
    exportarCategoria(
      herramientasSeleccionadas.map((h) => ({
        Código: h.codigo,
        Descripción: h.descripcion,
        Cantidad: h.cantidad,
        "Unidad de Medida": h.uom,
      })),
      "Herramientas"
    );
  };

  const exportarEquipos = () => {
    if (equipos.length === 0) {
      alert("No hay equipos agregados para exportar");
      return;
    }
    exportarCategoria(
      equipos.map((e) => ({
        Serie: e.serie,
        Código: e.codigo,
        Descripción: e.descripcion,
        Cantidad: e.cantidad,
      })),
      "Equipos"
    );
  };

  const exportarCategoria = (datos: any[], nombreCategoria: string) => {
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, nombreCategoria);

    const fecha = new Date().toISOString().split("T")[0];
    XLSX.writeFile(
      workbook,
      `Solicitud_${nombreCategoria}_${entidadDestino}_${fecha}.xlsx`
    );

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const materialesSeleccionados = materiales.filter(
    (m) => m.seleccionado
  ).length;
  const herramientasSeleccionadas = herramientas.filter(
    (h) => h.seleccionado
  ).length;

  return (
    <Box
      sx={{
        maxWidth: 1400,
        mx: "auto",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Título Principal */}
      <TitleCard
        icon={<ListAltOutlined sx={{ fontSize: 32 }} />}
        title="Solicitud de Abastecimiento"
        description="Genera solicitudes de materiales, equipos y herramientas para tus proyectos"
      />

      {/* Formulario de Nueva Solicitud */}
      <Card
        elevation={3}
        sx={{
          borderRadius: 4,
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          p: 4,
        }}
      >
        <SectionHeader
          icon={
            <AddCircleOutline sx={{ fontSize: 28, color: "primary.main" }} />
          }
          title="Nueva Solicitud de Abastecimiento"
          subtitle="Completa los datos para generar una solicitud de materiales"
        />

        {/* Mensajes */}
        {showSuccess && (
          <Fade in={showSuccess} timeout={600}>
            <Alert
              severity="success"
              sx={{
                mb: 3,
                borderRadius: 2,
                boxShadow: "rgba(46, 125, 50, 0.15) 0px 4px 16px",
              }}
            >
              <Typography variant="body1" fontWeight={600}>
                ¡Archivo Excel generado exitosamente!
              </Typography>
            </Alert>
          </Fade>
        )}

        {showFilterInfo && (
          <Fade in={showFilterInfo} timeout={600}>
            <Alert
              severity="info"
              sx={{
                mb: 3,
                borderRadius: 2,
                boxShadow: "rgba(2, 136, 209, 0.15) 0px 4px 16px",
              }}
            >
              <Typography variant="body1" fontWeight={600}>
                ✅ Filtros aplicados correctamente
              </Typography>
              <Typography variant="body2">
                Se han cargado los consumos del período seleccionado. Puedes
                ajustar las cantidades según tus necesidades.
              </Typography>
            </Alert>
          </Fade>
        )}

        {/* Selector de Entidad Destino */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <BusinessOutlined sx={{ color: "primary.main", fontSize: 24 }} />
            <Typography variant="subtitle1" fontWeight={600}>
              Entidad de destino
            </Typography>
          </Box>
          <ToggleButtonGroup
            value={entidadDestino}
            exclusive
            onChange={handleEntidadChange}
            aria-label="Entidad destino"
            fullWidth
            sx={{
              gap: 2,
              "& .MuiToggleButton-root": {
                borderRadius: 2,
                border: "2px solid",
                textTransform: "none",
                py: 1.5,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              },
            }}
          >
            <ToggleButton
              value="CLARO"
              sx={{
                borderColor: entidadConfig.CLARO.color,
                "&.Mui-selected": {
                  bgcolor: entidadConfig.CLARO.bgColor,
                  borderColor: entidadConfig.CLARO.color,
                  color: entidadConfig.CLARO.color,
                  fontWeight: 700,
                  "&:hover": {
                    bgcolor: entidadConfig.CLARO.bgColor,
                  },
                },
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography variant="h6" fontWeight={600}>
                  📱 CLARO
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Exporta archivos separados
                </Typography>
              </Box>
            </ToggleButton>

            <ToggleButton
              value="LEMCORP"
              sx={{
                borderColor: entidadConfig.LEMCORP.color,
                "&.Mui-selected": {
                  bgcolor: entidadConfig.LEMCORP.bgColor,
                  borderColor: entidadConfig.LEMCORP.color,
                  color: entidadConfig.LEMCORP.color,
                  fontWeight: 700,
                  "&:hover": {
                    bgcolor: entidadConfig.LEMCORP.bgColor,
                  },
                },
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography variant="h6" fontWeight={600}>
                  🏢 LEMCORP
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Exporta archivo consolidado
                </Typography>
              </Box>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Filtros y Búsqueda */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <FilterListOutlined sx={{ color: "info.main", fontSize: 24 }} />
            <Typography variant="subtitle1" fontWeight={600}>
              Filtros de búsqueda
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              alignItems: "flex-end",
            }}
          >
            <Box sx={{ flex: "1 1 200px" }}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={600}
                mb={1}
              >
                Fecha Inicio
              </Typography>
              <TextField
                type="date"
                fullWidth
                value={fechaSolicitud}
                onChange={(e) => setFechaSolicitud(e.target.value)}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            <Box sx={{ flex: "1 1 200px" }}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={600}
                mb={1}
              >
                Fecha Fin
              </Typography>
              <TextField
                type="date"
                fullWidth
                value={fechaSolicitudFin}
                onChange={(e) => setFechaSolicitudFin(e.target.value)}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            <Box sx={{ flex: "1 1 250px" }}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={600}
                mb={1}
              >
                Región
              </Typography>
              <Autocomplete
                value={region}
                onChange={(_, newValue) => setRegion(newValue)}
                options={regionesDisponibles}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Selecciona región"
                    size="small"
                  />
                )}
                size="small"
              />
            </Box>
            <ButtonBase
              onClick={handleAplicarFiltros}
              startIcon={<SearchOutlined />}
              label="Busqueda"
            />
            {/* <Button
              variant="contained"
              size="large"
              startIcon={<SearchOutlined />}
              onClick={handleAplicarFiltros}
              sx={{
                height: 40,
                px: 4,
                textTransform: "none",
              }}
            >
              APLICAR FILTROS
            </Button> */}
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECCIÓN MATERIALES */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ color: categoriaConfig.MATERIAL.color }}
              >
                {categoriaConfig.MATERIAL.icon} Materiales
              </Typography>
              <Chip
                label={`${materialesSeleccionados} seleccionados`}
                size="small"
                sx={{
                  bgcolor: categoriaConfig.MATERIAL.color,
                  color: "white",
                  fontWeight: 600,
                }}
              />
            </Box>
            <ButtonBase
              variant="contained"
              size="small"
              label="Exportar materiales"
              startIcon={<FileDownloadOutlined />}
              onClick={exportarMateriales}
              disabled={materialesSeleccionados === 0}
              sx={{
                bgcolor: categoriaConfig.MATERIAL.color,
                "&:hover": {
                  bgcolor: categoriaConfig.MATERIAL.color,
                  filter: "brightness(0.9)",
                },
                textTransform: "none",
              }}
            />
          </Box>

          <TableContainer
            component={Paper}
            sx={{
              maxHeight: 400,
              border: "2px solid",
              borderColor: `${categoriaConfig.MATERIAL.color}30`,
            }}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    padding="checkbox"
                    sx={{ bgcolor: "background.paper" }}
                  >
                    <Checkbox disabled />
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 700, bgcolor: "background.paper" }}
                  >
                    Código
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 700, bgcolor: "background.paper" }}
                  >
                    Descripción
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 700, bgcolor: "background.paper" }}
                  >
                    Tipo
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 700, bgcolor: "background.paper" }}
                  >
                    UOM
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      bgcolor: "background.paper",
                      width: 150,
                    }}
                  >
                    Cantidad
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materiales.map((material) => (
                  <TableRow
                    key={material.id}
                    sx={{
                      "&:hover": { bgcolor: "action.hover" },
                      bgcolor: material.seleccionado
                        ? `${categoriaConfig.MATERIAL.color}10`
                        : "inherit",
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={material.seleccionado}
                        onChange={() => toggleMaterialSeleccionado(material.id)}
                        sx={{
                          color: categoriaConfig.MATERIAL.color,
                          "&.Mui-checked": {
                            color: categoriaConfig.MATERIAL.color,
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {material.codigo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {material.descripcion}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {material.tipo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{material.uom}</Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        size="small"
                        value={material.cantidad}
                        onChange={(e) =>
                          actualizarCantidadMaterial(
                            material.id,
                            e.target.value
                          )
                        }
                        disabled={!material.seleccionado}
                        inputProps={{ min: 0 }}
                        sx={{ width: "100%" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* SECCIÓN HERRAMIENTAS */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ color: categoriaConfig.HERRAMIENTA.color }}
              >
                {categoriaConfig.HERRAMIENTA.icon} Herramientas
              </Typography>
              <Chip
                label={`${herramientasSeleccionadas} seleccionadas`}
                size="small"
                sx={{
                  bgcolor: categoriaConfig.HERRAMIENTA.color,
                  color: "white",
                  fontWeight: 600,
                }}
              />
            </Box>
            <ButtonBase
              variant="contained"
              size="small"
              label="Exportar Herramientas"
              startIcon={<FileDownloadOutlined />}
              onClick={exportarHerramientas}
              disabled={herramientasSeleccionadas === 0}
              sx={{
                bgcolor: categoriaConfig.HERRAMIENTA.color,
                "&:hover": {
                  bgcolor: categoriaConfig.HERRAMIENTA.color,
                  filter: "brightness(0.9)",
                },
                textTransform: "none",
              }}
            />
          </Box>

          <TableContainer
            component={Paper}
            sx={{
              maxHeight: 400,
              border: "2px solid",
              borderColor: `${categoriaConfig.HERRAMIENTA.color}30`,
            }}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    padding="checkbox"
                    sx={{ bgcolor: "background.paper" }}
                  >
                    <Checkbox disabled />
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 700, bgcolor: "background.paper" }}
                  >
                    Código
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 700, bgcolor: "background.paper" }}
                  >
                    Descripción
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 700, bgcolor: "background.paper" }}
                  >
                    UOM
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      bgcolor: "background.paper",
                      width: 150,
                    }}
                  >
                    Cantidad
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {herramientas.map((herramienta) => (
                  <TableRow
                    key={herramienta.id}
                    sx={{
                      "&:hover": { bgcolor: "action.hover" },
                      bgcolor: herramienta.seleccionado
                        ? `${categoriaConfig.HERRAMIENTA.color}10`
                        : "inherit",
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={herramienta.seleccionado}
                        onChange={() =>
                          toggleHerramientaSeleccionada(herramienta.id)
                        }
                        sx={{
                          color: categoriaConfig.HERRAMIENTA.color,
                          "&.Mui-checked": {
                            color: categoriaConfig.HERRAMIENTA.color,
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {herramienta.codigo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {herramienta.descripcion}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{herramienta.uom}</Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        size="small"
                        value={herramienta.cantidad}
                        onChange={(e) =>
                          actualizarCantidadHerramienta(
                            herramienta.id,
                            e.target.value
                          )
                        }
                        disabled={!herramienta.seleccionado}
                        inputProps={{ min: 0 }}
                        sx={{ width: "100%" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* SECCIÓN EQUIPOS */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ color: categoriaConfig.EQUIPO.color }}
              >
                {categoriaConfig.EQUIPO.icon} Equipos
              </Typography>
              <Chip
                label={`${equipos.length} agregados`}
                size="small"
                sx={{
                  bgcolor: categoriaConfig.EQUIPO.color,
                  color: "white",
                  fontWeight: 600,
                }}
              />
            </Box>
            <ButtonBase
              variant="contained"
              label="Exportar Equipos"
              size="small"
              startIcon={<FileDownloadOutlined />}
              onClick={exportarEquipos}
              disabled={equipos.length === 0}
              sx={{
                bgcolor: categoriaConfig.EQUIPO.color,
                "&:hover": {
                  bgcolor: categoriaConfig.EQUIPO.color,
                  filter: "brightness(0.9)",
                },
                textTransform: "none",
              }}
            />
          
          </Box>

          {/* Buscador inline de equipos */}
          <Box
            sx={{
              p: 3,
              mb: 2,
              bgcolor: `${categoriaConfig.EQUIPO.color}10`,
              borderRadius: 2,
              border: "2px solid",
              borderColor: `${categoriaConfig.EQUIPO.color}30`,
            }}
          >
            <Typography variant="subtitle2" fontWeight={600} mb={2}>
              🔍 Buscar equipo por SKU o Serie
            </Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
              <TextField
                fullWidth
                placeholder="Ingresa SKU o número de serie..."
                value={searchEquipo}
                onChange={(e) => setSearchEquipo(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") buscarEquipo();
                }}
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={buscarEquipo}
                        edge="end"
                        size="small"
                      >
                        <SearchOutlined />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                onClick={agregarEquipo}
                disabled={!equipoEncontrado}
                sx={{
                  minWidth: 120,
                  bgcolor: categoriaConfig.EQUIPO.color,
                  "&:hover": {
                    bgcolor: categoriaConfig.EQUIPO.color,
                    filter: "brightness(0.9)",
                  },
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Agregar
              </Button>
            </Box>

            {equipoEncontrado && (
              <Fade in={true}>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    bgcolor: "success.lighter",
                    borderRadius: 2,
                    border: "2px solid",
                    borderColor: "success.main",
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="success.dark"
                    mb={1}
                  >
                    ✅ Equipo Encontrado
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                  >
                    <Typography variant="body2">
                      <strong>Serie:</strong> {equipoEncontrado.serie}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Código:</strong> {equipoEncontrado.codigo}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Descripción:</strong>{" "}
                      {equipoEncontrado.descripcion}
                    </Typography>
                  </Box>
                </Box>
              </Fade>
            )}

            {searchEquipo && !equipoEncontrado && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                No se encontró ningún equipo con ese SKU o serie.
              </Alert>
            )}
          </Box>

          {/* Lista de equipos agregados */}
          {equipos.length > 0 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {equipos.map((equipo, index) => (
                <Grow key={equipo.id} in={true} timeout={300 + index * 100}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                      p: 2,
                      bgcolor: "background.default",
                      borderRadius: 2,
                      border: "2px solid",
                      borderColor: `${categoriaConfig.EQUIPO.color}30`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: `0 4px 12px ${categoriaConfig.EQUIPO.color}40`,
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    <TextField
                      placeholder="Serie"
                      size="small"
                      value={equipo.serie}
                      disabled
                      sx={{ flex: "0 0 180px" }}
                    />
                    <TextField
                      placeholder="Código"
                      size="small"
                      value={equipo.codigo}
                      disabled
                      sx={{ flex: "0 0 120px" }}
                    />
                    <TextField
                      placeholder="Descripción del equipo"
                      fullWidth
                      size="small"
                      value={equipo.descripcion}
                      disabled
                      sx={{ flex: "1 1 auto" }}
                    />
                    <TextField
                      placeholder="Cantidad"
                      size="small"
                      type="number"
                      value={equipo.cantidad}
                      onChange={(e) =>
                        actualizarCantidadEquipo(equipo.id, e.target.value)
                      }
                      sx={{ flex: "0 0 120px" }}
                      inputProps={{ min: 1 }}
                    />
                    <IconButton
                      color="error"
                      onClick={() => eliminarEquipo(equipo.id)}
                      sx={{
                        "&:hover": {
                          bgcolor: "error.lighter",
                        },
                      }}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </Box>
                </Grow>
              ))}
            </Box>
          )}

          {equipos.length === 0 && (
            <Box
              sx={{
                textAlign: "center",
                py: 4,
                color: "text.secondary",
                bgcolor: "background.default",
                borderRadius: 2,
              }}
            >
              <Typography variant="body2">
                No hay equipos agregados. Usa el buscador para agregar equipos.
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Botones de Acción */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <ButtonBase
            variant="outlined"
            label="Guardar Borrador"
            startIcon={<SaveOutlined />}
            onClick={handleGuardarBorrador}
            sx={{
              textTransform: "none",
              // fontWeight: 600,
              px: 4,
              py: 1.2,
              color: "primary.main",
            }}
          />

          <ButtonBase label="Generar solicitud" onClick={() => {}} />
        </Box>
      </Card>
    </Box>
  );
}
