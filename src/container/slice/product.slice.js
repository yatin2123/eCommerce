import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import storage from "redux-persist/lib/storage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


const initialState = {
    isLoding: false,
    product: [],
    error: null,
}

export const addproduct = createAsyncThunk(
    "product/add",

    async (data) => {
        console.log(data);


        let aptdata = { ...data };
        console.log(aptdata)
        const rno = Math.floor(Math.random() * 100000);
        console.log(rno);
        const storageRef = ref(storage, 'appointment/' + rno + "_" + data.file.name);
       
        await uploadBytes(storageRef, data.file).then(async (snapshot) => {
            console.log('yyyyyyyyyyyyyyyyyyyyyyyy');
            await getDownloadURL(snapshot.ref).then(async (url) => {

                let proapt = await addDoc(collection(db, "produce"), {...data, file: url, file_name: rno + '_' + data.file.name});
                aptdata = { id: proapt.id, ...data, file: url, file_name: rno + '_' + data.file.name }
            }) .catch((error) => console.log(error))

        }) .catch((error) => console.log(error))

        return aptdata;

        // try {      
        //     const docRef = await addDoc(collection(db, "produce"), data);

        //     console.log("Document written with ID: ", docRef.id);

        //     return { ...data, id: docRef.id };
        // } catch (e) {
        //     console.error("Error adding document: ", e);
        // }
    }
)

export const getproduct = createAsyncThunk(
    "product/get",
    async () => {
        let data = [];

        const querySnapshot = await getDoc(collection(db, "product"));
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
        });

        return data;
    }
)

export const deleteproduct = createAsyncThunk(
    "product/delete",

    async (id) => {
        console.log(id);

        await deleteDoc(doc(db, "product", id));

        return id;
    }
)

export const updateproduct = createAsyncThunk(
    "product/update",
    
    async (data) => {
        console.log(data);
        const washingtonRef = doc(db, "category", data.id);
      
        let productData = { ...data, id: data.id };
        delete productData.id;
      
        await updateDoc(washingtonRef, productData);
        return data;
    }
)

export const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addproduct.fulfilled, (state, action) => {
            console.log(action);      
            state.product = state.product.concat(action.payload);
        });

        builder.addCase(getproduct.fulfilled, (state, action) => {
            state.product = action.payload;
        })

        builder.addCase(deleteproduct.fulfilled, (state, action) => {
            state.product = state.product.filter((v) => v.id !== action.payload)
        })

        builder.addCase(updateproduct.fulfilled, (state, action) => {
            state.product = state.product.map((v) => {
                if(v.id === action.payload.id){
                    return action.payload
                } else {
                    return v
                }
            })
        })
    },
})
export default productSlice.reducer