import { render } from '@avi/client-tests';

import FieldInput from './field-input';

describe('FieldInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FieldInput name="test" />);
    expect(baseElement).toBeTruthy();
  });
});
