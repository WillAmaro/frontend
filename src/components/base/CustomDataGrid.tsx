
// "use client";

// import { Box, IconButton, TextField, useTheme } from "@mui/material";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { esES } from "@mui/x-data-grid/locales";
// import { useEffect, useState } from "react";
// import { SxProps, Theme } from "@mui/material";

// type Props = {
//   reloadTrigger?: number;
//   columns: GridColDef[];
//   onEdit?: (row: any) => void;
//   onDelete?: (row: any) => void;
//   onView?: (row: any) => void;
//   checkboxSelection?: boolean;
//   fetchData?: (
//     page: number,
//     pageSize: number,
//     search: string
//   ) => Promise<{ rows: any[]; total: number }>;
//   pageSize?: number;
//   localRows?: any[];
//   serverSide?: boolean;
//   search: string;
//   sx?: SxProps<Theme>;
//   onSearch: (value: string) => void;
//   // Nuevas props para edición inline
//   editMode?: "row" | "cell";
//   onCellEditStop?: (params: any, event: any) => void;
//   processRowUpdate?: (newRow: any, oldRow: any) => any;
//   onProcessRowUpdateError?: (error: any) => void;
//   // Props adicionales para filtros
//   showToolbar?: boolean;
// };

// type ToolbarProps = {
//   onSearch: (value: string) => void;
// };

// function CustomToolbar({ onSearch }: ToolbarProps) {
//   return (
//     <Box
//       sx={{
//         p: 1,
//         display: "flex",
//         justifyContent: "flex-end",
//         gap: 2,
//       }}
//     >
//       <TextField
//         size="small"
//         placeholder="Buscar..."
//         onChange={(e) => onSearch(e.target.value)}
//       />
//     </Box>
//   );
// }

// export default function CustomDataGrid({
//   columns,
//   onEdit,
//   onDelete,
//   onView,
//   fetchData,
//   localRows = [],
//   serverSide = true,
//   checkboxSelection = false,
//   pageSize = 10,
//   onSearch,
//   reloadTrigger = 0,
//   search,
//   sx,
//   editMode = "cell",
//   onCellEditStop,
//   processRowUpdate,
//   onProcessRowUpdateError,
//   showToolbar = true,
// }: Props) {
//   const theme = useTheme();
//   const [page, setPage] = useState(0);
//   const [rows, setRows] = useState<any[]>([]);
//   const [rowCount, setRowCount] = useState(0);
//   const [loading, setLoading] = useState(false);

//   // Agregar columna solo si hay acciones
//   const actionColumn: GridColDef | null =
//     onEdit || onDelete || onView
//       ? {
//           field: "actions",
//           headerName: "Acciones",
//           sortable: false,
//           filterable: false,
//           disableColumnMenu: true,
//           align: "center",
//           headerAlign: "center",
//           width: 150,
//           renderCell: (params) => (
//             <Box>
//               {onView && (
//                 <IconButton
//                   color="info"
//                   size="small"
//                   onClick={() => onView(params.row)}
//                 >
//                   <VisibilityIcon fontSize="inherit" />
//                 </IconButton>
//               )}
//               {onEdit && (
//                 <IconButton
//                   color="primary"
//                   size="small"
//                   onClick={() => onEdit(params.row)}
//                 >
//                   <EditIcon fontSize="inherit" />
//                 </IconButton>
//               )}
//               {onDelete && (
//                 <IconButton
//                   color="error"
//                   size="small"
//                   onClick={() => onDelete(params.row)}
//                 >
//                   <DeleteIcon fontSize="inherit" />
//                 </IconButton>
//               )}
//             </Box>
//           ),
//         }
//       : null;

//   // Client-side
//   useEffect(() => {
//     if (!serverSide) {
//       const filtered = localRows.filter((row) =>
//         Object.values(row)
//           .join(" ")
//           .toLowerCase()
//           .includes(search.toLowerCase())
//       );

