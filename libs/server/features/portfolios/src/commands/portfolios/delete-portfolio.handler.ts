import { Request, Response } from 'express';
import portfolioSchema from '../../schemas/portfolio.schema';
import { StatusCodes } from 'http-status-codes';

export const deletePortfolioHandler = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';
  const id = req.params['id'] as string;

  const result = await portfolioSchema.findOneAndDelete({ user, _id: id });
  if (result) {
    res.status(StatusCodes.OK).json({ id: result.id });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ error: 'Portfolio not found' });
  }
};
