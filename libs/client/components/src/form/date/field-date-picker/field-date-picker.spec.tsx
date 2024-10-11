import { render } from '@testing-library/react';

import FieldDatePicker from './field-date-picker';

describe('FieldDatePicker', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FieldDatePicker name="name" />);
    expect(baseElement).toBeTruthy();
  });
});
