import { LargePanel, Table } from '@avi/client-components';
import styles from './lots-stock-table.module.scss';
import LotStockTableHeader from './lot-stock-table-header/lot-stock-table-header';
import LotStockTableBody from './lot-stock-table-body/lot-stock-table-body';

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
