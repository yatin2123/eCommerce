import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [] // Change the initial state to an empty array
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addtocart: (state, action) => {
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.qty++;
            } else {
                state.cart.push({id: action.payload, qty: 1});
            }
        },
        incrementqty: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload);
            if (item) {
                item.qty++;
            }
        },
        decrementqty: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload);
            if (item && item.qty > 1) {
                item.qty--;
            }
        },
        deleteCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
        }
    }
});

export const { addtocart, incrementqty, decrementqty, deleteCart } = cartSlice.actions;

export default cartSlice.reducer;