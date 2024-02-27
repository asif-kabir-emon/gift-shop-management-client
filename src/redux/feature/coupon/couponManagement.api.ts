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
        getAllCoupons: builder.query({
            query: () => ({
                url: "/coupon",
                method: "GET",
            }),
        }),
        getCouponById: builder.query({
            query: (id) => ({
                url: `/coupon/${id}`,
                method: "GET",
            }),
        }),
        deleteCoupon: builder.mutation({
            query: (id) => ({
                url: `/coupon/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useCreateCouponMutation,
    useGetAllCouponsQuery,
    useGetCouponByIdQuery,
    useDeleteCouponMutation,
} = CouponManagement;
