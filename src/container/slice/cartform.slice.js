import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";




const initialState = {
  isLoding: false,
  order: [],
  error: null,
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

export const getOrder = createAsyncThunk(
  "order/get",

  async () => {
    let data = [];
  
    const querySnapshot = await getDocs(collection(db, "order"));
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
  
    return data;
  }
)

export const deleteorder = createAsyncThunk(
  "order/delete",

  async (id) => {
    console.log(id);

    await deleteDoc(doc(db, "order", id));

    return id;
  }
)

export const updateorder = createAsyncThunk(
  "order/update",

  async (data) => {
    console.log(data);
          
    const washingtonRef = doc(db, "order", data.id);

    let orderData = { ...data, id: data.id };
    delete orderData.id;
    console.log(orderData);

    await updateDoc(washingtonRef, orderData);
    return data;
  }
)



export const cartformSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addOrder.fulfilled, (state, action) => {

      console.log(action);
      state.order = state.order.concat(action.payload)
    });

    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.order = action.payload;
    })

    builder.addCase(deleteorder.fulfilled, (state, action) => {
      state.order = state.order.filter((v) => v.id !== action.payload)
    })

    builder.addCase(updateorder.fulfilled, (state, action) => {
      console.log(action);
      state.order = state.order.map((v) => {
        if(v.id === action.payload){
            return action.payload
        } else {
          return v
        }
      })
      
    })
  }
})

export default cartformSlice.reducer;