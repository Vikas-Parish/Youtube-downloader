import {View, FlatList, Text, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import {useAppSelector} from '../../../redux/Store';
import MediaMetaItems from './MediaMetaItems';
import MultiSelector from '../../../components/multi-selector';
import {MetaDataProps} from '../../../database/dao/YouTubeDownloads';
import {DownloadStatus} from '../../../types';

const Downloaded = () => {
  const {downloaded} = useAppSelector(state => state.download);
  const filteredDownloads = Object.values(downloaded).filter(
    (item: any) => item?.status === DownloadStatus.SUCCESS,
  );
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectionChange = (
    updatedSelectedItems: any,
    currentItem: any,
  ) => {
    setSelectedItems(updatedSelectedItems);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <MultiSelector
        data={filteredDownloads}
        selectedItems={selectedItems}
        onSelectionsChange={handleSelectionChange}
        renderItem={(item: MetaDataProps) => (
          <MediaMetaItems mediaData={item} selectedItems={selectedItems} />
        )}
      />
    </View>
  );
};

export default Downloaded;
