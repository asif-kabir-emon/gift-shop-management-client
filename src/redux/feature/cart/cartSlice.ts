import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

export type TCartItem = {
    productId: string;
    productName: string;
    image: string;
    maxQuantity: number;
    price: number;
    quantity: number;
};

type TCartState = {
    cartItems: TCartItem[];
};

const parsedCartItems = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") ?? "")
    : {
          cartItems: [],
      };

const initialState: TCartState = {
    cartItems: parsedCartItems.cartItems || [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.productId === newItem.productId,
            );

            if (!existingItem) {
                state.cartItems.push({
                    productId: newItem.productId,
                    productName: newItem.productName,
                    image: newItem.image,
                    maxQuantity: newItem.maxQuantity,
                    price: newItem.price,
                    quantity: 1,
                });

                toast.success("Added to cart", {
                    position: "top-center",
                    duration: 1000,
                });
            } else {
                existingItem.quantity += 1;
            }
            localStorage.setItem("cart", JSON.stringify(state));
        },
        decreaseCart: (state, action) => {
            const id = action.payload.productId;
            const existingItem = state.cartItems.find(
                (item) => item.productId === id,
            );

            if (existingItem && existingItem.quantity === 1) {
                state.cartItems = state.cartItems.filter(
                    (item) => item.productId !== id,
                );
            } else if (existingItem) {
                existingItem.quantity--;
            }

            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            const id = action.payload.productId;

            state.cartItems = state.cartItems.filter(
                (item) => item.productId !== id,
            );
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem("cart");
        },
    },
});

export const { addToCart, decreaseCart, removeFromCart, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
