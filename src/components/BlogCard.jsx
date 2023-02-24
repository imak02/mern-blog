import * as React from "react";
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

const BlogCard = () => {
  return (
    <Card sx={{ maxWidth: 700, backgroundColor: "#fff" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Asbin Khanal"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="300"
        src="https://images.pexels.com/photos/12309506/pexels-photo-12309506.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
        alt="Paella dish"
        sx={{ p: 1, borderRadius: "15px" }}
      />
      <CardContent>
        <Typography variant="h6" sx={{ lineHeight: 1.4, mb: 2 }}>
          Maximize your React JS capabilities with these 5 libraries
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like. This impressive paella is a perfect party dish
          and a fun meal to cook together with your guests. Add 1 cup of frozen
          peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default BlogCard;
