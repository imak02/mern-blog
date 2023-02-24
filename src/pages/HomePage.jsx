import React from "react";
import { Box, Container } from "@mui/material";
import BlogCard from "../components/BlogCard";

const HomePage = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 4,
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        rowGap: 4,
        justifyContent: "space-between",
      }}
    >
      <BlogCard />
      <BlogCard />

      <BlogCard />

      <BlogCard />

      <BlogCard />
    </Container>
  );
};

export default HomePage;
