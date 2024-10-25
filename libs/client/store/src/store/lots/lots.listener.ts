import { isAnyOf } from '@reduxjs/toolkit';
import { AppStartListening } from '..';
import { addNewLotAction } from './lots.reducer';
import { loadPositionsAction } from '../positions';
import { Lot } from '@avi/global/models';

export const lotUpdateListener = (startListening: AppStartListening) => {
  startListening({
    // when addNewLotAction.fulfilled is dispatched, getPositionsAction is dispatched
    matcher: isAnyOf(addNewLotAction.fulfilled),
    effect: ({ payload }, { dispatch, getState }) => {
      const { portfolioId } = payload as Lot;
      dispatch(loadPositionsAction({ portfolioId }));
    },
  });
};
