import RNFS from 'react-native-fs';
import DeviceInfo from 'react-native-device-info';

export const API_KEY = 'AIzaSyDGWxFuzfzoF-V6F5KJjdwPCh8CcYg2JnI';
export const API_KEY_2 = '5f08cf27b1msh649a463f41a0951p18d683jsnab8742b2c24e';
export const AppConfig = {
  APP_NAME: DeviceInfo.getApplicationName(),
};
export const Paths = `${RNFS.PicturesDirectoryPath}/${AppConfig.APP_NAME}`;
