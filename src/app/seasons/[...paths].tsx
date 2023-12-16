import { View } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import InfiniteAnime from '@/components/InfiniteAnime';
import PaperStackHeader from '@/components/PaperStackHeader';
import PaperStack from '@/components/utils/PaperStack';
import { useInfiniteSeason } from '@/modules/Seasons/query';

function SeasonalAnime() {
  const { paths } = useLocalSearchParams<{
    paths: string[];
  }>();

  const [year, season] = paths;

  if (!year || !season) {
    throw Error('Seasons page: year and season path are required');
  }

  const query = useInfiniteSeason({ year: Number(year), season });

  return (
    <>
      <PaperStack.Screen
        options={{
          headerShown: true,
          title: 'Seasonal Anime',
          header: (props) => <PaperStackHeader {...props} />,
        }}
      />

      <View style={{ flex: 1, gap: 16, marginHorizontal: 16 }}>
        <InfiniteAnime {...query} />
      </View>
    </>
  );
}

export default SeasonalAnime;
