import React, { useContext, useEffect, useState } from "react";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { AccessTime, BorderColor, Create, Delete } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContextProvider";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const auth = useContext(AuthContext);
  let { blogId } = useParams();
  const navigate = useNavigate();

  const authorId = blog?.author?._id;
  const userId = auth?.user?._id;

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/blog/${blogId}`);

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getBlog = async () => {
      const response = await axios.get(`/blog/${blogId}`);
      setBlog(response?.data?.data);
    };

    getBlog();
  }, []);

  console.log(blog);

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
                  textAlign: { xs: "left", md: "center" },
                  fontWeight: 700,
                }}
              >
                {blog.title}
              </Typography>
            }
            action={
              authorId === userId && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  <Link to={`/blog/edit/${blogId}`}>
                    <IconButton aria-label="settings">
                      <BorderColor color="success" />
                    </IconButton>
                  </Link>
                  <IconButton aria-label="settings" onClick={handleDelete}>
                    <Delete color="error" />
                  </IconButton>
                </Box>
              )
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
              <Create fontSize="inherit" /> {blog?.author?.name}
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
              {moment(blog.createdAt).format("Do MMMM YYYY, h:mm a")}
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
            <Box
              component="div"
              color="text.secondary"
              sx={{
                overflowWrap: "break-word",
                overflow: "hidden",
                listStyle: "inherit",
                textAlign: "justify",
              }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></Box>
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
