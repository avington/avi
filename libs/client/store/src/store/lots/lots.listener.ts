import { isAnyOf } from '@reduxjs/toolkit';
import { AppStartListening } from '..';
import { addNewLotAction } from './lots.reducer';

export const lotUpdateListener = (startListening: AppStartListening) => {
  startListening({
    matcher: isAnyOf(addNewLotAction.fulfilled),
    effect: ({ payload }, { dispatch, getState }) => {
      console.log('Lot Update Listener', payload);
    },
  });
};
