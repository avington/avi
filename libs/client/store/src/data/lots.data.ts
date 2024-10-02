import { Lot } from '@avi/global/models';
import axios from 'axios';

export const fetchLotsBySymbolPortfolioId = async (symbol: string, portfolioId: string) => {
  const baseUrl = process.env.VITE_API_URL || '';
  return axios.get<Lot[]>(baseUrl + '/lots/' + portfolioId + '/' + symbol);
};

export const addLot = async (lot: Lot) => {
  const baseUrl = process.env.VITE_API_URL || '';
  return axios.post<Lot>(baseUrl + '/lots', lot);
};

export const deleteLot = async (id: string) => {
  const baseUrl = process.env.VITE_API_URL || '';
  return axios.delete(baseUrl + '/lots/' + id);
};

export const patchLot = async (lot: Lot) => {
  const baseUrl = process.env.VITE_API_URL || '';
  return axios.patch<{ id: string }>(baseUrl + '/lots/' + lot.id, lot);
};
