/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from 'cors';
import { checkJwt } from '@avi/server/auth';

const app = express();
const clientDomain = process.env.NX_PUBLIC_CLIENT_DOMAIN || 'http://localhost:3000';
const user = process.env.NX_PUBLIC_DEV_USER;

app.use(
  cors({
    origin: clientDomain,
  })
);

// Add logging to checkJwt middleware
app.use((req, res, next) => {
  console.log('the temporary user is:', user);
  next();
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.get('/api/secure', checkJwt, (req, res) => {
  res.send({ message: 'Welcome to the secure api!' });
});



const port = process.env.NX_PUBLIC_API_PORT || 3334;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
