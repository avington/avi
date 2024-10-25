import { LoadingStatusType, Position } from '@avi/global/models';
import { serializeError } from '@avi/global/services';
import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import { addPosition, fetchPositionsByPortfolio } from '../../data/positions.data';

export interface PositionState {
  positionsDictionary: { [id: string]: Position } | null;
  loadingStatus: LoadingStatusType;
  error: SerializedError | null | undefined;
}

export const initialPositionsState: PositionState = {
  positionsDictionary: null,
  loadingStatus: 'idle',
  error: null,
};

export const loadPositionsAction = createAsyncThunk<Position[], { portfolioId: string }>(
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
    builder.addCase(loadPositionsAction.pending, (state) => {
      return {
        ...state,
        loadingStatus: 'loading',
      };
    });
    builder.addCase(loadPositionsAction.fulfilled, (state, action) => {
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
    builder.addCase(loadPositionsAction.rejected, (state, action) => {
      return {
        ...state,
        loadingStatus: 'failed',
        error: action.payload as SerializedError,
      };
    });
    builder.addCase(insertPositionAction.pending, (state) => {
      return {
        ...state,
        loadingStatus: 'loading',
      };
    });
    builder.addCase(insertPositionAction.fulfilled, (state, action) => {
      const positionsDictionary = {
        ...state.positionsDictionary,
        [action.payload.symbol]: action.payload,
      };
      return {
        ...state,
        loadingStatus: 'succeeded',
        positionsDictionary,
        error: null,
      };
    });
  },
});

export default positionsSlice.reducer;
export const { resetPositionsAction } = positionsSlice.actions;
