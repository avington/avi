import { TableHeader, TableRow } from '@avi/client-components';

export function HoldingsTableHeader() {
  return (
    <thead>
      <TableRow>
        <TableHeader>Symbol</TableHeader>
        <TableHeader></TableHeader>
        <TableHeader>Name</TableHeader>
        <TableHeader>Shares</TableHeader>
        <TableHeader>Price</TableHeader>
        <TableHeader>Previous Close</TableHeader>
        <TableHeader>Day Change</TableHeader>
        <TableHeader>Day Change %</TableHeader>
        <TableHeader>Market Value</TableHeader>
        <TableHeader>Cost Basis</TableHeader>
        <TableHeader>Total Gains</TableHeader>
      </TableRow>
    </thead>
  );
}

export default HoldingsTableHeader;
