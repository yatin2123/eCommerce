import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
// import { auth } from "../../firebase";

export const signupAPI = (data) => {
    console.log(data);
    try {
        return new Promise(function (resolve, reject) {
            createUserWithEmailAndPassword(auth, data.email, data.con_phone)
                .then((userCredential) => {

                    const user = userCredential.user;

                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            resolve({ massege: "Email verification" })
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
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return errorMessage
    }
}


export const loginAPI = (data) => {
   
    console.log(data);
    try {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(auth, data.email, data.phone)

                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;

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

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return errorMessage
    }
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