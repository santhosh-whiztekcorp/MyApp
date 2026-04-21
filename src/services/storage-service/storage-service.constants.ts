import { env } from '../../constants/env';

export const ADAPTER = 'storageServiceAdapter';

export const STORAGE_KEYS = {
  // Auth
  AUTH_ACCESS_TOKEN: env.AUTH_ACCESS_TOKEN_KEY,
  AUTH_REFRESH_TOKEN: env.AUTH_REFRESH_TOKEN_KEY,

  // User
  USER_DATA: env.USER_DATA_KEY,
};
