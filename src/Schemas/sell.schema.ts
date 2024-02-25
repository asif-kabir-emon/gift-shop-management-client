import { z } from "zod";

export const sellProductSchema = z.object({
    buyerName: z.string({
        required_error: "Buyer name is required",
    }),
    quantity: z
        .string({
            required_error: "Quantity is required",
        })
        .min(1, "Quantity must be greater than 0")
        .refine((val) => Number(val) > 0, {
            message: "Quantity must be greater than 0",
        }),
});
