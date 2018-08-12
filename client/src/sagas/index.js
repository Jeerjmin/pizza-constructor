import { put, takeEvery, call, all } from 'redux-saga/effects'
import axios from 'axios'
import history from '../config/history'
import Config from '../config/config'
import Auth from '../modules/Auth'

import {requestFillings, requestFillingsSuccess, requestFillingsError} from '../actions'
import {requestLogin, getUserData, requestLoginError} from '../actions'
import {requestSendPizza,successSendPizza,errorSendPizza} from '../actions'
import {requestAdminList, successAdminList, errorAdminList} from '../actions'
import {requestUpdateStatus, successUpdateStatus, errorUpdateStatus} from '../actions'

async function axiosData(linkRoute, method, bodyData) {
    let response = await axios(`${Config.API_URL}${linkRoute}`, {
        method,
        data: bodyData
    }).then(response => response).catch(error => error)
    return response
}

function setLoginToken(res) {
    Auth.authenticateUser(res.data.token)
    return res.data.userData
}


function* requestedAdminListAsync() {
    try {
        yield put(requestAdminList())
        const res = yield call(() => axiosData('/pizza/get','GET'))
        yield put(successAdminList(res.data))
    } catch (error) {
        yield put(errorAdminList())
    }
}

function* requestedSendPizzaAsync(action) {
    try {
        yield put(requestSendPizza())
        const res = yield call(() => axiosData('/pizza/order','POST',[action.pizzaData, action.pizzaName]))
        yield put(successSendPizza(res.data))
        yield call(() => requestedAdminListAsync())
    } catch(error) {
        yield put(requestLoginError())
    }
}


function* requestFillingsAsync() {
    try {
        yield put(requestFillings())
        const data = yield call(() => axiosData('/api/get','GET'))
        yield put(requestFillingsSuccess(data.data.fillings));
    } catch(error) {
        yield put(requestFillingsError(error));
    }
}

function* requestLoginAsync(action) {
    try {
        yield put(requestLogin())
        var res = yield call(() => axiosData('/auth/login','POST',action.formData))
        const userData = yield call(() => setLoginToken(res))
        yield put(getUserData(userData));
        yield call(history.push, '/admin');
    } catch(error) {
        yield call(()=>{setMessage(res)})
    }
}

function requestedLogout() {
    Auth.deauthenticateUser()
    console.log('requestedLogoutAsync')
}

function* requestUpdateStatusAsync(action) {
    try {
        yield put(requestUpdateStatus())
        const res = yield call(() => axiosData('/pizza/status','POST',[action.status,action.id]))
        yield put(successUpdateStatus(res))
    } catch (error) {
        yield put(errorUpdateStatus(error))
    }
}

export const WatchAll = function* root() {
    yield all([
        takeEvery("GET_FILLINGS",requestFillingsAsync),
        takeEvery("LOGIN",requestLoginAsync),
        takeEvery("LOGOUT",requestedLogout),
        takeEvery("SEND_PIZZA", requestedSendPizzaAsync),
        takeEvery("GET_ADMIN_LIST", requestedAdminListAsync),
        takeEvery("UPDATE_STATUS", requestUpdateStatusAsync)
    ])
}
