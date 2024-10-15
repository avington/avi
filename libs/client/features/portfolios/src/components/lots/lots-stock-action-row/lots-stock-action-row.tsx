import { CommonButton, LargePanel } from '@avi/client-components';
import styles from './lots-stock-action-row.module.scss';
import LotFormDialog from './lot-form-dialog/lot-form-dialog';
import { useBoolean } from '@avi/client-hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback } from 'react';

export function LotsStockActionRow() {
  const { setFalse, setTrue, value: isOpen } = useBoolean(false);
  const { portfolioId } = useParams();
  const navigate = useNavigate();

  const handleGoBack = useCallback(() => {
    navigate(`/positions/${portfolioId}`);
  }, [navigate, portfolioId]);

  return (
    <>
      <LargePanel>
        <div className={styles['action-row']}>
          <CommonButton backgroundColor="blue" onClick={setTrue}>
            Buy/Sell
          </CommonButton>
          <CommonButton backgroundColor="blue">Add Dividend</CommonButton>
          <CommonButton backgroundColor="blue">Stock Split</CommonButton>
          <CommonButton backgroundColor="grey" onClick={handleGoBack}>
            Back
          </CommonButton>
        </div>
      </LargePanel>
      <LotFormDialog isOpen={isOpen} onClose={setFalse} />
    </>
  );
}

export default LotsStockActionRow;
