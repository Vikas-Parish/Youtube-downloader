import {useRef, useState} from 'react';
import {Alert} from 'react-native';
import RNFS, {stat} from 'react-native-fs';
import {mediaName} from '../utils';
import {useDispatch} from 'react-redux';
import {
  downloadNewMedia,
  updateDownloadStatus,
} from '../redux/reducers/Downloads';
import {Paths} from '../constants/Constants';
import {DownloadRequestProps, DownloadStatus, UserAction} from '../types';
import {
  insertNewMedia,
  MetaDataProps,
  updateDbStatus,
} from '../database/dao/YouTubeDownloads';

const useDownload = () => {
  const dispatch = useDispatch();
  const jobIdRef = useRef<any>(null);
  const progressRef = useRef(0);
  const pausedBytesRef = useRef(0);

  const downloadMedia = async (
    downloadRequest: DownloadRequestProps,
    resume = false,
  ) => {
    try {
      if (!downloadRequest || !downloadRequest?.url)
        return new Error('Download URL is missing');

      const filePath = `${Paths}/${mediaName(downloadRequest.title)}.${
        downloadRequest.container
      }`;
      if (!(await RNFS.exists(Paths))) {
        RNFS.mkdir(Paths);
      }

      const mediaMeta: MetaDataProps = {
        status: DownloadStatus.QUEUED,
        path: filePath,
        userAction: UserAction.DEFAULT,
        speedInBytePerMs: 0,
        downloadedBytes: 0,
        totalBytes: 0,
        videoDetails: downloadRequest,
      };

      const startTime = Date.now();
      // If resuming, set Range header
      const headers: any =
        resume && pausedBytesRef.current > 0
          ? {Range: `bytes=${pausedBytesRef.current}-`}
          : {};
      const options = RNFS.downloadFile({
        fromUrl: downloadRequest?.url,
        toFile: filePath,
        headers,
        progress: async result => {
          const value = Math.floor(
            (100 * result.bytesWritten) / result.contentLength,
          );
          if (value !== progressRef.current) {
            progressRef.current = value;
            const elapsed = Date.now() - startTime;
            const speed = result.bytesWritten / elapsed;

            if (mediaMeta.id) {
              dispatch(
                updateDownloadStatus({
                  ...mediaMeta,
                  id: mediaMeta.id,
                  totalBytes: result.contentLength,
                  downloadedBytes: result.bytesWritten,
                  speedInBytePerMs: speed,
                  status: DownloadStatus.PROGRESS,
                }),
              );
            }
          }
        },
        begin: async () => {
          if (!resume) {
            const id = await insertNewMedia({
              ...mediaMeta,
              status: DownloadStatus.STARTED,
            });
            mediaMeta.id = id;
            dispatch(downloadNewMedia(mediaMeta));
          }
        },
        progressDivider: 1,
      });
      jobIdRef.current = options.jobId;
      const response = await options.promise;
      if (response.statusCode === 200 || response.statusCode === 206) {
        if (mediaMeta.id) {
          await updateDbStatus(mediaMeta.id, {
            ...mediaMeta,
            status: DownloadStatus.SUCCESS,
          });

          dispatch(
            updateDownloadStatus({
              ...mediaMeta,
              id: mediaMeta.id,
              status: DownloadStatus.SUCCESS,
            }),
          );
        }
        pausedBytesRef.current = 0;
        Alert.alert('Download completed successfully!');
      } else {
        if (mediaMeta.id) {
          dispatch(
            updateDownloadStatus({
              ...mediaMeta,
              id: mediaMeta.id,
              status: DownloadStatus.FAILED,
            }),
          );
        }
        Alert.alert('Download failed.');
      }
    } catch (error: any) {
      Alert.alert('Download failed.', error);
      console.log('Download error:', error);
    }
  };

  const pauseDownload = () => {
    if (jobIdRef.current) {
      RNFS.stopDownload(jobIdRef.current);
      pausedBytesRef.current = progressRef.current;
      console.log('Download paused at bytes:', pausedBytesRef.current);
    }
  };

  return {downloadMedia, pauseDownload};
};

export default useDownload;
