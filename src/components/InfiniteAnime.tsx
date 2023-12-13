import { useCallback, useEffect, useRef } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { router } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';

import { JikanBaseResponse } from '@/types/api.types';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';

import CardAnime, { CardAnimeProps } from './Card/CardAnime';

type Props<T> = UseInfiniteQueryResult<InfiniteData<JikanBaseResponse<T[]>>>;

function InfiniteAnime<T extends CardAnimeProps['anime']>({
  data,
  isLoading,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
}: Props<T>) {
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<T>>(null);

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
    (params: { item: T }) => (
      <CardAnime
        anime={params.item}
        sx={{ container: { width: width / 2 - 24, marginBottom: 16 } }}
        onPress={() =>
          router.push({
            pathname: '/anime/[id]',
            params: {
              id: params.item.mal_id as number,
            },
          })
        }
      />
    ),
    [width]
  );

  const renderEmptyList = () =>
    !isLoading && (
      <View
        style={{
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>No Data</Text>
      </View>
    );

  return (
    <FlatList
      ref={listRef}
      data={data?.pages.reduce<T[]>((acc, page) => {
        page?.data?.forEach((item) => {
          acc.push(item);
        });

        return acc;
      }, [])}
      keyExtractor={(item) => item.mal_id?.toString() || ''}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      ListFooterComponent={renderFooter}
      onEndReachedThreshold={0.2}
      onEndReached={fetchNextPageHandler}
      ListEmptyComponent={renderEmptyList}
    />
  );
}

export default InfiniteAnime;
