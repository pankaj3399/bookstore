import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  Box,
  Button,
} from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { api } from "../../Api/config/axios";

const SalesTracking = () => {
  const accessToken = Cookies.get("accessToken");
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    try {
      const response = await api.request({
        url: "/sales",
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setSales(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchSales();
    } else {
      navigate("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const consolidatedData = sales.reduce((acc, curr) => {
    const existingBook = acc.find(
      (item) => item.book_title === curr.book_title
    );
    if (existingBook) {
      existingBook.quantity += curr.quantity;
      existingBook.cost += curr.cost;
    } else {
      acc.push({ ...curr });
    }
    return acc;
  }, []);

  // Calculate total sales
  const totalSales = consolidatedData.reduce(
    (total, item) => total + item.cost,
    0
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Book Title</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consolidatedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.book_title}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">${row.cost.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TableCell colSpan={2} align="right">
                Total Sales:
              </TableCell>
              <TableCell align="right">${totalSales.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={consolidatedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Button variant="contained" onClick={() => navigate("/admin/books")}>
          Visit Inventory
        </Button>
      </Box>
    </div>
  );
};

export default SalesTracking;
