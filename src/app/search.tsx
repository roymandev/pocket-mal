import { useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Searchbar } from 'react-native-paper';

import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import CardAnime from '@/components/Card/CardAnime';
import InfinityListLoadingIndicator from '@/components/InfinityListLoadingIndicator';
import { useInfiniteAnime } from '@/queries/animeQueries';
import { BaseAnimeObject } from '@/types/anime';
import { useDebounce } from '@uidotdev/usehooks';

function SearchPage() {
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<BaseAnimeObject>>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteAnime({
      q: debouncedSearchQuery,
    });

  useEffect(() => {
    if (isLoading && !isFetchingNextPage) {
      listRef.current?.scrollToOffset({ offset: 0, animated: false });
    }
  }, [isLoading, isFetchingNextPage]);

  const fetchNextPageHandler = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  const renderFooter = () => (
    <InfinityListLoadingIndicator
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );

  const renderItem = ({ item }: { item: BaseAnimeObject }) => (
    <CardAnime
      anime={item}
      sx={{ container: { width: width / 2 - 24, marginBottom: 16 } }}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Searchbar
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{ margin: 16 }}
      />

      <FlatList
        ref={listRef}
        data={data?.pages.reduce<BaseAnimeObject[]>((acc, page) => {
          page.data.forEach((item) => {
            acc.push(item.node);
          });

          return acc;
        }, [])}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.2}
        onEndReached={fetchNextPageHandler}
      />
    </SafeAreaView>
  );
}

export default SearchPage;
