import { Position } from '@avi/global/models';
import { positionsContainer } from '@avi/serer/database';

export const queryPositions = async (portfolioId: string, email: string) => {
  const positions = await positionsContainer.items
    .query({
      query: 'SELECT * FROM c WHERE c.portfolioId = @portfolioId AND c.email = @email',
      parameters: [
        { name: '@portfolioId', value: portfolioId },
        { name: '@email', value: email },
      ],
    })
    .fetchAll();

  return (positions.resources ?? []) as Position[];
};

export const getPosition = async (id: string) => {
  const response = await positionsContainer.item(id).read();
  return response.resource as Position;
};

export const insertPosition = async (position: Position) => {
  const response = await positionsContainer.items.create(position);
  return response.resource;
};

export const patchPosition = async (id: string, email: string, position: Partial<Position>) => {
  const existingPosition = await positionsContainer.item(id).read();
  const updatedPosition = { ...existingPosition, ...position };

  // Ensure the email in the updated position matches the email in the request
  if (updatedPosition.email !== email) {
    return undefined;
  }

  const response = await positionsContainer.item(id).replace(updatedPosition);
  return response.resource as Partial<Position>;
};

export const deletePosition = async (id: string) => {
  const response = await positionsContainer.item(id).delete();
  return { deleted: true, resource: response.resource };
};
