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

const ProfileBlogCard = ({ blog }) => {
  return (
    <Paper
      elevation={6}
      sx={{
        borderRight: "3px solid red",
        borderBottom: "3px solid red",
        width: { xs: "100%", md: 700 },
        mb: 2,
        // minHeight: 650,
      }}
    >
      <Card
        sx={{
          width: "100%",
          backgroundColor: (t) =>
            t.palette.mode === "light" ? "#EDDBC7" : t.palette.grey[800],
          px: 2,
          minHeight: 500,
        }}
      >
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
      </Card>
    </Paper>
  );
};
export default ProfileBlogCard;
