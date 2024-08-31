import { Auth0AuthButton, LoginButton } from '@avi/shared/auth';
import styles from './right-side-header.module.scss';

export function RightSideHeader() {
  return (
    <div className={styles['container']}>
      <Auth0AuthButton />
    </div>
  );
}

export default RightSideHeader;
