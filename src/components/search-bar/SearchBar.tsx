import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {Dimens} from '../../constants/Dimens';
import {Icon} from 'react-native-eva-icons';
import {Colors} from '../../constants/Colors';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear: () => void;
  onSearch?: () => void;
};

const SearchBar = ({
  value,
  onChangeText,
  placeholder,
  onClear,
  onSearch,
}: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        onSubmitEditing={onSearch}
      />
      {value && (
        <TouchableOpacity onPress={onClear} style={styles.clearIconContainer}>
          <Icon
            name="close-outline"
            width={22}
            height={22}
            fill={Colors.A9A9A9}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.A9A9A9,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  searchInput: {
    paddingHorizontal: Dimens.alignment,
    height: '100%',
    marginRight: 20,
  },
  clearIconContainer: {
    position: 'absolute',
    right: Dimens.alignment,
  },
});

export default SearchBar;
