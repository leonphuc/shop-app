import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserApi } from "../services/UsersService";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    const request = await loginUserApi(userCredentials);
    const response = await request;
    localStorage.setItem("user", JSON.stringify(response));
    return response;
  }
);

const initialState = {
  loading: false,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  error: null,
  auth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser(state, action) {
      state.auth = false;
      state.user = false;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
        state.auth = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.auth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.auth = false;

        // console.log(action.error.message);
        if (action.error.message === "Request failed with status code 401") {
          state.error = "Access Denied! Invalid Credentials";
        } else {
          state.error = action.error.message;
        }
        // state.error = null;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
