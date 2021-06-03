import { Typography, Box, Paper } from "@material-ui/core";
import { useState, useEffect } from "react";
import CardNews from "../components/CardNews";
import { makeStyles } from "@material-ui/core/styles";
import CardNewsFromAdmin from "../components/CardNewsFromAdmin";

import { useNewsContext } from "../context/NewsContext";
import WeatherCard from "../components/WeatherCard";

import Hangman from "../components/hangman/Hangman";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  containerLeft: {
    flexGrow: 1,
    width: "50%",
    paddingLeft: theme.spacing(4),
    paddingTop: theme.spacing(4),
  },
  containerRight: {
    flexGrow: 1,
    width: "35%",
    paddingLeft: theme.spacing(4),
    paddingTop: theme.spacing(4),
  },
  box: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
    borderBottom: `3px solid ${theme.palette.primary.light}`,
  },
  weatherBox: {
    width: "100%",
  },
}));

const Showcase = () => {
  const classes = useStyles();
  const [cardContent, setCardContent] = useState([]);
  const [cardNewsAdmin, setCardNewsAdmin] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const news = useNewsContext();

  const apiKey = "d672914918644564a59999d514975a8b";
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setCardContent(data?.articles);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setCardNewsAdmin(news?.currentNews);
    setIsLoading(false);
  }, [news?.currentNews]);
  return (
    <Box className={classes.root}>
      <Box className={classes.containerLeft}>
        <Typography variant="h4" className={classes.title}>
          Top News
        </Typography>
        {isLoading ? (
          <Typography variant="subtitle2">
            Wait I'm Loading news for you
          </Typography>
        ) : (
          cardContent.map((item, index) => (
            <Box className={classes.box} xs={8} key={`news-item-${index}`}>
              <CardNews item={item} />
            </Box>
          ))
        )}
      </Box>
      <Box xs={4} className={classes.containerRight}>
        <Box xs={4} className={classes.weatherBox}>
          <WeatherCard />
        </Box>
        <Box xs={4}>
          <Paper>
            <Hangman />
          </Paper>
        </Box>
        <Typography variant="h4" className={classes.title}>
          News/Info from Admin
        </Typography>
        {isLoading ? (
          <Typography variant="subtitle2">
            Wait I'm Loading news for you
          </Typography>
        ) : (
          cardNewsAdmin.map((item, index) => (
            <Box className={classes.box} key={`news-item-db-${index}`}>
              <CardNewsFromAdmin item={item} />
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default Showcase;
