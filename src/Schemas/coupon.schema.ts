import { z } from "zod";

export const couponSchema = z.object({
    code: z.string({
        required_error: "Coupon Name is required",
    }),
    discountType: z.enum(["percentage", "fixed"], {
        required_error: "Discount Type is required",
    }),
    discountAmount: z
        .string({
            required_error: "Discount Amount is required",
        })
        .refine((val) => Number(val) > 0, {
            message: "Discount Amount must be greater than 0",
        }),
    minOrder: z
        .string({
            required_error: "Minimum Order is required",
        })
        .refine((val) => Number(val) > 0, {
            message: "Minimum Order must be greater than 0",
        }),
    haveMaxDiscount: z.boolean({
        required_error: "Have Maximum Discount is required",
    }),
    maxDiscount: z.string().optional(),
    startDate: z.any({
        required_error: "Start Date is required",
    }),
    expiryDate: z
        .any({
            required_error: "Expiry Date is required",
        })
        .refine((val) => val > new Date(), {
            message: "Expiry Date must be greater than today",
        }),
});
