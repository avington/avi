import { render } from '@testing-library/react';

import CommonDialog from './common-dialog';

describe('CommonDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommonDialog closeDialog={vi.fn()} dialogTitle="test" isOpen={false} />);
    expect(baseElement).toBeTruthy();
  });
});
