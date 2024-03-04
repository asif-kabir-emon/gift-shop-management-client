/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

export type TCoupon = {
    code: string;
    discountType: "percentage" | "fixed";
    discountAmount: number;
    minOrder: number;
    haveMaxDiscount: boolean;
    maxDiscount?: number;
    startDate: string;
    expiryDate: string;
    isDeleted?: boolean;
};

export type TCouponState = {
    couponDetails: TCoupon | null;
    couponCode: string;
};

const coupon = localStorage.getItem("coupon");

const initialState: TCouponState = {
    couponDetails: coupon ? JSON.parse(coupon).couponDetails : null,
    couponCode: coupon ? JSON.parse(coupon).couponCode : "",
};

const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {
        setCoupon: (state, action) => {
            state.couponDetails = action.payload.couponDetails;
            state.couponCode = action.payload.couponCode;
            localStorage.setItem("coupon", JSON.stringify(action.payload));
        },
        removeCoupon: (state) => {
            state.couponDetails = null;
            state.couponCode = "";
            localStorage.removeItem("coupon");
        },
    },
});

export const { setCoupon, removeCoupon } = couponSlice.actions;
export default couponSlice.reducer;
