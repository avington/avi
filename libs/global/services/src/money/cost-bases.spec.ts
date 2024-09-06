import { averageCostBasis } from './cost-bases';
import { Lot } from '@avi/global/models';

describe('averageCostBasis', () => {
  it('should return the correct average cost basis for BUY transactions', () => {
    const lots: Lot[] = [
      { transactionType: 'BUY', shares: 10, costBasis: 100, stockId: '1' },
      { transactionType: 'BUY', shares: 20, costBasis: 200, stockId: '1' },
    ];
    expect(averageCostBasis(lots)).toBe(10);
  });

  it('should return the correct average cost basis for mixed BUY and SELL transactions', () => {
    const lots: Lot[] = [
      { transactionType: 'BUY', shares: 10, costBasis: 100, stockId: '1' },
      { transactionType: 'SELL', shares: 5, costBasis: 50, stockId: '1' },
      { transactionType: 'BUY', shares: 20, costBasis: 200, stockId: '1' },
    ];
    expect(averageCostBasis(lots)).toBe(10);
  });

  it('should handle an empty array of lots', () => {
    const lots: Lot[] = [];
    expect(averageCostBasis(lots)).toBe(0);
  });
});
