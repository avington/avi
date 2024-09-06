import { auth } from 'express-oauth2-jwt-bearer';
import authReducer from './auth.reducer';
import portfoliosReducer from './portfolios.reducer';
import { configureStore, createListenerMiddleware, createStore, TypedStartListening } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const reducer = {
  auth: authReducer,
  portfolios: portfoliosReducer,
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

// store hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
