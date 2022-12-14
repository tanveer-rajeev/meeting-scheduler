import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  logInWithCredentials,
  signUPWithCredentials,
} from "./CredentialController";
import { useNavigate } from "react-router-dom";
const theme = createTheme();

const SignInSide = () => {
  const [newUser, setNewUser] = useState(false);
  const [require, setRequire] = useState("");
  const navigate = useNavigate();

  const handleResponse = (res) => {
    console.log(typeof res);
    if (typeof res === "string" || res === 403) {
      if (res === 403) res = "Wrong Username or Password";
      setRequire(res);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sessionStorage.setItem("test1", "test1");
    const data = new FormData(event.currentTarget);
    console.log(newUser);

    const userDetails = {
      username: data.get("username"),
      password: data.get("password"),
      phoneNumber: data.get("phoneNumber"),
      department: data.get("department"),
    };

    if (newUser) {
      signUPWithCredentials(userDetails).then((response) => {
        handleResponse(response);
      });
    } else if (!newUser || require === "") {
      logInWithCredentials(userDetails).then((response) => {
        if (response !== 403) {
          navigate(`/home`);
        } else handleResponse(response);
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {newUser ? "Sign Up" : "Sign In"}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {!newUser && (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </>
              )}
              {newUser && (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phone number"
                    label="phone number"
                    name="phone number"
                    autoComplete="phone number"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="department"
                    label="department"
                    type="department"
                    id="department"
                    autoComplete="department"
                  />
                </>
              )}
              {newUser && require && (
                <Typography
                  component="p"
                  variant="body2"
                  style={{ color: "red" }}
                >
                  {"/*" + require + "*/"}
                </Typography>
              )}
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {newUser ? "Sign Up" : "Sign In"}
              </Button>

              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link
                    onClick={() => setNewUser(!newUser)}
                    href="#"
                    variant="body2"
                  >
                    {newUser
                      ? "Have an account? Sign In"
                      : "Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default SignInSide;
