import {
  CommonButton,
  CommonDialog,
  CommonToaster,
  DisplayFormikState,
  FieldInput,
  FieldSelect,
  StyledOption,
} from '@avi/client-components';
import { Lot, TransactionType } from '@avi/global/models';
import { format } from 'date-fns';
import { ErrorMessage, Formik, FormikProps } from 'formik';
import { noop } from 'lodash-es';
import * as yup from 'yup';
import styles from './lot-form-dialog.module.scss';
import {
  addNewLotAction,
  selectLotsError,
  selectLotsLoadingStatus,
  useAppDispatch,
  useAppSelector,
} from '@avi/client-store';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBoolean } from '@avi/client-hooks';
export interface LotFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  lot?: Lot | null;
}

const validationSchema = yup.object().shape({
  openDate: yup.date().max(new Date(), 'Open Date cannot be in the future').required('Open Date is required'),
  shares: yup.number().min(0, 'Shares must be greater than 0').required('Shares is required'),
  costPerShare: yup.number().min(0, 'Cost Per Share must be greater than 0').required('Cost Per Share is required'),
  transactionType: yup.string().required('Transaction Type is required'),
});

export function LotFormDialog({ isOpen, onClose, lot }: LotFormDialogProps) {
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector(selectLotsLoadingStatus);
  const errorMessage = useAppSelector(selectLotsError);
  const { setFalse: setErrorFalse, setTrue: setErrorTrue, value: isErrorOpen } = useBoolean(false);

  const { portfolioId, symbol } = useParams<{ portfolioId: string; symbol: string }>();

  useEffect(() => {
    if (errorMessage) {
      setErrorTrue();
    }
  }, [errorMessage, setErrorTrue]);

  const onSubmit = useCallback(
    (
      formik: FormikProps<{
        openDate: string;
        shares: number;
        costPerShare: number;
        transactionType: TransactionType;
      }>
    ) => {
      const newLot: Lot = {
        id: lot?.id,
        portfolioId: portfolioId ?? '',
        symbol: symbol ?? '',
        openDate: formik.values.openDate,
        shares: formik.values.shares,
        costPerShare: formik.values.costPerShare,
        transactionType: formik.values.transactionType,
        createdAt: lot?.createdAt,
      };

      dispatch(addNewLotAction(newLot))
        .unwrap()
        .then(() => {
          formik.resetForm();
          onClose();
        });
    },
    [lot?.id, lot?.createdAt, portfolioId, symbol, dispatch, onClose]
  );

  useEffect(() => {
    if (loadingStatus === 'succeeded') {
      onClose();
    }
  }, [loadingStatus, onClose]);

  return (
    <CommonDialog closeDialog={onClose} dialogTitle={lot?.id ? 'Update Lot' : 'Add Lot'} isOpen={isOpen}>
      <CommonToaster
        closeIconText="close"
        theme="error"
        isVisible={isErrorOpen}
        message={errorMessage?.message ?? 'There was an error'}
        onClose={setErrorFalse}
      />
      <Formik
        initialValues={{
          openDate: format(lot?.openDate ?? new Date(), 'yyyy-MM-dd') || format(new Date(), 'yyyy-MM-dd'),
          shares: lot?.shares || 0,
          costPerShare: lot?.costPerShare || 0,
          transactionType: lot?.transactionType || 'BUY',
        }}
        validationSchema={validationSchema}
        onSubmit={noop}
      >
        {(formik) => {
          const { touched, errors, isValid } = formik;
          return (
            <form>
              <div className="form-field">
                <label htmlFor="transactionType">Transaction Type</label>
                <FieldSelect name="transactionType" required={true}>
                  <StyledOption value="BUY">Buy</StyledOption>
                  <StyledOption value="SELL">Sell</StyledOption>
                </FieldSelect>
              </div>
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
              <div className="form-actions">
                <CommonButton
                  backgroundColor="green"
                  type="button"
                  disabled={!isValid}
                  onClick={() => onSubmit(formik)}
                >
                  Update
                </CommonButton>
                <CommonButton backgroundColor="grey" type="button" onClick={onClose}>
                  Cancel
                </CommonButton>
              </div>
            </form>
          );
        }}
      </Formik>
    </CommonDialog>
  );
}

export default LotFormDialog;
