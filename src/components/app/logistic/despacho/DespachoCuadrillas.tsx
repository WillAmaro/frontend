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
  Alert,
  Fade,
  Grow,
  Chip,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import {
  LocalShippingOutlined,
  AddCircleOutline,
  DeleteOutline,
  SaveOutlined,
  CheckCircleOutline,
  InventoryOutlined,
  SearchOutlined,
  CloseOutlined,
  InfoOutlined,
  CalendarTodayOutlined,
  PersonOutlined,
  FilterListOutlined,
} from "@mui/icons-material";
import { TitleCard } from "@/src/components/base/TitleCard";
import { SectionHeader } from "@/src/components/base/SectionHeader";

interface ItemMaterial {
  id: string;
  codigo: string;
  descripcion: string;
  uom: string;
  tipo: "HFC" | "FTTH" | "HFC-FTTH" | "";
  cantidad: string;
}

interface ItemEquipo {
  id: string;
  serie: string;
  codigo: string;
  descripcion: string;
  cantidad: string;
}

interface DespachoGuardado {
  id: string;
  fecha: string;
  usuario: string;
  tecnico: string;
  totalMaterial: number;
  totalEquipo: number;
}

// Datos de ejemplo para autocomplete
const tecnicosDisponibles = [
  "Juan Pérez",
  "María García",
  "Carlos López",
  "Ana Martínez",
  "Pedro Sánchez",
];

