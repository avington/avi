import { mediator } from '@avi/server/middleware';
import { Router } from 'express';
import { createPortfolioHandler, patchPortfolioHandler, deletePortfolioHandler } from '../commands/portfolios';
import { getPortfolioHandler, getPortfoliosHandler } from '../queries/portfolios';

const commandNames = {
  createPortfolio: 'createPortfolio',
  patchPortfolioHandler: 'patchPortfolioHandler',
  deletePortfolioHandler: 'deletePortfolioHandler',
};

const queryNames = {
  getPortfolios: 'getPortfolios',
  getPortfolio: 'getPortfolio',
};

// Subscribe to the queries
mediator.subscribe(queryNames.getPortfolios, getPortfoliosHandler);
mediator.subscribe(queryNames.getPortfolio, getPortfolioHandler);

// Subscribe to the commands
mediator.subscribe(commandNames.createPortfolio, createPortfolioHandler);
mediator.subscribe(commandNames.patchPortfolioHandler, patchPortfolioHandler);
mediator.subscribe(commandNames.deletePortfolioHandler, deletePortfolioHandler);

// Define the router
const portfolioRouter: Router = Router();
portfolioRouter
  .route('/')
  .get(mediator.publish.bind(mediator, queryNames.getPortfolios))
  .post(mediator.publish.bind(mediator, commandNames.createPortfolio));
portfolioRouter
  .route('/:id')
  .get(mediator.publish.bind(mediator, queryNames.getPortfolio))
  .patch(mediator.publish.bind(mediator, commandNames.patchPortfolioHandler))
  .delete(mediator.publish.bind(mediator, commandNames.deletePortfolioHandler));

export { portfolioRouter };
