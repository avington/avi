import { Router } from 'express';
import {
  deletePositionHandler,
  getPosition,
  getPositions,
  getPositionsByPortfolio,
  insertPositionHandler,
  patchPositionHandler,
} from '../controllers/positions.controller';

const positionsRouter: Router = Router();

positionsRouter.route('/').get(getPositions).post(insertPositionHandler);
positionsRouter.route('/portfolio/:portfolioId').get(getPositionsByPortfolio);
positionsRouter.route('/:id').get(getPosition).patch(patchPositionHandler).delete(deletePositionHandler);

export { positionsRouter };
