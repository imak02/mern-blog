import React from "react";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";

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
  // const user = useSelector((state) => state.auth.user ?? "");
  const user = {
    fullName: "Asbin Khanal",
    email: "asbin@gmail.com",
    userName: "imak02",
  };
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
                alt={user.fullName}
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
                {user.fullName}
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
          <Grid item>
            {" "}
            <BlogCard />
          </Grid>
          <Grid item>
            {" "}
            <BlogCard />
          </Grid>

          {/* <Card sx={{ my: 4, bgcolor: "yellow", p: 2 }}> */}

          {/* </Card> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
