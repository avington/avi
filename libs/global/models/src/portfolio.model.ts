import { Position } from './position.model';

export interface Portfolio {
  id?: string;
  user: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
  totalSymbols?: number;
  totalCostBases?: number;
  dayChange?: {
    amount: number;
    percentage: number;
  };
  totalMarketValue?: number;
  cashHoldings?: number;
  realizedGains?: {
    total: { amount: number; percentage: number };
    shortTerm: { amount: number; percentage: number };
    longTerm: { amount: number; percentage: number };
  };
  unrealizedGains?: {
    total: { amount: number; percentage: number };
    shortTerm: { amount: number; percentage: number };
    longTerm: { amount: number; percentage: number };
  };
  positions?: Position[];
}
