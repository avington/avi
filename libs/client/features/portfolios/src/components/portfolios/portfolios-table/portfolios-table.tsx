import { Table } from '@avi/client-components';
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
    <div className={styles['container']}>
      <Table>
        <PortfoliosTableHeader />
        <PortfoliosTableBody {...props} />
      </Table>
    </div>
  );
}

export default PortfolioTable;
