import { LargePanel, Table } from '@avi/client-components';
import styles from './portfolios-table.module.scss';
import PortfoliosTableHeader from './portfolios-table-header/portfolios-table-header';
import { Portfolio } from '@avi/global/models';
import PortfoliosTableBody from './portfolios-table-body/portfolios-table-body';

export interface PortfolioTableProps {
  portfolios: Portfolio[] | null;
  loading: boolean;
}

export function PortfolioTable(props: PortfolioTableProps) {
  return (
    <LargePanel className={styles['container']} style={{ width: 'var(--page-width)' }}>
      <Table>
        <PortfoliosTableHeader />
        <PortfoliosTableBody {...props} />
      </Table>
    </LargePanel>
  );
}

export default PortfolioTable;
