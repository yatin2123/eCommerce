import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const initialState = {
  isLoding: false,
  subcategory: [],
  error: null,
};

export const addsubcategory = createAsyncThunk(
  "subcategory/add",

  async (data) => {
    console.log(data);

    try {
      const docRef = await addDoc(collection(db, "subcategory"), data);
      console.log("Document written with ID: ", docRef.id);

      return { ...data, id: docRef.id };
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
);

export const subcategorySlice = createSlice({
  name: "subcategory",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addsubcategory.fulfilled, (state, action) => {
      console.log(action);
      state.subcategory = state.subcategory.concat(action.payload);
    });
  },
});

export default subcategorySlice.reducer;
