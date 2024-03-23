import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
const initialState = {
    data: [],
    error: undefined
}

export const joke = createAsyncThunk("getJoke", async (text) => {
  try {
    const response = await axios.get(
      `https://api.chucknorris.io/jokes/search?query=${text}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
const jokeSlice = createSlice({
  name: "joke",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(joke.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(joke.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default jokeSlice.reducer;