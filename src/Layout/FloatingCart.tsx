import React, { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import {
  Box,
  Badge,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const FloatingCart = () => {
  const cartContext = useContext(CartContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const totalQty = cartContext
    ? cartContext.cart.cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  const totalPrice = cartContext
    ? cartContext.cart.cartItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      )
    : 0;

  return (
    <>
      {/* Floating Button */}
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <IconButton color="primary" onClick={handleOpen}>
          <Badge badgeContent={totalQty} color="error">
            <ShoppingCartIcon fontSize="large" />
          </Badge>
        </IconButton>
      </Box>

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm" 
      >
        <DialogTitle>Your Cart</DialogTitle>
        <DialogContent dividers>
          {cartContext?.cart.cartItems.length === 0 ? (
            <Typography>No items in cart.</Typography>
          ) : (
            cartContext.cart.cartItems.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                  borderBottom: "1px solid #ddd",
                  pb: 1,
                }}
              >
                <Typography>{item.title}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Button
                    size="small"
                    sx={{border:"1px solid #000" , fontSize:"15px"}}
                    onClick={() =>
                      cartContext.dispatch({
                        type: "DECREASE_QTY",
                        payload: { id: item.id },
                      })
                    }
                  >
                    -
                  </Button>
                  <Typography>{item.quantity}</Typography>
                  <Button
                    size="small"
                    sx={{border:"1px solid #000" , fontSize:"15px"}}
                    onClick={() =>
                      cartContext.dispatch({
                        type: "INCREASE_QTY",
                        payload: { id: item.id },
                      })
                    }
                  >
                    +
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() =>
                      cartContext.dispatch({
                        type: "REMOVE_ITEM",
                        payload: { id: item.id },
                      })
                    }
                  >
                    x
                  </Button>
                </Box>
              </Box>
            ))
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", px: 3 }}>
          <Typography variant="h6">Total: ₹ {totalPrice}</Typography>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FloatingCart;
