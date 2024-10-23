import { Request, Response } from 'express';
import positionsSchema from '../../schemas/positions.schema';
import { StatusCodes } from 'http-status-codes';

export const deletePositionHandler = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';
  const id = req.params['id'] as string;
  try {
    const existingPosition = await positionsSchema.findById(id);
    if (!existingPosition) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Position not found' });
    } else if (existingPosition.user !== user) {
      res.status(StatusCodes.FORBIDDEN).json({ error: 'User not authorized to update this position' });
    }

    const result = await positionsSchema.findByIdAndDelete(id);
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
