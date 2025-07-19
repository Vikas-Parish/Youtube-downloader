import {Q} from '@nozbe/watermelondb';
import {Tables} from '../DbConstant';
import {database} from '..';
import {DownloadRequestProps, DownloadStatus, UserAction} from '../../types';

export type MetaDataProps = {
  id?: string;
  status: DownloadStatus;
  path: string;
  userAction: UserAction;
  speedInBytePerMs: number;
  downloadedBytes: number;
  videoDetails: DownloadRequestProps;
};

export const insertNewMedia = async (mediaData: MetaDataProps) => {
  await database.write(async () => {
    await database.get(Tables.downloadedVideos).create((videoModel: any) => {
      videoModel.status = mediaData.status;
      videoModel.path = mediaData.path;
      videoModel.userAction = mediaData.userAction;
      videoModel.speedInBytePerMs = mediaData.speedInBytePerMs.toString();
      videoModel.downloadedBytes = mediaData.downloadedBytes;
      videoModel.videoDetails = JSON.stringify(mediaData.videoDetails);
    });
  });
};

export const updateDownloadStatus = async (
  id: string,
  video: MetaDataProps,
) => {
  await database.write(async () => {
    const videoRecord = await database.get(Tables.downloadedVideos).find(id);

    const videoData = JSON.parse(videoRecord.video);

    const updatedData = {
      ...videoData,
      ...video,
    };

    await videoRecord.update(record => {
      record.video = JSON.stringify(updatedData);
    });
  });
};

export const fetchDownloadsVideos = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await database.write(async () => {
        const medias = (
          await database.get(Tables.downloadedVideos).query().fetch()
        ).reverse();
        const dataSet: Array<MetaDataProps> = [];
        medias.forEach((item, index) => {
          const data: any = item?._raw;
          console.log('dataSet', data);
          dataSet.push({
            id: item?.id,
            path: data?.path,
            downloadedBytes: data?.downloaded_bytes,
            speedInBytePerMs: data?.speed_in_byte_per_ms,
            status: data?.status,
            userAction: data?.user_action,
            videoDetails: data?.video_details
              ? JSON.parse(data?.video_details)
              : '',
          });
        });

        resolve(dataSet);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteVideos = async (ids: string | string[]) => {
  try {
    await database.write(async () => {
      if (Array.isArray(ids)) {
        // Bulk delete
        const videos = await database
          .get(Tables.downloadedVideos)
          .query(Q.where('id', Q.oneOf(ids)))
          .fetch();

        for (const video of videos) {
          await video.destroyPermanently();
        }
      } else {
        // Single delete
        const video = await database.get(Tables.downloadedVideos).find(ids);
        await video.destroyPermanently();
      }
    });
  } catch (error) {
    console.log('Error on delete reports', error);
  }
};
