import { Route } from "react-router-dom";

export const getAllPortfoliosRoutes = () => [
  <Route key="portfolios" path="/portfolios" element={<div>This is the portfolios root route.</div>} />,
];
