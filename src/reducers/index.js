import { globalReducer } from './globalReducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
    clickState: globalReducer
});