//       setRowCount(filtered.length);

//       const start = page * pageSize;
//       const end = start + pageSize;
//       setRows(filtered);
//     }
//   }, [page, pageSize, search, serverSide, localRows]);

//   // Server-side
//   useEffect(() => {
//     if (serverSide && fetchData) {
//       setLoading(true);
//       fetchData(page, pageSize, search).then((data) => {
//         setRows(data.rows);
//         setRowCount(data.total);
//         setLoading(false);
//       });
//     }
//   }, [page, pageSize, search, serverSide, reloadTrigger]);

//   return (
//     <div style={{ height: "auto", width: "100%", overflowX: "auto" }}>
//       <DataGrid
//         sx={{
//           "& .MuiDataGrid-cell": {
//             alignContent: "center",
//           },
//           ...sx,
//         }}
//         rows={rows}
//         columns={actionColumn ? [...columns, actionColumn] : columns}
//         rowCount={serverSide ? rowCount : undefined}
//         pageSizeOptions={[pageSize]}
//         paginationMode={serverSide ? "server" : "client"}
//         paginationModel={{ page, pageSize }}
//         onPaginationModelChange={(model) => setPage(model.page)}
//         loading={loading}
//         disableRowSelectionOnClick
//         checkboxSelection={checkboxSelection}
//         // Props para edición inline
//         editMode={editMode}
//         onCellEditStop={onCellEditStop}
//         processRowUpdate={processRowUpdate}
//         onProcessRowUpdateError={onProcessRowUpdateError}
//         slots={
//           showToolbar
//             ? {
//                 toolbar: () => <CustomToolbar onSearch={onSearch} />,
//               }
//             : undefined
//         }
//         slotProps={{
//           baseCheckbox: {
//             sx: {
//               color: theme.palette.text.primary,
//               "&.Mui-checked": {
//                 color: theme.palette.text.primary,
//               },
//             },
//           } as any,
//         }}
//       />
//     </div>
//   );
// // }

// "use client";

// import { Box, Checkbox, IconButton, TextField, useTheme } from "@mui/material";
// import {
//   DataGrid,
//   GridColDef,
//   GridPaginationModel,
// } from "@mui/x-data-grid";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { useEffect, useMemo, useState } from "react";
// import { SxProps, Theme } from "@mui/material";

// // ─── Tipos ────────────────────────────────────────────────────────────────────

// type Props = {
//   // Datos
//   columns: GridColDef[];
//   localRows?: any[];
//   serverSide?: boolean;
//   fetchData?: (
//     page: number,
//     pageSize: number,
//     search: string
//   ) => Promise<{ rows: any[]; total: number }>;

//   // Búsqueda
//   search: string;
//   onSearch: (value: string) => void;
//   showToolbar?: boolean;

//   // Paginación
//   pageSize?: number;
//   reloadTrigger?: number;

//   // Acciones de fila
//   onEdit?: (row: any) => void;
//   onDelete?: (row: any) => void;
//   onView?: (row: any) => void;

//   // ── Selección manual (reemplaza checkboxSelection de MUI) ────────────
//   // En lugar de usar el sistema interno de MUI X (que crashea con
//   // rowSelectionModel pre-poblado), manejamos la selección desde afuera
//   // con una columna Checkbox custom. El DataGrid nunca sabe de la selección.
//   selectionEnabled?: boolean;               // muestra columna de checkboxes
//   selectedIds?: Set<number | string>;        // IDs seleccionados (controlado por el padre)
//   onSelectionChange?: (id: number | string, checked: boolean) => void;
//   onSelectAll?: (checked: boolean, visibleIds: (number | string)[]) => void;

//   // Edición inline
//   editMode?: "row" | "cell";
//   onCellEditStop?: (params: any, event: any) => void;
//   processRowUpdate?: (newRow: any, oldRow?: any) => any;
//   onProcessRowUpdateError?: (error: any) => void;

