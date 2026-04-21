import Config from 'react-native-config';

export const env = {
  // API
  API_BASE_URL: Config.API_BASE_URL ?? 'http://localhost:3000',

  // Auth
  AUTH_ACCESS_TOKEN_KEY: Config.AUTH_ACCESS_TOKEN_KEY ?? 'AUTH_ACCESS_TOKEN',
  AUTH_REFRESH_TOKEN_KEY: Config.AUTH_REFRESH_TOKEN_KEY ?? 'AUTH_REFRESH_TOKEN',

  // User
  USER_DATA_KEY: Config.USER_DATA_KEY ?? 'USER_DATA',
};
