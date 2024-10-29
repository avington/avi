import { Request, Response } from 'express';
import portfolioSchema from '../../schemas/portfolio.schema';
import { StatusCodes } from 'http-status-codes';

export const getPortfoliosHandler = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? 'anonymous';

  const portfolios = await portfolioSchema.find({ user });

  res.status(StatusCodes.OK).json(
    portfolios.map((portfolio) => ({
      ...portfolio.toObject(),
      id: portfolio._id,
    }))
  );
};
