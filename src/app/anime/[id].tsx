import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

import { StackHeaderProps } from '@react-navigation/stack';

import dayjs from 'dayjs';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import PaperStackHeader from '@/components/PaperStackHeader';
import PaperStack from '@/components/utils/PaperStack';
import { useAnimeDetail } from '@/queries/animeQueries';

function AnimeDetail() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  if (!id) throw Error('id is required');

  const [expandSynopsys, setExpandSynopsys] = useState(false);

  const { data } = useAnimeDetail(Number(id), {
    fields: [
      'synopsis',
      'media_type',
      'num_episodes',
      'start_date',
      'end_date',
      'mean',
      'genres',
    ],
  });

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
          title: data?.title,
          header: renderHeader,
        }}
      />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <Image
            source={{ uri: data?.main_picture?.medium }}
            style={{ width: 150, height: 225 }}
          />
          <View style={{ flex: 1, gap: 8 }}>
            <View>
              <Text variant="titleSmall">Title:</Text>
              <Text variant="bodySmall">{data?.title}</Text>
            </View>

            <View>
              <Text variant="titleSmall">Type:</Text>
              <Text variant="bodySmall">{data?.media_type.toUpperCase()}</Text>
            </View>

            <View>
              <Text variant="titleSmall">Episodes:</Text>
              <Text variant="bodySmall">{data?.num_episodes}</Text>
            </View>

            <View>
              <Text variant="titleSmall">Aired:</Text>
              <Text variant="bodySmall">
                {dayjs(data?.start_date).format('MMM D, YYYY')} to{' '}
                {data?.end_date
                  ? dayjs(data?.end_date).format('MMM D, YYYY')
                  : '?'}
              </Text>
            </View>

            <View>
              <Text variant="titleSmall">Score:</Text>
              <Text variant="bodySmall">{data?.mean}</Text>
            </View>
          </View>
        </View>

        <FlatList
          data={data?.genres}
          horizontal
          renderItem={({ item }) => <Text>{item.name}</Text>}
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
