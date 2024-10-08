import { Router } from 'express';
import {
  deleteLotHandler,
  getLotsByPortfolioId,
  getLotsByStockSymbol,
  patchLotHandler,
  postLotHandler,
} from '../controllers/lots.controller';

const lotsRouter: Router = Router();

lotsRouter.route('/').post(postLotHandler);
lotsRouter.route('/:portfolioId').get(getLotsByPortfolioId);
lotsRouter.route('/:portfolioId/stock/:symbol').get(getLotsByStockSymbol);
lotsRouter.route('/:id').patch(patchLotHandler).delete(deleteLotHandler);

export { lotsRouter };
