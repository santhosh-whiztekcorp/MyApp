import DeviceInfo from 'react-native-device-info';
import { StaticDeviceInfo } from './device-info-service.types';

let staticPromise: Promise<StaticDeviceInfo> | null = null;

export const loadStaticInfo = (): Promise<StaticDeviceInfo> => {
  if (!staticPromise) {
    staticPromise = (async () => ({
      deviceId: await DeviceInfo.getUniqueId(),
      deviceBrand: DeviceInfo.getBrand(),
      deviceModel: DeviceInfo.getModel(),
      deviceManufacturer: await DeviceInfo.getManufacturer(),
    }))();
  }
  return staticPromise;
};
