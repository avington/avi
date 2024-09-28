import { Position } from '@avi/global/models';
import axios from 'axios';

export const fetchPositions = async (portfolioId: string) => {
  const baseUrl = process.env.VITE_API_URL || '';
  return axios.get<Position[]>(baseUrl + '/positions/' + portfolioId);
};

export const addPosition = async (position: Position) => {
  const baseUrl = process.env.VITE_API_URL || '';
  return axios.post<Position>(baseUrl + '/positions', position);
};

export const patchPosition = async (position: Position) => {
  const baseUrl = process.env.VITE_API_URL || '';
  return axios.patch<{ id: string }>(baseUrl + '/positions/' + position.id, position);
};
