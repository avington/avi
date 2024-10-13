import { TableHeader, TableRow } from '@avi/client-components';
import styles from './lot-stock-table-header.module.scss';

export function LotStockTableHeader() {
  return (
    <thead>
      <TableRow>
        <TableHeader>Open Date</TableHeader>
        <TableHeader>Trans Type</TableHeader>
        <TableHeader>Shares +/-</TableHeader>
        <TableHeader>Price</TableHeader>
        <TableHeader>Cost/Share</TableHeader>
        <TableHeader>Market Value</TableHeader>
        <TableHeader>Cost Basis</TableHeader>
        <TableHeader>Gain/Loss</TableHeader>
        <TableHeader>Holding Period</TableHeader>
      </TableRow>
    </thead>
  );
}

export default LotStockTableHeader;
