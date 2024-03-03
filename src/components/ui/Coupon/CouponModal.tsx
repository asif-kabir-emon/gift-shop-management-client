/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useState } from "react";
import { useVerifyCouponMutation } from "../../../redux/feature/coupon/couponManagement.api";
import { TCartItem } from "../../../redux/feature/cart/cartSlice";
import { setCouponInfo } from "../../../redux/feature/coupon/couponSlice";

const calculateTotalAmount = (cartItems: TCartItem[]) => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const CouponModal = () => {
    const cart = useAppSelector((state) => state.cart);
    const [verifyCoupon] = useVerifyCouponMutation();
    const dispatch = useAppDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [isCouponValid, setIsCouponValid] = useState(false);
    const [isCheckedCoupon, setIsCheckedCoupon] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setCouponCode("");
        setIsCouponValid(false);
        setIsCheckedCoupon(false);
        setIsModalOpen(false);
    };

    const verifyCouponHandler = async (
        couponCode: string,
        orderAmount: number,
    ) => {
        if (!couponCode || couponCode == "" || !orderAmount || orderAmount < 0)
            return false;

        try {
            const res = await verifyCoupon({
                code: couponCode,
                orderAmount: orderAmount,
            }).unwrap();
            if (res.success === true) {
                setIsCouponValid(true);
                dispatch(
                    setCouponInfo({
                        couponCode: couponCode,
                        discount: res.data.discountAmount,
                    }),
                );
                handleCancel();
            } else {
                setIsCouponValid(false);
            }
        } catch (error: any) {
            setIsCouponValid(false);
        }
        setIsCheckedCoupon(true);
    };

    return (
        <div>
            <button onClick={showModal} className="underline cursor-pointer">
                Apply Discount
            </button>
            <Modal
                title={<span className="text-[30px] font-bold">Discounts</span>}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <div className="bg-white rounded-lg my-10">
                    <small className="text-[13px] mb-5">
                        Add a discount code
                    </small>
                    <Input
                        type="text"
                        placeholder="Enter your coupon code"
                        className="w-full border-[1px] rounded-l-md rounded-r-none px-3 py-1 mt-1"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                    />
                    {isCheckedCoupon && !isCouponValid && (
                        <span className="text-red-500">Invalid Coupon</span>
                    )}
                </div>
                <div>
                    <button
                        onClick={() => {
                            verifyCouponHandler(
                                couponCode,
                                calculateTotalAmount(cart.cartItems),
                            );
                        }}
                        className="button-primary w-full !py-3"
                    >
                        Apply Discount
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default CouponModal;
