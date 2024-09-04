import { RequestHandler } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';

const issuerBaseURL = process.env['NX_PUBLIC_ISSUER_BASE_URL'];
const audience = process.env['NX_PUBLIC_AUDIENCE'];
const tokenSigningAlg = process.env['NX_PUBLIC_TOKEN_SIGNING_ALGORITHM'];

export const checkJwt: RequestHandler = auth({
  issuerBaseURL,
  audience,
  tokenSigningAlg,
});