//   // Estilo
//   sx?: SxProps<Theme>;
//   getRowClassName?: (params: any) => string;
// };

// // ─── Toolbar interno ──────────────────────────────────────────────────────────

// function CustomToolbar({ onSearch }: { onSearch: (value: string) => void }) {
//   return (
//     <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end", gap: 2 }}>
//       <TextField
//         size="small"
//         placeholder="Buscar..."
//         onChange={(e) => onSearch(e.target.value)}
//       />
//     </Box>
//   );
// }

// // ─── Componente ───────────────────────────────────────────────────────────────

// export default function CustomDataGrid({
//   columns,
//   onEdit,
//   onDelete,
//   onView,
//   fetchData,
//   localRows = [],
//   serverSide = true,
//   pageSize = 10,
//   onSearch,
//   reloadTrigger = 0,
//   search,
//   sx,
//   editMode = "cell",
//   onCellEditStop,
//   processRowUpdate,
//   onProcessRowUpdateError,
//   showToolbar = true,
//   // Selección manual
//   selectionEnabled = false,
//   selectedIds,
//   onSelectionChange,
//   onSelectAll,
//   getRowClassName,
// }: Props) {
//   const theme = useTheme();
//   const [page, setPage] = useState(0);
//   const [serverRows, setServerRows] = useState<any[]>([]);
//   const [serverRowCount, setServerRowCount] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const pageSizeOptions = useMemo(() => [pageSize], [pageSize]);

//   // ── Client-side: useMemo directo, sin useState ────────────────────────
//   const clientRows = useMemo(() => {
//     if (serverSide) return [];
//     if (!search.trim()) return localRows;
//     const q = search.toLowerCase();
//     return localRows.filter((row) =>
//       Object.values(row).join(" ").toLowerCase().includes(q)
//     );
//   }, [serverSide, localRows, search]);

//   const activeRows = serverSide ? serverRows : clientRows;

//   // ── Server-side ───────────────────────────────────────────────────────
//   useEffect(() => {
//     if (serverSide && fetchData) {
//       setLoading(true);
//       fetchData(page, pageSize, search)
//         .then((data) => {
//           setServerRows(data.rows);
//           setServerRowCount(data.total);
//         })
//         .finally(() => setLoading(false));
//     }
//   }, [page, pageSize, search, serverSide, reloadTrigger]);

//   // ── Columna checkbox manual ───────────────────────────────────────────
//   // Se inyecta como primera columna cuando selectionEnabled=true.
//   // Usa Checkbox de MUI normal, NO el sistema interno de MUI X.
//   // Así el DataGrid es completamente agnóstico a la selección.
//   const visibleIds = activeRows.map((r) => r.id);
//   const allSelected =
//     visibleIds.length > 0 &&
//     selectedIds !== undefined &&
//     visibleIds.every((id) => selectedIds.has(id));
//   const someSelected =
//     selectedIds !== undefined &&
//     visibleIds.some((id) => selectedIds.has(id)) &&
//     !allSelected;

//   const checkboxColumn: GridColDef = {
//     field: "__selection__",
//     headerName: "",
//     width: 52,
//     sortable: false,
//     filterable: false,
//     disableColumnMenu: true,
//     align: "center",
//     headerAlign: "center",
//     // Header: checkbox "seleccionar todos"
//     renderHeader: () => (
//       <Checkbox
//         size="small"
//         checked={allSelected}
//         indeterminate={someSelected}
//         onChange={(e) => onSelectAll?.(e.target.checked, visibleIds)}
//         sx={{
//           color: "rgba(255,255,255,0.7)",
//           "&.Mui-checked":        { color: "white" },
//           "&.MuiCheckbox-indeterminate": { color: "rgba(255,255,255,0.7)" },
//         }}
//       />
//     ),
//     renderCell: (params) => (
//       <Checkbox
//         size="small"
//         checked={selectedIds?.has(params.row.id) ?? false}
//         onChange={(e) => onSelectionChange?.(params.row.id, e.target.checked)}
//         onClick={(e) => e.stopPropagation()}
//         sx={{
//           color: theme.palette.text.disabled,
//           "&.Mui-checked": { color: theme.palette.primary.main },
//         }}
//       />
//     ),
//   };

