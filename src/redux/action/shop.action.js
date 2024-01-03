import { API_URL } from "../../util/baseURL";
import { AAD_SHOP } from "../ActionType";


export const addShopdata =(data) => (dispatch) => {
    console.log(data);
    dispatch({type: AAD_SHOP, payload: data})
    
}