const INITIAL_STATE = {};

const getAdminList = (state, action) => {
    let pizzasArray = action.data.pizzas;
    console.log('reducerAdmin',pizzasArray)
    return {...state, pizzas:action.data.pizzas}
}


export const AdminListReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
    case 'SUCCESS_ADMIN_LIST': return getAdminList(state, action)
    }
    return state
}