// Catálogo completo de materiales precargados
const catalogoMaterialesCompleto: ItemMaterial[] = [
  {
    id: "mat-1",
    codigo: "1002950",
    descripcion: "ATADOR DE IDENTIFICACION DE ABONADO",
    uom: "UND",
    tipo: "HFC",
    cantidad: "0",
  },
  {
    id: "mat-2",
    codigo: "1004705",
    descripcion: "CABLE COAXIAL BLANCO RG-6 S/MENSAJERO",
    uom: "MTS",
    tipo: "HFC",
    cantidad: "0",
  },
  {
    id: "mat-3",
    codigo: "1003101",
    descripcion: "CABLE COAXIAL RG-6 AUTOSOPORTADO",
    uom: "MTS",
    tipo: "HFC",
    cantidad: "0",
  },
  {
    id: "mat-4",
    codigo: "1033042",
    descripcion: "CABLE TELEF INTERIOR 2/22 AWG",
    uom: "MTS",
    tipo: "HFC",
    cantidad: "0",
  },
  {
    id: "mat-5",
    codigo: "1004692",
    descripcion: "CABLE UTP CAT5E FTP 4PR/24AWG 04070009",
    uom: "MTS",
    tipo: "HFC-FTTH",
    cantidad: "0",
  },
  {
    id: "mat-6",
    codigo: "1004838",
    descripcion: "CABLE HDMI CHD1-6 MALE TO MALE 2M",
    uom: "UND",
    tipo: "HFC",
    cantidad: "0",
  },
  {
    id: "mat-7",
    codigo: "1051697",
    descripcion: "CONTROL REMOTO AN-4803 ECOSS",
    uom: "UND",
    tipo: "HFC",
    cantidad: "0",
  },
  {
    id: "mat-8",
    codigo: "1062712",
    descripcion: "CONECTOR DE CONTINUIDAD RG6 EX6XL-PLUS",
    uom: "UND",
    tipo: "HFC",
    cantidad: "0",
  },
  {
    id: "mat-9",
    codigo: "1002900",
    descripcion: "CONECTOR PLUG RJ-45",
    uom: "UND",
    tipo: "HFC-FTTH",
    cantidad: "0",
  },
  {
    id: "mat-10",
    codigo: "1063021",
    descripcion: "CONECTOR RJ 11",
    uom: "UND",
    tipo: "HFC-FTTH",
    cantidad: "0",
  },
  {
    id: "mat-11",
    codigo: "1003254",
    descripcion: "DIVISOR INTERIOR 2 VIAS",
    uom: "UND",
    tipo: "HFC",
    cantidad: "0",
  },
  {
    id: "mat-12",
    codigo: "1003253",
    descripcion: "DIVISOR INTERIOR 3 VIAS",
    uom: "UND",
    tipo: "HFC",
    cantidad: "0",
  },
  {
    id: "mat-13",
    codigo: "1004529",
    descripcion: "ROSETA TELEFONICA CON GEL",
    uom: "UND",
    tipo: "HFC",
    cantidad: "0",
  },
  {
    id: "mat-14",
    codigo: "1004521",
    descripcion: "SUJETADOR DE ANCLAJE",
    uom: "UND",
    tipo: "HFC-FTTH",
    cantidad: "0",
  },
  {
    id: "mat-15",
    codigo: "1004520",
    descripcion: "SUJETADOR DE TRAMO-CHAPA Q",
    uom: "UND",
    tipo: "HFC-FTTH",
    cantidad: "0",
  },
  {
    id: "mat-16",
    codigo: "1063013",
    descripcion: "CONECTOR FMC2104-SA 14135787 HUAWEI",
    uom: "UND",
    tipo: "FTTH",
    cantidad: "0",
  },
  {
    id: "mat-17",
    codigo: "1044835",
    descripcion: "PATCHCORD SM SC/APC-SC/APC 3MM 3M ONT",
    uom: "UND",
    tipo: "FTTH",
    cantidad: "0",
  },
  {
    id: "mat-18",
    codigo: "1042681",
    descripcion: "ROSETA ATB3101 SIN PIGTAIL",
    uom: "UND",
    tipo: "FTTH",
    cantidad: "0",
  },
  {
    id: "mat-19",
    codigo: "1063891",
    descripcion: "CAJA DE EMPALME DROP BOX-1 QTK",
    uom: "UND",
    tipo: "FTTH",
    cantidad: "0",
  },
  {
    id: "mat-20",
    codigo: "1063890",
    descripcion: "CONTROL REMOTO C3401 180000518128 ZTE",
    uom: "UND",
    tipo: "FTTH",
    cantidad: "0",
  },
  {
    id: "mat-21",
    codigo: "1062883",
    descripcion: "CABLE FO FASTCONNECT DROP 14138979 50M",
    uom: "UND",
    tipo: "FTTH",
    cantidad: "0",
  },
  {
    id: "mat-22",
    codigo: "1062884",
    descripcion: "CABLE FO FASTCONNECT DROP 14138979 80M",
    uom: "UND",
    tipo: "FTTH",
    cantidad: "0",
  },
  {
    id: "mat-23",
    codigo: "1062885",
    descripcion: "CABLE FO FASTCONNECT DROP 14138979 100M",
    uom: "UND",
    tipo: "FTTH",
    cantidad: "0",
  },
  {
    id: "mat-24",
    codigo: "1062886",
    descripcion: "CABLE FO FASTCONNECT DROP 14138979 150M",
    uom: "UND",
    tipo: "FTTH",
    cantidad: "0",
  },
  {
    id: "mat-25",
    codigo: "1062887",
    descripcion: "CABLE FO FASTCONNECT DROP 14138979 220M",
    uom: "UND",
    tipo: "FTTH",
    cantidad: "0",
  },
  {
    id: "mat-26",
    codigo: "1063812",
    descripcion: "CABLE FO FASTCONNECT DROP 14138979 300M",
    uom: "UND",
    tipo: "FTTH",
    cantidad: "0",
  },
  {
    id: "mat-27",
    codigo: "1062235",
    descripcion: "CABLE FO ECS DROP 300M ECOSS (INDOR)",
    uom: "UND",
    tipo: "FTTH",
    cantidad: "0",
  },
  {
    id: "mat-28",
    codigo: "1053621",
    descripcion: "TELEFONO ECS622 ECOSS",
    uom: "UND",
    tipo: "HFC-FTTH",
    cantidad: "0",
  },
  {
    id: "mat-29",
    codigo: "501217",
    descripcion: "GRAPA PLASTICA PARA CABLE RG-6 BLANCA",
    uom: "UND",
    tipo: "",
    cantidad: "0",
  },
  {
    id: "mat-30",
    codigo: "501021",
    descripcion: "AMARRE PLASTICO 15 CMS",
    uom: "UND",
    tipo: "",
    cantidad: "0",
  },
  {
    id: "mat-31",
    codigo: "501120",
    descripcion: "CINTA ADHESIVA AISLANTE COLOR NEGRO",
    uom: "UND",
    tipo: "",
    cantidad: "0",
  },
  {
    id: "mat-32",
    codigo: "SUM-0002",
    descripcion: "CINTA DOBLE CONTACTO 3/4 X 5MT",
    uom: "UND",
    tipo: "",
    cantidad: "0",
  },
];

// Catálogo completo de equipos disponibles
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

