import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    cart: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducer: {
        addtocart: (state, action) => {

            console.log(action);
            let check = state.cart.some((v) => v.id === action.payload.id)
            console.log(check);

            if (check) {
                let index = state.cart.findIndex((v) => v.id === action.payload.id)
                state.cart[index].qty++
                console.log(index);
            } else {
                state.cart.push((action.payload))
            }

            state.cart = state.cart;
        },
        incrementqty: (state, action) => {
            let index1 = state.cart.findIndex((v) => v.id === action.payload)
            state.cart[index1].qty++
        },

        decrementqty: (state, action) => {
            let index2 = state.cart.findIndex((v) => v.id === action.payload);

            if (state.cart[index2].qty > 1) {
                state.cart[index2].qty--
            }
            state.cart = state.cart;
        },

        deleteCart: (state, action) => {
            const removecart = state.cart.filter((v) => v.id !== action.payload);
            state.cart = removecart;
        }
    }

})

export const { addtocart, incrementqty, decrementqty, deleteCart } = cartSlice.actions

export default cartSlice.reducer