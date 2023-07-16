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
  reducers: {
    setReviewsList: (state, action) => {
      state.reviewsList = action.payload.reviewsList;
    },
  },
});
export const {setReviewsList} = reviewsSlice.actions;

export default reviewsSlice.reducer;
