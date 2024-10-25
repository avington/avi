import { LargePanel, Table } from '@avi/client-components';
import LotStockTableBody from './lot-stock-table-body/lot-stock-table-body';
import LotStockTableHeader from './lot-stock-table-header/lot-stock-table-header';

export function LotsStockTable() {
  return (
    <LargePanel>
      <Table>
        <LotStockTableHeader />
        <LotStockTableBody />
      </Table>
    </LargePanel>
  );
}

export default LotsStockTable;
