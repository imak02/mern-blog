import React from "react";
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
import { CardActionArea, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";

const BlogCard = ({ blog }) => {
  return (
    <Paper
      elevation={6}
      sx={{
        borderRight: "3px solid red",
        borderBottom: "3px solid red",
        width: { xs: "100%", md: 700 },
        // minHeight: 650,
      }}
    >
      <Card
        sx={{
          width: "100%",
          backgroundColor: (t) =>
            t.palette.mode === "light" ? "#EDDBC7" : t.palette.grey[800],
          px: 2,
          minHeight: 650,
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} alt={blog?.author?.name}>
              {blog?.author?.name}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={blog?.author?.name}
          subheader={moment(blog.createdAt).fromNow()}
        />

        <Link className="links" to={`/blog/${blog._id}`}>
          <CardMedia
            component="img"
            height="300"
            src={`http://localhost:8000${blog.image}`}
            alt={blog.image}
            sx={{ p: 2, borderRadius: "15px" }}
          />

          <CardContent sx={{ width: "100%" }}>
            <Typography
              variant="h6"
              sx={{ lineHeight: 1.4, mb: 2, overflowWrap: "break-word" }}
            >
              {blog.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflowWrap: "break-word",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {blog.description.length > 400
                ? blog.description.substring(0, 400) + "..."
                : blog.description}
            </Typography>
          </CardContent>
        </Link>

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Paper>
  );
};
export default BlogCard;
