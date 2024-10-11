import { AxiosResponse } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serializeError = (error: Error | AxiosResponse<unknown, any> | unknown | undefined) => {
  // if undefined then there was no error
  if (!error) {
    return undefined;
  }

  const errorProperties = Object.getOwnPropertyNames(error);
  if ('data' in (error as AxiosResponse)) {
    errorProperties.push('data');
  }

  const json = JSON.stringify(error, Object.getOwnPropertyNames(error));
  return JSON.parse(json);
};
