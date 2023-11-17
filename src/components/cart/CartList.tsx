import { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import ItemCounter from "../ui/ItemCounter";
import { CartContext } from "@/context";
import { ICartProduct } from "@/interfaces";

interface Props {
  editable?: boolean;
}

const CartList = ({ editable = false }: Props) => {
  const { cart, updateCartQuantity, removeProductFromCart } = useContext(CartContext);

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const changeCartQuantity = (product: ICartProduct, newValue: number) => {
    product.quantity = newValue;
    updateCartQuantity(product);
  };

  return (
    <>
      {hasMounted &&
        cart.map((product) => (
          <Grid
            container
            spacing={2}
            key={product.slug + product.size}
            sx={{ mb: 1 }}
          >
            <Grid item xs={3}>
              <NextLink
                href={`/product/${product.slug}`}
                passHref
                legacyBehavior
              >
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`/products/${product.image}`}
                      component="img"
                      sx={{ borderRadius: "5px" }}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={7}>
              <Box display="flex" flexDirection="column">
                <Typography variant="body1">{product.title}</Typography>
                <Typography variant="body1">
                  Size: <strong>{product.size}</strong>
                </Typography>

                {/* Conditionally */}
                {editable ? (
                  <ItemCounter
                    currentValue={product.quantity}
                    maxValue={10}
                    updateQuantity={(value) => changeCartQuantity(product, value)}
                  />
                ) : (
                  <Typography variant="body1">
                    {product.quantity}
                    {product.quantity > 1 ? "products" : "product"}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="subtitle1">{`$${product.price}`}</Typography>

              {editable && (
                <Button variant="text" color="secondary" onClick={() => removeProductFromCart(product)}>
                  Remove
                </Button>
              )}
            </Grid>
          </Grid>
          // <Typography key={product.slug}>{product.title}</Typography>
        ))}
    </>
  );
};

export default CartList;
