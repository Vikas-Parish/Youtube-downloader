import React, {memo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {Icon} from 'react-native-eva-icons';
import {DownloadRequestProps, MediaType} from '../../types';
import {Colors} from '../../constants/Colors';
import {MetaDataProps} from '../../database/dao/YouTubeDownloads';
import {useDispatch} from 'react-redux';
import {setSelectFormate} from '../../redux/reducers/Downloads';

type FormateType = {
  item: DownloadRequestProps;
  isSelected: boolean;
  type: MediaType;
  onSelect: (item: DownloadRequestProps) => void;
};

const Formats = ({item, isSelected, type, onSelect}: FormateType) => {
  // const dispatch = useDispatch();
  // const onSelectFormate = () => {
  //   dispatch(setSelectFormate(item as MetaDataProps));
  // };

  return (
    <TouchableOpacity
      onPress={() => onSelect(item)}
      style={{
        marginVertical: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name={type === 'video' ? 'video-outline' : 'music-outline'}
          height={25}
          width={25}
          fill={isSelected ? Colors.primary : ''}
        />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 18,
            color: isSelected ? Colors.primary : '',
          }}>
          {item.quality}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 16, color: isSelected ? Colors.primary : ''}}>
          {item.filesize}
        </Text>
        <RadioButton
          uncheckedColor="gray"
          color={Colors.primary}
          value={isSelected ? 'YES' : 'NO'}
          status={isSelected ? 'checked' : 'unchecked'}
          onPress={() => onSelect(item)}
        />
      </View>
    </TouchableOpacity>
  );
};

export default memo(Formats);
