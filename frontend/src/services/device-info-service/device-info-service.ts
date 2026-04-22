import DeviceInfo from 'react-native-device-info';
import { loadStaticInfo } from './device-info-service.utils';

export const deviceInfoService = {
  // async
  getDeviceId: async () => (await loadStaticInfo()).deviceId,
  getDeviceBrand: async () => (await loadStaticInfo()).deviceBrand,
  getDeviceModel: async () => (await loadStaticInfo()).deviceModel,
  getManufacturer: async () => (await loadStaticInfo()).deviceManufacturer,

  // sync
  getDeviceType: () => DeviceInfo.getDeviceType(),
  getSystemVersion: () => DeviceInfo.getSystemVersion(),
  getBuildNumber: () => DeviceInfo.getBuildNumber(),
};
