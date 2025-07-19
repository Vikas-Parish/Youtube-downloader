import {useState, useEffect} from 'react';
import axios from 'axios';
import {isYoutubeVideo} from '../utils';

const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const [suggestionsList, setSuggestionsList] = useState<Array<String>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    fetchSuggestions();
  }, [debouncedQuery]);

  const fetchSuggestions = async () => {
    if (debouncedQuery.trim() === '' || isYoutubeVideo(debouncedQuery)) {
      setSuggestionsList([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(
          debouncedQuery,
        )}`,
      );
      if (response?.data && Array.isArray(response.data[1])) {
        setSuggestionsList(response?.data[1]);
      }
    } catch (error) {
      setError('Error fetching suggestions');
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    suggestionsList,
    loading,
    error,
  };
};

export default useSearch;
