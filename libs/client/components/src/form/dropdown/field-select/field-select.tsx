import { useField, useFormikContext } from 'formik';
import { PropsWithChildren } from 'react';
import { StyledDropdown } from '../styled-dropdown';

export interface FieldSelectProps {
  name: string;
  disabled?: boolean;
  required?: boolean;
  hasError?: boolean;
}

export function FieldSelect({
  children,
  name,
  disabled,
  required = false,
  hasError = false,
}: PropsWithChildren<FieldSelectProps>) {
  const { handleBlur, handleChange } = useFormikContext();
  const [field] = useField({ name, required, disabled, onBlur: handleBlur, onChange: handleChange });

  return (
    <StyledDropdown {...field} id={field.name} style={hasError ? { border: 'var(--error-border)' } : {}}>
      {children}
    </StyledDropdown>
  );
}

export default FieldSelect;
