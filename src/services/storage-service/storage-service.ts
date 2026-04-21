import { STORAGE_KEYS } from './storage-service.constants';
import { storageServiceAdapter } from './storage-service.utils';

export const storageService = {
  // Auth
  getAuthAccessToken: async () => await storageServiceAdapter.getItem(STORAGE_KEYS.AUTH_ACCESS_TOKEN),
  setAuthAccessToken: async (token: string) => await storageServiceAdapter.setItem(STORAGE_KEYS.AUTH_ACCESS_TOKEN, token),
  removeAuthAccessToken: async () => await storageServiceAdapter.removeItem(STORAGE_KEYS.AUTH_ACCESS_TOKEN),

  getAuthRefreshToken: async () => await storageServiceAdapter.getItem(STORAGE_KEYS.AUTH_REFRESH_TOKEN),
  setAuthRefreshToken: async (token: string) => await storageServiceAdapter.setItem(STORAGE_KEYS.AUTH_REFRESH_TOKEN, token),
  removeAuthRefreshToken: async () => await storageServiceAdapter.removeItem(STORAGE_KEYS.AUTH_REFRESH_TOKEN),

  // User
  getUserData: async <T>() => {
    const value = await storageServiceAdapter.getItem(STORAGE_KEYS.USER_DATA);

    if (!value) return null;

    try {
      return JSON.parse(value) as T;
    } catch (error) {
      console.error('storageService.getUserData parse error:', error);
      return null;
    }
  },
  setUserData: async (data: unknown) => await storageServiceAdapter.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data)),
  removeUserData: async () => await storageServiceAdapter.removeItem(STORAGE_KEYS.USER_DATA),
};
