import { LargePanel, CommonButton, CommonToaster } from '@avi/client-components';
import styles from './portfolios-summary.module.scss';
import { useBoolean } from '@avi/client-hooks';

import PortfolioFormDialog from '../portfolio-form-dialog/portfolio-form-dialog';
import { Portfolio } from '@avi/global/models';
import { useCallback } from 'react';
import { addPortfolioAction, useAppDispatch } from '@avi/client-store';

export function PortfoliosSummary() {
  const { setTrue: setModalTrue, setFalse: setModalFalse, value: isModalOpen } = useBoolean(false);
  const { setTrue: setAddSuccessTrue, setFalse: setAddSuccessFalse, value: isAddSuccessToaster } = useBoolean(false);
  const { setTrue: setAddFailedTrue, setFalse: setAddFailedFalse, value: isAddFailedToaster } = useBoolean(false);
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    setModalTrue();
  };

  const handleUpdate = useCallback(
    (portfolio: Portfolio) => {
      dispatch(addPortfolioAction(portfolio))
        .then(() => {
          setAddSuccessTrue();
        })
        .catch(() => {
          setAddFailedTrue();
        });
    },
    [dispatch, setAddFailedTrue, setAddSuccessTrue]
  );

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
      <PortfolioFormDialog isOpen={isModalOpen} onClose={setModalFalse} onUpdate={handleUpdate} />
      <CommonToaster
        closeIconText="Close"
        theme="success"
        isVisible={isAddSuccessToaster}
        message="Portfolio added."
        onClose={setAddSuccessFalse}
      />
      <CommonToaster
        closeIconText="Close"
        theme="error"
        isVisible={isAddFailedToaster}
        message="Error adding portfolio."
        onClose={setAddFailedFalse}
      />
    </>
  );
}

export default PortfoliosSummary;
