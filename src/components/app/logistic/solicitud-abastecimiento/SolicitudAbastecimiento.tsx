// "use client";

// import { SetStateAction, use, useState } from "react";
// import { useEffect } from "react";
// import {
//   Box,
//   Card,
//   Typography,
//   TextField,
//   Divider,
//   Autocomplete,
//   Alert,
//   Fade,
//   Chip,
//   Checkbox,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
//   Stack,
// } from "@mui/material";
// import {
//   AddCircleOutline,
//   SaveOutlined,
//   ListAltOutlined,
//   FileDownloadOutlined,
//   SearchOutlined,
//   FilterListOutlined,
//   RefreshOutlined,
//   SendOutlined,
//   CheckCircleOutline,
//   Close,
//   AssignmentOutlined,
//   Inventory2Outlined,
//   WarningAmberOutlined,
//   EventOutlined,
// } from "@mui/icons-material";
// import { TitleCard } from "@/src/components/base/TitleCard";
// import { SectionHeader } from "@/src/components/base/SectionHeader";
// import * as XLSX from "xlsx";
// import ButtonBase from "@/src/components/base/ButtonBase";
// import { API_URL } from "@/src/lib/config";
// import DatePickerBase from "@/src/components/base/DatePickerBase";
// import dayjs, { Dayjs } from "dayjs";
// import SelectBase from "@/src/components/base/SelectBase";
// import { toast } from "react-toastify";
// import { CatalogService } from "@/src/services/api/CatalogService";
// import { CatalogDTO } from "@/src/types/Catalog.types";
// import { useGridSelector } from "@mui/x-data-grid";
// import { useSelector } from "react-redux";
// import { RootState } from "@/src/store/Store";
// import { GridColDef } from "@mui/x-data-grid";
// import CustomDataGrid from "@/src/components/base/CustomDataGrid";
// // Datos de ejemplo
// //const regionesDisponibles = ["Lima", "Arequipa", "Cusco", "Trujillo", "Piura"];

// const categoriaConfig = {
//   MATERIAL: {
//     label: "Material",
//     color: "#ed6c02",
//     icon: "📦",
//   },
//   TOOL: {
//     label: "Herramienta",
//     color: "#1976d2",
//     icon: "🔧",
//   },
//   EQUIPMENT: {
//     label: "Equipo",
//     color: "#2e7d32",
//     icon: "⚙️",
//   },
// };

// const entidadConfig = {
//   CLARO: {
//     label: "CLARO",
//     color: "#d32f2f",
//     bgColor: "#ffebee",
//   },
//   LEMCORP: {
//     label: "LEMCORP",
//     color: "#1976d2",
//     bgColor: "#e3f2fd",
//   },
// };

// export default function SolicitudAbastecimiento() {
//   const [entidadDestino, setEntidadDestino] = useState<EntidadDestino>("CLARO");
//   const [fechaSolicitud, setFechaSolicitud] = useState("");
//   const [fechaSolicitudFin, setFechaSolicitudFin] = useState("");
//   const [fechaEntregaSolicitada, setFechaEntregaSolicitada] = useState("");
//   const [region, setRegion] = useState<string | null>(null);
//   const [notas, setNotas] = useState("");
//   const company = useSelector((state: RootState) => state.companies.company)
//   console.log('pintame company::', company)
//   //Estados de filtros fechas inicio - fin
//   const [valueInit, setValueInit] = useState<Dayjs | null>(dayjs());
//   const [valueFin, setValueFin] = useState<Dayjs | null>(dayjs());
//   //Estados de filtros fecha de entrega solicitada
//   const [valueEntrega, setValueEntrega] = useState<Dayjs | null>(dayjs());
//   const [projectOptions, setProjectOptions] = useState<any[]>([])
//   // Estados para seleccionar empresa y proyecto
//   const [valueEmpresaSeleccionada, setEmpresaSeleccionada] = useState<
//     string | number | null
//   >(null);
//   const [valueProyectoSeleccionado, setProyectoSeleccionado] = useState<
//     string | number | null
//   >(null);

//   const [catalogos, setCatalogos] = useState<CatalogDTO>({
//     companies: [],
//     projects: []
//   });


//   useEffect(() => {
//     const loadCatalogs = async () => {
//       try {
//         const data = await CatalogService.getAllCatalogs();

//         setCatalogos({
//           companies: data.companies,
//           projects: data.projects
//         });

//       } catch (error) {
//         console.error(error);
//       }
//     };

//     loadCatalogs();
//   }, []);

//   const companyOptions = catalogos.companies.map(company => ({
//     label: company.reasonSocial,
//     value: company.id
//   }));

//   const handleProjectOptions = (value: number) => {
//     const options = catalogos.projects
//       .filter(project =>
//         String(project.companyId) === String(value)
//       )
//       .map(project => ({
//         label: project.name,
//         value: project.id
//       }));
//     setProjectOptions(options)
//   }


//   useEffect(() => {
//     handleProjectOptions(company)
//     setProyectoSeleccionado(null)
//   }, [company])

//   // Estado principal para almacenar toda la respuesta del API
//   const [requestDto, setRequestDto] = useState<SupplyRequestDto | null>(null);

//   // Estados para los items separados por tipo (vistas derivadas del requestDto)
//   const [materialesAPI, setMaterialesAPI] = useState<SupplyRequestItem[]>([]);
//   const [herramientasAPI, setHerramientasAPI] = useState<SupplyRequestItem[]>(
//     [],
//   );
//   const [equiposAPI, setEquiposAPI] = useState<SupplyRequestItem[]>([]);

//   // Estados de UI
//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [showSuccessExport, setShowSuccessExport] = useState(false);
//   const [showSuccessGenerate, setShowSuccessGenerate] = useState(false);
//   const [showSuccessSubmit, setShowSuccessSubmit] = useState(false);
//   const [submittedRequestInfo, setSubmittedRequestInfo] =
//     useState<SupplyRequestDto | null>(null);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
//   console.log(submittedRequestInfo, "testing")
//   // TODO: Reemplazar con los valores reales de tu sistema
//   const TENANT_ID = "758c176f-bdfd-4490-8c7a-c450333f0c60";
//   const HUB_ID = "c0000000-0000-0000-0000-000000000001";
//   const USER_ID = "758c176f-bdfd-4490-8c7a-c450333f0c60";

//   const handleEntidadChange = (
//     _event: React.MouseEvent<HTMLElement>,
//     newEntidad: EntidadDestino | null,
//   ) => {
//     if (newEntidad !== null) {
//       setEntidadDestino(newEntidad);
//       limpiarDatos();
//     }
//   };



//   const columns: GridColDef[] = [
//     {
//       field: "itemCode",
//       headerName: "Código",
//       flex: 1,
//       renderCell: (params) => (
//         <strong>{params.value}</strong>
//       ),
//     },
//     {
//       field: "itemName",
//       headerName: "Descripción",
//       flex: 2,
//     },
//     {
//       field: "quantityUsedInPeriod",
//       headerName: "Consumo Período",
//       flex: 1,
//       align: "center",
//       headerAlign: "center",
//       renderCell: (params) => (
//         <Chip
//           label={params.value}
//           size="small"
//           color="info"
//           variant="outlined"
//         />
//       ),
//     },
//     {
//       field: "requestedQuantity",
//       headerName: "Cantidad Solicitada",
//       type: "number",
//       flex: 1,
//       editable: true, // 🔥 ACTIVAMOS EDICIÓN
//     },
//     // {
//     //   field: "unitPrice",
//     //   headerName: "Precio Unit.",
//     //   flex: 1,
//     //   align: "right",
//     //   headerAlign: "right",
//     //   valueFormatter: (params: any) =>
//     //     `S/. ${Number(params?.value || 0).toFixed(2)}`,
//     // },
//     // {
//     //   field: "totalPrice",
//     //   headerName: "Total",
//     //   flex: 1,
//     //   align: "right",
//     //   headerAlign: "right",
//     //   valueGetter: (params: any) =>
//     //     (params?.row?.requestedQuantity || 0) *
//     //     (params?.row?.unitPrice || 0),
//     //   valueFormatter: (params: any) =>
//     //     `S/. ${Number(params?.value || 0).toFixed(2)}`,
//     // },
//     {
//       field: "isUrgent",
//       headerName: "Urgente",
//       flex: 1,
//       align: "center",
//       headerAlign: "center",
//       editable: true,
//       type: "boolean",
//     },
//   ];

//   // Handler para Materiales
//   const processRowUpdateMaterial = (newRow: any) => {
//     const updatedRow = {
//       ...newRow,
//       totalPrice: (newRow.requestedQuantity || 0) * (newRow.unitPrice || 0),
//       pendingQuantity: (newRow.requestedQuantity || 0) - (newRow.deliveredQuantity || 0),
//     };

//     setMaterialesAPI((prev) =>
//       prev.map((row) => (row.id === updatedRow.id ? updatedRow : row))
//     );

//     // Sincronizar con el DTO principal
//     if (requestDto) {
//       const todosLosItems = [...materialesAPI.map(r => r.id === updatedRow.id ? updatedRow : r), ...herramientasAPI, ...equiposAPI];
//       actualizarRequestDto(todosLosItems);
//     }

//     return updatedRow;
//   };

//   const exportarSolicitudCompletaExcel = (requestData: SupplyRequestDto) => {
//     const workbook = XLSX.utils.book_new();

//     // Función interna para transformar items a formato Excel
//     const prepararDatos = (items: SupplyRequestItem[]) => items.map(item => ({
//       Código: item.itemCode,
//       Descripción: item.itemName,
//       "Consumo Período": item.quantityUsedInPeriod,
//       "Cantidad Solicitada": item.requestedQuantity,
//       "Unidad de Medida": item.uom || "UND",
//       "Precio Unitario": item.unitPrice,
//       "Precio Total": item.totalPrice,
//       Urgente: item.isUrgent ? "SÍ" : "NO",
//     }));

//     // Agregar Hoja de Materiales
//     if (materialesAPI.length > 0) {
//       const wsMat = XLSX.utils.json_to_sheet(prepararDatos(materialesAPI));
//       XLSX.utils.book_append_sheet(workbook, wsMat, "Materiales");
//     }

//     // Agregar Hoja de Herramientas
//     if (herramientasAPI.length > 0) {
//       const wsHer = XLSX.utils.json_to_sheet(prepararDatos(herramientasAPI));
//       XLSX.utils.book_append_sheet(workbook, wsHer, "Herramientas");
//     }

//     // Agregar Hoja de Equipos
//     if (equiposAPI.length > 0) {
//       const wsEqu = XLSX.utils.json_to_sheet(prepararDatos(equiposAPI));
//       XLSX.utils.book_append_sheet(workbook, wsEqu, "Equipos");
//     }

//     // Generar nombre de archivo y descargar
//     const nombreArchivo = `Solicitud_Abastecimiento_${requestData.requestNumber}.xlsx`;
//     XLSX.writeFile(workbook, nombreArchivo);
//   };

//   // Handler para Herramientas
//   const processRowUpdateTool = (newRow: any) => {
//     const updatedRow = {
//       ...newRow,
//       totalPrice: (newRow.requestedQuantity || 0) * (newRow.unitPrice || 0),
//       pendingQuantity: (newRow.requestedQuantity || 0) - (newRow.deliveredQuantity || 0),
//     };

//     setHerramientasAPI((prev) =>
//       prev.map((row) => (row.id === updatedRow.id ? updatedRow : row))
//     );

//     if (requestDto) {
//       const todosLosItems = [...materialesAPI, ...herramientasAPI.map(r => r.id === updatedRow.id ? updatedRow : r), ...equiposAPI];
//       actualizarRequestDto(todosLosItems);
//     }

//     return updatedRow;
//   };


//   const processRowUpdate = (newRow: any, oldRow: any) => {
//     const updatedRow = {
//       ...newRow,
//       totalPrice:
//         (newRow.requestedQuantity || 0) *
//         (newRow.unitPrice || 0),
//     };

//     setEquiposAPI((prev) =>
//       prev.map((row) =>
//         row.id === updatedRow.id ? updatedRow : row
//       )
//     );

//     return updatedRow;
//   };



//   const limpiarDatos = () => {
//     setMaterialesAPI([]);
//     setHerramientasAPI([]);
//     setEquiposAPI([]);
//     setRequestDto(null);
//     setErrorMessage("");
//     setShowSuccessGenerate(false);
//     setShowSuccessSubmit(false);
//   };

//   const limpiarTodo = () => {
//     setFechaSolicitud("");
//     setFechaSolicitudFin("");
//     setFechaEntregaSolicitada("");
//     setRegion(null);
//     setNotas("");
//     setMaterialesAPI([]);
//     setHerramientasAPI([]);
//     setEquiposAPI([]);
//     setRequestDto(null);
//     setErrorMessage("");
//     setShowSuccessGenerate(false);
//     setShowSuccessExport(false);
//   };

