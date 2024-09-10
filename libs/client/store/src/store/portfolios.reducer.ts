import { LoadingStatusType, Portfolio } from '@avi/global/models';
import { serializeError } from '@avi/global/services';
import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import { addPortfolio, fetchPortfolios, patchPortfolio } from '../data/portfolio.data';

export interface PortfoliosState {
  portfolios: Portfolio[] | null;
  loadingStatus: LoadingStatusType;
  selectedPortfolio: Portfolio | null;
  error: SerializedError | undefined | null;
}

export const initialState: PortfoliosState = {
  portfolios: [],
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

export const addPortfolioAction = createAsyncThunk<Portfolio, Portfolio>(
  'portfolios/addPortfolio',
  async (portfolio: Portfolio, { rejectWithValue }) => {
    const addPortfolioAsync = async () => {
      try {
        const response = await addPortfolio(portfolio);
        return response.data;
      } catch (error) {
        const serializedError = serializeError(error as Error) as SerializedError;
        return rejectWithValue(serializedError);
      }
    };

    return addPortfolioAsync();
  }
);

export const patchPortfolioAction = createAsyncThunk<Portfolio, Portfolio>(
  'portfolios/patchPortfolio',
  async (portfolio: Portfolio, { rejectWithValue }) => {
    const patchPortfolioAsync = async () => {
      try {
        await patchPortfolio(portfolio);
        return portfolio;
      } catch (error) {
        const serializedError = serializeError(error as Error) as SerializedError;
        return rejectWithValue(serializedError);
      }
    };

    return patchPortfolioAsync();
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
    builder.addCase(addPortfolioAction.pending, (state) => {
      return {
        ...state,
        loadingStatus: 'loading',
      };
    });
    builder.addCase(addPortfolioAction.fulfilled, (state, action) => {
      return {
        ...state,
        loadingStatus: 'succeeded',
        portfolios: state.portfolios ? [...state.portfolios, action.payload] : [action.payload],
      };
    });
    builder.addCase(addPortfolioAction.rejected, (state, action) => {
      return {
        ...state,
        loadingStatus: 'failed',
        error: action.error,
      };
    });
    builder.addCase(patchPortfolioAction.pending, (state) => {
      return {
        ...state,
        loadingStatus: 'loading',
      };
    });
    builder.addCase(patchPortfolioAction.fulfilled, (state, action) => {
      return {
        ...state,
        loadingStatus: 'succeeded',
        portfolios: state.portfolios
          ? state.portfolios.map((portfolio) => (portfolio.id === action.payload.id ? action.payload : portfolio))
          : null,
      };
    });
    builder.addCase(patchPortfolioAction.rejected, (state, action) => {
      return {
        ...state,
        loadingStatus: 'failed',
        error: action.error,
      };
    });
  },
});

export default portfoliosSlice.reducer;
