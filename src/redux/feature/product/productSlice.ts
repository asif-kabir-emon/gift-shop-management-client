import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";

type TProductState = {
    name: string;
    price: number;
    quantity: number;
    description: string;
};

type TSearchQueryState = {
    name: string;
    minPrice: number;
    maxPrice: number;
    category: string;
    brand: string;
    occasion: string;
    theme: string;
};

type TProduct = {
    products: TProductState;
    searchQuery: TSearchQueryState;
};

const initialState: TProduct = {
    products: {
        name: "",
        price: 0,
        description: "",
        quantity: 0,
    },
    searchQuery: {
        name: "",
        minPrice: 0,
        maxPrice: -1,
        category: "",
        brand: "",
        occasion: "",
        theme: "",
    },
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProduct: (state, action) => {
            const { name, price, description, quantity } = action.payload;
            state.products.name = name;
            state.products.price = price;
            state.products.description = description;
            state.products.quantity = quantity;
        },
        setSearchQuery: (state, action) => {
            const {
                name,
                minPrice,
                maxPrice,
                category,
                brand,
                occasion,
                theme,
            } = action.payload;
            state.searchQuery.name = name;
            state.searchQuery.minPrice = minPrice;
            state.searchQuery.maxPrice = maxPrice;
            state.searchQuery.category = category;
            state.searchQuery.brand = brand;
            state.searchQuery.occasion = occasion;
            state.searchQuery.theme = theme;
        },
    },
});

export const { setProduct, setSearchQuery } = productSlice.actions;
export default productSlice.reducer;

export const useSearchParameter = (state: RootState) =>
    state.product.searchQuery;
