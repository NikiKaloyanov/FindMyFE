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
import { login } from "../../api/login.ts";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/register.ts";
import { useHooksContext } from "../../hooks/useHooksContext.tsx";

const SignInSide = () => {
  const navigate = useNavigate(),
    { headersHook } = useHooksContext(),
    [error, setError] = useState<string | null>(null),
    [signUp, setSignUp] = useState<boolean>(false);

  const switchSignUp = () => {
    setSignUp(!signUp);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("username") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    if (signUp) {
      registerRequest(name, email, password);
    } else {
      loginRequest(name, password);
    }
  };

  const loginRequest = (
    email: FormDataEntryValue | null,
    password: FormDataEntryValue | null,
  ) => {
    if (
      email === null ||
      password === null ||
      email === "" ||
      password === ""
    ) {
      setError("Email and password is required");
      throw new Error("Email and password is required");
    }
    setError(null);
    login(email as string, password as string)
      .then((data) => {
        headersHook.setUserData(data);
        navigate("/app");
      })
      .catch(() => setError("Wrong email or password"));
  };

  const registerRequest = (
    name: string | null,
    email: string | null,
    password: string | null,
  ) => {
    setError(null);

    if (
      name === null ||
      email === null ||
      password === null ||
      name === "" ||
      email === "" ||
      password === ""
    ) {
      setError("Name, email and password is required");
      throw new Error("Name, email and password is required");
    }

    if (password.length < 6) {
      setError("Password should be at least 6 symbols");
      throw new Error("Password should be at least 6 symbols");
    }

    if (!(email.includes("@") && email.includes("."))) {
      setError("Password should be at least 6 symbols");
      throw new Error("Password should be at least 6 symbols");
    }

    setError(null);
    register(name, email, password)
      .then(() => switchSignUp())
      .catch((err) => setError(err));
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "18px",
          backdropFilter: "blur(5px) saturate(150%)",
          webkitBackdropFilter: "blur(5px) saturate(150%)",
          backgroundColor: "rgba(238, 238, 238, 0.8)",
          borderRadius: "8px",
        }}
      >
        <Box>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            aria-errormessage={error ? error : undefined}
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            {signUp && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {signUp ? "Sign up" : "Sign in"}
            </Button>
            {!signUp ? (
              <Grid container>
                <Grid item xs>
                  <Button fullWidth variant="outlined" onClick={switchSignUp}>
                    {"Sign Up"}
                  </Button>
                </Grid>
              </Grid>
            ) : null}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInSide;
