import { auth } from 'express-oauth2-jwt-bearer';
import authReducer from './reducers/auth.reducer';
import { configureStore, createListenerMiddleware, createStore, TypedStartListening } from '@reduxjs/toolkit';

const reducer = {
  auth: authReducer,
};

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

// add strongly typed interfaces
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export const startAppListening = listenerMiddleware.startListening as AppStartListening;
