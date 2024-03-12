/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import GForm from "../../../components/form/GForm";
import GInput from "../../../components/form/GInput";
import GSelect from "../../../components/form/GSelect";
import {
    discountTypeOptions,
    haveMaxDiscountOptions,
} from "../../../constants/coupon";
import { zodResolver } from "@hookform/resolvers/zod";
import { couponSchema } from "../../../Schemas/coupon.schema";
import {
    useGetCouponByIdQuery,
    useUpdateCouponMutation,
} from "../../../redux/feature/coupon/couponManagement.api";
import { toast } from "sonner";
import { TCreateCoupon } from "../../../types/couponManagement.type";
import { useNavigate, useParams } from "react-router";
import { Spin } from "antd";
import moment from "moment";
import GDatePicker from "../../../components/form/GDatePicker";
import dayjs from "dayjs";

function convertNumbersToStrings(
    obj: Record<string, any>,
): Record<string, any> {
    const newObj: Record<string, any> = {};

    for (const [key, value] of Object.entries(obj)) {
        if (key === "startDate" || key === "expiryDate") {
            newObj[key] = dayjs(
                moment(value).format("YYYY-MM-DD"),
                "YYYY-MM-DD",
            );
        } else if (typeof value === "number") {
            newObj[key] = value.toString();
        } else {
            newObj[key] = value;
        }
    }

    return newObj;
}

const UpdateCoupon = () => {
    const navigate = useNavigate();
    const param = useParams();
    const { data: couponData, isLoading: isCouponDataLoading } =
        useGetCouponByIdQuery(param.couponId);
    const [updateCoupon] = useUpdateCouponMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (data.startDate > data.expiryDate) {
            toast.error("Start Date must be less than Expiry Date", {
                position: "top-right",
            });
            return;
        }
        if (data.discountType === "percentage" && data.discountAmount > 100) {
            toast.error(
                "Discount Amount must be <= 100 (as discount type is percentage)",
                {
                    position: "top-right",
                },
            );
            return;
        }
        if (
            data.haveMaxDiscount &&
            (!data.maxDiscount || data.maxDiscount <= 0)
        ) {
            toast.error("Maximum Discount is required", {
                position: "top-right",
            });
            return;
        }
        console.log(data.expiryDate.toISOString().split("T")[0]);

        const toastId = toast.loading("Adding Coupon...", {
            position: "top-right",
        });

        const couponData: Partial<TCreateCoupon> = {
            code: data.code.toUpperCase(),
            discountType: data.discountType,
            discountAmount: Number(data.discountAmount),
            minOrder: Number(data.minOrder),
            haveMaxDiscount: data.haveMaxDiscount,
            startDate: new Date(data.startDate),
            expiryDate: new Date(data.expiryDate),
        };

        if (data.haveMaxDiscount) {
            couponData.maxDiscount = Number(data.maxDiscount);
        }

        console.log(data);

        try {
            const response = await updateCoupon({
                id: param.couponId,
                data: couponData,
            }).unwrap();
            if (response.success) {
                toast.success(response.message, {
                    id: toastId,
                });
                navigate("/manager/coupon-list");
            } else {
                toast.error(response.message, {
                    id: toastId,
                });
            }
        } catch (error: any) {
            toast.error(error.data.message || "Failed to add coupon", {
                id: toastId,
            });
        }
    };

    return (
        <div>
            {isCouponDataLoading == false ? (
                <div className="flex flex-col gap-5">
                    <div>
                        <h2 className="text-center bg-white py-3 text-3xl font-bold rounded">
                            Update Coupon
                        </h2>
                    </div>
                    <div className="bg-white px-5 py-7 rounded">
                        <GForm
                            onSubmit={onSubmit}
                            resolver={zodResolver(couponSchema)}
                            disableReset={true}
                            defaultValues={convertNumbersToStrings(
                                couponData?.data,
                            )}
                        >
                            <GInput
                                type="text"
                                name="code"
                                label="Coupon Code"
                                placeholder="Enter Coupon Code"
                            />
                            <GSelect
                                name="discountType"
                                label="Discount Type"
                                placeholder="Select Discount Type"
                                options={discountTypeOptions}
                            />
                            <GInput
                                type="text"
                                name="discountAmount"
                                label="Discount Amount"
                                placeholder="Enter Discount Amount (in percentage or fixed amount)"
                            />
                            <GInput
                                type="text"
                                name="minOrder"
                                label="Minimum Order"
                                placeholder="Enter Min Order"
                            />
                            <GSelect
                                name="haveMaxDiscount"
                                label="Have Maximum Discount"
                                placeholder="Select Maximum Discount if any"
                                options={haveMaxDiscountOptions}
                            />
                            <GInput
                                type="text"
                                name="maxDiscount"
                                label="Maximum Discount Amount"
                                placeholder="Enter Maximum Discount in fixed amount if any"
                            />
                            <GDatePicker
                                name="startDate"
                                label="Start Date"
                                placeholder="Select Start Date"
                            />
                            <GDatePicker
                                name="expiryDate"
                                label="Expiry Date"
                                placeholder="Select Expiry Date"
                            />
                            <button
                                type="submit"
                                className="bg-[var(--secondary-color)] text-[var(--primary-color)] w-full py-2 my-5 rounded-lg"
                            >
                                Update Coupon
                            </button>
                        </GForm>
                    </div>
                </div>
            ) : (
                <div className="h-[100px] flex justify-center items-center">
                    <Spin size="large" />
                </div>
            )}
        </div>
    );
};

export default UpdateCoupon;
