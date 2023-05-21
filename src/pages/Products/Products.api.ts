import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_METHODS, IProduct } from "../../utils/common.interface";
import { BASE_URL } from "../../constants";
import { routes } from "../../constants/Constants.routes";

type ProductsReponse = {
  success: boolean;
  products: IProduct[];
};

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsReponse, void>({
      query: () => routes.v1.products,
      // Provides a list of `Products` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Products` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.products.map(
                ({ _id }) => ({ type: "Products", _id } as const)
              ),
              { type: "Products", _id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Products', id: 'LIST' }` is invalidated
            [{ type: "Products", _id: "LIST" }],
      // transformResponse: (response: {
      //   products: IProduct[];
      //   success: boolean;
      // }) => {
      //   return response["products"];
      // },
    }),
    getProduct: builder.query({
      query: (id) => ({ url: routes.v1.products, params: { id } }),
      providesTags: (_result, _error, _id) => {
        return [{ type: "Products", _id }];
      },
      // transformResponse: (response) => {
      //   return response;
      // },
    }),

    createProduct: builder.mutation<IProduct, Partial<IProduct>>({
      query(body) {
        return {
          url: routes.v1.products,
          method: API_METHODS.POST,
          body,
        };
      },
      // Invalidates all Products-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created Product could show up in any lists.
      invalidatesTags: (_result, _error, _id) => {
        return [{ type: "Products", _id }];
      },
    }),

    updateProduct: builder.mutation<IProduct, Partial<IProduct>>({
      query(data) {
        const { _id, ...body } = data;
        return {
          url: `${routes.v1.products}/${_id}`,
          method: API_METHODS.PUT,
          body,
        };
      },
      invalidatesTags: (_result, _error, { _id }) => {
        return [{ type: "Products", _id }];
      },
    }),

    deleteProduct: builder.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `${routes.v1.products}/${id}`,
          method: API_METHODS.DELETE,
        };
      },
      invalidatesTags: (_result, _error, _id) => {
        return [{ type: "Products", _id }];
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
