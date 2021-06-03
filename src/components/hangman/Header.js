import React from "react";
import { Typography } from "@material-ui/core";
const Header = () => {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        HangMan
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Find the hidden word - Enter a letter
      </Typography>
    </>
  );
};

export default Header;
