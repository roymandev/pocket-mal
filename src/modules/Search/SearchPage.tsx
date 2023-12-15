import { useEffect, useState } from 'react';

import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import InfiniteAnime from '@/components/InfiniteAnime';
import Form from '@/modules/Search/Form';
import { useInfiniteAnime } from '@/modules/Search/query';
import { AnimeSearchParams } from '@/types/api.types';

function SearchPage() {
  const { query } = useLocalSearchParams<{ query?: string }>();

  const [params, setParams] = useState<AnimeSearchParams>({});

  useEffect(() => {
    if (query) setParams(JSON.parse(query));
  }, [query]);

  const searchQuery = useInfiniteAnime({
    ...params,
  });

  return (
    <SafeAreaView
      style={{ flex: 1, gap: 16, marginHorizontal: 16, marginTop: 16 }}
    >
      <Form onSubmit={setParams} />

      <InfiniteAnime {...searchQuery} />
    </SafeAreaView>
  );
}

export default SearchPage;
