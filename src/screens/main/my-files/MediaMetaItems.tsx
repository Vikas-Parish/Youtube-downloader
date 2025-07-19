import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {Icon} from 'react-native-eva-icons';
import {Colors} from '../../../constants/Colors';
import {ProgressBar} from 'react-native-paper';
import {useAppSelector} from '../../../redux/Store';
import MediaDetailModal from '../../../modals/MediaDetailModal';
import {MetaDataProps} from '../../../database/dao/YouTubeDownloads';
import Thumbnail from '../../../components/media-thumbnail';

const MediaMetaItems = ({
  mediaData,
  selectedItems = [],
}: {
  mediaData: MetaDataProps;
  selectedItems?: MetaDataProps[];
}) => {
  const [visible, setVisible] = useState(false);
  const isSelected = selectedItems.some(item => item.id === mediaData.id);
  const mediaDownload = useAppSelector(state => state.download.downloaded);
  // const progress = useAppSelector(state => {
  //   const item = state.download.downloaded.find(i => i.id === mediaData.id);
  //   return item?.progress || 0;
  // });

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
                mediaData.status === 'completed' &&
                setVisible(true);
            }}>
            <Text>{}</Text>
            {/* <Icon
              name={
                isSelected
                  ? 'checkmark-square-2'
                  : selectedItems.length === 0
                  ? mediaData.status === 'completed'
                    ? 'more-vertical-outline'
                    : 'download'
                  : 'square'
              }
              width={22}
              height={22}
              fill={isSelected ? Colors.primary : Colors.A9A9A9}
            /> */}
          </TouchableOpacity>
        </View>

        {mediaData.status !== 'completed' && (
          <ProgressBar
            color="#007bff"
            progress={100}
            style={styles.progressBar}
          />
        )}

        <Text style={styles.channel}>{mediaData.filesize}</Text>
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
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
    alignItems: 'center',
  },
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
  channel: {
    fontSize: 12,
    color: '#555',
    marginTop: 3,
  },
});
