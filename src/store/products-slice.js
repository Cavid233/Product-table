import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  searchedProducts: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.products;
    },
    setSearchedProducts: (state, action) => {
      state.searchedProducts = action.payload.products;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.productId
      );
      state.searchedProducts = state.searchedProducts.filter(
        (product) => product.id !== action.payload.productId
      );
    },
    createProduct: (state, action) => {
      state.products.push(action.payload.product);
    },
    updateProduct: (state, action) => {
      const productIndex = state.products.findIndex(
        (product) => product.id === action.payload.product.id
      );
      state.products[productIndex] = action.payload.product;
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice.reducer;
