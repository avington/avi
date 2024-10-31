import { LoadingStatusType, Portfolio, Position } from '@avi/global/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface QuoteUpdateState {
  portfolios: { portfolioId: string; positions: { [symbol: string]: Position } | null }[] | null;
  loading: LoadingStatusType;
  error: string | null;
  lastUpdated: Date | null;
}

export const initialQuoteUpdateState: QuoteUpdateState = {
  portfolios: null,
  loading: 'idle',
  error: null,
  lastUpdated: null,
};

export const quoteUpdateSlice = createSlice({
  name: 'quoteUpdate',
  initialState: initialQuoteUpdateState,
  reducers: {
    resetQuoteUpdate: () => initialQuoteUpdateState,
    loadEmptyQuotePortfolios: (state, action: PayloadAction<Portfolio[]>) => {
      return {
        ...state,
        portfolios: action.payload.map((p) => ({ portfolioId: p.id || '', positions: null })),
      };
    },
  },
});

export const { resetQuoteUpdate, loadEmptyQuotePortfolios } = quoteUpdateSlice.actions;

export default quoteUpdateSlice.reducer;
