export const isYoutubeVideo = (url: string) => {
  const isYtVideoLink =
    /^https?:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.*?[&?]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;

  const isYtShortsLink =
    /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})(?:\?.*)?$/;

  let videoId = '';
  const videoMatch = url.match(isYtVideoLink);

  if (videoMatch) {
    videoId = videoMatch[1];
  } else {
    const shortsMatch = url.match(isYtShortsLink);
    if (shortsMatch) {
      videoId = shortsMatch[1];
    }
  }
  return videoId.length === 11;
};

export const getYtVideoId = (url: string): string => {
  const ytMatch = url.match(
    /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.*?[&?]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );

  const shortsMatch = url.match(
    /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})(?:\?.*)?$/,
  );

  if (ytMatch) {
    return ytMatch[1];
  } else if (shortsMatch) {
    return shortsMatch[1];
  }

  return '';
};

export const mediaName = (name: string = '') => {
  return name
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')
    .replace(/\s+/g, '_')
    .replace(/\.$/, '')
    .substring(0, 50);
};
