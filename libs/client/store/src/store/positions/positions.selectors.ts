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
