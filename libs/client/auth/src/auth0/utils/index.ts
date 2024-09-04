import { GetTokenSilentlyOptions } from '@auth0/auth0-react';
import { GetTokenSilentlyVerboseResponse, GetTokenWithPopupOptions, PopupConfigOptions } from '@auth0/auth0-spa-js';

export const getAuthToken = async (
  getAccessTokenSilently: {
    (
      options: GetTokenSilentlyOptions & {
        detailedResponse: true;
      }
    ): Promise<GetTokenSilentlyVerboseResponse>;
    (options?: GetTokenSilentlyOptions): Promise<string>;
    (options: GetTokenSilentlyOptions): Promise<GetTokenSilentlyVerboseResponse | string>;
  },
  getAccessTokenWithPopup: (
    options?: GetTokenWithPopupOptions,
    config?: PopupConfigOptions
  ) => Promise<string | undefined>
) => {
  try {
    const token = await getAccessTokenSilently({ detailedResponse: true });
    console.log('token', token);
    return token;
  } catch (error) {
    console.error(error);

    const token = await getAccessTokenWithPopup();
    return token;
  }
};
