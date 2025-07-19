import RNFS from 'react-native-fs';

export const getAppDirectory = async (subfolder?: string): Promise<string> => {
  if (!(await RNFS.exists(path))) {
    RNFS.mkdir(path);
  }
  return path;
};
