import { Home } from "@mui/icons-material";
import { Alert, AlertTitle, Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ErrorAlert = (props) => {
  return (
    <Box
      id="error-page"
      className="error"
      sx={{
        minHeight: "100vh",
        color: "red",
        display: "flex ",
        flexDirection: "column",
        gap: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Alert severity="error" variant="filled" sx={{}}>
        <AlertTitle>Error</AlertTitle>
        <Typography variant="h1" align="center">
          {props.message}
        </Typography>
      </Alert>

      <Link component="button" to="/" className="links">
        <Button variant="contained" color="error" startIcon={<Home />}>
          Go back to homepage
        </Button>
      </Link>
    </Box>
  );
};

export default ErrorAlert;
