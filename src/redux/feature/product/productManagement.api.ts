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
        getProducts: builder.mutation({
            query: (query) => ({
                url: "/product",
                method: "GET",
                params: query,
            }),
        }),
        getProductById: builder.mutation({
            query: (productId) => ({
                url: `/product/${productId}`,
                method: "GET",
            }),
        }),
        deleteProducts: builder.mutation({
            query: (productIds) => ({
                url: "/product",
                method: "DELETE",
                body: productIds,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `/product/${productId}`,
                method: "DELETE",
            }),
        }),
        updateProduct: builder.mutation({
            query: (payload) => ({
                url: `/product/${payload.id}`,
                method: "PUT",
                body: payload.productInfo,
            }),
        }),
    }),
});

export const {
    useGetAllCategoryQuery,
    useGetAllBrandQuery,
    useGetAllOccasionQuery,
    useGetAllThemeQuery,
    useAddNewProductMutation,

    useGetProductsMutation,
    useGetProductByIdMutation,
    useDeleteProductsMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
} = ProductManagement;
