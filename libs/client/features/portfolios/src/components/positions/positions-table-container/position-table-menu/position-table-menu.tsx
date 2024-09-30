import { CommonButton } from '@avi/client-components';
import PositionTableMenuItems from './position-table-menu-items/position-table-menu-items';
import styles from './position-table-menu.module.scss';
import { useBoolean } from '@avi/client-hooks';
import PositionFormDialog from './position-form-dialog/position-form-dialog';
import { Position } from '@avi/global/models';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { insertPositionAction, useAppDispatch } from '@avi/client-store';

/**
 * Component for displaying and managing the position table menu.
 *
 * This component includes a button to add a new symbol and a dialog for updating positions.
 * It uses a modal to handle the addition of new symbols and dispatches an action to update the position.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <PositionTableMenu />
 *
 * @remarks
 * - Utilizes `useBoolean` hook to manage modal state.
 * - Retrieves `portfolioId` from URL parameters using `useParams`.
 * - Dispatches `insertPositionAction` to update the position with the new symbol and portfolio ID.
 *
 * @hook
 * - `useBoolean`: Manages the state of the modal (open/close).
 * - `useParams`: Retrieves the `portfolioId` from the URL.
 * - `useAppDispatch`: Dispatches actions to the Redux store.
 *
 * @dependencies
 * - `PositionTableMenuItems`: Component for displaying menu items.
 * - `CommonButton`: Reusable button component.
 * - `PositionFormDialog`: Dialog component for adding/updating positions.
 *
 * @see {@link useBoolean}
 * @see {@link useParams}
 * @see {@link useAppDispatch}
 * @see {@link insertPositionAction}
 */
export function PositionTableMenu() {
  const { setTrue: setModalTrue, setFalse: setModalFalse, value: isModalOpen } = useBoolean(false);
  const { portfolioId } = useParams<{ portfolioId: string }>();
  const dispatch = useAppDispatch();

  const handleUpdate = useCallback(
    (position: Position) => {
      const updatedPosition: Position = {
        ...position,
        portfolioId,
      } as Position;

      dispatch(insertPositionAction({ symbol: updatedPosition.symbol, portfolioId: updatedPosition.portfolioId }));
    },
    [portfolioId, dispatch]
  );

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
        onUpdate={handleUpdate}
        dialogTitle="Add Symbol"
      />
    </>
  );
}

export default PositionTableMenu;
