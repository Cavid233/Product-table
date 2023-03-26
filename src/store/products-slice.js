import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state,action) => {
        state.products = action.payload.products;
    },
    deleteProduct: (state,action) => {
        state.products = state.products.filter(product => product.id !== action.payload.productId);
    }
    // changeLng: (state, action) => {
    //   state.shortName = action.payload.shortName;
    //   state.name = action.payload.name;
    //   state.id = action.payload.id;
    // },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice.reducer;