import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { useAuth } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
  },

  header: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    position: "relative",
    minWidth: 250,
    maxHeight: 300,
  },

  editIcon: {
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.secondary.light,
      borderRadius: "50%",
    },
  },
  input: {
    display: "none",
  },
  uploadIcon: {
    position: "absolute",
    left: "160px",
    bottom: "130px",
  },
  imgUploadPicture: {
    display: "block",
    width: 150,
    height: 150,
    marginBottom: theme.spacing(4),
  },
  form: {
    width: "100%",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  userInfoForm: {
    minWidth: "300px",
    padding: theme.spacing(2),
  },
}));

const UserAccountInfo = () => {
  const classes = useStyles();

  const { currentUser } = useAuth();

  const [user, setUser] = useState({
    firstName: currentUser?.firstName,

    lastName: currentUser?.lastName,

    email: currentUser?.email,

    phone: currentUser?.phone,

    address: currentUser?.address,

    age: currentUser?.age,

    gender: currentUser?.gender,

    nickName: currentUser?.nickName,

    occupation: currentUser?.occupation,

    birthday: currentUser?.birthday,

    educationLevel: currentUser?.educationLevel,

    facebook: currentUser?.facebook,

    linkedIn: currentUser?.linkedIn,
  });

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Avatar
          src="https://via.placeholder.com/250"
          className={classes.imgUploadPicture}
        />
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          type="file"
        />
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            className={classes.uploadIcon}
          >
            <PhotoCamera />
          </IconButton>
        </label>
        <Typography variant="h6" gutterBottom>
          {currentUser?.firstName.toUpperCase()}{" "}
          {currentUser?.lastName.toUpperCase()}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {currentUser?.email}
        </Typography>
      </div>
      <Paper className={classes.userInfoForm}>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            id="firstName"
            label="First Name"
            value={user?.firstName}
            multiline
          />
          <TextField
            id="lastName"
            label="Last Name"
            value={user?.lastName}
            multiline
          />
          <TextField
            id="email"
            label="Email"
            value={user?.email}
            fullWidth
            multiline
          />
          <TextField
            id="phoneNumber"
            label="Phone No."
            value={user?.phone}
            multiline
          />
          <TextField
            id="address"
            label="Address"
            value={user?.address}
            fullWidth
            multiline
          />
          <TextField id="gender" label="Gender" value={user?.gender} />
          <TextField
            id="nickname"
            label="Other Name/Nickname"
            value={user?.nickName}
            multiline
          />
          <TextField
            id="educationLevel"
            label="Education Level"
            value={user?.educationLevel}
            multiline
          />

          <TextField id="age" label="Age" value={user?.age} multiline />
          <TextField
            id="facebook"
            label="Facebook"
            value={user?.facebook}
            multiline
          />
          <TextField
            id="linkedIn"
            label="Linkedin"
            value={user?.linkedIn}
            multiline
          />
        </form>
      </Paper>
    </div>
  );
};

export default UserAccountInfo;
