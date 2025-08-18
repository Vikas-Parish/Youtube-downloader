import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {Icon} from 'react-native-eva-icons';
import {Colors} from '../../../constants/Colors';
import {ProgressBar} from 'react-native-paper';
import {useAppSelector} from '../../../redux/Store';
import MediaDetailModal from '../../../modals/MediaDetailModal';
import {MetaDataProps} from '../../../database/dao/YouTubeDownloads';
import Thumbnail from '../../../components/media-thumbnail';
import {DownloadStatus} from '../../../types';
import useDownload from '../../../hooks/useDownloads';

const MediaMetaItems = ({
  mediaData,
  selectedItems = [],
}: {
  mediaData: MetaDataProps;
  selectedItems?: MetaDataProps[];
}) => {
  const [visible, setVisible] = useState(false);
  const {downloadMedia, pauseDownload, resumeDownload} = useDownload();

  const isSelected = selectedItems.some(item => item.id === mediaData.id);

  const item = useAppSelector(state =>
    state.download.downloaded.find(i => i.id === mediaData.id),
  );

  const progress =
    item && item.totalBytes ? item.downloadedBytes / item.totalBytes : 0;

  const speed =
    item && item.speedInBytePerMs
      ? (item.speedInBytePerMs * 1000) / (1024 * 1024)
      : 0;

  const handleDownloadPress = () => {
    // If already downloading, pause/resume
    if (mediaData.status === DownloadStatus.PROGRESS) {
      pauseDownload();
    } else {
      downloadMedia(mediaData.videoDetails); // pass the download info
    }
  };

  return (
    <>
      {mediaData.videoDetails.hasVideo ? (
        <Image
          source={{uri: mediaData?.videoDetails.thumbnailUrl?.url}}
          style={styles.thumbnails}
        />
      ) : (
        <Thumbnail uri={mediaData?.videoDetails.thumbnailUrl?.url || ''} />
      )}

      <View style={styles.textContainer}>
        <View style={styles.row}>
          <Text style={styles.title} numberOfLines={2}>
            {mediaData?.videoDetails.title}
          </Text>
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={() => {
              selectedItems.length === 0 &&
                mediaData.status === DownloadStatus.SUCCESS &&
                setVisible(true);
            }}>
            <Icon
              name={
                isSelected
                  ? 'checkmark-square-2'
                  : selectedItems.length === 0
                  ? mediaData.status === DownloadStatus.PROGRESS
                    ? 'pause-circle-outline'
                    : mediaData.status === DownloadStatus.SUCCESS
                    ? 'more-vertical-outline'
                    : 'download'
                  : 'square'
              }
              width={22}
              height={22}
              fill={isSelected ? Colors.primary : Colors.A9A9A9}
            />
          </TouchableOpacity>

          {/* New Download/Pause/Resume Button */}
          <TouchableOpacity
            onPress={handleDownloadPress}
            style={{marginLeft: 10}}>
            <Text style={{color: Colors.primary}}>
              {mediaData.status === DownloadStatus.PROGRESS
                ? 'Pause'
                : 'Download'}
            </Text>
          </TouchableOpacity>
        </View>

        {mediaData.status !== DownloadStatus.SUCCESS && (
          <>
            <ProgressBar
              color="#007bff"
              progress={progress}
              style={styles.progressBar}
            />
            <View style={styles.statusRow}>
              <Text style={styles.speed}>{speed.toFixed(1)}MB/s</Text>
              <Text style={styles.percent}>{(progress * 100).toFixed(1)}%</Text>
            </View>
          </>
        )}
      </View>

      <MediaDetailModal
        visible={visible}
        data={mediaData}
        hide={() => setVisible(false)}
      />
    </>
  );
};

export default React.memo(MediaMetaItems);

const styles = StyleSheet.create({
  thumbnails: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 5,
    margin: 5,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  downloadButton: {
    paddingHorizontal: 5,
  },
  progressBar: {
    height: 3,
    backgroundColor: '#E0E0E0',
    marginVertical: 5,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  speed: {
    fontSize: 12,
    color: '#007bff',
  },
  percent: {
    fontSize: 12,
    color: '#555',
  },
});
