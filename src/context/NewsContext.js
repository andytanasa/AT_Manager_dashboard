import React, { useContext, useState, useEffect } from "react";
import firebase from "../firebase";

const NewsContext = React.createContext();

export function useNewsContext() {
  return useContext(NewsContext);
}

export function NewsProvider({ children }) {
  const [currentNews, setCurrentNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = firebase.database();

  useEffect(() => {
    const ref = db.ref("/news");
    ref.on(
      "value",
      function (snapshot) {
        const data = snapshot.val() || {};

        const arr_obj = Object.keys(data).map((key) => ({ [key]: data[key] }));

        setCurrentNews(arr_obj);

        setLoading(false);
      },
      function (errorObject) {
        console.log("error", errorObject.code);
      }
    );
  }, [db]);
  const value = {
    currentNews,
  };
  return (
    <NewsContext.Provider value={value}>
      {!loading && children}
    </NewsContext.Provider>
  );
}
