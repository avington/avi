import { ViewContainer } from '@avi/client-components';
import styles from './portfolios-view.module.scss';
import {
  loadPortfolioAction,
  selectPortfolios,
  selectPortfoliosLoadingStatus,
  useAppDispatch,
  useAppSelector,
} from '@avi/client-store';
import { useEffect } from 'react';
import PortfoliosSummary from '../../components/portfolios/portfolios-summary/portfolios-summary';

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
      <div className={styles.portfoliosView}>
        <PortfoliosSummary />
        <div>{JSON.stringify(portfolios)}</div>
      </div>
    </ViewContainer>
  );
}

export default PortfoliosView;
