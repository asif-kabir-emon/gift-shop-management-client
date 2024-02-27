import { baseApi } from "../../api/baseApi";

const CouponManagement = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCoupon: builder.mutation({
            query: (body) => ({
                url: "/coupon/create-coupon",
                method: "POST",
                body,
            }),
            invalidatesTags: ["coupons"],
        }),
        getAllCoupons: builder.query({
            query: () => ({
                url: "/coupon",
                method: "GET",
            }),
            providesTags: ["coupons"],
        }),
        getCouponById: builder.query({
            query: (id) => ({
                url: `/coupon/${id}`,
                method: "GET",
            }),
        }),
        deleteCoupon: builder.mutation({
            query: (id) => ({
                url: `/coupon/delete-coupon/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["coupons"],
        }),
        updateCoupon: builder.mutation({
            query: (payload) => ({
                url: `/coupon/update-coupon/${payload.id}`,
                method: "PUT",
                body: payload.data,
            }),
            invalidatesTags: ["coupons"],
        }),
        verifyCoupon: builder.mutation({
            query: (payload) => ({
                url: `/coupon/verify-coupon`,
                method: "POST",
                body: payload,
            }),
        }),
    }),
});

export const {
    useCreateCouponMutation,
    useGetAllCouponsQuery,
    useGetCouponByIdQuery,
    useDeleteCouponMutation,
    useUpdateCouponMutation,
    useVerifyCouponMutation,
} = CouponManagement;
