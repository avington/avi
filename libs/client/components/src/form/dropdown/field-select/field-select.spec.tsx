import { render } from '@avi/client-tests';

import FieldSelect from './field-select';

describe('FieldSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FieldSelect name="name" />);
    expect(baseElement).toBeTruthy();
  });
});
