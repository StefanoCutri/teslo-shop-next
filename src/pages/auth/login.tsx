import { useState, useContext } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ErrorOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { AuthLayout } from "@/components/layouts";
import { AuthContext } from "@/context";
import { isEmail } from "@/utils";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const router = useRouter();
  const [showError, setShowError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLogginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    setIsButtonDisabled(true);

    const isValidLogin = await loginUser(email, password);
    console.log(isValidLogin);

    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setIsButtonDisabled(false);
      }, 3000);

      return;
    }

    const destination = router.query.p?.toString() || "/";

    router.replace(destination);
    console.log('done', destination);
    
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onLogginUser)}>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Log in
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
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
                label="No user with that credentials"
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
                Log in
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={
                  router.query.p
                    ? `/auth/register?p=${router.query.p}`
                    : "/auth/register"
                }
                passHref
                legacyBehavior
              >
                <Link underline="always">Don't have an account?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
