import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { useHistory, useLocation } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";

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

const MenuItemsGeneral = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItemsGeneral = [
    {
      text: "Dashboard",
      icon: <DashboardIcon className={classes.iconColor} />,
      path: "/",
    },
    {
      text: "Log In",
      icon: <PersonIcon className={classes.iconColor} />,
      path: "/login",
    },
    {
      text: "Register",
      icon: <GroupAddIcon className={classes.iconColor} />,
      path: "/register",
    },
  ];
  return (
    <>
      <Divider />
      {menuItemsGeneral.map((item) => (
        <ListItem
          key={item.text}
          button
          divider
          onClick={() => history.push(item.path)}
          className={location.pathname === item.path ? classes.active : null}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} className={classes.text} />
        </ListItem>
      ))}
    </>
  );
};

export default MenuItemsGeneral;
