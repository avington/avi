import { Portfolio } from '@avi/global/models';
import mongoose, { Schema } from 'mongoose';

const portfolioSchema = new Schema<Portfolio>({
  name: { type: String, required: true },
  positions: [{ type: Schema.Types.ObjectId, ref: 'Position' }],
  description: { type: String, required: false },
  user: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, required: false },
  totalCostBasis: { type: Number, default: 0 },
  averageCostBasis: { type: Number, default: 0 },
  totalMarketValue: { type: Number, default: 0 },
  totalSymbols: { type: Number, default: 0 },
  dayChange: { type: Object, required: false },
  unrealizedGains: { type: Object, required: false },
  realizedGains: { type: Object, required: false },
});

export default mongoose.model<Portfolio>('Portfolio', portfolioSchema);
