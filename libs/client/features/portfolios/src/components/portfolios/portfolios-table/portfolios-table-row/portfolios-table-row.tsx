import { TableCell, TableRow } from '@avi/client-components';
import { Portfolio } from '@avi/global/models';
import { formatCurrency, formatCurrencyAndPercentage, formatNumber } from '@avi/global/services';
import styles from './portfolios-table-row.module.scss';

export interface PortfoliosTableRowProps {
  portfolio: Portfolio;
}

export function PortfoliosTableRow({ portfolio }: PortfoliosTableRowProps) {
  return (
    <TableRow key={portfolio.id} className={styles.row}>
      <TableCell>{portfolio.name}</TableCell>
      <TableCell>{formatNumber(portfolio?.totalSymbols ?? 0)}</TableCell>
      <TableCell>{formatCurrency(portfolio?.totalCostBases ?? 0)}</TableCell>
      <TableCell>{formatCurrency(portfolio?.totalMarketValue ?? 0)}</TableCell>
      <TableCell>
        {formatCurrencyAndPercentage(portfolio?.dayChange?.amount ?? 0, portfolio?.dayChange?.percentage ?? 0)}
      </TableCell>
      <TableCell>
        {formatCurrencyAndPercentage(
          portfolio?.unrealizedGains?.total?.amount ?? 0,
          portfolio?.unrealizedGains?.total?.percentage ?? 0
        )}
      </TableCell>
      <TableCell>
        {formatCurrencyAndPercentage(
          portfolio?.realizedGains?.total?.amount ?? 0,
          portfolio?.realizedGains?.total?.percentage ?? 0
        )}
      </TableCell>
    </TableRow>
  );
}

export default PortfoliosTableRow;