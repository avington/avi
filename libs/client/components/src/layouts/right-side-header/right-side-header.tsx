import { useNavigate } from 'react-router-dom';
import { Pill } from '../../buttons';
import styles from './right-side-header.module.scss';

export function RightSideHeader() {
  const navigate = useNavigate();
  return (
    <div className={styles['container']}>
      <div>
        <Pill onClick={() => navigate('/portfolios')}>Portfolios</Pill>
      </div>
      <div>
        <Pill onClick={() => navigate('/accounts')}>Accounts</Pill>
      </div>
    </div>
  );
}

export default RightSideHeader;
