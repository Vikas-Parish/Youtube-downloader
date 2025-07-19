import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {VideoSnippet, YouTubeSearchResult} from '../../../types';
import {Dimens} from '../../../constants/Dimens';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-eva-icons';
import {Colors} from '../../../constants/Colors';
import BottomSheet from '../../../components/bottom-sheet';

type VideosResultData = {
  item: YouTubeSearchResult;
};

const VideosItems = ({item}: VideosResultData) => {
  const navigation = useNavigation<any>();
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('VideoPlayer', {
          id: {videoId: item.id.videoId},
          videoData: item.snippet,
        })
      }>
      <Image
        source={{uri: item.snippet.thumbnails?.medium?.url}}
        style={styles.thumbnails}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {item.snippet.title}
        </Text>
        <View style={styles.row}>
          <Text style={styles.channel}>{item.snippet.channelTitle}</Text>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Icon name="download" width={24} height={24} fill={Colors.A9A9A9} />
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet visible={visible} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: Dimens.alignment,
    paddingBottom: 10,
  },
  thumbnails: {
    width: '40%',
    height: 80,
    marginRight: 10,
    resizeMode: 'stretch',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  channel: {
    fontSize: 14,
    color: '#555',
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default VideosItems;
