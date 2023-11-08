import React from "react";
import { Typography, Grid, Chip, Link } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import ShopLayout from "@/components/layouts/ShopLayout";
import NextLink from "next/link";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "Complete name", width: 300 },
  {
    field: "paid",
    headerName: "Paid",
    description: "Show information if order is paid or not",
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Paid" variant="outlined" />
      ) : (
        <Chip color="error" label="Unpaid" variant="outlined" />
      );
    },
  },
  {
    field: "order",
    headerName: "No. order",
    description: "Go to order details",
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`}>
          <Link>Go to order</Link>
        </NextLink>
      );
    },
  },
];

const rows: GridRowsProp = [
  { id: 1, paid: true, fullname: "Stefano Cutri" },
  { id: 2, paid: true, fullname: "Tayra Cutri" },
  { id: 3, paid: false, fullname: "Daniela Stecco" },
  { id: 4, paid: true, fullname: "Osvaldo Cutri" },
  { id: 5, paid: false, fullname: "Axel Cutri" },
];
const HistoryPage = () => {
  return (
    <ShopLayout title="Orders history" pageDescription="Orders History">
      <Typography variant="h1" component="h1">
        Orders history
      </Typography>
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            columns={columns}
            rows={rows}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            autoHeight
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
