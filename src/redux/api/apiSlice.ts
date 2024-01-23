import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7777' }),
  tagTypes: ['products', 'comments'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
      providesTags: ['products'],
    }),

    getSingleProducts: builder.query({
      query: (id) => `/product/${id}`,
    }),

    addProduct: builder.mutation({
      query: (data) => ({
        url: '/product',
        method: 'POST',
        body: data,
      }),
    }),

    addComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comments'],
    }),

    getComments: builder.query({
      query: (productId) => `/comment/${productId}`,
      providesTags: ['comments'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductsQuery,
  useAddProductMutation,
  useAddCommentMutation,
  useGetCommentsQuery,
} = api;
