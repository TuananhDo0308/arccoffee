// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';


import { version } from 'process';
import signinReducer from '../slices/UIcomponentSlice/SigninPopUpSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [], // Only auth will be persisted
};

const rootReducer = combineReducers({
  signin:signinReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false, 
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;