import { Avatar, Box, Checkbox, Container, createTheme, CssBaseline, FormControlLabel, Grid, Link, TextField, ThemeProvider, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Button } from "@material-ui/core";
import { AccountCircle } from "@mui/icons-material";
import AuthContext from "../../context/Auth/AuthContext";

const Profile = () => {
  // TODO remove, this demo shouldn't need to reset the theme.

  const defaultTheme = createTheme();

  const context = useContext(AuthContext);
  const {user} = context;

  const handleSubmit = () => {

  }

  useEffect(() => {
    console.log(user);
  }, []);

  return  (<ThemeProvider theme={defaultTheme}>
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <AccountCircle />
      </Avatar>
      <Typography component="h1" variant="h5">
        Profile
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="#" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
</ThemeProvider>);
};

export default Profile;
