import { createStore } from 'redux';
import { JWTReducer } from './reducers.js';
import { combineReducers } from 'redux';
const reducers = combineReducers({
    JWTReducer
})
const store = createStore(reducers);
export default store;
