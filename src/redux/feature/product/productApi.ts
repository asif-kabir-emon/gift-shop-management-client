import { baseApi } from "../../api/baseApi";

const ProductApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        productCategory: builder.mutation({
            query: () => ({
                url: "/category",
                method: "GET",
            }),
        }),
        productBrand: builder.mutation({
            query: () => ({
                url: "/brand",
                method: "GET",
            }),
        }),
        productOccasion: builder.mutation({
            query: () => ({
                url: "/occasion",
                method: "GET",
            }),
        }),
        productTheme: builder.mutation({
            query: () => ({
                url: "/theme",
                method: "GET",
            }),
        }),
        createProduct: builder.mutation({
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
    useProductCategoryMutation,
    useProductBrandMutation,
    useProductOccasionMutation,
    useProductThemeMutation,
    useCreateProductMutation,
    useGetProductsMutation,
    useGetProductByIdMutation,
    useDeleteProductsMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
} = ProductApi;
