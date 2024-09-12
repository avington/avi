import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ToastContent, ToastContentProps } from './toast-content';

import { ToastIcon } from '../toast-icon';

jest.mock('../toast-icon', () => ({
  ToastIcon: jest.fn(() => <div data-testid="toast-icon" />),
}));
describe('ToastContent', () => {
  const defaultProps: ToastContentProps = {
    theme: 'success',
    message: 'This is a success message',
  };

  it('renders the toast message and icon', () => {
    const { getByText, getByTestId } = render(<ToastContent {...defaultProps} />);

    // Verify that the message is rendered
    expect(getByText(defaultProps.message)).toBeInTheDocument();

    // Verify that the ToastIcon is rendered with the correct theme
    expect(getByTestId('toast-icon')).toBeInTheDocument();
    expect(ToastIcon).toHaveBeenCalledWith({ theme: defaultProps.theme }, {});
  });

  it('renders with the correct alert role', () => {
    const { getByRole } = render(<ToastContent {...defaultProps} />);

    // Verify that the role="alert" is set correctly
    expect(getByRole('alert')).toBeInTheDocument();
  });

  it('renders the correct theme', () => {
    const errorProps: ToastContentProps = {
      theme: 'error',
      message: 'This is an error message',
    };

    const { getByText } = render(<ToastContent {...errorProps} />);

    // Verify that the correct message is rendered with the error theme
    expect(getByText(errorProps.message)).toBeInTheDocument();
    expect(ToastIcon).toHaveBeenCalledWith({ theme: errorProps.theme }, {});
  });
});
