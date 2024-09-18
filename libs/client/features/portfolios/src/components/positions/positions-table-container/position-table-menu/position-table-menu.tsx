import { CommonButton } from '@avi/client-components';
import PositionTableMenuItems from './position-table-menu-items/position-table-menu-items';
import styles from './position-table-menu.module.scss';

export function PositionTableMenu() {
  return (
    <div className={styles['container']}>
      <PositionTableMenuItems />
      <div className={styles['add-new-button']}>
        <CommonButton backgroundColor="green" size="medium">
          Add Symbol
        </CommonButton>
      </div>
    </div>
  );
}

export default PositionTableMenu;
