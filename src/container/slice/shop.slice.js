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

    'shop/add',

    async (data) => {
        console.log(data);
        const rno = Math.floor(Math.random() * 100000);
        const storageRef = ref(storage, 'shop/' + rno + "_" + data);
        let shopdata = { ...data };
        console.log(shopdata);

        // 'file' comes from the Blob or File API

        await uploadBytes(storageRef, data).then(async (snapshot) => {
            console.log('Uploaded a blob or file!');
            await getDownloadURL(snapshot.ref)
                .then(async (url) => {
                    console.log(url);
                    try {
                        const docRef = await addDoc(collection(db, "users"), {
                            first: "Ada",
                            last: "Lovelace",
                            born: 1815
                        });
                        // console.log("Document written with ID: ", docRef.id);
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }

                })
            console.log(shopdata);
        })
            .catch((error) => console.log(error))

        return shopdata;
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
