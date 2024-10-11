import { PropsWithChildren } from 'react';
import styles from './common-dialog.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { useSpring, animated } from 'react-spring';
import RenderWhen from '../render-when/render-when';

export interface CommonDialogProps {
  isOpen: boolean;
  closeDialog: () => void;
  dialogTitle: string;
}

export function CommonDialog({ dialogTitle, children, isOpen, closeDialog }: PropsWithChildren<CommonDialogProps>) {
  const animation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? `scale(1)` : `scale(0.9)`,
  });

  return (
    <RenderWhen>
      <RenderWhen.If isTrue={isOpen}>
        <div className={styles['overlay']}>
          <animated.div style={animation} className={styles['modal']}>
            <div className={styles['header']}>
              <h3 className={styles['title']}>{dialogTitle}</h3>
              <button className={styles['close-button']} onClick={closeDialog} aria-label="Close Dialog">
                <CloseIcon aria-label="Close Dialog" fontSize="large" fontWeight="bold" />
              </button>
            </div>
            <div className={styles['content']}>{children}</div>
          </animated.div>
        </div>
      </RenderWhen.If>
    </RenderWhen>
  );
}

export default CommonDialog;
