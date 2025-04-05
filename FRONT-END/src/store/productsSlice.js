import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    featuredProducts: [],
    currentCategory: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.featuredProducts = action.payload.slice(0, 12);
    },
    setCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
});

export const { setProducts, setCategory } = productsSlice.actions;
export default productsSlice.reducer;
