export const formatDateAsDayMonthYear = (date: Date): string => {
  return Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};
