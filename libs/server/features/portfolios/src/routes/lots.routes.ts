import { Router } from 'express';
import { validatePostLot } from '../validators/lots.validator';
import { getLotsByPortfolioIdHandler, getLotsByStockSymbolHandler } from '../queries/lots';
import { mediator } from '@avi/server/middleware';
import { createLotHandler, deleteLotHandler, patchLotHandler } from '../commands/lots';

const commandNames = {
  deleteLot: 'deleteLot',
  patchLot: 'patchLot',
  postLot: 'postLot',
};

const queryNames = {
  getLotsByPortfolioId: 'getLotsByPortfolioId',
  getLotsByStockSymbol: 'getLotsByStockSymbol',
};

// Subscribe to the queries
mediator.subscribe(queryNames.getLotsByPortfolioId, getLotsByPortfolioIdHandler);
mediator.subscribe(queryNames.getLotsByStockSymbol, getLotsByStockSymbolHandler);

// Subscribe to the commands
mediator.subscribe(commandNames.deleteLot, deleteLotHandler);
mediator.subscribe(commandNames.patchLot, patchLotHandler);
mediator.subscribe(commandNames.postLot, createLotHandler);

// Define the router
const lotsRouter: Router = Router();
lotsRouter.route('/').post(...validatePostLot, mediator.publish.bind(mediator, commandNames.postLot));
lotsRouter.route('/:portfolioId').get(mediator.publish.bind(mediator, queryNames.getLotsByPortfolioId));
lotsRouter.route('/:portfolioId/stock/:symbol').get(mediator.publish.bind(mediator, queryNames.getLotsByStockSymbol));

lotsRouter
  .route('/:id')
  .patch(mediator.publish.bind(mediator, commandNames.patchLot))
  .delete(mediator.publish.bind(mediator, commandNames.deleteLot));

export { lotsRouter };
