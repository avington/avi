import { CommonButton, CommonDialog, FieldInput } from '@avi/client-components';
import styles from './position-form-dialog.module.scss';
import { Position } from '@avi/global/models';
import { Formik } from 'formik';
import * as yup from 'yup';

export interface PositionFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (position: Position) => void;
  dialogTitle: string;
}

const validationSchema = yup.object().shape({
  symbol: yup.string().required('Stock symbol is required'),
});

export function PositionFormDialog({ isOpen, onClose, onUpdate, dialogTitle }: PositionFormDialogProps) {
  return (
    <CommonDialog closeDialog={onClose} dialogTitle={dialogTitle} isOpen={isOpen}>
      <Formik
        initialValues={{
          symbol: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(false);

          const updatedPosition: Position = {
            ...values,
          } as Position;

          onUpdate(updatedPosition);

          onClose();
          resetForm();
        }}
      >
        {({ touched, errors, isValid, handleSubmit }) => (
          <form
            className={styles['form']}
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(event);
            }}
          >
            <div className={styles['form-field']}>
              <label htmlFor="symbol">Symbol</label>
              <FieldInput type="text" name="symbol" required={true} />
              {touched.symbol && errors.symbol && (
                <div style={{ color: 'var(--material-color-red-a700)' }}>{errors.symbol}</div>
              )}
            </div>
            <div className="form-actions">
              <CommonButton backgroundColor="green" size="small" type="submit" disabled={!isValid}>
                Update
              </CommonButton>
              <CommonButton backgroundColor="grey" size="small" type="button" onClick={onClose}>
                Cancel
              </CommonButton>
            </div>
          </form>
        )}
      </Formik>
    </CommonDialog>
  );
}

export default PositionFormDialog;
