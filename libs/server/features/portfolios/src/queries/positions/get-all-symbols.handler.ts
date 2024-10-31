import { Request, Response } from 'express';
import positionsSchema from '../../schemas/positions.schema';
import { StatusCodes } from 'http-status-codes';

/**
 * Handler to get all distinct active symbols for a user.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response with an array of distinct active symbols.
 *
 * @remarks
 * This handler fetches all distinct symbols from the positionsSchema
 * where the user is the one specified in the environment variable
 * `NX_PUBLIC_DEV_USER` or 'anonymous' if the variable is not set,
 * and the positions are active.
 *
 * @example
 * // Example usage:
 * // Assuming this handler is used in an Express route
 * app.get('/api/symbols', getAllPositionsHandler);
 */
export const getAllPositionsHandler = async (req: Request, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? 'anonymous';

  const positions = await positionsSchema.find({ user, isActive: true });

  res.status(StatusCodes.OK).json(positions ?? []);
};
