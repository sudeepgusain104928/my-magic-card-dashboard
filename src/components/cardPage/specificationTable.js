import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import languageContext from "../../context/languageContext";
import themeContext from "../../context/themeContext";

var translation = require("../../configFiles/specificationTableTranslations.js");

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
  container: {
    width: "90%",
    margin: "0 auto",
    marginBottom: "2rem",
  },
  tableHead: {
    fontSize: "1.4vmax",
    margin: "1rem",
  },
  lightHeaderRow: {
    backgroundColor: "lightGray",
  },
  darkHeaderRow: {
    backgroundColor: "#6b6b6b",
  },
  tableCell: {
    fontSize: "1.1vmax",
  },
});

export default function SpecificationTable({ card }) {
  const classes = useStyles();
  const { language } = React.useContext(languageContext);
  const { theme } = React.useContext(themeContext);

  const propertiesToDisplay = [
    "manaCost",
    "cmc",
    "colors",
    "types",
    "rarity",
    "set",
    "setName",
    "artist",
    "layout",
    "printings",
  ];

  let properties = Object.keys(card);
  properties = properties.filter((prop) => propertiesToDisplay.includes(prop));

  function camelCaseToString(input) {
    const converted = input

      .replace(/([A-Z])/g, " $1")

      .replace(/^./, function (str) {
        return str.toUpperCase();
      });

    return converted;
  }

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow className={classes[`${theme}HeaderRow`]}>
            <TableCell className={classes.tableHead} align="center">
              {translation.property[language]}
            </TableCell>
            <TableCell className={classes.tableHead} align="center">
              {translation.details[language]}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {properties.map((prop, ind) => (
            <TableRow key={ind}>
              <TableCell className={classes.tableCell} align="center">
                {camelCaseToString(prop)}
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                {typeof card[prop] === "object"
                  ? card[prop].join()
                  : card[prop]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
