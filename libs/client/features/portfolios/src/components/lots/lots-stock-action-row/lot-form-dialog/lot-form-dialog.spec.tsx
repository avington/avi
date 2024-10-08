import { render } from '@testing-library/react';

import LotFormDialog from './lot-form-dialog';

describe('LotFormDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LotFormDialog />);
    expect(baseElement).toBeTruthy();
  });
});
