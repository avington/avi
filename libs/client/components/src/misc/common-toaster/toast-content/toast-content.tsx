import { ToastThemeTypes } from '../common-toast-theme-types';
import { ToastIcon } from '../toast-icon';
import styles from './toast-content.module.scss';

export type ToastContentProps = {
  theme: ToastThemeTypes;
  message: string;
};

export function ToastContent({ theme, message }: ToastContentProps) {
  return (
    <div className={styles['content']}>
      <span role="alert">
        <div className={styles['toast-container']}>
          <ToastIcon theme={theme} /> {message}
        </div>
      </span>
    </div>
  );
}
