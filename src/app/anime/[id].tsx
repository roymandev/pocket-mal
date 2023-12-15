import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Button, Chip, Text, useTheme } from 'react-native-paper';

import { StackHeaderProps } from '@react-navigation/stack';

import dayjs from 'dayjs';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import PaperStackHeader from '@/components/PaperStackHeader';
import PaperStack from '@/components/utils/PaperStack';
import { useAnimeById } from '@/queries/animeQueries';
import { AnimeSearchParams } from '@/types/api.types';

function AnimeDetail() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  if (!id) throw Error('id is required');

  const [expandSynopsys, setExpandSynopsys] = useState(false);

  const { data } = useAnimeById(Number(id));

  const renderHeader = useCallback(
    (props: StackHeaderProps) => (
      <PaperStackHeader {...props} sx={{ title: theme.fonts.titleMedium }} />
    ),
    [theme]
  );

  return (
    <>
      <PaperStack.Screen
        options={{
          headerShown: true,
          title: data?.titles?.[0]?.title,
          header: renderHeader,
        }}
      />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <Image
            source={{ uri: data?.images?.jpg?.image_url || '' }}
            style={{ width: 150, height: 225 }}
          />
          <View style={{ flex: 1, gap: 8 }}>
            <View>
              <Text variant="titleSmall">Title:</Text>
              <Text variant="bodySmall">{data?.title}</Text>
            </View>

            <View>
              <Text variant="titleSmall">Type:</Text>
              <Text variant="bodySmall">{data?.type}</Text>
            </View>

            <View>
              <Text variant="titleSmall">Episodes:</Text>
              <Text variant="bodySmall">{data?.episodes}</Text>
            </View>

            <View>
              <Text variant="titleSmall">Aired:</Text>
              <Text variant="bodySmall">
                {dayjs(data?.aired?.from).format('MMM D, YYYY')} to{' '}
                {data?.aired?.to
                  ? dayjs(data.aired.to).format('MMM D, YYYY')
                  : '?'}
              </Text>
            </View>

            <View>
              <Text variant="titleSmall">Score:</Text>
              <Text variant="bodySmall">{data?.score}</Text>
            </View>
          </View>
        </View>

        <FlatList
          data={data?.genres}
          horizontal
          renderItem={({ item }) => (
            <Chip
              onPress={() =>
                router.push({
                  pathname: '/(home)/search',
                  params: {
                    query: JSON.stringify({
                      genres: item.mal_id?.toString(),
                      order_by: 'members',
                      sort: 'desc',
                    } satisfies AnimeSearchParams),
                  },
                })
              }
            >
              {item.name}
            </Chip>
          )}
          contentContainerStyle={{
            gap: 8,
          }}
        />

        <View style={{ gap: 4 }}>
          <Text variant="titleMedium">Synopsis:</Text>
          <Text variant="bodyMedium" numberOfLines={expandSynopsys ? 0 : 5}>
            {data?.synopsis}
          </Text>
          {!expandSynopsys && (
            <Button onPress={() => setExpandSynopsys(true)}>Expand</Button>
          )}
        </View>
      </ScrollView>
    </>
  );
}

export default AnimeDetail;
