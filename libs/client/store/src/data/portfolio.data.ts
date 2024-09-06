import { Portfolio } from '@avi/global/models';
import axios from 'axios';

export const fetchPortfolios = async () => {
  const baseUrl = process.env.VITE_API_URL || '';
  return axios.get<Portfolio[]>(baseUrl + '/api/portfolios');
};