//   // Función para actualizar el requestDto cuando cambian los items
//   const actualizarRequestDto = (nuevosItems: SupplyRequestItem[]) => {
//     if (!requestDto) return;

//     const totalQuantity = nuevosItems.reduce(
//       (sum, item) => sum + item.requestedQuantity,
//       0,
//     );
//     const totalEstimatedValue = nuevosItems.reduce(
//       (sum, item) => sum + item.totalPrice,
//       0,
//     );

//     setRequestDto({
//       ...requestDto,
//       items: nuevosItems,
//       totalQuantity,
//       totalEstimatedValue,
//       totalItemsCount: nuevosItems.length,
//     });
//   };

//   // Handler para generar/obtener solicitud desde el período
//   const handleGenerarSolicitud = async () => {
//     // if (!valueInit || !valueFin) {
//     //   setErrorMessage("Debes seleccionar fecha de inicio y fin del período");
//     //   return;
//     // }
//     toast.info("soy muy pro", {
//       position: "top-right"
//     })
//     setLoading(true);
//     setErrorMessage("");
//     setShowSuccessGenerate(false);
//     setShowSuccessSubmit(false);

//     try {
//       const response = await fetch(`${API_URL}/api/hub-supply`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           //proyect id 
//           hubId: 1,
//           periodStartDate: valueInit?.format("YYYY-MM-DD"),
//           periodEndDate: valueFin?.format("YYYY-MM-DD"),
//           periodValueEntrega: valueEntrega?.format("YYYY-MM-DD"),
//           tenantId: company,
//           projectId: valueProyectoSeleccionado,
//           requestedBy: 1,
//           notes:
//             notas ||
//             `Solicitud generada para período ${valueInit} - ${valueFin}`,
//           requestedDeliveryDate: valueEntrega?.format("YYYY-MM-DD"),
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Error al generar la solicitud de abastecimiento");
//       }

//       const data: SupplyRequestDto = await response.json();

//       // Guardar la solicitud completa en requestDto
//       setRequestDto(data);

//       // Separar items por tipo de producto
//       const materiales = data.items.filter(
//         (item) => item.productType === "MATERIAL",
//       );
//       const herramientas = data.items.filter(
//         (item) => item.productType === "TOOL",
//       );
//       const equipos = data.items.filter(
//         (item) => item.productType === "EQUIPMENT",
//       );

//       setMaterialesAPI(materiales);
//       setHerramientasAPI(herramientas);
//       setEquiposAPI(equipos);

//       setShowSuccessGenerate(true);
//     } catch (error) {
//       console.error("Error al generar solicitud:", error);
//       setErrorMessage(
//         error instanceof Error
//           ? error.message
//           : "Error al cargar los datos del período",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Actualizar cantidad solicitada y sincronizar con requestDto
//   const actualizarCantidadMaterial = (itemId: string, cantidad: string) => {
//     const cantidadNum = parseInt(cantidad) || 0;

//     setMaterialesAPI((prev) => {
//       const updated = prev.map((item) =>
//         item.id === itemId
//           ? {
//             ...item,
//             requestedQuantity: cantidadNum,
//             totalPrice: cantidadNum * item.unitPrice,
//             pendingQuantity: cantidadNum - item.deliveredQuantity,
//           }
//           : item,
//       );

//       // Sincronizar con requestDto
//       if (requestDto) {
//         const todosLosItems = [...updated, ...herramientasAPI, ...equiposAPI];
//         actualizarRequestDto(todosLosItems);
//       }

//       return updated;
//     });
//   };

//   const actualizarCantidadHerramienta = (itemId: string, cantidad: string) => {
//     const cantidadNum = parseInt(cantidad) || 0;

//     setHerramientasAPI((prev) => {
//       const updated = prev.map((item) =>
//         item.id === itemId
//           ? {
//             ...item,
//             requestedQuantity: cantidadNum,
//             totalPrice: cantidadNum * item.unitPrice,
//             pendingQuantity: cantidadNum - item.deliveredQuantity,
//           }
//           : item,
//       );

//       // Sincronizar con requestDto
//       if (requestDto) {
//         const todosLosItems = [...materialesAPI, ...updated, ...equiposAPI];
//         actualizarRequestDto(todosLosItems);
//       }

//       return updated;
//     });
//   };

//   const actualizarCantidadEquipo = (itemId: string, cantidad: string) => {
//     const cantidadNum = parseInt(cantidad) || 0;

//     setEquiposAPI((prev) => {
//       const updated = prev.map((item) =>
//         item.id === itemId
//           ? {
//             ...item,
//             requestedQuantity: cantidadNum,
//             totalPrice: cantidadNum * item.unitPrice,
//             pendingQuantity: cantidadNum - item.deliveredQuantity,
//           }
//           : item,
//       );

//       // Sincronizar con requestDto
//       if (requestDto) {
//         const todosLosItems = [
//           ...materialesAPI,
//           ...herramientasAPI,
//           ...updated,
//         ];
//         actualizarRequestDto(todosLosItems);
//       }

//       return updated;
//     });
//   };

//   // Marcar item como urgente y sincronizar
//   const toggleUrgente = (
//     itemId: string,
//     tipo: "MATERIAL" | "TOOL" | "EQUIPMENT",
//   ) => {
//     const setter =
//       tipo === "MATERIAL"
//         ? setMaterialesAPI
//         : tipo === "TOOL"
//           ? setHerramientasAPI
//           : setEquiposAPI;

//     setter((prev) => {
//       const updated = prev.map((item) =>
//         item.id === itemId ? { ...item, isUrgent: !item.isUrgent } : item,
//       );

//       // Sincronizar con requestDto
//       if (requestDto) {
//         const todosLosItems =
//           tipo === "MATERIAL"
//             ? [...updated, ...herramientasAPI, ...equiposAPI]
//             : tipo === "TOOL"
//               ? [...materialesAPI, ...updated, ...equiposAPI]
//               : [...materialesAPI, ...herramientasAPI, ...updated];

//         actualizarRequestDto(todosLosItems);
//       }

//       return updated;
//     });
//   };

//   const handleGuardarBorrador = async () => {
//     if (!requestDto) {
//       alert("No hay datos para guardar");
//       return;
//     }

//     // TODO: Implementar endpoint para actualizar borrador
//     console.log("Guardando borrador...", requestDto);
//     alert("Borrador guardado correctamente");
//   };

//   const handleSubmit = () => {
//     //monitorear los cambios de la solicitud ,
//     //cambiar el estado a confirmado 
//     //peraparar un api rest que reciba parametro de estado, e items,
//     //invocar a la funcion exportarExcel
//     //levantar un modal informativo con la respuesta el api
//     // numero de solicitud
//     // periodos de consulta
//     // empresa y proyecto
//     //pinte la cantidad de items segun tipo de producto
//   }

//   // Confirmar y enviar solicitud
//   const handleConfirmarSolicitud = () => {
//     if (!requestDto) {
//       alert("No hay datos para enviar");
//       return;
//     }

//     // Validar que haya al menos un item con cantidad > 0
//     const hasItems = requestDto.items.some(
//       (item) => item.requestedQuantity > 0,
//     );
//     if (!hasItems) {
//       setErrorMessage(
//         "Debes tener al menos un item con cantidad mayor a 0 para enviar la solicitud",
//       );
//       return;
//     }

//     setConfirmDialogOpen(true);
//   };

//   const handleEnviarSolicitud = async () => {
//     if (!requestDto) return;

//     setConfirmDialogOpen(false);
//     setSubmitting(true);
//     setErrorMessage("");

//     try {
//       const response = await fetch(
//         `${API_URL}/api/hub-supply/supply-requests/${requestDto.id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             request: requestDto,
//           }),
//         },
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Error al enviar la solicitud");
//       }

//       const submittedRequest: SupplyRequestDto = await response.json();
//       // Guardar la información de la solicitud enviada
//       setSubmittedRequestInfo(submittedRequest);

//       // 2. DESCARGA AUTOMÁTICA DEL EXCEL INTEGRAL
//       exportarSolicitudCompletaExcel(submittedRequest);

//       // Limpiar todos los datos del formulario y grilla
//       limpiarTodo();

//       // Mostrar mensaje de éxito permanente
//       setShowSuccessSubmit(true);
//     } catch (error) {
//       console.error("Error al enviar solicitud:", error);
//       setErrorMessage(
//         error instanceof Error ? error.message : "Error al enviar la solicitud",
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Exportar Excel por categoría individual
//   const exportarMateriales = () => {
//     if (materialesAPI.length === 0) {
//       alert("No hay materiales para exportar");
//       return;
//     }
//     exportarCategoria(
//       materialesAPI.map((m) => ({
//         Código: m.itemCode,
//         Descripción: m.itemName,
//         "Consumo Período": m.quantityUsedInPeriod,
//         "Cantidad Solicitada": m.requestedQuantity,
//         "Unidad de Medida": m.uom || "UND",
//         "Precio Unitario": m.unitPrice,
//         "Precio Total": m.totalPrice,
//         Urgente: m.isUrgent ? "SÍ" : "NO",
//       })),
//       "Materiales",
//     );
//   };

//   const exportarHerramientas = () => {
//     if (herramientasAPI.length === 0) {
//       alert("No hay herramientas para exportar");
//       return;
//     }
//     exportarCategoria(
//       herramientasAPI.map((h) => ({
//         Código: h.itemCode,
//         Descripción: h.itemName,
//         "Consumo Período": h.quantityUsedInPeriod,
//         "Cantidad Solicitada": h.requestedQuantity,
//         "Unidad de Medida": h.uom || "UND",
//         "Precio Unitario": h.unitPrice,
//         "Precio Total": h.totalPrice,
//         Urgente: h.isUrgent ? "SÍ" : "NO",
//       })),
//       "Herramientas",
//     );
//   };

//   const exportarEquipos = () => {
//     if (equiposAPI.length === 0) {
//       alert("No hay equipos para exportar");
//       return;
//     }
//     exportarCategoria(
//       equiposAPI.map((e) => ({
//         Código: e.itemCode,
//         Descripción: e.itemName,
//         "Consumo Período": e.quantityUsedInPeriod,
//         "Cantidad Solicitada": e.requestedQuantity,
//         "Precio Unitario": e.unitPrice,
//         "Precio Total": e.totalPrice,
//         Urgente: e.isUrgent ? "SÍ" : "NO",
//         Especificaciones: e.specifications || "",
//       })),
//       "Equipos",
//     );
//   };

//   const exportarCategoria = (datos: any[], nombreCategoria: string) => {
//     const worksheet = XLSX.utils.json_to_sheet(datos);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, nombreCategoria);

//     const fecha = new Date().toISOString().split("T")[0];
//     XLSX.writeFile(
//       workbook,
//       `Solicitud_${nombreCategoria}_${entidadDestino}_${requestDto?.requestNumber || fecha
//       }.xlsx`,
//     );

//     setShowSuccessExport(true);
//     setTimeout(() => setShowSuccessExport(false), 3000);
//   };

//   const totalEstimado = requestDto?.totalEstimatedValue || 0;

//   return (
//     <Box
//       sx={{
//         maxWidth: 1400,
//         mx: "auto",
//         p: 4,
//         display: "flex",
//         flexDirection: "column",
//         gap: 3,
//       }}
//     >
//       {/* Título Principal */}
//       <TitleCard
//         icon={<ListAltOutlined sx={{ fontSize: 32 }} />}
//         title="Solicitud de Abastecimiento"
//         description="Genera solicitudes de materiales, equipos y herramientas basadas en el consumo de períodos anteriores"
//       />

//       {/* Formulario de Nueva Solicitud */}
//       <Card
//         elevation={showSuccessSubmit && submittedRequestInfo ? 0 : 0}
//         sx={{
//           borderRadius: 4,
//           background:"transparent",
//           // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
//           p: showSuccessSubmit && submittedRequestInfo ? 0 : 0,
//         }}
//       >

//         {/* {!showSuccessGenerate && !requestDto && (

//         <SectionHeader
//           icon={
//             <AddCircleOutline sx={{ fontSize: 28, color: "primary.main" }} />
//           }
//           title="Nueva Solicitud de Abastecimiento"
//           subtitle="Completa los datos del período para analizar el consumo"
//         />
//         ) } */}

//         {/* REEMPLAZAR EL CONTENIDO DEL CARD PRINCIPAL CON ESTO */}

//         {showSuccessSubmit && submittedRequestInfo ? (
//           // --- VISTA ENTERPRISE DE ÉXITO ---

