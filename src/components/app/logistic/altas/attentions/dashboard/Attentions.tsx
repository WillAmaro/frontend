"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import { JSX, useState } from "react";
import { useSelector } from "react-redux";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import { GridColDef } from "@mui/x-data-grid";
import CustomDataGrid from "@/src/components/base/CustomDataGrid";
import { TitleCard } from "@/src/components/base/TitleCard";

// ========== TIPOS ACTUALIZADOS ==========
interface Technician {
  id: string;
  name: string;
  lastName: string;
  specialization: string;
  isAvailable: boolean;
  color: string;
}

interface ServiceOrder {
  id: string;
  code: string;
  clientName: string;
  address: string;
  serviceType: string;
  priority: "alta" | "media" | "baja";
  estimatedDuration: number;
  materials: string[];
  ctoCode: string;
  ctoSerialNumber: string;
  power: number; // dB entre 16-23
}

interface Attention {
  id: string;
  serviceOrderId: string;
  technicianId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "programada" | "en_curso" | "completada" | "cancelada";
  serviceOrder: ServiceOrder;
}

// ========== DATOS MOCK ACTUALIZADOS ==========
const mockTechnicians: Technician[] = [
  {
    id: "tech-1",
    name: "Carlos",
    lastName: "Rodríguez",
    specialization: "Instalación HFC",
    isAvailable: true,
    color: "#2196F3",
  },
  {
    id: "tech-2",
    name: "María",
    lastName: "González",
    specialization: "Reparación FTTH",
    isAvailable: true,
    color: "#4CAF50",
  },
  {
    id: "tech-3",
    name: "Jorge",
    lastName: "Martínez",
    specialization: "Instalación DTH",
    isAvailable: false,
    color: "#FF9800",
  },
  {
    id: "tech-4",
    name: "Ana",
    lastName: "López",
    specialization: "Soporte LTE",
    isAvailable: true,
    color: "#9C27B0",
  },
];

