import { CosmosClient } from '@azure/cosmos';

const cosmosEndpoint = process.env['NX_PUBLIC_COSMOS_ENDPOINT'] ?? '';
const cosmosKey = process.env['NX_PUBLIC_COSMOS_KEY'] ?? '';
const client = new CosmosClient({ endpoint: cosmosEndpoint, key: cosmosKey });
const aviportalDb = client.database('aviportal-webstore');

// containers
const accountsContainer = aviportalDb.container('accounts');
const portfoliosContainer = aviportalDb.container('portfolios');

export { accountsContainer, portfoliosContainer };
