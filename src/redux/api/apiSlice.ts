import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  endpoints: (builder) => ({
    // user api
    signUp: builder.mutation({
      query: (user) => ({
        url: "/user/sign-up",
        method: "POST",
        body: { user: user },
      }),
    }),
    // book apai
    getLastTenBooks: builder.query({
      query: () => "/book/last-ten-books",
    }),
    addBook: builder.mutation({
      query: (book) => ({
        url: "/book/add-book",
        method: "POST",
        body: { userData: book.userData },
      }),
    }),
  }),
});

export const { useGetLastTenBooksQuery, useAddBookMutation,useSignUpMutation } = api;
