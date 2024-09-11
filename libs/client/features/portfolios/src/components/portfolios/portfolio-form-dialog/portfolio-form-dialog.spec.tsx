import { render } from '@testing-library/react';

import PortfolioFormDialog from './portfolio-form-dialog';

describe('PortfolioFormDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PortfolioFormDialog />);
    expect(baseElement).toBeTruthy();
  });
});
