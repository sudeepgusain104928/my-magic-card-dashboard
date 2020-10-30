import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { store } from "../../redux/reducer";
import { fetchData } from "../../redux/cardsDataReducer";
import languageContext from "../../context/languageContext";
import Pagination from "../pagination";
import ContentContainer from "./dumpComponents/contentContainer";
import ShowError from "./dumpComponents/error";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "1rem",
  },
  loader: {
    margin: "2rem auto",
    textAlign: "center",
  },
}));

export default function MainGrid() {
  const classes = useStyles();

  const reducerData = useSelector(({ filters, cardsData }) => {
    return { filters, cardsData };
  });
  const { language } = React.useContext(languageContext);
  const { data, error, isLoading } = reducerData.cardsData;

  useEffect(() => {
    store.dispatch(fetchData(reducerData.filters));
  }, [reducerData.filters, language]);

  return (
    <div className={classes.root}>
      <div>
        {isLoading ? (
          <div className={classes.loader}>
            <CircularProgress data-testid="loader" />
          </div>
        ) : error ? (
          <ShowError data-testid="error" />
        ) : !!data && data.cards.length === 0 ? (
          <p className={classes.noMatch}>No cards found</p>
        ) : (
          <div>
            <Pagination />

            {!!data &&
              data.cards.map((card, ind) => {
                const cardId = card.id;
                if (language !== "english" && !!card.foreignNames) {
                  card = card.foreignNames.filter(
                    (lang) =>
                      lang.language.toLowerCase() === language.toLowerCase()
                  )[0];
                }

                return (
                  !!card && (
                    <Grid
                      data-testid="grid"
                      key={ind}
                      item
                      xl={12}
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                    >
                      <ContentContainer card={card} id={cardId} />
                    </Grid>
                  )
                );
              })}
            <Pagination />
          </div>
        )}
      </div>
    </div>
  );
}
