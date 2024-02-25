import { baseApi } from "../../api/baseApi";

const SellManagement = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        sellProduct: builder.mutation({
            query: (saleInfo) => ({
                url: "/sale-info/create-sale-info",
                method: "POST",
                body: saleInfo,
            }),
        }),
        getSellInfo: builder.mutation({
            query: (query) => ({
                url: "/sale-info/get-sale-info",
                method: "GET",
                params: query,
            }),
            invalidatesTags: ["products"],
        }),
    }),
});

export const { useSellProductMutation, useGetSellInfoMutation } =
    SellManagement;