//           <Card
//             elevation={3}
//             sx={{
//               mt: 2,
//               borderRadius: 4,
//               boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
//               p: 4,
//               minHeight: showSuccessSubmit ? '600px' : 'auto',
//               display: 'flex',
//               flexDirection: 'column'
//             }}
//           >
//             <Fade in={showSuccessSubmit} timeout={800}>
//               <Box sx={{
//                 textAlign: 'center',
//                 py: 6,
//                 px: 2,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 gap: 3
//               }}>
//                 {/* Icono Principal Animado */}
//                 <Box sx={{
//                   position: 'relative',
//                   display: 'inline-flex',
//                   mb: 2
//                 }}>
//                   <CheckCircleOutline sx={{ fontSize: 100, color: 'success.main' }} />
//                   <Box sx={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     borderRadius: '50%',
//                     border: '4px solid',
//                     borderColor: 'success.light',
//                     animation: 'ripple 1.5s infinite ease-in-out',
//                     '@keyframes ripple': {
//                       '0%': { transform: 'scale(0.8)', opacity: 1 },
//                       '100%': { transform: 'scale(1.4)', opacity: 0 },
//                     }
//                   }} />
//                 </Box>

//                 <Typography variant="h4" fontWeight={800} color="text.primary">
//                   ¡Solicitud Enviada con Éxito!
//                 </Typography>

//                 <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto', mb: 2 }}>
//                   La solicitud ha sido registrada en el sistema y se ha enviado una copia al centro de logística para su aprobación inmediata.
//                 </Typography>

//                 {/* Resumen de la Operación */}
//                 <Paper variant="outlined" sx={{
//                   p: 3,
//                   width: '100%',
//                   maxWidth: 600,
//                   borderRadius: 3,
//                   bgcolor: '#f8fafc',
//                   border: '1px dashed',
//                   borderColor: 'divider'
//                 }}>
//                   <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} divider={<Divider orientation="vertical" flexItem />}>
//                     <Box sx={{ flex: 1 }}>
//                       <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: 'uppercase' }}>
//                         Nro. Solicitud
//                       </Typography>
//                       <Typography variant="h6" fontWeight={700} color="primary.main">
//                         {submittedRequestInfo.requestNumber}
//                       </Typography>
//                     </Box>
//                     <Box sx={{ flex: 1 }}>
//                       <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: 'uppercase' }}>
//                         Items Totales
//                       </Typography>
//                       <Typography variant="h6" fontWeight={700}>
//                         {submittedRequestInfo.items.length} productos
//                       </Typography>
//                     </Box>
//                     <Box sx={{ flex: 1 }}>
//                       <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: 'uppercase' }}>
//                         Estado Actual
//                       </Typography>
//                       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.5 }}>
//                         <Chip
//                           label={submittedRequestInfo.status}
//                           color="success"
//                           size="small"
//                           sx={{ fontWeight: 800, borderRadius: 1 }}
//                         />
//                       </Box>
//                     </Box>
//                   </Stack>
//                 </Paper>

//                 <Alert icon={<FileDownloadOutlined />} severity="info" sx={{ borderRadius: 2 }}>
//                   Se ha descargado automáticamente el reporte detallado en formato Excel.
//                 </Alert>

//                 {/* Acciones Finales */}
//                 <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
//                   <ButtonBase
//                     label="Generar Nueva Solicitud"
//                     startIcon={<AddCircleOutline />}
//                     onClick={() => {
//                       limpiarTodo();
//                       setShowSuccessSubmit(false);
//                       setSubmittedRequestInfo(null);
//                     }}
//                     sx={{ px: 4, py: 1.5 }}
//                   />
//                   <ButtonBase
//                     label="Ir al Listado"
//                     variant="outlined"
//                     startIcon={<ListAltOutlined />}
//                     onClick={() => {/* Navegación a la tabla principal */ }}
//                     sx={{ px: 4, py: 1.5, bgcolor: 'white', color: 'text.primary', border: '1px solid #cbd5e1' }}
//                   />
//                 </Stack>
//               </Box>
//             </Fade>
//           </Card>
//         ) : (
//           // --- FORMULARIO ORIGINAL (Encapsulado en fragmento) ---
//           <>
//             {/* {!showSuccessGenerate && !requestDto && (
//               <SectionHeader
//                 icon={<AddCircleOutline sx={{ fontSize: 28, color: "primary.main" }} />}
//                 title="Nueva Solicitud de Abastecimiento"
//                 subtitle="Completa los datos del período para analizar el consumo"
//               />
//             )} */}

//             {/* ... Resto de tu código de filtros y tablas ... */}
//             {/* Asegúrate de mover aquí todo el contenido del formulario que ya tienes */}
//           </>
//         )}
//         {/* Mensaje de Éxito de Envío - Permanente */}
//         {/* {showSuccessSubmit && submittedRequestInfo && (
//           <Alert
//             severity="success"
//             icon={<CheckCircleOutline fontSize="large" />}
//             onClose={() => {
//               setShowSuccessSubmit(false);
//               setSubmittedRequestInfo(null);
//             }}
//             sx={{
//               mb: 3,
//               borderRadius: 2,
//               boxShadow: "rgba(46, 125, 50, 0.2) 0px 8px 24px",
//               border: "2px solid",
//               borderColor: "success.main",
//             }}
//           >
//             <Typography variant="body2" fontWeight={700} mb={1}>
//               ✅ ¡Solicitud enviada exitosamente!
//             </Typography>
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//              <Box sx={{display:"flex",gap:1}}>
//                <Typography variant="body1" fontWeight={600}>
//                 Número de Solicitud:{" "}

//               </Typography>
//                <Chip
//                   label={submittedRequestInfo.requestNumber}
//                   size="small"
//                   color="success"
//                   sx={{ fontWeight: 700 }}
//                 />
//              </Box>
//               <Typography variant="body2">
//                 <strong>Estado:</strong> {submittedRequestInfo.status}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Total Items:</strong>{" "}
//                 {submittedRequestInfo.items.length}
//               </Typography>

//               <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
//                 La solicitud ha sido enviada para aprobación y está disponible
//                 en el listado de solicitudes.
//               </Typography>
//             </Box>
//           </Alert>
//         )} */}

//         {/* Mensajes de Exportación */}
//         {showSuccessExport && (
//           <Fade in={showSuccessExport} timeout={600}>
//             <Alert
//               severity="success"
//               sx={{
//                 mb: 3,
//                 borderRadius: 2,
//                 boxShadow: "rgba(46, 125, 50, 0.15) 0px 4px 16px",
//               }}
//             >
//               <Typography variant="body1" fontWeight={600}>
//                 ✅ Archivo Excel generado exitosamente
//               </Typography>
//             </Alert>
//           </Fade>
//         )}

//         {/* Mensaje de Generación Exitosa */}
//         {showSuccessGenerate && requestDto && (
//           <Alert
//             severity="success"
//             sx={{
//               mb: 3,
//               borderRadius: 2,
//               boxShadow: "rgba(2, 136, 209, 0.15) 0px 4px 16px",
//             }}
//           >
//             <Typography variant="body1" fontWeight={600}>
//               ✅ Solicitud generada: {requestDto.requestNumber}
//             </Typography>
//             <Typography variant="body2">
//               Se han cargado {requestDto.totalItemsCount} items con consumo del período.
//               <br />
//               Estado de la solicitud: {requestDto.status === "DRAFT" ? "BORRADOR" : requestDto.status}
//             </Typography>
//           </Alert>
//         )}

//         {errorMessage && (
//           <Alert
//             severity="error"
//             sx={{ mb: 3, borderRadius: 2 }}
//             onClose={() => setErrorMessage("")}
//           >
//             {errorMessage}
//           </Alert>
//         )}
//         {/* {!showSuccessGenerate && !requestDto && !showSuccessSubmit && !submittedRequestInfo && (

//           <Divider sx={{ my: 3 }} />
//         )} */}

//         {/* Filtros de Período */}
//         {!showSuccessGenerate && !requestDto && !showSuccessSubmit && !submittedRequestInfo && (
//           // <Box sx={{ mb: 3 }}>
//           //   <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
//           //     <FilterListOutlined sx={{ color: "info.main", fontSize: 24 }} />
//           //     <Typography variant="subtitle1" fontWeight={600}>
//           //       Período de análisis de consumo
//           //     </Typography>
//           //   </Box>

//           //   <Box
//           //     sx={{
//           //       display: "flex",
//           //       gap: 1,
//           //       justifyContent: "initial",
//           //       flexWrap: "wrap",
//           //     }}
//           //   >
//           //     <Box sx={{ flex: "1 1 200px" }}>
//           //       {/* <Typography
//           //       variant="body2"
//           //       color="text.secondary"
//           //       fontWeight={600}
//           //       mb={1}
//           //     >
//           //       Fecha Inicio *
//           //     </Typography> */}
//           //       <DatePickerBase
//           //         value={valueInit}
//           //         setValue={setValueInit}
//           //         label="Fecha inicio"
//           //       />
//           //       {/* <TextField
//           //       type="date"
//           //       fullWidth
//           //       value={fechaSolicitud}
//           //       onChange={(e) => setFechaSolicitud(e.target.value)}
//           //       size="small"
//           //       InputLabelProps={{ shrink: true }}
//           //       required
//           //       disabled={!!requestDto}
//           //     /> */}
//           //     </Box>

//           //     <Box sx={{ flex: "1 1 200px" }}>
//           //       {/*<Typography
//           //       variant="body2"
//           //       color="text.secondary"
//           //       fontWeight={600}
//           //       mb={1}
//           //     >
//           //       Fecha Fin *
//           //     </Typography>*/}
//           //       <DatePickerBase
//           //         value={valueFin}
//           //         setValue={setValueFin}
//           //         label="Fecha Fin"
//           //       />
//           //       {/*<TextField
//           //       type="date"
//           //       fullWidth
//           //       value={fechaSolicitudFin}
//           //       onChange={(e) => setFechaSolicitudFin(e.target.value)}
//           //       size="small"
//           //       InputLabelProps={{ shrink: true }}
//           //       required
//           //       disabled={!!requestDto}
//           //     />*/}
//           //     </Box>

//           //     <Box sx={{ flex: "1 1 200px" }}>
//           //       {/*<Typography
//           //       variant="body2"
//           //       color="text.secondary"
//           //       fontWeight={600}
//           //       mb={1}
//           //     >
//           //       Fecha Entrega Solicitada
//           //     </Typography>*/}
//           //       <DatePickerBase
//           //         value={valueEntrega}
//           //         setValue={setValueEntrega}
//           //         label="Fecha Entrega Solicitada"
//           //       />
//           //       {/*<TextField
//           //       type="date"
//           //       fullWidth
//           //       value={fechaEntregaSolicitada}
//           //       onChange={(e) => setFechaEntregaSolicitada(e.target.value)}
//           //       size="small"
//           //       InputLabelProps={{ shrink: true }}
//           //       disabled={!!requestDto}
//           //     />*/}
//           //     </Box>

//           //     <Box sx={{ flex: "0 0 245px" }}>
//           //       {/* <Typography
//           //       variant="body2"
//           //       color="text.secondary"
//           //       fontWeight={600}
//           //       mb={1}
//           //     >
//           //       Región
//           //     </Typography> */}
//           //       {
//           //         /* <Autocomplete
//           //         value={region}
//           //         onChange={(_, newValue) => setRegion(newValue)}
//           //         options={regionesDisponibles}
//           //         renderInput={(params) => (
//           //           <TextField
//           //             {...params}
//           //             placeholder="Selecciona empresas registradas"
//           //             size="small"
//           //           />
//           //         )}
//           //         size="small"
//           //         disabled={!!requestDto}
//           //       /> */
//           //         // <SelectBase
//           //         //   label="Selecciona empresa"
//           //         //   value={valueEmpresaSeleccionada ?? ""}
//           //         //   onChange={setEmpresaSeleccionada}
//           //         //   options={companyOptions}
//           //         //   fullWidth
//           //         //   size="small"
//           //         // //placeholder="Selecciona empresa"
//           //         // />

//           //         <SelectBase
//           //           label="Selecciona proyecto"
//           //           value={valueProyectoSeleccionado ?? ""}
//           //           onChange={setProyectoSeleccionado}
//           //           options={[{ label: "Seleccionar un proyecto", value: 0 }, ...projectOptions]}
//           //           fullWidth
//           //           size="medium"
//           //         //placeholder="Selecciona proyecto"
//           //         />
//           //       }

//           //       {/* Select Proyectos */}
//           //     </Box>


//           //     <Box
//           //       sx={{
//           //         flexShrink: 0,
//           //         ml: { xs: 0, md: 6 },
//           //         mt: { xs: 10, md: 0 },
//           //       }}
//           //     ></Box>
//           //     <ButtonBase
//           //       onClick={handleGenerarSolicitud}
//           //       startIcon={
//           //         loading ? (
//           //           <CircularProgress size={20} color="inherit" />
//           //         ) : (
//           //           <SearchOutlined />
//           //         )
//           //       }
//           //       label={loading ? "Generando..." : "Generar Solicitud"}
//           //     // disabled={
//           //     //   //loading || !fechaSolicitud || !fechaSolicitudFin || !!requestDto
//           //     //   loading || !valueInit || !valueFin || !valueEntrega || !valueEmpresaSeleccionada || !valueProyectoSeleccionado

