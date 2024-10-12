import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const selectPositionsLoadingStatus = createSelector(
  (root: RootState) => root.positions,
  (positions) => positions?.loadingStatus
);

export const selectPositions = createSelector(
  (root: RootState) => root.positions,
  (positions) => positions?.positions
);

export const selectPositionsDictionary = createSelector(
  (root: RootState) => root.positions,
  (positions) => positions?.positionsDictionary
);

export const selectPositionsError = createSelector(
  (root: RootState) => root.positions,
  (positions) => positions?.error
);

export const selectPositionGainLoss = createSelector(selectPositions, (positions) => {
  return positions?.map((position) => {
    const { symbol, price, averageCostBasis } = position;
    const gainLoss = (price ?? 0) - (averageCostBasis ?? 0);
    const gainLossPercentage = gainLoss / (averageCostBasis ?? 0);
    return { symbol, price, averageCostBasis, gainLoss, gainLossPercentage } as const;
  });
});
