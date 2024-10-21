import { LargePanel } from '@avi/client-components';
import styles from './positions-summary-totals.module.scss';
import {
  selectSummaryMarketValue,
  selectSummaryTotalCostBasis,
  selectSummaryTotalGainLoss,
  useAppSelector,
} from '@avi/client-store';
import { formatCurrency, formatCurrencyAndPercentage, isProfitEvenLoss } from '@avi/global/services';

export function PositionsSummaryTotals() {
  const marketValue = useAppSelector(selectSummaryMarketValue);
  const totalCostBasis = useAppSelector(selectSummaryTotalCostBasis);
  const gainLoss = useAppSelector(selectSummaryTotalGainLoss);

  return (
    <LargePanel className={styles['container']} style={{ width: '400px' }}>
      <section>
        <h2>Holding Summary</h2>
        <h3>{formatCurrency(marketValue, 0)}</h3>
        <div className={styles['summary-item']}>
          <div className={styles['summary-item__label']}>Cash</div>
          <div className={styles['summary-item__value']}>$0.00</div>
        </div>
        <div className={styles['summary-item']}>
          <div className={styles['summary-item__label']}>Cost Basis</div>
          <div className={styles['summary-item__value']}>{formatCurrency(totalCostBasis)}</div>
        </div>
        <div className={styles['summary-item']}>
          <div className={styles['summary-item__label']}>Unrealized</div>
          <div className={`${styles['summary-item__value']} ${styles[isProfitEvenLoss(gainLoss.amount)]}`}>
            {formatCurrencyAndPercentage(gainLoss.amount, gainLoss.percentage)}
          </div>
        </div>
        <div className={styles['summary-item']}>
          <div className={styles['summary-item__label']}>Realized</div>
          <div className={styles['summary-item__value']}>$0.00</div>
        </div>
      </section>
    </LargePanel>
  );
}

export default PositionsSummaryTotals;
