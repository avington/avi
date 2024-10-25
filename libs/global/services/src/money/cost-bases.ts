import { Lot } from '@avi/global/models';

export const calculateTotalShares = (lots: Lot[]): number => {
  return lots.reduce((acc, lot) => {
    if (lot.transactionType === 'BUY') {
      return acc + lot.shares;
    } else if (lot.transactionType === 'SELL') {
      return acc - lot.shares;
    }
    return acc;
  }, 0);
};

export const sumTotalSymbols = (lots: Lot[]): number => {
  const symbols: string[] = lots.map((lot) => lot.symbol);
  const uniqueSymbols = Array.from(new Set(symbols));
  return uniqueSymbols.length;
};

export const calculateTotalCostBasis = (lots: Lot[]): number => {
  return lots.reduce((acc, lot) => {
    const lotCostBasis = lot.shares * lot.costPerShare;
    if (lot.transactionType === 'BUY') {
      return acc + lotCostBasis;
    } else if (lot.transactionType === 'SELL') {
      return acc - lotCostBasis;
    }
    return acc;
  }, 0);
};

export const calculateTotalMarketValue = (lots: Lot[], price: number): number => {
  return calculateTotalShares(lots) * price;
};

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
    const costBasis = lot.shares * lot.costPerShare;
    if (lot.transactionType === 'BUY') {
      return acc + costBasis;
    } else if (lot.transactionType === 'SELL') {
      return acc - costBasis;
    }
    return acc;
  }, 0);

  return totalCost / totalShares;
};
