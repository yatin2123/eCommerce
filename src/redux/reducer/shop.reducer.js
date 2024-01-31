import { AAD_SHOP } from "../ActionType";


export const initialState = {
    isLoding: false,
    shop: [],
    error: null,
}


export const shopReducer = (state = initialState, action) => {
    console.log(action);

    switch(action.type){
        case AAD_SHOP:
            return {
                isLoding: false,
                shop: action.payload,
                error: null,
            }

            default :
            return state
    }
}