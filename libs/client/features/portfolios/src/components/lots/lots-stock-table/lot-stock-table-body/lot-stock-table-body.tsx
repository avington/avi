import { RenderWhen, TableCell, TableRow } from '@avi/client-components';
import { selectPositionsDictionary, selectPositionsLoadingStatus, useAppSelector } from '@avi/client-store';
import { Skeleton } from '@mui/material';
import { useParams } from 'react-router-dom';
import LotStockTableRow from '../lot-stock-table-row/lot-stock-table-row';

export function LotStockTableBody() {
  const symbol = useParams<{ symbol: string }>().symbol;
  const loadingStatus = useAppSelector(selectPositionsLoadingStatus);
  const position = useAppSelector(selectPositionsDictionary)?.[symbol ?? ''];
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
        <RenderWhen.If isTrue={loadingStatus !== 'loading' && !!position?.lots}>
          {(position?.lots ?? [])?.map((lot) => (
            <LotStockTableRow key={lot.id} lot={lot} />
          ))}
        </RenderWhen.If>
        <RenderWhen.If isTrue={loadingStatus !== 'loading' && !position?.lots}>
          <TableRow>
            <TableCell colSpan={9}>No lots for this stock.</TableCell>
          </TableRow>
        </RenderWhen.If>
      </RenderWhen>
    </tbody>
  );
}

export default LotStockTableBody;
