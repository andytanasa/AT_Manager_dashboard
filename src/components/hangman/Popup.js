import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { checkWin } from "./helpers/helpers";

const useStyles = makeStyles((theme) => ({
  popupContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    /* display: flex; */
    display: "none",
    alignItems: "center",
    justifyContent: "center",
  },
  popup: {
    background: "#2980b9",
    borderRadius: "5px",
    boxShadow: "0 15px 10px 3px rgba(0, 0, 0, 0.1)",
    padding: " 20px",
    textAlign: "center",
    "& button": {
      cursor: "pointer",
      backgroundColor: "#fff",
      color: "#2980b9",
      border: 0,
      marginTop: "20px",
      padding: "12px 20px",
      fontSize: "16px",
    },
  },
}));
const Popup = ({
  correctLetters,
  wrongLetters,
  selectedWord,
  setPlayable,
  playAgain,
}) => {
  const classes = useStyles();
  let finalMessage = "";
  let finalMessageRevealWord = "";
  let playable = true;

  useEffect(() => {
    setPlayable(playable);
  });

  if (checkWin(correctLetters, wrongLetters, selectedWord) === "win") {
    finalMessage = "Congratulations! You won! 😃";
    playable = false;
  } else if (checkWin(correctLetters, wrongLetters, selectedWord) === "lose") {
    finalMessage = "Unfortunately you lost. 😕";
    finalMessageRevealWord = `...the word was: ${selectedWord}`;
    playable = false;
  }

  return (
    <div
      className={classes.popupContainer}
      style={finalMessage !== "" ? { display: "flex" } : {}}
    >
      <div className={classes.popup}>
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
};

export default Popup;
