import { LoadingStatusType, Lot } from '@avi/global/models';
import { addLot, fetchLotsBySymbolPortfolioId } from '../../data/lots.data';
import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import { serializeError } from '@avi/global/services';

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

export const addNewLotAction = createAsyncThunk<Lot, Lot>('lots/addNewLot', async (lot, { rejectWithValue }) => {
  try {
    // If either portfolioId or symbol is not provided, return an empty array
    if (!lot.portfolioId || !lot.symbol) {
      return rejectWithValue(new Error('Portfolio ID and Symbol are required'));
    }

    const response = await addLot(lot);
    return response.data;
  } catch (error) {
    if ((error as { response: { data: { errors: unknown[] } } })?.response?.data?.errors?.length) {
      const message = (error as { response: { data: { errors: { msg: string }[] } } }).response.data.errors[0].msg;
      console.log('message', message);
      return rejectWithValue({
        message,
      });
    }
    const serializedError = serializeError(error);
    return rejectWithValue(serializedError);
  }
});

export const lotsSlice = createSlice({
  name: 'lots',
  initialState: initialLotsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add the getLotsAction
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
      })
      // Add the addNewLotAction
      .addCase(addNewLotAction.pending, (state) => {
        return { ...state, loadingStatus: 'loading' };
      })
      .addCase(addNewLotAction.fulfilled, (state, action) => {
        return { ...state, loadingStatus: 'succeeded', lots: [...(state.lots ?? []), action.payload] };
      })
      .addCase(addNewLotAction.rejected, (state, action) => {
        return { ...state, loadingStatus: 'failed', error: action?.payload as SerializedError };
      });
  },
});

export default lotsSlice.reducer;
