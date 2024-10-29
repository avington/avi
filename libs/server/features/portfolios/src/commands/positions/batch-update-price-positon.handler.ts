import { Request, Response } from 'express';
import positionsSchema from '../../schemas/positions.schema';
import { BatchQuote } from '@avi/global/models';
import { getBatchQuotes } from '../../services/fmp/full-quote.service';

export const batchUpdatePricePositionHandler = async (request: Request, response: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';
  const { portfolioId } = request.params;

  // get the list of symbols to update
  const symbols = (await positionsSchema.find({ user, portfolioId }).select('symbol')).map(
    (position) => position.symbol
  );

  const prices = (await getBatchQuotes(symbols)) as BatchQuote[];

  response.status(200).json({ user, portfolioId, prices });
};
