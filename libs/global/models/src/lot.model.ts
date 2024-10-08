export type TransactionType = 'BUY' | 'SELL';

export interface Lot {
  openDate: Date;
  id?: string;
  stockId: string;
  symbol: string;
  portfolioId: string;
  user: string;
  transactionType: TransactionType;
  shares: number;
  costPerShare: number;
  costBasis?: number;
  price?: number;
  marketValue?: number;
  holdingPeriod: 'Long Term' | 'Short Term';
  gainsLosses: number;
  gainsLossesPercentage: number;
  createdAt?: Date;
  updatedAt?: Date;
}
