import { createSlice } from "@reduxjs/toolkit";

const searchString = createSlice({
  name: "searchString",
  initialState: "",
  reducers: {
    setSearchString: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSearchString } = searchString.actions;

export default searchString;
