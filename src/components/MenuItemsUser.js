import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";

import { useHistory, useLocation } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { useAuth } from "../context/AuthContext";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  active: {
    backgroundColor: theme.palette.action.selected,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.action.selected,
    },
  },
  text: {
    color: "white",
  },
  iconColor: {
    color: "white",
  },
}));

const MenuItemsUser = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { logout } = useAuth();

  const menuUser = [
    {
      text: "Profile",
      icon: <AccountBoxIcon className={classes.iconColor} />,
      path: "/profileuser",
    },
    {
      text: "Dashboard",
      icon: <DashboardIcon className={classes.iconColor} />,
      path: "/",
    },
    {
      text: "Log out",
      icon: <ExitToAppIcon className={classes.iconColor} />,
      path: "/login",
      type: "logout",
    },
  ];
  const onListItemClick = (menuItem) => {
    if (menuItem?.type === "logout") {
      logout();
    }
    history.push(menuItem.path);
  };
  return (
    <>
      <Divider />
      {menuUser.map((item) => (
        <ListItem
          key={item.text}
          button
          divider
          onClick={() => onListItemClick(item)}
          className={location.pathname === item.path ? classes.active : null}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} className={classes.text} />
        </ListItem>
      ))}
    </>
  );
};

export default MenuItemsUser;
