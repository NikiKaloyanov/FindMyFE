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

const SignInSide = () => {
  const navigate = useNavigate(),
    [error, setError] = useState<string | null>(null),
    [signUp, setSignUp] = useState<boolean>(false);

  const switchToSignUp = () => {
    setSignUp(!signUp);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    if (signUp) {
      registerRequest(name, email, password);
    } else {
      loginRequest(email, password);
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
      .then(() => navigate("/app"))
      .catch(() => setError("Wrong email or password"));
  };

  const registerRequest = (
    name: FormDataEntryValue | null,
    email: FormDataEntryValue | null,
    password: FormDataEntryValue | null,
  ) => {
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
    setError(null);
    register(name as string, email as string, password as string)
      .then(() => navigate("/app"))
      .catch((err) => setError(err));
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
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
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
            )}
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
            {!signUp && (
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            )}
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
                  <Button fullWidth variant="text">
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Button>
                </Grid>

                <Grid item xs>
                  <Button fullWidth variant="text" onClick={switchToSignUp}>
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
