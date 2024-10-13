import { Request, Response } from 'express';
import lotsSchema from '../schemas/lots.schema';
import { StatusCodes } from 'http-status-codes';
import positionsSchema from '../schemas/positions.schema';
import { Lot } from '@avi/global/models';

export const getLotsByPortfolioId = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';
  const portfolioId = req.params['portfolioId'] as string;

  try {
    const lots = await lotsSchema.find({ user, portfolioId });
    res.status(StatusCodes.OK).json(lots ?? []);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};

export const getLotsByStockSymbol = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';
  const portfolioId = req.params['portfolioId'] as string;
  const symbol = req.params['symbol'] as string;
  try {
    const lots = await lotsSchema.find({ user, portfolioId, symbol });
    const lotsWithId = lots.map((lot) => ({ ...lot.toJSON(), id: lot._id }));
    res.status(StatusCodes.OK).json(lotsWithId ?? []);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};

export const postLotHandler = async (req: Request, res: Response) => {
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

export const patchLotHandler = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';
  const id = req.params['id'] as string;
  const symbol = req.body.symbol;

  try {
    const existingLot = await lotsSchema.findById(id);
    if (!existingLot) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Lot not found' });
    } else if (existingLot.user !== user) {
      res.status(StatusCodes.FORBIDDEN).json({ error: 'User not authorized to update this lot' });
    }

    const result = await lotsSchema.findByIdAndUpdate(id, {
      ...req.body,
      user,
      symbol,
      updatedAt: new Date(),
    });
    if (result) {
      res.status(StatusCodes.OK).json({ id: result.id });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Lot not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};

export const deleteLotHandler = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';
  const id = req.params['id'] as string;
  try {
    const existingLot = await lotsSchema.findById(id);
    if (!existingLot) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Lot not found' });
    } else if (existingLot.user !== user) {
      res.status(StatusCodes.FORBIDDEN).json({ error: 'User not authorized to delete this lot' });
    }

    const result = await lotsSchema.findByIdAndDelete(id);
    if (result) {
      res.status(StatusCodes.OK).json({ id: result.id });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Lot not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};
