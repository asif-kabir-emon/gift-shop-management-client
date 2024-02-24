import { createSlice } from "@reduxjs/toolkit";

type TProductState = {
    name: string;
    price: number;
    description: string;
    quantity: number;
};

const initialState: TProductState = {
    name: "",
    price: 0,
    description: "",
    quantity: 0,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProduct: (state, action) => {
            const { name, price, description, quantity } = action.payload;
            state.name = name;
            state.price = price;
            state.description = description;
            state.quantity = quantity;
        },
    },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
