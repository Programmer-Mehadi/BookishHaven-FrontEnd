import { createSlice } from "@reduxjs/toolkit";

export interface wishlistSlice {
  wishList: [];
}

const initialState: wishlistSlice = {
  wishList: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers: {
    setWishList: (state, action) => {
      state.wishList = action.payload.wishList;
    },
  },
});
export const { setWishList } = wishlistSlice.actions;

export default wishlistSlice.reducer;
