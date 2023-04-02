import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import BlogLoader from "../components/BlogLoader";
import NoBlogs from "../components/NoBlogs";
import ErrorPage from "./ErrorPage";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await axios.get("/blog");
        if (result) {
          setBlogs(result?.data?.data);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
        console.log(error);
      }
    };
    getBlogs();
  }, []);

  if (loading) return <BlogLoader />;
  if (error) return <ErrorPage />;

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          mt: 4,
          pb: 10,
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          rowGap: 10,
          justifyContent: { xs: "center", xl: "space-between" },
        }}
      >
        {blogs.length <= 0 ? (
          <Box
            justifySelf="center"
            sx={{
              width: "100%",
            }}
          >
            <NoBlogs title="Sorry! There are no blogs available right now..." />
          </Box>
        ) : (
          blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        )}
      </Container>
    </>
  );
};

export default HomePage;
