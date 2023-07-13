import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import mainReducer from './reducers/mainReducer';

const reducer = combineReducers({
  mainStore: mainReducer,
});

const store = configureStore({ reducer });

export default store;
