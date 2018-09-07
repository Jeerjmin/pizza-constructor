import { put, takeEvery, call, all } from 'redux-saga/effects'
import axios from 'axios'
import history from '../config/history'
import Config from '../config/config'
import Auth from '../modules/Auth'

import {requestFillingsSuccess, requestFillingsError} from '../actions'
import {getUserData, requestLoginError} from '../actions'
import {successSendPizza,errorSendPizza} from '../actions'
import {successAdminList, errorAdminList} from '../actions'
import {successUpdateStatus, errorUpdateStatus} from '../actions'

async function axiosData(linkRoute, method, bodyData) {
    let response = await axios(`${Config.API_URL}${linkRoute}`, {
        method,
        withCredentials: true,
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
        yield put({ type: "REQUEST_ADMIN_LIST" })
        const res = yield call(() => axiosData('/pizza/get','GET'))
        yield put(successAdminList(res.data))
    } catch (error) {
        yield put(errorAdminList())
    }
}

function* requestedSendPizzaAsync(action) {
    try {
        yield put({ type: "REQUEST_SEND_PIZZA" })
        const res = yield call(() => axiosData('/pizza/order','POST',[action.pizzaData, action.pizzaName]))
        yield put(successSendPizza(res.data))
        yield call(() => requestedAdminListAsync())
    } catch(error) {
        yield put(errorSendPizza())
    }
}


function* requestFillingsAsync() {
    try {
        yield put({ type: "REQUEST_FILLINGS" })
        const data = yield call(() => axiosData('/api/get','GET'))
        yield put(requestFillingsSuccess(data.data.fillings));
    } catch(error) {
        yield put(requestFillingsError(error));
    }
}

function* requestRegAsync(action) {
  try {
        const res = yield call(() => axiosData('/auth/register','POST',action.formData))
        if (res) {
            const {success, message, errors} = res.data
            if (success === true) {
              yield put({type:"REGISTRATION_SUCCESS", message})
              yield call(history.push, '/login');

            }
            else {
              yield put({type:"REGISTRATION_409_ERROR", message, errors})
            }
      }
      else {
        yield put({type:"REGISTRATION_ERROR_TIMEOUT"})
      }
    }
    catch(err) {
      yield put({type:"REGISTRATION_FAILURE", err})
    }

}


function* requestLoginAsync(action) {
    try {
      const res = yield call(() => axiosData('/auth/login', 'POST', action.formData))
      if (res) {
        const {success, user, errors} = res.data
        if (success === true) {
          yield put({type:"LOGIN_SUCCESS", user})
        }
        else {
          yield put({type:"LOGIN_409_ERROR", errors})
        }
      }
      else {
        yield put({type:"LOGIN_ERROR_TIMEOUT"})
      }
    }
    catch(err) {
      yield put({type: "LOGIN_FAILURE", err})
    }
}


function* requestedLogout() {
  try {
    const res = yield call( () => axiosData('/auth/logout', 'GET') )
    if (res) {
      yield put({type:"AUTH_LOGOUT_SUCCESS"})
      yield call(history.push, '/home');
    }
    else {
      yield put({type:"AUTH_LOGOUT_FAILED"})
    }
  }
  catch(err) {
    yield put({type:"AUTH_LOGOUT_FAILED"})
  }}


function* requestUpdateStatusAsync(action) {
    try {
        yield put({ type: "REQUEST_UPDATE_STATUS" })
        const res = yield call(() => axiosData('/pizza/status','POST',[action.status,action.id]))
        yield put(successUpdateStatus(res))
    } catch (error) {
        yield put(errorUpdateStatus(error))
    }
}

function* requestAuthLoad(action) {
  try {
    const res = yield call( () => axiosData('/auth/load', 'GET') )
    if (res) {
      const {success, result} = res.data
      if (success) {
        yield put({type:"AUTH_LOAD_SUCCESS", profile: result})

      }
      else {
        yield put({type:"AUTH_LOAD_FAILED"})
      }
    }
    else {
      yield put({type:"AUTH_LOAD_FAILED"})
    }
  }
  catch(err) {
    yield put({type:"AUTH_LOAD_FAILED"})
  }
}

function* requestUsersLoad(action) {
  try {
    const res = yield call ( () => axiosData('/auth/users', 'GET') )
    if (res) {
      const {success, users} = res.data
      if (success) {
        yield put({type:"USERS_LOAD_SUCCESS", users})
      }
      else {
        yield put({type: "USERS_LOAD_FAILED" })
      }
    }
    else {
      yield put({type: "USERS_LOAD_FAILED" })
    }
  }
  catch(err) {
    yield put({type: "USERS_LOAD_FAILED" })
  }
}

export const WatchAll = function* root() {
    yield all([
        takeEvery("GET_FILLINGS",requestFillingsAsync),
        takeEvery("REGISTRATION", requestRegAsync),
        takeEvery("LOGIN",requestLoginAsync),
        takeEvery("LOGOUT",requestedLogout),
        takeEvery("SEND_PIZZA", requestedSendPizzaAsync),
        takeEvery("GET_ADMIN_LIST", requestedAdminListAsync),
        takeEvery("UPDATE_STATUS", requestUpdateStatusAsync),
        takeEvery("AUTH_LOAD", requestAuthLoad),
        takeEvery("USERS_LOAD", requestUsersLoad)

    ])
}
