import { combineReducers } from 'redux';
import { FillingsReducer } from './fillings';
import { PizzaReducer } from './pizza';
import { AdminListReducer } from './adminlist';
import { AuthReducer } from './auth'

export const reducers = combineReducers({
    FillingsStore: FillingsReducer,
    PizzaStore: PizzaReducer,
    AdminListStore:AdminListReducer,
    AuthStore:AuthReducer
});
