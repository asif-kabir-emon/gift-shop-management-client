export type TProduct = {
    _id: string;
    name: string;
    price: string;
    quantity: string;
    description: string;
    imageURL: string;
    category: {
        _id: string;
        name: string;
    }[];
    brand: {
        _id: string;
        name: string;
    };
    occasion: {
        _id: string;
        name: string;
    }[];
    theme: {
        _id: string;
        name: string;
    }[];
    createdAt: string;
    updatedAt: string;
};
