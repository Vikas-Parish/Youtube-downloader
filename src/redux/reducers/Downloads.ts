import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  insertNewMedia,
  MetaDataProps,
} from '../../database/dao/YouTubeDownloads';

export type DownloadStatus = 'in_progress' | 'paused' | 'completed' | 'failed';

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

    setSelectFormate: (
      state: DownloadProps,
      action: PayloadAction<MetaDataProps>,
    ) => {
      state.downloaded = [action.payload];
    },

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
      console.log('payload', payload);
      state.downloaded.push(payload);
      insertNewMedia(payload);
    },

    updateDownloadStatus: (
      state: DownloadProps,
      action: PayloadAction<MetaDataProps>,
    ) => {
      const {id, videoId, progress, status} = action.payload;
      const index = state.downloaded.findIndex(
        item => item.id === id || item.videoId === videoId,
      );

      if (index >= 0) {
        state.downloaded[index] = {
          ...state.downloaded[index],
          progress: progress ?? state.downloaded[index].progress,
          status: status ?? state.downloaded[index].status,
        };
        // console.log('Updated download status:', state.downloaded[index]);
      } else {
        console.warn('Download item not found:', id || videoId);
      }
    },
  },
});

export const {
  reset,
  setSelectFormate,
  updateDownloadStatus,
  retriveDownloadsMedia,
  downloadNewMedia,
} = downloadSlice.actions;

export default downloadSlice.reducer;
  