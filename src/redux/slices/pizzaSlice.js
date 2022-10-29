import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// First, create the thunk
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params, thunkAPI) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://634300d53f83935a784df853.mockapi.io/cards?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    if (data.length === 0) {
      return thunkAPI.rejectWithValue("Pizza bosh");
    }

    return thunkAPI.fulfillWithValue(data);
  }
);

const initialState = {
  items: [], // CARDS-API
  status: "loading", // isLoading
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  // FETCH-EXTRA-REDUX-TOOLKIT
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const selectCardsData = (state) => state.pizza.items;
export const selectCardsLoading = (state) => state.pizza.status;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
