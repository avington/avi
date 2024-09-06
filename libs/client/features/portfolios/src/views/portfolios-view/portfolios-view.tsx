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
        <h1>Portfolios</h1>
        <div>{JSON.stringify(portfolios)}</div>
      </div>
    </ViewContainer>
  );
}

export default PortfoliosView;
