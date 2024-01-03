import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteObject,
  getDownloadURL,
  getMetadata,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
// import { db, storage } from "../firebase";
import { Collections, DoorBack } from "@mui/icons-material";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";

const initialState = {
  isLoding: false,
  shop: [],
  error: null,
};

export const addShopdata = createAsyncThunk(
  "category/add",

  async (data) => {
    console.log(data);

    try {
      const docRef = await addDoc(collection(db, "category"), data);
      console.log("Document written with ID: ", docRef.id);

      return { ...data, id: docRef.id };
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
);

export const deleteShopdata = createAsyncThunk(
  "category/delete",
  async (id) => {
    console.log(id);

    await deleteDoc(doc(db, "category", id));

    return id;
  }
);

export const getShopdata = createAsyncThunk("category/get", async () => {
  let data = [];

  const querySnapshot = await getDoc(collection(db, "category"));
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });

  return data;
});

export const updateShopdata = createAsyncThunk("category/put", async (data) => {
  console.log(data);
  const washingtonRef = doc(db, "category", data.id);

  let shopData = { ...data, id: data.id };
  delete shopData.id;

  await updateDoc(washingtonRef, shopData);
  return data;
});

export const shopSlice = createSlice({
  name: "shop",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addShopdata.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isLoding = false;
      state.shop = state.shop.concat(action.payload);
      state.error = null;
    });

    builder.addCase(deleteShopdata.fulfilled, (state, action) => {
      state.shop = state.shop.filter((v) => v.id !== action.payload);
    });

    builder.addCase(getShopdata.fulfilled, (state, action) => {
      state.shop = action.payload;
    });

    builder.addCase(updateShopdata.fulfilled, (state, action) => {
      state.shop = state.shop.map((v) => {
        if (v.id === action.payload) {
          return action.payload;
        } else {
          return v;
        }
      });
    });
  },
});

export default shopSlice.reducer;
