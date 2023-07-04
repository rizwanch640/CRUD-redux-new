import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const endPoint = "http://localhost:3000";

//fetch itms
export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const response = await axios.get(`${endPoint}/todo`);
  const data = response.data
  return data;
});

//add
export const addItem = createAsyncThunk("items/addItem", async (item) => {
  const response = await axios.post(`${endPoint}/todo`, item);
  return response.data;
});

//updt
export const updateItem = createAsyncThunk("items/updateItem", async (item) => {
  const response = await axios.put(`${endPoint}/todo/${item.id}`, item);
  return response.data;
});

//dlt
export const deleteItem = createAsyncThunk("items/deleteItem", async (id) => {
  await axios.delete(`${endPoint}/todo/${id}`);
  return id;
});

//extra rducrs
const itemsSlice = createSlice({
  name: "items",
  initialState: { items: [], loading: false, error: null },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(addItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        state.loading = false;
        state.error = null;
      })

      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.loading = false;
        state.error = null;
      });
  },
});

export default itemsSlice.reducer;
