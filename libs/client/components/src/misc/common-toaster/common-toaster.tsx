import { PropsWithChildren, useRef } from 'react';
import ReactDOM from 'react-dom';
import { animated } from 'react-spring';

import styles from './common-toaster.module.scss';
import { ToastCloseButton } from './toast-close-button';
import { useOutsideAlerter } from '@avi/client-hooks';
import { useCommonToast } from './use-common-toast.hook';
import { ToastThemeTypes } from './common-toast-theme-types';
import { ToastContent } from './toast-content';

export interface CommonToasterProps {
  theme: ToastThemeTypes;
  isVisible: boolean;
  onClose: () => void;
  wrapperRef?: React.RefObject<HTMLDivElement>;
  message: string;
  closeIconText: string;
}

export type ToastState = {
  isVisible: boolean;
  theme: ToastThemeTypes;
  message: string;
  closeIconText: string;
};

export function CommonToaster({
  isVisible,
  onClose,
  theme,
  wrapperRef,
  message,
  closeIconText,
}: PropsWithChildren<CommonToasterProps>) {
  const { animation, handleKeyDown } = useCommonToast({
    isVisible,
    onClose,
    theme,
  });
  const toastRef = useRef(null);

  useOutsideAlerter({
    outsideClicked: () => onClose(),
    refListContainer: toastRef,
  });

  return ReactDOM.createPortal(
    <animated.div style={{ ...animation }} className={styles['container']} onKeyDown={handleKeyDown} ref={toastRef}>
      <div className={`${styles['inner-container']} ${styles[theme]}`}>
        <ToastContent theme={theme} message={message}></ToastContent>
        <ToastCloseButton onClose={onClose} closeIconText={closeIconText}></ToastCloseButton>
      </div>
    </animated.div>,
    document.body
  );
}

export default CommonToaster;
