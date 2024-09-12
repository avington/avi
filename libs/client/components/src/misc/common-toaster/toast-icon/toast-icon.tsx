import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import styles from './toast-icon.module.scss';
import { ToastThemeTypes } from '../common-toast-theme-types';

export type ToastIconProps = {
  theme: ToastThemeTypes;
};

export const ToastIcon: React.FC<ToastIconProps> = ({ theme }) => {
  switch (theme) {
    case 'success':
      return <CheckCircleIcon className={styles['circle-icon']} />;
    case 'error':
      return <ErrorIcon className={styles['circle-icon']} />;
  }
};

export default ToastIcon;
