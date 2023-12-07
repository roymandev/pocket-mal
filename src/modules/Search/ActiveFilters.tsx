import { View } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';

import ChipAnimeOrder from '@/components/ChipAnimeOrder';
import { AnimeSearchParams } from '@/types/api.types';

type Props = {
  values: AnimeSearchParams;
  onChange: (values: AnimeSearchParams) => void;
};

const renderItem = (
  item: keyof AnimeSearchParams,
  values: AnimeSearchParams,
  onChange: Props['onChange']
) => {
  switch (item) {
    case 'order_by':
      return (
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {values.order_by && (
            <ChipAnimeOrder values={values} onChange={onChange} />
          )}
        </View>
      );

    default:
      return null;
  }
};

function ActiveFilters({ values, onChange }: Props) {
  const activeFilters = Object.keys(values).filter(
    (key) => values[key as keyof AnimeSearchParams] !== undefined
  );

  return (
    <FlatList
      horizontal
      data={activeFilters}
      renderItem={({ item }) =>
        renderItem(item as keyof AnimeSearchParams, values, onChange)
      }
      style={{ marginTop: activeFilters.length > 0 ? 16 : 0 }}
      contentContainerStyle={{
        gap: 8,
      }}
    />
  );
}

export default ActiveFilters;
