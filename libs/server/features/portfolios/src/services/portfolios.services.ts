import { Portfolio } from '@avi/global/models';
import { portfoliosContainer } from '@avi/serer/database';

export const fetchUserPortfolios = async (email: string) => {
  const portfolios = await portfoliosContainer.items
    .query({
      query: 'SELECT * FROM c WHERE c.email = @email',
      parameters: [{ name: '@email', value: email }],
    })
    .fetchAll();

  return portfolios.resources as Portfolio[];
};
