import { RenderWhen, TableCell, TableRow } from '@avi/client-components';
import { formatNumber, formatCurrency, formatPercentage } from '@avi/global/services';
import styles from './portfolios-table-body.module.scss';
import { Portfolio } from '@avi/global/models';
import { Skeleton } from '@mui/material';
import PortfoliosTableRow from '../portfolios-table-row/portfolios-table-row';

export interface PortfoliosTableBodyProps {
  portfolios: Portfolio[] | null;
  loading: boolean;
}

export function PortfoliosTableBody({ loading, portfolios }: PortfoliosTableBodyProps) {
  return (
    <tbody>
      <RenderWhen>
        <RenderWhen.If isTrue={loading}>
          <TableRow>
            <TableCell colSpan={7}>
              <Skeleton variant="rectangular" height={50} animation="wave" style={{ marginBottom: '5px' }} />
              <Skeleton variant="rectangular" height={50} animation="wave" style={{ marginBottom: '5px' }} />
              <Skeleton variant="rectangular" height={50} animation="wave" style={{ marginBottom: '5px' }} />
            </TableCell>
          </TableRow>
        </RenderWhen.If>
        <RenderWhen.If isTrue={!loading}>
          {portfolios?.map((portfolio) => (
            <PortfoliosTableRow key={portfolio.id} portfolio={portfolio} />
          ))}
        </RenderWhen.If>
      </RenderWhen>
    </tbody>
  );
}

export default PortfoliosTableBody;
