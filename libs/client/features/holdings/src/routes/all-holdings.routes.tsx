import { Route } from 'react-router-dom';

export const getAllHoldingsRoutes = () => [
  <Route key="holdings" path="/holdings" element={<div>This is the /holdings root route.</div>} />,
];
