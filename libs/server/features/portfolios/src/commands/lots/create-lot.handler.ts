import { Request, Response } from 'express';
import positionsSchema from '../../schemas/positions.schema';
import { StatusCodes } from 'http-status-codes';
import lotsSchema from '../../schemas/lots.schema';
import { Lot } from '@avi/global/models';

export const createLotHandler = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';
  const portfolioId = req.body.portfolioId;
  const symbol = req.body.symbol;

  const position = await positionsSchema.findOne({ user, portfolioId, symbol });
  if (!position) {
    res.status(StatusCodes.NOT_FOUND).json({ error: 'Position not found' });
    return;
  }
  try {
    const newLot = new lotsSchema({
      ...req.body,
      user,
      portfolioId,
      symbol,
      openDate: new Date(req.body.openDate),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const result = await newLot.save();
    const id = result._id;
    const response = result.toJSON() as Lot;
    res.status(StatusCodes.CREATED).json({ ...response, id });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};
