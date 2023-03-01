import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import {
  Chip,
  Divider,
  FormControl,
  FormHelperText,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const nameRegex = /^[a-zA-Z-' ]+$/;
const userNameRegex = /^[a-z0-9_-]{3,15}$/;
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(2, "*Name must have at least 2 characters")
    .matches(nameRegex, "*Please enter a valid name")
    .max(100, "*Names can't be longer than 100 characters")
    .required("*Name is required"),
  userName: Yup.string()
    .min(3, "*Username must have 3-15 characters only")
    .max(15, "*Username must have 5-15 characters only")
    .matches(
      userNameRegex,
      "*Can contain any lower case character, digit or special symbol “_-” only"
    )
    .required("*Username is required"),
  email: Yup.string()
    .email("*Must be a valid email address")
    .max(100, "*Email must be less than 100 characters")
    .required("*Email is required"),
  password1: Yup.string()
    .min(8, "*Password must contain minimum of 8 characters")
    .matches(
      passwordRegex,
      "*Must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    )
    .required("*Password required"),
  password2: Yup.string().oneOf(
    [Yup.ref("password1"), null],
    "Both passwords do not match."
  ),

  terms: Yup.bool().required().oneOf([true], "*Terms must be accepted"),
});

const Register = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      userName: "",
      email: "",
      password1: "",
      password2: "",
      terms: false,
    },
    validationSchema: validationSchema,

    // onSubmit: async (values, { resetForm }) => {
    //   console.log(values);
    // },

    onSubmit: async (values, { resetForm }) => {
      try {
        let formContent = Object.assign({}, values);
        delete formContent.terms;
        delete formContent.password2;

        const response = await axios({
          method: "post",
          url: "http://localhost:8000/user/register",
          data: formContent,
        });

        console.log(response);
        if (response) {
          resetForm();
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: (t) =>
          t.palette.mode === "light"
            ? t.palette.secondary.main
            : t.palette.grey[800],
        pt: 4,
        pb: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        component="main"
        sx={{
          width: { md: "80vw" },
          margin: { md: " auto" },
          borderTop: "3px solid red",
          borderLeft: "3px solid red",
        }}
      >
        <Grid
          item
          xs={11}
          sm={10}
          md={10}
          lg={6}
          component={Paper}
          elevation={0}
          square
          sx={{ height: "100%", margin: "0 auto" }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "green" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>

            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                size="small"
                id="fullName"
                name="fullName"
                color="focusInput"
                autoComplete="off"
                label="Full Name"
                value={formik.values.fullName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
                sx={{
                  marginBottom: 2,
                }}
              />

              <TextField
                fullWidth
                size="small"
                id="userName"
                name="userName"
                color="focusInput"
                autoComplete="off"
                label="Username"
                value={formik.values.userName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                  formik.touched.userName && Boolean(formik.errors.userName)
                }
                helperText={formik.touched.userName && formik.errors.userName}
                sx={{ marginBottom: 2 }}
              />

              <TextField
                fullWidth
                size="small"
                id="email"
                type="email"
                name="email"
                color="focusInput"
                autoComplete="off"
                label="Email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ marginBottom: 2 }}
              />

              <TextField
                fullWidth
                size="small"
                id="password1"
                name="password1"
                label="Password"
                color="focusInput"
                type={showPassword1 ? "text" : "password"}
                variant="outlined"
                value={formik.values.password1}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                  formik.touched.password1 && Boolean(formik.errors.password1)
                }
                helperText={formik.touched.password1 && formik.errors.password1}
                sx={{
                  marginBottom: 2,
                  marginRight: { xs: 0, md: "1%" },
                  width: { xs: "100%", md: "49%" },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword1}
                        onMouseDown={handleMouseDownPassword1}
                        edge="end"
                      >
                        {showPassword1 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                size="small"
                id="password2"
                name="password2"
                label="Confirm Password"
                color="focusInput"
                type={showPassword2 ? "text" : "password"}
                variant="outlined"
                value={formik.values.password2}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                  formik.touched.password2 && Boolean(formik.errors.password2)
                }
                helperText={formik.touched.password2 && formik.errors.password2}
                sx={{
                  marginBottom: 2,
                  marginLeft: { xs: 0, md: "1%" },
                  width: { xs: "100%", md: "49%" },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword2}
                        onMouseDown={handleMouseDownPassword2}
                        edge="end"
                      >
                        {showPassword2 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Grid item xs>
                <FormControl
                  error={formik.touched.terms && Boolean(formik.errors.terms)}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="terms"
                        id="terms"
                        value={formik.values.terms}
                        checked={formik.values.terms}
                        onChange={formik.handleChange}
                      />
                    }
                    label={
                      <>
                        <span>I accept the </span>
                        <Link to={"/"}>terms of use</Link>
                        <span> and </span>
                        <Link to={"/"}>privacy policy</Link>
                      </>
                    }
                  />
                  <FormHelperText>
                    {formik.touched.terms && formik.errors.terms}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Registering..." : "Register"}
              </Button>
              <Grid container justifyContent="center">
                <Grid item sx={{ mt: 1.2 }}>
                  Already a user? <Link to="/login">Login</Link>
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
                Sign Up with Google
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={false}
          md={false}
          lg={6}
          sx={{
            backgroundImage: (t) =>
              t.palette.mode === "light"
                ? "url(https://images.pexels.com/photos/136404/pexels-photo-136404.jpeg?auto=compress&cs=tinysrgb&w=1600)"
                : "url(https://images.pexels.com/photos/136404/pexels-photo-136404.jpeg?auto=compress&cs=tinysrgb&w=1600)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "start",
          }}
        />
      </Grid>
    </Box>
  );
};

export default Register;
