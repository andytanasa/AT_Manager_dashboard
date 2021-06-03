import React from "react";

import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "200px",
    marginBottom: theme.spacing(2),
  },

  title: {},

  paragraph: {
    paddingLeft: theme.spacing(1),
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
}));

const CardNewsFromAdmin = ({ item }) => {
  const classes = useStyles();

  const news = Object.values(item)[0];

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textPrimary" variant="h4">
          {news?.title}
        </Typography>
      </CardContent>
      <CardContent className={classes.content}>
        <Typography gutterBottom paragraph>
          {news?.content}
        </Typography>
        <Typography paragraph variant="body2">
          This news was created on:{" "}
          <Moment format="YYYY/MM/DD">{news?.date}</Moment>{" "}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardNewsFromAdmin;
