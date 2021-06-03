import { Divider, List, ListItem, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "500px",
    minHeight: 300,
    marginBottom: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
  },
  locationName: {
    padding: theme.spacing(2),
    borderBottom: `2px solid ${theme.palette.primary.light}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconLocation: {
    cursor: "pointer",
  },
  mainSection: {
    minHeight: 150,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  footerList: {
    fontSize: 11,
    fontFamily: "Roboto",
    justifyContent: "space-between",
  },

  info: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  paperDate: {
    textAlign: "center",
  },
  paperTempFooter: {
    textAlign: "center",
  },
  mainSectionTemp: {
    textAlign: "right",
  },
}));
const WeatherCard = () => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      await navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    };
    fetchData();
  }, [lat, long]);
  useEffect(() => {
    setIsLoading(false);
    async function fetchApi() {
      await fetch(
        `${process.env.REACT_APP_API_URL}/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${lat},${long}&days=5&aqi=no&alerts=no`
      )
        .then(handleResponse)
        .then((result) => {
          const objArr = Object.values(result);
          setData(objArr);
          setIsLoading(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    fetchApi();
  }, [lat, long]);

  async function onClickIconLocation() {
    await fetch(
      `${process.env.REACT_APP_API_URL}/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${lat},${long}&days=5&aqi=no&alerts=no`
    )
      .then(handleResponse)
      .then((result) => {
        const objArr = Object.values(result);

        setData(objArr);
        setIsLoading(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error("This is an error from Weather API");
  };

  return (
    <Paper elevation={1} variant="outlined" className={classes.root}>
      {isLoading ? (
        <>
          <Typography variant="h6" className={classes.locationName}>
            {data[0].region}
            <MyLocationIcon
              className={classes.iconLocation}
              onClick={onClickIconLocation}
            />
          </Typography>
          <div className={classes.mainSection}>
            <div className={classes.iconApi}>
              <img src={data[1]["condition"]["icon"]} alt="icon" />
            </div>
            <div className={classes.info}>
              <Typography variant="h3">
                {Math.floor(data[1]["temp_c"])}&#8451;
              </Typography>
            </div>
            <div className={classes.mainSectionTemp}>
              <Typography variant="h6">
                {data[0].region}, {data[0].country}
              </Typography>
              <Typography variant="h6">
                {data[1]["condition"]["text"]}
              </Typography>
              <Typography variant="body1">
                <Moment format="dddd">{data[2]["forecastday"][0].date}</Moment>
              </Typography>
            </div>
          </div>
          <div className={classes.footer}>
            <Divider variant="middle" />

            <List>
              <ListItem>
                <Paper className={classes.paper} variant="outlined">
                  <div className={classes.paperDate}>
                    <Moment format="ddd">
                      {data[2]["forecastday"][0].date}
                    </Moment>
                  </div>
                  <div>
                    <img
                      src={data[2]["forecastday"][0].day.condition.icon}
                      alt="icon"
                    />
                  </div>
                  <div className={classes.paperTempFooter}>
                    {Math.ceil(data[2]["forecastday"][0].day["maxtemp_c"])}
                    <sup>o</sup>-
                    {Math.floor(data[2]["forecastday"][0].day["mintemp_c"])}
                    <sup>o</sup>
                  </div>
                </Paper>

                <Paper className={classes.paper} variant="outlined">
                  <div className={classes.paperDate}>
                    <Moment format="ddd">
                      {data[2]["forecastday"][1].date}
                    </Moment>
                  </div>
                  <div>
                    <img
                      src={data[2]["forecastday"][1].day.condition.icon}
                      alt="icon"
                    />
                  </div>
                  <div className={classes.paperTempFooter}>
                    {Math.ceil(data[2]["forecastday"][1].day["maxtemp_c"])}
                    <sup>o</sup>-
                    {Math.floor(data[2]["forecastday"][1].day["mintemp_c"])}
                    <sup>o</sup>
                  </div>
                </Paper>
                <Paper className={classes.paper} variant="outlined">
                  <div className={classes.paperDate}>
                    <Moment format="ddd">
                      {data[2]["forecastday"][2].date}
                    </Moment>
                  </div>
                  <div>
                    <img
                      src={data[2]["forecastday"][2].day.condition.icon}
                      alt="icon"
                    />
                  </div>
                  <div className={classes.paperTempFooter}>
                    {Math.ceil(data[2]["forecastday"][2].day["maxtemp_c"])}
                    <sup>o</sup>-
                    {Math.floor(data[2]["forecastday"][2].day["mintemp_c"])}
                    <sup>o</sup>
                  </div>
                </Paper>
                <List className={classes.footerList}>
                  <ListItem>Wind Speed: {data[1]["wind_kph"]} km/h</ListItem>
                  <Divider variant="middle" component="li" />
                  <ListItem>Wind Direction: {data[1]["wind_dir"]}</ListItem>
                  <Divider variant="middle" component="li" />
                  <ListItem>Humidity: {data[1]["humidity"]}% </ListItem>
                  <Divider variant="middle" component="li" />
                  <ListItem>
                    Feels Like: {Math.floor(data[1]["feelslike_c"])} &#8451;
                  </ListItem>
                  <Divider variant="middle" component="li" />
                  <ListItem>Pressure: {data[1]["pressure_mb"]} mb</ListItem>
                  <Divider variant="middle" component="li" />

                  <ListItem>Wind gust: {data[1]["gust_kph"]} km/h</ListItem>
                  <Divider variant="middle" component="li" />
                  <ListItem>UV index: {data[1]["uv"]}</ListItem>
                </List>
              </ListItem>
              <Divider variant="middle" component="li" />
            </List>
          </div>
        </>
      ) : (
        <>
          <Typography variant="h6" className={classes.locationName}>
            --
            <MyLocationIcon
              className={classes.iconLocation}
              onClick={onClickIconLocation}
            />
          </Typography>
          <div className={classes.mainSection}>
            <div className={classes.mainSectionTemp}>
              <Typography variant="h6">--</Typography>
              <Typography variant="h5">-- &#8451;</Typography>
            </div>
            <div className={classes.iconApi}>
              <img alt="icon" />
            </div>
          </div>
        </>
      )}
    </Paper>
  );
};

export default WeatherCard;
