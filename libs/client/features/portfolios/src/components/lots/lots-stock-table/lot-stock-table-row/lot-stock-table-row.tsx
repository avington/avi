import { Lot } from '@avi/global/models';
import styles from './lot-stock-table-row.module.scss';
import { TableCell, TableRow } from '@avi/client-components';
import {
  formatCurrency,
  formatCurrencyAndPercentage,
  formatDateAsDayMonthYear,
  formatNumber,
} from '@avi/global/services';

export interface LotStockTableRowProps {
  lot: Lot;
}

export function LotStockTableRow({ lot }: LotStockTableRowProps) {
  console.log('LotStockTableRow', lot);
  return (
    <TableRow key={lot.id} className={styles.row}>
      <TableCell>{formatDateAsDayMonthYear(lot?.openDate ?? '')}</TableCell>
      <TableCell>{formatNumber(lot?.shares ?? 0)}</TableCell>
      <TableCell>{formatCurrency(lot?.price ?? 0)}</TableCell>
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
