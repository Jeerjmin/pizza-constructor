const INITIAL_STATE = {
    property:{
        amount: 1,
        price: 0
    }
};

const SetBaseFillings = (state, action) => {
    const key = '' + action.data.type;
    let newProperty = {...state.property}
    let newState = {...state}
    let total = 0;

    for (let prop in newState) {
        if ((prop !== 'property') && ((prop !== 'Dough')))
            total += (newState[prop].price?(newState[prop].price*newState[prop].count*newState.property.amount):0)
    }
    newProperty.price = (action.data.price?((+action.data.price*newProperty.amount)+(total)):newProperty.price)
    return {...state, [key]:action.data, property: newProperty, successMessage: ''}
}

const SetFillings = (state, action) => {
    const key = '' + action.data.name;
    let newObj = {...action.data}

    if (state.hasOwnProperty(key)) {
        let newState = {...state}
        newState[key].count += 1
        newState.property.price+=(action.data.price*newState.property.amount)
        return newState
    }
    let newProperty = {...state.property}
    newProperty.price += (action.data.price?(+action.data.price*newProperty.amount):newProperty.price)

    return {...state, [key]:newObj,  property: newProperty, successMessage: ''}
}

const AddToCount = (state) => {
    let newState = {...state, successMessage: ''}
    newState.property.amount +=1

    let total = 0;
    for (let prop in newState) {
        if (prop !== 'property')
            total += (newState[prop].price?(newState[prop].price*newState[prop].count):0)
    }
    newState.property.price+=total

    return newState
}
const RemoveFromCount = (state) => {
    let newState = {...state, successMessage: ''}
    if (newState.property.amount !== 1) {
        let total = 0;
        for (let prop in newState) {
            if (prop !== 'property')
                total += (newState[prop].price?(newState[prop].price*newState[prop].count):0)
        }
        newState.property.amount -=1
        newState.property.price-=total
    }
    return newState
}

const AddToCountFill = (state,action) => {
    const newState = {...state, successMessage: ''};
    newState[action.kind].count +=1
    newState.property.price+=(state[action.kind].price*newState.property.amount)
    return newState
}

const RemoveFromCountFill = (state,action) => {
    const newState = {...state, successMessage: ''};
    if (newState[action.kind].count !== 0) {
        newState[action.kind].count -= 1
        newState.property.price-=(state[action.kind].price*newState.property.amount)

    }
    if (newState[action.kind].count === 0) {
        delete newState[action.kind]
    }
    return newState
}

export const PizzaReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case 'CHOOSE_BASE_FILLINGS': return SetBaseFillings(state,action)
    case 'CHOOSE_FILLINGS': return SetFillings(state,action)
    case 'ADD_COUNT': return AddToCount(state,action)
    case 'REMOVE_COUNT' : return RemoveFromCount(state,action)
    case 'ADD_COUNT_FILL' : return AddToCountFill(state,action)
    case 'REMOVE_COUNT_FILL' : return RemoveFromCountFill(state,action)
    case 'SUCCESS_SEND_PIZZA' : return {...state, successMessage:action.data.message}

    }
    return state
}
