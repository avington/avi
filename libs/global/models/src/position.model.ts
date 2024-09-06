import { Lot } from './lot.model';

export interface Position {
  id: string;
  portfolioId: string;
  symbol: string;
  shares: number;
  costBasis: number;
  unrealizedGains: number;
  realizedGains: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  lots: Lot[];
}
