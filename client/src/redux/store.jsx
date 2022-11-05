import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("authorization");
const initialState = {
  isLogin: initialToken ? true : false,
  accessToken: initialToken,
};

const loginStore = createSlice({
  name: "isLogin",
  initialState,
  reducer: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
  },
});

const store = configureStore({
  reducer: loginStore.reducer,
});

export const loginActions = loginStore.actions;

export default store;
