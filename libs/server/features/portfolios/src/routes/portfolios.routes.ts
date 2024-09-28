import { Router } from 'express';
import {
  deletePortfolioHandler,
  getPortfolio,
  getPortfolios,
  insertPortfolioHandler,
  patchPortfolioHandler,
} from '../controllers/portfolios.controller';

const portfolioRouter: Router = Router();

portfolioRouter.route('/').get(getPortfolios).post(insertPortfolioHandler);
portfolioRouter.route('/:id').get(getPortfolio).patch(patchPortfolioHandler).delete(deletePortfolioHandler);

export { portfolioRouter };
