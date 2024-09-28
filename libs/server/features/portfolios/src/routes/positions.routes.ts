import { Router } from 'express';
import {
  deletePositionHandler,
  getPosition,
  getPositions,
  insertPositionHandler,
  patchPositionHandler,
} from '../controllers/positions.controller';

const positionsRouter: Router = Router();

positionsRouter.route('/').get(getPositions).post(insertPositionHandler);
positionsRouter.route('/:id').get(getPosition).patch(patchPositionHandler).delete(deletePositionHandler);

export { positionsRouter };
