import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import BlogCard from "../components/BlogCard";
import axios from "axios";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const result = await axios.get("/blog");
      if (result) {
        setBlogs(result?.data?.data);
      }
      console.log(blogs);
    };
    getBlogs();
  }, []);

  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 4,
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        rowGap: 10,
        justifyContent: "space-between",
      }}
    >
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </Container>
  );
};

export default HomePage;
