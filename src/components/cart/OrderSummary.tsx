import { useContext } from "react";
import { Grid, Typography } from "@mui/material";

import { CartContext } from "../../context";
import { format } from "../../utils";

const OrderSummary = () => {
  const { numberOfItems, subTotal, tax, total } = useContext(CartContext);

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Products</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {numberOfItems} {numberOfItems > 1 ? "products" : " product"}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{format(subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>
          Taxes: {Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{format(tax)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2 }}>
        <Typography variant="subtitle1">{format(total)}</Typography>
      </Grid>
    </Grid>
  );
};

export default OrderSummary;
