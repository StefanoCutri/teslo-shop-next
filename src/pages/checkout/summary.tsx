import CartList from "@/components/cart/CartList";
import OrderSummary from "@/components/cart/OrderSummary";
import ShopLayout from "@/components/layouts/ShopLayout";
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

const SummaryPage = () => {
  return (
    <ShopLayout title="Order Sumarry" pageDescription="Order summary">
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
              <Typography variant="h2">Summary (3 products)</Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/checkout/address" passHref legacyBehavior>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <Typography variant="subtitle1">Delivery address</Typography>
              <Typography>Stefano Cutri</Typography>
              <Typography>322 Address</Typography>
              <Typography>Buenos Aires, 1702</Typography>
              <Typography>Argentina</Typography>
              <Typography>+54 12123131</Typography>

              <Divider sx={{ my: 1 }} />

              {/* Order Summary */}

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref legacyBehavior>
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
