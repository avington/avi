import { Position } from '@avi/global/models';
import styles from './holdings-table-row.module.scss';
import { TableCell, TableRow } from '@avi/client-components';
import { Link } from 'react-router-dom';
import { formatCurrency, formatNumber, formatPercentage } from '@avi/global/services';

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
      <TableCell>{position.name}</TableCell>
      <TableCell>{formatNumber(position?.shares ?? 0)}</TableCell>
      <TableCell>{formatCurrency(position?.price ?? 0)}</TableCell>
      <TableCell>{formatCurrency(position?.marketValue ?? 0)}</TableCell>
      <TableCell>{formatCurrency(position?.costBasis ?? 0)}</TableCell>
      <TableCell>{formatCurrency(position?.previousClose ?? 0)}</TableCell>
      <TableCell>{formatCurrency(position?.change ?? 0)}</TableCell>
      <TableCell>{formatPercentage(position?.changesPercentage ?? 0)}</TableCell>
    </TableRow>
  );
}

export default HoldingsTableRow;
