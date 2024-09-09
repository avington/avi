import { Portfolio } from '@avi/global/models';
import axios from 'axios';

export const fetchPortfolios = async () => {
  const baseUrl = process.env.VITE_API_URL || '';
  return axios.get<Portfolio[]>(baseUrl + '/api/portfolios');
};

export const addPortfolio = async (portfolio: Portfolio) => {
  const baseUrl = process.env.VITE_API_URL || '';
  return axios.post<Portfolio>(baseUrl + '/api/portfolios', portfolio);
};

export const patchPortfolio = async (portfolio: Portfolio) => {
  const baseUrl = process.env.VITE_API_URL || '';
  return axios.patch<{ id: string }>(baseUrl + '/api/portfolios/' + portfolio.id, portfolio);
};

export const deletePortfolio = async (id: string) => {
  const baseUrl = process.env.VITE_API_URL || '';
  return axios.delete(baseUrl + '/api/portfolios/' + id);
};
