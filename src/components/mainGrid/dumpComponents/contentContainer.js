import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import themeContext from "../../../context/themeContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "5rem",
  },

  lightPaper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "white",
    borderStyle: "solid",
    borderColor: "#bfbdbd",
    boxShadow: "2px 9px 20px grey",
    margin: "1rem",
  },
  darkPaper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderStyle: "solid",
    boxShadow: "2px 9px 20px grey",
    margin: "1rem",
    borderColor: "#bfbdbd",
    backgroundColor: "#9c9c9c",
  },
  lightCardContentContainer: {
    display: "flex",
    flexDirection: "row",
    background: "rgba(210,210,210,0.43)",
    justifyContent: "space-around",
    width: "100%",
    flexWrap: "wrap",
    minWidth: "100%",
  },
  darkCardContentContainer: {
    display: "flex",
    flexDirection: "row",
    background: "rgb(0 0 0 / 72%)",
    justifyContent: "space-around",
    width: "100%",
    flexWrap: "wrap",
    minWidth: "100%",
  },
  cardTextContainer: {
    width: "70%",
    margin: "1rem",
    marginTop: "0.5rem",
  },

  cardImg: {
    marginTop: "1rem",
    marginBottom: "1rem",
    maxWidth: "25%",
    minWidth: "18%",
  },
  cardName: {
    display: "inline-block",
    "&:hover": {
      textDecoration: "underline",
    },
  },

  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function ContentContainer({ card, id }) {
  const classes = useStyles();
  const { theme } = React.useContext(themeContext);

  return (
    <Paper className={classes[`${theme}Paper`]}>
      <div className={classes[`${theme}CardContentContainer`]}>
        <img className={classes.cardImg} src={card.imageUrl} alt={card.name} />
        <div className={classes.cardTextContainer}>
          <Link to={`/${id}`} className={classes.link}>
            <h2 className={classes.cardName}>{card.name}</h2>
          </Link>
          <p>{card.text}</p>
        </div>
      </div>
    </Paper>
  );
}
