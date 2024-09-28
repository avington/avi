import { LargePanel, Table } from '@avi/client-components';
import styles from './holdings-table.module.scss';
import HoldingsTableHeader from './holdings-table-header/holdings-table-header';
import HoldingsTableBody from './holdings-table-body/holdings-table-body';

export function HoldingsTable() {
  return (
    <LargePanel className={styles['container']} style={{ width: '100%' }}>
      <Table>
        <HoldingsTableHeader />
        <HoldingsTableBody />
      </Table>
    </LargePanel>
  );
}

export default HoldingsTable;
