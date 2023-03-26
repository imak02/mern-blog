import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {
  Autocomplete,
  Card,
  CardMedia,
  Container,
  Fab,
  Input,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CreateBlog.scss";

const tagOptions = [
  "Love",
  "Article",
  "Poem",
  "Technology",
  "Story",
  "Fiction",
  "News",
  "Comedy",
  // { title: "The Shawshank Redemption", year: 1994 },
  // { title: "The Godfather", year: 1972 },
  // { title: "The Godfather: Part II", year: 1974 },
  // { title: "The Dark Knight", year: 2008 },
  // { title: "12 Angry Men", year: 1957 },
  // { title: "Schindler's List", year: 1993 },
  // { title: "Pulp Fiction", year: 1994 },
];

const FILE_SIZE = 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const validationSchema = Yup.object({
  title: Yup.string("Enter title for the blog.").required("Title is required"),

  image: Yup.mixed()
    .required("Image is required")
    .test(
      "fileSize",
      "File size is limited to 1 Mb",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  description: Yup.string("Enter description for the blog.").required(
    "Description is required"
  ),
  content: Yup.string("Enter content for the blog.").required(
    "Content is required"
  ),
});

export default function CreateBlog() {
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);

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
      tags: [],
      description: "",
      content: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.set("title", values.title);
      formData.set("image", values.image);
      formData.set("tags", values.tags);
      formData.set("description", values.description);
      formData.set("content", values.content);

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
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
    if (!formik.touched.content) {
      formik.setFieldTouched("content", true);
    }
  };

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
        <Paper elevation={2} square sx={{ my: 2, py: 2, height: "100%" }}>
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
                sx={{ mb: 1 }}
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

              {formik.touched.image && formik.errors.image && (
                <Typography
                  color="error"
                  variant="body2"
                  component="p"
                  sx={{ mb: 2, ml: 2, fontSize: 12 }}
                >
                  {formik.errors.image}
                </Typography>
              )}

              {image && (
                <Card
                  sx={{
                    maxWidth: { xs: 350, md: 500 },
                    mb: 2,
                    alignSelf: "center",
                  }}
                >
                  <CardMedia component="img" src={image} title="Uploads" />
                </Card>
              )}

              <TextField
                fullWidth
                id="title"
                name="title"
                color="focusInput"
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

              <Autocomplete
                color="focusInput"
                name="tags"
                multiple
                options={tagOptions}
                filterSelectedOptions
                value={formik.values.tags}
                onChange={(e, value) => {
                  formik.setFieldValue("tags", value);
                }}
                fullWidth
                sx={{ mb: 2 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="tags"
                    id="tags"
                    label="Tags"
                    color="focusInput"
                    onBlur={formik.handleBlur}
                  />
                )}
              />

              <ReactQuill
                theme="snow"
                modules={{
                  toolbar: {
                    container: toolbarOptions,
                  },
                }}
                name="content"
                placeholder="Enter your content here..."
                value={formik.values.content}
                onChange={(e) => formik.setFieldValue("content", e)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />

              {/* <ReactQuill
                theme="snow"
                modules={{
                  toolbar: {
                    container: toolbarOptions,
                  },
                }}
                placeholder="Enter your content here..."
                value={value}
                onChange={setValue}
              /> */}

              {formik.touched.content && formik.errors.content && (
                <Typography
                  color="error"
                  variant="body2"
                  component="p"
                  sx={{ mb: 2, ml: 2, fontSize: 12 }}
                >
                  {formik.errors.content}
                </Typography>
              )}

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
