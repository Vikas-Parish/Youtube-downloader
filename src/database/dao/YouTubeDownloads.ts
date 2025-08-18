import {Q} from '@nozbe/watermelondb';
import {Tables} from '../DbConstant';
import {database} from '..';
import {DownloadRequestProps, DownloadStatus, UserAction} from '../../types';

export type MetaDataProps = {
  id?: string;
  status: DownloadStatus;
  path: string;
  userAction: UserAction;
  totalBytes: number;
  speedInBytePerMs: number;
  downloadedBytes: number;
  jobId?: number | null;
  videoDetails: DownloadRequestProps;
};

export const insertNewMedia = async (mediaData: MetaDataProps) => {
  let createdRecord: any = null;
  await database.write(async () => {
    createdRecord = await database
      .get(Tables.downloadedVideos)
      .create((videoModel: any) => {
        videoModel.status = mediaData.status;
        videoModel.path = mediaData.path;
        videoModel.totalBytes = mediaData.totalBytes;
        videoModel.userAction = mediaData.userAction;
        videoModel.speedInBytePerMs = mediaData.speedInBytePerMs.toString();
        videoModel.downloadedBytes = mediaData.downloadedBytes;
        videoModel.jobId = mediaData.jobId;
        videoModel.videoDetails = JSON.stringify(mediaData.videoDetails);
      });
  });
  return createdRecord.id;
};

export const updateDbStatus = async (id: string, video: MetaDataProps) => {
  await database.write(async () => {
    const videoRecord = await database.get(Tables.downloadedVideos).find(id);

    await videoRecord.update((record: any) => {
      record.status = video.status;
      record.path = video.path;
      record.totalBytes = video.totalBytes;
      record.userAction = video.userAction;
      record.speedInBytePerMs = video.speedInBytePerMs.toString();
      record.downloadedBytes = video.downloadedBytes;
      record.jobId = video.jobId;
      record.videoDetails = JSON.stringify(video.videoDetails);
    });

    // console.log('updateDownloadStatus: updated record', id, video.status);
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
          dataSet.push({
            id: item?.id,
            path: data?.path,
            totalBytes: data?.totalBytes,
            downloadedBytes: data?.downloaded_bytes,
            speedInBytePerMs: data?.speed_in_byte_per_ms,
            status: data?.status,
            jobId: data?.jobId,
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
