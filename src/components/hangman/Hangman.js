import React, { useEffect, useState } from "react";
import Figure from "./Figure";
import Header from "./Header";
import WrongLetters from "./WrongLetters";
import Word from "./Word";
import { makeStyles } from "@material-ui/core";
import Notification from "./Notification";
import Popup from "./Popup";
import { showNotification as show } from "./helpers/helpers";

const words = [
  "application",
  "programming",
  "interface",
  "wizard",
  "abruptly",
  "lucky",
  "subway",
  "puppy",
  "funny",
  "pixel",
  "buffalo",
  "jelly",
  "syndrome",
  "gossip",
  "quiz",
  "wizard",
  "zombie",
  "zipper",
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const useStyles = makeStyles((theme) => ({
  gameContainer: {
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    height: "350px",
    width: "350px",
  },
  header: {
    textAlign: "center",
  },
}));
const Hangman = () => {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }
  return (
    <>
      <div className={classes.header}>
        <Header />
      </div>
      <div className={classes.gameContainer}>
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification showNotification={showNotification} />
    </>
  );
};

export default Hangman;
