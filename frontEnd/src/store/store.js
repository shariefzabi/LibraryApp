import { createStore } from 'redux';
import { userReduce, toDoReducer, JWTReducer } from './reducers.js';
import { combineReducers } from 'redux';
const reducers = combineReducers({
    userReduce,
    toDoReducer,
    JWTReducer
})
const store = createStore(reducers);
export default store;
