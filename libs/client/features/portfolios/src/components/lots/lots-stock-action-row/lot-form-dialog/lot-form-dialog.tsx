import { CommonButton, CommonDialog, FieldInput, StyledDropdown, StyledOption } from '@avi/client-components';
import styles from './lot-form-dialog.module.scss';
import { Lot } from '@avi/global/models';
import * as yup from 'yup';
import { ErrorMessage, Formik } from 'formik';

export interface LotFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  lot?: Lot | null;
}

const validationSchema = yup.object().shape({
  openDate: yup.date().max(new Date(), 'Open Date must be before today').required('Open Date is required'),
  shares: yup.number().min(0, 'Shares must be greater than 0').required('Shares is required'),
  costPerShare: yup.number().min(0, 'Cost Per Share must be greater than 0').required('Cost Per Share is required'),
  transactionType: yup.string().required('Transaction Type is required'),
});

export function LotFormDialog({ isOpen, onClose, lot }: LotFormDialogProps) {
  return (
    <CommonDialog closeDialog={onClose} dialogTitle={lot?.id ? 'Update Lot' : 'Add Lot'} isOpen={isOpen}>
      <Formik
        initialValues={{
          openDate: lot?.openDate || new Date(),
          shares: lot?.shares || 0,
          costPerShare: lot?.costPerShare || 0,
          transactionType: lot?.transactionType || 'BUY',
          holdingPeriod: lot?.holdingPeriod || 'Short Term',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          const updatedLot: Lot = {
            ...lot,
            ...values,
            id: lot?.id || '',
          } as Lot;
          // Handle form submission here
          console.log(updatedLot);
          onClose();
        }}
      >
        {({ touched, errors, isValid }) => (
          <form>
            <div className="form-field">
              <label htmlFor="openDate">Open Date</label>
              <FieldInput
                type="date"
                name="openDate"
                required={true}
                hasError={(touched?.openDate ?? false) && !!errors?.openDate}
              />
              <ErrorMessage name="openDate" component="div" className="error-message" />
            </div>
            <div className="form-field">
              <label htmlFor="shares">Shares</label>
              <FieldInput
                type="number"
                name="shares"
                required={true}
                hasError={(touched?.shares ?? false) && !!errors?.shares}
              />
              <ErrorMessage name="shares" component="div" className="error-message" />
            </div>
            <div className="form-field">
              <label htmlFor="costPerShare">Cost Per Share</label>
              <FieldInput
                type="number"
                name="costPerShare"
                required={true}
                hasError={(touched?.costPerShare ?? false) && !!errors?.costPerShare}
              />
              <ErrorMessage name="costPerShare" component="div" className="error-message" />
            </div>
            <div className="form-field">
              <label htmlFor="transactionType">Transaction Type</label>
              <StyledDropdown id="transactionType" name="transactionType" required={true}>
                <StyledOption value="BUY">Buy</StyledOption>
                <StyledOption value="SELL">Sell</StyledOption>
              </StyledDropdown>
            </div>
            <div className={styles['form-actions']}>
              <CommonButton backgroundColor="green" type="submit" disabled={!isValid}>
                Update
              </CommonButton>
              <CommonButton backgroundColor="grey" type="button" onClick={onClose}>
                Cancel
              </CommonButton>
            </div>
          </form>
        )}
      </Formik>
    </CommonDialog>
  );
}

export default LotFormDialog;
