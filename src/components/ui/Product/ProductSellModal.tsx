/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { TProduct } from "../../../types";
import { Button, Col, Input, Modal, Row } from "antd";
import GForm from "../../form/GForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellProductSchema } from "../../../Schemas/sell.schema";
import GInput from "../../form/GInput";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logout, useCurrentToken } from "../../../redux/feature/auth/authSlice";
import { verifyToken } from "../../../utils/verifyToken";
import moment from "moment";
import GDatePickerWithDefaultValue from "../../form/GDatePickerWithDefaultValue";
import {
    useGetCouponByNameMutation,
    useVerifyCouponMutation,
} from "../../../redux/feature/coupon/couponManagement.api";
import { setCoupon } from "../../../redux/feature/coupon/couponSlice";
import { addToCart } from "../../../redux/feature/cart/cartSlice";
import { useNavigate } from "react-router";

const ProductSellModal = ({ productInfo }: { productInfo: TProduct }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [couponInfo] = useGetCouponByNameMutation();
    const [verifyCoupon] = useVerifyCouponMutation();

    const token = useAppSelector(useCurrentToken);
    const user = verifyToken(token as string) || {};

    if (!user) {
        dispatch(logout());
    }

    const [couponCode, setCouponCode] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setCouponCode("");
    };

    const verifyCouponHandler = async (
        couponCode: string,
        orderAmount: number,
    ) => {
        if (!couponCode || couponCode == "" || !orderAmount || orderAmount < 0)
            return false;
        const toastId = toast.loading("Verifying coupon ...", {
            position: "top-right",
        });
        try {
            const res = await verifyCoupon({
                code: couponCode,
                orderAmount: orderAmount,
            }).unwrap();
            if (res.success === true) {
                toast.success("Valid Coupon", {
                    id: toastId,
                    duration: 2000,
                });
                return res;
            } else {
                toast.error("Invalid Coupon", {
                    id: toastId,
                    duration: 2000,
                });
            }
        } catch (error: any) {
            toast.error(error.data.message || "Failed to verify coupon", {
                id: toastId,
                duration: 2000,
            });
        }
        return;
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (data.quantity > productInfo.quantity) {
            toast.error(
                "Quantity must be less than or equal to available quantity",
                {
                    id: "quantity-error",
                    duration: 2000,
                    position: "top-right",
                },
            );
            return;
        }

        if (couponCode !== "") {
            const toastId = toast.loading("Verifying coupon ...", {
                position: "top-center",
            });
            try {
                const res = await couponInfo({ code: couponCode }).unwrap();
                if (res.success === true) {
                    dispatch(
                        setCoupon({
                            couponCode: res.data.code,
                            couponDetails: res.data,
                        }),
                    );
                    toast.success("Valid Coupon", {
                        id: toastId,
                        duration: 2000,
                    });
                } else {
                    dispatch(
                        setCoupon({
                            couponCode: "",
                            couponDetails: null,
                        }),
                    );
                    toast.error("Invalid Coupon", {
                        id: toastId,
                        duration: 2000,
                    });
                }
            } catch (error: any) {
                dispatch(
                    setCoupon({
                        couponCode: "",
                        couponDetails: null,
                    }),
                );
                toast.error(error.data.message || "Failed to verify coupon", {
                    id: toastId,
                    duration: 2000,
                });
            }
        }

        dispatch(
            addToCart({
                productId: productInfo._id,
                productName: productInfo.name,
                image: productInfo.imageURL,
                maxQuantity: productInfo.quantity,
                price: productInfo.price,
                quantity: data.quantity,
            }),
        );

        navigate("/products/cart/check-out");
    };

    return (
        <div>
            <button
                onClick={showModal}
                className="button-primary font-normal w-full"
            >
                Sell
            </button>
            <Modal
                title={`Sell the product`}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <div>
                    <div className="my-5 text-[12px] bg-slate-300 px-3 py-2 font-medium">
                        <h4>Product Name: {productInfo.name}</h4>
                        <h4>
                            Price: &#2547; {}
                            {productInfo.price} x 1
                        </h4>
                        <h4>Available Quantity: {productInfo.quantity}</h4>
                    </div>
                    <GForm
                        onSubmit={onSubmit}
                        resolver={zodResolver(sellProductSchema)}
                        disableReset={true}
                    >
                        <GInput
                            type="text"
                            name="buyerName"
                            placeholder="Enter Buyer Name"
                            label="Buyer Name"
                        />
                        <GInput
                            type="number"
                            name="quantity"
                            placeholder="Enter Quantity"
                            label="Quantity"
                        />
                        <GDatePickerWithDefaultValue
                            name="sellDate"
                            label="Date"
                            placeholder="Select Date"
                            disabled={true}
                            defaultValue={moment().format("YYYY-MM-DD")}
                        />
                        <div>
                            <p className="text-[14px] font-medium mb-2">
                                Apply Promo Code
                            </p>
                            <Row>
                                <Col span={18}>
                                    <Input
                                        type="text"
                                        value={couponCode}
                                        placeholder="Enter Coupon Code"
                                        onChange={(e) =>
                                            setCouponCode(e.target.value)
                                        }
                                        className="w-full rounded-r-none rounded-l-md"
                                    />
                                </Col>
                                <Col span={6}>
                                    <Button
                                        htmlType="button"
                                        className="bg-[var(--secondary-color)] min-w-[100px] text-[var(--primary-color)] m-0 rounded-l-none rounded-r-md"
                                        onClick={() =>
                                            verifyCouponHandler(couponCode, 20)
                                        }
                                    >
                                        Verify Coupon
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                        <div className="flex justify-center gap-3 mt-10 mb-5">
                            <Button
                                onClick={() => {
                                    handleCancel();
                                }}
                                className="bg-[var(--secondary-color)] min-w-[100px] text-[var(--primary-color)] m-0 rounded-md"
                            >
                                Cancel
                            </Button>
                            <Button
                                htmlType="submit"
                                className="bg-[var(--secondary-color)] min-w-[100px] text-[var(--primary-color)] m-0 rounded-md"
                            >
                                Sell
                            </Button>
                        </div>
                    </GForm>
                </div>
            </Modal>
        </div>
    );
};

export default ProductSellModal;
