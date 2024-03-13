import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";



const initialState = {
    isLoading: false,
    review: [],
    error: null,
}

export const addreview = createAsyncThunk(
    "review/add",

    async (data) => {

        try {
            const docRef = await addDoc(collection(db, "review"), data);

            console.log("Document written with ID: ", docRef.id);

            return { ...data, id: docRef.id };
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
)

export const getreview = createAsyncThunk(
    "review/get",
    async () => {
        let data = [];

        const querySnapshot = await getDocs(collection(db, "review"));
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
        });

        return data;
    }
)

export const deletereview = createAsyncThunk(
    "review/delete",

    async (id) => {
        await deleteDoc(doc(db, "review", id));

        return id;
    }
)

export const updatereview = createAsyncThunk(
    "review/updatr",

    async (data) => {
        const washingtonRef = doc(db, "review", data.id);

        let reviewData = { ...data, id: data.id };
        delete reviewData.id;

        await updateDoc(washingtonRef, reviewData);
        return data;
    }
)

export const reviewSlice = createSlice({
    name: "review",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addreview.fulfilled, (state, action) => {
            state.review = state.review.concat(action.payload)
        })

        builder.addCase(getreview.fulfilled, (state, action) => {
            state.review = action.payload
        })

        builder.addCase(deletereview.fulfilled, (state, action) => {
            state.review = state.review.filter((v) => v.id !== action.payload)
        })

        builder.addCase(updatereview.fulfilled, (state, action) => {
            state.review = state.review.map((v) => {
                if(v.id === action.payload.id){
                    return action.payload
                } else {
                    return v
                }
            })
        })
    }
});

export default reviewSlice.reducer;