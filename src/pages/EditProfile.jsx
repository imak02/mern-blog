import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Fab,
  Grid,
  Input,
  Paper,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogLoader from "../components/BlogLoader";
import ErrorPage from "./ErrorPage";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Add, AddCircle } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContextProvider";

const nameRegex = /^[a-zA-Z-' ]+$/;
const userNameRegex = /^[a-z0-9_-]{3,15}$/;
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
});

const EditProfile = () => {
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const userId = params.userId;

  useEffect(() => {
    if (userId) {
      const getUser = async () => {
        try {
          setLoading(true);
          setError(null);
          const response = await axios.get(`/user/${userId}`);
          setUserData(response?.data?.data);
          auth.setUser(response?.data?.data);
          const imageURL = `${axios.defaults.baseURL}${response?.data?.data?.profilePic}`;
          setProfilePic(imageURL);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setError(error);
          console.log(error);
        }
      };
      getUser();
    }
  }, [userId]);

  const formik = useFormik({
    initialValues: {
      fullName: userData.name ?? "",
      userName: userData.userName ?? "",
      email: userData.email ?? "",
      bio: userData.bio ?? "",
      profilePic: userData.profilePic ?? "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,

    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.set("name", values.fullName);
      formData.set("userName", values.userName);
      formData.set("email", values.email);
      formData.set("bio", values.bio);
      formData.set("profilePic", values.profilePic);
      try {
        const response = await axios({
          method: "post",
          url: `/user/update/${userId}`,
          data: formData,
        });

        console.log(response);
        if (response) {
          resetForm();
          navigate("/profile");
        }
      } catch (error) {
        setError(error);
        console.log(error);
      }
    },
  });

  if (loading) return <BlogLoader />;

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // minHeight: "100vh",
      }}
    >
      <Paper
        sx={{
          backgroundColor: "background.default",
          width: { xs: "100%", md: "80%", lg: "50%" },
          padding: 2,
          marginTop: 2,
        }}
      >
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Badge overlap="circular">
            <Avatar
              alt={userData.name}
              src={profilePic}
              sx={{
                width: 200,
                height: 200,
                marginBottom: 3,
              }}
            />
            <Fab
              component="label"
              variant="string"
              size="large"
              color="success"
              aria-label="upload picture"
            >
              <Add />

              <Input
                fullWidth
                id="profilePic"
                name="profilePic"
                type="file"
                onChange={(event) => {
                  formik.setFieldValue(
                    "profilePic",
                    event.currentTarget.files[0]
                  );
                  setProfilePic(URL.createObjectURL(event.target.files[0]));
                }}
                error={
                  formik.touched.profilePic && Boolean(formik.errors.profilePic)
                }
                sx={{ mb: 2, display: "none" }}
              />
            </Fab>
          </Badge>

          <TextField
            fullWidth
            size="medium"
            id="fullName"
            name="fullName"
            color="focusInput"
            autoComplete="off"
            label="Full Name"
            value={formik.values.fullName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
            sx={{
              marginBottom: 2,
            }}
          />

          <TextField
            fullWidth
            size="medium"
            id="userName"
            name="userName"
            color="focusInput"
            autoComplete="off"
            label="Username"
            value={formik.values.userName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            size="medium"
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
            size="medium"
            multiline
            rows={3}
            fullWidth
            id="bio"
            type="text"
            name="bio"
            color="focusInput"
            autoComplete="off"
            label="Bio"
            value={formik.values.bio}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.bio && Boolean(formik.errors.bio)}
            helperText={formik.touched.bio && formik.errors.bio}
            sx={{ marginBottom: 2 }}
          />

          {error && (
            <Alert severity="error">
              Error — <strong>{error?.response?.data?.message}</strong>
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            color="info"
            sx={{ alignSelf: "flex-end" }}
          >
            {formik.isSubmitting ? "Updating..." : "Update"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditProfile;
