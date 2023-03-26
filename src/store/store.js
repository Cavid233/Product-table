import { configureStore } from "@reduxjs/toolkit";

import productsSlice from "./products-slice";

const store = configureStore({
  reducer: {
    products: productsSlice,
  },
});

export default store;