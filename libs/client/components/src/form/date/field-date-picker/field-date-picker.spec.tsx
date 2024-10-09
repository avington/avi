import { render } from '@testing-library/react';

import FieldDatePicker from './field-date-picker';

describe('FieldDatePicker', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FieldDatePicker />);
    expect(baseElement).toBeTruthy();
  });
});
