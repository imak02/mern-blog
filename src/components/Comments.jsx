// import React, { useEffect, useState } from "react";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import Divider from "@mui/material/Divider";
// import ListItemText from "@mui/material/ListItemText";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import Avatar from "@mui/material/Avatar";
// import Typography from "@mui/material/Typography";
// import BlogLoader from "./BlogLoader";
// import ErrorPage from "../pages/ErrorPage";
// import axios from "axios";
// import { Box } from "@mui/material";
// import moment from "moment";

// export default function Comments({ blogId }) {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     const getComments = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await axios.get(`/comment/${blogId}`);
//         setComments(response?.data?.data);
//         setLoading(false);
//       } catch (error) {
//         setError(error);
//         console.log(error);
//       }
//     };
//     getComments();
//   }, []);

//   if (loading) return <BlogLoader />;
//   if (error) return <ErrorPage />;

//   return (
//     <List sx={{ width: "100%", bgcolor: "transparent" }}>
//       {comments.map((comment) => (
//         <Box key={comment._id}>
//           <ListItem alignItems="flex-start">
//             <ListItemAvatar>
//               <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
//             </ListItemAvatar>
//             <ListItemText
//               primary={comment.commenter.name}
//               secondary={
//                 <React.Fragment>
//                   <Typography
//                     sx={{ display: "inline" }}
//                     component="span"
//                     variant="body2"
//                     color="text.primary"
//                   >
//                     {moment(comment.createdAt).format("Do MMMM YYYY")}
//                     {/* {comment.createdAt} */}
//                   </Typography>
//                   {` —— ${comment.comment}`}
//                 </React.Fragment>
//               }
//             />
//           </ListItem>
//           <Divider
//             variant="inset"
//             component="li"
//             sx={{ listStyleType: "none" }}
//           />
//         </Box>
//       ))}
//     </List>
//   );
// }
