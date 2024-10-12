import { Lot, Position } from '@avi/global/models';
import styles from './lot-stock-table-row.module.scss';
import { TableCell, TableRow } from '@avi/client-components';
import { format, FormatOptions } from 'date-fns';
import {
  formatCurrency,
  formatCurrencyAndPercentage,
  formatDateAsDayMonthYear,
  formatNumber,
} from '@avi/global/services';

export interface LotStockTableRowProps {
  lot: Lot;
  position: Position | undefined;
}

export function LotStockTableRow({ lot, position }: LotStockTableRowProps) {
  return (
    <TableRow key={lot.id} className={styles.row}>
      <TableCell>{format(lot.openDate, 'MM/dd/yyyy')}</TableCell>
      <TableCell>{formatNumber(lot?.shares ?? 0)}</TableCell>
      <TableCell>{formatCurrency(position?.price ?? 0)}</TableCell>
      <TableCell>{formatCurrency(lot?.costPerShare ?? 0)}</TableCell>
      <TableCell>{formatCurrency(lot?.marketValue ?? 0)}</TableCell>
      <TableCell>{formatCurrency(lot?.costBasis ?? 0)}</TableCell>
      <TableCell $profitLoss={lot?.gainsLosses ?? 0}>
        {formatCurrencyAndPercentage(lot?.gainsLosses ?? 0, lot?.gainsLossesPercentage ?? 0)}
      </TableCell>
      <TableCell>{lot?.holdingPeriod}</TableCell>
    </TableRow>
  );
}

export default LotStockTableRow;
