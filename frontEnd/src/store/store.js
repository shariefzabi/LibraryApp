import { createStore } from 'redux';
import { userReduce, toDoReducer } from './reducers.js';
import { combineReducers } from 'redux';
const reducers = combineReducers({
    userReduce,
    toDoReducer
})
const store = createStore(reducers);
export default store;
