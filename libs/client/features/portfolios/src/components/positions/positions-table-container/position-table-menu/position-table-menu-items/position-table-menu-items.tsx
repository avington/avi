import { useContext } from 'react';
import { PositionsTableContext, PositionsTableContextModel } from '../../positions-table.context';
import PositionTableMenuItemsButton from './position-table-menu-items-button';
import styles from './position-table-menu-items.module.scss';

export function PositionTableMenuItems() {
  const context = useContext<PositionsTableContextModel | undefined>(PositionsTableContext);

  return (
    <div className={styles['container']}>
      <div className={styles['item']}>
        <PositionTableMenuItemsButton
          active={context?.tabState === 'holdings'}
          onClick={() => context?.setTabState('holdings')}
        >
          Holdings
        </PositionTableMenuItemsButton>
      </div>
      <div className={styles['item']}>
        <PositionTableMenuItemsButton
          active={context?.tabState === 'fundamentals'}
          onClick={() => context?.setTabState('fundamentals')}
        >
          Fundamentals
        </PositionTableMenuItemsButton>
      </div>
      <div className={styles['item']}>
        <PositionTableMenuItemsButton
          active={context?.tabState === 'performance'}
          onClick={() => context?.setTabState('performance')}
        >
          Performance
        </PositionTableMenuItemsButton>
      </div>
    </div>
  );
}

export default PositionTableMenuItems;
