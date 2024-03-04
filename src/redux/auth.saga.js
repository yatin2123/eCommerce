import { all, call, put, takeEvery, } from 'redux-saga/effects'

// import { FORGET_REQUWEST, LOGIN_REQUWEST, SIGNUP_REQWEST } from '../ActionType'
import { forgetAPI, loginAPI, signupAPI } from '../common/api/auth.api';
import { authError, loginResponse, signupResponse } from './action/auth.action';
import { setAlert } from '../container/slice/alert.slice';
import { FORGET_REQUWEST, LOGIN_REQUWEST, SIGNUP_REQWEST } from './ActionType';
// import { forgetAPI, loginAPI, signupAPI } from '../../common/api/auth.api'
// import { authError, loginResponse, signupResponse } from '../action/auth.action';
// import { setAlert } from '../../slice/alert.slice';


function* signupUser(action) {
    console.log(action);
    try {
        const user = yield call(signupAPI, action.payload);
        console.log(user.user);
        yield put(signupResponse(user.user))
        // yield put(setAlert({ text: user.massege, color: 'success' }))
    } catch (e) {
        console.log(e);
        yield put(authError(e.message))
        // yield put(setAlert({ text: e.message, color: 'error' }))

    }
}

function* loginUser(action) {
    console.log("yyyyyyyyyyyyyyyyy");

    try {
        const user = yield call(loginAPI, action.payload)

        console.log(user);
        yield put(loginResponse(user.user))
        // yield put(setAlert({ text: user.massege, color: 'success' }))
    } catch (e) {
        console.log(e);

        yield put(authError(e.message))
        // yield put(setAlert({ text: e.message, color: 'error' }))
    }
}

function* forgetUser (action) {
    console.log('uuuuuu');
    try {
        const user = yield call(forgetAPI, action.payload)
        yield put(setAlert({ text: user.massege, color: 'success' }))
    } catch (e) {
        console.log(e);

        yield put(authError(e.message))
        yield put(setAlert({ text: e.message, color: 'error' }))
    }
}


function* watchSignup() {
    yield takeEvery(SIGNUP_REQWEST, signupUser)
}

function* watchLogin() {
    yield takeEvery(LOGIN_REQUWEST, loginUser)
}

function* watchForget() {
    yield takeEvery(FORGET_REQUWEST, forgetUser)
}

export default function* authSaga() {
    yield all([
        watchSignup(),
        watchLogin(),
        watchForget()
    ])
}