//           //     // }
//           //     />
//           //   </Box>
//           // </Box>
//           <Box sx={{ mb: 4 }}>
//             {/* Contenedor Principal */}
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", lg: "row" },
//                 bgcolor: "background.paper",
//                 borderRadius: 4,
//                 border: "1px solid",
//                 borderColor: "divider",
//                 overflow: "hidden",
//                 boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
//               }}
//             >
//               {/* BLOQUE IZQUIERDO: Configuración del Período */}
//               <Box
//                 sx={{
//                   flex: { lg: "0 0 350px" },
//                   bgcolor: "#f8fafc", // Fondo sutil para diferenciar zona de filtros
//                   p: 3,
//                   borderRight: { lg: "1px solid", borderColor: "divider" },
//                   borderBottom: { xs: "1px solid", lg: "none", borderColor: "divider" },
//                 }}
//               >
//                 <Stack spacing={2.5}>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//                     <Box sx={{ width: 4, height: 18, bgcolor: "primary.main", borderRadius: 1 }} />
//                     <Typography variant="subtitle2" fontWeight={700} sx={{ letterSpacing: 0.5, textTransform: 'uppercase' }}>
//                       Rango de Análisis
//                     </Typography>
//                   </Box>

//                   <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
//                     El sistema calculará el consumo promedio de materiales en el intervalo seleccionado.
//                   </Typography>

//                   <DatePickerBase
//                     value={valueInit}
//                     setValue={setValueInit}
//                     label="Desde"
//                   />
//                   <DatePickerBase
//                     value={valueFin}
//                     setValue={setValueFin}
//                     label="Hasta"
//                   />
//                 </Stack>
//               </Box>

//               {/* BLOQUE DERECHO: Datos de Destino y Acción */}
//               <Box sx={{ flex: 1, p: 3, display: "flex", flexDirection: "column" }}>
//                 <Stack spacing={3} sx={{ flexGrow: 1 }}>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//                     <Box sx={{ width: 4, height: 18, bgcolor: "info.main", borderRadius: 1 }} />
//                     <Typography variant="subtitle2" fontWeight={700} sx={{ letterSpacing: 0.5, textTransform: 'uppercase' }}>
//                       Destino del Requerimiento
//                     </Typography>
//                   </Box>

//                   {/* Fila de Inputs */}
//                   <Box sx={{
//                     display: "flex",
//                     flexDirection: { xs: "column", sm: "row" },
//                     gap: 2
//                   }}>
//                     <Box sx={{ flex: 1 }}>
//                       <DatePickerBase
//                         value={valueEntrega}
//                         setValue={setValueEntrega}
//                         label="Fecha de Entrega Deseada"
//                       />
//                     </Box>
//                     <Box sx={{ flex: 2 }}>
//                       <SelectBase
//                         label="Proyecto u Obra"
//                         size="medium"
//                         value={valueProyectoSeleccionado ?? ""}
//                         onChange={setProyectoSeleccionado}
//                         options={[{ label: "Seleccionar un proyecto...", value: 0 }, ...projectOptions]}
//                         fullWidth
//                       />
//                     </Box>
//                   </Box>

//                   <Box sx={{ mb: 0 }}>
//             <Typography
//               variant="body2"
//               color="text.secondary"
//               fontWeight={600}
//               mb={1}
//             >
//               Notas adicionales
//             </Typography>
//             <TextField
//               fullWidth
//               multiline
//               rows={2}
//               value={notas}
//               sx={{
//                 background:"white"
//               }}
//               onChange={(e) => setNotas(e.target.value)}
//               placeholder="Agrega notas o justificación para esta solicitud..."
//               size="small"
//               disabled={!!requestDto}
//             />
//           </Box>
//                 </Stack>

//                 {/* Footer del Panel: Botón de Acción */}
//                 <Box
//                   sx={{
//                     mt: 4,
//                     pt: 3,
//                     borderTop: "1px solid",
//                     borderColor: "grey.100",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     flexWrap: "wrap",
//                     gap: 2
//                   }}
//                 >
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <Typography variant="caption" sx={{ color: "text.disabled", display: "flex", alignItems: "center", gap: 0.5 }}>
//                       <CheckCircleOutline sx={{ fontSize: 14 }} /> Campos validados para el cálculo de stock
//                     </Typography>
//                   </Box>

//                   <ButtonBase
//                     onClick={handleGenerarSolicitud}
//                     disabled={loading}
//                     startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchOutlined />}
//                     label={loading ? "Procesando..." : "Analizar Consumo y Generar Propuesta"}
//                     sx={{
//                       px: 4,
//                       py: 1.5,
//                       borderRadius: 2.5,
//                       fontWeight: 700,
//                       fontSize: "0.85rem",
//                       textTransform: "none",
//                       boxShadow: "0 8px 16px rgba(37, 99, 235, 0.15)",
//                       transition: "all 0.2s",
//                       "&:hover": {
//                         transform: "translateY(-1px)",
//                         boxShadow: "0 12px 20px rgba(37, 99, 235, 0.25)",
//                       }
//                     }}
//                   />
//                 </Box>
//               </Box>
//             </Box>
//           </Box>
//         )}
//         {/* Campo de notas */}
//         {/* {!showSuccessGenerate && !requestDto && !showSuccessSubmit && !submittedRequestInfo && (

//           <Box sx={{ mb: 3 }}>
//             <Typography
//               variant="body2"
//               color="text.secondary"
//               fontWeight={600}
//               mb={1}
//             >
//               Notas adicionales
//             </Typography>
//             <TextField
//               fullWidth
//               multiline
//               rows={2}
//               value={notas}
//               onChange={(e) => setNotas(e.target.value)}
//               placeholder="Agrega notas o justificación para esta solicitud..."
//               size="small"
//               disabled={!!requestDto}
//             />
//           </Box>
//         )} */}

//         {requestDto && (
//           <>
//             <Divider sx={{ my: 3 }} />

//             {/* Información de la solicitud generada */}
//             <Box
//               sx={{
//                 mb: 3,
//                 p: 2,
//                 bgcolor: "primary.lighter",
//                 borderRadius: 2,
//                 border: "2px solid",
//                 borderColor: "primary.main",
//               }}
//             >
//               <Typography variant="subtitle1" fontWeight={700} mb={1}>
//                 📋 Solicitud: {requestDto.requestNumber}
//               </Typography>
//               <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
//                 <Typography variant="body2">
//                   <strong>Estado:</strong> {requestDto.status === "DRAFT" ? "Borrador" : ""}
//                 </Typography>
//                 <Typography variant="body2">
//                   <strong>Total Items:</strong> {requestDto.items.length}
//                 </Typography>
//                 {/* <Typography variant="body2">
//                   <strong>Cantidad Total:</strong> {requestDto.totalQuantity}
//                 </Typography> */}
//                 <Typography variant="body2">
//                   <strong>Total Estimado:</strong> S/.{" "}
//                   {totalEstimado.toFixed(2)}
//                 </Typography>
//               </Box>
//             </Box>

//             {/* SECCIÓN MATERIALES */}
//             {materialesAPI.length > 0 && (
//               <Box sx={{ mb: 4 }}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     mb: 2,
//                   }}
//                 >
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                     <Typography
//                       variant="body2"
//                       fontWeight={600}
//                       sx={{ color: categoriaConfig.MATERIAL.color }}
//                     >
//                       {categoriaConfig.MATERIAL.icon} Materiales
//                     </Typography>
//                     <Chip
//                       label={`${materialesAPI.length} items`}
//                       size="small"
//                       sx={{
//                         bgcolor: categoriaConfig.MATERIAL.color,
//                         color: "white",
//                         fontWeight: 600,
//                       }}
//                     />
//                   </Box>
//                   <ButtonBase
//                     variant="contained"
//                     size="small"
//                     label="Exportar materiales"
//                     startIcon={<FileDownloadOutlined />}
//                     onClick={exportarMateriales}
//                     sx={{
//                       bgcolor: categoriaConfig.MATERIAL.color,
//                       "&:hover": {
//                         bgcolor: categoriaConfig.MATERIAL.color,
//                         filter: "brightness(0.9)",
//                       },
//                       textTransform: "none",
//                     }}
//                   />
//                 </Box>

//                 {/*  <TableContainer
//                   component={Paper}
//                   sx={{
//                     maxHeight: 400,
//                     border: "2px solid",
//                     borderColor: `${categoriaConfig.MATERIAL.color}30`,
//                   }}
//                 >
//                   <Table stickyHeader size="small">
//                     <TableHead>
//                       <TableRow>
//                         <TableCell
//                           sx={{ fontWeight: 700, bgcolor: "background.paper" }}
//                         >
//                           Código
//                         </TableCell>
//                         <TableCell
//                           sx={{ fontWeight: 700, bgcolor: "background.paper" }}
//                         >
//                           Descripción
//                         </TableCell>
//                         <TableCell
//                           sx={{
//                             fontWeight: 700,
//                             bgcolor: "background.paper",
//                             textAlign: "center",
//                           }}
//                         >
//                           Consumo Período
//                         </TableCell>
//                         <TableCell
//                           sx={{
//                             fontWeight: 700,
//                             bgcolor: "background.paper",
//                             width: 150,
//                           }}
//                         >
//                           Cantidad Solicitada
//                         </TableCell>
//                         <TableCell
//                           sx={{
//                             fontWeight: 700,
//                             bgcolor: "background.paper",
//                             textAlign: "right",
//                           }}
//                         >
//                           Precio Unit.
//                         </TableCell>
//                         <TableCell
//                           sx={{
//                             fontWeight: 700,
//                             bgcolor: "background.paper",
//                             textAlign: "right",
//                           }}
//                         >
//                           Total
//                         </TableCell>
//                         <TableCell
//                           sx={{
//                             fontWeight: 700,
//                             bgcolor: "background.paper",
//                             textAlign: "center",
//                           }}
//                         >
//                           Urgente
//                         </TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {materialesAPI.map((material, index) => (
//                         <TableRow
//                           key={`${material.id} - ${index}`}
//                           sx={{
//                             "&:hover": { bgcolor: "action.hover" },
//                             bgcolor: material.isUrgent ? "#fff3e0" : "inherit",
//                           }}
//                         >
//                           <TableCell>
//                             <Typography variant="body2" fontWeight={600}>
//                               {material.itemCode}
//                             </Typography>
//                           </TableCell>
//                           <TableCell>
//                             <Typography variant="body2">
//                               {material.itemName}
//                             </Typography>
//                           </TableCell>
//                           <TableCell align="center">
//                             <Chip
//                               label={material.quantityUsedInPeriod}
//                               size="small"
//                               color="info"
//                               variant="outlined"
//                             />
//                           </TableCell>
//                           <TableCell>
//                             <TextField
//                               type="number"
//                               size="small"
//                               value={material.requestedQuantity}
//                               onChange={(e) =>
//                                 actualizarCantidadMaterial(
//                                   material.id,
//                                   e.target.value,
//                                 )
//                               }
//                               inputProps={{ min: 0 }}
//                               sx={{ width: "100%" }}
//                             />
//                           </TableCell>
//                           <TableCell align="right">
//                             <Typography variant="body2">
//                               S/. {material.unitPrice}
//                             </Typography>
//                           </TableCell>
//                           <TableCell align="right">
//                             <Typography variant="body2" fontWeight={600}>
//                               S/. {material.totalPrice}
//                             </Typography>
//                           </TableCell>
//                           <TableCell align="center">
//                             <Checkbox
//                               checked={material.isUrgent}
//                               onChange={() =>
//                                 toggleUrgente(material.id, "MATERIAL")
//                               }
//                               color="warning"
//                             />
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>/*/ }
//                 <CustomDataGrid
//                   columns={columns}
//                   localRows={materialesAPI}
//                   serverSide={false}
//                   search={""}
//                   onSearch={() => { }}
//                   editMode="cell"
//                   processRowUpdate={processRowUpdateMaterial}
//                   // Opcional: añade estilos para diferenciar por color si tu CustomDataGrid lo permite
//                   sx={{ border: `2px solid ${categoriaConfig.MATERIAL.color}30` }}
//                 />


//               </Box>
//             )}

//             {/* SECCIÓN HERRAMIENTAS */}
//             {herramientasAPI.length > 0 && (
//               <Box sx={{ mb: 4 }}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     mb: 2,
//                   }}
//                 >
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                     <Typography
//                       variant="body2"
//                       fontWeight={600}
//                       sx={{ color: categoriaConfig.TOOL.color }}
//                     >
//                       {categoriaConfig.TOOL.icon} Herramientas
//                     </Typography>
//                     <Chip
//                       label={`${herramientasAPI.length} items`}
//                       size="small"
//                       sx={{
//                         bgcolor: categoriaConfig.TOOL.color,
//                         color: "white",
//                         fontWeight: 600,
//                       }}
//                     />
//                   </Box>
//                   <ButtonBase
//                     variant="contained"
//                     size="small"
//                     label="Exportar Herramientas"
//                     startIcon={<FileDownloadOutlined />}
//                     onClick={exportarHerramientas}
//                     sx={{
//                       bgcolor: categoriaConfig.TOOL.color,
//                       "&:hover": {
//                         bgcolor: categoriaConfig.TOOL.color,
//                         filter: "brightness(0.9)",
//                       },
//                       textTransform: "none",
//                     }}
//                   />
//                 </Box>

