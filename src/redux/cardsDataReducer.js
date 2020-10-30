import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
var config = require("../configFiles/config.js");

export const fetchData = createAsyncThunk(
  "cardsData",
  async (filter, thunkAPI) => {
    let url = config.api;

    let api = `${url}/cards?pageSize=${filter.pageSize}&page=${filter.pageNumber}`;

    if (filter.colors.length > 1) {
      api = `${api}&colors=`;
      filter.colors.forEach((color) => {
        api = `${api}${color}|`;
      });
    }

    if (filter.superTypes !== null) {
      api = `${api}&superTypes=${filter.superTypes}`;
    }

    if (filter.rarity !== null) {
      api = `${api}&rarity=${filter.rarity}`;
    }

    if (filter.searchName !== null && filter.searchName !== "") {
      api = `${api}&name=${filter.searchName}`;
    }

    try {
      const resp = await fetch(api);
      let jsonData = await resp.json();
      let totalCount = 0;
      for (const header of resp.headers) {
        if (header[0] === "total-count") {
          totalCount = parseInt(header[1]);
          break;
        }
      }

      const sortedBy = {
        flip: 0,
        normal: 1,
        split: 2,
        "double-faced": 3,
        token: 4,
        plane: 5,
        scheme: 6,
        phenomenon: 7,
        leveler: 8,
        vanguard: 9,
        aftermath: 10,
      };

      if (!!jsonData.cards) {
        jsonData.cards.sort((a, b) => sortedBy[a.layout] - sortedBy[b.layout]);
      }

      jsonData = { ...jsonData, totalCount: totalCount };
      return jsonData;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

const fetchApiData = createSlice({
  name: "cardsDataReducer",
  initialState: { data: null, isLoading: false, error: false },
  reducers: {},
  extraReducers: {
    [fetchData.fulfilled]: (state, action) => {
      if (!!action.payload.cards) {
        return {
          data: action.payload,
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
    [fetchData.pending]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    [fetchData.rejected]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    },
  },
});

export default fetchApiData;
