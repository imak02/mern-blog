import { NearMe } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import ErrorPage from "../pages/ErrorPage";
import BlogLoader from "./BlogLoader";

const CommentBox = ({ blogId }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    console.log("first");
    const getComments = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`/comment/${blogId}`);
        setComments(response?.data?.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    };
    getComments();
  }, [refresh]);

  const postComment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "post",
        url: `/comment/add/${blogId}`,
        data: { comment },
      });
      if (response) {
        setComment("");
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <BlogLoader />;
  if (error) return <ErrorPage />;

  return (
    <Box>
      {isLoggedIn && (
        <Box sx={{ mt: 3 }} component="form">
          <TextField
            id="comment"
            name="comment"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            variant="outlined"
            placeholder="Add your comment"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Post Comment"
                    color="info"
                    onClick={postComment}
                    //   onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    <NearMe />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}
      <Box>
        {" "}
        <List
          sx={{ width: "100%", bgcolor: "transparent", ml: { xs: -2, sm: 0 } }}
        >
          {comments.map((comment) => (
            <Box key={comment._id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.commenter.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {moment(comment.createdAt).format("Do MMMM YYYY")}
                        {/* {comment.createdAt} */}
                      </Typography>
                      {` —— ${comment.comment}`}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider
                variant="inset"
                component="li"
                sx={{ listStyleType: "none" }}
              />
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default CommentBox;
