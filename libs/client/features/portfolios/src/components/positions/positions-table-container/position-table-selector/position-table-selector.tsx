import { RenderWhen } from '@avi/client-components';
import { useContext } from 'react';
import { PositionsTableContext, PositionsTableContextModel } from '../positions-table.context';
import FundamentalsTable from './fundamentals-table/fundamentals-table';
import HoldingsTable from './holdings-table/holdings-table';
import PerformanceTable from './performance-table/performance-table';

export function PositionTableSelector() {
  const context = useContext<PositionsTableContextModel | undefined>(PositionsTableContext);

  return (
    <RenderWhen>
      <RenderWhen.If isTrue={context?.tabState === 'holdings' || !context}>
        <HoldingsTable />
      </RenderWhen.If>
      <RenderWhen.If isTrue={context?.tabState === 'fundamentals'}>
        <FundamentalsTable />
      </RenderWhen.If>
      <RenderWhen.If isTrue={context?.tabState === 'performance'}>
        <PerformanceTable />
      </RenderWhen.If>
    </RenderWhen>
  );
}

export default PositionTableSelector;
