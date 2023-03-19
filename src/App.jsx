import { Box, LinearProgress } from "@mui/material";
import React, { useContext } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

//Pages
import NavBar from "./components/NavBar";
import { AuthContext } from "./context/AuthContextProvider";
import BlogDetails from "./pages/BlogDetails";
import CreateBlog from "./pages/CreateBlog";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

const ProtectedRoute = ({ children }) => {
  const auth = useContext(AuthContext);
  const isLoggedIn = auth.isLoggedIn;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

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
        path: "/blog/:blogId",
        element: <BlogDetails />,
      },
      { path: "/profile", element: <Profile /> },
      {
        path: "/blog/create",
        element: (
          <ProtectedRoute>
            <CreateBlog />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

const App = () => {
  return (
    <Box
      sx={{
        backgroundColor: (t) =>
          t.palette.mode === "light" ? "#BDCDD6" : t.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <RouterProvider router={router} />
    </Box>
  );
};

export default App;
