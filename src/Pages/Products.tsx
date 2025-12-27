import React, { useContext, useEffect, useState } from "react";
import API from "../APi/axiosinstance";
import { endpoints } from "../APi/apiendpoint";
import { CartContext } from "../Context/CartContext";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Container,
} from "@mui/material";
import { toast } from "sonner";

const Products = () => {
  const [productList, setProductList] = useState([]);


  const cartContext = useContext(CartContext);

  const Productfetch = async () => {
    try {
      const res = await API.get(endpoints.products);
      setProductList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Productfetch();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "flex-start",
        }}
      >
        {productList.map((product) => (
          <Card
            key={product.id}
            sx={{
              width: 260,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardMedia
              component="img"
              height="180"
              image={product.image}
              alt={product.title}
              sx={{ objectFit: "contain", p: 2 }}
            />

            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                {product.title}
              </Typography>

              <Typography variant="h6" color="primary">
                ₹ {product.price}
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  if (cartContext) {
                    cartContext.dispatch({
                      type: "ADD_ITEM",
                      payload: {
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                        quantity: 1,
                      },
                    
                    });
                  }
                  toast("product added")
                }}
              >
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Products;
