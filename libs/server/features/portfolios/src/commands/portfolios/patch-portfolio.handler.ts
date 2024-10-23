import { Request, Response } from 'express';
import portfolioSchema from '../../schemas/portfolio.schema';
import { StatusCodes } from 'http-status-codes';

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
