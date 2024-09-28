import { isAnyOf } from '@reduxjs/toolkit';
import { AppStartListening } from '..';
import { loadPortfolioAction } from '../portfolios/portfolios.reducer';

export const addPortfolioSummaryListener = (startListening: AppStartListening) => {
  startListening({
    matcher: isAnyOf(loadPortfolioAction.fulfilled),
    effect: ({ payload }, { dispatch, getState }) => {
      console.log('Portfolio Summary Listener', payload);
    },
  });
};
