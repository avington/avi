import { configureStore, createListenerMiddleware, TypedStartListening } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './auth.reducer';
import { addPortfolioSummaryListener } from './portfolios-summary.listener';
import portfoliosReducer from './portfolios.reducer';
import portfoliosSummaryReducer from './portfolios-summary.reducer';

const reducer = {
  auth: authReducer,
  portfolios: portfoliosReducer,
  portFoliosSummary: portfoliosSummaryReducer,
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

// listeners
addPortfolioSummaryListener(startAppListening);