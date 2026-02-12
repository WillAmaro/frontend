// app/logistics/hubs/page.tsx

"use client";

import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Chip,
  Alert,
  Snackbar,
  IconButton,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import BusinessIcon from "@mui/icons-material/Business";
import FilterListIcon from "@mui/icons-material/FilterList";

// import HubForm from "@/components/logistics/hubs/HubForm";
// import HubViewDialog from "@/components/logistics/hubs/HubViewDialog";

import ButtonBase from "@/src/components/base/ButtonBase";
import CustomDataGrid from "@/src/components/base/CustomDataGrid";
import { hubService } from "@/src/services/api/HubService";
import {
  CreateHubRequest,
  HubDTO,
  UpdateHubRequest,
} from "@/src/types/hub.types";
import SelectBase from "@/src/components/base/SelectBase";
import { TitleCard } from "@/src/components/base/TitleCard";

export default function HubsPage() {
  const userState = useSelector((state: any) => state.user);
  const tenantId = userState.tenant_id?.toString() || "";

  // Estados principales
  const [hubs, setHubs] = useState<HubDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [reloadTrigger, setReloadTrigger] = useState(0);

  // Estados de filtros
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [regionFilter, setRegionFilter] = useState<string>("ALL");

  // Estados de diálogos
  const [formOpen, setFormOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedHub, setSelectedHub] = useState<HubDTO | null>(null);

  // Estados de feedback
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });

  // Cargar hubs
  const loadHubs = useCallback(async () => {
    if (!tenantId) {
      setSnackbar({
        open: true,
        message: "No se pudo obtener el tenant ID",
        severity: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const data = await hubService.getAllHubs(tenantId);
      setHubs(data);
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Error al cargar los hubs",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [tenantId]);

  useEffect(() => {
    loadHubs();
  }, [loadHubs, reloadTrigger]);

  // Filtrado de datos
  const filteredHubs = hubs.filter((hub) => {
    const matchesSearch =
      hub.hubName.toLowerCase().includes(search.toLowerCase()) ||
      hub.hubCode.toLowerCase().includes(search.toLowerCase()) ||
      hub.address.toLowerCase().includes(search.toLowerCase()) ||
      hub.districtName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || hub.status === statusFilter;

    const matchesRegion =
      regionFilter === "ALL" || hub.regionName === regionFilter;

    return matchesSearch && matchesStatus && matchesRegion;
  });

  // Obtener regiones únicas
  const uniqueRegions = Array.from(
    new Set(hubs.map((hub) => hub.regionName)),
  ).sort();

  const uniqueStates = Array.from(
    new Set(hubs.map((hub) => hub.status)),
  ).sort();

  // Handlers
  const handleCreate = () => {
    setSelectedHub(null);
    setFormOpen(true);
  };

  const handleEdit = (hub: HubDTO) => {
    setSelectedHub(hub);
    setFormOpen(true);
  };

  const handleView = (hub: HubDTO) => {
    setSelectedHub(hub);
    setViewOpen(true);
  };

  const handleDelete = async (hub: HubDTO) => {
    if (
      !window.confirm(
        `¿Está seguro de eliminar el hub "${hub.hubName}"?\n\nEsta acción no se puede deshacer.`,
      )
    ) {
      return;
    }

    try {
      await hubService.deleteHub(hub.id);
      setSnackbar({
        open: true,
        message: "Hub eliminado exitosamente",
        severity: "success",
      });
      setReloadTrigger((prev) => prev + 1);
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Error al eliminar el hub",
        severity: "error",
      });
    }
  };

  const handleSubmit = async (data: CreateHubRequest | UpdateHubRequest) => {
    try {
      if (selectedHub) {
        await hubService.updateHub(selectedHub.id, data as UpdateHubRequest);
        setSnackbar({
          open: true,
          message: "Hub actualizado exitosamente",
          severity: "success",
        });
      } else {
        await hubService.createHub(data as CreateHubRequest);
        setSnackbar({
          open: true,
          message: "Hub creado exitosamente",
          severity: "success",
        });
      }
      setReloadTrigger((prev) => prev + 1);
      setFormOpen(false);
    } catch (error) {
      throw error; // El formulario maneja el error
    }
  };

  const handleRefresh = () => {
    setReloadTrigger((prev) => prev + 1);
  };

  // Función para obtener color de estado
  const getStatusColor = (status: string): "success" | "error" | "warning" => {
    switch (status) {
      case "ACTIVE":
        return "success";
      case "INACTIVE":
        return "error";
      case "MAINTENANCE":
        return "warning";
      default:
        return "success";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "Activo";
      case "INACTIVE":
        return "Inactivo";
      case "MAINTENANCE":
        return "Mantenimiento";
      default:
        return status;
    }
  };

  // Definición de columnas
  const columns: GridColDef[] = [
    {
      field: "hubCode",
      headerName: "Código",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            fontWeight: 600,
            background: "rgba(144, 202, 249, 0.15)",
            color: "primary.main",
          }}
        />
      ),
    },
    {
      field: "hubName",
      headerName: "Nombre del Hub",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            height: "100%",
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.address}
          </Typography>
        </Box>
      ),
    },
    {
      field: "districtName",
      headerName: "Distrito",
      width: 150,
    },
    {
      field: "regionName",
      headerName: "Región",
      width: 150,
    },
    {
      field: "countryName",
      headerName: "País",
      width: 120,
    },
    {
      field: "maxCapacity",
      headerName: "Capacidad",
      width: 130,     
      renderCell: (params) => (
        <Box sx={{display:"flex",height:"100%" , alignItems:"center"}}>
          <Typography variant="body2" fontWeight={600}>
          {params.value.toLocaleString()} 
        </Typography>
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Estado",
      width: 140,
      renderCell: (params) => (
        <Chip
          label={getStatusLabel(params.value)}
          color={getStatusColor(params.value)}
          size="small"
          sx={{ fontWeight: 600 }}
        />
      ),
    },
    {
      field: "isActive",
      headerName: "Habilitado",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value ? "Sí" : "No"}
          color={params.value ? "success" : "default"}
          size="small"
          variant="outlined"
        />
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      {/* <Box
        sx={{
          mb: 3,
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          borderRadius: 3,
          p: 3,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                background: "rgba(144, 202, 249, 0.15)",
                borderRadius: 2,
                p: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BusinessIcon sx={{ fontSize: 32, color: "primary.main" }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight={700} color="white">
                Gestión de Hubs
              </Typography>
              <Typography variant="body2" color="white">
                Administra los centros logísticos de la organización
              </Typography>
            </Box>
          </Box>

          <Box display="flex" gap={1}>
      
            <ButtonBase
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreate}
              label=" Nuevo Hub"
            />
          </Box>
        </Box>
      </Box> */}
      <TitleCard
        icon={<BusinessIcon sx={{ fontSize: 32 }} />}
        title="Gestión de Hubs"
        description="Administra los centros logísticos de la organización"
      />

      {/* Estadísticas rápidas */}
      <Box display="flex" gap={2} mb={2} flexWrap="wrap" mt={4}>
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            minWidth: 200,
            maxWidth: 200,

            p: 2,
            borderRadius: "12px",
            background: "rgba(76, 175, 80, 0.1)",
            border: "1px solid rgba(76, 175, 80, 0.3)",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Total Hubs
          </Typography>
          <Typography variant="h4" fontWeight={700} color="success.main">
            {hubs.length}
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
            p: 2,
            borderRadius: "12px",

            background: "rgba(76, 175, 80, 0.1)",
            border: "1px solid rgba(76, 175, 80, 0.3)",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Hubs Activos
          </Typography>
          <Typography variant="h4" fontWeight={700} color="success.main">
            {hubs.filter((h) => h.status === "ACTIVE").length}
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
            p: 2,
            borderRadius: "12px",
            background: "rgba(255, 152, 0, 0.1)",
            border: "1px solid rgba(255, 152, 0, 0.3)",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            En Mantenimiento
          </Typography>
          <Typography variant="h4" fontWeight={700} color="warning.main">
            {hubs.filter((h) => h.status === "MAINTENANCE").length}
          </Typography>
        </Paper>

        {/* <Paper
          elevation={0}
          sx={{
            flex: 1,
            minWidth: 200,
            maxWidth: 200,

            p: 2,
            borderRadius: "12px",

            background: "rgba(144, 202, 249, 0.1)",
            border: "1px solid rgba(144, 202, 249, 0.3)",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Capacidad Total
          </Typography>
          <Typography variant="h4" fontWeight={700} color="primary.main">
            {hubs.reduce((sum, h) => sum + h.maxCapacity, 0).toLocaleString()}
          </Typography>
        </Paper> */}
      </Box>

      {/* Filtros */}
      <Box sx={{ paddingBlock: 3 }}>
        <Box display="flex" gap={2} flexWrap="wrap">
          <Box sx={{ minWidth: "200px" }}>
            <SelectBase
              label="Estado"
              value={statusFilter}
              options={uniqueStates.map((item, index) => ({
                label: item,
                value: index,
              }))}
              onChange={(e: any) => setStatusFilter(e)}
            />
          </Box>
          <Box sx={{ minWidth: "200px" }}>
            <SelectBase
              label="Región"
              value={regionFilter}
              options={uniqueRegions.map((item, index) => ({
                label: item,
                value: index,
              }))}
              onChange={(e: any) => setRegionFilter(e)}
            />
          </Box>

          {(statusFilter !== "ALL" || regionFilter !== "ALL") && (
            <ButtonBase
              variant="outlined"
              size="small"
              label="Limpiar Filtros"
              onClick={() => {
                setStatusFilter("ALL");
                setRegionFilter("ALL");
              }}
            />
          )}
        </Box>
      </Box>

      {/* DataGrid */}
      <Paper
        sx={{
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <CustomDataGrid
          columns={columns}
          localRows={filteredHubs}
          serverSide={false}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          search={search}
          onSearch={setSearch}
          pageSize={10}
          reloadTrigger={reloadTrigger}
          sx={{
            border: "none",
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            },
            "& .MuiDataGrid-columnHeaders": {
              background: "rgba(255, 255, 255, 0.03)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            },
          }}
        />
      </Paper>

      {/* Diálogos */}
      {/* <HubForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        hub={selectedHub}
        tenantId={tenantId}
      /> */}

      {/* <HubViewDialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        hub={selectedHub}
      /> */}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
