import React from 'react';
import { Route } from 'react-router-dom';

const PositionsView = React.lazy(() => import('../views/positions-view/positions-view'));

export const getAllPositionsRoutes = () => [
  <Route key="positions" path="/positions/:portfolioId" element={<PositionsView />} />,
];
