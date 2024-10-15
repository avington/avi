import { Request, Response } from 'express';
import { Portfolio } from '@avi/global/models';
import portfolioSchema from '../schemas/portfolio.schema';
import StatusCodes from 'http-status-codes';

export const getPortfolios = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? 'anonymous';

  const portfolios = await portfolioSchema.find({ user });
  res.status(StatusCodes.OK).json(
    portfolios.map((portfolio) => ({
      ...portfolio.toObject(),
      id: portfolio._id,
    }))
  );
};

export const getPortfolio = async (req: Request, res: Response) => {
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

export const insertPortfolioHandler = async (req: Request, res: Response) => {
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

export const patchPortfolioHandler = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';
  const id = req.params['id'] as string;
  const name = req.body.name;
  const description = req.body.description;
  try {
    const result = await portfolioSchema.findByIdAndUpdate(id, {
      user: user,
      name,
      description,
      updatedAt: new Date(),
    });

    if (result) {
      res.status(StatusCodes.OK).json({ id: result.id });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Portfolio not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};

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

type MapPortfolioType = (portfolio: Portfolio) => Portfolio;

const mapPortfolio: MapPortfolioType = (portfolio: Portfolio): Portfolio => {
  const totalRealized = portfolio?.realizedGains?.total ?? { amount: 0, percentage: 0 };
  const shortTermRealized = portfolio?.realizedGains?.shortTerm ?? { amount: 0, percentage: 0 };
  const longTermRealized = portfolio?.realizedGains?.longTerm ?? { amount: 0, percentage: 0 };
  const totalUnrealized = portfolio?.unrealizedGains?.total ?? { amount: 0, percentage: 0 };
  const shortTermUnrealized = portfolio?.unrealizedGains?.shortTerm ?? { amount: 0, percentage: 0 };
  const longTermUnrealized = portfolio?.unrealizedGains?.longTerm ?? { amount: 0, percentage: 0 };

  return {
    id: portfolio.id,
    user: portfolio.user,
    name: portfolio.name,
    description: portfolio?.description,
    createdAt: portfolio?.createdAt,
    updatedAt: portfolio?.updatedAt,
    isActive: portfolio?.isActive,
    totalSymbols: portfolio.totalSymbols,
    totalMarketValue: portfolio.totalMarketValue,
    cashHoldings: portfolio.cashHoldings,
    realizedGains: {
      ...portfolio?.realizedGains,
      total: totalRealized,
      shortTerm: shortTermRealized,
      longTerm: longTermRealized,
    },
    unrealizedGains: {
      ...portfolio?.unrealizedGains,
      total: totalUnrealized,
      shortTerm: shortTermUnrealized,
      longTerm: longTermUnrealized,
    },
    positions: portfolio.positions,
    totalCostBasis: portfolio.totalCostBasis,
    dayChange: portfolio.dayChange,
  };
};
