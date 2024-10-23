import { Request, Response } from 'express';
import portfolioSchema from '../../schemas/portfolio.schema';
import { StatusCodes } from 'http-status-codes';

export const getPortfolioHandler = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? 'anonymous';
  const id = req.params['id'] as string;

  const portfolio = await portfolioSchema.findOne({ user, _id: id });
  if (portfolio) {
    res.status(StatusCodes.OK).json({
      ...portfolio.toObject(),
      id: portfolio._id,
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ error: 'Portfolio not found' });
  }
};
