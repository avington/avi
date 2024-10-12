import { Lot } from '@avi/global/models';
import mongoose, { Schema } from 'mongoose';
import { calculateTotalCostBasis, calculateTotalShares } from '@avi/global/services';
import Position from './positions.schema';

export const lotsSchema = new Schema<Lot>({
  id: { type: String },
  symbol: { type: String, required: true },
  portfolioId: { type: String, required: true },
  user: { type: String, required: true },
  transactionType: { type: String, required: true },
  shares: { type: Number, required: true },
  costPerShare: { type: Number, default: 0 },
  costBasis: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: false },
  openDate: { type: Date, required: false },
  gainsLosses: { type: Number, required: false },
  gainsLossesPercentage: { type: Number, required: false },
  marketValue: { type: Number, required: false },
  holdingPeriod: { type: String, required: false },
});

lotsSchema.post('save', async function (doc: Lot) {
  try {
    console.log('doc', doc);
    const { user, portfolioId, symbol } = doc;
    const LotModel = mongoose.model<Lot>('Lot', lotsSchema);
    const lots = await LotModel.find({ user, portfolioId, symbol });

    const shares = calculateTotalShares(lots);
    const totalCostBasis = calculateTotalCostBasis(lots);
    const averageCostBasis = totalCostBasis / shares;

    console.log('Calculated values:', { shares, totalCostBasis, averageCostBasis });

    const result = await Position.updateOne(
      { user, portfolioId, symbol },
      { $set: { totalCostBasis, averageCostBasis, shares } }
    );
    console.log('Position update result:', result);
  } catch (error) {
    console.error(error);
  }
});

export default mongoose.model<Lot>('Lot', lotsSchema);
