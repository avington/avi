import { ButtonMenuItem, ButtonMenu } from '@avi/client-components';
import styles from './holdings-transaction-menu.module.scss';
import { Link } from 'react-router-dom';

export interface HoldingsTransactionMenuProps {
  portfolioId: string;
  symbol: string;
}

export function HoldingsTransactionMenu({ portfolioId, symbol }: HoldingsTransactionMenuProps) {
  const menuItems = [
    <ButtonMenuItem>
      <Link to={`/positions/${portfolioId}/stock/${symbol}/lots`}>Lots</Link>
    </ButtonMenuItem>,
    <ButtonMenuItem>
      <Link to={`/positions/${portfolioId}/stock/${symbol}/transactions`}>Transactions</Link>
    </ButtonMenuItem>,
  ];

  return (
    <div className={styles['container']}>
      <ButtonMenu items={menuItems} />
    </div>
  );
}

export default HoldingsTransactionMenu;
