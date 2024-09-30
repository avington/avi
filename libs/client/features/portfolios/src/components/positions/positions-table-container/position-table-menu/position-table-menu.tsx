import { CommonButton } from '@avi/client-components';
import PositionTableMenuItems from './position-table-menu-items/position-table-menu-items';
import styles from './position-table-menu.module.scss';
import { useBoolean } from '@avi/client-hooks';
import PositionFormDialog from './position-form-dialog/position-form-dialog';

export function PositionTableMenu() {
  const { setTrue: setModalTrue, setFalse: setModalFalse, value: isModalOpen } = useBoolean(false);
  return (
    <>
      <div className={styles['container']}>
        <PositionTableMenuItems />
        <div className={styles['add-new-button']}>
          <CommonButton backgroundColor="green" size="medium" onClick={setModalTrue}>
            Add Symbol
          </CommonButton>
        </div>
      </div>
      <PositionFormDialog
        isOpen={isModalOpen}
        onClose={setModalFalse}
        onUpdate={(position) => {
          console.log('update', position);
        }}
        dialogTitle="Add Symbol"
      />
    </>
  );
}

export default PositionTableMenu;
