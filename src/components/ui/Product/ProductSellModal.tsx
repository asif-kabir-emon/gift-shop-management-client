/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useSellProductMutation } from "../../../redux/feature/SaleInfo/sellManagement.api";
import { useState } from "react";
import { TProduct, TSellInfo, TUser } from "../../../types";
import { Button, Col, Input, Modal, Row } from "antd";
import GForm from "../../form/GForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellProductSchema } from "../../../Schemas/sell.schema";
import GInput from "../../form/GInput";
import { useAppSelector } from "../../../redux/hooks";
import { useCurrentToken } from "../../../redux/feature/auth/authSlice";
import { verifyToken } from "../../../utils/verifyToken";
import moment from "moment";
import GDatePickerWithDefaultValue from "../../form/GDatePickerWithDefaultValue";
import { useVerifyCouponMutation } from "../../../redux/feature/coupon/couponManagement.api";
import generatePDF, { Margin, Resolution } from "react-to-pdf";

const ProductSellModal = ({ productInfo }: { productInfo: TProduct }) => {
    const token = useAppSelector(useCurrentToken);
    const user = verifyToken(token as string) || {};

    const [sellSteps, setSellSteps] = useState<
        "sellForm" | "confirmForm" | "memoForm"
    >("sellForm");

    const [couponCode, setCouponCode] = useState("");
    const [sellInfo, setSellInfo] = useState<TSellInfo | null>(null);
    const [invoiceInfo, setInvoiceInfo] = useState<any>({});

    const [sellProduct] = useSellProductMutation();
    const [verifyCoupon] = useVerifyCouponMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setCouponCode("");
        setSellInfo(null);
        setSellSteps("sellForm");
        setInvoiceInfo({});
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

        const sellInfo: TSellInfo = {
            quantity: Number(data.quantity),
            sellingPrice: Number(productInfo.price),
            totalAmount: Number(data.quantity) * Number(productInfo.price),
            sellDate: moment().format("YYYY-MM-DD"),
            buyerName: data.buyerName,
            productId: productInfo._id,
            sellerId: (user as TUser)?.id.toString(),
            couponCode: "",
            discount: 0,
            paidAmount: Number(data.quantity) * Number(productInfo.price),
        };

        if (couponCode) {
            const coupon = await verifyCouponHandler(
                couponCode,
                sellInfo.totalAmount,
            );
            console.log(coupon);
            if (coupon?.success === true) {
                const discount = coupon.data.discountAmount;
                if (discount > 0) {
                    sellInfo.couponCode = couponCode;
                    sellInfo.discount = discount;
                    sellInfo.paidAmount = sellInfo.totalAmount - discount;
                }
            }
        }

        setSellInfo(sellInfo);
        setSellSteps("confirmForm");
    };

    const sellProductHandler = async () => {
        const toastId = toast.loading("Selling ...", {
            position: "top-right",
        });
        try {
            const res = await sellProduct(sellInfo as TSellInfo).unwrap();
            if (res.success === true) {
                toast.success("Product sold successfully", {
                    id: toastId,
                    duration: 2000,
                });
                setSellSteps("memoForm");
                setInvoiceInfo(res.data);
            } else {
                toast.error(res.message || "Failed to sell product", {
                    id: toastId,
                    duration: 2000,
                });
            }
        } catch (error: any) {
            toast.error(error.data.message || "Failed to sell product", {
                id: toastId,
                duration: 2000,
            });
        }
    };

    const getTargetElement = () => document.getElementById(productInfo._id);
    const downloadPdf = () =>
        generatePDF(getTargetElement, {
            resolution: Resolution.EXTREME,
            page: {
                margin: Margin.LARGE,
                format: "A4",
                orientation: "portrait",
            },
            filename: `Invoice.pdf`,
        });

    return (
        <div>
            <button
                onClick={showModal}
                className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-center rounded-md p-2 w-full font-bold"
            >
                Sell
            </button>
            <Modal
                title={`Sell the product`}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                {sellSteps === "sellForm" && (
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
                                                verifyCouponHandler(
                                                    couponCode,
                                                    20,
                                                )
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
                )}
                {sellSteps === "confirmForm" && (
                    <div>
                        <h4 className="font-semibold text-[16px] py-4 text-center">
                            Are you sure to sell the product?
                        </h4>
                        <div className="text-[12px] bg-gray-200 px-2 py-1 rounded-md">
                            <h4>Product Name: {productInfo.name}</h4>
                            <h4>
                                Price: &#2547; {}
                                {productInfo.price} x {sellInfo?.quantity}
                            </h4>
                            <h4>
                                Total Amount: &#2547; {sellInfo?.totalAmount}
                            </h4>
                            <h4>
                                Discount Amount: &#2547; {sellInfo?.discount}
                            </h4>
                            <h4>
                                Payable Amount: &#2547; {sellInfo?.paidAmount}
                            </h4>
                        </div>
                        <div className="mt-7 mb-2 flex gap-1 justify-center">
                            <Button
                                htmlType="button"
                                className="bg-[var(--secondary-color)] min-w-[100px] text-[var(--primary-color)] m-0 rounded-md"
                                onClick={() => {
                                    handleCancel();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                htmlType="button"
                                className="bg-[var(--secondary-color)] min-w-[100px] text-[var(--primary-color)] m-0 rounded-md"
                                onClick={sellProductHandler}
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>
                )}
                {sellSteps === "memoForm" && (
                    <div>
                        <h4 className="text-[16px] text-green-700 font-bold text-center my-5">
                            Product sold successfully
                        </h4>
                        <div
                            className="bg-gray-100 px-5 py-10 flex flex-col gap-2"
                            id={productInfo._id}
                        >
                            <div>
                                <h4 className="text-[18px] font-semibold text-center mb-5">
                                    Invoice
                                </h4>
                                <div className="flex gap-2">
                                    <span className="font-semibold">
                                        Invoice ID:
                                    </span>
                                    <span>{invoiceInfo[0]?._id}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="font-semibold">Date:</span>
                                    <span>
                                        {moment(
                                            invoiceInfo[0]?.sellDate,
                                        ).format("DD MMMM YYYY, h:mm:ss a")}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div className="flex gap-2">
                                    <span className="font-semibold">
                                        Buyer Name:
                                    </span>
                                    <span>{sellInfo?.buyerName}</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex gap-2">
                                    <span className="font-semibold">
                                        Product Id:
                                    </span>
                                    <span>{sellInfo?.productId}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="font-semibold">
                                        Product Name:
                                    </span>
                                    <span>{productInfo.name}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="font-semibold">
                                        Price Per Unit:
                                    </span>
                                    <span>&#2547;{productInfo.price}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="font-semibold">
                                        Product Quantity:
                                    </span>
                                    <span>{sellInfo?.quantity}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="font-semibold">
                                        Total Amount:
                                    </span>
                                    <span>&#2547;{sellInfo?.totalAmount}</span>
                                </div>
                            </div>
                            <div>
                                {sellInfo?.couponCode && (
                                    <div className="flex gap-2">
                                        <span className="font-semibold">
                                            Coupon Code:
                                        </span>
                                        <span>{sellInfo?.couponCode}</span>
                                    </div>
                                )}
                                <div className="flex gap-2">
                                    <span className="font-semibold">
                                        Discount Amount:
                                    </span>
                                    <span>{sellInfo?.discount}</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex gap-2">
                                    <span className="font-semibold">
                                        -------------------------------------------------------
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="font-semibold">
                                        Total Paid Amount:
                                    </span>
                                    <span>&#2547;{sellInfo?.paidAmount}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 justify-center mt-7 mb-2">
                            <Button
                                htmlType="button"
                                className="bg-[var(--secondary-color)] min-w-[100px] text-[var(--primary-color)] m-0 rounded-md"
                                onClick={() => {
                                    handleCancel();
                                }}
                            >
                                Close
                            </Button>
                            <Button
                                onClick={downloadPdf}
                                htmlType="button"
                                className="bg-[var(--secondary-color)] min-w-[100px] text-[var(--primary-color)] m-0 rounded-md"
                            >
                                Download Invoice
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ProductSellModal;
