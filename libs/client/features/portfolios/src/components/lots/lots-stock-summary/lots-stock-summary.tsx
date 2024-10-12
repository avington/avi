import { LargePanel } from '@avi/client-components';
import { selectPositionGainLoss, selectPositionsDictionary, useAppSelector } from '@avi/client-store';
import { useParams } from 'react-router-dom';
import styles from './lots-stock-summary.module.scss';
import { formatCurrency, formatCurrencyAndPercentage, formatNumber } from '@avi/global/services';

export function LotsStockSummary() {
  const { symbol, portfolioId } = useParams<{ symbol: string; portfolioId: string }>();
  const position = useAppSelector(selectPositionsDictionary)?.[symbol ?? ''];
  const positionGainLoss = useAppSelector(selectPositionGainLoss)?.find((p) => p.symbol === symbol);
  return (
    <LargePanel>
      <div className={styles['container']}>
        <div className={styles['symbol']}>
          <h2>{position?.symbol}</h2>
        </div>
        <div className={styles['name']}>
          <h2 className={styles['name']}>NVIDIA Corporation</h2>
        </div>
        <div className={styles['price']}>
          <h5 className={styles['cell-heading']}>Price</h5>
          <h5 className={styles['cell-detail']}>{formatCurrency(position?.price ?? 0)}</h5>
        </div>
        <div className={styles['shares']}>
          <h5 className={styles['cell-heading']}>Shares</h5>
          <h5 className={styles['cell-detail']}>{formatNumber(position?.shares ?? 0)}</h5>
        </div>
        <div className={styles['avg-cost']}>
          <h5 className={styles['cell-heading']}>Avg Cost</h5>
          <h5 className={styles['cell-detail']}>{formatCurrency(position?.averageCostBasis ?? 0)}</h5>
        </div>
        <div className={styles['unrealized']}>
          <h5 className={styles['cell-heading']}>Unrealized Gains</h5>
          <h5 className={styles['cell-detail']}>
            {formatCurrencyAndPercentage(positionGainLoss?.gainLoss ?? 0, positionGainLoss?.gainLossPercentage ?? 0)}
          </h5>
        </div>
        <div className={styles['realized']}>
          <h5 className={styles['cell-heading']}>Realized Gains</h5>
          <h5 className={styles['cell-detail']}>$5,000 (5.0%)</h5>
        </div>
        <div className={styles['total']}>
          <h5 className={styles['cell-heading']}>Total Cost Basis</h5>
          <h5 className={styles['cell-detail']}>{formatCurrency(position?.totalCostBasis ?? 0)}</h5>
        </div>
        <div className={styles['market']}>
          <h5 className={styles['cell-heading']}>Market Value</h5>
          <h5 className={styles['cell-detail']}>{formatCurrency((position?.price ?? 0) * (position?.shares ?? 0))}</h5>
        </div>
      </div>
    </LargePanel>
  );
}

export default LotsStockSummary;
