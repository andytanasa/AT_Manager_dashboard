import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrongLettersContainer: {
    position: "absolute",
    top: "50px",
    right: "50px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
}));
const WrongLetters = ({ wrongLetters }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrongLettersContainer}>
      <div>
        {wrongLetters.length > 0 && <p>Wrong</p>}
        {wrongLetters
          .map((letter, i) => <span key={i}>{letter}</span>)
          .reduce(
            (prev, curr) => (prev === null ? [curr] : [prev, ", ", curr]),
            null
          )}
      </div>
    </div>
  );
};

export default WrongLetters;
