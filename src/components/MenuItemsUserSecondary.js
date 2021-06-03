import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Box, Paper, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import UserAccountInfo from "../pages/user/UserAccountInfo";
import UserAccountEdit from "../pages/user/UserAccountEdit";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  secondeMenu: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(0),
    padding: theme.spacing(2),
  },
}));
const MenuItemsUserSecondary = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper className={classes.secondeMenu}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="user tabs "
      >
        <Tab label="Account Info" />
        <Tab label="Edit Account" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <UserAccountInfo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserAccountEdit />
      </TabPanel>
    </Paper>
  );
};

export default MenuItemsUserSecondary;
