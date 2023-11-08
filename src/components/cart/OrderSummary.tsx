import { Grid, Typography } from "@mui/material";

const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Products</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>3</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`$${155.45}`}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Taxes</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`$${35.15}`}</Typography>
      </Grid>

      <Grid item xs={6} sx={{mt: 2}}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" sx={{mt: 2}}>
        <Typography variant="subtitle1">{`$${175.15}`}</Typography>
      </Grid>
    </Grid>
  );
};

export default OrderSummary;
