import { Request, Response } from 'express';
import positionsSchema from '../../schemas/positions.schema';
import { StatusCodes } from 'http-status-codes';

export const getPositionHandler = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? 'anonymous';
  const id = req.params['id'] as string;

  const position = await positionsSchema.findOne({ user, _id: id });
  if (position) {
    res.status(StatusCodes.OK).json({
      ...position.toObject(),
      id: position._id,
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ error: 'Position not found' });
  }
};
