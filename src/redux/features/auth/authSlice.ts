import { createSlice } from "@reduxjs/toolkit";

export interface wishlistSlice {
  futureList: [];
  currentList: [];
}

const initialState: wishlistSlice = {
  futureList: [],
  currentList: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers: {},
});
export const {} = wishlistSlice.actions;

export default wishlistSlice.reducer;
