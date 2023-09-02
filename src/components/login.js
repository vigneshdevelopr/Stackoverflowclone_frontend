import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import { styled } from "styled-components";
import Loading from "./Spinner";




function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const[loading,setLoading]=useState(false)

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { email, password } = values;

  //Single handle change event
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      // setLoading(true);

      const newData = {
        email,
        password,
      };
      const response = await fetch("https://stackoverflowcloning.onrender.com/user/login", {
        method: "POST",
        body: JSON.stringify(newData),

        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      if (data.token) {
        localStorage.setItem("react_token", data.token);
        localStorage.setItem("email", data.email);
        console.log(data);
        setValues({
          ...values,
          email: "",
          password: "",
        });
        history.push("/doubts");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally{
      // setLoading(false)
    }
  };

  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        {/* {loading?(<Loading />):( */}
<>
          <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://images.pexels.com/photos/7107485/pexels-photo-7107485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
              backgroundSize:"cover",
              backgroundPosition: "center",
            }}
        />
        <Grid style={{backgroundColor:'rgb(227, 182, 110)'}} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              color:'#FFFFFF',
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "rgb(227, 182, 110)" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                onChange={handleChange("email")}
                value={email}
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                onChange={handleChange("password")}
                value={password}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                onClick={loginUser}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    style={{ cursor: "pointer" }}
                    onClick={() => history.push("/signup")}
                    variant="body2"
                    >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        </>

{/* )} */}
      </Grid>
        
    </ThemeProvider>
  );
}
