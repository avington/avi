import { Express, Request, Response } from 'express';
import { getPortfolios, insertPortfolioHandler } from '../controllers/portfolios.controller';

export const addPortfolioRoutes = (app: Express) => {
  app.get('/api/portfolios', getPortfolios);

  app.post('/api/portfolios', insertPortfolioHandler);

  app.delete('/api/portfolios/:id', (req: Request, res: Response) => {
    res.send({ message: 'Deleting a portfolio!' });
  });

  app.patch('/api/portfolios/:id', (req: Request, res: Response) => {
    res.send({ message: 'Updating a portfolio!' });
  });

  app.get('/api/portfolios/:id', (req: Request, res: Response) => {
    res.send({ message: 'Getting a portfolio!' });
  });
};
