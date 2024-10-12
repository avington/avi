import {
  calculateTotalShares,
  calculateTotalCostBasis,
  calculateTotalMarketValue,
  averageCostBasis,
} from './cost-bases';
import { Lot } from '@avi/global/models';

describe('Cost Bases Calculations', () => {
  const lots: Lot[] = [
    {
      id: '1',
      symbol: 'AAPL',
      portfolioId: '1',
      user: 'user1',
      transactionType: 'BUY',
      shares: 10,
      costPerShare: 150,
      openDate: new Date(),
      createdAt: new Date(),
      price: 160,
    },
    {
      id: '2',
      symbol: 'AAPL',
      portfolioId: '1',
      user: 'user1',
      transactionType: 'SELL',
      shares: 5,
      costPerShare: 150,
      openDate: new Date(),
      createdAt: new Date(),
      price: 155,
    },
    {
      id: '3',
      symbol: 'AAPL',
      portfolioId: '1',
      user: 'user1',
      transactionType: 'BUY',
      shares: 20,
      costPerShare: 140,
      openDate: new Date(),
      createdAt: new Date(),
      price: 150,
    },
  ];

  describe('totalShares', () => {
    it('should calculate the total shares correctly', () => {
      expect(calculateTotalShares(lots)).toBe(25);
    });

    it('should return 0 for an empty array', () => {
      expect(calculateTotalShares([])).toBe(0);
    });
  });

  describe('totalCostBasis', () => {
    it('should calculate the total cost basis correctly', () => {
      expect(calculateTotalCostBasis(lots)).toBe(3550);
    });

    it('should return 0 for an empty array', () => {
      expect(calculateTotalCostBasis([])).toBe(0);
    });
  });

  describe('totalMarketValue', () => {
    it('should calculate the total market value correctly', () => {
      expect(calculateTotalMarketValue(lots, 10)).toBe(250);
    });

    it('should return 0 for an empty array', () => {
      expect(calculateTotalMarketValue([], 10)).toBe(0);
    });
  });

  describe('averageCostBasis', () => {
    it('should calculate the average cost basis correctly', () => {
      expect(averageCostBasis(lots)).toBeCloseTo(142);
    });

    it('should return 0 for an empty array', () => {
      expect(averageCostBasis([])).toBe(0);
    });
  });
});
