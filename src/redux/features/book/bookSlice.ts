import { createSlice } from "@reduxjs/toolkit";

export interface bookSlice {
  lastTenList: [];
  allBookList: [];
}

const initialState: bookSlice = {
  lastTenList: [],
  allBookList: [],
};

const BookSlice = createSlice({
  name: "book",
  initialState: initialState,
  reducers: {
    getLastTen: (state, action) => {
      state.lastTenList = action.payload;
    },
  },
});
export const {getLastTen} = BookSlice.actions;

export default BookSlice.reducer;
