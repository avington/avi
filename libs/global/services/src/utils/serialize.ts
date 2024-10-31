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

export const serializeToString = (obj: unknown): string => {
  try {
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === 'function') {
        return value.toString();
      }
      return value;
    });
  } catch (error) {
    console.error('Error serializing object:', error);
    return '';
  }
};

export const deserializeFromString = <T>(str: string): T | undefined => {
  try {
    return JSON.parse(str, (key, value) => {
      if (typeof value === 'string' && value.startsWith('function')) {
        return new Function(`return ${value}`)();
      }
      return value;
    }) as T;
  } catch (error) {
    console.error('Error deserializing string:', error);
    return undefined;
  }
};
