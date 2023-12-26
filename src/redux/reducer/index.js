import { combineReducers } from "redux";

import { signupReducer } from "./auth.reducer";
import shopSlice from "../../container/slice/shop.slice";
import alertSlice from "../../container/slice/alert.slice";

export const rootReduce = combineReducers({
   
    auth: signupReducer,
    alert: alertSlice,
    shop: shopSlice
    
})