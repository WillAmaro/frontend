"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Chip,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  SearchOutlined,
  SaveOutlined,
  ArrowBackOutlined,
  InventoryOutlined,
  BuildOutlined,
  SettingsOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import { TitleCard } from "@/src/components/base/TitleCard";

// ===== INTERFACES =====
interface DatoPreliminar {
  sot: string;
  tecnico: string;
  estado: string;
  distrito: string;
  plano?: string;
  franja?: string;
  tTrabajo?: string;
  razonSocial?: string;
  direccion?: string;
}

interface ItemMaterial {
  id: string;
  codigo: string;
  descripcion: string;
  uom: string;
  tipo: string;
  cantidad: string;
}

interface Equipo {
  id: string;
  sku: string;
  descripcion: string;
  serie: string;
  mac: string;
}

interface ActaServicio {
  sot?: string;
}

// ===== CATÁLOGO DE MATERIALES =====
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

export default function FormularioLiquidacion({ sot }: ActaServicio) {
  const router = useRouter();

  // ===== MODO: EDITAR O REGISTRAR =====
  const modoEdicion = !!sot; // true si existe sot, false si es nuevo

  // ===== ESTADOS =====
  const [loading, setLoading] = useState(true);
  const [servicioActual, setServicioActual] = useState<DatoPreliminar | null>(
    null
  );
  
  // Estados para datos básicos (solo editables en modo REGISTRAR)
  const [sotInput, setSotInput] = useState<string>("");
  const [clienteInput, setClienteInput] = useState<string>("");
  const [direccionInput, setDireccionInput] = useState<string>("");
  const [distritoInput, setDistritoInput] = useState<string>("");
  const [planoInput, setPlanoInput] = useState<string>("");

  const [plataforma, setPlataforma] = useState<string>("");
  const [plataformaOtro, setPlataformaOtro] = useState<string>("");
  const [servicioRealizado, setServicioRealizado] = useState<string>("");
  const [materiales, setMateriales] = useState<ItemMaterial[]>([]);
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [skuBusqueda, setSkuBusqueda] = useState<string>("");
  const [observaciones, setObservaciones] = useState<string>("");
  const [searchMateriales, setSearchMateriales] = useState<string>("");

  // ===== CARGAR DATOS INICIALES =====
  useEffect(() => {
    cargarDatosServicio();
  }, [sot]);

  const cargarDatosServicio = async () => {
    setLoading(true);

    if (modoEdicion) {
      // MODO EDICIÓN: Cargar datos existentes del backend
      setTimeout(() => {
        const datosServicio: DatoPreliminar = {
          sot: sot!,
          tecnico: "ALARCON HUAMAN NELSON",
          estado: "ATENDIDO",
          distrito: "LA VICTORIA",
          plano: "0LMLV008-S",
          franja: "AM1",
          tTrabajo: "FTTH Traslado Interno",
          razonSocial: "EMPRESA XYZ SAC",
          direccion: "AV. PRINCIPAL 123",
        };

        setServicioActual(datosServicio);

        // Cargar liquidación existente
        setMateriales([
          {
            id: "mat-1",
            codigo: "1002950",
            descripcion: "ATADOR DE IDENTIFICACION DE ABONADO",
            uom: "UND",
            tipo: "HFC",
            cantidad: "5",
          },
          {
            id: "mat-5",
            codigo: "1004692",
            descripcion: "CABLE UTP CAT5E FTP 4PR/24AWG 04070009",
            uom: "MTS",
            tipo: "HFC-FTTH",
            cantidad: "15",
          },
        ]);

        setEquipos([
          {
            id: "1",
            sku: "ONT-HW-001",
            descripcion: "ONT HUAWEI HG8546M",
            serie: "2024HW123456",
            mac: "00:25:9E:12:34:56",
          },
        ]);

        setPlataforma("ftth");
        setServicioRealizado("postventa");
        setObservaciones(
          "Servicio realizado correctamente. Cliente satisfecho."
        );

        setLoading(false);
      }, 800);
    } else {
      // MODO REGISTRAR: Iniciar con campos vacíos
      setTimeout(() => {
        setServicioActual({
          sot: "",
          tecnico: "",
          estado: "PENDIENTE",
          distrito: "",
        });
        setLoading(false);
      }, 300);
    }
  };

  // ===== MANEJAR MATERIALES =====
  const actualizarCantidadMaterial = (codigo: string, cantidad: string) => {
    const materialExistente = materiales.find((m) => m.codigo === codigo);

    if (materialExistente) {
      setMateriales(
        materiales.map((m) => (m.codigo === codigo ? { ...m, cantidad } : m))
      );
    } else {
      const materialCatalogo = catalogoMaterialesCompleto.find(
        (m) => m.codigo === codigo
      );
      if (materialCatalogo && cantidad !== "0") {
        setMateriales([...materiales, { ...materialCatalogo, cantidad }]);
      }
    }

    if (cantidad === "0") {
      setMateriales(materiales.filter((m) => m.codigo !== codigo));
    }
  };

  // ===== BUSCAR EQUIPO POR SKU =====
  const buscarEquipoPorSKU = async () => {
    if (!skuBusqueda.trim()) return;

    const equipoEncontrado: Equipo = {
      id: Date.now().toString(),
      sku: skuBusqueda,
      descripcion: "ONT HUAWEI HG8546M",
      serie: "2024XXXXXX",
      mac: "00:00:00:00:00:00",
    };

    setEquipos([...equipos, equipoEncontrado]);
    setSkuBusqueda("");
    alert(`Equipo agregado: ${equipoEncontrado.descripcion}`);
  };

  // ===== VALIDACIÓN =====
  const validarFormulario = (): boolean => {
    if (!modoEdicion) {
      // Validaciones para modo REGISTRAR
      if (!sotInput.trim()) {
        alert("Debe ingresar el número de SOT");
        return false;
      }
      if (!clienteInput.trim()) {
        alert("Debe ingresar el nombre del cliente");
        return false;
      }
      if (!direccionInput.trim()) {
        alert("Debe ingresar la dirección");
        return false;
      }
      if (!distritoInput.trim()) {
        alert("Debe ingresar el distrito");
        return false;
      }
    }

    if (!plataforma) {
      alert("Debe seleccionar una plataforma");
      return false;
    }

    if (!servicioRealizado) {
      alert("Debe seleccionar el tipo de servicio realizado");
      return false;
    }

    if (materiales.filter((m) => parseInt(m.cantidad) > 0).length === 0) {
      alert("Debe agregar al menos un material");
      return false;
    }

    return true;
  };

  // ===== GUARDAR LIQUIDACIÓN =====
  const guardarLiquidacion = () => {
    if (!validarFormulario()) return;

    const liquidacion = {
      sot: modoEdicion ? servicioActual?.sot : sotInput,
      cliente: modoEdicion ? servicioActual?.razonSocial : clienteInput,
      direccion: modoEdicion ? servicioActual?.direccion : direccionInput,
      distrito: modoEdicion ? servicioActual?.distrito : distritoInput,
      plano: modoEdicion ? servicioActual?.plano : planoInput,
      plataforma: plataforma === "otro" ? plataformaOtro : plataforma,
      servicioRealizado,
      materiales: materiales.filter((m) => parseInt(m.cantidad) > 0),
      equipos,
      observaciones,
      modo: modoEdicion ? "editar" : "crear",
    };

    console.log("💾 Guardando liquidación:", liquidacion);
    alert(
      `Liquidación ${
        modoEdicion ? "actualizada" : "creada"
      } exitosamente para SOT: ${liquidacion.sot}\n\nMateriales: ${
        liquidacion.materiales.length
      }\nEquipos: ${liquidacion.equipos.length}`
    );

    router.push("/logistica/altas/mis-liquidaciones");
  };

  // ===== MATERIALES FILTRADOS =====
  const materialesFiltrados = useMemo(() => {
    if (!searchMateriales) return catalogoMaterialesCompleto;
    const search = searchMateriales.toLowerCase();
    return catalogoMaterialesCompleto.filter(
      (m) =>
        m.codigo.toLowerCase().includes(search) ||
        m.descripcion.toLowerCase().includes(search)
    );
  }, [searchMateriales]);

  if (loading) {
    return (
      <Box sx={{ maxWidth: 1600, mx: "auto", p: 3 }}>
        <Alert severity="info">Cargando información del servicio...</Alert>
      </Box>
    );
  }

  if (!servicioActual) {
    return (
      <Box sx={{ maxWidth: 1600, mx: "auto", p: 3 }}>
        <Alert severity="error">No se encontraron datos del servicio</Alert>
      </Box>
    );
  }

  // ===== RENDER =====
  return (
    <Box sx={{ maxWidth: 1600, mx: "auto", p: 3 }}>
      {/* <Button
        startIcon={<ArrowBackOutlined />}
        onClick={() => router.back()}
        sx={{ mb: 2, textTransform: "none" }}
      >
        Volver
      </Button> */}

      <TitleCard
        icon={<SettingsOutlined sx={{ fontSize: 32 }} />}
        title={`${modoEdicion ? "EDITAR" : "REGISTRAR"} LIQUIDACIÓN${
          modoEdicion ? ` - SOT: ${servicioActual.sot}` : ""
        }`}
        description={
          modoEdicion
            ? "Modifica los materiales y equipos utilizados"
            : "Completa la información del servicio y los materiales utilizados"
        }
      />

      {modoEdicion && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Estás editando una liquidación existente. Los cambios sobrescribirán
          la información anterior.
        </Alert>
      )}

      {/* Información del Servicio */}
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
          Datos del Servicio
        </Typography>

        {modoEdicion ? (
          // MODO EDICIÓN: Mostrar datos deshabilitados
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Box
              sx={{
                flex: "1 1 200px",
                p: 2,
                bgcolor: "grey.50",
                borderRadius: 2,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                SOT
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {servicioActual.sot}
              </Typography>
            </Box>
            <Box
              sx={{
                flex: "1 1 200px",
                p: 2,
                bgcolor: "grey.50",
                borderRadius: 2,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Cliente
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {servicioActual.razonSocial}
              </Typography>
            </Box>
            <Box
              sx={{
                flex: "1 1 200px",
                p: 2,
                bgcolor: "grey.50",
                borderRadius: 2,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Dirección
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {servicioActual.direccion}
              </Typography>
            </Box>
            <Box
              sx={{
                flex: "1 1 150px",
                p: 2,
                bgcolor: "grey.50",
                borderRadius: 2,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Distrito
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {servicioActual.distrito}
              </Typography>
            </Box>
            <Box
              sx={{
                flex: "1 1 150px",
                p: 2,
                bgcolor: "grey.50",
                borderRadius: 2,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Plano
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {servicioActual.plano || "N/A"}
              </Typography>
            </Box>
          </Box>
        ) : (
          // MODO REGISTRAR: Mostrar inputs habilitados
          <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
            <TextField
              label="SOT *"
              size="small"
              value={sotInput}
              onChange={(e) => setSotInput(e.target.value)}
              placeholder="Ej: SOT-2024-001"
            />
            <TextField
              label="Cliente *"
              size="small"
              value={clienteInput}
              onChange={(e) => setClienteInput(e.target.value)}
              placeholder="Razón Social del Cliente"
            />
            <TextField
              label="Dirección *"
              size="small"
              value={direccionInput}
              onChange={(e) => setDireccionInput(e.target.value)}
              placeholder="Dirección del servicio"
            />
            <TextField
              label="Distrito *"
              size="small"
              value={distritoInput}
              onChange={(e) => setDistritoInput(e.target.value)}
              placeholder="Distrito"
            />
            <TextField
              label="Plano"
              size="small"
              value={planoInput}
              onChange={(e) => setPlanoInput(e.target.value)}
              placeholder="Código de plano (opcional)"
            />
          </Box>
        )}
      </Card>

      {/* Plataforma y Servicio */}
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
          1. Plataforma y Servicio
        </Typography>

        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          <Box sx={{ flex: "1 1 400px" }}>
            <Typography variant="subtitle2" fontWeight={600} mb={2}>
              PLATAFORMA *
            </Typography>
            <RadioGroup
              value={plataforma}
              onChange={(e) => setPlataforma(e.target.value)}
            >
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <FormControlLabel
                  value="hfc"
                  control={<Radio size="small" />}
                  label="HFC"
                />
                <FormControlLabel
                  value="ftth"
                  control={<Radio size="small" />}
                  label="FTTH"
                />
                <FormControlLabel
                  value="lte"
                  control={<Radio size="small" />}
                  label="LTE"
                />
                <FormControlLabel
                  value="dth"
                  control={<Radio size="small" />}
                  label="DTH"
                />
              </Box>
            </RadioGroup>
          </Box>

          <Box sx={{ flex: "1 1 400px" }}>
            <Typography variant="subtitle2" fontWeight={600} mb={2}>
              SERVICIO REALIZADO *
            </Typography>
            <RadioGroup
              value={servicioRealizado}
              onChange={(e) => setServicioRealizado(e.target.value)}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <FormControlLabel
                  value="instalacion"
                  control={<Radio size="small" />}
                  label="Instalación"
                />
                <FormControlLabel
                  value="postventa"
                  control={<Radio size="small" />}
                  label="Post venta"
                />
                <FormControlLabel
                  value="mantenimiento"
                  control={<Radio size="small" />}
                  label="Mantenimiento"
                />
              </Box>
            </RadioGroup>
          </Box>
        </Box>
      </Card>

      {/* Materiales */}
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
          <InventoryOutlined sx={{ color: "primary.main", fontSize: 28 }} />
          <Typography variant="h6" fontWeight={700}>
            2. Materiales Utilizados *
          </Typography>
        </Box>

        <TextField
          fullWidth
          size="small"
          placeholder="Buscar material por código o descripción..."
          value={searchMateriales}
          onChange={(e) => setSearchMateriales(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3, maxWidth: 500 }}
        />

        <Box
          sx={{
            maxHeight: 500,
            overflowY: "auto",
            border: "1px solid",
            borderColor: "grey.200",
            borderRadius: 2,
          }}
        >
          {materialesFiltrados.map((material) => (
            <Box
              key={material.id}
              sx={{
                display: "flex",
                gap: 2,
                p: 2,
                alignItems: "center",
                borderBottom: "1px solid",
                borderColor: "grey.200",
                "&:hover": { bgcolor: "grey.50" },
              }}
            >
              <Typography variant="body2" fontWeight={600} sx={{ width: 100 }}>
                {material.codigo}
              </Typography>
              <Typography variant="body2" sx={{ flex: 1 }}>
                {material.descripcion}
              </Typography>
              <Chip label={material.uom} size="small" sx={{ width: 80 }} />
              <TextField
                size="small"
                type="number"
                value={
                  materiales.find((m) => m.codigo === material.codigo)
                    ?.cantidad || "0"
                }
                onChange={(e) =>
                  actualizarCantidadMaterial(material.codigo, e.target.value)
                }
                inputProps={{ min: 0 }}
                sx={{ width: 120 }}
              />
            </Box>
          ))}
        </Box>

        {materiales.length > 0 && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Materiales seleccionados: <strong>{materiales.length}</strong>
          </Alert>
        )}
      </Card>

      {/* Equipos */}
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
          <BuildOutlined sx={{ color: "primary.main", fontSize: 28 }} />
          <Typography variant="h6" fontWeight={700}>
            3. Equipos Instalados
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 3, maxWidth: 600 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Código SKU del equipo..."
            value={skuBusqueda}
            onChange={(e) => setSkuBusqueda(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") buscarEquipoPorSKU();
            }}
          />
          <Button
            variant="contained"
            onClick={buscarEquipoPorSKU}
            sx={{ textTransform: "none" }}
          >
            Buscar
          </Button>
        </Box>

        {equipos.length > 0 && (
          <Box sx={{ p: 3, bgcolor: "grey.50", borderRadius: 2 }}>
            {equipos.map((equipo) => (
              <Box
                key={equipo.id}
                sx={{
                  display: "flex",
                  gap: 2,
                  p: 2,
                  mb: 1,
                  bgcolor: "white",
                  borderRadius: 1,
                  alignItems: "center",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight={600}>
                    SKU: {equipo.sku}
                  </Typography>
                  <Typography variant="caption">
                    {equipo.descripcion}
                  </Typography>
                </Box>
                <Chip label={`S/N: ${equipo.serie}`} size="small" />
                <IconButton
                  size="small"
                  color="error"
                  onClick={() =>
                    setEquipos(equipos.filter((e) => e.id !== equipo.id))
                  }
                >
                  <DeleteOutline />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Card>

      {/* Observaciones */}
      <Card
        elevation={3}
        sx={{
          mt: 3,
          p: 4,
          borderRadius: 4,
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <Typography variant="h6" fontWeight={700} mb={2}>
          4. Observaciones
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Observaciones adicionales sobre el servicio..."
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
        />
      </Card>

      {/* Botones */}
      <Card elevation={0} sx={{ mt: 3, p: 4, borderRadius: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
          <Button
            variant="outlined"
            onClick={() => router.back()}
            sx={{ textTransform: "none", px: 4 }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            size="large"
            startIcon={<SaveOutlined />}
            onClick={guardarLiquidacion}
            sx={{ textTransform: "none", px: 6 }}
          >
            {modoEdicion ? "Actualizar" : "Registrar"} Liquidación
          </Button>
        </Box>
      </Card>
    </Box>
  );
}