//                 {/* <TableContainer
//                   component={Paper}
//                   sx={{
//                     maxHeight: 400,
//                     border: "2px solid",
//                     borderColor: `${categoriaConfig.TOOL.color}30`,
//                   }}
//                 >
//                   <Table stickyHeader size="small">
//                     <TableHead>
//                       <TableRow>
//                         <TableCell
//                           sx={{ fontWeight: 700, bgcolor: "background.paper" }}
//                         >
//                           Código
//                         </TableCell>
//                         <TableCell
//                           sx={{ fontWeight: 700, bgcolor: "background.paper" }}
//                         >
//                           Descripción
//                         </TableCell>
//                         <TableCell
//                           sx={{
//                             fontWeight: 700,
//                             bgcolor: "background.paper",
//                             textAlign: "center",
//                           }}
//                         >
//                           Consumo Período
//                         </TableCell>
//                         <TableCell
//                           sx={{
//                             fontWeight: 700,
//                             bgcolor: "background.paper",
//                             width: 150,
//                           }}
//                         >
//                           Cantidad Solicitada
//                         </TableCell>
//                         <TableCell
//                           sx={{
//                             fontWeight: 700,
//                             bgcolor: "background.paper",
//                             textAlign: "right",
//                           }}
//                         >
//                           Precio Unit.
//                         </TableCell>
//                         <TableCell
//                           sx={{
//                             fontWeight: 700,
//                             bgcolor: "background.paper",
//                             textAlign: "right",
//                           }}
//                         >
//                           Total
//                         </TableCell>
//                         <TableCell
//                           sx={{
//                             fontWeight: 700,
//                             bgcolor: "background.paper",
//                             textAlign: "center",
//                           }}
//                         >
//                           Urgente
//                         </TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {herramientasAPI.map((herramienta) => (
//                         <TableRow
//                           key={herramienta.id}
//                           sx={{
//                             "&:hover": { bgcolor: "action.hover" },
//                             bgcolor: herramienta.isUrgent
//                               ? "#fff3e0"
//                               : "inherit",
//                           }}
//                         >
//                           <TableCell>
//                             <Typography variant="body2" fontWeight={600}>
//                               {herramienta.itemCode}
//                             </Typography>
//                           </TableCell>
//                           <TableCell>
//                             <Typography variant="body2">
//                               {herramienta.itemName}
//                             </Typography>
//                           </TableCell>
//                           <TableCell align="center">
//                             <Chip
//                               label={herramienta.quantityUsedInPeriod}
//                               size="small"
//                               color="info"
//                               variant="outlined"
//                             />
//                           </TableCell>
//                           <TableCell>
//                             <TextField
//                               type="number"
//                               size="small"
//                               value={herramienta.requestedQuantity}
//                               onChange={(e) =>
//                                 actualizarCantidadHerramienta(
//                                   herramienta.id,
//                                   e.target.value,
//                                 )
//                               }
//                               inputProps={{ min: 0 }}
//                               sx={{ width: "100%" }}
//                             />
//                           </TableCell>
//                           <TableCell align="right">
//                             <Typography variant="body2">
//                               S/. {herramienta.unitPrice.toFixed(2)}
//                             </Typography>
//                           </TableCell>
//                           <TableCell align="right">
//                             <Typography variant="body2" fontWeight={600}>
//                               S/. {herramienta.totalPrice.toFixed(2)}
//                             </Typography>
//                           </TableCell>
//                           <TableCell align="center">
//                             <Checkbox
//                               checked={herramienta.isUrgent}
//                               onChange={() =>
//                                 toggleUrgente(herramienta.id, "TOOL")
//                               }
//                               color="warning"
//                             />
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer> */}

//                 <CustomDataGrid
//                   columns={columns}
//                   localRows={herramientasAPI}
//                   serverSide={false}
//                   search={""}
//                   onSearch={() => { }}
//                   editMode="cell"
//                   processRowUpdate={processRowUpdateTool}
//                   sx={{ border: `2px solid ${categoriaConfig.TOOL.color}30` }}
//                 />
//               </Box>
//             )}

//             {/* SECCIÓN EQUIPOS */}
//             {equiposAPI.length > 0 && (
//               <Box sx={{ mb: 4 }}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     mb: 2,
//                   }}
//                 >
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                     <Typography
//                       variant="body2"
//                       fontWeight={600}
//                       sx={{ color: categoriaConfig.EQUIPMENT.color }}
//                     >
//                       {categoriaConfig.EQUIPMENT.icon} Equipos
//                     </Typography>
//                     <Chip
//                       label={`${equiposAPI.length} items`}
//                       size="small"
//                       sx={{
//                         bgcolor: categoriaConfig.EQUIPMENT.color,
//                         color: "white",
//                         fontWeight: 600,
//                       }}
//                     />
//                   </Box>
//                   <ButtonBase
//                     variant="contained"
//                     label="Exportar Equipos"
//                     size="small"
//                     startIcon={<FileDownloadOutlined />}
//                     onClick={exportarEquipos}
//                     sx={{
//                       bgcolor: categoriaConfig.EQUIPMENT.color,
//                       "&:hover": {
//                         bgcolor: categoriaConfig.EQUIPMENT.color,
//                         filter: "brightness(0.9)",
//                       },
//                       textTransform: "none",
//                     }}
//                   />
//                 </Box>

//                 <CustomDataGrid
//                   columns={columns}
//                   localRows={equiposAPI}
//                   serverSide={false}
//                   search={""}
//                   onSearch={() => { }}
//                   editMode="cell"
//                   processRowUpdate={processRowUpdate}
//                 />

//                 {/* <TableContainer
//                   component={Paper}
//                   sx={{
//                     maxHeight: 400,
//                     border: "2px solid",
//                     borderColor: `${categoriaConfig.EQUIPMENT.color}30`,
//                   }}
//                 >
//                   <Table stickyHeader size="small">
//                     <TableHead>
//                       <TableRow>
//                         <TableCell
//                           sx={{ fontWeight: 700, bgcolor: "background.paper" }}
//                         >
//                           Código
//                         </TableCell>
//                         <TableCell
//                           sx={{ fontWeight: 700, bgcolor: "background.paper" }}
//                         >
//                           Descripción
//                         </TableCell>
//                         <TableCell
//                           sx={{
//                             fontWeight: 700,
//                             bgcolor: "background.paper",
//                             textAlign: "center",
//                           }}
//                         >
//                           Consumo Período
//                         </TableCell>
//                         <TableCell
//                           sx={{
//                             fontWeight: 700,
//                             bgcolor: "background.paper",
//                             width: 150,
//                           }}
//                         >
//                           Cantidad Solicitada
//                         </TableCell>
//                         <TableCell
//                           sx={{
//                             fontWeight: 700,
//                             bgcolor: "background.paper",
//                             textAlign: "right",
//                           }}
//                         >
//                           Precio Unit.
//                         </TableCell>
//                         <TableCell
//                           sx={{
//                             fontWeight: 700,
//                             bgcolor: "background.paper",
//                             textAlign: "right",
//                           }}
//                         >
//                           Total
//                         </TableCell>
//                         <TableCell
//                           sx={{
//                             fontWeight: 700,
//                             bgcolor: "background.paper",
//                             textAlign: "center",
//                           }}
//                         >
//                           Urgente
//                         </TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {equiposAPI.map((equipo,index) => (
//                         <TableRow
//                           key={`${equipo.id} - ${index}`}
//                           sx={{
//                             "&:hover": { bgcolor: "action.hover" },
//                             bgcolor: equipo.isUrgent ? "#fff3e0" : "inherit",
//                           }}
//                         >
//                           <TableCell>
//                             <Typography variant="body2" fontWeight={600}>
//                               {equipo.itemCode}
//                             </Typography>
//                           </TableCell>
//                           <TableCell>
//                             <Typography variant="body2">
//                               {equipo.itemName}
//                             </Typography>
//                             {equipo.specifications && (
//                               <Typography
//                                 variant="caption"
//                                 color="text.secondary"
//                                 display="block"
//                               >
//                                 {equipo.specifications}
//                               </Typography>
//                             )}
//                           </TableCell>
//                           <TableCell align="center">
//                             <Chip
//                               label={equipo.quantityUsedInPeriod}
//                               size="small"
//                               color="info"
//                               variant="outlined"
//                             />
//                           </TableCell>
//                           <TableCell>
//                             <TextField
//                               type="number"
//                               size="small"
//                               value={equipo.requestedQuantity}
//                               onChange={(e) =>
//                                 actualizarCantidadEquipo(
//                                   equipo.id,
//                                   e.target.value,
//                                 )
//                               }
//                               inputProps={{ min: 0 }}
//                               sx={{ width: "100%" }}
//                             />
//                           </TableCell>
//                           <TableCell align="right">
//                             <Typography variant="body2">
//                               S/. {equipo.unitPrice?.toFixed(2)}
//                             </Typography>
//                           </TableCell>
//                           <TableCell align="right">
//                             <Typography variant="body2" fontWeight={600}>
//                               S/. {equipo.totalPrice?.toFixed(2)}
//                             </Typography>
//                           </TableCell>
//                           <TableCell align="center">
//                             <Checkbox
//                               checked={equipo.isUrgent}
//                               onChange={() =>
//                                 toggleUrgente(equipo.id, "EQUIPMENT")
//                               }
//                               color="warning"
//                             />
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer> */}
//               </Box>
//             )}

//             <Divider sx={{ my: 3 }} />

//             {/* Botones de Acción */}
//             <Box
//               sx={{
//                 display: "flex",
//                 gap: 2,
//                 justifyContent: "flex-end",
//                 flexWrap: "wrap",
//               }}
//             >
//               <ButtonBase
//                 // variant="outlined"
//                 label="Recargar Datos"
//                 startIcon={<RefreshOutlined />}
//                 onClick={limpiarDatos}
//                 disabled={loading}
//                 sx={{
//                   textTransform: "none",
//                   px: 4,
//                   py: 1.2,
//                 }}
//               />
//               {/* 
//               <ButtonBase
//                 variant="outlined"
//                 label="Guardar Borrador"
//                 startIcon={<SaveOutlined />}
//                 onClick={handleGuardarBorrador}
//                 sx={{
//                   textTransform: "none",
//                   px: 4,
//                   py: 1.2,
//                 }}
//               /> */}

//               <ButtonBase
//                 label={
//                   submitting ? "Enviando..." : "Confirmar y Enviar Solicitud"
//                 }
//                 startIcon={
//                   submitting ? (
//                     <CircularProgress size={20} color="inherit" />
//                   ) : (
//                     <SendOutlined />
//                   )
//                 }
//                 onClick={handleConfirmarSolicitud}
//                 disabled={submitting || requestDto.status !== "DRAFT"}
//               />
//             </Box>
//           </>
//         )}
//       </Card>

//       {/* Dialog de Confirmación */}
//       <Dialog
//         open={confirmDialogOpen}
//         onClose={() => setConfirmDialogOpen(false)}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{
//           sx: { borderRadius: 3, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }
//         }}
//       >
//         {/* Cabecera Estilo Enterprise */}
//         <DialogTitle sx={{
//           m: 0, p: 2,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           bgcolor: '#f8fafc', // Color gris muy tenue profesional
//           borderBottom: '1px solid #e2e8f0'
//         }}>
//           <Stack direction="row" spacing={1.5} alignItems="center">
//             <Box sx={{
//               bgcolor: 'primary.main',
//               color: 'white',
//               p: 0.5,
//               borderRadius: 1,
//               display: 'flex'
//             }}>
//               <SendOutlined fontSize="small" />
//             </Box>
//             <Typography variant="h6" fontWeight={700} sx={{ color: '#1e293b' }}>
//               Confirmar Envío
//             </Typography>
//           </Stack>
//           <IconButton onClick={() => setConfirmDialogOpen(false)} size="small">
//             <Close fontSize="small" />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent sx={{ p: 3, mt: 2 }}>
//           <Typography variant="body1" color="text.secondary" mb={3}>
//             ¿Estás seguro de aprobar esta solicitud? Verifique los detalles antes de continuar.
//           </Typography>

