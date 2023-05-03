import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const response = await axios.post("/user/forgot-password", { email });
      console.log(response);
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Paper elevation={2} sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Box
            component="img"
            src="favicon_io/android-chrome-512x512.png"
            height={50}
            width={50}
          />
        </Box>
        <Typography variant="h6">Forgot password?</Typography>
        <Typography variant="body2">
          Please enter your email below. We will provide a code to reset your
          password.
        </Typography>
        <Box component="form" sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            fullWidth
            size="small"
            id="email"
            type="email"
            name="email"
            color="focusInput"
            autoComplete="off"
            label="Email"
            value={email}
            onChange={handleEmailChange}
            sx={{ marginY: 2 }}
          />
          <Button
            variant="contained"
            sx={{ alignSelf: "flex-end" }}
            type="submit"
            onClick={sendOTP}
          >
            Send OTP
          </Button>
          {error && (
            <Typography variant="body2" color="red">
              {error?.response?.data?.message || error?.message}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