//   // ── Columna de acciones ───────────────────────────────────────────────
//   const actionColumn: GridColDef | null =
//     onEdit || onDelete || onView
//       ? {
//           field: "actions",
//           headerName: "Acciones",
//           sortable: false,
//           filterable: false,
//           disableColumnMenu: true,
//           align: "center",
//           headerAlign: "center",
//           width: 150,
//           renderCell: (params) => (
//             <Box>
//               {onView && (
//                 <IconButton color="info" size="small" onClick={() => onView(params.row)}>
//                   <VisibilityIcon fontSize="inherit" />
//                 </IconButton>
//               )}
//               {onEdit && (
//                 <IconButton color="primary" size="small" onClick={() => onEdit(params.row)}>
//                   <EditIcon fontSize="inherit" />
//                 </IconButton>
//               )}
//               {onDelete && (
//                 <IconButton color="error" size="small" onClick={() => onDelete(params.row)}>
//                   <DeleteIcon fontSize="inherit" />
//                 </IconButton>
//               )}
//             </Box>
//           ),
//         }
//       : null;

//   // ── Columnas finales ──────────────────────────────────────────────────
//   const finalColumns = [
//     ...(selectionEnabled ? [checkboxColumn] : []),
//     ...columns,
//     ...(actionColumn ? [actionColumn] : []),
//   ];

//   return (
//     <div style={{ height: "auto", width: "100%", overflowX: "auto" }}>
//       <DataGrid
//         sx={{
//           "& .MuiDataGrid-cell": { alignContent: "center" },
//           // Header oscuro para que el checkbox blanco se vea bien
//           ...(selectionEnabled && {
//             "& .MuiDataGrid-columnHeaders": {
//               bgcolor: "#1e293b",
//               color: "white",
//             },
//           }),
//           ...sx,
//         }}
//         rows={activeRows}
//         columns={finalColumns}
//         // ── Paginación ────────────────────────────────────────────────
//         // rowCount solo en server-side (en client-side lo maneja MUI solo)
//         {...(serverSide
//           ? { rowCount: serverRowCount, paginationMode: "server" as const }
//           : { paginationMode: "client" as const }
//         )}
//         pageSizeOptions={pageSizeOptions}
//         paginationModel={{ page, pageSize }}
//         onPaginationModelChange={(model: GridPaginationModel) => setPage(model.page)}
//         loading={loading}
//         // ── Selección de MUI X completamente desactivada ──────────────
//         checkboxSelection={false}
//         disableRowSelectionOnClick
//         // ── Edición inline ────────────────────────────────────────────
//         editMode={editMode}
//         onCellEditStop={onCellEditStop}
//         processRowUpdate={processRowUpdate}
//         onProcessRowUpdateError={onProcessRowUpdateError}
//         // ── Estilos por fila ──────────────────────────────────────────
//         getRowClassName={getRowClassName}
//         // ── Toolbar ───────────────────────────────────────────────────
//         slots={
//           showToolbar
//             ? { toolbar: () => <CustomToolbar onSearch={onSearch} /> }
//             : undefined
//         }
//       />
//     </div>
//   );
// } 


"use client";

