import React, { useState } from "react";
import {
  TextField,
  makeStyles,
  MenuItem,
  Button,
  Divider,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useAuth } from "../../context/AuthContext";
import firebase from "../../firebase";

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
  btnSubmit: {
    display: "block",
    marginTop: theme.spacing(2),
  },
}));
const gender = [
  {
    value: "none",
    label: "None",
  },
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
  {
    value: "other",
    label: "Other",
  },
];

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UserAccountEdit = () => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const { currentUser, updateUser } = useAuth();

  const db = firebase.firestore();

  const [user, setUser] = useState({
    id: currentUser.id,
    firstName: currentUser?.firstName,
    lastName: currentUser?.lastName,
    email: currentUser?.email,
    phone: currentUser?.phone,
    address: currentUser?.address,
    age: currentUser?.age,
    gender: currentUser?.gender,
    nickName: currentUser?.nickName || "",
    educationLevel: currentUser?.educationLevel || "",
    facebook: currentUser?.facebook || "",
    linkedIn: currentUser?.linkedIn || "",
  });
  const handleChange = (event, input) => {
    const newUser = {
      ...user,
      [input]: event.target.value,
    };
    setUser(newUser);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userUpdate = db.collection("users").doc(currentUser.id);
      await userUpdate.update(user);
      updateUser(user);
      setError(false);
      setMessage("Record has been successfully updated.");
      setOpen(true);
    } catch (error) {
      console.log(error);
      setError(true);
      setMessage("Your record could not be updated.");
    }
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <div className={classes.userInfoForm}>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="firstName"
          label="First Name"
          value={user.firstName}
          onChange={(e) => handleChange(e, "firstName")}
        />
        <TextField
          id="lastName"
          label="Last Name"
          value={user.lastName}
          onChange={(e) => handleChange(e, "lastName")}
        />
        <TextField
          id="email"
          label="Email"
          value={user.email}
          fullWidth
          onChange={(e) => handleChange(e, "email")}
        />
        <TextField
          id="phoneNumber"
          label="Phone No"
          value={user.phone}
          onChange={(e) => handleChange(e, "phone")}
        />
        <TextField
          id="address"
          label="Address"
          value={user.address}
          fullWidth
          onChange={(e) => handleChange(e, "address")}
        />

        <TextField
          id="educationLevel"
          label="Education Level"
          value={user.educationLevel}
          fullWidth
          onChange={(e) => handleChange(e, "educationLevel")}
        />
        <Divider flexItem />
        <TextField
          id="nickname"
          label="Other Name/Nickname"
          value={user.nickName}
          onChange={(e) => handleChange(e, "nickName")}
        />

        <TextField
          id="gender"
          label="Gender"
          value={user.gender}
          select
          onChange={(e) => handleChange(e, "gender")}
        >
          {gender.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="age"
          label="Age"
          type="number"
          value={user.age}
          onChange={(e) => handleChange(e, "age")}
        />
        <Divider flexItem />
        <TextField
          id="facebook"
          label="Facebook"
          value={user.facebook}
          onChange={(e) => handleChange(e, "facebook")}
        />
        <TextField
          id="linkedIn"
          label="Linked In"
          value={user.linkedIn}
          onChange={(e) => handleChange(e, "linkedIn")}
        />
        <Button
          type="submit"
          className={classes.btnSubmit}
          variant="contained"
          color="primary"
        >
          Update Info
        </Button>
      </form>
      {error ? (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            {message}
          </Alert>
        </Snackbar>
      )}
      {/* {error ? (
        <Alert severity="error" error={true}>
          {message}
        </Alert>
      ) : (
        <Alert severity="success" error={false}>
          {message}
        </Alert>
      )} */}
    </div>
  );
};

export default UserAccountEdit;
