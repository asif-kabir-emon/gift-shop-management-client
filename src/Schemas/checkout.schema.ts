import { z } from "zod";

export const checkoutSchema = z.object({
    buyerName: z
        .string({
            required_error: "Name is required",
        })
        .min(3, "Name is too short"),
    buyerEmail: z
        .string()
        .email({
            message: "Invalid email",
        })
        .optional(),
    buyerPhone: z.string().min(11, "Phone number is too short").optional(),
});
