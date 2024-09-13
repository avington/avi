import LeftSideHeader from '../left-side-header/left-side-header';
import RightSideHeader from '../right-side-header/right-side-header';
import styles from './header.module.scss';

export function Header() {
  return (
    <header className={styles['container']}>
      <LeftSideHeader />
      <RightSideHeader />
    </header>
  );
}

export default Header;
