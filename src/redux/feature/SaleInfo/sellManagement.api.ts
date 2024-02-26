import { baseApi } from "../../api/baseApi";

const SellManagement = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        sellProduct: builder.mutation({
            query: (saleInfo) => ({
                url: "/sale-info/create-sale-info",
                method: "POST",
                body: saleInfo,
            }),
            invalidatesTags: ["products"],
        }),
        getSellInfo: builder.query({
            query: (query) => ({
                url: "/sale-info/get-sale-info",
                method: "GET",
                params: query,
            }),
        }),
    }),
});

export const { useSellProductMutation, useGetSellInfoQuery } = SellManagement;
