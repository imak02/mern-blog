import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, CardActionArea, Container, Paper, useTheme } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AccessTime, BorderColor, Create, Delete } from "@mui/icons-material";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  let { blogId } = useParams();
  const theme = useTheme();
  console.log(theme);
  const myColor = theme.palette.primary.main;
  console.log(myColor);

  useEffect(() => {
    const getBlog = async () => {
      const response = await axios.get(`/blog/${blogId}`);
      setBlog(response?.data?.data);
    };

    getBlog();
  }, []);

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          borderRight: "3px solid red",
          borderBottom: "3px solid red",
          width: "100%",
          my: 4,
        }}
      >
        <Card
          sx={{
            width: "100%",
            // backgroundColor: "background.default",
            px: 2,
            backgroundColor: (t) =>
              t.palette.mode === "light" ? "#EDDBC7" : t.palette.grey[800],
          }}
        >
          <CardHeader
            title={
              <Typography
                variant="h4"
                sx={{
                  lineHeight: 1.4,
                  overflowWrap: "break-word",
                  textAlign: "center",
                  fontWeight: 700,
                }}
              >
                {blog.title}
              </Typography>
            }
            action={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <IconButton aria-label="settings">
                  <BorderColor color="success" />
                </IconButton>
                <IconButton aria-label="settings">
                  <Delete color="error" />
                </IconButton>
              </Box>
            }
          />

          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Typography
              variant="body2"
              component="p"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Create fontSize="inherit" /> Asbin Khanal
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflowWrap: "break-word",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: { xs: "none", md: "flex" },
              }}
            >
              #blog #myblog #content
            </Typography>

            <Typography
              variant="body2"
              component="p"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <AccessTime fontSize="inherit" />
              19 hrs ago
            </Typography>
          </CardContent>

          <CardMedia
            component="img"
            src={`http://localhost:8000${blog.image}`}
            alt={blog.image}
            sx={{
              p: 2,
              borderRadius: "15px",
              height: { xs: "300px", sm: "400px", md: "500px" },
            }}
          />

          <CardContent sx={{ width: "100%" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflowWrap: "break-word",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textAlign: "justify",
              }}
            >
              {blog.content}
            </Typography>
          </CardContent>

          {/* <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions> */}
        </Card>
      </Paper>
    </Container>
  );
};

export default BlogDetails;
