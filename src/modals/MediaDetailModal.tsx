import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BottomSheet from '../components/bottom-sheet';
import {
  deleteVideos,
  fetchDownloadsVideos,
  MetaDataProps,
} from '../database/dao/YouTubeDownloads';
import {Icon} from 'react-native-eva-icons';
import {Colors} from '../constants/Colors';
import {useDispatch} from 'react-redux';
import {PlayScreen} from '../redux/reducers/Downloads';
type DetailModalProp = {
  visible: boolean;
  hide?: () => void;
  data: MetaDataProps;
};
export default function MediaDetailModal({
  visible,
  data,
  hide,
}: DetailModalProp) {
  const dispatch = useDispatch();
  const onDelete = async (id: string) => {
    if (!id) return;
    try {
      await deleteVideos(id);
      hide?.();
      const data = await fetchDownloadsVideos();
      dispatch(PlayScreen(data as MetaDataProps));
    } catch (error) {
      console.log('error on delete the media ', error);
    }
  };

  return (
    <BottomSheet visible={visible} hide={hide}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: data?.thumbnailUrl?.url}}
          style={styles.thumbnails}
        />

        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {data?.title}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: Colors.A9A9A9,
          marginVertical: 20,
        }}
      />
      <TouchableOpacity
        onPress={() => onDelete(data.id as string)}
        activeOpacity={0.6}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon name={'trash-2-outline'} height={20} width={20} />
        <Text style={{marginHorizontal: 10, fontWeight: '600'}}>
          Delete file
        </Text>
      </TouchableOpacity>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  thumbnails: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  row: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    // flex: 1,
    // color: 'red',
  },
});
