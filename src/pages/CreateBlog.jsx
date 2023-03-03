import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Chip, Container, Divider, Input } from "@mui/material";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContextProvider";

export default function CreateBlog() {
  // console.log(auth);

  const formik = useFormik({
    initialValues: {
      title: "",
      image: "",
      description: "",
    },

    // onSubmit: async (values, { resetForm }) => {
    //   try {
    //     const response = await axios({
    //       method: "post",
    //       url: "/blog/new",
    //       data: values,
    //     });

    //     if (response) {
    //       auth.login(response.data.data.token);
    //       resetForm();
    //       navigate("/");
    //     }

    //     console.log(response);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
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
          {/* <Grid
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
          /> */}
          <Grid
            item
            // xs={12}
            // sm={12}
            // md={6}
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
              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ mt: 1, width: "100%" }}
              >
                <Button variant="contained" component="label">
                  Upload Image
                  <input type="file" hidden />
                </Button>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  color="primary"
                  autoComplete="off"
                  label="Title"
                  value={formik.values.title}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                  sx={{ marginY: 2 }}
                />
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  color="focusInput"
                  type="text"
                  variant="outlined"
                  value={formik.values.description}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  // disabled={isLoading}
                >
                  {formik.isSubmitting ? "Signing In..." : "Sign In"}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
