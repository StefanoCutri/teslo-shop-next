import CartList from "../../components/cart/CartList";
import OrderSummary from "../../components/cart/OrderSummary";
import {ShopLayout} from "../../components/layouts";
import { CartContext } from "../../context";
import { countries } from "../../utils";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import React from "react";
import { useContext } from "react";

const SummaryPage = () => {
  const { shippingAddress, numberOfItems } = useContext(CartContext);

  console.log(shippingAddress);

  if (!shippingAddress) {
    return <></>;
  }

  const {
    address1,
    city,
    country,
    firstName,
    phone,
    secondName,
    zipCode,
    address2,
  } = shippingAddress;

  return (
    <ShopLayout title="Order Summary" pageDescription="Order summary">
      <Typography variant="h1" component="h1">
        {" "}
        Order summary
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Summary ({numberOfItems}{" "}
                {numberOfItems === 1 ? "product" : "products"})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <Typography variant="subtitle1">Delivery address</Typography>
              <Typography>
                {firstName} {secondName}
              </Typography>
              <Typography>
                {address1}
                {address2 ? `, ${address2}` : ""}
              </Typography>
              <Typography>
                {city}, {zipCode}
              </Typography>
              <Typography>
                {countries.find((c) => c.code === country)?.name}
              </Typography>
              <Typography>{phone}</Typography>

              <Divider sx={{ my: 1 }} />

              {/* Order Summary */}

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>
              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirm order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
