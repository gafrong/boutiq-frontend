import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import authReducer from './Redux/state/authSlice';
import cartItems from './Redux/Reducers/cartItem';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

// Reducer Store Set
const persistConfig = { key: "root", storage:AsyncStorage, version: 1 };
const reducer = combineReducers({
  cartItems: cartItems,
  authReducer,
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