//           {/* Resumen Estructurado */}
//           <Box
//             sx={{
//               p: 2.5,
//               bgcolor: "#f1f5f9",
//               borderRadius: 2,
//               mb: 3,
//               border: '1px solid #e2e8f0'
//             }}
//           >
//             <Stack spacing={2}>
//               <Stack direction="row" spacing={2} alignItems="center">
//                 <AssignmentOutlined color="action" fontSize="small" />
//                 <Box>
//                   <Typography variant="caption" display="block" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700 }}>
//                     Número de Solicitud
//                   </Typography>
//                   <Typography variant="body2" fontWeight={600}>
//                     {requestDto?.requestNumber || "N/A"}
//                   </Typography>
//                 </Box>
//               </Stack>

//               <Divider />

//               <Stack direction="row" spacing={2} alignItems="center">
//                 <Inventory2Outlined color="action" fontSize="small" />
//                 <Box>
//                   <Typography variant="caption" display="block" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700 }}>
//                     Total de Items
//                   </Typography>
//                   <Typography variant="body2" fontWeight={600}>
//                     {requestDto?.items.length} productos registrados
//                   </Typography>
//                 </Box>
//               </Stack>

//               <Divider />

//               <Stack direction="row" spacing={2} alignItems="center">
//                 <EventOutlined color="action" fontSize="small" />
//                 <Box>
//                   <Typography variant="caption" display="block" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700 }}>
//                     Fecha de Requerimiento
//                   </Typography>
//                   <Typography variant="body2" fontWeight={600}>
//                     {dayjs(requestDto?.requestedDeliveryDate).format("DD [de] MMMM, YYYY")}
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Stack>
//           </Box>

//           <Alert
//             severity="warning"
//             icon={<WarningAmberOutlined />}
//             sx={{ borderRadius: 2, fontWeight: 500 }}
//           >
//             Esta acción es irreversible. La solicitud se bloqueará para edición una vez enviada.
//           </Alert>
//         </DialogContent>

//         <DialogActions sx={{ p: 3, bgcolor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
//           <ButtonBase
//             label="Regresar"
//             onClick={() => setConfirmDialogOpen(false)}
//             sx={{
//               bgcolor: 'white',
//               color: '#64748b',
//               border: '1px solid #cbd5e1',
//               '&:hover': { bgcolor: '#f1f5f9' }
//             }}
//           />
//           <ButtonBase
//             label="Confirmar y Enviar"
//             startIcon={<SendOutlined />}
//             onClick={handleEnviarSolicitud}
//             sx={{
//               px: 4,
//               boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
//             }}
//           />
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }
"use client";

import { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Divider,
  Alert,
  Fade,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
  Paper,
} from "@mui/material";
import {
  AddCircleOutline,
  ListAltOutlined,
  FileDownloadOutlined,
  SearchOutlined,
  RefreshOutlined,
  SendOutlined,
  CheckCircleOutline,
  Close,
  AssignmentOutlined,
  Inventory2Outlined,
  WarningAmberOutlined,
  EventOutlined,
  TableChartOutlined,
} from "@mui/icons-material";
import { TitleCard } from "@/src/components/base/TitleCard";
import * as XLSX from "xlsx";
import ButtonBase from "@/src/components/base/ButtonBase";
import { API_URL } from "@/src/lib/config";
import DatePickerBase from "@/src/components/base/DatePickerBase";
import dayjs, { Dayjs } from "dayjs";
import SelectBase from "@/src/components/base/SelectBase";
import { toast } from "react-toastify";
import { CatalogService } from "@/src/services/api/CatalogService";
import { CatalogDTO } from "@/src/types/Catalog.types";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/Store";
import { GridColDef } from "@mui/x-data-grid";
import CustomDataGrid from "@/src/components/base/CustomDataGrid";

// ─── Configuración de Categorías ────────────────────────────────────────────
const categoriaConfig = {
  MATERIAL: { label: "Material", color: "#ed6c02", icon: "📦" },
  TOOL: { label: "Herramienta", color: "#1976d2", icon: "🔧" },
  EQUIPMENT: { label: "Equipo", color: "#2e7d32", icon: "⚙️" },
};

// ─── Definición de columnas exportables ─────────────────────────────────────
const COLUMNAS_DISPONIBLES = [
  { field: "itemCode", label: "Código", default: true },
  { field: "itemName", label: "Descripción", default: true },
  { field: "quantityUsedInPeriod", label: "Consumo Período", default: true },
  { field: "requestedQuantity", label: "Cantidad Solicitada", default: true },
  { field: "uom", label: "Unidad de Medida", default: true },
  { field: "unitPrice", label: "Precio Unitario", default: false },
  { field: "totalPrice", label: "Precio Total", default: false },
  { field: "isUrgent", label: "Urgente", default: true },
] as const;

type ColumnField = typeof COLUMNAS_DISPONIBLES[number]["field"];

const LABEL_MAP: Record<ColumnField, string> = {
  itemCode: "Código",
  itemName: "Descripción",
  quantityUsedInPeriod: "Consumo Período",
  requestedQuantity: "Cantidad Solicitada",
  uom: "Unidad de Medida",
  unitPrice: "Precio Unitario",
  totalPrice: "Precio Total",
  isUrgent: "Urgente",
};

// ────────────────────────────────────────────────────────────────────────────

