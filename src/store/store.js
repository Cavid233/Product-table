import { configureStore } from "@reduxjs/toolkit";

import productsSlice from "./products-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    products: productsSlice,
    ui: uiSlice,
  },
});

export default store;