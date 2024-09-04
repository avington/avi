import LeftSideHeader from '../left-side-header/left-side-header';
import RightSideHeader from '../right-side-header/right-side-header';
import styles from './header.module.scss';

export function Header() {
  return (
    <div className={styles['container']}>
      <LeftSideHeader />
      <RightSideHeader />
    </div>
  );
}

export default Header;
