import React, { useState } from "react";
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

const Navbar = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const links = [
    { to: "/", text: "Jobs" },
    { to: "/companies", text: "Companies" },
    { to: "/login", text: "Login" },
    { to: "/register", text: "Register" },
  ];

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
                <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end", marginRight: "200px" }}>
                    {links.map((link) => (
                        <Link
                        to={link.to}
                        style={{ textDecoration: "none", color: "inherit" }}
                        key={link.text}
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
