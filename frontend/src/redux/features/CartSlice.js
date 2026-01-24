import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,


};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === newItem.id
            );

            if (existingItem) {
                existingItem.quantity += newItem.quantity;
            } else {
                state.items.push({ ...newItem });
            }

            state.totalQuantity += newItem.quantity;
            state.totalPrice += newItem.price * newItem.quantity;
        }, removeFromCart(state, action) {
            const id = action.payload;
            const item = state.items.find((i) => i.id === id);

            if (!item) return;

            state.totalQuantity -= item.quantity;
            state.totalPrice -= item.price * item.quantity;

            state.items = state.items.filter((i) => i.id !== id);
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },

    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;