import { LargePanel, SummaryDetail, SummaryLabel } from '@avi/client-components';
import { selectPositionGainLoss, selectPositionsDictionary, useAppSelector } from '@avi/client-store';
import { useParams } from 'react-router-dom';
import styles from './lots-stock-summary.module.scss';
import { formatCurrency, formatCurrencyAndPercentage, formatNumber, isProfitEvenLoss } from '@avi/global/services';

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
          <SummaryLabel> Price</SummaryLabel>
          <SummaryDetail>{formatCurrency(position?.price ?? 0)}</SummaryDetail>
        </div>
        <div className={styles['shares']}>
          <SummaryLabel> Shares</SummaryLabel>
          <SummaryDetail>{formatNumber(position?.shares ?? 0)}</SummaryDetail>
        </div>
        <div className={styles['avg-cost']}>
          <SummaryLabel> Average Cost</SummaryLabel>
          <SummaryDetail>{formatCurrency(position?.averageCostBasis ?? 0)}</SummaryDetail>
        </div>
        <div className={styles['unrealized']}>
          <SummaryLabel> Unrealized Gains</SummaryLabel>
          <SummaryDetail $profitEvenLoss={isProfitEvenLoss(positionGainLoss?.gainLoss)}>
            {formatCurrencyAndPercentage(positionGainLoss?.gainLoss ?? 0, positionGainLoss?.gainLossPercentage ?? 0)}
          </SummaryDetail>
        </div>
        <div className={styles['realized']}>
          <SummaryLabel> Realized Gains</SummaryLabel>
          <SummaryDetail $profitEvenLoss={'even'}>$0 (0.0%)</SummaryDetail>
        </div>
        <div className={styles['total']}>
          <SummaryLabel> Total Cost Basis</SummaryLabel>
          <SummaryDetail>{formatCurrency(position?.totalCostBasis ?? 0)}</SummaryDetail>
        </div>
        <div className={styles['market']}>
          <SummaryLabel> Market Value</SummaryLabel>
          <SummaryDetail>{formatCurrency((position?.price ?? 0) * (position?.shares ?? 0))}</SummaryDetail>
        </div>
      </div>
    </LargePanel>
  );
}

export default LotsStockSummary;
