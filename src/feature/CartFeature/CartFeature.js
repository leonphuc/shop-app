import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartsApi = createApi({
  reducerPath: "cartsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCartByUserId: builder.query({
      query: (id) => `carts/user/${id}`,
      providesTags: ["Cart"],
    }),
  }),
});

export const { useGetCartByUserIdQuery } = cartsApi;
