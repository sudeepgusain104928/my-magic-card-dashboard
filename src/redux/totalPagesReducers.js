import { createSlice } from "@reduxjs/toolkit";

const totalPages = createSlice({
  name: "totalPages",
  initialState: 0,
  reducers: {
    setTotalPages: (state, action) => {
      return action.payload;
    },
  },
});

export const { setTotalPages } = totalPages.actions;

export default totalPages;
