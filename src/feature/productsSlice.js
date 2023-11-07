import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import { fetchAllProducts } from "../services/ProductsService";

const initialState = {
  items: [],
  status: null,
  sortingValue: null,
  test: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const response = await fetchAllProducts();
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productsFetch.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(productsFetch.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });
    builder.addCase(productsFetch.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

const productsReducer = productsSlice.reducer;

export const { getSortValue } = productsSlice.actions;

export default productsReducer;
