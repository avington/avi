import { Position } from './position.model';

export interface Portfolio {
  id: string;
  email: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
  totalSymbols?: number;
  totalMarketValue?: number;
  cashHoldings?: number;
  realizedGains?: number;
  unrealizedGains?: number;
  positions?: Position[];
}
