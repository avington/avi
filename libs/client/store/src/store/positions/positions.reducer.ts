import { LoadingStatusType, Position } from '@avi/global/models';
import { serializeError } from '@avi/global/services';
import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import { fetchPositions } from '../../data/positions.data';

export interface PositionState {
  positions: Position[] | null;
  loadingStatus: LoadingStatusType;
  error: SerializedError | null | undefined;
}

export const initialPositionsState: PositionState = {
  positions: null,
  loadingStatus: 'idle',
  error: null,
};

export const getPositionsAction = createAsyncThunk<Position[], { portfolioId: string }>(
  'positions/getPositions',
  async ({ portfolioId }, { rejectWithValue }) => {
    try {
      const response = await fetchPositions(portfolioId);
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
    resetPositionsAction: (state) => {
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
      return {
        ...state,
        loadingStatus: 'succeeded',
        positions: action.payload,
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
  },
});

export default positionsSlice.reducer;
export const { resetPositionsAction } = positionsSlice.actions;