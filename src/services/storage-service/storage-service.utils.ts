import * as Keychain from 'react-native-keychain';
import { ADAPTER } from './storage-service.constants';

export const storageServiceAdapter = {
  async setItem(key: string, value: string) {
    try {
      await Keychain.setGenericPassword(key, value, {
        service: key,
      });
      return true;
    } catch (error) {
      console.error(`${ADAPTER}.setItem error:`, error);
      return false;
    }
  },

  async getItem(key: string): Promise<string | null> {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: key,
      });

      if (!credentials) return null;
      return credentials.password;
    } catch (error) {
      console.error(`${ADAPTER}.getItem error:`, error);
      return null;
    }
  },

  async removeItem(key: string) {
    try {
      await Keychain.resetGenericPassword({
        service: key,
      });
      return true;
    } catch (error) {
      console.error(`${ADAPTER}.removeItem error:`, error);
      return false;
    }
  },
};
