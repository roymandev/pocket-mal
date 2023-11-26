import { useState } from 'react';
import { Searchbar } from 'react-native-paper';

import { SafeAreaView } from 'react-native-safe-area-context';

import InfiniteAnime from '@/components/InfiniteAnime';
import { useInfiniteAnime } from '@/queries/animeQueries';
import { useDebounce } from '@uidotdev/usehooks';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const query = useInfiniteAnime({
    q: debouncedSearchQuery,
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Searchbar
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{ margin: 16 }}
      />

      <InfiniteAnime {...query} />
    </SafeAreaView>
  );
}

export default SearchPage;
