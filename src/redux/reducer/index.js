import { combineReducers } from "redux";

import { signupReducer } from "./auth.reducer";

export const rootReduce = combineReducers({
   
    auth: signupReducer,

    
})