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

export const getBatchQuote = async (symbols: string[]) => {
  const v4Url = process.env['NX_PUBLIC_FMP_API_URL_V4'];
  const key = process.env['NX_PUBLIC_FMP_API_KEY'];
  if (!key) {
    throw new Error('Missing API key');
  }
  if (!v4Url) {
    throw new Error('Missing API URL');
  }
  try {
    const url = `${v4Url}/batch-pre-post-market?apikey=${key}&symbols=${symbols.join(',')}`;
    console.log('url', url);
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error('Error calling: /quotes', error);
    throw error;
  }
};
