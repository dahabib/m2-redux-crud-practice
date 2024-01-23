import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
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
      query: ({ productId, data }) => ({
        url: `/comment/${productId}`,
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
} = productApi;
