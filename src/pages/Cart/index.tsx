/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    TCartItem,
    addToCart,
    decreaseCart,
    removeFromCart,
} from "../../redux/feature/cart/cartSlice";
import { useEffect } from "react";
import { useVerifyCouponMutation } from "../../redux/feature/coupon/couponManagement.api";
import { setCouponInfo } from "../../redux/feature/coupon/couponSlice";
import CouponModal from "../../components/ui/Coupon/CouponModal";

const calculateTotalAmount = (cartItems: TCartItem[]) => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const Cart = () => {
    const cart = useAppSelector((state) => state.cart);
    const coupon = useAppSelector((state) => state.coupon);
    const dispatch = useAppDispatch();
    const [verifyCoupon] = useVerifyCouponMutation();

    const handleAddToCart = (product: TCartItem) => {
        if (product.quantity === product.maxQuantity) {
            return;
        }
        dispatch(addToCart(product));
    };

    const handleDecreaseCart = (product: TCartItem) => {
        dispatch(decreaseCart(product));
    };

    const handleRemoveFromCart = (product: TCartItem) => {
        dispatch(removeFromCart(product));
    };

    useEffect(() => {
        const handleDiscount = async () => {
            try {
                const res = await verifyCoupon({
                    code: coupon.couponCode,
                    orderAmount: calculateTotalAmount(cart.cartItems),
                }).unwrap();
                if (res.success === true) {
                    dispatch(
                        setCouponInfo({
                            couponCode: coupon.couponCode,
                            discount: res.data.discountAmount,
                        }),
                    );
                } else {
                    dispatch(
                        setCouponInfo({
                            couponCode: coupon.couponCode,
                            discount: res.data.discountAmount,
                        }),
                    );
                }
            } catch (error: any) {
                dispatch(
                    setCouponInfo({
                        couponCode: coupon.couponCode,
                        discount: 0,
                    }),
                );
            }
        };

        return () => {
            handleDiscount();
        };
    }, [cart]);

    return (
        <div className="m-5 flex justify-center">
            <div>
                <h1 className="text-2xl md:text-4xl font-bold text-center">
                    Shopping Bag
                </h1>

                <div className="flex flex-col xl:flex-row xl:items-start gap-5 my-10">
                    <div className="flex flex-nowrap">
                        {cart.cartItems.length > 0 ? (
                            <div className="flex flex-col gap-3 xl:w-[500px]">
                                {cart.cartItems.map((cartItem) => (
                                    <div
                                        key={cartItem.productId}
                                        className="flex justify-between gap-5 p-5 bg-[--primary-color] rounded-lg w-full"
                                    >
                                        <div className="flex gap-2">
                                            <div>
                                                {cartItem.image ? (
                                                    <img
                                                        src={cartItem.image}
                                                        alt={
                                                            cartItem.productName
                                                        }
                                                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md"
                                                    />
                                                ) : (
                                                    <img
                                                        src="https://via.placeholder.com/150"
                                                        alt="placeholder"
                                                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md"
                                                    />
                                                )}
                                            </div>
                                            <div className="ml-3 flex flex-col gap-[4px]">
                                                <h3 className="text-sm md:text-[20px] font-semibold">
                                                    {cartItem.productName}
                                                </h3>
                                                <p className="text-[18px]">
                                                    &#2547; {cartItem.price}
                                                </p>
                                                <div className="flex justify-center items-start w-[90px] border-[1.5px] rounded text-[16px] px-6 py-1 mt-1">
                                                    <div className="flex items-center gap-4">
                                                        <button
                                                            onClick={() =>
                                                                handleDecreaseCart(
                                                                    cartItem,
                                                                )
                                                            }
                                                        >
                                                            -
                                                        </button>
                                                        <div className="count">
                                                            {cartItem.quantity}
                                                        </div>
                                                        <button
                                                            onClick={() =>
                                                                handleAddToCart(
                                                                    cartItem,
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-between">
                                            <button
                                                onClick={() =>
                                                    handleRemoveFromCart(
                                                        cartItem,
                                                    )
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-[20px] text-xl bg-[--primary-color] rounded-lg w-full xl:w-[500px]">
                                <p className="text-center my-10">
                                    Your cart is empty
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="bg-[--primary-color] px-5 py-10 rounded md:w-[400px]">
                        <div className="flex justify-between">
                            <span>Discount</span>
                            <CouponModal />
                        </div>
                        <div>
                            <small className="text-[13px]">
                                You can add a discount code at the checkout
                            </small>
                        </div>
                        <div>
                            {coupon.couponCode &&
                                calculateTotalAmount(cart.cartItems) > 0 && (
                                    <div className="flex justify-between">
                                        <span>Discount Code</span>
                                        <span>{coupon.couponCode}</span>
                                    </div>
                                )}
                        </div>
                        <hr className="border-[--secondary-color] my-3" />
                        <div className="flex justify-between">
                            <span>Total Price</span>
                            <span>
                                &#2547;{" "}
                                {calculateTotalAmount(cart.cartItems).toFixed(
                                    2,
                                )}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Discount</span>
                            <span>&#2547; {coupon.discount.toFixed(2)}</span>
                        </div>
                        <hr className="border-[--secondary-color] my-3" />
                        <div className="flex justify-between font-extrabold text-[16px]">
                            <span className="font-bold">Total</span>
                            <span className="font-bold">
                                &#2547;{" "}
                                {Math.round(
                                    calculateTotalAmount(cart.cartItems) -
                                        coupon.discount,
                                ).toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-center mt-10">
                            <button className="button-primary w-full">
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
