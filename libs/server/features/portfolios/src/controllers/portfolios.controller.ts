import { Request, Response } from 'express';
import { fetchUserPortfolios } from '../services/portfolios.services';

export const getPortfolios = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';

  const rawPortfolios = await fetchUserPortfolios(user);

  const portfolios = rawPortfolios
    .filter((p) => p.isActive)
    .map((portfolio) => ({
      id: portfolio.id,
      name: portfolio.name,
      isActive: portfolio.isActive,
      email: portfolio.email,
      description: portfolio.description,
      createdAt: portfolio.createdAt,
    }));

  res.status(200).json(portfolios);
};
