import { CommonButton, LargePanel } from '@avi/client-components';
import styles from './lots-stock-action-row.module.scss';
import { LotFormDialog } from './lot-form-dialog/lot-form-dialog';
import { useBoolean } from '@avi/client-hooks';

export function LotsStockActionRow() {
  const { setFalse, setTrue, value: isOpen } = useBoolean(false);
  return (
    <>
      <LargePanel>
        <div className={styles['action-row']}>
          <CommonButton backgroundColor="blue" onClick={setTrue}>
            Buy/Sell
          </CommonButton>
          <CommonButton backgroundColor="blue">Add Dividend</CommonButton>
          <CommonButton backgroundColor="blue">Stock Split</CommonButton>
          <CommonButton backgroundColor="red">Cancel</CommonButton>
        </div>
      </LargePanel>
      <LotFormDialog isOpen={isOpen} onClose={setFalse} />
    </>
  );
}

export default LotsStockActionRow;
