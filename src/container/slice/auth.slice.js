import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";



const initialState = {
    user: []
}

export const getuser = createAsyncThunk(
    "user/get",
    async () => {
        let data = [];
        console.log('ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg');

        const querySnapshot = await getDocs(collection(db, "user"));
        querySnapshot.forEach((doc) => {
            console.log(doc);
            data.push({ ...doc.data(), id: doc.id });
        });
        console.log(data);

        return data;
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getuser.fulfilled, (state, action) => {
            console.log(action);
            state.user = action.payload
        })
    }
})



export default userSlice.reducer;