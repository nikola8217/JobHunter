import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const DrawerComp = ({ links }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {links.map((link) => (
          <Link
            to={link.to}
            style={{ textDecoration: "none", color: "inherit" }}
            key={link.text}
          >
            <ListItem button>
              <ListItemText primary={link.text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
        sx={{ ml: 'auto' }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{ 
            style: { 
                width: "100%", 
                top: 0, 
                bottom: 0, 
                backgroundColor: theme.palette.info.main,
                color: theme.palette.common.white,
            } 
        }}
      >
        {list()}
      </Drawer>
    </>
  );
};

export default DrawerComp;
