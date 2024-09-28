import { Position } from '@avi/global/models';
import mongoose, { Schema } from 'mongoose';
import { lotsSchema } from './lots.schema';

const positionsSchema = new Schema<Position>({
  id: { type: String },
  name: { type: String },
  symbol: { type: String, required: true },
  averageCostBasis: { type: Number, required: false },
  avgVolume: { type: Number, required: false },
  change: { type: Number, required: false },
  changesPercentage: { type: Number, required: false },
  createdAt: { type: Date, required: true },
  dayHigh: { type: Number, required: false },
  dayLow: { type: Number, required: false },
  earningsAnnouncement: { type: Date, required: false },
  exchange: { type: String, required: false },
  isActive: { type: Boolean, required: true },
  lots: { type: [lotsSchema], required: false },
  marketCap: { type: Number, required: false },
  open: { type: Number, required: false },
  pe: { type: Number, required: false },
  portfolioId: { type: String, required: true },
  previousClose: { type: Number, required: false },
  price: { type: Number, required: false },
  priceAvg200: { type: Number, required: false },
  priceAvg50: { type: Number, required: false },
  realizedGains: { type: Object, required: false },
  sharesOutstanding: { type: Number, required: false },
  unrealizedGains: { type: Object, required: false },
  updatedAt: { type: Date, required: false },
  volume: { type: Number, required: false },
  eps: { type: Number, required: false },
  yearHigh: { type: Number, required: false },
  yearLow: { type: Number, required: false },
  timestamp: { type: Number, required: false },
  user: { type: String, required: true },
});

export default mongoose.model<Position>('Position', positionsSchema);
