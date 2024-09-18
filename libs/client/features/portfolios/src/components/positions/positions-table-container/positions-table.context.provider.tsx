import { PropsWithChildren, useState } from 'react';
import { PositionsTableContext, PositionsTableContextModel, PositionsTabStateTypes } from './positions-table.context';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PositionsTableContextProviderProps {}

export function PositionsTableContextProvider({ children }: PropsWithChildren<PositionsTableContextProviderProps>) {
  const [tabState, setTabState] = useState<PositionsTabStateTypes>('holdings');

  const contextValue: PositionsTableContextModel = {
    tabState,
    setTabState,
  };
  return <PositionsTableContext.Provider value={contextValue}>{children}</PositionsTableContext.Provider>;
}
