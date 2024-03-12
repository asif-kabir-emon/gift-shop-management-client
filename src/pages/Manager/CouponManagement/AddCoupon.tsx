/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import GForm from "../../../components/form/GForm";
import GInput from "../../../components/form/GInput";
import GDatePicker from "../../../components/form/GDatePicker";
import GSelect from "../../../components/form/GSelect";
import {
    discountTypeOptions,
    haveMaxDiscountOptions,
} from "../../../constants/coupon";
import { zodResolver } from "@hookform/resolvers/zod";
import { couponSchema } from "../../../Schemas/coupon.schema";
import { useCreateCouponMutation } from "../../../redux/feature/coupon/couponManagement.api";
import { toast } from "sonner";
import { TCreateCoupon } from "../../../types/couponManagement.type";
import { useNavigate } from "react-router";

const AddCoupon = () => {
    const navigate = useNavigate();
    const [createCoupon] = useCreateCouponMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (
            data.expiryDate.toISOString().split("T")[0] <
            data.startDate.toISOString().split("T")[0]
        ) {
            toast.error("Expiry Date must be greater than Start Date", {
                position: "top-right",
            });
            return;
        }
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

        console.log(couponData);

        try {
            const response = await createCoupon(couponData).unwrap();
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
        <div className="flex flex-col gap-5">
            <div>
                <h2 className="text-center bg-white py-3 text-3xl font-bold rounded">
                    Add Coupon
                </h2>
            </div>
            <div className="bg-white px-5 py-7 rounded">
                <GForm
                    onSubmit={onSubmit}
                    resolver={zodResolver(couponSchema)}
                    disableReset={true}
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
                        Add Coupon
                    </button>
                </GForm>
            </div>
        </div>
    );
};

export default AddCoupon;
