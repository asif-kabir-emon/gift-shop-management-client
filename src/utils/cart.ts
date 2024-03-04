import { TCartItem } from "../redux/feature/cart/cartSlice";
import { TCoupon } from "../redux/feature/coupon/couponSlice";

export const calculateDiscount = (totalAmount: number, coupon: TCoupon) => {
    if (!coupon) {
        return 0;
    }

    const currentDate = new Date().toISOString().split("T")[0];
    if (coupon.startDate > currentDate || coupon.expiryDate < currentDate) {
        return 0;
    }

    let discountAmount = 0;
    if (coupon.minOrder > totalAmount) {
        discountAmount = 0;
    } else if (coupon.haveMaxDiscount === true && coupon.maxDiscount) {
        if (coupon.discountType === "percentage") {
            const tempDiscountAmount =
                (totalAmount * coupon.discountAmount) / 100;

            if (tempDiscountAmount > coupon.maxDiscount) {
                discountAmount = coupon.maxDiscount;
            } else {
                discountAmount = tempDiscountAmount;
            }
        } else {
            discountAmount = coupon.discountAmount;
        }
    } else {
        if (coupon.discountType === "percentage") {
            discountAmount = (totalAmount * coupon.discountAmount) / 100;
        } else {
            discountAmount = coupon.discountAmount;
        }
    }

    return discountAmount;
};

export const calculateTotalAmount = (cartItems: TCartItem[]) => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
};
