import { Lot } from '@avi/global/models';
import mongoose, { Schema } from 'mongoose';
import { calculateTotalCostBasis, calculateTotalShares } from '@avi/global/services';
import Position from './positions.schema';
import Portfolio from './portfolio.schema';

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
    const lotsForPortfolio = await LotModel.find({ user, portfolioId });

    const sharesPortfolio = calculateTotalShares(lotsForPortfolio);
    const totalCostBasisPortfolio = calculateTotalCostBasis(lotsForPortfolio);
    const averageCostBasisPortfolio = totalCostBasisPortfolio / sharesPortfolio;

    console.log('Calculated values:', {
      totalCostBasis: totalCostBasisPortfolio,
      averageCostBasis: averageCostBasisPortfolio,
    });

    console.log('users', user);
    console.log('portfolioId', portfolioId);

    const result = await Portfolio.updateOne(
      { user, _id: portfolioId },
      {
        $set: {
          totalCostBasis: totalCostBasisPortfolio,
          averageCostBasis: averageCostBasisPortfolio,
        },
      }
    );
    console.log('Portfolio update result:', result);

    // Update position
    const lotsForSymbol = lotsForPortfolio.filter((lot) => lot.symbol === symbol);
    const sharesSymbol = calculateTotalShares(lotsForSymbol);
    const totalCostBasisSymbol = calculateTotalCostBasis(lotsForSymbol);
    const averageCostBasisSymbol = totalCostBasisSymbol / sharesSymbol;

    console.log('Calculated values:', {
      shares: sharesSymbol,
      totalCostBasis: totalCostBasisSymbol,
      averageCostBasis: averageCostBasisSymbol,
    });

    const resultSymbol = await Position.updateOne(
      { user, portfolioId, symbol },
      {
        $set: {
          totalCostBasis: totalCostBasisSymbol,
          averageCostBasis: averageCostBasisSymbol,
          shares: sharesSymbol,
        },
      }
    );
    console.log('Position update result:', resultSymbol);
  } catch (error) {
    console.error(error);
    throw new Error('Error updating portfolio and position');
  }
});

export default mongoose.model<Lot>('Lot', lotsSchema);
