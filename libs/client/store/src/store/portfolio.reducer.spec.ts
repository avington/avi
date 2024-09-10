import { Portfolio } from '@avi/global/models';
import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RootState } from './index';
import portfoliosReducer, { loadPortfolioAction } from './portfolios.reducer';

vi.mock('../data/portfolio.data');
vi.mock('@avi/global/services');

const mockPortfolio: Portfolio = { id: '1', name: 'Test Portfolio', email: 'test@email.com' };

describe('portfoliosSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        portfolios: portfoliosReducer,
      },
    });
  });

  it('should handle initial state', () => {
    const state = (store.getState() as RootState).portfolios;
    expect(state.portfolios).toEqual([]);
  });

  it('should handle loadPortfolios.pending', async () => {
    store.dispatch(loadPortfolioAction.pending(''));
    const state = (store.getState() as RootState).portfolios;
    expect(state.loadingStatus).toEqual('loading');
  });

  it('should handle loadPortfolios.fulfilled', async () => {
    store.dispatch(loadPortfolioAction.fulfilled([mockPortfolio], ''));
    const state = (store.getState() as RootState).portfolios;
    expect(state.loadingStatus).toEqual('succeeded');
    expect(state.portfolios).toEqual([mockPortfolio]);
  });
});
