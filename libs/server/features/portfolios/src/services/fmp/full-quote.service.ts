import { BatchQuote } from '@avi/global/models';

export const getFullQuote = async (symbol: string) => {
  const key = process.env['NX_PUBLIC_FMP_API_KEY'];
  if (!key) {
    throw new Error('Missing API key');
  }

  const baseUrl = process.env['NX_PUBLIC_FMP_API_URL_V3'];
  if (!baseUrl) {
    throw new Error('Missing API URL');
  }

  try {
    const url = `${baseUrl}/quote/${symbol}?apikey=${key}`;
    console.log('url', url);
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error('Error calling: /quote/', error);
    throw error;
  }
};

export const getBatchQuotes = async (symbols: string[]) => {
  const key = process.env['NX_PUBLIC_FMP_API_KEY'];
  if (!key) {
    throw new Error('Missing API key');
  }

  const baseUrl = process.env['NX_PUBLIC_FMP_API_URL_V4'];
  if (!baseUrl) {
    throw new Error(`Missing API URL ${baseUrl}`);
  }

  try {
    const url = `${baseUrl}/batch-pre-post-market/${symbols.join(',')}?apikey=${key}`;
    console.log('url', url);
    const response = await fetch(url);
    return response.json() as Promise<BatchQuote[]>;
  } catch (error) {
    console.error('Error calling: /quote/', error);
    throw error;
  }
};
