import { View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';

import dayjs from 'dayjs';
import { router } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';

import CardAnime from '@/components/Card/CardAnime';
import { capitalize } from '@/utils/formatter';
import { getSeason } from '@/utils/getter';

import { useSeasonNow } from './query';

function CurrentSeasonAnime() {
  const currentDate = dayjs();
  const year = currentDate.year();
  const season = getSeason(currentDate);

  const { data, isLoading } = useSeasonNow();

  return (
    <View style={{ gap: 8 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
        }}
      >
        <Text variant="titleMedium">
          {capitalize(season)} {year} Anime
        </Text>
        <Button onPress={() => router.push(`/seasons/${year}/${season}`)}>
          View All
        </Button>
      </View>

      {isLoading && (
        <ActivityIndicator animating size="large" style={{ height: 240 }} />
      )}

      <FlatList
        data={data?.data}
        keyExtractor={(item) => item.mal_id?.toString() || ''}
        renderItem={({ item }) => (
          <CardAnime
            anime={item}
            sx={{ container: { width: 150 } }}
            onPress={() =>
              router.push({
                pathname: '/anime/[id]',
                params: {
                  id: item.mal_id as number,
                },
              })
            }
          />
        )}
        contentContainerStyle={{
          gap: 16,
          paddingHorizontal: 16,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

export default CurrentSeasonAnime;
