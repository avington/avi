import { useContext } from 'react';
import { PositionsTableContext, PositionsTableContextModel } from '../positions-table.context';
import styles from './position-table-selector.module.scss';
import { RenderWhen } from '@avi/client-components';
import HoldingsTable from './holdings-table/holdings-table';
import FundamentalsTable from './fundamentals-table/fundamentals-table';
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
