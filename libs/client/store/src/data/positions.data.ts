import { Position } from '@avi/global/models';
import axios from 'axios';

export const fetchAllPositions = async () => {
  const baseUrl = process.env.VITE_API_URL || '';
  return axios.get<Position[]>(baseUrl + '/positions');
};

export const fetchPosition = async (id: string) => {
  const baseUrl = process.env.VITE_API_URL || '';
  return axios.get<Position[]>(baseUrl + '/positions' + id);
};

export const fetchPositionsByPortfolio = async (portfolioId: string) => {
  const baseUrl = process.env.VITE_API_URL || '';
  return axios.get<Position[]>(`${baseUrl}/positions/portfolio/${portfolioId}`);
};

export const addPosition = async (position: Position) => {
  const baseUrl = process.env.VITE_API_URL || '';
  return axios.post<Position>(baseUrl + '/positions', position);
};

export const patchPosition = async (position: Position) => {
  const baseUrl = process.env.VITE_API_URL || '';
  return axios.patch<{ id: string }>(baseUrl + '/positions/' + position.id, position);
};

export const updateQuote = async (symbol: string, portfolioId: string) => {
  // http://localhost:60001/api/v1/positions/6716b6b488b1bf586df49d55/update-price
  const baseUrl = process.env.VITE_API_URL || '';
  return axios.patch<{ symbol: string }>(`${baseUrl}/positions/${portfolioId}/update-price`, { symbol });
};
