import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, getDoc } from "firebase/firestore";
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
  
    const querySnapshot = await getDoc(collection(db, "order"));
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
  }
})

export default cartformSlice.reducer;