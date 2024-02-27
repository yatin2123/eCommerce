import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc,getDocs, updateDoc } from "firebase/firestore";
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

export const getsubcategory = createAsyncThunk(
  "subcategory/get",
  async () => {
    let data = [];

    const querySnapshot = await getDocs(collection(db, "subcategory"));
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });

    return data;
  }
)

export const deletesubcategory = createAsyncThunk(
  "subcategory/delete",
  async (id) => {

    await deleteDoc(doc(db, "subcategory", id));

    return id;

  }
)

export const updatesubcategory = createAsyncThunk(
  "subcategory/put",

  async (data) => {

    const washingtonRef = doc(db, "category", data.id);

    let shopData = { ...data, id: data.id };
    delete shopData.id;

    await updateDoc(washingtonRef, shopData);
    return data;

  }
)

export const subcategorySlice = createSlice({
  name: "subcategory",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addsubcategory.fulfilled, (state, action) => {
      console.log(action);
      state.subcategory = state.subcategory.concat(action.payload);
    });

    builder.addCase(getsubcategory.fulfilled, (state, action) => {
      state.subcategory = action.payload
    })

    builder.addCase(deletesubcategory.fulfilled, (state, action) => {
      state.subcategory = state.subcategory.filter((v) => v.id !== action.payload)
    })

    builder.addCase(updatesubcategory.fulfilled, (state, action) => {
      state.subcategory = state.subcategory.map((v) => {
        if(v.id === action.payload.id){
            return action.payload
        } else {
          return v
        }
      })
    })
  },
});

export default subcategorySlice.reducer;
