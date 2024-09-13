import {
  loadPortfolioAction,
  selectPortfolios,
  selectPortfoliosLoadingStatus,
  useAppDispatch,
  useAppSelector,
} from '@avi/client-store';
import { useEffect } from 'react';
import PositionsTopLeftMenu from './positions-top-left-menu/positions-top-left-menu';
import styles from './positions-top-menu.module.scss';
import PositionsTopRightMenu from './positions-top-right-menu/positions-top-right-menu';

export interface PositionsTopMenuProps {
  portfolioId: string;
}

export function PositionsTopMenu({ portfolioId }: PositionsTopMenuProps) {
  const loadingPortfolios = useAppSelector(selectPortfoliosLoadingStatus);
  const portfolios = useAppSelector(selectPortfolios);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loadingPortfolios === 'idle') {
      dispatch(loadPortfolioAction());
    }
  }, [dispatch, loadingPortfolios]);

  return (
    <nav className={styles['container']}>
      <div className={styles['left']}>
        <PositionsTopLeftMenu
          loading={loadingPortfolios === 'loading'}
          portfolioId={portfolioId}
          portfolios={portfolios}
        />
      </div>
      <div className={styles['right']}>
        <PositionsTopRightMenu />
      </div>
    </nav>
  );
}

export default PositionsTopMenu;
