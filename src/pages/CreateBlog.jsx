import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Chip, Container, Divider, Fab, Input } from "@mui/material";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Add, Google, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContextProvider";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CreateBlog.scss";

export default function CreateBlog() {
  const [value, setValue] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  var toolbarOptions = [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: ["", "center", "justify"] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ];

  const formik = useFormik({
    initialValues: {
      title: "",
      image: null,
      description: "",
      content: "",
    },

    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.set("title", values.title);
      formData.set("image", values.image);
      formData.set("description", values.description);
      formData.set("content", value);

      try {
        const response = await axios({
          method: "post",
          url: "/blog/new",
          data: formData,
        });

        if (response) {
          resetForm();
          navigate("/");
        }

        console.log(response);
      } catch (error) {
        console.log(error);
      }
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
        <Paper elevation={2} square sx={{ my: 2, p: 2, height: "100%" }}>
          <Box
            sx={{
              my: 3,
              mx: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{
                mt: 1,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Fab
                color="success"
                aria-label="add"
                variant="extended"
                component="label"
                sx={{ mb: 2 }}
              >
                <Add sx={{ mr: 1 }} />
                Upload Image
                <Input
                  fullWidth
                  id="image"
                  name="image"
                  type="file"
                  onChange={(event) => {
                    formik.setFieldValue("image", event.currentTarget.files[0]);
                    setImage(URL.createObjectURL(event.target.files[0]));
                  }}
                  error={formik.touched.image && Boolean(formik.errors.image)}
                  sx={{ mb: 2, display: "none" }}
                />
                {/* <input
                  name="image"
                  type="file"
                  onChange={(event) => {
                    formik.setFieldValue("image", event.currentTarget.files[0]);
                    setImage(event.target.files[0]);
                  }}
                  hidden
                /> */}
              </Fab>

              {image && (
                <Box
                  component="img"
                  src={image}
                  sx={{
                    height: "300px",
                    width: "500px",
                    objectFit: "cover",
                    margin: 2,
                    alignSelf: "center",
                  }}
                />
              )}

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
                sx={{ mb: 2 }}
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
                sx={{ mb: 2 }}
              />

              <ReactQuill
                theme="snow"
                modules={{
                  toolbar: {
                    container: toolbarOptions,
                  },
                }}
                value={value}
                onChange={setValue}
                placeholder="Content..."
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  alignSelf: "flex-end",
                }}
                // disabled={isLoading}
              >
                {formik.isSubmitting ? "Posting..." : "Post"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
