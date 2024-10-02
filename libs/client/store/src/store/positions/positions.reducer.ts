import { LoadingStatusType, Lot, Position } from '@avi/global/models';
import { serializeError } from '@avi/global/services';
import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import { addPosition, fetchPositionsByPortfolio } from '../../data/positions.data';
import { fetchLotsBySymbolPortfolioId } from '../../data/lots.data';

export interface PositionState {
  positions: Position[] | null;
  positionsDictionary: { [id: string]: Position } | null;
  loadingStatus: LoadingStatusType;
  error: SerializedError | null | undefined;
}

export const initialPositionsState: PositionState = {
  positions: null,
  positionsDictionary: null,
  loadingStatus: 'idle',
  error: null,
};

export const getPositionsAction = createAsyncThunk<Position[], { portfolioId: string }>(
  'positions/getPositions',
  async ({ portfolioId }, { rejectWithValue }) => {
    try {
      const response = await fetchPositionsByPortfolio(portfolioId);
      return response.data;
    } catch (error) {
      const SerializedError = serializeError(error as Error);
      return rejectWithValue(SerializedError);
    }
  }
);

export const getPositionLotsAction = createAsyncThunk<
  { lots: Lot[]; symbol: string },
  { portfolioId: string; symbol: string }
>('positions/getPositionLots', async ({ portfolioId, symbol }, { rejectWithValue }) => {
  try {
    const response = await fetchLotsBySymbolPortfolioId(symbol, portfolioId);
    return { lots: response?.data ?? [], symbol };
  } catch (error) {
    const SerializedError = serializeError(error as Error);
    return rejectWithValue(SerializedError);
  }
});

export const insertPositionAction = createAsyncThunk<Position, { symbol: string; portfolioId: string }>(
  'positions/insertPosition',
  async ({ symbol, portfolioId }, { rejectWithValue }) => {
    const position: Position = {
      symbol,
      portfolioId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    try {
      const response = await addPosition(position);
      return response.data;
    } catch (error) {
      const SerializedError = serializeError(error as Error);
      return rejectWithValue(SerializedError);
    }
  }
);

export const positionsSlice = createSlice({
  name: 'positions',
  initialState: initialPositionsState,
  reducers: {
    resetPositionsAction: () => {
      return {
        ...initialPositionsState,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPositionsAction.pending, (state) => {
      return {
        ...state,
        loadingStatus: 'loading',
      };
    });
    builder.addCase(getPositionsAction.fulfilled, (state, action) => {
      const positionsDictionary = action.payload.reduce((acc, position) => {
        acc[position.symbol] = position;
        return acc;
      }, {} as { [id: string]: Position });
      return {
        ...state,
        loadingStatus: 'succeeded',
        positions: action.payload,
        positionsDictionary,
        error: null,
      };
    });
    builder.addCase(getPositionsAction.rejected, (state, action) => {
      return {
        ...state,
        loadingStatus: 'failed',
        error: action.payload as SerializedError,
      };
    });
    builder.addCase(getPositionLotsAction.pending, (state) => {
      return {
        ...state,
        loadingStatus: 'loading',
      };
    });
    builder.addCase(getPositionLotsAction.fulfilled, (state, action) => {
      const position: Position | null = state?.positionsDictionary?.[action.payload.symbol] ?? null;
      if (!position) {
        return state;
      }

      position.lots = action.payload.lots?.map((lot) => {
        // calculate the holding period
        const openDate = new Date(lot.openDate);
        const today = new Date();
        const holdingPeriod =
          (today.getTime() - openDate.getTime()) / (1000 * 3600 * 24 * 365) > 1 ? 'Long Term' : 'Short Term';

        return {
          ...lot,
          constBasis: lot.costPerShare * lot.shares,
          marketValue: (lot?.price ?? 0) * lot.shares,
          holdingPeriod,
          gainsLoss: (lot?.price ?? 0) * lot.shares - lot.costPerShare * lot.shares,
          gainsLossPercentage:
            ((lot?.price ?? 0) * lot.shares - lot.costPerShare * lot.shares) / (lot.costPerShare * lot.shares),
        };
      });
      const positions = state.positions?.map((p) => (p.symbol === action.payload.symbol ? position : p)) ?? [];

      const positionsDictionary = positions.reduce((acc, position) => {
        acc[position.symbol] = position;
        return acc;
      }, {} as { [id: string]: Position });

      return {
        ...state,
        loadingStatus: 'succeeded',
        positions: positions,
        positionsDictionary,
        error: null,
      };
    });
  },
});

export default positionsSlice.reducer;
export const { resetPositionsAction } = positionsSlice.actions;
