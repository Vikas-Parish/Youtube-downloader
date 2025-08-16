import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  insertNewMedia,
  MetaDataProps,
  updateDbStatus,
} from '../../database/dao/YouTubeDownloads';

export interface DownloadProps {
  downloaded: Array<MetaDataProps>;
}

const initialState: DownloadProps = {
  downloaded: [],
};

const downloadSlice = createSlice({
  name: 'Downloads',
  initialState,
  reducers: {
    reset: () => initialState,

    retriveDownloadsMedia: (
      state: DownloadProps,
      action: PayloadAction<Array<MetaDataProps>>,
    ) => {
      state.downloaded = action.payload;
    },

    downloadNewMedia: (
      state: DownloadProps,
      action: PayloadAction<MetaDataProps>,
    ) => {
      const payload = action.payload;
      state.downloaded.push(payload);
      // insertNewMedia(payload).then(id => {
      //   const mediaWithId = {...payload, id};
      //   state.downloaded.push(mediaWithId);
      // });
    },
    updateDownloadStatus: (
      state: DownloadProps,
      action: PayloadAction<MetaDataProps>,
    ) => {
      const media = state.downloaded.find(
        video => video.id === action.payload.id,
      );
      if (media) {
        // console.log('[Redux] Updating media:');
        // console.log('Before:', {...media});
        Object.assign(media, action.payload);
        // console.log('After:', media.speedInBytePerMs);
      } else {
        console.log(
          `[Redux] No media found with id: ${action.payload.id}=> ${action.payload.downloadedBytes}`,
        );
      }
      // state.downloaded = state.downloaded.map(videos =>
      //   videos.id === action.payload.id
      //     ? {...videos, ...action.payload}
      //     : videos,
      // );
    },
  },
});

export const {
  reset,
  updateDownloadStatus,
  retriveDownloadsMedia,
  downloadNewMedia,
} = downloadSlice.actions;

export default downloadSlice.reducer;