type FiltroTipo = "TODOS" | "HFC" | "FTTH" | "HFC-FTTH" | "OTROS";

export default function DespachoCuadrillas() {
  const [tecnico, setTecnico] = useState<string | null>(null);
  const [fechaDespacho, setFechaDespacho] = useState("");
  const [dni, setDni] = useState("");

  // Inicializar con todos los materiales precargados
  const [itemsMaterial, setItemsMaterial] = useState<ItemMaterial[]>(
    catalogoMaterialesCompleto
  );
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>("TODOS");
  const [searchMaterial, setSearchMaterial] = useState("");

  const [itemsEquipo, setItemsEquipo] = useState<ItemEquipo[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [despachoGuardado, setDespachoGuardado] =
    useState<DespachoGuardado | null>(null);

  // Estados del modal
  const [openModal, setOpenModal] = useState(false);
  const [searchSerie, setSearchSerie] = useState("");
  const [equiposFiltrados, setEquiposFiltrados] = useState<ItemEquipo[]>([]);

  // Funciones para Material
  const actualizarItemMaterial = (
    id: string,
    campo: keyof ItemMaterial,
    valor: string
  ) => {
    setItemsMaterial(
      itemsMaterial.map((item) =>
        item.id === id ? { ...item, [campo]: valor } : item
      )
    );
  };

  const handleFiltroTipoChange = (
    _event: React.MouseEvent<HTMLElement>,
    newFiltro: FiltroTipo | null
  ) => {
    if (newFiltro !== null) {
      setFiltroTipo(newFiltro);
    }
  };

  const getMaterialesFiltrados = () => {
    let materialesFiltrados = itemsMaterial;

    // Filtrar por tipo
    if (filtroTipo !== "TODOS") {
      if (filtroTipo === "OTROS") {
        materialesFiltrados = materialesFiltrados.filter(
          (item) => item.tipo === ""
        );
      } else {
        materialesFiltrados = materialesFiltrados.filter((item) =>
          item.tipo.includes(filtroTipo)
        );
      }
    }

    // Filtrar por búsqueda
    if (searchMaterial.trim()) {
      materialesFiltrados = materialesFiltrados.filter(
        (item) =>
          item.codigo.toLowerCase().includes(searchMaterial.toLowerCase()) ||
          item.descripcion.toLowerCase().includes(searchMaterial.toLowerCase())
      );
    }

    return materialesFiltrados;
  };

  // Funciones para Equipo
  const abrirModalEquipo = () => {
    setOpenModal(true);
    setSearchSerie("");
    setEquiposFiltrados([]);
  };

  const cerrarModalEquipo = () => {
    setOpenModal(false);
    setSearchSerie("");
    setEquiposFiltrados([]);
  };

  const buscarEquipoPorSerie = () => {
    if (!searchSerie.trim()) {
      setEquiposFiltrados([]);
      return;
    }

    const resultados = catalogoEquipos.filter((equipo) =>
      equipo.serie.toLowerCase().includes(searchSerie.toLowerCase())
    );
    setEquiposFiltrados(resultados);
  };

  const agregarEquipoDesdeModal = (equipo: ItemEquipo) => {
    const yaExiste = itemsEquipo.some((item) => item.serie === equipo.serie);

    if (yaExiste) {
      alert("Este equipo ya ha sido agregado al despacho");
      return;
    }

    const nuevoEquipo = {
      ...equipo,
      id: `equipo-desp-${Date.now()}`,
    };

    setItemsEquipo([...itemsEquipo, nuevoEquipo]);
    cerrarModalEquipo();
  };

  const eliminarItemEquipo = (id: string) => {
    setItemsEquipo(itemsEquipo.filter((item) => item.id !== id));
  };

  const actualizarItemEquipo = (
    id: string,
    campo: keyof ItemEquipo,
    valor: string
  ) => {
    setItemsEquipo(
      itemsEquipo.map((item) =>
        item.id === id ? { ...item, [campo]: valor } : item
      )
    );
  };

  const handleGuardarBorrador = () => {
    console.log("Guardando borrador...", {
      tecnico,
      fechaDespacho,
      dni,
      itemsMaterial,
      itemsEquipo,
    });
    alert("Borrador guardado correctamente");
  };

  const handleGuardarDespacho = () => {
    // Filtrar solo los materiales con cantidad > 0
    const materialesConCantidad = itemsMaterial.filter(
      (item) => parseFloat(item.cantidad) > 0
    );

    console.log("Guardando despacho...", {
      tecnico,
      fechaDespacho,
      dni,
      itemsMaterial: materialesConCantidad,
      itemsEquipo,
    });

    const nuevoDespacho: DespachoGuardado = {
      id: `DESP-${Date.now()}`,
      fecha: new Date().toLocaleString("es-PE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      usuario: "Usuario Actual",
      tecnico: tecnico || "N/A",
      totalMaterial: getTotalMaterial(),
      totalEquipo: itemsEquipo.length,
    };

    setDespachoGuardado(nuevoDespacho);
    setShowSuccess(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getTotalMaterial = () => {
    return itemsMaterial.reduce(
      (acc, item) => acc + (parseFloat(item.cantidad) || 0),
      0
    );
  };

  const getTotalMaterialesConCantidad = () => {
    return itemsMaterial.filter((item) => parseFloat(item.cantidad) > 0).length;
  };

  const materialesFiltrados = getMaterialesFiltrados();

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
        icon={<LocalShippingOutlined sx={{ fontSize: 32 }} />}
        title="Despacho a Cuadrillas"
        description="Gestión de despacho de materiales y equipos a técnicos de campo"
      />

      {/* Panel Informativo de Despacho Guardado */}
      {showSuccess && despachoGuardado && (
        <Grow in={showSuccess} timeout={800}>
          <Box>
            {/* Alert de Éxito */}
            <Alert
              severity="success"
              icon={<CheckCircleOutline fontSize="large" />}
              sx={{
                mb: 3,
                borderRadius: 3,
                boxShadow: "rgba(46, 125, 50, 0.15) 0px 4px 16px",
              }}
            >
              <Typography variant="h6" fontWeight={600} gutterBottom>
                ¡Despacho guardado exitosamente!
              </Typography>
              <Typography variant="body2">
                El despacho ha sido registrado correctamente en el sistema.
              </Typography>
            </Alert>

            {/* Tarjeta con Información del Despacho */}
            <Card
              elevation={3}
              sx={{
                borderRadius: 4,
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                p: 4,
                bgcolor: "background.paper",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <InfoOutlined sx={{ color: "info.main", fontSize: 32 }} />
                <Typography variant="h6" fontWeight={600}>
                  Información del Despacho
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                {/* Código de Despacho */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    bgcolor: "action.hover",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    fontWeight={600}
                  >
                    Código de Despacho:
                  </Typography>
                  <Chip
                    label={despachoGuardado.id}
                    color="primary"
                    sx={{ fontWeight: 700, fontSize: 14 }}
                  />
                </Box>

                {/* Fecha y Usuario */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 4,
                    flexWrap: "wrap",
                    p: 2,
                    bgcolor: "background.default",
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <CalendarTodayOutlined
                      sx={{ color: "text.secondary", fontSize: 20 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Fecha:
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {despachoGuardado.fecha}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <PersonOutlined
                      sx={{ color: "text.secondary", fontSize: 20 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Registrado por:
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {despachoGuardado.usuario}
                    </Typography>
                  </Box>
                </Box>

                {/* Técnico y Totales */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 4,
                    flexWrap: "wrap",
                    p: 2,
                    bgcolor: "background.default",
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <PersonOutlined
                      sx={{ color: "primary.main", fontSize: 20 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Técnico:
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {despachoGuardado.tecnico}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <InventoryOutlined
                      sx={{ color: "primary.main", fontSize: 20 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Total Materiales:
                    </Typography>
                    <Chip
                      label={despachoGuardado.totalMaterial}
                      color="primary"
                      size="small"
                      sx={{ fontWeight: 700 }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <LocalShippingOutlined
                      sx={{ color: "success.main", fontSize: 20 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Total Equipos:
                    </Typography>
                    <Chip
                      label={despachoGuardado.totalEquipo}
                      color="success"
                      size="small"
                      sx={{ fontWeight: 700 }}
                    />
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        </Grow>
      )}

      {/* Formulario Principal */}
      <Card
        elevation={3}
        sx={{
          borderRadius: 4,
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          p: 4,
        }}
      >
        {/* Datos del Técnico */}
        <SectionHeader
          icon={
            <LocalShippingOutlined
              sx={{ fontSize: 28, color: "primary.main" }}
            />
          }
          title="Datos del Técnico"
          subtitle="Selecciona el técnico y fecha para el despacho"
        />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 4,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ flex: "1 1 250px" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={600}
              mb={1}
            >
              Técnico*
            </Typography>
            <Autocomplete
              value={tecnico}
              onChange={(_, newValue) => setTecnico(newValue)}
              options={tecnicosDisponibles}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Selecciona técnico"
                  size="small"
                />
              )}
              size="small"
            />
          </Box>

          <Box sx={{ flex: "1 1 150px" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={600}
              mb={1}
            >
              DNI
            </Typography>
            <TextField
              fullWidth
              placeholder="DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              size="small"
              disabled={!tecnico}
            />
          </Box>

          <Box sx={{ flex: "1 1 180px" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={600}
              mb={1}
            >
              Fecha
            </Typography>
            <TextField
              type="date"
              fullWidth
              value={fechaDespacho}
              onChange={(e) => setFechaDespacho(e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Sección: Items a Despachar - MATERIAL */}
        <SectionHeader
          icon={<InventoryOutlined sx={{ fontSize: 24, color: "info.main" }} />}
          title="Materiales a Despachar"
          subtitle="Catálogo completo de materiales - Ingresa las cantidades necesarias"
        />

        {/* Filtros y Búsqueda */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 2,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FilterListOutlined sx={{ color: "text.secondary" }} />
              <Typography variant="body2" fontWeight={600}>
                Filtrar por tipo:
              </Typography>
            </Box>
            <ToggleButtonGroup
              value={filtroTipo}
              exclusive
              onChange={handleFiltroTipoChange}
              size="small"
            >
              <ToggleButton value="TODOS">Todos</ToggleButton>
              <ToggleButton value="HFC">HFC</ToggleButton>
              <ToggleButton value="FTTH">FTTH</ToggleButton>
              <ToggleButton value="HFC-FTTH">HFC-FTTH</ToggleButton>
              <ToggleButton value="OTROS">Otros</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <TextField
            fullWidth
            placeholder="Buscar por código o descripción..."
            value={searchMaterial}
            onChange={(e) => setSearchMaterial(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <SearchOutlined sx={{ mr: 1, color: "text.secondary" }} />
              ),
            }}
          />
        </Box>

        {/* Header de la tabla Material */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mb: 1,
            p: 1.5,
            bgcolor: "action.hover",
            borderRadius: 1,
            fontWeight: 600,
          }}
        >
          <Box sx={{ flex: "0 0 100px" }}>
            <Typography variant="body2" fontWeight={700}>
              CÓDIGO
            </Typography>
          </Box>
          <Box sx={{ flex: "2 1 300px" }}>
            <Typography variant="body2" fontWeight={700}>
              DESCRIPCIÓN
            </Typography>
          </Box>
          <Box sx={{ flex: "0 0 80px" }}>
            <Typography variant="body2" fontWeight={700}>
              U.M.
            </Typography>
          </Box>
          <Box sx={{ flex: "0 0 100px" }}>
            <Typography variant="body2" fontWeight={700}>
              TIPO
            </Typography>
          </Box>
          <Box sx={{ flex: "0 0 100px" }}>
            <Typography variant="body2" fontWeight={700}>
              CANTIDAD
            </Typography>
          </Box>
        </Box>

        {/* Filas de Material */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mb: 3,
            maxHeight: 500,
            overflowY: "auto",
            pr: 1,
          }}
        >
          {materialesFiltrados.map((item, index) => (
            <Fade key={item.id} in={true} timeout={300 + index * 20}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  p: 1.5,
                  bgcolor:
                    parseFloat(item.cantidad) > 0
                      ? "primary.50"
                      : "background.default",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor:
                    parseFloat(item.cantidad) > 0 ? "primary.main" : "divider",
                  transition: "all 0.2s ease",
                }}
              >
                <Box sx={{ flex: "0 0 100px" }}>
                  <Typography variant="body2" fontWeight={600}>
                    {item.codigo}
                  </Typography>
                </Box>
                <Box sx={{ flex: "2 1 300px" }}>
                  <Typography variant="body2">{item.descripcion}</Typography>
                </Box>
                <Box sx={{ flex: "0 0 80px" }}>
                  <Chip label={item.uom} size="small" variant="outlined" />
                </Box>
                <Box sx={{ flex: "0 0 100px" }}>
                  {item.tipo && (
                    <Chip
                      label={item.tipo}
                      size="small"
                      color={
                        item.tipo === "HFC"
                          ? "primary"
                          : item.tipo === "FTTH"
                          ? "success"
                          : "info"
                      }
                    />
                  )}
                </Box>
                <Box sx={{ flex: "0 0 100px" }}>
                  <TextField
                    placeholder="0"
                    fullWidth
                    size="small"
                    type="number"
                    value={item.cantidad}
                    onChange={(e) =>
                      actualizarItemMaterial(
                        item.id,
                        "cantidad",
                        e.target.value
                      )
                    }
                    inputProps={{ min: 0 }}
                  />
                </Box>
              </Box>
            </Fade>
          ))}
        </Box>

        {/* Resumen Material */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            p: 2,
            bgcolor: "primary.50",
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 4 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Items con cantidad
              </Typography>
              <Typography variant="h6" fontWeight={600} color="primary">
                {getTotalMaterialesConCantidad()}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total unidades
              </Typography>
              <Typography variant="h6" fontWeight={600} color="primary">
                {getTotalMaterial()}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Sección: EQUIPO */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="subtitle1" fontWeight={600} color="success.main">
            EQUIPOS
          </Typography>
          {/* <Button
            size="small"
            variant="outlined"
            color="success"
            startIcon={<AddCircleOutline />}
            onClick={abrirModalEquipo}
            sx={{ textTransform: "none" }}
          >
            Agregar Equipo
          </Button> */}
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          mb={2}
          sx={{ fontStyle: "italic" }}
        >
          Busca equipos por número de serie en el catálogo disponible
        </Typography>

        {/* Campo de Búsqueda */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Ingresa el número de serie del equipo"
            value={searchSerie}
            onChange={(e) => {
              setSearchSerie(e.target.value);

              if (!e.target.value.trim()) {
                setEquiposFiltrados([]);
                return;
              }
              const resultados = catalogoEquipos.filter((equipo) =>
                equipo.serie
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              );
              setEquiposFiltrados(resultados);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                buscarEquipoPorSerie();
              }
            }}
            size="small"
          />
          <Button
            variant="contained"
            startIcon={<SearchOutlined />}
            onClick={buscarEquipoPorSerie}
            sx={{ textTransform: "none", px: 3 }}
          >
            Buscar
          </Button>
        </Box>

        {/* Resultados de Búsqueda */}
        {equiposFiltrados.length > 0 ? (
          <TableContainer
            component={Paper}
            sx={{ borderRadius: 2, maxHeight: 400 ,mb:3}}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="body2" fontWeight={700}>
                      SERIE
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={700}>
                      CÓDIGO
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={700}>
                      DESCRIPCIÓN
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" fontWeight={700}>
                      ACCIÓN
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {equiposFiltrados.map((equipo) => (
                  <TableRow
                    key={equipo.id}
                    hover
                    sx={{
                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {equipo.serie}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{equipo.codigo}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {equipo.descripcion}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => agregarEquipoDesdeModal(equipo)}
                        sx={{ textTransform: "none" }}
                      >
                        Agregar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : searchSerie && equiposFiltrados.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 4,
              bgcolor: "background.default",
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              No se encontraron equipos con la serie: "{searchSerie}"
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              py: 4,
              bgcolor: "background.default",
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Ingresa un número de serie y haz clic en buscar
            </Typography>
          </Box>
        )}

        {/* Lista de Equipos Agregados */}
        {itemsEquipo.length > 0 ? (
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}
          >
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                p: 1.5,
                bgcolor: "success.50",
                borderRadius: 1,
                fontWeight: 600,
              }}
            >
              <Box sx={{ flex: "1 1 150px" }}>
                <Typography variant="body2" fontWeight={700}>
                  SERIE
                </Typography>
              </Box>
              <Box sx={{ flex: "0 0 120px" }}>
                <Typography variant="body2" fontWeight={700}>
                  CÓDIGO
                </Typography>
              </Box>
              <Box sx={{ flex: "2 1 300px" }}>
                <Typography variant="body2" fontWeight={700}>
                  DESCRIPCIÓN
                </Typography>
              </Box>
              <Box sx={{ flex: "0 0 100px" }}>
                <Typography variant="body2" fontWeight={700}>
                  CANTIDAD
                </Typography>
              </Box>
              <Box sx={{ flex: "0 0 80px", textAlign: "center" }}>
                <Typography variant="body2" fontWeight={700}>
                  ACCIÓN
                </Typography>
              </Box>
            </Box>

            {/* Filas */}
            {itemsEquipo.map((item, index) => (
              <Grow key={item.id} in={true} timeout={300 + index * 100}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    p: 1.5,
                    bgcolor: "background.default",
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "success.light",
                  }}
                >
                  <Box sx={{ flex: "1 1 150px" }}>
                    <Typography variant="body2" fontWeight={600}>
                      {item.serie}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: "0 0 120px" }}>
                    <Typography variant="body2">{item.codigo}</Typography>
                  </Box>
                  <Box sx={{ flex: "2 1 300px" }}>
                    <Typography variant="body2">{item.descripcion}</Typography>
                  </Box>
                  <Box sx={{ flex: "0 0 100px" }}>
                    <TextField
                      placeholder="Cant."
                      fullWidth
                      size="small"
                      type="number"
                      value={item.cantidad}
                      onChange={(e) =>
                        actualizarItemEquipo(
                          item.id,
                          "cantidad",
                          e.target.value
                        )
                      }
                      inputProps={{ min: 1 }}
                    />
                  </Box>
                  <Box sx={{ flex: "0 0 80px", textAlign: "center" }}>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => eliminarItemEquipo(item.id)}
                    >
                      <DeleteOutline fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Grow>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              py: 4,
              bgcolor: "background.default",
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              No hay equipos agregados. Digita los codigos que necesites y encuentra el equipo que estas buscando.
            </Typography>
          </Box>
        )}

        {/* Resumen Equipo */}
        {itemsEquipo.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                bgcolor: "success.50",
                px: 3,
                py: 1,
                borderRadius: 2,
              }}
            >
              <Typography variant="body2" fontWeight={600}>
                Total Equipos:
              </Typography>
              <Chip
                label={itemsEquipo.length}
                color="success"
                size="small"
                sx={{ fontWeight: 700 }}
              />
            </Box>
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Botones de Acción Principal */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<SaveOutlined />}
            onClick={handleGuardarBorrador}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              px: 4,
              py: 1.2,
            }}
          >
            Guardar Borrador
          </Button>
          <Button
            variant="contained"
            onClick={handleGuardarDespacho}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              px: 4,
              py: 1.2,
            }}
          >
            Guardar Despacho
          </Button>
        </Box>
      </Card>

      {/* Modal de Búsqueda de Equipos */}
      {/* <Dialog
        open={openModal}
        onClose={cerrarModalEquipo}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <SearchOutlined sx={{ color: "primary.main", fontSize: 28 }} />
            <Typography variant="h6" fontWeight={600}>
              Buscar Equipo por Serie
            </Typography>
          </Box>
          <IconButton onClick={cerrarModalEquipo} size="small">
            <CloseOutlined />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Ingresa el número de serie del equipo"
              value={searchSerie}
              onChange={(e) => setSearchSerie(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  buscarEquipoPorSerie();
                }
              }}
              size="small"
            />
            <Button
              variant="contained"
              startIcon={<SearchOutlined />}
              onClick={buscarEquipoPorSerie}
              sx={{ textTransform: "none", px: 3 }}
            >
              Buscar
            </Button>
          </Box>

          {equiposFiltrados.length > 0 ? (
            <TableContainer
              component={Paper}
              sx={{ borderRadius: 2, maxHeight: 400 }}
            >
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" fontWeight={700}>
                        SERIE
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={700}>
                        CÓDIGO
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={700}>
                        DESCRIPCIÓN
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" fontWeight={700}>
                        ACCIÓN
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {equiposFiltrados.map((equipo) => (
                    <TableRow
                      key={equipo.id}
                      hover
                      sx={{
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {equipo.serie}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{equipo.codigo}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {equipo.descripcion}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => agregarEquipoDesdeModal(equipo)}
                          sx={{ textTransform: "none" }}
                        >
                          Agregar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : searchSerie && equiposFiltrados.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 4,
                bgcolor: "background.default",
                borderRadius: 2,
              }}
            >
              <Typography variant="body1" color="text.secondary">
                No se encontraron equipos con la serie: "{searchSerie}"
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                textAlign: "center",
                py: 4,
                bgcolor: "background.default",
                borderRadius: 2,
              }}
            >
              <Typography variant="body1" color="text.secondary">
                Ingresa un número de serie y haz clic en buscar
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            variant="outlined"
            onClick={cerrarModalEquipo}
            sx={{ textTransform: "none" }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
}
