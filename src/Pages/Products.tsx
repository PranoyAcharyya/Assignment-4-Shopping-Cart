import { useContext, useEffect, useState } from "react";
import API from "../APi/axiosinstance";
import { endpoints } from "../APi/apiendpoint";
import { CartContext } from "../Context/CartContext";
import type { Product } from "../types/product.type";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";
import { toast } from "sonner";

const Products = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const cartContext = useContext(CartContext);

  const Productfetch = async () => {
    setLoading(true);
    try {
      const res = await API.get<Product[]>(endpoints.products);
      setProductList(res.data);
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    Productfetch();
  }, []);


  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }



  return (
    <Container sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {productList.map((product) => (
          <Card key={product.id} sx={{ width: 260 }}>
            <CardMedia
              component="img"
              height="180"
              image={product.image}
              alt={product.title}
              sx={{ objectFit: "contain", p: 2 }}
            />

            <CardContent>
              <Typography variant="subtitle1" fontWeight={600}>
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
                  toast("Product added");
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
