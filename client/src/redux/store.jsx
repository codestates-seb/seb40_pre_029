import { createSlice, configureStore } from "@reduxjs/toolkit";
import dummyArticle from "../dummydata";

//Str
const viewSlice = createSlice({
  name: "viewCount",
  initialState: dummyArticle,
  reducers: {
    viewsUp: (state, action) => {
      console.log(action.step);
      return { ...state, views: state.views + action.step };
    },
  },
});

const store = configureStore({
  reducer: viewSlice.reducer,
});

export default store;
export const { viewsUp } = viewSlice.actions;
