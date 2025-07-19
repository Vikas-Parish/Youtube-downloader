import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../../../components/header';
import SearchView from './SearchView';
import useSearch from '../../../hooks/useSearch';
import SearchBar from '../../../components/search-bar/SearchBar';
import {getYtVideoId, isYoutubeVideo} from '../../../utils';

const Search = ({navigation}: any) => {
  const {searchQuery, setSearchQuery, suggestionsList} = useSearch();
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchAndSelect = (query: string) => {
    if (isYoutubeVideo(query)) {
      const videoId = getYtVideoId(query);

      navigation.navigate('VideoPlayer', {id: {videoId}});
    } else {
      setSearchQuery(query);
      setIsSearching(false);
      navigation.navigate('YtVideos', {selectedResult: query});
    }
  };

  const onSearchChange = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
  };

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <SearchBar
            placeholder="Search to download"
            value={searchQuery}
            onChangeText={onSearchChange}
            onClear={() => setSearchQuery('')}
            onSearch={() => handleSearchAndSelect(searchQuery)}
          />
        }
      />
      {searchQuery && isSearching && (
        <SearchView
          result={suggestionsList}
          onSelect={item => handleSearchAndSelect(item)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Search;
