import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./features/wishlist/wishlistSlice";
// import logger from "./middlewares/logger";

const store = configureStore({
  reducer: {
    counter: wishlistReducer,
  },
  devTools: true,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;