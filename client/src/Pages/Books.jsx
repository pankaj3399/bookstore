import React, { useEffect, useState } from "react";
import { api } from "../Api/config/axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100px",
}));

function Books({ cart, setCart }) {
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
    fetchBooks();
    fetchInventory();
  }, []);

  const isBookAdded = (book) => {
    return Boolean(cart.find((c) => c.bookId === book.book_id));
  };

  const findBookIndex = (book) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].bookId === book.book_id) {
        return i;
      }
    }
  };

  const getPrice = (book) => {
    const inv = inventory.find((i) => i.book_id === book.book_id);
    return inv?.cost || 0;
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, pl: "24px", pr: "24px" }}>
        <Grid container spacing={2}>
          {books.map((book, index) => {
            return (
              <Grid key={book.title + index} item xs={12} sm={6} md={4} lg={2}>
                <Item>
                  <p>
                    <b>{book.title}</b>
                  </p>
                  <p>
                    <span>Author - </span>
                    {book.author_fullname}
                  </p>

                  <p>
                    <span>
                      <b>Price - </b>
                    </span>
                    {getPrice(book)}
                  </p>
                  {isBookAdded(book) ? (
                    <Button
                      size="small"
                      onClick={() => {
                        let cartClone = [...cart];
                        let idx = findBookIndex(book);
                        cartClone.splice(idx, 1);
                        setCart(cartClone);
                      }}
                    >
                      Remove from Cart
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      onClick={() => {
                        setCart((cart) => [
                          ...cart,
                          {
                            bookId: book.book_id,
                            author: book.author_fullname,
                            title: book.title,
                            cost: getPrice(book),
                          },
                        ]);
                      }}
                    >
                      Add to Cart
                    </Button>
                  )}
                </Item>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}

export default Books;
