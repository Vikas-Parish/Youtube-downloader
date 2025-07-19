import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/header';
import SearchBar from '../../../components/search-bar/SearchBar';
import useSearch from '../../../hooks/useSearch';
import SearchView from '../search/SearchView';
import useRequest from '../../../hooks/useRequest';
import {YouTubeSearchResponse} from '../../../types';
import Loader from '../../../components/loader';
import VideosItems from './VideosItems';

const YtVideos = ({route}: any) => {
  const {selectedResult} = route.params;
  const {apiRequest} = useRequest();
  const {searchQuery, setSearchQuery, suggestionsList} = useSearch();
  const [isSearching, setIsSearching] = useState(false);
  const [videoResult, setVideoResult] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setSearchQuery(selectedResult);
    fetchVideos();
  }, [selectedResult]);

  const handleItemSelect = (item: string) => {
    setSearchQuery(item);
    setIsSearching(false);
    fetchVideos();
  };
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
  };

  const fetchVideos = async () => {
    setisLoading(true);
    try {
      const response = await apiRequest({
        url: `/search?part=snippet&type=video&maxResults=30&q=${encodeURIComponent(
          selectedResult,
        )}`,
      });
      if (response?.items) {
        setVideoResult(response.items);
      } else {
        setVideoResult([]);
        ToastAndroid.show('No videos found.', ToastAndroid.SHORT);
      }
    } catch (error: any) {
      if (error.response?.data?.error?.errors[0]?.reason === 'quotaExceeded') {
        Alert.alert(
          'Quota Exceeded',
          'You have exceeded your API quota for today. Please try again tomorrow.',
        );
      }
    } finally {
      setisLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        leftComponent={
          <SearchBar
            placeholder="Search to download"
            value={searchQuery}
            onChangeText={handleSearchChange}
            onClear={() => setSearchQuery('')}
          />
        }
      />
      {searchQuery && isSearching ? (
        <SearchView result={suggestionsList} onSelect={handleItemSelect} />
      ) : (
        <FlatList
          data={videoResult}
          keyExtractor={(item: any) => item.id.videoId}
          renderItem={({item}) => <VideosItems item={item} />}
          ListEmptyComponent={() => (
            <Text style={styles.noResultsText}>No results found.</Text>
          )}
        />
      )}
      <Loader show={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    width: 120,
    height: 90,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  channel: {
    fontSize: 14,
    color: '#555',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  resultItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
});

export default YtVideos;
