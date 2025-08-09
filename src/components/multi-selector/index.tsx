import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Image,
  Text,
} from 'react-native';
import {
  deleteVideos,
  fetchDownloadsVideos,
  MetaDataProps,
} from '../../database/dao/YouTubeDownloads';
import {Colors} from '../../constants/Colors';
import {useDispatch} from 'react-redux';
import {retriveDownloadsMedia} from '../../redux/reducers/Downloads';

interface SelectMultipleProps {
  data: MetaDataProps[] | any;
  selectedItems?: MetaDataProps[];
  maxSelect?: number | null;
  onPress?: () => void;
  style?: ViewStyle;
  onSelectionsChange: (
    selectedItems: MetaDataProps[],
    currentItem: MetaDataProps | null,
  ) => void;
  renderItem?: any;
  selectedColor?: string;
}

const SelectMultiple: React.FC<SelectMultipleProps> = ({
  data,
  selectedItems = [],
  maxSelect = null,
  onSelectionsChange,
  onPress,
  renderItem,
  style,
  selectedColor = '#f0f0f0',
}) => {
  const [dataSource, setDataSource] = useState<MetaDataProps[]>([]);
  const [isMultiSelectMode, setMultiSelectMode] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setDataSource(data);
  }, [data]);

  const handleRowPress = useCallback(
    (item: MetaDataProps) => {
      let updatedSelectedItems = [...selectedItems];
      const index = updatedSelectedItems.findIndex(
        selected => selected.id === item.id,
      );

      if (index > -1) {
        updatedSelectedItems.splice(index, 1);
      } else if (
        maxSelect === null ||
        updatedSelectedItems.length < maxSelect
      ) {
        updatedSelectedItems.push(item);
      }

      if (updatedSelectedItems.length === 0) {
        setMultiSelectMode(false);
      }

      onSelectionsChange(updatedSelectedItems, item);
    },
    [selectedItems, maxSelect, onSelectionsChange],
  );

  const handleLongPress = useCallback(
    (item: MetaDataProps) => {
      setMultiSelectMode(true);
      handleRowPress(item);
    },
    [handleRowPress],
  );

  const handleSelectAll = () => {
    if (selectedItems.length === dataSource.length) {
      setMultiSelectMode(false);
      onSelectionsChange([], null);
    } else {
      setMultiSelectMode(true);
      onSelectionsChange([...dataSource], null);
    }
  };
  const onDelete = async () => {
    if (selectedItems.length === 0) return;
    try {
      const idsToDelete = selectedItems.map(item => item.id);
      await deleteVideos(idsToDelete as Array<string>);
      const filteredData = dataSource.filter(
        item => !idsToDelete.includes(item.id),
      );
      setDataSource(filteredData);
      dispatch(retriveDownloadsMedia(filteredData));
      setMultiSelectMode(false);
      onSelectionsChange([], null);
    } catch (error) {
      console.log('Error to bulk delete ', error);
    }
  };

  const renderMediaItem = useCallback(
    ({item}: {item: MetaDataProps}) => {
      const isSelected = selectedItems.some(
        selected => selected.id === item.id,
      );

      return (
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.container, {...style}]}
          onPress={() => (isMultiSelectMode ? handleRowPress(item) : onPress)}
          onLongPress={() => handleLongPress(item)}>
          <View
            style={[
              styles.selectedRow,
              isSelected && {backgroundColor: selectedColor},
            ]}>
            {/* {isSelected && (
              <Image
                source={require('../../assets/icons/selected.png')}
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 30,
                  marginLeft: 5,
                  tintColor: Colors.primary,
                }}
              />
            )} */}
            {renderItem(item)}
          </View>
        </TouchableOpacity>
      );
    },
    [handleRowPress, handleLongPress, selectedItems],
  );

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataSource}
        style={{paddingBottom: 70}}
        renderItem={renderMediaItem}
        keyExtractor={item => item.id || Math.random().toString()}
      />
      {isMultiSelectMode && (
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0,
            marginHorizontal: 10,
          }}>
          <TouchableOpacity
            onPress={handleSelectAll}
            activeOpacity={1}
            style={[
              styles.footerbutton,
              {borderRightWidth: 2, borderRightColor: 'white'},
            ]}>
            <Text style={{color: '#fff'}}>
              {selectedItems.length === dataSource.length
                ? 'UNSELECT ALL'
                : 'SELECT ALL'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onDelete}
            activeOpacity={1}
            style={styles.footerbutton}>
            <Text style={{color: '#fff'}}>
              DELETE {selectedItems.length === 0 ? null : selectedItems.length}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default React.memo(SelectMultiple);

const styles = StyleSheet.create({
  selectedRow: {
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 5,
    alignItems: 'center',
  },
  footerbutton: {
    flex: 1,
    backgroundColor: Colors.primary,
    // marginBottom: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
});
