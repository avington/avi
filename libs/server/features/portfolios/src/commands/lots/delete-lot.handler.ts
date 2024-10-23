import { Request, Response } from 'express';
import lotsSchema from '../../schemas/lots.schema';
import { StatusCodes } from 'http-status-codes';

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
