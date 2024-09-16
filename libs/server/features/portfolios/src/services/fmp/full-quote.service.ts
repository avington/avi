export const getFullQuote = async (symbol: string) => {
  const key = process.env['NX_PUBLIC_FMP_API_KEY'];
  try {
    const response = await fetch(`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${key}`);
    return response.json();
  } catch (error) {
    console.error('Error calling: https://financialmodelingprep.com/api/v3/quote/', error);
    throw error;
  }
};
