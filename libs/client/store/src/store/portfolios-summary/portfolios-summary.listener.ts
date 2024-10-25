import { isAnyOf } from '@reduxjs/toolkit';
import { AppStartListening } from '..';
import { addNewLotAction } from '../lots';
import { loadPortfolioAction } from '../portfolios/portfolios.reducer';
import { loadPositionsAction } from '../positions';
import { PortfolioSummaryState, setPortfolioSummary } from './portfolios-summary.reducer';

export const addPortfolioSummaryListener = (startListening: AppStartListening) => {
  startListening({
    matcher: isAnyOf(loadPortfolioAction.fulfilled, loadPositionsAction.fulfilled, addNewLotAction.fulfilled),
    effect: ({ payload }, { dispatch, getState }) => {
      console.log('Portfolio Summary Listener', payload);
      const positions = getState().positions.positionsDictionary;

      if (!positions) {
        return;
      }

      const list = Object.values(positions);

      // Calculate Portfolio Summary
      const portfolioSummary: PortfolioSummaryState = list.reduce<PortfolioSummaryState>(
        (acc, position) => {
          acc.totalMarketValue += position?.marketValue ?? 0;
          acc.totalCostBasis += position?.costBasis ?? 0;
          acc.totalSymbols += 1;
          acc.unrealizedGains = {
            total: acc.totalMarketValue - acc.totalCostBasis,
            percentage: (acc.totalMarketValue - acc.totalCostBasis) / acc.totalCostBasis,
          };

          return acc;
        },
        {
          totalCostBasis: 0,
          totalMarketValue: 0,
          totalSymbols: 0,
          cashHoldings: 0,
          realizedGains: 0,
          unrealizedGains: {
            total: 0,
            percentage: 0,
          },
        }
      );

      dispatch(setPortfolioSummary(portfolioSummary));
    },
  });
};
