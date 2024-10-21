import { LargePanel } from '@avi/client-components';
import styles from './positions-table-container.module.scss';
import PositionTableMenu from './position-table-menu/position-table-menu';
import { PositionsTableContextProvider } from './positions-table.context.provider';
import PositionTableSelector from './position-table-selector/position-table-selector';

export function PositionsTableContainer() {
  return (
    <PositionsTableContextProvider>
      <LargePanel className={styles['container']} style={{ width: 'var(--page-width)' }}>
        <PositionTableMenu />
        <PositionTableSelector />
      </LargePanel>
    </PositionsTableContextProvider>
  );
}

export default PositionsTableContainer;
