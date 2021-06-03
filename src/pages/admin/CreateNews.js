import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import NewsFromAdmin from "./NewsFromAdmin";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      width: "90%",
    },
  },
  btn: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  btnDate: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 20,

    paddingRight: theme.spacing(5),
  },
}));
const CreateNews = () => {
  const classes = useStyles();
  const [value, setValue] = useState({
    title: "",
    content: "",
  });
  const [date, setDate] = useState("");
  const newDate = new Date();

  const handleChange = (event, input) => {
    const newValue = { ...value, [input]: event.target.value };
    setValue(newValue);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      "https://dashboard-react-15caa-default-rtdb.firebaseio.com/news.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value, date),
      }
    )
      .then((res) => res.json())
      .then((value) => {
        setDate(newDate);
        setValue({ title: "", content: "", date: date });
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form className={classes.root} onSubmit={handleSubmit}>
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="News Title"
            multiline
            rowsMax={8}
            value={value.title}
            variant="outlined"
            onChange={(event) => handleChange(event, "title")}
          />
        </div>
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Create News/Info"
            multiline
            rows={10}
            variant="outlined"
            value={value.content}
            onChange={(event) => handleChange(event, "content")}
          />
        </div>
        <div className={classes.btnDate}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.btn}
          >
            Create News
          </Button>
          <Moment className={classes.date} format="YYYY/MM/DD" date={date} />
        </div>
      </form>

      <NewsFromAdmin />
    </>
  );
};
export default CreateNews;
