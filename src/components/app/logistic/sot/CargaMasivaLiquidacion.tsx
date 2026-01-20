"use client";

import { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import {
  UploadFileOutlined,
  CheckCircleOutline,
  WarningAmberOutlined,
  RefreshOutlined,
  VisibilityOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import * as XLSX from "xlsx";
import { TitleCard } from "@/src/components/base/TitleCard";
import CustomDataGrid from "@/src/components/base/CustomDataGrid";
import { GridColDef } from "@mui/x-data-grid";

// ===== INTERFACES =====
interface DatoPreliminar {
  id?: number;
  sot: string;
  codigoCliente: string;
  razonSocial: string;
  direccion: string;
  distrito: string;
  provincia: string;
  telefono: string;
  fecha: string;
  fechaProgramacion?: string;
  horaInicio: string;
  horaSalida: string;
  plataforma: string;
  servicioRealizado: string;
  fuente: "sin_validar" | "validado";
  tTrabajo?: string;
  detalleTrabajo?: string;
  tecnico?: string;
  estado?: string;
  subEstado?: string;
  franja?: string;
  plano?: string;
}

interface DiferenciaDetectada {
  id?: number;
  sot: string;
  campo: string;
  valorAnterior: string;
  valorNuevo: string;
}

export default function CargaMasivaLiquidacion() {
  // ===== ESTADOS =====
  const [etapaActual, setEtapaActual] = useState<number>(0);
  const [datosPrelim, setDatosPrelim] = useState<DatoPreliminar[]>([]);
  const [datosValidados, setDatosValidados] = useState<DatoPreliminar[]>([]);
  const [diferenciasDetectadas, setDiferenciasDetectadas] = useState
    <DiferenciaDetectada[]
  >([]);
  const [cargandoArchivo, setCargandoArchivo] = useState<boolean>(false);
  const [filtroSOT, setFiltroSOT] = useState<string>("");
  const [searchPreliminar, setSearchPreliminar] = useState<string>("");
  const [searchValidado, setSearchValidado] = useState<string>("");
  const [searchDiferencias, setSearchDiferencias] = useState<string>("");

  console.log(datosPrelim,"testing-datos-preliminares")

  // ===== DEFINICIÓN DE COLUMNAS =====
  
  // Columnas para datos preliminares
  const columnasPreliminar: GridColDef[] = [
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
      field: "tecnico",
      headerName: "Técnico",
      width: 250,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 150,
    },
    {
      field: "subEstado",
      headerName: "Sub Estado",
      width: 180,
    },
    {
      field: "franja",
      headerName: "Franja",
      width: 120,
    },
    {
      field: "tTrabajo",
      headerName: "T. Trabajo",
      width: 150,
    },
    {
      field: "detalleTrabajo",
      headerName: "Detalle Trabajo",
      width: 300,
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

  // Columnas para datos validados
  const columnasValidado: GridColDef[] = [
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
      field: "razonSocial",
      headerName: "Cliente",
      width: 250,
    },
    {
      field: "direccion",
      headerName: "Dirección",
      width: 300,
    },
    {
      field: "fecha",
      headerName: "Fecha",
      width: 120,
    },
    {
      field: "distrito",
      headerName: "Distrito",
      width: 150,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={
            params.value === "validado"
              ? "Validado"
              : params.value === "modificado"
              ? "Modificado"
              : "Preliminar"
          }
          size="small"
          color={
            params.value === "validado"
              ? "success"
              : params.value === "modificado"
              ? "warning"
              : "default"
          }
          icon={
            params.value === "validado" ? (
              <CheckCircleOutline />
            ) : (
              <WarningAmberOutlined />
            )
          }
        />
      ),
    },
  ];

  // Columnas para diferencias detectadas
  const columnasDiferencias: GridColDef[] = [
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
      field: "campo",
      headerName: "Campo",
      width: 200,
      renderCell: (params) => (
        <Chip label={params.value} size="small" color="primary" />
      ),
    },
    {
      field: "valorAnterior",
      headerName: "Valor Anterior",
      width: 300,
      renderCell: (params) => (
        <Typography variant="body2" color="error">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "valorNuevo",
      headerName: "Valor Nuevo",
      width: 300,
      renderCell: (params) => (
        <Typography variant="body2" color="success.main" fontWeight={600}>
          {params.value}
        </Typography>
      ),
    },
  ];

  // ===== FUNCIONES DE PROCESAMIENTO =====

  /**
   * PASO 1: Procesar Excel SIN VALIDAR (mismo día)
   */
  const procesarExcelSinValidar = (file: File) => {
    setCargandoArchivo(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

        console.log("📊 Excel sin validar cargado:", jsonData.length, "filas");

        const datosExtraidos: DatoPreliminar[] = jsonData.map((row, index) => ({
          id: index + 1,
          sot: row["SOT"] || row["Numero SOT"] || "",
          codigoCliente: row["Codigo Cliente"] || row["COD_CLIENTE"] || "",
          razonSocial: row["Razon Social"] || row["CLIENTE"] || "",
          direccion: row["Direccion"] || row["DIRECCION"] || "",
          distrito: row["Distrito"] || row["DISTRITO"] || "",
          provincia: row["Provincia"] || row["PROVINCIA"] || "",
          telefono: row["Telefono"] || row["TELEFONO"] || "",
          fecha:
            row["Fecha de Generacion de la Orden"] ||
            row["FECHA_SERVICIO"] ||
            "",
          fechaProgramacion: row["Fecha de Programacion"] || "",
          horaInicio: row["Hora Inicio"] || row["HORA_INICIO"] || "",
          horaSalida: row["Hora Salida"] || row["HORA_FIN"] || "",
          plataforma: row["Plataforma"] || row["TECNOLOGIA"] || "",
          servicioRealizado:
            row["Servicio"] || row["TIPO_SERVICIO"] || row["T. SERVICIO"] || "",
          fuente: "sin_validar",
          tTrabajo: row["Tipo de Orden"] || row["T. TRABAJO"] || "",
          detalleTrabajo:
            row["Sub Tipo de Orden"] || row["DETALLE DEL TRABAJO"] || "",
          tecnico: row["Tecnico"] || row["TECNICO 1"] || "",
          estado: row["Estado"] || row["ESTADO"] || "",
          subEstado: row["SUB ESTADO"] || "",
          franja: row["Intervalo de tiempo"] || row["FRANJA"] || "",
          plano: row["Plano"] || row["PLANO"] || "",
        }));

        setDatosPrelim(datosExtraidos);
        setEtapaActual(1);

        console.log("✅ Datos preliminares procesados:", datosExtraidos.length);
      } catch (error) {
        console.error("❌ Error procesando Excel sin validar:", error);
        alert("Error al procesar el archivo. Verifica el formato.");
      } finally {
        setCargandoArchivo(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  /**
   * PASO 2: Procesar Excel VALIDADO (día después)
   */
  const procesarExcelValidado = (file: File) => {
    setCargandoArchivo(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

        console.log("📊 Excel validado cargado:", jsonData.length, "filas");

        const datosValidadosTemp: DatoPreliminar[] = jsonData.map((row, index) => ({
          id: index + 1,
          sot: row["SOT"] || row["Numero SOT"] || "",
          codigoCliente: row["Codigo Cliente"] || row["COD_CLIENTE"] || "",
          razonSocial: row["Razon Social"] || row["CLIENTE"] || "",
          direccion: row["Direccion"] || row["DIRECCION"] || "",
          distrito: row["Distrito"] || row["DISTRITO"] || "",
          provincia: row["Provincia"] || row["PROVINCIA"] || "",
          telefono: row["Telefono"] || row["TELEFONO"] || "",
          fecha: row["Fecha"] || row["FECHA_SERVICIO"] || "",
          horaInicio: row["Hora Inicio"] || row["HORA_INICIO"] || "",
          horaSalida: row["Hora Salida"] || row["HORA_FIN"] || "",
          plataforma: row["Plataforma"] || row["TECNOLOGIA"] || "",
          servicioRealizado: row["Servicio"] || row["TIPO_SERVICIO"] || "",
          estado: "validado",
          fuente: "validado",
        }));

        // COMPARAR Y DETECTAR DIFERENCIAS
        const diferencias: DiferenciaDetectada[] = [];
        const datosActualizados = [...datosPrelim];

        datosValidadosTemp.forEach((validado) => {
          const indexPreliminar = datosActualizados.findIndex(
            (p) => p.sot === validado.sot
          );

          if (indexPreliminar !== -1) {
            const preliminar = datosActualizados[indexPreliminar];

            const camposComparar: (keyof DatoPreliminar)[] = [
              "codigoCliente",
              "razonSocial",
              "direccion",
              "fecha",
              "plataforma",
              "servicioRealizado",
            ];

            camposComparar.forEach((campo) => {
              if (preliminar[campo] !== validado[campo]) {
                diferencias.push({
                  id: diferencias.length + 1,
                  sot: validado.sot,
                  campo: campo,
                  valorAnterior: String(preliminar[campo]),
                  valorNuevo: String(validado[campo]),
                });

                datosActualizados[indexPreliminar] = {
                  ...datosActualizados[indexPreliminar],
                  [campo]: validado[campo],
                  estado: "modificado",
                };
              }
            });

            if (!diferencias.some((d) => d.sot === validado.sot)) {
              datosActualizados[indexPreliminar].estado = "validado";
            }
          } else {
            datosActualizados.push(validado);
          }
        });

        setDatosValidados(datosActualizados);
        setDiferenciasDetectadas(diferencias);
        setEtapaActual(3);

        console.log("✅ Validación completada");
        console.log("🔄 Diferencias detectadas:", diferencias.length);
      } catch (error) {
        console.error("❌ Error procesando Excel validado:", error);
        alert("Error al procesar el archivo. Verifica el formato.");
      } finally {
        setCargandoArchivo(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  /**
   * Buscar datos por SOT
   */
  const buscarPorSOT = (sot: string): DatoPreliminar | undefined => {
    const datos = datosValidados.length > 0 ? datosValidados : datosPrelim;
    return datos.find((d) => d.sot === sot);
  };

  /**
   * Obtener datos para pre-llenar formulario
   */
  const obtenerDatosParaFormulario = (sot: string) => {
    const datos = buscarPorSOT(sot);
    if (datos) {
      console.log("📋 Datos encontrados para SOT:", sot, datos);
      return datos;
    }
    console.log("⚠️ No se encontraron datos para SOT:", sot);
    return null;
  };

  /**
   * Handler para ver detalles de un registro
   */
  const handleVerDetalle = (row: DatoPreliminar) => {
    alert(
      `Detalles de SOT ${row.sot}:\n\n` +
      `Cliente: ${row.razonSocial}\n` +
      `Dirección: ${row.direccion}\n` +
      `Distrito: ${row.distrito}\n` +
      `Fecha: ${row.fecha}\n` +
      `Estado: ${row.estado}\n` +
      `Técnico: ${row.tecnico || "N/A"}`
    );
  };

  // ===== RENDER =====
  return (
    <Box sx={{ maxWidth: 1600, mx: "auto", p: 3 }}>
      {/* Título */}
      <TitleCard
        icon={<UploadFileOutlined sx={{ fontSize: 32 }} />}
        title="CARGA MASIVA - LIQUIDACIÓN DE SERVICIOS"
        description="Sistema de doble validación: Datos preliminares + Datos validados"
      />

      {/* Stepper */}
      <Card elevation={0} sx={{ mt: 3, p: 4, borderRadius: 4 }}>
        <Stepper activeStep={etapaActual} alternativeLabel>
          <Step>
            <StepLabel>
              Cargar Excel Sin Validar
              <Typography
                variant="caption"
                display="block"
                color="text.secondary"
              >
                Mismo día - Datos preliminares
              </Typography>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              Revisar Datos Preliminares
              <Typography
                variant="caption"
                display="block"
                color="text.secondary"
              >
                {datosPrelim.length} registros cargados
              </Typography>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              Cargar Excel Validado
              <Typography
                variant="caption"
                display="block"
                color="text.secondary"
              >
                Día siguiente - Validación final
              </Typography>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              Datos Finales
              <Typography
                variant="caption"
                display="block"
                color="text.secondary"
              >
                Validación completada
              </Typography>
            </StepLabel>
          </Step>
        </Stepper>
      </Card>

      {/* ETAPA 0: Cargar Excel Sin Validar */}
      {etapaActual === 0 && (
        <Card elevation={0} sx={{ mt: 3, p: 4, borderRadius: 4 }}>
          <Box sx={{ textAlign: "center" }}>
            <UploadFileOutlined
              sx={{ fontSize: 80, color: "primary.main", mb: 2 }}
            />
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Paso 1: Cargar Excel Sin Validar
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={4}>
              Este archivo se genera el mismo día y contiene datos preliminares
            </Typography>

            <Button
              variant="contained"
              size="large"
              component="label"
              startIcon={<UploadFileOutlined />}
              disabled={cargandoArchivo}
              sx={{ px: 6, py: 2, textTransform: "none", fontWeight: 700 }}
            >
              Seleccionar Archivo Excel
              <input
                type="file"
                hidden
                accept=".xlsx,.xls"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) procesarExcelSinValidar(file);
                }}
              />
            </Button>

            {cargandoArchivo && (
              <Box sx={{ mt: 3 }}>
                <LinearProgress />
                <Typography variant="caption" color="text.secondary" mt={1}>
                  Procesando archivo...
                </Typography>
              </Box>
            )}
          </Box>
        </Card>
      )}

      {/* ETAPA 1: Visualizar Datos Preliminares */}
      {etapaActual === 1 && (
        <>
          <Alert
            severity="success"
            sx={{ mt: 3 }}
            icon={<CheckCircleOutline />}
          >
            <Typography variant="body2" fontWeight={600}>
              ✅ {datosPrelim.length} registros preliminares cargados
              correctamente
            </Typography>
            <Typography variant="caption" display="block" mt={0.5}>
              Puedes usar estos datos para pre-llenar formularios de liquidación
            </Typography>
          </Alert>

          <Card elevation={0} sx={{ mt: 3, p: 4, borderRadius: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6" fontWeight={700}>
                Datos Preliminares
              </Typography>
              <Button
                variant="contained"
                startIcon={<UploadFileOutlined />}
                onClick={() => setEtapaActual(2)}
                sx={{ textTransform: "none" }}
              >
                Continuar a Validación
              </Button>
            </Box>

            <CustomDataGrid
              columns={columnasPreliminar}
              localRows={datosPrelim}
              serverSide={false}
              search={searchPreliminar}
              onSearch={setSearchPreliminar}
              onView={handleVerDetalle}
              pageSize={10}
              sx={{ minHeight: 500 }}
            />
          </Card>
        </>
      )}

      {/* ETAPA 2: Cargar Excel Validado */}
      {etapaActual === 2 && (
        <Card elevation={3} sx={{ mt: 3, p: 4, borderRadius: 4 }}>
          <Box sx={{ textAlign: "center" }}>
            <RefreshOutlined
              sx={{ fontSize: 80, color: "success.main", mb: 2 }}
            />
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Paso 2: Cargar Excel Validado
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={4}>
              Este archivo se genera al día siguiente con datos validados por
              CLARO
            </Typography>

            <Button
              variant="contained"
              color="success"
              size="large"
              component="label"
              startIcon={<UploadFileOutlined />}
              disabled={cargandoArchivo}
              sx={{ px: 6, py: 2, textTransform: "none", fontWeight: 700 }}
            >
              Seleccionar Archivo Validado
              <input
                type="file"
                hidden
                accept=".xlsx,.xls"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) procesarExcelValidado(file);
                }}
              />
            </Button>

            {cargandoArchivo && (
              <Box sx={{ mt: 3 }}>
                <LinearProgress color="success" />
                <Typography variant="caption" color="text.secondary" mt={1}>
                  Validando y comparando datos...
                </Typography>
              </Box>
            )}
          </Box>
        </Card>
      )}

      {/* ETAPA 3: Mostrar Resultados de Validación */}
      {etapaActual === 3 && (
        <>
          {/* Mostrar diferencias detectadas */}
          {diferenciasDetectadas.length > 0 && (
            <Card elevation={3} sx={{ mt: 3, p: 4, borderRadius: 4 }}>
              <Alert severity="warning" sx={{ mb: 3 }}>
                <Typography variant="body2" fontWeight={600}>
                  ⚠️ Se detectaron {diferenciasDetectadas.length} diferencias
                  entre datos preliminares y validados
                </Typography>
              </Alert>

              <Typography variant="h6" fontWeight={700} mb={3}>
                Diferencias Detectadas
              </Typography>

              <CustomDataGrid
                columns={columnasDiferencias}
                localRows={diferenciasDetectadas}
                serverSide={false}
                search={searchDiferencias}
                onSearch={setSearchDiferencias}
                pageSize={10}
                sx={{ minHeight: 400 }}
              />
            </Card>
          )}

          {/* Datos finales validados */}
          {datosValidados.length > 0 && (
            <Card elevation={3} sx={{ mt: 3, p: 4, borderRadius: 4 }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                <Typography variant="body2" fontWeight={600}>
                  ✅ Validación completada: {datosValidados.length} registros
                  procesados
                </Typography>
              </Alert>

              <Typography variant="h6" fontWeight={700} mb={3}>
                Datos Finales (Validados)
              </Typography>

              <CustomDataGrid
                columns={columnasValidado}
                localRows={datosValidados}
                serverSide={false}
                search={searchValidado}
                onSearch={setSearchValidado}
                onView={handleVerDetalle}
                pageSize={10}
                sx={{ minHeight: 500 }}
              />
            </Card>
          )}
        </>
      )}

      {/* Panel de búsqueda rápida */}
      {/* {(datosPrelim.length > 0 || datosValidados.length > 0) && (
        <Card
          elevation={3}
          sx={{ mt: 3, p: 4, borderRadius: 4, bgcolor: "info.50" }}
        >
          <Typography variant="h6" fontWeight={700} mb={3}>
            🔍 Buscar Datos por SOT
          </Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <input
              type="text"
              placeholder="Ingresa número de SOT..."
              value={filtroSOT}
              onChange={(e) => setFiltroSOT(e.target.value)}
              style={{
                flex: 1,
                padding: "12px 16px",
                fontSize: "16px",
                border: "2px solid #1976d2",
                borderRadius: "8px",
              }}
            />
            <Button
              variant="contained"
              startIcon={<SearchOutlined />}
              onClick={() => {
                const datos = obtenerDatosParaFormulario(filtroSOT);
                if (datos) {
                  alert(
                    `Datos encontrados para SOT ${filtroSOT}:\n\n` +
                      `Cliente: ${datos.razonSocial}\n` +
                      `Dirección: ${datos.direccion}\n` +
                      `Estado: ${datos.estado}`
                  );
                } else {
                  alert(`No se encontraron datos para SOT: ${filtroSOT}`);
                }
              }}
              sx={{ px: 4, textTransform: "none" }}
            >
              Buscar
            </Button>
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            mt={2}
            display="block"
          >
            💡 Tip: Usa esta búsqueda para obtener datos y pre-llenar el
            formulario de liquidación
          </Typography>
        </Card>
      )} */}
    </Box>
  );
}