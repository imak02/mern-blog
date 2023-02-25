import { Box, LinearProgress } from "@mui/material";
import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

//Pages
import NavBar from "./components/NavBar";
import BlogDetails from "./pages/BlogDetails";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

const Layout = () => {
  return (
    <>
      {/* <LinearProgress color="warning" /> */}
      <NavBar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/blog/:id",
        element: <BlogDetails />,
      },
      { path: "/profile", element: <Profile /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

const App = () => {
  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      <RouterProvider router={router} />
    </Box>
  );
};

export default App;
