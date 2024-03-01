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
  getDocs,
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

    let catdata = { ...data };

    console.log(catdata);

    const rno = Math.floor(Math.random() * 1000);
    console.log(rno);



    const storageRef = ref(storage, 'category/' + rno + "_" + data.file.name);
    console.log("Storage Reference:", storageRef);


    // 'file' comes from the Blob or File API
    console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
    try {
      const snapshot = await uploadBytes(storageRef, data.file);
      console.log('Uploaded a blob or file!', snapshot);

      const url = await getDownloadURL(snapshot.ref);
      console.log(url);

      const aptdoc = await addDoc(collection(db, "category"), { ...data, file: url, file_name: rno + '_' + data.file.name });
      console.log('aaaaaaaaaaaaaaaaa', aptdoc.id);

      catdata = { id: aptdoc.id, ...data, file: url, file_name: rno + '_' + data.file.name };
    } catch (error) {
      console.log('Error uploading file:', error);
      // Handle the error here
    }

    return catdata
  }
);

export const deleteShopdata = createAsyncThunk(
  "category/delete",
  async (data) => {
    const desertRef = ref(storage, 'category/' + data.file_name);
        console.log(desertRef);

        await deleteObject(desertRef).then(async (data) => {
            await deleteDoc(doc(db, "category", data.id));
            console.log(data.id);

        }).catch((error) => {
            console.log(error);
        });

        return data.id;
  }
);

export const getShopdata = createAsyncThunk("category/get", async () => {
  let data = [];

  const querySnapshot = await getDocs(collection(db, "category"));
  querySnapshot.forEach((doc) => {
    console.log('444444444444', { ...doc.data(), id: doc.id });
    data.push({ ...doc.data(), id: doc.id });
  });

  // const querySnapshot = await getDocs(collection(db, "category"));
  // querySnapshot.forEach((doc) => {
  //   console.log(`${doc.id} => ${doc.data()}`);
  // });

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

      state.shop = state.shop.concat(action.payload);

    });

    builder.addCase(deleteShopdata.fulfilled, (state, action) => {
      state.shop = state.shop.filter((v) => v.id !== action.payload);
    });

    builder.addCase(getShopdata.fulfilled, (state, action) => {
      console.log(action.payload);
      state.shop = action.payload;
    });

    builder.addCase(updateShopdata.fulfilled, (state, action) => {
      console.log(action.payload);
      state.shop = state.shop.map((v) => {
        if (v.id === action.payload.id) {
          return action.payload;
        } else {
          return v;
        }
      });
    });
  },
});

export default shopSlice.reducer;
