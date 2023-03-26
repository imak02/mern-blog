import { Box } from "@mui/material";
import React from "react";
import "./BlogLoader.scss";

const BlogLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <span className="blogLoader"></span>
    </Box>
  );
};

export default BlogLoader;
