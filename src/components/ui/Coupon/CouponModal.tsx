/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Modal } from "antd";
import { useAppDispatch } from "../../../redux/hooks";
import { useState } from "react";
import { useGetCouponByNameMutation } from "../../../redux/feature/coupon/couponManagement.api";
import { setCoupon } from "../../../redux/feature/coupon/couponSlice";

const CouponModal = () => {
    const dispatch = useAppDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [isCouponValid, setIsCouponValid] = useState(false);
    const [isCheckedCoupon, setIsCheckedCoupon] = useState(false);
    const [coupon] = useGetCouponByNameMutation();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setCouponCode("");
        setIsCouponValid(false);
        setIsCheckedCoupon(false);
        setIsModalOpen(false);
    };

    const couponDetailsHandler = async (couponCode: string) => {
        if (!couponCode || couponCode == "") return;

        try {
            const res = await coupon({ code: couponCode }).unwrap();
            if (res.success === true) {
                console.log(res.data);
                dispatch(
                    setCoupon({
                        couponCode: res.data.code,
                        couponDetails: res.data,
                    }),
                );
                handleCancel();
            } else {
                dispatch(
                    setCoupon({
                        couponCode: "",
                        couponDetails: null,
                    }),
                );
            }
        } catch (error: any) {
            dispatch(
                setCoupon({
                    couponCode: "",
                    couponDetails: null,
                }),
            );
        }
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
                            couponDetailsHandler(couponCode);
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
