import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../Context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Header = ({ children }) => {
  let { user, logoutUser } = useContext(AuthContext);
  let navigate = useNavigate();
  let location = useLocation();

  const renderLogInLogOut = () => {
    return !user ? (
      <Button
        color="inherit"
        onClick={() => navigate("/signin", { replace: true })}
      >
        Login
      </Button>
    ) : (
      <Button onClick={() => logoutUser()} color="inherit">
        Logout
      </Button>
    );
  };

  const showCompleProfileLink = () => {
    return user && location.pathname !== "/complete_profile";
  };

  const renderNavLinks = () => {
    return (
      <>
        <Button
          color="inherit"
          onClick={() => navigate("/", { replace: true })}
        >
          Home
        </Button>
        {!user?.profile_completed ? (
          showCompleProfileLink() && (
            <Button
              color="inherit"
              onClick={() => navigate("/complete_profile", { replace: true })}
            >
              Complete Profile
            </Button>
          )
        ) : (
          <>
            <Button
              color="inherit"
              onClick={() => navigate("/exams", { replace: true })}
            >
              Exams
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/quizes", { replace: true })}
            >
              Quizes
            </Button>
            {user && (
              <Button
                color="inherit"
                onClick={() => navigate("/profile", { replace: true })}
              >
                Profile
              </Button>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: '#191B20' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              onClick={() => navigate("/", { replace: true })}
              sx={{ flexGrow: 1, cursor: "pointer" }}
            >
              V-NER
            </Typography>
            {renderNavLinks()}
            {renderLogInLogOut()}
          </Toolbar>
        </AppBar>
      </Box>
      {children}
    </>
  );
};
