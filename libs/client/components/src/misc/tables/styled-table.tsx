import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 8px;
  background-color: #f2f2f2;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 8px;
`;

const StyledTable: React.FC = () => {
  return (
    <Table>
      <thead>
        <TableRow>
          <TableHeader>Header 1</TableHeader>
          <TableHeader>Header 2</TableHeader>
          <TableHeader>Header 3</TableHeader>
        </TableRow>
      </thead>
      <tbody>
        <TableRow>
          <TableCell>Data 1</TableCell>
          <TableCell>Data 2</TableCell>
          <TableCell>Data 3</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Data 4</TableCell>
          <TableCell>Data 5</TableCell>
          <TableCell>Data 6</TableCell>
        </TableRow>
      </tbody>
    </Table>
  );
};

export default StyledTable;

export { StyledTable, Table, TableHeader, TableRow, TableCell };