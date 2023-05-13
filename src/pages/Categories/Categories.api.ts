import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_METHODS, ICategory } from "../../utils/common.interface";
import { BASE_URL } from "../../constants";
import { routes } from "../../constants/Constants.routes";

type CategoriesReponse = {
  success: boolean;
  categories: ICategory[];
};

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesReponse, void>({
      query: () => routes.v1.categories,
      // Provides a list of `Categories` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Categories` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.categories.map(
                ({ id }) => ({ type: "Categories", id } as const)
              ),
              { type: "Categories", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Categories', id: 'LIST' }` is invalidated
            [{ type: "Categories", id: "LIST" }],
      // transformResponse: (response: {
      //   categories: ICategory[];
      //   success: boolean;
      // }) => {
      //   return response["categories"];
      // },
    }),
    getCategory: builder.query({
      query: (id) => ({ url: routes.v1.categories, params: { id } }),
      providesTags: (_result, _error, id) => {
        return [{ type: "Categories", id }];
      },
      // transformResponse: (response) => {
      //   return response;
      // },
    }),

    createCategory: builder.mutation<ICategory, Partial<ICategory>>({
      query(body) {
        return {
          url: routes.v1.categories,
          method: API_METHODS.POST,
          body,
        };
      },
      // Invalidates all Categories-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created Category could show up in any lists.
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),

    updateCategory: builder.mutation<ICategory, Partial<ICategory>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `${routes.v1.categories}/${id}`,
          method: API_METHODS.PUT,
          body,
        };
      },
      invalidatesTags: (_result, _error, { id }) => {
        return [{ type: "Categories", id }];
      },
    }),

    deleteCategory: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `${routes.v1.categories}/${id}`,
          method: API_METHODS.DELETE,
        };
      },
      invalidatesTags: (_result, _error, id) => {
        return [{ type: "Categories", id }];
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
