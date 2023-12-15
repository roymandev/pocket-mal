import { View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';

import dayjs from 'dayjs';
import { router } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';

import CardAnime from '@/components/Card/CardAnime';
import { useSeasonNow } from '@/queries/seasonsQueries';
import { capitalize } from '@/utils/formatter';
import { getSeason } from '@/utils/getter';

function CurrentSeasonAnime() {
  const currentDate = dayjs();

  const { data, isLoading } = useSeasonNow();

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
        }}
        horizontal
      />
    </View>
  );
}

export default CurrentSeasonAnime;
