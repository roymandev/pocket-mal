import { useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import InfiniteAnime from '@/components/InfiniteAnime';
import Form from '@/modules/Search/Form';
import { useInfiniteAnime } from '@/modules/Search/query';
import { AnimeSearchParams } from '@/types/api.types';

function SearchPage() {
  const [params, setParams] = useState<AnimeSearchParams>({});

  const query = useInfiniteAnime({
    ...params,
  });

  return (
    <SafeAreaView
      style={{ flex: 1, gap: 16, marginHorizontal: 16, marginTop: 16 }}
    >
      <Form onSubmit={setParams} />

      <InfiniteAnime {...query} />
    </SafeAreaView>
  );
}

export default SearchPage;
