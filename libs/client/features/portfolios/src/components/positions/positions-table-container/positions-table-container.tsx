import { LargePanel } from '@avi/client-components';
import styles from './positions-table-container.module.scss';

export function PositionsTableContainer() {
  return (
    <LargePanel className={styles['container']} style={{ width: '1280px' }}>
      positions-table-container works!
    </LargePanel>
  );
}

export default PositionsTableContainer;
