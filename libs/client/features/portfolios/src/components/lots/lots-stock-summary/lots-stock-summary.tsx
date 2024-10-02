import styles from './lots-stock-summary.module.scss';
import { LargePanel, CommonButton, CommonToaster } from '@avi/client-components';

export function LotsStockSummary() {
  return (
    <LargePanel>
      <div className={styles['container']}>
        <div className={styles['symbol']}>
          <h2>NVDA</h2>
        </div>
        <div className={styles['name']}>
          <h2 className={styles['cell-heading']}>NVIDIA Corporation</h2>
        </div>
        <div className={styles['price']}>
          <h5 className={styles['price']}>Price</h5>
          <h5>$1,000</h5>
        </div>
        <div className={styles['day-change']}>
          <h5 className={styles['cell-heading']}>Day Change</h5>
          <h5>$5,000 (5.0%)</h5>
        </div>
        <div className={styles['unrealized']}>
          <h5 className={styles['cell-heading']}>Unrealized Gains</h5>
          <h5>$50,000 (25.0%)</h5>
        </div>
        <div className={styles['realized']}>
          <h5 className={styles['cell-heading']}>Realized Gains</h5>
          <h5>$5,000 (5.0%)</h5>
        </div>
        <div className={styles['total']}>
          <h5 className={styles['cell-heading']}>Total Cost Basis</h5>
          <h5>$5,000 (5.0%)</h5>
        </div>
        <div className={styles['market']}>
          <h5 className={styles['cell-heading']}>Market Value</h5>
          <h5>$5,000 (5.0%)</h5>
        </div>
      </div>
    </LargePanel>
  );
}

export default LotsStockSummary;
