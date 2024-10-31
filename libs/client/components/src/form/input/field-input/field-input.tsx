import { useField, useFormikContext } from 'formik';
import { StyledInput } from '../styled-input';

export interface FieldInputProps {
  name: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
  hasError?: boolean;
}

export function FieldInput({ name, disabled, required = false, type = 'text', hasError = false }: FieldInputProps) {
  const { handleBlur, handleChange, values } = useFormikContext<{ [key: string]: unknown }>();
  const [field] = useField({ name, type, required, disabled, onBlur: handleBlur, onChange: handleChange });

  // Ensure the value is always defined
  const value = (values[name] as string | number | readonly string[] | undefined) ?? '';

  return (
    <StyledInput
      {...field}
      id={field.name}
      style={hasError ? { border: 'var(--error-border)' } : {}}
      type={type}
      value={value}
    />
  );
}

export default FieldInput;
