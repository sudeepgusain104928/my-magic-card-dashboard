import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import { store } from "../redux/reducer";
import { setSearchString } from "../redux/searchBoxReducers/searchStringReducers";
import { fetchSearchResults } from "../redux/searchBoxReducers/autoCompleteReducer";
import { setSearchName } from "../redux/filtersReducer";
import { useSelector } from "react-redux";
import { setSearchPopup } from "../redux/searchBoxReducers/searchPopperReducer";
import languageContext from "../context/languageContext";
import { Link } from "react-router-dom";

var text = require("../configFiles/searchListTranslations.js");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "120%",
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
  loading: {
    fontSize: "1.5rem",
  },
  listItemText: {
    color: "inherit",
    width: "100%",
    height: "100%",
  },

  link: {
    textDecoration: "none",
    color: "inherit",
    width: "100%",
  },
}));

export default function VirtualizedList() {
  const classes = useStyles();
  const reducerData = useSelector(({ searchString, autoComplete }) => {
    return { searchString, autoComplete };
  });

  const { language } = React.useContext(languageContext);

  let uniqueNames = null;

  if (!!reducerData.autoComplete.data) {
    uniqueNames = reducerData.autoComplete.data;
  }
  useEffect(() => {
    const promise = store.dispatch(
      fetchSearchResults({
        name: reducerData.searchString,
        language: language,
      })
    );
    return () => {
      promise.abort();
    };
  }, [reducerData.searchString, language]);

  function renderRow(props) {
    const { index, style } = props;

    return (
      <ListItem button style={style} key={index}>
        <Link className={classes.link} to={`/`}>
          {!!uniqueNames && (
            <ListItemText
              className={classes.listItemText}
              primary={uniqueNames[index]}
              onClick={() => {
                store.dispatch(setSearchString(uniqueNames[index]));
                store.dispatch(
                  setSearchName({ searchName: uniqueNames[index] })
                );
                store.dispatch(setSearchPopup(false));
              }}
            />
          )}
        </Link>
      </ListItem>
    );
  }

  renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };

  return (
    <div className={classes.root}>
      {reducerData.autoComplete.isLoading ? (
        <div className={classes.loading}>{text.loading[language]}</div>
      ) : (
        <div>
          {!!uniqueNames && (
            <div>
              {uniqueNames.length === 0 ? (
                <div>{text.notFound[language]}</div>
              ) : (
                <div>
                  <FixedSizeList
                    height={300}
                    width={"28vmax"}
                    itemSize={46}
                    itemCount={uniqueNames.length}
                  >
                    {renderRow}
                  </FixedSizeList>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
