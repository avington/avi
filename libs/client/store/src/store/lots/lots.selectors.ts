import { Lot } from '@avi/global/models';
import { createSelector } from '@reduxjs/toolkit';

export const selectLotsLoadingStatus = createSelector(
  (root) => root.lots,
  (lots) => lots?.loadingStatus
);

export const selectLots = createSelector(
  (root) => root.lots,
  (lots) => lots?.lots
);

export const selectLotsDictionary = createSelector(
  (root) => root.lots,
  (lots) => lots?.lotsDictionary
);

export const selectLotsError = createSelector(
  (root) => root.lots,
  (lots) => lots?.error
);

export const selectLotsBySymbolPortfolioId = createSelector(
  selectLots,
  (state, props) => props.portfolioId,
  (state, props) => props.symbol,
  (lots, portfolioId, symbol) => {
    return (lots ?? []).filter((lot: Lot) => lot.portfolioId === portfolioId && lot.symbol === symbol) as Lot[];
  }
);