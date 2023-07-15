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
    setLastTen: (state, action) => {
      state.lastTenList = action.payload.books;
    },
  },
});
export const {setLastTen} = BookSlice.actions;

export default BookSlice.reducer;
