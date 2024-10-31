import { Portfolio } from '@avi/global/models';
import axios from 'axios';

export const fetchPortfolios = async () => {
  const baseUrl = process.env.VITE_API_URL || '';
  return axios.get<Portfolio[]>(baseUrl + '/portfolios');
};

export const addPortfolio = async (portfolio: Portfolio) => {
  const baseUrl = process.env.VITE_API_URL || '';
  return axios.post<Portfolio>(baseUrl + '/portfolios', portfolio);
};

export const patchPortfolio = async (portfolio: Portfolio) => {
  const baseUrl = process.env.VITE_API_URL || '';
  return axios.patch<{ id: string }>(baseUrl + '/portfolios/' + portfolio.id, portfolio);
};

export const deletePortfolio = async (id: string) => {
  const baseUrl = process.env.VITE_API_URL || '';
  return axios.delete(baseUrl + '/portfolios/' + id);
};

export const getAllSymbols = async () => {
  const baseUrl = process.env.VITE_API_URL || '';
  return axios.get<{ symbol: string; portfolioId: string }[]>(baseUrl + '/positions/symbols');
};
