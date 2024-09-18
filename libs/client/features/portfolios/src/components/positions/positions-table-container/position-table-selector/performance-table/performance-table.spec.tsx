import { render } from '@testing-library/react';

import PerformanceTable from './performance-table';

describe('PerformanceTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PerformanceTable />);
    expect(baseElement).toBeTruthy();
  });
});
