import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { auth } from "../../firebase";

export const signupAPI = (data) => {
    console.log(data);

    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, data.email, data.con_phone)
            .then((userCredential) => {

                const user = userCredential.user;
                console.log(user);

                sendEmailVerification(auth.currentUser)
                    .then(async () => {
                        const userdata = { ...data, uid: user.uid}
                       
                        // const docRef = addDoc(collection(db, "user"), userdata);
                        // console.log(docRef);

                        const newDocRef = doc(collection(db, "user"), user.uid);
                        await setDoc(newDocRef, userdata);

                        resolve({ massege: "Email verification", user: user })
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.massege;
                        reject({ massege: errorMessage })
                    })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                if (errorCode.localeCompare("auth/email-already-in-use") === 0) {
                    reject({ massege: "Email already use" })
                } else if (errorCode.localeCompare("auth/weak-password") === 0) {
                    reject({ massege: "min 6 Character" })
                }
            });
    })
}


export const loginAPI = (data) => {
    console.log(data);

    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, data.email, data.phone)

            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);

                if (user.emailVerified) {
                    resolve({ massege: 'Login Successfully.', user: user })
                } else {
                    reject({ massege: 'Emaiil is not verified.' })
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                reject({ message: errorMessage })
            });
    })
}

export const forgetAPI = (data) => {
    console.log(data);
    try {
        return new Promise((resolve, reject) => {
            sendPasswordResetEmail(auth, data.email)
                .then(() => {
                    resolve({ massege: "Reset password and email id." })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    reject({ message: errorMessage })
                });
        })

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return errorMessage
    }
}

export const logoutAPI = (data) => {
    console.log(data);

    return new Promise((resolve, reject) => {
        signOut(auth).then(() => {
            resolve({ message: 'Logout Successfully.' });
        }).catch((error) => {
            reject({ message: "Somthing went wrong." })
        });
    })
}
