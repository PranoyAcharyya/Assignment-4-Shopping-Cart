import { AppBar, Toolbar, Typography, Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

const Navbar = () => {
  const cartContext = useContext(CartContext);

  const totalQty = cartContext
    ? cartContext.cart.cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;


  


  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">My Store</Typography>

        <IconButton color="inherit">
          <Badge badgeContent={totalQty} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
