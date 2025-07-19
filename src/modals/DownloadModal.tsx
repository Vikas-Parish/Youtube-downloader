import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../redux/Store';
import useDownload from '../hooks/useDownloads';
import axios from 'axios';
import Formats from '../components/formats';
import {fontSizes} from '../constants';
import BottomSheet from '../components/bottom-sheet';
import {Dimens} from '../constants/Dimens';
import Button from '../components/button';
import {Icon} from 'react-native-eva-icons';
import {Colors} from '../constants/Colors';
import {MetaDataProps} from '../database/dao/YouTubeDownloads';

type ModalProps = {
  visible: boolean;
  hide?: () => void;
  style?: ViewStyle;
};
const DownloadModal = ({visible, hide, style}: ModalProps) => {
  const navigation = useNavigation<any>();
  const [audio, setAudio] = useState<Array<MetaDataProps>>([]);
  const [video, setVideo] = useState<Array<MetaDataProps>>([]);
  const {downloaded} = useAppSelector(state => state.download);

  const {downloadMedia} = useDownload();

  useEffect(() => {
    if (!visible) return;
    fetchVideoFormats();
  }, [visible]);

  const fetchVideoFormats = async () => {
    try {
      const response = await axios.get('http://192.168.1.4:3000/download');
      const {audio, video} = response.data[0];
      setAudio(audio);
      setVideo(video);
    } catch (error) {
      console.error('Error fetching video formats:', error);
    }
  };

  return (
    <BottomSheet visible={visible} hide={hide}>
      <View style={[styles.modalContent, style]}>
        <Text
          numberOfLines={1}
          style={{fontSize: fontSizes.h4, fontWeight: '500'}}>
          Download video as
        </Text>
        <Text style={{marginTop: '5%'}}>Music</Text>
        {audio
          .map((item, index) => (
            <Formats
              key={index}
              type="audio"
              item={item}
              isSelected={downloaded[0]?.url === item?.url}
            />
          ))
          .slice(0, 2)}
        <Text>Video</Text>
        {video
          .map((item, index) => (
            <Formats
              key={index}
              type="video"
              item={item}
              isSelected={downloaded[0]?.url === item?.url}
            />
          ))
          .slice(0, 6)}

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate('AllFormat');
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderTopWidth: 1,
            paddingVertical: '2%',
            borderColor: Colors.A9A9A9,
            marginVertical: 10,
          }}>
          <Text>More formats</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text>All</Text>
            <Icon name={'chevron-right-outline'} height={25} width={25} />
          </View>
        </TouchableOpacity>

        <Button
          style={{paddingVertical: 15, borderRadius: 30}}
          disabled={!downloaded[0]?.url}
          title="DOWNLOAD"
          onPress={() => {
            downloadMedia(downloaded[0]);
            hide?.();
          }}
        />
      </View>
    </BottomSheet>
  );
};

export default DownloadModal;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    maxHeight: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // padding: Dimens.alignment,
  },
});
