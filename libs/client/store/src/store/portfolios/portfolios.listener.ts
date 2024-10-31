import { isAnyOf } from '@reduxjs/toolkit';
import { loadPortfolioAction } from './portfolios.reducer';
import { AppStartListening } from '..';
import { connectToStream, sendMessage } from '../../data/quote.stream';
import { StreamMessage } from '@avi/global/models';

export const portfolioLoadedListener = (startListening: AppStartListening) => {
  startListening({
    matcher: isAnyOf(loadPortfolioAction.fulfilled),
    effect: ({ payload }, { dispatch }) => {
      connectToStream();

      const message: StreamMessage<string> = {
        type: 'update_all_quotes',
        payload: '',
      };
      sendMessage(message);
      console.log('Portfolio Listener', payload);
    },
  });
};
