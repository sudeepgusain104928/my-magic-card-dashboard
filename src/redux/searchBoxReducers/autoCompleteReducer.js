import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
var config = require("../../configFiles/config.js");

export const fetchSearchResults = createAsyncThunk(
  "cardNames",
  async ({ name, language }, thunkAPI) => {
    let url = config.api;
    if (language === "english") {
      language = "";
    }

    let api = `${url}/cards?name=${name}&language=${language}&pageSize=10`;
    let cardNames;
    let uniqueNames;

    try {
      const resp = await fetch(api, {
        signal: thunkAPI.signal,
      });
      let jsonData = await resp.json();

      if (!!jsonData.cards) {
        if (language === "") {
          console.log("ENG");
          cardNames = jsonData.cards.map((card) => card.name);
          uniqueNames = [...new Set(cardNames)];
          uniqueNames = { uniqueNames, recieved: true };
        } else {
          cardNames = jsonData.cards.map((card) =>
            card.foreignNames.filter(
              (lang) => lang.language.toLowerCase() === language.toLowerCase()
            )
          );
          cardNames = cardNames.map((card) => card[0].name);
          uniqueNames = [...new Set(cardNames)];
          uniqueNames = { uniqueNames, recieved: true };
        }

        return uniqueNames;
      }

      return jsonData;
    } catch (err) {
      return err;
    }
  }
);

const fetchAutoComplete = createSlice({
  name: "cardNameSlice",
  initialState: { data: null, isLoading: false, error: false },
  reducers: {},
  extraReducers: {
    [fetchSearchResults.fulfilled]: (state, action) => {
      if (!!action.payload.recieved) {
        return {
          data: action.payload.uniqueNames,
          isLoading: false,
          error: null,
        };
      } else {
        return {
          ...state,
          isLoading: false,
          error: true,
        };
      }
    },
    [fetchSearchResults.pending]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    [fetchSearchResults.rejected]: (state, action) => {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    },
  },
});

export default fetchAutoComplete;
