import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PortfolioSummaryState {
  totalCostBasis: number;
  totalSymbols: number;
  totalMarketValue: number;
  cashHoldings: number;
  realizedGains: number;
  unrealizedGains: {
    total: number;
    percentage: number;
    shortTerm?: number;
    longTerm?: number;
  } | null;
}

export const initialPortfolioSummaryState: PortfolioSummaryState = {
  totalSymbols: 0,
  totalMarketValue: 0,
  cashHoldings: 0,
  realizedGains: 0,
  unrealizedGains: null,
  totalCostBasis: 0,
};

export const portfolioSummarySlice = createSlice({
  name: 'portfolioSummary',
  initialState: initialPortfolioSummaryState,
  reducers: {
    setPortfolioSummary: (state, action: PayloadAction<PortfolioSummaryState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setTotalSymbols: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        totalSymbols: action.payload,
      };
    },
    setTotalMarketValue: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        totalMarketValue: action.payload,
      };
    },
    setCashHoldings: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        cashHoldings: action.payload,
      };
    },
    setRealizedGains: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        realizedGains: action.payload,
      };
    },
  },
});

export default portfolioSummarySlice.reducer;

export const { setPortfolioSummary, setTotalSymbols, setTotalMarketValue, setCashHoldings, setRealizedGains } =
  portfolioSummarySlice.actions;
