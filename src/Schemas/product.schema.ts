import { z } from "zod";

export const productSchema = z.object({
    name: z.string({
        required_error: "Name is required",
    }),
    price: z
        .string({
            required_error: "Price is required",
        })
        .refine((val) => Number(val) > 0, {
            message: "Price should be greater than 0",
        }),
    quantity: z
        .string({
            required_error: "Quantity is required",
        })
        .refine((val) => Number(val) > 0, {
            message: "Quantity should be greater than 0",
        }),
    description: z.string({
        required_error: "Description is required",
    }),
    imageURL: z.string().optional(),
    category: z.string({
        required_error: "Category is required",
    }),
    brand: z.string({
        required_error: "Brand is required",
    }),
    occasion: z.string({
        required_error: "Occasion is required",
    }),
    theme: z.string({
        required_error: "Theme is required",
    }),
    isDeleted: z.boolean().optional(),
});
