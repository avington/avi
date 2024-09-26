import { Router } from 'express';
import { getPortfolios, insertPortfolioHandler } from '../controllers/portfolios.controller';

const portfolioRouter: Router = Router();

portfolioRouter.route('/').get(getPortfolios).post(insertPortfolioHandler);

export { portfolioRouter };
