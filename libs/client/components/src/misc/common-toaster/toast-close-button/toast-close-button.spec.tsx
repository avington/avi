import { fireEvent, render, screen } from '@testing-library/react';
import { ToastCloseButton, ToastCloseButtonProps } from './toast-close-button';

vi.mock('../../../icons', () => ({
  ClearIcon: jest.fn(() => <div data-testid="clear-icon" />),
}));

describe('ToastCloseButton', () => {
  const defaultProps: ToastCloseButtonProps = {
    onClose: vi.fn(),
    closeIconText: 'Close',
  };

  it('calls onClose when the button is clicked', () => {
    render(<ToastCloseButton {...defaultProps} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });
});
