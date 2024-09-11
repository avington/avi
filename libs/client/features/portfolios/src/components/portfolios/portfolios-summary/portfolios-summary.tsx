import { LargePanel, CommonButton } from '@avi/client-components';
import styles from './portfolios-summary.module.scss';
import { useBoolean } from '@avi/client-hooks';

import PortfolioFormDialog from '../portfolio-form-dialog/portfolio-form-dialog';

export function PortfoliosSummary() {
  const { setTrue, setFalse, value: isOpen } = useBoolean(false);

  const handleOpen = () => {
    console.log('Open dialog');
    setTrue();
  };

  return (
    <>
      <LargePanel className={styles['container']} style={{ width: '1280px' }}>
        <div className={styles['total']}>
          <div className={styles['cell-heading']}>All Portfolio Holdings</div>
          <div className={styles['total-number']}>$600,000</div>
        </div>
        <div className={styles['new']}>
          <CommonButton backgroundColor="blue" size="large" onClick={handleOpen}>
            New Portfolio
          </CommonButton>
        </div>
        <div className={styles['cash']}>
          <div className={styles['cell-heading']}>Cash</div>
          <div>$1,000</div>
        </div>
        <div className={styles['day-change']}>
          <div className={styles['cell-heading']}>Day Change</div>
          <div>$5,000 (5.0%)</div>
        </div>
        <div className={styles['unrealized']}>
          <div className={styles['cell-heading']}>Unrealized Gains</div>
          <div>$50,000 (25.0%)</div>
        </div>
        <div className={styles['realized']}>
          <div className={styles['cell-heading']}>Realized Gains</div>
          <div>$5,000 (5.0%)</div>
        </div>
      </LargePanel>
      <PortfolioFormDialog isOpen={isOpen} onClose={setFalse} />
    </>
  );
}

export default PortfoliosSummary;
