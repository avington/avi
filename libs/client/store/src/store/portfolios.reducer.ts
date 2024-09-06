import { LoadingStatusType, Portfolio } from '@avi/global/models';
import { serializeError } from '@avi/global/services';
import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import { fetchPortfolios } from '../data/portfolio.data';

export interface PortfoliosState {
  portfolios: Portfolio[] | null;
  loadingStatus: LoadingStatusType;
  selectedPortfolio: Portfolio | null;
  error: SerializedError | undefined | null;
}

export const initialState: PortfoliosState = {
  portfolios: null,
  loadingStatus: 'idle',
  selectedPortfolio: null,
  error: null,
};

export const loadPortfolioAction = createAsyncThunk<Portfolio[]>(
  'portfolios/loadPortfolios',
  async (_, { rejectWithValue }) => {
    const getPrograms = async () => {
      try {
        const response = await fetchPortfolios();
        return response.data;
      } catch (error) {
        const serializedError = serializeError(error as Error) as SerializedError;
        return rejectWithValue(serializedError);
      }
    };

    return getPrograms();
  }
);

export const portfoliosSlice = createSlice({
  name: 'portfolios',
  initialState,
  reducers: {
    selectPortfolio: (state, action) => {
      state.selectedPortfolio = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPortfolioAction.pending, (state) => {
      return {
        ...state,
        loadingStatus: 'loading',
      };
    });
    builder.addCase(loadPortfolioAction.fulfilled, (state, action) => {
      return {
        ...state,
        loadingStatus: 'succeeded',
        portfolios: action.payload,
      };
    });
    builder.addCase(loadPortfolioAction.rejected, (state, action) => {
      return {
        ...state,
        loadingStatus: 'failed',
        error: action.error,
      };
    });
  },
});

export default portfoliosSlice.reducer;
