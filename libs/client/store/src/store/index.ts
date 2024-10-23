import { configureStore, createListenerMiddleware, TypedStartListening } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import lotsReducer from './lots/lots.reducer';
import { addPortfolioSummaryListener } from './portfolios-summary/portfolios-summary.listener';
import portfoliosSummaryReducer from './portfolios-summary/portfolios-summary.reducer';
import portfoliosReducer from './portfolios/portfolios.reducer';
import positionsReducer from './positions/positions.reducer';

const reducer = {
  portfolios: portfoliosReducer,
  portFoliosSummary: portfoliosSummaryReducer,
  positions: positionsReducer,
  lots: lotsReducer,
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
