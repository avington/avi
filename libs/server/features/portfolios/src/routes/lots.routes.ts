import { Router } from 'express';
import {
  deleteLotHandler,
  getLotsByPortfolioId,
  getLotsByStockSymbol,
  patchLotHandler,
  postLotHandler,
} from '../controllers/lots.controller';
import { validatePostLot } from '../validators/lots.validator';

const lotsRouter: Router = Router();

lotsRouter.route('/').post(...validatePostLot, postLotHandler);
lotsRouter.route('/:portfolioId').get(getLotsByPortfolioId);
lotsRouter.route('/:portfolioId/stock/:symbol').get(getLotsByStockSymbol);
lotsRouter.route('/:id').patch(patchLotHandler).delete(deleteLotHandler);

export { lotsRouter };
