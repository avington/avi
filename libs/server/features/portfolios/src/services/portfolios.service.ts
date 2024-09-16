import { Portfolio } from '@avi/global/models';
import { portfoliosContainer } from '@avi/serer/database';
import { ItemDefinition, ItemResponse } from '@azure/cosmos';

export const fetchUserPortfolios = async (email: string) => {
  const portfolios = await portfoliosContainer.items
    .query({
      query: 'SELECT * FROM c WHERE c.email = @email',
      parameters: [{ name: '@email', value: email }],
    })
    .fetchAll();

  return portfolios.resources as Portfolio[];
};

export const getPortfolio = async (id: string) => {
  const response = await portfoliosContainer.item(id).read();
  return response.resource as Portfolio;
};

export const insertPortfolio = async (portfolio: Portfolio) => {
  const response: ItemResponse<Portfolio> = await portfoliosContainer.items.create(portfolio);
  return response.resource;
};

export const patchPortfolio = async (id: string, portfolio: Partial<Portfolio>) => {
  const response: ItemResponse<Partial<Portfolio>> | undefined = await portfoliosContainer.item(id).replace(portfolio);
  return response.resource;
};

export const deletePortfolio = async (id: string) => {
  const response: ItemResponse<ItemDefinition> = await portfoliosContainer.item(id).delete();
  return response.statusCode;
};
