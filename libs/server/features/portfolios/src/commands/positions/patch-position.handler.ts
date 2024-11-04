import { Request, Response } from 'express';
import positionsSchema from '../../schemas/positions.schema';
import { StatusCodes } from 'http-status-codes';
import { getFullQuote } from '../../services/fmp/quote.service';

export const patchPositionHandler = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';
  const id = req.params['id'] as string;
  const symbol = req.body.symbol;
  const quantity = req.body.quantity;
  const price = req.body.price;
  try {
    const existingPosition = await positionsSchema.findById(id);
    if (!existingPosition) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Position not found' });
    } else if (existingPosition.user !== user) {
      res.status(StatusCodes.FORBIDDEN).json({ error: 'User not authorized to update this position' });
    }

    // get the full quote from 3rd party API
    const [quote] = await getFullQuote(req.body.symbol);

    const result = await positionsSchema.findByIdAndUpdate(id, {
      ...quote,
      user: user,
      symbol,
      quantity,
      price,
      updatedAt: new Date(),
    });

    if (result) {
      res.status(StatusCodes.OK).json({ id: result.id });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Position not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};
