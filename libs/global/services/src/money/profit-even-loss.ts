export type ProfitEvenLossType = 'profit' | 'even' | 'loss';

export const isProfitEvenLoss = (profit?: number): ProfitEvenLossType => {
  if (!profit) return 'even';

  if (profit > 0) {
    return 'profit';
  } else if (profit < 0) {
    return 'loss';
  } else {
    return 'even';
  }
};
