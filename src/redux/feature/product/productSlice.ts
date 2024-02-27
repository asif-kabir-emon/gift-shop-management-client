/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

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
    searchQuery: TSearchQueryState;
};

const initialState: TProduct = {
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

export const { setSearchQuery } = productSlice.actions;
export default productSlice.reducer;

export const useSearchParameter = (state: { product: { searchQuery: any } }) =>
    state.product.searchQuery;
