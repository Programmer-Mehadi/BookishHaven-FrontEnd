import { createSlice } from "@reduxjs/toolkit";

export interface reviewsSlice {
  reviewsList: [];
}

const initialState: reviewsSlice = {
  reviewsList: [],
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: initialState,
  reducers: {},
});
export const {} = reviewsSlice.actions;

export default reviewsSlice.reducer;
