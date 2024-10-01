import { ButtonMenu, ButtonMenuItem } from '@avi/client-components';
import styles from './holdings-transaction-menu.module.scss';

export function HoldingsTransactionMenu() {
  const menuItems = [<ButtonMenuItem>Lots</ButtonMenuItem>, <ButtonMenuItem>Transactions</ButtonMenuItem>];
  return (
    <div className={styles['container']}>
      <ButtonMenu items={menuItems} />
    </div>
  );
}

export default HoldingsTransactionMenu;
