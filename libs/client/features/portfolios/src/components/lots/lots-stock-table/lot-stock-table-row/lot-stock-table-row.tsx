import { Lot, Position } from '@avi/global/models';
import styles from './lot-stock-table-row.module.scss';
import { TableCell, TableRow } from '@avi/client-components';
import { format, FormatOptions, isAfter, set } from 'date-fns';
import {
  formatCurrency,
  formatCurrencyAndPercentage,
  formatDateAsDayMonthYear,
  formatNumber,
} from '@avi/global/services';
import { useEffect, useState } from 'react';

export interface LotStockTableRowProps {
  lot: Lot;
  position: Position | undefined;
}

export function LotStockTableRow({ lot, position }: LotStockTableRowProps) {
  const [costBasis, setCostBasis] = useState<number>(0);
  const [gainLoss, setGainLoss] = useState<number>(0);
  const [gainLossPercentage, setGainLossPercentage] = useState<number>(0);
  const [marketValue, setMarketValue] = useState<number>(0);

  useEffect(() => {
    console.log('lot', lot);
    setMarketValue((position?.price ?? 0) * (lot?.shares ?? 0));
    setCostBasis((lot?.costPerShare ?? 0) * (lot?.shares ?? 0));
    setGainLoss((marketValue ?? 0) - costBasis);
    setGainLossPercentage(gainLoss / costBasis);
  }, [costBasis, gainLoss, lot, marketValue, position?.price]);

  return (
    <TableRow key={lot.id} className={styles.row}>
      <TableCell>{format(lot.openDate, 'MM/dd/yyyy')}</TableCell>
      <TableCell>{lot.transactionType}</TableCell>
      <TableCell>{formatNumber(lot?.shares ?? 0)}</TableCell>
      <TableCell>{formatCurrency(position?.price ?? 0)}</TableCell>
      <TableCell>{formatCurrency(lot?.costPerShare ?? 0)}</TableCell>
      <TableCell>{formatCurrency(marketValue)}</TableCell>
      <TableCell>{formatCurrency(costBasis)}</TableCell>
      <TableCell $profitLoss={gainLoss}>{formatCurrencyAndPercentage(gainLoss, gainLossPercentage)}</TableCell>
      <TableCell>
        {isAfter(new Date(), new Date(lot.openDate).setFullYear(new Date(lot.openDate).getFullYear() + 1))
          ? 'LONG'
          : 'SHORT'}
      </TableCell>
    </TableRow>
  );
}

export default LotStockTableRow;
