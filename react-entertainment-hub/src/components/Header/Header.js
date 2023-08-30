import "./Header.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/Auth/AuthContext";
import { Menu, MenuItem } from "@mui/material";

const Header = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });
  const context = useContext(AuthContext);
  const { showloginbtn, getuser } = context;

  const navigate = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const gotoLogin = (e) => {
    e.preventDefault();
    navigate.push("/login");
  };

  const gotoLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth-token");
    window.location.reload();
  };

  const gotoSignup = (e) => {
    e.preventDefault();
    navigate.push("/signup");
  };

  const gotoProfile = (e) => {
    e.preventDefault();
    getuser();
    navigate.push("/profile");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            onClick={() => {
              navigate.push("/");
            }}
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ cursor: "pointer" }}
          >
            Entertainment Hub
          </Typography>
          {showloginbtn ? (
            <div>
              <Button color="inherit" onClick={gotoLogin} style={{ marginRight: "10px" }}>
                Login
              </Button>
              <Button color="inherit" onClick={gotoSignup}>
                Signup
              </Button>
            </div>
          ) : (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                sx={{ mt: "45px" }}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <div style={{ padding: "10px" }}>
                  <MenuItem onClick={gotoProfile}>Profile</MenuItem>
                </div>
                <div style={{ padding: "10px" }}>
                  <MenuItem onClick={gotoLogout}>Log Out</MenuItem>
                </div>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
