import { combineReducers } from "redux";

import { signupReducer } from "./auth.reducer";
// import { shopSlice }from "../../container/slice/shop.slice";
import alertSlice from "../../container/slice/alert.slice";
import { shopReducer } from "./shop.reducer";
import shopSlice from "../../container/slice/shop.slice";
import subcategorySlice from "../../container/slice/subcategory.slice";
import productSlice from "../../container/slice/product.slice";
import cartSlice from "../../container/slice/cart.slice";

export const rootReduce = combineReducers({
  auth: signupReducer,
  alert: alertSlice,
  shop: shopSlice,
  sbucategory: subcategorySlice,
  product: productSlice,
  cart: cartSlice,
});
