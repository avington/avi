import { Position } from '@avi/global/models';
import {
  deletePosition,
  getPosition,
  insertPosition,
  patchPosition,
  queryPositions,
} from '../services/positions.service';
import { Request, Response } from 'express';
import { getFullQuote } from '../services/fmp/full-quote.service';
import { getPortfolio } from '../services/portfolios.service';

interface Params {
  portfolioId: string;
}

export const getPositions = async (req: Request<Params>, res: Response) => {
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';

  const rawPositions = await queryPositions(user, req.params.portfolioId);

  const portfolios = rawPositions.filter((p) => p.isActive).map(mapPosition);
  res.status(200).json(portfolios);
};

export const insertPositionHandler = async (req: Request, res: Response) => {
  const symbol = req.body.symbol;
  const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';
  const portfolioId = req.body.portfolioId;
  const positionQuote = await getFullQuote(symbol);
  const portfolio = await getPortfolio(portfolioId);

  // Check if the portfolio exists.
  // If not, return a 404 status with a 'Portfolio not found' message.
  if (!portfolio) {
    res.status(404).json({ message: 'Portfolio not found' });
    return;
  }

  const position = {
    ...positionQuote,
    email: user,
    portfolioId,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const addedPosition = await insertPosition(position);
  const mappedPosition = mapPosition(addedPosition as Position);
  res.status(201).json(mappedPosition);
};

export const getPositionHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params['id'] as string;
    const position = await getPosition(id);
    if (!position) {
      res.status(404).json({ message: 'Position not found' });
      return;
    }
    const mappedPosition = mapPosition(position as Position);
    res.status(200).json(mappedPosition);
  } catch (error) {
    res.status(501).json({ message: 'Internal server error' });
  }
};

export const patchPositionHandler = async (req: Request, res: Response) => {
  try {
    const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';
    const id = req.params['id'] as string;
    const position = req.body;
    position.updatedAt = new Date();
    const updatedPosition = await patchPosition(id, user, position);
    if (!updatedPosition) {
      res.status(404).json({ message: 'Position not found' });
      return;
    }
    const mappedPosition = mapPosition(updatedPosition as Position);
    res.status(200).json(mappedPosition);
  } catch (error) {
    res.status(501).json({ message: 'Internal server error' });
  }
};

export const deletePositionHandler = async (req: Request, res: Response) => {
  try {
    const user = process.env['NX_PUBLIC_DEV_USER'] ?? '';
    const id = req.params['id'] as string;
    const position = await getPosition(id);
    if (!position || position.email !== user) {
      res.status(404).json({ message: 'Position not found' });
      return;
    }
    const updatedPosition = await deletePosition(id);

    res.status(200).json(updatedPosition.deleted);
  } catch (error) {
    res.status(501).json({ message: 'Internal server error' });
  }
};

type MapPositionType = (positions: Position | undefined) => Position | undefined;

const mapPosition: MapPositionType = (positions) => {
  if (!positions) {
    return undefined;
  }

  return {
    id: positions.id,
    portfolioId: positions.portfolioId,
    symbol: positions.symbol,
    email: positions.email,
    name: positions.name,
    price: positions.price,
    changesPercentage: positions.changesPercentage,
    change: positions.change,
    dayLow: positions.dayLow,
    dayHigh: positions.dayHigh,
    yearHigh: positions.yearHigh,
    yearLow: positions.yearLow,
    marketCap: positions.marketCap,
    priceAvg50: positions.priceAvg50,
    priceAvg200: positions.priceAvg200,
    exchange: positions.exchange,
    volume: positions.volume,
    avgVolume: positions.avgVolume,
    open: positions.open,
    previousClose: positions.previousClose,
    eps: positions.eps,
    pe: positions.pe,
    earningsAnnouncement: positions.earningsAnnouncement,
    sharesOutstanding: positions.sharesOutstanding,
    timestamp: positions.timestamp,
    isActive: positions.isActive,
    createdAt: positions.createdAt,
    updatedAt: positions.updatedAt,
    realizedGains: positions?.realizedGains
      ? positions.realizedGains
      : {
          total: { amount: 0, percentage: 0 },
          shortTerm: { amount: 0, percentage: 0 },
          longTerm: { amount: 0, percentage: 0 },
        },
    unrealizedGains: positions?.unrealizedGains
      ? positions.unrealizedGains
      : {
          total: { amount: 0, percentage: 0 },
          shortTerm: { amount: 0, percentage: 0 },
          longTerm: { amount: 0, percentage: 0 },
        },
    averageCostBasis: positions.averageCostBasis,
  };
};
