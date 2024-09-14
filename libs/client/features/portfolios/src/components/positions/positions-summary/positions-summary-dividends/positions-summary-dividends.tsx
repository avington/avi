import { LargePanel } from '@avi/client-components';
import styles from './positions-summary-dividends.module.scss';

export function PositionsSummaryDividends() {
  return (
    <LargePanel className={styles['container']} style={{ width: '400px' }}>
      <section>
        <h2>Upcoming Dividends</h2>
        <div className={styles['summary-item']}>
          <div className={styles['summary-item__label']}>AMZN</div>
          <div className={styles['summary-item__value']}>October 5, 2024</div>
        </div>
        <div className={styles['summary-item']}>
          <div className={styles['summary-item__label']}>NVDA</div>
          <div className={styles['summary-item__value']}>October 6, 2024</div>
        </div>
        <div className={styles['summary-item']}>
          <div className={styles['summary-item__label']}>VZ</div>
          <div className={styles['summary-item__value']}>October 7, 2024</div>
        </div>
        <div className={styles['summary-item']}>
          <div className={styles['summary-item__label']}>UBER</div>
          <div className={styles['summary-item__value']}>October 8, 2024</div>
        </div>
        <div className={styles['summary-item']}>
          <div className={styles['summary-item__label']}>MSFT</div>
          <div className={styles['summary-item__value']}>October 10, 2024</div>
        </div>
      </section>
    </LargePanel>
  );
}

export default PositionsSummaryDividends;
