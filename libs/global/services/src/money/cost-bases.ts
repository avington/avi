import { Lot } from '@avi/global/models';

export const averageCostBasis = (lots: Lot[]): number => {
  if (lots.length === 0) {
    return 0;
  }
  const totalShares = lots.reduce((acc, lot) => {
    if (lot.transactionType === 'BUY') {
      return acc + lot.shares;
    } else if (lot.transactionType === 'SELL') {
      return acc - lot.shares;
    }
    return acc;
  }, 0);

  const totalCost = lots.reduce((acc, lot) => {
    if (lot.transactionType === 'BUY') {
      return acc + lot.costBasis;
    } else if (lot.transactionType === 'SELL') {
      return acc - lot.costBasis;
    }
    return acc;
  }, 0);

  return totalCost / totalShares;
};
