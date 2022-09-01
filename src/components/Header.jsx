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
import './Header.css'

export const Header = ({ children }) => {
  let { user, logoutUser } = useContext(AuthContext);
  let navigate = useNavigate();
  let location = useLocation();

  const renderLogInLogOut = () => {
    return !user ? (
      <Button
      style={{   borderRadius:"4vw"}}
       
      className="mybtn1"
        color="inherit"
        onClick={() => navigate("/signin", { replace: true })}
      >
        Login
      </Button>
    ) : (
      <Button 
      className="mybtn1"
      onClick={() => logoutUser()} color="inherit">
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
        <AppBar position="fixed" style={{ background: '#252f5a',width:'100vw',height:'11.5vh',paddingTop:'1.5vh'}}>
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
              variant="h4"
              component="div"
              onClick={() => navigate("/", { replace: true })}
              sx={{ flexGrow: 1, cursor: "pointer" }}
            >
              V-NE
            </Typography>
            <Typography
              variant="h4"
              component="div"
              onClick={() => navigate("/", { replace: true })}
              sx={{ flexGrow: 500, cursor: "pointer" ,color:'#ff344d'}}
            >
             R
            </Typography>
         
            <Typography
              variant="h6"
              component="div"
              onClick={() => navigate("/", { replace: true })}
              sx={{ flexGrow: 50, cursor: "pointer" }}
            >
             Leaderboard
            </Typography>
            <Typography
              variant="h6"
              component="div"
              onClick={() => navigate("/", { replace: true })}
              sx={{ flexGrow: 50, cursor: "pointer" }}
            >
             Tag Team
            </Typography>
            {/* {renderNavLinks()} */}
            {renderLogInLogOut()}
          </Toolbar>
        </AppBar>
      </Box>
      {children}
    </>
  );
};
