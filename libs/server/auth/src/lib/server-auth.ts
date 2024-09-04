import { RequestHandler } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';

const issuerBaseURL = process.env['NX_PUBLIC_ISSUER_BASE_URL'];
const audience = process.env['NX_PUBLIC_AUDIENCE'];
const tokenSigningAlg = process.env['NX_PUBLIC_TOKEN_SIGNING_ALGORITHM'];
const secret = process.env['NX_PUBLIC_CLIENT_SECRET'];

console.log('issuerBaseURL', issuerBaseURL);
console.log('audience', audience);
console.log('tokenSigningAlg', tokenSigningAlg);
console.log('secret', secret);

export const checkJwt: RequestHandler = auth({
  issuerBaseURL,
  audience,
  tokenSigningAlg,
  secret,
});
