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

const mapPortfolio: MapPortfolioType = (portfolio: Portfolio) => {
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
    realizedGains: portfolio.realizedGains,
    unrealizedGains: portfolio.unrealizedGains,
    positions: portfolio.positions,
  };
};
