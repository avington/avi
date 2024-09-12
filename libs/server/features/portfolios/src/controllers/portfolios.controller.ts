import { Request, Response } from 'express';
import { fetchUserPortfolios, insertPortfolio, patchPortfolio } from '../services/portfolios.services';
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
  const portfolio = await insertPortfolio({ ...req.body, email: user });
  const mappedPortfolio = mapPortfolio(portfolio as Portfolio);
  res.status(201).json(mappedPortfolio);
};

export const patchPortfolioHandler = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';
  const result = await patchPortfolio({ ...req.body, email: user });

  res.status(200).json({ id: result?.id });
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
