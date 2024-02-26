import { baseApi } from "../../api/baseApi";

const CouponManagement = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCoupon: builder.mutation({
            query: (body) => ({
                url: "/coupon/create-coupon",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useCreateCouponMutation } = CouponManagement;
