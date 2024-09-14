import PositionsSummaryDividends from './positions-summary-dividends/positions-summary-dividends';
import PositionsSummaryEarnings from './positions-summary-earnings/positions-summary-earnings';
import PositionsSummaryTotals from './positions-summary-totals/positions-summary-totals';
import styles from './positions-summary.module.scss';

export function PositionsSummary() {
  return (
    <div className={styles['container']}>
      <PositionsSummaryTotals />
      <PositionsSummaryEarnings />
      <PositionsSummaryDividends />
    </div>
  );
}

export default PositionsSummary;
