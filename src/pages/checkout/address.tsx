import { useRouter } from "next/router";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

import ShopLayout from "@/components/layouts/ShopLayout";
import { countries } from "../../utils/countries";


type FormData = {
  firstName: string;
  secondName: string;
  address1: string;
  address2: string;
  zipCode: string;
  city: string;
  country: string;
  phone: string;
};

const getAdressFromCookies = () : FormData => {
  return{
    firstName: Cookies.get("firstName") || '',
    secondName: Cookies.get("secondName") || '',
    address1: Cookies.get("address1") || '',
    address2: Cookies.get("address2") || '',
    zipCode: Cookies.get("zipCode") || '',
    city: Cookies.get("city") || '',
    country: Cookies.get("country") || '',
    phone: Cookies.get("phone") || '',
  }
}

const AddressPage = () => {
  const router = useRouter();
  const { register,handleSubmit,formState: { errors },} = useForm<FormData>({
    defaultValues: getAdressFromCookies(),
  });

  const onOrderSent = async (data: FormData) => {
    console.log("sent");
    Cookies.set("firstName", data.firstName);
    Cookies.set("secondName", data.secondName);
    Cookies.set("address1", data.address1);
    Cookies.set("address2", data.address2);
    Cookies.set("zipCode", data.zipCode);
    Cookies.set("city", data.city);
    Cookies.set("country", data.country);
    Cookies.set("phone", data.phone);

    router.replace('/checkout/summary')
  };

  return (
    <ShopLayout title="Address " pageDescription="Confirm destination address">
      <Typography variant="h1" component="h1">
        Address
      </Typography>
      <form onSubmit={handleSubmit(onOrderSent)}>
        <Box>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                variant="filled"
                fullWidth
                {...register("firstName", {
                  required: "This field is required",
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Surname"
                variant="filled"
                fullWidth
                {...register("secondName", {
                  required: "This field is required",
                })}
                error={!!errors.secondName}
                helperText={errors.secondName?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                variant="filled"
                fullWidth
                {...register("address1", {
                  required: "This field is required",
                })}
                error={!!errors.address1}
                helperText={errors.address1?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Address 2 (optional)"
                variant="filled"
                fullWidth
                {...register("address2", {})}
                error={!!errors.address2}
                helperText={errors.address2?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Zip code"
                variant="filled"
                fullWidth
                {...register("zipCode", {
                  required: "This field is required",
                })}
                error={!!errors.zipCode}
                helperText={errors.zipCode?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                variant="filled"
                fullWidth
                {...register("city", {
                  required: "This field is required",
                })}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  select
                  variant="filled"
                  label="Country"
                  defaultValue={countries[0].code}
                  {...register("country", {
                    required: "This field is required",
                  })}
                  error={!!errors.country}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.name} value={country.code}>
                      {country.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                variant="filled"
                fullWidth
                {...register("phone", {
                  required: "This field is required",
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            type="submit"
            color="secondary"
            className="circular-btn"
            size="large"
          >
            Review order
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

export default AddressPage;
