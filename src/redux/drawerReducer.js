import { createSlice } from "@reduxjs/toolkit";

const handleDrawer = createSlice({
  name: "drawerHandler",
  initialState: false,
  reducers: {
    setDrawer: (state, action) => {
      return action.payload;
    },
  },
});

export const { setDrawer } = handleDrawer.actions;

export default handleDrawer;
