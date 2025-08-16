export type YouTubeSearchResponse = {
  kind: string;
  etag: string;
  regionCode: string;
  nextPageToken: string;
  pageInfo: PageInfo;
  videosItem: YouTubeSearchResult[];
};

export type PageInfo = {
  resultsPerPage: number;
  totalResults: number;
};
export type YouTubeSearchResult = {
  kind: string;
  etag: string;
  id: VideoId;
  snippet: VideoSnippet;
};

export type VideoId = {
  kind: string;
  videoId: string;
  channelId?: string;
  playlistId?: string;
};

export type VideoSnippet = {
  publishedAt?: string;
  channelId?: string;
  title?: string;
  description?: string;
  thumbnails?: VideoThumbnails;
  channelTitle?: string;
  liveBroadcastContent?: string;
  publishTime?: string;
};

export type VideoThumbnails = {
  default?: ThumbnailProps;
  medium?: ThumbnailProps;
  high?: ThumbnailProps;
  standard?: ThumbnailProps;
  maxres?: ThumbnailProps;
};

export type ThumbnailProps = {
  url: string;
  width?: number;
  height?: number;
};

export type MediaType = 'audio' | 'video';

export enum DownloadStatus {
  STARTED = 'STARTED',
  PROGRESS = 'PROGRESS',
  SUCCESS = 'SUCCESS',
  PAUSED = 'PAUSED',
  FAILED = 'FAILED',
  QUEUED = 'QUEUED',
}

export enum UserAction {
  PAUSE = 'PAUSE',
  RESUME = 'RESUME',
  CANCEL = 'CANCEL',
  RETRY = 'RETRY',
  START = 'START',
  DEFAULT = 'DEFAULT',
}

export type DownloadRequestProps = {
  videoId?: string;
  mediaType?: MediaType;
  title?: string | undefined;
  url?: string;
  thumbnailUrl?: ThumbnailProps;
  filesize?: string;
  quality?: string;
  hasVideo?: boolean;
  container?: string;
};
