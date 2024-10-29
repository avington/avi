import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import positionsSchema from '../../schemas/positions.schema';
import { getFullQuote } from '../../services/fmp/full-quote.service';

export const updateQuoteHandler = async (request: Request, response: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';
  const { portfolioId } = request.params;
  const { symbol } = request.body;
  const position = await positionsSchema.findOne({ user, portfolioId, symbol });

  if (!position) {
    response.status(StatusCodes.NOT_FOUND).json({ error: 'Position not found' });
    return;
  }

  const [quote] = await getFullQuote(symbol);
  const updatedPosition = {
    ...position.toObject(),
    ...quote,
    updatedAt: new Date(),
  };

  await positionsSchema.updateOne({ _id: position._id }, updatedPosition);
  response.status(StatusCodes.OK).json({ quote, updatedAt: updatedPosition.updatedAt });
};
