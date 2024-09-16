import { Request, Response } from 'express';
import { fetchUserPortfolios, insertPortfolio, patchPortfolio } from '../services/portfolios.service';
import { Portfolio } from '@avi/global/models';

/**
 * Filters and maps the given array of raw portfolios to create a new array of portfolios.
 * Only active portfolios are included in the result.
 *
 * @param rawPortfolios - The array of raw portfolios to process.
 * @returns An array of portfolios with selected properties.
 */
export const getPortfolios = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';

  const rawPortfolios = await fetchUserPortfolios(user);

  const portfolios = rawPortfolios.filter((p) => p.isActive).map(mapPortfolio);

  res.status(200).json(portfolios);
};

export const insertPortfolioHandler = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';

  const newPortfolio = {
    email: user,
    name: req.body.name,
    description: req.body.description,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const portfolio = await insertPortfolio(newPortfolio);
  const mappedPortfolio = mapPortfolio(portfolio as Portfolio);
  res.status(201).json(mappedPortfolio);
};

export const patchPortfolioHandler = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';
  const id = req.params['id'] as string;
  const name = req.body.name;
  const description = req.body.description;
  try {
    const result = await patchPortfolio(id, { email: user, name, description, updatedAt: new Date() });
    if (result) {
      res.status(200).json({ id: result.id });
    } else {
      res.status(404).json({ error: 'Portfolio not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(501).json({ error: 'Internal server error' });
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
    email: portfolio.email,
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
    totalCostBases: portfolio.totalCostBases,
    dayChange: portfolio.dayChange,
  };
};
