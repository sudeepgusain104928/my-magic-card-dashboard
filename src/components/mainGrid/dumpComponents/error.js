import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import languageContext from "../../../context/languageContext";

var text = require("../../../configFiles/mainGridTranslations");

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

  return <p className={classes.error}>{text.serverError[language]}</p>;
}
