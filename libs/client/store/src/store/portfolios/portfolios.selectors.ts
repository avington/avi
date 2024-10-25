import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const selectPortfolios = createSelector(
  (root: RootState) => root.portfolios,
  (state) => state?.portfolios
);

export const selectSelectedPortfolio = createSelector(
  (root: RootState) => root.portfolios,
  (state) => state?.selectedPortfolio
);

export const selectPortfoliosLoadingStatus = createSelector(
  (root: RootState) => root.portfolios,
  (state) => state?.loadingStatus
);

export const selectPortfoliosError = createSelector(
  (root: RootState) => root.portfolios,
  (state) => state?.error
);

export const selectPortfolioIsLoading = createSelector(
  selectPortfoliosLoadingStatus,
  (loadingStatus) => loadingStatus === 'loading'
);

export const selectTotalCostBasis = createSelector(selectPortfolios, (portfolios) => {
  return portfolios?.reduce((acc, portfolio) => acc + (portfolio?.totalCostBasis ?? 0), 0) || 0;
});
