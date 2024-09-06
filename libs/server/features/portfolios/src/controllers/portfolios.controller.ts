import { Request, Response } from 'express';

export const getPortfolios = (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';

  res.status(200).json({ message: 'Getting portfolios!' });
};
