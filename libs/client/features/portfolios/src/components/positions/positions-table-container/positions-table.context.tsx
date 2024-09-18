import React from 'react';

export type PositionsTabStateTypes = 'holdings' | 'fundamentals' | 'performance';

export interface PositionsTableContextModel {
  tabState: PositionsTabStateTypes;
  setTabState: (tabState: PositionsTabStateTypes) => void;
}

export const PositionsTableContext = React.createContext<PositionsTableContextModel | undefined>(undefined);
