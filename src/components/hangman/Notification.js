import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  notificationContainer: {
    backgroundColor: theme.palette.primary.light,

    padding: theme.spacing(2),
    transition: "transform 0.3s ease-in-out",
  },
  show: {
    transform: "translateY(-10px)",
  },
  hidden: {
    display: "none",
  },
}));
const Notification = ({ showNotification }) => {
  const classes = useStyles();
  return (
    <div
      className={`${classes.notificationContainer}  ${
        showNotification ? classes.show : classes.hidden
      }`}
    >
      <Typography component="p">
        You have already entered this letter
      </Typography>
    </div>
  );
};

export default Notification;
