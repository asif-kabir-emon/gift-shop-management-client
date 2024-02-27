export type TSellInfo = {
    quantity: number;
    sellingPrice: number;
    totalAmount: number;
    discount: number;
    paidAmount: number;
    couponCode?: string;
    buyerName: string;
    sellDate: string;
    productId: string;
    sellerId: string;
};
