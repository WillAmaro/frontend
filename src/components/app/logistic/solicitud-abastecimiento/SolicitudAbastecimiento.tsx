"use client";

import { SetStateAction, use, useState } from "react";
import { useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Divider,
  Autocomplete,
  Alert,
  Fade,
  Chip,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  AddCircleOutline,
  SaveOutlined,
  ListAltOutlined,
  FileDownloadOutlined,
  SearchOutlined,
  FilterListOutlined,
  RefreshOutlined,
  SendOutlined,
  CheckCircleOutline,
} from "@mui/icons-material";
import { TitleCard } from "@/src/components/base/TitleCard";
import { SectionHeader } from "@/src/components/base/SectionHeader";
import * as XLSX from "xlsx";
import ButtonBase from "@/src/components/base/ButtonBase";
import { API_URL } from "@/src/lib/config";
import DatePickerBase from "@/src/components/base/DatePickerBase";
import dayjs, { Dayjs } from "dayjs";
import SelectBase from "@/src/components/base/SelectBase";
import { toast } from "react-toastify";
import { CatalogService } from "@/src/services/api/CatalogService";
import { CatalogDTO } from "@/src/types/Catalog.types";
import { useGridSelector } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/Store";
import { GridColDef } from "@mui/x-data-grid";
import CustomDataGrid from "@/src/components/base/CustomDataGrid";
// Datos de ejemplo
//const regionesDisponibles = ["Lima", "Arequipa", "Cusco", "Trujillo", "Piura"];