import { Box, Checkbox, IconButton, TextField, useTheme } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useMemo, useRef, useState } from "react";
import { SxProps, Theme } from "@mui/material";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type Props = {
  // Datos
  columns: GridColDef[];
  localRows?: any[];
  serverSide?: boolean;
  fetchData?: (
    page: number,
    pageSize: number,
    search: string
  ) => Promise<{ rows: any[]; total: number }>;

  // Búsqueda
  search: string;
  onSearch: (value: string) => void;
  showToolbar?: boolean;

  // Paginación
  pageSize?: number;
  reloadTrigger?: number;

  // Acciones de fila
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onView?: (row: any) => void;

  // ── Selección manual (reemplaza checkboxSelection de MUI) ────────────
  // En lugar de usar el sistema interno de MUI X (que crashea con
  // rowSelectionModel pre-poblado), manejamos la selección desde afuera
  // con una columna Checkbox custom. El DataGrid nunca sabe de la selección.
  selectionEnabled?: boolean;               // muestra columna de checkboxes
  selectedIds?: Set<number | string>;        // IDs seleccionados (controlado por el padre)
  onSelectionChange?: (id: number | string, checked: boolean) => void;
  onSelectAll?: (checked: boolean, visibleIds: (number | string)[]) => void;

  // Edición inline
  editMode?: "row" | "cell";
  onCellEditStop?: (params: any, event: any) => void;
  processRowUpdate?: (newRow: any, oldRow?: any) => any;
  onProcessRowUpdateError?: (error: any) => void;

  // Estilo
  sx?: SxProps<Theme>;
  getRowClassName?: (params: any) => string;
};

// ─── Toolbar interno ──────────────────────────────────────────────────────────

