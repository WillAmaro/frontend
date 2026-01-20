"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import CustomDataGrid from "../../base/CustomDataGrid";

const rows = [
  { id: 1, username: "@MUI", age: 38, desk: "D-546" },
  { id: 2, username: "@MUI-X", age: 25, desk: "D-042" },
  { id: 3, username: "@MUI-X-1", age: 26, desk: "D-043" },
  { id: 4, username: "@MUI-X-2", age: 33, desk: "D-044" },
  { id: 5, username: "@MUI-X-3", age: 45, desk: "D-045" },
  { id: 6, username: "@MUI-X-4", age: 65, desk: "D-046" },
];

const columns: GridColDef[] = [
  { field: "username", headerName: "Usuario", flex: 1 },
  { field: "age", headerName: "Edad", flex: 1 },
  { field: "desk", headerName: "Escritorio", flex: 1 },
];

export default function HomePage() {
  const handleEdit = (row: any) => {
    console.log("Editar:", row);
  };

  const handleDelete = (row: any) => {
    console.log("Borrar:", row);
  };

  // return (
  //   <CustomDataGrid
  //     // rows={rows}
  //     columns={columns}
  //     onEdit={handleEdit}
  //     onDelete={handleDelete}
  //     pageSize={3}
  //     checkboxSelection
  //     fetchData={function (
  //       page: number,
  //       pageSize: number
  //     ): Promise<{ rows: any[]; total: number }> {
  //       throw new Error("Function not implemented.");
  //     }}
  //   />
  // );

   return <></>
}