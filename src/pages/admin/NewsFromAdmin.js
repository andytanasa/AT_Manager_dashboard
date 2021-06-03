import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    minHeight: 50,
    padding: theme.spacing(1),
    display: "flex",
  },

  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
  },

  media: {
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },

  paragraph: {
    paddingLeft: theme.spacing(1),
  },
  deleteBtn: {
    alignSelf: "flex-end",
    justifySelf: "flex-end",
    marginBottom: theme.spacing(2),
  },
  btnDate: {
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-end",
    marginRight: theme.spacing(2),
  },
}));

const NewsFromAdmin = () => {
  const classes = useStyles();

  const [arrNews, setArrNews] = useState([]);

  const database = firebase.database();
  const newsFromDb = database.ref("news/");

  useEffect(() => {
    if (!database) return;
    try {
      newsFromDb.on("value", (snapshot) => {
        const arr = [];

        snapshot.forEach((snap) => {
          const key = snap.key;
          const data = snap.val();
          arr.push({ key: key, data: data });
        });
        setArrNews(arr);
      });
    } catch (error) {
      console.error(error, "this is an error from db");
    }
  }, [database]);

  const onDeleteFromFirebase = (key) => {
    let newArr = [];

    newArr = arrNews
      .filter((x) => {
        return x.key !== key;
      })
      .map((y) => {
        return y.data;
      });
    try {
      newsFromDb.set(newArr);
    } catch (error) {
      console.log(error, "this is an error");
    }
  };

  return (
    <List className={classes.root}>
      {arrNews.map((item) => (
        <ListItem key={item.key}>
          <ListItemText id="switch-list-label-post">
            <Paper
              variant="outlined"
              square
              elevation={1}
              className={classes.paper}
            >
              {" "}
              <div className={classes.content}>
                <div className={classes.title}>
                  News title: {item.data.title}
                </div>
                <div>Content: {item.data.content}</div>
              </div>
              <div className={classes.btnDate}>
                <Button
                  className={classes.deleteBtn}
                  variant="contained"
                  color="secondary"
                  onClick={() => onDeleteFromFirebase(item.key)}
                >
                  X
                </Button>
                <Typography variant="p">
                  Created on: <br />
                  <Moment format="YYYY/MM/DD" date={item.date} />
                </Typography>
              </div>
            </Paper>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default NewsFromAdmin;
