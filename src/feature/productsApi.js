import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "products",
      providesTags: ["User"],
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
      providesTags: ["User"],
    }),
    getProductByCategories: builder.query({
      query: (category) => `products/category/${category}`,
      providesTags: ["User"],
    }),
    getAllCategories: builder.query({
      query: () => `products/categories`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductByCategoriesQuery,
  useGetAllCategoriesQuery,
} = productsApi;
