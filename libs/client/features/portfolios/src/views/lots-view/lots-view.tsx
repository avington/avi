import { ViewContainer } from '@avi/client-components';
import styles from './lots-view.module.scss';
import LotsStockSummary from '../../components/lots/lots-stock-summary/lots-stock-summary';
import LotsStockActionRow from '../../components/lots/lots-stock-action-row/lots-stock-action-row';
import LotsStockTable from '../../components/lots/lots-stock-table/lots-stock-table';

export function LotsView() {
  return (
    <ViewContainer>
      <div className={styles['lots-view']}>
        <div>
          <LotsStockSummary />
        </div>
        <div>
          <LotsStockActionRow />
        </div>
        <div>
          <LotsStockTable />
        </div>
      </div>
    </ViewContainer>
  );
}

export default LotsView;
