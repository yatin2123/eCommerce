import { AUTH_ERROR, FORGET_REQUWEST, LOGIN_REQUWEST, LOGIN_RESPONSE, SIGNUP_REQWEST, SIGNUP_RESPONSE } from "../ActionType"

export const signupReqwest = (data) => (dispatch) => {
    console.log(data);
    dispatch({ type: SIGNUP_REQWEST, payload: data })
}

export const signupResponse = (data) => (dispatch) => {
    console.log(data);
    dispatch({ type: SIGNUP_RESPONSE, payload: data })
}

export const authError = (data) => (dispatch) => {
    console.log(data);
    dispatch({ type: AUTH_ERROR, payload: data })
}

export const loginReqwest = (data) => (dispatch) => {
    console.log(data);
    dispatch({ type: LOGIN_REQUWEST, payload: data })
}

export const loginResponse = (data) => (dispatch) => {
    console.log(data);
    dispatch({ type: LOGIN_RESPONSE, payload: data })
}

export const forgetReqwest = (data) => (dispatch) => {
    console.log(data);
    dispatch({ type: FORGET_REQUWEST, payload: data })
}