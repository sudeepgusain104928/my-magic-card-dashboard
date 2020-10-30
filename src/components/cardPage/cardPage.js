import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { store } from "../../redux/reducer";
import { fetchCardDetail } from "../../redux/cardDetailReducer";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import languageContext from "../../context/languageContext";
import themeContext from "../../context/themeContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import SpecificationTable from "./specificationTable";
import ShowError from "./error";
import classNames from "classnames";

var translation = require("../../configFiles/cardPageTranslations.js");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  lightHeading: {
    marginTop: "2rem",
    textAlign: "center",
    width: "100%",
    backgroundColor: "#d8d8d8",
    margin: "0 auto",
    fontSize: "3.4vmax",
    borderRadius: "10rem",
  },
  darkHeading: {
    marginTop: "2rem",
    textAlign: "center",
    width: "100%",
    backgroundColor: "#616161",
    margin: "0 auto",
    fontSize: "3.4vmax",
    borderRadius: "10rem",
  },
  loader: {
    margin: "2rem auto",
    textAlign: "center",
  },
  lightMainDetailsContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#ececec",
    marginTop: "1.5rem",
    padding: "1.5rem",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
    flexWrap: "wrap",
    borderRadius: "5rem",
  },
  darkMainDetailsContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#716f6f",
    marginTop: "1.5rem",
    padding: "1.5rem",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
    flexWrap: "wrap",
    borderRadius: "5rem",
  },

  lightMainContentTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    fontSize: "1.2vmax",
    width: "60vmax",
    margin: "0 2vmax",
    backgroundColor: "#fbfbfb",
    borderRadius: "3vmax",
    padding: "1vmax",
  },
  darkMainContentTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    fontSize: "1.2vmax",
    width: "60vmax",
    margin: "0 2vmax",
    backgroundColor: "#888686",
    borderRadius: "3vmax",
    padding: "1vmax",
  },
  img: {
    width: "20vmax",
    margin: "1vmax 2vmax",
  },
  subHeading: {
    marginTop: "4rem",
    textAlign: "center",
    width: "100%",
    margin: "0 auto",
    fontSize: "2vmax",
    marginBottom: "2rem",
  },
  rare: {
    boxShadow: "0px 10px 14px #c52b2b",
  },
  common: {
    boxShadow: "0px 0px 0px #c52b2b",
  },
  uncommon: {
    boxShadow: "0px 10px 14px #0fa977",
  },
  mythic: {
    boxShadow: "0px 10px 14px #b089e2",
  },
}));

function CardPage() {
  const classes = useStyles();

  const { id } = useParams();
  const { language } = React.useContext(languageContext);
  const { theme } = React.useContext(themeContext);

  useEffect(() => {
    store.dispatch(fetchCardDetail(id));
  }, [id]);

  const reducerData = useSelector(({ cardDetail }) => cardDetail);
  const card = reducerData.data;

  let translatableData = null;
  if (language !== "english" && !!card) {
    translatableData = card.foreignNames.filter(
      (details) => details.language.toLowerCase() === language.toLowerCase()
    )[0];
  }

  const name = card
    ? translatableData
      ? translatableData.name
      : card.name
    : null;
  const text = card
    ? translatableData
      ? translatableData.text
      : card.text
    : null;
  const imgUrl = card
    ? translatableData
      ? translatableData.imageUrl
      : card.imageUrl
    : null;
  const multiverseId = card
    ? translatableData
      ? translatableData.multiverseid
      : card.multiverseid
    : null;

  return (
    <Container maxWidth="xl">
      {reducerData.isLoading ? (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      ) : reducerData.error ? (
        <ShowError />
      ) : (
        <div>
          {!!card && (
            <div>
              <h1 className={classes[`${theme}Heading`]}>{name}</h1>
              <div
                className={classNames(
                  classes[`${card.rarity.toLowerCase()}`],
                  classes[`${theme}MainDetailsContainer`]
                )}
              >
                <img className={classes.img} src={imgUrl} alt="card" />
                <div className={classes[`${theme}MainContentTextContainer`]}>
                  <p>{text}</p>
                  <p>
                    {translation.multiverseId[language]}: {multiverseId}
                  </p>
                  <p>
                    {translation.rarity[language]}: {card.rarity}
                  </p>
                </div>
              </div>

              <h2 className={classes.subHeading}>
                {translation.specifications[language]}
              </h2>

              <div>
                <SpecificationTable card={card}></SpecificationTable>
              </div>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}

export default CardPage;
