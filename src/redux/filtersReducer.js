import { createSlice } from "@reduxjs/toolkit";

const filtersInitialState = {
  colors: [],
  superTypes: null,
  rarity: null,
  pageSize: "25",
  pageNumber: "1",
  searchName: null,
};

const handleFilters = createSlice({
  name: "filtersHandler",
  initialState: filtersInitialState,
  reducers: {
    setColors: (state, action) => {
      return {
        ...state,
        colors: action.payload.colors,
      };
    },
    setSuperTypes: (state, action) => {
      return {
        ...state,
        superTypes: action.payload.superTypes,
      };
    },
    setRarity: (state, action) => {
      return {
        ...state,
        rarity: action.payload.rarity,
      };
    },

    setPageSize: (state, action) => {
      return {
        ...state,
        pageSize: action.payload.pageSize,
      };
    },

    setPageNumber: (state, action) => {
      return {
        ...state,
        pageNumber: action.payload.pageNumber,
      };
    },

    setSearchName: (state, action) => {
      return {
        ...state,
        searchName: action.payload.searchName,
      };
    },
  },
});

export const {
  setColors,
  setSuperTypes,
  setRarity,
  setPageSize,
  setPageNumber,
  setSearchName,
} = handleFilters.actions;

export default handleFilters;
