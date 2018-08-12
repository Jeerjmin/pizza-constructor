export const updateStatus = (status,id) => ({
    type: "UPDATE_STATUS",
    status,
    id
})

export const requestUpdateStatus = () => ({
    type: "REQUEST_UPDATE_STATUS",
})
export const successUpdateStatus = (data) => ({
    type: "SUCCESS_UPDATE_STATUS",
    data
})

export const errorUpdateStatus = (errors) => ({
    type: "ERROR_UPDATE_STATUS",
    errors
})

export const getAdminList = () => ({
    type: "GET_ADMIN_LIST"
})

export const requestAdminList = () => ({
    type: "REQUEST_ADMIN_LIST"
})

export const successAdminList = (data) => ({
    type: "SUCCESS_ADMIN_LIST",
    data
})

export const errorAdminList = (errors) => ({
    type: "ERROR_ADMIN_LIST",
    errors
})

export const sendPizza = (pizzaData, pizzaName) => ({
    type: "SEND_PIZZA",
    pizzaData,
    pizzaName
})

export const requestSendPizza = () => ({
    type: "REQUEST_SEND_PIZZA"
})

export const successSendPizza = (data) => ({
    type: "SUCCESS_SEND_PIZZA",
    data
})

export const errorSendPizza = () => ({
    type: "ERROR_SEND_PIZZA"
})

export const sendLogin = (formData) => ({
    type: "LOGIN",
    formData
})

export const requestLogin = () => ({
    type: "REQUEST_LOGIN"
})

export const getUserData = (data) => ({
    type: "GET_USER_DATA",
    data
})

export const requestLoginError = (err) => ({
    type: "REQUEST_LOGIN_ERROR",
    errors:err
})

export const sendLogout = () => ({
    type: "LOGOUT"
})
export const getFillings = () => ({
    type: "GET_FILLINGS"
})

export const requestFillings = () => ({
    type: "REQUEST_FILLINGS"
})

export const requestFillingsSuccess = (data) => ({
    type: "REQUEST_FILLINGS_SUCCESS",
    data
})

export const requestFillingsError = (error) => ({
    type: "REQUEST_FILLINGS_ERROR",
    error
})


export const chooseBaseFillings = (data) => ({
    type: "CHOOSE_BASE_FILLINGS",
    data
})

export const chooseFillings = (data) => ({
    type: "CHOOSE_FILLINGS",
    data
})

export const addCountFill = (kind) => ({
    type: "ADD_COUNT_FILL",
    kind
})

export const removeCountFill = (kind) => ({
    type: "REMOVE_COUNT_FILL",
    kind
})

export const addCount = () => ({
    type: "ADD_COUNT"
})

export const removeCount = () => ({
    type: "REMOVE_COUNT"
})
