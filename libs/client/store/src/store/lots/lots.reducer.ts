import { LoadingStatusType, Lot } from '@avi/global/models';
import { fetchLotsBySymbolPortfolioId } from '../../data/lots.data';
import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';

export interface LotState {
  loadingStatus: LoadingStatusType;
  lots: Lot[] | null;
  lotsDictionary: { [id: string]: Lot } | null;
  error: SerializedError | null | undefined;
}

export const initialLotsState: LotState = {
  loadingStatus: 'idle',
  lots: null,
  lotsDictionary: null,
  error: null,
};

export const getLotsAction = createAsyncThunk<Lot[], { portfolioId: string | undefined; symbol: string | undefined }>(
  'lots/getLots',
  async ({ portfolioId, symbol }, { rejectWithValue }) => {
    try {
      // If either portfolioId or symbol is not provided, return an empty array
      if (!portfolioId || !symbol) {
        return [];
      }

      const response = await fetchLotsBySymbolPortfolioId(symbol, portfolioId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const lotsSlice = createSlice({
  name: 'lots',
  initialState: initialLotsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLotsAction.pending, (state) => {
        return { ...state, loadingStatus: 'loading' };
      })
      .addCase(getLotsAction.fulfilled, (state, action) => {
        const lotsDictionary = action.payload.reduce((acc, lot) => {
          acc[lot?.id ?? ''] = lot;
          return acc;
        }, {} as { [id: string]: Lot });
        return { ...state, loadingStatus: 'succeeded', lots: action.payload, lotsDictionary };
      })
      .addCase(getLotsAction.rejected, (state, action) => {
        state.loadingStatus = 'idle';
        state.error = action?.error;
      });
  },
});

export default lotsSlice.reducer;
