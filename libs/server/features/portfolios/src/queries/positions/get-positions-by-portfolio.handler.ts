import { Request, Response } from 'express';
import positionsSchema from '../../schemas/positions.schema';
import { StatusCodes } from 'http-status-codes';

export const getPositionsByPortfolioHandler = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? 'anonymous';
  const portfolioId = req.params['portfolioId'] as string;

  const positions = await positionsSchema.find({ user, portfolioId });
  res.status(StatusCodes.OK).json(
    positions.map((position) => ({
      ...position.toObject(),
      id: position._id,
    }))
  );
};
