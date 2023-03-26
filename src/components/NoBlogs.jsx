import { Box, Typography } from "@mui/material";
import React from "react";
import "./NoBlogs.scss";

const NoBlogs = ({ title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "block", m: 4 }}>
        <Typography variant="h4">{title}</Typography>
      </Box>

      <span className="noBlogs"></span>
    </Box>
  );
};

export default NoBlogs;
