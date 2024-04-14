import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material";
import { api } from "../Api/config/axios";
import Cookies from "js-cookie";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  root: {
    "& .MuiDataGrid-renderingZone": {
      maxHeight: "none !important",
    },
    "& .MuiDataGrid-cell": {
      lineHeight: "unset !important",
      maxHeight: "none !important",
      whiteSpace: "normal",
    },
    "& .MuiDataGrid-row": {
      maxHeight: "none !important",
    },
    height: "70vh",
  },
}));

function createRows(books, inventory) {
  const rows = [];
  books.forEach((book, i) => {
    const inv = inventory.find((inve) => inve.book_id === book.book_id);

    rows.push({
      id: book.book_id,
      title: book.title,
      cost: inv?.cost || 0,
      quantity: inv?.quantity || 0,
    });
  });

  return rows;
}

const bookColumns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "title", headerName: "Title", flex: 1 },
  { field: "cost", headerName: "Cost", editable: true, flex: 1 },
  { field: "quantity", headerName: "Quantity", editable: true, flex: 1 },
];

export default function AdminBooksGrid({ books, inventory, fetchInventory }) {
  const bookRows = createRows(books, inventory);
  const accessToken = Cookies.get("accessToken");
  const updateInventory = async (newRow) => {
    try {
      const data = {
        book_id: newRow.id,
        cost: Number(newRow.cost),
        quantity: Number(newRow.quantity),
      };
      const response = await api.request({
        url: "/inventory",
        method: "PUT",
        headers: { Authorization: `Bearer ${accessToken}` },
        data: data,
      });
      console.log(response);
      if (response.status === 200) {
        alert("Inventory Updated Successfully");
        fetchInventory();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <StyledDataGrid
        rows={bookRows}
        columns={bookColumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        processRowUpdate={(newRow, oldRow) => {
          updateInventory(newRow);
          console.log(newRow, oldRow, "Hi");
          return newRow;
        }}
        onProcessRowUpdateError={(error) => console.log(error)}
      />
    </Box>
  );
}
