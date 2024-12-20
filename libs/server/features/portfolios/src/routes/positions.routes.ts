import { mediator } from '@avi/server/middleware';
import { Router } from 'express';
import { createPositionHandler, deletePositionHandler, patchPositionHandler } from '../commands/positions';

import { updateQuoteHandler } from '../commands/positions/update-quote.handler';
import {
  getAllPositionsHandler,
  getPositionHandler,
  getPositionsByPortfolioHandler,
  getPositionsHandler,
} from '../queries/positions';

const commandNames = {
  createPosition: 'createPosition',
  patchPosition: 'patchPosition',
  deletePosition: 'deletePosition',
  batchUpdatePricePositionHandler: 'batchUpdatePricePositionHandler',
  updateQuote: 'updateQuote',
};

const queryNames = {
  getPositions: 'getPositions',
  getPositionsByPortfolio: 'getPositionsByPortfolio',
  getPosition: 'getPosition',
  getAllSymbols: 'getAllSymbols',
};

// Subscribe to the queries
mediator.subscribe(queryNames.getPosition, getPositionHandler);
mediator.subscribe(queryNames.getPositions, getPositionsHandler);
mediator.subscribe(queryNames.getPositionsByPortfolio, getPositionsByPortfolioHandler);
mediator.subscribe(queryNames.getAllSymbols, getAllPositionsHandler);

// Subscribe to the commands
mediator.subscribe(commandNames.createPosition, createPositionHandler);
mediator.subscribe(commandNames.patchPosition, patchPositionHandler);
mediator.subscribe(commandNames.deletePosition, deletePositionHandler);
mediator.subscribe(commandNames.updateQuote, updateQuoteHandler);

// Define the router
const positionsRouter: Router = Router();

positionsRouter.route('/:portfolioId/update-price').patch(mediator.publish.bind(mediator, commandNames.updateQuote));

positionsRouter.route('/symbols').get(mediator.publish.bind(mediator, queryNames.getAllSymbols));

positionsRouter
  .route('/')
  .get(mediator.publish.bind(mediator, queryNames.getPositions))
  .post(mediator.publish.bind(mediator, commandNames.createPosition));

positionsRouter
  .route('/portfolio/:portfolioId')
  .get(mediator.publish.bind(mediator, queryNames.getPositionsByPortfolio));

positionsRouter
  .route('/:portfolioId/batch-update-price')
  .patch(mediator.publish.bind(mediator, commandNames.batchUpdatePricePositionHandler));

positionsRouter
  .route('/:id')
  .get(mediator.publish.bind(mediator, queryNames.getPosition))
  .patch(mediator.publish.bind(mediator, commandNames.patchPosition))
  .delete(mediator.publish.bind(mediator, commandNames.deletePosition));

export { positionsRouter };
