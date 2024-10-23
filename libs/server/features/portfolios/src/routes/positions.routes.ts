import { mediator } from '@avi/server/middleware';
import { Router } from 'express';
import { createPositionHandler, patchPositionHandler, deletePositionHandler } from '../commands/positions';

import { getPositionHandler, getPositionsByPortfolioHandler, getPositionsHandler } from '../queries/positions';

const commandNames = {
  createPosition: 'createPosition',
  patchPosition: 'patchPosition',
  deletePosition: 'deletePosition',
};

const queryNames = {
  getPositions: 'getPositions',
  getPositionsByPortfolio: 'getPositionsByPortfolio',
  getPosition: 'getPosition',
};

// Subscribe to the queries
mediator.subscribe(queryNames.getPosition, getPositionHandler);
mediator.subscribe(queryNames.getPositions, getPositionsHandler);
mediator.subscribe(queryNames.getPositionsByPortfolio, getPositionsByPortfolioHandler);

// Subscribe to the commands
mediator.subscribe(commandNames.createPosition, createPositionHandler);
mediator.subscribe(commandNames.patchPosition, patchPositionHandler);
mediator.subscribe(commandNames.deletePosition, deletePositionHandler);

// Define the router
const positionsRouter: Router = Router();
positionsRouter
  .route('/')
  .get(mediator.publish.bind(mediator, queryNames.getPositions))
  .post(mediator.publish.bind(mediator, commandNames.createPosition));

positionsRouter
  .route('/portfolio/:portfolioId')
  .get(mediator.publish.bind(mediator, queryNames.getPositionsByPortfolio));

positionsRouter
  .route('/:id')
  .get(mediator.publish.bind(mediator, queryNames.getPosition))
  .patch(mediator.publish.bind(mediator, commandNames.patchPosition))
  .delete(mediator.publish.bind(mediator, commandNames.deletePosition));

export { positionsRouter };
