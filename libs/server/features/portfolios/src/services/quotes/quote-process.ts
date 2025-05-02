import { WebSocket } from 'ws';
import positionsSchema from '../../schemas/positions.schema';
import { getBatchQuote } from '../fmp/quote.service';

export const processUpdatedQuotes = async (ws: WebSocket, ...args: unknown[]): Promise<void> => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';
  const positions = await positionsSchema.find({ user });
  const portfolioIds = [...(new Set(positions.map((position) => position.portfolioId)) ?? [])];

  const processPortfolio = async (portfolioId: string): Promise<void> => {
    const positionsForPortfolio = positions.filter((position) => position.portfolioId === portfolioId);
    const symbols = [...(new Set(positionsForPortfolio.map((position) => position.symbol)) ?? [])];
    const quotes = await getBatchQuote(symbols);
    ws.send(JSON.stringify({ portfolioId, quotes }));
  };
  portfolioIds.forEach(processPortfolio);
};
