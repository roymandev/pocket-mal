import { useState } from 'react';
import { View } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import InfiniteAnime from '@/components/InfiniteAnime';
import PaperStackHeader from '@/components/PaperStackHeader';
import PaperStack from '@/components/utils/PaperStack';
import { ANIME_SEASON, AnimeType } from '@/constant';
import ChipFilter from '@/modules/Filters/ChipFilter';
import FilterType from '@/modules/Filters/FilterType';
import FilterSeasonChip from '@/modules/Seasons/FilterSeason/FilterSeasonChip';
import { useInfiniteSeason } from '@/modules/Seasons/query';

function SeasonalAnime() {
  const { paths } = useLocalSearchParams<{
    paths: string[];
  }>();

  const initialYear = Number(paths[0]);
  const initialSeason = ANIME_SEASON.find((s) => s === paths[1]);

  if (!initialYear || !initialSeason) {
    throw Error('Seasons page: year and season path are required');
  }

  const [year, setYear] = useState(initialYear);
  const [season, setSeason] = useState(initialSeason);
  const [type, setType] = useState<AnimeType>();

  const query = useInfiniteSeason({ year, season }, { filter: type });

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
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <FilterSeasonChip
            initialValues={{
              year,
              season,
            }}
            required
            onApply={(values) => {
              if (!values) return;
              setYear(values.year);
              setSeason(values.season);
            }}
          />

          <FilterType
            value={type}
            onChange={setType}
            renderTrigger={ChipFilter}
          />
        </View>
        <InfiniteAnime {...query} />
      </View>
    </>
  );
}

export default SeasonalAnime;
