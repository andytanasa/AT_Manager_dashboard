import React from "react";
import {
  Drawer,
  makeStyles,
  Typography,
  Avatar,
  List,
} from "@material-ui/core";

import { AppBar, Toolbar } from "@material-ui/core";
import { format } from "date-fns";
import { useAuth } from "../context/AuthContext";
import MenuItemsGeneral from "./MenuItemsGeneral";
import MenuItemsAdmin from "./MenuItemsAdmin";
import MenuItemsUser from "./MenuItemsUser";

const drawerWidth = 220;
const drawerHeight = 36;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  page: {
    background: '"#f9f9f9"',
    width: "100%",
  },
  drawer: {
    width: drawerWidth,
  },

  drawerPaper: {
    width: drawerWidth,
    background: "linear-gradient(to right , #67adea, #4791db)",
  },
  appbar: {
    width: `calc(100% - ${drawerWidth}px)`,
    height: `calc(100% -${drawerHeight}px)`,
    marginLeft: drawerWidth,
    background: "linear-gradient(to right, #4791db , #5047db)",
  },
  toolbar: theme.mixins.toolbar,
  date: {
    height: `calc(100% -${drawerHeight}px)`,
    textAlign: "center",
    paddingTop: 25,
    marginBottom: 6,
    color: "white",
    fontWeight: theme.typography.fontWeightBold,
  },
  avatar: {
    marginLeft: theme.spacing(2),
  },
  logo: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    color: theme.palette.primary.dark,
    flexGrow: 1,
  },
  title: {
    margin: "10px auto",
    color: theme.palette.primary.dark,
    height: drawerHeight,
  },
  text: {
    color: theme.palette.primary.dark,
  },
  logoImg: {
    fontSize: 20,

    borderRadius: "50%",
    border: "4px solid",
    borderColor: "theme.palette.primary.dark",
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    fontFamily: "Pacifico",
  },
  logoTitle: {
    color: "white",
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  const { currentUser } = useAuth();

  return (
    <div className={classes.root}>
      {/* App bar */}
      <AppBar elevation={0} className={classes.appbar}>
        <Toolbar>
          <Typography variant="h5" className={classes.logo}>
            <span className={classes.logoImg}>AT</span>{" "}
            <span className={classes.logoTitle}>Manager</span>
          </Typography>

          <Typography>
            Welcome {currentUser !== null ? currentUser?.firstName : null}
          </Typography>
          <Avatar
            src="/placeimg_100_100_people.jpg"
            className={classes.avatar}
          />
        </Toolbar>
      </AppBar>
      {/* Side bar */}
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        className={classes.drawer}
        variant="permanent"
        anchor="left"
      >
        <Typography className={classes.date}>
          {format(new Date(), "do MMMM Y")}
        </Typography>
        <List>
          {currentUser === null && <MenuItemsGeneral />}
          {currentUser && currentUser?.isAdmin && <MenuItemsAdmin />}
          {currentUser && !currentUser?.isAdmin && <MenuItemsUser />}
        </List>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
      ;
    </div>
  );
};

export default Layout;
