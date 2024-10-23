import { Portfolio } from '@avi/global/models';

type MapPortfolioType = (portfolio: Portfolio) => Portfolio;

export const mapPortfolio: MapPortfolioType = (portfolio: Portfolio): Portfolio => {
  const totalRealized = portfolio?.realizedGains?.total ?? { amount: 0, percentage: 0 };
  const shortTermRealized = portfolio?.realizedGains?.shortTerm ?? { amount: 0, percentage: 0 };
  const longTermRealized = portfolio?.realizedGains?.longTerm ?? { amount: 0, percentage: 0 };
  const totalUnrealized = portfolio?.unrealizedGains?.total ?? { amount: 0, percentage: 0 };
  const shortTermUnrealized = portfolio?.unrealizedGains?.shortTerm ?? { amount: 0, percentage: 0 };
  const longTermUnrealized = portfolio?.unrealizedGains?.longTerm ?? { amount: 0, percentage: 0 };

  return {
    id: portfolio.id,
    user: portfolio.user,
    name: portfolio.name,
    description: portfolio?.description,
    createdAt: portfolio?.createdAt,
    updatedAt: portfolio?.updatedAt,
    isActive: portfolio?.isActive,
    totalSymbols: portfolio.totalSymbols,
    totalMarketValue: portfolio.totalMarketValue,
    cashHoldings: portfolio.cashHoldings,
    realizedGains: {
      ...portfolio?.realizedGains,
      total: totalRealized,
      shortTerm: shortTermRealized,
      longTerm: longTermRealized,
    },
    unrealizedGains: {
      ...portfolio?.unrealizedGains,
      total: totalUnrealized,
      shortTerm: shortTermUnrealized,
      longTerm: longTermUnrealized,
    },
    positions: portfolio.positions,
    totalCostBasis: portfolio.totalCostBasis,
    dayChange: portfolio.dayChange,
  };
};
