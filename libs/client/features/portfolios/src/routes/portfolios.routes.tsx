import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
const PortfoliosView = React.lazy(() => import('../views/portfolios-view/portfolios-view'));

export const getAllPortfoliosRoutes = () => [
  <Route key="portfolios" path="/portfolios" element={<PortfoliosView />} />,
];
