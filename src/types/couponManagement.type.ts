export type TCoupon = {
    code: string;
    discountType: "percentage" | "fixed";
    discountAmount: number;
    minOrder: number;
    haveMaxDiscount: boolean;
    maxDiscount?: number;
    startDate: Date;
    expiryDate: Date;
    isDeleted?: boolean;
};
