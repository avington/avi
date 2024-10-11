import { RenderWhen, TableCell, TableRow } from '@avi/client-components';
import {
  getLotsAction,
  RootState,
  selectLotsBySymbolPortfolioId,
  selectLotsLoadingStatus,
  useAppDispatch,
  useAppSelector,
} from '@avi/client-store';
import { Skeleton } from '@mui/material';
import { useParams } from 'react-router-dom';
import LotStockTableRow from '../lot-stock-table-row/lot-stock-table-row';
import { useEffect } from 'react';

export function LotStockTableBody() {
  const { symbol, portfolioId } = useParams<{ symbol: string; portfolioId: string }>();
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector(selectLotsLoadingStatus);
  const lots = useAppSelector((state: RootState) => selectLotsBySymbolPortfolioId(state, { portfolioId, symbol }));

  useEffect(() => {
    if (loadingStatus === 'idle' && portfolioId && symbol) dispatch(getLotsAction({ portfolioId, symbol }));
  }, [dispatch, portfolioId, symbol, loadingStatus]);

  return (
    <tbody>
      <RenderWhen>
        <RenderWhen.If isTrue={loadingStatus === 'loading'}>
          <TableRow>
            <TableCell colSpan={9}>
              <Skeleton variant="rectangular" height={50} animation="wave" style={{ marginBottom: '5px' }} />
              <Skeleton variant="rectangular" height={50} animation="wave" style={{ marginBottom: '5px' }} />
              <Skeleton variant="rectangular" height={50} animation="wave" style={{ marginBottom: '5px' }} />
            </TableCell>
          </TableRow>
        </RenderWhen.If>{' '}
        <RenderWhen.If isTrue={loadingStatus !== 'loading' && !!lots}>
          {(lots ?? [])
            .filter((f) => f.portfolioId === portfolioId && f.symbol === symbol)
            .map((lot) => (
              <LotStockTableRow key={lot.id} lot={lot} />
            ))}
        </RenderWhen.If>
        <RenderWhen.If isTrue={loadingStatus !== 'loading' && !lots?.length}>
          <TableRow>
            <TableCell colSpan={9}>No lots for this stock.</TableCell>
          </TableRow>
        </RenderWhen.If>
      </RenderWhen>
    </tbody>
  );
}

export default LotStockTableBody;
