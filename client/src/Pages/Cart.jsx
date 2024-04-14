import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import BookIcon from "@mui/icons-material/Book";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../Api/config/axios";

export default function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      await api.request({
        url: "/cart/checkout",
        method: "POST",
        data: { cart },
      });
      navigate("/success");
      setCart([]);
    } catch (err) {
      navigate("/failed");
    }
  };

  const getTotal = () => {
    let total = 0;
    cart.forEach((c) => (total += c.cost));
    return total;
  };
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        textAlign: "center",
        pl: 3,
        pr: 3,
      }}
    >
      <h3>Cart</h3>
      <List>
        {cart.map((item, index) => (
          <Box key={item.bookId + index}>
            <ListItem
              secondaryAction={<p>{`$ ${item.cost}`}</p>}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </Box>
        ))}
        <ListItem secondaryAction={<p>{`$ ${getTotal()}`}</p>} disablePadding>
          <ListItemButton>
            <ListItemText primary={"Total"} />
          </ListItemButton>
        </ListItem>
      </List>
      {cart.length > 0 && (
        <Button sx={{ mt: 2 }} variant="contained" onClick={handleCheckout}>
          Checkout
        </Button>
      )}
      {cart.length === 0 && (
        <>
          <Typography>
            You don't have anything in your cart right now!
          </Typography>
          <Typography>
            Continue shooping by clicking Add to Cart from dashboard page
          </Typography>
        </>
      )}
    </Box>
  );
}
