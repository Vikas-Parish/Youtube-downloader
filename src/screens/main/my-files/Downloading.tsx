import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  fetchDownloadsVideos,
  MetaDataProps,
} from '../../../database/dao/YouTubeDownloads';

import MediaMetaItems from './MediaMetaItems';
import {useAppSelector} from '../../../redux/Store';
import MultiSelector from '../../../components/multi-selector';
import {DownloadStatus, UserAction} from '../../../types';

const Downloading = () => {
  const [videos, setVideos] = useState<any>();

  const {downloaded} = useAppSelector(state => state.download);
  const activeDownloads = Object.values(downloaded).filter(
    (item: any) => item?.status !== DownloadStatus.SUCCESS,
  );
  // console.log('downloaded useAppSelector ', downloaded);
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
        data={activeDownloads}
        selectedItems={selectedItems}
        onSelectionsChange={handleSelectionChange}
        renderItem={(item: MetaDataProps) => (
          <MediaMetaItems mediaData={item} selectedItems={selectedItems} />
        )}
      />
    </View>
  );
};

export default Downloading;
