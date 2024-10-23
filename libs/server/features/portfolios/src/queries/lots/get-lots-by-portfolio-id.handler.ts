import { Request, Response } from 'express';
import lotsSchema from '../../schemas/lots.schema';
import { StatusCodes } from 'http-status-codes';

export const getLotsByPortfolioIdHandler = async (req: Request, res: Response) => {
  console.log('made it here', req.params);
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';
  const portfolioId = req.params['portfolioId'] as string;

  try {
    const lots = await lotsSchema.find({ user, portfolioId });
    res.status(StatusCodes.OK).json(lots ?? []);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};
