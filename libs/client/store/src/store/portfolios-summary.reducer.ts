import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PortfolioSummaryState {
  totalSymbols: number;
  totalMarketValue: number;
  cashHoldings: number;
  realizedGains: number;
  unrealizedGains: number;
}

export const initialState: PortfolioSummaryState = {
  totalSymbols: 0,
  totalMarketValue: 0,
  cashHoldings: 0,
  realizedGains: 0,
  unrealizedGains: 0,
};

export const portfolioSummarySlice = createSlice({
  name: 'portfolioSummary',
  initialState,
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
    setUnrealizedGains: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        unrealizedGains: action.payload,
      };
    },
  },
});

export default portfolioSummarySlice.reducer;

export const {
  setPortfolioSummary,
  setTotalSymbols,
  setTotalMarketValue,
  setCashHoldings,
  setRealizedGains,
  setUnrealizedGains,
} = portfolioSummarySlice.actions;
