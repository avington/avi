import { useField, useFormikContext } from 'formik';
import styles from './field-input.module.scss';
import { StyledInput } from '../styled-input';

export interface FieldInputProps {
  name: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
  hasError?: boolean;
}

export function FieldInput({ name, disabled, required = false, type = 'text', hasError = false }: FieldInputProps) {
  const { handleBlur, handleChange } = useFormikContext();
  const [field] = useField({ name, type, required, disabled, onBlur: handleBlur, onChange: handleChange });

  return <StyledInput {...field} id={field.name} style={hasError ? { border: 'var(--error-border)' } : {}} />;
}

export default FieldInput;
