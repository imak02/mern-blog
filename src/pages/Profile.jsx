import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
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

const ProfileListItem = (props) => {
  return (
    <>
      <ListItem>
        <ListItemText primary={props.primary} secondary={props.secondary} />
      </ListItem>
      <Divider />
    </>
  );
};

const Profile = () => {
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
                {userData.name}
              </Typography>
              <List sx={{ textAlign: "center" }}>
                <ProfileListItem
                  primary="Username:"
                  secondary={userData.userName}
                />
                <ProfileListItem primary="Email:" secondary={userData.email} />

                <ProfileListItem
                  primary="Blogs:"
                  secondary={userData?.blogs?.length}
                />
              </List>
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
