import { render } from '@avi/client-tests';

import LotFormDialog from './lot-form-dialog';

describe('LotFormDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LotFormDialog isOpen={false} onClose={vitest.fn()} />);
    expect(baseElement).toBeTruthy();
  });
});
