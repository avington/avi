import { render } from '@testing-library/react';

import PositionFormDialog from './position-form-dialog';

describe('PositionFormDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PositionFormDialog />);
    expect(baseElement).toBeTruthy();
  });
});
