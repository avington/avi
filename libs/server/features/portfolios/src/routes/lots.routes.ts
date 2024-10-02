import { Router } from 'express';
import { deleteLotHandler, getLots, patchLotHandler, postLotHandler } from '../controllers/lots.controller';

const lotsRouter = Router();

lotsRouter.route('/').post(postLotHandler);
lotsRouter.route('/:symbol/:portfolioId').get(getLots);
lotsRouter.route('/:id').patch(patchLotHandler).delete(deleteLotHandler);

export { lotsRouter };
