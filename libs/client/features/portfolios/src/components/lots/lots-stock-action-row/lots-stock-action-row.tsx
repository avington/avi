import { CommonButton, LargePanel } from '@avi/client-components';
import styles from './lots-stock-action-row.module.scss';

export function LotsStockActionRow() {
  return (
    <LargePanel>
      <div className={styles['action-row']}>
        <CommonButton backgroundColor="blue">Buy/Sell</CommonButton>
        <CommonButton backgroundColor="green">Add Dividend</CommonButton>
        <CommonButton backgroundColor="orange">Stock Split</CommonButton>
        <CommonButton backgroundColor="red">Cancel</CommonButton>
      </div>
    </LargePanel>
  );
}

export default LotsStockActionRow;
