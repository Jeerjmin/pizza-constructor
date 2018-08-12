const INITIAL_STATE = {
    fillings: []
};

const FilterFillings = (state, action) => {
    const result = action.data.reduce((acc, el) => {
        const key = '' + el.type;
        const newEl = {...el, count: 1}
        acc[key] = acc[key] ? [...acc[key], newEl] : [newEl];
        return acc;
    }, {});

    return {...state, isFetching: false, fillings: result}
}

export const FillingsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case 'REQUEST_FILLINGS': return {...state}
    case 'REQUEST_FILLINGS_SUCCESS': return FilterFillings(state, action)
    case 'REQUEST_FILLINGS_ERROR': return {...state, errorsMsg: action.error}
    }
    return state
}
