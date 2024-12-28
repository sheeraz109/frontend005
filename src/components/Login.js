


// LoginVariant2.jsx


import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { TextField, Button, Typography, Box, Container } from "@mui/material";
import axios from 'axios'
const LoginVariant2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/login`, { email, password });
      console.log('response from login',response.data.token);
      localStorage.setItem("authToken", response.data.token);
      alert(response.data.message);

      login(response.data.token);
      navigate("/upload", { state: { ...response.data } });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  return (
    <Container maxWidth="xs">
  <Box
    component="form"
    onSubmit={handleSubmit}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 4,
      backgroundColor: "linear-gradient(to right, #6a11cb, #2575fc)", // Updated gradient color
      borderRadius: 3,
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)", // Slightly stronger shadow
      mt: 5,
    }}
  >
    <Typography variant="h4" sx={{ marginBottom: 3, color: "#fff", textAlign: "center" }}>
      Welcome to Your Dashboard
    </Typography>

    <TextField
      label="Enter Your Email"
      variant="outlined" // Changed to 'outlined' for a cleaner look
      value={email}
      onChange={handleEmailChange}
      required
      fullWidth
      error={!isEmailValid && email.length > 0}
      helperText={!isEmailValid && email.length > 0 ? "Please provide a valid email address" : ""}
      sx={{
        marginBottom: 3,
        backgroundColor: "#f4f5fa", // Subtle background for better contrast
        borderRadius: 2,
      }}
    />

    <TextField
      label="Enter Your Password"
      type="password"
      variant="outlined" // Changed to 'outlined' for consistency
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      fullWidth
      sx={{
        marginBottom: 3,
        backgroundColor: "#f4f5fa", // Matches email field styling
        borderRadius: 2,
      }}
    />

    <Button
      type="submit"
      variant="contained"
      fullWidth
      sx={{
        padding: "12px",
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: "#1e88e5", // Subdued blue
        color: "#fff",
        "&:hover": {
          backgroundColor: "#1565c0", // Darker hover color
        },
        borderRadius: 2,
      }}
    >
      Log In
    </Button>
  </Box>
</Container>

  );
};

export default LoginVariant2;
