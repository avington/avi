export type TransactionType = 'BUY' | 'SELL';

export interface Lot {
  id?: string;
  stockId: string;
  portfolioId: string;
  user: string;
  transactionType: TransactionType;
  shares: number;
  costBasis: number;
  price?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
