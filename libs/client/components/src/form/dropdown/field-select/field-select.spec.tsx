import { render } from '@testing-library/react';

import FieldSelect from './field-select';

describe('FieldSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FieldSelect />);
    expect(baseElement).toBeTruthy();
  });
});
