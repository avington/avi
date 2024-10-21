import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import positionSchema from '../schemas/positions.schema';
import { getFullQuote } from '../services/fmp/full-quote.service';
import portfolioSchema from '../schemas/portfolio.schema';
import { Position } from '@avi/global/models';

export const getPositions = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? 'anonymous';

  const positions = await positionSchema.find({ user });
  res.status(StatusCodes.OK).json(
    positions.map((position) => ({
      ...position.toObject(),
      id: position._id,
    }))
  );
};

export const getPositionsByPortfolio = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? 'anonymous';
  const portfolioId = req.params['portfolioId'] as string;

  const positions = await positionSchema.find({ user, portfolioId });
  res.status(StatusCodes.OK).json(
    positions.map((position) => ({
      ...position.toObject(),
      id: position._id,
    }))
  );
};

export const getPosition = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? 'anonymous';
  const id = req.params['id'] as string;

  const position = await positionSchema.findOne({ user, _id: id });
  if (position) {
    res.status(StatusCodes.OK).json({
      ...position.toObject(),
      id: position._id,
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ error: 'Position not found' });
  }
};

export const insertPositionHandler = async (req: Request, res: Response) => {
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

  const position = await positionSchema.create(newPosition);
  const response = {
    ...position.toObject(),
    id: position._id,
  };

  console.log('positions', response);
  res.status(StatusCodes.CREATED).json(response);
};

export const patchPositionHandler = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';
  const id = req.params['id'] as string;
  const symbol = req.body.symbol;
  const quantity = req.body.quantity;
  const price = req.body.price;
  try {
    const existingPosition = await positionSchema.findById(id);
    if (!existingPosition) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Position not found' });
    } else if (existingPosition.user !== user) {
      res.status(StatusCodes.FORBIDDEN).json({ error: 'User not authorized to update this position' });
    }

    const result = await positionSchema.findByIdAndUpdate(id, {
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

export const deletePositionHandler = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';
  const id = req.params['id'] as string;
  try {
    const existingPosition = await positionSchema.findById(id);
    if (!existingPosition) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Position not found' });
    } else if (existingPosition.user !== user) {
      res.status(StatusCodes.FORBIDDEN).json({ error: 'User not authorized to update this position' });
    }

    const result = await positionSchema.findByIdAndDelete(id);
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
