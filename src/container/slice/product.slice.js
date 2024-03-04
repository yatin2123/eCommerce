import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const initialState = {
    isLoding: false,
    product: [],
    error: null,
}

export const addproduct = createAsyncThunk(
    "product/add",
    async (data) => {
        console.log("Data:", data);

        let prodata = { ...data };
        console.log("Prodata:", prodata);
        const rno = Math.floor(Math.random() * 100000);
        console.log(rno);
        const storageRef = ref(storage, 'product/' + rno + "_" + data.file.name);
        console.log("Storage Reference:", storageRef);
        // 'file' comes from the Blob or File API
        console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
        try {
            const snapshot = await uploadBytes(storageRef, data.file);
            console.log('Uploaded a blob or file!', snapshot);

            const url = await getDownloadURL(snapshot.ref);
            console.log(url);

            const aptdoc = await addDoc(collection(db, "product"), { ...data, file: url, file_name: rno + '_' + data.file.name });
            console.log('aaaaaaaaaaaaaaaaa', aptdoc.id);

            prodata = { id: aptdoc.id, ...data, file: url, file_name: rno + '_' + data.file.name };
        } catch (error) {
            console.log('Error uploading file:', error);
        }
        return prodata

    }
)

export const getproduct = createAsyncThunk(
    "product/get",
    async () => {
        let data = [];
        const querySnapshot = await getDocs(collection(db, "product"));
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
        });
        return data;
    }
)

export const deleteproduct = createAsyncThunk(
    "product/delete",
    async (data) => {
        const desertRef = ref(storage, 'product/' + data.file_name);
        console.log(desertRef);

        await deleteObject(desertRef).then(async (data) => {
            await deleteDoc(doc(db, "product", data.id));
            console.log(data.id);
        }).catch((error) => {
            console.log(error);
        });
        return data.id;
    }
)

export const updateproduct = createAsyncThunk(
    "product/update",

    async (data) => {
        console.log(data);
        let prodata = []
        if (typeof data.file === 'string') {
            console.log('rrrrrrrrrrrrrrrrrrrrrrr');
            const washingtonRef = doc(db, "product", data.id);
            let prodata = { ...data };
            delete prodata.id;
            console.log("Prodata:", prodata);

            await updateDoc(washingtonRef, { ...data, id: data.id });
        } else {

            const desertRef = ref(storage, 'product/' + data.file_name);
            console.log(desertRef);

            await deleteObject(desertRef).then(async (data) => {
                const rno = Math.floor(Math.random() * 100000);
                console.log(rno);

                const storageRef = ref(storage, 'product/' + rno + "_" + data.file.name);
                console.log("Storage Reference:", storageRef);
                // 'file' comes from the Blob or File API
                console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
                await uploadBytes(storageRef, data.file).then(async (snapshot) => {
                    console.log('Uploaded a blob or file!', snapshot);

                    await getDownloadURL(snapshot.ref)
                        .then(async (url) => {
                            console.log(url);

                            const washingtonRef = doc(db, "product", data.id);
                            let prodata = { ...data };
                            delete prodata.id;
                            console.log("Prodata:", prodata);

                            await updateDoc(washingtonRef, { ...data, id: data.id });
                            prodata.id = data.id
                        })
                    console.log(prodata);
                }).catch((e) => console.log(e))

            }).catch((error) => {
                console.log(error);
            });
        }
        return prodata
    }
)

export const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(addproduct.pending, (state) => {
            state.isLoding = true;
        });

        builder.addCase(addproduct.fulfilled, (state, action) => {
            console.log(action);
            state.product = state.product.concat(action.payload);
            state.isLoding = false
        });

        builder.addCase(addproduct.rejected, (state, action) => {
            state.isLoding = false;
            state.error = action.error.message;
        });


        builder.addCase(getproduct.pending, (state) => {
            state.isLoding = true;
        });

        builder.addCase(getproduct.fulfilled, (state, action) => {
            console.log(action.payload);
            state.product = action.payload;
            state.isLoding = false;
        })

        builder.addCase(getproduct.rejected, (state) => {
            state.isLoding = false;
        });


        builder.addCase(deleteproduct.pending, (state) => {
            state.isLoding = true;
        });

        builder.addCase(deleteproduct.fulfilled, (state, action) => {
            state.product = state.product.filter((v) => v.id !== action.payload)
            state.isLoding = false;
        })

        builder.addCase(deleteproduct.rejected, (state) => {
            state.isLoding = false;
        })

        

        builder.addCase(updateproduct.fulfilled, (state, action) => {
            state.product = state.product.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                    return v
                }
            })
        })
    },
})
export default productSlice.reducer