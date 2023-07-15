import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface authSlice {
  user: object;
  token: string;
}

const initialState: authSlice = {
  user: {},
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setTokenAndUser: (
      state,
      action: PayloadAction<{
        token: string;
        user: object;
      }>
    ) => {
      state.token = action.payload.token;
      state.user = {...action.payload.user};
    },
  },
});
export const { setTokenAndUser } = authSlice.actions;

export default authSlice.reducer;
