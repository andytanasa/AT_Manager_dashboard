import React from "react";

import { makeStyles } from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    display: "flex",
    justifyContent: "center",
  },

  media: {
    padding: theme.spacing(1),
    minWidth: 250,
    height: 250,
  },

  paragraph: {
    paddingLeft: theme.spacing(1),
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  cardHeader: {
    padding: 0,
  },
}));

const CardNews = ({ item }) => {
  const classes = useStyles();

  const dateToFormat = item.publishedAt.slice(0, 10);

  return (
    <Card className={classes.root}>
      {item.urlToImage !== null && (
        <CardMedia className={classes.media} image={item.urlToImage} />
      )}
      <div className={classes.cardContent}>
        <CardContent className={classes.content}>
          <CardHeader
            className={classes.cardHeader}
            title={item.title}
            subheader={dateToFormat}
          />
          <Typography variant="body2" color="textSecondary">
            {item.content}
          </Typography>
        </CardContent>

        <CardContent>
          <Typography paragraph>{item.description}</Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default CardNews;
