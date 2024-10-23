import { Request, Response } from 'express';
import lotsSchema from '../../schemas/lots.schema';
import { StatusCodes } from 'http-status-codes';

export const getLotsByStockSymbolHandler = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';
  const portfolioId = req.params['portfolioId'] as string;
  const symbol = req.params['symbol'] as string;
  try {
    const lots = await lotsSchema.find({ user, portfolioId, symbol });
    const lotsWithId = lots.map((lot) => ({ ...lot.toJSON(), id: lot._id }));
    res.status(StatusCodes.OK).json(lotsWithId ?? []);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};
