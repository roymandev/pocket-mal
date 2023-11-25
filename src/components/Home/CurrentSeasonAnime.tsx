import { useCallback } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';

import dayjs from 'dayjs';
import { router } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';

import CardAnime from '@/components/Card/CardAnime';
import { useSeasonalAnime } from '@/queries/animeQueries';
import { BaseAnimeObject } from '@/types/anime';
import { capitalize } from '@/utils/formatter';
import { getSeason } from '@/utils/getter';

function CurrentSeasonAnime() {
  const currentDate = dayjs();

  const { data, isLoading } = useSeasonalAnime(
    { year: currentDate.year(), season: getSeason(currentDate) },
    { limit: 8, fields: ['start_date'] }
  );

  const filteredAnime = data?.data.filter((item) =>
    dayjs(item.node.start_date).isAfter(currentDate.subtract(1, 'year'))
  );

  const renderItem = useCallback(
    (params: { item: { node: BaseAnimeObject } }) => (
      <CardAnime anime={params.item.node} sx={{ container: { width: 150 } }} />
    ),
    []
  );

  return (
    <View style={{ gap: 8 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text variant="titleMedium">
          {capitalize(getSeason(currentDate))} {currentDate.year()} Anime
        </Text>
        <Button onPress={() => router.push('/search')}>View All</Button>
      </View>

      {isLoading && (
        <ActivityIndicator animating size="large" style={{ height: 240 }} />
      )}

      <FlatList
        data={filteredAnime}
        keyExtractor={(item) => item.node.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{
          gap: 16,
        }}
        horizontal
      />
    </View>
  );
}

export default CurrentSeasonAnime;