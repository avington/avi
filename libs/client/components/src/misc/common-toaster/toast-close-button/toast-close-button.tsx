import ClearIcon from '@mui/icons-material/Clear';
import styles from './toast-close-button.module.scss';
import { useCloseButton } from './use-close-button.hook';

export type ToastCloseButtonProps = {
  onClose: () => void;
  closeIconText?: string;
};

export function ToastCloseButton({ onClose, closeIconText }: ToastCloseButtonProps) {
  const { closeButtonRef } = useCloseButton();
  return (
    <button
      ref={closeButtonRef}
      className={styles['close']}
      onClick={onClose}
      aria-label={closeIconText}
      tabIndex={0}
      style={{ backgroundColor: 'transparent', border: 'none' }}
    >
      <ClearIcon
        className={styles['clear-icon']}
        fontSize="medium"
        aria-hidden="true"
        role="presentation"
        style={{ color: 'var(--material-color-blue-grey-800)', border: 'none', boxShadow: 'none' }}
      />
    </button>
  );
}