export default function SolicitudAbastecimiento() {
  // ── Ref para scroll suave al inicio ──────────────────────────────────────
  const topRef = useRef<HTMLDivElement>(null);

  // ── Estados del formulario ────────────────────────────────────────────────
  const [notas, setNotas] = useState("");
  const company = useSelector((state: RootState) => state.companies.company);
  const [valueInit, setValueInit] = useState<Dayjs | null>(dayjs());
  const [valueFin, setValueFin] = useState<Dayjs | null>(dayjs());
  const [valueEntrega, setValueEntrega] = useState<Dayjs | null>(dayjs());
  const [projectOptions, setProjectOptions] = useState<any[]>([]);
  const [valueProyectoSeleccionado, setProyectoSeleccionado] = useState<string | number | null>(null);
  const [catalogos, setCatalogos] = useState<CatalogDTO>({ companies: [], projects: [] });

  // ── Estados de datos ──────────────────────────────────────────────────────
  const [requestDto, setRequestDto] = useState<SupplyRequestDto | null>(null);
  const [materialesAPI, setMaterialesAPI] = useState<SupplyRequestItem[]>([]);
  const [herramientasAPI, setHerramientasAPI] = useState<SupplyRequestItem[]>([]);
  const [equiposAPI, setEquiposAPI] = useState<SupplyRequestItem[]>([]);

  // ── Estados de UI ─────────────────────────────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessExport, setShowSuccessExport] = useState(false);
  const [showSuccessGenerate, setShowSuccessGenerate] = useState(false);
  const [showSuccessSubmit, setShowSuccessSubmit] = useState(false);
  const [submittedRequestInfo, setSubmittedRequestInfo] = useState<SupplyRequestDto | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // ── Estado para columnas seleccionadas del Excel ──────────────────────────
  const [columnasSeleccionadas, setColumnasSeleccionadas] = useState<ColumnField[]>(
    COLUMNAS_DISPONIBLES.filter(c => c.default).map(c => c.field)
  );

  // ── Scroll suave al top cuando se confirma exitosamente ───────────────────
  useEffect(() => {
    if (showSuccessSubmit) {
      // Primero intentamos scroll en el contenedor referenciado
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      // Fallback: scroll global de la ventana
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showSuccessSubmit]);

  // ── Carga de catálogos ────────────────────────────────────────────────────
  useEffect(() => {
    const loadCatalogs = async () => {
      try {
        const data = await CatalogService.getAllCatalogs();
        setCatalogos({ companies: data.companies, projects: data.projects });
      } catch (error) {
        console.error(error);
      }
    };
    loadCatalogs();
  }, []);

  useEffect(() => {
    const options = catalogos.projects
      .filter(p => p.companyIds.includes(Number(company)))
      .map(p => ({ label: p.name, value: p.id }));

    setProjectOptions(options);
    setProyectoSeleccionado(null);
  }, [company, catalogos]);

  // ── Columnas del DataGrid ─────────────────────────────────────────────────
  const columns: GridColDef[] = [
    {
      field: "itemCode",
      headerName: "Código",
      flex: 1,
      renderCell: (params) => <strong>{params.value}</strong>,
    },
    { field: "itemName", headerName: "Descripción", flex: 2 },
    {
      field: "quantityUsedInPeriod",
      headerName: "Consumo Período",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Chip label={params.value} size="small" color="info" variant="outlined" />
      ),
    },
    { field: "requestedQuantity", headerName: "Cantidad Solicitada", type: "number", flex: 1, editable: true },
    { field: "isUrgent", headerName: "Urgente", flex: 1, align: "center", headerAlign: "center", editable: true, type: "boolean" },
  ];

  // ── Handlers de actualización de filas ───────────────────────────────────
  // const processRowUpdateMaterial = (newRow: any) => {
  //   const updatedRow = { ...newRow, totalPrice: (newRow.requestedQuantity || 0) * (newRow.unitPrice || 0), pendingQuantity: (newRow.requestedQuantity || 0) - (newRow.deliveredQuantity || 0) };
  //   setMaterialesAPI(prev => prev.map(r => r.id === updatedRow.id ? updatedRow : r));
  //   if (requestDto) actualizarRequestDto([...materialesAPI.map(r => r.id === updatedRow.id ? updatedRow : r), ...herramientasAPI, ...equiposAPI]);
  //   return updatedRow;
  // };

  //   const processRowUpdateTool = (newRow: any) => {
  //   const updatedRow = { ...newRow, totalPrice: (newRow.requestedQuantity || 0) * (newRow.unitPrice || 0), pendingQuantity: (newRow.requestedQuantity || 0) - (newRow.deliveredQuantity || 0) };
  //   setHerramientasAPI(prev => prev.map(r => r.id === updatedRow.id ? updatedRow : r));
  //   if (requestDto) actualizarRequestDto([...materialesAPI, ...herramientasAPI.map(r => r.id === updatedRow.id ? updatedRow : r), ...equiposAPI]);
  //   return updatedRow;
  // };

  // const processRowUpdateEquipo = (newRow: any) => {
  //   const updatedRow = { ...newRow, totalPrice: (newRow.requestedQuantity || 0) * (newRow.unitPrice || 0) };
  //   setEquiposAPI(prev => prev.map(r => r.id === updatedRow.id ? updatedRow : r));
  //   return updatedRow;
  // };

  const processRowUpdateMaterial = (newRow: any) => {
    const updatedRow = {
      ...newRow,
      totalPrice: (newRow.requestedQuantity || 0) * (newRow.unitPrice || 0),
      pendingQuantity: (newRow.requestedQuantity || 0) - (newRow.deliveredQuantity || 0),
    };

    // Actualiza el estado
    setMaterialesAPI(prev => {
      const nuevosMateriales = prev.map(r => r.id === updatedRow.id ? updatedRow : r);

      // Actualiza requestDto usando los arrays actualizados
      if (requestDto) {
        actualizarRequestDto([...nuevosMateriales, ...herramientasAPI, ...equiposAPI]);
      }

      return nuevosMateriales;
    });

    return updatedRow;
  };

  const processRowUpdateTool = (newRow: any) => {
    const updatedRow = {
      ...newRow,
      totalPrice: (newRow.requestedQuantity || 0) * (newRow.unitPrice || 0),
      pendingQuantity: (newRow.requestedQuantity || 0) - (newRow.deliveredQuantity || 0),
    };

    setHerramientasAPI(prev => {
      const nuevasHerramientas = prev.map(r => r.id === updatedRow.id ? updatedRow : r);

      if (requestDto) {
        actualizarRequestDto([...materialesAPI, ...nuevasHerramientas, ...equiposAPI]);
      }

      return nuevasHerramientas;
    });

    return updatedRow;
  };

  const processRowUpdateEquipo = (newRow: any) => {
    const updatedRow = {
      ...newRow,
      totalPrice: (newRow.requestedQuantity || 0) * (newRow.unitPrice || 0),
    };

    setEquiposAPI(prev => {
      const nuevosEquipos = prev.map(r => r.id === updatedRow.id ? updatedRow : r);

      if (requestDto) {
        actualizarRequestDto([...materialesAPI, ...herramientasAPI, ...nuevosEquipos]);
      }

      return nuevosEquipos;
    });

    return updatedRow;
  };


  // ── Limpieza ──────────────────────────────────────────────────────────────
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
    setNotas("");
    setMaterialesAPI([]);
    setHerramientasAPI([]);
    setEquiposAPI([]);
    setRequestDto(null);
    setErrorMessage("");
    setShowSuccessGenerate(false);
    setShowSuccessExport(false);
    // Restaurar columnas por defecto al limpiar
    setColumnasSeleccionadas(COLUMNAS_DISPONIBLES.filter(c => c.default).map(c => c.field));
  };

  const actualizarRequestDto = (nuevosItems: SupplyRequestItem[]) => {
    if (!requestDto) return;
    setRequestDto({
      ...requestDto,
      items: nuevosItems,
      totalQuantity: nuevosItems.reduce((s, i) => s + i.requestedQuantity, 0),
      totalEstimatedValue: nuevosItems.reduce((s, i) => s + i.totalPrice, 0),
      totalItemsCount: nuevosItems.length,
    });
  };

  // ── Toggle de columna seleccionada ────────────────────────────────────────
  const toggleColumna = (field: ColumnField) => {
    setColumnasSeleccionadas(prev =>
      prev.includes(field)
        ? prev.filter(f => f !== field)
        : [...prev, field]
    );
  };

  // ── Exportación Excel DINÁMICA según columnas seleccionadas ───────────────
  const exportarSolicitudCompletaExcel = (requestData: SupplyRequestDto) => {
    const workbook = XLSX.utils.book_new();

    const prepararDatos = (items: SupplyRequestItem[]) =>
      items.map(item => {
        const row: Record<string, any> = {};
        // Mantener el orden definido en COLUMNAS_DISPONIBLES
        COLUMNAS_DISPONIBLES.forEach(col => {
          if (!columnasSeleccionadas.includes(col.field)) return;
          let value = (item as any)[col.field];
          if (col.field === "isUrgent") value = value ? "SÍ" : "NO";
          if (col.field === "uom") value = value ?? "UND";
          row[LABEL_MAP[col.field]] = value;
        });
        return row;
      });

    if (materialesAPI.length > 0)
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(prepararDatos(materialesAPI)), "Materiales");
    if (herramientasAPI.length > 0)
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(prepararDatos(herramientasAPI)), "Herramientas");
    if (equiposAPI.length > 0)
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(prepararDatos(equiposAPI)), "Equipos");

    XLSX.writeFile(workbook, `Solicitud_Abastecimiento_${requestData.requestNumber}.xlsx`);
  };

  // ── Exportaciones individuales (mantienen las mismas columnas dinámicas) ──
  const exportarCategoria = (items: SupplyRequestItem[], nombreCategoria: string) => {
    const prepararDatos = (arr: SupplyRequestItem[]) =>
      arr.map(item => {
        const row: Record<string, any> = {};
        COLUMNAS_DISPONIBLES.forEach(col => {
          if (!columnasSeleccionadas.includes(col.field)) return;
          let value = (item as any)[col.field];
          if (col.field === "isUrgent") value = value ? "SÍ" : "NO";
          if (col.field === "uom") value = value ?? "UND";
          row[LABEL_MAP[col.field]] = value;
        });
        return row;
      });

    const worksheet = XLSX.utils.json_to_sheet(prepararDatos(items));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, nombreCategoria);
    const fecha = new Date().toISOString().split("T")[0];
    XLSX.writeFile(workbook, `Solicitud_${nombreCategoria}_${requestDto?.requestNumber || fecha}.xlsx`);
    setShowSuccessExport(true);
    setTimeout(() => setShowSuccessExport(false), 3000);
  };

  const exportarMateriales = () => materialesAPI.length ? exportarCategoria(materialesAPI, "Materiales") : alert("No hay materiales");
  const exportarHerramientas = () => herramientasAPI.length ? exportarCategoria(herramientasAPI, "Herramientas") : alert("No hay herramientas");
  const exportarEquipos = () => equiposAPI.length ? exportarCategoria(equiposAPI, "Equipos") : alert("No hay equipos");

  // ── Generar solicitud ─────────────────────────────────────────────────────
  const handleGenerarSolicitud = async () => {
    // toast.info("Generando solicitud...", { position: "top-right" });
    setLoading(true);
    setErrorMessage("");
    setShowSuccessGenerate(false);
    setShowSuccessSubmit(false);

    try {
      const response = await fetch(`${API_URL}/api/hub-supply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hubId: 1,
          periodStartDate: valueInit?.format("YYYY-MM-DD"),
          periodEndDate: valueFin?.format("YYYY-MM-DD"),
          periodValueEntrega: valueEntrega?.format("YYYY-MM-DD"),
          tenantId: company,
          projectId: valueProyectoSeleccionado,
          requestedBy: 1,
          notes: notas || `Solicitud generada para período ${valueInit} - ${valueFin}`,
          requestedDeliveryDate: valueEntrega?.format("YYYY-MM-DD"),
        }),
      });

      // if (!response.ok) throw new Error("Error al generar la solicitud de abastecimiento");
      if (!response.ok) {
        toast.error("No se encontraron datos...", { position: "top-right" });

        return
        // toast.error("No se encontraron datos...", { position: "top-right" });

      }
      const data: SupplyRequestDto = await response.json();
      setRequestDto(data);
      setMaterialesAPI(data.items.filter(i => i.productType === "MATERIAL"));
      setHerramientasAPI(data.items.filter(i => i.productType === "TOOL"));
      setEquiposAPI(data.items.filter(i => i.productType === "EQUIPMENT"));
      setShowSuccessGenerate(true);
    } catch (error) {
      toast.error("No se encontraron datos...", { position: "top-right" });

      // setErrorMessage(error instanceof Error ? error.message : "Error al cargar los datos del período");
    } finally {
      setLoading(false);
    }
  };

  // ── Confirmar y enviar ────────────────────────────────────────────────────
  const handleConfirmarSolicitud = () => {
    if (!requestDto) { alert("No hay datos para enviar"); return; }
    if (!requestDto.items.some(i => i.requestedQuantity > 0)) {
      setErrorMessage("Debes tener al menos un item con cantidad mayor a 0");
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
      const response = await fetch(`${API_URL}/api/hub-supply/supply-requests/${requestDto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestDto),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al enviar la solicitud");
      }

      const submittedRequest: SupplyRequestDto = await response.json();
      setSubmittedRequestInfo(submittedRequest);

      // Exportar con las columnas que el usuario seleccionó
      exportarSolicitudCompletaExcel(submittedRequest);

      limpiarTodo();
      setShowSuccessSubmit(true);
      // El useEffect de showSuccessSubmit disparará el scroll automáticamente
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Error al enviar la solicitud");
    } finally {
      setSubmitting(false);
    }
  };

  const totalEstimado = requestDto?.totalEstimatedValue || 0;

  // ────────────────────────────────────────────────────────────────────────────
  //  RENDER
  // ────────────────────────────────────────────────────────────────────────────
  return (
    // 👇 ref aquí para que el scrollIntoView funcione al cambiar showSuccessSubmit
    <Box
      ref={topRef}
      sx={{ maxWidth: 1400, mx: "auto", p: 4, display: "flex", flexDirection: "column", gap: 3 }}
    >
      <TitleCard
        icon={<ListAltOutlined sx={{ fontSize: 32 }} />}
        title="Solicitud de Abastecimiento"
        description="Genera solicitudes de materiales, equipos y herramientas basadas en el consumo de períodos anteriores"
      />

      <Card elevation={0} sx={{ borderRadius: 4, background: "transparent" }}>

        {/* ══════════════════════════════════════════════════════════════════
            VISTA DE ÉXITO — se muestra solo cuando showSuccessSubmit = true
        ══════════════════════════════════════════════════════════════════ */}
        {showSuccessSubmit && submittedRequestInfo ? (
          <Card
            elevation={3}
            sx={{ mt: 2, borderRadius: 4, boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px", p: 4, minHeight: 600, display: "flex", flexDirection: "column" }}
          >
            <Fade in={showSuccessSubmit} timeout={800}>
              <Box sx={{ textAlign: "center", py: 6, px: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>

                {/* Ícono animado */}
                <Box sx={{ position: "relative", display: "inline-flex", mb: 2 }}>
                  <CheckCircleOutline sx={{ fontSize: 100, color: "success.main" }} />
                  <Box sx={{
                    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                    borderRadius: "50%", border: "4px solid", borderColor: "success.light",
                    animation: "ripple 1.5s infinite ease-in-out",
                    "@keyframes ripple": {
                      "0%": { transform: "scale(0.8)", opacity: 1 },
                      "100%": { transform: "scale(1.4)", opacity: 0 },
                    },
                  }} />
                </Box>

                <Typography variant="h4" fontWeight={800} color="text.primary">
                  ¡Solicitud Registrada con Éxito!
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: "auto", mb: 2 }}>
                  La solicitud ha sido registrada en el sistema con exito.
                </Typography>

                {/* Resumen */}
                <Paper variant="outlined" sx={{ p: 3, width: "100%", maxWidth: 620, borderRadius: 3, bgcolor: "#f8fafc", border: "1px dashed", borderColor: "divider" }}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={3} divider={<Divider orientation="vertical" flexItem />}>
                    <Box sx={{ flex: 1, textAlign: "center" }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: "uppercase" }}>
                        Nro. Solicitud
                      </Typography>
                      <Typography variant="h6" fontWeight={700} color="primary.main">
                        {submittedRequestInfo.requestNumber}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1, textAlign: "center" }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: "uppercase" }}>
                        Items Totales
                      </Typography>
                      <Typography variant="h6" fontWeight={700}>
                        {submittedRequestInfo.items.length} productos
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1, textAlign: "center" }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: "uppercase" }}>
                        Estado Actual
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "center", mt: 0.5 }}>
                        <Chip label={submittedRequestInfo.status} color="success" size="small" sx={{ fontWeight: 800, borderRadius: 1 }} />
                      </Box>
                    </Box>
                  </Stack>
                </Paper>

                {/* Desglose por tipo */}
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center", width: "100%", maxWidth: 620 }}>
                  {[
                    { label: "Materiales", count: submittedRequestInfo.items.filter(i => i.productType === "MATERIAL").length, color: "#ed6c02", bg: "#fff3e0" },
                    { label: "Herramientas", count: submittedRequestInfo.items.filter(i => i.productType === "TOOL").length, color: "#1976d2", bg: "#e3f2fd" },
                    { label: "Equipos", count: submittedRequestInfo.items.filter(i => i.productType === "EQUIPMENT").length, color: "#2e7d32", bg: "#e8f5e9" },
                  ].map(cat => (
                    <Box key={cat.label} sx={{ flex: 1, minWidth: 120, textAlign: "center", p: 2, bgcolor: cat.bg, borderRadius: 2, border: `1px solid ${cat.color}30` }}>
                      <Typography variant="h5" fontWeight={800} sx={{ color: cat.color }}>{cat.count}</Typography>
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>{cat.label}</Typography>
                    </Box>
                  ))}
                </Box>

                <Alert icon={<FileDownloadOutlined />} severity="info" sx={{ borderRadius: 2, maxWidth: 500 }}>
                  Se ha descargado automáticamente el reporte detallado en formato Excel con las columnas seleccionadas.
                </Alert>

                {/* Botones de acción */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 2 }}>
                  <ButtonBase
                    label="Generar Nueva Solicitud"
                    startIcon={<AddCircleOutline />}
                    onClick={() => {
                      limpiarTodo();
                      setShowSuccessSubmit(false);
                      setSubmittedRequestInfo(null);
                    }}
                    sx={{ px: 4, py: 1.5 }}
                  />
                  <ButtonBase
                    label="Ir al Listado"
                    variant="outlined"
                    startIcon={<ListAltOutlined />}
                    onClick={() => { /* navegación */ }}
                    sx={{ px: 4, py: 1.5, bgcolor: "white", color: "text.primary", border: "1px solid #cbd5e1" }}
                  />
                </Stack>
              </Box>
            </Fade>
          </Card>

        ) : (
          /* ══════════════════════════════════════════════════════════════
              FORMULARIO PRINCIPAL
          ══════════════════════════════════════════════════════════════ */
          <>
            {/* Alertas */}
            {showSuccessExport && (
              <Fade in timeout={600}>
                <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                  <Typography variant="body1" fontWeight={600}>✅ Archivo Excel generado exitosamente</Typography>
                </Alert>
              </Fade>
            )}

            {showSuccessGenerate && requestDto && (
              <Alert severity="success" sx={{ mb: 3, mt: 2, borderRadius: 2, boxShadow: "rgba(2,136,209,0.15) 0px 4px 16px" }}>
                <Typography variant="body1" fontWeight={600}>✅ Solicitud generada: {requestDto.requestNumber}</Typography>
                <Typography variant="body2">
                  Se han cargado {requestDto.totalItemsCount} items con consumo del período.
                  <br />Estado: {requestDto.status === "DRAFT" ? "BORRADOR" : requestDto.status}
                </Typography>
              </Alert>
            )}

            {errorMessage && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setErrorMessage("")}>
                {errorMessage}
              </Alert>
            )}

            {/* Panel de filtros — solo visible antes de generar */}
            {!showSuccessGenerate && !requestDto && (
              <Box sx={{ mb: 4 }}>
                <Box sx={{
                  display: "flex", flexDirection: { xs: "column", lg: "row" },
                  bgcolor: "background.paper", borderRadius: 4,
                  border: "1px solid", borderColor: "divider", overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                }}>
                  {/* Bloque izquierdo: Rango */}
                  <Box sx={{ flex: { lg: "0 0 350px" }, bgcolor: "#f8fafc", p: 3, borderRight: { lg: "1px solid" }, borderColor: "divider" }}>
                    <Stack spacing={2.5}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box sx={{ width: 4, height: 18, bgcolor: "primary.main", borderRadius: 1 }} />
                        <Typography variant="subtitle2" fontWeight={700} sx={{ letterSpacing: 0.5, textTransform: "uppercase" }}>
                          Rango de Análisis
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                        El sistema calculará el consumo promedio en el intervalo seleccionado.
                      </Typography>
                      <DatePickerBase value={valueInit} setValue={setValueInit} label="Desde" />
                      <DatePickerBase value={valueFin} setValue={setValueFin} label="Hasta" />
                    </Stack>
                  </Box>

                  {/* Bloque derecho: Destino y acción */}
                  <Box sx={{ flex: 1, p: 3, display: "flex", flexDirection: "column" }}>
                    <Stack spacing={3} sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box sx={{ width: 4, height: 18, bgcolor: "info.main", borderRadius: 1 }} />
                        <Typography variant="subtitle2" fontWeight={700} sx={{ letterSpacing: 0.5, textTransform: "uppercase" }}>
                          Destino del Requerimiento
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <DatePickerBase value={valueEntrega} setValue={setValueEntrega} label="Fecha de Entrega Deseada" />
                        </Box>
                        <Box sx={{ flex: 2 }}>
                          <SelectBase
                            label="Proyecto u Obra"
                            size="medium"
                            value={valueProyectoSeleccionado ?? ""}
                            onChange={setProyectoSeleccionado}
                            options={[{ label: "Seleccionar un proyecto...", value: 0 }, ...projectOptions]}
                            fullWidth
                          />
                        </Box>
                      </Box>

                      <Box>
                        <Typography variant="body2" color="text.secondary" fontWeight={600} mb={1}>
                          Notas adicionales
                        </Typography>
                        <TextField
                          fullWidth multiline rows={2} value={notas} size="small"
                          sx={{ background: "white" }}
                          onChange={e => setNotas(e.target.value)}
                          placeholder="Agrega notas o justificación para esta solicitud..."
                        />
                      </Box>
                    </Stack>

                    <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid", borderColor: "grey.100", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                      <Typography variant="caption" sx={{ color: "text.disabled", display: "flex", alignItems: "center", gap: 0.5 }}>
                        <CheckCircleOutline sx={{ fontSize: 14 }} /> Campos validados para el cálculo de stock
                      </Typography>
                      <ButtonBase
                        onClick={handleGenerarSolicitud}
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchOutlined />}
                        label={loading ? "Procesando..." : "Analizar Consumo y Generar Propuesta"}
                        sx={{ px: 4, py: 1.5, borderRadius: 2.5, fontWeight: 700, fontSize: "0.85rem", textTransform: "none", boxShadow: "0 8px 16px rgba(37,99,235,0.15)", transition: "all 0.2s", "&:hover": { transform: "translateY(-1px)", boxShadow: "0 12px 20px rgba(37,99,235,0.25)" } }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}

            {/* Tablas de items generados */}
            {requestDto && (
              <>
                {/* <Divider sx={{ my: 3 }} /> */}

                {/* Info de la solicitud */}
                <Box sx={{ mb: 3, mt: 4, p: 2, bgcolor: "primary.lighter", borderRadius: 2, border: "2px solid", borderColor: "primary.main" }}>
                  <Typography variant="subtitle1" fontWeight={700} mb={1}>
                    📋 Solicitud: {requestDto.requestNumber}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                    <Typography variant="body2"><strong>Estado:</strong> {requestDto.status === "DRAFT" ? "Borrador" : requestDto.status}</Typography>
                    <Typography variant="body2"><strong>Total Items:</strong> {requestDto.items?.length}</Typography>
                    <Typography variant="body2"><strong>Total Estimado:</strong> S/. {totalEstimado.toFixed(2)}</Typography>
                  </Box>
                </Box>

                {/* Materiales */}
                {materialesAPI.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography variant="body2" fontWeight={600} sx={{ color: categoriaConfig.MATERIAL.color }}>
                          {categoriaConfig.MATERIAL.icon} Materiales
                        </Typography>
                        <Chip label={`${materialesAPI.length} items`} size="small" sx={{ bgcolor: categoriaConfig.MATERIAL.color, color: "white", fontWeight: 600 }} />
                      </Box>
                      <ButtonBase variant="contained" size="small" label="Exportar materiales" startIcon={<FileDownloadOutlined />} onClick={exportarMateriales}
                        sx={{ bgcolor: categoriaConfig.MATERIAL.color, "&:hover": { bgcolor: categoriaConfig.MATERIAL.color, filter: "brightness(0.9)" } }} />
                    </Box>
                    <CustomDataGrid columns={columns} localRows={materialesAPI} serverSide={false} search={""} onSearch={() => { }} editMode="cell" processRowUpdate={processRowUpdateMaterial} sx={{ border: `2px solid ${categoriaConfig.MATERIAL.color}30` }} />
                  </Box>
                )}

                {/* Herramientas */}
                {herramientasAPI.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography variant="body2" fontWeight={600} sx={{ color: categoriaConfig.TOOL.color }}>
                          {categoriaConfig.TOOL.icon} Herramientas
                        </Typography>
                        <Chip label={`${herramientasAPI.length} items`} size="small" sx={{ bgcolor: categoriaConfig.TOOL.color, color: "white", fontWeight: 600 }} />
                      </Box>
                      <ButtonBase variant="contained" size="small" label="Exportar Herramientas" startIcon={<FileDownloadOutlined />} onClick={exportarHerramientas}
                        sx={{ bgcolor: categoriaConfig.TOOL.color, "&:hover": { bgcolor: categoriaConfig.TOOL.color, filter: "brightness(0.9)" } }} />
                    </Box>
                    <CustomDataGrid columns={columns} localRows={herramientasAPI} serverSide={false} search={""} onSearch={() => { }} editMode="cell" processRowUpdate={processRowUpdateTool} sx={{ border: `2px solid ${categoriaConfig.TOOL.color}30` }} />
                  </Box>
                )}

                {/* Equipos */}
                {equiposAPI.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography variant="body2" fontWeight={600} sx={{ color: categoriaConfig.EQUIPMENT.color }}>
                          {categoriaConfig.EQUIPMENT.icon} Equipos
                        </Typography>
                        <Chip label={`${equiposAPI.length} items`} size="small" sx={{ bgcolor: categoriaConfig.EQUIPMENT.color, color: "white", fontWeight: 600 }} />
                      </Box>
                      <ButtonBase variant="contained" size="small" label="Exportar Equipos" startIcon={<FileDownloadOutlined />} onClick={exportarEquipos}
                        sx={{ bgcolor: categoriaConfig.EQUIPMENT.color, "&:hover": { bgcolor: categoriaConfig.EQUIPMENT.color, filter: "brightness(0.9)" } }} />
                    </Box>
                    <CustomDataGrid columns={columns} localRows={equiposAPI} serverSide={false} search={""} onSearch={() => { }} editMode="cell" processRowUpdate={processRowUpdateEquipo} />
                  </Box>
                )}

                <Divider sx={{ my: 3 }} />

                {/* Botones de acción */}
                <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", flexWrap: "wrap" }}>
                  <ButtonBase label="Recargar Datos" startIcon={<RefreshOutlined />} onClick={limpiarDatos} disabled={loading} sx={{ px: 4, py: 1.2 }} />
                  <ButtonBase
                    label={submitting ? "Enviando..." : "Confirmar y Enviar Solicitud"}
                    startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SendOutlined />}
                    onClick={handleConfirmarSolicitud}
                    disabled={submitting || requestDto.status !== "DRAFT"}
                  />
                </Box>
              </>
            )}
          </>
        )}
      </Card>

      {/* ══════════════════════════════════════════════════════════════════════
          MODAL DE CONFIRMACIÓN — con selector de columnas Excel
      ══════════════════════════════════════════════════════════════════════ */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" } }}
      >
        {/* Header */}
        <DialogTitle sx={{ m: 0, p: 2, display: "flex", alignItems: "center", justifyContent: "space-between", bgcolor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ bgcolor: "primary.main", color: "white", p: 0.5, borderRadius: 1, display: "flex" }}>
              <SendOutlined fontSize="small" />
            </Box>
            <Typography variant="h6" fontWeight={700} sx={{ color: "#1e293b" }}>Confirmar Envío</Typography>
          </Stack>
          <IconButton onClick={() => setConfirmDialogOpen(false)} size="small">
            <Close fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3, mt: 2 }}>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Verifica los detalles antes de continuar. Una vez enviada, la solicitud se bloqueará para edición.
          </Typography>

          {/* Resumen */}
          <Box sx={{ p: 2.5, bgcolor: "#f1f5f9", borderRadius: 2, mb: 3, border: "1px solid #e2e8f0" }}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <AssignmentOutlined color="action" fontSize="small" />
                <Box>
                  <Typography variant="caption" display="block" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700 }}>Número de Solicitud</Typography>
                  <Typography variant="body2" fontWeight={600}>{requestDto?.requestNumber || "N/A"}</Typography>
                </Box>
              </Stack>
              <Divider />
              <Stack direction="row" spacing={2} alignItems="center">
                <Inventory2Outlined color="action" fontSize="small" />
                <Box>
                  <Typography variant="caption" display="block" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700 }}>Total de Items</Typography>
                  <Typography variant="body2" fontWeight={600}>{requestDto?.items?.length} productos registrados</Typography>
                </Box>
              </Stack>
              <Divider />
              <Stack direction="row" spacing={2} alignItems="center">
                <EventOutlined color="action" fontSize="small" />
                <Box>
                  <Typography variant="caption" display="block" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700 }}>Fecha de Requerimiento</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {dayjs(requestDto?.requestedDeliveryDate).format("DD [de] MMMM, YYYY")}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>

          {/* ── Selector de columnas Excel ──────────────────────────────── */}
          <Box sx={{ mb: 3, p: 2.5, bgcolor: "#f8fafc", borderRadius: 2, border: "1px solid #e2e8f0" }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
              <TableChartOutlined color="action" fontSize="small" />
              <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: "uppercase", letterSpacing: 0.8 }}>
                Columnas a incluir en el Excel
              </Typography>
            </Stack>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {COLUMNAS_DISPONIBLES.map(col => {
                const seleccionada = columnasSeleccionadas.includes(col.field);
                return (
                  <Chip
                    key={col.field}
                    label={col.label}
                    size="small"
                    variant={seleccionada ? "filled" : "outlined"}
                    color={seleccionada ? "primary" : "default"}
                    onClick={() => toggleColumna(col.field)}
                    sx={{
                      cursor: "pointer",
                      fontWeight: seleccionada ? 700 : 400,
                      transition: "all 0.15s",
                    }}
                  />
                );
              })}
            </Box>

            <Typography variant="caption" color="text.disabled" sx={{ mt: 1.5, display: "block" }}>
              {columnasSeleccionadas.length} de {COLUMNAS_DISPONIBLES.length} columnas seleccionadas
              {columnasSeleccionadas.length === 0 && (
                <Box component="span" sx={{ color: "error.main", ml: 1, fontWeight: 600 }}>
                  — Selecciona al menos una columna
                </Box>
              )}
            </Typography>
          </Box>
          {/* ─────────────────────────────────────────────────────────────── */}

          <Alert severity="warning" icon={<WarningAmberOutlined />} sx={{ borderRadius: 2, fontWeight: 500 }}>
            Esta acción es irreversible. La solicitud se bloqueará para edición una vez enviada.
          </Alert>
        </DialogContent>

        <DialogActions sx={{ p: 3, bgcolor: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
          <ButtonBase
            label="Regresar"
            onClick={() => setConfirmDialogOpen(false)}
            sx={{ bgcolor: "white", color: "#64748b", border: "1px solid #cbd5e1", "&:hover": { bgcolor: "#f1f5f9" } }}
          />
          <ButtonBase
            label="Confirmar y Enviar"
            startIcon={<SendOutlined />}
            onClick={handleEnviarSolicitud}
            disabled={columnasSeleccionadas.length === 0}
            sx={{ px: 4, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
}