import { createSlice } from "@reduxjs/toolkit";

const handleSearchPopup = createSlice({
  name: "searchPopper",
  initialState: false,
  reducers: {
    setSearchPopup: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSearchPopup } = handleSearchPopup.actions;

export default handleSearchPopup;