const mockAttentions: Attention[] = [
  // PROGRAMADAS (5)
  {
    id: "att-1",
    serviceOrderId: "so-1",
    technicianId: "tech-1",
    date: "2026-01-26",
    startTime: "09:15",
    endTime: "11:29",
    status: "programada",
    serviceOrder: {
      id: "so-1",
      code: "OT-2026-001",
      clientName: "Juan Pérez",
      address: "Av. Javier Prado Este 123, San Isidro",
      serviceType: "Instalación HFC",
      priority: "alta",
      estimatedDuration: 134,
      materials: ["Cable coaxial", "Modem", "Splitter"],
      ctoCode: "CTO-001",
      ctoSerialNumber: "SN-20260001",
      power: 18.5,
    },
  },
  {
    id: "att-7",
    serviceOrderId: "so-7",
    technicianId: "tech-1",
    date: "2026-01-27",
    startTime: "08:30",
    endTime: "10:00",
    status: "programada",
    serviceOrder: {
      id: "so-7",
      code: "OT-2026-007",
      clientName: "Pedro Gonzales",
      address: "Calle Las Palmeras 234, Surco",
      serviceType: "Instalación FTTH",
      priority: "alta",
      estimatedDuration: 90,
      materials: ["Fibra óptica", "Router"],
      ctoCode: "CTO-002",
      ctoSerialNumber: "SN-20260007",
      power: 20.2,
    },
  },
  {
    id: "att-11",
    serviceOrderId: "so-11",
    technicianId: "tech-1",
    date: "2026-01-28",
    startTime: "08:00",
    endTime: "09:30",
    status: "programada",
    serviceOrder: {
      id: "so-11",
      code: "OT-2026-011",
      clientName: "Miguel Ángel Torres",
      address: "Av. Brasil 456, Magdalena",
      serviceType: "Mantenimiento",
      priority: "media",
      estimatedDuration: 90,
      materials: ["Kit herramientas"],
      ctoCode: "CTO-003",
      ctoSerialNumber: "SN-20260011",
      power: 17.8,
    },
  },
  {
    id: "att-12",
    serviceOrderId: "so-12",
    technicianId: "tech-2",
    date: "2026-01-28",
    startTime: "10:00",
    endTime: "11:00",
    status: "programada",
    serviceOrder: {
      id: "so-12",
      code: "OT-2026-012",
      clientName: "Rosa Flores",
      address: "Calle Lima 789, Jesús María",
      serviceType: "Instalación DTH",
      priority: "alta",
      estimatedDuration: 60,
      materials: ["Antena", "Decodificador"],
      ctoCode: "CTO-004",
      ctoSerialNumber: "SN-20260012",
      power: 21.5,
    },
  },
  {
    id: "att-17",
    serviceOrderId: "so-17",
    technicianId: "tech-3",
    date: "2026-01-29",
    startTime: "14:00",
    endTime: "15:30",
    status: "programada",
    serviceOrder: {
      id: "so-17",
      code: "OT-2026-017",
      clientName: "Ricardo Paredes",
      address: "Jr. Lampa 456, Cercado de Lima",
      serviceType: "Mantenimiento",
      priority: "baja",
      estimatedDuration: 90,
      materials: ["Kit limpieza"],
      ctoCode: "CTO-005",
      ctoSerialNumber: "SN-20260017",
      power: 19.3,
    },
  },
  {
    id: "att-20",
    serviceOrderId: "so-20",
    technicianId: "tech-2",
    date: "2026-01-30",
    startTime: "11:00",
    endTime: "12:00",
    status: "programada",
    serviceOrder: {
      id: "so-20",
      code: "OT-2026-020",
      clientName: "Monica Suarez",
      address: "Calle Real 567, San Borja",
      serviceType: "Cambio de equipo",
      priority: "alta",
      estimatedDuration: 60,
      materials: ["Router", "Modem"],
      ctoCode: "CTO-006",
      ctoSerialNumber: "SN-20260020",
      power: 22.1,
    },
  },

  // EN CURSO (4)
  {
    id: "att-2",
    serviceOrderId: "so-2",
    technicianId: "tech-1",
    date: "2026-01-26",
    startTime: "13:00",
    endTime: "15:00",
    status: "en_curso",
    serviceOrder: {
      id: "so-2",
      code: "OT-2026-002",
      clientName: "María Torres",
      address: "Calle Los Olivos 456, Miraflores",
      serviceType: "Reparación de señal",
      priority: "media",
      estimatedDuration: 120,
      materials: ["Conector F", "Cable RG6"],
      ctoCode: "CTO-007",
      ctoSerialNumber: "SN-20260002",
      power: 16.8,
    },
  },
  {
    id: "att-8",
    serviceOrderId: "so-8",
    technicianId: "tech-2",
    date: "2026-01-27",
    startTime: "11:00",
    endTime: "12:30",
    status: "en_curso",
    serviceOrder: {
      id: "so-8",
      code: "OT-2026-008",
      clientName: "Sofia Ramirez",
      address: "Av. Universitaria 567, Los Olivos",
      serviceType: "Reparación",
      priority: "media",
      estimatedDuration: 90,
      materials: ["Cable coaxial"],
      ctoCode: "CTO-008",
      ctoSerialNumber: "SN-20260008",
      power: 18.9,
    },
  },
  {
    id: "att-13",
    serviceOrderId: "so-13",
    technicianId: "tech-3",
    date: "2026-01-28",
    startTime: "13:00",
    endTime: "14:30",
    status: "en_curso",
    serviceOrder: {
      id: "so-13",
      code: "OT-2026-013",
      clientName: "Jorge Castillo",
      address: "Jr. Cusco 234, Rímac",
      serviceType: "Reparación",
      priority: "alta",
      estimatedDuration: 90,
      materials: ["Cable", "Conectores"],
      ctoCode: "CTO-009",
      ctoSerialNumber: "SN-20260013",
      power: 20.7,
    },
  },
  {
    id: "att-18",
    serviceOrderId: "so-18",
    technicianId: "tech-4",
    date: "2026-01-29",
    startTime: "16:00",
    endTime: "17:00",
    status: "en_curso",
    serviceOrder: {
      id: "so-18",
      code: "OT-2026-018",
      clientName: "Valeria Silva",
      address: "Calle Tacna 789, Miraflores",
      serviceType: "Reparación",
      priority: "alta",
      estimatedDuration: 60,
      materials: ["Conectores", "Cable"],
      ctoCode: "CTO-010",
      ctoSerialNumber: "SN-20260018",
      power: 19.5,
    },
  },

  // COMPLETADAS (7)
  {
    id: "att-3",
    serviceOrderId: "so-3",
    technicianId: "tech-2",
    date: "2026-01-26",
    startTime: "08:00",
    endTime: "09:30",
    status: "completada",
    serviceOrder: {
      id: "so-3",
      code: "OT-2026-003",
      clientName: "Roberto Sánchez",
      address: "Jr. Las Flores 789, San Borja",
      serviceType: "Instalación FTTH",
      priority: "alta",
      estimatedDuration: 90,
      materials: ["Fibra óptica", "ONT", "Patch cord"],
      ctoCode: "CTO-011",
      ctoSerialNumber: "SN-20260003",
      power: 21.2,
    },
  },
  {
    id: "att-5",
    serviceOrderId: "so-5",
    technicianId: "tech-2",
    date: "2026-01-26",
    startTime: "14:00",
    endTime: "15:15",
    status: "completada",
    serviceOrder: {
      id: "so-5",
      code: "OT-2026-005",
      clientName: "Luis Herrera",
      address: "Calle Santa Cruz 654, San Miguel",
      serviceType: "Instalación DTH",
      priority: "media",
      estimatedDuration: 75,
      materials: ["Antena", "Decodificador", "Cable coaxial"],
      ctoCode: "CTO-012",
      ctoSerialNumber: "SN-20260005",
      power: 17.3,
    },
  },
  {
    id: "att-6",
    serviceOrderId: "so-6",
    technicianId: "tech-4",
    date: "2026-01-25",
    startTime: "16:00",
    endTime: "17:00",
    status: "completada",
    serviceOrder: {
      id: "so-6",
      code: "OT-2026-006",
      clientName: "Ana Martínez",
      address: "Av. La Marina 890, San Miguel",
      serviceType: "Mantenimiento",
      priority: "baja",
      estimatedDuration: 60,
      materials: ["Kit de limpieza"],
      ctoCode: "CTO-013",
      ctoSerialNumber: "SN-20260006",
      power: 22.8,
    },
  },
  {
    id: "att-9",
    serviceOrderId: "so-9",
    technicianId: "tech-3",
    date: "2026-01-27",
    startTime: "09:00",
    endTime: "10:30",
    status: "completada",
    serviceOrder: {
      id: "so-9",
      code: "OT-2026-009",
      clientName: "Carlos Mendoza",
      address: "Jr. Huancayo 890, Breña",
      serviceType: "Cambio de equipo",
      priority: "baja",
      estimatedDuration: 90,
      materials: ["Modem", "Router"],
      ctoCode: "CTO-014",
      ctoSerialNumber: "SN-20260009",
      power: 18.1,
    },
  },
  {
    id: "att-14",
    serviceOrderId: "so-14",
    technicianId: "tech-4",
    date: "2026-01-28",
    startTime: "15:30",
    endTime: "17:00",
    status: "completada",
    serviceOrder: {
      id: "so-14",
      code: "OT-2026-014",
      clientName: "Patricia Morales",
      address: "Av. Petit Thouars 567, Lince",
      serviceType: "Instalación FTTH",
      priority: "media",
      estimatedDuration: 90,
      materials: ["Fibra óptica", "ONT"],
      ctoCode: "CTO-015",
      ctoSerialNumber: "SN-20260014",
      power: 19.8,
    },
  },
  {
    id: "att-15",
    serviceOrderId: "so-15",
    technicianId: "tech-1",
    date: "2026-01-29",
    startTime: "09:00",
    endTime: "10:00",
    status: "completada",
    serviceOrder: {
      id: "so-15",
      code: "OT-2026-015",
      clientName: "Fernando López",
      address: "Calle Los Sauces 890, La Molina",
      serviceType: "Cambio de equipo",
      priority: "baja",
      estimatedDuration: 60,
      materials: ["Modem nuevo"],
      ctoCode: "CTO-016",
      ctoSerialNumber: "SN-20260015",
      power: 16.5,
    },
  },
  {
    id: "att-19",
    serviceOrderId: "so-19",
    technicianId: "tech-1",
    date: "2026-01-30",
    startTime: "08:30",
    endTime: "10:00",
    status: "completada",
    serviceOrder: {
      id: "so-19",
      code: "OT-2026-019",
      clientName: "Daniel Huaman",
      address: "Av. Arequipa 234, San Isidro",
      serviceType: "Instalación DTH",
      priority: "media",
      estimatedDuration: 90,
      materials: ["Antena", "Decodificador"],
      ctoCode: "CTO-017",
      ctoSerialNumber: "SN-20260019",
      power: 21.9,
    },
  },

  // CANCELADAS (3)
  {
    id: "att-4",
    serviceOrderId: "so-4",
    technicianId: "tech-3",
    date: "2026-01-26",
    startTime: "10:00",
    endTime: "10:30",
    status: "cancelada",
    serviceOrder: {
      id: "so-4",
      code: "OT-2026-004",
      clientName: "Carmen Díaz",
      address: "Av. Arequipa 321, Lince",
      serviceType: "Cambio de equipo",
      priority: "baja",
      estimatedDuration: 30,
      materials: ["Modem nuevo", "Cable ethernet"],
      ctoCode: "CTO-018",
      ctoSerialNumber: "SN-20260004",
      power: 20.4,
    },
  },
  {
    id: "att-10",
    serviceOrderId: "so-10",
    technicianId: "tech-4",
    date: "2026-01-27",
    startTime: "15:00",
    endTime: "16:00",
    status: "cancelada",
    serviceOrder: {
      id: "so-10",
      code: "OT-2026-010",
      clientName: "Laura Vega",
      address: "Calle San Martin 123, Pueblo Libre",
      serviceType: "Instalación HFC",
      priority: "alta",
      estimatedDuration: 60,
      materials: ["Cable coaxial", "Modem"],
      ctoCode: "CTO-019",
      ctoSerialNumber: "SN-20260010",
      power: 17.6,
    },
  },
  {
    id: "att-16",
    serviceOrderId: "so-16",
    technicianId: "tech-2",
    date: "2026-01-29",
    startTime: "11:00",
    endTime: "12:30",
    status: "cancelada",
    serviceOrder: {
      id: "so-16",
      code: "OT-2026-016",
      clientName: "Gabriela Rojas",
      address: "Av. Colonial 123, Callao",
      serviceType: "Instalación HFC",
      priority: "media",
      estimatedDuration: 90,
      materials: ["Cable coaxial"],
      ctoCode: "CTO-020",
      ctoSerialNumber: "SN-20260016",
      power: 23.0,
    },
  },
];

