import {Alert} from 'react-native';
import RNFS from 'react-native-fs';
import {mediaName} from '.';
import {saveDownloadedVideos} from '../database/dao/YouTubeDownloads';

export const handleDownloads = async (
  mediaDownloadLink: string | undefined,
  mediaFormate: any,
) => {
  if (!mediaDownloadLink) return;
  try {
    // const selectedFormate = mediaFormate.find(
    //   data => data.url === mediaDownloadLink,
    // );
    if (!mediaFormate) return;
    console.log('selectedFormate', mediaFormate);
    const filePath = `${RNFS.DownloadDirectoryPath}/${mediaName(
      'new songs',
    )}.mp3`;

    const download = RNFS.downloadFile({
      fromUrl: mediaFormate?.url,
      toFile: filePath,
      progress: ({bytesWritten, contentLength}) => {
        const percentage = ((bytesWritten / contentLength) * 100).toFixed(2);
        console.log(`Downloading: ${percentage}%`);
      },
      progressDivider: 10,
      begin: async res => {
        console.log(res);
        if (res) {
          await saveDownloadedVideos({
            ...mediaFormate,
            status: 'in_progress',
          });
        }
      },
    });
    const responce = await download.promise;
    if (responce.statusCode === 200) {
      Alert.alert('Download completed successfully!');
    } else {
      Alert.alert('Download failed.');
    }
  } catch (error) {
    console.log('Download error:', error);
  }
};
