export function formatCurrency(number: number, decimal = 2): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: decimal,
  });

  return formatter.format(number);
}

export function formatPercentage(number: number, decimals = 2): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
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
