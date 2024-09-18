import { useNavigate } from 'react-router-dom';
import { Pill } from '../../buttons';
import styles from './right-side-header.module.scss';

export function RightSideHeader() {
  const navigate = useNavigate();
  return (
    <nav className={styles['container']}>
      <div>
        <Pill onClick={() => navigate('/portfolios')}>Portfolios</Pill>
      </div>
      <div>
        <Pill onClick={() => navigate('/account')}>Account</Pill>
      </div>
    </nav>
  );
}

export default RightSideHeader;
