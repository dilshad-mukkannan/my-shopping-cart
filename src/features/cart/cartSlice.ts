import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
    id: number;
    title: string;
    price: number;
    image: string
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find((item) => item.product.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({product: action.payload, quantity: 1});
            }
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.product.id !== action.payload);
        },

        updateQuantity: (state, action: PayloadAction<{productId: number, quantity: number}>) => {
            const item = state.items.find((item) => item.product.id === action.payload.productId);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },

        loadItems: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
            console.log("Loading items into cart:", action.payload);
        }
    }
});

export const {addToCart, removeFromCart, updateQuantity, loadItems} = cartSlice.actions;
export default cartSlice.reducer;