import { TableHeader, TableRow } from '@avi/client-components';
import styles from './holdings-table-header.module.scss';

export function HoldingsTableHeader() {
  return (
    <thead>
      <TableRow>
        <TableHeader>Symbol</TableHeader>
        <TableHeader>Name</TableHeader>
        <TableHeader>Shares</TableHeader>
        <TableHeader>Price</TableHeader>
        <TableHeader>Market Value</TableHeader>
        <TableHeader>Cost Basis</TableHeader>
        <TableHeader>Previous Close</TableHeader>
        <TableHeader>Day Change</TableHeader>
        <TableHeader>Day Change %</TableHeader>
      </TableRow>
    </thead>
  );
}

export default HoldingsTableHeader;
