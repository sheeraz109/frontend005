
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, IconButton, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import ticktok from '../assets/ticktokbg.png';

const NavbarVariant2 = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/login");
  };

  return (
<AppBar
  position="static"
  sx={{
    background: "linear-gradient(to right, #4facfe, #00f2fe)",
    color: "#fff",
    padding: "0 20px",
  }}
>
  <Toolbar sx={{ justifyContent: "space-between", height: 70 }}>
    <IconButton edge="start" component={Link} to="/">
      <img src={ticktok} alt="Home" style={{ height: "60px" }} />
    </IconButton>
    <Box>
      {user ? (
        <Button
          onClick={handleLogout}
          sx={{
            backgroundColor: "#1a73e8",
            color: "#fff",
            textTransform: "capitalize",
            fontSize: "14px",
            '&:hover': { backgroundColor: "#1565c0" },
            padding: "8px 16px",
            borderRadius: "20px",
          }}
        >
          Sign Out
        </Button>
      ) : (
        <>
          <Button
            component={Link}
            to="/login"
            sx={{
              border: "2px solid #fff",
              color: "#fff",
              textTransform: "capitalize",
              fontSize: "14px",
              padding: "8px 16px",
              borderRadius: "20px",
              '&:hover': { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            Log In
          </Button>
          <Button
            component={Link}
            to="/register"
            sx={{
              backgroundColor: "#1a73e8",
              color: "#fff",
              textTransform: "capitalize",
              fontSize: "14px",
              padding: "8px 16px",
              borderRadius: "20px",
              marginLeft: 1,
              '&:hover': { backgroundColor: "#1565c0" },
            }}
          >
            Sign Up
          </Button>
        </>
      )}
    </Box>
  </Toolbar>
</AppBar>

  );
};

export default NavbarVariant2;
