import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ProductStoreScreen: {
    isLoading: false,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      state.ProductStoreScreen.isLoading = action.payload.isLoading;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
