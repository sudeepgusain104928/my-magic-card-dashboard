import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import languageContext from "../../context/languageContext";

var translation = require("../../configFiles/cardPageTranslations.js");

const useStyles = makeStyles((theme) => ({
  error: {
    fontSize: "3rem",
    textAlign: "center",
    margin: "4rem auto",
    color: "red",
  },
}));

export default function ShowError() {
  const { language } = React.useContext(languageContext);

  const classes = useStyles();

  return (
    <p data-testid="error" className={classes.error}>
      {translation.serverError[language]}
    </p>
  );
}
