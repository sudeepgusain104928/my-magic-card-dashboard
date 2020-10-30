import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
var config = require("../configFiles/config.js");

export const fetchCardDetail = createAsyncThunk(
  "cardDetails",
  async (id, thunkAPI) => {
    let url = config.api;

    let api = `${url}/cards/${id}`;

    try {
      const resp = await fetch(api);
      let jsonData = await resp.json();
      return jsonData;
    } catch (err) {
      return err;
    }
  }
);

const getCardDetails = createSlice({
  name: "cardDetailsSlice",
  initialState: { data: null, isLoading: false, error: false },
  reducers: {},
  extraReducers: {
    [fetchCardDetail.fulfilled]: (state, action) => {
      if (!!action.payload.card) {
        return {
          data: action.payload.card,
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
    [fetchCardDetail.pending]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    [fetchCardDetail.rejected]: (state, action) => {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    },
  },
});

export default getCardDetails;
