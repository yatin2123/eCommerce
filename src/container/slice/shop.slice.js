import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteObject, getDownloadURL, getMetadata, getStorage, ref, uploadBytes } from "firebase/storage";
// import { db, storage } from "../firebase";
import { Collections, DoorBack } from "@mui/icons-material";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../firebase";



const initialState = {
    isLoding: false,
    shop: [],
    error: null
}

export const addShopdata = createAsyncThunk(

    'category/add',

    async (data) => {
        console.log(data);

        try {
            const docRef = await addDoc(collection(db, "category"), data);
            console.log("Document written with ID: ", docRef.id);

            return { ...data, id: docRef.id }
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }
)

export const shopSlice = createSlice({
    name: 'shop',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addShopdata.fulfilled, (state, action) => {

            console.log(action.payload);
            state.isLoding = false;
            state.shop = state.shop.concat(action.payload);
            state.error = null;
        })
    }
})

export default shopSlice.reducer 
