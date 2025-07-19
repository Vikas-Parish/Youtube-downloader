import {useRef, useState} from 'react';
import {Alert} from 'react-native';
import RNFS from 'react-native-fs';
import {mediaName} from '../utils';
import {useDispatch} from 'react-redux';
import {
  downloadNewMedia,
  updateDownloadStatus,
} from '../redux/reducers/Downloads';
import {Paths} from '../constants/Constants';
import {DownloadRequestProps, DownloadStatus, UserAction} from '../types';

const useDownload = () => {
  const dispatch = useDispatch();

  const progressRef = useRef(0);

  const downloadMedia = async (downloadRequest: DownloadRequestProps) => {
    try {
      dispatch(
        downloadNewMedia({
          status: DownloadStatus.STARTED,
          downloadedBytes: 2212,
          path: Paths,
          speedInBytePerMs: 290,
          userAction: UserAction.START,
          videoDetails: downloadRequest,
        }),
      );
      // if (!mediaFormate) return;
      // const filePath = `${Paths}/${mediaName(mediaFormate.title)}.${
      //   mediaFormate.container
      // }`;
      // if (!(await RNFS.exists(Paths))) {
      //   RNFS.mkdir(Paths);
      // }
      // const options = RNFS.downloadFile({
      //   fromUrl: mediaFormate?.url,
      //   toFile: filePath,
      //   progress: result => {
      //     const value = Math.floor(
      //       (100 * result.bytesWritten) / result.contentLength,
      //     );
      //     if (value !== progressRef.current) {
      //       progressRef.current = value;
      //       dispatch(
      //         updateDownloadStatus({
      //           ...mediaFormate,
      //           progress: value,
      //           status: value === 100 ? 'completed' : 'in_progress',
      //         }),
      //       );
      //     }
      //   },
      //   begin: res => {
      //     dispatch(
      //       downloadNewMedia({
      //         status: DownloadStatus.STARTED,
      //         downloadedBytes: 2212,
      //         path: Paths,
      //         speedInBytePerMs: 290,
      //         userAction: 'Resume',
      //         videoDetails: {...mediaFormate},
      //       }),
      //     );
      //   },
      //   progressDivider: 1,
      // });
      // const response = await options.promise;
      // if (response.statusCode === 200) {
      //   dispatch(
      //     downloadNewMedia({
      //       ...mediaFormate,
      //       status: 'completed',
      //       progress: 100,
      //     }),
      //   );
      //   Alert.alert('Download completed successfully!');
      // } else {
      //   dispatch(
      //     updateDownloadStatus({
      //       id: mediaFormate.id,
      //       status: 'failed',
      //       progress: 0,
      //     }),
      //   );
      //   Alert.alert('Download failed.');
      // }
    } catch (error) {
      console.log('Download error:', error);
      // dispatch(
      //   updateDownloadStatus({
      //     id: mediaFormate.id,
      //     status: 'failed',
      //     progress: 0,
      //   }),
      // );
    }
  };

  return {downloadMedia};
};

export default useDownload;
