import React from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Box
} from "@mui/material";
import { Link } from "react-router-dom";
import DrawerComp from "./Drawer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  let links = [];

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userInfo: registered } = useSelector(state => state.userRegister);
  const { userInfo: logged } = useSelector(state => state.userLogin);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (logged && logged.isAdmin) {
    links = [
      { to: "/users", text: "Users" },
      { to: "/companiesAdmin", text: "Companies" },
      { to: "/technologies", text: "Technologies" },
      { to: "/levels", text: "Levels" },
      // { to: "/jobs", text: "Jobs" },
      { to: "/", text: "Logout", onClick: handleLogout },
    ];
  }
  else if (registered || logged) {
    links = [
      { to: "/", text: "Jobs" },
      { to: "/companies", text: "Companies" },
      { to: "/applications", text: "Applications" },
      { to: "/", text: "Logout", onClick: handleLogout },
    ];
  } else {
    links = [
      { to: "/", text: "Jobs" },
      { to: "/companies", text: "Companies" },
      { to: "/login", text: "Login" },
      { to: "/register", text: "Register" },
    ];
  }  

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography sx={{ fontSize: "1.5rem", paddingLeft: "10%" }}>
            JobHunter
          </Typography>
          {isMatch ? (
            <>
              <DrawerComp links={links} />
            </>
          ) : (
            <>
                <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end", marginRight: "100px" }}>
                    {links.map((link) => (
                        <Link
                        to={link.to}
                        style={{ textDecoration: "none", color: "inherit" }}
                        key={link.text}
                        onClick={link.onClick}
                        >
                            <Button color="inherit">{link.text}</Button>
                        </Link>
                    ))}
                </Box>
              
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
