import { CommonButton, CommonDialog, FieldInput } from '@avi/client-components';
import { Portfolio } from '@avi/global/models';
import { ErrorMessage, Form, Formik } from 'formik';
import * as yup from 'yup';

export interface PortfolioFormDialogProps {
  isOpen: boolean;
  portfolio?: Portfolio | null;
  onClose: () => void;
  onUpdate: (portfolio: Portfolio) => void;
}

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string(),
});

export function PortfolioFormDialog({ isOpen, onClose, portfolio, onUpdate }: PortfolioFormDialogProps) {
  return (
    <CommonDialog
      closeDialog={onClose}
      dialogTitle={portfolio ? 'Update Portfolio' : 'Close Portfolio'}
      isOpen={isOpen}
    >
      <Formik
        initialValues={{
          name: portfolio?.name || '',
          description: portfolio?.description || '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);

          const updatedPortfolio: Portfolio = {
            ...portfolio,
            ...values,
            id: portfolio?.id || '', // Ensure id is defined
          } as Portfolio;
          // Handle form submission here
          onUpdate(updatedPortfolio);

          onClose();
        }}
      >
        {({ touched, errors, isValid }) => (
          <Form>
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <FieldInput
                type="text"
                name="name"
                required={true}
                hasError={(touched?.name ?? false) && !!errors?.name}
              />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>

            <div className="form-field">
              <label htmlFor="description">Description</label>
              <FieldInput type="text" name="description" />
            </div>
            <div className="form-actions">
              <CommonButton backgroundColor="green" size="small" type="submit" disabled={!isValid}>
                Update
              </CommonButton>
              <CommonButton backgroundColor="grey" size="small" type="button" onClick={onClose}>
                Cancel
              </CommonButton>
            </div>
          </Form>
        )}
      </Formik>
    </CommonDialog>
  );
}

export default PortfolioFormDialog;
