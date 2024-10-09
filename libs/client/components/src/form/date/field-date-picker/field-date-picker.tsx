import { useField, useFormikContext } from 'formik';
import styles from './field-date-picker.module.scss';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';

export interface FieldDatePickerProps {
  name: string;
  disabled?: boolean;
  required?: boolean;
  hasError?: boolean;
}

export function FieldDatePicker({ name, disabled, required = false, hasError = false }: FieldDatePickerProps) {
  const { handleBlur, handleChange } = useFormikContext();
  const [field] = useField({ name, required, disabled, onBlur: handleBlur, onChange: handleChange });
  const datePickerRef = React.useRef<HTMLInputElement>(null);
  if (datePickerRef.current) {
    datePickerRef.current.onblur = handleBlur;
  }
  return <DatePicker name={field.name} ref={datePickerRef} />;
}

export default FieldDatePicker;
