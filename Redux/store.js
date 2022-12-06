import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';

import cartItems from './Reducers/cartItem';
import authReducer from './state/authSlice';

const reducer = combineReducers({
    cartItems: cartItems,
    authReducer,
})

const store = configureStore({
    reducer,
})

export default store;