import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth.js";
import Alert from "./Alert.js";

import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Divider,
  Paper,
  Snackbar,
} from "@mui/material";

import styled from "@emotion/styled";

const LoginBox = styled(Box)(({ theme }) => ({
  bgcolor: "white",
  display: "flex",
  flex: 1,
  minHeight: "630px",
  alignItems: "center",
  padding: "2.5rem",
  maxWidth: "40rem",
}));

const Login = ({ toggleForm }) => {
  const [loginData, setLoginData] = useState({});
  const [loginPending, setLoginPending] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginFailMessage, setLoginFailMessage] = useState('');
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  const clearData = () => {
    setLoginData((prevState) => ({ ...prevState, password: "" }));
  };

  const handleChange = (e) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginPending(true);
    try {
      const response = await login(loginData);
      const responseStatus = response.status;
      const token = await response.data.token;

      if (responseStatus === 200) {
        setLoggedIn(true);
        setToken(token);
        navigate("/");
      } else if (responseStatus === 403) {
        setLoginFailMessage("User does not exist");
      } else if (responseStatus === 400) {
        setLoginFailMessage("Username or password is incorrect");
      }
    } catch (error) {
      console.log(error);
      setLoginFailMessage(
        "An unexpected error occurred - please try again later"
      );
    } finally {
      clearData();
      setLoginPending(false);
    }
  };

  useEffect(() => {
    setLoginFailMessage(null);
  }, []);

  useEffect(() => {
    if (loggedIn) {
      // Perform some action
    }
  }, [loggedIn]);

  return (
    <LoginBox>
      <Box width="100%">
        <Typography variant="h5">
          <Snackbar
            open={false}
            autoHideDuration={12000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Success! You have successfully registered. Welcome to EcoHabit!
            </Alert>
          </Snackbar>
          <strong>Welcome back</strong>
        </Typography>
        <Typography>Have you been staying green?</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            size="small"
            variant="outlined"
            name="email"
            value={loginData?.email || ""}
            onChange={handleChange}
            label="Email address"
            type="email"
            autoComplete="off"
            fullWidth
          />
          <TextField
            margin="normal"
            size="small"
            type="password"
            name="password"
            variant="outlined"
            value={loginData?.password || ""}
            onChange={handleChange}
            label="Password"
            autoComplete="off"
            fullWidth
          />

          {loginFailMessage && (
            <Alert variant="outlined" severity="warning">
              {loginFailMessage}
            </Alert>
          )}
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Keep me signed in for the future"
            sx={{ color: "#7e7e7e", fontSize: 20 }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ color: "white", width: "100%", margin: "20px auto" }}
          >
            SIGN IN
          </Button>
          <Divider>or</Divider>
          <Paper
            sx={{
              textAlign: "center",
              padding: "5px",
              fontWeight: "500",
              verticalAlign: "center",
              margin: "14px 0",
            }}
          >
            <Button
              variant="text"
              color="inherit"
              sx={{
                backgroundImage: "url('./images/Google.png')",
                backgroundRepeat: "no-repeat",
                height: "1rem",
                padding: "0 20px",
                margin: "3px",
                minWidth: "max-content",
              }}
            >
              SIGN IN WITH GOOGLE
            </Button>
          </Paper>
          <Typography color="#7e7e7e" component="div">
            <center>
              Are you new here ? <Button onClick={toggleForm}>Sign Up</Button>
            </center>
          </Typography>
        </Box>
      </Box>
    </LoginBox>
  );
};

export default Login;