const categoriaConfig = {
  MATERIAL: {
    label: "Material",
    color: "#ed6c02",
    icon: "📦",
  },
  TOOL: {
    label: "Herramienta",
    color: "#1976d2",
    icon: "🔧",
  },
  EQUIPMENT: {
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
  const [fechaEntregaSolicitada, setFechaEntregaSolicitada] = useState("");
  const [region, setRegion] = useState<string | null>(null);
  const [notas, setNotas] = useState("");
  const company = useSelector((state: RootState) => state.companies.company)
  console.log('pintame company::', company)
  //Estados de filtros fechas inicio - fin
  const [valueInit, setValueInit] = useState<Dayjs | null>(dayjs());
  const [valueFin, setValueFin] = useState<Dayjs | null>(dayjs());
  //Estados de filtros fecha de entrega solicitada
  const [valueEntrega, setValueEntrega] = useState<Dayjs | null>(dayjs());
  const [projectOptions, setProjectOptions] = useState<any[]>([])
  // Estados para seleccionar empresa y proyecto
  const [valueEmpresaSeleccionada, setEmpresaSeleccionada] = useState<
    string | number | null
  >(null);
  const [valueProyectoSeleccionado, setProyectoSeleccionado] = useState<
    string | number | null
  >(null);

  const [catalogos, setCatalogos] = useState<CatalogDTO>({
    companies: [],
    projects: []
  });


  useEffect(() => {
    const loadCatalogs = async () => {
      try {
        const data = await CatalogService.getAllCatalogs();

        setCatalogos({
          companies: data.companies,
          projects: data.projects
        });

      } catch (error) {
        console.error(error);
      }
    };

    loadCatalogs();
  }, []);

  const companyOptions = catalogos.companies.map(company => ({
    label: company.reasonSocial,
    value: company.id
  }));

  const handleProjectOptions = (value: number) => {
    const options = catalogos.projects
      .filter(project =>
        String(project.companyId) === String(value)
      )
      .map(project => ({
        label: project.name,
        value: project.id
      }));
    setProjectOptions(options)
  }


  useEffect(() => {
    handleProjectOptions(company)
    setProyectoSeleccionado(null)
  }, [company])

  // Estado principal para almacenar toda la respuesta del API
  const [requestDto, setRequestDto] = useState<SupplyRequestDto | null>(null);

  // Estados para los items separados por tipo (vistas derivadas del requestDto)
  const [materialesAPI, setMaterialesAPI] = useState<SupplyRequestItem[]>([]);
  const [herramientasAPI, setHerramientasAPI] = useState<SupplyRequestItem[]>(
    [],
  );
  const [equiposAPI, setEquiposAPI] = useState<SupplyRequestItem[]>([]);

  // Estados de UI
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessExport, setShowSuccessExport] = useState(false);
  const [showSuccessGenerate, setShowSuccessGenerate] = useState(false);
  const [showSuccessSubmit, setShowSuccessSubmit] = useState(false);
  const [submittedRequestInfo, setSubmittedRequestInfo] =
    useState<SupplyRequestDto | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // TODO: Reemplazar con los valores reales de tu sistema
  const TENANT_ID = "758c176f-bdfd-4490-8c7a-c450333f0c60";
  const HUB_ID = "c0000000-0000-0000-0000-000000000001";
  const USER_ID = "758c176f-bdfd-4490-8c7a-c450333f0c60";

  const handleEntidadChange = (
    _event: React.MouseEvent<HTMLElement>,
    newEntidad: EntidadDestino | null,
  ) => {
    if (newEntidad !== null) {
      setEntidadDestino(newEntidad);
      limpiarDatos();
    }
  };



  const columns: GridColDef[] = [
    {
      field: "itemCode",
      headerName: "Código",
      flex: 1,
      renderCell: (params) => (
        <strong>{params.value}</strong>
      ),
    },
    {
      field: "itemName",
      headerName: "Descripción",
      flex: 2,
    },
    {
      field: "quantityUsedInPeriod",
      headerName: "Consumo Período",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color="info"
          variant="outlined"
        />
      ),
    },
    {
      field: "requestedQuantity",
      headerName: "Cantidad Solicitada",
      type: "number",
      flex: 1,
      editable: true, // 🔥 ACTIVAMOS EDICIÓN
    },
    {
      field: "unitPrice",
      headerName: "Precio Unit.",
      flex: 1,
      align: "right",
      headerAlign: "right",
      valueFormatter: (params: any) =>
        `S/. ${Number(params?.value || 0).toFixed(2)}`,
    },
    {
      field: "totalPrice",
      headerName: "Total",
      flex: 1,
      align: "right",
      headerAlign: "right",
      valueGetter: (params: any) =>
        (params?.row?.requestedQuantity || 0) *
        (params?.row?.unitPrice || 0),
      valueFormatter: (params: any) =>
        `S/. ${Number(params?.value || 0).toFixed(2)}`,
    },
    {
      field: "isUrgent",
      headerName: "Urgente",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: true,
      type: "boolean",
    },
  ];


  const processRowUpdate = (newRow: any, oldRow: any) => {
    const updatedRow = {
      ...newRow,
      totalPrice:
        (newRow.requestedQuantity || 0) *
        (newRow.unitPrice || 0),
    };

    setEquiposAPI((prev) =>
      prev.map((row) =>
        row.id === updatedRow.id ? updatedRow : row
      )
    );

    return updatedRow;
  };



  const limpiarDatos = () => {
    setMaterialesAPI([]);
    setHerramientasAPI([]);
    setEquiposAPI([]);
    setRequestDto(null);
    setErrorMessage("");
    setShowSuccessGenerate(false);
    setShowSuccessSubmit(false);
  };

  const limpiarTodo = () => {
    setFechaSolicitud("");
    setFechaSolicitudFin("");
    setFechaEntregaSolicitada("");
    setRegion(null);
    setNotas("");
    setMaterialesAPI([]);
    setHerramientasAPI([]);
    setEquiposAPI([]);
    setRequestDto(null);
    setErrorMessage("");
    setShowSuccessGenerate(false);
    setShowSuccessExport(false);
  };

  // Función para actualizar el requestDto cuando cambian los items
  const actualizarRequestDto = (nuevosItems: SupplyRequestItem[]) => {
    if (!requestDto) return;

    const totalQuantity = nuevosItems.reduce(
      (sum, item) => sum + item.requestedQuantity,
      0,
    );
    const totalEstimatedValue = nuevosItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0,
    );

    setRequestDto({
      ...requestDto,
      items: nuevosItems,
      totalQuantity,
      totalEstimatedValue,
      totalItemsCount: nuevosItems.length,
    });
  };

  // Handler para generar/obtener solicitud desde el período
  const handleGenerarSolicitud = async () => {
    // if (!valueInit || !valueFin) {
    //   setErrorMessage("Debes seleccionar fecha de inicio y fin del período");
    //   return;
    // }
    toast.info("soy muy pro", {
      position: "top-right"
    })
    setLoading(true);
    setErrorMessage("");
    setShowSuccessGenerate(false);
    setShowSuccessSubmit(false);

    try {
      const response = await fetch(`${API_URL}/api/hub-supply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //proyect id 
          hubId: 1,
          periodStartDate: valueInit?.format("YYYY-MM-DD"),
          periodEndDate: valueFin?.format("YYYY-MM-DD"),
          periodValueEntrega: valueEntrega?.format("YYYY-MM-DD"),
          tenantId: company,
          projectId: valueProyectoSeleccionado,
          requestedBy: 1,
          notes:
            notas ||
            `Solicitud generada para período ${valueInit} - ${valueFin}`,
          requestedDeliveryDate: valueEntrega?.format("YYYY-MM-DD"),
        }),
      });

      if (!response.ok) {
        throw new Error("Error al generar la solicitud de abastecimiento");
      }

      const data: SupplyRequestDto = await response.json();

      // Guardar la solicitud completa en requestDto
      setRequestDto(data);

      // Separar items por tipo de producto
      const materiales = data.items.filter(
        (item) => item.productType === "MATERIAL",
      );
      const herramientas = data.items.filter(
        (item) => item.productType === "TOOL",
      );
      const equipos = data.items.filter(
        (item) => item.productType === "EQUIPMENT",
      );

      setMaterialesAPI(materiales);
      setHerramientasAPI(herramientas);
      setEquiposAPI(equipos);

      setShowSuccessGenerate(true);
    } catch (error) {
      console.error("Error al generar solicitud:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Error al cargar los datos del período",
      );
    } finally {
      setLoading(false);
    }
  };

  // Actualizar cantidad solicitada y sincronizar con requestDto
  const actualizarCantidadMaterial = (itemId: string, cantidad: string) => {
    const cantidadNum = parseInt(cantidad) || 0;

    setMaterialesAPI((prev) => {
      const updated = prev.map((item) =>
        item.id === itemId
          ? {
            ...item,
            requestedQuantity: cantidadNum,
            totalPrice: cantidadNum * item.unitPrice,
            pendingQuantity: cantidadNum - item.deliveredQuantity,
          }
          : item,
      );

      // Sincronizar con requestDto
      if (requestDto) {
        const todosLosItems = [...updated, ...herramientasAPI, ...equiposAPI];
        actualizarRequestDto(todosLosItems);
      }

      return updated;
    });
  };

  const actualizarCantidadHerramienta = (itemId: string, cantidad: string) => {
    const cantidadNum = parseInt(cantidad) || 0;

    setHerramientasAPI((prev) => {
      const updated = prev.map((item) =>
        item.id === itemId
          ? {
            ...item,
            requestedQuantity: cantidadNum,
            totalPrice: cantidadNum * item.unitPrice,
            pendingQuantity: cantidadNum - item.deliveredQuantity,
          }
          : item,
      );

      // Sincronizar con requestDto
      if (requestDto) {
        const todosLosItems = [...materialesAPI, ...updated, ...equiposAPI];
        actualizarRequestDto(todosLosItems);
      }

      return updated;
    });
  };

  const actualizarCantidadEquipo = (itemId: string, cantidad: string) => {
    const cantidadNum = parseInt(cantidad) || 0;

    setEquiposAPI((prev) => {
      const updated = prev.map((item) =>
        item.id === itemId
          ? {
            ...item,
            requestedQuantity: cantidadNum,
            totalPrice: cantidadNum * item.unitPrice,
            pendingQuantity: cantidadNum - item.deliveredQuantity,
          }
          : item,
      );

      // Sincronizar con requestDto
      if (requestDto) {
        const todosLosItems = [
          ...materialesAPI,
          ...herramientasAPI,
          ...updated,
        ];
        actualizarRequestDto(todosLosItems);
      }

      return updated;
    });
  };

  // Marcar item como urgente y sincronizar
  const toggleUrgente = (
    itemId: string,
    tipo: "MATERIAL" | "TOOL" | "EQUIPMENT",
  ) => {
    const setter =
      tipo === "MATERIAL"
        ? setMaterialesAPI
        : tipo === "TOOL"
          ? setHerramientasAPI
          : setEquiposAPI;

    setter((prev) => {
      const updated = prev.map((item) =>
        item.id === itemId ? { ...item, isUrgent: !item.isUrgent } : item,
      );

      // Sincronizar con requestDto
      if (requestDto) {
        const todosLosItems =
          tipo === "MATERIAL"
            ? [...updated, ...herramientasAPI, ...equiposAPI]
            : tipo === "TOOL"
              ? [...materialesAPI, ...updated, ...equiposAPI]
              : [...materialesAPI, ...herramientasAPI, ...updated];

        actualizarRequestDto(todosLosItems);
      }

      return updated;
    });
  };

  const handleGuardarBorrador = async () => {
    if (!requestDto) {
      alert("No hay datos para guardar");
      return;
    }

    // TODO: Implementar endpoint para actualizar borrador
    console.log("Guardando borrador...", requestDto);
    alert("Borrador guardado correctamente");
  };

  const handleSubmit = () => {
    //monitorear los cambios de la solicitud ,
    //cambiar el estado a confirmado 
    //peraparar un api rest que reciba parametro de estado, e items,
    //invocar a la funcion exportarExcel
    //levantar un modal informativo con la respuesta el api
    // numero de solicitud
    // periodos de consulta
    // empresa y proyecto
    //pinte la cantidad de items segun tipo de producto
  }

  // Confirmar y enviar solicitud
  const handleConfirmarSolicitud = () => {
    if (!requestDto) {
      alert("No hay datos para enviar");
      return;
    }

    // Validar que haya al menos un item con cantidad > 0
    const hasItems = requestDto.items.some(
      (item) => item.requestedQuantity > 0,
    );
    if (!hasItems) {
      setErrorMessage(
        "Debes tener al menos un item con cantidad mayor a 0 para enviar la solicitud",
      );
      return;
    }

    setConfirmDialogOpen(true);
  };

  const handleEnviarSolicitud = async () => {
    if (!requestDto) return;

    setConfirmDialogOpen(false);
    setSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `${API_URL}/api/supply-requests/${requestDto.id}/submit?tenantId=${TENANT_ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            submittedBy: USER_ID,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al enviar la solicitud");
      }

      const submittedRequest: SupplyRequestDto = await response.json();

      // Guardar la información de la solicitud enviada
      setSubmittedRequestInfo(submittedRequest);

      // Limpiar todos los datos del formulario y grilla
      limpiarTodo();

      // Mostrar mensaje de éxito permanente
      setShowSuccessSubmit(true);
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Error al enviar la solicitud",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Exportar Excel por categoría individual
  const exportarMateriales = () => {
    if (materialesAPI.length === 0) {
      alert("No hay materiales para exportar");
      return;
    }
    exportarCategoria(
      materialesAPI.map((m) => ({
        Código: m.itemCode,
        Descripción: m.itemName,
        "Consumo Período": m.quantityUsedInPeriod,
        "Cantidad Solicitada": m.requestedQuantity,
        "Unidad de Medida": m.uom || "UND",
        "Precio Unitario": m.unitPrice,
        "Precio Total": m.totalPrice,
        Urgente: m.isUrgent ? "SÍ" : "NO",
      })),
      "Materiales",
    );
  };

  const exportarHerramientas = () => {
    if (herramientasAPI.length === 0) {
      alert("No hay herramientas para exportar");
      return;
    }
    exportarCategoria(
      herramientasAPI.map((h) => ({
        Código: h.itemCode,
        Descripción: h.itemName,
        "Consumo Período": h.quantityUsedInPeriod,
        "Cantidad Solicitada": h.requestedQuantity,
        "Unidad de Medida": h.uom || "UND",
        "Precio Unitario": h.unitPrice,
        "Precio Total": h.totalPrice,
        Urgente: h.isUrgent ? "SÍ" : "NO",
      })),
      "Herramientas",
    );
  };

  const exportarEquipos = () => {
    if (equiposAPI.length === 0) {
      alert("No hay equipos para exportar");
      return;
    }
    exportarCategoria(
      equiposAPI.map((e) => ({
        Código: e.itemCode,
        Descripción: e.itemName,
        "Consumo Período": e.quantityUsedInPeriod,
        "Cantidad Solicitada": e.requestedQuantity,
        "Precio Unitario": e.unitPrice,
        "Precio Total": e.totalPrice,
        Urgente: e.isUrgent ? "SÍ" : "NO",
        Especificaciones: e.specifications || "",
      })),
      "Equipos",
    );
  };

  const exportarCategoria = (datos: any[], nombreCategoria: string) => {
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, nombreCategoria);

    const fecha = new Date().toISOString().split("T")[0];
    XLSX.writeFile(
      workbook,
      `Solicitud_${nombreCategoria}_${entidadDestino}_${requestDto?.requestNumber || fecha
      }.xlsx`,
    );

    setShowSuccessExport(true);
    setTimeout(() => setShowSuccessExport(false), 3000);
  };

  const totalEstimado = requestDto?.totalEstimatedValue || 0;

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
        description="Genera solicitudes de materiales, equipos y herramientas basadas en el consumo de períodos anteriores"
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
          subtitle="Completa los datos del período para analizar el consumo"
        />

        {/* Mensaje de Éxito de Envío - Permanente */}
        {showSuccessSubmit && submittedRequestInfo && (
          <Alert
            severity="success"
            icon={<CheckCircleOutline fontSize="large" />}
            onClose={() => {
              setShowSuccessSubmit(false);
              setSubmittedRequestInfo(null);
            }}
            sx={{
              mb: 3,
              borderRadius: 2,
              boxShadow: "rgba(46, 125, 50, 0.2) 0px 8px 24px",
              border: "2px solid",
              borderColor: "success.main",
            }}
          >
            <Typography variant="body2" fontWeight={700} mb={1}>
              ✅ ¡Solicitud enviada exitosamente!
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="body1" fontWeight={600}>
                Número de Solicitud:{" "}
                <Chip
                  label={submittedRequestInfo.requestNumber}
                  size="small"
                  color="success"
                  sx={{ fontWeight: 700 }}
                />
              </Typography>
              <Typography variant="body2">
                <strong>Estado:</strong> {submittedRequestInfo.status}
              </Typography>
              <Typography variant="body2">
                <strong>Total Items:</strong>{" "}
                {submittedRequestInfo.totalItemsCount}
              </Typography>
              <Typography variant="body2">
                <strong>Cantidad Total:</strong>{" "}
                {submittedRequestInfo.totalQuantity}
              </Typography>
              <Typography variant="body2">
                <strong>Valor Total Estimado:</strong> S/.{" "}
                {submittedRequestInfo.totalEstimatedValue.toFixed(2)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
                La solicitud ha sido enviada para aprobación y está disponible
                en el listado de solicitudes.
              </Typography>
            </Box>
          </Alert>
        )}

        {/* Mensajes de Exportación */}
        {showSuccessExport && (
          <Fade in={showSuccessExport} timeout={600}>
            <Alert
              severity="success"
              sx={{
                mb: 3,
                borderRadius: 2,
                boxShadow: "rgba(46, 125, 50, 0.15) 0px 4px 16px",
              }}
            >
              <Typography variant="body1" fontWeight={600}>
                ✅ Archivo Excel generado exitosamente
              </Typography>
            </Alert>
          </Fade>
        )}

        {/* Mensaje de Generación Exitosa */}
        {showSuccessGenerate && requestDto && (
          <Alert
            severity="success"
            sx={{
              mb: 3,
              borderRadius: 2,
              boxShadow: "rgba(2, 136, 209, 0.15) 0px 4px 16px",
            }}
          >
            <Typography variant="body1" fontWeight={600}>
              ✅ Solicitud generada: {requestDto.requestNumber}
            </Typography>
            <Typography variant="body2">
              Se han cargado {requestDto.totalItemsCount} items con consumo del
              período. Total estimado: S/. {totalEstimado.toFixed(2)}
            </Typography>
          </Alert>
        )}

        {errorMessage && (
          <Alert
            severity="error"
            sx={{ mb: 3, borderRadius: 2 }}
            onClose={() => setErrorMessage("")}
          >
            {errorMessage}
          </Alert>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Filtros de Período */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <FilterListOutlined sx={{ color: "info.main", fontSize: 24 }} />
            <Typography variant="subtitle1" fontWeight={600}>
              Período de análisis de consumo
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "initial",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ flex: "1 1 200px" }}>
              {/* <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={600}
                mb={1}
              >
                Fecha Inicio *
              </Typography> */}
              <DatePickerBase
                value={valueInit}
                setValue={setValueInit}
                label="Fecha inicio"
              />
              {/* <TextField
                type="date"
                fullWidth
                value={fechaSolicitud}
                onChange={(e) => setFechaSolicitud(e.target.value)}
                size="small"
                InputLabelProps={{ shrink: true }}
                required
                disabled={!!requestDto}
              /> */}
            </Box>

            <Box sx={{ flex: "1 1 200px" }}>
              {/*<Typography
                variant="body2"
                color="text.secondary"
                fontWeight={600}
                mb={1}
              >
                Fecha Fin *
              </Typography>*/}
              <DatePickerBase
                value={valueFin}
                setValue={setValueFin}
                label="Fecha Fin"
              />
              {/*<TextField
                type="date"
                fullWidth
                value={fechaSolicitudFin}
                onChange={(e) => setFechaSolicitudFin(e.target.value)}
                size="small"
                InputLabelProps={{ shrink: true }}
                required
                disabled={!!requestDto}
              />*/}
            </Box>

            <Box sx={{ flex: "1 1 200px" }}>
              {/*<Typography
                variant="body2"
                color="text.secondary"
                fontWeight={600}
                mb={1}
              >
                Fecha Entrega Solicitada
              </Typography>*/}
              <DatePickerBase
                value={valueEntrega}
                setValue={setValueEntrega}
                label="Fecha Entrega Solicitada"
              />
              {/*<TextField
                type="date"
                fullWidth
                value={fechaEntregaSolicitada}
                onChange={(e) => setFechaEntregaSolicitada(e.target.value)}
                size="small"
                InputLabelProps={{ shrink: true }}
                disabled={!!requestDto}
              />*/}
            </Box>

            <Box sx={{ flex: "0 0 245px" }}>
              {/* <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={600}
                mb={1}
              >
                Región
              </Typography> */}
              {
                /* <Autocomplete
                value={region}
                onChange={(_, newValue) => setRegion(newValue)}
                options={regionesDisponibles}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Selecciona empresas registradas"
                    size="small"
                  />
                )}
                size="small"
                disabled={!!requestDto}
              /> */
                // <SelectBase
                //   label="Selecciona empresa"
                //   value={valueEmpresaSeleccionada ?? ""}
                //   onChange={setEmpresaSeleccionada}
                //   options={companyOptions}
                //   fullWidth
                //   size="small"
                // //placeholder="Selecciona empresa"
                // />

                <SelectBase
                  label="Selecciona proyecto"
                  value={valueProyectoSeleccionado ?? ""}
                  onChange={setProyectoSeleccionado}
                  options={[{ label: "Seleccionar un proyecto", value: 0 }, ...projectOptions]}
                  fullWidth
                  size="medium"
                //placeholder="Selecciona proyecto"
                />
              }

              {/* Select Proyectos */}
            </Box>


            <Box
              sx={{
                flexShrink: 0,
                ml: { xs: 0, md: 6 },
                mt: { xs: 10, md: 0 },
              }}
            ></Box>
            <ButtonBase
              onClick={handleGenerarSolicitud}
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SearchOutlined />
                )
              }
              label={loading ? "Generando..." : "Generar Solicitud"}
            // disabled={
            //   //loading || !fechaSolicitud || !fechaSolicitudFin || !!requestDto
            //   loading || !valueInit || !valueFin || !valueEntrega || !valueEmpresaSeleccionada || !valueProyectoSeleccionado

            // }
            />
          </Box>
        </Box>

        {/* Campo de notas */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight={600}
            mb={1}
          >
            Notas adicionales
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={2}
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Agrega notas o justificación para esta solicitud..."
            size="small"
            disabled={!!requestDto}
          />
        </Box>

        {requestDto && (
          <>
            <Divider sx={{ my: 3 }} />

            {/* Información de la solicitud generada */}
            <Box
              sx={{
                mb: 3,
                p: 2,
                bgcolor: "primary.lighter",
                borderRadius: 2,
                border: "2px solid",
                borderColor: "primary.main",
              }}
            >
              <Typography variant="subtitle1" fontWeight={700} mb={1}>
                📋 Solicitud: {requestDto.requestNumber}
              </Typography>
              <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                <Typography variant="body2">
                  <strong>Estado:</strong> {requestDto.status}
                </Typography>
                <Typography variant="body2">
                  <strong>Total Items:</strong> {requestDto.totalItemsCount}
                </Typography>
                <Typography variant="body2">
                  <strong>Cantidad Total:</strong> {requestDto.totalQuantity}
                </Typography>
                <Typography variant="body2">
                  <strong>Total Estimado:</strong> S/.{" "}
                  {totalEstimado.toFixed(2)}
                </Typography>
              </Box>
            </Box>

            {/* SECCIÓN MATERIALES */}
            {materialesAPI.length > 0 && (
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
                      variant="body2"
                      fontWeight={600}
                      sx={{ color: categoriaConfig.MATERIAL.color }}
                    >
                      {categoriaConfig.MATERIAL.icon} Materiales
                    </Typography>
                    <Chip
                      label={`${materialesAPI.length} items`}
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
                          sx={{
                            fontWeight: 700,
                            bgcolor: "background.paper",
                            textAlign: "center",
                          }}
                        >
                          Consumo Período
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            bgcolor: "background.paper",
                            width: 150,
                          }}
                        >
                          Cantidad Solicitada
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            bgcolor: "background.paper",
                            textAlign: "right",
                          }}
                        >
                          Precio Unit.
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            bgcolor: "background.paper",
                            textAlign: "right",
                          }}
                        >
                          Total
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            bgcolor: "background.paper",
                            textAlign: "center",
                          }}
                        >
                          Urgente
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {materialesAPI.map((material, index) => (
                        <TableRow
                          key={`${material.id} - ${index}`}
                          sx={{
                            "&:hover": { bgcolor: "action.hover" },
                            bgcolor: material.isUrgent ? "#fff3e0" : "inherit",
                          }}
                        >
                          <TableCell>
                            <Typography variant="body2" fontWeight={600}>
                              {material.itemCode}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {material.itemName}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={material.quantityUsedInPeriod}
                              size="small"
                              color="info"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              size="small"
                              value={material.requestedQuantity}
                              onChange={(e) =>
                                actualizarCantidadMaterial(
                                  material.id,
                                  e.target.value,
                                )
                              }
                              inputProps={{ min: 0 }}
                              sx={{ width: "100%" }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2">
                              S/. {material.unitPrice}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" fontWeight={600}>
                              S/. {material.totalPrice}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox
                              checked={material.isUrgent}
                              onChange={() =>
                                toggleUrgente(material.id, "MATERIAL")
                              }
                              color="warning"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {/* SECCIÓN HERRAMIENTAS */}
            {herramientasAPI.length > 0 && (
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
                      variant="body2"
                      fontWeight={600}
                      sx={{ color: categoriaConfig.TOOL.color }}
                    >
                      {categoriaConfig.TOOL.icon} Herramientas
                    </Typography>
                    <Chip
                      label={`${herramientasAPI.length} items`}
                      size="small"
                      sx={{
                        bgcolor: categoriaConfig.TOOL.color,
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
                    sx={{
                      bgcolor: categoriaConfig.TOOL.color,
                      "&:hover": {
                        bgcolor: categoriaConfig.TOOL.color,
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
                    borderColor: `${categoriaConfig.TOOL.color}30`,
                  }}
                >
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
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
                          sx={{
                            fontWeight: 700,
                            bgcolor: "background.paper",
                            textAlign: "center",
                          }}
                        >
                          Consumo Período
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            bgcolor: "background.paper",
                            width: 150,
                          }}
                        >
                          Cantidad Solicitada
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            bgcolor: "background.paper",
                            textAlign: "right",
                          }}
                        >
                          Precio Unit.
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            bgcolor: "background.paper",
                            textAlign: "right",
                          }}
                        >
                          Total
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            bgcolor: "background.paper",
                            textAlign: "center",
                          }}
                        >
                          Urgente
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {herramientasAPI.map((herramienta) => (
                        <TableRow
                          key={herramienta.id}
                          sx={{
                            "&:hover": { bgcolor: "action.hover" },
                            bgcolor: herramienta.isUrgent
                              ? "#fff3e0"
                              : "inherit",
                          }}
                        >
                          <TableCell>
                            <Typography variant="body2" fontWeight={600}>
                              {herramienta.itemCode}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {herramienta.itemName}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={herramienta.quantityUsedInPeriod}
                              size="small"
                              color="info"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              size="small"
                              value={herramienta.requestedQuantity}
                              onChange={(e) =>
                                actualizarCantidadHerramienta(
                                  herramienta.id,
                                  e.target.value,
                                )
                              }
                              inputProps={{ min: 0 }}
                              sx={{ width: "100%" }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2">
                              S/. {herramienta.unitPrice.toFixed(2)}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" fontWeight={600}>
                              S/. {herramienta.totalPrice.toFixed(2)}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox
                              checked={herramienta.isUrgent}
                              onChange={() =>
                                toggleUrgente(herramienta.id, "TOOL")
                              }
                              color="warning"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {/* SECCIÓN EQUIPOS */}
            {equiposAPI.length > 0 && (
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
                      variant="body2"
                      fontWeight={600}
                      sx={{ color: categoriaConfig.EQUIPMENT.color }}
                    >
                      {categoriaConfig.EQUIPMENT.icon} Equipos
                    </Typography>
                    <Chip
                      label={`${equiposAPI.length} items`}
                      size="small"
                      sx={{
                        bgcolor: categoriaConfig.EQUIPMENT.color,
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
                    sx={{
                      bgcolor: categoriaConfig.EQUIPMENT.color,
                      "&:hover": {
                        bgcolor: categoriaConfig.EQUIPMENT.color,
                        filter: "brightness(0.9)",
                      },
                      textTransform: "none",
                    }}
                  />
                </Box>

                <CustomDataGrid
                  columns={columns}
                  localRows={equiposAPI}
                  serverSide={false}
                  search={""}
                  onSearch={() => { }}
                  editMode="cell"
                  processRowUpdate={processRowUpdate}
                />

                {/* <TableContainer
                  component={Paper}
                  sx={{
                    maxHeight: 400,
                    border: "2px solid",
                    borderColor: `${categoriaConfig.EQUIPMENT.color}30`,
                  }}
                >
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
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
                          sx={{
                            fontWeight: 700,
                            bgcolor: "background.paper",
                            textAlign: "center",
                          }}
                        >
                          Consumo Período
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            bgcolor: "background.paper",
                            width: 150,
                          }}
                        >
                          Cantidad Solicitada
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            bgcolor: "background.paper",
                            textAlign: "right",
                          }}
                        >
                          Precio Unit.
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            bgcolor: "background.paper",
                            textAlign: "right",
                          }}
                        >
                          Total
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            bgcolor: "background.paper",
                            textAlign: "center",
                          }}
                        >
                          Urgente
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {equiposAPI.map((equipo,index) => (
                        <TableRow
                          key={`${equipo.id} - ${index}`}
                          sx={{
                            "&:hover": { bgcolor: "action.hover" },
                            bgcolor: equipo.isUrgent ? "#fff3e0" : "inherit",
                          }}
                        >
                          <TableCell>
                            <Typography variant="body2" fontWeight={600}>
                              {equipo.itemCode}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {equipo.itemName}
                            </Typography>
                            {equipo.specifications && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                display="block"
                              >
                                {equipo.specifications}
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={equipo.quantityUsedInPeriod}
                              size="small"
                              color="info"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              size="small"
                              value={equipo.requestedQuantity}
                              onChange={(e) =>
                                actualizarCantidadEquipo(
                                  equipo.id,
                                  e.target.value,
                                )
                              }
                              inputProps={{ min: 0 }}
                              sx={{ width: "100%" }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2">
                              S/. {equipo.unitPrice?.toFixed(2)}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" fontWeight={600}>
                              S/. {equipo.totalPrice?.toFixed(2)}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox
                              checked={equipo.isUrgent}
                              onChange={() =>
                                toggleUrgente(equipo.id, "EQUIPMENT")
                              }
                              color="warning"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer> */}
              </Box>
            )}

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
                label="Recargar Datos"
                startIcon={<RefreshOutlined />}
                onClick={handleGenerarSolicitud}
                disabled={loading}
                sx={{
                  textTransform: "none",
                  px: 4,
                  py: 1.2,
                }}
              />

              <ButtonBase
                variant="outlined"
                label="Guardar Borrador"
                startIcon={<SaveOutlined />}
                onClick={handleGuardarBorrador}
                sx={{
                  textTransform: "none",
                  px: 4,
                  py: 1.2,
                }}
              />

              <ButtonBase
                label={
                  submitting ? "Enviando..." : "Confirmar y Enviar Solicitud"
                }
                startIcon={
                  submitting ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <SendOutlined />
                  )
                }
                onClick={handleConfirmarSolicitud}
                disabled={submitting || requestDto.status !== "DRAFT"}
              />
            </Box>
          </>
        )}
      </Card>

      {/* Dialog de Confirmación */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="body2" fontWeight={600}>
            ⚠️ Confirmar Envío de Solicitud
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" mb={2}>
            ¿Estás seguro de enviar esta solicitud para aprobación?
          </Typography>
          <Box
            sx={{
              p: 2,
              bgcolor: "background.default",
              borderRadius: 2,
              mb: 2,
            }}
          >
            <Typography variant="body2" fontWeight={600} mb={1}>
              Resumen de la solicitud:
            </Typography>
            <Typography variant="body2">
              • Número: {requestDto?.requestNumber}
            </Typography>
            <Typography variant="body2">
              • Total Items: {requestDto?.totalItemsCount}
            </Typography>
            <Typography variant="body2">
              • Cantidad Total: {requestDto?.totalQuantity}
            </Typography>
            {/* <Typography variant="body2">
              • Valor Estimado: S/. {totalEstimado.toFixed(2)}
            </Typography> */}
          </Box>
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            Una vez enviada, la solicitud pasará a estado de aprobación y no
            podrás editarla.
          </Alert>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <ButtonBase
            variant="outlined"
            label="Cancelar"
            onClick={() => setConfirmDialogOpen(false)}
          />
          <ButtonBase
            label="Confirmar Envío"
            startIcon={<SendOutlined />}
            onClick={handleEnviarSolicitud}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
}
