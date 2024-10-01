import { ButtonMenu, TableCell, TableRow } from '@avi/client-components';
import { Position } from '@avi/global/models';
import { formatCurrency, formatNumber, formatPercentageDivideBy100 } from '@avi/global/services';
import { Link } from 'react-router-dom';
import styles from './holdings-table-row.module.scss';
import HoldingsTransactionMenu from './holdings-transaction-menu/holdings-transaction-menu';

export interface HoldingsTableRowProps {
  position: Position;
}

export function HoldingsTableRow({ position }: HoldingsTableRowProps) {
  console.log(position);
  return (
    <TableRow key={position.id} className={styles.row}>
      <TableCell>
        <Link to={`/positions/${position.symbol}`}>{position.symbol}</Link>{' '}
      </TableCell>
      <TableCell>
        <HoldingsTransactionMenu />
      </TableCell>
      <TableCell>{position.name}</TableCell>
      <TableCell>{formatNumber(position?.shares ?? 0)}</TableCell>
      <TableCell>{formatCurrency(position?.price ?? 0)}</TableCell>
      <TableCell>{formatCurrency(position?.marketValue ?? 0)}</TableCell>
      <TableCell>{formatCurrency(position?.costBasis ?? 0)}</TableCell>
      <TableCell>{formatCurrency(position?.previousClose ?? 0)}</TableCell>
      <TableCell profitLoss={position?.change ?? 0}>{formatCurrency(position?.change ?? 0)}</TableCell>
      <TableCell profitLoss={position?.changesPercentage ?? 0}>
        {formatPercentageDivideBy100(position?.changesPercentage ?? 0)}
      </TableCell>
    </TableRow>
  );
}

export default HoldingsTableRow;
