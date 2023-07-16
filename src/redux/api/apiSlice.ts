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
  }),
});

export const {
  useGetLastTenBooksQuery,
  useAddBookMutation,
  useSignUpMutation,
  useSignInMutation,
  useCheckSignInMutation,
  useGetAllBooksQuery,
} = api;
