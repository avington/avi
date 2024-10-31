import { isAnyOf } from '@reduxjs/toolkit';
import { AppStartListening } from '..';
import { loadEmptyQuotePortfolios } from './quote-update.reducer';

export const updateQuoteListener = (startListening: AppStartListening) => {
  // TODO: Implement the listener
  // const url = (process.env.VITE_API_URL || '') + '/quotes';
  startListening({
    matcher: isAnyOf(loadEmptyQuotePortfolios),
    effect: ({ payload }, { dispatch, getState }) => {
      console.log('Quote Update Listener', payload);
    },
  });
};
