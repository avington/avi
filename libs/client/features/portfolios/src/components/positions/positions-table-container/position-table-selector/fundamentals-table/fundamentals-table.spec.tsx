import { render } from '@testing-library/react';

import FundamentalsTable from './fundamentals-table';

describe('FundamentalsTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FundamentalsTable />);
    expect(baseElement).toBeTruthy();
  });
});
