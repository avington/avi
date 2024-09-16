import { Express } from 'express';
import {
  deletePositionHandler,
  getPositionHandler,
  getPositions as getPositionsHandler,
  insertPositionHandler,
  patchPositionHandler,
} from '../controllers/positions.controller';

export const addPositionsRoutes = (app: Express) => {
  app.get('/api/positions/:portfolioId', getPositionsHandler);
  app.get('/api/positions/:id', getPositionHandler);
  app.post('/api/positions', insertPositionHandler);
  app.delete('/api/positions/:id', deletePositionHandler);
  app.patch('/api/positions/:id', patchPositionHandler);
};
