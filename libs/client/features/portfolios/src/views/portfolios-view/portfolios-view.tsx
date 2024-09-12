import { ViewContainer } from '@avi/client-components';
import {
  loadPortfolioAction,
  selectPortfolios,
  selectPortfoliosLoadingStatus,
  useAppDispatch,
  useAppSelector,
} from '@avi/client-store';
import { useEffect } from 'react';
import PortfoliosSummary from '../../components/portfolios/portfolios-summary/portfolios-summary';
import PortfolioTable from '../../components/portfolios/portfolios-table/portfolios-table';
import styles from './portfolios-view.module.scss';

export function PortfoliosView() {
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector(selectPortfoliosLoadingStatus);
  const portfolios = useAppSelector(selectPortfolios);

  useEffect(() => {
    if (loadingStatus === 'idle') {
      dispatch(loadPortfolioAction());
    }
  }, [dispatch, loadingStatus]);

  return (
    <ViewContainer>
      <div className={styles['portfolios-view']}>
        <div>
          <PortfoliosSummary />
        </div>
        <div>
          <PortfolioTable loading={loadingStatus === 'loading'} portfolios={portfolios} />
        </div>
      </div>
    </ViewContainer>
  );
}

export default PortfoliosView;
