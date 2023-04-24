import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import axios from "axios";
import ProfileBlogCard from "../components/ProfileBlogCard";
import BlogLoader from "../components/BlogLoader";
import NoBlogs from "../components/NoBlogs";
import ErrorPage from "./ErrorPage";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Verified,
  VerifiedOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const validationSchema = Yup.object({
  oldP: Yup.string()
    .min(8, "*Password must contain minimum of 8 characters")
    .matches(
      passwordRegex,
      "*Must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    )
    .required("*Password required"),

  newP: Yup.string()
    .min(8, "*Password must contain minimum of 8 characters")
    .matches(
      passwordRegex,
      "*Must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    )
    .required("*Password required"),
});

const ProfileListItem = (props) => {
  return (
    <>
      <ListItem>
        <ListItemText primary={props.primary} secondary={props.secondary} />
      </ListItem>
    </>
  );
};

const Profile = () => {
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [response, setResponse] = useState(null);

  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const sendVerificationEmail = async () => {
    setResponse(null);
    const response = await axios.get("/user/resend-link");
    setResponse(response.data.message);
  };

  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const userId = authCtx.user._id;

  useEffect(() => {
    if (userId) {
      const getUser = async () => {
        try {
          setLoading(true);
          setError(null);
          const response = await axios.get(`/user/${userId}`);
          setUserData(response?.data?.data);
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
      oldP: "",
      newP: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        setPasswordError(null);
        const response = await axios({
          method: "patch",
          url: `/user/changePassword/${user._id}`,
          data: values,
        });

        console.log(response);
        if (response) {
          resetForm();
          setOpenModal(false);
        }
      } catch (error) {
        setPasswordError(error);
        console.log(error);
      }
    },
  });

  if (loading) return <BlogLoader />;
  if (error) return <ErrorPage />;

  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid
          item
          container
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              my: 4,
              width: "95%",
              borderTop: "3px solid red",
              borderLeft: "3px solid red",
            }}
          >
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "flex-end",

                my: 1,
                pr: 4,
              }}
            >
              <Link className="links" to={`/profile/edit/${user._id}`}>
                <Button size="small" variant="outlined" color="info">
                  Edit Profile
                </Button>
              </Link>
            </CardActions>

            <CardMedia sx={{ display: "flex", justifyContent: "center" }}>
              <Avatar
                sx={{ width: 150, height: 150, backgroundColor: "skyblue" }}
                src={`${import.meta.env.VITE_BACKEND_API}${
                  userData?.profilePic
                }`}
              >
                {userData.name}
              </Avatar>
            </CardMedia>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ textAlign: "center" }}
              >
                {userData.name}{" "}
                <Badge>
                  {userData.emailVerified ? (
                    <Verified fontSize="small" />
                  ) : (
                    <VerifiedOutlined fontSize="small" />
                  )}{" "}
                </Badge>
              </Typography>

              {userData?.bio?.length > 0 && (
                <Typography
                  gutterBottom
                  // variant="h5"
                  component="blockquote"
                  sx={{
                    color: "text.secondary",
                    fontStyle: "italic",
                    textAlign: "center",
                    marginTop: 3,
                  }}
                >
                  {`"${userData.bio}"`}
                </Typography>
              )}
              <List sx={{ textAlign: "center" }}>
                <ProfileListItem
                  primary="Username:"
                  secondary={userData.userName}
                />
                <Divider />
                <ProfileListItem primary="Email:" secondary={userData.email} />
                {!userData.emailVerified && (
                  <Box color="red">
                    Verify your email to access all privileges.
                    <Button
                      variant="outlined"
                      color="success"
                      size="small"
                      sx={{ m: 2 }}
                      onClick={sendVerificationEmail}
                    >
                      Send Verification Mail
                    </Button>
                  </Box>
                )}

                {response && (
                  <Typography color="blue" variant="body2" fontSize="small">
                    {response}
                  </Typography>
                )}
                <Divider />

                <ProfileListItem
                  primary="Blogs:"
                  secondary={userData?.blogs?.length}
                />
                <Divider />
              </List>
              <Box sx={{ display: "flex", mt: 2, justifyContent: "center" }}>
                {" "}
                <Button variant="outlined" onClick={handleClickOpen}>
                  Change Password
                </Button>
                <Dialog open={openModal} onClose={handleClose} fullWidth>
                  <Box component="form" onSubmit={formik.handleSubmit}>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogContent>
                      <TextField
                        margin="dense"
                        id="oldP"
                        name="oldP"
                        color="focusInput"
                        label="Current Password"
                        type={showPassword1 ? "text" : "password"}
                        value={formik.values.oldP}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.oldP && Boolean(formik.errors.oldP)
                        }
                        helperText={formik.touched.oldP && formik.errors.oldP}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword1}
                                onMouseDown={handleMouseDownPassword1}
                                edge="end"
                              >
                                {showPassword1 ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        margin="dense"
                        id="newP"
                        name="newP"
                        label="New Password"
                        color="focusInput"
                        type={showPassword2 ? "text" : "password"}
                        value={formik.values.newP}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.newP && Boolean(formik.errors.newP)
                        }
                        helperText={formik.touched.newP && formik.errors.newP}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword2}
                                onMouseDown={handleMouseDownPassword2}
                                edge="end"
                              >
                                {showPassword2 ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />

                      {passwordError && (
                        <Alert severity="error">
                          Error —{" "}
                          <strong>
                            {passwordError?.response?.data?.message}
                          </strong>
                        </Alert>
                      )}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit" disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? "Changing..." : "Change"}
                      </Button>
                    </DialogActions>
                  </Box>
                </Dialog>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={8}
          rowSpacing={4}
          sx={{
            my: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {userData?.blogs?.length <= 0 ? (
            <Box
              justifySelf="center"
              sx={{
                width: "100%",
              }}
            >
              <NoBlogs title="Your blogs will appear here..." />
            </Box>
          ) : (
            <Grid item>
              {userData?.blogs?.map((blog) => (
                <ProfileBlogCard key={blog._id} blog={blog} />
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
