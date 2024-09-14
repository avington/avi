import { LargePanel } from '@avi/client-components';
import styles from './positions-summary-totals.module.scss';

export function PositionsSummaryTotals() {
  return (
    <LargePanel className={styles['container']} style={{ width: '400px' }}>
      <section>
        <h2>Holding Summary</h2>
        <h3>$1,000,000</h3>
        <div className={styles['summary-item']}>
          <div className={styles['summary-item__label']}>Cash</div>
          <div className={styles['summary-item__value']}>$500.00</div>
        </div>
        <div className={styles['summary-item']}>
          <div className={styles['summary-item__label']}>Unrealized</div>
          <div className={styles['summary-item__value']}>$50,000.00</div>
        </div>
        <div className={styles['summary-item']}>
          <div className={styles['summary-item__label']}>Realized</div>
          <div className={styles['summary-item__value']}>$5,000.00</div>
        </div>
      </section>
    </LargePanel>
  );
}

export default PositionsSummaryTotals;