export default function AttentionsPage() {
  const userState = useSelector((state: any) => state.user);
  const tenantId = userState.tenant_id?.toString() || "";

  const [attentions] = useState<Attention[]>(mockAttentions);
  const [technicians] = useState<Technician[]>(mockTechnicians);

  // Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [technicianFilter, setTechnicianFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Estado para card seleccionado
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // Calcular estadísticas
  const stats = {
    total: attentions.length,
    programada: attentions.filter((a) => a.status === "programada").length,
    enCurso: attentions.filter((a) => a.status === "en_curso").length,
    completada: attentions.filter((a) => a.status === "completada").length,
    cancelada: attentions.filter((a) => a.status === "cancelada").length,
  };

  // Handler para click en card
  const handleCardClick = (status: string) => {
    if (selectedCard === status) {
      setSelectedCard(null);
      setStatusFilter("all");
    } else {
      setSelectedCard(status);
      setStatusFilter(status === "total" ? "all" : status);
    }
  };

  // Filtrar atenciones
  const filteredAttentions = attentions
    .filter((attention) => {
      const matchSearch =
        searchTerm === "" ||
        attention.serviceOrder.code
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        attention.serviceOrder.clientName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchStatus =
        statusFilter === "all" || attention.status === statusFilter;

      const matchTechnician =
        technicianFilter === "all" || attention.technicianId === technicianFilter;

      const matchPriority =
        priorityFilter === "all" ||
        attention.serviceOrder.priority === priorityFilter;

      const matchDateFrom =
        !dateFrom || new Date(attention.date) >= new Date(dateFrom);

      const matchDateTo = !dateTo || new Date(attention.date) <= new Date(dateTo);

      return (
        matchSearch &&
        matchStatus &&
        matchTechnician &&
        matchPriority &&
        matchDateFrom &&
        matchDateTo
      );
    })
    .map((attention) => ({
      id: attention.id,
      serviceOrderId: attention.serviceOrderId,
      technicianId: attention.technicianId,
      date: attention.date,
      startTime: attention.startTime,
      endTime: attention.endTime,
      status: attention.status,
      serviceOrder: attention.serviceOrder,
    }));

  // Obtener técnico por ID
  const getTechnicianById = (id: string) => {
    return technicians.find((t) => t.id === id);
  };

  // Función para obtener color de potencia
  const getPowerColor = (power: number) => {
    if (power < 18) return "#F44336"; // Rojo - bajo
    if (power >= 18 && power <= 21) return "#4CAF50"; // Verde - óptimo
    return "#FF9800"; // Naranja - alto
  };

  // Columnas del DataGrid actualizadas
  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Código OT",
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={700}>
          {params.row.serviceOrder.code}
        </Typography>
      ),
    },
    {
      field: "technician",
      headerName: "Técnico Asignado",
      width: 200,
      renderCell: (params) => {
        const tech = getTechnicianById(params.row.technicianId);
        return tech ? (
          <Box display="flex" alignItems="center" gap={1} height={"100%"}>
            <Avatar sx={{ bgcolor: tech.color, width: 32, height: 32 }}>
              <PersonIcon fontSize="small" />
            </Avatar>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="body2" fontWeight={600}>
                {tech.name} {tech.lastName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {tech.specialization}
              </Typography>
            </Box>
          </Box>
        ) : (
          "N/A"
        );
      },
    },
    {
      field: "ctoCode",
      headerName: "CTO",
      width: 110,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={600} color="primary.main">
          {params.row.serviceOrder.ctoCode}
        </Typography>
      ),
    },
    {
      field: "ctoSerialNumber",
      headerName: "Número de Serie CTO",
      width: 160,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
          {params.row.serviceOrder.ctoSerialNumber}
        </Typography>
      ),
    },
    {
      field: "power",
      headerName: "Potencia",
      width: 110,
      renderCell: (params) => {
        const power = params.row.serviceOrder.power;
        return (
          <Chip
            label={`${power} dB`}
            size="small"
            sx={{
              bgcolor: `${getPowerColor(power)}22`,
              color: getPowerColor(power),
              border: `1px solid ${getPowerColor(power)}`,
              fontWeight: 700,
              fontFamily: "monospace",
            }}
          />
        );
      },
    },
    {
      field: "address",
      headerName: "Dirección OT",
      width: 280,
      renderCell: (params) => (
        <Typography variant="body2" noWrap>
          {params.row.serviceOrder.address}
        </Typography>
      ),
    },
    {
      field: "priority",
      headerName: "Prioridad",
      width: 110,
      renderCell: (params) => {
        const priority = params.row.serviceOrder.priority;
        const colors = {
          alta: "#F44336",
          media: "#FF9800",
          baja: "#4CAF50",
        };
        return (
          <Chip
            label={priority.toUpperCase()}
            size="small"
            sx={{
              bgcolor: colors[priority as keyof typeof colors],
              color: "white",
              fontWeight: 600,
            }}
          />
        );
      },
    },
    {
      field: "status",
      headerName: "Estado",
      width: 140,
      renderCell: (params) => {
        const statusConfig: Record<
          string,
          { label: string; color: string; icon: JSX.Element }
        > = {
          programada: {
            label: "Programada",
            color: "#2196F3",
            icon: <PendingActionsIcon fontSize="small" />,
          },
          en_curso: {
            label: "En Curso",
            color: "#FF9800",
            icon: <PlayCircleIcon fontSize="small" />,
          },
          completada: {
            label: "Completada",
            color: "#4CAF50",
            icon: <CheckCircleIcon fontSize="small" />,
          },
          cancelada: {
            label: "Cancelada",
            color: "#F44336",
            icon: <CancelIcon fontSize="small" />,
          },
        };

        const config = statusConfig[params.row.status];
        return (
          <Chip
            icon={config.icon}
            label={config.label}
            size="small"
            sx={{
              bgcolor: `${config.color}22`,
              color: config.color,
              border: `1px solid ${config.color}`,
              fontWeight: 600,
            }}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={0.5}>
          <Tooltip title="Ver detalle">
            <IconButton size="small" sx={{ color: "primary.main" }}>
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar">
            <IconButton size="small" sx={{ color: "info.main" }}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton size="small" sx={{ color: "error.main" }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <TitleCard
        icon={<TrendingUpIcon />}
        title="Historico de ordenes de trabajo"
        description="Monitoreo y gestión de todas las órdenes de servicio"
      />

      {/* Stats Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap:"wrap",
          gap: 2,
          marginBlock: 4,
          marginBottom: 5,
        }}
      >
        {/* Total */}
        <Card
          elevation={0}
          onClick={() => handleCardClick("total")}
          sx={{
            border:
              selectedCard === "total"
                ? "2px solid rgba(59, 130, 246, 0.6)"
                : "1px solid rgba(0, 0, 0, 0.12)",
            borderRadius: "12px",
            width: 220,
            cursor: "pointer",
            transition: "all 0.3s ease",
            background:
              selectedCard === "total"
                ? "rgba(59, 130, 246, 0.08)"
                : "transparent",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h3" fontWeight={700} color="#764ba2">
                  {stats.total}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Atenciones
                </Typography>
              </Box>
              <TrendingUpIcon sx={{ fontSize: 48, color: "#764ba2" }} />
            </Box>
          </CardContent>
        </Card>

        {/* Programadas */}
        <Card
          elevation={0}
          onClick={() => handleCardClick("programada")}
          sx={{
            border:
              selectedCard === "programada"
                ? "2px solid rgba(33, 150, 243, 0.6)"
                : "1px solid rgba(0, 0, 0, 0.12)",
            width: 220,
            borderRadius: "12px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            background:
              selectedCard === "programada"
                ? "rgba(33, 150, 243, 0.08)"
                : "transparent",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h3" fontWeight={700} color="#1976D2">
                  {stats.programada}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Programadas
                </Typography>
              </Box>
              <PendingActionsIcon sx={{ fontSize: 48, color: "#1976D2" }} />
            </Box>
          </CardContent>
        </Card>

        {/* En Curso */}
        <Card
          elevation={0}
          onClick={() => handleCardClick("en_curso")}
          sx={{
            border:
              selectedCard === "en_curso"
                ? "2px solid rgba(255, 152, 0, 0.6)"
                : "1px solid rgba(0, 0, 0, 0.12)",
            width: 220,
            borderRadius: "12px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            background:
              selectedCard === "en_curso"
                ? "rgba(255, 152, 0, 0.08)"
                : "transparent",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h3" fontWeight={700} color="#F57C00">
                  {stats.enCurso}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  En Curso
                </Typography>
              </Box>
              <PlayCircleIcon sx={{ fontSize: 48, color: "#F57C00" }} />
            </Box>
          </CardContent>
        </Card>

        {/* Completadas */}
        <Card
          elevation={0}
          onClick={() => handleCardClick("completada")}
          sx={{
            border:
              selectedCard === "completada"
                ? "2px solid rgba(76, 175, 80, 0.6)"
                : "1px solid rgba(0, 0, 0, 0.12)",
            width: 220,
            borderRadius: "12px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            background:
              selectedCard === "completada"
                ? "rgba(76, 175, 80, 0.08)"
                : "transparent",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h3" fontWeight={700} color="#388E3C">
                  {stats.completada}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completadas
                </Typography>
              </Box>
              <CheckCircleIcon sx={{ fontSize: 48, color: "#388E3C" }} />
            </Box>
          </CardContent>
        </Card>

        {/* Canceladas */}
        <Card
          elevation={0}
          onClick={() => handleCardClick("cancelada")}
          sx={{
            border:
              selectedCard === "cancelada"
                ? "2px solid rgba(244, 67, 54, 0.6)"
                : "1px solid rgba(0, 0, 0, 0.12)",
            width: 220,
            borderRadius: "12px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            background:
              selectedCard === "cancelada"
                ? "rgba(244, 67, 54, 0.08)"
                : "transparent",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h3" fontWeight={700} color="#D32F2F">
                  {stats.cancelada}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Canceladas
                </Typography>
              </Box>
              <CancelIcon sx={{ fontSize: 48, color: "#D32F2F" }} />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Filtros Reorganizados */}
      <Box sx={{ mb: 4 }}>
        {/* Primera fila: Fechas (izquierda) y Búsqueda (derecha) */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            mb: 2,
            flexWrap: { xs: "wrap", md: "nowrap" },
          }}
        >
          {/* Filtros de Fecha */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: { xs: "wrap", sm: "nowrap" },
              flex: { xs: "1 1 100%", md: "0 0 auto" },
            }}
          >
            <TextField
              size="small"
              type="date"
              label="Fecha Desde"
              value={dateFrom}
              sx={{
                width: { xs: "100%", sm: 200 },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "12px",
                },
              }}
              onChange={(e) => setDateFrom(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              size="small"
              type="date"
              label="Fecha Hasta"
              value={dateTo}
              sx={{
                width: { xs: "100%", sm: 200 },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "12px",
                },
              }}
              onChange={(e) => setDateTo(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          {/* Búsqueda */}
          <TextField
            size="small"
            placeholder="Buscar por código..."
            value={searchTerm}
            sx={{
              flex: { xs: "1 1 100%", md: "0 0 300px" },
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "12px",
              },
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
              ),
            }}
          />
        </Box>

        {/* Segunda fila: Estado, Técnico y Prioridad */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: { xs: "wrap", sm: "nowrap" },
          }}
        >
          <TextField
            select
            size="small"
            label="Estado"
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 0" },
              minWidth: { sm: 200 },
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "12px",
              },
            }}
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setSelectedCard(e.target.value === "all" ? null : e.target.value);
            }}
          >
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value="programada">Programada</MenuItem>
            <MenuItem value="en_curso">En Curso</MenuItem>
            <MenuItem value="completada">Completada</MenuItem>
            <MenuItem value="cancelada">Cancelada</MenuItem>
          </TextField>

          <TextField
            select
            size="small"
            label="Técnico"
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 0" },
              minWidth: { sm: 200 },
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "12px",
              },
            }}
            value={technicianFilter}
            onChange={(e) => setTechnicianFilter(e.target.value)}
          >
            <MenuItem value="all">Todos</MenuItem>
            {technicians.map((tech) => (
              <MenuItem key={tech.id} value={tech.id}>
                {tech.name} {tech.lastName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            size="small"
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 0" },
              minWidth: { sm: 200 },
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "12px",
              },
            }}
            label="Prioridad"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <MenuItem value="all">Todas</MenuItem>
            <MenuItem value="alta">Alta</MenuItem>
            <MenuItem value="media">Media</MenuItem>
            <MenuItem value="baja">Baja</MenuItem>
          </TextField>
        </Box>
      </Box>

      {/* DataGrid */}
      <CustomDataGrid
        columns={columns}
        localRows={filteredAttentions}
        serverSide={false}
        pageSize={10}
        search={searchTerm}
        onSearch={setSearchTerm}
        showToolbar={false}
      />
    </Box>
  );
}