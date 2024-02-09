import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";



const initialState = {
    order: []
}

export const addOrder = createAsyncThunk(
    "order/add",

    async (data) => {
        console.log(data);
    
        try {
          const docRef = await addDoc(collection(db, "order"), data);
          console.log("Document written with ID: ", docRef.id);
    
          return { ...data, id: docRef.id };
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
)
 

export const cartformSlice = createSlice({
    name: "order",
    initialState : initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addOrder.fulfilled, (state, action) => {

            console.log(action);
            state.order = state.order.concat(action.payload)
        })
    }
})

export default cartformSlice.reducer;