function CustomToolbar({ onSearch }: { onSearch: (value: string) => void }) {
  return (
    <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end", gap: 2 }}>
      <TextField
        size="small"
        placeholder="Buscar..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </Box>
  );
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function CustomDataGrid({
  columns,
  onEdit,
  onDelete,
  onView,
  fetchData,
  localRows = [],
  serverSide = true,
  pageSize = 10,
  onSearch,
  reloadTrigger = 0,
  search,
  sx,
  editMode = "cell",
  onCellEditStop,
  processRowUpdate,
  onProcessRowUpdateError,
  showToolbar = true,
  // Selección manual
  selectionEnabled = false,
  selectedIds,
  onSelectionChange,
  onSelectAll,
  getRowClassName,
}: Props) {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [serverRows, setServerRows] = useState<any[]>([]);
  const [serverRowCount, setServerRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const pageSizeOptions = useMemo(() => [pageSize], [pageSize]);

  // ── Client-side: useMemo directo, sin useState ────────────────────────
  const clientRows = useMemo(() => {
    if (serverSide) return [];
    if (!search.trim()) return localRows;
    const q = search.toLowerCase();
    return localRows.filter((row) =>
      Object.values(row).join(" ").toLowerCase().includes(q)
    );
  }, [serverSide, localRows, search]);

  const activeRows = serverSide ? serverRows : clientRows;

  // ── Server-side ───────────────────────────────────────────────────────
  // Cuando reloadTrigger cambia (tipo/búsqueda desde el padre), reseteamos
  // la página interna a 0 para que el fetch pida siempre desde el inicio.
  const prevReloadRef = useRef(reloadTrigger);
  useEffect(() => {
    if (!serverSide || !fetchData) return;
    let pageToFetch = page;
    if (prevReloadRef.current !== reloadTrigger) {
      prevReloadRef.current = reloadTrigger;
      pageToFetch = 0;
      setPage(0);
    }
    setLoading(true);
    fetchData(pageToFetch, pageSize, search)
      .then((data) => {
        setServerRows(data.rows);
        setServerRowCount(data.total);
      })
      .finally(() => setLoading(false));
  }, [page, pageSize, search, serverSide, reloadTrigger]);

  // ── Columna checkbox manual ───────────────────────────────────────────
  // Se inyecta como primera columna cuando selectionEnabled=true.
  // Usa Checkbox de MUI normal, NO el sistema interno de MUI X.
  // Así el DataGrid es completamente agnóstico a la selección.
  const visibleIds = activeRows.map((r) => r.id);
  const allSelected =
    visibleIds.length > 0 &&
    selectedIds !== undefined &&
    visibleIds.every((id) => selectedIds.has(id));
  const someSelected =
    selectedIds !== undefined &&
    visibleIds.some((id) => selectedIds.has(id)) &&
    !allSelected;

  const checkboxColumn: GridColDef = {
    field: "__selection__",
    headerName: "",
    width: 52,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    // Header: checkbox "seleccionar todos"
    renderHeader: () => (
      <Checkbox
        size="small"
        checked={allSelected}
        indeterminate={someSelected}
        onChange={(e) => onSelectAll?.(e.target.checked, visibleIds)}
        sx={{
          color: "rgba(255,255,255,0.7)",
          "&.Mui-checked":        { color: "white" },
          "&.MuiCheckbox-indeterminate": { color: "rgba(255,255,255,0.7)" },
        }}
      />
    ),
    renderCell: (params) => (
      <Checkbox
        size="small"
        checked={selectedIds?.has(params.row.id) ?? false}
        onChange={(e) => onSelectionChange?.(params.row.id, e.target.checked)}
        onClick={(e) => e.stopPropagation()}
        sx={{
          color: theme.palette.text.disabled,
          "&.Mui-checked": { color: theme.palette.primary.main },
        }}
      />
    ),
  };

  // ── Columna de acciones ───────────────────────────────────────────────
  const actionColumn: GridColDef | null =
    onEdit || onDelete || onView
      ? {
          field: "actions",
          headerName: "Acciones",
          sortable: false,
          filterable: false,
          disableColumnMenu: true,
          align: "center",
          headerAlign: "center",
          width: 150,
          renderCell: (params) => (
            <Box>
              {onView && (
                <IconButton color="info" size="small" onClick={() => onView(params.row)}>
                  <VisibilityIcon fontSize="inherit" />
                </IconButton>
              )}
              {onEdit && (
                <IconButton color="primary" size="small" onClick={() => onEdit(params.row)}>
                  <EditIcon fontSize="inherit" />
                </IconButton>
              )}
              {onDelete && (
                <IconButton color="error" size="small" onClick={() => onDelete(params.row)}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              )}
            </Box>
          ),
        }
      : null;

  // ── Columnas finales ──────────────────────────────────────────────────
  const finalColumns = [
    ...(selectionEnabled ? [checkboxColumn] : []),
    ...columns,
    ...(actionColumn ? [actionColumn] : []),
  ];

  return (
    <div style={{ height: "auto", width: "100%", overflowX: "auto" }}>
      <DataGrid
        sx={{
                        borderRadius:4,
         
          "& .MuiDataGrid-cell": { alignContent: "center" },
          // Header oscuro para que el checkbox blanco se vea bien
          ...(selectionEnabled && {
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "black",
              color: "white",
            },
          }),
          ...sx,
        }}
        rows={activeRows}
        columns={finalColumns}
        // ── Paginación ────────────────────────────────────────────────
        // rowCount solo en server-side (en client-side lo maneja MUI solo)
        {...(serverSide
          ? { rowCount: serverRowCount, paginationMode: "server" as const }
          : { paginationMode: "client" as const }
        )}
        pageSizeOptions={pageSizeOptions}
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={(model: GridPaginationModel) => setPage(model.page)}
        loading={loading}
        // ── Selección de MUI X completamente desactivada ──────────────
        checkboxSelection={false}
        disableRowSelectionOnClick
        // ── Edición inline ────────────────────────────────────────────
        editMode={editMode}
        onCellEditStop={onCellEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={onProcessRowUpdateError}
        // ── Estilos por fila ──────────────────────────────────────────
        getRowClassName={getRowClassName}
        // ── Toolbar ───────────────────────────────────────────────────
        slots={
          showToolbar
            ? { toolbar: () => <CustomToolbar onSearch={onSearch} /> }
            : undefined
        }
      />
    </div>
  );
}