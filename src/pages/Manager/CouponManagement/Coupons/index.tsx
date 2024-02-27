/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Spin } from "antd";
import {
    useDeleteCouponMutation,
    useGetAllCouponsQuery,
} from "../../../../redux/feature/coupon/couponManagement.api";
import moment from "moment";
import { toast } from "sonner";
import { useAppSelector } from "../../../../redux/hooks";
import { useCurrentToken } from "../../../../redux/feature/auth/authSlice";
import { verifyToken } from "../../../../utils/verifyToken";
import { TUser } from "../../../../types";
import { TCoupon } from "../../../../types/couponManagement.type";
import { useState } from "react";
import { useNavigate } from "react-router";

const Coupons = () => {
    const navigate = useNavigate();
    const token = useAppSelector(useCurrentToken);
    const user = verifyToken(token as string);
    const currentDate = moment().format("YYYY-MM-DD");

    const { data: couponsData, isLoading: isCouponDataLoading } =
        useGetAllCouponsQuery(undefined);

    const handleCopy = (couponCode: string) => {
        navigator.clipboard.writeText(couponCode);
        toast.success("Copied", {
            position: "top-center",
        });
    };

    return (
        <div className="flex flex-col items-start gap-3">
            <div className="text-center w-full bg-white py-3 text-3xl font-bold rounded">
                <h2>All Coupons</h2>
            </div>
            <div className="w-full">
                {isCouponDataLoading === false ? (
                    <div>
                        {couponsData.data.length > 0 ? (
                            <div className="flex flex-col md:flex-row gap-3 flex-nowrap">
                                {couponsData.data.map((coupon: TCoupon) => (
                                    <div
                                        key={coupon._id}
                                        className="bg-white p-3 rounded w-full md:w-[350px] shadow-md flex justify-between gap-1"
                                    >
                                        <div>
                                            <h3 className="text-xl font-bold flex items-center gap-5">
                                                <span>{coupon.code}</span>
                                                <span>
                                                    {coupon.expiryDate >=
                                                    currentDate ? (
                                                        <>
                                                            <span className="text-green-500 text-[10px] border-[1px] border-green-400 px-1.5 py-[2px] rounded-sm">
                                                                Valid
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="text-red-300 text-[10px] border-[1px] border-red-300 px-1.5 py-[2px] rounded-sm">
                                                                Expired
                                                            </span>
                                                        </>
                                                    )}
                                                </span>
                                            </h3>
                                            <p className="text-[18px] font-medium mt-3">
                                                <span>
                                                    {coupon.discountType ===
                                                    "percentage"
                                                        ? `${coupon.discountAmount}% off on all products`
                                                        : `৳${coupon.discountAmount} off on all products`}
                                                </span>
                                            </p>
                                            <p className="text-[14px] font-medium flex gap-1 mt-1">
                                                <span>Minimum Spend Taka</span>
                                                <span>{coupon.minOrder}</span>
                                            </p>

                                            <p className="text-[14px] font-medium flex gap-1">
                                                <span>Maximum Discount:</span>
                                                {coupon.haveMaxDiscount === true
                                                    ? `৳${coupon.maxDiscount}`
                                                    : "No limit"}
                                            </p>
                                            <p className="text-[12px] flex gap-1 mt-2">
                                                <span>Validity:</span>
                                                {moment(
                                                    coupon.startDate,
                                                ).format("DD MMMM YYYY")}
                                                <span> - </span>
                                                {moment(
                                                    coupon.expiryDate,
                                                ).format("DD MMMM YYYY")}
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-1 justify-between">
                                            <button
                                                onClick={() => {
                                                    handleCopy(coupon.code);
                                                }}
                                                className="bg-[#f0f0f0] hover:bg-gray-200 p-2 rounded-md border-[1px] border-slate-300"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    navigate(
                                                        `/manager/update-coupon/${coupon._id}`,
                                                    );
                                                }}
                                                className={`${user && (user as TUser).role === "seller" && "hidden"} bg-[#f0f0f0] hover:bg-gray-200 p-2 rounded-md border-[1px] border-slate-300`}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                                    />
                                                </svg>
                                            </button>
                                            <div
                                                className={`${user && (user as TUser).role === "seller" && "hidden"}`}
                                            >
                                                <DeleteCouponConfirmModal
                                                    id={coupon._id as string}
                                                    code={coupon.code}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-3 w-full text-[14px] font-bold text-center rounded">
                                No Coupon Available
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-white p-3 rounded">
                        <div className="my-[50px] flex flex-col justify-center">
                            <Spin tip="Loading">
                                <div className="content" />
                            </Spin>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const DeleteCouponConfirmModal = ({
    id,
    code,
}: {
    id: string;
    code: string;
}) => {
    const [deleteCoupon] = useDeleteCouponMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCouponDelete = async (couponId: string) => {
        const toastId = toast.loading("Deleting...", {
            position: "top-right",
        });
        try {
            const res = await deleteCoupon(couponId).unwrap();
            if (res.success) {
                toast.success(res.message || "Coupon deleted successfully", {
                    id: toastId,
                    duration: 2000,
                });
                setIsModalOpen(false);
            } else {
                toast.error(res.message || "Failed to delete coupon", {
                    id: toastId,
                    duration: 2000,
                });
            }
        } catch (error: any) {
            toast.error(error.data.message || "Failed to delete coupon", {
                id: toastId,
                duration: 2000,
            });
        }
    };

    return (
        <div>
            <button
                className="bg-red-500 hover:bg-red-400 text-white p-2 rounded-md"
                onClick={showModal}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                </svg>
            </button>
            <Modal
                title={`Delete Coupon - ${code}`}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <div className="my-5 text-[12px] bg-slate-300 px-3 py-2 font-medium">
                    <h4 className="font-mono">Coupon Code: {code}</h4>
                    <p className="text-[13px]">
                        Are you sure? Once you delete this coupon, it will be
                        removed from the system.
                    </p>
                </div>
                <div className="flex flex-row justify-center gap-3 my-10">
                    <button
                        onClick={() => {
                            handleCouponDelete(id);
                        }}
                        className="bg-black hover:bg-opacity-80 min-w-[80px] text-white px-5 py-2 rounded-md"
                    >
                        Yes
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-400 min-w-[80px] text-white px-5 py-2 rounded-md"
                        onClick={handleCancel}
                    >
                        No
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Coupons;
