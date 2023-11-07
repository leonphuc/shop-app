import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { productsFetch } from "../feature/productsSlice";
import { productsApi } from "../feature/productsApi";
import { usersApi } from "../feature/UserFeature/usersApi";
import cartSlice, { getTotal } from "../feature/cartSlice";
import userReducer from "../feature/UserSlice";
import { cartsApi } from "../feature/CartFeature/CartFeature";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    cart: cartSlice,
    [productsApi.reducerPath]: productsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [cartsApi.reducerPath]: cartsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      usersApi.middleware,
      cartsApi.middleware
    ),
});

store.dispatch(productsFetch());
store.dispatch(getTotal());
