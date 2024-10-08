import React from 'react';
import { Route } from 'react-router-dom';

const PositionsView = React.lazy(() => import('../views/positions-view/positions-view'));
const LotsView = React.lazy(() => import('../views/lots-view/lots-view'));

export const getAllPositionsRoutes = () => [
  <Route key="/positions/:portfolioId" path="/positions/:portfolioId" element={<PositionsView />} />,
  <Route
    key="/positions/:portfolioId/stock/:symbol/lots"
    path="/positions/:portfolioId/stock/:symbol/lots"
    element={<LotsView />}
  />,
];
