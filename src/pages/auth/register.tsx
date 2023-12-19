import { useState, useContext } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import tesloApi from "@/api/tesloApi";
import { AuthLayout } from "@/components/layouts";
import { isEmail } from "@/utils";
import { ErrorOutline } from "@mui/icons-material";
import { AuthContext } from "@/context";

type FormData = {
  email: string;
  name: string;
  password: string;
};

const RegisterPage = () => {
  const [showError, setShowError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const { registerUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onRegisterUser = async ({ email, password, name }: FormData) => {
    setShowError(false);
    setIsButtonDisabled(true);

    const { hasError, message } = await registerUser(email, name, password);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => {
        setShowError(false);
        setIsButtonDisabled(false);
      }, 3000);

      return;
    }


    const destination = router.query.p?.toString() || '/';

    router.replace(destination);
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onRegisterUser)}>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Register
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "This field is required",
                  validate: isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Full name"
                variant="filled"
                fullWidth
                {...register("name", {
                  required: "This field is required",
                  minLength: { value: 2, message: "2 characters at least" },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="filled"
                fullWidth
                {...register("password", {
                  required: "This field is required",
                  minLength: { value: 6, message: "6 characters at least" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Chip
                label="Something went wrong, try again"
                color="error"
                icon={<ErrorOutline />}
                className="fade-in"
                sx={{ display: showError ? "flex" : "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                type="submit"
                disabled={isButtonDisabled}
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href={router.query.p ? `/auth/login?p=${router.query.p}` : "/auth/login"} passHref>
                <Link underline="always">Already a member?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
