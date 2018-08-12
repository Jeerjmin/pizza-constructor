import { combineReducers } from 'redux';
import { FillingsReducer } from './fillings';
import { PizzaReducer } from './pizza';
import { AdminListReducer } from './adminlist';

export const reducers = combineReducers({
    FillingsStore: FillingsReducer,
    PizzaStore: PizzaReducer,
    AdminListStore:AdminListReducer
});
