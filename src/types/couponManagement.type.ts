export type TCoupon = {
    _id: string;
    code: string;
    discountType: "percentage" | "fixed";
    discountAmount: number;
    minOrder: number;
    haveMaxDiscount: boolean;
    maxDiscount?: number;
    startDate: string;
    expiryDate: string;
    isDeleted?: boolean;
};

export type TCreateCoupon = {
    _id: string;
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
