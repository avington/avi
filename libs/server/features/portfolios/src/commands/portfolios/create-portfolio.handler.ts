import { Request, Response } from 'express';
import portfolioSchema from '../../schemas/portfolio.schema';
import { Portfolio } from '@avi/global/models';
import { mapPortfolio } from '../../mappings';

export const createPortfolioHandler = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';

  const newPortfolio = {
    user: user,
    name: req.body.name,
    description: req.body.description,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const portfolio = await portfolioSchema.create(newPortfolio);
  const mappedPortfolio = mapPortfolio(portfolio as Portfolio);
  res.status(201).json(mappedPortfolio);
};
