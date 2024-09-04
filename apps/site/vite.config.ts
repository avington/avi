/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/site',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths()],
  define: {
    'process.env': {
      VITE_PRODUCTION: process.env.VITE_PRODUCTION,
      VITE_API_URL: process.env.VITE_API_URL,
      VITE_AUTH0_DOMAIN: process.env.VITE_AUTH0_DOMAIN,
      VITE_AUTH0_CLIENT_ID: process.env.VITE_AUTH0_CLIENT_ID,
      NX_PUBLIC_API_PORT: process.env.NX_PUBLIC_API_PORT,
      NX_PUBLIC_CLIENT_DOMAIN: process.env.NX_PUBLIC_CLIENT_DOMAIN,
      NX_PUBLIC_AUDIENCE: process.env.NX_PUBLIC_AUDIENCE,
      NX_PUBLIC_ISSUER_BASE_URL: process.env.NX_PUBLIC_ISSUER_BASE_URL,
      NX_PUBLIC_TOKEN_SIGNING_ALGORITHM: process.env.NX_PUBLIC_TOKEN_SIGNING_ALGORITHM,
      NX_PUBLIC_DEV_USER: process.env.NX_PUBLIC_DEV_USER,
    },
  },

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: '../../dist/apps/site',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
