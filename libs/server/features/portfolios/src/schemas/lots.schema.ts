import { Lot } from '@avi/global/models';
import mongoose, { Schema } from 'mongoose';

export const lotsSchema = new Schema<Lot>({
  id: { type: String },
  stockId: { type: String, required: true },
  portfolioId: { type: String, required: true },
  user: { type: String, required: true },
  transactionType: { type: String, required: true },
  shares: { type: Number, required: true },
  costBasis: { type: Number, required: true },
  price: { type: Number, required: false },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: false },
  openDate: { type: Date, required: false },
  costPerShare: { type: Number, required: false },
  gainsLosses: { type: Number, required: false },
  gainsLossesPercentage: { type: Number, required: false },
  marketValue: { type: Number, required: false },
  holdingPeriod: { type: String, required: false },
});

export default mongoose.model<Lot>('Lot', lotsSchema);
