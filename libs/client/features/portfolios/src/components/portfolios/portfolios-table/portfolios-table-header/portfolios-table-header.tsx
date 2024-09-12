import { TableHeader, TableRow } from '@avi/client-components';
import styles from './portfolios-table-header.module.scss';

export function PortfoliosTableHeader() {
  return (
    <thead>
      <TableRow>
        <TableHeader>Portfolio Name</TableHeader>
        <TableHeader>Symbols</TableHeader>
        <TableHeader>Cost Basis</TableHeader>
        <TableHeader>Market Value</TableHeader>
        <TableHeader>Day Change</TableHeader>
        <TableHeader>Unrealized</TableHeader>
        <TableHeader>Realized</TableHeader>
      </TableRow>
    </thead>
  );
}

export default PortfoliosTableHeader;
