import { configureStore } from "@reduxjs/toolkit";
import jokeSlice from "./slice/joke";
const store = configureStore({
  reducer: {
    joke: jokeSlice,
  },
});

export default store;
