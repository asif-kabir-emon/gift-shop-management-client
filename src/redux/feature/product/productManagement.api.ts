import { baseApi } from "../../api/baseApi";

const ProductManagement = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: () => ({
                url: "/category",
                method: "GET",
            }),
        }),
        getAllBrand: builder.query({
            query: () => ({
                url: "/brand",
                method: "GET",
            }),
        }),
        getAllOccasion: builder.query({
            query: () => ({
                url: "/occasion",
                method: "GET",
            }),
        }),
        getAllTheme: builder.query({
            query: () => ({
                url: "/theme",
                method: "GET",
            }),
        }),
        addNewProduct: builder.mutation({
            query: (productInfo) => ({
                url: "/product/create-product",
                method: "POST",
                body: productInfo,
            }),
        }),
        getAllProducts: builder.query({
            query: (query) => ({
                url: "/product",
                method: "GET",
                params: query,
            }),
            providesTags: ["products"],
        }),
        getProductById: builder.query({
            query: (productId) => ({
                url: `/product/${productId}`,
                method: "GET",
            }),
        }),
        updateProduct: builder.mutation({
            query: (payload) => ({
                url: `/product/${payload.id}`,
                method: "PUT",
                body: payload.productInfo,
            }),
            invalidatesTags: ["products"],
        }),
        deleteSingleProduct: builder.mutation({
            query: (productId) => ({
                url: `/product/${productId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["products"],
        }),
        deleteMultipleProducts: builder.mutation({
            query: (productIds) => ({
                url: "/product",
                method: "DELETE",
                body: productIds,
            }),
            invalidatesTags: ["products"],
        }),
    }),
});

export const {
    useGetAllCategoryQuery,
    useGetAllBrandQuery,
    useGetAllOccasionQuery,
    useGetAllThemeQuery,
    useAddNewProductMutation,
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useDeleteSingleProductMutation,
    useDeleteMultipleProductsMutation,
} = ProductManagement;
