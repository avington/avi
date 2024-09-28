import { RenderWhen, TableCell, TableRow } from '@avi/client-components';
import styles from './holdings-table-body.module.scss';
import { Skeleton } from '@mui/material';
import { Position } from '@avi/global/models';
import HoldingsTableRow from '../holdings-table-row/holdings-table-row';
import {
  getPositionsAction,
  resetPositionsAction,
  selectPositions,
  selectPositionsLoadingStatus,
  useAppDispatch,
  useAppSelector,
} from '@avi/client-store';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export function HoldingsTableBody() {
  const loadingStatus = useAppSelector(selectPositionsLoadingStatus);
  const positions = useAppSelector(selectPositions);
  const dispatch = useAppDispatch();

  const { portfolioId } = useParams<{ portfolioId: string }>();

  useEffect(() => {
    dispatch(resetPositionsAction());
  }, [portfolioId, dispatch]);

  useEffect(() => {
    if (loadingStatus === 'idle' && portfolioId) {
      dispatch(getPositionsAction({ portfolioId }));
    }
  }, [dispatch, loadingStatus, portfolioId]);

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
        </RenderWhen.If>
        <RenderWhen.If isTrue={loadingStatus !== 'loading'}>
          {(positions ?? [])?.map((position) => (
            <HoldingsTableRow key={position.id} position={position} />
          ))}
        </RenderWhen.If>
      </RenderWhen>
    </tbody>
  );
}

export default HoldingsTableBody;
