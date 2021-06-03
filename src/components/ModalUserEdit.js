import {
  Button,
  FormControl,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../firebase";

const useStyles = makeStyles((theme) => ({
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1040,
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    opacity: 0.5,
  },
  modalWrapper: {
    position: "fixed",
    top: 70,
    left: 0,
    zIndex: 1050,
    width: "90%",
    height: "90%",
    overflowX: "hidden",
    overflowY: "auto",
    outline: 0,
  },
  modal: {
    zIndex: 100,
    background: "white",
    position: "relative",
    margin: " 1.75rem auto",
    borderRadius: "3px",
    maxWidth: "500px",
    padding: theme.spacing(2),
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "95%",
  },
  submit: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  modalCloseButton: {
    color: theme.palette.primary.dark,
    padding: 0,
    fontSize: 30,
  },
}));

const genders = [{ value: "male" }, { value: "female" }, { value: "other" }];

const Modal = ({ isShowing, hide, userId }) => {
  const classes = useStyles();
  const [gender, setGender] = useState("");
  const [user, setUser] = useState(null);

  const db = firebase.firestore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!firebase) return;
        const usersRef = db.collection("users");
        const docs = await usersRef.get();

        docs.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          console.log(data);
          if (id === userId) {
            setUser(data);
          }
        });
      } catch (error) {
        console.log(error, "error");
      }
    };
    if (isShowing) {
      fetchUser();
    } else {
      setUser(null);
    }
  }, [isShowing, db, userId]);

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  return isShowing ? (
    <FormControl>
      <div className={classes.modalOverlay} />
      <div
        className={classes.modalWrapper}
        aria-modal
        aria-hidden
        tabIndex={-1}
        role="dialog"
      >
        <Paper className={classes.modal}>
          <div className={classes.modalHeader}>
            <Typography variant="h5">
              Edit user {user?.firstName} {user?.lastName}
            </Typography>
            <Button
              align="right"
              variant="contained"
              className={classes.modalCloseButton}
              data-dismiss="modal"
              aria-label="Close"
              onClick={hide}
            >
              <span aria-hidden="true">&times;</span>
            </Button>
          </div>
          <TextField
            fullWidth
            helperText="First Name"
            id="firstName"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            autoComplete="none"
            value={user?.firstName}
          />
          <TextField
            fullWidth
            helperText="Last Name"
            id="lastName"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            autoComplete="none"
            value={user?.lastName}
          />
          <TextField
            type="number"
            helperText="Age"
            id="age"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            autoComplete="none"
            value={user?.age}
          />
          <TextField
            fullWidth
            helperText="Address"
            id="address"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            autoComplete="none"
            value={user?.address}
          />
          <TextField
            select
            helperText="Gender"
            id="gender"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            autoComplete="none"
            value={gender}
            onChange={handleGender}
          >
            {genders.map((options, index) => (
              <MenuItem key={index} value={options.value}>
                {options.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            helperText="Email"
            id="email"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            autoComplete="none"
            value={user?.email}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit New Changes
          </Button>
        </Paper>
      </div>
    </FormControl>
  ) : null;
};
export default Modal;
