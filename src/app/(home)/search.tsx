import { SafeAreaView } from 'react-native-safe-area-context';

import InfiniteAnime from '@/components/InfiniteAnime';
import { useSetState } from '@/hooks/useSetState';
import Form from '@/modules/Search/Form';
import { useInfiniteAnime } from '@/modules/Search/query';
import { operations } from '@/schema';

function SearchPage() {
  const [params, setParams] = useSetState<
    NonNullable<operations['getAnimeSearch']['parameters']['query']>
  >({});

  const query = useInfiniteAnime({
    ...params,
  });

  return (
    <SafeAreaView style={{ flex: 1, gap: 16, margin: 16 }}>
      <Form onSubmit={setParams} />

      <InfiniteAnime {...query} />
    </SafeAreaView>
  );
}

export default SearchPage;
