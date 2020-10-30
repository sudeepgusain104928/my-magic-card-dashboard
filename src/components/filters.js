import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { store } from "../redux/reducer";
import {
  setColors,
  setPageSize,
  setSuperTypes,
  setRarity,
} from "../redux/filtersReducer";
import { useSelector } from "react-redux";
import languageContext from "../context/languageContext";

var text = require("../configFiles/filterTranslations.js");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    margin: "2rem auto",
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function Filters() {
  const classes = useStyles();
  const reducerData = useSelector(({ filters }) => {
    return { filters };
  });
  let translatedColorData = [];
  let translatedSuperTypeData = null;
  let translatedRarityData = null;

  const { language } = React.useContext(languageContext);

  if (
    reducerData.filters.colors !== null &&
    reducerData.filters.colors !== undefined &&
    reducerData.filters.colors.length > 0
  ) {
    translatedColorData = reducerData.filters.colors.map((val) => {
      return { caption: text[val][language], value: val };
    });
  } else {
    translatedColorData = [];
  }

  if (
    reducerData.filters.superTypes !== null &&
    reducerData.filters.superTypes !== undefined
  ) {
    translatedSuperTypeData = {
      caption: text[reducerData.filters.superTypes][language],
      value: reducerData.filters.superTypes,
    };
  } else {
    translatedSuperTypeData = null;
  }

  if (
    reducerData.filters.rarity !== null &&
    reducerData.filters.rarity !== undefined
  ) {
    translatedRarityData = {
      caption: text[reducerData.filters.rarity][language],
      value: reducerData.filters.rarity,
    };
  } else {
    translatedRarityData = null;
  }

  const fullColorList = [
    { caption: text.Black[language], value: "Black" },
    { caption: text.Blue[language], value: "Blue" },
    { caption: text.Red[language], value: "Red" },
    { caption: text.White[language], value: "White" },
    { caption: text.Green[language], value: "Green" },
  ];

  const fullSuperTypesList = [
    { caption: text.Basic[language], value: "Basic" },
    { caption: text.Legendary[language], value: "Legendary" },
    { caption: text.Ongoing[language], value: "Ongoing" },
    { caption: text.Snow[language], value: "Snow" },
    { caption: text.World[language], value: "World" },
  ];

  const fullRarityList = [
    { caption: text.Common[language], value: "Common" },
    { caption: text.Uncommon[language], value: "Uncommon" },
    { caption: text.Rare[language], value: "Rare" },
    { caption: text.Mythic[language], value: "Mythic" },
  ];

  const fullPageSizeList = ["10", "25", "50"];

  return (
    <div className={classes.root}>
      <Autocomplete
        data-testid="autocompleteColor"
        multiple
        options={fullColorList}
        getOptionLabel={(option) => option.caption}
        filterSelectedOptions
        value={[...translatedColorData]}
        getOptionSelected={(option, value) => option.value === value.value}
        onChange={(event, value) => {
          store.dispatch(setColors({ colors: value.map((val) => val.value) }));
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={text.selectColor[language]}
          />
        )}
      />

      <Autocomplete
        options={fullSuperTypesList}
        filterSelectedOptions
        value={translatedSuperTypeData}
        getOptionSelected={(option, value) => option.value === value.value}
        onChange={(event, value) => {
          if (value !== null && value !== undefined) {
            store.dispatch(setSuperTypes({ superTypes: value.value }));
          } else {
            store.dispatch(setSuperTypes({ superTypes: null }));
          }
        }}
        getOptionLabel={(option) => option.caption}
        renderInput={(params) => (
          <TextField
            {...params}
            label={text.selectSuperType[language]}
            variant="outlined"
          />
        )}
      />

      <Autocomplete
        options={fullRarityList}
        filterSelectedOptions
        value={translatedRarityData}
        getOptionSelected={(option, value) => option.value === value.value}
        onChange={(event, value) => {
          if (value !== null && value !== undefined) {
            store.dispatch(setRarity({ rarity: value.value }));
          } else {
            store.dispatch(setRarity({ rarity: null }));
          }
        }}
        getOptionLabel={(option) => option.caption}
        renderInput={(params) => (
          <TextField
            {...params}
            label={text.selectRarity[language]}
            variant="outlined"
          />
        )}
      />

      <Autocomplete
        options={fullPageSizeList}
        filterSelectedOptions
        value={reducerData.filters.pageSize}
        onChange={(event, value) => {
          if (value === null || value === undefined) {
            if (reducerData.filters.pageSize !== "25") {
              store.dispatch(setPageSize({ pageSize: "25" }));
            }
          } else {
            store.dispatch(setPageSize({ pageSize: value }));
          }
        }}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            label={text.selectPageSize[language]}
            variant="outlined"
          />
        )}
      />
    </div>
  );
}
