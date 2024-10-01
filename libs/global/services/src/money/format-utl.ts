export function formatCurrency(number: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  return formatter.format(number);
}

export function formatPercentage(number: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
  });

  return formatter.format(number);
}

export function formatPercentageDivideBy100(number: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
  });
  return formatter.format(number / 100);
}

export function formatNumber(number: number): string {
  const formatter = new Intl.NumberFormat('en-US');

  return formatter.format(number);
}

export function formatCurrencyAndPercentage(currencyNumber: number, percentageNumber: number): string {
  return `${formatCurrency(currencyNumber)} (${formatPercentage(percentageNumber)})`;
}
