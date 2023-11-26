import { useCallback, useEffect, useRef } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { router } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';

import { useInfiniteAnime } from '@/queries/animeQueries';
import { components } from '@/schema';

import CardAnime from './Card/CardAnime';

type Props = ReturnType<typeof useInfiniteAnime>;

function InfiniteAnime({
  data,
  isLoading,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
}: Props) {
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<components['schemas']['anime']>>(null);

  useEffect(() => {
    if (isLoading && !isFetchingNextPage) {
      listRef.current?.scrollToOffset({ offset: 0, animated: false });
    }
  }, [isLoading, isFetchingNextPage]);

  const fetchNextPageHandler = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  const renderFooter = useCallback(
    () =>
      (isLoading || hasNextPage) && (
        <View
          style={{
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {(isLoading || isFetchingNextPage) && (
            <ActivityIndicator animating size="large" />
          )}
        </View>
      ),
    [isLoading, hasNextPage, isFetchingNextPage]
  );

  const renderItem = useCallback(
    (params: { item: components['schemas']['anime'] }) => (
      <CardAnime
        anime={params.item}
        sx={{ container: { width: width / 2 - 24, marginBottom: 16 } }}
        onPress={() => router.push(`/anime/${params.item.mal_id}`)}
      />
    ),
    [width]
  );

  return (
    <FlatList
      ref={listRef}
      data={data?.pages.reduce<components['schemas']['anime'][]>(
        (acc, page) => {
          page?.data?.forEach((item) => {
            acc.push(item);
          });

          return acc;
        },
        []
      )}
      keyExtractor={(item) => item.mal_id?.toString() || ''}
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
  );
}

export default InfiniteAnime;
