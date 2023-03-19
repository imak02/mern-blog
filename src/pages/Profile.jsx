import React, { useContext } from "react";
import {
  Avatar,
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
import BlogCard from "../components/BlogCard";
import { AuthContext } from "../context/AuthContextProvider";

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
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  const user = authCtx.user;

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
                alt={user.name}
                src="/profile.jpeg"
                sx={{ width: 150, height: 150 }}
              />
            </CardMedia>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ textAlign: "center" }}
              >
                {user.name}
              </Typography>
              <List sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ textAlign: "center", color: "text.secondary" }}
                >
                  Basic User Information
                </Typography>

                <ProfileListItem
                  primary="Username:"
                  secondary={user.userName}
                />
                <ProfileListItem primary="Email:" secondary={user.email} />
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
            // display: "flex",
            // flexDirection: "column",
            // alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Grid item>
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </Grid> */}
        </Grid>
        {/* <Card sx={{ my: 4, bgcolor: "yellow", p: 2 }}> */}

        {/* </Card> */}
      </Grid>
    </Container>
  );
};

export default Profile;
