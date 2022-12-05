import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';

import cartItems from './Reducers/cartItem';
import likeVideoReducer from './Reducers/likeVideoReducer';

const reducer = combineReducers({
    cartItems: cartItems,
    likeVideoReducer: likeVideoReducer
})

const store = configureStore({
    reducer,
})

export default store;