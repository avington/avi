import { getAllPortfoliosRoutes } from './portfolios.routes';
import { getAllPositionsRoutes } from './positions.routes';

export const getPortfoliosRoutes = () => [...getAllPortfoliosRoutes(), ...getAllPositionsRoutes()];
