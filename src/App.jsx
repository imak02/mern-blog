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
import EditBlog from "./pages/EditBlog";
import EditProfile from "./pages/EditProfile";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

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
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/edit/:userId",
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ),
      },

      {
        path: "/blog/create",
        element: (
          <ProtectedRoute>
            <CreateBlog />
          </ProtectedRoute>
        ),
      },
      {
        path: "/blog/edit/:blogId",
        element: (
          <ProtectedRoute>
            <EditBlog />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
]);

const App = () => {
  return (
    <Box
      sx={{
        backgroundColor: (t) =>
          t.palette.mode === "light" ? "#BDCDD6" : t.palette.background.default,
        minHeight: "100vh",
        color: "text.primary",
      }}
    >
      <RouterProvider router={router} />
    </Box>
  );
};

export default App;
