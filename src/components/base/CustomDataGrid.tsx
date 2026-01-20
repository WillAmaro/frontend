
"use client";

import { Box, IconButton, TextField, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { esES } from "@mui/x-data-grid/locales";
import { useEffect, useState } from "react";
import { SxProps, Theme } from "@mui/material";

type Props = {
  reloadTrigger?: number;
  columns: GridColDef[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onView?: (row: any) => void;
  checkboxSelection?: boolean;
  fetchData?: (
    page: number,
    pageSize: number,
    search: string
  ) => Promise<{ rows: any[]; total: number }>;
  pageSize?: number;
  localRows?: any[];
  serverSide?: boolean;
  search: string;
  sx?: SxProps<Theme>;
  onSearch: (value: string) => void;
  // Nuevas props para edición inline
  editMode?: "row" | "cell";
  onCellEditStop?: (params: any, event: any) => void;
  processRowUpdate?: (newRow: any, oldRow: any) => any;
  onProcessRowUpdateError?: (error: any) => void;
  // Props adicionales para filtros
  showToolbar?: boolean;
};

type ToolbarProps = {
  onSearch: (value: string) => void;
};

function CustomToolbar({ onSearch }: ToolbarProps) {
  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        justifyContent: "flex-end",
        gap: 2,
      }}
    >
      <TextField
        size="small"
        placeholder="Buscar..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </Box>
  );
}

export default function CustomDataGrid({
  columns,
  onEdit,
  onDelete,
  onView,
  fetchData,
  localRows = [],
  serverSide = true,
  checkboxSelection = false,
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
}: Props) {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Agregar columna solo si hay acciones
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
                <IconButton
                  color="info"
                  size="small"
                  onClick={() => onView(params.row)}
                >
                  <VisibilityIcon fontSize="inherit" />
                </IconButton>
              )}
              {onEdit && (
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => onEdit(params.row)}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
              )}
              {onDelete && (
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => onDelete(params.row)}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              )}
            </Box>
          ),
        }
      : null;

  // Client-side
  useEffect(() => {
    if (!serverSide) {
      const filtered = localRows.filter((row) =>
        Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      );

      setRowCount(filtered.length);

      const start = page * pageSize;
      const end = start + pageSize;
      setRows(filtered);
    }
  }, [page, pageSize, search, serverSide, localRows]);

  // Server-side
  useEffect(() => {
    if (serverSide && fetchData) {
      setLoading(true);
      fetchData(page, pageSize, search).then((data) => {
        setRows(data.rows);
        setRowCount(data.total);
        setLoading(false);
      });
    }
  }, [page, pageSize, search, serverSide, reloadTrigger]);

  return (
    <div style={{ height: "auto", width: "100%", overflowX: "auto" }}>
      <DataGrid
        sx={{
          "& .MuiDataGrid-cell": {
            alignContent: "center",
          },
          ...sx,
        }}
        rows={rows}
        columns={actionColumn ? [...columns, actionColumn] : columns}
        rowCount={serverSide ? rowCount : undefined}
        pageSizeOptions={[pageSize]}
        paginationMode={serverSide ? "server" : "client"}
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={(model) => setPage(model.page)}
        loading={loading}
        disableRowSelectionOnClick
        checkboxSelection={checkboxSelection}
        // Props para edición inline
        editMode={editMode}
        onCellEditStop={onCellEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={onProcessRowUpdateError}
        slots={
          showToolbar
            ? {
                toolbar: () => <CustomToolbar onSearch={onSearch} />,
              }
            : undefined
        }
        slotProps={{
          baseCheckbox: {
            sx: {
              color: theme.palette.text.primary,
              "&.Mui-checked": {
                color: theme.palette.text.primary,
              },
            },
          } as any,
        }}
      />
    </div>
  );
}