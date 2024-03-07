import { AUTH_ERROR, LOGIN_RESPONSE, LOGOUT_USER, SIGNUP_REQWEST, SIGNUP_RESPONSE } from "../ActionType";

export const initialValues = {
    isLoding: false,
    user: null,
    error: null,
}

export const signupReducer = (state = initialValues, action) => {
    console.log(action);

    switch (action.type) {
        case SIGNUP_REQWEST:

            return state;

        case SIGNUP_RESPONSE:
            return {
                isLoding: false,
                user: null,
                error: null,
            };

        case LOGIN_RESPONSE:
            // console.log("responseeeeeeeeeeeeeeeeeeeeeeee", action.payload);
            return {
                isLoding: false,
                user: action.payload,
                error: null,
            };
        case AUTH_ERROR:
            return {
                isLoding: false,
                user: null,
                error: action.paylod,
            };

        case LOGOUT_USER:
            return {
                isLoding: false,
                user: null,
                erroe: null
            }
        default:
            return state
    }

}