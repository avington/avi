import { Link } from 'react-router-dom';
import styles from './left-side-header.module.scss';

export function LeftSideHeader() {
  return (
    <div className={styles['container']}>
      <div className={styles['logo']}>
        <Link className={styles['logo-link']} to="/">
          Avi - Digital Garden
        </Link>
      </div>
    </div>
  );
}

export default LeftSideHeader;
