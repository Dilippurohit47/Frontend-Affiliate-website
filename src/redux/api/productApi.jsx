import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  tagTypes:["products"],
  endpoints: (builder) => ({
    latestProducts: builder.query({
      query: () => "latest",
      providesTags:["products"]
    }),
    category: builder.query({
      query: () => "category",
      providesTags:["products"]

    }),

    singleProduct: builder.query({
      query: (id) => `${id}`,
      providesTags:["products"]

    }),

    categoryProduct: builder.query({
      query: (category) => `category/${category}`,
      providesTags:["products"]

    }),
    allProducts: builder.query({
      query: () => "all",
      providesTags:["products"]

    }),
    searchProducts: builder.query({
      query: (search) => `all?search=${search}`,
      providesTags:["products"]

    }),

    createProduct:builder.mutation({
      query: ({ formData,userId }) => ({
        url: `create/new?id=${userId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["products"],
    }),

    deleteProduct:builder.mutation({
      query:({Productid , id}) =>({
        url:`${Productid}?id=${id}`,
        method:"DELETE",

      }),
      invalidatesTags: ["products"],

    })
,
    updateProduct :builder.mutation({
      query:({id , formdata,userid}) =>({
        url:`${id}?id=${userid}`,
        method:"PUT",
        body:formdata,
      }),
      invalidatesTags: ["products"],
    }),
   


  }),
});

export const {
  useUpdateProductMutation,
  useLatestProductsQuery,
  useCreateProductMutation,
  useCategoryQuery,
  useAllProductsQuery,
  useSingleProductQuery,
  useCategoryProductQuery,
  useSearchProductsQuery,
  useDeleteProductMutation,
} = productApi;
