import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-eva-icons';
import {Dimens} from '../../../constants/Dimens';

type SearchViewProps = {
  result: string[];
  onSelect: (item: string) => void;
};

const SearchView = ({result, onSelect}: SearchViewProps) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {result.map((item, index) => (
        <View key={index}>
          <TouchableOpacity
            onPress={() => onSelect(item)}
            style={styles.itemBtn}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="search" fill={'black'} height={24} width={24} />
              <Text style={{fontSize: 18, marginHorizontal: 10}}>{item}</Text>
            </View>
            <Icon
              name="diagonal-arrow-left-up-outline"
              fill={'black'}
              height={24}
              width={24}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  itemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Dimens.alignment,
    paddingVertical: 18,
    justifyContent: 'space-between',
  },
});

export default React.memo(SearchView);
