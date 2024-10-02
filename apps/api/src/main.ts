import { connectToDatabase } from '@avi/serer/database';
import { portfolioRouter, positionsRouter, lotsRouter } from '@avi/server/features/portfolios';
import cors from 'cors';
import express from 'express';
import * as path from 'path';
import morgan from 'morgan';

const clientDomain = process.env.NX_PUBLIC_CLIENT_DOMAIN || 'http://localhost:3000';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable CORS
app.use(
  cors({
    origin: clientDomain,
  })
);

// middleware to log all the requests
const dev = process.env.NX_PUBLIC_DEV;
if (dev) {
  app.use(morgan('combined'));
}

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Middleware to handle all the routes
app.use('/api/v1/portfolios', portfolioRouter);
app.use('/api/v1/positions', positionsRouter);
app.use('/api/v1/lots', lotsRouter);

// connect to mongo
const db = async () => await connectToDatabase();
db();

const port = process.env.NX_PUBLIC_API_PORT || 3334;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
