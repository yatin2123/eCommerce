import { AAD_SHOP } from "../ActionType";


export const initialValues = {
    isLoding: false,
    shop: [],
    error: null,
}


export const shopReducer = (state = initialValues, action) => {
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