import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  word: {
    display: "flex",
    position: "absolute",
    bottom: theme.spacing(4),
    left: "50%",
    transform: "translateX(-50%)",
  },
  letter: {
    borderBottom: "3px solid #2980b9",
    display: "inline-flex",
    fontSize: "30px",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 3px",
    height: "50px",
    width: "20px",
  },
}));
const Word = ({ selectedWord, correctLetters }) => {
  const classes = useStyles();
  return (
    <div className={classes.word}>
      {selectedWord.split("").map((letter, i) => {
        return (
          <span className={classes.letter} key={i}>
            {correctLetters.includes(letter) ? letter : ""}
          </span>
        );
      })}
    </div>
  );
};

export default Word;
