/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

export type TCoupon = {
    couponCode: string;
    discount: number;
};

const coupon = localStorage.getItem("coupon");

const initialState: TCoupon = {
    couponCode: coupon ? JSON.parse(coupon).couponCode : "",
    discount: coupon ? JSON.parse(coupon).discount : 0,
};

const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {
        setCouponInfo: (state, action) => {
            state.couponCode = action.payload.couponCode;
            state.discount = action.payload.discount;
            localStorage.setItem("coupon", JSON.stringify(action.payload));
        },
    },
});

export const { setCouponInfo } = couponSlice.actions;
export default couponSlice.reducer;
