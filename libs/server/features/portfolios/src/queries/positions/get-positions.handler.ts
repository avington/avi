import { Request, Response } from 'express';
import positionsSchema from '../../schemas/positions.schema';
import { StatusCodes } from 'http-status-codes';

export const getPositionsHandler = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? 'anonymous';

  const positions = await positionsSchema.find({ user });
  res.status(StatusCodes.OK).json(
    positions.map((position) => ({
      ...position.toObject(),
      id: position._id,
    }))
  );
};
