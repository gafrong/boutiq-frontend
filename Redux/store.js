import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';

// Reducers
import productReducer from './Reducers/productSlice';
import cartItems from './Reducers/cartItem';
import vendorReducer from './Reducers/vendorSlice';

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Reducer Store Set
const persistConfig = { key: "root", storage:AsyncStorage, version: 1 };
const reducer = combineReducers({
  cartItems: cartItems,
  stateProducts: productReducer,
  vendors: vendorReducer,
})
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;

