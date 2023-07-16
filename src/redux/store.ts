import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import bookReducer from "./features/book/bookSlice";
import wishlistReducer from "./features/wishlist/wishlistSlice";
import reviewsReducer from './features/reviews/reviewsSlice';
// import logger from "./middlewares/logger";
import { api } from "./api/apiSlice";

const store = configureStore({
  reducer: {
    book: bookReducer,
    wishList: wishlistReducer,
    auth: authReducer,
    reviews: reviewsReducer,
    [api.reducerPath]: api.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
