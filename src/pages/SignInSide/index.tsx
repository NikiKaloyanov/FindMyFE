import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
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
import { account } from "../../appwrite.ts";
import { OAuthProvider } from "appwrite";

const SignInSide = () => {
  const navigate = useNavigate(),
    imageGenerator: string = "url(/sign.jpg)",
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
    const confirmPassword = data.get("confirmPassword") as string;
    if (signUp) {
      registerRequest(name, email, password, confirmPassword);
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
      .catch(() => {
        setError("Wrong email or password");
      });
  };

  const registerRequest = (
    name: string | null,
    email: string | null,
    password: string | null,
    confirmPassword: string | null,
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

    if (confirmPassword !== password) {
      setError("Passwords do not match");
      throw new Error("Passwords do not match");
    }

    setError(null);
    register(name, email, password)
      .then(() => switchSignUp())
      .catch((err) => setError(err));
  };

  const googleSignIn = () => {
    account
      .createOAuth2Session(
        OAuthProvider.Google,
        "http://localhost:5173/redirect",
        "http://localhost:5173/",
      )
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100dvh",
        backgroundImage: imageGenerator,
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(49,52,46,0.5)",
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Box sx={{ alignItems: "center", justifyContent: "center" }}>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </Box>
            <Typography component="h1" variant="h3">
              MeetMap
            </Typography>
          </Box>
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
                error={!!error}
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
              error={!!error}
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
              error={!!error}
            />
            {signUp && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  error={!!error}
                  type="password"
                  id="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                />
                {error && <p>{error}</p>}
              </>
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
                  <Button fullWidth variant="outlined" onClick={switchSignUp}>
                    {"Sign Up"}
                  </Button>
                </Grid>
              </Grid>
            ) : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={googleSignIn}
              sx={{ mt: 3, mb: 2, p: 2 }}
            >
              Login with Google
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInSide;
