import { Express, Request, Response } from 'express';

export const addPortfolioRoutes = (app: Express) => {
  app.get('/api/portfolios', (req: Request, res: Response) => {
    res.send({ message: 'Welcome to portfolios!' });
  });

  app.post('/api/portfolios', (req: Request, res: Response) => {
    res.send({ message: 'Creating a new portfolio!' });
  });

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
