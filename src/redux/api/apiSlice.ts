import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  endpoints: (builder) => ({
    // user api
    checkSignIn: builder.mutation({
      query: (token) => ({
        url: "/user/check-sign-in",
        method: "POST",
        body: { token: token as string },
      }),
    }),
    signIn: builder.mutation({
      query: (user) => ({
        url: "/user/sign-in",
        method: "POST",
        body: { user: user as object },
      }),
    }),
    signUp: builder.mutation({
      query: (user) => ({
        url: "/user/sign-up",
        method: "POST",
        body: { user: user as object },
      }),
    }),
    // book apai
    getLastTenBooks: builder.query({
      query: () => "/book/last-ten-books",
    }),
    getAllBooks: builder.query({
      query: (params: { genre: string; year: string }) => ({
        url: `/book/all-books?genre=${params.genre}&year=${params.year}`,
      }),
    }),
    addBook: builder.mutation({
      query: (book) => ({
        url: "/book/add-book",
        method: "POST",
        body: { bookData: book as object },
      }),
    }),
    getSingleBook: builder.query({
      query: (bookId) => ({
        url: `/book/single-book/${bookId as string}`,
      }),
    }),
    deleteSingleBook: builder.mutation({
      query: (data) => ({
        url: `/book/delete-book/${data?.id as string}`,
        method: "DELETE",
        body: {
          data: data.data as object,
        },
      }),
    }),
    editBook: builder.mutation({
      query: (book) => ({
        url: `/book/edit-book`,
        method: "POST",
        body: { bookData: book as object },
      }),
    }),
    createReview: builder.mutation({
      query: (review) => ({
        url: `/review/create-review`,
        method: "POST",
        body: { review: review as object },
      }),
    }),
    getAllReviewsById: builder.query({
      query: (bookId) => ({
        url: `/review/all-reviews/${bookId as string}`,
      }),
    }),
    createWishList: builder.mutation({
      query: (data) => ({
        url: `/wish-list/create-wish-list`,
        method: "POST",
        body: { data: data as object },
      }),
    }),
    getAllWishList: builder.mutation({
      query: (id) => ({
        url: `/wish-list/all-wish-lists`,
        method: "POST",
        body: { id: id as string },
      }),
    }),
  }),
});

export const {
  useGetLastTenBooksQuery,
  useAddBookMutation,
  useSignUpMutation,
  useSignInMutation,
  useCheckSignInMutation,
  useGetAllBooksQuery,
  useEditBookMutation,
  useGetSingleBookQuery,
  useCreateReviewMutation,
  useGetAllReviewsByIdQuery,
  useCreateWishListMutation,
  useGetAllWishListMutation,
  useDeleteSingleBookMutation,
} = api;
