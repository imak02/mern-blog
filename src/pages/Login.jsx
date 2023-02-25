import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Chip, Container, Divider } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  user: Yup.string("Enter your email")
    .min(2, "Username should be of minimum 2 characters length")
    .required("Username/Email is required"),
  password: Yup.string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      user: "",
      password: "",
      remember: false,
    },
    validationSchema: validationSchema,

    onSubmit: async (values, { resetForm }) => {
      console.log(values);
    },
  });

  return (
    <Box
      sx={{
        backgroundColor: (t) =>
          t.palette.mode === "light"
            ? t.palette.secondary.main
            : t.palette.grey[700],
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
        <Grid
          container
          component="main"
          sx={{
            borderRight: "3px solid red",
            borderBottom: "3px solid red",
          }}
        >
          <Grid
            item
            xs={false}
            sm={false}
            md={6}
            sx={{
              backgroundImage: (t) =>
                t.palette.mode === "light"
                  ? "url(https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=1600)"
                  : "url(https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=1600)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "start",
            }}
          />
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            component={Paper}
            elevation={0}
            square
            sx={{ my: { xs: 2, md: 0 }, height: "100%" }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "green" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>

              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ mt: 1, width: "100%" }}
              >
                <TextField
                  fullWidth
                  id="user"
                  name="user"
                  color="focusInput"
                  autoComplete="off"
                  label="Username/Email"
                  value={formik.values.user}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.user && Boolean(formik.errors.user)}
                  helperText={formik.touched.user && formik.errors.user}
                  sx={{ marginY: 2 }}
                />

                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  color="focusInput"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Grid item xs>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="remember"
                        id="remember"
                        name="remember"
                        checked={formik.values.remember}
                        onChange={formik.handleChange}
                        color="primary"
                      />
                    }
                    label="Remember me"
                  />
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  // disabled={isLoading}
                >
                  {formik.isSubmitting ? "Signing In..." : "Sign In"}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/">Forgot password?</Link>
                  </Grid>
                  <Grid item>
                    New Here? <Link to="/register">Signup</Link>
                  </Grid>
                </Grid>
                <Divider sx={{ mt: 2 }}>
                  {" "}
                  <Chip label="OR" />
                </Divider>
                <Button
                  type="submit"
                  fullWidth
                  color="secondary"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  <Google sx={{ mr: 1 }} />
                  Sign In with Google
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
