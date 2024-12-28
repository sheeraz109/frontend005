
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Button, Typography, Box, Container } from "@mui/material";
import axios from 'axios'
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordRules, setPasswordRules] = useState({
    length: false,
    number: false,
    specialChar: false,
    capitalLetter: false,
  });

  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log('api url', apiUrl);
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await axios.post(`${apiUrl}/register`, { username, email, password });

      if (response.status === 201 && response.data.message) {
        setMessage(response.data.message);
        navigate("/login");
      } else {
        setMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration failed:", error);

      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Registration failed. Please try again.");
      }
    }
  };

  // Password validation logic
  const validatePassword = (password) => {
    const lengthValid = password.length >= 8;
    const numberValid = /[0-9]/.test(password);
    const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const capitalLetterValid = /[A-Z]/.test(password);

    setPasswordRules({
      length: lengthValid,
      number: numberValid,
      specialChar: specialCharValid,
      capitalLetter: capitalLetterValid,
    });

    return lengthValid && numberValid && specialCharValid && capitalLetterValid;
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    if (passwordValue) {
      const isValid = validatePassword(passwordValue);
      setPasswordError(!isValid);
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
  };

  // Regex for email validation
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  return (
<Container maxWidth="xs">
  <Box
    component="form"
    onSubmit={handleRegister}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 4,
      background: "linear-gradient(to right, #6a11cb, #2575fc)", // new gradient
      borderRadius: 5,
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
      mt: 5,
    }}
  >
    <Typography
      variant="h4"
      sx={{ marginBottom: 3, color: "#fff", textAlign: "center" }}
    >
      Create Your Account
    </Typography>

    {message && (
      <Typography color="error" sx={{ marginBottom: 3 }}>
        {message}
      </Typography>
    )}

    <TextField
      label="Enter Your Username"
      variant="outlined"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
      fullWidth
      sx={{
        marginBottom: 3,
        backgroundColor: "#f9f9f9", // light gray background for inputs
        borderRadius: 2,
      }}
    />

    <TextField
      label="Enter Your Email Address"
      variant="outlined"
      value={email}
      onChange={handleEmailChange}
      required
      fullWidth
      error={!isEmailValid && email.length > 0}
      helperText={
        !isEmailValid && email.length > 0 ? "Please enter a valid email" : ""
      }
      sx={{
        marginBottom: 3,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
      }}
    />

    <TextField
      label="Create a Password"
      type="password"
      variant="outlined"
      value={password}
      onChange={handlePasswordChange}
      required
      fullWidth
      error={passwordError}
      helperText={passwordError ? "Password must meet the criteria below" : ""}
      sx={{
        marginBottom: 3,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
      }}
    />

    {/* Password Rules */}
    {password && (
      <Box sx={{ marginBottom: 3, textAlign: "left", width: "100%" }}>
        <Typography variant="body2" color={passwordRules.length ? "green" : "red"}>
          - Minimum 8 characters
        </Typography>
        <Typography variant="body2" color={passwordRules.number ? "green" : "red"}>
          - Includes at least 1 number
        </Typography>
        <Typography
          variant="body2"
          color={passwordRules.specialChar ? "green" : "red"}
        >
          - Includes at least 1 special character
        </Typography>
        <Typography
          variant="body2"
          color={passwordRules.capitalLetter ? "green" : "red"}
        >
          - Includes at least 1 uppercase letter
        </Typography>
      </Box>
    )}

    <Button
      type="submit"
      variant="contained"
      fullWidth
      sx={{
        padding: "12px",
        fontSize: "16px",
        backgroundColor: "#5a1cdb", // new button color
        color: "#fff",
        borderRadius: 2,
        "&:hover": {
          backgroundColor: "#482bbd", // hover effect
        },
        "&:disabled": {
          backgroundColor: "#b3b3b3", // disabled state styling
        },
      }}
      disabled={!isEmailValid || passwordError}
    >
      Sign Up
    </Button>
  </Box>
</Container>

  );
};

export default Register;

