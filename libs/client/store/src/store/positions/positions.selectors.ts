import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const selectPositionsLoadingStatus = createSelector(
  (root: RootState) => root.positions,
  (positions) => positions?.loadingStatus
);

export const selectPositionsDictionary = createSelector(
  (root: RootState) => root.positions,
  (positions) => positions?.positionsDictionary
);

export const selectPositions = createSelector(selectPositionsDictionary, (positionsDictionary) =>
  Object.values(positionsDictionary ?? {}).map((position) => {
    const { price } = position;

    const marketValue = (price ?? 0) * (position.shares ?? 0);
    const costBasis = (position?.averageCostBasis ?? 0) * (position.shares ?? 0);
    const gainLoss = marketValue - costBasis;
    const gainLossPercentage = gainLoss / costBasis;
    const unrealizedGains = {
      total: {
        amount: marketValue - costBasis,
        percentage: costBasis ? (marketValue - costBasis) / costBasis : 0,
      },
    };
    return {
      ...position,
      marketValue,
      costBasis,
      gainLoss,
      gainLossPercentage,
      unrealizedGains,
    };
  })
);

export const selectPositionsError = createSelector(
  (root: RootState) => root.positions,
  (positions) => positions?.error
);

export const selectPositionGainLoss = createSelector(selectPositions, (positions) => {
  return positions?.map((position) => {
    const { symbol, price, averageCostBasis } = position;
    const marketValue = (price ?? 0) * (position.shares ?? 0);
    const costBasis = (averageCostBasis ?? 0) * (position.shares ?? 0);
    const unrealizedGains = {
      total: {
        amount: marketValue - costBasis,
        percentage: costBasis === 0 ? (marketValue - costBasis) / costBasis : 0,
      },
    };
    return { symbol, price, averageCostBasis, unrealizedGains, marketValue, costBasis } as const;
  });
});

export const selectSummaryTotalCostBasis = createSelector(selectPositions, (positions) => {
  return positions?.reduce((acc, position) => acc + (position?.totalCostBasis ?? 0), 0);
});

export const selectSummaryMarketValue = createSelector(selectPositions, (positions) => {
  return positions?.reduce((acc, position) => acc + (position?.price ?? 0) * (position?.shares ?? 0), 0);
});

export const selectSummaryTotalGainLoss = createSelector(
  selectSummaryTotalCostBasis,
  selectSummaryMarketValue,
  (cost, market) => {
    return {
      amount: market - cost,
      percentage: cost ? (market - cost) / cost : 0,
    };
  }
);
