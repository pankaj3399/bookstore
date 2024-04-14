import React, { useEffect, useState } from "react";
import { api } from "../../Api/config/axios";
import Box from "@mui/material/Box";

import AdminBooksGrid from "../../Components/AdminBooksGrid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function AdminBooks() {
  const accessToken = Cookies.get("accessToken");

  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [inventory, setInventory] = useState([]);
  const fetchBooks = async () => {
    const response = await api.request({
      url: "/book",
      method: "GET",
    });

    setBooks(response.data);
  };
  const fetchInventory = async () => {
    const response = await api.request({
      url: "/inventory",
      method: "GET",
    });

    setInventory(response.data);
  };
  useEffect(() => {
    if (accessToken) {
      fetchBooks();
      fetchInventory();
    } else {
      navigate("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!accessToken) {
    return <p>You are not allowed to access this page!</p>;
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, pl: "24px", pr: "24px" }}>
        {books.length > 0 && inventory.length > 0 && (
          <AdminBooksGrid
            books={books}
            inventory={inventory}
            fetchInventory={fetchInventory}
          />
        )}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button variant="contained" onClick={() => navigate("/admin/sales")}>
            Total Sales
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default AdminBooks;
