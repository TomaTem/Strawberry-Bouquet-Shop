import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import mainReducer from './reducers/mainReducer';
import { deleteCartReducer } from './reducers/mainReducer';

const reducer = combineReducers({
  mainStore: mainReducer,
  deleteCartStore: deleteCartReducer,
});

const store = configureStore({ reducer });

export default store;
