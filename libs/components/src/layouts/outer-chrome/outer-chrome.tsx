import { PropsWithChildren } from 'react';
import Header from '../header/header';
import styles from './outer-chrome.module.scss';
import { GoogleAuthenticationProvider } from '@avi/shared/auth';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OuterChromeProps {}

export function OuterChrome({ children }: PropsWithChildren<OuterChromeProps>) {
  return (
    <div className={styles['container']}>
      <Header />
      <main className={styles['main']}>{children}</main>
    </div>
  );
}

export default OuterChrome;