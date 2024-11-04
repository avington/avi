import { Request, Response } from 'express';
import portfolioSchema from '../../schemas/portfolio.schema';
import { StatusCodes } from 'http-status-codes';
import { getFullQuote } from '../../services/fmp/quote.service';
import { Position } from '@avi/global/models';
import positionsSchema from '../../schemas/positions.schema';

export const createPositionHandler = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';

  // check if the portfolio exists
  const portfolio = await portfolioSchema.findById(req.body.portfolioId);
  if (!portfolio) {
    res.status(StatusCodes.NOT_FOUND).json({ error: 'Portfolio not found' });
    return;
  }

  // get the full quote from 3rd party API
  const [quote] = await getFullQuote(req.body.symbol);

  console.log('quote', quote);
  const newPosition: Position = {
    ...req.body,
    ...quote,
    user: user,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  console.log('newPosition', newPosition);

  const position = await positionsSchema.create(newPosition);
  const response = {
    ...position.toObject(),
    id: position._id,
  };

  console.log('positions', response);
  res.status(StatusCodes.CREATED).json(response);
};
